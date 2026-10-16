create policy admin_login_session_service_role_access
on private.admin_login_sessions
for all
to service_role
using (true)
with check (true);

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

  delete from private.admin_login_sessions where expires_at <= now();

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
