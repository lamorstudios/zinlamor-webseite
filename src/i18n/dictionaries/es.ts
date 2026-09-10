import type { Dictionary } from './de';

/**
 * ESPAÑOL — traducción parcial.
 * Las claves que faltan usan el alemán como respaldo (ver LanguageProvider).
 * TODO: Completar traducción profesional.
 */
const es: Partial<Dictionary> = {
  'announcement.default': 'Nuevo: Reserva tu mesa para las cálidas noches de verano.',
  'announcement.cta': 'Solicitar un evento',

  'nav.about': 'Sobre nosotros',
  'nav.locations': 'Ubicaciones',
  'nav.menu': 'Carta',
  'nav.events': 'Eventos y Catering',
  'nav.franchise': 'Franquicia',
  'nav.contact': 'Contacto',
  'nav.foodtruck': 'Foodtruck',
  'nav.careers': 'Empleo',
  'nav.imprint': 'Aviso legal',
  'nav.privacy': 'Privacidad',
  'nav.cookies': 'Cookies',
  'nav.home': 'Inicio',

  'action.reserve': 'Reservar mesa',
  'action.reserveShort': 'Reservar',
  'action.discoverLocation': 'Descubrir ubicación',
  'action.viewMenu': 'Ver la carta',
  'action.discoverMenu': 'Descubre la carta',
  'action.call': 'Llamar',
  'action.route': 'Cómo llegar',
  'action.openRoute': 'Cómo llegar',
  'action.details': 'Ver detalles',
  'action.chooseLocation': 'Elegir ubicación',
  'action.requestEvent': 'Solicitar evento',
  'action.allLocations': 'Todas las ubicaciones',
  'action.backHome': 'Volver al inicio',
  'action.more': 'Saber más',

  'a11y.skip': 'Saltar al contenido',
  'a11y.menuOpen': 'Abrir menú',
  'a11y.menuClose': 'Cerrar menú',
  'a11y.langSwitch': 'Elegir idioma',

  'hours.open': 'Abierto ahora',
  'hours.closed': 'Cerrado',
  'hours.today': 'Hoy',
  'hours.restday': 'Cerrado',
  'hours.title': 'Horario',

  'hero.headline': 'Para noches que se alargan.',
  'hero.subline': 'Tapas, copas y noches que se alargan. En Múnich y Mallorca.',
  'hero.scroll': 'Scroll',

  'intro.eyebrow': 'Bar de Tapas',
  'intro.headline': 'La buena comida se comparte.',
  'intro.text':
    'Platos pequeños, conversaciones largas, noches que terminan más tarde de lo previsto. Cocina española sin clichés.',

  'locations.eyebrow': 'Ubicaciones',
  'locations.headline': 'Cuatro lugares. Una sensación.',
  'locations.subline': 'Múnich y Mallorca — encuentra la mesa más cercana.',

  'dishes.eyebrow': 'Carta',
  'dishes.headline': 'Platos pequeños. Noches largas.',

  'finalCta.headline': 'Tu mesa te espera.',
  'finalCta.text': 'Elige una ubicación y reserva tu noche.',

  'newsletter.headline': 'No te pierdas nada.',
  'newsletter.submit': 'Suscribirse',

  'cookie.acceptAll': 'Aceptar todo',
  'cookie.rejectAll': 'Rechazar todo',
  'cookie.save': 'Guardar selección',

  'map.load': 'Cargar mapa',

  'footer.rights': 'Todos los derechos reservados.',
};

export default es;
