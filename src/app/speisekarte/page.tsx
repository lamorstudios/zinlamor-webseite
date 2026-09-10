import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { LocationSelector } from '@/components/locations/LocationSelector';

export const metadata: Metadata = {
  title: 'Speisekarte',
  description:
    'Tapas, Paella, Sangria und mehr: Wähle deinen Standort und entdecke die Speisekarte von La Tasca Flamenca.',
  alternates: { canonical: '/speisekarte' },
};

export default function SpeisekartePage() {
  return (
    <>
      <PageHero
        eyebrow="Aus der Küche"
        title="Speisekarte"
        lead="Wähle deinen Standort – die Karten unterscheiden sich je nach Ort."
        tone="ink"
        crumbs={[
          { label: 'Start', href: '/' },
          { label: 'Speisekarte', href: '/speisekarte' },
        ]}
      />
      <section className="section bg-paper">
        <div className="container-content">
          <p className="mb-8 max-w-prose rounded-lg bg-muted/10 p-3 text-fluid-sm text-ink/70">
            TODO: Speisekarten-Links (PDF) je Standort in <code>src/data/locations.ts</code> hinterlegen.
          </p>
          <LocationSelector mode="menu" />
        </div>
      </section>
    </>
  );
}
