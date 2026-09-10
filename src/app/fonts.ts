import { Inter, Inter_Tight } from 'next/font/google';

/**
 * Typografie — modernes, reduziertes Schweizer/Neo-Grotesk-System.
 * Selbst gehostet über next/font (kein Runtime-Request an Google, kein CLS).
 *
 * - Inter Tight: leicht kompakte Sans-Serif für Headlines & Display.
 * - Inter: neutrale, sehr gut lesbare Sans-Serif für Fließtext, Navigation,
 *   Buttons und Labels (Labels als Versalien mit erhöhter Laufweite).
 *
 * Bewusst KEINE Serifenschrift: der Auftritt soll clean, editorial und
 * zeitlos wirken, nicht klassisch-rustikal.
 */
export const fontDisplay = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

export const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600'],
});
