'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { MOTION_DURATIONS, MOTION_EASINGS } from '@/lib/motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Polished, non-blocking page transition wrapper compatible with Next.js App Router static export.
 * Fades in newly mounted route content over 200ms without layout displacement.
 * Automatically disabled when user prefers reduced motion.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: MOTION_DURATIONS.fast,
        ease: MOTION_EASINGS.standard,
      }}
      className="flex-1 flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
};
