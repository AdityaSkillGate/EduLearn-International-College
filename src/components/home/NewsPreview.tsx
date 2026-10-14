'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Newspaper, Sparkles } from 'lucide-react';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { Container, SectionHeading, Badge, Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui';
import { getPublishedArticles } from '@/data/news';
import { ScrollReveal } from '@/lib/motion';

export interface NewsPreviewProps {
  locale: Locale;
  dict: Dictionary;
}

const UI_STRINGS = {
  en: {
    eyebrow: 'College Notices',
    title: 'Latest News & Academic Announcements',
    description: 'Official updates regarding upcoming cohort intakes, campus safety renewals, and student milestones.',
    btnViewAll: 'View All Announcements',
    readFull: 'Read Full Notice',
  },
  'zh-sg': {
    eyebrow: '学院公告与校闻',
    title: '最新学院新闻与开学通告',
    description: '关于新班次开学、校园安全认证复审及学生学术进展的官方公告。',
    btnViewAll: '查看全部通知公告',
    readFull: '阅读通知全文',
  },
  'ta-sg': {
    eyebrow: 'கல்லூரி அறிவிப்புகள்',
    title: 'சமீபத்திய செய்திகள் & கல்வி அறிவிப்புகள்',
    description: 'வரவிருக்கும் சேர்க்கை, வளாக பாதுகாப்பு மற்றும் மாணவர் சாதனைகள் குறித்த அறிவிப்புகள்.',
    btnViewAll: 'அனைத்து அறிவிப்புகளையும் காண்க',
    readFull: 'முழு அறிவிப்பையும் படியுங்கள்',
  },
};

export const NewsPreview: React.FC<NewsPreviewProps> = ({ locale, dict }) => {
  const publishedArticles = getPublishedArticles().slice(0, 3);
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  return (
    <section aria-labelledby="news-preview-heading" className="py-16 sm:py-20 bg-white">
      <Container size="default" className="space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeading
            id="news-preview-heading"
            eyebrow={ui.eyebrow}
            title={ui.title}
            description={ui.description}
          />
          <Button
            href={`/${locale}/news/`}
            variant="outline"
            iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
            className="shrink-0 self-start sm:self-auto"
          >
            {ui.btnViewAll}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedArticles.map((item, index) => {
            const content = item.content[locale] || item.content.en;
            return (
              <ScrollReveal
                key={item.id}
                delay={index * 0.06}
              >
                <Card variant="interactive" className="h-full flex flex-col justify-between">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <Badge variant="navy" className="text-[10px] uppercase">{item.category}</Badge>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-gold-600" aria-hidden="true" />
                        <span>{item.displayDate[locale]}</span>
                      </div>
                    </div>
                    <CardTitle className="text-base leading-snug">
                      <Link href={`/${locale}/news/${item.slug}/`} className="hover:text-gold-700 transition-colors">
                        {content.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-xs mt-2 leading-relaxed line-clamp-3">
                      {content.summary}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="pt-2 border-t border-slate-100">
                    <Link
                      href={`/${locale}/news/${item.slug}/`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-royal-600 hover:text-royal-700 group"
                    >
                      <span>{ui.readFull}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0 transition-transform" />
                    </Link>
                  </CardFooter>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
