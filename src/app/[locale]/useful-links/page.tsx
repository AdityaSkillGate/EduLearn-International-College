import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { STATUTORY_EXTERNAL_LINKS, StatutoryExternalLink } from '@/data/studentResources';
import { Container, SectionHeading, Badge, Breadcrumbs, Card, CardHeader, CardTitle, CardDescription, CardContent, Button, HeroBackgroundImage } from '@/components/ui';
import {
  ExternalLink,
  ShieldCheck,
  Building2,
  Globe,
  Scale,
  BookOpen,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Phone,
  Mail,
  HardHat,
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
    en: 'Verified Statutory & Government Portals | Edulearn Singapore',
    'zh-sg': '新加坡官方政府机构与法定资源门户 | 爱尔莱国际学院',
    'ta-sg': 'அங்கீகரிக்கப்பட்ட அரசு & சட்டப்பூர்வ தளங்கள் | எடுலேர்ன் சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Direct access to verified Singapore government portals: SkillsFuture Singapore (SSG/CPE), TPGateway, ICA Student Pass, Ministry of Education (MOE), WSH Council, SMC, and SIArb.',
    'zh-sg': '直连新加坡官方政府与法定机构门户：精深技能局（SSG/CPE）、培训伙伴门户（TPGateway）、移民与关卡局（ICA）、教育部（MOE）、工作场所安全与卫生理事会（WSHC）及仲裁调解机构。',
    'ta-sg': 'சிங்கப்பூர் அரசு மற்றும் சட்டப்பூர்வ போர்டல்களின் நேரடி இணைப்புகள்: TPGateway, SSG/CPE, ICA மாணவர் பாஸ், கல்வி அமைச்சு, WSH கவுன்சில், மற்றும் SMC/SIArb.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/useful-links/`,
      languages: {
        en: '/en/useful-links/',
        'zh-sg': '/zh-sg/useful-links/',
        'ta-sg': '/ta-sg/useful-links/',
        'x-default': '/en/useful-links/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/useful-links/`,
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

export default async function UsefulLinksPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const categories = [
    {
      key: 'regulator',
      title: {
        en: 'Regulatory & Statutory Authorities',
        'zh-sg': '政府监管与法定教育机构',
        'ta-sg': 'ஒழுங்குமுறை & சட்டப்பூர்வ ஆணையங்கள்',
      },
      subtitle: {
        en: 'Primary regulatory bodies governing private education institutions, enhanced registration frameworks, and national skill credentials.',
        'zh-sg': '负责私立教育机构强化注册架构（ERF）、课程备案与国家技能资历框架的主管部门。',
        'ta-sg': 'தனியார் கல்வி நிறுவனங்கள் மற்றும் தேசியத் திறன் தகுதிகளை மேற்பார்வையிடும் அமைப்புகள்.',
      },
      icon: Building2,
      badge: 'Statutory Governance',
    },
    {
      key: 'immigration',
      title: {
        en: 'Student Pass & Border Regulations',
        'zh-sg': '国际学生准证与入境签证管理',
        'ta-sg': 'மாணவர் பாஸ் & குடிவரவு விதிமுறைகள்',
      },
      subtitle: {
        en: 'Official immigration channels for full-time international Student Pass applications, entry visas, and border guidelines.',
        'zh-sg': '全日制国际留学生准证（Student Pass）申请、入境签证审核及居留权事务官方通道。',
        'ta-sg': 'சர்வதேச மாணவர் பாஸ் விண்ணப்பங்கள் மற்றும் விசா நடைமுறைகளுக்கான அதிகாரப்பூர்வ வழித்தடம்.',
      },
      icon: Globe,
      badge: 'Immigration & Pass',
    },
    {
      key: 'safety',
      title: {
        en: 'Workplace & Campus Safety Standards',
        'zh-sg': '工作场所与校园安全卫生标准',
        'ta-sg': 'பணியிட & வளாக பாதுகாப்புத் தரநிலைகள்',
      },
      subtitle: {
        en: 'National workplace risk management frameworks and bizSAFE accreditation administered under the Ministry of Manpower.',
        'zh-sg': '新加坡人力部下辖国家级工作场所风险管理框架与 bizSAFE 企业安全认证体系。',
        'ta-sg': 'வளாகப் பாதுகாப்பு மற்றும் bizSAFE தரநிலைகளை மேற்பார்வையிடும் தேசிய அமைப்பு.',
      },
      icon: HardHat,
      badge: 'Safety Compliance',
    },
    {
      key: 'dispute',
      title: {
        en: 'Statutory Dispute Resolution Framework',
        'zh-sg': '法定学生权益与争议仲裁调解体系',
        'ta-sg': 'சட்டப்பூர்வ தகராறு தீர்வு கட்டமைப்பு',
      },
      subtitle: {
        en: 'Designated independent dispute resolution mechanisms under CPE guidelines: Singapore Mediation Centre and Singapore Institute of Arbitrators.',
        'zh-sg': '私立教育理事会（CPE）指导下的法定独立第三方调解与仲裁机制：新加坡调解中心与新加坡仲裁员协会。',
        'ta-sg': 'CPE வழிகாட்டுதலின் கீழ் இயங்கும் சுயாதீன சமரச மற்றும் நடுவர் மன்ற அமைப்புகள்.',
      },
      icon: Scale,
      badge: 'Consumer Safeguards',
    },
    {
      key: 'academic',
      title: {
        en: 'Academic Excellence & Learning Repositories',
        'zh-sg': '国家教育体系与公共学术文献资源',
        'ta-sg': 'கல்வி & ஆராய்ச்சி நூலகக் கட்டமைப்பு',
      },
      subtitle: {
        en: 'National curriculum frameworks, education policies, and public library digital research archives across Singapore.',
        'zh-sg': '新加坡国家教育政策导向、终身学习战略及遍布全岛的公共图书馆数字化文献科研网络。',
        'ta-sg': 'சிங்கப்பூர் தேசியக் கல்விக் கொள்கைகள் மற்றும் பொது நூலக டிஜிட்டல் ஆராய்ச்சி வளங்கள்.',
      },
      icon: BookOpen,
      badge: 'Academic Research',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: dict.nav.studentCorner, path: `/${locale}/student-corner/` },
      { name: dict.nav.sub.usefulLinks },
    ],
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
              { label: dict.nav.sub.usefulLinks, href: `/${locale}/useful-links/` },
            ]}
          />
        </Container>
      </div>

      {/* Hero Section */}
      <div className="bg-navy-950 text-white py-12 sm:py-16 border-b border-navy-800 relative overflow-hidden">
        <HeroBackgroundImage
          src="/images/it-computer-lab.jpg"
          alt="EduLearn Useful Government and Industry Links"
          opacity="opacity-30"
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <Container size="default" className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold">Official Singapore Directory</Badge>
            <Badge variant="neutral" className="text-slate-300 bg-navy-900 border-slate-700">
              Verified External Resources
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            {dict.nav.sub.usefulLinks}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-3xl">
            Direct access to official Singapore government agencies, statutory regulatory authorities, and independent mediation bodies governing private education, student welfare, and campus safety standards.
          </p>
        </Container>
      </div>

      {/* Main Content */}
      <Container size="default" className="py-12 space-y-16">
        {/* Categorized Link Sections */}
        {categories.map((category) => {
          const links = STATUTORY_EXTERNAL_LINKS.filter((item) => item.category === category.key);
          if (links.length === 0) return null;

          const CategoryIcon = category.icon;

          return (
            <section key={category.key} className="space-y-6">
              <div className="flex items-start gap-3 border-b border-slate-200 pb-4">
                <div className="w-10 h-10 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <CategoryIcon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold-700">
                      {category.badge}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                    {category.title[locale]}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
                    {category.subtitle[locale]}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {links.map((link) => {
                  let hostname = '';
                  try {
                    hostname = new URL(link.url).hostname;
                  } catch {
                    hostname = link.url;
                  }

                  return (
                    <Card
                      key={link.id}
                      variant="elevated"
                      className="border border-slate-200/90 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all group"
                    >
                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="navy" className="text-[10px] font-medium">
                            {link.tag}
                          </Badge>
                          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                            <span>{link.verifiedStatus}</span>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-serif font-bold text-base sm:text-lg text-navy-950 group-hover:text-gold-700 transition-colors leading-snug">
                            {link.title[locale]}
                          </h3>
                          <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                            {link.authority}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed font-sans pt-1">
                          {link.description[locale]}
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-500 truncate max-w-[180px] sm:max-w-[220px]">
                          {hostname}
                        </span>

                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 text-white hover:bg-gold-500 hover:text-navy-950 text-xs font-semibold transition-colors shadow-xs group/btn"
                          aria-label={`Visit official portal for ${link.title[locale]} (opens in a new tab)`}
                        >
                          <span>Visit Official Portal</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" aria-hidden="true" />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Maintenance Advisory & Verification Fallback */}
        <section className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-navy-950">
                Statutory Portal Downtime & Offline Verification Support
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                Singapore government portals including Training Partners Gateway (TPGateway), Singpass, and ICA undergo scheduled maintenance during weekend hours. If you encounter temporary service disruptions or require immediate certified copies of Edulearn&apos;s Committee for Private Education (CPE) registration certificate (PEI Reg No: <strong>201708935D</strong>), ERF course registrations, or student contracts:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-white rounded-xl border border-amber-200/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-navy-950">
                <Building2 className="w-4 h-4 text-amber-600" aria-hidden="true" />
                <span>Campus Registrar</span>
              </div>
              <p className="text-xs text-slate-600">
                1 Jalan Berseh, #02-28 New World Centre, Singapore 209037
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-amber-200/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-navy-950">
                <Phone className="w-4 h-4 text-amber-600" aria-hidden="true" />
                <span>Admissions Telephone</span>
              </div>
              <p className="text-xs text-slate-600 font-mono">
                +65 9004 9657 / +65 6258 7189
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-amber-200/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-navy-950">
                <Mail className="w-4 h-4 text-amber-600" aria-hidden="true" />
                <span>Official Registry Email</span>
              </div>
              <p className="text-xs text-slate-600 font-mono">
                admin@edulearn.edu.sg
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation Cards to Related Sections */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif font-bold text-xl text-navy-950">
                Related Institutional Resources
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Explore student welfare frameworks, downloadable forms, and formal governance profiles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <Link
              href={`/${locale}/student-corner/`}
              className="p-5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="gold" className="text-[10px]">
                    Student Life
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-navy-900 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="font-bold text-navy-950 text-sm group-hover:text-gold-700 transition-colors">
                  {dict.nav.studentCorner}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  80% attendance standards, Liberty medical insurance details, and pastoral care.
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/forms/`}
              className="p-5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="navy" className="text-[10px]">
                    Forms Hub
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-navy-900 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="font-bold text-navy-950 text-sm group-hover:text-gold-700 transition-colors">
                  {dict.nav.sub.formsDownloads}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  CPE Advisory Note (Form 12), Student Contract 4.1, and diploma samples.
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/governance/`}
              className="p-5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="emerald" className="text-[10px]">
                    Trust Centre
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-navy-900 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="font-bold text-navy-950 text-sm group-hover:text-gold-700 transition-colors">
                  {dict.nav.sub.regulatoryCertificates}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  CPE Enhanced Registration Framework certificate, bizSAFE Level 3, and ERF validity.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Bottom Contact CTA */}
        <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <Badge variant="gold" className="text-[11px]">
              Direct Student Support
            </Badge>
            <h3 className="font-serif font-bold text-2xl text-white">
              Need Guidance Navigating Singapore Regulatory Portals?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Our academic advisors can guide you through Student Pass formalities, TPGateway qualification checks, and SkillsFuture registration procedures.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Button
              href={`/${locale}/contact/`}
              variant="royal"
              iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
            >
              Speak with an Advisor
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
