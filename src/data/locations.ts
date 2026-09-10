/**
 * ZENTRALE STANDORTDATEN — La Tasca Flamenca
 * =========================================================================
 * Dies ist die EINZIGE Quelle für Adressen, Telefonnummern, Öffnungszeiten,
 * Reservierungs- und Speisekarten-Links. Alle Seiten und Komponenten lesen
 * ausschließlich von hier. Änderungen bitte nur in dieser Datei vornehmen.
 *
 * Daten wurden aus öffentlich zugänglichen Quellen (Website, Google, Yelp,
 * TripAdvisor, Facebook, Instagram) recherchiert. Wo Angaben widersprüchlich
 * oder unbestätigt sind, ist dies mit "TODO: Daten durch Betreiber bestätigen"
 * markiert.
 * =========================================================================
 */

export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface OpeningHour {
  /** Wochentag */
  day: Weekday;
  /** Öffnungszeit "HH:MM" (24h). null = Ruhetag/geschlossen */
  open: string | null;
  /** Schließzeit "HH:MM" (24h). "24:00"/"00:00" = Mitternacht */
  close: string | null;
}

export interface Location {
  slug: string;
  name: string;
  /** Kurzform für Navigation/Chips */
  shortName: string;
  city: string;
  country: 'DE' | 'ES';
  region: string;
  street: string;
  postalCode: string;
  address: string;
  phone: string;
  /** Telefonnummer im tel:-Format (E.164 ohne Leerzeichen) */
  phoneHref: string;
  email?: string;
  openingHours: OpeningHour[];
  /** Zusatzhinweis zu Öffnungszeiten, z. B. abweichende Küchenzeiten */
  openingNote?: string;
  /** Externer Reservierungslink. Falls leer → Fallback auf Anruf/Kontakt. */
  reservationUrl?: string;
  /** Link zur Speisekarte (PDF oder Seite) */
  menuUrl?: string;
  /** Google-Maps-Routenlink */
  mapsUrl: string;
  /** Google-Maps-Embed-URL (erst nach Consent laden) */
  mapsEmbedUrl?: string;
  /** Geokoordinaten für strukturierte Daten */
  geo: { lat: number | null; lng: number | null };
  /** Bild-Pfad (lokal). Platzhalter, bis echtes Material vorliegt. */
  image: string;
  /** Kurze, individuelle Beschreibung (nicht auf allen Seiten identisch) */
  tagline: string;
  description: string;
  /** Besonderheiten des Standorts */
  highlights: string[];
  /** Ist dies ein Franchise-Standort? */
  franchise?: boolean;
  social?: {
    instagram?: string;
    facebook?: string;
    tripadvisor?: string;
  };
  /** Preisniveau für strukturierte Daten */
  priceRange: string;
}

/** Reihenfolge der Wochentage für Anzeige */
export const WEEKDAY_ORDER: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const WEEKDAY_LABELS: Record<Weekday, { de: string; en: string; es: string; schema: string }> = {
  mon: { de: 'Montag', en: 'Monday', es: 'Lunes', schema: 'Monday' },
  tue: { de: 'Dienstag', en: 'Tuesday', es: 'Martes', schema: 'Tuesday' },
  wed: { de: 'Mittwoch', en: 'Wednesday', es: 'Miércoles', schema: 'Wednesday' },
  thu: { de: 'Donnerstag', en: 'Thursday', es: 'Jueves', schema: 'Thursday' },
  fri: { de: 'Freitag', en: 'Friday', es: 'Viernes', schema: 'Friday' },
  sat: { de: 'Samstag', en: 'Saturday', es: 'Sábado', schema: 'Saturday' },
  sun: { de: 'Sonntag', en: 'Sunday', es: 'Domingo', schema: 'Sunday' },
};

/**
 * Hilfsfunktion: gleiche Zeiten für mehrere Tage.
 */
function hours(days: Weekday[], open: string | null, close: string | null): OpeningHour[] {
  return days.map((day) => ({ day, open, close }));
}

export const locations: Location[] = [
  {
    slug: 'neuhausen',
    name: 'La Tasca Flamenca Neuhausen',
    shortName: 'Neuhausen',
    city: 'München',
    country: 'DE',
    region: 'Bayern',
    street: 'Mettinghstraße 2',
    postalCode: '80634',
    address: 'Mettinghstraße 2, 80634 München',
    phone: '089 37419075',
    phoneHref: '+498937419075',
    // TODO: Standort-E-Mail durch Betreiber bestätigen
    openingHours: [
      // TODO: Ruhetag bestätigen — Quellen widersprüchlich (teils "täglich",
      // teils "Montag Ruhetag"). Aktuell: täglich 17:30–00:00 hinterlegt.
      ...hours(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], '17:30', '00:00'),
    ],
    openingNote: 'TODO: Möglicher Ruhetag (Montag) durch Betreiber bestätigen.',
    // TODO: Offiziellen Reservierungslink (z. B. OpenTable/Quandoo) ergänzen,
    // falls vorhanden. Bis dahin Reservierung per Telefon.
    reservationUrl: undefined,
    // TODO: Direkten Speisekarten-Link (PDF) ergänzen.
    menuUrl: undefined,
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=La+Tasca+Flamenca+Mettinghstra%C3%9Fe+2+80634+M%C3%BCnchen',
    mapsEmbedUrl:
      'https://www.google.com/maps?q=Mettinghstra%C3%9Fe+2,+80634+M%C3%BCnchen&output=embed',
    geo: { lat: null, lng: null }, // TODO: exakte Koordinaten ergänzen
    image: '/images/locations/neuhausen.jpg',
    tagline: 'Das älteste spanische Restaurant Münchens.',
    description:
      'In einem denkmalgeschützten Haus mitten in Neuhausen liegt das Herz von La Tasca Flamenca – für viele das älteste spanische Restaurant Münchens. Über dreißig Tapas, viel Meeresfrüchte, ein großer vegetarischer Anteil und Abende, an denen die Zeit langsamer vergeht.',
    highlights: [
      'Über 30 verschiedene Tapas',
      'Großer vegetarischer Anteil auf der Karte',
      'Denkmalgeschütztes Haus in Neuhausen',
    ],
    social: {
      facebook: 'https://www.facebook.com/Latascaflamenca.bardetapas/',
      tripadvisor:
        'https://www.tripadvisor.com/Restaurant_Review-g187309-d964443-Reviews-La_Tasca_Flamenca-Munich_Upper_Bavaria_Bavaria.html',
    },
    priceRange: '€€',
  },
  {
    slug: 'berg-am-laim',
    name: 'La Tasca Flamenca Berg am Laim',
    shortName: 'Berg am Laim',
    city: 'München',
    country: 'DE',
    region: 'Bayern',
    street: 'Atelierstraße 5',
    // TODO: Postleitzahl bestätigen (Werksviertel-Mitte, i. d. R. 81671 München)
    postalCode: '81671',
    address: 'Atelierstraße 5, 81671 München',
    phone: '089 49059959',
    phoneHref: '+498949059959',
    openingHours: [...hours(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], '11:30', '00:00')],
    openingNote: 'TODO: Öffnungszeiten (evtl. abweichende Küchenzeiten) durch Betreiber bestätigen.',
    reservationUrl: undefined,
    menuUrl: undefined,
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=La+Tasca+Flamenca+Atelierstra%C3%9Fe+5+M%C3%BCnchen+Werksviertel',
    mapsEmbedUrl:
      'https://www.google.com/maps?q=Atelierstra%C3%9Fe+5,+81671+M%C3%BCnchen&output=embed',
    geo: { lat: null, lng: null },
    image: '/images/locations/berg-am-laim.jpg',
    tagline: 'Spanische Küche im Werksviertel.',
    description:
      'Im lebendigen Werksviertel-Mitte, unweit des Ostbahnhofs, bringt La Tasca Flamenca Berg am Laim mediterrane Leichtigkeit in ein junges Stadtquartier. Tapas, Paella und Sangria – mittags wie abends, zwischen Kultur, Konzerten und Feierabend.',
    highlights: [
      'Im Werksviertel-Mitte am Ostbahnhof',
      'Durchgehend warme Küche',
      'Ideal vor Konzert- und Kulturbesuchen',
    ],
    social: {},
    priceRange: '€€',
  },
  {
    slug: 'wolfratshausen',
    name: 'La Tasca Flamenca Wolfratshausen',
    shortName: 'Wolfratshausen',
    city: 'Wolfratshausen',
    country: 'DE',
    region: 'Bayern',
    street: 'Königsdorfer Straße 2',
    postalCode: '82515',
    address: 'Königsdorfer Straße 2, 82515 Wolfratshausen',
    phone: '08171 2347524',
    phoneHref: '+4981712347524',
    openingHours: [
      // TODO: Öffnungszeiten & Ruhetag bestätigen — Quellen widersprüchlich
      // (Mittwoch teils als Ruhetag, teils mit Zeiten genannt).
      { day: 'mon', open: '16:30', close: '23:00' },
      { day: 'tue', open: '16:30', close: '23:00' },
      { day: 'wed', open: null, close: null }, // TODO: Ruhetag bestätigen
      { day: 'thu', open: '16:30', close: '23:00' },
      { day: 'fri', open: '11:30', close: '23:00' },
      { day: 'sat', open: '11:30', close: '23:00' },
      { day: 'sun', open: '11:30', close: '23:00' },
    ],
    openingNote: 'TODO: Ruhetag (Mittwoch?) und genaue Zeiten durch Betreiber bestätigen.',
    reservationUrl: undefined,
    menuUrl: undefined,
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=La+Tasca+Flamenca+K%C3%B6nigsdorfer+Stra%C3%9Fe+2+82515+Wolfratshausen',
    mapsEmbedUrl:
      'https://www.google.com/maps?q=K%C3%B6nigsdorfer+Stra%C3%9Fe+2,+82515+Wolfratshausen&output=embed',
    geo: { lat: null, lng: null },
    image: '/images/locations/wolfratshausen.jpg',
    tagline: 'Paella & Tapas an der Loisach.',
    description:
      'Direkt an der Johannisbrücke, südlich des Wolfratshauser Zentrums, verbindet dieser Standort spanische Gastfreundschaft mit oberbayerischer Ruhe. Eine große Auswahl an Paellas und eine ausgewogene Tapas-Karte – ein Franchise-Partner der Familie La Tasca Flamenca.',
    highlights: [
      'Große Auswahl an Paellas',
      'Lage direkt an der Loisach / Johannisbrücke',
      'Familiengeführter Franchise-Standort',
    ],
    franchise: true,
    social: {
      instagram: 'https://www.instagram.com/latascaflamenca_wolfratshausen/',
    },
    priceRange: '€€',
  },
  {
    slug: 'peguera',
    name: 'La Tasca Flamenca Mallorca',
    shortName: 'Peguera · Mallorca',
    city: 'Peguera',
    country: 'ES',
    region: 'Illes Balears',
    street: 'Bulevar de Peguera 68',
    postalCode: '07160',
    address: 'Bulevar de Peguera 68, 07160 Peguera, Illes Balears',
    phone: '+34 651 590 075',
    phoneHref: '+34651590075',
    openingHours: [...hours(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], '13:00', '00:00')],
    openingNote: 'TODO: Saisonale Öffnungszeiten durch Betreiber bestätigen.',
    reservationUrl: undefined,
    menuUrl: undefined,
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=La+Tasca+Flamenca+Bulevar+de+Peguera+68+07160+Peguera',
    mapsEmbedUrl:
      'https://www.google.com/maps?q=Bulevar+de+Peguera+68,+07160+Peguera&output=embed',
    geo: { lat: null, lng: null },
    image: '/images/locations/peguera.jpg',
    tagline: 'Spaniengefühl am Meer.',
    description:
      'An der Strandpromenade von Peguera, im Südwesten Mallorcas, schließt sich der Kreis: spanische Küche dort, wo sie herkommt. Tapas, frische Paella und ein Glas Wein bei Abendlicht – familiengeführt, mit dem Blick fürs Wesentliche.',
    highlights: [
      'Direkt am Bulevar de Peguera',
      'Frische Paella und Tapas',
      'Familiengeführt an der Playa',
    ],
    social: {
      instagram: 'https://www.instagram.com/latascaflamenca_mallorca/',
      facebook: 'https://www.facebook.com/latascaflamencamallorca/',
      tripadvisor:
        'https://www.tripadvisor.com/Restaurant_Review-g580307-d25073230-Reviews-La_Tasca_FLamenca-Peguera_Calvia_Majorca_Balearic_Islands.html',
    },
    priceRange: '€€',
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getLocationSlugs(): string[] {
  return locations.map((l) => l.slug);
}
