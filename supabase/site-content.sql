create table if not exists public.site_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content
for select
using (true);

drop policy if exists "Admin can insert site content" on public.site_content;
create policy "Admin can insert site content"
on public.site_content
for insert
to authenticated
with check (lower((select auth.jwt() ->> 'email')) = 'fjolla.rarchitects@gmail.com');

drop policy if exists "Admin can update site content" on public.site_content;
create policy "Admin can update site content"
on public.site_content
for update
to authenticated
using (lower((select auth.jwt() ->> 'email')) = 'fjolla.rarchitects@gmail.com')
with check (lower((select auth.jwt() ->> 'email')) = 'fjolla.rarchitects@gmail.com');
