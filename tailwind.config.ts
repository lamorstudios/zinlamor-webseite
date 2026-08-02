import type { Config } from 'tailwindcss';

/**
 * Design system — La Tasca Flamenca
 * Warme, mediterrane Farbwelt: Burgunder, Terrakotta, Creme, Anthrazit, Messing.
 * Farben werden zusätzlich als CSS-Variablen in globals.css gespiegelt.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#5c1524',
          light: '#7a1e30',
          dark: '#3f0e19',
          deep: '#2a0910',
        },
        wine: '#6b1f2a',
        terracotta: {
          DEFAULT: '#c26a49',
          light: '#d68b6f',
          dark: '#a3512f',
        },
        cream: {
          DEFAULT: '#f6efe3',
          soft: '#fbf7ef',
          dark: '#ece0cc',
        },
        sand: {
          DEFAULT: '#e3d4b8',
          dark: '#cbb992',
        },
        charcoal: {
          DEFAULT: '#20191a',
          light: '#2c2325',
          soft: '#382c2e',
        },
        brass: {
          DEFAULT: '#c9a24b',
          light: '#e0bd67',
          dark: '#a5822f',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Responsive Skala mit clamp()
        'fluid-sm': 'clamp(0.85rem, 0.82rem + 0.15vw, 0.95rem)',
        'fluid-base': 'clamp(1rem, 0.96rem + 0.2vw, 1.125rem)',
        'fluid-lg': 'clamp(1.15rem, 1.05rem + 0.5vw, 1.4rem)',
        'fluid-xl': 'clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem)',
        'fluid-2xl': 'clamp(2rem, 1.4rem + 3vw, 3.5rem)',
        'fluid-3xl': 'clamp(2.5rem, 1.6rem + 4.5vw, 5rem)',
        'fluid-hero': 'clamp(2.75rem, 1.5rem + 6vw, 6.5rem)',
      },
      maxWidth: {
        content: '1280px',
        prose: '68ch',
      },
      spacing: {
        section: 'clamp(3.5rem, 2rem + 7vw, 8rem)',
      },
      boxShadow: {
        soft: '0 20px 45px -25px rgba(42, 9, 16, 0.45)',
        card: '0 12px 30px -18px rgba(42, 9, 16, 0.35)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scroll-hint': 'scroll-hint 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
