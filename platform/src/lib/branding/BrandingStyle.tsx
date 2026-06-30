import type { BrandingFields } from "@/lib/types/database";

/**
 * White-Label-Kern (serverseitig gerendert).
 *
 * Setzt die Marken-Farben als CSS-Variablen auf einen Scope.
 * Tailwind liest diese Variablen über `colors.brand.*` (siehe tailwind.config.ts).
 *
 * => Branding kommt zu 100 % aus der DB. Kein Händler hat hartcodierte Farben.
 *
 * Verwendung:
 *   <BrandingScope branding={merchant}>
 *     ... gebrandeter Inhalt ...
 *   </BrandingScope>
 */
export function brandingToCssVars(b: BrandingFields): Record<string, string> {
  return {
    "--brand-primary": b.primary_color,
    "--brand-secondary": b.secondary_color,
    "--brand-background": b.background_color,
    "--brand-card": b.card_color,
    "--brand-text": b.text_color,
  };
}

export function BrandingScope({
  branding,
  className,
  children,
}: {
  branding: BrandingFields;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={brandingToCssVars(branding) as React.CSSProperties}
      className={`bg-brand-background text-brand-text ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
