import { cn } from '@/lib/cn';
import { ImageOff } from 'lucide-react';

/**
 * BILD-PLATZHALTER
 * =========================================================================
 * Es liegt noch kein freigegebenes Bildmaterial vor. Diese Komponente rendert
 * bewusst einen hochwertigen Platzhalter mit dem VORGESEHENEN Dateipfad.
 *
 * SO WIRD EIN ECHTES BILD EINGESETZT:
 *   1. Datei nach /public{src} legen (z. B. /public/images/hero/hero.jpg)
 *   2. In dieser Datei den Platzhalter durch <Image> aus 'next/image' ersetzen
 *      (Beispiel-Code unten auskommentiert) — oder das `hasImage`-Flag setzen.
 *
 * Warme Verlaufsflächen wechseln je nach `tone`, damit das Layout auch ohne
 * Fotos gestalterisch trägt.
 * =========================================================================
 */

type Tone = 'burgundy' | 'terracotta' | 'sand' | 'charcoal';

const toneMap: Record<Tone, string> = {
  burgundy: 'from-burgundy via-burgundy-dark to-burgundy-deep text-cream/70',
  terracotta: 'from-terracotta via-terracotta-dark to-burgundy text-cream/80',
  sand: 'from-sand via-cream-dark to-sand-dark text-charcoal/60',
  charcoal: 'from-charcoal-light via-charcoal to-burgundy-deep text-cream/60',
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
  tone = 'burgundy',
  className,
  ratio = 'aspect-[4/3]',
  label,
  rounded = true,
}: FigureProps) {
  // TODO: Sobald echtes Bildmaterial vorliegt, hier auf next/image umstellen:
  //
  //   import Image from 'next/image';
  //   return (
  //     <div className={cn('relative overflow-hidden', ratio, rounded && 'rounded-2xl', className)}>
  //       <Image src={src} alt={alt} fill sizes="..." priority={priority}
  //              className="img-cover" />
  //     </div>
  //   );

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-gradient-to-br',
        toneMap[tone],
        ratio,
        rounded && 'rounded-2xl',
        className
      )}
    >
      {/* dekorative Textur */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, currentColor 0.5px, transparent 1px), radial-gradient(circle at 70% 60%, currentColor 0.5px, transparent 1px)',
          backgroundSize: '28px 28px, 22px 22px',
        }}
      />
      <div className="relative z-10 flex max-w-[80%] flex-col items-center gap-2 text-center">
        <ImageOff aria-hidden className="h-6 w-6 opacity-70" strokeWidth={1.5} />
        {label && <span className="text-fluid-sm font-medium">{label}</span>}
        <code className="text-[0.68rem] opacity-70">{src}</code>
      </div>
    </div>
  );
}
