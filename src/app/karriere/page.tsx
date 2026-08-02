import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Karriere',
  description:
    'Werde Teil des La Tasca Flamenca Teams – in Service, Küche oder Bar. Wir suchen Menschen, die spanische Gastfreundschaft leben.',
  alternates: { canonical: '/karriere' },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Arbeiten bei uns"
        title="Werde Teil des Teams."
        lead="Ob mit Erfahrung oder als Quereinsteiger:in – wenn du Lust auf lebendige Abende und ein herzliches Team hast, melde dich."
        crumbs={[
          { label: 'Start', href: '/' },
          { label: 'Karriere', href: '/karriere' },
        ]}
      />
      <section className="section bg-paper">
        <div className="container-content max-w-prose">
          <p className="text-fluid-lg leading-relaxed text-ink/80">
            Wir suchen Menschen, die spanische Gastfreundschaft leben – in Service, Küche und Bar, an
            allen unseren Standorten.
          </p>
          <p className="mt-6 rounded-lg bg-muted/10 p-3 text-fluid-sm text-ink/70">
            TODO: Konkrete offene Stellen und Bewerbungsweg durch Betreiber ergänzen.
          </p>
          <a href={`mailto:${siteConfig.contactEmail}?subject=Initiativbewerbung`} className="btn-primary mt-8">
            Initiativ bewerben
          </a>
        </div>
      </section>
    </>
  );
}
