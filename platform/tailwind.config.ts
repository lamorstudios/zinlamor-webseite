import type { Config } from "tailwindcss";

/**
 * White-Label-Kern:
 * Alle Marken-Farben sind KEINE festen Werte, sondern verweisen auf CSS-Variablen.
 * Diese Variablen werden zur Laufzeit aus den Merchant-Settings gesetzt
 * (siehe src/lib/branding/BrandingStyle.tsx).
 *
 * => In Komponenten niemals "#ff0000" schreiben, sondern z.B. "bg-brand-primary".
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          background: "var(--brand-background)",
          card: "var(--brand-card)",
          text: "var(--brand-text)",
        },
      },
      borderRadius: {
        brand: "var(--brand-radius, 1rem)",
      },
    },
  },
  plugins: [],
};

export default config;
