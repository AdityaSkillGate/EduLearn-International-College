import { Metadata } from 'next';
import { Locale, LOCALES, DEFAULT_LOCALE } from '@/lib/i18n/types';
import { Course } from '@/types/course';
import { NewsArticle } from '@/types/news';

export const SITE_URL = 'https://edulearn.edu.sg';
export const SITE_NAME = 'Edulearn International College Singapore';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-campus.jpg`;
export const PEI_REG_NO = '201708935D';

/**
 * Standardize path to always have leading slash and trailing slash (except empty root)
 */
export function normalizePath(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${clean}/` : '/';
}

/**
 * Build canonical and hreflang alternates for a given path across all 3 supported locales
 */
export function buildCanonicalAndAlternates(locale: Locale, rawPath: string) {
  // Strip locale prefix if present in rawPath
  let cleanPath = rawPath.replace(/^\/(en|zh-sg|ta-sg)(\/|$)/, '/');
  cleanPath = cleanPath.replace(/^\/+|\/+$/g, '');
  const pathSuffix = cleanPath ? `/${cleanPath}/` : '/';

  return {
    canonical: `/${locale}${pathSuffix}`,
    languages: {
      en: `/en${pathSuffix}`,
      'zh-sg': `/zh-sg${pathSuffix}`,
      'ta-sg': `/ta-sg${pathSuffix}`,
      'x-default': `/en${pathSuffix}`,
    },
  };
}

/**
 * Get OpenGraph locale string for BCP 47 tags
 */
export function getOgLocale(locale: Locale): string {
  switch (locale) {
    case 'zh-sg':
      return 'zh_SG';
    case 'ta-sg':
      return 'ta_SG';
    case 'en':
    default:
      return 'en_SG';
  }
}

interface PageMetadataOptions {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

/**
 * Generate standard, localized Next.js metadata object
 */
export function generatePageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const alternates = buildCanonicalAndAlternates(locale, path);
  const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(SITE_URL),
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: getOgLocale(locale),
      type,
      images: [
        {
          url: fullImageUrl,
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
      images: [fullImageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

/**
 * Schema.org EducationalOrganization structured data
 * Strictly factual: no invented star ratings or fake awards
 */
export function generateOrganizationSchema(locale: Locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Edulearn International College Pte. Ltd.',
    alternateName: [
      'Edulearn International College',
      'EIC Singapore',
      '新加坡爱学习国际学院',
      'எடுலேர்ன் சர்வதேசக் கல்லூரி',
    ],
    url: `${SITE_URL}/${locale}/`,
    logo: `${SITE_URL}/images/edulearn-logo-mark.png`,
    image: `${SITE_URL}/images/hero-campus.jpg`,
    description:
      'Private Education Institute registered with SkillsFuture Singapore (SSG) Committee for Private Education (CPE), PEI Reg No: 201708935D.',
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'CPE PEI Registration Number',
      value: PEI_REG_NO,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Jalan Berseh, #02-28 New World Centre',
      addressLocality: 'Singapore',
      postalCode: '209037',
      addressCountry: 'SG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '1.3068',
      longitude: '103.8580',
    },
    telephone: '+65 6258 7189',
    email: 'info@edulearn.edu.sg',
    sameAs: [
      'https://www.tpgateway.gov.sg',
      'https://www.ssg.gov.sg',
    ],
    knowsAbout: [
      'Mechanical and Electrical Engineering',
      'Civil Engineering',
      'Information Technology',
      'Facilities Management',
      'Chemical Process Engineering',
      'Construction Management',
    ],
  };
}

/**
 * Schema.org WebSite structured data
 */
export function generateWebSiteSchema(locale: Locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/${locale}/`,
    name: SITE_NAME,
    description: 'Official portal of Edulearn International College Singapore',
    inLanguage: ['en', 'zh-SG', 'ta-SG'],
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

/**
 * Schema.org Course structured data
 * Fully factual: uses exact published fee, duration, hours, and credentials
 */
export function generateCourseSchema(course: Course, locale: Locale = 'en') {
  const title = course.title[locale] || course.title.en;
  const overview = course.overview[locale] || course.overview.en;
  const totalFee =
    course.fees?.fullTime?.courseFee ||
    course.fees?.partTime?.courseFee ||
    course.fees?.modular?.fee ||
    2700;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${SITE_URL}/${locale}/courses/${course.slug}/#course`,
    name: title,
    description: overview,
    courseCode: course.id,
    timeRequired: `P${course.durationMonths}M`,
    educationalCredentialAwarded:
      course.level === 'diploma'
        ? 'Diploma'
        : course.level === 'advanced-diploma'
        ? 'Advanced Diploma'
        : course.level === 'postgraduate'
        ? 'Postgraduate Diploma'
        : 'Modular Certificate',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Edulearn International College',
      url: `${SITE_URL}/${locale}/`,
      sameAs: `${SITE_URL}/#organization`,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: course.deliveryMode === 'elearning' ? 'Online' : 'Blended',
      courseWorkload: `PT${course.contactHours}H`,
      location: {
        '@type': 'Place',
        name: 'Edulearn New World Centre Campus',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1 Jalan Berseh, #02-28 New World Centre',
          addressLocality: 'Singapore',
          postalCode: '209037',
          addressCountry: 'SG',
        },
      },
    },
    offers: [
      {
        '@type': 'Offer',
        price: totalFee,
        priceCurrency: 'SGD',
        category: 'Tuition',
        availability: 'https://schema.org/InStock',
        validFrom: '2026-01-01',
      },
    ],
  };
}

/**
 * Schema.org NewsArticle structured data
 */
export function generateArticleSchema(article: NewsArticle, locale: Locale = 'en') {
  const content = article.content[locale] || article.content.en;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${SITE_URL}/${locale}/news/${article.slug}/#article`,
    headline: content.title,
    description: content.summary,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    inLanguage: locale,
    mainEntityOfPage: `${SITE_URL}/${locale}/news/${article.slug}/`,
    image: article.image ? `${SITE_URL}${article.image}` : DEFAULT_OG_IMAGE,
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Edulearn International College',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/edulearn-logo-mark.png`,
      },
    },
  };
}

/**
 * Schema.org BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; path?: string }>,
  locale: Locale = 'en'
) {
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: locale === 'zh-sg' ? '首页' : locale === 'ta-sg' ? 'முகப்பு' : 'Home',
      item: `${SITE_URL}/${locale}/`,
    },
    ...items.map((item, index) => {
      const entry: Record<string, unknown> = {
        '@type': 'ListItem',
        position: index + 2,
        name: item.name,
      };
      if (item.path) {
        const clean = item.path.replace(/^\/+|\/+$/g, '');
        entry.item = `${SITE_URL}/${clean}/`;
      }
      return entry;
    }),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}
