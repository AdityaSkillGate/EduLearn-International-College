import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { STUDENT_WELFARE_POLICIES } from '@/data/studentResources';
import { OFFICIAL_DOCUMENTS } from '@/data/documents';
import { Container, SectionHeading, Badge, Breadcrumbs, Card, CardHeader, CardTitle, CardDescription, CardContent, Button, HeroBackgroundImage } from '@/components/ui';
import { GraduationCap, ShieldCheck, HeartPulse, Clock, FileText, ArrowRight, CheckCircle2, Download, ExternalLink, Award, BookOpen, AlertCircle, HelpCircle } from 'lucide-react';

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
    en: 'Student Corner & Pastoral Welfare Support | Edulearn Singapore',
    'zh-sg': '学生支持中心与全人关怀体系 | 新加坡爱尔莱国际学院',
    'ta-sg': 'மாணவர் ஆதரவு & நலன்புரி சேவைகள் | எடுலேர்ன் சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Comprehensive student services at EIC Singapore: 80% attendance mandate, Liberty Insurance medical protection, pastoral care, and official downloadable student forms.',
    'zh-sg': '新加坡爱尔莱国际学院学生服务体系：80%出勤率法定考核标准、利宝医疗保险保障、全方位学业辅导及官方学生文件下载。',
    'ta-sg': 'எடுலேர்ன் சர்வதேசக் கல்லூரியின் மாணவர் சேவைகள்: 80% வருகை விதிமுறை, லிபர்ட்டி மருத்துவக் காப்பீடு, மாணவர் வழிகாட்டல் மற்றும் படிவங்கள்.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/student-corner/`,
      languages: {
        en: '/en/student-corner/',
        'zh-sg': '/zh-sg/student-corner/',
        'ta-sg': '/ta-sg/student-corner/',
        'x-default': '/en/student-corner/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/student-corner/`,
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

export default async function StudentCornerPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  // Key student documents available for instant download
  const studentDocs = OFFICIAL_DOCUMENTS.filter(
    (d) => d.id === 'doc-form-12' || d.id === 'doc-student-contract' || d.id === 'doc-sample-cert'
  );

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: dict.nav.studentCorner, path: `/${locale}/student-corner/` }],
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
              { label: dict.nav.home, href: `/${locale}/` },
              { label: dict.nav.studentCorner, href: `/${locale}/student-corner/` },
            ]}
          />
        </Container>
      </div>

      {/* Hero Section */}
      <div className="bg-navy-950 text-white py-12 sm:py-16 border-b border-navy-800 relative overflow-hidden">
        <HeroBackgroundImage
          src="/images/hero-campus.jpg"
          alt="EduLearn Student Services and Campus Community"
          opacity="opacity-30"
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <Container size="default" className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold">Student Welfare & Services</Badge>
            <Badge variant="neutral" className="text-slate-300 bg-navy-900 border-slate-700">
              CPE Reg No: 201708935D
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            {dict.nav.studentCorner}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-3xl">
            We provide dedicated pastoral care, transparent administrative frameworks, and statutory student protections to ensure every learner thrives academically and personally throughout their educational journey at New World Centre campus.
          </p>
        </Container>
      </div>

      {/* Main Content */}
      <Container size="default" className="py-12 space-y-16">
        {/* 1. Official Student Document Cards */}
        <section id="documents" className="space-y-6">
          <SectionHeading
            eyebrow="Compliance & Downloads"
            title="Essential Student Documentation & Contracts"
            subtitle="Authoritative statutory forms, student advisory notes, and standard contracts available for direct download."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentDocs.map((doc) => (
              <Card
                key={doc.id}
                variant="elevated"
                className="border border-slate-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-sm transition-all"
              >
                <div>
                  <div className="p-5 bg-slate-50 border-b border-slate-100">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge variant="gold" className="text-[10px] font-mono">
                        {doc.code}
                      </Badge>
                      <span className="text-[11px] font-semibold text-slate-500 font-sans">
                        {doc.fileSize}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-navy-950 leading-snug">
                      {doc.title[locale]}
                    </h3>
                  </div>

                  <CardContent className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {doc.description[locale]}
                    </p>

                    <ul className="space-y-1 text-xs text-slate-700 pt-1" role="list">
                      {doc.keyProvisions[locale].slice(0, 2).map((prov, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                          <span className="leading-snug">{prov}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-sans">
                    {doc.authority.split('/')[0]}
                  </span>

                  {doc.downloadUrl ? (
                    <a
                      href={doc.downloadUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 text-white hover:bg-gold-500 hover:text-navy-950 text-xs font-semibold transition-colors shadow-xs"
                      aria-label={`Download ${doc.title[locale]}`}
                    >
                      <Download className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Download PDF</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">Available at Campus</span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 2. Student Welfare & Academic Policies Grid */}
        <section id="policies" className="space-y-6">
          <SectionHeading
            eyebrow="Academic Standards & Protection"
            title="Institutional Student Welfare Framework"
            subtitle="Statutory attendance guidelines, medical protection, and pastoral care frameworks governing student life."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STUDENT_WELFARE_POLICIES.map((policy) => {
              const isAttendance = policy.category === 'attendance';
              const isInsurance = policy.category === 'insurance';
              const isGuidance = policy.category === 'guidance';
              const Icon = isAttendance ? Clock : isInsurance ? HeartPulse : isGuidance ? GraduationCap : ShieldCheck;

              return (
                <Card
                  key={policy.id}
                  variant="default"
                  className="border border-slate-200 p-6 sm:p-7 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Badge variant="navy" className="text-[10px] mb-2">
                          {policy.badge}
                        </Badge>
                        <h3 className="font-serif font-bold text-xl text-navy-950">
                          {policy.title[locale]}
                        </h3>
                        <p className="text-xs font-semibold text-gold-700 mt-0.5">
                          {policy.subtitle[locale]}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-navy-900 shrink-0">
                        <Icon className="w-5 h-5 text-gold-600" aria-hidden="true" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                      {policy.description[locale]}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Key Policy Directives:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600" role="list">
                        {policy.keyDetails[locale].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 3. Fast-Access Links to Complementary Portals */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif font-bold text-xl text-navy-950">
                Explore Essential Portals & External Resources
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Quick links to student documents, government agencies, and downloadable contracts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            <Link
              href={`/${locale}/forms/`}
              className="p-5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="gold" className="text-[10px]">
                    Document Hub
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-navy-900 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="font-bold text-navy-950 text-sm group-hover:text-gold-700 transition-colors">
                  {dict.nav.sub.formsDownloads}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Searchable library with CPE Form 12, Student Contract 4.1, and Schedule D refund matrices.
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/contact/`}
              className="p-5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="emerald" className="text-[10px]">
                    Student Advisory
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-navy-900 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="font-bold text-navy-950 text-sm group-hover:text-gold-700 transition-colors">
                  Advisory & Course Consultation
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Direct academic guidance, attendance consultations, and student counseling at New World Centre.
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/useful-links/`}
              className="p-5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="royal" className="text-[10px]">
                    Singapore Government
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-navy-900 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="font-bold text-navy-950 text-sm group-hover:text-gold-700 transition-colors">
                  {dict.nav.sub.usefulLinks}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Direct access to TPGateway Singapore, SSG, ICA, MOE, and WSH Council portals.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Bottom Consultation Banner */}
        <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <Badge variant="gold" className="text-[11px]">
              Student Support Services
            </Badge>
            <h3 className="font-serif font-bold text-2xl text-white">
              Have Questions Regarding Medical Insurance or Attendance?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Our student affairs officers at 1 Jalan Berseh, #02-28 New World Centre are available Monday to Friday to assist with student welfare, medical claims, and academic progression.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Button
              href={`/${locale}/contact/`}
              variant="royal"
              iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
            >
              Speak with Student Services
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
