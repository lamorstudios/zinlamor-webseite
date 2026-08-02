import { cn } from '@/lib/cn';

/**
 * BILD-PLATZHALTER (editorial)
 * =========================================================================
 * Es liegt noch kein freigegebenes Bildmaterial vor. Diese Komponente rendert
 * eine ruhige, flächige Platzhalterfläche mit dem VORGESEHENEN Dateipfad.
 *
 * ECHTES BILD EINSETZEN:
 *   1. Datei nach /public{src} legen (z. B. /public/images/hero/hero.jpg)
 *   2. Platzhalter durch <Image fill> aus 'next/image' ersetzen (Beispiel unten).
 *
 * Bewusst neutral gehalten (kein Verlauf, keine Deko) — passend zum cleanen,
 * editorialen Gesamtbild.
 * =========================================================================
 */

type Tone = 'ink' | 'stone' | 'muted';

const toneMap: Record<Tone, string> = {
  ink: 'bg-ink-dark text-paper/45',
  stone: 'bg-stone text-ink/45',
  muted: 'bg-muted text-paper/55',
};

interface FigureProps {
  /** Vorgesehener öffentlicher Pfad, z. B. /images/locations/neuhausen.jpg */
  src: string;
  /** Beschreibender Alt-Text (Pflicht für Barrierefreiheit) */
  alt: string;
  tone?: Tone;
  className?: string;
  /** Aspect-Ratio-Klasse (verhindert Layout-Shift) */
  ratio?: string;
  /** Kurzes Label, was hier zu sehen sein soll */
  label?: string;
  priority?: boolean;
  rounded?: boolean;
}

export function Figure({
  src,
  alt,
  tone = 'ink',
  className,
  ratio = 'aspect-[4/3]',
  label,
  rounded = true,
}: FigureProps) {
  // TODO: Sobald echtes Bildmaterial vorliegt, hier auf next/image umstellen:
  //   import Image from 'next/image';
  //   <div className={cn('relative overflow-hidden', ratio, rounded && 'rounded-sm', className)}>
  //     <Image src={src} alt={alt} fill sizes="..." priority={priority} className="img-cover" />
  //   </div>

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        'relative flex items-end overflow-hidden',
        toneMap[tone],
        ratio,
        rounded && 'rounded-sm',
        className
      )}
    >
      <div className="relative z-10 p-4">
        <span className="block text-[0.62rem] uppercase tracking-label opacity-80">
          {label ?? 'Bild'}
        </span>
        <code className="mt-1 block text-[0.6rem] opacity-60">{src}</code>
      </div>
    </div>
  );
}
