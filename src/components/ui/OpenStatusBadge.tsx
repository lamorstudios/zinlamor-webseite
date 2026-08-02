'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import type { Location } from '@/data/locations';
import { getOpenStatus, type OpenStatus } from '@/lib/hours';
import { useT } from '@/i18n/LanguageProvider';
import { cn } from '@/lib/cn';

/**
 * Zeigt „Jetzt geöffnet / Geschlossen“ + heutige Zeiten.
 * Berechnung erst nach Mount → kein Hydration-Mismatch, keine Farb-only-Codierung
 * (Icon + Text + Punkt).
 */
export function OpenStatusBadge({ location, light = false }: { location: Location; light?: boolean }) {
  const t = useT();
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    setStatus(getOpenStatus(location, new Date()));
  }, [location]);

  if (!status) {
    // Platzhalter mit fester Höhe → kein Layout-Shift
    return <span className="inline-flex h-5 items-center text-fluid-sm opacity-0">·</span>;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-fluid-sm',
        light ? 'text-paper/85' : 'text-ink/75'
      )}
    >
      <span
        className={cn(
          'inline-block h-2 w-2 flex-none rounded-full',
          status.isOpen ? 'bg-emerald-500' : 'bg-muted'
        )}
        aria-hidden
      />
      <Clock className="h-3.5 w-3.5 opacity-70" aria-hidden />
      <span className="font-medium">{status.isOpen ? t('hours.open') : t('hours.closed')}</span>
      {status.todayLabel && (
        <span className="opacity-70">
          · {t('hours.today')} {status.todayLabel}
        </span>
      )}
      {!status.todayLabel && <span className="opacity-70">· {t('hours.restday')}</span>}
    </span>
  );
}
