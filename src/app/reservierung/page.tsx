import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { LocationSelector } from '@/components/locations/LocationSelector';

export const metadata: Metadata = {
  title: 'Tisch reservieren',
  description:
    'Reserviere deinen Tisch bei La Tasca Flamenca – wähle einfach deinen Standort in München oder auf Mallorca.',
  alternates: { canonical: '/reservierung' },
};

export default function ReservierungPage() {
  return (
    <>
      <PageHero
        eyebrow="In zwei Schritten zum Tisch"
        title="Tisch reservieren"
        lead="Wähle deinen Standort und reservier dir deinen Abend."
        crumbs={[
          { label: 'Start', href: '/' },
          { label: 'Tisch reservieren', href: '/reservierung' },
        ]}
      />
      <section className="section bg-cream">
        <div className="container-content">
          <LocationSelector mode="reserve" />
        </div>
      </section>
    </>
  );
}
