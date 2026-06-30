import type { BrandingFields } from "@/lib/types/database";

/**
 * Visuelle Stempelkarte – vollständig gebrandet über CSS-Variablen.
 * Wird sowohl in der Landingpage-Vorschau als auch (Phase 2) auf der
 * echten Kundenkarte verwendet.
 */
export function StampCard({
  branding,
  current = 0,
}: {
  branding: BrandingFields;
  current?: number;
}) {
  const total = branding.stamps_required;
  const slots = Array.from({ length: total });

  return (
    <div className="w-full max-w-sm rounded-brand bg-brand-card p-6 shadow-xl ring-1 ring-white/10">
      <div className="mb-4 flex items-center gap-3">
        {branding.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={branding.logo_url}
            alt={branding.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary font-bold text-white">
            {branding.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold leading-tight">{branding.name}</p>
          <p className="text-xs opacity-70">Treuekarte</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {slots.map((_, i) => {
          const filled = i < current;
          return (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-full text-sm font-bold"
              style={{
                background: filled
                  ? "var(--brand-primary)"
                  : "rgba(255,255,255,0.06)",
                color: filled ? "#fff" : "var(--brand-text)",
                border: filled ? "none" : "1px dashed rgba(255,255,255,0.2)",
              }}
            >
              {filled ? "★" : i + 1}
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-lg bg-brand-primary/15 p-3 text-sm">
        <span className="font-semibold text-brand-primary">Prämie:</span>{" "}
        {branding.reward_description}
        <span className="opacity-70">
          {" "}
          ({total} Stempel)
        </span>
      </div>
    </div>
  );
}
