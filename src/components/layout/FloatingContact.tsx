'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Phone, Send, X, Headphones } from 'lucide-react';
import { Locale, getDictionary } from '@/lib/i18n';

interface FloatingContactProps {
  locale: Locale;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({ locale }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dict = getDictionary(locale);

  // Avoid covering form fields or submit buttons on contact and enquiry pages
  const isFormPage = pathname?.includes('/contact') || pathname?.includes('/apply');
  if (isFormPage) {
    return null;
  }

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 print:hidden flex flex-col items-end gap-2.5"
      aria-label={dict.chatbot.speedDialTitle}
    >
      {/* Speed Dial Menu items */}
      {isOpen && (
        <div className="bg-navy-900 border border-navy-700 rounded-2xl shadow-prestige-lg p-3 space-y-2 w-64 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="px-2 py-1 border-b border-navy-800">
            <span className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider">
              {dict.chatbot.speedDialTitle}
            </span>
            <p className="text-[10px] text-slate-300">
              {dict.chatbot.speedDialSubtitle}
            </p>
          </div>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/6590049657?text=Hello%20Edulearn%20Admissions%2C%20I%20would%20like%20to%20enquire%20about%20course%20enrollment."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2 rounded-lg bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-300 transition-colors group"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-emerald-300">
                {dict.chatbot.whatsAppAdvisor}
              </div>
              <div className="text-[10px] text-emerald-400/80">+65 9004 9657 (Fastest)</div>
            </div>
          </a>

          {/* Call Campus Hotline */}
          <a
            href="tel:+6590049657"
            className="flex items-center gap-2.5 p-2 rounded-lg bg-navy-800/80 hover:bg-navy-800 border border-navy-700 text-slate-200 transition-colors group"
          >
            <div className="w-7 h-7 rounded-full bg-navy-700 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-gold-400" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-gold-300">
                {dict.chatbot.callAdmissions}
              </div>
              <div className="text-[10px] text-slate-400">+65 6258 7189 / 9004 9657</div>
            </div>
          </a>

          {/* Online Application Link */}
          <Link
            href={`/${locale}/apply/`}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 p-2 rounded-lg bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/30 text-gold-300 transition-colors group"
          >
            <div className="w-7 h-7 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0">
              <Send className="w-4 h-4 text-gold-400" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-gold-300">
                {dict.chatbot.onlineApplication}
              </div>
              <div className="text-[10px] text-gold-400/80">Submit enrolment details</div>
            </div>
          </Link>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? dict.chatbot.closeDial : dict.chatbot.openDial}
        className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-full shadow-prestige-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 ${
          isOpen
            ? 'bg-navy-800 text-white border border-navy-600'
            : 'bg-gold-500 hover:bg-gold-400 text-navy-950 border border-gold-400'
        }`}
      >
        {isOpen ? (
          <X className="w-5 h-5" aria-hidden="true" />
        ) : (
          <>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-navy-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-navy-900"></span>
            </span>
            <Headphones className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold font-sans tracking-wide">
              {dict.nav.applyNow}
            </span>
          </>
        )}
      </button>
    </div>
  );
};
