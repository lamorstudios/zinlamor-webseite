'use client';

import { useT } from '@/i18n/LanguageProvider';

export function SkipLink() {
  const t = useT();
  return (
    <a
      href="#main"
      className="sr-only z-[100] rounded-full bg-ink px-5 py-3 text-paper-light focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {t('a11y.skip')}
    </a>
  );
}
