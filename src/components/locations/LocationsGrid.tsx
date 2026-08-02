'use client';

import { locations } from '@/data/locations';
import { LocationCard } from './LocationCard';
import { Reveal } from '@/components/motion/Reveal';

export function LocationsGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {locations.map((l, i) => (
        <Reveal key={l.slug} delay={i * 0.06}>
          <LocationCard location={l} index={i} />
        </Reveal>
      ))}
    </div>
  );
}
