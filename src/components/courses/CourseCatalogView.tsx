'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Course, CourseLevel, CourseCategory, DeliveryMode } from '@/types/course';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { Container, SectionHeading, Badge, Breadcrumbs, Button, HeroBackgroundImage } from '@/components/ui';
import { CourseCard } from './CourseCard';
import {
  Search,
  SlidersHorizontal,
  X,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  Filter,
  ArrowUpDown,
  BookOpen,
  Building,
  RotateCcw,
  SearchX,
} from 'lucide-react';

interface CourseCatalogViewProps {
  level: CourseLevel;
  courses: Course[];
  locale: Locale;
  dict: Dictionary;
  categoryTitle: string;
  categorySubtitle: string;
  categoryDescription: string;
}

type SortOption = 'title-asc' | 'title-desc' | 'duration-asc' | 'duration-desc' | 'fee-asc' | 'fee-desc' | 'hours-desc';

const CATEGORY_TABS: { level: CourseLevel | 'all'; slug: string; en: string; 'zh-sg': string; 'ta-sg': string }[] = [
  { level: 'all', slug: 'courses', en: 'All 21 Programs', 'zh-sg': '全部21门课程', 'ta-sg': 'அனைத்து 21 படிப்புகள்' },
  { level: 'diploma', slug: 'courses/diploma', en: 'Diploma (13)', 'zh-sg': '专业大专 (13)', 'ta-sg': 'டிப்ளமோ (13)' },
  { level: 'advanced-diploma', slug: 'courses/advanced-diploma', en: 'Advanced Diploma (5)', 'zh-sg': '高级大专 (5)', 'ta-sg': 'உயர் டிப்ளமோ (5)' },
  { level: 'short-term', slug: 'courses/short-term', en: 'Short-Term Modular (5)', 'zh-sg': '短期实用模块 (5)', 'ta-sg': 'குறுகிய காலம் (5)' },
  { level: 'postgraduate', slug: 'courses/postgraduate-diploma', en: 'Postgraduate Diploma (2)', 'zh-sg': '研究生文凭 (2)', 'ta-sg': 'முதுகலை (2)' },
];

export function CourseCatalogView({
  level,
  courses,
  locale,
  dict,
  categoryTitle,
  categorySubtitle,
  categoryDescription,
}: CourseCatalogViewProps) {
  // Client state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<CourseCategory | 'all'>('all');
  const [selectedMode, setSelectedMode] = useState<DeliveryMode | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('title-asc');

  // Load URL query params on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      const faculty = params.get('faculty');
      const mode = params.get('mode');
      const sort = params.get('sort');

      if (q) setSearchQuery(q);
      if (faculty && ['engineering', 'it', 'facilities', 'business', 'healthcare', 'hospitality'].includes(faculty)) {
        setSelectedFaculty(faculty as CourseCategory);
      }
      if (mode && ['classroom', 'elearning', 'hybrid'].includes(mode)) {
        setSelectedMode(mode as DeliveryMode);
      }
      if (sort && ['title-asc', 'title-desc', 'duration-asc', 'duration-desc', 'fee-asc', 'fee-desc', 'hours-desc'].includes(sort)) {
        setSortBy(sort as SortOption);
      }
    }
  }, []);

  // Sync state to URL query params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (searchQuery.trim()) url.searchParams.set('q', searchQuery.trim());
      else url.searchParams.delete('q');

      if (selectedFaculty !== 'all') url.searchParams.set('faculty', selectedFaculty);
      else url.searchParams.delete('faculty');

      if (selectedMode !== 'all') url.searchParams.set('mode', selectedMode);
      else url.searchParams.delete('mode');

      if (sortBy !== 'title-asc') url.searchParams.set('sort', sortBy);
      else url.searchParams.delete('sort');

      window.history.replaceState(null, '', url.toString());
    }
  }, [searchQuery, selectedFaculty, selectedMode, sortBy]);

  // Extract available faculties represented in current dataset
  const availableFaculties = useMemo(() => {
    const set = new Set<CourseCategory>();
    courses.forEach((c) => set.add(c.category));
    return Array.from(set);
  }, [courses]);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((course) => {
        const titleMatchEn = course.title.en.toLowerCase().includes(query);
        const titleMatchZh = course.title['zh-sg']?.toLowerCase().includes(query);
        const titleMatchTa = course.title['ta-sg']?.toLowerCase().includes(query);
        const overviewMatch = (course.overview[locale] || course.overview.en).toLowerCase().includes(query);
        const idMatch = course.id.toLowerCase() === query;
        const moduleMatch = course.modules.some((m) => m.title.toLowerCase().includes(query) || m.code.toLowerCase().includes(query));

        return titleMatchEn || titleMatchZh || titleMatchTa || overviewMatch || idMatch || moduleMatch;
      });
    }

    // Faculty filter
    if (selectedFaculty !== 'all') {
      result = result.filter((course) => course.category === selectedFaculty);
    }

    // Delivery mode filter
    if (selectedMode !== 'all') {
      result = result.filter((course) => course.deliveryMode === selectedMode);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'title-asc') {
        const titleA = a.title[locale] || a.title.en;
        const titleB = b.title[locale] || b.title.en;
        return titleA.localeCompare(titleB);
      }
      if (sortBy === 'title-desc') {
        const titleA = a.title[locale] || a.title.en;
        const titleB = b.title[locale] || b.title.en;
        return titleB.localeCompare(titleA);
      }
      if (sortBy === 'duration-asc') {
        return a.durationMonths - b.durationMonths;
      }
      if (sortBy === 'duration-desc') {
        return b.durationMonths - a.durationMonths;
      }
      if (sortBy === 'hours-desc') {
        return b.contactHours - a.contactHours;
      }
      if (sortBy === 'fee-asc') {
        const feeA = a.fees.partTime?.courseFee || a.fees.fullTime?.courseFee || a.fees.modular?.fee || 0;
        const feeB = b.fees.partTime?.courseFee || b.fees.fullTime?.courseFee || b.fees.modular?.fee || 0;
        return feeA - feeB;
      }
      if (sortBy === 'fee-desc') {
        const feeA = a.fees.partTime?.courseFee || a.fees.fullTime?.courseFee || a.fees.modular?.fee || 0;
        const feeB = b.fees.partTime?.courseFee || b.fees.fullTime?.courseFee || b.fees.modular?.fee || 0;
        return feeB - feeA;
      }
      return 0;
    });

    return result;
  }, [courses, searchQuery, selectedFaculty, selectedMode, sortBy, locale]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedFaculty !== 'all' || selectedMode !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedFaculty('all');
    setSelectedMode('all');
    setSortBy('title-asc');
  };

  const getFacultyName = (cat: CourseCategory) => {
    switch (cat) {
      case 'engineering':
        return locale === 'zh-sg' ? '工程与建造' : locale === 'ta-sg' ? 'பொறியியல்' : 'Engineering';
      case 'it':
        return locale === 'zh-sg' ? '资讯科技' : locale === 'ta-sg' ? 'தகவல் தொழில்நுட்பம்' : 'Information Technology';
      case 'facilities':
        return locale === 'zh-sg' ? '物业设施' : locale === 'ta-sg' ? 'வசதிகள் மேலாண்மை' : 'Facilities Management';
      case 'business':
        return locale === 'zh-sg' ? '商业管理' : locale === 'ta-sg' ? 'வணிகம்' : 'Business Management';
      case 'healthcare':
        return locale === 'zh-sg' ? '健康医护' : locale === 'ta-sg' ? 'சுகாதாரம்' : 'Healthcare & Caregiving';
      case 'hospitality':
        return locale === 'zh-sg' ? '酒店款待' : locale === 'ta-sg' ? 'விருந்தோம்பல்' : 'Hospitality Management';
      default:
        return cat;
    }
  };

  const heroImage = useMemo(() => {
    if (level === 'postgraduate') return '/images/business-classroom.jpg';
    if (level === 'advanced-diploma') return '/images/classroom-facilities.jpg';
    if (level === 'short-term') return '/images/it-computer-lab.jpg';
    return '/images/engineering-lab.jpg';
  }, [level]);

  return (
    <div className="min-w-0">
      {/* Category Header */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white py-14 lg:py-20 relative overflow-hidden">
        <HeroBackgroundImage
          src={heroImage}
          alt={categoryTitle}
          opacity="opacity-30"
        />
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <Container className="relative z-10">
          <Breadcrumbs
            homeHref={`/${locale}`}
            items={[
              { label: dict.nav.home, href: `/${locale}` },
              { label: dict.nav.courses, href: `/${locale}/courses` },
              { label: categoryTitle },
            ]}
            className="mb-8 text-white/70"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{categorySubtitle}</span>
            </div>

            <h1 className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
              {categoryTitle}
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed font-light">
              {categoryDescription}
            </p>

            {/* Statutory Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>CPE Reg: 201708935D</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>80% Attendance Mandate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>1:14 Teacher Ratio</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>bizSAFE Certified</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Category Navigation Pills */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-20 shadow-xs">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {CATEGORY_TABS.map((tab) => {
              const isActive = tab.level === level;
              const tabLabel = tab[locale] || tab.en;
              return (
                <Link
                  key={tab.slug}
                  href={`/${locale}/${tab.slug}`}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-navy-900 text-white shadow-sm ring-1 ring-navy-900 font-semibold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tabLabel}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Main Catalog Section */}
      <section className="py-10 lg:py-16 bg-slate-50 min-h-[600px]">
        <Container>
          {/* Controls: Search, Faculty Filter, Delivery Mode, Sort */}
          <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search input */}
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    locale === 'zh-sg'
                      ? '搜索课程名称、模块或专业方向...'
                      : locale === 'ta-sg'
                      ? 'படிப்புகள் அல்லது பாடங்களை தேடவும்...'
                      : 'Search courses by title, keywords or modules...'
                  }
                  className="w-full pl-10 pr-9 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-navy-900 rounded-lg text-sm text-slate-800 placeholder-slate-400 transition-colors focus:outline-none focus:ring-1 focus:ring-navy-900"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Faculty Filter */}
              <div className="md:col-span-3">
                <label htmlFor="faculty-select" className="sr-only">
                  Faculty Filter
                </label>
                <div className="relative">
                  <select
                    id="faculty-select"
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value as CourseCategory | 'all')}
                    className="w-full px-3 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-navy-900 rounded-lg text-xs font-medium text-slate-800 appearance-none transition-colors focus:outline-none focus:ring-1 focus:ring-navy-900 cursor-pointer"
                  >
                    <option value="all">
                      {locale === 'zh-sg' ? '全部专业方向' : locale === 'ta-sg' ? 'அனைத்து துறைகளும்' : 'All Faculties'}
                    </option>
                    {availableFaculties.map((fac) => (
                      <option key={fac} value={fac}>
                        {getFacultyName(fac)}
                      </option>
                    ))}
                  </select>
                  <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Delivery Mode Filter */}
              <div className="md:col-span-2">
                <label htmlFor="mode-select" className="sr-only">
                  Delivery Mode Filter
                </label>
                <div className="relative">
                  <select
                    id="mode-select"
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value as DeliveryMode | 'all')}
                    className="w-full px-3 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-navy-900 rounded-lg text-xs font-medium text-slate-800 appearance-none transition-colors focus:outline-none focus:ring-1 focus:ring-navy-900 cursor-pointer"
                  >
                    <option value="all">
                      {locale === 'zh-sg' ? '全部授课模式' : locale === 'ta-sg' ? 'அனைத்து முறைகளும்' : 'All Modes'}
                    </option>
                    <option value="classroom">
                      {locale === 'zh-sg' ? '校区面授' : locale === 'ta-sg' ? 'நேரடி வகுப்பு' : 'Classroom'}
                    </option>
                    <option value="elearning">
                      {locale === 'zh-sg' ? '线上教学' : locale === 'ta-sg' ? 'ஆன்லைன் கற்றல்' : 'E-Learning'}
                    </option>
                  </select>
                  <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="md:col-span-2">
                <label htmlFor="sort-select" className="sr-only">
                  Sort Courses
                </label>
                <div className="relative">
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-3 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-navy-900 rounded-lg text-xs font-medium text-slate-800 appearance-none transition-colors focus:outline-none focus:ring-1 focus:ring-navy-900 cursor-pointer"
                  >
                    <option value="title-asc">
                      {locale === 'zh-sg' ? '名称 (A-Z)' : locale === 'ta-sg' ? 'பெயர் (A-Z)' : 'Title (A–Z)'}
                    </option>
                    <option value="title-desc">
                      {locale === 'zh-sg' ? '名称 (Z-A)' : locale === 'ta-sg' ? 'பெயர் (Z-A)' : 'Title (Z–A)'}
                    </option>
                    <option value="duration-asc">
                      {locale === 'zh-sg' ? '时长 (由短到长)' : locale === 'ta-sg' ? 'கால அளவு (குறைவு)' : 'Duration (Shortest)'}
                    </option>
                    <option value="duration-desc">
                      {locale === 'zh-sg' ? '时长 (由长到短)' : locale === 'ta-sg' ? 'கால அளவு (அதிகம்)' : 'Duration (Longest)'}
                    </option>
                    <option value="hours-desc">
                      {locale === 'zh-sg' ? '总课时 (最多)' : locale === 'ta-sg' ? 'மணிநேரம் (அதிகம்)' : 'Contact Hours (Most)'}
                    </option>
                    <option value="fee-asc">
                      {locale === 'zh-sg' ? '学费 (由低到高)' : locale === 'ta-sg' ? 'கட்டணம் (குறைவு)' : 'Fee (Lowest First)'}
                    </option>
                    <option value="fee-desc">
                      {locale === 'zh-sg' ? '学费 (由高到低)' : locale === 'ta-sg' ? 'கட்டணம் (அதிகம்)' : 'Fee (Highest First)'}
                    </option>
                  </select>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active Filters Summary Strip */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span>
                  {locale === 'zh-sg'
                    ? `显示 ${filteredCourses.length} 门课程（共 ${courses.length} 门）`
                    : locale === 'ta-sg'
                    ? `காண்பிக்கப்படுகிறது: ${filteredCourses.length} / ${courses.length}`
                    : `Showing ${filteredCourses.length} of ${courses.length} courses`}
                </span>
                {hasActiveFilters && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-navy-50 text-navy-800 font-medium">
                    {locale === 'zh-sg' ? '筛选中' : locale === 'ta-sg' ? 'வடிகட்டப்பட்டது' : 'Filters Active'}
                  </span>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-gold-700 hover:text-gold-800 font-medium transition-colors hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{locale === 'zh-sg' ? '重置所有筛选' : locale === 'ta-sg' ? 'மீட்டமைக்க' : 'Reset All Filters'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Grid or Empty State */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, idx) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  locale={locale}
                  priority={idx < 3}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs my-8">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-xl text-navy-950 mb-2">
                {locale === 'zh-sg'
                  ? '未找到符合条件的课程'
                  : locale === 'ta-sg'
                  ? 'படிப்புகள் எதுவும் கிடைக்கவில்லை'
                  : 'No Courses Matched Your Criteria'}
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                {locale === 'zh-sg'
                  ? '尝试清除搜索关键词或调整专业方向与授课模式筛选。'
                  : locale === 'ta-sg'
                  ? 'தேடல் சொற்களை மாற்றி அல்லது வடிகட்டிகளை மீட்டமைத்து மீண்டும் முயற்சிக்கவும்.'
                  : 'Try broadening your search keywords, or clear the faculty and delivery mode filters to explore the full curriculum.'}
              </p>
              <Button variant="royal" onClick={handleResetFilters} className="inline-flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>{locale === 'zh-sg' ? '重置所有筛选' : locale === 'ta-sg' ? 'மீட்டமைக்க' : 'Reset All Filters'}</span>
              </Button>
            </div>
          )}

          {/* Admissions Guidance & Contact CTA Strip */}
          <div className="mt-16 bg-gradient-to-r from-navy-900 to-navy-950 rounded-2xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 rounded-full bg-gold-500/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">
                  {locale === 'zh-sg' ? '官方招生咨询' : locale === 'ta-sg' ? 'சேர்க்கை ஆலோசனை' : 'Admissions Consultation'}
                </span>
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mt-1">
                  {locale === 'zh-sg'
                    ? '需要专业学术建议或课程分期咨询？'
                    : locale === 'ta-sg'
                    ? 'பாடத்திட்டம் குறித்து ஆலோசனை தேவையா?'
                    : 'Need Academic Guidance or Fee Installment Advice?'}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {locale === 'zh-sg'
                    ? '我们的教育顾问团队常驻小印度新世界中心校区，可协助核对学历前置条件、成人成熟考生豁免条款及CPE标准学生合同细则。'
                    : locale === 'ta-sg'
                    ? 'எங்கள் கல்வி ஆலோசகர்கள் லிட்டில் இந்தியா வளாகத்தில் உங்களுக்கு உதவ தயாராக உள்ளனர்.'
                    : 'Our institutional admissions team at New World Centre is ready to guide you on GCE O-Level prerequisites, mature candidate evaluations, and Singapore CPE standard contract terms.'}
                </p>

                <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300">
                  <a
                    href="tel:+6590049657"
                    className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    <span>+65 9004 9657 / +65 9641 0630</span>
                  </a>
                  <a
                    href="https://wa.me/6590049657"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Direct: +65 9004 9657</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href={`/${locale}/apply`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg text-center"
                >
                  <span>{locale === 'zh-sg' ? '在线递交入学申请' : locale === 'ta-sg' ? 'விண்ணப்பிக்க' : 'Apply for Admission'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-sm transition-colors text-center border border-white/20"
                >
                  {locale === 'zh-sg' ? '联系小印度校区' : locale === 'ta-sg' ? 'வளாகத்தை தொடர்பு கொள்ள' : 'Contact Campus Office'}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
