# Deployment Checklist

This checklist is the shortest safe path from the current repository state to a live production deployment on Vercel.

## Status

Current estimated completion toward the production goal: 60%

Already implemented in the repo:

- Vercel API handlers for contact and booking
- Supabase schema SQL
- frontend integration for contact and booking
- Vercel SPA routing config
- Plausible analytics hooks
- Sentry client scaffolding

Not done until you provision services:

- Supabase project and schema application
- Vercel environment variables
- Resend domain and API key
- Google Calendar service account and calendar sharing
- live preview and production smoke tests

## 1. Supabase

1. Create the Supabase project.
2. Open the SQL Editor.
3. Run [supabase/schema.sql](supabase/schema.sql).
4. Confirm the tables exist:
   - `contact_submissions`
   - `bookings`
   - `availability`
   - `page_views`
5. Go to Project Settings > API.
6. Copy:
   - project URL
   - anon key
   - service role key

## 2. Resend

1. Create a Resend account.
2. Add your production domain.
3. Add the DNS records they provide.
4. Wait for verification.
5. Create an API key.
6. Decide your sender address.

Required values:

- `RESEND_API_KEY`
- `EMAIL_FROM`
- `NOTIFICATION_EMAIL`

## 3. Google Calendar

1. Create a Google Cloud project.
2. Enable Google Calendar API.
3. Create a service account.
4. Download the JSON key.
5. Share your calendar with the service account email.
6. Grant it permission to edit events.
7. Copy the calendar ID.
8. Minify the JSON into one line for Vercel env storage if needed.

Required values:

- `GOOGLE_SERVICE_ACCOUNT_KEY`
- `GOOGLE_CALENDAR_ID`

## 4. Vercel Project

1. Import the repository into Vercel.
2. Confirm build settings:
   - build command: `npm run build`
   - output directory: `dist`
3. Add all env vars from [.env.example](.env.example).
4. Add them to Preview and Production.
5. Trigger a preview deployment.

## 5. Environment Variables

Required for app functionality:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL`
- `EMAIL_FROM`
- `GOOGLE_SERVICE_ACCOUNT_KEY`
- `GOOGLE_CALENDAR_ID`

Optional but recommended:

- `VITE_PLAUSIBLE_DOMAIN`
- `VITE_PLAUSIBLE_SCRIPT_URL`
- `VITE_SENTRY_DSN`

## 6. Preview Smoke Test

1. Open the Vercel preview deployment.
2. Hit `/api/health` and confirm it returns `ok: true`.
3. Confirm route refreshes work for:
   - `/`
   - `/projects`
   - `/experience`
   - `/booking`
   - `/contact`
   - `/blog`
4. Submit a contact form.
5. Confirm record inserted in Supabase.
6. Confirm email notification received.
7. Create a booking.
8. Confirm record inserted in Supabase.
9. Confirm calendar event was created.
10. Confirm Meet link appears when Google credentials are configured.
11. Confirm analytics and Sentry are receiving data.

## 7. Domain Launch

1. Add your domain to the Vercel project.
2. Add the DNS records at your DNS provider.
3. Wait for verification.
4. Point your preferred primary domain.
5. Promote the production deployment.

## 8. Production Smoke Test

1. Load the homepage on the live domain.
2. Test contact submit.
3. Test booking submit.
4. Confirm Google Meet generation.
5. Confirm mobile nav works.
6. Confirm dark and light theme behavior.
7. Confirm Sentry receives a test error if enabled.
8. Confirm Plausible receives pageviews and conversion events.

## 9. Immediate Next Action

Start with Supabase first. The code is already prepared for it, and without that project the rest of the production flow cannot function.