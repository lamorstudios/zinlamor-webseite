'use client';

import { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface FaqItem {
  q: string;
  a: string;
}

/** Barrierefreies FAQ-Accordion (Tastatur, aria-expanded/controls). */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-stone/50 rounded-2xl border border-stone/50 bg-paper-light">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-display text-fluid-base font-semibold text-ink">{item.q}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 flex-none text-muted transition-transform duration-300',
                    isOpen && 'rotate-180'
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="px-5 pb-5 text-fluid-base leading-relaxed text-ink/75"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
