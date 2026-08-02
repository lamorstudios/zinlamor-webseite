import type { Metadata } from 'next';
import { PartyPopper, ChefHat, Truck, Building2, Cake, Heart } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Figure } from '@/components/ui/Figure';
import { EventForm } from '@/components/forms/EventForm';

export const metadata: Metadata = {
  title: 'Events & Catering',
  description:
    'Private Feiern, Hochzeiten, Firmenevents, Catering und Foodtruck: La Tasca Flamenca bringt spanische Lebensfreude zu deinem Anlass. Jetzt anfragen.',
  alternates: { canonical: '/events-catering' },
};

const offers = [
  { icon: Cake, title: 'Geburtstage', text: 'Feiern in geselliger Runde mit Menüs zum Teilen.' },
  { icon: Heart, title: 'Hochzeiten', text: 'Ein spanischer Abend für euren großen Tag.' },
  { icon: Building2, title: 'Firmenevents', text: 'Vom Team-Dinner bis zur Weihnachtsfeier.' },
  { icon: PartyPopper, title: 'Private Feiern', text: 'Exklusiv buchbare Bereiche für deinen Anlass.' },
  { icon: ChefHat, title: 'Catering', text: 'Tapas & Paella – frisch zu dir gebracht.' },
  { icon: Truck, title: 'Foodtruck', text: 'Spanien mobil – für Märkte, Feste und Firmen.' },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Feiern & Genießen"
        title="Für deine Anlässe."
        lead="Von der intimen Feier bis zum großen Fest – wir bringen spanische Lebensfreude zu deinem Anlass."
        crumbs={[
          { label: 'Start', href: '/' },
          { label: 'Events & Catering', href: '/events-catering' },
        ]}
      />

      <section className="section bg-cream">
        <div className="container-content">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((o) => {
              const Icon = o.icon;
              return (
                <div key={o.title} className="rounded-2xl border border-sand/50 bg-cream-soft p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="mt-4 font-serif text-fluid-lg font-semibold text-burgundy">{o.title}</h2>
                  <p className="mt-2 text-fluid-base text-charcoal/70">{o.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-cream-soft">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[40vh] lg:min-h-full">
            <Figure src="/images/events/celebration.jpg" alt="Feiern im La Tasca Flamenca" tone="burgundy" ratio="" rounded={false} className="absolute inset-0 h-full" label="Feiern & Events" />
          </div>
          <div className="px-5 py-section sm:px-8 lg:px-12">
            <div className="mx-auto max-w-xl">
              <span className="eyebrow">Anfrage</span>
              <h2 className="mt-4 font-serif text-fluid-2xl font-semibold text-burgundy">
                Erzähl uns von deinem Anlass.
              </h2>
              <p className="mt-3 text-fluid-base text-charcoal/70">
                Wir melden uns so schnell wie möglich mit einem passenden Vorschlag.
              </p>
              <div className="mt-8">
                <EventForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
