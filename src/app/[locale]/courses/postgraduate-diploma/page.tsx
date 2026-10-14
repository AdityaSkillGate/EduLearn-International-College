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
    en: 'Postgraduate Diploma Programs (2 Courses) | Edulearn International College Singapore',
    'zh-sg': '研究生文凭课程（共2门） | 新加坡爱学习国际学院',
    'ta-sg': 'முதுகலை டிப்ளமோ படிப்புகள் (2 படிப்புகள்) | எடுலெர்ன் கல்லூரி சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Executive 12-month qualifications in M&E Instrumentation Control Engineering and Strategic Business Management. 192 contact hours.',
    'zh-sg': '面向技术主管与企业管理者的12个月正规研究生层次文凭课程，涵盖机电自控仪表工程与企业战略工商管理，192总课时。',
    'ta-sg': 'இயந்திர-மின் கருவி கட்டுப்பாடு மற்றும் வணிக நிர்வாகத்திற்கான 12 மாத கால முதுகலை படிப்புகள்.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/courses/postgraduate-diploma/`,
      languages: {
        en: '/en/courses/postgraduate-diploma/',
        'zh-sg': '/zh-sg/courses/postgraduate-diploma/',
        'ta-sg': '/ta-sg/courses/postgraduate-diploma/',
        'x-default': '/en/courses/postgraduate-diploma/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/courses/postgraduate-diploma/`,
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

export default async function PostgraduateDiplomaCoursesPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const postgradCourses = COURSES.filter((c) => c.level === 'postgraduate');

  const titles: Record<Locale, { title: string; subtitle: string; desc: string }> = {
    en: {
      title: 'Postgraduate Diploma Programs',
      subtitle: '12-Month Executive Engineering & Business Qualifications',
      desc: 'Advance to executive management or senior engineering leadership with 12-month Postgraduate Diplomas in M&E Instrumentation Control Engineering and Business Management. 192 rigorous contact hours taught by qualified veteran practitioners with S$400–S$450/month installment plans.',
    },
    'zh-sg': {
      title: '研究生文凭课程',
      subtitle: '12个月高阶工程自控与工商管理进修',
      desc: '针对有志晋升企业高管、化工厂总控工程师或项目总监的学士学位与资深人士设计，涵盖机电仪器与自控工程及工商管理两大方向。192课时系统强化，提升战略决策与工业智能化控制素养。',
    },
    'ta-sg': {
      title: 'முதுகலை டிப்ளமோ படிப்புகள்',
      subtitle: '12 மாத கால உயர்நிலை நிர்வாக மற்றும் பொறியியல் படிப்புகள்',
      desc: 'இயந்திர-மின் ஆட்டோமேஷன் மற்றும் மூலோபாய வணிக நிர்வாகத்திற்கான 12 மாத கால முதுகலை படிப்புகள். 192 மணிநேர பயிற்சி மற்றும் தவணை முறை கட்டணம்.',
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
        level="postgraduate"
        courses={postgradCourses}
        locale={locale}
        dict={dict}
        categoryTitle={copy.title}
        categorySubtitle={copy.subtitle}
        categoryDescription={copy.desc}
      />
    </>
  );
}
