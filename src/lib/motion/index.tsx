'use client';

import React from 'react';
import { motion, useReducedMotion, Variants, Transition } from 'framer-motion';

/**
 * Edulearn Institutional Motion Design Tokens
 * Standardized durations, easing curves, stagger intervals, and entrance distances.
 */

export const MOTION_DURATIONS = {
  instant: 0.1,  // 100ms - micro-interactions, buttons
  fast: 0.2,     // 200ms - hover states, dropdowns, tooltip reveals
  normal: 0.35,  // 350ms - card reveals, modal entrances, tab switches
  gentle: 0.5,   // 500ms - section reveals, hero fade-ins
} as const;

export const MOTION_EASINGS = {
  // Material 3 / Modern Standard: [0.2, 0.0, 0, 1.0]
  standard: [0.2, 0.0, 0, 1.0] as const,
  // Emphasized gentle settle
  emphasized: [0.05, 0.7, 0.1, 1.0] as const,
  // Decelerate for smooth entrances
  decelerate: [0.0, 0.0, 0.2, 1.0] as const,
  // Accelerate for exits
  accelerate: [0.4, 0.0, 1.0, 1.0] as const,
} as const;

export const MOTION_STAGGERS = {
  fast: 0.05,
  normal: 0.08,
  cards: 0.1,
} as const;

export const MOTION_DISTANCES = {
  micro: 8,
  standard: 16,
} as const;

/**
 * Standard reusable transition configs
 */
export const standardTransition: Transition = {
  duration: MOTION_DURATIONS.normal,
  ease: MOTION_EASINGS.standard,
};

export const gentleTransition: Transition = {
  duration: MOTION_DURATIONS.gentle,
  ease: MOTION_EASINGS.decelerate,
};

/**
 * Reusable motion variants
 */
export const fadeSlideUpVariants: Variants = {
  hidden: { opacity: 0, y: MOTION_DISTANCES.standard },
  visible: {
    opacity: 1,
    y: 0,
    transition: gentleTransition,
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: MOTION_DURATIONS.normal,
      ease: MOTION_EASINGS.standard,
    },
  },
};

export const createStaggerContainer = (
  staggerInterval = MOTION_STAGGERS.normal,
  delayChildren = 0.04
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerInterval,
      delayChildren,
    },
  },
});

export const staggerContainerVariants: Variants = createStaggerContainer();

/**
 * Interactive button tap variant (restrained, WCAG safe)
 */
export const buttonTapVariants = {
  tap: { scale: 0.98 },
};

/**
 * Interactive card hover variant (compositor-only, zero layout shift)
 */
export const cardHoverVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: -3,
    transition: {
      duration: MOTION_DURATIONS.fast,
      ease: MOTION_EASINGS.standard,
    },
  },
};

/**
 * Accessible ScrollReveal Component
 * Automatically bypasses translation and delay when user prefers reduced motion.
 * Uses viewport once: true so sections reveal smoothly and remain stable.
 */
type MotionDivProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'
>;

interface ScrollRevealProps extends MotionDivProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  threshold?: number;
  fadeOnly?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  distance = MOTION_DISTANCES.standard,
  threshold = -40,
  fadeOnly = false,
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  const initialY = fadeOnly ? 0 : distance;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: `${threshold}px` }}
      transition={{
        duration: MOTION_DURATIONS.gentle,
        ease: MOTION_EASINGS.decelerate,
        delay,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
