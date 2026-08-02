'use client';

import Link from 'next/link';
import { ArrowRight, PartyPopper, ChefHat, Truck } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Figure } from '@/components/ui/Figure';
import { Reveal } from '@/components/motion/Reveal';

const cards = [
  { key: 'private', icon: PartyPopper, src: '/images/events/private.jpg', tone: 'burgundy' as const },
  { key: 'catering', icon: ChefHat, src: '/images/events/catering.jpg', tone: 'terracotta' as const },
  { key: 'foodtruck', icon: Truck, src: '/images/events/foodtruck.jpg', tone: 'charcoal' as const },
];

export function EventsSection() {
  const t = useT();
  return (
    <section className="section bg-cream">
      <div className="container-content">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={t('events.eyebrow')}
            title={t('events.headline')}
            subtitle={t('events.subline')}
            className="max-w-2xl"
          />
          <Reveal>
            <Link href="/events-catering" className="btn-primary whitespace-nowrap">
              {t('action.requestEvent')}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            const href = c.key === 'foodtruck' ? '/foodtruck' : '/events-catering';
            return (
              <Reveal key={c.key} delay={i * 0.08}>
                <Link
                  href={href}
                  className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl"
                >
                  <Figure
                    src={c.src}
                    alt={t(`events.${c.key}.title` as never)}
                    tone={c.tone}
                    ratio=""
                    rounded={false}
                    className="absolute inset-0 h-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent"
                  />
                  <div className="relative z-10 p-6">
                    <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream-soft/15 text-cream-soft backdrop-blur">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="font-serif text-fluid-lg font-semibold text-cream-soft">
                      {t(`events.${c.key}.title` as never)}
                    </h3>
                    <p className="mt-2 text-fluid-sm leading-snug text-cream/80">
                      {t(`events.${c.key}.text` as never)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-fluid-sm font-medium text-brass-light">
                      {t('action.more')}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
