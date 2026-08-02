'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Send, Info } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import { cn } from '@/lib/cn';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter-Anmeldung.
 * WICHTIG: Es wird KEINE erfolgreiche Anmeldung simuliert (kein Backend angebunden).
 * Double-Opt-in ist technisch vorgesehen; der Submit zeigt einen ehrlichen Hinweis.
 * TODO: An Newsletter-Dienst (z. B. Brevo/CleverReach/Mailchimp) mit Double-Opt-in anbinden.
 */
export function NewsletterForm() {
  const t = useT();
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const email = String(data.get('email') ?? '').trim();
    if (!EMAIL_RE.test(email)) {
      setError(t('form.error.email'));
      return;
    }
    if (!data.get('consent')) {
      setError(t('form.error.consent'));
      return;
    }
    setError(null);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status" className="flex items-start gap-3 rounded-xl bg-cream-soft/10 p-4 text-cream/90">
        <Info className="mt-0.5 h-5 w-5 flex-none text-brass-light" aria-hidden />
        <p className="text-fluid-sm leading-snug">{t('newsletter.backendNote')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="nl-firstname">
          {t('newsletter.firstName')}
        </label>
        <input
          id="nl-firstname"
          name="firstName"
          type="text"
          placeholder={`${t('newsletter.firstName')} (${t('form.optional')})`}
          className="w-full rounded-full border border-cream/25 bg-cream-soft/10 px-5 py-3 text-fluid-base text-cream-soft placeholder:text-cream/50 focus:border-brass-light focus:outline-none sm:w-40"
        />
        <label className="sr-only" htmlFor="nl-email">
          {t('newsletter.email')}
        </label>
        <input
          id="nl-email"
          name="email"
          type="email"
          required
          aria-invalid={Boolean(error)}
          placeholder={t('newsletter.email')}
          className={cn(
            'w-full flex-1 rounded-full border bg-cream-soft/10 px-5 py-3 text-fluid-base text-cream-soft placeholder:text-cream/50 focus:outline-none',
            error ? 'border-terracotta' : 'border-cream/25 focus:border-brass-light'
          )}
        />
        <button type="submit" className="btn-gold shrink-0">
          <Send className="h-4 w-4" aria-hidden />
          {t('newsletter.submit')}
        </button>
      </div>
      <label className="flex items-start gap-2.5 text-fluid-sm text-cream/70">
        <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 flex-none rounded accent-brass" />
        <span>
          {t('newsletter.consent')}{' '}
          <Link href="/datenschutz" className="link-underline text-brass-light">
            {t('nav.privacy')}
          </Link>
        </span>
      </label>
      {error && (
        <p role="alert" className="text-fluid-sm text-brass-light">
          {error}
        </p>
      )}
    </form>
  );
}
