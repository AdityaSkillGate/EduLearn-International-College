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
    en: 'Advanced Diploma Programs (5 Courses) | Edulearn International College Singapore',
    'zh-sg': '高级大专文凭课程（共5门） | 新加坡爱学习国际学院',
    'ta-sg': 'மேம்பட்ட டிப்ளமோ படிப்புகள் (5 படிப்புகள்) | எடுலெர்ன் கல்லூரி சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Advance your career with 5 accredited Advanced Diplomas in Civil, Electrical & Electronics, Mechanical, M&E, and Construction Management.',
    'zh-sg': '5门正规高级大专课程，面向土木、电气电子、机械、机电一体化及建筑施工管理从业者，助力晋升工程主管与技术领导层。',
    'ta-sg': 'சிவில், எலக்ட்ரிக்கல், மெக்கானிக்கல் மற்றும் கட்டுமான மேலாண்மையில் 5 உயர்நிலை டிப்ளமோ படிப்புகள்.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/courses/advanced-diploma/`,
      languages: {
        en: '/en/courses/advanced-diploma/',
        'zh-sg': '/zh-sg/courses/advanced-diploma/',
        'ta-sg': '/ta-sg/courses/advanced-diploma/',
        'x-default': '/en/courses/advanced-diploma/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/courses/advanced-diploma/`,
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

export default async function AdvancedDiplomaCoursesPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const advCourses = COURSES.filter((c) => c.level === 'advanced-diploma');

  const titles: Record<Locale, { title: string; subtitle: string; desc: string }> = {
    en: {
      title: 'Advanced Diploma Programs',
      subtitle: '5 Higher Technical Engineering Specializations',
      desc: 'Accelerate your engineering leadership with 5 Advanced Diplomas in Civil Engineering, Electrical & Electronics, Mechanical Engineering, M&E, and Construction Management. Designed for technical practitioners seeking supervisor, coordinator, or junior engineering positions in Singapore.',
    },
    'zh-sg': {
      title: '高级大专文凭课程',
      subtitle: '5门高阶工程与建造专修大专',
      desc: '专为具备工程大专文凭或资深技术经验的专业人士打造，涵盖高级土木工程、高级电气电子、高级机械工程、高级机电及高级建筑施工管理。深入掌握高阶结构力学、输配电网络及新加坡建设局法定现场管理。',
    },
    'ta-sg': {
      title: 'மேம்பட்ட டிப்ளமோ படிப்புகள்',
      subtitle: '5 உயர்நிலை பொறியியல் சிறப்பு படிப்புகள்',
      desc: 'சிவில், மெக்கானிக்கல், எலக்ட்ரிக்கல் மற்றும் கட்டுமான மேலாண்மையில் மேற்பார்வையாளர்களுக்கான 5 உயர்நிலை டிப்ளமோ படிப்புகள். 6 மாத கால அளவு, 96 நேரடி மணிநேரம்.',
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
        level="advanced-diploma"
        courses={advCourses}
        locale={locale}
        dict={dict}
        categoryTitle={copy.title}
        categorySubtitle={copy.subtitle}
        categoryDescription={copy.desc}
      />
    </>
  );
}
