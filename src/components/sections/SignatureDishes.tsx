'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Figure } from '@/components/ui/Figure';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Signature Dishes — emotionale, asymmetrische Anordnung.
 * Keine Preise (werden bewusst nicht erfunden). Verweis auf Standort-Karten.
 */
export function SignatureDishes() {
  const t = useT();

  const dishes = [
    { key: 'tapas', src: '/images/dishes/tapas.jpg', tone: 'terracotta' as const, span: 'sm:col-span-3 sm:row-span-2', ratio: 'aspect-[4/5]' },
    { key: 'paella', src: '/images/dishes/paella.jpg', tone: 'burgundy' as const, span: 'sm:col-span-3', ratio: 'aspect-[16/10]' },
    { key: 'sangria', src: '/images/dishes/sangria.jpg', tone: 'charcoal' as const, span: 'sm:col-span-2', ratio: 'aspect-square' },
    { key: 'dessert', src: '/images/dishes/dessert.jpg', tone: 'sand' as const, span: 'sm:col-span-1', ratio: 'aspect-square' },
  ];

  return (
    <section id="gerichte" className="section bg-cream">
      <div className="container-content">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={t('dishes.eyebrow')}
            title={t('dishes.headline')}
            subtitle={t('dishes.subline')}
            className="max-w-2xl"
          />
          <Reveal>
            <Link href="/speisekarte" className="btn-primary whitespace-nowrap">
              {t('action.discoverMenu')}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-6">
          {dishes.map((d, i) => (
            <Reveal key={d.key} delay={i * 0.06} className={d.span}>
              <figure className="group relative h-full overflow-hidden rounded-2xl">
                <Figure
                  src={d.src}
                  alt={t(`dishes.${d.key}.title` as never)}
                  tone={d.tone}
                  ratio={d.ratio}
                  className="h-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 to-transparent p-5">
                  <h3 className="font-serif text-fluid-lg font-semibold text-cream-soft">
                    {t(`dishes.${d.key}.title` as never)}
                  </h3>
                  <p className="mt-1 text-fluid-sm leading-snug text-cream/80">
                    {t(`dishes.${d.key}.text` as never)}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-6 max-w-prose text-fluid-sm text-charcoal/60">{t('dishes.note')}</p>
        </Reveal>
      </div>
    </section>
  );
}
