'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { locales, localeNames, localeFlags } from '@/i18n/config';
import { cn } from '@/lib/cn';

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('a11y.langSwitch')}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-fluid-sm font-medium transition-colors',
          light ? 'text-paper/90 hover:text-paper' : 'text-ink/80 hover:text-ink'
        )}
      >
        <Globe className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        <span>{localeFlags[locale]}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-stone/50 bg-paper-light py-1 shadow-soft"
        >
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-fluid-sm transition-colors hover:bg-stone/30',
                  l === locale ? 'text-ink font-medium' : 'text-ink/80'
                )}
              >
                {localeNames[l]}
                {l === locale && <Check className="h-4 w-4" aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
