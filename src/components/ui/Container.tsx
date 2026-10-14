import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'prose' | 'full';
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
  size = 'default',
  as: Component = 'div',
  className,
  children,
  ...props
}) => {
  const sizeClasses = {
    default: 'max-w-7xl',
    narrow: 'max-w-5xl',
    prose: 'max-w-3xl',
    full: 'max-w-full',
  };

  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
