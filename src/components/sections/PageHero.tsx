import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';

type Tone = 'burgundy' | 'terracotta' | 'charcoal';

const toneMap: Record<Tone, string> = {
  burgundy: 'from-burgundy-deep via-burgundy-dark to-charcoal',
  terracotta: 'from-burgundy via-terracotta-dark to-burgundy-deep',
  charcoal: 'from-charcoal via-charcoal-light to-burgundy-deep',
};

/**
 * Kompakter Hero für Unterseiten. Dunkler Hintergrund, damit der transparente,
 * fixierte Header lesbar über dem Seitenanfang liegt.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  tone = 'burgundy',
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
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${toneMap[tone]} text-cream-soft`}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #c9a24b 0.6px, transparent 1.2px), radial-gradient(circle at 80% 70%, #c26a49 0.6px, transparent 1.2px)',
          backgroundSize: '32px 32px, 24px 24px',
        }}
      />
      <div className="container-content relative z-10 pb-14 pt-32 sm:pb-16 sm:pt-36 lg:pb-20 lg:pt-40">
        {crumbs && <Breadcrumbs crumbs={crumbs} light className="mb-6" />}
        {eyebrow && <p className="eyebrow text-brass-light before:bg-brass-light/60">{eyebrow}</p>}
        <h1 className="mt-3 max-w-4xl font-serif text-fluid-3xl font-semibold leading-[1.02] tracking-tight">
          {title}
        </h1>
        {lead && <p className="mt-5 max-w-2xl text-fluid-lg leading-relaxed text-cream/85">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
