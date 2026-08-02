import Link from 'next/link';
import { locations } from '@/data/locations';

/**
 * 404-Seite. Server-Komponente (kein Consent/Locale-Kontext nötig).
 * Deutsche Basissprache.
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-burgundy-deep text-cream-soft">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 30%, #c9a24b 0.6px, transparent 1.2px), radial-gradient(circle at 75% 65%, #c26a49 0.6px, transparent 1.2px)',
          backgroundSize: '34px 34px, 26px 26px',
        }}
      />
      <div className="container-content relative z-10 text-center">
        <p className="eyebrow mx-auto text-brass-light before:bg-brass-light/60">404</p>
        <h1 className="mt-4 font-serif text-fluid-3xl font-semibold">Diese Seite gibt es nicht (mehr).</h1>
        <p className="mx-auto mt-4 max-w-md text-fluid-lg text-cream/80">
          Vielleicht hast du dich verlaufen – zum Glück ist der Tisch nicht weit.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-gold">
            Zurück zur Startseite
          </Link>
          <Link href="/standorte" className="btn-outline-light">
            Standorte
          </Link>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-fluid-sm text-cream/70">
          {locations.map((l) => (
            <li key={l.slug}>
              <Link href={`/standorte/${l.slug}`} className="link-underline">
                {l.shortName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
