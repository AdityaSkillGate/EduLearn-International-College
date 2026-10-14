import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LocalizedNotFound() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-100 border border-navy-200 text-navy-900 text-xs font-semibold uppercase tracking-wider mb-4">
        <ShieldCheck className="w-3.5 h-3.5 text-navy-800" aria-hidden="true" />
        <span>Status 404 • Resource Not Found</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy-900 mb-3">
        Page Not Found
      </h1>

      <p className="text-sm text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
        The requested institutional page or course module could not be found. Please check the address or return to the main college portal.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          href="/en/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs rounded-lg transition-colors shadow-sm"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
