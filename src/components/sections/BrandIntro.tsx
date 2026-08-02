'use client';

import { useT } from '@/i18n/LanguageProvider';
import { Figure } from '@/components/ui/Figure';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Marken-Intro — editorial. Großes Hauptbild mit überlappendem kleinerem Bild.
 */
export function BrandIntro() {
  const t = useT();
  return (
    <section className="section bg-cream">
      <div className="container-content grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Bildlayout */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <Figure
              src="/images/intro/table-main.jpg"
              alt="Gedeckter Tisch mit spanischen Tapas zum Teilen"
              tone="burgundy"
              ratio="aspect-[4/5]"
              label="Tapas am Tisch"
              className="w-[85%]"
            />
            <div className="absolute -bottom-8 right-0 w-[52%] overflow-hidden rounded-2xl border-4 border-cream shadow-soft">
              <Figure
                src="/images/intro/hands-sharing.jpg"
                alt="Hände greifen gemeinsam nach kleinen Tellern"
                tone="terracotta"
                ratio="aspect-square"
                rounded={false}
                label="Teilen"
              />
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">{t('intro.eyebrow')}</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-serif text-fluid-2xl font-semibold leading-[1.05] text-burgundy">
              {t('intro.headline')}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-fluid-lg leading-relaxed text-charcoal/80">{t('intro.text')}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 text-fluid-base leading-relaxed text-charcoal/70">{t('intro.text2')}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
