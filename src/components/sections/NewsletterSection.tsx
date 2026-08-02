'use client';

import { useT } from '@/i18n/LanguageProvider';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { Reveal } from '@/components/motion/Reveal';

export function NewsletterSection() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-ink text-paper-light">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, #c9a24b 0.7px, transparent 1.4px), radial-gradient(circle at 85% 80%, #e3d4b8 0.6px, transparent 1.2px)',
          backgroundSize: '30px 30px, 24px 24px',
        }}
      />
      <div className="container-content relative z-10 py-section">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-stone before:bg-stone/60">
              {t('newsletter.eyebrow')}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-display text-fluid-2xl font-semibold text-paper-light">
              {t('newsletter.headline')}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-3 max-w-md text-fluid-base text-paper/80">
              {t('newsletter.text')}
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-8 text-left">
            <NewsletterForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
