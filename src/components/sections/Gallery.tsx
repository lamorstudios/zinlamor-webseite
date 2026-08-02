'use client';

import { useT } from '@/i18n/LanguageProvider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Figure } from '@/components/ui/Figure';
import { Reveal } from '@/components/motion/Reveal';
import { InstagramConsent } from './InstagramConsent';

/**
 * Editorial-/Masonry-Galerie. Bilder als Platzhalter (siehe Figure).
 */
const items = [
  { src: '/images/gallery/food-1.jpg', tone: 'terracotta' as const, span: 'row-span-2', label: 'Tapas' },
  { src: '/images/gallery/guests-1.jpg', tone: 'burgundy' as const, span: '', label: 'Gäste' },
  { src: '/images/gallery/interior-1.jpg', tone: 'charcoal' as const, span: '', label: 'Innenraum' },
  { src: '/images/gallery/mallorca-1.jpg', tone: 'sand' as const, span: 'row-span-2', label: 'Mallorca' },
  { src: '/images/gallery/event-1.jpg', tone: 'burgundy' as const, span: '', label: 'Events' },
  { src: '/images/gallery/foodtruck-1.jpg', tone: 'terracotta' as const, span: '', label: 'Foodtruck' },
];

export function Gallery() {
  const t = useT();
  return (
    <section className="section bg-cream-soft">
      <div className="container-content">
        <SectionHeading
          eyebrow={t('gallery.eyebrow')}
          title={t('gallery.headline')}
          subtitle={t('gallery.subline')}
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.src} delay={i * 0.05} className={it.span}>
              <Figure
                src={it.src}
                alt={`Impression: ${it.label}`}
                tone={it.tone}
                ratio=""
                label={it.label}
                className="h-full transition-transform duration-700 ease-out-expo hover:scale-[1.03]"
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <InstagramConsent />
        </div>
      </div>
    </section>
  );
}
