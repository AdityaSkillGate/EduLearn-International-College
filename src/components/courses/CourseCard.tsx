'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types/course';
import { Locale } from '@/lib/i18n/types';
import { Badge, Button } from '@/components/ui';
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
} from 'lucide-react';

interface CourseCardProps {
  course: Course;
  locale: Locale;
  priority?: boolean;
}

export function CourseCard({ course, locale, priority = false }: CourseCardProps) {
  // Determine relevant image based on faculty
  let imageSrc = '/images/engineering-lab.jpg';
  if (course.category === 'it') {
    imageSrc = '/images/it-computer-lab.jpg';
  } else if (course.category === 'business') {
    imageSrc = '/images/business-classroom.jpg';
  } else if (course.category === 'facilities' || course.category === 'healthcare') {
    imageSrc = '/images/classroom-facilities.jpg';
  } else if (course.category === 'hospitality') {
    imageSrc = '/images/hero-campus.jpg';
  }

  const localizedTitle = course.title[locale] || course.title.en;
  const isNonEnglish = locale !== 'en';
  const localizedOverview = course.overview[locale] || course.overview.en;

  // Level badge styling
  let levelLabel = 'Diploma';
  let levelVariant: 'navy' | 'gold' | 'neutral' = 'navy';
  if (course.level === 'advanced-diploma') {
    levelLabel = locale === 'zh-sg' ? '高级大专' : locale === 'ta-sg' ? 'உயர் டிப்ளமோ' : 'Advanced Diploma';
    levelVariant = 'gold';
  } else if (course.level === 'short-term') {
    levelLabel = locale === 'zh-sg' ? '短期模块' : locale === 'ta-sg' ? 'குறுகிய காலம்' : 'Modular Certificate';
    levelVariant = 'neutral';
  } else if (course.level === 'postgraduate') {
    levelLabel = locale === 'zh-sg' ? '研究生文凭' : locale === 'ta-sg' ? 'முதுகலை டிப்ளமோ' : 'Postgraduate';
    levelVariant = 'gold';
  } else {
    levelLabel = locale === 'zh-sg' ? '专业大专' : locale === 'ta-sg' ? 'டிப்ளமோ' : 'Diploma';
    levelVariant = 'navy';
  }

  const isELearning = course.deliveryMode === 'elearning';

  return (
    <article className="group relative flex flex-col bg-white rounded-xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Visual Thumbnail */}
      <Link href={`/${locale}/courses/${course.slug}`} className="relative h-48 w-full bg-slate-900 overflow-hidden block">
        <Image
          src={imageSrc}
          alt={course.title.en}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />

        {/* Badges Over Image */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <Badge variant={levelVariant} className="shadow-sm font-semibold tracking-wide">
            {levelLabel}
          </Badge>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shadow-sm backdrop-blur-md ${
              isELearning
                ? 'bg-amber-500/90 text-navy-950'
                : 'bg-navy-900/80 text-white border border-white/20'
            }`}
          >
            {isELearning ? <Monitor className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
            {isELearning
              ? locale === 'zh-sg'
                ? '线上教学'
                : locale === 'ta-sg'
                ? 'மின்-கற்றல்'
                : 'E-Learning'
              : locale === 'zh-sg'
              ? '校区面授'
              : locale === 'ta-sg'
              ? 'நேரடி வகுப்பு'
              : 'Classroom'}
          </span>
        </div>

        {/* Course ID and CPE indicator at bottom of image */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-white/90">
          <span className="font-mono bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
            ID: {course.id}
          </span>
          <span className="flex items-center gap-1 text-gold-300">
            <CheckCircle2 className="w-3 h-3" />
            CPE Reg: 201708935D
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Main Title */}
          <h3 className="font-heading font-bold text-lg text-navy-900 group-hover:text-gold-700 transition-colors line-clamp-2 leading-snug">
            <Link href={`/${locale}/courses/${course.slug}`} className="hover:underline">
              {localizedTitle}
            </Link>
          </h3>

          {/* English Subtitle for bilingual clarity */}
          {isNonEnglish && (
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 italic font-sans">
              {course.title.en}
            </p>
          )}

          {/* Overview text */}
          <p className="text-slate-600 text-xs mt-3 line-clamp-3 leading-relaxed">
            {localizedOverview}
          </p>

          {/* Key Facts Strip */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-gold-600 shrink-0" />
              <span>
                {course.durationMonths}{' '}
                {course.durationMonths === 1
                  ? locale === 'zh-sg'
                    ? '个月'
                    : locale === 'ta-sg'
                    ? 'மாதம்'
                    : 'Month'
                  : locale === 'zh-sg'
                  ? '个月'
                  : locale === 'ta-sg'
                  ? 'மாதங்கள்'
                  : 'Months'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-navy-600 shrink-0" />
              <span>
                {course.contactHours}{' '}
                {locale === 'zh-sg' ? '课时' : locale === 'ta-sg' ? 'மணிநேரம்' : 'Contact Hours'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-navy-600 shrink-0" />
              <span>1:14 {locale === 'zh-sg' ? '师生比' : locale === 'ta-sg' ? 'விகிதம்' : 'Ratio'}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-gold-600 shrink-0" />
              <span>
                {course.modules.length}{' '}
                {locale === 'zh-sg' ? '门核心模块' : locale === 'ta-sg' ? 'பாடங்கள்' : 'Modules'}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Section */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold">
              {locale === 'zh-sg' ? '官方学费' : locale === 'ta-sg' ? 'கட்டணம்' : 'Course Fee'}
            </span>
            <div className="text-right">
              {course.fees.partTime && (
                <div className="font-heading font-bold text-navy-900 text-base">
                  S$ {course.fees.partTime.courseFee.toLocaleString()}{' '}
                  <span className="text-xs font-normal text-slate-600">
                    ({locale === 'zh-sg' ? '业余制' : locale === 'ta-sg' ? 'பகுதி நேரம்' : 'Part-Time'})
                  </span>
                </div>
              )}
              {course.fees.fullTime && (
                <div className="text-xs text-slate-600">
                  {locale === 'zh-sg' ? '全日制' : locale === 'ta-sg' ? 'முழு நேரம்' : 'Full-Time'}: S${' '}
                  {course.fees.fullTime.courseFee.toLocaleString()}
                </div>
              )}
              {course.fees.modular && (
                <div className="font-heading font-bold text-navy-900 text-base">
                  S$ {course.fees.modular.fee.toLocaleString()}{' '}
                  <span className="text-xs font-normal text-slate-600">
                    ({locale === 'zh-sg' ? '单科认证' : locale === 'ta-sg' ? 'சான்றிதழ்' : 'Modular'})
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/courses/${course.slug}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-lg text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy-900"
            >
              <span>{locale === 'zh-sg' ? '查看详情' : locale === 'ta-sg' ? 'விவரங்கள்' : 'View Details'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/${locale}/apply?course=${encodeURIComponent(course.slug)}`}
              className="inline-flex items-center justify-center px-3 py-2 border border-slate-300 hover:border-navy-900 text-navy-900 hover:text-navy-950 bg-white hover:bg-slate-50 rounded-lg text-xs font-semibold transition-colors"
            >
              {locale === 'zh-sg' ? '立即报读' : locale === 'ta-sg' ? 'விண்ணப்பிக்க' : 'Apply'}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
