create table if not exists public.bookings (
  id text primary key,
  name text not null,
  email text not null,
  phone text not null,
  date date not null,
  time time not null,
  guests integer not null check (guests between 1 and 10),
  notes text not null default '',
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
  created_at timestamptz not null default now()
);
alter table public.bookings enable row level security;
-- No public RLS policies: only the server-side service role can insert.
create index if not exists bookings_date_time_idx on public.bookings(date,time);
