import type { Metadata } from 'next';
import { Mail, Phone } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { LocationsGrid } from '@/components/locations/LocationsGrid';
import { siteConfig } from '@/data/site';
import { locations } from '@/data/locations';
import { callHref } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontakt zu La Tasca Flamenca: Erreiche den Standort deiner Wahl in München oder auf Mallorca direkt – telefonisch, per E-Mail oder vor Ort.',
  alternates: { canonical: '/kontakt' },
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Wir freuen uns auf dich"
        title="Kontakt"
        lead="Fragen, Reservierungen, Anfragen – erreiche den Standort deiner Wahl direkt."
        crumbs={[
          { label: 'Start', href: '/' },
          { label: 'Kontakt', href: '/kontakt' },
        ]}
      />

      <section className="section bg-cream">
        <div className="container-content">
          <div className="mb-10 grid gap-4 sm:grid-cols-2">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="flex items-center gap-4 rounded-2xl border border-sand/50 bg-cream-soft p-5 transition-colors hover:border-terracotta/50"
            >
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-fluid-sm text-charcoal/55">Allgemeine Anfragen</span>
                <span className="block font-medium text-burgundy">{siteConfig.contactEmail}</span>
              </span>
            </a>
            <a
              href={callHref(locations[0])}
              className="flex items-center gap-4 rounded-2xl border border-sand/50 bg-cream-soft p-5 transition-colors hover:border-terracotta/50"
            >
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-fluid-sm text-charcoal/55">{locations[0].shortName}</span>
                <span className="block font-medium text-burgundy">{locations[0].phone}</span>
              </span>
            </a>
          </div>

          <h2 className="mb-6 font-serif text-fluid-xl font-semibold text-burgundy">Alle Standorte</h2>
          <LocationsGrid />
        </div>
      </section>
    </>
  );
}
