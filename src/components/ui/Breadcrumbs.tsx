import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/data/site';
import { JsonLd } from '@/components/seo/StructuredData';

export interface Crumb {
  label: string;
  href: string;
}

/**
 * Breadcrumb-Navigation inkl. BreadcrumbList-Schema.
 * Der erste Eintrag sollte "Start" (/) sein.
 */
export function Breadcrumbs({
  crumbs,
  light = false,
  className,
}: {
  crumbs: Crumb[];
  light?: boolean;
  className?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `${siteConfig.url}${c.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <JsonLd data={schema} />
      <ol className="flex flex-wrap items-center gap-1.5 text-fluid-sm">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span className={cn('font-medium', light ? 'text-cream/90' : 'text-charcoal/80')} aria-current="page">
                  {c.label}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className={cn(
                    'transition-colors',
                    light ? 'text-cream/70 hover:text-cream' : 'text-charcoal/60 hover:text-burgundy'
                  )}
                >
                  {c.label}
                </Link>
              )}
              {!last && (
                <ChevronRight
                  className={cn('h-3.5 w-3.5', light ? 'text-cream/50' : 'text-charcoal/40')}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
