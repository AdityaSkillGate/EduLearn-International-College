import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive' | 'navy';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-white border border-slate-200 shadow-sm',
      elevated: 'bg-white border border-slate-200/80 shadow-prestige',
      interactive:
        'bg-white border border-slate-200 shadow-sm hover:shadow-prestige hover:border-gold-500/60 hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-200 motion-reduce:hover:translate-y-0 motion-reduce:transition-none',
      navy: 'bg-navy-900 border border-navy-800 text-white shadow-prestige',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-xl overflow-hidden', variantClasses[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pb-3 space-y-1.5', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg sm:text-xl font-serif font-bold text-navy-900', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-xs sm:text-sm text-slate-600 leading-relaxed', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 pt-0 border-t border-slate-100 flex items-center justify-between', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
