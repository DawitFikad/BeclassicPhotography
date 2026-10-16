# Beclassic Photography content admin

## Admin usage

1. Open `https://your-domain/admin`.
2. Sign in to Google using `classicphoto495@gmail.com`.
3. On the first sign-in, scan the QR code with an authenticator app and enter its six-digit code.
4. On later sign-ins, approve the Google sign-in and enter the current authenticator code.
5. Use the tabs to manage packages, package categories, add-on services, gallery photos, and gallery categories. Saving publishes edits to the website.

Gallery and package images uploaded from the admin are stored in the `beclassic-gallery` Supabase Storage bucket. Public visitors can view images; only the configured admin email can upload, edit, or delete content.

## Before deploying

The site is a static export and connects to Supabase from the browser. Build it with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` present in the build environment. The values are in the local `.env.local` file; `.env.example` documents the required variable names. Never add a Supabase secret or service-role key to the website.

Run `npm run build`, then upload the contents of the generated `out/` directory to the hosting account's public website directory.

## One-time Google sign-in setup

1. In Google Cloud Console, create a Web OAuth client. Add this authorized redirect URI: `https://lkznsjdqyorqeyutaqob.supabase.co/auth/v1/callback`.
2. In Supabase Dashboard, open **Authentication → Sign In / Providers → Google**, enable Google, and paste the Google client ID and client secret.
3. Under **Authentication → URL Configuration**, set the Site URL to the production website and allow these redirects: `https://your-domain/admin`, `http://localhost:3000/admin`, and the current preview `https://beclassicphotography-git-codex-ffcdc6-davids-projects-ff0603ef.vercel.app/admin` (replace it if Vercel has assigned a different URL).
4. Confirm the admin Google account is `classicphoto495@gmail.com`. Only this email can enter the content admin.

Google's OAuth app can be created without a paid Google Cloud plan. Never put the Google client secret in the website or GitHub; it belongs only in Supabase's provider settings.
