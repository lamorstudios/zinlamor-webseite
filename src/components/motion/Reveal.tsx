'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Verzögerung in Sekunden (gestaffelte Reveals) */
  delay?: number;
  /** Richtung des Fade */
  y?: number;
  className?: string;
  /** HTML-Element */
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
  once?: boolean;
}

/**
 * Sanftes Fade-up beim Scrollen. Nutzt nur transform/opacity.
 * Respektiert prefers-reduced-motion (dann sofort sichtbar, keine Bewegung).
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = 'div',
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={`anim-reveal${className ? ` ${className}` : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/** Container für gestaffelte Kinder-Reveals. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`anim-reveal${className ? ` ${className}` : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduce ? 0 : stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
