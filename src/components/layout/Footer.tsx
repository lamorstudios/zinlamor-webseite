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
    <footer className="bg-ink-dark text-paper/80">
      <div className="container-content py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marke */}
          <div className="lg:pr-6">
            <span className="font-display text-fluid-lg font-semibold text-paper-light">
              La Tasca Flamenca
            </span>
            <p className="mt-3 max-w-xs text-fluid-sm leading-relaxed text-paper/70">
              {t('footer.tagline')}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-muted hover:text-ink"
              >
                <Instagram className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-muted hover:text-ink"
              >
                <Facebook className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={siteConfig.social.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TripAdvisor"
                className="inline-flex h-10 items-center justify-center rounded-full bg-paper/10 px-4 text-fluid-sm font-medium text-paper transition-colors hover:bg-muted hover:text-ink"
              >
                Tripadvisor
              </a>
            </div>
          </div>

          {/* Standorte */}
          <nav aria-label={t('footer.locations')}>
            <h2 className="text-fluid-sm font-semibold uppercase tracking-[0.18em] text-stone">
              {t('footer.locations')}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/standorte/${l.slug}`}
                    className="group flex items-start gap-2 text-fluid-sm text-paper/75 transition-colors hover:text-paper"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 flex-none text-muted" aria-hidden />
                    <span>
                      {l.shortName}
                      <span className="block text-paper/45">{l.city}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Entdecken */}
          <nav aria-label={t('footer.discover')}>
            <h2 className="text-fluid-sm font-semibold uppercase tracking-[0.18em] text-stone">
              {t('footer.discover')}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerNav.discover.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-fluid-sm text-paper/75 transition-colors hover:text-paper"
                  >
                    {t(item.labelKey as TranslationKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontakt & Rechtliches */}
          <div>
            <h2 className="text-fluid-sm font-semibold uppercase tracking-[0.18em] text-stone">
              {t('nav.contact')}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href={callHref(locations[0])}
                  className="inline-flex items-center gap-2 text-fluid-sm text-paper/75 transition-colors hover:text-paper"
                >
                  <Phone className="h-4 w-4 text-muted" aria-hidden />
                  {locations[0].phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-fluid-sm text-paper/75 transition-colors hover:text-paper"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>

            <h2 className="mt-6 text-fluid-sm font-semibold uppercase tracking-[0.18em] text-stone">
              {t('footer.legal')}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-fluid-sm text-paper/75 transition-colors hover:text-paper"
                  >
                    {t(item.labelKey as TranslationKey)}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openSettings}
                  className="text-left text-fluid-sm text-paper/75 transition-colors hover:text-paper"
                >
                  {t('page.cookies.reopen')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-paper/10 pt-6 text-fluid-sm text-paper/55 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. {t('footer.rights')}
          </p>
          <p>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  );
}
