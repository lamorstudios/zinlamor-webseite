'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, CalendarCheck, MapPin } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';

/**
 * Startseiten-Hero. Großflächig, dunkles Overlay für Lesbarkeit.
 *
 * VIDEO-HINTERGRUND (optional, später):
 *   - Datei nach /public/videos/hero.mp4 + Posterbild /public/images/hero/hero-poster.jpg
 *   - <video>-Block unten einkommentieren (autoPlay muted playsInline loop poster=…)
 *   - Bei prefers-reduced-motion NUR das Posterbild anzeigen (bereits berücksichtigt).
 */
export function Hero() {
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-burgundy-deep text-cream-soft">
      {/* Hintergrund-Medium (Platzhalter). TODO: echtes Hero-Bild/Video einsetzen. */}
      <div aria-hidden className="absolute inset-0">
        {/* <video autoPlay muted loop playsInline poster="/images/hero/hero-poster.jpg"
                 className="h-full w-full object-cover"><source src="/videos/hero.mp4" type="video/mp4" /></video> */}
        <div className="h-full w-full bg-gradient-to-br from-burgundy-deep via-burgundy-dark to-charcoal" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 30%, #c9a24b 0.6px, transparent 1.2px), radial-gradient(circle at 75% 65%, #c26a49 0.6px, transparent 1.2px)',
            backgroundSize: '34px 34px, 26px 26px',
          }}
        />
      </div>
      {/* Overlay für Kontrast */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-burgundy-deep/40 to-burgundy-deep/20"
      />

      <div className="container-content relative z-10 pb-24 pt-40 sm:pb-28 lg:pb-32">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="anim-reveal eyebrow text-brass-light before:bg-brass-light/60"
          >
            {t('intro.eyebrow')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="anim-reveal mt-4 font-serif text-fluid-hero font-semibold leading-[0.98] tracking-tight"
          >
            {t('hero.headline')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="anim-reveal mt-6 max-w-xl text-fluid-lg leading-relaxed text-cream/85"
          >
            {t('hero.subline')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="anim-reveal mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/reservierung" className="btn-gold">
              <CalendarCheck className="h-4 w-4" aria-hidden />
              {t('action.reserve')}
            </Link>
            <Link href="/standorte" className="btn-outline-light">
              <MapPin className="h-4 w-4" aria-hidden />
              {t('action.discoverLocation')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll-Anzeige */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <span className="flex flex-col items-center gap-1 text-cream/60">
          <span className="text-[0.65rem] uppercase tracking-[0.3em]">{t('hero.scroll')}</span>
          <ChevronDown className="h-4 w-4 motion-safe:animate-scroll-hint" aria-hidden />
        </span>
      </div>
    </section>
  );
}
