'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import { Figure } from '@/components/ui/Figure';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Erlebnisbereich — starker visueller Abschnitt.
 * Bewusst KEINE erfundenen Kennzahlen (z. B. "20 Jahre", "100.000 Gäste").
 */
export function ExperienceSection() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-charcoal text-cream-soft">
      <div className="grid lg:grid-cols-2">
        <div className="flex items-center px-5 py-section sm:px-8 lg:pl-12 lg:pr-16">
          <div className="mx-auto max-w-xl">
            <Reveal>
              <span className="eyebrow text-brass-light before:bg-brass-light/60">
                {t('experience.eyebrow')}
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 font-serif text-fluid-2xl font-semibold leading-[1.05] text-cream-soft">
                {t('experience.headline')}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-fluid-lg leading-relaxed text-cream/80">
                {t('experience.text')}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <Link href="/events-catering" className="btn-gold mt-8">
                {t('action.requestEvent')}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
        <div className="relative min-h-[50vh] lg:min-h-full">
          <Figure
            src="/images/experience/atmosphere.jpg"
            alt="Volle Tische, geteilte Teller — Abendstimmung im La Tasca Flamenca"
            tone="terracotta"
            ratio=""
            rounded={false}
            className="absolute inset-0 h-full"
            label="Restaurantatmosphäre"
          />
        </div>
      </div>
    </section>
  );
}
