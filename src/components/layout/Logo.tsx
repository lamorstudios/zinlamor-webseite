import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * Wortmarke. (Das alte Logo-Bild gehörte zu einem anderen Betrieb und wurde
 * nicht übernommen.)
 * TODO: Sobald ein finales Logo/SVG vorliegt, hier als <Image>/Inline-SVG einsetzen.
 */
export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="La Tasca Flamenca — Startseite"
      className={cn('group inline-flex flex-col leading-none', className)}
    >
      <span
        className={cn(
          'font-serif text-[1.35rem] font-semibold tracking-tight transition-colors sm:text-[1.55rem]',
          light ? 'text-cream-soft' : 'text-burgundy'
        )}
      >
        La Tasca Flamenca
      </span>
      <span
        className={cn(
          'text-[0.6rem] font-sans font-medium uppercase tracking-[0.35em] transition-colors',
          light ? 'text-brass-light/90' : 'text-terracotta'
        )}
      >
        Bar de Tapas
      </span>
    </Link>
  );
}
