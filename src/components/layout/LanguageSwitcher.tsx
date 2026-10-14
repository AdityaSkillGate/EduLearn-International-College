'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Locale, LOCALES, LOCALE_CONFIGS } from '@/lib/i18n/types';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLocale,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<(HTMLLIElement | null)[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const listboxId = useId();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
      return;
    }

    if (!isOpen) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(true);
        setTimeout(() => {
          const currentIndex = LOCALES.indexOf(currentLocale);
          optionsRef.current[currentIndex >= 0 ? currentIndex : 0]?.focus();
        }, 50);
      }
      return;
    }

    const currentIndex = LOCALES.findIndex((loc) => loc === document.activeElement?.getAttribute('data-locale'));

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % LOCALES.length;
      optionsRef.current[nextIndex]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + LOCALES.length) % LOCALES.length;
      optionsRef.current[prevIndex]?.focus();
    }
  };

  const handleSelectLanguage = (newLocale: Locale) => {
    setIsOpen(false);
    buttonRef.current?.focus();
    if (newLocale === currentLocale) return;

    // Calculate new path by replacing the locale segment
    // Path format: /[locale]/... or /[locale]
    const segments = pathname ? pathname.split('/').filter(Boolean) : [];
    if (segments.length > 0 && LOCALES.includes(segments[0] as Locale)) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    const newPath = `/${segments.join('/')}/`;
    router.push(newPath);
  };

  const activeConfig = LOCALE_CONFIGS[currentLocale];

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={`${activeConfig.nativeName} (${activeConfig.name}) - Select language`}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-all duration-150"
      >
        <Globe className="w-3.5 h-3.5 text-gold-600 shrink-0" aria-hidden="true" />
        <span className="font-semibold tracking-wide">{activeConfig.nativeName}</span>
        <ChevronDown
          className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Available languages"
          tabIndex={-1}
          className="absolute right-0 mt-1.5 w-48 rounded-md bg-white border border-slate-200 shadow-prestige-lg z-50 py-1 focus:outline-none animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {LOCALES.map((locale, index) => {
            const config = LOCALE_CONFIGS[locale];
            const isSelected = locale === currentLocale;

            return (
              <li
                key={locale}
                ref={(el) => {
                  optionsRef.current[index] = el;
                }}
                role="option"
                data-locale={locale}
                tabIndex={0}
                aria-selected={isSelected}
                onClick={() => handleSelectLanguage(locale)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectLanguage(locale);
                  }
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 text-xs cursor-pointer focus:outline-none focus:bg-purple-50 focus:text-purple-700 transition-colors ${
                  isSelected
                    ? 'bg-purple-50 text-purple-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{config.nativeName}</span>
                  <span className="text-[10px] text-slate-400">{config.name}</span>
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-gold-600 shrink-0" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
