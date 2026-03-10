# Production Architecture - idderfsalem.dev

A comprehensive guide to taking this portfolio from a static frontend to a fully production-ready application.

---

## Table of Contents

1. [Current State](#current-state)
2. [Target Architecture](#target-architecture)
3. [Backend Services Needed](#backend-services-needed)
4. [Edge Functions - Full Implementation](#edge-functions---full-implementation)
5. [Database Schema](#database-schema)
6. [Google Calendar + Meet Integration](#google-calendar--meet-integration)
7. [Email System](#email-system)
8. [Analytics](#analytics)
9. [Security](#security)
10. [Deployment](#deployment)
11. [Cost Breakdown](#cost-breakdown)
12. [Roadmap](#roadmap)
13. [Frontend Audit Log](#frontend-audit-log)

---

## Current State

**Stack:** React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion  
**Font:** Larsseit (custom, 11 weights loaded via @font-face)  
**Design:** Premium minimalist, matte red primary (#ea3b3b / HSL 0 72% 51-55%), 110% zoom, dark mode default  
**Hosting:** Static SPA (Lovable preview)  
**Backend:** None  
**Auth:** None  
**Database:** None  

### Frontend File Structure
```
src/
├── assets/               # Profile photo, project screenshots
├── components/
│   ├── AnnouncementBanner.tsx   # Dismissable top banner (sessionStorage)
│   ├── Footer.tsx               # 3-column footer with nav + socials
│   ├── Layout.tsx               # Wraps all routes: Navbar + Outlet + Footer
│   ├── Navbar.tsx               # Sticky navbar, pill nav, red CTA, mobile menu
│   ├── PageProgressBar.tsx      # Route-change progress animation
│   ├── PageTransition.tsx       # Framer Motion page wrapper
│   ├── ReadingProgressBar.tsx   # Scroll-based reading progress (blog posts)
│   ├── ScrollReveal.tsx         # IntersectionObserver reveal animation
│   ├── ScrollToTop.tsx          # Scroll reset on route change
│   ├── ScrollToTopButton.tsx    # Floating scroll-to-top button
│   ├── TechMarquee.tsx          # Auto-scrolling tech logo strip
│   ├── ThemeToggle.tsx          # Dark/light toggle (localStorage)
│   └── ui/                      # 50+ shadcn/ui components
├── data/
│   └── blogPosts.ts             # Hardcoded blog content (3 posts)
├── hooks/
│   ├── use-mobile.tsx           # Mobile breakpoint detection
│   ├── use-scroll-animation.ts  # IntersectionObserver hook
│   ├── use-toast.ts             # Toast notifications
│   ├── usePageTitle.ts          # Document title setter
│   └── useSEO.ts                # Full SEO injection (meta, OG, JSON-LD, canonical)
├── pages/
│   ├── Index.tsx        # Homepage: hero, stats, tech marquee, projects, testimonials, blog preview, CTA
│   ├── Projects.tsx     # Project listing with screenshots
│   ├── ProjectDetail.tsx # Individual project case study (/projects/:slug)
│   ├── Experience.tsx   # Work history + certifications
│   ├── Skills.tsx       # Tech skills grid
│   ├── Blog.tsx         # Blog listing
│   ├── BlogPost.tsx     # Individual blog post with share buttons + reading bar
│   ├── Booking.tsx      # Cal-style booking UI (date picker, time slots, details form)
│   ├── Contact.tsx      # Contact form (Zod validation) + social links
│   ├── Resume.tsx       # Full resume page with download link
│   └── NotFound.tsx     # 404 with navigation suggestions
└── index.css            # Larsseit fonts, HSL design tokens, utility classes
```

### What Works (Frontend Only)
- [x] 10 pages with client-side routing (react-router-dom v6)
- [x] Responsive design with mobile-first approach
- [x] Dark mode default with localStorage persistence
- [x] SEO: JSON-LD structured data, Open Graph, Twitter Cards, canonical URLs
- [x] Accessibility: skip-to-content, ARIA labels, semantic HTML, keyboard navigation
- [x] Animations: ScrollReveal (IntersectionObserver), page transitions (Framer Motion), marquee
- [x] Contact form with Zod client-side validation (name, email, message)
- [x] Blog with reading progress bar, share buttons (X, LinkedIn, copy link)
- [x] Booking UI with calendar, time slots, duration picker (UI only)
- [x] Announcement banner (sessionStorage dismiss)
- [x] Scroll-to-top button, page progress bar on route changes

### What Doesn't Work Yet
- [ ] Contact form just opens mailto: - submissions not stored
- [ ] Booking page is UI-only - no real calendar integration
- [ ] Blog content is hardcoded in a TypeScript array
- [ ] No analytics or error tracking
- [ ] No admin panel to manage content

---

## Target Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                       │
│                                                          │
│  React SPA (Vite)                                        │
│  ├── Static pages (pre-built HTML/JS/CSS)                │
│  ├── Contact form → POST /functions/v1/contact           │
│  ├── Booking form → POST /functions/v1/booking           │
│  ├── Blog data → fetched from DB or static               │
│  └── Theme/state → localStorage                          │
└──────────────────┬───────────────────────────────────────┘
                   │ HTTPS
┌──────────────────▼───────────────────────────────────────┐
│              LOVABLE CLOUD / SUPABASE                     │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Edge Functions (Deno runtime)                      │ │
│  │                                                     │ │
│  │  supabase/functions/                                │ │
│  │  ├── contact/index.ts                               │ │
│  │  │   ├── Validate input (Zod)                       │ │
│  │  │   ├── Rate limit (5/hr per IP)                   │ │
│  │  │   ├── Insert into contact_submissions            │ │
│  │  │   ├── Send notification email (Lovable Email)    │ │
│  │  │   └── Return { success: true }                   │ │
│  │  │                                                  │ │
│  │  ├── booking/index.ts                               │ │
│  │  │   ├── Validate input                             │ │
│  │  │   ├── Check availability (query DB)              │ │
│  │  │   ├── Create Google Calendar event + Meet link   │ │
│  │  │   ├── Insert into bookings table                 │ │
│  │  │   ├── Send confirmation emails to both parties   │ │
│  │  │   └── Return { success: true, meetLink }         │ │
│  │  │                                                  │ │
│  │  └── config.toml                                    │ │
│  │      [functions.contact]                            │ │
│  │      verify_jwt = false                             │ │
│  │      [functions.booking]                            │ │
│  │      verify_jwt = false                             │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  PostgreSQL Database                                │ │
│  │                                                     │ │
│  │  Tables:                                            │ │
│  │  ├── contact_submissions (name, email, message)     │ │
│  │  ├── bookings (name, email, date, time, duration)   │ │
│  │  ├── availability (day_of_week, start/end time)     │ │
│  │  └── page_views (path, referrer, timestamp)         │ │
│  │                                                     │ │
│  │  RLS: All tables have policies (public insert,      │ │
│  │       admin-only read via service_role)              │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Secrets (environment variables)                    │ │
│  │                                                     │ │
│  │  GOOGLE_SERVICE_ACCOUNT_KEY (JSON)                  │ │
│  │  GOOGLE_CALENDAR_ID                                 │ │
│  │  NOTIFICATION_EMAIL (idderfsalem98@gmail.com)       │ │
│  │  LOVABLE_API_KEY (auto-provisioned)                 │ │
│  └─────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────────────┐
│              EXTERNAL SERVICES                            │
│                                                          │
│  Google Calendar API (free, 1M queries/day)              │
│  ├── Create calendar events with Google Meet             │
│  ├── Check availability (freeBusy query)                 │
│  └── Uses Service Account (no user OAuth needed)         │
│                                                          │
│  Plausible Analytics ($9/mo or self-host)                │
│  ├── Privacy-first, no cookie banner needed              │
│  └── Drop-in <script> tag                                │
│                                                          │
│  Sentry (free tier)                                      │
│  ├── Error tracking + performance monitoring             │
│  └── Drop-in SDK                                         │
│                                                          │
│  Cloudflare (free)                                       │
│  ├── DNS management                                      │
│  ├── SSL/TLS certificates                                │
│  ├── DDoS protection                                     │
│  └── Edge caching for static assets                      │
└──────────────────────────────────────────────────────────┘
```

---

## Backend Services Needed

### 1. Contact Form Submissions

**Problem:** Form opens mailto: link. No record of submissions. User might not have email client configured.

**Solution:** Edge function that validates, stores, and sends email notification.

**User flow:**
```
1. User fills form (name, email, message)
2. Client-side: Zod validation (already implemented)
3. Client POSTs to /functions/v1/contact
4. Edge function:
   a. Validates input server-side (Zod again)
   b. Checks rate limit (5 submissions/hour per IP via DB query)
   c. Inserts into contact_submissions table
   d. Sends email notification to idderfsalem98@gmail.com
   e. Returns { success: true }
5. Frontend shows success state (already implemented)
```

**Frontend change needed in `src/pages/Contact.tsx`:**
```typescript
// Replace the mailto: logic in handleSubmit with:
const response = await supabase.functions.invoke('contact', {
  body: { name: result.data.name, email: result.data.email, message: result.data.message }
});

if (response.error) {
  toast.error("Failed to send message. Please try again.");
  return;
}

toast.success("Message sent successfully!");
setSubmitted(true);
```

### 2. Booking System with Google Meet

**Problem:** Booking page is UI-only. No calendar check, no Meet link, no confirmation email.

**Solution:** Edge function that creates a Google Calendar event with auto-generated Meet link.

**User flow:**
```
1. User selects date, time slot, duration
2. User enters name, email, notes
3. Client POSTs to /functions/v1/booking
4. Edge function:
   a. Validates input
   b. Queries Google Calendar freeBusy API to verify slot is available
   c. Creates Google Calendar event with:
      - Title: "Project Discussion - {name}"
      - Attendees: [user email, idderfsalem98@gmail.com]
      - conferenceData: { createRequest: { requestId: uuid } }  // auto-generates Meet link
   d. Inserts into bookings table with meet_link
   e. Sends confirmation email to both parties with Meet link
   f. Returns { success: true, meetLink: "https://meet.google.com/xxx" }
5. Frontend shows confirmation with Meet link
```

**Frontend change needed in `src/pages/Booking.tsx`:**
```typescript
// Replace handleConfirm with:
const handleConfirm = async () => {
  setLoading(true);
  const { data, error } = await supabase.functions.invoke('booking', {
    body: {
      name,
      email,
      notes,
      date: format(selectedDate!, 'yyyy-MM-dd'),
      time: selectedTime,
      duration: durations[selectedDuration].minutes,
    }
  });

  if (error) {
    toast.error("Failed to book. Please try again.");
    setLoading(false);
    return;
  }

  setMeetLink(data.meetLink);
  toast.success("Booking confirmed!");
  setStep("confirmed");
  setLoading(false);
};
```

### 3. Blog (Keep Static for Now)

**Recommendation:** Keep blog as hardcoded TypeScript for now. Reasons:
- Only 3 posts, updated rarely
- No need for a CMS or database
- Version controlled in Git
- Zero latency (no API calls)
- Can migrate to MDX or a headless CMS later when post count grows (10+)

**Future migration path when ready:**
```
Option A: MDX files in repo (best for dev portfolios)
  - Install @mdx-js/rollup + remark/rehype plugins
  - Move content to /content/blog/*.mdx
  - Parse at build time, zero runtime cost
  - Syntax highlighting with rehype-pretty-code

Option B: Database-driven (best if non-technical editor needed)
  - Create blog_posts table
  - Build admin panel or use Supabase dashboard
  - Fetch posts via supabase client on page load
  - Add markdown rendering with react-markdown
```

---

## Edge Functions - Full Implementation

### Contact Edge Function

**File: `supabase/functions/contact/index.ts`**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { name, email, message, website } = await req.json();

    // Honeypot: if "website" field is filled, it's a bot
    if (website) {
      // Return success to not tip off the bot
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Server-side validation
    if (!name?.trim() || name.length > 100)
      throw new Error("Invalid name");
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new Error("Invalid email");
    if (!message?.trim() || message.length > 2000)
      throw new Error("Invalid message");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Rate limit: max 5 per hour per IP
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
    const { count } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", ip)
      .gte("created_at", oneHourAgo);

    if ((count || 0) >= 5) {
      return new Response(
        JSON.stringify({ error: "Too many submissions. Try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert submission
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        ip_address: ip,
      });

    if (insertError) throw insertError;

    // Send email notification via Resend (add RESEND_API_KEY to secrets)
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio <noreply@idderfsalem.dev>",
          to: Deno.env.get("NOTIFICATION_EMAIL") || "idderfsalem98@gmail.com",
          subject: `New Contact: ${name.trim()}`,
          html: `<h2>New message from ${name.trim()}</h2><p><strong>Email:</strong> ${email.trim()}</p><p><strong>Message:</strong></p><p>${message.trim().replace(/\n/g, "<br>")}</p>`,
        }),
      });
    }
    console.log(`New contact from ${name} (${email}): ${message.slice(0, 100)}`);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Contact error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
```

### Booking Edge Function

**File: `supabase/functions/booking/index.ts`**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { name, email, notes, date, time, duration } = await req.json();

    // Validate
    if (!name?.trim()) throw new Error("Name required");
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new Error("Valid email required");
    if (!date || !time || !duration) throw new Error("Date/time/duration required");
    if (![15, 30, 45, 60].includes(duration)) throw new Error("Invalid duration");

    // Parse datetime in UTC+8
    const startDateTime = new Date(`${date}T${time}:00+08:00`);
    const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

    // Verify it's in the future
    if (startDateTime <= new Date()) throw new Error("Cannot book in the past");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check DB availability table (day_of_week + time range)
    const dayOfWeek = startDateTime.getDay(); // 0=Sun
    const timeStr = time + ":00"; // ensure HH:MM:SS
    const { data: availSlots } = await supabase
      .from("availability")
      .select("*")
      .eq("day_of_week", dayOfWeek)
      .eq("is_active", true)
      .lte("start_time", timeStr)
      .gte("end_time", timeStr);

    if (!availSlots || availSlots.length === 0) {
      return new Response(
        JSON.stringify({ error: "This time slot is not within available hours." }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check for existing bookings at this time
    const { data: existingBookings } = await supabase
      .from("bookings")
      .select("id")
      .eq("date", date)
      .eq("time", time)
      .eq("status", "confirmed");

    if (existingBookings && existingBookings.length > 0) {
      return new Response(
        JSON.stringify({ error: "This time slot is already booked." }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Google Calendar: Create event with Meet link
    // Google Calendar integration (graceful fallback if unavailable)
    let meetLink: string | null = null;
    let googleEventId: string | null = null;

    const serviceAccountKeyRaw = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");
    const calendarId = Deno.env.get("GOOGLE_CALENDAR_ID");

    if (serviceAccountKeyRaw && calendarId) {
      try {
        const serviceAccountKey = JSON.parse(serviceAccountKeyRaw);
        const token = await getGoogleAccessToken(serviceAccountKey);

        // Check availability (freeBusy)
        const freeBusyResp = await fetch(
          "https://www.googleapis.com/calendar/v3/freeBusy",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              timeMin: startDateTime.toISOString(),
              timeMax: endDateTime.toISOString(),
              items: [{ id: calendarId }],
            }),
          }
        );
        const freeBusy = await freeBusyResp.json();
        const busy = freeBusy.calendars?.[calendarId]?.busy || [];
        if (busy.length > 0) {
          return new Response(
            JSON.stringify({ error: "This time slot is no longer available." }),
            { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Create event with Google Meet
        const eventResp = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              summary: `Project Discussion - ${name.trim()}`,
              description: `Booked via idderfsalem.dev\n\nName: ${name}\nEmail: ${email}\n\nNotes: ${notes || "None"}`,
              start: { dateTime: startDateTime.toISOString(), timeZone: "Asia/Manila" },
              end: { dateTime: endDateTime.toISOString(), timeZone: "Asia/Manila" },
              attendees: [
                { email: email.trim() },
                { email: Deno.env.get("NOTIFICATION_EMAIL") || "idderfsalem98@gmail.com" },
              ],
              conferenceData: {
                createRequest: {
                  requestId: crypto.randomUUID(),
                  conferenceSolutionKey: { type: "hangoutsMeet" },
                },
              },
              reminders: {
                useDefault: false,
                overrides: [
                  { method: "email", minutes: 60 },
                  { method: "popup", minutes: 15 },
                ],
              },
            }),
          }
        );

        const event = await eventResp.json();
        if (eventResp.ok) {
          meetLink = event.conferenceData?.entryPoints?.find(
            (e: any) => e.entryPointType === "video"
          )?.uri || event.hangoutLink || null;
          googleEventId = event.id;
        } else {
          console.error("Google Calendar error:", JSON.stringify(event));
          // Continue without Meet link — booking still saved to DB
        }
      } catch (gcalError) {
        console.error("Google Calendar integration failed:", gcalError);
        // Graceful fallback: booking is stored without Meet link
      }
    } else {
      console.warn("Google Calendar not configured — booking saved to DB only");
    }

    // Store in database
    await supabase.from("bookings").insert({
      name: name.trim(),
      email: email.trim(),
      notes: notes?.trim() || null,
      date,
      time,
      duration_minutes: duration,
      meet_link: meetLink,
      google_event_id: googleEventId,
      status: "confirmed",
    });

    return new Response(
      JSON.stringify({ success: true, meetLink }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Booking error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Helper: Generate Google access token from service account JWT
async function getGoogleAccessToken(serviceAccount: any): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
  const signInput = `${headerB64}.${payloadB64}`;

  // Import the private key
  const pemContents = serviceAccount.private_key
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\n/g, "");
  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, encoder.encode(signInput));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");

  const jwt = `${signInput}.${sigB64}`;

  const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenResp.json();
  if (!tokenData.access_token) throw new Error("Failed to get Google access token");
  return tokenData.access_token;
}
```

---

## Database Schema

```sql
-- Contact form submissions
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 100),
  email text not null check (char_length(email) <= 255),
  message text not null check (char_length(message) <= 2000),
  ip_address text,
  read boolean default false,
  created_at timestamptz default now()
);

-- RLS: Anyone can insert, only service_role can read
alter table contact_submissions enable row level security;

create policy "Anyone can submit contact form"
  on contact_submissions for insert
  with check (true);

-- No select policy = only service_role can read (via edge functions)

-- Bookings
create table bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 100),
  email text not null check (char_length(email) <= 255),
  notes text check (char_length(notes) <= 1000),
  date date not null,
  time time not null,
  duration_minutes int not null check (duration_minutes in (15, 30, 45, 60)),
  meet_link text,
  google_event_id text,
  status text default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed')),
  created_at timestamptz default now()
);

alter table bookings enable row level security;

create policy "Anyone can create bookings"
  on bookings for insert
  with check (true);

-- Availability (optional - for custom availability management)
create table availability (
  id uuid primary key default gen_random_uuid(),
  day_of_week int not null check (day_of_week between 0 and 6), -- 0=Sun
  start_time time not null,
  end_time time not null,
  is_active boolean default true,
  constraint valid_time_range check (start_time < end_time)
);

alter table availability enable row level security;

-- Anyone can read availability (to show available slots)
create policy "Anyone can read availability"
  on availability for select
  using (true);

-- Insert default availability (Mon-Fri, 9AM-5PM Manila time)
insert into availability (day_of_week, start_time, end_time) values
  (1, '09:00', '17:00'),
  (2, '09:00', '17:00'),
  (3, '09:00', '17:00'),
  (4, '09:00', '17:00'),
  (5, '09:00', '17:00');

-- Page views (optional analytics)
create table page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  country text,
  created_at timestamptz default now()
);

alter table page_views enable row level security;

create policy "Anyone can insert page views"
  on page_views for insert
  with check (true);
```

---

## Google Calendar + Meet Integration

### Setup Steps

1. **Create Google Cloud Project**
   - Go to https://console.cloud.google.com
   - Create new project: "idderfsalem-portfolio"
   - Enable "Google Calendar API"

2. **Create Service Account**
   - IAM & Admin > Service Accounts > Create
   - Name: "portfolio-booking"
   - No roles needed (calendar access is shared via calendar settings)
   - Create key > JSON > Download

3. **Share Your Google Calendar**
   - Open Google Calendar > Settings > your calendar
   - "Share with specific people" > Add the service account email
   - Permission: "Make changes to events"
   - Copy the Calendar ID (usually your email or a long string)

4. **Store Credentials as Secrets**
   - `GOOGLE_SERVICE_ACCOUNT_KEY` = entire JSON file contents
   - `GOOGLE_CALENDAR_ID` = your calendar ID
   - `NOTIFICATION_EMAIL` = idderfsalem98@gmail.com

### How Meet Links Work
- When creating a Calendar event via API, include `conferenceDataVersion=1` in the URL
- Include `conferenceData.createRequest` in the event body
- Google auto-generates a Meet link and attaches it to the event
- The Meet link is returned in the response under `conferenceData.entryPoints`
- Both attendees get email invites with the Meet link automatically

### Cost
- Google Calendar API: **Free** (1,000,000 queries/day quota)
- Google Meet: **Free** with any Google account (1-hour limit for free accounts, 24h for Workspace)

---

## Email System

### Recommended: Resend (free tier: 3,000 emails/mo)

**Setup:**
1. Sign up at https://resend.com
2. Verify your domain (idderfsalem.dev) or use their shared domain for testing
3. Create an API key
4. Store as `RESEND_API_KEY` in Lovable Cloud secrets

**Why Resend:**
- Free tier covers portfolio needs (3,000 emails/month)
- Simple REST API — single `fetch()` call, no SDK needed
- Works perfectly in Deno edge functions
- Deliverability is excellent (proper SPF/DKIM)

**Implementation:** Already included in the contact edge function above. The booking system uses Google Calendar's built-in email invites — no additional email service needed for that.

**Alternative: Console logging only (zero-cost)**
- Edge function logs submissions to console
- Check submissions via Cloud View > Edge Function Logs
- Simplest approach if you don't need instant email alerts

---

## Analytics

### Recommended: Plausible Analytics

**Setup (2 minutes):**
1. Sign up at https://plausible.io ($9/mo) or self-host for free
2. Add your domain
3. Add script tag to `index.html`:

```html
<script defer data-domain="idderfsalem.dev" src="https://plausible.io/js/script.js"></script>
```

**Why Plausible:**
- Privacy-first (no cookies, no GDPR banner needed)
- Lightweight (< 1KB script)
- Beautiful dashboard out of the box
- Tracks: page views, referrers, countries, devices, goals
- Can track custom events (contact form submit, booking complete)

### Alternative: Umami (free, self-hosted)
- Self-host on Vercel/Railway for $0
- Same privacy benefits
- Requires managing your own instance

---

## Security

### Edge Function Security
- [x] CORS headers on all edge functions
- [ ] Rate limiting on contact form (5/hr per IP)
- [ ] Server-side input validation (Zod)
- [ ] No raw SQL - use Supabase client only
- [ ] Service role key never exposed to client

### Database Security
- [ ] RLS enabled on all tables
- [ ] Public can only INSERT (contact, bookings)
- [ ] Only service_role can SELECT (via edge functions)
- [ ] Input length constraints via CHECK constraints
- [ ] No sensitive data in client-accessible queries

### Infrastructure Security
- [ ] Custom domain with Cloudflare (free SSL, DDoS protection)
- [ ] CSP headers via hosting config
- [ ] Secrets stored in Lovable Cloud / Supabase secrets (never in code)
- [ ] Google service account key stored as a secret
- [ ] No hardcoded API keys anywhere in the codebase

### Content Security
- [ ] Contact form has honeypot field (hidden `website` input — bots fill it, humans don't)
- [ ] Booking edge function checks `availability` table before accepting
- [ ] Booking edge function checks for duplicate bookings at same slot
- [ ] Booking form validates dates are in the future
- [ ] All user input sanitized before database insertion
- [ ] Email validation both client and server side
- [ ] Duration validated against allowed values (15/30/45/60)

### Frontend Honeypot Implementation
```tsx
{/* Hidden honeypot field — invisible to humans, bots fill it */}
<input
  type="text"
  name="website"
  value={website}
  onChange={(e) => setWebsite(e.target.value)}
  className="absolute opacity-0 pointer-events-none h-0 w-0"
  tabIndex={-1}
  autoComplete="off"
/>
```

---

## Deployment

### Current (Lovable)
```
Edit in Lovable → Preview → Publish
- Frontend: Click "Publish" to deploy
- Backend (edge functions, DB): Deploy automatically
- Custom domain: Settings > Domains
```

### Alternative (GitHub + Vercel)
```
1. Connect GitHub repo in Lovable settings
2. Connect repo to Vercel
3. Set environment variables in Vercel dashboard
4. Push to main → auto-deploy

Build command: npm run build
Output directory: dist
Node version: 18+
```

### Environment Variables

**Client-side (VITE_ prefix, safe to expose):**
```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<supabase-anon-key>
```

**Server-side (edge functions only, never exposed):**
```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<supabase-service-role-key>
GOOGLE_SERVICE_ACCOUNT_KEY=<minified-service-account-json>
GOOGLE_CALENDAR_ID=idderfsalem98@gmail.com
NOTIFICATION_EMAIL=idderfsalem98@gmail.com
RESEND_API_KEY=<resend-api-key>
LOVABLE_API_KEY=auto-provisioned
```

---

## Cost Breakdown

| Service | Monthly Cost | What You Get |
|---------|-------------|--------------|
| Lovable Cloud (free tier) | $0 | Database, edge functions, auth, storage |
| Google Calendar API | $0 | 1M queries/day, Meet links included |
| Google Meet | $0 | Free with Google account |
| Plausible Analytics | $9 | Privacy-first analytics dashboard |
| Cloudflare DNS | $0 | DNS, SSL, DDoS, edge caching |
| Domain (.dev) | ~$1/mo ($12/yr) | Custom domain |
| Sentry (free tier) | $0 | Error tracking, 5K events/mo |
| **Total** | **~$10/mo** | Full production stack |

### Without Plausible (free analytics alternative)
| Using Umami (self-hosted on Vercel) | $0 |
| **Total** | **~$1/mo** (domain only) |

---

## Roadmap

### Phase 1 - Backend Foundation (Day 1)
- [ ] Enable Lovable Cloud
- [ ] Create database tables (contact_submissions, bookings, availability)
- [ ] Deploy contact edge function
- [ ] Update Contact.tsx to POST to edge function instead of mailto:
- [ ] Test contact form end-to-end

### Phase 2 - Google Meet Booking (Day 2)
- [ ] Create Google Cloud project + enable Calendar API
- [ ] Create service account + share calendar
- [ ] Store secrets (GOOGLE_SERVICE_ACCOUNT_KEY, GOOGLE_CALENDAR_ID)
- [ ] Deploy booking edge function
- [ ] Update Booking.tsx to POST to edge function
- [ ] Show Meet link in confirmation screen
- [ ] Test booking flow end-to-end

### Phase 3 - Analytics + Monitoring (Day 3)
- [ ] Add Plausible/Umami script tag to index.html
- [ ] Set up Sentry for error tracking
- [ ] Add custom event tracking (form submit, booking complete)

### Phase 4 - Domain + Polish (Day 4)
- [ ] Purchase/connect custom domain (idderfsalem.dev)
- [ ] Configure Cloudflare DNS
- [ ] Compress project screenshots to WebP
- [ ] Add dynamic OG images per page
- [ ] Add RSS feed for blog (/rss.xml)
- [ ] Final cross-browser + mobile testing

---

## Frontend Audit Log

### Completed (Frontend)
- [x] Tighten section spacing across all pages (mb-14 -> mb-10)
- [x] Change "Book a Call" navbar button from black to red (bg-primary)
- [x] Change "Cal Video" label to "Google Meet" on booking page
- [x] Add testimonials section to homepage (3 quotes)
- [x] Add contact form with Zod validation + noValidate
- [x] Add reading progress bar on blog posts
- [x] Add share buttons (X, LinkedIn, copy link) on blog posts
- [x] Remove all em dashes from content
- [x] Rewrite blog posts to sound human-written
- [x] Default to dark mode (blocking script in index.html)
- [x] Replace emoji in 404 page with Lucide Search icon
- [x] Fix navbar active state for nested routes (/projects/:slug highlights Projects)
- [x] Remove dead navRef code from Navbar
- [x] Animated CTA glow on homepage

### Remaining (Needs Backend)
- [ ] Contact form: store submissions in database
- [ ] Contact form: send email notifications
- [ ] Booking: integrate Google Calendar API
- [ ] Booking: generate Google Meet links
- [ ] Booking: send confirmation emails
- [ ] Analytics: add tracking script
- [ ] Monitoring: add error tracking
- [ ] Images: compress to WebP/AVIF
- [ ] SEO: dynamic OG images
- [ ] SEO: RSS feed
- [ ] Branded favicon (red accent)
