'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ShieldCheck,
  ArrowRight,
  Users,
  Award,
  Sparkles,
  Headphones,
  CheckCircle2,
  Pause,
  Play,
  Building2,
  Compass,
  Monitor,
  Wrench,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { Container, Badge, Button, HeroBackgroundImage } from '@/components/ui';
import {
  MOTION_DURATIONS,
  MOTION_EASINGS,
  MOTION_STAGGERS,
  MOTION_DISTANCES,
} from '@/lib/motion';

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

interface FacilitySlide {
  id: string;
  src: string;
  tag: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  title: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  spec: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  alt: string;
}

const HERO_FACILITIES: FacilitySlide[] = [
  {
    id: 'fac-eng-lab',
    src: '/images/engineering-lab.jpg',
    tag: {
      en: 'Practical CAD Lab',
      'zh-sg': '工程绘图实训台',
      'ta-sg': 'CAD செய்முறை ஆய்வகம்',
    },
    title: {
      en: 'Engineering & Structural Drafting Bench',
      'zh-sg': '建筑结构与工程CAD绘图实训台',
      'ta-sg': 'பொறியியல் வரைபட செய்முறை மேடை',
    },
    spec: {
      en: 'Practical Blueprints • Diagnostic Tools',
      'zh-sg': '施工蓝图分析 • 精密量规与结构规范',
      'ta-sg': 'கட்டடக்கலை வரைபடங்கள் • அளவீட்டு கருவிகள்',
    },
    alt: 'Engineering student drafting workbench equipped with structural blueprints and technical calipers in Singapore',
  },
  {
    id: 'fac-classroom-1',
    src: '/images/classroom-facilities.jpg',
    tag: {
      en: 'Lecture Classroom 1 & 2',
      'zh-sg': '实体教学大课室',
      'ta-sg': 'விரிவுரை வகுப்பறைகள் 1 & 2',
    },
    title: {
      en: 'Main Lecture Hall (1:14 Ratio)',
      'zh-sg': '主授课大厅（1:14 精品师生比）',
      'ta-sg': 'முதன்மை விரிவுரை கூடம் (1:14 விகிதம்)',
    },
    spec: {
      en: 'Max 15 Seats • bizSAFE Level 3 Audited',
      'zh-sg': '核准容量15座 • bizSAFE 3级安全认证',
      'ta-sg': '15 இருக்கைகள் • bizSAFE பாதுகாப்பு தணிக்கை',
    },
    alt: 'Air-conditioned lecture classroom with examination writing desks and presentation screens at EIC New World Centre',
  },
  {
    id: 'fac-it-lab',
    src: '/images/it-computer-lab.jpg',
    tag: {
      en: 'IT Computing Lab',
      'zh-sg': '电脑网络实训机房',
      'ta-sg': 'கணினி நெட்வொர்க் ஆய்வகம்',
    },
    title: {
      en: 'Enterprise Network Diagnostics Lab',
      'zh-sg': '企业级网络架构与系统实训机房',
      'ta-sg': 'நெட்வொர்க் & கணினி பயிற்சி அரங்கம்',
    },
    spec: {
      en: 'High-Speed LAN • Dual Display Workstations',
      'zh-sg': '高速局域网 • 双屏开发测试终端',
      'ta-sg': 'அதிவேக இணையம் • இரட்டைத் திரை கணினிகள்',
    },
    alt: 'IT computer lab with dual-monitor developer terminals and high-speed network testing environment',
  },
  {
    id: 'fac-exec-suite',
    src: '/images/business-classroom.jpg',
    tag: {
      en: 'Executive Seminar Suite',
      'zh-sg': '行政管理研讨讲堂',
      'ta-sg': 'வணிக மேலாண்மை கருத்தரங்கு அறை',
    },
    title: {
      en: 'Business & Management Seminar Room',
      'zh-sg': '战略商业案例研讨与管理学研讨室',
      'ta-sg': 'வணிக ஆய்வுகள் கருத்தரங்கு வகுப்பறை',
    },
    spec: {
      en: '14 Capacity • Modular Case Study Layout',
      'zh-sg': '核准容量14座 • 模块化研讨布局',
      'ta-sg': '14 கொள்ளளவு • நெகிழ்வான கலந்துரையாடல் மேசைகள்',
    },
    alt: 'Executive seminar suite with modular conference desks for business management lectures',
  },
  {
    id: 'fac-campus-hub',
    src: '/images/hero-campus.jpg',
    tag: {
      en: 'Central Campus Hub',
      'zh-sg': '新世界中心核心校区',
      'ta-sg': 'மைய வளாக வரவேற்பகம்',
    },
    title: {
      en: 'Student Advisory Foyer & Campus Entrance',
      'zh-sg': '学生迎新咨询大厅与行政接待中心',
      'ta-sg': 'மாணவர் ஆலோசனை மற்றும் வளாக நுழைவாயில்',
    },
    spec: {
      en: 'Jalan Besar MRT (3 mins walk) • Little India',
      'zh-sg': '惹兰勿刹地铁站步行3分钟 • 小印度商圈',
      'ta-sg': 'ஜலான் பெசார் MRT 3 நிமிட நடை • லிட்டில் இந்தியா',
    },
    alt: 'Edulearn International College campus entrance and collaborative student advisory lounge at New World Centre',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ locale, dict }) => {
  const shouldReduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide right-hand showcase every 4.5 seconds if reduced motion is disabled
  useEffect(() => {
    if (shouldReduceMotion) return;

    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_FACILITIES.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [shouldReduceMotion]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : MOTION_STAGGERS.normal,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : MOTION_DISTANCES.standard,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : MOTION_DURATIONS.gentle,
        ease: MOTION_EASINGS.decelerate,
      },
    },
  };

  const currentFacility = HERO_FACILITIES[activeSlide];

  return (
    <section
      aria-label="Edulearn Institutional Hero"
      className="relative bg-gradient-to-br from-[#1F0A47] via-[#2F1066] to-[#1A073D] text-white overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-18 lg:pt-14 lg:pb-20 border-b border-purple-900/60"
    >
      {/* Background Decorative Ambient Gradients and Texture */}
      <HeroBackgroundImage src="/images/hero-campus.jpg" opacity="opacity-25" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/3 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-3xl transform -translate-x-1/2" />
        <div className="absolute top-1/4 -right-24 w-[540px] h-[540px] bg-gold-400/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 w-[480px] h-[480px] bg-emerald-400/20 rounded-full blur-3xl" />
      </div>

      <Container size="default" className="relative z-10">
        {/* Top Split Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column: Refined Editorial Value Proposition & CTAs (7 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* 1. Statutory Registration Eyebrow Pill */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-gold-400/50 text-gold-300 text-xs font-semibold tracking-wider uppercase shadow-sm">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" aria-hidden="true" />
                <span className="truncate">{dict.hero.eyebrow}</span>
              </div>
            </motion.div>

            {/* 2. Primary Headline: Build Your Future Through Learning */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.25rem] font-serif font-bold text-white tracking-tight leading-[1.12]">
                {dict.hero.headlinePart1}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">
                  {dict.hero.headlineHighlight}
                </span>
                {dict.hero.headlinePart2 ? ` ${dict.hero.headlinePart2}` : ''}
              </h1>
            </motion.div>

            {/* 3. Short Supporting Editorial Paragraph */}
            <motion.div variants={itemVariants}>
              <p className="text-sm sm:text-base md:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {dict.hero.description}
              </p>
            </motion.div>

            {/* 4. Action CTAs */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5"
            >
              {/* Primary CTA: Explore Courses */}
              <Button
                href={`/${locale}/courses/`}
                variant="primary"
                size="lg"
                iconRight={<ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />}
                className="w-full sm:w-auto"
              >
                {dict.hero.ctaExploreCourses}
              </Button>

              {/* Secondary CTA: Speak to an Advisor */}
              <a
                href="https://wa.me/6590049657?text=Hello%20Edulearn%20Admissions%2C%20I%20would%20like%20to%20speak%20with%20an%20academic%20advisor%20regarding%20course%20enrolment."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 hover:border-gold-400/80 font-semibold text-base rounded-xl shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 backdrop-blur-sm"
                aria-label={`${dict.hero.ctaSpeakAdvisor} via WhatsApp (opens in new tab)`}
              >
                <Headphones className="w-4 h-4 text-gold-400 shrink-0" aria-hidden="true" />
                <span>{dict.hero.ctaSpeakAdvisor}</span>
              </a>

              {/* Quick Online Application */}
              <Link
                href={`/${locale}/apply/`}
                className="hidden xl:inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors font-medium border border-transparent hover:border-white/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
                <span>{dict.hero.ctaApplyNow}</span>
              </Link>
            </motion.div>

            {/* 5. Key Institutional Assurance Bar */}
            <motion.div
              variants={itemVariants}
              className="pt-4 border-t border-purple-800/60 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-4 text-xs text-slate-300"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span className="font-medium text-slate-200">2026/2027 Intakes Open</span>
              </div>
              <span className="text-purple-400/60 hidden sm:inline" aria-hidden="true">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
                <span>1:14 Student-Teacher Attention</span>
              </div>
              <span className="text-purple-400/60 hidden sm:inline" aria-hidden="true">•</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-300" aria-hidden="true" />
                <span>bizSAFE Level 3 Certified Campus</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Animated Auto-Moving Campus Facility Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none group">
              {/* Outer Decorative Ambient Glow */}
              <div
                className="absolute -inset-1.5 bg-gradient-to-r from-gold-500/25 via-purple-500/35 to-royal-500/30 rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition duration-500"
                aria-hidden="true"
              />

              {/* Main Animated Showcase Card */}
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-navy-900/80 backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden bg-navy-950">
                  <img
                    key={currentFacility.id}
                    src={currentFacility.src}
                    alt={currentFacility.alt}
                    width={1280}
                    height={720}
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover transition-all duration-700 ease-out transform scale-100 group-hover:scale-102"
                  />

                  {/* Dark gradient overlay for text readability */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/30 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Top Left: Facility Badge */}
                  <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
                    <div className="bg-navy-950/90 backdrop-blur-md border border-navy-700/90 rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" aria-hidden="true" />
                      <span className="text-[11px] font-semibold text-gold-300 font-sans tracking-wide">
                        {currentFacility.tag[locale] || currentFacility.tag.en}
                      </span>
                    </div>
                  </div>

                  {/* Top Right: Institutional Registration Badge */}
                  <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 hidden sm:block">
                    <div className="bg-navy-950/90 backdrop-blur-md border border-navy-700/90 rounded-xl px-2.5 py-1 shadow-lg text-[10px] font-mono font-semibold text-slate-300">
                      PEI: 201708935D
                    </div>
                  </div>

                  {/* Bottom Metric & Controls Card */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10">
                    <div className="bg-navy-950/95 backdrop-blur-md border border-navy-700/90 rounded-xl p-3.5 shadow-xl space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="text-xs sm:text-sm font-bold text-white font-serif truncate">
                            {currentFacility.title[locale] || currentFacility.title.en}
                          </h2>
                          <p className="text-[11px] text-slate-400 truncate">
                            {currentFacility.spec[locale] || currentFacility.spec.en}
                          </p>
                        </div>
                        <Link
                          href={`/${locale}/about/facilities/`}
                          className="shrink-0 text-xs font-semibold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1 group/link"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>

                      {/* Interactive Slide Selector Dots */}
                      <div className="pt-1.5 border-t border-navy-800 flex items-center justify-between">
                        <div className="flex items-center gap-1.5" role="tablist" aria-label="Campus Facilities">
                          {HERO_FACILITIES.map((fac, idx) => (
                            <button
                              key={fac.id}
                              type="button"
                              onClick={() => setActiveSlide(idx)}
                              role="tab"
                              aria-selected={activeSlide === idx}
                              aria-label={`Show ${fac.title.en}`}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                activeSlide === idx
                                  ? 'w-6 bg-gold-500'
                                  : 'w-2 bg-navy-700 hover:bg-slate-400'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          0{activeSlide + 1} / 0{HERO_FACILITIES.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Full-Width Continuous Auto-Moving Hero Image Marquee */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-navy-800/80">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-500"></span>
              </span>
              <span className="text-xs uppercase font-mono tracking-wider text-gold-400 font-bold">
                {locale === 'zh-sg'
                  ? '校园实景与教学设施全景导览'
                  : locale === 'ta-sg'
                  ? 'வளாக வசதிகள் & ஆய்வுக்கூட நேரலை காட்சிகள்'
                  : 'Campus Learning Facilities & Laboratory Suites'}
              </span>
            </div>

            {/* Accessible Marquee Pause/Play Control */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMarqueePaused((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-300 hover:text-white bg-navy-900/80 hover:bg-navy-800 border border-navy-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                aria-label={isMarqueePaused ? 'Resume auto-moving image marquee' : 'Pause auto-moving image marquee'}
              >
                {isMarqueePaused ? (
                  <>
                    <Play className="w-3 h-3 text-gold-400" aria-hidden="true" />
                    <span className="hidden sm:inline">Play</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3 text-gold-400" aria-hidden="true" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                )}
              </button>
              <Link
                href={`/${locale}/gallery/`}
                className="text-xs font-semibold text-slate-300 hover:text-gold-300 inline-flex items-center gap-1 transition-colors"
              >
                <span>{locale === 'zh-sg' ? '查看全部画廊' : locale === 'ta-sg' ? 'படத்தொகுப்பு' : 'Full Gallery'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Continuous Auto-Moving Image Track */}
          <div
            className="group relative flex overflow-x-hidden w-full select-none rounded-2xl"
            tabIndex={0}
            aria-label="Campus Facilities Image Showcase. Hover or focus to pause scrolling."
          >
            <div
              className={`flex shrink-0 items-center gap-4 sm:gap-6 py-2 ${
                isMarqueePaused
                  ? '[animation-play-state:paused]'
                  : 'animate-marquee group-hover:[animation-play-state:paused] group-focus:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]'
              }`}
            >
              {HERO_FACILITIES.concat(HERO_FACILITIES).map((facility, index) => (
                <Link
                  key={`${facility.id}-${index}`}
                  href={`/${locale}/about/facilities/`}
                  className="w-72 sm:w-80 shrink-0 rounded-2xl overflow-hidden bg-navy-900/85 backdrop-blur-md border border-white/15 hover:border-gold-400/70 shadow-xl group/item transition-all duration-200 transform hover:-translate-y-1 block"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy-950">
                    <img
                      src={facility.src}
                      alt={facility.alt}
                      className="w-full h-full object-cover transform group-hover/item:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-lg bg-navy-950/90 backdrop-blur-md text-[10px] font-semibold text-gold-300 border border-white/15">
                        {facility.tag[locale] || facility.tag.en}
                      </span>
                    </div>
                  </div>
                  <div className="p-3.5 space-y-1 bg-navy-900/90">
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-white group-hover/item:text-gold-300 transition-colors truncate">
                      {facility.title[locale] || facility.title.en}
                    </h3>
                    <p className="text-[11px] text-slate-300 font-sans truncate">
                      {facility.spec[locale] || facility.spec.en}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
