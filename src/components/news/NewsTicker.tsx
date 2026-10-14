'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/types';
import { NewsArticle } from '@/types/news';
import { Megaphone, Pause, Play, ChevronRight, Calendar } from 'lucide-react';

interface NewsTickerProps {
  articles: NewsArticle[];
  locale: Locale;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ articles, locale }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (articles.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [articles.length, isPaused]);

  if (!articles || articles.length === 0) return null;

  const currentArticle = articles[currentIndex];
  const content = currentArticle.content[locale] || currentArticle.content.en;

  return (
    <div
      role="region"
      aria-label="Institutional Announcements Ticker"
      className="bg-navy-900 border-y border-navy-800 text-white py-2.5 px-4 sm:px-6 shadow-xs"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 font-bold uppercase tracking-wider text-[10px]">
            <Megaphone className="w-3 h-3 text-gold-400" aria-hidden="true" />
            <span>Official Notice</span>
          </div>
        </div>

        {/* Headline transition area */}
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <Link
            href={`/${locale}/news/${currentArticle.slug}/`}
            className="truncate text-slate-200 hover:text-gold-300 font-medium transition-colors flex items-center gap-2 group"
          >
            <span className="truncate">{content.title}</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 shrink-0 font-mono">
              <Calendar className="w-3 h-3 text-gold-500" />
              <span>{currentArticle.displayDate[locale]}</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-gold-400 transition-transform shrink-0" />
          </Link>
        </div>

        {/* Accessible Ticker Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            {currentIndex + 1} / {articles.length}
          </span>
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Resume announcement ticker' : 'Pause announcement ticker'}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-navy-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            {isPaused ? (
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Pause className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
