import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  subtitle,
  align = 'left',
  theme = 'light',
  className,
  ...props
}) => {
  const isCenter = align === 'center';
  const isDark = theme === 'dark';
  const textDescription = subtitle || description;

  return (
    <div
      className={cn(
        'space-y-3',
        isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl',
        className
      )}
      {...props}
    >
      {eyebrow && (
        <div
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider',
            isDark
              ? 'bg-navy-900 border border-gold-500/40 text-gold-400'
              : 'bg-gold-100 border border-gold-300 text-gold-900'
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2
        className={cn(
          'text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight',
          isDark ? 'text-white' : 'text-navy-950'
        )}
      >
        {title}
      </h2>

      {textDescription && (
        <p
          className={cn(
            'text-sm sm:text-base leading-relaxed',
            isDark ? 'text-slate-300' : 'text-slate-600'
          )}
        >
          {textDescription}
        </p>
      )}
    </div>
  );
};
