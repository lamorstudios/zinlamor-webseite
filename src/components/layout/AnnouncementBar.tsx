'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { announcement } from '@/data/site';
import { useT } from '@/i18n/LanguageProvider';
import type { TranslationKey } from '@/i18n/dictionaries/de';

const DISMISS_KEY = 'ltf-announcement-dismissed';

/**
 * Schmale Ankündigungsleiste über der Navigation.
 * Über `announcement.enabled` in data/site.ts zentral steuerbar.
 * Vom Nutzer schließbar (pro Browser gemerkt).
 */
export function AnnouncementBar({ onVisibilityChange }: { onVisibilityChange?: (v: boolean) => void }) {
  const t = useT();
  const [dismissed, setDismissed] = useState(true); // SSR: ausgeblendet, bis Client entscheidet

  useEffect(() => {
    const isDismissed = window.localStorage.getItem(DISMISS_KEY) === '1';
    setDismissed(isDismissed);
    onVisibilityChange?.(announcement.enabled && !isDismissed);
  }, [onVisibilityChange]);

  if (!announcement.enabled || dismissed) return null;

  function close() {
    setDismissed(true);
    window.localStorage.setItem(DISMISS_KEY, '1');
    onVisibilityChange?.(false);
  }

  return (
    <div className="relative z-[60] bg-ink-dark text-paper">
      <div className="container-content flex min-h-[40px] items-center justify-center gap-3 py-2 text-center text-fluid-sm">
        <p className="leading-snug">
          {t(announcement.messageKey as TranslationKey)}{' '}
          {announcement.href && (
            <Link href={announcement.href} className="link-underline font-medium text-stone">
              {t(announcement.linkKey as TranslationKey)}
            </Link>
          )}
        </p>
        <button
          type="button"
          onClick={close}
          aria-label="Hinweis schließen"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
