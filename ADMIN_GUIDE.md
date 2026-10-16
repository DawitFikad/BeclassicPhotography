# Beclassic Photography content admin

## Admin usage

1. Open `https://your-domain/admin`.
2. Sign in using `classicphoto495@gmail.com` and the emailed sign-in link.
3. Use the tabs to manage packages, package categories, add-on services, gallery photos, and gallery categories.
4. Save edits to publish them to the website. New package details use the same page route as existing packages.

Gallery and package images uploaded from the admin are stored in the `beclassic-gallery` Supabase Storage bucket. Public visitors can view images; only the configured admin email can upload, edit, or delete content.

## Before deploying

The site is a static export and connects to Supabase from the browser. Build it with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` present in the build environment. The values are in the local `.env.local` file; `.env.example` documents the required variable names. Never add a Supabase secret or service-role key to the website.

Run `npm run build`, then upload the contents of the generated `out/` directory to the hosting account's public website directory.

In Supabase Dashboard, open **Authentication → URL Configuration** and set the production Site URL to the website's HTTPS address. Add the exact redirect URL `https://your-domain/admin` to the allowed redirect URLs.

Supabase's built-in email sender is limited to addresses on the Supabase organization team. If the admin email is not on that team, configure custom SMTP in **Authentication → SMTP Settings** so magic-link emails can be sent to it.
