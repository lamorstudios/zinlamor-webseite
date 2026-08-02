import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Figure } from '@/components/ui/Figure';

export const metadata: Metadata = {
  title: 'Foodtruck',
  description:
    'Der La Tasca Flamenca Foodtruck bringt Paella und Tapas frisch zu deinem Event, Markt oder Firmengelände. Jetzt anfragen.',
  alternates: { canonical: '/foodtruck' },
};

export default function FoodtruckPage() {
  return (
    <>
      <PageHero
        eyebrow="Spanien mobil"
        title="Foodtruck"
        lead="Paella und Tapas, frisch zubereitet – dort, wo dein Event stattfindet."
        tone="ink"
        crumbs={[
          { label: 'Start', href: '/' },
          { label: 'Foodtruck', href: '/foodtruck' },
        ]}
      />
      <section className="section bg-paper">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Figure src="/images/foodtruck/foodtruck.jpg" alt="La Tasca Flamenca Foodtruck" tone="ink" ratio="aspect-[4/3]" label="Foodtruck" />
          <div className="max-w-prose">
            <p className="text-fluid-lg leading-relaxed text-ink/80">
              Ob Firmenfeier, Markt, Hochzeit oder Straßenfest: Unser Foodtruck bringt das Spaniengefühl
              direkt zu dir. Erzähl uns von deinem Anlass, und wir machen dir ein Angebot.
            </p>
            <p className="mt-4 text-fluid-sm text-ink/45">
              TODO: Konkrete Foodtruck-Details (Verfügbarkeit, Regionen, Mindestbestellung) durch
              Betreiber ergänzen.
            </p>
            <Link href="/events-catering" className="btn-primary mt-8">
              Foodtruck anfragen
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
