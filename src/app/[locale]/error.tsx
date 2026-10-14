'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error for diagnostics
    console.error('Edulearn application error caught:', error);
  }, [error]);

  return (
    <div
      role="alert"
      className="max-w-2xl mx-auto my-16 p-8 bg-white border border-red-200 rounded-2xl shadow-sm text-center space-y-4"
    >
      <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
        <AlertCircle className="w-6 h-6" aria-hidden="true" />
      </div>

      <h1 className="text-xl sm:text-2xl font-serif font-bold text-navy-900">
        Application Error
      </h1>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
        An error occurred while loading this section of the Edulearn International College portal.
      </p>

      {error.digest && (
        <p className="text-[10px] font-mono text-slate-400">
          Diagnostic ID: {error.digest}
        </p>
      )}

      <div className="pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Retry Operation</span>
        </button>
      </div>
    </div>
  );
}
