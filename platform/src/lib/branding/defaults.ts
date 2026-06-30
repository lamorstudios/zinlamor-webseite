import type { BrandingFields } from "@/lib/types/database";

/**
 * Fallback-Branding der Plattform selbst.
 * Wird genutzt, wenn (noch) kein Händler-Kontext vorhanden ist
 * (z.B. Plattform-Startseite, Login).
 */
export const DEFAULT_BRANDING: BrandingFields = {
  name: "Loyalty Platform",
  logo_url: null,
  primary_color: "#4f46e5",
  secondary_color: "#6366f1",
  background_color: "#0b1020",
  card_color: "#111827",
  text_color: "#f9fafb",
  reward_description: "Eine Prämie",
  stamps_required: 10,
  welcome_text: null,
};
