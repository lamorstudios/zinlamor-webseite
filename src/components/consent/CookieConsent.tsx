'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import { useConsent, type ConsentCategory } from './ConsentProvider';
import { cn } from '@/lib/cn';

/**
 * Cookie-Consent — echte technische Wirkung:
 * - Vor Entscheidung werden KEINE einwilligungspflichtigen Dienste geladen
 *   (Karten/Instagram prüfen useHasConsent('external')).
 * - "Ablehnen" ist genauso prominent wie "Akzeptieren".
 * - Feineinstellung pro Kategorie im Dialog.
 */
export function CookieConsent() {
  const t = useT();
  const { consent, decided, acceptAll, rejectAll, save, settingsOpen, openSettings, closeSettings } =
    useConsent();
  const reduce = useReducedMotion();

  // Banner zeigen, wenn noch keine Entscheidung UND Dialog nicht offen
  const showBanner = decided === false && consent === null && !settingsOpen;

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label={t('cookie.title')}
            className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-3xl rounded-2xl border border-sand/50 bg-cream-soft p-5 shadow-soft sm:inset-x-4 sm:bottom-4 lg:bottom-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <span className="hidden h-11 w-11 flex-none items-center justify-center rounded-full bg-burgundy/10 text-burgundy sm:inline-flex">
                <Cookie className="h-5 w-5" aria-hidden />
              </span>
              <div className="flex-1">
                <h2 className="font-serif text-fluid-base font-semibold text-burgundy">
                  {t('cookie.title')}
                </h2>
                <p className="mt-1.5 text-fluid-sm leading-snug text-charcoal/75">{t('cookie.text')}</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <button type="button" onClick={acceptAll} className="btn-primary sm:flex-1">
                    {t('cookie.acceptAll')}
                  </button>
                  <button type="button" onClick={rejectAll} className="btn-gold sm:flex-1">
                    {t('cookie.rejectAll')}
                  </button>
                  <button type="button" onClick={openSettings} className="btn-outline text-charcoal/80 sm:flex-1">
                    {t('cookie.settings')}
                  </button>
                </div>
                <Link
                  href="/datenschutz"
                  className="mt-3 inline-block text-fluid-sm text-terracotta link-underline"
                >
                  {t('cookie.moreInfo')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Einstellungs-Dialog */}
      <SettingsDialog open={settingsOpen} onClose={closeSettings} onSave={save} initial={consent} />
    </>
  );
}

const CATEGORIES: { key: ConsentCategory; locked?: boolean }[] = [
  { key: 'necessary', locked: true },
  { key: 'statistics' },
  { key: 'marketing' },
  { key: 'external' },
];

function SettingsDialog({
  open,
  onClose,
  onSave,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (state: Record<ConsentCategory, boolean>) => void;
  initial: Record<ConsentCategory, boolean> | null;
}) {
  const t = useT();
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<Record<ConsentCategory, boolean>>({
    necessary: true,
    statistics: false,
    marketing: false,
    external: false,
  });

  useEffect(() => {
    if (open) {
      setState({
        necessary: true,
        statistics: initial?.statistics ?? false,
        marketing: initial?.marketing ?? false,
        external: initial?.external ?? false,
      });
    }
  }, [open, initial]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label={t('a11y.menuClose')}
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={onClose}
            tabIndex={-1}
          />
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={t('cookie.title')}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-cream-soft p-6 shadow-soft"
          >
            <h2 className="font-serif text-fluid-lg font-semibold text-burgundy">{t('cookie.title')}</h2>
            <p className="mt-2 text-fluid-sm text-charcoal/70">{t('cookie.text')}</p>

            <ul className="mt-5 flex flex-col gap-3">
              {CATEGORIES.map(({ key, locked }) => (
                <li key={key} className="rounded-xl border border-sand/50 bg-cream p-4">
                  <label className="flex items-start justify-between gap-4">
                    <span>
                      <span className="block font-medium text-charcoal">
                        {t(`cookie.${key}` as never)}
                      </span>
                      <span className="mt-0.5 block text-fluid-sm text-charcoal/65">
                        {t(`cookie.${key}.desc` as never)}
                      </span>
                    </span>
                    <span className="flex flex-none items-center pt-0.5">
                      {locked ? (
                        <span className="rounded-full bg-sand/50 px-2.5 py-1 text-[0.7rem] font-medium text-charcoal/60">
                          {t('cookie.always')}
                        </span>
                      ) : (
                        <input
                          type="checkbox"
                          checked={state[key]}
                          onChange={(e) => setState((s) => ({ ...s, [key]: e.target.checked }))}
                          className="h-6 w-6 rounded accent-burgundy"
                          aria-label={t(`cookie.${key}` as never)}
                        />
                      )}
                    </span>
                  </label>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={() => onSave(state)} className="btn-primary sm:flex-1">
                {t('cookie.save')}
              </button>
              <button
                type="button"
                onClick={() => onSave({ necessary: true, statistics: true, marketing: true, external: true })}
                className="btn-outline text-charcoal/80 sm:flex-1"
              >
                {t('cookie.acceptAll')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
