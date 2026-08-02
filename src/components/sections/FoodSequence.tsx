'use client';

import { Figure } from '@/components/ui/Figure';
import { MaskReveal } from '@/components/motion/MaskReveal';

/**
 * Großflächige Food-Bildsequenz (full-bleed). Wechselnde Formate,
 * Mask-Reveal beim Scrollen. Reine Bildfläche, kein Text — lässt die
 * Fotografie wirken.
 *
 * TODO: echte Food-Fotografie einsetzen (siehe public/images/PLATZHALTER.md).
 */
const shots = [
  { src: '/images/dishes/paella.jpg', alt: 'Paella aus der Pfanne', tone: 'ink' as const, ratio: 'aspect-[3/4]', label: 'Paella' },
  { src: '/images/gallery/food-1.jpg', alt: 'Tapas, Nahaufnahme', tone: 'muted' as const, ratio: 'aspect-[4/5]', label: 'Tapas', pad: 'sm:mt-16' },
  { src: '/images/dishes/sangria.jpg', alt: 'Sangria & Wein', tone: 'stone' as const, ratio: 'aspect-[3/4]', label: 'Sangria' },
];

export function FoodSequence() {
  return (
    <section className="bg-ink py-section text-paper-light">
      <div className="container-content">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {shots.map((s, i) => (
            <MaskReveal
              key={s.src}
              delay={i * 0.12}
              className={`${s.pad ?? ''} ${i === 2 ? 'col-span-2 lg:col-span-1' : ''}`}
            >
              <Figure src={s.src} alt={s.alt} tone={s.tone} ratio={s.ratio} label={s.label} />
            </MaskReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
