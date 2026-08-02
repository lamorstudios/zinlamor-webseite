import { Fraunces, Inter } from 'next/font/google';

/**
 * Fonts werden über next/font selbst gehostet (kein Runtime-Request an Google,
 * datenschutzfreundlich, kein Layout-Shift dank `display: swap` + Fallback).
 * - Fraunces: ausdrucksstarke Serifenschrift für Headlines (editorial)
 * - Inter: klare, moderne Sans-Serif für Navigation, Fließtext, Buttons
 */
export const fontSerif = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});
