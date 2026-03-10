# Production Masterplan

This masterplan turns the current portfolio SPA into a production-ready lead capture and booking system deployed on Vercel with a custom domain.

## Primary Goal

Convert the site from a static portfolio into a working business funnel that:

- captures contact leads reliably
- books calls against real availability
- creates Google Meet links automatically
- stores business data safely
- provides analytics and error monitoring
- is deployable, maintainable, and easy to iterate on

## Recommended Architecture

Use this stack:

- Frontend hosting: Vercel
- Domain: your existing domain connected to Vercel
- Database: Supabase Postgres
- Backend APIs: Vercel Serverless Functions or Supabase Edge Functions
- Recommendation: use Supabase for database and auth primitives, but use Vercel Functions for contact and booking if you want all deployment workflows centered on Vercel
- Calendar and meeting links: Google Calendar API + Google Meet
- Email notifications: Resend
- Analytics: Plausible or Umami
- Error monitoring: Sentry

## Delivery Strategy

Build in this order:

1. Stabilize and prepare the current frontend for production.
2. Add persistence and backend infrastructure.
3. Replace fake contact and booking flows with real ones.
4. Add analytics, monitoring, and SEO polish.
5. Deploy to Vercel and connect the domain.

## Objective 1: Lock The Production Architecture

Outcome:
The project has one agreed deployment model and no ambiguity about where frontend, APIs, and secrets live.

Tasks:

1. Decide the final backend execution model.
   Recommended decision:
   - frontend on Vercel
   - database on Supabase
   - API routes on Vercel under `api/*`
   This keeps deployment simple and centralized in Vercel.

2. Define the runtime boundaries.
   - Browser handles UI, validation, and success states.
   - Vercel Functions handle server validation, rate limiting, Google Calendar calls, and email notifications.
   - Supabase stores contact submissions, bookings, and availability.

3. Define the non-goals for v1.
   - no CMS yet
   - no admin dashboard yet
   - no user accounts yet
   - blog remains static for now

Exit criteria:

- one production stack is chosen
- no mixed Vercel versus Supabase-function ambiguity remains
- v1 scope is fixed

## Objective 2: Prepare The Repository For Production Work

Outcome:
The repo is structured so backend work, environment variables, and deployment settings can be added cleanly.

Tasks:

1. Add environment variable strategy.
   - client variables use `VITE_` prefix
   - server-only secrets live only in Vercel project settings
   - create `.env.example` with placeholders only

2. Add a dedicated API folder.
   - if using Vercel Functions, create `api/contact.ts` and `api/booking.ts`
   - add shared server-side utilities for validation and service integration if needed

3. Add shared schemas.
   - create Zod schemas reused by frontend and backend for contact and booking payloads

4. Add deployment documentation.
   - document local development
   - document Vercel env vars
   - document Supabase setup and schema migration process

5. Add request and error logging conventions.
   - structured logs in server handlers
   - safe logging that excludes secrets

Exit criteria:

- repo can support browser and server code cleanly
- env var model is documented
- validation logic is designed once and reused

## Objective 3: Provision Core Infrastructure

Outcome:
All external services required for production exist and are reachable from the app.

Tasks:

1. Create Supabase project.
2. Create Vercel project and link the repo.
3. Provision Resend.
4. Provision Google Cloud Calendar access.
5. Provision analytics and monitoring.

Exit criteria:

- every required external service exists
- every secret is available for configuration
- no production blocker remains outside the codebase

### How To Get Supabase Credentials

What you need:

- Supabase project URL
- Supabase anon key
- Supabase service role key

Steps:

1. Go to https://supabase.com and sign in.
2. Create a new project.
3. Choose organization, project name, database password, and region.
4. After project creation, go to Project Settings > API.
5. Copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key
6. Store them as:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

Important:

- `service_role` must never be exposed in browser code.

### How To Get Resend API Key

What you need:

- Resend API key
- verified sending domain or test sender

Steps:

1. Go to https://resend.com.
2. Create an account.
3. In the dashboard, go to API Keys.
4. Create a new API key.
5. Copy it once and store it in Vercel as `RESEND_API_KEY`.
6. Go to Domains in Resend.
7. Add your domain.
8. Add the DNS records Resend gives you in your domain provider.
9. Wait until domain verification completes.

Recommended env vars:

- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL`
- `EMAIL_FROM`

Example:

- `NOTIFICATION_EMAIL=you@yourdomain.com`
- `EMAIL_FROM=Portfolio <noreply@yourdomain.com>`

### How To Get Google Calendar Credentials

What you need:

- Google Cloud project
- Calendar API enabled
- service account JSON
- calendar ID

Steps:

1. Go to https://console.cloud.google.com.
2. Create a new project.
3. Open APIs and Services > Library.
4. Enable Google Calendar API.
5. Open IAM and Admin > Service Accounts.
6. Create a service account, for example `portfolio-booking`.
7. Open that service account and create a JSON key.
8. Download the JSON file.
9. Open your Google Calendar settings.
10. Share your calendar with the service account email.
11. Give it permission to make changes to events.
12. Copy your calendar ID from Calendar Settings.
13. Store these in Vercel:
   - `GOOGLE_SERVICE_ACCOUNT_KEY` as the full JSON content serialized into one env value
   - `GOOGLE_CALENDAR_ID`

Important:

- do not commit the JSON file to the repo
- if Vercel env UI is awkward for multiline JSON, minify it first into one line

### How To Get Plausible Analytics

What you need:

- your site added to Plausible
- data-domain value

Steps:

1. Go to https://plausible.io.
2. Create an account.
3. Add your domain.
4. Plausible will provide a script tag.
5. Add it to the production site layout or `index.html`.

Alternative:

- If you want zero subscription cost, use Umami instead.

### How To Get Sentry Credentials

What you need:

- Sentry DSN

Steps:

1. Go to https://sentry.io.
2. Create a project for React.
3. Copy the DSN.
4. Store it as:
   - `VITE_SENTRY_DSN`

Optional server-side DSN usage can also be added in Vercel functions.

### How To Set Up Vercel

What you need:

- linked GitHub repo
- production env vars
- domain connected

Steps:

1. Go to https://vercel.com.
2. Import the GitHub repository.
3. Vercel should detect Vite automatically.
4. Confirm settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables in Project Settings > Environment Variables.
6. Trigger a deploy.

Recommended Vercel env vars:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL`
- `EMAIL_FROM`
- `GOOGLE_SERVICE_ACCOUNT_KEY`
- `GOOGLE_CALENDAR_ID`
- `VITE_SENTRY_DSN`

### How To Connect Your Domain To Vercel

Steps:

1. In Vercel, open your project.
2. Go to Settings > Domains.
3. Add your domain.
4. Vercel will show required DNS records.
5. Go to your domain registrar or DNS provider.
6. Add the required records.
7. Wait for verification.
8. Set the apex domain and `www` redirect behavior as desired.

Recommended setup:

- primary domain: apex domain, for example `yourdomain.com`
- redirect `www.yourdomain.com` to apex, or vice versa

If your DNS is in Cloudflare:

1. Keep domain nameservers pointed at Cloudflare.
2. Add the Vercel DNS records in Cloudflare DNS.
3. Disable conflicting proxy behavior if Vercel asks for DNS-only setup.

## Objective 4: Implement Database Schema And Data Policies

Outcome:
The app has production data tables, constraints, and policies that support real contact and booking flows.

Tasks:

1. Create `contact_submissions` table.
   - fields: name, email, message, ip_address, read, created_at

2. Create `bookings` table.
   - fields: name, email, notes, date, time, duration_minutes, meet_link, google_event_id, status, created_at

3. Create `availability` table.
   - fields: day_of_week, start_time, end_time, is_active

4. Optionally create `page_views` table.

5. Enable RLS and define policies.
   - public insert only where required
   - reads restricted to trusted server context

6. Seed initial availability.
   - Monday to Friday, 9 AM to 5 PM Manila time unless business requirements differ

Exit criteria:

- database tables exist
- constraints reject invalid data
- RLS is enabled and tested

## Objective 5: Implement Contact Flow End To End

Outcome:
Visitors can submit a message successfully, the message is stored, and you receive a notification.

Tasks:

1. Replace `mailto:` behavior in [src/pages/Contact.tsx](src/pages/Contact.tsx) with an API call.
2. Add a server handler for `POST /api/contact`.
3. Reuse Zod validation on the server.
4. Add a honeypot field.
5. Add rate limiting.
6. Insert the submission into Supabase.
7. Send notification email via Resend.
8. Return a clean success response and show a proper success state in the UI.
9. Add analytics event tracking for successful submission.
10. Test the happy path and failure path.

Exit criteria:

- contact messages no longer rely on local email clients
- submissions are stored in the database
- notifications are received by email

## Objective 6: Implement Booking Flow End To End

Outcome:
Visitors can book a real call that reserves a time slot and generates a Google Meet link.

Tasks:

1. Replace local confirmation logic in [src/components/BookingWidget.tsx](src/components/BookingWidget.tsx) with an API call.
2. Add a server handler for `POST /api/booking`.
3. Validate name, email, date, time, and duration on the server.
4. Verify that the requested time is in the future.
5. Check configured availability from the database.
6. Check for conflicts with existing bookings.
7. Query Google Calendar free/busy as a second availability check.
8. Create the calendar event.
9. Request conference data so Google Meet link is generated.
10. Store the booking in Supabase.
11. Return confirmation data including the Meet link.
12. Update the confirmation UI to show real booking details.
13. Track booking success as an analytics event.
14. Test booking creation, slot conflicts, and integration failure fallback.

Exit criteria:

- booking is no longer a fake UI flow
- real calendar availability is enforced
- successful bookings generate Meet links and records

## Objective 7: Add Production Analytics And Monitoring

Outcome:
You can see traffic, conversion events, and runtime errors.

Tasks:

1. Install Plausible or Umami tracking.
2. Track page views.
3. Track key funnel events:
   - contact submit success
   - booking success
   - outbound resume click if important
4. Install Sentry in the React app.
5. Add server-side error capture for API functions if needed.
6. Validate that production source maps and releases are handled correctly if you want richer traces.

Exit criteria:

- you can measure traffic and conversions
- frontend errors are captured
- backend failures are diagnosable

## Objective 8: Improve SEO And Performance For Launch

Outcome:
The site is ready for public launch and can rank and share well.

Tasks:

1. Audit and finalize metadata behavior in [src/hooks/useSEO.ts](src/hooks/useSEO.ts).
2. Generate a proper default OG image and page-specific OG images if feasible.
3. Compress large screenshots to WebP or AVIF.
4. Verify `robots.txt` and `sitemap.xml` in `public/`.
5. Add favicons and social preview assets if missing.
6. Consider moving the static blog to MDX later, but keep it static for v1.
7. Run Lighthouse on the deployed build.

Exit criteria:

- metadata is correct in production
- images are optimized
- social previews and search indexing are launch-ready

## Objective 9: Harden Security And Reliability

Outcome:
The app is safe enough for a public launch and common abuse cases are addressed.

Tasks:

1. Ensure all secrets exist only in Vercel env vars.
2. Confirm service-role credentials never reach browser bundles.
3. Add honeypot protection for contact.
4. Add rate limiting for contact and booking.
5. Enforce input length and enum validation on the server.
6. Sanitize any user-supplied content included in emails or logs.
7. Confirm CORS behavior if APIs are exposed cross-origin.
8. Add replay-safe idempotency handling if needed for booking requests.
9. Add a fallback path when Google Calendar is unavailable.
10. Verify Supabase RLS with real test cases.

Exit criteria:

- obvious abuse vectors are covered
- secrets and data access boundaries are correct
- production failures degrade safely

## Objective 10: Deploy To Vercel And Launch The Domain

Outcome:
The site is live on your domain with working forms, booking, analytics, and monitoring.

Tasks:

1. Import repo into Vercel.
2. Add all environment variables.
3. Deploy preview environment first.
4. Run end-to-end checks on preview.
5. Connect your domain.
6. Promote the production deployment.
7. Re-run smoke tests on the live domain.

Smoke test checklist:

- homepage loads
- every route resolves
- contact submission succeeds
- booking creates a calendar event
- Meet link is generated
- notification email is received
- analytics receives events
- Sentry receives a test event
- mobile navigation works
- dark and light mode work

Exit criteria:

- live domain is serving the production site
- key business flows are verified in production

## Objective 11: Post-Launch Operations

Outcome:
The site remains maintainable and measurable after release.

Tasks:

1. Review submissions weekly.
2. Review failed booking logs.
3. Monitor analytics monthly.
4. Rotate credentials if needed.
5. Keep dependencies updated.
6. Add admin tooling only when manual operations become painful.

Exit criteria:

- production operations are lightweight and repeatable

## Suggested Execution Order

Week 1:

1. Objective 1
2. Objective 2
3. Objective 3
4. Objective 4

Week 2:

1. Objective 5
2. Objective 6

Week 3:

1. Objective 7
2. Objective 8
3. Objective 9
4. Objective 10

Week 4 and ongoing:

1. Objective 11

## Recommended Minimum Launch Scope

If you want the fastest path to value, ship this first:

1. Vercel deployment
2. Domain connection
3. Supabase tables
4. Real contact form
5. Real booking flow with Google Meet
6. Resend notifications
7. Plausible analytics
8. Sentry monitoring

Leave these for later:

- admin dashboard
- CMS
- dynamic blog system
- advanced automation
- dynamic OG images if schedule is tight

## Open Decisions You Should Confirm Early

1. What email address should receive contact notifications?
2. What sender identity should appear in outgoing mail?
3. What working hours should the booking system expose?
4. What durations should remain available?
5. Should booking still succeed if Google Meet creation fails, or should it hard-fail?
6. Is Plausible worth the monthly cost, or do you want Umami instead?

## Immediate Next Steps

1. Create the Supabase project.
2. Import the repo into Vercel.
3. Provision Resend.
4. Provision Google Calendar service account.
5. Then implement the real contact flow before the booking flow.