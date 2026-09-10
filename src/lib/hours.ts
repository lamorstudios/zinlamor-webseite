import { Location, OpeningHour, Weekday, WEEKDAY_ORDER, WEEKDAY_LABELS } from '@/data/locations';
import type { Locale } from '@/i18n/config';

/** JS getDay(): 0 = Sonntag … 6 = Samstag → unser Weekday-Schema */
const JS_DAY_TO_WEEKDAY: Weekday[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export interface OpenStatus {
  isOpen: boolean;
  /** Übersetzungsschlüssel-Suffix: 'open' | 'closed' | 'opensSoon' | 'closesSoon' */
  state: 'open' | 'closed';
  /** Heutige formatierte Zeiten, z. B. "17:30 – 00:00" oder null bei Ruhetag */
  todayLabel: string | null;
}

/**
 * Berechnet den aktuellen Öffnungsstatus. `now` wird bewusst übergeben,
 * damit die Funktion deterministisch/testbar bleibt und auf dem Client
 * (nach Mount) aufgerufen werden kann, um Hydration-Mismatch zu vermeiden.
 */
export function getOpenStatus(location: Location, now: Date): OpenStatus {
  const todayKey = JS_DAY_TO_WEEKDAY[now.getDay()];
  const today = location.openingHours.find((h) => h.day === todayKey);
  const nowMin = now.getHours() * 60 + now.getMinutes();

  if (!today || today.open === null || today.close === null) {
    return { isOpen: false, state: 'closed', todayLabel: null };
  }

  const openMin = toMinutes(today.open);
  let closeMin = toMinutes(today.close);
  // Mitternacht / über Tageswechsel
  if (closeMin <= openMin) closeMin += 24 * 60;

  const isOpen = nowMin >= openMin && nowMin < closeMin;
  return {
    isOpen,
    state: isOpen ? 'open' : 'closed',
    todayLabel: `${today.open} – ${today.close === '00:00' ? '00:00' : today.close}`,
  };
}

/**
 * Gruppiert Öffnungszeiten zu zusammenhängenden Blöcken für kompakte Anzeige.
 * z. B. "Mo–Do 16:30–23:00".
 */
export function groupedHours(
  hours: OpeningHour[],
  locale: Locale
): { label: string; time: string }[] {
  const ordered = WEEKDAY_ORDER.map((d) => hours.find((h) => h.day === d)).filter(
    (h): h is OpeningHour => Boolean(h)
  );

  const groups: { days: Weekday[]; open: string | null; close: string | null }[] = [];
  for (const h of ordered) {
    const last = groups[groups.length - 1];
    if (last && last.open === h.open && last.close === h.close) {
      last.days.push(h.day);
    } else {
      groups.push({ days: [h.day], open: h.open, close: h.close });
    }
  }

  return groups.map((g) => {
    const first = WEEKDAY_LABELS[g.days[0]][locale];
    const last = WEEKDAY_LABELS[g.days[g.days.length - 1]][locale];
    const label = g.days.length === 1 ? first : `${first}–${last}`;
    const time =
      g.open === null || g.close === null ? '—' : `${g.open}–${g.close}`;
    return { label, time };
  });
}

/**
 * Erzeugt Schema.org OpeningHoursSpecification aus den Öffnungszeiten.
 */
export function toSchemaOpeningHours(hours: OpeningHour[]) {
  return hours
    .filter((h) => h.open && h.close)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: WEEKDAY_LABELS[h.day].schema,
      opens: h.open,
      closes: h.close === '00:00' ? '23:59' : h.close,
    }));
}
