'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ArrowUpRight, Phone } from 'lucide-react';
import { primaryNav } from '@/data/site';
import { locations } from '@/data/locations';
import { useT } from '@/i18n/LanguageProvider';
import type { TranslationKey } from '@/i18n/dictionaries/de';
import { callHref } from '@/lib/links';
import { LanguageSwitcher } from './LanguageSwitcher';

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Body-Scroll sperren + Fokus setzen + Esc/Focus-Trap
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label={t('a11y.menuClose')}
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            onClick={onClose}
            tabIndex={-1}
          />
          <motion.div
            ref={panelRef}
            initial={{ x: reduce ? 0 : '100%', opacity: reduce ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: reduce ? 0 : '100%', opacity: reduce ? 0 : 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-[min(88vw,26rem)] flex-col bg-burgundy-deep text-cream-soft"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-serif text-fluid-lg font-semibold text-cream-soft">
                La Tasca Flamenca
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label={t('a11y.menuClose')}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-2" aria-label="Mobile Navigation">
              <ul className="flex flex-col">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between border-b border-cream/10 py-4 font-serif text-[1.6rem] text-cream-soft transition-colors hover:text-brass-light"
                    >
                      {t(item.labelKey as TranslationKey)}
                      <ArrowUpRight className="h-5 w-5 opacity-50" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-6 mb-2 text-fluid-sm uppercase tracking-[0.2em] text-brass-light/80">
                {t('nav.locations')}
              </p>
              <ul className="flex flex-col gap-1">
                {locations.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/standorte/${l.slug}`}
                      onClick={onClose}
                      className="block rounded-lg px-3 py-2 text-fluid-base text-cream/85 transition-colors hover:bg-cream/10"
                    >
                      {l.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-3 border-t border-cream/10 px-6 py-5">
              <Link href="/reservierung" onClick={onClose} className="btn-gold w-full">
                {t('action.reserve')}
              </Link>
              <div className="flex items-center justify-between">
                <a
                  href={callHref(locations[0])}
                  className="inline-flex items-center gap-2 text-fluid-sm text-cream/80 hover:text-cream"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {t('action.call')}
                </a>
                <LanguageSwitcher light />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
