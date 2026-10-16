import { createClient } from "npm:@supabase/supabase-js@2";

const ADMIN_EMAIL = "classicphoto495@gmail.com";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function respond(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

function hasMethod(claims: Record<string, unknown>, method: string) {
  const methods = Array.isArray(claims.amr) ? claims.amr : [];
  return methods.some((item) => Boolean(item && typeof item === "object" && "method" in item && item.method === method));
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return respond(405, { error: "Method not allowed." });

  const authorization = request.headers.get("Authorization") || "";
  const otpToken = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (!otpToken) return respond(401, { error: "Verify the email code first." });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceRoleKey) return respond(500, { error: "Admin authentication is not configured." });

  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return respond(400, { error: "Invalid request." });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (email !== ADMIN_EMAIL) return respond(400, { error: "This email does not have admin access." });

  const otpClient = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: otpData, error: otpError } = await otpClient.auth.getClaims(otpToken);
  const otpClaims = otpData?.claims as Record<string, unknown> | undefined;
  if (otpError || !otpClaims || String(otpClaims.email || "").toLowerCase() !== ADMIN_EMAIL) {
    return respond(401, { error: "The admin sign-in session is invalid or expired." });
  }

  const sessionId = typeof otpClaims.session_id === "string" ? otpClaims.session_id : "";
  const userId = typeof otpClaims.sub === "string" ? otpClaims.sub : "";
  const serviceClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  if (
    otpClaims.aal === "aal2" &&
    hasMethod(otpClaims, "password") &&
    hasMethod(otpClaims, "totp") &&
    sessionId &&
    userId
  ) {
    const { error: markerError } = await serviceClient.rpc("register_admin_login_session", {
      p_session_id: sessionId,
      p_user_id: userId,
      p_expires_at: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    });
    if (markerError) {
      console.error("Could not register a verified authenticator session.", markerError.message);
      return respond(500, { error: "Could not finish secure admin login." });
    }
    return respond(200, { authenticated: true });
  }

  if (!hasMethod(otpClaims, "otp")) {
    return respond(401, { error: "Verify with your email or authenticator before continuing." });
  }
  if (password.length < 8 || password.length > 256) {
    return respond(400, { error: "Enter a valid admin password." });
  }

  const passwordClient = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: passwordData, error: passwordError } = await passwordClient.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password,
  });
  if (passwordError || !passwordData.session || passwordData.user.id !== otpClaims.sub) {
    return respond(401, { error: "The password is incorrect." });
  }

  const { data: passwordClaimsData, error: passwordClaimsError } = await passwordClient.auth.getClaims(passwordData.session.access_token);
  const passwordClaims = passwordClaimsData?.claims as Record<string, unknown> | undefined;
  const sessionId = typeof passwordClaims?.session_id === "string" ? passwordClaims.session_id : "";
  if (
    passwordClaimsError ||
    !passwordClaims ||
    passwordClaims.sub !== otpClaims.sub ||
    String(passwordClaims.email || "").toLowerCase() !== ADMIN_EMAIL ||
    !hasMethod(passwordClaims, "password") ||
    !sessionId
  ) {
    return respond(401, { error: "Could not verify the password login." });
  }

  const { error: markerError } = await serviceClient.rpc("register_admin_login_session", {
    p_session_id: sessionId,
    p_user_id: String(passwordClaims.sub),
    p_expires_at: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
  });
  if (markerError) {
    console.error("Could not register a verified admin session.", markerError.message);
    return respond(500, { error: "Could not finish secure admin login." });
  }

  return respond(200, {
    access_token: passwordData.session.access_token,
    refresh_token: passwordData.session.refresh_token,
  });
});
