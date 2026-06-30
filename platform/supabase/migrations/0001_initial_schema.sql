-- =====================================================================
--  White-Label Loyalty Platform – Initiales Schema
--  Phase 1: Profiles, Merchants, Merchant-Users, Branding, Stempel-Regeln
--           + Tabellen-Gerüst für Phase 2/3/6 (customers, cards, stamps …)
--
--  Multi-Tenant-Prinzip: fast jede Tabelle trägt merchant_id.
--  Zugriff wird per Row Level Security (siehe 0002) erzwungen.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ── Enums ────────────────────────────────────────────────────────────
do $$ begin
  create type merchant_role as enum ('owner', 'admin', 'staff');
exception when duplicate_object then null; end $$;

do $$ begin
  create type scan_type as enum ('stamp', 'redeem', 'view');
exception when duplicate_object then null; end $$;

do $$ begin
  create type wallet_platform as enum ('apple', 'google');
exception when duplicate_object then null; end $$;

-- ── profiles ─────────────────────────────────────────────────────────
-- 1:1 zu auth.users. Trägt das Super-Admin-Flag.
create table if not exists public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  full_name     text,
  is_super_admin boolean not null default false,
  created_at    timestamptz not null default now()
);

-- Profil automatisch anlegen, wenn ein neuer Auth-User entsteht.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── merchants ────────────────────────────────────────────────────────
-- Ein Eintrag = ein Händler/Tenant. Enthält das komplette Branding,
-- damit nichts im Code hartcodiert werden muss.
create table if not exists public.merchants (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique
                      check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name              text not null,
  logo_url          text,
  -- Branding (White-Label)
  primary_color     text not null default '#4f46e5',
  secondary_color   text not null default '#6366f1',
  background_color  text not null default '#0b1020',
  card_color        text not null default '#111827',
  text_color        text not null default '#f9fafb',
  -- Stempelkarten-Regeln
  stamps_required   int  not null default 10 check (stamps_required between 1 and 100),
  reward_description text not null default 'Ein Gratis-Produkt',
  welcome_text      text,
  -- Status / Verwaltung
  active            boolean not null default true,
  settings          jsonb not null default '{}'::jsonb,  -- Erweiterbarkeit
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists merchants_slug_idx on public.merchants (slug);

-- ── merchant_users ───────────────────────────────────────────────────
-- Verknüpft Auth-User mit einem Händler + Rolle.
-- Rolle 'staff' deckt die "Mitarbeiter" (employees) ab.
create table if not exists public.merchant_users (
  id          uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references public.merchants (id) on delete cascade,
  user_id     uuid not null references auth.users (id) on delete cascade,
  role        merchant_role not null default 'staff',
  created_at  timestamptz not null default now(),
  unique (merchant_id, user_id)
);

create index if not exists merchant_users_user_idx on public.merchant_users (user_id);
create index if not exists merchant_users_merchant_idx on public.merchant_users (merchant_id);

-- ── branches (optional Filialen) ─────────────────────────────────────
create table if not exists public.branches (
  id          uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references public.merchants (id) on delete cascade,
  name        text not null,
  address     text,
  created_at  timestamptz not null default now()
);
create index if not exists branches_merchant_idx on public.branches (merchant_id);

-- ── customers (ohne Account, identifiziert per public_token) ─────────
create table if not exists public.customers (
  id           uuid primary key default gen_random_uuid(),
  merchant_id  uuid not null references public.merchants (id) on delete cascade,
  public_token uuid not null unique default gen_random_uuid(),  -- steckt im QR-Code
  name         text,
  email        text,
  created_at   timestamptz not null default now()
);
create index if not exists customers_merchant_idx on public.customers (merchant_id);
create index if not exists customers_token_idx on public.customers (public_token);

-- ── loyalty_cards ────────────────────────────────────────────────────
create table if not exists public.loyalty_cards (
  id             uuid primary key default gen_random_uuid(),
  merchant_id    uuid not null references public.merchants (id) on delete cascade,
  customer_id    uuid not null references public.customers (id) on delete cascade,
  current_stamps int not null default 0 check (current_stamps >= 0),
  total_earned   int not null default 0 check (total_earned >= 0),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  unique (merchant_id, customer_id)
);
create index if not exists loyalty_cards_merchant_idx on public.loyalty_cards (merchant_id);

-- ── rewards ──────────────────────────────────────────────────────────
create table if not exists public.rewards (
  id              uuid primary key default gen_random_uuid(),
  merchant_id     uuid not null references public.merchants (id) on delete cascade,
  title           text not null,
  description     text,
  stamps_required int not null default 10 check (stamps_required between 1 and 100),
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);
create index if not exists rewards_merchant_idx on public.rewards (merchant_id);

-- ── stamps (Event-Log jeder Stempelvergabe) ─────────────────────────
create table if not exists public.stamps (
  id          uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references public.merchants (id) on delete cascade,
  card_id     uuid not null references public.loyalty_cards (id) on delete cascade,
  branch_id   uuid references public.branches (id) on delete set null,
  awarded_by  uuid references auth.users (id) on delete set null,
  count       int not null default 1 check (count > 0),
  created_at  timestamptz not null default now()
);
create index if not exists stamps_card_idx on public.stamps (card_id);
create index if not exists stamps_merchant_idx on public.stamps (merchant_id);

-- ── redemptions (eingelöste Prämien) ─────────────────────────────────
create table if not exists public.redemptions (
  id          uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references public.merchants (id) on delete cascade,
  card_id     uuid not null references public.loyalty_cards (id) on delete cascade,
  reward_id   uuid references public.rewards (id) on delete set null,
  branch_id   uuid references public.branches (id) on delete set null,
  redeemed_by uuid references auth.users (id) on delete set null,
  created_at  timestamptz not null default now()
);
create index if not exists redemptions_card_idx on public.redemptions (card_id);
create index if not exists redemptions_merchant_idx on public.redemptions (merchant_id);

-- ── scans (Audit-Log) ────────────────────────────────────────────────
create table if not exists public.scans (
  id          uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references public.merchants (id) on delete cascade,
  customer_id uuid references public.customers (id) on delete set null,
  scanned_by  uuid references auth.users (id) on delete set null,
  branch_id   uuid references public.branches (id) on delete set null,
  type        scan_type not null default 'stamp',
  created_at  timestamptz not null default now()
);
create index if not exists scans_merchant_idx on public.scans (merchant_id);

-- ── wallet_passes (für Phase 6 vorbereitet) ─────────────────────────
create table if not exists public.wallet_passes (
  id          uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references public.merchants (id) on delete cascade,
  customer_id uuid not null references public.customers (id) on delete cascade,
  card_id     uuid references public.loyalty_cards (id) on delete cascade,
  platform    wallet_platform not null,
  serial      text not null,
  created_at  timestamptz not null default now(),
  unique (platform, serial)
);
create index if not exists wallet_passes_customer_idx on public.wallet_passes (customer_id);

-- ── updated_at-Trigger ───────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists merchants_updated_at on public.merchants;
create trigger merchants_updated_at before update on public.merchants
  for each row execute function public.set_updated_at();

drop trigger if exists loyalty_cards_updated_at on public.loyalty_cards;
create trigger loyalty_cards_updated_at before update on public.loyalty_cards
  for each row execute function public.set_updated_at();
