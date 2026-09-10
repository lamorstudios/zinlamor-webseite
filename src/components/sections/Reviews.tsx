'use client';

import { Star, ExternalLink } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/data/site';
import { ReviewCard, type Review } from './ReviewCard';

/**
 * Bewertungsbereich.
 * WICHTIG: Es werden KEINE Bewertungen, Namen, Zitate oder Sterne erfunden und
 * KEIN externes Bewertungswidget ungefragt geladen. Verweis auf echte Quellen.
 *
 * Sobald echte, freigegebene Zitate vorliegen, in `realReviews` eintragen
 * (mit Quelle). Kein Aggregate-Rating-Schema ohne echte Daten!
 */
const realReviews: Review[] = [
  // Beispiel-Struktur (auskommentiert, da noch keine freigegebenen Zitate vorliegen):
  // { quote: '…', author: 'Vorname N.', source: 'Google', url: 'https://…' },
];

export function Reviews() {
  const t = useT();
  const hasReviews = realReviews.length > 0;

  return (
    <section className="section bg-paper">
      <div className="container-content">
        <SectionHeading
          eyebrow={t('reviews.eyebrow')}
          title={t('reviews.headline')}
          subtitle={t('reviews.subline')}
          align="center"
          className="mx-auto max-w-2xl"
        />

        {hasReviews ? (
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {realReviews.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-dashed border-stone/70 bg-paper-light p-8 text-center">
            <div className="mb-3 flex justify-center gap-1 text-muted" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className="text-fluid-base text-ink/70">{t('reviews.placeholder')}</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://www.google.com/maps/search/La+Tasca+Flamenca"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-ink/80"
              >
                {t('reviews.openGoogle')}
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={siteConfig.social.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-ink/80"
              >
                {t('reviews.openTripadvisor')}
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
