import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { LocationsGrid } from '@/components/locations/LocationsGrid';
import { ReservationCTA } from '@/components/sections/ReservationCTA';

export const metadata: Metadata = {
  title: 'Standorte — München & Mallorca',
  description:
    'La Tasca Flamenca in Neuhausen, Berg am Laim, Wolfratshausen und Peguera (Mallorca). Adressen, Öffnungszeiten, Reservierung und Anfahrt.',
  alternates: { canonical: '/standorte' },
};

export default function StandortePage() {
  return (
    <>
      <PageHero
        eyebrow="Unsere Standorte"
        title="Vier Orte, ein Gefühl."
        lead="München und Mallorca – such dir den Tisch, der dir am nächsten ist."
        crumbs={[
          { label: 'Start', href: '/' },
          { label: 'Standorte', href: '/standorte' },
        ]}
      />
      <section className="section bg-cream">
        <div className="container-content">
          <LocationsGrid />
        </div>
      </section>
      <ReservationCTA />
    </>
  );
}
