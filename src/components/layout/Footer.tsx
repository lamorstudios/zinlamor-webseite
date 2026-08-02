'use client';

import Link from 'next/link';
import { Instagram, Facebook, MapPin, Phone } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import type { TranslationKey } from '@/i18n/dictionaries/de';
import { siteConfig, footerNav } from '@/data/site';
import { locations } from '@/data/locations';
import { useConsent } from '@/components/consent/ConsentProvider';
import { callHref } from '@/lib/links';

export function Footer() {
  const t = useT();
  const { openSettings } = useConsent();
  const year = 2026; // statisch: Date.now() nicht nötig; jährlich pflegen

  return (
    <footer className="bg-burgundy-deep text-cream/80">
      <div className="container-content py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marke */}
          <div className="lg:pr-6">
            <span className="font-serif text-fluid-lg font-semibold text-cream-soft">
              La Tasca Flamenca
            </span>
            <p className="mt-3 max-w-xs text-fluid-sm leading-relaxed text-cream/70">
              {t('footer.tagline')}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-brass hover:text-charcoal"
              >
                <Instagram className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-brass hover:text-charcoal"
              >
                <Facebook className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={siteConfig.social.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TripAdvisor"
                className="inline-flex h-10 items-center justify-center rounded-full bg-cream/10 px-4 text-fluid-sm font-medium text-cream transition-colors hover:bg-brass hover:text-charcoal"
              >
                Tripadvisor
              </a>
            </div>
          </div>

          {/* Standorte */}
          <nav aria-label={t('footer.locations')}>
            <h2 className="text-fluid-sm font-semibold uppercase tracking-[0.18em] text-brass-light">
              {t('footer.locations')}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/standorte/${l.slug}`}
                    className="group flex items-start gap-2 text-fluid-sm text-cream/75 transition-colors hover:text-cream"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 flex-none text-terracotta" aria-hidden />
                    <span>
                      {l.shortName}
                      <span className="block text-cream/45">{l.city}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Entdecken */}
          <nav aria-label={t('footer.discover')}>
            <h2 className="text-fluid-sm font-semibold uppercase tracking-[0.18em] text-brass-light">
              {t('footer.discover')}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerNav.discover.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-fluid-sm text-cream/75 transition-colors hover:text-cream"
                  >
                    {t(item.labelKey as TranslationKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontakt & Rechtliches */}
          <div>
            <h2 className="text-fluid-sm font-semibold uppercase tracking-[0.18em] text-brass-light">
              {t('nav.contact')}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href={callHref(locations[0])}
                  className="inline-flex items-center gap-2 text-fluid-sm text-cream/75 transition-colors hover:text-cream"
                >
                  <Phone className="h-4 w-4 text-terracotta" aria-hidden />
                  {locations[0].phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-fluid-sm text-cream/75 transition-colors hover:text-cream"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>

            <h2 className="mt-6 text-fluid-sm font-semibold uppercase tracking-[0.18em] text-brass-light">
              {t('footer.legal')}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-fluid-sm text-cream/75 transition-colors hover:text-cream"
                  >
                    {t(item.labelKey as TranslationKey)}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openSettings}
                  className="text-left text-fluid-sm text-cream/75 transition-colors hover:text-cream"
                >
                  {t('page.cookies.reopen')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-fluid-sm text-cream/55 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. {t('footer.rights')}
          </p>
          <p>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  );
}
