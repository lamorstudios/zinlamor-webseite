# Bild-Platzhalter — erwartete Dateien

Es liegt noch kein freigegebenes Bildmaterial vor. Die Website rendert überall
gestaltete Platzhalter (`src/components/ui/Figure.tsx`) mit dem jeweils vorgesehenen
Pfad. Sobald echte Bilder vorliegen, hier ablegen und `Figure` auf `next/image`
umstellen (Beispielcode ist in `Figure.tsx` auskommentiert).

Empfohlen: **AVIF/WebP**, passende Größen, Hero priorisiert, feste Seitenverhältnisse.

## Erwartete Dateien

### Hero / OG
- `hero/hero-poster.jpg` (+ optional `../videos/hero.mp4`)
- `og/og-default.jpg` (1200×630, Open Graph / Twitter Card)

### Marken-Intro (Startseite)
- `intro/table-main.jpg`
- `intro/hands-sharing.jpg`

### Signature Dishes
- `dishes/tapas.jpg`
- `dishes/paella.jpg`
- `dishes/sangria.jpg`
- `dishes/dessert.jpg`

### Erlebnis / Events
- `experience/atmosphere.jpg`
- `events/private.jpg`, `events/catering.jpg`, `events/foodtruck.jpg`, `events/celebration.jpg`

### Galerie
- `gallery/food-1.jpg`, `gallery/guests-1.jpg`, `gallery/interior-1.jpg`,
  `gallery/mallorca-1.jpg`, `gallery/event-1.jpg`, `gallery/foodtruck-1.jpg`

### Standorte (je Standort ein Titelbild + 4 Galeriebilder)
- `locations/neuhausen.jpg` + `locations/neuhausen-1.jpg` … `-4.jpg`
- `locations/berg-am-laim.jpg` + `-1.jpg` … `-4.jpg`
- `locations/wolfratshausen.jpg` + `-1.jpg` … `-4.jpg`
- `locations/peguera.jpg` + `-1.jpg` … `-4.jpg`

### Weitere Seiten
- `about/story.jpg`
- `foodtruck/foodtruck.jpg`
- `franchise/restaurant.jpg`

### Logo
- Aktuell Wortmarke (Text). Sobald ein finales Logo/SVG vorliegt:
  `src/components/layout/Logo.tsx` anpassen.
