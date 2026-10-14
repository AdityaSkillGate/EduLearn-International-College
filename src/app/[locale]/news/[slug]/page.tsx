import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { getPublishedArticles, getArticleBySlug, getRelatedArticles } from '@/data/news';
import { Container, Badge, Breadcrumbs, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@/components/ui';
import { SocialShare } from '@/components/news/SocialShare';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Building2,
  ShieldCheck,
  Tag,
} from 'lucide-react';

import { JsonLd } from '@/components/seo';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  getOgLocale,
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
} from '@/lib/seo';

export async function generateStaticParams() {
  const publishedArticles = getPublishedArticles();
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of LOCALES) {
    for (const article of publishedArticles) {
      params.push({
        locale,
        slug: article.slug,
      });
    }
  }

  return params;
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const article = getArticleBySlug(resolved.slug);

  if (!article || article.status !== 'published') {
    return {
      title: 'Article Not Found | Edulearn Singapore',
      description: 'The requested college notice or article could not be found.',
    };
  }

  const content = article.content[locale] || article.content.en;
  const title = `${content.title} | Edulearn International College Singapore`;
  const description = content.summary;
  const fullImageUrl = article.image.startsWith('http')
    ? article.image
    : `${SITE_URL}${article.image}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/news/${article.slug}/`,
      languages: {
        en: `/en/news/${article.slug}/`,
        'zh-sg': `/zh-sg/news/${article.slug}/`,
        'ta-sg': `/ta-sg/news/${article.slug}/`,
        'x-default': `/en/news/${article.slug}/`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.summary,
      url: `/${locale}/news/${article.slug}/`,
      siteName: SITE_NAME,
      locale: getOgLocale(locale),
      type: 'article',
      publishedTime: article.publishDate,
      authors: [article.author],
      images: [
        {
          url: fullImageUrl,
          alt: content.altText,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.summary,
      images: [fullImageUrl],
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const article = getArticleBySlug(resolved.slug);

  if (!article || article.status !== 'published') {
    notFound();
  }

  const content = article.content[locale] || article.content.en;
  const relatedArticles = getRelatedArticles(article.slug, article.category, 3);

  const articleSchema = generateArticleSchema(article, locale);
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: dict.nav.newsEvents, path: `/${locale}/news/` },
      { name: content.title },
    ],
    locale
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* Breadcrumbs Navigation */}
      <div className="bg-white border-b border-slate-200">
        <Container size="default" className="py-3">
          <Breadcrumbs
            homeHref={`/${locale}/`}
            items={[
              { label: dict.nav.home, href: `/${locale}/` },
              { label: dict.nav.newsEvents, href: `/${locale}/news/` },
              { label: content.title, href: `/${locale}/news/${article.slug}/` },
            ]}
          />
        </Container>
      </div>

      <Container size="default" className="py-10 space-y-12">
        {/* Article Container (Centered Editorial Layout) */}
        <article className="max-w-4xl mx-auto space-y-8">
          {/* Back link */}
          <div>
            <Link
              href={`/${locale}/news/`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-950 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Dispatches</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="navy" className="text-xs uppercase font-bold tracking-wider">
                {article.category}
              </Badge>
              {article.featured && (
                <Badge variant="gold" className="text-xs font-bold">
                  Featured Announcement
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-navy-950 leading-tight">
              {content.title}
            </h1>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-mono border-y border-slate-200 py-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold-600" aria-hidden="true" />
                <span>{article.displayDate[locale]}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <span>{article.readingTime}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <span>{article.author}</span>
              </span>
            </div>
          </header>

          {/* Verified Event Details Card (Task 4) */}
          {article.eventDetails && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-navy-950 to-navy-900 text-white border border-navy-800 shadow-md space-y-4">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="gold" className="text-[11px]">
                  Verified Campus Event
                </Badge>
                {article.eventDetails.registrationRequired && (
                  <span className="text-xs font-medium text-emerald-400">
                    Registration Required
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Date & Time
                  </span>
                  <p className="font-semibold text-white text-sm">
                    {article.eventDetails.displayDate[locale]}
                  </p>
                  <p className="text-slate-300 font-mono">
                    {article.eventDetails.time}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Campus Venue
                  </span>
                  <p className="font-semibold text-white text-sm flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>{article.eventDetails.venue}</span>
                  </p>
                </div>
              </div>

              {article.eventDetails.registrationNotice && (
                <div className="p-3 bg-navy-800/80 rounded-xl text-xs text-slate-200 border border-navy-700 leading-relaxed">
                  {article.eventDetails.registrationNotice[locale] || article.eventDetails.registrationNotice.en}
                </div>
              )}
            </div>
          )}

          {/* Featured Hero Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
            <Image
              src={article.image}
              alt={content.altText}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          <figcaption className="text-center text-xs text-slate-500 font-sans italic -mt-5">
            {content.altText}
          </figcaption>

          {/* Summary Lead Paragraph */}
          <div className="p-4 sm:p-5 rounded-xl bg-gold-50/70 border-l-4 border-l-gold-500 text-sm sm:text-base text-navy-950 font-serif leading-relaxed italic">
            {content.summary}
          </div>

          {/* Editorial Article Body */}
          <div className="space-y-5 text-sm sm:text-base text-slate-800 leading-relaxed font-sans pt-2">
            {content.body.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Institutional Statutory Trust Callout */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-2 font-bold text-navy-950">
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>Official Institutional Notice</span>
            </div>
            <p>
              Published by Edulearn International College Pte. Ltd. (PEI Registration No: <strong>201708935D</strong>). For questions regarding this dispatch, contact <a href="mailto:admin@edulearn.edu.sg" className="underline text-navy-900 font-semibold">admin@edulearn.edu.sg</a> or call <a href="tel:+6590049657" className="underline text-navy-900 font-semibold">+65 9004 9657</a>.
            </p>
          </div>

          {/* Tags & Social Sharing (Task 7) */}
          <div className="border-t border-slate-200 pt-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Tag className="w-3 h-3 text-slate-400" />
                <span>Tags:</span>
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white border border-slate-200 text-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <SocialShare title={content.title} />
          </div>
        </article>

        {/* Related Articles Section (Task 7) */}
        {relatedArticles.length > 0 && (
          <section className="pt-8 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-navy-950">
                  Related Dispatches & Announcements
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Explore complementary academic updates and institutional developments.
                </p>
              </div>
              <Link
                href={`/${locale}/news/`}
                className="text-xs font-semibold text-royal-600 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => {
                const relContent = rel.content[locale] || rel.content.en;
                return (
                  <Card key={rel.id} variant="interactive" className="flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-sm">
                    <div className="relative aspect-[16/10] w-full bg-slate-100">
                      <Image
                        src={rel.image}
                        alt={relContent.altText}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="navy" className="text-[10px] uppercase">
                          {rel.category}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="p-4 space-y-1.5">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {rel.displayDate[locale]}
                      </span>
                      <CardTitle className="text-sm font-serif font-bold text-navy-950 line-clamp-2">
                        <Link href={`/${locale}/news/${rel.slug}/`}>
                          {relContent.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-600 line-clamp-2">
                        {relContent.summary}
                      </CardDescription>
                    </CardHeader>

                    <CardFooter className="p-4 pt-0 border-t border-slate-100">
                      <Link
                        href={`/${locale}/news/${rel.slug}/`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-royal-600 hover:underline"
                      >
                        <span>Read Notice</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom Consultation Banner */}
        <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <Badge variant="gold" className="text-[11px]">
              2026 Admissions Open
            </Badge>
            <h3 className="font-serif font-bold text-2xl text-white">
              Interested in Applying for an Upcoming Cohort?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Connect with our admissions desk to review course schedules, module credits, and installment payment structures for our 21 accredited programs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Button
              href={`/${locale}/apply/`}
              variant="royal"
              iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
            >
              Enquire About Intake
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
