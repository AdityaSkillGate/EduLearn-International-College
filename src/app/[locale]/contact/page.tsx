import React from 'react';
import { Metadata } from 'next';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { Container, SectionHeading, Badge, Breadcrumbs, Card, CardHeader, CardTitle, CardDescription, CardContent, HeroBackgroundImage } from '@/components/ui';
import { AdmissionsEnquiryForm } from '@/components/forms/AdmissionsEnquiryForm';
import { MapPin, Phone, Mail, Clock, MessageSquare, Navigation, ShieldCheck, Bus, Train, ExternalLink } from 'lucide-react';

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
    en: 'Contact & Admissions Enquiries | Edulearn Singapore',
    'zh-sg': '联系我们与课程咨询 | 新加坡爱尔莱国际学院',
    'ta-sg': 'தொடர்பு & சேர்க்கை விசாரணைகள் | எடுலேர்ன் சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Contact Edulearn International College. Campus at New World Centre, Little India Singapore. Admissions Hotline: +65 9004 9657 / +65 6258 7189. Verified WhatsApp and email dispatch.',
    'zh-sg': '联系新加坡爱尔莱国际学院：位于新世界中心（小印度校区）。招生专线：+65 9004 9657 / +65 6258 7189。支持WhatsApp直连与官方电邮咨询。',
    'ta-sg': 'எடுலேர்ன் சர்வதேசக் கல்லூரியைத் தொடர்பு கொள்ளுங்கள். வளாகம்: நியூ வேர்ல்ட் சென்டர், லிட்டில் இந்தியா. சேர்க்கை எண்: +65 9004 9657 / +65 6258 7189.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/contact/`,
      languages: {
        en: '/en/contact/',
        'zh-sg': '/zh-sg/contact/',
        'ta-sg': '/ta-sg/contact/',
        'x-default': '/en/contact/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/contact/`,
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

export default async function ContactPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: dict.nav.contact, path: `/${locale}/contact/` }],
    locale
  );

  return (
    <div className="py-10 bg-slate-50 min-h-screen pb-20">
      <JsonLd data={breadcrumbSchema} />
      <Container size="default" className="space-y-10">
        <Breadcrumbs
          homeHref={`/${locale}/`}
          items={[
            { label: dict.nav.home, href: `/${locale}/` },
            { label: dict.nav.contact, href: `/${locale}/contact/` },
          ]}
        />

        {/* Hero Section */}
        <div className="bg-navy-950 text-white rounded-2xl p-8 sm:p-12 border border-navy-800 shadow-prestige-lg relative overflow-hidden">
          <HeroBackgroundImage
            src="/images/hero-campus.jpg"
            alt="EduLearn Admissions and Contact Services"
            opacity="opacity-30"
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="gold">Admissions & Student Services</Badge>
              <Badge variant="neutral" className="text-slate-300 bg-navy-900 border-slate-700">
                PEI Reg No: 201708935D
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              {dict.nav.contact}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Our Admissions & Academic Services desk is based at New World Centre in central Singapore. Speak with an educational consultant, schedule a campus visit, or submit your course enquiry using our transparent direct dispatch channel.
            </p>
          </div>
        </div>

        {/* Contact Information & Enquiries Grid */}
        <h2 className="sr-only">Campus Location, Admissions Enquiry, and Directions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Verified Campus Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Campus Address Card */}
            <Card variant="elevated" className="border border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-base text-navy-950">Campus Location</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Little India Head Office & Registered Classrooms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs sm:text-sm text-slate-700 pt-0">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                  <p className="font-semibold text-navy-950 leading-relaxed font-serif text-sm">
                    Edulearn International College Pte. Ltd.
                  </p>
                  <p className="text-xs text-slate-600 mt-1 font-sans">
                    1 Jalan Berseh, #02-28 New World Centre<br />
                    Singapore 209037
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-600">
                    <Train className="w-4 h-4 text-navy-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">MRT Stations:</strong><br />
                      Jalan Besar (DT22, Downtown Line) — 3 mins walk<br />
                      Farrer Park (NE8, North East Line) — 7 mins walk
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-slate-600 pt-1">
                    <Bus className="w-4 h-4 text-navy-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">Bus Services:</strong><br />
                      23, 64, 65, 66, 67, 130, 139, 147, 857 (Jalan Besar / Kitchener Rd)
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=1+Jalan+Berseh,+%2302-28+New+World+Centre,+Singapore+209037"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-royal-600 hover:text-royal-700 hover:underline py-1"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions via Google Maps</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Admissions Hotlines & Emails Card */}
            <Card variant="default" className="border border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-navy-100 text-navy-900 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-navy-800" />
                  </div>
                  <CardTitle className="text-base text-navy-950">Official Hotlines & Registry</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Direct voice and electronic admissions correspondence
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs sm:text-sm text-slate-700 pt-0">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                    Admissions Telephones
                  </span>
                  <div className="space-y-1">
                    <a
                      href="tel:+6590049657"
                      className="font-bold text-navy-950 hover:text-royal-600 block text-sm flex items-center justify-between group"
                    >
                      <span>+65 9004 9657</span>
                      <Badge variant="gold" className="text-[10px]">Admissions & WhatsApp</Badge>
                    </a>
                    <a
                      href="tel:+6562587189"
                      className="text-slate-600 hover:text-royal-600 block text-xs"
                    >
                      +65 6258 7189 / +65 9641 0630 (Office Administration)
                    </a>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                    Institutional Emails
                  </span>
                  <div className="space-y-2">
                    <a
                      href="mailto:admin@edulearn.edu.sg"
                      className="font-semibold text-navy-950 hover:text-royal-600 block text-xs py-1 min-h-[28px] flex items-center"
                    >
                      admin@edulearn.edu.sg
                    </a>
                    <a
                      href="mailto:edulearninternationalcollege@gmail.com"
                      className="text-slate-500 hover:text-royal-600 block text-[11px] py-1 min-h-[28px] flex items-center truncate"
                    >
                      edulearninternationalcollege@gmail.com
                    </a>
                  </div>
                </div>

                <div className="space-y-1 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-semibold text-navy-950">
                    <Clock className="w-3.5 h-3.5 text-gold-600" />
                    <span>Campus Operating Hours</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Monday – Saturday: 10:00 AM – 7:00 PM (Singapore Time)<br />
                    Closed on Sundays and Singapore Gazetted Public Holidays.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Direct WhatsApp Callout */}
            <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Instant Admissions WhatsApp</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed font-sans">
                Prefer an immediate response? Connect directly with our on-duty Admissions Officer for course intake dates, fee structures, or eligibility criteria.
              </p>
              <a
                href="https://wa.me/6590049657?text=Hello%20Edulearn%20Admissions%2C%20I%20would%20like%20to%20enquire%20about%20course%20enrollment."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp (+65 9004 9657)</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            {/* Institutional Compliance Notice */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-navy-950">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                <span>Committee for Private Education Registration</span>
              </div>
              <p>
                Edulearn International College Pte. Ltd. is registered with the Committee for Private Education (CPE), part of SkillsFuture Singapore. PEI Reg No: <strong>201708935D</strong>.
              </p>
            </div>
          </div>

          {/* Column 2: Interactive Admissions Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <AdmissionsEnquiryForm locale={locale} variant="contact" />

            {/* Campus Directions & Map Card */}
            <div id="map" className="scroll-mt-28 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-navy-950 text-white flex items-center justify-between">
                <div>
                  <div className="font-bold text-[10px] uppercase tracking-wider text-gold-400">Campus Coordinates</div>
                  <div className="text-sm font-semibold">1 Jalan Berseh, #02-28 New World Centre, Singapore 209037</div>
                </div>
                <Badge variant="gold">Little India / Jalan Besar</Badge>
              </div>

              <div className="p-6 bg-slate-50 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-gold-500/20 text-gold-700 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-navy-950 text-base">
                    Visit Our Campus Classrooms & Administration
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Centrally situated within New World Centre, opposite Jalan Besar Plaza. Only 3 minutes on foot from Jalan Besar MRT Station (DT22).
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=1+Jalan+Berseh,+%2302-28+New+World+Centre,+Singapore+209037"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-gold-400" />
                  <span>Open Interactive Google Maps Navigation</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
