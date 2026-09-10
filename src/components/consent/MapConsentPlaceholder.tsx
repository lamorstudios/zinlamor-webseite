'use client';

import { MapPin, ExternalLink } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import type { Location } from '@/data/locations';
import { useConsent, useHasConsent } from './ConsentProvider';

/**
 * Google Maps wird ERST nach Einwilligung (Kategorie "externe Medien") geladen.
 * Ohne Zustimmung: datenschutzfreundlicher Platzhalter + direkter Routenlink
 * (öffnet Google Maps in neuem Tab, ohne Einbettung/Tracking auf der Seite).
 */
export function MapConsentPlaceholder({ location }: { location: Location }) {
  const t = useT();
  const allowed = useHasConsent('external');
  const { save } = useConsent();

  if (allowed && location.mapsEmbedUrl) {
    return (
      <div className="overflow-hidden rounded-2xl border border-stone/50">
        <iframe
          src={location.mapsEmbedUrl}
          title={`Karte: ${location.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[360px] w-full border-0"
        />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[280px] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-stone/50 bg-gradient-to-br from-stone/40 to-paper-dark p-8 text-center">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(#c26a4933 1px, transparent 1px), linear-gradient(90deg, #c26a4933 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper-light">
        <MapPin className="h-6 w-6" aria-hidden />
      </span>
      <div className="relative max-w-sm">
        <h3 className="font-display text-fluid-base font-semibold text-ink">{t('map.title')}</h3>
        <p className="mt-1.5 text-fluid-sm text-ink/70">{t('map.text')}</p>
      </div>
      <div className="relative flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => save({ external: true })}
          className="btn-primary"
        >
          {t('map.load')}
        </button>
        <a
          href={location.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-ink/80"
        >
          {t('action.openRoute')}
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </div>
  );
}
