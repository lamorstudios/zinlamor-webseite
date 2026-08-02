'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Bild-/Block-Reveal über eine Clip-Path-Maske (von unten aufziehend).
 * Ruhig, editorial. Respektiert prefers-reduced-motion und funktioniert
 * ohne JS (Klasse `anim-reveal` setzt clip-path zurück).
 */
export function MaskReveal({
  children,
  className,
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={`anim-reveal ${className ?? ''}`}>{children}</div>;
  }

  return (
    <motion.div
      className={`anim-reveal ${className ?? ''}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once, margin: '-10%' }}
      transition={{ duration: 1.1, delay, ease: [0.65, 0.05, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Zeilenweises Typo-Reveal. `lines` als Array von Strings.
 * Jede Zeile fährt hinter einer Maske hervor.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <span className={`anim-reveal block ${className ?? ''}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ''}`}
            initial={{ y: reduce ? 0 : '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.09, ease: [0.65, 0.05, 0, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
