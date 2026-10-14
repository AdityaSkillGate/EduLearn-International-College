import React from 'react';
import { Metadata } from 'next';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, Locale } from '@/lib/i18n';
import { Container, SectionHeading, Badge, Breadcrumbs, Card, CardHeader, CardTitle, CardDescription, CardContent, Button, HeroBackgroundImage } from '@/components/ui';
import { DocumentLibrary } from '@/components/documents/DocumentLibrary';
import { ComplianceChecklist } from '@/components/documents/ComplianceChecklist';
import { FileText, Download, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, ExternalLink } from 'lucide-react';

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
    en: 'Official Documents, Forms & Institutional Trust Centre | Edulearn Singapore',
    'zh-sg': '官方文件库、学生表格与合规认证中心 | 新加坡爱尔莱国际学院',
    'ta-sg': 'அதிகாரப்பூர்வ ஆவணங்கள், படிவங்கள் & சான்றிதழ்கள் | எடுலேர்ன் சிங்கப்பூர்',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Download official EIC Singapore institutional resources: CPE Student Advisory Note (Form 12), Standard PEI-Student Contract Version 4.1, sample diploma parchments, and refund matrices.',
    'zh-sg': '下载新加坡爱尔莱国际学院官方认证文件：CPE学生须知通告（Form 12）、标准私立教育学生合同（4.1版）、毕业文凭样本及法定学费退款细则。',
    'ta-sg': 'எடுலேர்ன் சர்வதேசக் கல்லூரியின் அதிகாரப்பூர்வ ஆவணங்கள்: CPE படிவம் 12, நிலையான மாணவர் ஒப்பந்தம் 4.1 மற்றும் கட்டணத் திரும்பப் பெறுதல் கொள்கை.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/forms/`,
      languages: {
        en: '/en/forms/',
        'zh-sg': '/zh-sg/forms/',
        'ta-sg': '/ta-sg/forms/',
        'x-default': '/en/forms/',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/forms/`,
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

export default async function FormsPage({ params }: PageProps) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const copy = {
    en: {
      heroBadge1: 'Institutional Trust & Transparency',
      heroTitle: 'Official Documents & Forms Repository',
      heroDesc: 'Access authorized institutional documents, statutory Committee for Private Education (CPE) agreements, Singapore consumer protection policies, and official sample certificates. All documents reflect verified statutory standards.',
      sec1Eyebrow: 'Downloadable Resources',
      sec1Title: 'Searchable Document Library',
      sec1Sub: 'Browse and download official CPE agreements, institutional policies, and student forms in local PDF formats.',
      sec2Eyebrow: 'Consumer Protection',
      sec2Title: 'Course Fees Refund Policy Matrix (Schedule D)',
      sec2Sub: 'Mandatory statutory refund schedule incorporated into every Standard PEI-Student Contract Version 4.1.',
      tableBadge: 'CPE Standard Clause',
      tableVersion: 'Contract Version 4.1',
      tableTitle: 'Withdrawal Refund Entitlement Schedule',
      tableDesc: 'Applicable upon receipt of formal written withdrawal notice delivered to EIC College Management:',
      colPercent: '% of Course Fees Refunded',
      colNotice: 'Written Withdrawal Notice Received By College',
      tier1Notice: 'More than thirty (30) calendar days before the Course Commencement Date',
      tier2Notice: 'Before, but not more than thirty (30) calendar days before the Course Commencement Date',
      tier3Notice: 'On or after the Course Commencement Date',
      coolingOffTitle: '7-Day Statutory Cooling-Off Period (Clause 2.4):',
      coolingOffText: 'All matriculated learners benefit from a mandatory cooling-off period of 7 working days starting immediately upon signing the Student Contract. Students withdrawing during this period receive maximum refund rights as regulated by the CPE.',
      sec3Eyebrow: 'Governance Review',
      sec3Title: 'Institutional Trust & Regulatory Review Checklist',
      sec3Sub: 'Continuous compliance audit reviewing CPE registration, workplace safety standards, and examination security.',
      verifyCtaTitle: 'Need Assistance with Student Documentation or Enrolment?',
      verifyCtaDesc: 'Our campus registrar staff at New World Centre assist with student contract advisory, admissions guidelines, and academic document requests.',
      verifyBtn: 'Course Admissions & Enrolment',
      contactBtn: 'Contact College Registrar',
    },
    'zh-sg': {
      heroBadge1: '学院公信力与信息透明公开',
      heroTitle: '官方文件与表格资料库',
      heroDesc: '获取经官方核准之学院制度文件、新加坡私立教育理事会（CPE）法定协议、消费者权益保护政策及正规毕业证书样本。所有文件均符合新加坡法定标准。',
      sec1Eyebrow: '官方下载资源',
      sec1Title: '检索式官方文件库',
      sec1Sub: '在线浏览并直接下载官方 CPE 协议文本、学院规章制度及学生申请表格（PDF 格式）。',
      sec2Eyebrow: '学生消费权益保障',
      sec2Title: '学费退还政策矩阵（合同附表 D）',
      sec2Sub: '强制列入每一份《标准私立教育学生合同（4.1版）》的法定退费阶梯比例标准。',
      tableBadge: 'CPE 法定标准条款',
      tableVersion: '合同标准 4.1 版',
      tableTitle: '学生退学退费权益核算标准',
      tableDesc: '自爱尔莱国际学院管理层正式收到书面退学通知之日起计算：',
      colPercent: '退还课程学费比例',
      colNotice: '学院管理层收到书面退学通知的时间节点',
      tier1Notice: '在课程开课日（Commencement Date）前 30 个日历天以上送达',
      tier2Notice: '在开课日前 30 个日历天以内（含 30 天）送达',
      tier3Notice: '在课程开课日当天或开课日之后送达',
      coolingOffTitle: '法定 7 个工作日冷静期保护（合同第 2.4 条）：',
      coolingOffText: '所有正式注册学员自签署《学生合同》之日起，均享有 7 个工作日的法定冷静期。在此期间提出书面退学者，依法享受最高退费保护权益。',
      sec3Eyebrow: '合规治理审计',
      sec3Title: '学院公信力与法定合规核查矩阵',
      sec3Sub: '持续性合规审计机制，全面覆盖 CPE 办学执照、工作场所安全认证及考试保密流程。',
      verifyCtaTitle: '需要学生文件咨询或入学协助？',
      verifyCtaDesc: '位于新世界中心的教务处团队竭诚为您解答标准学生合同细则、入学申请流程及各类学籍文件申请。',
      verifyBtn: '课程申请与报读指引',
      contactBtn: '联系教务注册处',
    },
    'ta-sg': {
      heroBadge1: 'நிறுவன நம்பகத்தன்மை & வெளிப்படைத்தன்மை',
      heroTitle: 'அதிகாரப்பூர்வ ஆவணங்கள் மற்றும் படிவங்கள் தளம்',
      heroDesc: 'CPE சட்டப்பூர்வ ஒப்பந்தங்கள், சிங்கப்பூர் நுகர்வோர் பாதுகாப்பு கொள்கைகள் மற்றும் அதிகாரப்பூர்வ மாதிரி சான்றிதழ்கள். அனைத்து ஆவணங்களும் சட்டப்பூர்வ தரத்தை உறுதிப்படுத்துகின்றன.',
      sec1Eyebrow: 'பதிவிறக்க வளங்கள்',
      sec1Title: 'தேடக்கூடிய ஆவணங்கள் நூலகம்',
      sec1Sub: 'CPE ஒப்பந்தங்கள், கல்லூரி கொள்கைகள் மற்றும் படிவங்களை PDF வடிவத்தில் பதிவிறக்கம் செய்ய.',
      sec2Eyebrow: 'மாணவர் பாதுகாப்பு',
      sec2Title: 'கட்டணத் திரும்பப் பெறுதல் கொள்கை (அட்டவணை D)',
      sec2Sub: 'நிலையான மாணவர் ஒப்பந்தம் 4.1-ல் உள்ள கட்டாய சட்டப்பூர்வ கட்டணத் திரும்பப் பெறுதல் அட்டவணை.',
      tableBadge: 'CPE நிலையான விதி',
      tableVersion: 'ஒப்பந்த பதிப்பு 4.1',
      tableTitle: 'திரும்பப் பெறுதல் உரிமை அட்டவணை',
      tableDesc: 'கல்லூரி நிர்வாகத்திற்கு எழுத்துப்பூர்வ விலகல் கடிதம் கிடைத்ததன் அடிப்படையில்:',
      colPercent: '% திரும்பப் பெறப்படும் கட்டணம்',
      colNotice: 'எழுத்துப்பூர்வ விலகல் அறிவிப்பு பெறப்பட்ட நேரம்',
      tier1Notice: 'வகுப்பு தொடங்கும் தேதிக்கு 30 நாட்களுக்கு முன் அறிவித்தால்',
      tier2Notice: 'வகுப்பு தொடங்கும் தேதிக்கு 30 நாட்களுக்குள் அறிவித்தால்',
      tier3Notice: 'வகுப்பு தொடங்கிய நாளில் அல்லது அதற்குப் பின் அறிவித்தால்',
      coolingOffTitle: '7 நாட்கள் சட்டப்பூர்வ யோசனை காலம் (பிரிவு 2.4):',
      coolingOffText: 'ஒப்பந்தத்தில் கையெழுத்திட்ட 7 வேலை நாட்களுக்குள் விலகும் மாணவர்கள் CPE விதிகளின்படி அதிகபட்ச கட்டணத் திரும்பப் பெறுதலைப் பெறுவார்கள்.',
      sec3Eyebrow: 'ஆளுமை தணிக்கை',
      sec3Title: 'நிறுவன நம்பகத்தன்மை மற்றும் ஒழுங்குமுறை சரிபார்ப்பு',
      sec3Sub: 'CPE பதிவு, பணியிட பாதுகாப்பு மற்றும் தேர்வு பாதுகாப்பை மதிப்பாய்வு செய்யும் தணிக்கை.',
      verifyCtaTitle: 'மாணவர் ஆவணங்கள் அல்லது சேர்க்கை உதவி தேவையா?',
      verifyCtaDesc: 'நியூ வேர்ல்ட் சென்டரில் உள்ள எங்கள் பதிவாளர் அலுவலகம் மாணவர் ஒப்பந்தங்கள் மற்றும் சேர்க்கை வழிகாட்டல்களுக்கு உதவுகிறது.',
      verifyBtn: 'சேர்க்கை மற்றும் விண்ணப்பம்',
      contactBtn: 'பதிவாளர் அலுவலகத்தைத் தொடர்பு கொள்ளவும்',
    },
  };

  const t = copy[locale] || copy.en;

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: dict.nav.studentCorner, path: `/${locale}/student-corner/` },
      { name: dict.nav.sub.formsDownloads },
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
              { label: dict.nav.studentCorner, href: `/${locale}/student-corner/` },
              { label: dict.nav.sub.formsDownloads, href: `/${locale}/forms/` },
            ]}
          />
        </Container>
      </div>

      {/* Hero Section */}
      <div className="bg-navy-950 text-white py-12 sm:py-16 border-b border-navy-800 relative overflow-hidden">
        <HeroBackgroundImage
          src="/images/business-classroom.jpg"
          alt="EduLearn Student Documents and Advisory Policies"
          opacity="opacity-30"
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <Container size="default" className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold">{t.heroBadge1}</Badge>
            <Badge variant="neutral" className="text-slate-300 bg-navy-900 border-slate-700">
              CPE Reg No: 201708935D
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-3xl">
            {t.heroDesc}
          </p>
        </Container>
      </div>

      {/* Main Content Area */}
      <Container size="default" className="py-12 space-y-16">
        {/* 1. Searchable Document Library */}
        <section id="library" className="space-y-6">
          <SectionHeading
            eyebrow={t.sec1Eyebrow}
            title={t.sec1Title}
            subtitle={t.sec1Sub}
          />
          <DocumentLibrary locale={locale} />
        </section>

        {/* 2. Statutory Refund Policy Matrix (Schedule D) */}
        <section id="refund-policy" className="space-y-6">
          <SectionHeading
            eyebrow={t.sec2Eyebrow}
            title={t.sec2Title}
            subtitle={t.sec2Sub}
          />

          <Card variant="elevated" className="border border-slate-200 overflow-hidden shadow-xs">
            <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="emerald">{t.tableBadge}</Badge>
                <span className="text-xs text-slate-500 font-mono">{t.tableVersion}</span>
              </div>
              <CardTitle className="text-lg text-navy-950 mt-1">
                {t.tableTitle}
              </CardTitle>
              <CardDescription>
                {t.tableDesc}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700 border-collapse">
                <thead className="bg-navy-900 text-white font-sans uppercase text-[11px] tracking-wider">
                  <tr>
                    <th scope="col" className="px-6 py-4 border-b border-navy-800">
                      {t.colPercent}
                    </th>
                    <th scope="col" className="px-6 py-4 border-b border-navy-800">
                      {t.colNotice}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-emerald-700 text-base font-serif">
                      100%
                    </td>
                    <td className="px-6 py-4 font-sans leading-relaxed">
                      {t.tier1Notice}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-emerald-700 text-base font-serif">
                      50%
                    </td>
                    <td className="px-6 py-4 font-sans leading-relaxed">
                      {t.tier2Notice}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-amber-700 text-base font-serif">
                      0%
                    </td>
                    <td className="px-6 py-4 font-sans leading-relaxed">
                      {t.tier3Notice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>

            <div className="p-5 bg-blue-50/60 border-t border-blue-200/60 space-y-2">
              <div className="flex items-start gap-2.5 text-xs text-blue-900 font-sans leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
                <span>
                  <strong>{t.coolingOffTitle}</strong> {t.coolingOffText}
                </span>
              </div>
            </div>
          </Card>
        </section>

        {/* 3. Institutional Trust & Compliance Checklist */}
        <section id="compliance-matrix" className="space-y-6">
          <SectionHeading
            eyebrow={t.sec3Eyebrow}
            title={t.sec3Title}
            subtitle={t.sec3Sub}
          />
          <ComplianceChecklist locale={locale} />
        </section>

        {/* Bottom Fast-Link Action Strip */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="font-serif font-bold text-2xl text-navy-950">
              {t.verifyCtaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              {t.verifyCtaDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Button
              href={`/${locale}/apply/`}
              variant="royal"
              iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
            >
              {t.verifyBtn}
            </Button>
            <Button
              href={`/${locale}/contact/`}
              variant="outline"
            >
              {t.contactBtn}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
