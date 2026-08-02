'use client';

import Link from 'next/link';
import { ArrowUpRight, MapPin, Phone, Utensils, CalendarCheck } from 'lucide-react';
import type { Location } from '@/data/locations';
import { useT } from '@/i18n/LanguageProvider';
import { Figure } from '@/components/ui/Figure';
import { OpenStatusBadge } from '@/components/ui/OpenStatusBadge';
import { callHref, menuHref, reservationHref } from '@/lib/links';

const tones = ['burgundy', 'terracotta', 'charcoal', 'sand'] as const;

export function LocationCard({ location, index = 0 }: { location: Location; index?: number }) {
  const t = useT();
  const detailHref = `/standorte/${location.slug}`;

  return (
    <article className="card group flex flex-col border border-sand/40 transition-shadow duration-300 hover:shadow-card">
      <Link href={detailHref} className="relative block overflow-hidden" tabIndex={-1} aria-hidden>
        <Figure
          src={location.image}
          alt={`${location.name} — Innenraum`}
          tone={tones[index % tones.length]}
          ratio="aspect-[16/10]"
          rounded={false}
          label={location.shortName}
          className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
        {location.franchise && (
          <span className="absolute left-3 top-3 rounded-full bg-cream-soft/90 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wide text-burgundy backdrop-blur">
            {t('common.franchisePartner')}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-serif text-fluid-lg font-semibold text-burgundy">
              <Link href={detailHref} className="after:absolute after:inset-0">
                {location.shortName}
              </Link>
            </h3>
            <p className="mt-0.5 text-fluid-sm text-charcoal/65">{location.city}</p>
          </div>
          <ArrowUpRight
            className="h-5 w-5 flex-none text-terracotta transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </div>

        <p className="flex items-start gap-2 text-fluid-sm text-charcoal/75">
          <MapPin className="mt-0.5 h-4 w-4 flex-none text-terracotta" aria-hidden />
          {location.address}
        </p>

        <OpenStatusBadge location={location} />

        {/* Aktionen — relative z-10, damit sie über dem Stretched-Link liegen */}
        <div className="relative z-10 mt-auto grid grid-cols-2 gap-2 pt-2">
          <a href={callHref(location)} className="btn-outline text-charcoal/80">
            <Phone className="h-4 w-4" aria-hidden />
            {t('action.call')}
          </a>
          <a
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-charcoal/80"
          >
            <MapPin className="h-4 w-4" aria-hidden />
            {t('action.route')}
          </a>
          <Link href={menuHref(location)} className="btn-outline text-charcoal/80">
            <Utensils className="h-4 w-4" aria-hidden />
            {t('action.viewMenu')}
          </Link>
          <Link href={reservationHref(location)} className="btn-primary">
            <CalendarCheck className="h-4 w-4" aria-hidden />
            {t('action.reserveShort')}
          </Link>
        </div>
      </div>
    </article>
  );
}
