create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated, service_role;

create table if not exists private.admin_login_sessions (
  session_id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
alter table private.admin_login_sessions enable row level security;
revoke all on table private.admin_login_sessions from public, anon, authenticated;
grant select, insert, update on table private.admin_login_sessions to service_role;

create or replace function private.is_admin_login_verified()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select auth.uid() is not null
    and lower(coalesce(auth.jwt() ->> 'email', '')) = 'classicphoto495@gmail.com'
    and exists (
      select 1
      from private.admin_login_sessions s
      where s.user_id = auth.uid()
        and s.session_id = nullif(auth.jwt() ->> 'session_id', '')::uuid
        and s.expires_at > now()
    )
    and exists (
      select 1
      from jsonb_array_elements(coalesce(auth.jwt() -> 'amr', '[]'::jsonb)) as method_claim(value)
      where method_claim.value ->> 'method' = 'password'
    );
$$;
revoke all on function private.is_admin_login_verified() from public, anon;
grant execute on function private.is_admin_login_verified() to authenticated;

create or replace function public.is_admin_login_verified()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select private.is_admin_login_verified();
$$;
revoke all on function public.is_admin_login_verified() from public, anon;
grant execute on function public.is_admin_login_verified() to authenticated;

create or replace function public.register_admin_login_session(
  p_session_id uuid,
  p_user_id uuid,
  p_expires_at timestamptz
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if current_user <> 'service_role' then
    raise exception 'not authorized';
  end if;

  insert into private.admin_login_sessions (session_id, user_id, expires_at)
  select p_session_id, p_user_id, p_expires_at
  where exists (
    select 1 from auth.users u
    where u.id = p_user_id
      and lower(u.email) = 'classicphoto495@gmail.com'
      and u.email_confirmed_at is not null
  )
  on conflict (session_id) do update
    set expires_at = excluded.expires_at
    where private.admin_login_sessions.user_id = excluded.user_id;

  if not found then
    raise exception 'admin account not verified';
  end if;
end;
$$;
revoke all on function public.register_admin_login_session(uuid, uuid, timestamptz) from public, anon, authenticated;
grant execute on function public.register_admin_login_session(uuid, uuid, timestamptz) to service_role;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'packages',
    'package_categories',
    'gallery_items',
    'gallery_categories',
    'additional_services'
  ] loop
    execute format('drop policy if exists admin_2fa_insert_guard on public.%I', table_name);
    execute format('drop policy if exists admin_2fa_update_guard on public.%I', table_name);
    execute format('drop policy if exists admin_2fa_delete_guard on public.%I', table_name);
    execute format(
      'create policy admin_2fa_insert_guard on public.%I as restrictive for insert to authenticated with check (private.is_admin_login_verified())',
      table_name
    );
    execute format(
      'create policy admin_2fa_update_guard on public.%I as restrictive for update to authenticated using (private.is_admin_login_verified()) with check (private.is_admin_login_verified())',
      table_name
    );
    execute format(
      'create policy admin_2fa_delete_guard on public.%I as restrictive for delete to authenticated using (private.is_admin_login_verified())',
      table_name
    );
  end loop;
end
$$;

drop policy if exists admin_2fa_storage_insert_guard on storage.objects;
drop policy if exists admin_2fa_storage_update_guard on storage.objects;
drop policy if exists admin_2fa_storage_delete_guard on storage.objects;
create policy admin_2fa_storage_insert_guard on storage.objects as restrictive
  for insert to authenticated
  with check (bucket_id <> 'beclassic-gallery' or private.is_admin_login_verified());
create policy admin_2fa_storage_update_guard on storage.objects as restrictive
  for update to authenticated
  using (bucket_id <> 'beclassic-gallery' or private.is_admin_login_verified())
  with check (bucket_id <> 'beclassic-gallery' or private.is_admin_login_verified());
create policy admin_2fa_storage_delete_guard on storage.objects as restrictive
  for delete to authenticated
  using (bucket_id <> 'beclassic-gallery' or private.is_admin_login_verified());
