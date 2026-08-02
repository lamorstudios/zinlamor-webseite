import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Figure } from '@/components/ui/Figure';

export const metadata: Metadata = {
  title: 'Franchise',
  description:
    'La Tasca Flamenca als eigener Standort: Werde Teil unserer Familie. Unser Konzept funktioniert bereits als Franchise – sprich uns an.',
  alternates: { canonical: '/franchise' },
};

const points = [
  'Erprobtes, familiengeführtes Konzept',
  'Spanische Küche mit klarer Identität',
  'Bestehender Franchise-Standort in Wolfratshausen',
  'Persönliche Begleitung beim Aufbau',
];

export default function FranchisePage() {
  return (
    <>
      <PageHero
        eyebrow="Werde Teil der Familie"
        title="Franchise"
        lead="La Tasca Flamenca als eigener Standort – bring spanische Lebensfreude in deine Stadt."
        tone="charcoal"
        crumbs={[
          { label: 'Start', href: '/' },
          { label: 'Franchise', href: '/franchise' },
        ]}
      />
      <section className="section bg-cream">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-prose">
            <p className="text-fluid-lg leading-relaxed text-charcoal/80">
              Du möchtest ein La Tasca Flamenca in deiner Stadt eröffnen? Unser Standort in
              Wolfratshausen zeigt, dass unser Konzept auch als Franchise funktioniert. Sprich uns an –
              wir freuen uns auf dein Interesse.
            </p>
            <ul className="mt-6 grid gap-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-fluid-base text-charcoal/80">
                  <Check className="mt-0.5 h-5 w-5 flex-none text-terracotta" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-lg bg-brass/10 p-3 text-fluid-sm text-charcoal/70">
              TODO: Konkrete Franchise-Informationen, Konditionen und Ansprechpartner durch Betreiber
              ergänzen.
            </p>
            <Link href="/kontakt" className="btn-primary mt-8">
              Interesse anmelden
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <Figure src="/images/franchise/restaurant.jpg" alt="La Tasca Flamenca Restaurant" tone="burgundy" ratio="aspect-[4/5]" label="Dein Standort" />
        </div>
      </section>
    </>
  );
}
