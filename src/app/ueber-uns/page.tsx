import type { Metadata } from 'next';
import { Users, HandHeart, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Figure } from '@/components/ui/Figure';
import { ReservationCTA } from '@/components/sections/ReservationCTA';

export const metadata: Metadata = {
  title: 'Über uns',
  description:
    'La Tasca Flamenca – eines der ersten spanischen Restaurants Münchens. Ehrliche, mediterrane Küche zum Teilen, seit vielen Jahren an mehreren Standorten.',
  alternates: { canonical: '/ueber-uns' },
};

const values = [
  { icon: Users, title: 'Teilen', text: 'Essen ist bei uns gemeinschaftlich. Kleine Teller, große Runde.' },
  { icon: Sparkles, title: 'Ehrlichkeit', text: 'Frische Zutaten, klare Aromen, keine Effekthascherei.' },
  { icon: HandHeart, title: 'Gastfreundschaft', text: 'Du sollst dich fühlen wie eingeladen – nicht wie bedient.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Seit den Anfängen spanischer Küche in München"
        title="Eine Familie, viele Tische."
        lead="La Tasca Flamenca begann als eines der ersten spanischen Restaurants Münchens – und ist bis heute ein Ort geblieben, an dem geteilt, gelacht und lange gesessen wird."
        crumbs={[
          { label: 'Start', href: '/' },
          { label: 'Über uns', href: '/ueber-uns' },
        ]}
      />

      <section className="section bg-cream">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <Figure src="/images/about/story.jpg" alt="Spanische Küche zum Teilen" tone="burgundy" ratio="aspect-[4/5]" label="Unsere Geschichte" />
          </div>
          <div className="max-w-prose">
            <p className="text-fluid-lg leading-relaxed text-charcoal/80">
              Spanische Küche lebt vom Teilen. Von kleinen Tellern, langen Gesprächen und Abenden, die
              später enden als geplant. Genau dieses Gefühl bringen wir seit vielen Jahren an unsere
              Tische – in Neuhausen, im Werksviertel, in Wolfratshausen und auf Mallorca.
            </p>
            <p className="mt-4 text-fluid-base leading-relaxed text-charcoal/70">
              Unsere Küche ist ehrlich und mediterran: viel Frisches, viel Meeresfrüchte, viel Gemüse,
              dazu Paella aus der Pfanne und hausgemachte Sangria. Nichts Kompliziertes – aber alles mit
              Herz.
            </p>
            {/* TODO: Gründungsjahr / konkrete Historie durch Betreiber bestätigen und ergänzen. */}
            <p className="mt-4 text-fluid-sm text-charcoal/45">
              TODO: Genaue Gründungsgeschichte und Jahreszahlen durch Betreiber bestätigen.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-cream-soft">
        <div className="container-content">
          <h2 className="font-serif text-fluid-2xl font-semibold text-burgundy">Wofür wir stehen</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="rounded-2xl border border-sand/50 bg-cream p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-serif text-fluid-lg font-semibold text-burgundy">{v.title}</h3>
                  <p className="mt-2 text-fluid-base text-charcoal/70">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ReservationCTA />
    </>
  );
}
