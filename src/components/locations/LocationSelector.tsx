'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, MapPin, ArrowRight, Phone, ExternalLink } from 'lucide-react';
import { locations, type Location } from '@/data/locations';
import { useT } from '@/i18n/LanguageProvider';
import { OpenStatusBadge } from '@/components/ui/OpenStatusBadge';
import { callHref, menuHref, menuIsExternal, reservationHref, reservationIsExternal } from '@/lib/links';
import { cn } from '@/lib/cn';

type Mode = 'reserve' | 'menu';

/**
 * Zwei-Schritt-Auswahl: Standort wählen → Aktion (Reservierung/Speisekarte) öffnen.
 * Kernstück des zentralen Reservierungsablaufs.
 */
export function LocationSelector({ mode }: { mode: Mode }) {
  const t = useT();
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Location | null>(null);

  const actionHref = selected
    ? mode === 'reserve'
      ? reservationHref(selected)
      : menuHref(selected)
    : '#';
  const isExternal = selected
    ? mode === 'reserve'
      ? reservationIsExternal(selected)
      : menuIsExternal(selected)
    : false;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Schritt 1 */}
      <div className="min-w-0">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-burgundy text-fluid-sm font-semibold text-cream-soft">
            1
          </span>
          <h2 className="font-serif text-fluid-lg font-semibold text-burgundy">
            {t('page.reserve.step1')}
          </h2>
        </div>
        <ul className="flex flex-col gap-2" role="radiogroup" aria-label={t('page.reserve.step1')}>
          {locations.map((l) => {
            const active = selected?.slug === l.slug;
            return (
              <li key={l.slug}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSelected(l)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all',
                    active
                      ? 'border-burgundy bg-burgundy/5 shadow-card'
                      : 'border-sand/50 bg-cream-soft hover:border-terracotta/50'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-10 w-10 flex-none items-center justify-center rounded-full transition-colors',
                      active ? 'bg-burgundy text-cream-soft' : 'bg-sand/40 text-burgundy'
                    )}
                  >
                    {active ? <Check className="h-5 w-5" aria-hidden /> : <MapPin className="h-5 w-5" aria-hidden />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-fluid-base font-semibold text-burgundy">
                      {l.shortName}
                    </span>
                    <span className="block truncate text-fluid-sm text-charcoal/65">{l.address}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Schritt 2 */}
      <div className="min-w-0">
        <div className="mb-4 flex items-center gap-3">
          <span
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full text-fluid-sm font-semibold transition-colors',
              selected ? 'bg-burgundy text-cream-soft' : 'bg-sand/50 text-charcoal/50'
            )}
          >
            2
          </span>
          <h2 className="font-serif text-fluid-lg font-semibold text-burgundy">
            {t('page.reserve.step2')}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.slug}
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-sand/50 bg-cream-soft p-6"
            >
              <h3 className="font-serif text-fluid-lg font-semibold text-burgundy">{selected.name}</h3>
              <p className="mt-1 text-fluid-sm text-charcoal/70">{selected.address}</p>
              <div className="mt-2">
                <OpenStatusBadge location={selected} />
              </div>

              {mode === 'reserve' && !isExternal && (
                <p className="mt-4 rounded-lg bg-brass/10 p-3 text-fluid-sm text-charcoal/75">
                  {t('location.reservationTodo')}
                </p>
              )}
              {mode === 'menu' && !isExternal && (
                <p className="mt-4 rounded-lg bg-brass/10 p-3 text-fluid-sm text-charcoal/75">
                  {t('location.menuTodo')}
                </p>
              )}

              <div className="mt-5 flex flex-col gap-2">
                {isExternal ? (
                  <a
                    href={actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full"
                  >
                    {mode === 'reserve' ? t('action.reserve') : t('action.viewMenu')}
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                ) : (
                  <Link href={actionHref} className="btn-primary w-full">
                    {mode === 'reserve' ? t('action.details') : t('action.viewMenu')}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                )}
                <a href={callHref(selected)} className="btn-outline w-full text-charcoal/80">
                  <Phone className="h-4 w-4" aria-hidden />
                  {t('action.call')} · {selected.phone}
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="flex min-h-[12rem] items-center justify-center rounded-2xl border border-dashed border-sand/70 bg-cream/40 p-6 text-center text-fluid-sm text-charcoal/50">
              {t('page.menu.selectPrompt')}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
