'use client';

import { useT } from '@/i18n/LanguageProvider';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Kurze Markenbotschaft — ein starker Satz statt vieler Absätze.
 * Große, ruhige Typografie, viel Weißraum.
 */
export function BrandIntro() {
  const t = useT();
  return (
    <section className="section bg-paper">
      <div className="container-content">
        <div className="grid gap-8 lg:grid-cols-[0.35fr_1fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">{t('intro.eyebrow')}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-[20ch] text-fluid-2xl font-semibold leading-[1.05] tracking-tightest text-ink">
              {t('intro.headline')}
            </p>
            <p className="mt-8 max-w-prose text-fluid-lg leading-relaxed text-muted">
              {t('intro.text')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
