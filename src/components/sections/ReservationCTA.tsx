'use client';

import Link from 'next/link';
import { CalendarCheck, MapPin } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Großer, emotionaler Abschluss-CTA. Wiederverwendbar (Startseite & Unterseiten).
 */
export function ReservationCTA() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-charcoal text-cream-soft">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-burgundy-deep"
      />
      <div className="container-content relative z-10 py-section text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-serif text-fluid-3xl font-semibold leading-[1.02] text-cream-soft">
            {t('finalCta.headline')}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-4 max-w-lg text-fluid-lg text-cream/80">{t('finalCta.text')}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/reservierung" className="btn-gold">
              <CalendarCheck className="h-4 w-4" aria-hidden />
              {t('action.reserve')}
            </Link>
            <Link href="/standorte" className="btn-outline-light">
              <MapPin className="h-4 w-4" aria-hidden />
              {t('action.chooseLocation')}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
