'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type ConsentCategory = 'necessary' | 'statistics' | 'marketing' | 'external';

export type ConsentState = Record<ConsentCategory, boolean>;

const STORAGE_KEY = 'ltf-consent-v1';

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  statistics: false,
  marketing: false,
  external: false,
};

interface ConsentContextValue {
  /** null = noch keine Entscheidung getroffen (Banner anzeigen) */
  consent: ConsentState | null;
  /** true, sobald eine Entscheidung vorliegt */
  decided: boolean;
  save: (state: Partial<ConsentState>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  /** Banner/Dialog erneut öffnen (z. B. aus Footer/Cookie-Seite) */
  openSettings: () => void;
  settingsOpen: boolean;
  closeSettings: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ConsentState;
        setConsent({ ...DEFAULT_CONSENT, ...parsed, necessary: true });
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((state: ConsentState) => {
    setConsent(state);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, []);

  const save = useCallback(
    (partial: Partial<ConsentState>) => {
      persist({ ...DEFAULT_CONSENT, ...consent, ...partial, necessary: true });
      setSettingsOpen(false);
    },
    [consent, persist]
  );

  const acceptAll = useCallback(() => {
    persist({ necessary: true, statistics: true, marketing: true, external: true });
    setSettingsOpen(false);
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ ...DEFAULT_CONSENT });
    setSettingsOpen(false);
  }, [persist]);

  return (
    <ConsentContext.Provider
      value={{
        consent,
        decided: mounted && consent !== null,
        save,
        acceptAll,
        rejectAll,
        openSettings: () => setSettingsOpen(true),
        settingsOpen,
        closeSettings: () => setSettingsOpen(false),
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider');
  return ctx;
}

/** Prüft, ob eine bestimmte Kategorie freigegeben ist. */
export function useHasConsent(category: ConsentCategory): boolean {
  const { consent } = useConsent();
  return Boolean(consent?.[category]);
}
