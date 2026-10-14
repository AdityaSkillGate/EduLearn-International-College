'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types/course';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { Container, Breadcrumbs, Badge, Button, HeroBackgroundImage } from '@/components/ui';
import { CourseCard } from './CourseCard';
import {
  Clock,
  BookOpen,
  Users,
  GraduationCap,
  ArrowRight,
  Monitor,
  Building2,
  DollarSign,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  ShieldCheck,
  ChevronDown,
  Calendar,
  AlertCircle,
  MapPin,
  ExternalLink,
  Award,
  Sparkles,
} from 'lucide-react';

interface CourseDetailContentProps {
  course: Course;
  relatedCourses: Course[];
  locale: Locale;
  dict: Dictionary;
}

export function CourseDetailContent({
  course,
  relatedCourses,
  locale,
  dict,
}: CourseDetailContentProps) {
  // Determine relevant campus/lab image
  let imageSrc = '/images/engineering-lab.jpg';
  let imageCaption = 'Practical technical instruction at EIC Little India Campus, Singapore.';
  if (course.category === 'it') {
    imageSrc = '/images/it-computer-lab.jpg';
    imageCaption = 'Dedicated computer laboratory with hands-on networking and software stations.';
  } else if (course.category === 'business') {
    imageSrc = '/images/business-classroom.jpg';
    imageCaption = 'Executive seminar lecture room for business management and case analysis.';
  } else if (course.category === 'facilities' || course.category === 'healthcare') {
    imageSrc = '/images/classroom-facilities.jpg';
    imageCaption = 'Modern air-conditioned learning facilities at New World Centre campus.';
  } else if (course.category === 'hospitality') {
    imageSrc = '/images/hero-campus.jpg';
    imageCaption = 'Hospitality service operations and guest relation training suites.';
  }

  const localizedTitle = course.title[locale] || course.title.en;
  const isNonEnglish = locale !== 'en';
  const localizedOverview = course.overview[locale] || course.overview.en;
  const localizedDescription = course.content.description[locale] || course.content.description.en;

  // Level badge and category slug
  let categorySlug = 'diploma';
  let levelLabel = 'Diploma Program';
  let levelVariant: 'navy' | 'gold' | 'neutral' = 'navy';

  if (course.level === 'advanced-diploma') {
    categorySlug = 'advanced-diploma';
    levelLabel = locale === 'zh-sg' ? '高级大专文凭' : locale === 'ta-sg' ? 'உயர் டிப்ளமோ' : 'Advanced Diploma';
    levelVariant = 'gold';
  } else if (course.level === 'short-term') {
    categorySlug = 'short-term';
    levelLabel = locale === 'zh-sg' ? '短期模块技能认证' : locale === 'ta-sg' ? 'குறுகிய கால சான்றிதழ்' : 'Modular Certificate';
    levelVariant = 'neutral';
  } else if (course.level === 'postgraduate') {
    categorySlug = 'postgraduate-diploma';
    levelLabel = locale === 'zh-sg' ? '研究生文凭课程' : locale === 'ta-sg' ? 'முதுகலை டிப்ளமோ' : 'Postgraduate Diploma';
    levelVariant = 'gold';
  } else {
    categorySlug = 'diploma';
    levelLabel = locale === 'zh-sg' ? '专业大专文凭' : locale === 'ta-sg' ? 'டிப்ளமோ' : 'Diploma Program';
    levelVariant = 'navy';
  }

  const isELearning = course.deliveryMode === 'elearning';

  const categoryName =
    categorySlug === 'diploma'
      ? dict.nav.sub.diplomaCourses
      : categorySlug === 'advanced-diploma'
      ? dict.nav.sub.advDiplomaCourses
      : categorySlug === 'short-term'
      ? dict.nav.sub.shortTermCourses
      : dict.nav.sub.pgDiplomaCourses;

  // Career outcomes
  const outcomes =
    course.content.careerOutcomes?.[locale] ||
    course.content.careerOutcomes?.en || [
      'Technical Specialist',
      'Operations Coordinator',
      'Site Supervisor',
    ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* 1. Hero Header Section */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white py-12 lg:py-16 relative overflow-hidden">
        <HeroBackgroundImage
          src={imageSrc}
          alt={localizedTitle}
          opacity="opacity-30"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <Container size="default" className="relative z-10">
          <Breadcrumbs
            homeHref={`/${locale}`}
            items={[
              { label: dict.nav.home, href: `/${locale}` },
              { label: dict.nav.courses, href: `/${locale}/courses` },
              { label: categoryName, href: `/${locale}/courses/${categorySlug}` },
              { label: localizedTitle },
            ]}
            className="mb-6 text-white/70"
          />

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={levelVariant} className="font-semibold tracking-wide">
                {levelLabel}
              </Badge>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
                  isELearning
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                    : 'bg-white/10 text-white border border-white/20'
                }`}
              >
                {isELearning ? <Monitor className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
                {isELearning
                  ? locale === 'zh-sg'
                    ? '100% 线上教学平台'
                    : locale === 'ta-sg'
                    ? 'மின்-கற்றல்'
                    : '100% E-Learning Mode'
                  : locale === 'zh-sg'
                  ? '校区实体面授'
                  : locale === 'ta-sg'
                  ? 'நேரடி வகுப்பு'
                  : 'Classroom Face-to-Face'}
              </span>
              <span className="text-xs font-mono bg-black/40 text-gold-300 px-2.5 py-1 rounded-full border border-gold-400/20">
                Course ID: {course.id}
              </span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              {localizedTitle}
            </h1>

            {isNonEnglish && (
              <p className="text-slate-400 text-sm sm:text-base italic font-sans">
                {course.title.en}
              </p>
            )}

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-light pt-2">
              {localizedOverview}
            </p>

            {/* Quick Metrics Strip */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    {locale === 'zh-sg' ? '学制时长' : locale === 'ta-sg' ? 'கால அளவு' : 'Duration'}
                  </div>
                  <div className="font-semibold text-white">
                    {course.durationMonths}{' '}
                    {course.durationMonths === 1
                      ? locale === 'zh-sg' ? '个月' : locale === 'ta-sg' ? 'மாதம்' : 'Month'
                      : locale === 'zh-sg' ? '个月' : locale === 'ta-sg' ? 'மாதங்கள்' : 'Months'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-gold-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    {locale === 'zh-sg' ? '授课学时' : locale === 'ta-sg' ? 'கற்றல் நேரம்' : 'Contact Hours'}
                  </div>
                  <div className="font-semibold text-white">
                    {course.contactHours} {locale === 'zh-sg' ? '课时' : locale === 'ta-sg' ? 'மணிநேரம்' : 'Hours'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-gold-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    {locale === 'zh-sg' ? '师生比例' : locale === 'ta-sg' ? 'விகிதம்' : 'Class Ratio'}
                  </div>
                  <div className="font-semibold text-white">{course.teacherStudentRatio}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    {locale === 'zh-sg' ? 'CPE 注册编号' : locale === 'ta-sg' ? 'CPE பதிவு எண்' : 'CPE Reg No'}
                  </div>
                  <div className="font-semibold text-white">201708935D</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main Layout (Main Content + Sticky Sidebar) */}
      <Container size="default" className="pt-10 lg:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Column */}
          <main className="lg:col-span-8 space-y-12">
            {/* Visual Classroom Feature */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-900">
                <Image
                  src={imageSrc}
                  alt={course.title.en}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>{imageCaption}</span>
                <span className="font-medium text-navy-900">New World Centre #02-28</span>
              </div>
            </div>

            {/* Section 1: Detailed Overview */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-gold-700 text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>{locale === 'zh-sg' ? '课程概览与教学目标' : locale === 'ta-sg' ? 'பாடத்திட்ட விளக்கம்' : 'Course Overview & Objectives'}</span>
              </div>
              <h2 className="font-heading font-bold text-2xl text-navy-950">
                {locale === 'zh-sg'
                  ? '课程综述与培养目标'
                  : locale === 'ta-sg'
                  ? 'பாடத்திட்ட விளக்கம் மற்றும் நோக்கம்'
                  : 'Academic Aim & Institutional Rationale'}
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>{localizedDescription}</p>
                <p>
                  {locale === 'zh-sg'
                    ? '本课程依据新加坡私立教育法案（Private Education Act）标准严格授课，兼顾扎实理论与工程、商业实操应用。全部考核与考试均受学术与考试委员会严格监管。'
                    : locale === 'ta-sg'
                    ? 'சிங்கப்பூர் தனியார் கல்விச் சட்ட தரநிலைகளின்படி கற்பிக்கப்படும் இந்த பாடத்திட்டம், கோட்பாட்டு மற்றும் நடைமுறை அறிவை ஒருங்கிணைக்கிறது. அனைத்து தேர்வுகளும் கல்வி மற்றும் தேர்வு வாரிய மேற்பார்வைக்கு உட்பட்டவை.'
                    : 'Delivered under the Singapore Private Education Act standards, this curriculum balances foundational theoretical comprehension with direct real-world engineering, commercial, and operational practices. All examinations and assignments undergo strict Academic and Examination Board oversight.'}
                </p>
              </div>
            </section>

            {/* Section 2: Key Academic Specifications */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-gold-700 text-xs font-semibold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>{locale === 'zh-sg' ? '官方核准参数' : locale === 'ta-sg' ? 'அங்கீகரிக்கப்பட்ட விவரங்கள்' : 'Official Course Facts'}</span>
              </div>
              <h2 className="font-heading font-bold text-2xl text-navy-950">
                {locale === 'zh-sg' ? '正规办学与学术参数' : locale === 'ta-sg' ? 'அங்கீகரிக்கப்பட்ட கல்வி விவரங்கள்' : 'Institutional Specifications'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-xs text-slate-600 font-medium">
                    {locale === 'zh-sg' ? '颁证机构' : locale === 'ta-sg' ? 'சான்றிதழ் வழங்கும் நிறுவனம்' : 'Awarding Institution'}
                  </div>
                  <div className="font-semibold text-navy-900">{course.awardingBody}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-xs text-slate-600 font-medium">
                    {locale === 'zh-sg' ? '监管框架' : locale === 'ta-sg' ? 'ஒழுங்குமுறை கட்டமைப்பு' : 'Regulatory Framework'}
                  </div>
                  <div className="font-semibold text-navy-900">
                    {locale === 'zh-sg' ? 'CPE 强化注册框架 (ERF)' : locale === 'ta-sg' ? 'CPE மேம்பட்ட பதிவு கட்டமைப்பு' : 'CPE Enhanced Registration Framework'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-xs text-slate-600 font-medium">
                    {locale === 'zh-sg' ? '最低出勤率要求' : locale === 'ta-sg' ? 'குறைந்தபட்ச வருகை தேவை' : 'Minimum Attendance Requirement'}
                  </div>
                  <div className="font-semibold text-navy-900">{course.attendanceRequirement}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-xs text-slate-600 font-medium">
                    {locale === 'zh-sg' ? '师生比例' : locale === 'ta-sg' ? 'ஆசிரியர் மாணவர் விகிதம்' : 'Teacher-to-Student Ratio'}
                  </div>
                  <div className="font-semibold text-navy-900">{course.teacherStudentRatio}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-xs text-slate-600 font-medium">
                    {locale === 'zh-sg' ? '总计授课学时' : locale === 'ta-sg' ? 'மொத்த கற்பித்தல் மணிநேரம்' : 'Total Contact Hours'}
                  </div>
                  <div className="font-semibold text-navy-900">
                    {course.contactHours} {locale === 'zh-sg' ? '授课学时' : locale === 'ta-sg' ? 'மணிநேரம்' : 'Contact Hours'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-xs text-slate-600 font-medium">
                    {locale === 'zh-sg' ? '课程学制' : locale === 'ta-sg' ? 'பாடநெறி காலம்' : 'Course Duration'}
                  </div>
                  <div className="font-semibold text-navy-900">
                    {course.durationMonths} {locale === 'zh-sg' ? '个月' : locale === 'ta-sg' ? 'மாதங்கள்' : 'Calendar Months'}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Curriculum & Modules (Accessible Accordions) */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-gold-700 text-xs font-semibold uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4" />
                    <span>{locale === 'zh-sg' ? '教学大纲与模块科目' : locale === 'ta-sg' ? 'பாடத்திட்டம்' : 'Curriculum Syllabus'}</span>
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-navy-950 mt-1">
                    {locale === 'zh-sg'
                      ? `核心教学模块 (${course.modules.length} 门)`
                      : locale === 'ta-sg'
                      ? `பாடத்திட்ட தொகுதிகள் (${course.modules.length})`
                      : `Modules & Syllabi (${course.modules.length} Units)`}
                  </h2>
                </div>
                <Badge variant="navy">
                  {course.contactHours} {locale === 'zh-sg' ? '总课时' : locale === 'ta-sg' ? 'மணிநேரம்' : 'Hours Total'}
                </Badge>
              </div>

              <p className="text-sm text-slate-600">
                {locale === 'zh-sg'
                  ? '每门课程模块均通过系统化的理论讲授与实践辅导相结合进行。考核结合正式期末考试与阶段性作业综合评定。'
                  : locale === 'ta-sg'
                  ? 'ஒவ்வொரு தொகுதியும் விரிவுரைகள் மற்றும் பயிற்சிகளுடன் கற்பிக்கப்படுகிறது. மதிப்பீடு தேர்வுகள் மற்றும் பணிகளை அடிப்படையாகக் கொண்டது.'
                  : 'Each module is delivered in structured sessions blending lectures with practical tutorials. Assessment is conducted through a balanced distribution of formal examinations and continuous course assignments.'}
              </p>

              {/* Native Accessible Accordions (Zero-JS compatible) */}
              <div className="space-y-3">
                {course.modules.map((module, idx) => (
                  <details
                    key={module.code}
                    className="group border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 open:bg-white open:border-navy-900 open:shadow-xs transition-colors"
                  >
                    <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none select-none font-medium text-navy-950 hover:bg-slate-100/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
                      <div className="flex items-center gap-3 sm:gap-4 pr-4">
                        <span className="w-8 h-8 rounded-lg bg-navy-900 text-gold-300 font-mono text-xs flex items-center justify-center font-bold shrink-0">
                          {module.code}
                        </span>
                        <div>
                          <div className="font-heading font-semibold text-sm sm:text-base text-navy-900 group-open:text-gold-700">
                            {module.title}
                          </div>
                          <div className="text-xs text-slate-600 flex items-center gap-2 mt-0.5">
                            <span>{module.contactHours} {locale === 'zh-sg' ? '授课学时' : locale === 'ta-sg' ? 'கற்பித்தல் மணிநேரம்' : 'Contact Hours'}</span>
                            <span>•</span>
                            <span className="text-slate-600">{module.assessment}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
                    </summary>

                    <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-600 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                            {locale === 'zh-sg' ? '授课与辅导方式' : locale === 'ta-sg' ? 'கற்பித்தல் முறை' : 'Teaching & Delivery'}
                          </span>
                          <span className="text-navy-900 font-medium">
                            {module.contactHours} {locale === 'zh-sg' ? '小时互动式讲座与实用辅导课' : locale === 'ta-sg' ? 'மணிநேர ஊடாடும் விரிவுரைகள்' : 'Hours of Interactive Lectures & Tutorials'}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                            {locale === 'zh-sg' ? '考核与评估构成' : locale === 'ta-sg' ? 'மதிப்பீட்டு முறை' : 'Assessment Breakdown'}
                          </span>
                          <span className="text-navy-900 font-medium">{module.assessment}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 pt-1 leading-relaxed">
                        {locale === 'zh-sg'
                          ? '深入讲授核心学科原理与实际应用。学员该科目出勤率须达到至少80%，方符合参加期末评估的法定资格。'
                          : locale === 'ta-sg'
                          ? 'அடிப்படை கோட்பாடு மற்றும் நடைமுறை திறன்களை உள்ளடக்கியது. இறுதித் தேர்வுக்குத் தகுதி பெற மாணவர்கள் குறைந்தது 80% வருகை பெற்றிருக்க வேண்டும்.'
                          : 'Covers rigorous fundamentals and practical problem-solving. Students must achieve minimum 80% attendance in this module to remain eligible for the final examination.'}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Section 4: Career Pathways */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-gold-700 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{locale === 'zh-sg' ? '行业前景与职业定位' : locale === 'ta-sg' ? 'தொழில்துறை பொருத்தம்' : 'Industry Relevance'}</span>
              </div>
              <h2 className="font-heading font-bold text-2xl text-navy-950">
                {locale === 'zh-sg'
                  ? '就业方向与行业前景'
                  : locale === 'ta-sg'
                  ? 'வேலைவாய்ப்பு வாய்ப்புகள்'
                  : 'Career Outcomes & Job Roles'}
              </h2>
              <p className="text-sm text-slate-600">
                {locale === 'zh-sg'
                  ? '毕业生具备扎实的专业实操技能与管理基础，可胜任新加坡各企事业单位的重点岗位：'
                  : locale === 'ta-sg'
                  ? 'பட்டதாரிகள் சிங்கப்பூரில் உள்ள முக்கிய துறைகளில் பணிபுரியும் தகுதியைப் பெறுகின்றனர்:'
                  : 'Graduates are equipped with demonstrable technical and operational capabilities for roles across Singapore industries:'}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {outcomes.map((job) => (
                  <span
                    key={job}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 text-navy-900 text-xs sm:text-sm font-medium border border-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600" />
                    <span>{job}</span>
                  </span>
                ))}
              </div>
            </section>

            {/* Section 5: Entry Requirements */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-gold-700 text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>{locale === 'zh-sg' ? '报考资格准则' : locale === 'ta-sg' ? 'சேர்க்கை அளவுகோல்கள்' : 'Admissions Criteria'}</span>
              </div>
              <h2 className="font-heading font-bold text-2xl text-navy-950">
                {locale === 'zh-sg' ? '入学要求与报考资格' : locale === 'ta-sg' ? 'சேர்க்கை தகுதிகள்' : 'Entry Requirements'}
              </h2>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-semibold text-navy-900 text-sm">
                    {locale === 'zh-sg' ? '学历前置条件' : locale === 'ta-sg' ? 'கல்வித் தகுதிகள்' : 'Academic Prerequisites'}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                    {course.entryRequirements.academicPrerequisites[locale] ||
                      course.entryRequirements.academicPrerequisites.en}
                  </p>
                </div>

                {course.entryRequirements.languageProficiency && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <h3 className="font-semibold text-navy-900 text-sm">
                      {locale === 'zh-sg' ? '语言水平要求' : locale === 'ta-sg' ? 'மொழித் திறன்' : 'Language Proficiency'}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                      {course.entryRequirements.languageProficiency[locale] ||
                        course.entryRequirements.languageProficiency.en}
                    </p>
                  </div>
                )}

                {course.entryRequirements.matureCandidateClause && (
                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-2">
                    <h3 className="font-semibold text-amber-900 text-sm flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-700" />
                      <span>{locale === 'zh-sg' ? '成熟考生豁免评估条款（成人非标录取）' : locale === 'ta-sg' ? 'முதிர்ந்த விண்ணப்பதாரர் மதிப்பீட்டு விதிமுறை' : 'Mature Candidate Evaluation Clause'}</span>
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-amber-800">
                      {course.entryRequirements.matureCandidateClause[locale] ||
                        course.entryRequirements.matureCandidateClause.en}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Section 6: Fee Details & CPE Schedule B */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-gold-700 text-xs font-semibold uppercase tracking-wider">
                    <DollarSign className="w-4 h-4" />
                    <span>{locale === 'zh-sg' ? '法定收费明细表' : locale === 'ta-sg' ? 'கட்டண அட்டவணை' : 'Statutory Fee Schedule'}</span>
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-navy-950 mt-1">
                    {locale === 'zh-sg' ? '学费明细与分期付款计划' : locale === 'ta-sg' ? 'கட்டண விவரங்கள்' : 'Course Fees & Payment Schedule'}
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-mono">CPE Schedule B</span>
              </div>

              <p className="text-sm text-slate-600">
                {locale === 'zh-sg'
                  ? '所有费用均以新加坡元（SGD）结算，严格遵循新加坡私立教育理事会（CPE）标准学生合同规定。'
                  : locale === 'ta-sg'
                  ? 'அனைத்து கட்டணங்களும் சிங்கப்பூர் டாலரில் (SGD) CPE நிலையான மாணவர் ஒப்பந்தத்தின்படி வசூலிக்கப்படுகின்றன.'
                  : 'All fees are billed in Singapore Dollars (SGD) according to the Committee for Private Education (CPE) standard PEI-Student contract.'}
              </p>

              {/* Fee Schedules Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden text-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-navy-950 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                      <th className="p-4">{locale === 'zh-sg' ? '报读修读模式' : locale === 'ta-sg' ? 'கற்றல் முறை' : 'Study Pathway'}</th>
                      <th className="p-4">{locale === 'zh-sg' ? '课程总学费' : locale === 'ta-sg' ? 'மொத்த கல்விக்கட்டணம்' : 'Total Tuition Fee'}</th>
                      <th className="p-4">{locale === 'zh-sg' ? '注册报名费' : locale === 'ta-sg' ? 'பதிவுக் கட்டணம்' : 'Registration Fee'}</th>
                      <th className="p-4">{locale === 'zh-sg' ? '分期付款细则' : locale === 'ta-sg' ? 'தவணை விவரங்கள்' : 'Installment Breakdown'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {course.fees.partTime && (
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-navy-900">
                          {locale === 'zh-sg' ? '业余制' : locale === 'ta-sg' ? 'பகுதி நேரம்' : 'Part-Time'}{' '}
                          <span className="text-xs font-normal text-slate-500 block">
                            {locale === 'zh-sg' ? '（每周1天 x 4小时）' : locale === 'ta-sg' ? '(வாரம் 1 நாள் x 4 மணிநேரம்)' : '(1 day/week x 4 hours)'}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold text-navy-950">
                          S$ {course.fees.partTime.courseFee.toLocaleString()}
                        </td>
                        <td className="p-4 text-slate-600 font-mono">
                          S$ {course.fees.partTime.registrationFee.toLocaleString()}
                        </td>
                        <td className="p-4 text-xs text-slate-600">
                          {course.fees.partTime.notes ||
                            `${course.fees.partTime.installmentsCount} installments of S$${course.fees.partTime.installmentAmount}`}
                        </td>
                      </tr>
                    )}

                    {course.fees.fullTime && (
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-navy-900">
                          {locale === 'zh-sg' ? '全日制' : locale === 'ta-sg' ? 'முழு நேரம்' : 'Full-Time'}{' '}
                          <span className="text-xs font-normal text-slate-500 block">
                            {locale === 'zh-sg' ? '（每周5天 x 3小时）' : locale === 'ta-sg' ? '(வாரம் 5 நாட்கள் x 3 மணிநேரம்)' : '(5 days/week x 3 hours)'}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold text-navy-950">
                          S$ {course.fees.fullTime.courseFee.toLocaleString()}
                        </td>
                        <td className="p-4 text-slate-600 font-mono">
                          S$ {course.fees.fullTime.registrationFee.toLocaleString()}
                        </td>
                        <td className="p-4 text-xs text-slate-600">
                          {course.fees.fullTime.notes ||
                            `${course.fees.fullTime.installmentsCount} installments of S$${course.fees.fullTime.installmentAmount}`}
                        </td>
                      </tr>
                    )}

                    {course.fees.modular && (
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-navy-900">
                          {locale === 'zh-sg' ? '单科技能认证' : locale === 'ta-sg' ? 'சான்றிதழ்' : 'Modular Certificate'}{' '}
                          <span className="text-xs font-normal text-slate-500 block">
                            {locale === 'zh-sg' ? '（1个月强化）' : locale === 'ta-sg' ? '(1 மாத தீவிர பயிற்சி)' : '(1 Month Intensive)'}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold text-navy-950">
                          S$ {course.fees.modular.fee.toLocaleString()}
                        </td>
                        <td className="p-4 text-slate-600">
                          {locale === 'zh-sg' ? '已包含' : locale === 'ta-sg' ? 'உள்ளடக்கியது' : 'Included'}
                        </td>
                        <td className="p-4 text-xs text-slate-600">
                          {locale === 'zh-sg' ? '报名注册时一次性缴纳' : locale === 'ta-sg' ? 'பதிவின் போது ஒருமுறை செலுத்துதல்' : 'Single payment upon course registration'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Statutory Non-Tuition Fees & Consumer Protections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 pt-2">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-semibold text-navy-900 block mb-1">
                    {locale === 'zh-sg' ? '报名申请费（不可退还）' : locale === 'ta-sg' ? 'விண்ணப்பக் கட்டணம்' : 'Application Fee (Non-Refundable)'}
                  </span>
                  <span>
                    {locale === 'zh-sg' ? 'S$ 54.50（含9%消费税GST），于提交报读申请时缴纳。' : locale === 'ta-sg' ? 'S$ 54.50 (9% GST உட்பட) விண்ணப்பத்தின் போது செலுத்தப்பட வேண்டும்.' : 'S$ 54.50 (inclusive of prevailing 9% GST) payable upon submission of application.'}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-semibold text-navy-900 block mb-1">
                    {locale === 'zh-sg' ? '学生医疗保险费' : locale === 'ta-sg' ? 'மருத்துவக் காப்பீடு' : 'Student Medical Insurance'}
                  </span>
                  <span>
                    {locale === 'zh-sg' ? '每年 S$ 21.80（由 Liberty Insurance Pte Ltd 承保）。' : locale === 'ta-sg' ? 'வருடத்திற்கு S$ 21.80 (Liberty Insurance Pte Ltd).' : 'S$ 21.80 per year (underwritten by Liberty Insurance Pte Ltd).'}
                  </span>
                </div>
              </div>

              {/* 7-Day Cooling Off Period Guarantee */}
              <div className="p-4 rounded-xl bg-navy-50/60 border border-navy-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-navy-700 shrink-0 mt-0.5" />
                <div className="text-xs text-navy-900">
                  <strong className="font-semibold">
                    {locale === 'zh-sg' ? '7个工作日冷静期权益（CPE条款第3.8条）：' : locale === 'ta-sg' ? '7-வேலை நாட்கள் மறுபரிசீலனை காலம் (CPE பிரிவு 3.8):' : '7-Working-Day Cooling-Off Period (CPE Clause 3.8):'}
                  </strong>
                  <p className="mt-0.5 text-navy-800 leading-relaxed">
                    {locale === 'zh-sg'
                      ? '自签署标准学生合同之日起，学生享有法定7个工作日冷静期。在此期间提交书面退学通知，可获全额退还已缴付学费（报名申请费除外）。'
                      : locale === 'ta-sg'
                      ? 'ஒப்பந்தம் கையெழுத்திட்ட நாளிலிருந்து 7 வேலை நாட்கள் சலுகைக் காலம் வழங்கப்படுகிறது. இக்காலத்தில் ரத்து செய்தால் செலுத்திய கட்டணம் முழுமையாகத் திரும்பப் பெறலாம்.'
                      : 'Students are granted a statutory 7-working-day cooling-off period from the date of contract signing. Notice of termination delivered within this period grants 100% refund of fees paid (minus non-refundable application fee).'}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7: Official Forms & Downloads */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-gold-700 text-xs font-semibold uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>{locale === 'zh-sg' ? '法定监管与学生权益' : locale === 'ta-sg' ? 'ஒழுங்குமுறை ஆவணங்கள்' : 'Statutory Governance'}</span>
              </div>
              <h2 className="font-heading font-bold text-2xl text-navy-950">
                {locale === 'zh-sg' ? '官方合规文件与表格' : locale === 'ta-sg' ? 'அதிகாரப்பூர்வ ஆவணங்கள்' : 'Official Institutional Documents'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <Link
                  href={`/${locale}/forms`}
                  className="p-4 rounded-xl border border-slate-200 hover:border-navy-900 hover:bg-slate-50 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-navy-900 group-hover:text-gold-600" />
                    <div>
                      <div className="font-semibold text-navy-900">
                        {locale === 'zh-sg' ? '标准学生合同范本 v4.1' : locale === 'ta-sg' ? 'மாணவர் ஒப்பந்த மாதிரி v4.1' : 'Sample Student Contract v4.1'}
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        {locale === 'zh-sg' ? 'CPE 法定标准协议' : locale === 'ta-sg' ? 'CPE நிலையான ஒப்பந்தம்' : 'CPE Mandated Standard Agreement'}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/${locale}/forms`}
                  className="p-4 rounded-xl border border-slate-200 hover:border-navy-900 hover:bg-slate-50 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-navy-900 group-hover:text-gold-600" />
                    <div>
                      <div className="font-semibold text-navy-900">
                        {locale === 'zh-sg' ? '学生须知文件 (Form 12)' : locale === 'ta-sg' ? 'மாணவர் வழிகாட்டல் படிவம் 12' : 'Student Advisory Note (Form 12)'}
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        {locale === 'zh-sg' ? '课前必读法定指引' : locale === 'ta-sg' ? 'கட்டாய வழிகாட்டல்' : 'Mandatory Pre-Course Guidance'}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/${locale}/governance`}
                  className="p-4 rounded-xl border border-slate-200 hover:border-navy-900 hover:bg-slate-50 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-navy-900 group-hover:text-gold-600" />
                    <div>
                      <div className="font-semibold text-navy-900">
                        {locale === 'zh-sg' ? '学术与考试委员会' : locale === 'ta-sg' ? 'கல்வி & தேர்வு வாரியம்' : 'Academic & Exam Board'}
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        {locale === 'zh-sg' ? '学术治理与质量监管' : locale === 'ta-sg' ? 'தரக் கட்டுப்பாடு' : 'Governance & Quality Control'}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

            {/* Section 8: Related Programs */}
            {relatedCourses.length > 0 && (
              <section className="space-y-6 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">
                      {locale === 'zh-sg' ? '学术衔接与深造路径' : locale === 'ta-sg' ? 'தொடர்புடைய கல்வி வழிகள்' : 'Progression & Pathways'}
                    </span>
                    <h2 className="font-heading font-bold text-2xl text-navy-950 mt-0.5">
                      {locale === 'zh-sg'
                        ? '相关衔接课程推荐'
                        : locale === 'ta-sg'
                        ? 'தொடர்புடைய படிப்புகள்'
                        : 'Related Academic Programs'}
                    </h2>
                  </div>
                  <Link
                    href={`/${locale}/courses/${categorySlug}`}
                    className="text-xs font-semibold text-navy-900 hover:text-gold-700 hover:underline"
                  >
                    {locale === 'zh-sg' ? '查看本专业全部课程 →' : locale === 'ta-sg' ? 'பிரிவின் அனைத்து படிப்புகளும் →' : 'View All in Category →'}
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedCourses.map((rel) => (
                    <CourseCard key={rel.id} course={rel} locale={locale} />
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Sticky Desktop Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Enrollment & Action Card */}
              <div className="bg-white rounded-2xl border-2 border-navy-900 p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gold-500 text-navy-950 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                  {locale === 'zh-sg' ? '官方正规报读' : locale === 'ta-sg' ? 'அதிகாரப்பூர்வ சேர்க்கை' : 'Official Admission'}
                </div>

                <div className="mb-4">
                  <span className="text-xs text-slate-500 uppercase tracking-wider block font-medium">
                    {locale === 'zh-sg' ? '官方核准学费' : locale === 'ta-sg' ? 'அங்கீகரிக்கப்பட்ட கட்டணம்' : 'Verified Course Fee'}
                  </span>
                  <div className="mt-1">
                    {course.fees.partTime && (
                      <div className="font-heading font-bold text-3xl text-navy-950">
                        S$ {course.fees.partTime.courseFee.toLocaleString()}
                        <span className="text-xs font-normal text-slate-500 ml-1.5 font-sans">
                          ({locale === 'zh-sg' ? '业余制' : locale === 'ta-sg' ? 'பகுதி நேரம்' : 'Part-Time'})
                        </span>
                      </div>
                    )}
                    {course.fees.fullTime && (
                      <div className="text-sm font-semibold text-navy-800 mt-0.5">
                        S$ {course.fees.fullTime.courseFee.toLocaleString()}{' '}
                        <span className="text-xs font-normal text-slate-500">
                          ({locale === 'zh-sg' ? '全日制' : locale === 'ta-sg' ? 'முழு நேரம்' : 'Full-Time'})
                        </span>
                      </div>
                    )}
                    {course.fees.modular && (
                      <div className="font-heading font-bold text-3xl text-navy-950">
                        S$ {course.fees.modular.fee.toLocaleString()}
                        <span className="text-xs font-normal text-slate-500 ml-1.5 font-sans">
                          ({locale === 'zh-sg' ? '单科认证' : locale === 'ta-sg' ? 'சான்றிதழ்' : 'Modular'})
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    {locale === 'zh-sg' ? '+ 签署合同时缴纳 S$300 注册费' : locale === 'ta-sg' ? '+ ஒப்பந்தத்தில் S$300 பதிவுக் கட்டணம்' : '+ S$300 registration fee upon contract signing'}
                  </span>
                </div>

                {/* Primary CTA Buttons */}
                <div className="space-y-3 pt-2">
                  <Link
                    href={`/${locale}/apply?course=${encodeURIComponent(course.slug)}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg text-center"
                  >
                    <span>
                      {locale === 'zh-sg'
                        ? '立即递交报读申请'
                        : locale === 'ta-sg'
                        ? 'விண்ணப்பிக்க'
                        : 'Apply for Admission'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/${locale}/contact?subject=${encodeURIComponent(course.title.en)}`}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-slate-300 hover:border-navy-900 text-navy-900 bg-white hover:bg-slate-50 font-semibold rounded-xl text-xs transition-colors text-center"
                  >
                    {locale === 'zh-sg'
                      ? '预约校区课程咨询'
                      : locale === 'ta-sg'
                      ? 'வளாக ஆலோசனை'
                      : 'Book Campus Consultation'}
                  </Link>
                </div>

                {/* Contact Direct Strip */}
                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                  <div className="font-semibold text-navy-900 text-[11px] uppercase tracking-wider mb-1">
                    {locale === 'zh-sg' ? '招生咨询处直通车：' : locale === 'ta-sg' ? 'நேரடி சேர்க்கை அலுவலகம்:' : 'Direct Admissions Office:'}
                  </div>

                  <a
                    href="tel:+6590049657"
                    className="flex items-center gap-2 hover:text-navy-900 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-600" />
                    <span>+65 9004 9657 / +65 9641 0630</span>
                  </a>

                  <a
                    href={`https://wa.me/6590049657?text=${encodeURIComponent(`Hi Edulearn, I would like to enquire about ${course.title.en}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{locale === 'zh-sg' ? '通过 WhatsApp 咨询官方招生官' : locale === 'ta-sg' ? 'வாட்ஸ்அப்பில் சேர்க்கை ஆலோசனை' : 'Chat with Admissions on WhatsApp'}</span>
                  </a>

                  <div className="flex items-start gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>1 Jalan Berseh, #02-28 New World Centre, Singapore 209037</span>
                  </div>
                </div>
              </div>

              {/* Statutory Framework Trust Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 text-xs text-slate-600 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 font-semibold text-navy-950 text-sm">
                  <ShieldCheck className="w-4 h-4 text-gold-600" />
                  <span>{locale === 'zh-sg' ? '正规法定保障' : locale === 'ta-sg' ? 'ஒழுங்குமுறை பாதுகாப்பு' : 'Regulatory Confidence'}</span>
                </div>
                <ul className="space-y-2 text-[11px] text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span>{locale === 'zh-sg' ? 'CPE 强化注册框架：201708935D' : locale === 'ta-sg' ? 'CPE பதிவு: 201708935D' : 'CPE Enhanced Registration: 201708935D'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span>{locale === 'zh-sg' ? '标准合同学费保障机制保障' : locale === 'ta-sg' ? 'ஒப்பந்தத்தின் கீழ் கட்டணப் பாதுகாப்பு' : 'Fee Protection under standard contract'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span>{locale === 'zh-sg' ? 'bizSAFE Level 3 安全认证企业' : locale === 'ta-sg' ? 'bizSAFE நிலை 3 சான்றளிக்கப்பட்ட நிறுவனம்' : 'bizSAFE Level 3 Certified Organization'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span>{locale === 'zh-sg' ? '7个工作日冷静期全额退款保障' : locale === 'ta-sg' ? '7-நாட்கள் மறுபரிசீலனை 100% ரீஃபண்ட்' : '7-Day Cooling-off Period 100% Refund'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* 3. Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 shadow-lg flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider truncate">
            {course.title[locale] || course.title.en}
          </div>
          <div className="font-heading font-bold text-navy-950 text-base">
            {course.fees.partTime
              ? `S$ ${course.fees.partTime.courseFee.toLocaleString()}`
              : course.fees.fullTime
              ? `S$ ${course.fees.fullTime.courseFee.toLocaleString()}`
              : course.fees.modular
              ? `S$ ${course.fees.modular.fee.toLocaleString()}`
              : 'S$ 2,400'}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`https://wa.me/6590049657?text=${encodeURIComponent(`Hi, I would like to enquire about ${course.title.en}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <Link
            href={`/${locale}/apply?course=${encodeURIComponent(course.slug)}`}
            className="px-5 py-2.5 bg-navy-900 text-white rounded-lg text-xs font-bold hover:bg-navy-800 transition-colors"
          >
            {locale === 'zh-sg' ? '立即报读' : locale === 'ta-sg' ? 'விண்ணப்பிக்க' : 'Apply Now'}
          </Link>
        </div>
      </div>
    </div>
  );
}
