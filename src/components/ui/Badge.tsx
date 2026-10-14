import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'navy' | 'emerald' | 'royal' | 'neutral';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gold',
  size = 'md',
  icon,
  className,
  children,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center gap-1.5 rounded-full font-sans tracking-wide uppercase font-semibold';

  const variantClasses = {
    gold: 'bg-gold-100 border border-gold-300 text-gold-900',
    navy: 'bg-navy-900 border border-navy-700 text-gold-400',
    emerald: 'bg-emerald-50 border border-emerald-300 text-emerald-800',
    royal: 'bg-blue-50 border border-blue-200 text-royal-700',
    neutral: 'bg-slate-100 border border-slate-200 text-slate-800',
  };

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  return (
    <span
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
};
