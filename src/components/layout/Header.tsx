'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MapPin } from 'lucide-react';
import { primaryNav, siteConfig } from '@/data/site';
import { locations } from '@/data/locations';
import { useT } from '@/i18n/LanguageProvider';
import type { TranslationKey } from '@/i18n/dictionaries/de';
import { cn } from '@/lib/cn';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { AnnouncementBar } from './AnnouncementBar';
import { LocationsMegaMenu } from './LocationsMegaMenu';

export function Header() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || mobileOpen;

  const handleAnnouncement = useCallback((v: boolean) => setAnnouncementVisible(v), []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <AnnouncementBar onVisibilityChange={handleAnnouncement} />
        <header
          className={cn(
            'transition-all duration-500 ease-out-expo',
            solid
              ? 'bg-paper-light/85 shadow-[0_1px_0_rgba(92,21,36,0.08)] backdrop-blur-md supports-[backdrop-filter]:bg-paper-light/75'
              : 'bg-transparent'
          )}
        >
          <div className="container-content flex items-center justify-between gap-4 py-3.5 lg:py-4">
            <Logo light={!solid} />

            {/* Desktop-Navigation */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
              {primaryNav.map((item) =>
                item.isLocations ? (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setLocationsOpen(true)}
                    onMouseLeave={() => setLocationsOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-fluid-sm font-medium transition-colors',
                        solid ? 'text-ink/80 hover:text-ink' : 'text-paper/90 hover:text-paper'
                      )}
                      aria-expanded={locationsOpen}
                    >
                      {t(item.labelKey as TranslationKey)}
                      <ChevronDown
                        className={cn('h-3.5 w-3.5 transition-transform', locationsOpen && 'rotate-180')}
                        aria-hidden
                      />
                    </Link>
                    <LocationsMegaMenu open={locationsOpen} onClose={() => setLocationsOpen(false)} />
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'rounded-full px-3.5 py-2 text-fluid-sm font-medium transition-colors',
                      solid ? 'text-ink/80 hover:text-ink' : 'text-paper/90 hover:text-paper'
                    )}
                  >
                    {t(item.labelKey as TranslationKey)}
                  </Link>
                )
              )}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden sm:block">
                <LanguageSwitcher light={!solid} />
              </div>
              <Link href="/reservierung" className="btn-primary hidden sm:inline-flex">
                <MapPin className="h-4 w-4" aria-hidden />
                {t('action.reserve')}
              </Link>

              {/* Mobile-Toggle */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label={t('a11y.menuOpen')}
                className={cn(
                  'inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden',
                  solid ? 'text-ink hover:bg-ink/5' : 'text-paper hover:bg-paper/10'
                )}
              >
                <span className="sr-only">{t('a11y.menuOpen')}</span>
                <div className="flex flex-col gap-[5px]">
                  <span className="block h-0.5 w-6 rounded bg-current" />
                  <span className="block h-0.5 w-6 rounded bg-current" />
                  <span className="block h-0.5 w-4 rounded bg-current" />
                </div>
              </button>
            </div>
          </div>
        </header>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Hinweis: Header ist fixed; Seiten mit hellem Anfang brauchen einen
          dunklen Hero, damit der transparente Header lesbar bleibt. */}
      <span className="sr-only">{siteConfig.name}</span>
    </>
  );
}
