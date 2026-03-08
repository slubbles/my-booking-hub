# Production Architecture - idderfsalem.dev

This document outlines everything needed to take this portfolio site from a static frontend to a fully production-ready application with backend services.

---

## Current State

**Stack:** React + Vite + TypeScript + Tailwind CSS + shadcn/ui  
**Hosting:** Static SPA (Lovable preview / Vercel / Netlify)  
**Backend:** None - all data is hardcoded in frontend files  
**Auth:** None  
**Database:** None  

### What works today
- Static portfolio pages (Home, Projects, Experience, Skills, Resume, Blog, Booking, Contact)
- Client-side routing with react-router-dom
- Dark/light theme toggle
- SEO metadata injection
- Contact form (opens mailto: link - no actual submission)
- Booking page (UI only - no calendar integration)
- Blog (hardcoded content in `src/data/blogPosts.ts`)

---

## What Needs a Backend

### 1. Contact Form Submissions
**Current:** Opens mailto: link  
**Needed:** Store submissions in a database, send email notifications

```
User submits form
  -> Edge Function: validate + sanitize input
  -> Insert into `contact_submissions` table
  -> Trigger email notification (Resend / SendGrid)
  -> Return success response
```

**Database table:**
```sql
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now(),
  read boolean default false
);
```

### 2. Booking System
**Current:** UI-only, no actual booking  
**Needed:** Real calendar integration with availability management

**Option A - Third-party (recommended for MVP):**
- Embed Cal.com or Calendly widget
- Zero backend needed, handles email confirmations automatically

**Option B - Custom built:**
```
User selects date/time
  -> Edge Function: check availability
  -> Insert into `bookings` table
  -> Send confirmation email to both parties
  -> Create Google Calendar event (optional)
```

**Database tables:**
```sql
create table availability (
  id uuid primary key default gen_random_uuid(),
  day_of_week int not null, -- 0=Sun, 6=Sat
  start_time time not null,
  end_time time not null,
  is_active boolean default true
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  notes text,
  date date not null,
  time time not null,
  duration_minutes int not null,
  status text default 'confirmed', -- confirmed, cancelled, completed
  created_at timestamptz default now()
);
```

### 3. Blog CMS
**Current:** Hardcoded array in `blogPosts.ts`  
**Needed:** Dynamic content management

**Option A - Headless CMS (recommended):**
- Use Sanity, Contentful, or Notion API
- Write posts in a nice editor, fetch via API
- No database needed

**Option B - Database-driven:**
```sql
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null, -- markdown
  tags text[] default '{}',
  read_time text,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

**Option C - MDX files in repo (simplest):**
- Store `.mdx` files in the repo
- Parse at build time with a Vite plugin
- No backend needed, version controlled

### 4. Analytics
**Current:** None  
**Needed:** Page views, visitor tracking

**Option A - Third-party (recommended):**
- Plausible, Umami, or Vercel Analytics
- Privacy-friendly, no cookie banners needed
- Drop-in script tag

**Option B - Custom:**
```sql
create table page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  user_agent text,
  country text,
  created_at timestamptz default now()
);
```

---

## Architecture Diagram

```
                    ┌─────────────────────────┐
                    │     CDN / Edge Cache     │
                    │   (Vercel / Cloudflare)  │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │    React SPA (Vite)     │
                    │  - Static pages         │
                    │  - Client-side routing  │
                    │  - Theme management     │
                    └────────────┬────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
    ┌─────────▼──────┐ ┌────────▼────────┐ ┌───────▼───────┐
    │ Edge Functions │ │   Database      │ │  Storage      │
    │                │ │  (PostgreSQL)   │ │  (S3/Supabase)│
    │ - Contact form │ │                 │ │               │
    │ - Booking API  │ │ - Submissions   │ │ - Resume PDF  │
    │ - Email notify │ │ - Bookings      │ │ - Blog images │
    │ - Blog API     │ │ - Blog posts    │ │ - Project     │
    │                │ │ - Analytics     │ │   screenshots │
    └────────────────┘ └─────────────────┘ └───────────────┘
              │
    ┌─────────▼──────────┐
    │  External Services │
    │                    │
    │ - Resend (email)   │
    │ - Cal.com (booking)│
    │ - Plausible (stats)│
    │ - Google Calendar  │
    └────────────────────┘
```

---

## Recommended Production Stack

| Layer | Tool | Why |
|-------|------|-----|
| **Hosting** | Vercel | Free tier, edge functions, great DX |
| **Database** | Supabase (PostgreSQL) | Free tier, auth built-in, real-time |
| **Email** | Resend | Simple API, 100 free emails/day |
| **Booking** | Cal.com embed | Free, handles everything |
| **Analytics** | Plausible or Umami | Privacy-first, lightweight |
| **Blog CMS** | MDX in repo or Sanity | Depends on update frequency |
| **Domain** | Cloudflare | Free DNS, SSL, DDoS protection |
| **Monitoring** | Sentry | Error tracking, free tier |

---

## Deployment Workflow

```
Developer pushes to main
  -> GitHub Actions / Vercel auto-deploy
  -> Build: vite build
  -> Deploy static assets to CDN
  -> Edge functions deploy automatically
  -> Database migrations run via Supabase CLI

Preview deployments on PRs (Vercel)
Production on main branch
```

### Environment Variables Needed
```env
# Database
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... # server-side only

# Email
RESEND_API_KEY=re_xxx

# Analytics (if self-hosted)
PLAUSIBLE_DOMAIN=idderfsalem.dev

# Optional
SENTRY_DSN=https://xxx@sentry.io/xxx
```

---

## Priority Roadmap

### Phase 1 - Quick Wins (1-2 days)
- [ ] Add Plausible/Umami analytics script tag
- [ ] Embed Cal.com widget on booking page
- [ ] Connect custom domain with Cloudflare DNS

### Phase 2 - Contact Form Backend (1 day)
- [ ] Set up Supabase project
- [ ] Create `contact_submissions` table
- [ ] Write edge function for form submission
- [ ] Integrate Resend for email notifications
- [ ] Update frontend to POST to edge function

### Phase 3 - Blog CMS (2-3 days)
- [ ] Choose CMS approach (MDX recommended for a dev portfolio)
- [ ] Migrate hardcoded posts to chosen format
- [ ] Add markdown rendering (react-markdown or MDX)
- [ ] Add syntax highlighting for code blocks

### Phase 4 - Polish (ongoing)
- [ ] Add Sentry error tracking
- [ ] Compress and optimize images (WebP/AVIF)
- [ ] Add sitemap generation at build time
- [ ] Implement proper OG image generation per page
- [ ] Add RSS feed for blog

---

## Security Checklist

- [ ] Rate limit contact form (5 submissions/hour per IP)
- [ ] Sanitize all user input server-side
- [ ] Use CAPTCHA or honeypot on contact form
- [ ] Keep service role keys server-side only
- [ ] Enable RLS on all database tables
- [ ] Set proper CORS headers on edge functions
- [ ] Add CSP headers via hosting config
- [ ] Validate email format server-side before sending

---

## Cost Estimate (Monthly)

| Service | Cost |
|---------|------|
| Vercel (Hobby) | $0 |
| Supabase (Free) | $0 |
| Resend (100/day) | $0 |
| Cal.com (Free) | $0 |
| Plausible | $9/mo or self-host free |
| Cloudflare DNS | $0 |
| Domain (.dev) | ~$12/year |
| **Total** | **~$1-10/mo** |

---

## Notes

- The current frontend is production-ready for a static portfolio. The above is only needed if you want dynamic features (form submissions, real bookings, blog management).
- For a developer portfolio, keeping the blog as MDX files in the repo is often the best approach - it's version controlled, requires no backend, and you write in your code editor.
- Cal.com embed is the fastest path to a working booking system with zero backend work.
