import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { Container, SectionHeading, Badge, Breadcrumbs, Button, HeroBackgroundImage } from '@/components/ui';
import { COURSES, ALL_COURSES } from '@/data/courses';
import { CourseCard } from '@/components/courses/CourseCard';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Building,
  Layers,
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

  const title = `${dict.nav.courses} (All 26 Programs) | Edulearn International College Singapore`;
  const description =
    'Explore all 26 CPE-registered diploma, advanced diploma, modular and postgraduate programs in Engineering, IT, Facilities Management, Caregiving, and Business.';

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/courses/`,
      languages: {
        en: '/en/courses/',
        'zh-sg': '/zh-sg/courses/',
        'ta-sg': '/ta-sg/courses/',
        'x-default': '/en/courses/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/courses/`,
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

export default async function CoursesPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const diplomas = COURSES.filter((c) => c.level === 'diploma');
  const advDiplomas = COURSES.filter((c) => c.level === 'advanced-diploma');
  const shortTerm = ALL_COURSES.filter((c) => c.level === 'short-term');
  const postgrad = COURSES.filter((c) => c.level === 'postgraduate');

  const categoryCards = [
    {
      title: locale === 'zh-sg' ? '专业大专文凭' : locale === 'ta-sg' ? 'டிப்ளமோ படிப்புகள்' : 'Diploma Programs',
      count: '13 Programs',
      countZh: '13门课程',
      countTa: '13 படிப்புகள்',
      duration: '6 Months',
      desc:
        locale === 'zh-sg'
          ? '涵盖机电、IT、物业设施管理、化工工艺、专业护理及线上商业管理。'
          : locale === 'ta-sg'
          ? 'பொறியியல், ஐடி, கட்டட பராமரிப்பு மற்றும் வணிக மேலாண்மை.'
          : 'Core foundational disciplines across Engineering, IT, Facilities, Caregiving, and E-Learning Business.',
      href: `/${locale}/courses/diploma`,
      icon: BookOpen,
      accent: 'border-navy-900',
    },
    {
      title: locale === 'zh-sg' ? '高级大专文凭' : locale === 'ta-sg' ? 'உயர் டிப்ளமோ' : 'Advanced Diplomas',
      count: '5 Programs',
      countZh: '5门课程',
      countTa: '5 படிப்புகள்',
      duration: '6 Months',
      desc:
        locale === 'zh-sg'
          ? '高阶结构力学、输配电工程、机械动力与总包现场施工管理。'
          : locale === 'ta-sg'
          ? 'சிவில், எலக்ட்ரிக்கல், மெக்கானிக்கல் மற்றும் கட்டுமான மேலாண்மை.'
          : 'Higher-level engineering and site supervision credentials for practicing technicians.',
      href: `/${locale}/courses/advanced-diploma`,
      icon: GraduationCap,
      accent: 'border-gold-500',
    },
    {
      title: locale === 'zh-sg' ? '短期技能认证' : locale === 'ta-sg' ? 'குறுகிய காலம்' : 'Short-Term Modular',
      count: '5 Certificates',
      countZh: '5门认证',
      countTa: '5 சான்றிதழ்கள்',
      duration: '1 Month',
      desc:
        locale === 'zh-sg'
          ? '微软办公软件、职场英语口语、AutoCAD工程制图及硬件网络实操。'
          : locale === 'ta-sg'
          ? 'எம்எஸ் ஆபிஸ், ஆங்கில பேச்சு, ஆட்டோகேட் மற்றும் கணினி நெட்வொர்க்கிங்.'
          : 'Hands-on practical micro-credentials in MS Office, Spoken English, CAD, and Computer Hardware.',
      href: `/${locale}/courses/short-term`,
      icon: Sparkles,
      accent: 'border-amber-500',
    },
    {
      title: locale === 'zh-sg' ? '研究生文凭' : locale === 'ta-sg' ? 'முதுகலை டிப்ளமோ' : 'Postgraduate Diplomas',
      count: '2 Programs',
      countZh: '2门课程',
      countTa: '2 படிப்புகள்',
      duration: '12 Months',
      desc:
        locale === 'zh-sg'
          ? '机电仪器自控工程与企业战略工商管理，192总课时高阶深造。'
          : locale === 'ta-sg'
          ? 'இயந்திர-மின் ஆட்டோமேஷன் மற்றும் மூலோபாய வணிக நிர்வாகம்.'
          : 'Executive qualifications in Instrumentation Control Engineering and Strategic Business Management.',
      href: `/${locale}/courses/postgraduate-diploma`,
      icon: Layers,
      accent: 'border-navy-800',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: dict.nav.courses, path: `/${locale}/courses/` }],
    locale
  );

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <JsonLd data={breadcrumbSchema} />
      <Container size="default" className="space-y-12">
        <Breadcrumbs
          homeHref={`/${locale}`}
          items={[
            { label: dict.nav.home, href: `/${locale}` },
            { label: dict.nav.courses },
          ]}
        />

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-2xl p-8 sm:p-12 border border-navy-800 shadow-xl relative overflow-hidden">
          <HeroBackgroundImage
            src="/images/engineering-lab.jpg"
            alt="EduLearn Technical and Engineering Course Catalogue"
            opacity="opacity-30"
          />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Academic Prospectus</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
              {dict.nav.courses}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              All 21 academic qualifications are registered under the Singapore Committee for Private Education
              (CPE / SSG, Reg No: <strong className="text-gold-400 font-semibold">201708935D</strong>). Blending
              practical laboratory competencies with rigorous classroom supervision at our Little India campus.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300 border-t border-white/10 mt-6">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>80% Attendance Mandate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>1:14 Teacher Ratio</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>bizSAFE Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>CPE Standard Contract v4.1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Discovery Grid */}
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">
                {locale === 'zh-sg' ? '学术梯队' : locale === 'ta-sg' ? 'கல்வி நிலைகள்' : 'Academic Levels'}
              </span>
              <h2 className="text-2xl font-heading font-bold text-navy-950">
                {locale === 'zh-sg' ? '选择专业方向' : locale === 'ta-sg' ? 'படிப்புகளை தேர்வு செய்க' : 'Choose Your Pathway'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categoryCards.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={`group relative p-6 bg-white rounded-xl border border-slate-200/90 hover:border-navy-900 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center group-hover:bg-navy-900 group-hover:text-gold-300 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="navy">
                        {locale === 'zh-sg' ? cat.countZh : locale === 'ta-sg' ? cat.countTa : cat.count}
                      </Badge>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-navy-900 group-hover:text-navy-700 transition-colors">
                      {cat.title}
                    </h3>
                    <div className="text-xs font-medium text-gold-700 mb-2">
                      {cat.duration}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-navy-900 group-hover:text-gold-700">
                    <span>{locale === 'zh-sg' ? '查看全部课程' : locale === 'ta-sg' ? 'அனைத்தும் பார்க்க' : 'Browse Category'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 1. Diploma Programs Section Preview */}
        <section id="diplomas" className="scroll-mt-28 space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">Undergraduate Level</span>
              <h2 className="text-2xl font-heading font-bold text-navy-950">
                {dict.nav.sub.diplomaCourses} (13)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                6-Month foundational diplomas in Engineering, IT, Facilities Management, Caregiving, and E-Learning Business.
              </p>
            </div>
            <Link
              href={`/${locale}/courses/diploma`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-gold-700 hover:underline shrink-0"
            >
              <span>{locale === 'zh-sg' ? '进入大专目录与筛选' : locale === 'ta-sg' ? 'அனைத்து டிப்ளமோ' : 'View All 13 Diplomas with Search & Filter'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diplomas.slice(0, 6).map((course, idx) => (
              <CourseCard key={course.id} course={course} locale={locale} priority={idx < 3} />
            ))}
          </div>

          {diplomas.length > 6 && (
            <div className="text-center pt-4">
              <Button
                href={`/${locale}/courses/diploma`}
                variant="royal"
                size="md"
                className="inline-flex items-center gap-2"
              >
                <span>{locale === 'zh-sg' ? `查看全部 13 门大专课程` : locale === 'ta-sg' ? `அனைத்து 13 டிப்ளமோ படிப்புகளையும் காண்க` : `View All 13 Diploma Programs`}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </section>

        {/* 2. Advanced Diploma Programs Section Preview */}
        <section id="advanced-diplomas" className="scroll-mt-28 space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">Specialist Level</span>
              <h2 className="text-2xl font-heading font-bold text-navy-950">
                {dict.nav.sub.advDiplomaCourses} (5)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Higher-level technical specializations for experienced practitioners advancing to engineering leadership.
              </p>
            </div>
            <Link
              href={`/${locale}/courses/advanced-diploma`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-gold-700 hover:underline shrink-0"
            >
              <span>{locale === 'zh-sg' ? '进入高级大专专区' : locale === 'ta-sg' ? 'அனைத்து உயர் டிப்ளமோ' : 'View All 5 Advanced Diplomas'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advDiplomas.map((course) => (
              <CourseCard key={course.id} course={course} locale={locale} />
            ))}
          </div>
        </section>

        {/* 3. Short Term Modular Certificates Preview */}
        <section id="short-term" className="scroll-mt-28 space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">Workplace Upskilling</span>
              <h2 className="text-2xl font-heading font-bold text-navy-950">
                {dict.nav.sub.shortTermCourses} (5)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Practical 1-month modular certifications in MS Office, Spoken English, AutoCAD, and Hardware.
              </p>
            </div>
            <Link
              href={`/${locale}/courses/short-term`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-gold-700 hover:underline shrink-0"
            >
              <span>{locale === 'zh-sg' ? '进入短期课程专区' : locale === 'ta-sg' ? 'அனைத்து குறுகிய காலம்' : 'View All Short-Term Courses'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shortTerm.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} locale={locale} />
            ))}
          </div>
        </section>

        {/* 4. Postgraduate Diplomas Preview */}
        <section id="postgraduate" className="scroll-mt-28 space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">Executive Level</span>
              <h2 className="text-2xl font-heading font-bold text-navy-950">
                {dict.nav.sub.pgDiplomaCourses} (2)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                12-Month executive and technical leadership programs for degree holders and managers (192 contact hours).
              </p>
            </div>
            <Link
              href={`/${locale}/courses/postgraduate-diploma`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-gold-700 hover:underline shrink-0"
            >
              <span>{locale === 'zh-sg' ? '进入研究生文凭专区' : locale === 'ta-sg' ? 'அனைத்து முதுகலை' : 'View All Postgraduate Diplomas'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {postgrad.map((course) => (
              <CourseCard key={course.id} course={course} locale={locale} />
            ))}
          </div>
        </section>

        {/* Admissions Consultation Banner */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-950 rounded-2xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">
                Admissions Consultation
              </span>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mt-1">
                Not Sure Which Program Suits Your Career Path?
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-2xl">
                Our educational counseling team at New World Centre assists with entry evaluations, mature applicant clauses,
                course fee schedules, and installment breakdowns.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300">
                <a href="tel:+6590049657" className="inline-flex items-center gap-1.5 hover:text-white">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>+65 9004 9657 / +65 9641 0630</span>
                </a>
                <a href="https://wa.me/6590049657" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Admissions: +65 9004 9657</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href={`/${locale}/apply`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold rounded-xl text-sm transition-all shadow-md text-center"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-sm transition-colors text-center border border-white/20"
              >
                Book Campus Consultation
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
