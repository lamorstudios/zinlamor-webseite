'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { locations } from '@/data/locations';
import { useT } from '@/i18n/LanguageProvider';
import { Reveal } from '@/components/motion/Reveal';
import { Figure } from '@/components/ui/Figure';
import { OpenStatusBadge } from '@/components/ui/OpenStatusBadge';

/**
 * Standortübersicht als editoriale Liste.
 * Desktop: große Namenszeilen; beim Hover wechselt das Vorschaubild rechts.
 * Mobil: ruhige, gestapelte Zeilen mit kleinem Bild.
 */
export function LocationsOverview() {
  const t = useT();
  const [active, setActive] = useState(0);

  return (
    <section id="standorte" className="section bg-paper">
      <div className="container-content">
        <Reveal className="flex items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <span className="eyebrow mb-4 block">{t('locations.eyebrow')}</span>
            <h2 className="text-fluid-2xl font-semibold leading-none tracking-tightest text-ink">
              {t('locations.headline')}
            </h2>
          </div>
          <Link
            href="/standorte"
            className="link-underline hidden text-fluid-sm font-medium text-ink sm:inline-block"
          >
            {t('action.allLocations')}
          </Link>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          {/* Liste */}
          <ul className="flex flex-col">
            {locations.map((l, i) => (
              <li key={l.slug} onMouseEnter={() => setActive(i)}>
                <Link
                  href={`/standorte/${l.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line py-6 sm:py-8"
                >
                  <span className="font-display text-fluid-sm tabular-nums text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-3">
                      <span className="truncate font-display text-fluid-xl font-semibold tracking-tightest text-ink transition-opacity duration-300 group-hover:opacity-60">
                        {l.shortName}
                      </span>
                      <span className="hidden text-fluid-sm text-muted sm:inline">{l.city}</span>
                    </span>
                    {/* Mobiles Vorschaubild */}
                    <span className="mt-3 block lg:hidden">
                      <Figure
                        src={l.image}
                        alt={l.name}
                        tone={i % 2 === 0 ? 'ink' : 'stone'}
                        ratio="aspect-[16/9]"
                        label={l.shortName}
                      />
                    </span>
                    <span className="mt-2 block sm:hidden">
                      <OpenStatusBadge location={l} />
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 flex-none text-ink transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Sticky-Vorschau (Desktop) */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.65, 0.05, 0, 1] }}
                  className="absolute inset-0"
                >
                  <Figure
                    src={locations[active].image}
                    alt={locations[active].name}
                    tone="ink"
                    ratio=""
                    rounded={false}
                    className="h-full"
                    label={locations[active].shortName}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-dark/80 to-transparent p-6 text-paper-light">
                <div>
                  <p className="font-display text-fluid-lg font-semibold">{locations[active].shortName}</p>
                  <p className="text-fluid-sm text-paper/70">{locations[active].address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
