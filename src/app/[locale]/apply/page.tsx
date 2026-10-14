import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { Container, SectionHeading, Badge, Breadcrumbs, Card, CardHeader, CardTitle, CardDescription, CardContent, HeroBackgroundImage } from '@/components/ui';
import { AdmissionsEnquiryForm } from '@/components/forms/AdmissionsEnquiryForm';
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
  BookOpen,
  Building2,
  Lock,
} from 'lucide-react';

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
    en: 'Course Enrolment & Admissions Enquiry | Edulearn Singapore',
    'zh-sg': '课程报名与入学咨询申请 | 新加坡爱尔莱国际学院',
    'ta-sg': 'பாட சேர்க்கை & விண்ணப்ப விசாரணை | எடுலேர்ன் சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Apply for admission to Edulearn International College Singapore. Transparent 4-step enrolment procedure, CPE Version 4.1 student contracts, monthly installment schedules, and direct admissions advisory.',
    'zh-sg': '申请入读新加坡爱尔莱国际学院：合规透明的4步录取流程、CPE 4.1版标准学生合同、灵活按月分期缴纳学费及专业招生顾问指引。',
    'ta-sg': 'எடுலேர்ன் சர்வதேசக் கல்லூரியில் சேர விண்ணப்பிக்கவும். வெளிப்படையான சேர்க்கை நடைமுறைகள், CPE ஒப்பந்தம் 4.1 மற்றும் நேரடி மாணவர் ஆலோசனை.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/apply/`,
      languages: {
        en: '/en/apply/',
        'zh-sg': '/zh-sg/apply/',
        'ta-sg': '/ta-sg/apply/',
        'x-default': '/en/apply/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/apply/`,
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

export default async function ApplyPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: dict.nav.applyNow, path: `/${locale}/apply/` }],
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
            { label: dict.nav.courses, href: `/${locale}/courses/` },
            { label: dict.nav.applyNow, href: `/${locale}/apply/` },
          ]}
        />

        {/* Hero Section */}
        <div className="bg-navy-950 text-white rounded-2xl p-8 sm:p-12 border border-navy-800 shadow-prestige-lg relative overflow-hidden">
          <HeroBackgroundImage
            src="/images/classroom-facilities.jpg"
            alt="EduLearn Admissions and Enrolment"
            opacity="opacity-30"
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="gold">Admissions & Enrolment</Badge>
              <Badge variant="neutral" className="text-slate-300 bg-navy-900 border-slate-700">
                CPE Enhanced Registration Framework (ERF)
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              {dict.nav.applyNow}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Take the next strategic step in your professional qualifications. Complete our initial admissions enquiry to receive program module breakdowns, upcoming intake schedules, and fee consultation from our Admissions Advisors.
            </p>
          </div>
        </div>

        {/* 4-Step Enrolment Protocol Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-full bg-navy-900 text-gold-400 font-bold flex items-center justify-center text-xs">
              1
            </div>
            <div className="font-bold text-navy-950 text-sm">Course Selection</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore 21 accredited Diplomas, Advanced Diplomas, or Short-Term modular certifications.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-full bg-navy-900 text-gold-400 font-bold flex items-center justify-center text-xs">
              2
            </div>
            <div className="font-bold text-navy-950 text-sm">Advisory & Intake Review</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit your enquiry below. An advisor confirms course entry requirements and available schedules.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-full bg-navy-900 text-gold-400 font-bold flex items-center justify-center text-xs">
              3
            </div>
            <div className="font-bold text-navy-950 text-sm">In-Person Document Verification</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Original academic certificates and ID credentials are authenticated at our Little India campus.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-full bg-navy-900 text-gold-400 font-bold flex items-center justify-center text-xs">
              4
            </div>
            <div className="font-bold text-navy-950 text-sm">Standard Student Contract</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Execute CPE Student Contract Version 4.1 with a mandatory 7-day cooling-off period.
            </p>
          </div>
        </div>

        {/* Main Application Area (2-column layout on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <AdmissionsEnquiryForm locale={locale} variant="apply" />
          </div>

          {/* Right Column: Statutory Protections & FAQ Sidecard (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Strict Privacy & Sensitive Data Statement (Task 8) */}
            <Card variant="elevated" className="border border-slate-200 bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-base text-navy-950">Identity & Privacy Assurance</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Zero sensitive document uploads policy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-700 pt-0">
                <p className="leading-relaxed">
                  In strict compliance with Singapore Personal Data Protection Act (PDPA) standards and CPE guidelines, <strong>we do not solicit or store national identity cards (NRIC/FIN), passport scans, or official academic transcripts through this website</strong>.
                </p>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-semibold text-navy-950 block">When are identity credentials verified?</span>
                  <p className="text-slate-600 leading-relaxed">
                    Formal identification is physically sighted and authenticated only by the Academic Board at our New World Centre campus when you sign the official PEI-Student Contract.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Statutory Fee Transparency Notice */}
            <Card variant="default" className="border border-slate-200 bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-base text-navy-950">Statutory Fee Transparency</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  CPE-approved fee structures and payment schedules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-700 pt-0">
                <ul className="space-y-2" role="list">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Application Fee:</strong> S$54.50 (inclusive of prevailing GST), payable upon official registration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Monthly Installments:</strong> Tuition fees are structured across monthly installments (typically S$400 – S$500/month for 6-month diplomas) with zero multi-year lock-in.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>7-Day Cooling-Off Window:</strong> Students enjoy statutory cooling-off rights under CPE Contract Version 4.1.</span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/${locale}/forms/`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-royal-600 hover:text-royal-700 hover:underline"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download Sample Student Contract 4.1</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Direct Admissions Hotline */}
            <div className="bg-navy-900 text-white rounded-2xl p-6 space-y-3 shadow-sm border border-navy-800">
              <span className="text-[11px] font-bold text-gold-400 uppercase tracking-wider block">
                Have Urgent Enrolment Questions?
              </span>
              <h4 className="font-serif font-bold text-lg text-white">
                Speak to an Admissions Officer Today
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Our educational consultants are on campus Monday to Saturday from 10:00 AM to 7:00 PM to answer module questions and review prerequisites.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="tel:+6590049657"
                  className="inline-flex items-center justify-center gap-2 py-2 px-4 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs rounded-lg transition-colors"
                >
                  <span>Call Hotline: +65 9004 9657</span>
                </a>
                <a
                  href="https://wa.me/6590049657?text=Hello%20Edulearn%2C%20I%20would%20like%20to%20enquire%20about%20course%20admissions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
