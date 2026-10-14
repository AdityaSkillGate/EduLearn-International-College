import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { ALL_COURSES, getCourseBySlug, getRelatedCourses } from '@/data/courses';
import { CourseDetailContent } from '@/components/courses/CourseDetailContent';

import { JsonLd } from '@/components/seo';
import {
  generateCourseSchema,
  generateBreadcrumbSchema,
  getOgLocale,
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
} from '@/lib/seo';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of LOCALES) {
    for (const course of ALL_COURSES) {
      params.push({
        locale,
        slug: course.slug,
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
  const course = getCourseBySlug(resolved.slug);

  if (!course) {
    return {
      title: 'Course Not Found | Edulearn International College Singapore',
      description: 'The requested academic course could not be located in our official catalog.',
    };
  }

  const title = course.title[locale] || course.title.en;
  const overview = course.overview[locale] || course.overview.en;
  const pageTitle = `${title} | Edulearn International College Singapore`;
  const pageDescription = `${overview} CPE Reg: 201708935D. Duration: ${course.durationMonths} Months. Contact Hours: ${course.contactHours} Hours.`;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/courses/${course.slug}/`,
      languages: {
        en: `/en/courses/${course.slug}/`,
        'zh-sg': `/zh-sg/courses/${course.slug}/`,
        'ta-sg': `/ta-sg/courses/${course.slug}/`,
        'x-default': `/en/courses/${course.slug}/`,
      },
    },
    openGraph: {
      title: pageTitle,
      description: overview,
      url: `/${locale}/courses/${course.slug}/`,
      siteName: SITE_NAME,
      locale: getOgLocale(locale),
      type: 'article',
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
      title: pageTitle,
      description: overview,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const course = getCourseBySlug(resolved.slug);

  if (!course) {
    notFound();
  }

  const relatedCourses = getRelatedCourses(course.id, 2);

  const courseSchema = generateCourseSchema(course, locale);
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: dict.nav.courses, path: `/${locale}/courses/` },
      { name: course.title[locale] || course.title.en },
    ],
    locale
  );

  return (
    <>
      <JsonLd data={courseSchema} />
      <JsonLd data={breadcrumbSchema} />
      <CourseDetailContent
        course={course}
        relatedCourses={relatedCourses}
        locale={locale}
        dict={dict}
      />
    </>
  );
}
