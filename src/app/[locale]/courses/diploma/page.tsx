import React from 'react';
import { Metadata } from 'next';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { COURSES } from '@/data/courses';
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
    en: 'Diploma Programs (13 Courses) | Edulearn International College Singapore',
    'zh-sg': '专业大专文凭课程（共13门） | 新加坡爱学习国际学院',
    'ta-sg': 'டிப்ளமோ படிப்புகள் (13 படிப்புகள்) | எடுலெர்ன் கல்லூரி சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Explore all 13 CPE-registered 6-month Diploma programs in Mechanical & Electrical Engineering, IT, Facilities Management, Caregiving, and E-Learning Business.',
    'zh-sg': '深入探索新加坡私立教育理事会（CPE）注册的13门正规大专课程，涵盖机电、IT、物业设施管理、专业护理与线上管理，学制6个月。',
    'ta-sg': 'பொறியியல், ஐடி, கட்டட பராமரிப்பு மற்றும் வணிக மேலாண்மைக்கான 13 டிப்ளமோ படிப்புகள்.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/courses/diploma/`,
      languages: {
        en: '/en/courses/diploma/',
        'zh-sg': '/zh-sg/courses/diploma/',
        'ta-sg': '/ta-sg/courses/diploma/',
        'x-default': '/en/courses/diploma/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/courses/diploma/`,
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

export default async function DiplomaCoursesPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const diplomaCourses = COURSES.filter((c) => c.level === 'diploma');

  const titles: Record<Locale, { title: string; subtitle: string; desc: string }> = {
    en: {
      title: 'Diploma Programs',
      subtitle: '13 CPE-Registered Career Qualifications',
      desc: 'Explore all 13 official Diploma programs in Mechanical & Electrical Engineering, Information Technology, Facilities Management, Chemical Process, Healthcare Caregiving, and E-Learning Business Management. Structured across 6 months with 96 contact hours and small-group mentoring.',
    },
    'zh-sg': {
      title: '专业大专文凭课程',
      subtitle: '13门CPE正规注册职业大专',
      desc: '探索涵盖机电工程、资讯科技、物业设施管理、化工工艺、专业护理及全线上商业管理的13门正规大专课程。学制6个月，96总课时，严格遵从新加坡私立教育理事会（CPE）办学标准。',
    },
    'ta-sg': {
      title: 'டிப்ளமோ படிப்புகள்',
      subtitle: '13 அங்கீகரிக்கப்பட்ட தொழில் படிப்புகள்',
      desc: 'மெக்கானிக்கல், எலக்ட்ரிக்கல், ஐடி, கட்டட பராமரிப்பு மற்றும் வணிக மேலாண்மைக்கான 13 டிப்ளமோ படிப்புகள். 6 மாத கால அளவு மற்றும் 96 மணிநேர நேரடி பயிற்சி.',
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
        level="diploma"
        courses={diplomaCourses}
        locale={locale}
        dict={dict}
        categoryTitle={copy.title}
        categorySubtitle={copy.subtitle}
        categoryDescription={copy.desc}
      />
    </>
  );
}
