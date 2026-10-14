import React from 'react';
import { Metadata } from 'next';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { Container, SectionHeading, Badge, Breadcrumbs, Card, CardContent, Button, HeroBackgroundImage } from '@/components/ui';
import { LeadershipProfiles } from '@/components/governance/LeadershipProfiles';
import { BoardCharter } from '@/components/governance/BoardCharter';
import { OrganisationChart } from '@/components/governance/OrganisationChart';
import { TeacherDirectory } from '@/components/governance/TeacherDirectory';
import { CertificatesViewer } from '@/components/governance/CertificatesViewer';
import { GovernanceNavTabs } from '@/components/governance/GovernanceNavTabs';
import { CheckCircle2, ArrowRight } from 'lucide-react';
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
    en: 'Academic Leadership, Governance & Faculty Deployment | Edulearn Singapore',
    'zh-sg': '学院领导层、学术治理与师资配置 | 新加坡爱尔莱国际学院',
    'ta-sg': 'நிர்வாக தலைமைத்துவம், கல்வி வாரியம் & விரிவுரையாளர்கள் | எடுலேர்ன் சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Official institutional governance of EIC Singapore: College managers, Academic & Examination Boards, 35 CPE registered faculty deployments, and bizSAFE Level 3 safety compliance.',
    'zh-sg': '新加坡爱尔莱国际学院官方治理体系：学院经理、学术与考试委员会职责、35名CPE认证注册教师配置及bizSAFE三级安全认证。',
    'ta-sg': 'எடுலேர்ன் சர்வதேசக் கல்லூரியின் அதிகாரப்பூர்வ நிர்வாகம்: கல்லூரி மேலாளர்கள், கல்வி & தேர்வு வாரியம், 35 விரிவுரையாளர்களின் பணி விவரங்கள் மற்றும் bizSAFE நிலை 3 சான்றிதழ்.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/governance/`,
      languages: {
        en: '/en/governance/',
        'zh-sg': '/zh-sg/governance/',
        'ta-sg': '/ta-sg/governance/',
        'x-default': '/en/governance/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/governance/`,
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

export default async function GovernancePage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: dict.nav.about, path: `/${locale}/about/` },
      { name: dict.nav.governance },
    ],
    locale
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <JsonLd data={breadcrumbSchema} />
      {/* Breadcrumb strip */}
      <div className="bg-white border-b border-slate-200">
        <Container size="default" className="py-3">
          <Breadcrumbs
            homeHref={`/${locale}/`}
            items={[
              { label: dict.nav.about, href: `/${locale}/about/` },
              { label: dict.nav.governance, href: `/${locale}/governance/` },
            ]}
          />
        </Container>
      </div>

      {/* Hero Section */}
      <div className="bg-navy-950 text-white py-12 sm:py-16 border-b border-navy-800 relative overflow-hidden">
        <HeroBackgroundImage
          src="/images/business-classroom.jpg"
          alt="EduLearn Academic Governance and Leadership"
          opacity="opacity-30"
        />
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <Container size="default" className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="gold" className="text-xs">
              Committee for Private Education (CPE) Reg No: 201708935D
            </Badge>
            <Badge variant="neutral" className="text-xs text-slate-300 bg-navy-900 border-slate-700">
              bizSAFE Level 3 Certified
            </Badge>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Institutional Leadership & Academic Governance
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Edulearn International College adheres strictly to the statutory standards of the Private Education Act under SkillsFuture Singapore (SSG). Our registered college managers, independent Academic and Examination Boards, and 35 CPE-approved faculty deployments uphold uncompromising academic rigour, student safety, and assessment integrity.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-navy-800/80">
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-gold-400">35</div>
              <div className="text-xs text-slate-400 mt-0.5">Faculty Deployments</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-gold-400">1:14</div>
              <div className="text-xs text-slate-400 mt-0.5">Student-Teacher Ratio</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-gold-400">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">CPE Registered Lecturers</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-gold-400">Ver 4.1</div>
              <div className="text-xs text-slate-400 mt-0.5">Standard Student Contract</div>
            </div>
          </div>
        </Container>
      </div>

      {/* Sticky Navigation Tabs */}
      <GovernanceNavTabs />

      {/* Main Governance Content */}
      <Container size="default" className="py-12 space-y-16">
        {/* 1. College Leadership & Managers */}
        <section id="leadership" className="scroll-mt-36 space-y-6">
          <SectionHeading
            eyebrow="Executive Leadership"
            title={dict.nav.sub.leadership}
            subtitle="Registered college managers guiding academic vision, continuous adult education, and institutional integrity."
          />
          <LeadershipProfiles locale={locale} />
        </section>

        {/* 2. Academic & Examination Boards */}
        <section id="academic-board" className="scroll-mt-36 space-y-6">
          <div id="examination-board" className="scroll-mt-36" />
          <SectionHeading
            eyebrow="Statutory Oversight"
            title={dict.nav.sub.academicBoard}
            subtitle="Dual governance boards mandated under the Private Education Act to ensure curriculum quality and assessment fairness."
          />
          <BoardCharter locale={locale} />
        </section>

        {/* 3. Organisation Structure */}
        <section id="organisation-structure" className="scroll-mt-36 space-y-6">
          <SectionHeading
            eyebrow="Reporting Structure"
            title={dict.nav.sub.organisationStructure}
            subtitle="Transparent organizational tree mapping regulatory reporting, executive leadership, academic faculties, and operations."
          />
          <OrganisationChart locale={locale} />
        </section>

        {/* 4. Teachers Deployment Directory */}
        <section id="faculty" className="scroll-mt-36 space-y-6">
          <SectionHeading
            eyebrow="Academic Faculty"
            title={dict.nav.sub.facultyDeployment}
            subtitle="Search and filter the 35 verified CPE-registered faculty assignments across all technical, business, IT, and healthcare disciplines."
          />
          <TeacherDirectory locale={locale} />
        </section>

        {/* 5. Registration Certificates & Accreditations */}
        <section id="certificates" className="scroll-mt-36 space-y-6">
          <SectionHeading
            eyebrow="Regulatory Credentials"
            title={dict.nav.sub.regulatoryCertificates}
            subtitle="Official statutory registrations, workplace safety accreditations, and mandatory consumer protection contracts."
          />
          <CertificatesViewer locale={locale} />
        </section>

        {/* 6. Dispute Resolution Framework */}
        <section id="dispute" className="scroll-mt-36 space-y-6">
          <SectionHeading
            eyebrow="Consumer Protection"
            title="CPE Student Dispute Resolution Framework"
            subtitle="Transparent 3-stage dispute management protected by Singapore statutory regulations."
          />

          <Card variant="default" className="border border-slate-200">
            <CardContent className="p-6 sm:p-8 space-y-5">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                In full accordance with Committee for Private Education (CPE) requirements, Edulearn International College operates a clear, progressive, and accessible dispute resolution mechanism for all enrolled students:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-navy-900 text-white flex items-center justify-center text-xs font-bold font-serif">
                    01
                  </div>
                  <h4 className="font-serif font-bold text-sm text-navy-950">
                    Stage 1: Internal Resolution
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Student submits written feedback to the College Administration. College Management investigates and aims to resolve the grievance amicably within 14 working days.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold font-serif">
                    02
                  </div>
                  <h4 className="font-serif font-bold text-sm text-navy-950">
                    Stage 2: CPE Mediation
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If unresolved internally, the matter is referred to the CPE Student Services Centre for formal mediation under the Singapore Mediation Centre (SMC) framework.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-gold-50/50 border border-gold-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-gold-600 text-navy-950 flex items-center justify-center text-xs font-bold font-serif">
                    03
                  </div>
                  <h4 className="font-serif font-bold text-sm text-navy-950">
                    Stage 3: Formal Arbitration
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If mediation does not yield a settlement, the dispute is escalated to binding arbitration via the Singapore Institute of Arbitrators (SIArb) arbitration scheme.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Standard PEI-Student Contract Version 4.1 clause 7 applies to all matriculated learners.
                </span>
                <a
                  href="https://www.tpgateway.gov.sg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-900 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>CPE Student Services Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Final Admissions & Governance Consultation CTA */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif font-bold text-2xl text-navy-950">
              Have Questions Regarding Course Accreditation or Faculty?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Our academic advisors at New World Centre provide transparent consultation on diploma curricula, CPE registration records, entry requirements, and fee payment structures.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Button
              href={`/${locale}/contact/`}
              variant="royal"
              iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
            >
              Contact Admissions Office
            </Button>
            <Button
              href={`/${locale}/courses/`}
              variant="outline"
            >
              Browse 21 Programs
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
