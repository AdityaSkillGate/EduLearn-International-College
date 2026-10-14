import React from 'react';

interface SkipToContentProps {
  label?: string;
}

export const SkipToContent: React.FC<SkipToContentProps> = ({
  label = 'Skip to main content',
}) => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-navy-900 focus:font-semibold focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-navy-900 transition-all duration-200"
    >
      {label}
    </a>
  );
};
