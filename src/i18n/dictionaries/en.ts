import type { Dictionary } from './de';

/**
 * ENGLISH — partial translation.
 * Missing keys fall back to German (see LanguageProvider).
 * TODO: Vollständige, professionelle Übersetzung ergänzen.
 */
const en: Partial<Dictionary> = {
  'announcement.default': 'New: Reserve your table for warm summer evenings.',
  'announcement.cta': 'Request an event',

  'nav.about': 'About',
  'nav.locations': 'Locations',
  'nav.menu': 'Menu',
  'nav.events': 'Events & Catering',
  'nav.franchise': 'Franchise',
  'nav.contact': 'Contact',
  'nav.foodtruck': 'Food truck',
  'nav.careers': 'Careers',
  'nav.imprint': 'Imprint',
  'nav.privacy': 'Privacy',
  'nav.cookies': 'Cookie settings',
  'nav.home': 'Home',

  'action.reserve': 'Reserve a table',
  'action.reserveShort': 'Reserve',
  'action.discoverLocation': 'Discover a location',
  'action.viewMenu': 'View menu',
  'action.discoverMenu': 'Discover the menu',
  'action.call': 'Call',
  'action.route': 'Directions',
  'action.openRoute': 'Open directions',
  'action.details': 'View details',
  'action.chooseLocation': 'Choose a location',
  'action.requestEvent': 'Request an event',
  'action.allLocations': 'All locations',
  'action.backHome': 'Back to home',
  'action.more': 'Learn more',

  'a11y.skip': 'Skip to content',
  'a11y.menuOpen': 'Open menu',
  'a11y.menuClose': 'Close menu',
  'a11y.langSwitch': 'Choose language',

  'hours.open': 'Open now',
  'hours.closed': 'Closed',
  'hours.today': 'Today',
  'hours.restday': 'Closed',
  'hours.title': 'Opening hours',

  'hero.headline': 'Spain begins at the table.',
  'hero.subline':
    'Authentic Spanish cuisine, lively evenings and the feeling of being somewhere else for a few hours.',
  'hero.scroll': 'Discover more',

  'intro.eyebrow': 'Bar de Tapas & Restaurant',
  'intro.headline': 'More than tapas.',
  'intro.text':
    'La Tasca Flamenca is a place for long evenings, full tables and Spanish joie de vivre. Spanish food is made for sharing — small plates, long conversations and evenings that end later than planned.',

  'locations.eyebrow': 'Our locations',
  'locations.headline': 'Four places, one feeling.',
  'locations.subline': 'Munich and Mallorca — find the table nearest to you.',

  'dishes.eyebrow': 'From the kitchen',
  'dishes.headline': 'Small plates, long evenings.',

  'finalCta.headline': 'Your table is waiting.',
  'finalCta.text': 'Pick a location and reserve your evening.',

  'newsletter.headline': 'Don’t miss a thing.',
  'newsletter.submit': 'Sign up',

  'cookie.acceptAll': 'Accept all',
  'cookie.rejectAll': 'Reject all',
  'cookie.save': 'Save selection',

  'map.load': 'Load map',

  'footer.rights': 'All rights reserved.',
};

export default en;
