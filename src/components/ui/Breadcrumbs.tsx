import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  homeHref?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  homeHref = '/',
  className,
  ...props
}) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('py-3 text-xs', className)} {...props}>
      <ol className="flex items-center flex-wrap gap-1.5 text-slate-500 font-medium">
        <li>
          <Link
            href={homeHref}
            className="flex items-center gap-1 hover:text-gold-700 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 rounded p-0.5"
            aria-label="Home"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.current;

          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" aria-hidden="true" />
              {isLast || !item.href ? (
                <span
                  className="text-navy-900 font-semibold truncate max-w-[200px] sm:max-w-xs"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-gold-700 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 rounded p-0.5"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
