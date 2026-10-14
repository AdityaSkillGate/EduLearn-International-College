import React from 'react';
import { Metadata } from 'next';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { ALL_COURSES } from '@/data/courses';
import { CourseCatalogView } from '@/components/courses/CourseCatalogView';

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

  const titles: Record<Locale, string> = {
    en: 'Short-Term Modular Industry Courses | Edulearn International College Singapore',
    'zh-sg': '短期实用技能模块认证系列课程 | 新加坡爱学习国际学院',
    'ta-sg': 'குறுகிய கால தொழில் சான்றிதழ் படிப்புகள் | எடுலெர்ன் கல்லூரி சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Intensive 1-month hands-on skill certifications in MS Office, Spoken English, AutoCAD 2D Drafting, and Computer Networking. Fees from S$250.',
    'zh-sg': '为期1个月的实用技能单科认证，涵盖微软办公软件、职场英语口语、AutoCAD工程制图与计算机硬件网络。学费自250新币起。',
    'ta-sg': 'எம்எஸ் ஆபிஸ், ஆங்கில பேச்சுத்திறன், ஆட்டோகேட் மற்றும் கணினி நெட்வொர்க்கிங் குறித்த 1 மாத கால சான்றிதழ் பயிற்சிகள்.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/courses/short-term/`,
      languages: {
        en: '/en/courses/short-term/',
        'zh-sg': '/zh-sg/courses/short-term/',
        'ta-sg': '/ta-sg/courses/short-term/',
        'x-default': '/en/courses/short-term/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/courses/short-term/`,
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

export default async function ShortTermCoursesPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  // Retrieve all short-term discoverable courses (consolidated + 5 modular certificates)
  const shortTermCourses = ALL_COURSES.filter((c) => c.level === 'short-term');

  const titles: Record<Locale, { title: string; subtitle: string; desc: string }> = {
    en: {
      title: 'Short-Term Modular Courses',
      subtitle: 'Hands-on 1-Month Workplace Skill Certifications',
      desc: 'Fast-track your workplace competencies in Microsoft Office (Basic & Advanced), Spoken English, AutoCAD 2D Drafting, and Computer Hardware & Networking. 1-month focused modules conducted in hands-on lab environments with fees starting from S$250.',
    },
    'zh-sg': {
      title: '短期实用技能模块认证',
      subtitle: '1个月高强度职场实操技能进修',
      desc: '快速掌握日常职场急需的硬核技能，涵盖微软办公软件初级与高级应用、职场英语口语、AutoCAD工程制图及计算机硬件网络组装。学制1个月，实操实验教学，学费自250新币起。',
    },
    'ta-sg': {
      title: 'குறுகிய கால தொழில் சான்றிதழ் படிப்புகள்',
      subtitle: '1 மாத கால நடைமுறை சிறப்பு சான்றிதழ்கள்',
      desc: 'எம்எஸ் ஆபிஸ், ஆங்கில பேச்சுத்திறன், ஆட்டோகேட் வரைபடம் மற்றும் கணினி வன்பொருள் குறித்த 1 மாத கால நடைமுறை சிறப்பு பயிற்சிகள். கட்டணம் S$250 முதல் தொடங்குகிறது.',
    },
  };

  const copy = titles[locale] || titles.en;

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: dict.nav.courses, path: `/${locale}/courses/` },
      { name: copy.title },
    ],
    locale
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CourseCatalogView
        level="short-term"
        courses={shortTermCourses}
        locale={locale}
        dict={dict}
        categoryTitle={copy.title}
        categorySubtitle={copy.subtitle}
        categoryDescription={copy.desc}
      />
    </>
  );
}
