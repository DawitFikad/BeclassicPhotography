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
  const accessToken = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (!accessToken) return respond(401, { error: "Sign in with the admin Google account first." });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceRoleKey) return respond(500, { error: "Admin authentication is not configured." });

  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return respond(400, { error: "Invalid request." });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email !== ADMIN_EMAIL) return respond(400, { error: "This email does not have admin access." });

  const authClient = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(accessToken);
  const claims = claimsData?.claims as Record<string, unknown> | undefined;
  if (claimsError || !claims || String(claims.email || "").toLowerCase() !== ADMIN_EMAIL) {
    return respond(401, { error: "The admin sign-in session is invalid or expired." });
  }

  if (
    claims.aal !== "aal2" ||
    !hasMethod(claims, "oauth") ||
    !hasMethod(claims, "totp")
  ) {
    return respond(401, { error: "Complete Google sign-in and authenticator verification first." });
  }

  const sessionId = typeof claims.session_id === "string" ? claims.session_id : "";
  const userId = typeof claims.sub === "string" ? claims.sub : "";
  if (!sessionId || !userId) return respond(401, { error: "The admin sign-in session is invalid or expired." });

  const serviceClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { error: markerError } = await serviceClient.rpc("register_admin_login_session", {
    p_session_id: sessionId,
    p_user_id: userId,
    p_expires_at: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
  });
  if (markerError) {
    console.error("Could not register a verified admin session.", markerError.message);
    return respond(500, { error: "Could not finish secure admin login." });
  }

  return respond(200, { authenticated: true });
});
