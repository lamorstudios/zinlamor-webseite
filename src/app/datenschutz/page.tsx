import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung von La Tasca Flamenca.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        title="Datenschutzerklärung"
        tone="charcoal"
        crumbs={[{ label: 'Start', href: '/' }, { label: 'Datenschutz', href: '/datenschutz' }]}
      />
      <section className="section bg-cream">
        <div className="container-content max-w-prose">
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-brass/40 bg-brass/10 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-none text-brass-dark" aria-hidden />
            <p className="text-fluid-sm text-charcoal/80">
              TODO: Rechtstexte vor Veröffentlichung anwaltlich bzw. datenschutzrechtlich prüfen lassen.
              Die folgende Fassung ist ein struktureller Platzhalter, der an die tatsächlich
              eingesetzten Dienste angepasst werden muss.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-fluid-base leading-relaxed text-charcoal/80">
            <div>
              <h2 className="font-serif text-fluid-lg font-semibold text-burgundy">1. Verantwortlicher</h2>
              <p className="mt-2">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist der Betreiber von{' '}
                {siteConfig.name}. Die vollständigen Kontaktdaten findest du im{' '}
                <Link href="/impressum" className="text-terracotta link-underline">
                  Impressum
                </Link>
                . (TODO: Verantwortlichen konkretisieren.)
              </p>
            </div>

            <div>
              <h2 className="font-serif text-fluid-lg font-semibold text-burgundy">
                2. Hosting &amp; Server-Logfiles
              </h2>
              <p className="mt-2">
                Beim Aufruf der Website werden durch den Hosting-Anbieter technisch notwendige Daten
                (z. B. IP-Adresse, Zeitpunkt, aufgerufene Seite) verarbeitet. Rechtsgrundlage ist Art. 6
                Abs. 1 lit. f DSGVO. (TODO: Hosting-Anbieter benennen, ggf. AV-Vertrag.)
              </p>
            </div>

            <div>
              <h2 className="font-serif text-fluid-lg font-semibold text-burgundy">3. Cookies &amp; Einwilligung</h2>
              <p className="mt-2">
                Wir setzen technisch notwendige Cookies ein. Einwilligungspflichtige Dienste (Statistik,
                Marketing, externe Medien) werden erst nach deiner Zustimmung geladen. Deine Auswahl
                kannst du jederzeit in den{' '}
                <Link href="/cookie-einstellungen" className="text-terracotta link-underline">
                  Cookie-Einstellungen
                </Link>{' '}
                anpassen (Widerruf für die Zukunft).
              </p>
            </div>

            <div>
              <h2 className="font-serif text-fluid-lg font-semibold text-burgundy">4. Schriftarten</h2>
              <p className="mt-2">
                Schriftarten werden lokal ausgeliefert (Self-Hosting via next/font). Es erfolgt kein
                Verbindungsaufbau zu Google-Servern beim Laden der Website.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-fluid-lg font-semibold text-burgundy">
                5. Google Maps (externe Medien)
              </h2>
              <p className="mt-2">
                Kartenmaterial von Google Maps wird ausschließlich nach deiner ausdrücklichen
                Einwilligung (Kategorie „externe Medien“) geladen. Dabei können Daten an Google
                übertragen werden. Ohne Einwilligung zeigen wir einen Platzhalter mit direktem
                Routenlink. (TODO: Anbieterangaben Google Ireland Ltd. ergänzen.)
              </p>
            </div>

            <div>
              <h2 className="font-serif text-fluid-lg font-semibold text-burgundy">
                6. Social Media (Instagram, Facebook, TripAdvisor)
              </h2>
              <p className="mt-2">
                Verlinkungen zu sozialen Netzwerken werden als einfache Links umgesetzt. Ein eingebetteter
                Instagram-Feed wird nur nach Einwilligung geladen. (TODO: konkrete Einbindung
                dokumentieren.)
              </p>
            </div>

            <div>
              <h2 className="font-serif text-fluid-lg font-semibold text-burgundy">
                7. Kontakt- &amp; Anfrageformulare
              </h2>
              <p className="mt-2">
                Wenn du uns über ein Formular kontaktierst, verarbeiten wir die angegebenen Daten zur
                Bearbeitung deiner Anfrage (Art. 6 Abs. 1 lit. a und b DSGVO). (TODO: Verarbeitungsweg
                und Speicherdauer ergänzen, sobald ein Versanddienst angebunden ist.)
              </p>
            </div>

            <div>
              <h2 className="font-serif text-fluid-lg font-semibold text-burgundy">8. Newsletter</h2>
              <p className="mt-2">
                Für den Newsletter ist ein Double-Opt-in-Verfahren vorgesehen. (TODO: Newsletter-Dienst
                und Verarbeitung ergänzen, sobald angebunden.)
              </p>
            </div>

            <div>
              <h2 className="font-serif text-fluid-lg font-semibold text-burgundy">9. Deine Rechte</h2>
              <p className="mt-2">
                Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
                Datenübertragbarkeit und Widerspruch sowie ein Beschwerderecht bei einer
                Aufsichtsbehörde.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
