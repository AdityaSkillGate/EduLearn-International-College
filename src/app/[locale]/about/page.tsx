import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { Container, SectionHeading, Badge, Breadcrumbs, Button, HeroBackgroundImage } from '@/components/ui';
import {
  ShieldCheck,
  Award,
  Building2,
  Users,
  Compass,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  MapPin,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  FileText,
  GraduationCap,
  Scale,
} from 'lucide-react';

import { JsonLd } from '@/components/seo';
import {
  generateOrganizationSchema,
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
    en: 'About College (Institutional Profile) | Edulearn International College Singapore',
    'zh-sg': '关于学院（正规办学概况） | 新加坡爱学习国际学院',
    'ta-sg': 'கல்லூரி பற்றி | எடுலெர்ன் கல்லூரி சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Learn about Edulearn International College Singapore, our CPE registration (201708935D), academic mission, core values, leadership, and campus.',
    'zh-sg': '深入了解新加坡爱学习国际学院（PEI注册号：201708935D）、办学愿景、使命、核心价值观、领导架构与校园环境。',
    'ta-sg': 'எடுலெர்ன் சர்வதேச கல்லூரி, CPE பதிவு (201708935D), கல்வி பார்வை, தலைமை மற்றும் வளாகம் பற்றிய விவரங்கள்.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/about/`,
      languages: {
        en: '/en/about/',
        'zh-sg': '/zh-sg/about/',
        'ta-sg': '/ta-sg/about/',
        'x-default': '/en/about/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/about/`,
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

export default async function AboutPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const orgSchema = generateOrganizationSchema(locale);
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: dict.nav.about }], locale);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <JsonLd data={orgSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* 1. Hero Header Section */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white py-14 lg:py-20 relative overflow-hidden">
        <HeroBackgroundImage
          src="/images/hero-campus.jpg"
          alt="EduLearn International College Campus"
          opacity="opacity-30"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <Container size="default" className="relative z-10">
          <Breadcrumbs
            homeHref={`/${locale}`}
            items={[
              { label: dict.nav.home, href: `/${locale}` },
              { label: dict.nav.about },
            ]}
            className="mb-8 text-white/70"
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Institutional Profile</span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              {locale === 'zh-sg'
                ? '关于爱学习国际学院'
                : locale === 'ta-sg'
                ? 'எடுலெர்ன் சர்வதேச கல்லூரி பற்றி'
                : 'About Edulearn International College'}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light pt-2">
              {locale === 'zh-sg'
                ? '爱学习国际学院（Edulearn International College Pte. Ltd.，注册机构编号：201708935D）是经新加坡精深技能发展局（SSG）旗下私立教育理事会（CPE）严格核准注册的私立教育机构（PEI）。我们致力于为在新加坡发展的学员提供高质量的大专、高级大专及实用技能认证课程。'
                : locale === 'ta-sg'
                ? 'எடுலெர்ன் சர்வதேச கல்லூரி சிங்கப்பூரில் பதிவு செய்யப்பட்ட தனியார் கல்வி நிறுவனம் (PEI Reg No: 201708935D). மாணவர்களின் தொழில் முன்னேற்றத்திற்கான டிப்ளமோ மற்றும் சிறப்பு சான்றிதழ் படிப்புகளை வழங்குகிறோம்.'
                : 'Edulearn International College Pte. Ltd. (PEI Registration No: 201708935D) is a Private Education Institute (PEI) registered under the Committee for Private Education (CPE), operating under SkillsFuture Singapore (SSG) / Ministry of Education (MOE).'}
            </p>

            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{locale === 'zh-sg' ? '成立年份：2017' : locale === 'ta-sg' ? 'தொடங்கப்பட்டது: 2017' : 'Incorporated: 2017'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{locale === 'zh-sg' ? 'CPE 注册号：201708935D' : locale === 'ta-sg' ? 'CPE பதிவு எண்: 201708935D' : 'CPE Reg: 201708935D'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{locale === 'zh-sg' ? 'bizSAFE Level 3 安全认证' : locale === 'ta-sg' ? 'bizSAFE நிலை 3 சான்றளிக்கப்பட்டது' : 'bizSAFE Level 3 Certified'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{locale === 'zh-sg' ? '35 位在册授课教师' : locale === 'ta-sg' ? '35 பதிவு செய்யப்பட்ட ஆசிரியர்கள்' : '35 Deployed Faculty'}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main Content Sections */}
      <Container size="default" className="pt-14 space-y-16">
        {/* Section 1: Institutional Introduction & History */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">
                {locale === 'zh-sg' ? '学院概况与办学定位' : locale === 'ta-sg' ? 'நிறுவன கண்ணோட்டம்' : 'Institutional Overview'}
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy-950">
                {locale === 'zh-sg'
                  ? '立足新加坡，服务终身学习'
                  : locale === 'ta-sg'
                  ? 'வாழ்நாள் முழுவதும் தொடரும் கல்விப் பயணம்'
                  : 'Bridging Rigorous Academia with Real-World Industry Application'}
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                <blockquote className="border-l-4 border-gold-500 pl-4 py-1 italic font-serif text-navy-900 bg-gold-500/5 rounded-r">
                  {locale === 'zh-sg'
                    ? '“爱学习国际学院为立志在新加坡发展、提升职业竞争力及实现自我价值的学子提供优质的大专、高级大专及短期技能培训课程。”'
                    : locale === 'ta-sg'
                    ? '“சிங்கப்பூரில் வளர்ச்சி பெறவும், தங்களை மேம்படுத்திக் கொள்ளவும் விரும்பும் மாணவர்களுக்கு எடுலேர்ன் சர்வதேசக் கல்லூரி டிப்ளமோ, மேம்பட்ட டிப்ளமோ மற்றும் குறுகிய காலப் படிப்புகளை வழங்குகிறது.”'
                    : '“Edulearn International College provides private education services for Diploma, Advanced Diploma Programmes, and Short courses to students who wish to grow in Singapore and have a good career enhancement and upgrade themselves.”'}
                </blockquote>
                <p>
                  {locale === 'zh-sg'
                    ? '学院于 2017 年创立于新加坡市中心小印度，致力于为在职技术人员、管理督导及国际学者提供实用、严谨且受行业高度认可的技术进修路径。'
                    : locale === 'ta-sg'
                    ? '2017 இல் லிட்டில் இந்தியாவில் தொடங்கப்பட்ட எடுலேர்ன், தொழில்நுட்ப பணியாளர்கள் மற்றும் சர்வதேச மாணவர்களுக்கு நடைமுறை சார்ந்த கல்விப் பாதைகளை வழங்குகிறது.'
                    : 'Established in 2017 in the central district of Little India, Singapore, EIC was founded to provide practical, accessible, and structured technical pathways for working technicians, supervisory personnel, and international students seeking recognised credentials.'}
                </p>
                <p>
                  {locale === 'zh-sg'
                    ? '学院坐落于惹兰勿刹新世界中心，严格遵循新加坡私立教育理事会强化注册框架（ERF）要求，在工程技术、资讯科技及商业管理所有班级均实行 1:14 紧密师生比。'
                    : locale === 'ta-sg'
                    ? 'ஜலான் பெசார் நியூ வேர்ல்ட் சென்டரில் இயங்கும் கல்லூரி, 1:14 ஆசிரியர்-மாணவர் விகிதத்தை கண்டிப்பாகப் பின்பற்றுகிறது.'
                    : 'Operating at New World Centre on Jalan Berseh, the college maintains strict compliance with the Singapore Enhanced Registration Framework (ERF) and enforces maximum 1:14 teacher-to-student attention across all engineering, information technology, and business cohorts.'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-900">
                <Image
                  src="/images/hero-campus.jpg"
                  alt="Edulearn International College campus learning atmosphere"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white text-xs space-y-1">
                    <span className="font-semibold text-gold-300 block">
                      {locale === 'zh-sg' ? '小印度校区总务办公室' : locale === 'ta-sg' ? 'லிட்டில் இந்தியா வளாக அலுவலகம்' : 'Little India Campus Office'}
                    </span>
                    <span className="text-slate-300">1 Jalan Berseh, #02-28 New World Centre, Singapore 209037</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Vision, Mission & Core Values */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow={locale === 'zh-sg' ? '学院办学宗旨' : locale === 'ta-sg' ? 'நிறுவன நோக்கம்' : 'Institutional Purpose'}
            title={locale === 'zh-sg' ? '学院愿景、使命与核心价值观' : locale === 'ta-sg' ? 'பார்வை, நோக்கம் & தத்துவங்கள்' : 'Vision, Mission & Educational Philosophy'}
            subtitle={
              locale === 'zh-sg'
                ? '以卓越教学技术与严谨办学态度，引领学生开启永不停歇的终身学习之旅。'
                : locale === 'ta-sg'
                ? 'மாணவர்களை உலகளாவிய சிந்தனையுடன் எதிர்கால வாய்ப்புகளுக்கு தயார்படுத்துதல்.'
                : 'Guiding institutional declarations shaping our academic governance and student support in Singapore.'
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vision */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between border-t-4 border-t-gold-500">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-600 flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-navy-950">
                  {locale === 'zh-sg' ? '学院愿景' : locale === 'ta-sg' ? 'எங்கள் பார்வை' : 'Our Vision'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {locale === 'zh-sg'
                    ? '“通过卓越的教学技能与坚定的办学承诺，成长为提供优质教育的国际公认私立教育机构。”'
                    : locale === 'ta-sg'
                    ? '“சிறந்த கற்பித்தல் நுட்பங்கள் மற்றும் அர்ப்பணிப்பு மூலம் உயர்தர கல்வியை வழங்கும் சர்வதேச அங்கீகாரம் பெற்ற தனியார் கல்வி நிறுவனமாக மாறுதல்.”'
                    : '“To grow into an Internationally recognized Private Education institute providing superior Education through outstanding techniques and commitment.”'}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 font-medium">
                {locale === 'zh-sg' ? '国际公认与卓越教学标准' : locale === 'ta-sg' ? 'சர்வதேச அங்கீகாரம் & கற்பித்தல் சிறப்பு' : 'Global Recognition & Pedagogical Excellence'}
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between border-t-4 border-t-navy-900">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-navy-900/10 text-navy-900 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-navy-950">
                  {locale === 'zh-sg' ? '学院使命' : locale === 'ta-sg' ? 'எங்கள் நோக்கம்' : 'Our Mission'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {locale === 'zh-sg'
                    ? '“培养具备全球化视野的学生，从容应对未来的职场发展机遇。”'
                    : locale === 'ta-sg'
                    ? '“எதிர்கால வேலை வாய்ப்புகளை எதிர்கொள்ளும் வகையில் உலகளாவிய சிந்தனையுடன் மாணவர்களை தயார்படுத்துதல்.”'
                    : '“To prepare students with global mindset to tackle the future work opportunities.”'}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 font-medium">
                {locale === 'zh-sg' ? '适应时代变革与职场赋能' : locale === 'ta-sg' ? 'வேலைக்கான தயார்நிலை & மாற்றியமைக்கும் சிந்தனை' : 'Workforce Readiness & Adaptive Thinking'}
              </div>
            </div>

            {/* Core Values / Philosophy */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between border-t-4 border-t-amber-500">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-navy-950">
                  {locale === 'zh-sg' ? '核心教育哲学' : locale === 'ta-sg' ? 'முக்கிய கல்வித் தத்துவம்' : 'Core Philosophy'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif italic text-navy-900">
                  {locale === 'zh-sg'
                    ? '“EDUcation（教育）是一场永无止境的终身 LEARNing（学习）之旅……”'
                    : locale === 'ta-sg'
                    ? '“கல்வி என்பது ஒருபோதும் முடிவடையாத வாழ்நாள் கற்றல் பயணம்…”'
                    : '“EDUcation is a Lifelong LEARNing Journey which never ends…”'}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 font-medium">
                {locale === 'zh-sg' ? '持续自我突破与终身成长' : locale === 'ta-sg' ? 'தொடர்ச்சியான தனிப்பட்ட & தொழில்முறை வளர்ச்சி' : 'Continuous Personal & Professional Growth'}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Leadership & Governance Snapshot */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">
                {locale === 'zh-sg' ? '领导架构与治理体系' : locale === 'ta-sg' ? 'நிறுவன தலைமைத்துவம்' : 'Institutional Leadership'}
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy-950 mt-1">
                {locale === 'zh-sg' ? '学院管理层与学术委员会' : locale === 'ta-sg' ? 'கல்லூரி மேலாண்மை & கல்வி வாரியம்' : 'College Management & Academic Board'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                {locale === 'zh-sg'
                  ? '由在新加坡 CPE 正式注册、经验丰富的专业教育管理者统领办学。'
                  : locale === 'ta-sg'
                  ? 'சிங்கப்பூர் CPE விதிகளின் கீழ் பதிவு செய்யப்பட்ட அனுபவம் வாய்ந்த கல்வி நிர்வாகிகளால் வழிநடத்தப்படுகிறது.'
                  : 'Led by seasoned educational administrators registered under Singapore CPE requirements.'}
              </p>
            </div>

            <Link
              href={`/${locale}/governance/`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-gold-700 hover:underline shrink-0"
            >
              <span>{locale === 'zh-sg' ? '查看学术委员会与师资专页' : locale === 'ta-sg' ? 'முழு ஆளுமை பக்கம்' : 'View Full Governance & Faculty Page'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Manager 1 */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="navy">
                  {locale === 'zh-sg' ? '学院经理兼学术总监' : locale === 'ta-sg' ? 'மேலாளர் & கல்வித் தலைவர்' : 'Manager & Academic Lead'}
                </Badge>
                <span className="text-xs font-mono text-slate-500">
                  {locale === 'zh-sg' ? 'CPE 注册核准' : locale === 'ta-sg' ? 'CPE பதிவு செய்யப்பட்டது' : 'CPE Registered'}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-950">
                Mr. Sakkarapani Santhosh Kumar
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {locale === 'zh-sg'
                  ? '持有本地与国际高等管理硕士学位（人力资源管理与酒店管理），获得新加坡精深技能局高级培训与评估证书（ACTA）、共和理工学院应用教学专业文凭，以及新加坡理工学院成人与继续教育大专文凭。'
                  : locale === 'ta-sg'
                  ? 'மனித வள மேலாண்மை முதுகலை பட்டம் (MHRM), ACTA பயிற்சி சான்றிதழ் மற்றும் வயதுவந்தோர் கல்வி டிப்ளமோ பெற்றவர்.'
                  : 'Holds Master of Human Resource Management (Pondicherry University), Master of Science in Hotel Management, Advanced Certificate in Training and Assessment (ACTA), Specialist Diploma in Applied Learning and Teaching (Republic Polytechnic), and WSQ Diploma in Adult and Continuing Education (Singapore Polytechnic).'}
              </p>
            </div>

            {/* Manager 2 */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="gold">
                  {locale === 'zh-sg' ? '学院经理' : locale === 'ta-sg' ? 'கல்லூரி மேலாளர்' : 'College Manager'}
                </Badge>
                <span className="text-xs font-mono text-slate-500">
                  {locale === 'zh-sg' ? 'CPE 注册核准' : locale === 'ta-sg' ? 'CPE பதிவு செய்யப்பட்டது' : 'CPE Registered'}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-950">
                Ms. Muthiah Vanmathi
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {locale === 'zh-sg'
                  ? '毕业于新加坡南洋理工大学（NTU），持有工程学荣誉学士学位（信息工程与媒体）。专注于学院教学日常运营、课程质量保障体系及现代化数字教学系统建设。'
                  : locale === 'ta-sg'
                  ? 'சிங்கப்பூர் நன்யாங் தொழில்நுட்ப பல்கலைக்கழகத்தில் (NTU) பொறியியல் இளங்கலை பட்டம் பெற்றவர். கல்வி செயல்பாடுகள் மற்றும் பாடத்திட்ட தரத்தை மேற்பார்வையிடுகிறார்.'
                  : 'Holds Bachelor of Engineering (Information Engineering and Media) with Honours from Nanyang Technological University (NTU), Singapore. Specializes in academic operations, curriculum quality assurance, and digital learning systems.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-navy-50/60 border border-navy-100 flex items-center justify-between text-xs text-navy-950">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-navy-700" />
              <span>
                {locale === 'zh-sg'
                  ? '35 位官方注册教师配置于工程、计算机及管理专业。'
                  : locale === 'ta-sg'
                  ? 'பொறியியல், கணினி மற்றும் மேலாண்மைத் துறைகளில் 35 பதிவு செய்யப்பட்ட ஆசிரியர்கள்.'
                  : '35 Registered Educators deployed across engineering, IT, and management disciplines.'}
              </span>
            </div>
            <Link href={`/${locale}/governance/#faculty`} className="font-semibold text-navy-900 hover:underline">
              {locale === 'zh-sg' ? '查看教师详细任教部署 →' : locale === 'ta-sg' ? 'ஆசிரியர் பணி விவரங்களை ஆய்வு செய்க →' : 'Inspect Teacher Deployment →'}
            </Link>
          </div>
        </section>

        {/* Section 4: Campus Facilities Preview */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">
                {locale === 'zh-sg' ? '校区学习环境' : locale === 'ta-sg' ? 'கற்றல் சூழல்' : 'Learning Environment'}
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy-950 mt-1">
                {locale === 'zh-sg' ? '校区设施与小班教学环境' : locale === 'ta-sg' ? 'வளாக வசதிகள்' : 'New World Centre Campus Facilities'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                1 Jalan Berseh, #02-28 New World Centre, Singapore 209037.
              </p>
            </div>

            <Link
              href={`/${locale}/about/facilities/`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-gold-700 hover:underline shrink-0"
            >
              <span>{locale === 'zh-sg' ? '查看课室规划与实景图库' : locale === 'ta-sg' ? 'வளாக வசதிகள் பக்கம்' : 'View Full Facilities & Photo Gallery'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Classroom 1 summary */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white group shadow-xs">
              <div className="relative h-48 w-full bg-slate-900">
                <Image
                  src="/images/classroom-facilities.jpg"
                  alt="Classroom 1 at Edulearn International College"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="navy">
                    {locale === 'zh-sg' ? '1 号课室' : locale === 'ta-sg' ? 'வகுப்பறை 1' : 'Classroom 1'}
                  </Badge>
                  <span className="text-xs font-bold text-navy-950 font-mono">23 m² • 15 Pax</span>
                </div>
                <h4 className="font-heading font-bold text-base text-navy-900">
                  {locale === 'zh-sg' ? '主教学大厅' : locale === 'ta-sg' ? 'முதன்மை விரிவுரை அரங்கம்' : 'Main Lecture Hall'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {locale === 'zh-sg'
                    ? '专用于互动授课、工程技术辅导及多媒体教学演练。保持 1:14 实际运营师生比。'
                    : locale === 'ta-sg'
                    ? 'ஊடாடும் விரிவுரைகள், பொறியியல் பயிற்சிகள் மற்றும் மல்டிமீடியா விளக்கக்காட்சிகளுக்காக வடிவமைக்கப்பட்டது. 1:14 ஆசிரியர் விகிதம்.'
                    : 'Configured for interactive lectures, technical engineering tutorials, and multimedia presentations. 1:14 operational teacher-student ratio.'}
                </p>
              </div>
            </div>

            {/* Classroom 2 summary */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white group shadow-xs">
              <div className="relative h-48 w-full bg-slate-900">
                <Image
                  src="/images/business-classroom.jpg"
                  alt="Classroom 2 at Edulearn International College"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="gold">
                    {locale === 'zh-sg' ? '2 号课室' : locale === 'ta-sg' ? 'வகுப்பறை 2' : 'Classroom 2'}
                  </Badge>
                  <span className="text-xs font-bold text-navy-950 font-mono">22 m² • 14 Pax</span>
                </div>
                <h4 className="font-heading font-bold text-base text-navy-900">
                  {locale === 'zh-sg' ? '行政研讨课室' : locale === 'ta-sg' ? 'நிர்வாக கருத்தரங்கு அறை' : 'Executive Seminar Room'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {locale === 'zh-sg'
                    ? '用于协同案例分析、研究生专题讨论及商业管理实务工坊。配备独立温控空调系统。'
                    : locale === 'ta-sg'
                    ? 'குழு விவாதங்கள், முதுகலை ஆய்வுகள் மற்றும் வணிக மேலாண்மை பட்டறைகளுக்காக உருவாக்கப்பட்டது.'
                    : 'Tailored for collaborative group case studies, postgraduate discussions, and business management workshops. Individual climate-controlled air-conditioning.'}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 text-center">
            <Button
              href={`/${locale}/about/facilities/`}
              variant="royal"
              size="md"
              className="inline-flex items-center gap-2"
            >
              <span>{locale === 'zh-sg' ? '查阅完整校区设施与交通指引' : locale === 'ta-sg' ? 'வளாக வசதிகள் & போக்குவரத்து வழிகாட்டலை ஆராயுங்கள்' : 'Explore Dedicated Facilities & Transit Guide'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* Section 5: Statutory Trust & Consumer Protection */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">
                {locale === 'zh-sg' ? '法定合规监管' : locale === 'ta-sg' ? 'ஒழுங்குமுறை மேற்பார்வை' : 'Regulatory Oversight'}
              </span>
              <h2 className="font-heading font-bold text-2xl text-white mt-1">
                {locale === 'zh-sg' ? '消费者权益保障与 CPE 法定监管框架' : locale === 'ta-sg' ? 'நுகர்வோர் பாதுகாப்பு & CPE சட்டக் கட்டமைப்பு' : 'Consumer Protections & CPE Regulatory Framework'}
              </h2>
            </div>
            <Badge variant="gold">
              {locale === 'zh-sg' ? 'CPE 标准学生合同 4.1版' : locale === 'ta-sg' ? 'CPE நிலையான ஒப்பந்தம் v4.1' : 'CPE Standard Contract v4.1'}
            </Badge>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
            {locale === 'zh-sg'
              ? '依据新加坡《私立教育法案》，爱学习国际学院在收取任何学费前均严格签署标准学生合同（4.1 版），确保收费明细、录取要求及纠纷争议调解流程高度合规透明。'
              : locale === 'ta-sg'
              ? 'சிங்கப்பூர் தனியார் கல்விச் சட்டத்தின்படி, கட்டணம் வசூலிப்பதற்கு முன் நிலையான மாணவர் ஒப்பந்தம் (பதிப்பு 4.1) கையெழுத்திடப்படுகிறது.'
              : 'In full accordance with Singapore Private Education Act regulations, Edulearn executes the standard PEI-Student Contract (Version 4.1) prior to fee collection. We maintain full transparency in fee schedules, admissions requirements, and institutional dispute procedures.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
              <strong className="text-white block font-semibold">
                {locale === 'zh-sg' ? '7 天法定冷静期' : locale === 'ta-sg' ? '7 நாள் யோசனை காலம்' : '7-Day Cooling-Off Period'}
              </strong>
              <span className="text-[11px] text-slate-400 leading-relaxed block">
                {locale === 'zh-sg'
                  ? '依据 CPE 合同条款 3.8，学生在签署合同后 7 个工作日内书面申请解约，可获退还已缴全额学费。'
                  : locale === 'ta-sg'
                  ? 'ஒப்பந்தம் கையெழுத்தான 7 வேலை நாட்களுக்குள் ரத்து செய்யப்பட்டால் செலுத்தப்பட்ட கட்டணத்தில் 100% திரும்பப் பெறலாம்.'
                  : 'CPE Clause 3.8 grants 100% refund of fees paid if written notice of termination is served within 7 working days of contract signing.'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              <strong className="text-white block font-semibold">
                {locale === 'zh-sg' ? '争议纠纷调解机制' : locale === 'ta-sg' ? 'சர்ச்சை தீர்வு திட்டம்' : 'Dispute Resolution Scheme'}
              </strong>
              <span className="text-[11px] text-slate-400 leading-relaxed block">
                {locale === 'zh-sg'
                  ? '标准三级递进仲裁机制：学院内部调解 → 新加坡调解中心（SMC）→ 新加坡国际仲裁中心（SIAC）。'
                  : locale === 'ta-sg'
                  ? '3-அடுக்கு தீர்வு: உள்நாட்டு தீர்வு → சிங்கப்பூர் சமரச மையம் (SMC) → சிங்கப்பூர் சர்வதேச நடுவர் மையம் (SIAC).'
                  : 'Structured 3-tier escalation: Internal resolution → Singapore Mediation Centre (SMC) → Singapore International Arbitration Centre (SIAC).'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <Award className="w-5 h-5 text-blue-400" />
              <strong className="text-white block font-semibold">
                {locale === 'zh-sg' ? 'bizSAFE Level 3 安全标准' : locale === 'ta-sg' ? 'bizSAFE நிலை 3 தரநிலைகள்' : 'bizSAFE Level 3 Standards'}
              </strong>
              <span className="text-[11px] text-slate-400 leading-relaxed block">
                {locale === 'zh-sg'
                  ? '全校教学场地、学生桌椅设施及电气设备均通过国家级工作场所安全健康风险评估认证。'
                  : locale === 'ta-sg'
                  ? 'அனைத்து வளாக இடங்களிலும் சான்றளிக்கப்பட்ட இடர் மேலாண்மை நடைமுறைப்படுத்தப்பட்டுள்ளது.'
                  : 'Certified risk management implementation across all campus premises, student seating, and electrical apparatus.'}
              </span>
            </div>
          </div>
        </section>

        {/* Section 6: Consultation & Contact CTA Banner */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-950 rounded-2xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">
                {locale === 'zh-sg' ? '欢迎参访校区' : locale === 'ta-sg' ? 'எங்கள் வளாகத்தைப் பார்வையிடுங்கள்' : 'Visit Our Campus'}
              </span>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mt-1">
                {locale === 'zh-sg' ? '对在爱学习国际学院深造有疑问？' : locale === 'ta-sg' ? 'எடுலேர்னில் படிப்பது குறித்து கேள்விகள் உள்ளதா?' : 'Have Questions About Studying at Edulearn?'}
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-2xl">
                {locale === 'zh-sg'
                  ? '位于新世界中心的招生顾问团队周一至周六为您提供专属课程咨询、入学资质预审及报读办理指引。'
                  : locale === 'ta-sg'
                  ? 'எங்கள் கல்வி ஆலோசனைக் குழு தனிப்பயனாக்கப்பட்ட வழிகாட்டுதலை வழங்க திங்கள் முதல் சனி வரை தயாராக உள்ளது.'
                  : 'Our educational advisory team at New World Centre is available Monday through Saturday to provide personalized course guidance, evaluate entry criteria, and guide you through enrollment.'}
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300">
                <a href="tel:+6590049657" className="inline-flex items-center gap-1.5 hover:text-white">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>+65 9004 9657 / +65 9641 0630</span>
                </a>
                <a
                  href="https://wa.me/6590049657?text=Hi%20Edulearn,%20I%20would%20like%20to%20enquire%20about%20your%20college%20programs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: +65 9004 9657</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href={`/${locale}/apply/`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold rounded-xl text-sm transition-all shadow-md text-center"
              >
                <span>{locale === 'zh-sg' ? '立即申请入学' : locale === 'ta-sg' ? 'சேர்க்கைக்கு விண்ணப்பிக்கவும்' : 'Apply for Admission'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/contact/`}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-sm transition-colors text-center border border-white/20"
              >
                {locale === 'zh-sg' ? '校区地理位置与办公室' : locale === 'ta-sg' ? 'வளாக இருப்பிடம் & அலுவலகம்' : 'Campus Location & Office'}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
