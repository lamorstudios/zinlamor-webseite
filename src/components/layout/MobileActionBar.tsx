'use client';

import Link from 'next/link';
import { CalendarCheck, Phone, MapPin } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import { locations } from '@/data/locations';
import { callHref } from '@/lib/links';

/**
 * Sticky Action Bar am unteren Bildschirmrand (nur Mobil).
 * Verdeckt keine Inhalte: ein Spacer mit gleicher Höhe wird global im Layout
 * eingefügt (siehe Providers → MobileActionBarSpacer).
 */
export function MobileActionBar() {
  const t = useT();
  const primary = locations[0];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone/40 bg-paper-light/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="grid grid-cols-3">
        <Link
          href="/reservierung"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-ink"
        >
          <CalendarCheck className="h-5 w-5" aria-hidden />
          <span className="text-[0.7rem] font-medium">{t('sticky.reserve')}</span>
        </Link>
        <a
          href={callHref(primary)}
          className="flex flex-col items-center justify-center gap-0.5 border-x border-stone/40 py-2.5 text-ink/80"
        >
          <Phone className="h-5 w-5" aria-hidden />
          <span className="text-[0.7rem] font-medium">{t('sticky.call')}</span>
        </a>
        <a
          href={primary.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-ink/80"
        >
          <MapPin className="h-5 w-5" aria-hidden />
          <span className="text-[0.7rem] font-medium">{t('sticky.route')}</span>
        </a>
      </div>
    </div>
  );
}

/** Spacer, damit die Sticky Bar keine Inhalte verdeckt (nur Mobil). */
export function MobileActionBarSpacer() {
  return <div aria-hidden className="h-[60px] lg:hidden" />;
}
