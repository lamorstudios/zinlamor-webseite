'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import { locations } from '@/data/locations';
import { cn } from '@/lib/cn';

interface Errors {
  name?: string;
  email?: string;
  eventType?: string;
  consent?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Event-/Catering-Anfrageformular mit Client-Validierung.
 *
 * VERSAND: Es wird bewusst KEIN Versanddienst erfunden. Der Submit-Handler
 * validiert nur und zeigt eine Erfolgsmeldung. Zum echten Versand hier eine
 * API-Route/Server-Action anbinden (siehe TODO im Handler).
 */
export function EventForm() {
  const t = useT();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const e: Errors = {};
    if (!String(data.get('name') ?? '').trim()) e.name = t('form.error.name');
    const email = String(data.get('email') ?? '').trim();
    if (!EMAIL_RE.test(email)) e.email = t('form.error.email');
    if (!String(data.get('eventType') ?? '')) e.eventType = t('form.error.eventType');
    if (!data.get('consent')) e.consent = t('form.error.consent');
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      // Fokus auf erstes Fehlerfeld
      const firstKey = Object.keys(e)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }
    setStatus('submitting');

    // TODO: Anfrage an Backend/Versanddienst senden, z. B.:
    //   await fetch('/api/event-request', { method: 'POST', body: new FormData(form) });
    // Aktuell nur simulierte Verzögerung ohne echten Versand.
    await new Promise((r) => setTimeout(r, 600));
    setStatus('success');
    form.reset();
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-emerald-600" aria-hidden />
        <h3 className="font-display text-fluid-lg font-semibold text-ink">{t('form.success.title')}</h3>
        <p className="max-w-md text-fluid-base text-ink/75">{t('form.success.text')}</p>
        <p className="text-fluid-sm text-ink/50">{t('form.backendNote')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('form.name')} name="name" required error={errors.name} />
        <Field label={t('form.email')} name="email" type="email" required error={errors.email} />
        <Field label={t('form.phone')} name="phone" type="tel" optional optionalLabel={t('form.optional')} />
        <SelectField label={t('form.eventType')} name="eventType" required error={errors.eventType}
          placeholder={t('form.eventType.placeholder')}
          options={[
            ['birthday', t('form.eventType.birthday')],
            ['wedding', t('form.eventType.wedding')],
            ['corporate', t('form.eventType.corporate')],
            ['catering', t('form.eventType.catering')],
            ['foodtruck', t('form.eventType.foodtruck')],
            ['other', t('form.eventType.other')],
          ]}
        />
        <Field label={t('form.date')} name="date" type="date" optional optionalLabel={t('form.optional')} />
        <Field label={t('form.guests')} name="guests" type="number" min={1} optional optionalLabel={t('form.optional')} />
        <SelectField label={t('form.location')} name="location"
          placeholder={t('form.location.placeholder')} optional optionalLabel={t('form.optional')}
          options={[
            ['any', t('form.location.any')],
            ...locations.map((l) => [l.slug, l.shortName] as [string, string]),
          ]}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-fluid-sm font-medium text-ink/80">
          {t('form.message')} <span className="text-ink/40">({t('form.optional')})</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={t('form.message.placeholder')}
          className="rounded-xl border border-stone/60 bg-paper-light px-4 py-3 text-fluid-base text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none focus-visible:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-fluid-sm text-ink/75">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 h-5 w-5 flex-none rounded border-stone accent-ink"
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            {t('form.consent')}{' '}
            <Link href="/datenschutz" className="link-underline text-muted">
              {t('nav.privacy')}
            </Link>
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="ml-8 text-fluid-sm text-ink">
            {errors.consent}
          </p>
        )}
      </div>

      <button type="submit" disabled={status === 'submitting'} className="btn-primary self-start disabled:opacity-60">
        {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {t('form.submit')}
      </button>
      <p className="text-fluid-sm text-ink/50">{t('form.backendNote')}</p>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  optional,
  optionalLabel,
  error,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  optionalLabel?: string;
  error?: string;
  min?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-fluid-sm font-medium text-ink/80">
        {label}{' '}
        {required ? (
          <span className="text-muted" aria-hidden>
            *
          </span>
        ) : (
          optional && <span className="text-ink/40">({optionalLabel})</span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        min={min}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          'rounded-xl border bg-paper-light px-4 py-3 text-fluid-base text-ink placeholder:text-ink/40 focus:outline-none focus-visible:outline-none',
          error ? 'border-muted' : 'border-stone/60 focus:border-ink'
        )}
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="text-fluid-sm text-ink">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  placeholder,
  required,
  optional,
  optionalLabel,
  error,
}: {
  label: string;
  name: string;
  options: [string, string][];
  placeholder: string;
  required?: boolean;
  optional?: boolean;
  optionalLabel?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-fluid-sm font-medium text-ink/80">
        {label}{' '}
        {required ? (
          <span className="text-muted" aria-hidden>
            *
          </span>
        ) : (
          optional && <span className="text-ink/40">({optionalLabel})</span>
        )}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        defaultValue=""
        className={cn(
          'rounded-xl border bg-paper-light px-4 py-3 text-fluid-base text-ink focus:outline-none focus-visible:outline-none',
          error ? 'border-muted' : 'border-stone/60 focus:border-ink'
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(([value, labelText]) => (
          <option key={value} value={value}>
            {labelText}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${name}-error`} role="alert" className="text-fluid-sm text-ink">
          {error}
        </p>
      )}
    </div>
  );
}
