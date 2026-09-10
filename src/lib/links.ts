import type { Location } from '@/data/locations';

/**
 * Zentrale Logik für Handlungs-Links eines Standorts.
 * Falls kein externer Reservierungslink hinterlegt ist, wird auf die
 * standortbezogene Reservierungsseite (bzw. Anruf) verwiesen — nie auf "#".
 */
export function reservationHref(location: Location): string {
  if (location.reservationUrl) return location.reservationUrl;
  return `/standorte/${location.slug}#reservieren`;
}

export function reservationIsExternal(location: Location): boolean {
  return Boolean(location.reservationUrl);
}

export function menuHref(location: Location): string {
  if (location.menuUrl) return location.menuUrl;
  return `/standorte/${location.slug}#speisekarte`;
}

export function menuIsExternal(location: Location): boolean {
  return Boolean(location.menuUrl);
}

export function callHref(location: Location): string {
  return `tel:${location.phoneHref}`;
}
