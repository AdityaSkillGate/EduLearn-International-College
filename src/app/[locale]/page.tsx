import React from 'react';
import { Metadata } from 'next';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import {
  HeroSection,
  TrustMarquee,
  CourseDiscovery,
  AboutSection,
  WhyChooseUs,
  FacilitiesPreview,
  CampusGallery,
  NewsPreview,
  HomeFAQ,
  AdmissionsCTA,
} from '@/components/home';

import { JsonLd } from '@/components/seo';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
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
  const resolvedParams = await params;
  const rawLocale = resolvedParams.locale;
  const locale = isValidLocale(rawLocale) ? (rawLocale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const title = `${dict.meta.siteTitle} | CPE Registered PEI No: 201708935D`;
  const description = dict.meta.siteDescription;

  return {
    title,
    description,
    keywords: dict.meta.keywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        en: '/en/',
        'zh-sg': '/zh-sg/',
        'ta-sg': '/ta-sg/',
        'x-default': '/en/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/`,
      siteName: SITE_NAME,
      locale: getOgLocale(locale),
      type: 'website',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'Edulearn International College Singapore',
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

export default async function LocalizedHomePage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawLocale = resolvedParams.locale;
  const locale = isValidLocale(rawLocale) ? (rawLocale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const organizationSchema = generateOrganizationSchema(locale);
  const webSiteSchema = generateWebSiteSchema(locale);

  return (
    <div className="flex flex-col w-full">
      <JsonLd data={organizationSchema} />
      <JsonLd data={webSiteSchema} />

      {/* Homepage Hero */}
      <HeroSection locale={locale} dict={dict} />

      {/* 1. Institutional Trust & Registration Strip */}
      <TrustMarquee locale={locale} dict={dict} />

      {/* 2. Course-Category Discovery Grid */}
      <CourseDiscovery locale={locale} dict={dict} />

      {/* 3. About Edulearn Section (Vision, Mission & Introduction) */}
      <AboutSection locale={locale} dict={dict} />

      {/* 4. Why Study at Edulearn (Verified Strengths) */}
      <WhyChooseUs locale={locale} dict={dict} />

      {/* 5. Campus Facilities Preview (Classrooms 1 & 2 at New World Centre) */}
      <FacilitiesPreview locale={locale} dict={dict} />

      {/* 6. Learning & Campus Image Gallery */}
      <CampusGallery locale={locale} dict={dict} />

      {/* 7. News & Events Preview */}
      <NewsPreview locale={locale} dict={dict} />

      {/* 8. Frequently Asked Questions */}
      <HomeFAQ locale={locale} dict={dict} />

      {/* 9. Final Admissions Enquiry CTA */}
      <AdmissionsCTA locale={locale} dict={dict} />
    </div>
  );
}
