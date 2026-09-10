/**
 * ZENTRALE SEITEN-KONFIGURATION
 * =========================================================================
 * Announcement Bar, Navigation, Social-Links, Marken-Basisdaten.
 * Änderungen an Ankündigung / Social Media hier zentral pflegen.
 * =========================================================================
 */

export const siteConfig = {
  name: 'La Tasca Flamenca',
  legalName: 'La Tasca Flamenca', // TODO: vollständige Firmierung durch Betreiber bestätigen
  shortDescription:
    'Bar de Tapas & Restaurant. Authentische spanische Küche, lebendige Abende und das Gefühl, für ein paar Stunden woanders zu sein.',
  // TODO: Produktions-Domain bestätigen. Aktuell latascaflamenca.com angenommen.
  url: 'https://www.latascaflamenca.com',
  locale: 'de_DE',
  // Zentrale Kontaktdaten (Hauptstandort). Standortbezogene Daten in locations.ts.
  contactEmail: 'info@latascaflamenca.com', // TODO: offizielle E-Mail bestätigen
  social: {
    instagram: 'https://www.instagram.com/latascaflamenca_mallorca/', // TODO: Haupt-Instagram bestätigen
    facebook: 'https://www.facebook.com/Latascaflamenca.bardetapas/',
    tripadvisor:
      'https://www.tripadvisor.com/Restaurant_Review-g187309-d964443-Reviews-La_Tasca_Flamenca-Munich_Upper_Bavaria_Bavaria.html',
  },
};

/**
 * Announcement Bar — schmaler Hinweis oberhalb der Navigation.
 * `enabled: false` blendet die Leiste vollständig aus.
 */
export const announcement = {
  enabled: true,
  // TODO: Inhalt durch Betreiber anpassen (Events, Feiertage, neue Karte …)
  messageKey: 'announcement.default',
  // Optionaler Link. href leer → kein Link.
  href: '/events-catering',
  linkKey: 'announcement.cta',
};

export type NavItem = {
  labelKey: string;
  href: string;
  /** Kennzeichnet den Standort-Eintrag für das Mega-Menü */
  isLocations?: boolean;
};

export const primaryNav: NavItem[] = [
  { labelKey: 'nav.about', href: '/ueber-uns' },
  { labelKey: 'nav.locations', href: '/standorte', isLocations: true },
  { labelKey: 'nav.menu', href: '/speisekarte' },
  { labelKey: 'nav.events', href: '/events-catering' },
  { labelKey: 'nav.franchise', href: '/franchise' },
  { labelKey: 'nav.contact', href: '/kontakt' },
];

export const footerNav = {
  discover: [
    { labelKey: 'nav.about', href: '/ueber-uns' },
    { labelKey: 'nav.menu', href: '/speisekarte' },
    { labelKey: 'nav.events', href: '/events-catering' },
    { labelKey: 'nav.foodtruck', href: '/foodtruck' },
    { labelKey: 'nav.franchise', href: '/franchise' },
    { labelKey: 'nav.careers', href: '/karriere' },
  ],
  legal: [
    { labelKey: 'nav.imprint', href: '/impressum' },
    { labelKey: 'nav.privacy', href: '/datenschutz' },
    { labelKey: 'nav.cookies', href: '/cookie-einstellungen' },
  ],
};
