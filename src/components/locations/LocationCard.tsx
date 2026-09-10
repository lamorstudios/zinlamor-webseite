'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Location } from '@/data/locations';
import { useT } from '@/i18n/LanguageProvider';
import { Figure } from '@/components/ui/Figure';
import { OpenStatusBadge } from '@/components/ui/OpenStatusBadge';
import { callHref, reservationHref } from '@/lib/links';

const tones = ['ink', 'stone', 'muted', 'ink'] as const;

/**
 * Standort — flaches, editoriales Modul (keine Schatten, keine Box-Optik).
 * Bild + Name + Adresse + Status, darunter dezente Textlinks.
 */
export function LocationCard({ location, index = 0 }: { location: Location; index?: number }) {
  const t = useT();
  const detailHref = `/standorte/${location.slug}`;

  return (
    <article className="group flex flex-col">
      <Link href={detailHref} className="relative block overflow-hidden rounded-sm" tabIndex={-1} aria-hidden>
        <Figure
          src={location.image}
          alt={`${location.name}`}
          tone={tones[index % tones.length]}
          ratio="aspect-[4/3]"
          rounded={false}
          label={location.shortName}
          className="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04]"
        />
        {location.franchise && (
          <span className="absolute left-3 top-3 bg-paper-light/90 px-2.5 py-1 text-[0.65rem] uppercase tracking-label text-ink">
            {t('common.franchisePartner')}
          </span>
        )}
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-fluid-lg font-semibold tracking-tightest text-ink">
            <Link href={detailHref} className="transition-opacity group-hover:opacity-60">
              {location.shortName}
            </Link>
          </h3>
          <p className="mt-1 text-fluid-sm text-muted">{location.address}</p>
        </div>
        <Link
          href={detailHref}
          aria-label={t('locations.detailsFor', { name: location.shortName })}
          className="mt-1"
        >
          <ArrowUpRight
            className="h-5 w-5 flex-none text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            aria-hidden
          />
        </Link>
      </div>

      <div className="mt-2">
        <OpenStatusBadge location={location} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-fluid-sm">
        <Link href={reservationHref(location)} className="link-underline font-medium text-ink">
          {t('action.reserveShort')}
        </Link>
        <a
          href={location.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-muted"
        >
          {t('action.route')}
        </a>
        <a href={callHref(location)} className="link-underline text-muted">
          {t('action.call')}
        </a>
      </div>
    </article>
  );
}
