'use client';

import { useT } from '@/i18n/LanguageProvider';
import { locations } from '@/data/locations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LocationCard } from '@/components/locations/LocationCard';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Standortübersicht.
 * Desktop: großzügiges Grid. Mobile: horizontales Swipe-Layout (snap).
 */
export function LocationsOverview() {
  const t = useT();
  return (
    <section id="standorte" className="section bg-cream-soft">
      <div className="container-content">
        <SectionHeading
          eyebrow={t('locations.eyebrow')}
          title={t('locations.headline')}
          subtitle={t('locations.subline')}
          className="max-w-2xl"
        />

        {/* Mobile: Swipe */}
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:hidden">
          {locations.map((l, i) => (
            <div key={l.slug} className="w-[85%] flex-none snap-start">
              <LocationCard location={l} index={i} />
            </div>
          ))}
        </div>

        {/* Tablet/Desktop: Grid */}
        <div className="mt-10 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((l, i) => (
            <Reveal key={l.slug} delay={i * 0.06}>
              <LocationCard location={l} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
