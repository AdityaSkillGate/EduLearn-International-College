'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Menu,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  FileCheck2,
  Building2,
  Users,
  Compass,
  FileText,
  HelpCircle,
  Newspaper,
  Image as ImageIcon,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { AnnouncementBar } from './AnnouncementBar';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';

const SUB_DESCRIPTIONS: Record<string, Record<Locale, string>> = {
  aboutOverview: {
    en: 'Vision, mission, and college profile',
    'zh-sg': '办学愿景、使命与学院概况',
    'ta-sg': 'கல்லூரி பார்வை, நோக்கம் மற்றும் கண்ணோட்டம்',
  },
  facilities: {
    en: 'Classrooms 1 & 2 at New World Centre',
    'zh-sg': '新世界中心课室1与课室2',
    'ta-sg': 'நியூ வேர்ல்ட் சென்டர் வகுப்பறைகள் 1 & 2',
  },
  academicBoard: {
    en: 'Academic & Examination Board governance',
    'zh-sg': '学术与考试委员会治理架构',
    'ta-sg': 'கல்வி மற்றும் தேர்வு வாரிய நிர்வாகம்',
  },
  facultyDeployment: {
    en: '35 CPE-registered deployed educators',
    'zh-sg': '35名私立教育理事会注册执教名师',
    'ta-sg': '35 CPE-பதிவு பெற்ற தகுதிவாய்ந்த ஆசிரியர்கள்',
  },
  regulatoryCertificates: {
    en: 'CPE ERF & bizSAFE Level 3 accreditations',
    'zh-sg': 'CPE强化注册框架与bizSAFE Level 3认证',
    'ta-sg': 'CPE ERF & bizSAFE நிலை 3 சான்றிதழ்கள்',
  },
  allCourses: {
    en: 'Explore full prospectus and course finder',
    'zh-sg': '浏览完整课程总览与专业检索',
    'ta-sg': 'முழு பாடத்திட்ட கையேடு மற்றும் தேடல்',
  },
  diplomaCourses: {
    en: 'Engineering, IT, Facilities, Healthcare & Business (13)',
    'zh-sg': '工程、信息技术、设施管理、医疗与商业大专 (13)',
    'ta-sg': 'பொறியியல், IT, மேலாண்மை மற்றும் வணிக டிப்ளோமா (13)',
  },
  advDiplomaCourses: {
    en: 'Civil, Electrical, Mechanical & Construction Mgmt (5)',
    'zh-sg': '土木工程、电气、机械及建筑施工管理高级大专 (5)',
    'ta-sg': 'சிவில், எலக்ட்ரிக்கல் மற்றும் மெக்கானிக்கல் மேம்பட்ட டிப்ளோமா (5)',
  },
  shortTermCourses: {
    en: 'MS Office, Spoken English, CAD & Hardware (5)',
    'zh-sg': '微软办公软件、实用英语、CAD与计算机组装 (5)',
    'ta-sg': 'MS Office, ஆங்கில பேச்சுப் பயிற்சி, CAD & வன்பொருள் (5)',
  },
  pgDiplomaCourses: {
    en: 'M&E Instrumentation Control & Business Mgmt (2)',
    'zh-sg': '机电工程仪表控制与国际商业管理研究生文凭 (2)',
    'ta-sg': 'M&E கருவி கட்டுப்பாடு & வணிக மேலாண்மை முதுகலை (2)',
  },
  formsDownloads: {
    en: 'Standard Student Contract v4.1 & refund policies',
    'zh-sg': '标准学生合同4.1版及学费退款条例',
    'ta-sg': 'மாணவர் ஒப்பந்தம் 4.1 & கட்டண திருப்பி செலுத்தும் விதிகள்',
  },
  studentSupport: {
    en: 'Pastoral care, attendance rules & medical cover',
    'zh-sg': '学生关怀、出勤率要求及医疗保险指引',
    'ta-sg': 'மாணவர் நலன், வருகைப் பதிவு விதிகள் & மருத்துவ காப்பீடு',
  },
  usefulLinks: {
    en: 'TPGateway, CPE/SSG & ICA official portals',
    'zh-sg': '精深技能局TPGateway、CPE/SSG及移民局官方门户',
    'ta-sg': 'TPGateway, CPE/SSG & ICA அதிகாரப்பூர்வ தளங்கள்',
  },
};

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export const Header: React.FC<HeaderProps> = ({ locale, dict }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll detection for sticky header refinement without layout shifts
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation & Escape key support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeDropdown) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeDropdown]);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleDropdown = (menu: string) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/90'
            : 'bg-white border-b border-slate-200/80 shadow-xs'
        }`}
      >
        {/* Top Statutory Announcement Bar */}
        <AnnouncementBar dict={dict} />

        {/* Main Navigation Bar */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Official College Logo & Regulatory Identification */}
            <div className="flex items-center gap-4 shrink-0 mr-6">
              <Link
                href={`/${locale}/`}
                className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-md p-1"
              >
                <div className="bg-slate-50 p-1 rounded-xl shadow-xs border border-slate-100 shrink-0 group-hover:scale-105 transition-transform">
                  <img
                    src="/images/edulearn-logo-mark.png"
                    alt="Edulearn International College"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-sm sm:text-base lg:text-lg text-navy-950 tracking-tight leading-tight whitespace-nowrap group-hover:text-purple-700 transition-colors">
                    Edulearn International College
                  </span>
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-500 font-sans mt-0.5 whitespace-nowrap">
                    <span className="font-semibold text-gold-600">PEI Reg: 201708935D</span>
                    <span className="text-slate-300">•</span>
                    <span>Validity: 17/05/2022 – 16/05/2026</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav
              ref={navRef}
              className="hidden xl:flex items-center gap-1 text-sm font-medium text-slate-700"
              aria-label="Main Navigation"
            >
              {/* 1. Home */}
              <Link
                href={`/${locale}/`}
                className="px-3 py-2 rounded-md hover:text-purple-700 hover:bg-purple-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors"
              >
                {dict.nav.home}
              </Link>

              {/* 2. About College Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown('about')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md hover:text-purple-700 hover:bg-purple-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors ${
                    activeDropdown === 'about' ? 'text-purple-700 bg-purple-50' : ''
                  }`}
                  aria-expanded={activeDropdown === 'about'}
                  aria-haspopup="true"
                  aria-controls="about-menu"
                >
                  <span>{dict.nav.about}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
                      activeDropdown === 'about' ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {activeDropdown === 'about' && (
                  <div
                    id="about-menu"
                    className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    <div className="bg-white border border-slate-200/90 rounded-xl shadow-prestige-lg p-2.5 space-y-1">
                      <Link
                        href={`/${locale}/about/`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-50/80 transition-colors group"
                      >
                        <Building2 className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-purple-700 text-xs">
                            {dict.nav.sub.aboutOverview}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {SUB_DESCRIPTIONS.aboutOverview[locale] || SUB_DESCRIPTIONS.aboutOverview.en}
                          </div>
                        </div>
                      </Link>

                      <Link
                        href={`/${locale}/about/facilities/`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-50/80 transition-colors group"
                      >
                        <Compass className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-purple-700 text-xs">
                            {dict.nav.sub.facilities}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {SUB_DESCRIPTIONS.facilities[locale] || SUB_DESCRIPTIONS.facilities.en}
                          </div>
                        </div>
                      </Link>

                      <Link
                        href={`/${locale}/governance/#academic-board`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-50/80 transition-colors group"
                      >
                        <ShieldCheck className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-purple-700 text-xs">
                            {dict.nav.sub.academicBoard}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {SUB_DESCRIPTIONS.academicBoard[locale] || SUB_DESCRIPTIONS.academicBoard.en}
                          </div>
                        </div>
                      </Link>

                      <Link
                        href={`/${locale}/governance/#faculty`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-50/80 transition-colors group"
                      >
                        <Users className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-purple-700 text-xs">
                            {dict.nav.sub.facultyDeployment}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {SUB_DESCRIPTIONS.facultyDeployment[locale] || SUB_DESCRIPTIONS.facultyDeployment.en}
                          </div>
                        </div>
                      </Link>

                      <Link
                        href={`/${locale}/governance/#certificates`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-50/80 transition-colors group"
                      >
                        <FileCheck2 className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-purple-700 text-xs">
                            {dict.nav.sub.regulatoryCertificates}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {SUB_DESCRIPTIONS.regulatoryCertificates[locale] || SUB_DESCRIPTIONS.regulatoryCertificates.en}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Academic Courses Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('courses')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown('courses')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md hover:text-purple-700 hover:bg-purple-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors ${
                    activeDropdown === 'courses' ? 'text-purple-700 bg-purple-50' : ''
                  }`}
                  aria-expanded={activeDropdown === 'courses'}
                  aria-haspopup="true"
                  aria-controls="courses-menu"
                >
                  <span>{dict.nav.courses}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
                      activeDropdown === 'courses' ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {activeDropdown === 'courses' && (
                  <div
                    id="courses-menu"
                    className="absolute top-full left-0 w-[580px] pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-prestige-lg p-3 space-y-2.5">
                      {/* Top: Featured Full-Prospectus Header Card */}
                      <Link
                        href={`/${locale}/courses/`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-50/90 via-purple-50/50 to-orange-50/40 hover:from-purple-100/80 hover:to-orange-100/60 text-purple-950 border border-purple-100/80 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-purple-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                            <BookOpen className="w-4 h-4" aria-hidden="true" />
                          </div>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-purple-950 flex items-center gap-2">
                              <span>{dict.nav.sub.allCourses}</span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-200/60 text-purple-800">
                                21 Courses
                              </span>
                            </div>
                            <div className="text-[11px] text-purple-700/80">
                              {SUB_DESCRIPTIONS.allCourses[locale] || SUB_DESCRIPTIONS.allCourses.en}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-purple-600 shrink-0 transform group-hover:translate-x-1 transition-transform mr-1" aria-hidden="true" />
                      </Link>

                      {/* 2-Column Grid of 4 Course Qualification Levels */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* 1. Diploma Programs */}
                        <Link
                          href={`/${locale}/courses/diploma`}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl border border-transparent hover:border-purple-200/80 hover:bg-purple-50/70 transition-all group"
                        >
                          <div className="p-1.5 rounded-lg bg-orange-100/80 text-gold-600 mt-0.5 shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                            <BookOpen className="w-4 h-4" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 group-hover:text-purple-700 text-xs leading-snug">
                              {dict.nav.sub.diplomaCourses}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-normal">
                              {SUB_DESCRIPTIONS.diplomaCourses[locale] || SUB_DESCRIPTIONS.diplomaCourses.en}
                            </div>
                          </div>
                        </Link>

                        {/* 2. Advanced Diploma Programs */}
                        <Link
                          href={`/${locale}/courses/advanced-diploma`}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl border border-transparent hover:border-purple-200/80 hover:bg-purple-50/70 transition-all group"
                        >
                          <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700 mt-0.5 shrink-0 group-hover:bg-purple-700 group-hover:text-white transition-colors">
                            <GraduationCap className="w-4 h-4" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 group-hover:text-purple-700 text-xs leading-snug">
                              {dict.nav.sub.advDiplomaCourses}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-normal">
                              {SUB_DESCRIPTIONS.advDiplomaCourses[locale] || SUB_DESCRIPTIONS.advDiplomaCourses.en}
                            </div>
                          </div>
                        </Link>

                        {/* 3. Short Term Modular Certificates */}
                        <Link
                          href={`/${locale}/courses/short-term`}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl border border-transparent hover:border-purple-200/80 hover:bg-purple-50/70 transition-all group"
                        >
                          <div className="p-1.5 rounded-lg bg-amber-100/80 text-amber-600 mt-0.5 shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                            <Sparkles className="w-4 h-4" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 group-hover:text-purple-700 text-xs leading-snug">
                              {dict.nav.sub.shortTermCourses}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-normal">
                              {SUB_DESCRIPTIONS.shortTermCourses[locale] || SUB_DESCRIPTIONS.shortTermCourses.en}
                            </div>
                          </div>
                        </Link>

                        {/* 4. Postgraduate Diploma Programs */}
                        <Link
                          href={`/${locale}/courses/postgraduate-diploma`}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl border border-transparent hover:border-purple-200/80 hover:bg-purple-50/70 transition-all group"
                        >
                          <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600 mt-0.5 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 group-hover:text-purple-700 text-xs leading-snug">
                              {dict.nav.sub.pgDiplomaCourses}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-normal">
                              {SUB_DESCRIPTIONS.pgDiplomaCourses[locale] || SUB_DESCRIPTIONS.pgDiplomaCourses.en}
                            </div>
                          </div>
                        </Link>
                      </div>

                      {/* Bottom Institutional Assurance & Quick Action Bar */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] px-1">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          CPE Registered • 1:14 Attention Ratio
                        </span>
                        <Link
                          href={`/${locale}/apply/`}
                          onClick={() => setActiveDropdown(null)}
                          className="font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1 group/btn"
                        >
                          <span>{dict.nav.applyNow}</span>
                          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Student Corner Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('student')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown('student')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md hover:text-purple-700 hover:bg-purple-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors ${
                    activeDropdown === 'student' ? 'text-purple-700 bg-purple-50' : ''
                  }`}
                  aria-expanded={activeDropdown === 'student'}
                  aria-haspopup="true"
                  aria-controls="student-menu"
                >
                  <span>{dict.nav.studentCorner}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
                      activeDropdown === 'student' ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {activeDropdown === 'student' && (
                  <div
                    id="student-menu"
                    className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    <div className="bg-white border border-slate-200/90 rounded-xl shadow-prestige-lg p-2.5 space-y-1">
                      <Link
                        href={`/${locale}/forms/`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-purple-50/80 transition-colors group"
                      >
                        <FileText className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-purple-700 text-xs">
                            {dict.nav.sub.formsDownloads}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {SUB_DESCRIPTIONS.formsDownloads[locale] || SUB_DESCRIPTIONS.formsDownloads.en}
                          </div>
                        </div>
                      </Link>

                      <Link
                        href={`/${locale}/student-corner/`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-purple-50/80 transition-colors group"
                      >
                        <HelpCircle className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-purple-700 text-xs">
                            {dict.nav.sub.studentSupport}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {SUB_DESCRIPTIONS.studentSupport[locale] || SUB_DESCRIPTIONS.studentSupport.en}
                          </div>
                        </div>
                      </Link>

                      <Link
                        href={`/${locale}/useful-links/`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-purple-50/80 transition-colors group"
                      >
                        <ExternalLink className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-purple-700 text-xs">
                            {dict.nav.sub.usefulLinks}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {SUB_DESCRIPTIONS.usefulLinks[locale] || SUB_DESCRIPTIONS.usefulLinks.en}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. News & Events */}
              <Link
                href={`/${locale}/news/`}
                className="px-3 py-2 rounded-md hover:text-purple-700 hover:bg-purple-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors"
              >
                {dict.nav.newsEvents}
              </Link>

              {/* 6. Campus Gallery */}
              <Link
                href={`/${locale}/gallery/`}
                className="px-3 py-2 rounded-md hover:text-purple-700 hover:bg-purple-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors"
              >
                {dict.nav.gallery}
              </Link>

              {/* 7. Contact */}
              <Link
                href={`/${locale}/contact/`}
                className="px-3 py-2 rounded-md hover:text-purple-700 hover:bg-purple-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors"
              >
                {dict.nav.contact}
              </Link>
            </nav>

            {/* Right: Language Switcher & Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher currentLocale={locale} />

              <Link
                href={`/${locale}/apply/`}
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-white bg-gold-500 hover:bg-gold-600 rounded-lg shadow-sm hover:shadow-orange-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {dict.nav.applyNow}
              </Link>
            </div>

            {/* Mobile / Tablet Menu Toggle Button */}
            <div className="flex xl:hidden items-center gap-2">
              <LanguageSwitcher currentLocale={locale} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label={dict.common.openMobileMenu}
                aria-expanded={mobileMenuOpen}
                className="p-2 text-slate-700 hover:text-navy-950 rounded-md hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Nav Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        locale={locale}
        dict={dict}
      />
    </>
  );
};
