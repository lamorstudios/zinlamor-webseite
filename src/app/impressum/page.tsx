import type { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { siteConfig } from '@/data/site';
import { locations } from '@/data/locations';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum von La Tasca Flamenca.',
  alternates: { canonical: '/impressum' },
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <PageHero title="Impressum" tone="ink" crumbs={[{ label: 'Start', href: '/' }, { label: 'Impressum', href: '/impressum' }]} />
      <section className="section bg-paper">
        <div className="container-content max-w-prose">
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-muted/40 bg-muted/10 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-none text-muted" aria-hidden />
            <p className="text-fluid-sm text-ink/80">
              TODO: Rechtstexte vor Veröffentlichung anwaltlich bzw. datenschutzrechtlich prüfen lassen.
              Die folgenden Angaben sind Platzhalter und müssen durch den Betreiber vervollständigt werden.
            </p>
          </div>

          <div className="prose-legal flex flex-col gap-6 text-fluid-base leading-relaxed text-ink/80">
            <div>
              <h2 className="font-display text-fluid-lg font-semibold text-ink">Angaben gemäß § 5 DDG</h2>
              <p className="mt-2">
                {siteConfig.legalName}
                <br />
                {/* TODO: vollständige Firmierung, Rechtsform, Anschrift des Betreibers ergänzen */}
                TODO: Betreiberanschrift ergänzen
                <br />
                {locations[0].address}
              </p>
            </div>

            <div>
              <h2 className="font-display text-fluid-lg font-semibold text-ink">Vertreten durch</h2>
              <p className="mt-2">TODO: Vertretungsberechtigte Person(en) ergänzen</p>
            </div>

            <div>
              <h2 className="font-display text-fluid-lg font-semibold text-ink">Kontakt</h2>
              <p className="mt-2">
                Telefon: {locations[0].phone}
                <br />
                E-Mail: {siteConfig.contactEmail} <span className="text-ink/45">(TODO bestätigen)</span>
              </p>
            </div>

            <div>
              <h2 className="font-display text-fluid-lg font-semibold text-ink">Umsatzsteuer-ID</h2>
              <p className="mt-2">TODO: USt-IdNr. gemäß § 27 a UStG ergänzen</p>
            </div>

            <div>
              <h2 className="font-display text-fluid-lg font-semibold text-ink">
                Verantwortlich für den Inhalt
              </h2>
              <p className="mt-2">TODO: Verantwortliche Person nach § 18 Abs. 2 MStV ergänzen</p>
            </div>

            <div>
              <h2 className="font-display text-fluid-lg font-semibold text-ink">Streitschlichtung</h2>
              <p className="mt-2">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted link-underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
