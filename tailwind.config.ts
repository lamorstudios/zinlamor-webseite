import type { Config } from 'tailwindcss';

/**
 * Design system — La Tasca Flamenca (2026, editorial redesign)
 * -------------------------------------------------------------------------
 * Ruhige, hochwertige Neutral-Palette: warmes Off-White, Soft-Black, Graphit,
 * Stone. Farbe wird sehr sparsam eingesetzt — ein einziger, entsättigter
 * warmer Akzent (accent). Wirkung entsteht über Typografie, Weißraum, Raster
 * und Komposition, nicht über Farbe, Verläufe oder Effekte.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Helle Flächen (warmes Off-White statt reinem Weiß)
        paper: {
          DEFAULT: '#F4F2ED',
          light: '#FAF8F3',
          dark: '#ECE9E2',
        },
        // Dunkle Flächen & Text (Soft-Black / Graphit)
        ink: {
          DEFAULT: '#151515',
          dark: '#0D0D0D',
          soft: '#242422',
          light: '#3A3A38',
        },
        // Neutrale Füllungen / feine Linien
        stone: {
          DEFAULT: '#DBD6CC',
          dark: '#C6C0B4',
        },
        // Sekundärtext / Labels
        muted: {
          DEFAULT: '#77736D',
          light: '#9C978F',
        },
        // Einziger, sehr zurückhaltender Akzent (entsättigtes Warmrot)
        accent: {
          DEFAULT: '#8D3B32',
          dark: '#6F2E27',
        },
        // Feine Trennlinien
        line: {
          DEFAULT: 'rgba(21, 21, 21, 0.12)',
          light: 'rgba(244, 242, 237, 0.16)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluid-sm': 'clamp(0.8rem, 0.78rem + 0.1vw, 0.875rem)',
        'fluid-base': 'clamp(1rem, 0.97rem + 0.15vw, 1.0625rem)',
        'fluid-lg': 'clamp(1.15rem, 1.05rem + 0.5vw, 1.5rem)',
        'fluid-xl': 'clamp(1.6rem, 1.3rem + 1.4vw, 2.5rem)',
        'fluid-2xl': 'clamp(2.2rem, 1.5rem + 3.4vw, 4.25rem)',
        'fluid-3xl': 'clamp(2.8rem, 1.6rem + 5.5vw, 6rem)',
        'fluid-hero': 'clamp(3rem, 1.2rem + 9vw, 9.5rem)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        label: '0.18em',
      },
      maxWidth: {
        content: '1360px',
        prose: '62ch',
      },
      spacing: {
        section: 'clamp(4.5rem, 3rem + 8vw, 10rem)',
      },
      borderRadius: {
        // Bewusst kleine Radien — keine SaaS-/KI-Optik
        none: '0',
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '10px',
        '2xl': '12px',
        '3xl': '14px',
        full: '9999px',
      },
      boxShadow: {
        // dezent, fast unsichtbar — Tiefe entsteht über Linien/Flächen
        soft: '0 24px 60px -40px rgba(13, 13, 13, 0.35)',
        card: '0 12px 30px -24px rgba(13, 13, 13, 0.25)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        editorial: 'cubic-bezier(0.65, 0.05, 0, 1)',
      },
      keyframes: {
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.35' },
          '50%': { transform: 'translateY(6px)', opacity: '0.9' },
        },
      },
      animation: {
        'scroll-hint': 'scroll-hint 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
