'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import { Figure } from '@/components/ui/Figure';
import { Reveal } from '@/components/motion/Reveal';
import { MaskReveal } from '@/components/motion/MaskReveal';

/**
 * Menü-Teaser — editorial, asymmetrisch. Keine Preise (bewusst nicht erfunden).
 */
const dishes = [
  { key: 'tapas', src: '/images/dishes/tapas.jpg', tone: 'muted' as const, ratio: 'aspect-[4/5]' },
  { key: 'paella', src: '/images/dishes/paella.jpg', tone: 'ink' as const, ratio: 'aspect-[4/5]' },
  { key: 'sangria', src: '/images/dishes/sangria.jpg', tone: 'stone' as const, ratio: 'aspect-[4/5]' },
];

export function SignatureDishes() {
  const t = useT();

  return (
    <section id="gerichte" className="section bg-paper">
      <div className="container-content">
        <div className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <span className="eyebrow mb-5 block">{t('dishes.eyebrow')}</span>
            <h2 className="max-w-[16ch] text-fluid-2xl font-semibold leading-none tracking-tightest text-ink">
              {t('dishes.headline')}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <Link href="/speisekarte" className="link-underline text-fluid-sm font-medium text-ink">
              {t('action.discoverMenu')}
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-3">
          {dishes.map((d, i) => (
            <div key={d.key} className={i === 1 ? 'sm:mt-16' : ''}>
              <MaskReveal delay={i * 0.1}>
                <Figure
                  src={d.src}
                  alt={t(`dishes.${d.key}.title` as never)}
                  tone={d.tone}
                  ratio={d.ratio}
                  label={t(`dishes.${d.key}.title` as never)}
                />
              </MaskReveal>
              <Reveal delay={0.1}>
                <h3 className="mt-5 font-display text-fluid-lg font-semibold tracking-tightest text-ink">
                  {t(`dishes.${d.key}.title` as never)}
                </h3>
                <p className="mt-2 max-w-xs text-fluid-base leading-relaxed text-muted">
                  {t(`dishes.${d.key}.text` as never)}
                </p>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 max-w-prose text-fluid-sm text-muted">{t('dishes.note')}</p>
        </Reveal>
      </div>
    </section>
  );
}
