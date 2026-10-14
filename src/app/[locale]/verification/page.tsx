import React from 'react';
import { Metadata } from 'next';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { Container, Badge, Breadcrumbs, Card, CardContent, Button, HeroBackgroundImage } from '@/components/ui';
import { Building2, Mail, Phone, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
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
    en: 'Academic Registry & Student Enquiries | Edulearn Singapore',
    'zh-sg': '教务注册办公室与学生事务咨询 | 新加坡爱尔莱国际学院',
    'ta-sg': 'கல்விப் பதிவாளர் அலுவலகம் & மாணவர் வினவல்கள் | எடுலேர்ன் சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Official Registry and Student Services for Edulearn International College. Contact admissions and student records at New World Centre campus.',
    'zh-sg': '新加坡爱尔莱国际学院教务处与学籍事务中心，位于新世界中心校区，受理学生事务咨询与官方学籍记录支持。',
    'ta-sg': 'எடுலேர்ன் சர்வதேசக் கல்லூரியின் கல்விப் பதிவாளர் அலுவலகம் மற்றும் மாணவர் சேவைகள் மையம்.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/verification/`,
      languages: {
        en: '/en/verification/',
        'zh-sg': '/zh-sg/verification/',
        'ta-sg': '/ta-sg/verification/',
        'x-default': '/en/verification/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/verification/`,
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
  };
}

export default async function VerificationPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: dict.nav.studentCorner, path: `/${locale}/student-corner/` },
      { name: 'Academic Registry Services' },
    ],
    locale
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <JsonLd data={breadcrumbSchema} />
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <Container size="default" className="py-3">
          <Breadcrumbs
            homeHref={`/${locale}/`}
            items={[
              { label: dict.nav.studentCorner, href: `/${locale}/student-corner/` },
              { label: 'Academic Registry', href: `/${locale}/verification/` },
            ]}
          />
        </Container>
      </div>

      {/* Hero Section */}
      <div className="bg-navy-950 text-white py-12 sm:py-16 border-b border-navy-800 relative overflow-hidden">
        <HeroBackgroundImage
          src="/images/business-classroom.jpg"
          alt="EduLearn Academic Registry and Student Services"
          opacity="opacity-30"
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <Container size="default" className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold">Office of the Registrar</Badge>
            <Badge variant="neutral" className="text-slate-300 bg-navy-900 border-slate-700">
              CPE Reg No: 201708935D
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Academic Registry &amp; Student Services
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
            Official educational records, transcript requests, and student administrative enquiries at Edulearn International College.
          </p>
        </Container>
      </div>

      {/* Content */}
      <Container size="default" className="py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card variant="elevated" className="p-8 sm:p-10 border border-slate-200 bg-white rounded-2xl shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                  Official Registry Desk
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  1 Jalan Berseh, #02-28 New World Centre, Singapore 209037
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                In compliance with the Singapore Personal Data Protection Act (PDPA) and CPE governance standards, academic records and formal letters of verification are issued directly through our verified institutional registry channel.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold-600 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Registrar Email</div>
                    <a href="mailto:admissions@edulearn.edu.sg" className="font-semibold text-navy-950 hover:text-gold-600 transition-colors">
                      admissions@edulearn.edu.sg
                    </a>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Campus Hotline</div>
                    <a href="tel:+6562587189" className="font-semibold text-navy-950 hover:text-emerald-700 transition-colors">
                      +65 6258 7189 / 9004 9657
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                href={`/${locale}/contact/`}
                variant="royal"
                iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                Contact Admissions &amp; Campus
              </Button>
              <Button
                href={`/${locale}/forms/`}
                variant="outline"
                iconRight={<FileText className="w-4 h-4 ml-1" />}
              >
                Download Student Forms
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
