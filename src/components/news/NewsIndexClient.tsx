'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/i18n/types';
import { NewsArticle, ArticleCategory } from '@/types/news';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Button } from '@/components/ui';
import { Calendar, Clock, ArrowRight, MapPin, Tag, Filter } from 'lucide-react';

interface NewsIndexClientProps {
  articles: NewsArticle[];
  locale: Locale;
}

const UI_STRINGS = {
  en: {
    showingCount: (shown: number, total: number) => `Showing ${shown} of ${total} dispatches`,
    emptyTitle: 'No Dispatches in Selected Category',
    emptyDesc: 'There are currently no active announcements matching this filter. Select "All Dispatches" to view all notices.',
    resetFilters: 'Reset Filters',
    featured: 'Featured',
    eventDate: 'Event Date:',
    readDispatch: 'Read Dispatch',
  },
  'zh-sg': {
    showingCount: (shown: number, total: number) => `正在显示 ${shown} / ${total} 条学院公告`,
    emptyTitle: '所选分类暂无公告动态',
    emptyDesc: '当前筛选分类下暂无已发布的官方通知。您可以选择“全部公告”浏览更多动态。',
    resetFilters: '重置筛选',
    featured: '焦点置顶',
    eventDate: '活动日期：',
    readDispatch: '阅读公告全文',
  },
  'ta-sg': {
    showingCount: (shown: number, total: number) => `${total} அறிவிப்புகளில் ${shown} காட்டப்படுகிறது`,
    emptyTitle: 'தேர்ந்தெடுக்கப்பட்ட பிரிவில் அறிவிப்புகள் இல்லை',
    emptyDesc: 'இந்த பிரிவில் தற்போது அறிவிப்புகள் எதுவும் இல்லை. அனைத்தையும் காண "அனைத்து செய்திகள்" என்பதைத் தேர்ந்தெடுக்கவும்.',
    resetFilters: 'வடிகட்டிகளை மீட்டமைக்க',
    featured: 'முக்கிய செய்தி',
    eventDate: 'நிகழ்வு தேதி:',
    readDispatch: 'முழு செய்தி வாசிக்க',
  },
};

export const NewsIndexClient: React.FC<NewsIndexClientProps> = ({ articles, locale }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const t = UI_STRINGS[locale] || UI_STRINGS.en;

  const categories: Array<{ id: string; label: Record<Locale, string> }> = [
    {
      id: 'all',
      label: {
        en: 'All Dispatches',
        'zh-sg': '全部公告',
        'ta-sg': 'அனைத்து செய்திகள்',
      },
    },
    {
      id: 'admissions',
      label: {
        en: 'Admissions & Intakes',
        'zh-sg': '招生与录取',
        'ta-sg': 'சேர்க்கை & புதிய வகுப்புகள்',
      },
    },
    {
      id: 'institutional',
      label: {
        en: 'Institutional Governance',
        'zh-sg': '机构合规与治理',
        'ta-sg': 'நிறுவன ஆளுமை',
      },
    },
    {
      id: 'academic',
      label: {
        en: 'Academic Curriculum',
        'zh-sg': '学术与课程体系',
        'ta-sg': 'கல்வி & பாடத்திட்டம்',
      },
    },
    {
      id: 'events',
      label: {
        en: 'Campus Events',
        'zh-sg': '校园活动与典礼',
        'ta-sg': 'வளாக நிகழ்வுகள்',
      },
    },
  ];

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter((art) => art.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={isActive}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                  isActive
                    ? 'bg-navy-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-navy-950 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label[locale] || cat.label.en}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 font-mono">
          {t.showingCount(filteredArticles.length, articles.length)}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <Filter className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-navy-950">
            {t.emptyTitle}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {t.emptyDesc}
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className="text-xs font-semibold text-royal-600 hover:underline"
          >
            {t.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const content = article.content[locale] || article.content.en;
            const isEvent = article.category === 'events' || article.eventDetails;

            return (
              <Card
                key={article.id}
                variant="interactive"
                className="flex flex-col justify-between overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all group"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={article.image}
                      alt={content.altText}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <Badge variant="navy" className="text-[10px] uppercase font-bold tracking-wider">
                        {article.category}
                      </Badge>
                      {article.featured && (
                        <Badge variant="gold" className="text-[10px] font-bold">
                          {t.featured}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <CardHeader className="p-5 pb-3 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gold-600" />
                        <span>{article.displayDate[locale]}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{article.readingTime}</span>
                      </span>
                    </div>

                    <CardTitle className="text-base sm:text-lg font-serif font-bold text-navy-950 group-hover:text-gold-700 transition-colors leading-snug">
                      <Link href={`/${locale}/news/${article.slug}/`} className="focus:outline-none">
                        {content.title}
                      </Link>
                    </CardTitle>

                    <CardDescription className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-sans pt-1">
                      {content.summary}
                    </CardDescription>
                  </CardHeader>

                  {/* Verified Event Pill (if applicable) */}
                  {article.eventDetails && (
                    <div className="px-5 pb-2">
                      <div className="p-2.5 rounded-lg bg-gold-50/80 border border-gold-200/80 text-[11px] text-navy-950 flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                        <div className="leading-tight">
                          <span className="font-semibold block">{t.eventDate} {article.eventDetails.displayDate[locale]}</span>
                          <span className="text-[10px] text-slate-600 block mt-0.5 truncate max-w-[240px]">
                            {article.eventDetails.venue.split(',')[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Link */}
                <CardFooter className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[150px]">
                    {article.author.split('&')[0]}
                  </span>
                  <Link
                    href={`/${locale}/news/${article.slug}/`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-royal-600 hover:text-royal-700 group/link"
                  >
                    <span>{t.readDispatch}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
