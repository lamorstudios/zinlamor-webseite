'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Großer, ruhiger Abschluss-CTA. Soft-Black, viel Weißraum, übergroße Headline.
 */
export function ReservationCTA() {
  const t = useT();
  return (
    <section className="bg-ink text-paper-light">
      <div className="container-content py-section">
        <Reveal>
          <h2 className="max-w-[14ch] text-fluid-3xl font-semibold leading-[0.95] tracking-tightest">
            {t('finalCta.headline')}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-col gap-6 border-t border-line-light pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-fluid-base text-paper/70">{t('finalCta.text')}</p>
            <div className="flex flex-none items-center gap-6">
              <Link href="/reservierung" className="btn-gold group">
                {t('action.reserve')}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
              <Link href="/standorte" className="link-underline text-fluid-sm font-medium text-paper-light">
                {t('action.chooseLocation')}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
