'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { locations } from '@/data/locations';
import { useT } from '@/i18n/LanguageProvider';
import { callHref } from '@/lib/links';

export function LocationsMegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : 8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-full z-50 w-[min(92vw,640px)] -translate-x-1/2 pt-3"
        >
          <div className="overflow-hidden rounded-2xl border border-stone/50 bg-paper-light p-2 shadow-soft">
            <div className="grid gap-1 sm:grid-cols-2">
              {locations.map((l) => (
                <Link
                  key={l.slug}
                  href={`/standorte/${l.slug}`}
                  onClick={onClose}
                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-stone/25"
                >
                  <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ink/10 text-ink">
                    <MapPin className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1 font-display text-fluid-base font-semibold text-ink">
                      {l.shortName}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden
                      />
                    </span>
                    <span className="block truncate text-fluid-sm text-ink/65">{l.address}</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-1 flex items-center justify-between gap-2 border-t border-stone/50 px-3 pt-2.5">
              <Link
                href="/standorte"
                onClick={onClose}
                className="text-fluid-sm font-medium text-muted link-underline"
              >
                {t('action.allLocations')}
              </Link>
              <a
                href={callHref(locations[0])}
                className="inline-flex items-center gap-1.5 text-fluid-sm text-ink/70 hover:text-ink"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                {t('action.call')}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
