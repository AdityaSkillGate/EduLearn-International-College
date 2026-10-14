import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { Container, SectionHeading, Badge, Breadcrumbs, Button, HeroBackgroundImage } from '@/components/ui';
import { FacilitySpecCard, FacilitySpec } from '@/components/facilities/FacilitySpecCard';
import { FacilityGallery } from '@/components/facilities/FacilityGallery';
import {
  Building2,
  MapPin,
  Clock,
  Train,
  Bus,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Phone,
  MessageCircle,
  ArrowRight,
  Sparkles,
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

  const titles: Record<Locale, string> = {
    en: 'Campus Facilities & Specifications | Edulearn International College Singapore',
    'zh-sg': '校区设施与课室规划 | 新加坡爱学习国际学院',
    'ta-sg': 'வளாக வசதிகள் மற்றும் விவரங்கள் | எடுலெர்ன் கல்லூரி சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Explore verified classroom facilities, floor plan specifications, 1:14 teacher ratios, and directions to New World Centre campus in Little India.',
    'zh-sg': '探索小印度新世界中心校区经CPE核准的课室规格、23m²与22m²教学空间、1:14师生比及交通指引。',
    'ta-sg': 'லிட்டில் இந்தியா வளாகத்தின் அங்கீகரிக்கப்பட்ட வகுப்பறை வசதிகள், 1:14 ஆசிரியர் விகிதம் மற்றும் போக்குவரத்து வழிகாட்டல்.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/about/facilities/`,
      languages: {
        en: '/en/about/facilities/',
        'zh-sg': '/zh-sg/about/facilities/',
        'ta-sg': '/ta-sg/about/facilities/',
        'x-default': '/en/about/facilities/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/about/facilities/`,
      siteName: SITE_NAME,
      locale: getOgLocale(locale),
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/images/classroom-facilities.jpg`,
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
      images: [`${SITE_URL}/images/classroom-facilities.jpg`],
    },
  };
}

export default async function CampusFacilitiesPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: dict.nav.about, path: `/${locale}/about/` },
      { name: dict.nav.sub.facilities },
    ],
    locale
  );

  // Verified facilities data from audited source of truth
  const facilitySpecs: FacilitySpec[] = [
    {
      id: '01',
      name: 'Classroom 1 (Main Lecture Hall)',
      nameZh: '课室 1（主教学厅）',
      nameTa: 'வகுப்பறை 1 (முதன்மை விரிவுரை அரங்கம்)',
      type: 'Lecture & Practical Lab',
      areaSqm: 23,
      capacityStudents: 15,
      ratio: '1:14 (CPE Approved Max 1:15)',
      badgeColor: 'navy',
      description: {
        en: 'Primary instructional hall configured for interactive seminars, engineering drawing, and computer tutorials.',
        'zh-sg': '主授课大厅，专为工程制图、互动研讨及电脑实训教学配置，视野宽敞，光线充沛。',
        'ta-sg': 'பொறியியல் வரைபடம் மற்றும் கணினி பயிற்சிகளுக்கான முதன்மை விரிவுரை கூடம்.',
      },
      features: {
        en: [
          'High-definition multimedia digital projector & motorized screen',
          'Magnetic presentation whiteboard & marker suite',
          '15 individual ergonomic student desks & seating',
          'High-speed Wi-Fi & charging points for technical laptops',
          'SCDF-approved emergency egress & fire safety sensors',
        ],
        'zh-sg': [
          '高清多媒体数码投影机与电动投影幕布',
          '大型磁性教学演示白板与书写设备',
          '15套独立人体工学学生课桌椅',
          '高速无线网络与笔记本电脑充电接口',
          '新加坡民防部队（SCDF）认证消防逃生安全指示与烟感喷淋系统',
        ],
        'ta-sg': [
          'உயர் தெளிவுத்திறன் கொண்ட டிஜிட்டல் ப்ரொஜெக்டர்',
          'காந்த ஒயிட்போர்டு மற்றும் குறிப்பு பலகை',
          '15 தனிநபர் பணி மேசைகள் மற்றும் நாற்காலிகள்',
          'அதிவேக வைஃபை இணைப்பு வசதி',
          'தீயணைப்பு மற்றும் அவசரகால பாதுகாப்பு உபகரணங்கள்',
        ],
      },
    },
    {
      id: '02',
      name: 'Classroom 2 (Executive Seminar Room)',
      nameZh: '课室 2（行政研讨室）',
      nameTa: 'வகுப்பறை 2 (நிர்வாக கருத்தரங்கு அறை)',
      type: 'Seminar & Case Study Room',
      areaSqm: 22,
      capacityStudents: 14,
      ratio: '1:14 (Strict Operational Standard)',
      badgeColor: 'gold',
      description: {
        en: 'Specialized seminar room dedicated to postgraduate case studies, healthcare workshops, and group presentations.',
        'zh-sg': '专业研讨课室，用于研究生文凭案例分析、商业管理小组汇报及专业护理实务演示。',
        'ta-sg': 'முதுகலை வணிக ஆய்வுகள் மற்றும் சுகாதார மேலாண்மை பயிற்சிகளுக்கான அறை.',
      },
      features: {
        en: [
          'Ceiling-mounted multimedia projection & audio suite',
          'Interactive discussion tables configured for collaborative group work',
          '14 ergonomic seminar chairs with writing surfaces',
          'Dedicated reference textbook & standards library shelf',
          'Individual climate-controlled air-conditioning system',
        ],
        'zh-sg': [
          '吊顶式多媒体高清投影及多声道音频播放系统',
          '支持小组协同研讨与案例推演的互动课桌布局',
          '14套专业行政研讨写字椅',
          '常备专业参考书籍与工程法定标准工具书专架',
          '独立温控大功率冷暖空调循环系统',
        ],
        'ta-sg': [
          'உயர்தர ப்ரொஜெக்டர் மற்றும் ஒலி அமைப்பு',
          'குழு விவாதங்களுக்கான மேசை கட்டமைப்பு',
          '14 வசதியான கருத்தரங்கு நாற்காலிகள்',
          'பாட குறிப்பு புத்தக அலமாரி',
          'தனிநபர் குளிர்சாதன கட்டுப்பாட்டு அமைப்பு',
        ],
      },
    },
    {
      id: '03',
      name: 'Administrative Office & Student Services',
      nameZh: '学院行政总务办公室与学生中心',
      nameTa: 'நிர்வாக அலுவலகம் & மாணவர் மையம்',
      type: 'Administration & Archives',
      areaSqm: 9,
      capacityStudents: 4,
      ratio: 'Staff Operations',
      badgeColor: 'neutral',
      description: {
        en: 'Secure administrative operations suite dedicated to student admissions, confidential student archives, and counseling.',
        'zh-sg': '行政运营与学生服务专区，负责新生入学核验、学籍档案机密归档及学业咨询。',
        'ta-sg': 'மாணவர் சேர்க்கை மற்றும் கல்வி ஆலோசனைக்கான நிர்வாக அலுவலகம்.',
      },
      features: {
        en: [
          'Confidential student record fireproof filing safes',
          'Admissions consultation counters & fee payment processing',
          'Official PEI certificate verification terminal',
          'Management & Academic Board administrative workstations',
        ],
        'zh-sg': [
          '学生机密档案防火防潮专用保险柜',
          '招生咨询接待台与CPE标准学费支付结算终端',
          '学院官方毕业文凭线上验证系统处理工位',
          '学院管理层与学术委员会行政处理办公区',
        ],
        'ta-sg': [
          'மாணவர் ஆவணங்களுக்கான பாதுகாப்பு பெட்டகங்கள்',
          'சேர்க்கை ஆலோசனை மற்றும் கட்டண கவுண்டர்',
          'சான்றிதழ் சரிபார்ப்பு முனையம்',
          'நிர்வாக அலுவலர்களுக்கான பணி மேசைகள்',
        ],
      },
    },
    {
      id: '04',
      name: 'Main Reception & Entrance Foyer',
      nameZh: '校区主入口接待大厅与公示区',
      nameTa: 'முக்கிய வரவேற்பு மற்றும் தகவல் மையம்',
      type: 'Reception & Student Notice Hub',
      areaSqm: 12,
      capacityStudents: 6,
      ratio: 'General Access',
      badgeColor: 'navy',
      description: {
        en: 'Primary campus entrance at #02-28 New World Centre, welcoming visitors, students, and invigilators.',
        'zh-sg': '位于新世界中心2楼#02-28的学院正门迎宾前厅，公示最新官方合规证书与学生通知。',
        'ta-sg': 'வளாகத்தின் பிரதான நுழைவு வாயில் மற்றும் தகவல் அறிவிப்பு பலகை.',
      },
      features: {
        en: [
          'Official CPE Registration Certificate (201708935D) framed display',
          'bizSAFE Level 3 Safety Certification plaque',
          'Student notice board with examination timetables & regulatory notices',
          'Visitor waiting seating area & brochure information desk',
        ],
        'zh-sg': [
          '私立教育理事会（CPE）办学执照（201708935D）官方镜框公示',
          '新加坡工作场所安全与卫生理事会bizSAFE Level 3铜牌展示',
          '学生综合公告栏（张贴考试时间表、学籍管理守则及退费规定）',
          '访客等候休息专座与官方招生简章陈列架',
        ],
        'ta-sg': [
          'அதிகாரப்பூர்வ CPE பதிவு சான்றிதழ் காட்சி பலகை',
          'bizSAFE நிலை 3 பாதுகாப்பு சான்றிதழ் பலகை',
          'தேர்வு அட்டவணை மற்றும் அறிவிப்பு பலகை',
          'பார்வையாளர்கள் காத்திருப்பு பகுதி',
        ],
      },
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <JsonLd data={breadcrumbSchema} />
      {/* 1. Header Hero */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white py-14 lg:py-20 relative overflow-hidden">
        <HeroBackgroundImage
          src="/images/classroom-facilities.jpg"
          alt="EduLearn Singapore Campus Facilities"
          opacity="opacity-30"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <Container size="default" className="relative z-10">
          <Breadcrumbs
            homeHref={`/${locale}`}
            items={[
              { label: dict.nav.home, href: `/${locale}` },
              { label: dict.nav.about, href: `/${locale}/about` },
              { label: locale === 'zh-sg' ? '校区设施' : locale === 'ta-sg' ? 'வளாக வசதிகள்' : 'Campus Facilities' },
            ]}
            className="mb-8 text-white/70"
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {locale === 'zh-sg'
                  ? '官方核准校区规划'
                  : locale === 'ta-sg'
                  ? 'அங்கீகரிக்கப்பட்ட வளாக விவரங்கள்'
                  : 'Verified Campus Specifications'}
              </span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              {locale === 'zh-sg'
                ? '校区设施与课室规划'
                : locale === 'ta-sg'
                ? 'வளாக வசதிகள் மற்றும் விவரங்கள்'
                : 'Campus Facilities & Specifications'}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light pt-2">
              {locale === 'zh-sg'
                ? '坐落于新加坡小印度核心区新世界中心（New World Centre #02-28），严格依照新加坡私立教育理事会（CPE）标准建立。小班制精品教学，配备现代化多媒体教学设备与舒适空调环境。'
                : locale === 'ta-sg'
                ? 'சிங்கப்பூர் லிட்டில் இந்தியா நியூ வேர்ல்ட் சென்டரில் அமைந்துள்ள நவீன குளிர்சாதன வசதியுடன் கூடிய வகுப்பறைகள் மற்றும் ஆய்வகங்கள்.'
                : 'Located at 1 Jalan Berseh, #02-28 New World Centre, Singapore 209037. Fully compliant with Singapore CPE premises registration, offering intimate 1:14 teacher ratios across verified instructional suites.'}
            </p>

            {/* Statutory Key Facts */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>
                  {locale === 'zh-sg'
                    ? '课室 1：23 平方米（15人）'
                    : locale === 'ta-sg'
                    ? 'வகுப்பறை 1: 23 மீ² (15 நபர்கள்)'
                    : 'Classroom 1: 23 m² (15 pax)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>
                  {locale === 'zh-sg'
                    ? '课室 2：22 平方米（14人）'
                    : locale === 'ta-sg'
                    ? 'வகுப்பறை 2: 22 மீ² (14 நபர்கள்)'
                    : 'Classroom 2: 22 m² (14 pax)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>
                  {locale === 'zh-sg'
                    ? '最高师生比：1:14'
                    : locale === 'ta-sg'
                    ? 'அதிகபட்ச ஆசிரியர் விகிதம்: 1:14'
                    : 'Max Class Ratio: 1:14'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>
                  {locale === 'zh-sg'
                    ? 'bizSAFE Level 3 安全认证'
                    : locale === 'ta-sg'
                    ? 'bizSAFE நிலை 3 சான்றிதழ்'
                    : 'bizSAFE Level 3 Certified'}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main Content Container */}
      <Container size="default" className="pt-12 space-y-16">
        {/* Section 1: Verified Room Specifications Cards */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow={
              locale === 'zh-sg'
                ? '官方批准空间规划'
                : locale === 'ta-sg'
                ? 'அங்கீகரிக்கப்பட்ட இட ஒதுக்கீடு'
                : 'Approved Space Allocations'
            }
            title={
              locale === 'zh-sg'
                ? '经CPE审核批准的课室与办公区域'
                : locale === 'ta-sg'
                ? 'அங்கீகரிக்கப்பட்ட வகுப்பறை விவரங்கள்'
                : 'Floor Plan & Space Specifications'
            }
            subtitle={
              locale === 'zh-sg'
                ? '所有教学与行政区域均通过新加坡私立教育理事会及民防部队消防安全检验。'
                : locale === 'ta-sg'
                ? 'சிங்கப்பூர் CPE மற்றும் தீயணைப்பு பாதுகாப்பு விதிகளுக்கு உட்பட்ட வகுப்பறைகள்.'
                : 'Audited spatial dimensions, maximum permissible student capacities, and equipment inventories.'
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilitySpecs.map((spec) => (
              <FacilitySpecCard key={spec.id} spec={spec} locale={locale} />
            ))}
          </div>
        </section>

        {/* Section 2: Authentic Campus Photography Gallery */}
        <section className="space-y-6 pt-4 border-t border-slate-200">
          <SectionHeading
            eyebrow={
              locale === 'zh-sg'
                ? '实景校区巡览'
                : locale === 'ta-sg'
                ? 'வளாக பார்வை'
                : 'Visual Campus Tour'
            }
            title={
              locale === 'zh-sg'
                ? '校区实景与实训环境'
                : locale === 'ta-sg'
                ? 'வளாக புகைப்பட தொகுப்பு'
                : 'Campus Environment & Photo Gallery'
            }
            subtitle={
              locale === 'zh-sg'
                ? '真实记录新世界中心校区课室、工程实训台与电脑机房，小班教学专注互动。'
                : locale === 'ta-sg'
                ? 'வகுப்பறைகள், ஆய்வகங்கள் மற்றும் கற்றல் சூழலின் நேரடி புகைப்படங்கள்.'
                : 'Authentic photographs of our New World Centre classrooms, engineering workstations, and computing suites.'
            }
          />

          <FacilityGallery locale={locale} />
        </section>

        {/* Section 3: Location, Public Transport & Getting Here */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">
              {locale === 'zh-sg'
                ? '交通指引与公共路线'
                : locale === 'ta-sg'
                ? 'போக்குவரத்து வழிகாட்டல்'
                : 'Directions & Public Transit'}
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy-950 mt-1">
              {locale === 'zh-sg'
                ? '校区地理位置与公共交通指引'
                : locale === 'ta-sg'
                ? 'இருப்பிடம் மற்றும் போக்குவரத்து'
                : 'Campus Location & Getting Here'}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl">
              {locale === 'zh-sg'
                ? '坐落于新加坡市中心富有活力的多元文化商圈小印度，毗邻三条主要地铁干线及多条公共巴士线路，交通极为便利。'
                : locale === 'ta-sg'
                ? 'சிங்கப்பூர் லிட்டில் இந்தியா பகுதியில் அமைந்துள்ள எங்கள் வளாகத்தை மூன்று முக்கிய MRT பாதைகள் மற்றும் பேருந்துகள் மூலம் எளிதாக அடையலாம்.'
                : 'Situated in central Singapore within the vibrant Little India cultural and commercial district, accessible via three major MRT lines and numerous public bus routes.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Address & Hours */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-navy-900 text-gold-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-950 text-sm">
                    {locale === 'zh-sg' ? '校区法定地址' : locale === 'ta-sg' ? 'வளாக முகவரி' : 'Campus Address'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {locale === 'zh-sg' ? '小印度总校址' : locale === 'ta-sg' ? 'லிட்டில் இந்தியா தலைமை வளாகம்' : 'Little India Head Office'}
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-700 space-y-1 leading-relaxed">
                <p className="font-semibold text-navy-900">
                  {locale === 'zh-sg' ? '新加坡爱学习国际学院' : locale === 'ta-sg' ? 'எடுலெர்ன் சர்வதேச கல்லூரி' : 'Edulearn International College'}
                </p>
                <p>1 Jalan Berseh, #02-28 New World Centre</p>
                <p>Singapore 209037</p>
                <p className="text-slate-500 pt-1 italic">
                  {locale === 'zh-sg'
                    ? '地标：正对惹兰勿刹熟食中心（Jalan Berseh Food Centre）'
                    : locale === 'ta-sg'
                    ? 'அடையாளம்: ஜாலான் பெர்சே உணவு மையத்திற்கு எதிரில்'
                    : 'Landmark: Directly opposite Jalan Berseh Food Centre'}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-2 font-medium text-navy-900">
                  <Clock className="w-3.5 h-3.5 text-gold-600" />
                  <span>
                    {locale === 'zh-sg' ? '营业与接待时间' : locale === 'ta-sg' ? 'இயங்கும் நேரம்' : 'Operating Hours'}
                  </span>
                </div>
                <p>
                  {locale === 'zh-sg'
                    ? '周一至周六：上午10:00 至 晚上7:00'
                    : locale === 'ta-sg'
                    ? 'திங்கள் – சனி: காலை 10:00 – மாலை 7:00'
                    : 'Monday – Saturday: 10:00 AM – 7:00 PM'}
                </p>
                <p className="text-slate-500 text-[11px]">
                  {locale === 'zh-sg'
                    ? '周日及新加坡法定公休日休息'
                    : locale === 'ta-sg'
                    ? 'ஞாயிறு மற்றும் பொது விடுமுறை நாட்களில் விடுமுறை'
                    : 'Closed on Sundays & Singapore Public Holidays'}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=New+World+Centre+1+Jalan+Berseh+Singapore+209037"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-gold-700 hover:underline"
                >
                  <span>
                    {locale === 'zh-sg'
                      ? '在谷歌地图中打开导航'
                      : locale === 'ta-sg'
                      ? 'கூகிள் வரைபடத்தில் பார்க்கவும்'
                      : 'Open in Google Maps'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* MRT Transit */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-900 text-emerald-300 flex items-center justify-center shrink-0">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-950 text-sm">
                    {locale === 'zh-sg' ? '乘坐地铁（MRT）' : locale === 'ta-sg' ? 'MRT ரயில் மூலம்' : 'By MRT (Train)'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {locale === 'zh-sg' ? '周边三条地铁线路' : locale === 'ta-sg' ? 'அருகிலுள்ள 3 MRT பாதைகள்' : '3 Nearby MRT Lines'}
                  </p>
                </div>
              </div>

              <ul className="text-xs text-slate-700 space-y-3 leading-relaxed">
                <li className="space-y-0.5">
                  <strong className="text-navy-900 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    {locale === 'zh-sg'
                      ? '惹兰勿刹站 (DT22)'
                      : locale === 'ta-sg'
                      ? 'ஜாலான் பெசார் (DT22)'
                      : 'Jalan Besar MRT (DT22)'}
                  </strong>
                  <p className="text-slate-600">
                    {locale === 'zh-sg'
                      ? '滨海市区线（蓝线）— B出口。步行约3分钟（有遮阳棚，约250米）。'
                      : locale === 'ta-sg'
                      ? 'டவுன்டவுன் பாதை — வெளியேறு B. சுமார் 3 நிமிட நடைபயணம் (250 மீ).'
                      : 'Downtown Line — Exit B. Approx. 3-minute sheltered walk (250m).'}
                  </p>
                </li>
                <li className="space-y-0.5">
                  <strong className="text-navy-900 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    {locale === 'zh-sg'
                      ? '花拉公园站 (NE8)'
                      : locale === 'ta-sg'
                      ? 'ஃபேரர் பார்க் (NE8)'
                      : 'Farrer Park MRT (NE8)'}
                  </strong>
                  <p className="text-slate-600">
                    {locale === 'zh-sg'
                      ? '东北线（紫线）— G出口。步行约7分钟（约550米）。'
                      : locale === 'ta-sg'
                      ? 'வடகிழக்கு பாதை — வெளியேறு G. சுமார் 7 நிமிட நடைபயணம் (550 மீ).'
                      : 'North East Line — Exit G. Approx. 7-minute walk (550m).'}
                  </p>
                </li>
                <li className="space-y-0.5">
                  <strong className="text-navy-900 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    {locale === 'zh-sg'
                      ? '劳明达站 (EW11)'
                      : locale === 'ta-sg'
                      ? 'லாவெண்டர் (EW11)'
                      : 'Lavender MRT (EW11)'}
                  </strong>
                  <p className="text-slate-600">
                    {locale === 'zh-sg'
                      ? '东西线（绿线）— B出口。步行约10分钟。'
                      : locale === 'ta-sg'
                      ? 'கிழக்கு மேற்கு பாதை — வெளியேறு B. சுமார் 10 நிமிட நடைபயணம்.'
                      : 'East West Line — Exit B. Approx. 10-minute walk.'}
                  </p>
                </li>
              </ul>
            </div>

            {/* Bus Transit */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-navy-900 text-gold-400 flex items-center justify-center shrink-0">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-950 text-sm">
                    {locale === 'zh-sg' ? '乘坐公共巴士' : locale === 'ta-sg' ? 'பேருந்து மூலம்' : 'By Public Bus'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {locale === 'zh-sg' ? '校区楼下直达站台' : locale === 'ta-sg' ? 'அருகிலுள்ள பேருந்து நிறுத்தங்கள்' : 'Direct Doorstep Stops'}
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
                <div>
                  <strong className="text-navy-900 font-semibold block mb-1">
                    {locale === 'zh-sg'
                      ? '惹兰勿刹巴士站 (ID: 07419)：'
                      : locale === 'ta-sg'
                      ? 'ஜாலான் பெர்சே பேருந்து நிறுத்தம் (ID: 07419):'
                      : 'Jalan Berseh Bus Stop (ID: 07419):'}
                  </strong>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['23', '64', '65', '66', '67', '130', '139', '147', '857'].map((bus) => (
                      <span key={bus} className="px-2 py-0.5 rounded bg-white border border-slate-300 font-mono text-[11px] font-bold text-navy-950">
                        {bus}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-slate-600 space-y-1">
                  <strong className="text-navy-900 font-semibold block">
                    {locale === 'zh-sg'
                      ? '惹兰勿刹大厦巴士站：'
                      : locale === 'ta-sg'
                      ? 'ஜாலான் பெசார் வளாக நிறுத்தம்:'
                      : 'Jalan Besar Complex Stop:'}
                  </strong>
                  <p>
                    {locale === 'zh-sg'
                      ? '公共巴士 21、125、130、139、141、147 停靠于步行2分钟生活圈内。'
                      : locale === 'ta-sg'
                      ? 'பேருந்துகள் 21, 125, 130, 139, 141, 147 ஆகியவை 2 நிமிட தூரத்தில் நிற்கும்.'
                      : 'Buses 21, 125, 130, 139, 141, 147 stop within 2-minute walking radius.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Safety & Workplace Health Compliance (bizSAFE Level 3) */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">
                {locale === 'zh-sg'
                  ? '新加坡工作场所安全与卫生理事会'
                  : locale === 'ta-sg'
                  ? 'பணியிட பாதுகாப்பு மற்றும் சுகாதார கவுன்சில்'
                  : 'Workplace Safety & Health Council'}
              </span>
              <h2 className="font-heading font-bold text-2xl text-white mt-1">
                {locale === 'zh-sg'
                  ? 'bizSAFE Level 3 认证健康安全校园'
                  : locale === 'ta-sg'
                  ? 'bizSAFE நிலை 3 சான்றிதழ் பெற்ற வளாகம்'
                  : 'bizSAFE Level 3 Certified Campus'}
              </h2>
            </div>
            <Badge variant="gold">
              {locale === 'zh-sg'
                ? '经合规审计认证'
                : locale === 'ta-sg'
                ? 'தணிக்கை சான்றளிக்கப்பட்டது'
                : 'Audit Certified'}
            </Badge>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
            {locale === 'zh-sg'
              ? '学院严格执行新加坡人力部（MOM）发布的工作场所安全与卫生（WSH）规范。新世界中心校区设立了经过民防部队（SCDF）审核的紧急逃生通道，配备合格消防设施，实施日常安全演练与人体工学教学环境。'
              : locale === 'ta-sg'
              ? 'மனிதவள அமைச்சகத்தின் (MOM) பணியிட பாதுகாப்பு மற்றும் சுகாதார விதிகளுக்கு உட்பட்டு, SCDF தீ பாதுகாப்பு வழிகாட்டுதல்கள் மற்றும் அவசரகால பாதுகாப்பு வசதிகளுடன் வளாகம் இயங்குகிறது.'
              : 'EIC adheres to comprehensive Workplace Safety and Health (WSH) standards established by the Ministry of Manpower (MOM). Our New World Centre facilities feature certified emergency escape routes, regular fire drills, SCDF-compliant fire extinguishers, ergonomic student seating, and strict equipment safety protocols.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">
                  {locale === 'zh-sg'
                    ? '民防部队SCDF消防安全合规'
                    : locale === 'ta-sg'
                    ? 'SCDF தீயணைப்பு பாதுகாப்பு விதிமுறை'
                    : 'SCDF Fire Code Compliant'}
                </strong>
                <span className="text-[11px] text-slate-400">
                  {locale === 'zh-sg'
                    ? '定期检测火警报警装置、应急照明逃生标识及保持通畅的安全走廊。'
                    : locale === 'ta-sg'
                    ? 'பராமரிக்கப்படும் தீ எச்சரிக்கை அமைப்புகள் மற்றும் வெளியேறும் வழிகள்.'
                    : 'Maintained fire alarms, illuminated exit signs & clear corridors.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">
                  {locale === 'zh-sg'
                    ? '应急急救与风险评估体系'
                    : locale === 'ta-sg'
                    ? 'முதலுதவி மற்றும் இடர் மதிப்பீடு'
                    : 'First Aid & Risk Assessment'}
                </strong>
                <span className="text-[11px] text-slate-400">
                  {locale === 'zh-sg'
                    ? '常驻急救受训人员，校内配备经定期核验的急救医疗药箱。'
                    : locale === 'ta-sg'
                    ? 'பயிற்சி பெற்ற பணியாளர்கள் மற்றும் அவசர மருத்துவ பெட்டகங்கள்.'
                    : 'Trained staff on campus with verified emergency medical kits.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">
                  {locale === 'zh-sg'
                    ? '每日温控巡检与高标准卫生保洁'
                    : locale === 'ta-sg'
                    ? 'தினசரி சுகாதாரம் மற்றும் பராமரிப்பு'
                    : 'Daily Climate & Hygiene Maintenance'}
                </strong>
                <span className="text-[11px] text-slate-400">
                  {locale === 'zh-sg'
                    ? '空气滤网定期深度清洗消毒，课室区域每日专人打扫消杀。'
                    : locale === 'ta-sg'
                    ? 'வழக்கமான காற்று வடிகட்டி தூய்மைப்படுத்தல் மற்றும் தினசரி பராமரிப்பு.'
                    : 'Regular air filter sanitization and daily facility upkeep.'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Campus Visit Booking CTA */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-950 rounded-2xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">
                {locale === 'zh-sg'
                  ? '预约实地参访'
                  : locale === 'ta-sg'
                  ? 'நேரடி வளாக பார்வை'
                  : 'Personal Campus Tour'}
              </span>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mt-1">
                {locale === 'zh-sg'
                  ? '亲临体验爱学习优质教学环境'
                  : locale === 'ta-sg'
                  ? 'எங்கள் கற்றல் சூழலை நேரில் அனுபவியுங்கள்'
                  : 'Experience Our Learning Environment in Person'}
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-2xl">
                {locale === 'zh-sg'
                  ? '我们真诚欢迎广大学员、家长及企业雇主预约参访新世界中心校区。亲身感受课室设施、查阅官方课程指南，并与教学教务老师面对面交流。'
                  : locale === 'ta-sg'
                  ? 'மாணவர்கள் மற்றும் பெற்றோர்கள் எங்கள் வளாகத்தை நேரில் பார்வையிட வரவேற்கிறோம். வகுப்பறை வசதிகளை பார்வையிட்டு சேர்க்கை விவரங்களை அறியவும்.'
                  : 'We invite prospective students, parents, and employer sponsors to visit our New World Centre campus. Meet our academic team, inspect classroom equipment, and review official course prospectuses.'}
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300">
                <a href="tel:+6590049657" className="inline-flex items-center gap-1.5 hover:text-white">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>+65 9004 9657 / +65 9641 0630</span>
                </a>
                <a
                  href="https://wa.me/6590049657?text=Hi%20Edulearn,%20I%20would%20like%20to%20book%20a%20campus%20visit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>
                    {locale === 'zh-sg'
                      ? 'WhatsApp 在线预约参访'
                      : locale === 'ta-sg'
                      ? 'WhatsApp: வளாக பார்வை முன்பதிவு'
                      : 'WhatsApp: Book Campus Visit'}
                  </span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold rounded-xl text-sm transition-all shadow-md text-center"
              >
                <span>
                  {locale === 'zh-sg'
                    ? '在线预约参访时段'
                    : locale === 'ta-sg'
                    ? 'வளாக வருகை முன்பதிவு'
                    : 'Book Campus Appointment'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-sm transition-colors text-center border border-white/20"
              >
                {locale === 'zh-sg'
                  ? '学院办学概况'
                  : locale === 'ta-sg'
                  ? 'கல்லூரி கண்ணோட்டம்'
                  : 'About College Overview'}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
