'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MOTION_DURATIONS, MOTION_EASINGS } from '@/lib/motion';

export interface AccordionItemData {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  badge?: string;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenId,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('space-y-3', className)} role="region" aria-label="Accordion items">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-colors hover:border-gold-500/40"
          >
            <h3>
              <button
                type="button"
                id={`accordion-btn-${item.id}`}
                aria-controls={`accordion-content-${item.id}`}
                aria-expanded={isOpen}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-sans text-navy-900 hover:text-royal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors"
              >
                <div className="space-y-0.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-serif font-bold text-navy-900">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <p className="text-xs text-slate-500">{item.subtitle}</p>
                  )}
                </div>

                <div
                  className={cn(
                    'p-1 rounded-full text-slate-400 shrink-0 transition-transform duration-200 motion-reduce:transition-none',
                    isOpen && 'rotate-180 text-gold-600'
                  )}
                >
                  <ChevronDown className="w-5 h-5" aria-hidden="true" />
                </div>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-btn-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : MOTION_DURATIONS.fast,
                    ease: MOTION_EASINGS.standard,
                  }}
                  className="overflow-hidden"
                >
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
