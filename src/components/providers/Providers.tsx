'use client';

import { LanguageProvider } from '@/i18n/LanguageProvider';
import { ConsentProvider } from '@/components/consent/ConsentProvider';
import { CookieConsent } from '@/components/consent/CookieConsent';
import { SkipLink } from '@/components/layout/SkipLink';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileActionBar, MobileActionBarSpacer } from '@/components/layout/MobileActionBar';

/**
 * Globale App-Hülle: Sprache + Consent-Kontext und die auf jeder Seite
 * sichtbare Navigation, Footer, Sticky Action Bar und das Cookie-Banner.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ConsentProvider>
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBarSpacer />
        <MobileActionBar />
        <CookieConsent />
      </ConsentProvider>
    </LanguageProvider>
  );
}
