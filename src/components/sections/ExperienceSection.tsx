'use client';

import { useT } from '@/i18n/LanguageProvider';
import { Figure } from '@/components/ui/Figure';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Atmosphäre — großflächiges Bild mit einer ruhigen Aussage.
 * Keine erfundenen Kennzahlen, kein Effekt-Overload.
 */
export function ExperienceSection() {
  const t = useT();
  return (
    <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-ink-dark text-paper-light">
      <div aria-hidden className="absolute inset-0">
        <Figure
          src="/images/experience/atmosphere.jpg"
          alt="Abendstimmung im La Tasca Flamenca"
          tone="ink"
          ratio=""
          rounded={false}
          className="h-full opacity-80"
          label="Restaurantatmosphäre"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-dark via-ink-dark/40 to-ink-dark/20" />
      </div>
      <div className="container-content relative z-10 py-section">
        <Reveal className="max-w-3xl">
          <p className="text-fluid-2xl font-semibold leading-[1.05] tracking-tightest">
            {t('experience.headline')}
          </p>
          <p className="mt-6 max-w-md text-fluid-base text-paper/70">{t('experience.text')}</p>
        </Reveal>
      </div>
    </section>
  );
}
