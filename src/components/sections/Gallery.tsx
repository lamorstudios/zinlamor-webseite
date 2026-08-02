'use client';

import { useT } from '@/i18n/LanguageProvider';
import { Figure } from '@/components/ui/Figure';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Reduzierte Galerie — ruhiges Editorial-Raster. Kein Instagram-Feed auf der
 * Startseite (bewusst zurückhaltend).
 */
const items = [
  { src: '/images/gallery/interior-1.jpg', tone: 'ink' as const, ratio: 'aspect-[4/5]', label: 'Innenraum' },
  { src: '/images/gallery/guests-1.jpg', tone: 'muted' as const, ratio: 'aspect-[4/5]', label: 'Gäste', pad: true },
  { src: '/images/gallery/mallorca-1.jpg', tone: 'stone' as const, ratio: 'aspect-[4/5]', label: 'Mallorca' },
  { src: '/images/gallery/food-1.jpg', tone: 'ink' as const, ratio: 'aspect-[4/5]', label: 'Tapas', pad: true },
];

export function Gallery() {
  const t = useT();
  return (
    <section className="section bg-paper">
      <div className="container-content">
        <Reveal className="mb-12">
          <span className="eyebrow">{t('gallery.eyebrow')}</span>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {items.map((it, i) => (
            <MaskReveal key={it.src} delay={i * 0.08} className={it.pad ? 'sm:mt-10' : ''}>
              <Figure src={it.src} alt={`Impression: ${it.label}`} tone={it.tone} ratio={it.ratio} label={it.label} />
            </MaskReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
