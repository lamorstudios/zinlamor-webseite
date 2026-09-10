import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';

type Tone = 'ink' | 'paper';

/**
 * Kompakter Seitenkopf für Unterseiten. Zwei ruhige Varianten:
 * - 'ink'  : Soft-Black-Fläche, heller Text (Standard).
 * - 'paper': helle Fläche, dunkler Text (für Textseiten).
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  tone = 'ink',
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: Tone;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  const dark = tone === 'ink';
  return (
    <section className={dark ? 'bg-ink text-paper-light' : 'bg-paper text-ink'}>
      <div className="container-content pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
        {crumbs && <Breadcrumbs crumbs={crumbs} light={dark} className="mb-8" />}
        {eyebrow && (
          <p className={dark ? 'eyebrow text-muted-light' : 'eyebrow'}>{eyebrow}</p>
        )}
        <h1 className="mt-4 max-w-5xl text-fluid-3xl font-semibold leading-[0.98] tracking-tightest">
          {title}
        </h1>
        {lead && (
          <p
            className={cnLead(dark)}
          >
            {lead}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

function cnLead(dark: boolean) {
  return `mt-6 max-w-2xl text-fluid-lg leading-relaxed ${dark ? 'text-paper/70' : 'text-muted'}`;
}
