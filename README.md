# My Booking Hub

Portfolio and lead-generation site for Idderf Salem, built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui.

## Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Supabase
- Vercel Functions

## Local Development

Install dependencies:

```sh
npm install
```

Start the frontend only:

```sh
npm run dev
```

This runs the Vite app on `http://localhost:8080`.

For full-stack local development with Vercel Functions, use:

```sh
npx vercel dev
```

That is the correct local mode once the server-side environment variables are configured.

## Environment Variables

Copy the example file and fill in the real values:

```sh
copy .env.example .env
```

Required values are documented in [.env.example](.env.example) and [MASTERPLAN.md](MASTERPLAN.md).

Important email note:

- `EMAIL_FROM` should use the `Idderf Salem <noreply@yourdomain.com>` format
- Resend must verify your sending domain before custom-domain email delivery will work reliably

Google Calendar note:

- OAuth refresh-token auth is the primary path for Meet generation
- `GOOGLE_SERVICE_ACCOUNT_KEY` is optional fallback configuration, not the preferred production path

Availability admin note:

- Private availability management is available at `/admin/availability`
- Set `ADMIN_AVAILABILITY_TOKEN` in your environment before using it
- The admin page sends the token in a request header and stores it only in browser session storage

Analytics can be enabled by setting:

- `VITE_PLAUSIBLE_DOMAIN`
- optionally `VITE_PLAUSIBLE_SCRIPT_URL` if you self-host Plausible or use an alternative endpoint

## Database

The initial schema is in [supabase/schema.sql](supabase/schema.sql).

Apply it in the Supabase SQL editor after creating the project.

## Production Deployment

Target production platform: Vercel.

Recommended production stack:

- frontend on Vercel
- server endpoints in `api/`
- database on Supabase
- email notifications via Resend
- booking integration via Google Calendar API using OAuth refresh-token auth for reliable Google Meet creation

Client-side routing for Vercel is configured in [vercel.json](vercel.json).

Basic deployment verification endpoint:

- `GET /api/health`

## Planning Docs

- [MASTERPLAN.md](MASTERPLAN.md)
- [PRODUCTION-ARCHITECTURE.md](PRODUCTION-ARCHITECTURE.md)
- [DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md)
