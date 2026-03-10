# Provisioning Sequence

Current estimated completion toward the production goal: 78%

This runbook is the exact operational sequence to activate the live stack for this project.

Use this order:

1. Supabase
2. Resend
3. Google Calendar
4. Vercel
5. Preview deployment verification
6. Domain connection
7. Production launch verification

Do not start with Vercel first. The app can deploy without the other services, but the contact and booking flows will not work correctly until the backend credentials exist.

## Before You Start

Keep these files open:

- [.env.example](.env.example)
- [supabase/schema.sql](supabase/schema.sql)
- [DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md)

You will need accounts for:

- GitHub
- Supabase
- Vercel
- Resend
- Google Cloud
- Google Calendar account that will own bookings

Prepare a temporary scratch note on your machine for copying values between dashboards. Do not commit any secrets into the repo.

## Step 1: Create The Supabase Project

Goal:
Create the database and collect the Supabase API credentials.

### 1.1 Create the project

1. Open https://supabase.com.
2. Click `Start your project` or `Sign in`.
3. In the dashboard, click `New project`.
4. Choose your organization.
5. Fill in:
   - Project name: `my-booking-hub` or similar
   - Database password: create a strong password and save it
   - Region: choose the region closest to your likely users or to Vercel deployment region
6. Click `Create new project`.
7. Wait for provisioning to complete.

### 1.2 Apply the schema

1. In the left sidebar, click `SQL Editor`.
2. Click `New query`.
3. Open [supabase/schema.sql](supabase/schema.sql) from this repo.
4. Copy all contents.
5. Paste into the SQL editor.
6. Click `Run`.
7. Wait for the query to complete.

### 1.3 Verify the tables

1. In the left sidebar, click `Table Editor`.
2. Confirm these tables exist:
   - `contact_submissions`
   - `bookings`
   - `availability`
   - `page_views`
3. Click `availability` and confirm seed rows exist for Monday to Friday.

### 1.4 Copy the API keys

1. In the left sidebar, click `Project Settings`.
2. Click `API`.
3. Copy the following values:
   - `Project URL`
   - `anon public` key
   - `service_role` key
4. Put them temporarily into your scratch note.

### 1.5 Map them to environment variables

You will later paste these into Vercel as:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Step 2: Set Up Resend

Goal:
Enable contact notification emails.

### 2.1 Create the account and API key

1. Open https://resend.com.
2. Sign in or create an account.
3. In the dashboard, click `API Keys`.
4. Click `Create API Key`.
5. Name it something like `my-booking-hub-production`.
6. Copy the key immediately.
7. Save it in your scratch note.

### 2.2 Add your sending domain

1. In the left sidebar, click `Domains`.
2. Click `Add Domain`.
3. Enter the domain you want to send email from.
   Example:
   - `yourdomain.com`
4. Click `Add`.
5. Resend will show DNS records.

### 2.3 Add the DNS records at your DNS provider

1. Open the DNS provider for your domain.
2. Add the exact records shown by Resend.
3. Save changes.
4. Return to Resend.
5. Click `Verify` or wait for automatic verification.

### 2.4 Decide the sender identity

Choose values like:

- `EMAIL_FROM=Portfolio <noreply@yourdomain.com>`
- `NOTIFICATION_EMAIL=you@yourdomain.com`

Use a real inbox for `NOTIFICATION_EMAIL`.

### 2.5 Map to environment variables

You will later paste these into Vercel as:

- `RESEND_API_KEY`
- `EMAIL_FROM`
- `NOTIFICATION_EMAIL`

## Step 3: Set Up Google Calendar And Meet

Goal:
Allow real bookings to create calendar events and Meet links.

### 3.1 Create a Google Cloud project

1. Open https://console.cloud.google.com.
2. In the top project selector, click `Select a project`.
3. Click `New Project`.
4. Name it something like `my-booking-hub`.
5. Click `Create`.
6. Wait for the project to be ready.

### 3.2 Enable the Calendar API

1. In the Google Cloud sidebar, click `APIs & Services`.
2. Click `Library`.
3. Search for `Google Calendar API`.
4. Open it.
5. Click `Enable`.

### 3.3 Create the service account

1. In the sidebar, click `IAM & Admin`.
2. Click `Service Accounts`.
3. Click `Create Service Account`.
4. Fill in:
   - Service account name: `portfolio-booking`
5. Click `Create and Continue`.
6. You do not need special project roles for this workflow.
7. Click through and finish creation.

### 3.4 Create the JSON key

1. Click the new service account.
2. Open the `Keys` tab.
3. Click `Add Key`.
4. Choose `Create new key`.
5. Choose `JSON`.
6. Click `Create`.
7. A JSON file will download.
8. Keep this file safe and do not commit it.

### 3.5 Share your Google Calendar with the service account

1. Open Google Calendar in the Google account that owns your booking calendar.
2. In the left sidebar, hover the target calendar.
3. Click the three-dot menu.
4. Click `Settings and sharing`.
5. Scroll to `Share with specific people or groups`.
6. Click `Add people and groups`.
7. Paste the service account email from the JSON file.
8. Set permission to `Make changes to events`.
9. Save.

### 3.6 Copy the calendar ID

1. Still in `Settings and sharing`, scroll to `Integrate calendar`.
2. Copy the `Calendar ID`.
3. Save it in your scratch note.

### 3.7 Prepare the JSON for Vercel

Vercel environment variables are easier if the JSON is on one line.

1. Open the downloaded JSON file in a text editor.
2. Minify it into one line if needed.
3. Copy the full JSON content.
4. Save it temporarily in your scratch note.

### 3.8 Map to environment variables

You will later paste these into Vercel as:

- `GOOGLE_SERVICE_ACCOUNT_KEY`
- `GOOGLE_CALENDAR_ID`

## Step 4: Create The Vercel Project

Goal:
Connect the repo, add env vars, and create a working preview deployment.

### 4.1 Import the repo

1. Open https://vercel.com.
2. Sign in.
3. Click `Add New...`.
4. Click `Project`.
5. Import the GitHub repository for this project.
6. Click `Import`.

### 4.2 Confirm build settings

Vercel should detect Vite correctly.

Confirm these values:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

If Vercel already fills those in correctly, leave them.

### 4.3 Add environment variables

1. In the import screen or later in `Project Settings > Environment Variables`, add these values.
2. Add each one to both `Preview` and `Production` unless you explicitly want different values.

Add these first:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL`
- `EMAIL_FROM`
- `GOOGLE_SERVICE_ACCOUNT_KEY`
- `GOOGLE_CALENDAR_ID`

Then add optional but recommended values:

- `VITE_PLAUSIBLE_DOMAIN`
- `VITE_PLAUSIBLE_SCRIPT_URL`
- `VITE_SENTRY_DSN`

### 4.4 Create the first deployment

1. Click `Deploy`.
2. Wait for the build to finish.
3. Open the preview deployment URL.

## Step 5: Run Preview Verification

Goal:
Confirm the full stack works before connecting the real domain.

### 5.1 Check the health endpoint

1. In the browser, open:
   - `https://your-preview-url.vercel.app/api/health`
2. Confirm the response contains:
   - `ok: true`

### 5.2 Check route handling

Open each route directly in the browser and refresh it:

- `/`
- `/projects`
- `/experience`
- `/booking`
- `/contact`
- `/blog`

If refresh works, `vercel.json` rewrites are behaving correctly.

### 5.3 Test contact flow

1. Open `/contact`.
2. Submit a real test message.
3. Confirm success UI appears.
4. In Supabase `Table Editor`, open `contact_submissions`.
5. Confirm the row exists.
6. Confirm the notification email arrives in `NOTIFICATION_EMAIL` inbox.

### 5.4 Test booking flow

1. Open `/booking`.
2. Choose a future weekday and time.
3. Submit a booking.
4. Confirm success UI appears.
5. In Supabase `bookings`, confirm the row exists.
6. Open Google Calendar and confirm the event exists.
7. Confirm a Meet link is present if Google setup is correct.

### 5.5 Test monitoring

1. Browse a few pages and confirm Plausible receives pageviews if configured.
2. Submit contact and booking and confirm conversion events appear if configured.
3. If Sentry is configured, trigger a controlled test error later and confirm it appears in Sentry.

## Step 6: Connect Your Domain To Vercel

Goal:
Point your real domain at the production deployment.

### 6.1 Add the domain in Vercel

1. Open the Vercel project.
2. Click `Settings`.
3. Click `Domains`.
4. Add your apex domain.
   Example:
   - `yourdomain.com`
5. Add `www.yourdomain.com` too if you want both.

### 6.2 Add DNS records at your DNS provider

1. Vercel will show the required DNS records.
2. Open your domain registrar or DNS provider.
3. Add the exact Vercel records.
4. Save changes.
5. Return to Vercel and wait for verification.

### 6.3 Set primary domain behavior

Choose one:

- apex as primary: `yourdomain.com`
- `www` as primary: `www.yourdomain.com`

Then let Vercel redirect the other one.

## Step 7: Launch Production

Goal:
Promote from preview to real production and confirm the live domain works.

### 7.1 Trigger or promote the production deployment

1. Push the current code to the branch Vercel uses for production, usually `main`.
2. Wait for the production deployment to finish.
3. Open the real domain.

### 7.2 Run production smoke tests

1. Open `https://yourdomain.com/api/health`.
2. Confirm it returns `ok: true`.
3. Test contact flow.
4. Test booking flow.
5. Confirm booking creates the calendar event.
6. Confirm Meet link appears.
7. Confirm analytics receives data.
8. Confirm Sentry receives errors if configured.
9. Test mobile navigation and route refreshes.

## Exact Environment Variable Mapping

Paste these into Vercel exactly like this:

### Required

- `VITE_SUPABASE_URL` = Supabase Project URL
- `VITE_SUPABASE_ANON_KEY` = Supabase anon public key
- `SUPABASE_URL` = Supabase Project URL
- `SUPABASE_SERVICE_ROLE_KEY` = Supabase service role key
- `RESEND_API_KEY` = Resend API key
- `NOTIFICATION_EMAIL` = inbox that should receive contact notifications
- `EMAIL_FROM` = sender name and address, example `Portfolio <noreply@yourdomain.com>`
- `GOOGLE_SERVICE_ACCOUNT_KEY` = full JSON content from service account key
- `GOOGLE_CALENDAR_ID` = Google Calendar ID from settings

### Optional But Recommended

- `VITE_PLAUSIBLE_DOMAIN` = your production domain
- `VITE_PLAUSIBLE_SCRIPT_URL` = `https://plausible.io/js/script.js`
- `VITE_SENTRY_DSN` = Sentry DSN

## Recommended Order Of Actual Copy-Pasting

Do it in this exact order:

1. Create Supabase project
2. Run [supabase/schema.sql](supabase/schema.sql)
3. Copy Supabase URL and keys
4. Create Resend API key
5. Verify Resend domain
6. Create Google service account and key
7. Share Google Calendar with service account
8. Copy Calendar ID
9. Import repo into Vercel
10. Paste all env vars into Vercel
11. Deploy preview
12. Run preview smoke tests
13. Add custom domain in Vercel
14. Update DNS
15. Run production smoke tests

## If Something Fails

### Contact form fails

Check in this order:

1. `SUPABASE_URL`
2. `SUPABASE_SERVICE_ROLE_KEY`
3. table exists in Supabase
4. `RESEND_API_KEY`
5. `EMAIL_FROM` uses a verified sending domain

### Booking succeeds but no Meet link appears

Check in this order:

1. `GOOGLE_SERVICE_ACCOUNT_KEY`
2. `GOOGLE_CALENDAR_ID`
3. service account was shared on the calendar
4. permission is `Make changes to events`

### Vercel deploy works but routes 404 on refresh

Check:

1. [vercel.json](vercel.json)
2. deployment included the latest commit

### Analytics shows nothing

Check:

1. `VITE_PLAUSIBLE_DOMAIN`
2. your domain matches the configured Plausible domain exactly

### Sentry shows nothing

Check:

1. `VITE_SENTRY_DSN`
2. deploy after adding the env var

## Final Note

Once Supabase, Resend, Google Calendar, and Vercel are configured, the remaining work is mostly verification rather than development. At that point the project should be very close to launch-ready.