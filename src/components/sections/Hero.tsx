'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';

/**
 * Startseiten-Hero — editorial, reduziert.
 * Vollflächige Bild-/Video-Fläche (Soft-Black) mit kontrolliertem Overlay,
 * übergroße Headline, minimaler Text, klare CTAs.
 *
 * VIDEO (optional, später): /public/videos/hero.mp4 + Poster; <video>-Block
 * unten einkommentieren. Bei prefers-reduced-motion nur Poster zeigen.
 */
export function Hero() {
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink-dark text-paper-light">
      {/* Hintergrund-Medium (Platzhalter) */}
      <div aria-hidden className="absolute inset-0">
        {/* <video autoPlay muted loop playsInline poster="/images/hero/hero-poster.jpg"
                 className="h-full w-full object-cover"><source src="/videos/hero.mp4" type="video/mp4" /></video> */}
        <div className="h-full w-full bg-ink-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-dark via-ink-dark/20 to-transparent" />
      </div>

      <div className="container-content relative z-10 pb-16 pt-40 sm:pb-20 lg:pb-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="anim-reveal eyebrow text-muted-light"
        >
          {t('intro.eyebrow')}
        </motion.p>

        <h1 className="anim-reveal mt-5 max-w-[16ch] text-fluid-hero font-semibold leading-[0.92] tracking-tightest">
          <span className="block overflow-hidden pb-[0.1em]">
            <motion.span
              className="block"
              initial={{ y: reduce ? 0 : '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.65, 0.05, 0, 1] }}
            >
              {t('hero.headline')}
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="anim-reveal mt-10 flex flex-col gap-8 border-t border-line-light pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-md text-fluid-base text-paper/70">{t('hero.subline')}</p>
          <div className="flex flex-none items-center gap-6">
            <Link href="/reservierung" className="btn-gold group">
              {t('action.reserve')}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <Link
              href="/standorte"
              className="link-underline text-fluid-sm font-medium text-paper-light"
            >
              {t('action.discoverLocation')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll-Anzeige (Desktop) */}
      <div className="pointer-events-none absolute bottom-8 right-8 z-10 hidden lg:block">
        <span className="text-[0.65rem] uppercase tracking-label text-paper/40">
          {t('hero.scroll')}
        </span>
      </div>
    </section>
  );
}
