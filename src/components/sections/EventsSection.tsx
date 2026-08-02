'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import { Figure } from '@/components/ui/Figure';
import { Reveal } from '@/components/motion/Reveal';
import { MaskReveal } from '@/components/motion/MaskReveal';

const tiles = [
  { key: 'private', src: '/images/events/private.jpg', tone: 'ink' as const, href: '/events-catering' },
  { key: 'catering', src: '/images/events/catering.jpg', tone: 'muted' as const, href: '/events-catering' },
];

export function EventsSection() {
  const t = useT();
  return (
    <section className="section bg-paper-dark">
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <span className="eyebrow mb-5 block">{t('events.eyebrow')}</span>
          <h2 className="text-fluid-2xl font-semibold leading-none tracking-tightest text-ink">
            {t('events.headline')}
          </h2>
          <p className="mt-5 max-w-prose text-fluid-lg leading-relaxed text-muted">
            {t('events.subline')}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {tiles.map((tile, i) => (
            <MaskReveal key={tile.key} delay={i * 0.1}>
              <Link href={tile.href} className="group block">
                <div className="relative overflow-hidden rounded-sm">
                  <Figure
                    src={tile.src}
                    alt={t(`events.${tile.key}.title` as never)}
                    tone={tile.tone}
                    ratio="aspect-[16/11]"
                    rounded={false}
                    className="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]"
                    label={t(`events.${tile.key}.title` as never)}
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-fluid-lg font-semibold tracking-tightest text-ink">
                      {t(`events.${tile.key}.title` as never)}
                    </h3>
                    <p className="mt-1 max-w-sm text-fluid-base text-muted">
                      {t(`events.${tile.key}.text` as never)}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="mt-1 h-5 w-5 flex-none text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden
                  />
                </div>
              </Link>
            </MaskReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
