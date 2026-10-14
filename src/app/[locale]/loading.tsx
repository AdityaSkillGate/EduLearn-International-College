import React from 'react';

export default function LocalizedLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4 text-center"
    >
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
        <div className="absolute inset-0 rounded-full border-4 border-gold-500 border-t-transparent animate-spin" />
      </div>
      <p className="text-xs font-medium text-slate-500 tracking-wide">
        Loading college resources...
      </p>
    </div>
  );
}
