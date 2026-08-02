# Offene TODOs & zu bestätigende Daten

Diese Liste fasst alle im Code mit `TODO:` markierten Punkte zusammen. Nichts davon
blockiert Build oder Betrieb — es sind Inhalte/Angaben, die der Betreiber bestätigen
oder ergänzen muss.

## 1. Standortdaten bestätigen (`src/data/locations.ts`)

Recherchiert aus öffentlichen Quellen (Website, Google, Yelp, TripAdvisor, Facebook,
Instagram). **Widersprüchliche oder unbestätigte Angaben:**

| Standort | Punkt | Status |
|---|---|---|
| **Neuhausen** | Ruhetag | Quellen widersprüchlich: teils „täglich 17:30–00:00“, teils „Montag Ruhetag“. Aktuell: **täglich** hinterlegt. **Bitte bestätigen.** |
| **Neuhausen** | E-Mail, Geo-Koordinaten, Reservierungs-/Speisekarten-Link | fehlen |
| **Berg am Laim** | Postleitzahl | als `81671` (Werksviertel-Mitte) angenommen — **bestätigen** |
| **Berg am Laim** | Küchen-/Öffnungszeiten | `11:30–00:00` täglich angenommen — **bestätigen** |
| **Wolfratshausen** | Ruhetag & Zeiten | Quellen widersprüchlich (Mittwoch teils Ruhetag, teils mit Zeiten). Aktuell: **Mi Ruhetag**, Mo/Di/Do 16:30–23:00, Fr–So 11:30–23:00. **Bitte bestätigen.** |
| **Peguera/Mallorca** | Saisonale Öffnungszeiten | `13:00–00:00` angenommen — **bestätigen** |
| **alle** | exakte Geo-Koordinaten (`lat`/`lng`) | fehlen (für Schema/Karten) |

**Recherchierte Kontaktdaten (bitte gegenprüfen):**
- Neuhausen — Mettinghstraße 2, 80634 München · 089 37419075
- Berg am Laim — Atelierstraße 5, 81671 München (Werksviertel) · 089 49059959
- Wolfratshausen — Königsdorfer Straße 2, 82515 Wolfratshausen · 08171 2347524 (Franchise)
- Peguera — Bulevar de Peguera 68, 07160 Peguera (Mallorca) · +34 651 590 075

## 2. Reservierung, Speisekarte, Karten (`src/data/locations.ts`)
- `reservationUrl` je Standort ergänzen (z. B. OpenTable/Quandoo). Aktuell: Reservierung per Telefon / interne Seite.
- `menuUrl` je Standort ergänzen (PDF/Seite). Aktuell: Hinweis + Verweis.
- `mapsEmbedUrl`/`mapsUrl` sind gesetzt (Suchlinks); bei Bedarf durch exakte Place-Links ersetzen.

## 3. Marke & Kontakt (`src/data/site.ts`)
- Produktions-Domain (`siteConfig.url`, aktuell `latascaflamenca.com` angenommen)
- Offizielle Kontakt-E-Mail (`contactEmail`)
- Haupt-Instagram-Kanal (aktuell Mallorca hinterlegt)
- Vollständige Firmierung/Rechtsform (`legalName`)
- Announcement-Bar-Text (`announcement.messageKey`)

## 4. Rechtstexte (⚠️ vor Veröffentlichung prüfen lassen)
- `src/app/impressum/page.tsx`: Firmierung, Anschrift, Vertretung, USt-IdNr., inhaltlich Verantwortliche(r)
- `src/app/datenschutz/page.tsx`: Hosting-Anbieter, Google-Angaben, Formular-/Newsletter-Verarbeitung
- **Rechtstexte nicht ohne juristische/datenschutzrechtliche Prüfung veröffentlichen.**

## 5. Backends anbinden
- **Event-/Catering-Formular** (`src/components/forms/EventForm.tsx`): API-Route/Server-Action anbinden. Aktuell: Validierung + Erfolgshinweis, **kein** echter Versand.
- **Newsletter** (`src/components/forms/NewsletterForm.tsx`): Dienst mit Double-Opt-in anbinden. Aktuell: **keine** Anmeldung simuliert, ehrlicher Hinweis.

## 6. Bilder & Logo
- Kein freigegebenes Bildmaterial vorhanden → Platzhalter (siehe `public/images/PLATZHALTER.md`).
- Finales Logo/SVG in `src/components/layout/Logo.tsx` einsetzen (aktuell Wortmarke).
- OG-Bild `public/images/og/og-default.jpg` (1200×630).

## 7. Inhalte
- **Über uns**: Gründungsjahr / konkrete Historie bestätigen (keine Zahlen erfunden).
- **Franchise / Foodtruck / Karriere**: konkrete Konditionen, Details, offene Stellen ergänzen.
- **Bewertungen**: echte, freigegebene Zitate mit Quelle in `src/components/sections/Reviews.tsx` (`realReviews`) eintragen. Aktuell: Verweis auf Google/TripAdvisor, **keine erfundenen Bewertungen**.
- **Instagram-Feed** (`src/components/sections/InstagramConsent.tsx`): echten Feed-Code nach Consent einbinden.

## 8. Übersetzungen
- `src/i18n/dictionaries/en.ts` und `es.ts` sind Teilübersetzungen (Rest fällt auf Deutsch zurück) → vervollständigen.
