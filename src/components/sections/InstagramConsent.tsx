'use client';

import { Instagram, ExternalLink } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import { useConsent, useHasConsent } from '@/components/consent/ConsentProvider';
import { siteConfig } from '@/data/site';

/**
 * Instagram-Bereich. Der eingebettete Feed lädt NUR nach Einwilligung
 * (Kategorie "externe Medien"). Ohne Zustimmung: datenschutzfreundlicher
 * Platzhalter mit direktem Link zum Profil (kein Tracking).
 *
 * TODO: Bei aktivierter Einwilligung echten Feed-Einbindungscode einsetzen
 * (z. B. datenschutzkonformes Widget). Aktuell Verweis aufs Profil.
 */
export function InstagramConsent() {
  const t = useT();
  const allowed = useHasConsent('external');
  const { openSettings } = useConsent();

  return (
    <div className="overflow-hidden rounded-2xl border border-stone/50 bg-paper p-8 text-center">
      <span className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink/10 text-ink">
        <Instagram className="h-6 w-6" aria-hidden />
      </span>
      <h3 className="font-display text-fluid-lg font-semibold text-ink">
        {t('social.instagramTitle')}
      </h3>

      {allowed ? (
        <div className="mt-4">
          {/* TODO: Hier echten Instagram-Feed einbetten (Consent liegt vor). */}
          <p className="text-fluid-sm text-ink/60">
            TODO: Instagram-Feed-Einbindung ergänzen.
          </p>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4"
          >
            {t('social.openInstagram')}
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      ) : (
        <>
          <p className="mx-auto mt-3 max-w-md text-fluid-sm text-ink/70">
            {t('social.instagramText')}
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={openSettings} className="btn-primary">
              {t('social.loadFeed')}
            </button>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-ink/80"
            >
              {t('social.openInstagram')}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </>
      )}
    </div>
  );
}
