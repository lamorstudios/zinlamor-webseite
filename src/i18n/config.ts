export const locales = ['de', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';

export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
};

export const localeFlags: Record<Locale, string> = {
  de: 'DE',
  en: 'EN',
  es: 'ES',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
