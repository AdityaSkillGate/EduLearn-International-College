import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'royal' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export const getButtonClasses = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string
) => {
  const baseClasses =
    'inline-flex items-center justify-center font-sans font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const variantClasses = {
    primary:
      'bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold shadow-prestige hover:shadow-gold-glow active:scale-[0.98] motion-reduce:active:scale-100',
    secondary:
      'bg-navy-900 hover:bg-navy-800 text-white border border-navy-700 hover:border-gold-500/50 shadow-sm active:scale-[0.98] motion-reduce:active:scale-100',
    royal:
      'bg-royal-600 hover:bg-royal-500 text-white font-semibold shadow-sm active:scale-[0.98] motion-reduce:active:scale-100',
    outline:
      'bg-transparent border border-slate-300 hover:border-gold-500 hover:bg-gold-100/40 text-navy-900 active:scale-[0.98] motion-reduce:active:scale-100',
    ghost:
      'bg-transparent hover:bg-slate-100 text-navy-900 hover:text-gold-700 active:scale-[0.98] motion-reduce:active:scale-100',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-md gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-lg gap-2',
    lg: 'px-6 py-3.5 text-base rounded-xl gap-2.5',
  };

  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      iconLeft,
      iconRight,
      icon,
      disabled,
      className,
      children,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const classes = getButtonClasses(variant, size, className);
    const rightIcon = icon || iconRight;

    if (href) {
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={classes}
        >
          {iconLeft}
          <span>{children}</span>
          {rightIcon}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={classes}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" aria-hidden="true" />
        ) : (
          iconLeft
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
