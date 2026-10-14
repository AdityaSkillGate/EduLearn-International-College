import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, ShieldCheck } from 'lucide-react';

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-navy-950 text-white flex flex-col justify-center items-center px-4 py-16 text-center">
      <div className="bg-white p-3 rounded-lg shadow-md mb-6 inline-block">
        <img
          src="/images/edulearn-logo-mark.png"
          alt="Edulearn International College"
          className="h-10 w-auto object-contain"
        />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-4">
        <ShieldCheck className="w-3.5 h-3.5 text-gold-500" aria-hidden="true" />
        <span>Status 404 • Resource Not Located</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
        Page Not Found
      </h1>

      <p className="text-sm text-slate-300 max-w-md mx-auto mb-8 leading-relaxed">
        The requested institutional route or course page could not be located on the Edulearn International College portal.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/en/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs rounded-lg transition-colors shadow-prestige"
        >
          <span>Return to Homepage (English)</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
        <Link
          href="/zh-sg/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-slate-200 border border-navy-700 font-medium text-xs rounded-lg transition-colors"
        >
          <span>中文版首页</span>
        </Link>
        <Link
          href="/ta-sg/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-slate-200 border border-navy-700 font-medium text-xs rounded-lg transition-colors"
        >
          <span>முகப்பு (தமிழ்)</span>
        </Link>
      </div>

      <div className="mt-12 text-xs text-slate-500 border-t border-navy-900 pt-4">
        Edulearn International College Pte. Ltd. • CPE PEI Reg No: 201708935D
      </div>
    </div>
  );
}
