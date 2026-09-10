# La Tasca Flamenca — Website (2026 Redesign)

Moderne, mehrsprachig vorbereitete Website für **La Tasca Flamenca – Bar de Tapas &
Restaurant** (München & Mallorca). Aufgebaut mit **Next.js 15 (App Router)**,
**TypeScript**, **Tailwind CSS**, **Framer Motion** und **Lucide Icons**.

> Hinweis: Dieses Repository hieß ursprünglich `zinlamor-webseite` und enthielt die
> Website eines Musikstudios. Diese Altdateien sind unter `legacy-zinlamor/`
> archiviert (nicht gelöscht) und für die Restaurant-Website ohne Bedeutung.

---

## Schnellstart

```bash
npm install
npm run dev      # Entwicklung auf http://localhost:3000
npm run build    # Produktions-Build
npm run start    # Produktions-Server
npm run lint     # ESLint
```

Deploybar ohne weitere Konfiguration auf **Vercel** oder **Netlify**
(Next.js App Router, statisch/SSG wo möglich).

---

## Seitenstruktur

| Route | Inhalt |
|---|---|
| `/` | Startseite (Hero, Marken-Intro, Standorte, Signature Dishes, Erlebnis, Events, Galerie, Bewertungen, Newsletter, Abschluss-CTA) |
| `/ueber-uns` | Über uns |
| `/standorte` | Standortübersicht |
| `/standorte/[slug]` | Standort-Detailseiten: `neuhausen`, `berg-am-laim`, `wolfratshausen`, `peguera` |
| `/speisekarte` | Speisekarte (Standort-Auswahl) |
| `/reservierung` | Zentraler Reservierungsablauf (Standort wählen → reservieren) |
| `/events-catering` | Events, Catering, Foodtruck + Anfrageformular |
| `/foodtruck` | Foodtruck |
| `/franchise` | Franchise |
| `/kontakt` | Kontakt (alle Standorte) |
| `/karriere` | Karriere |
| `/impressum`, `/datenschutz`, `/cookie-einstellungen` | Rechtliches |
| `/sitemap.xml`, `/robots.txt` | automatisch generiert |

Alte WordPress-URLs (`/neuhausen`, `/mallorca`, `/about` …) werden per **301-Redirect**
auf die neue Struktur geleitet (siehe `next.config.mjs`).

---

## Wo werden Inhalte gepflegt? (zentrale Konfiguration)

**Alle** Standortdaten liegen an genau **einer** Stelle:

### `src/data/locations.ts`
Adresse, Telefon, Öffnungszeiten, Reservierungslink, Speisekarten-Link, Maps-Link,
Beschreibung, Besonderheiten, Social-Media je Standort.

- **Reservierungslink ändern:** Feld `reservationUrl` beim jeweiligen Standort setzen.
  Ist es leer, verweist der Button auf die interne Reservierungsseite / Telefon.
- **Speisekarte ändern:** Feld `menuUrl` setzen (z. B. PDF-Link).
- **Maps-Link / Karte:** `mapsUrl` (Routen-Link) und `mapsEmbedUrl` (Einbettung, lädt
  erst nach Cookie-Einwilligung).
- **Öffnungszeiten:** Array `openingHours` (steuert Anzeige, „heute geöffnet“-Status
  und `OpeningHoursSpecification`-Schema).

### `src/data/site.ts`
- **Announcement-Bar** an/aus und Text: Objekt `announcement` (`enabled: false` blendet aus).
- **Navigation:** `primaryNav`, `footerNav`.
- **Social-Media & Kontakt-E-Mail:** `siteConfig.social`, `siteConfig.contactEmail`.
- **Produktions-Domain:** `siteConfig.url` (für Canonical, OG, Sitemap).

### `src/i18n/dictionaries/*.ts`
Übersetzungen: `de.ts` (Master/Standard), `en.ts`, `es.ts` (jeweils Teilübersetzung,
fehlende Schlüssel fallen automatisch auf Deutsch zurück).

---

## Bilder

Es liegt **noch kein freigegebenes Bildmaterial** vor. Alle Bildbereiche rendern
aktuell hochwertige Platzhalter (`src/components/ui/Figure.tsx`) mit dem jeweils
**vorgesehenen Dateipfad**. Siehe `public/images/PLATZHALTER.md` für die Liste aller
erwarteten Dateien und die Umstellung auf `next/image`.

---

## Mehrsprachigkeit

Deutsch ist Standard (deutsche Standorte). Ein Sprachumschalter (DE/EN/ES) ist im
Header/Menü integriert; die Auswahl wird pro Browser gespeichert. EN/ES sind als
Struktur mit Teilübersetzungen angelegt — fehlende Texte erscheinen auf Deutsch.

> Für vollständig getrenntes, SEO-optimiertes Locale-Routing (eigene URLs je Sprache)
> ist `next-intl` der empfohlene Ausbauweg. Aktuell: clientseitiger Wechsel der
> UI-Texte, deutsche SSR-Basis.

---

## Datenschutz / Consent

- **Cookie-Banner** mit echten technischen Auswirkungen. Kategorien: notwendig,
  Statistik, Marketing, externe Medien. „Ablehnen“ ist gleichwertig zu „Akzeptieren“.
- **Google Maps** und **Instagram-Feed** laden **erst nach Einwilligung**
  (Kategorie „externe Medien“); vorher datenschutzfreundliche Platzhalter.
- **Schriften** werden lokal ausgeliefert (`next/font`, kein Google-Request zur Laufzeit).

---

## Offene TODOs (im Code mit `TODO:` markiert)

Siehe `TODO.md` für die vollständige, kommentierte Liste.

---

## Wichtige Hinweise

- **Keine erfundenen Daten:** Öffnungszeiten, Adressen und Telefonnummern wurden
  recherchiert; widersprüchliche/unbestätigte Angaben sind als `TODO` markiert.
- **Rechtstexte** (Impressum/Datenschutz) sind **Platzhalter** und müssen vor
  Veröffentlichung geprüft werden.
- **Bewertungen** werden nicht erfunden — es wird auf echte Quellen (Google,
  TripAdvisor) verwiesen, bis freigegebene Zitate vorliegen.
