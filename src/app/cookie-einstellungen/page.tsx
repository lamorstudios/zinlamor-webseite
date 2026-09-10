'use client';

import { PageHero } from '@/components/sections/PageHero';
import { useConsent } from '@/components/consent/ConsentProvider';
import { useT } from '@/i18n/LanguageProvider';
import { Cookie } from 'lucide-react';

/**
 * Cookie-Einstellungen. Öffnet den zentralen Consent-Dialog erneut.
 * (Metadaten für diese Route in layout-Metadaten/robots nicht kritisch;
 *  Client-Seite, daher kein generateMetadata.)
 */
export default function CookieSettingsPage() {
  const { openSettings, consent } = useConsent();
  const t = useT();

  return (
    <>
      <PageHero
        title={t('page.cookies.title')}
        lead={t('page.cookies.lead')}
        tone="ink"
        crumbs={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('page.cookies.title'), href: '/cookie-einstellungen' },
        ]}
      />
      <section className="section bg-paper">
        <div className="container-content max-w-prose text-center">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink/10 text-ink">
            <Cookie className="h-7 w-7" aria-hidden />
          </span>
          <p className="mt-6 text-fluid-base text-ink/75">{t('cookie.text')}</p>

          {consent && (
            <ul className="mx-auto mt-6 flex max-w-sm flex-col gap-2 text-left text-fluid-sm">
              {(['necessary', 'statistics', 'marketing', 'external'] as const).map((c) => (
                <li
                  key={c}
                  className="flex items-center justify-between rounded-lg border border-stone/50 bg-paper-light px-4 py-2"
                >
                  <span className="text-ink/80">{t(`cookie.${c}` as never)}</span>
                  <span className={consent[c] ? 'font-medium text-emerald-600' : 'text-ink/50'}>
                    {consent[c] ? '✓' : '—'}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <button type="button" onClick={openSettings} className="btn-primary mt-8">
            {t('page.cookies.reopen')}
          </button>
        </div>
      </section>
    </>
  );
}
