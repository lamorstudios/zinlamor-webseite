'use client';

import { useEffect, useState } from 'react';
import type { Location, Weekday } from '@/data/locations';
import { WEEKDAY_ORDER, WEEKDAY_LABELS } from '@/data/locations';
import { useLanguage } from '@/i18n/LanguageProvider';
import { cn } from '@/lib/cn';

const JS_DAY_TO_WEEKDAY: Weekday[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

/**
 * Vollständige Öffnungszeiten-Tabelle mit Hervorhebung des heutigen Tages.
 * Heutiger Tag wird erst nach Mount markiert (kein Hydration-Mismatch).
 */
export function OpeningHoursTable({ location }: { location: Location }) {
  const { locale, t } = useLanguage();
  const [today, setToday] = useState<Weekday | null>(null);

  useEffect(() => {
    setToday(JS_DAY_TO_WEEKDAY[new Date().getDay()]);
  }, []);

  return (
    <table className="w-full text-fluid-base">
      <caption className="sr-only">{t('hours.title')}</caption>
      <tbody>
        {WEEKDAY_ORDER.map((day) => {
          const h = location.openingHours.find((x) => x.day === day);
          const isToday = day === today;
          const closed = !h || h.open === null || h.close === null;
          return (
            <tr
              key={day}
              className={cn(
                'border-b border-sand/40 last:border-0',
                isToday && 'font-medium text-burgundy'
              )}
            >
              <th scope="row" className="py-2 text-left font-normal">
                <span className={cn(isToday && 'font-semibold')}>
                  {WEEKDAY_LABELS[day][locale]}
                  {isToday && <span className="ml-2 text-fluid-sm text-terracotta">· {t('hours.today')}</span>}
                </span>
              </th>
              <td className="py-2 text-right tabular-nums">
                {closed ? (
                  <span className="text-charcoal/50">{t('hours.restday')}</span>
                ) : (
                  `${h!.open}–${h!.close}`
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
