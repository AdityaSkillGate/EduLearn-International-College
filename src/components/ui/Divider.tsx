import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'subtle' | 'ornamental' | 'gold' | 'navy';
}

export const Divider: React.FC<DividerProps> = ({
  variant = 'subtle',
  className,
  ...props
}) => {
  if (variant === 'ornamental') {
    return (
      <div
        role="separator"
        className={cn('relative flex items-center justify-center py-6', className)}
        {...props}
      >
        <div className="w-full border-t border-slate-200" />
        <div className="absolute px-3 bg-alabaster flex items-center gap-1.5 text-gold-500 text-xs">
          <Sparkles className="w-4 h-4 text-gold-600" aria-hidden="true" />
        </div>
      </div>
    );
  }

  const variantClasses = {
    subtle: 'border-slate-200',
    gold: 'border-gold-300',
    navy: 'border-navy-800',
    ornamental: '',
  };

  return (
    <hr
      role="separator"
      className={cn('border-0 border-t my-6 w-full', variantClasses[variant], className)}
      {...props}
    />
  );
};
