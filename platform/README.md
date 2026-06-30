# Loyalty Platform (White-Label)

White-Label-Plattform für digitale Stempelkarten, Gutscheine und
QR-Code-Kundenkarten – **ohne App-Download**. Eine Codebasis, beliebig viele
Händler, jeder mit eigenem Branding.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Supabase** (Postgres, Auth, Row Level Security)
- **Tailwind CSS** + CSS-Variablen für White-Label-Branding

## White-Label-Prinzip

Branding ist **nie** im Code hartcodiert. Jeder Händler hat in der Tabelle
`merchants` seine Farben/Logo/Texte. Beim Rendern werden diese als
CSS-Variablen gesetzt (`src/lib/branding/BrandingStyle.tsx`), Tailwind liest
sie über `colors.brand.*` (`tailwind.config.ts`). Neuer Kunde = neue DB-Zeile.

## Setup

```bash
cd platform
npm install
cp .env.example .env.local   # Supabase-Keys eintragen
```

### Supabase einrichten

1. Projekt auf supabase.com anlegen.
2. Im **SQL Editor** nacheinander ausführen:
   - `supabase/migrations/0001_initial_schema.sql`
   - `supabase/migrations/0002_rls_policies.sql`
   - (optional) `supabase/seed.sql` für Demo-Händler
3. URL + anon key + service_role key aus *Project Settings → API* in
   `.env.local` eintragen.

### Starten

```bash
npm run dev   # http://localhost:3000
```

## Rollen

| Rolle | Quelle | Rechte |
|---|---|---|
| Super-Admin | `profiles.is_super_admin = true` | alle Händler, anlegen, Branding, Statistiken |
| Inhaber/Admin | `merchant_users.role = owner/admin` | eigener Laden, Branding, Einstellungen |
| Mitarbeiter | `merchant_users.role = staff` | scannen, Stempel, Einlösen |
| Kunde | kein Account, `customers.public_token` | eigene Karte ansehen |

### Ersten Super-Admin freischalten

Nach der Registrierung unter `/login` im Supabase SQL-Editor:

```sql
update public.profiles set is_super_admin = true where id = '<AUTH_USER_UUID>';
```

## Seitenübersicht (Phase 1)

| Pfad | Zweck |
|---|---|
| `/` | Plattform-Startseite |
| `/login` | Anmeldung / Registrierung |
| `/shop/[slug]` | Gebrandete Händler-Landingpage |
| `/dashboard` | Händler-Dashboard |
| `/dashboard/branding` | Branding-Editor mit Live-Vorschau |
| `/admin` | Super-Admin: Händler anlegen/verwalten |

## Roadmap

- **Phase 1 ✅** Grundstruktur, Auth, Merchant-Modell, Branding-System
- Phase 2 — Kundenkarte, QR-Code, Stempel-Logik
- Phase 3 — Scanner, Stempel vergeben, Prämie einlösen
- Phase 4 — Dashboards mit Statistiken
- Phase 5 — White-Label-Feinschliff, responsive UI, Demo-Daten
- Phase 6 — Apple/Google Wallet
