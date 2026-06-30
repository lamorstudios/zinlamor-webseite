-- =====================================================================
--  Row Level Security – Multi-Tenant-Absicherung
--
--  Grundregeln:
--   * Super-Admin (profiles.is_super_admin) darf alles.
--   * Merchant-User darf nur Daten SEINES Händlers sehen/ändern.
--   * Rolle 'owner'/'admin' darf Branding & Einstellungen ändern,
--     'staff' nur Stempel/Einlösungen schreiben.
--   * Öffentliche Kunden-Zugriffe (Karte ansehen) laufen NICHT über RLS,
--     sondern über serverseitige Routes mit Service-Role + Token-Check.
-- =====================================================================

-- ── Helper-Funktionen ────────────────────────────────────────────────
create or replace function public.is_super_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(
    (select is_super_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

-- Rolle des aktuellen Users für einen Händler (oder null).
create or replace function public.merchant_role_of(p_merchant uuid)
returns merchant_role language sql stable security definer set search_path = public as $$
  select role from public.merchant_users
  where merchant_id = p_merchant and user_id = auth.uid();
$$;

create or replace function public.is_merchant_member(p_merchant uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_super_admin()
      or exists (
        select 1 from public.merchant_users
        where merchant_id = p_merchant and user_id = auth.uid()
      );
$$;

-- Darf Einstellungen/Branding ändern (owner/admin oder Super-Admin)?
create or replace function public.can_manage_merchant(p_merchant uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_super_admin()
      or public.merchant_role_of(p_merchant) in ('owner', 'admin');
$$;

-- ── RLS aktivieren ───────────────────────────────────────────────────
alter table public.profiles       enable row level security;
alter table public.merchants      enable row level security;
alter table public.merchant_users enable row level security;
alter table public.branches       enable row level security;
alter table public.customers      enable row level security;
alter table public.loyalty_cards  enable row level security;
alter table public.rewards        enable row level security;
alter table public.stamps         enable row level security;
alter table public.redemptions    enable row level security;
alter table public.scans          enable row level security;
alter table public.wallet_passes  enable row level security;

-- ── profiles ─────────────────────────────────────────────────────────
drop policy if exists profiles_self_select on public.profiles;
create policy profiles_self_select on public.profiles for select
  using (id = auth.uid() or public.is_super_admin());

drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update on public.profiles for update
  using (id = auth.uid());

-- ── merchants ────────────────────────────────────────────────────────
drop policy if exists merchants_select on public.merchants;
create policy merchants_select on public.merchants for select
  using (public.is_merchant_member(id));

drop policy if exists merchants_insert on public.merchants;
create policy merchants_insert on public.merchants for insert
  with check (public.is_super_admin());

drop policy if exists merchants_update on public.merchants;
create policy merchants_update on public.merchants for update
  using (public.can_manage_merchant(id));

drop policy if exists merchants_delete on public.merchants;
create policy merchants_delete on public.merchants for delete
  using (public.is_super_admin());

-- ── merchant_users ───────────────────────────────────────────────────
drop policy if exists merchant_users_select on public.merchant_users;
create policy merchant_users_select on public.merchant_users for select
  using (user_id = auth.uid() or public.can_manage_merchant(merchant_id));

drop policy if exists merchant_users_write on public.merchant_users;
create policy merchant_users_write on public.merchant_users for all
  using (public.can_manage_merchant(merchant_id))
  with check (public.can_manage_merchant(merchant_id));

-- ── Generische Tenant-Policies (merchant_id-basiert) ─────────────────
-- branches, rewards: nur Verwaltung darf schreiben, Mitglieder dürfen lesen.
drop policy if exists branches_select on public.branches;
create policy branches_select on public.branches for select
  using (public.is_merchant_member(merchant_id));
drop policy if exists branches_write on public.branches;
create policy branches_write on public.branches for all
  using (public.can_manage_merchant(merchant_id))
  with check (public.can_manage_merchant(merchant_id));

drop policy if exists rewards_select on public.rewards;
create policy rewards_select on public.rewards for select
  using (public.is_merchant_member(merchant_id));
drop policy if exists rewards_write on public.rewards;
create policy rewards_write on public.rewards for all
  using (public.can_manage_merchant(merchant_id))
  with check (public.can_manage_merchant(merchant_id));

-- customers, loyalty_cards, stamps, redemptions, scans:
-- jedes Mitglied (auch staff) darf lesen + schreiben (Tagesgeschäft am Tresen).
do $$
declare t text;
begin
  foreach t in array array['customers','loyalty_cards','stamps','redemptions','scans','wallet_passes']
  loop
    execute format('drop policy if exists %I_select on public.%I;', t, t);
    execute format(
      'create policy %I_select on public.%I for select using (public.is_merchant_member(merchant_id));',
      t, t);
    execute format('drop policy if exists %I_write on public.%I;', t, t);
    execute format(
      'create policy %I_write on public.%I for all using (public.is_merchant_member(merchant_id)) with check (public.is_merchant_member(merchant_id));',
      t, t);
  end loop;
end $$;
