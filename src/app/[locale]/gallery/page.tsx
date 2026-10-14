import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { Container, SectionHeading, Badge, Breadcrumbs, Card, CardHeader, CardTitle, CardDescription, CardContent, Button, HeroBackgroundImage } from '@/components/ui';
import { CampusGalleryExperience } from '@/components/gallery/CampusGalleryExperience';
import { Building2, MapPin, Compass, ShieldCheck, ArrowRight, Eye, Sparkles } from 'lucide-react';

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
    en: 'Campus Gallery & Facilities Media | Edulearn Singapore',
    'zh-sg': '校区环境与教学设施图集 | 新加坡爱尔莱国际学院',
    'ta-sg': 'வளாக புகைப்படங்கள் & வசதிகள் | எடுலேர்ன் சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Explore authentic campus photographs of Edulearn International College at New World Centre. Lecture Classrooms 1 & 2, Technical CAD drafting benches, and IT computing labs.',
    'zh-sg': '实景探索新加坡爱尔莱国际学院新世界中心校区：理论大课室1与2、工程CAD制图实训台、计算机与网络机房及商务研讨空间。',
    'ta-sg': 'எடுலேர்ன் சர்வதேசக் கல்லூரியின் வகுப்பறைகள், பொறியியல் வரைபட ஆய்வகங்கள் மற்றும் கணினி மையத்தின் உண்மைப் புகைப்படங்கள்.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/gallery/`,
      languages: {
        en: '/en/gallery/',
        'zh-sg': '/zh-sg/gallery/',
        'ta-sg': '/ta-sg/gallery/',
        'x-default': '/en/gallery/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/gallery/`,
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

export default async function GalleryPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: dict.nav.gallery, path: `/${locale}/gallery/` }],
    locale
  );

  return (
    <div className="py-10 bg-slate-50 min-h-screen pb-20">
      <JsonLd data={breadcrumbSchema} />
      <Container size="default" className="space-y-12">
        {/* Breadcrumbs Navigation */}
        <Breadcrumbs
          homeHref={`/${locale}/`}
          items={[
            { label: dict.nav.home, href: `/${locale}/` },
            { label: dict.nav.gallery, href: `/${locale}/gallery/` },
          ]}
        />

        {/* Hero Section */}
        <div className="bg-navy-950 text-white rounded-2xl p-8 sm:p-12 border border-navy-800 shadow-prestige-lg relative overflow-hidden">
          <HeroBackgroundImage
            src="/images/classroom-facilities.jpg"
            alt="EduLearn Authentic Campus Environment"
            opacity="opacity-30"
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="gold">Authentic Campus Environment</Badge>
              <Badge variant="neutral" className="text-slate-300 bg-navy-900 border-slate-700">
                1 Jalan Berseh, #02-28 New World Centre
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              {dict.nav.gallery}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Take a visual walkthrough of our verified learning spaces in central Singapore. Explore Classrooms 1 & 2, professional CAD drafting benches, computing terminals, and executive seminar suites.
            </p>
          </div>
        </div>

        {/* Institutional Campus Premises Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200/90 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-navy-900 text-gold-400 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-navy-950 text-xs">Registered PEI Campus</div>
              <div className="text-[11px] text-slate-500">New World Centre #02-28</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/90 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-navy-900 text-gold-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-navy-950 text-xs">Transit Accessibility</div>
              <div className="text-[11px] text-slate-500">Jalan Besar MRT (3 mins walk)</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/90 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-navy-900 text-gold-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-navy-950 text-xs">bizSAFE Level 3 Certified</div>
              <div className="text-[11px] text-slate-500">Audited Campus Safety Systems</div>
            </div>
          </div>
        </div>

        {/* Interactive Editorial Media Experience (Task 1-10) */}
        <section aria-labelledby="gallery-experience-heading" className="space-y-6">
          <SectionHeading
            id="gallery-experience-heading"
            eyebrow="Visual Portfolio"
            title="Classrooms, Technical Labs & Executive Suites"
            subtitle="Click any photograph to open the high-resolution lightbox with detailed specifications and keyboard controls."
          />

          <CampusGalleryExperience locale={locale} />
        </section>

        {/* Schedule a Visit Consultation Banner */}
        <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <Badge variant="gold" className="text-[11px]">
              Campus Consultation
            </Badge>
            <h3 className="font-serif font-bold text-2xl text-white">
              Experience Our Learning Environment in Person
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Schedule a personalized campus tour with an Admissions Advisor. Inspect our classrooms, review curriculum materials, and discuss course schedules.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Button
              href={`/${locale}/contact/`}
              variant="royal"
              iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
            >
              Book a Campus Visit
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
