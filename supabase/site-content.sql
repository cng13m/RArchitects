create table if not exists public.site_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

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

drop policy if exists "Public can read site images" on storage.objects;
create policy "Public can read site images"
on storage.objects
for select
using (bucket_id = 'site-images');

drop policy if exists "Admin can upload site images" on storage.objects;
create policy "Admin can upload site images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'site-images'
  and lower((select auth.jwt() ->> 'email')) = 'fjolla.rarchitects@gmail.com'
);

drop policy if exists "Admin can update site images" on storage.objects;
create policy "Admin can update site images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'site-images'
  and lower((select auth.jwt() ->> 'email')) = 'fjolla.rarchitects@gmail.com'
)
with check (
  bucket_id = 'site-images'
  and lower((select auth.jwt() ->> 'email')) = 'fjolla.rarchitects@gmail.com'
);
