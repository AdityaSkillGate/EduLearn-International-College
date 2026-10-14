'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  X,
  ChevronDown,
  BookOpen,
  Building2,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  FileCheck2,
  Phone,
  MessageSquare,
  Award,
  Users,
  Compass,
  FileText,
  HelpCircle,
  Newspaper,
  Image as ImageIcon,
  ExternalLink,
} from 'lucide-react';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { LanguageSwitcher } from './LanguageSwitcher';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  dict: Dictionary;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  locale,
  dict,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [openSection, setOpenSection] = useState<string | null>('courses');

  // Focus trap, lock body scroll, and Escape listener
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      // Focus close button on open
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        if (e.key === 'Tab' && drawerRef.current) {
          const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
        previousFocusRef.current?.focus();
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dict.common.openMobileMenu}
      className="fixed inset-0 z-50 lg:hidden flex justify-end overflow-hidden"
    >
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-sm bg-navy-900 border-l border-navy-800 shadow-2xl flex flex-col h-full overflow-y-auto overflow-x-hidden text-white z-10 animate-in slide-in-from-right duration-250"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-navy-800 bg-navy-950 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1 rounded-lg shadow-sm border border-white/20 shrink-0">
              <img
                src="/images/edulearn-logo-mark.png"
                alt="Edulearn International College"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xs sm:text-sm text-white leading-tight">
                Edulearn International College
              </span>
              <span className="text-[9px] text-slate-300 font-sans mt-0.5">
                <span className="font-semibold text-gold-400">PEI: 201708935D</span> • 17/05/2022 – 16/05/2026
              </span>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={dict.common.closeMobileMenu}
            className="p-2 text-slate-300 hover:text-white rounded-md bg-navy-800/80 hover:bg-navy-800 border border-navy-700/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Language selector in drawer */}
        <div className="px-5 py-3 bg-navy-950/60 border-b border-navy-800/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>{dict.common.selectLanguage}</span>
          <LanguageSwitcher currentLocale={locale} />
        </div>

        {/* Navigation Accordions & Direct Links */}
        <nav className="flex-1 px-4 py-5 space-y-2.5 overflow-y-auto" aria-label="Mobile Navigation">
          {/* Home Link */}
          <Link
            href={`/${locale}/`}
            onClick={onClose}
            className="flex items-center justify-between px-4 py-3 font-semibold text-sm text-slate-200 hover:text-gold-400 border border-navy-800 rounded-lg bg-navy-950/40 hover:bg-navy-800/50 transition-colors"
          >
            <span>{dict.nav.home}</span>
          </Link>

          {/* 1. About College Accordion */}
          <div className="border border-navy-800 rounded-lg overflow-hidden bg-navy-950/30">
            <button
              type="button"
              onClick={() => toggleSection('about')}
              className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-slate-200 hover:text-gold-400 transition-colors"
              aria-expanded={openSection === 'about'}
            >
              <div className="flex items-center gap-2.5 text-sm">
                <Building2 className="w-4 h-4 text-gold-500" aria-hidden="true" />
                <span>{dict.nav.about}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  openSection === 'about' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {openSection === 'about' && (
              <div className="px-4 pb-3 space-y-1 text-xs text-slate-300 border-t border-navy-800/60 pt-2 bg-navy-900/40">
                <Link
                  href={`/${locale}/about/`}
                  onClick={onClose}
                  className="block py-2 px-2.5 rounded hover:bg-navy-800 hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.aboutOverview}
                </Link>
                <Link
                  href={`/${locale}/about/facilities/`}
                  onClick={onClose}
                  className="block py-2 px-2.5 rounded hover:bg-navy-800 hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.facilities}
                </Link>
                <Link
                  href={`/${locale}/governance/#academic-board`}
                  onClick={onClose}
                  className="block py-2 px-2.5 rounded hover:bg-navy-800 hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.academicBoard}
                </Link>
                <Link
                  href={`/${locale}/governance/#faculty`}
                  onClick={onClose}
                  className="block py-2 px-2.5 rounded hover:bg-navy-800 hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.facultyDeployment}
                </Link>
                <Link
                  href={`/${locale}/governance/#certificates`}
                  onClick={onClose}
                  className="block py-2 px-2.5 rounded hover:bg-navy-800 hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.regulatoryCertificates}
                </Link>
              </div>
            )}
          </div>

          {/* 2. Academic Courses Accordion */}
          <div className="border border-navy-800 rounded-lg overflow-hidden bg-navy-950/30">
            <button
              type="button"
              onClick={() => toggleSection('courses')}
              className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-slate-200 hover:text-gold-400 transition-colors"
              aria-expanded={openSection === 'courses'}
            >
              <div className="flex items-center gap-2.5 text-sm">
                <BookOpen className="w-4 h-4 text-gold-500" aria-hidden="true" />
                <span>{dict.nav.courses}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  openSection === 'courses' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {openSection === 'courses' && (
              <div className="px-4 pb-3 space-y-1 text-xs text-slate-300 border-t border-navy-800/60 pt-2 bg-navy-900/40">
                <Link
                  href={`/${locale}/courses/`}
                  onClick={onClose}
                  className="block py-2 px-2.5 font-bold text-gold-300 rounded bg-navy-800/50 hover:bg-navy-800 transition-colors"
                >
                  {dict.nav.sub.allCourses}
                </Link>
                <Link
                  href={`/${locale}/courses/diploma`}
                  onClick={onClose}
                  className="block py-2 px-2.5 rounded hover:bg-navy-800 hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.diplomaCourses} (13)
                </Link>
                <Link
                  href={`/${locale}/courses/advanced-diploma`}
                  onClick={onClose}
                  className="block py-2 px-2.5 rounded hover:bg-navy-800 hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.advDiplomaCourses} (5)
                </Link>
                <Link
                  href={`/${locale}/courses/short-term`}
                  onClick={onClose}
                  className="block py-2 px-2.5 rounded hover:bg-navy-800 hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.shortTermCourses} (5)
                </Link>
                <Link
                  href={`/${locale}/courses/postgraduate-diploma`}
                  onClick={onClose}
                  className="block py-2 px-2.5 rounded hover:bg-navy-800 hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.pgDiplomaCourses} (2)
                </Link>
              </div>
            )}
          </div>

          {/* 3. Student Corner Accordion */}
          <div className="border border-navy-800 rounded-lg overflow-hidden bg-navy-950/30">
            <button
              type="button"
              onClick={() => toggleSection('student')}
              className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-slate-200 hover:text-gold-400 transition-colors"
              aria-expanded={openSection === 'student'}
            >
              <div className="flex items-center gap-2.5 text-sm">
                <GraduationCap className="w-4 h-4 text-gold-500" aria-hidden="true" />
                <span>{dict.nav.studentCorner}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  openSection === 'student' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {openSection === 'student' && (
              <div className="px-4 pb-3 space-y-1 text-xs text-slate-300 border-t border-navy-800/60 pt-2 bg-navy-900/40">
                <Link
                  href={`/${locale}/forms/`}
                  onClick={onClose}
                  className="block py-2 px-2.5 rounded hover:bg-navy-800 hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.formsDownloads}
                </Link>
                <Link
                  href={`/${locale}/student-corner/`}
                  onClick={onClose}
                  className="block py-2 px-2.5 rounded hover:bg-navy-800 hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.studentSupport}
                </Link>
                <Link
                  href={`/${locale}/useful-links/`}
                  onClick={onClose}
                  className="block py-2 px-2.5 rounded hover:bg-navy-800 hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.usefulLinks}
                </Link>
              </div>
            )}
          </div>

          {/* 4. News & Events Link */}
          <Link
            href={`/${locale}/news/`}
            onClick={onClose}
            className="flex items-center gap-2.5 px-4 py-3 font-medium text-sm text-slate-200 hover:text-gold-400 border border-navy-800 rounded-lg bg-navy-950/30 hover:bg-navy-800/40 transition-colors"
          >
            <Newspaper className="w-4 h-4 text-gold-500" aria-hidden="true" />
            <span>{dict.nav.newsEvents}</span>
          </Link>

          {/* 5. Campus Gallery Link */}
          <Link
            href={`/${locale}/gallery/`}
            onClick={onClose}
            className="flex items-center gap-2.5 px-4 py-3 font-medium text-sm text-slate-200 hover:text-gold-400 border border-navy-800 rounded-lg bg-navy-950/30 hover:bg-navy-800/40 transition-colors"
          >
            <ImageIcon className="w-4 h-4 text-gold-500" aria-hidden="true" />
            <span>{dict.nav.gallery}</span>
          </Link>

          {/* 6. Contact Us Link */}
          <Link
            href={`/${locale}/contact/`}
            onClick={onClose}
            className="flex items-center gap-2.5 px-4 py-3 font-medium text-sm text-slate-200 hover:text-gold-400 border border-navy-800 rounded-lg bg-navy-950/30 hover:bg-navy-800/40 transition-colors"
          >
            <Phone className="w-4 h-4 text-gold-500" aria-hidden="true" />
            <span>{dict.nav.contact}</span>
          </Link>
        </nav>

        {/* Drawer Action Buttons & Telephony */}
        <div className="p-5 border-t border-navy-800 bg-navy-950 space-y-2.5 shrink-0">
          <Link
            href={`/${locale}/apply/`}
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm rounded-lg shadow-prestige transition-all duration-150"
          >
            <Award className="w-4 h-4" aria-hidden="true" />
            <span>{dict.nav.applyNow}</span>
          </Link>

          <a
            href="https://wa.me/6590049657?text=Hello%20Edulearn%20Admissions%2C%20I%20would%20like%20to%20enquire%20about%20course%20enrollment."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-600/40 font-medium text-xs rounded-lg transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>{dict.hero.ctaWhatsapp}</span>
          </a>

          <a
            href="tel:+6590049657"
            className="w-full flex items-center justify-center gap-2 py-2 px-4 text-slate-400 hover:text-slate-200 text-xs transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-gold-500" aria-hidden="true" />
            <span>Hotline: +65 9004 9657</span>
          </a>

          <div className="text-center pt-1">
            <p className="text-[10px] text-slate-400">
              Singapore PEI Reg No: <strong className="text-slate-300">201708935D</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
