'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { defaultLocale, isLocale, type Locale } from './config';
import de, { type TranslationKey } from './dictionaries/de';
import en from './dictionaries/en';
import es from './dictionaries/es';

const dictionaries: Record<Locale, Partial<typeof de>> = { de, en, es };

type TranslateFn = (key: TranslationKey, vars?: Record<string, string | number>) => string;

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslateFn;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'ltf-locale';

function interpolate(text: string, vars?: Record<string, string | number>): string {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Persistierte Sprache nach Mount laden (kein Hydration-Mismatch, da SSR = default).
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored && isLocale(stored) && stored !== locale) {
      setLocaleState(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const t = useCallback<TranslateFn>(
    (key, vars) => {
      const dict = dictionaries[locale];
      const value = (dict[key] ?? de[key] ?? key) as string;
      return interpolate(value, vars);
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

/** Kurzform-Hook, wenn nur t() gebraucht wird. */
export function useT(): TranslateFn {
  return useLanguage().t;
}
