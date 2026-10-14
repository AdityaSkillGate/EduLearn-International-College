import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { getPublishedArticles, getFeaturedArticle, getVerifiedEvents } from '@/data/news';
import { Container, SectionHeading, Badge, Breadcrumbs, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, HeroBackgroundImage } from '@/components/ui';
import { NewsTicker } from '@/components/news/NewsTicker';
import { NewsIndexClient } from '@/components/news/NewsIndexClient';
import { Newspaper, Calendar, MapPin, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

import { JsonLd } from '@/components/seo';
import {
  generateBreadcrumbSchema,
  getOgLocale,
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
} from '@/lib/seo';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const titles: Record<Locale, string> = {
    en: 'College News, Events & Official Dispatches | Edulearn Singapore',
    'zh-sg': '学院新闻、学术活动与官方公告 | 新加坡爱尔莱国际学院',
    'ta-sg': 'கல்லூரி செய்திகள் & அதிகாரப்பூர்வ அறிவிப்புகள் | எடுலேர்ன் சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Official institutional announcements, upcoming diploma course intakes, convocation recaps, and campus updates from Edulearn International College Singapore.',
    'zh-sg': '新加坡爱尔莱国际学院官方公报：2026年度文凭课程招生简章、bizSAFE Level 3安全认证续展、毕业典礼回顾及学术大纲升级。',
    'ta-sg': 'எடுலேர்ன் சர்வதேசக் கல்லூரியின் அதிகாரப்பூர்வ அறிவிப்புகள்: புதிய சேர்க்கைகள், bizSAFE பாதுகாப்பு சான்றிதழ் மற்றும் பட்டமளிப்பு விழா.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/news/`,
      languages: {
        en: '/en/news/',
        'zh-sg': '/zh-sg/news/',
        'ta-sg': '/ta-sg/news/',
        'x-default': '/en/news/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/news/`,
      siteName: SITE_NAME,
      locale: getOgLocale(locale),
      type: 'website',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function NewsPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const publishedArticles = getPublishedArticles();
  const featuredArticle = getFeaturedArticle();
  const verifiedEvents = getVerifiedEvents();

  const featuredContent = featuredArticle
    ? featuredArticle.content[locale] || featuredArticle.content.en
    : null;

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: dict.nav.newsEvents, path: `/${locale}/news/` }],
    locale
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <JsonLd data={breadcrumbSchema} />
      {/* Restrained News Ticker (Task 8) */}
      <NewsTicker articles={publishedArticles} locale={locale} />

      {/* Breadcrumbs Navigation */}
      <div className="bg-white border-b border-slate-200">
        <Container size="default" className="py-3">
          <Breadcrumbs
            homeHref={`/${locale}/`}
            items={[
              { label: dict.nav.home, href: `/${locale}/` },
              { label: dict.nav.newsEvents, href: `/${locale}/news/` },
            ]}
          />
        </Container>
      </div>

      <Container size="default" className="py-10 space-y-12">
        {/* Hero Section */}
        <div className="bg-navy-950 text-white rounded-2xl p-8 sm:p-12 border border-navy-800 shadow-prestige-lg relative overflow-hidden">
          <HeroBackgroundImage
            src="/images/hero-campus.jpg"
            alt="EduLearn News and Announcements"
            opacity="opacity-30"
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="gold">Official College Dispatches</Badge>
              <Badge variant="neutral" className="text-slate-300 bg-navy-900 border-slate-700">
                PEI Reg No: 201708935D
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              {dict.nav.newsEvents}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Timely, authoritative notices regarding upcoming diploma intakes, statutory accreditation renewals, academic board developments, and verified campus ceremonies.
            </p>
          </div>
        </div>

        {/* Featured Article Card (Task 2) */}
        {featuredArticle && featuredContent && (
          <section aria-labelledby="featured-article-heading">
            <Card variant="elevated" className="overflow-hidden border border-slate-200 bg-white shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[340px] bg-slate-100">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredContent.altText}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="gold" className="text-xs font-bold shadow-xs">
                      Featured Bulletin
                    </Badge>
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                      <Badge variant="navy" className="text-[10px] uppercase font-bold">
                        {featuredArticle.category}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gold-600" />
                        <span>{featuredArticle.displayDate[locale]}</span>
                      </span>
                      <span>•</span>
                      <span>{featuredArticle.readingTime}</span>
                    </div>

                    <h2 id="featured-article-heading" className="text-xl sm:text-2xl font-serif font-bold text-navy-950 leading-snug">
                      <Link href={`/${locale}/news/${featuredArticle.slug}/`} className="hover:text-gold-700 transition-colors">
                        {featuredContent.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans line-clamp-3">
                      {featuredContent.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      {featuredArticle.author.split('&')[0]}
                    </span>
                    <Button
                      href={`/${locale}/news/${featuredArticle.slug}/`}
                      variant="primary"
                      size="sm"
                      iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
                    >
                      Read Full Announcement
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Verified Upcoming Events Section (Task 4) */}
        {verifiedEvents.length > 0 && (
          <section aria-labelledby="verified-events-heading" className="space-y-6">
            <SectionHeading
              eyebrow="Campus Calendar"
              title="Verified Academic & Community Events"
              subtitle="Authenticated campus orientation schedules, convocation briefings, and administrative workshops."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verifiedEvents.map((evt) => {
                const evtContent = evt.content[locale] || evt.content.en;
                if (!evt.eventDetails) return null;

                return (
                  <Card
                    key={evt.id}
                    variant="elevated"
                    className="p-6 border-l-4 border-l-gold-500 flex flex-col justify-between space-y-4 shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="navy" className="text-[10px] uppercase">
                          {evt.category}
                        </Badge>
                        <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {evt.eventDetails.displayDate[locale]}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-base sm:text-lg text-navy-950 leading-snug">
                        <Link href={`/${locale}/news/${evt.slug}/`} className="hover:text-gold-700 transition-colors">
                          {evtContent.title}
                        </Link>
                      </h3>

                      <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                        <div className="flex items-start gap-2">
                          <Clock className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                          <span>{evt.eventDetails.time}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                          <span>{evt.eventDetails.venue}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        {evt.eventDetails.registrationRequired ? 'RSVP Required' : 'Open to matriculated cohort'}
                      </span>
                      <Link
                        href={`/${locale}/news/${evt.slug}/`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-royal-600 hover:text-royal-700"
                      >
                        <span>Event Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Filterable Articles Grid & Archive (Task 2 & 5) */}
        <section aria-labelledby="articles-archive-heading" className="space-y-6">
          <SectionHeading
            eyebrow="Chronological Archive"
            title="All Institutional Dispatches & Regulatory Filings"
            subtitle="Browse announcements by category or filter by admissions, institutional safety, and academic curriculum."
          />

          <NewsIndexClient articles={publishedArticles} locale={locale} />
        </section>
      </Container>
    </div>
  );
}
