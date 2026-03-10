create extension if not exists pgcrypto;

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 100),
  email text not null check (char_length(email) <= 255),
  message text not null check (char_length(message) <= 2000),
  ip_address text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table contact_submissions enable row level security;

drop policy if exists "Anyone can submit contact form" on contact_submissions;
create policy "Anyone can submit contact form"
  on contact_submissions for insert
  with check (true);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 100),
  email text not null check (char_length(email) <= 255),
  notes text check (char_length(notes) <= 1000),
  ip_address text,
  date date not null,
  time time not null,
  duration_minutes int not null check (duration_minutes in (15, 30, 45, 60)),
  meet_link text,
  google_event_id text,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now()
);

alter table bookings enable row level security;

drop policy if exists "Anyone can create bookings" on bookings;
create policy "Anyone can create bookings"
  on bookings for insert
  with check (true);

create table if not exists availability (
  id uuid primary key default gen_random_uuid(),
  day_of_week int not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint valid_time_range check (start_time < end_time)
);

alter table availability enable row level security;

drop policy if exists "Anyone can read availability" on availability;
create policy "Anyone can read availability"
  on availability for select
  using (true);

insert into availability (day_of_week, start_time, end_time)
select *
from (
  values
    (1, '09:00'::time, '17:00'::time),
    (2, '09:00'::time, '17:00'::time),
    (3, '09:00'::time, '17:00'::time),
    (4, '09:00'::time, '17:00'::time),
    (5, '09:00'::time, '17:00'::time)
) as seed(day_of_week, start_time, end_time)
where not exists (select 1 from availability);

create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  country text,
  created_at timestamptz not null default now()
);

alter table page_views enable row level security;

drop policy if exists "Anyone can insert page views" on page_views;
create policy "Anyone can insert page views"
  on page_views for insert
  with check (true);