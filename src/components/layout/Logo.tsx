import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * Wortmarke — modern, kompakt. (Das alte Logo-Bild gehörte zu einem anderen
 * Betrieb und wurde nicht übernommen.)
 * TODO: Finales Logo/SVG hier einsetzen, sobald vorhanden.
 */
export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="La Tasca Flamenca — Startseite"
      className={cn(
        'font-display text-[1.05rem] font-semibold leading-none tracking-tightest transition-colors sm:text-[1.15rem]',
        light ? 'text-paper-light' : 'text-ink',
        className
      )}
    >
      La&nbsp;Tasca&nbsp;Flamenca
    </Link>
  );
}
