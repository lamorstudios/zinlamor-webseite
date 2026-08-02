import { Star, ExternalLink } from 'lucide-react';

export interface Review {
  quote: string;
  author: string;
  /** Quelle, z. B. "Google" oder "TripAdvisor" — Pflicht (Transparenz) */
  source: string;
  url?: string;
  /** 1–5, nur wenn echt vorhanden */
  rating?: number;
}

/**
 * Karte für eine EINZELNE, echte Bewertung mit Quellenangabe.
 * Wird nur gerendert, wenn freigegebene Zitate vorliegen.
 */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-sand/50 bg-cream-soft p-6">
      {typeof review.rating === 'number' && (
        <div className="mb-3 flex gap-1 text-brass" aria-label={`${review.rating} von 5 Sternen`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={i < review.rating! ? 'h-4 w-4 fill-current' : 'h-4 w-4 opacity-30'}
              aria-hidden
            />
          ))}
        </div>
      )}
      <blockquote className="flex-1 text-fluid-base leading-relaxed text-charcoal/85">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-4 flex items-center justify-between gap-2 text-fluid-sm">
        <span className="font-medium text-burgundy">{review.author}</span>
        {review.url ? (
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-charcoal/55 hover:text-terracotta"
          >
            {review.source}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        ) : (
          <span className="text-charcoal/55">{review.source}</span>
        )}
      </figcaption>
    </figure>
  );
}
