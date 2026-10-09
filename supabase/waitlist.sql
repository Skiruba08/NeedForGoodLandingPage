-- Need for Good: waitlist table for Supabase (Postgres)
--
-- Run this in the Supabase SQL editor BEFORE setting VITE_SUPABASE_URL and
-- VITE_SUPABASE_ANON_KEY. It lets anonymous visitors INSERT a sign-up and
-- nothing else: they cannot read, list, update or delete any entries.
--
-- Review this file before running it. Do not disable Row Level Security.

create table if not exists public.waitlist_signups (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 100),
  email       text not null check (
                char_length(email) between 3 and 254
                and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'
              ),
  organization text check (organization is null or char_length(organization) <= 150),
  role        text not null check (role in ('nonprofit', 'business', 'volunteer', 'updates'))
);

-- One entry per email address. The frontend treats a duplicate as a normal
-- success so the form cannot be used to check whether an email is on the list.
create unique index if not exists waitlist_signups_email_key
  on public.waitlist_signups (lower(email));

-- Row Level Security: required. With RLS on and only the policy below,
-- the anon role can insert rows but can never select, update or delete them.
alter table public.waitlist_signups enable row level security;

-- Start from zero privileges, then grant only what is needed.
revoke all on public.waitlist_signups from anon, authenticated;
grant insert (name, email, organization, role) on public.waitlist_signups to anon;

drop policy if exists "Anyone can join the waitlist" on public.waitlist_signups;
create policy "Anyone can join the waitlist"
  on public.waitlist_signups
  for insert
  to anon
  with check (true);  -- column CHECK constraints above enforce the shape of the data

-- Intentionally NO select / update / delete policies for anon or authenticated.
-- Read entries from the Supabase dashboard or a server-side job that uses the
-- service_role key. Never put the service_role key in this frontend.
