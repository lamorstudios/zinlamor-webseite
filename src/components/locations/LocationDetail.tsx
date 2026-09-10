'use client';

import Link from 'next/link';
import { CalendarCheck, Phone, MapPin, Utensils, Check, ArrowRight } from 'lucide-react';
import type { Location } from '@/data/locations';
import { locations } from '@/data/locations';
import { useT } from '@/i18n/LanguageProvider';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Figure } from '@/components/ui/Figure';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { OpenStatusBadge } from '@/components/ui/OpenStatusBadge';
import { OpeningHoursTable } from './OpeningHoursTable';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { MapConsentPlaceholder } from '@/components/consent/MapConsentPlaceholder';
import { LocationCard } from './LocationCard';
import { callHref, menuHref, menuIsExternal, reservationHref, reservationIsExternal } from '@/lib/links';

export function LocationDetail({ location }: { location: Location }) {
  const t = useT();
  const others = locations.filter((l) => l.slug !== location.slug);

  const faqs = [
    { q: t('faq.reserve.q'), a: t('faq.reserve.a') },
    { q: t('faq.groups.q'), a: t('faq.groups.a') },
    { q: t('faq.veggie.q'), a: t('faq.veggie.a') },
    { q: t('faq.parking.q'), a: t('faq.parking.a') },
  ];

  const galleryTones = ['muted', 'ink', 'ink', 'stone'] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-dark text-paper-light">
        <div aria-hidden className="absolute inset-0">
          <Figure
            src={location.image}
            alt={`${location.name}`}
            tone="ink"
            ratio=""
            rounded={false}
            className="absolute inset-0 h-full opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-dark via-ink-dark/70 to-ink-dark/40" />
        </div>
        <div className="container-content relative z-10 pb-14 pt-32 sm:pt-36 lg:pb-20 lg:pt-40">
          <Breadcrumbs
            light
            className="mb-6"
            crumbs={[
              { label: t('breadcrumb.home'), href: '/' },
              { label: t('nav.locations'), href: '/standorte' },
              { label: location.shortName, href: `/standorte/${location.slug}` },
            ]}
          />
          <p className="eyebrow text-stone before:bg-stone/60">{location.city}</p>
          <h1 className="mt-3 font-display text-fluid-3xl font-semibold leading-[1.02]">{location.shortName}</h1>
          <p className="mt-3 max-w-2xl text-fluid-lg text-paper/85">{location.tagline}</p>

          <div className="mt-5 flex flex-col gap-3 text-paper/85 sm:flex-row sm:items-center sm:gap-6">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted" aria-hidden />
              {location.address}
            </span>
            <OpenStatusBadge location={location} light />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {reservationIsExternal(location) ? (
              <a href={reservationHref(location)} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <CalendarCheck className="h-4 w-4" aria-hidden />
                {t('action.reserve')}
              </a>
            ) : (
              <Link href="#reservieren" className="btn-gold">
                <CalendarCheck className="h-4 w-4" aria-hidden />
                {t('action.reserve')}
              </Link>
            )}
            <a href={callHref(location)} className="btn-outline-light">
              <Phone className="h-4 w-4" aria-hidden />
              {t('action.call')}
            </a>
            <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
              <MapPin className="h-4 w-4" aria-hidden />
              {t('action.openRoute')}
            </a>
          </div>
        </div>
      </section>

      {/* Über + Öffnungszeiten */}
      <section className="section bg-paper">
        <div className="container-content grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Reveal>
              <span className="eyebrow">{t('location.about')}</span>
              <p className="mt-5 text-fluid-lg leading-relaxed text-ink/80">{location.description}</p>
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="font-display text-fluid-xl font-semibold text-ink">
                {t('location.highlights')}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {location.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-fluid-base text-ink/80">
                    <Check className="mt-0.5 h-5 w-5 flex-none text-muted" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
              {location.franchise && (
                <p className="mt-4 inline-flex rounded-full bg-muted/15 px-3 py-1 text-fluid-sm text-ink/70">
                  {t('common.franchisePartner')}
                </p>
              )}
            </Reveal>
          </div>

          {/* Sidebar: Öffnungszeiten + Kontakt */}
          <aside className="lg:pl-4">
            <div className="rounded-2xl border border-stone/50 bg-paper-light p-6">
              <h2 className="font-display text-fluid-lg font-semibold text-ink">{t('hours.title')}</h2>
              <div className="mt-3">
                <OpeningHoursTable location={location} />
              </div>
              {location.openingNote && (
                <p className="mt-3 text-fluid-sm text-ink/50">{location.openingNote}</p>
              )}
              <hr className="my-5 border-stone/50" />
              <dl className="flex flex-col gap-3 text-fluid-base">
                <div>
                  <dt className="text-fluid-sm text-ink/55">{t('common.address')}</dt>
                  <dd className="text-ink/85">{location.address}</dd>
                </div>
                <div>
                  <dt className="text-fluid-sm text-ink/55">{t('common.phone')}</dt>
                  <dd>
                    <a href={callHref(location)} className="text-ink link-underline">
                      {location.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Galerie */}
      <section className="section bg-paper-light">
        <div className="container-content">
          <SectionHeading eyebrow={t('gallery.eyebrow')} title={t('location.gallery')} className="max-w-2xl" />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {galleryTones.map((tone, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <Figure
                  src={`/images/locations/${location.slug}-${i + 1}.jpg`}
                  alt={`${location.shortName} — Eindruck ${i + 1}`}
                  tone={tone}
                  ratio="aspect-square"
                  label={location.shortName}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Speisekarte */}
      <section id="speisekarte" className="section bg-paper scroll-mt-24">
        <div className="container-content">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-ink p-8 text-paper-light sm:flex-row sm:items-center lg:p-12">
            <div className="max-w-xl">
              <span className="eyebrow text-stone before:bg-stone/60">{t('location.menu')}</span>
              <h2 className="mt-3 font-display text-fluid-xl font-semibold">{t('location.menuText')}</h2>
              {!menuIsExternal(location) && (
                <p className="mt-3 text-fluid-sm text-paper/70">{t('location.menuTodo')}</p>
              )}
            </div>
            {menuIsExternal(location) ? (
              <a href={menuHref(location)} target="_blank" rel="noopener noreferrer" className="btn-gold shrink-0">
                <Utensils className="h-4 w-4" aria-hidden />
                {t('action.viewMenu')}
              </a>
            ) : (
              <Link href="/speisekarte" className="btn-gold shrink-0">
                <Utensils className="h-4 w-4" aria-hidden />
                {t('action.viewMenu')}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Reservierung + Anfahrt */}
      <section id="reservieren" className="section bg-paper-light scroll-mt-24">
        <div className="container-content grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={t('action.reserve')} title={t('location.reserveAt', { name: location.shortName })} />
            <p className="mt-4 text-fluid-base text-ink/75">{t('location.reservationText')}</p>
            {!reservationIsExternal(location) && (
              <p className="mt-3 rounded-lg bg-muted/10 p-3 text-fluid-sm text-ink/70">
                {t('location.reservationTodo')}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              {reservationIsExternal(location) ? (
                <a href={reservationHref(location)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <CalendarCheck className="h-4 w-4" aria-hidden />
                  {t('action.reserve')}
                </a>
              ) : null}
              <a href={callHref(location)} className="btn-primary">
                <Phone className="h-4 w-4" aria-hidden />
                {t('action.call')} · {location.phone}
              </a>
            </div>
          </div>
          <div id="anfahrt" className="scroll-mt-24">
            <SectionHeading eyebrow={t('location.map')} title={t('action.openRoute')} className="mb-6" />
            <MapConsentPlaceholder location={location} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-paper">
        <div className="container-content max-w-3xl">
          <SectionHeading eyebrow={t('location.faq')} title={t('location.faq')} align="center" className="mx-auto" />
          <div className="mt-10">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* Weitere Standorte */}
      <section className="section bg-paper-light">
        <div className="container-content">
          <SectionHeading eyebrow={t('nav.locations')} title={t('location.otherLocations')} className="max-w-2xl" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((l, i) => (
              <Reveal key={l.slug} delay={i * 0.06}>
                <LocationCard location={l} index={i} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/standorte" className="inline-flex items-center gap-2 font-medium text-muted link-underline">
              {t('action.allLocations')}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
