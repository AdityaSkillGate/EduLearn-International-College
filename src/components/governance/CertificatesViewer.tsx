'use client';

import React from 'react';
import { Locale } from '@/lib/i18n';
import { REGULATORY_CREDENTIALS } from '@/data/governance';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui';
import { ShieldCheck, Award, FileText, CheckCircle2, Download, ExternalLink, Scale, Building2 } from 'lucide-react';

interface CertificatesViewerProps {
  locale: Locale;
}

const UI_STRINGS = {
  en: {
    issuedBy: 'Issued by:',
    statutoryProvisions: 'Statutory Provisions:',
    consumerBadge: 'Statutory Consumer Documents',
    downloadsTitle: 'Official CPE Forms & Student Contract Downloads',
    downloadsDesc: 'Prospective and enrolled learners are encouraged to review the statutory CPE Student Advisory Note (Form 12) and the Standard PEI-Student Contract Version 4.1 prior to fee payment.',
    btnForms: 'Access All Student Forms',
    btnContact: 'Contact College Registrar',
  },
  'zh-sg': {
    issuedBy: '颁发/主管机构：',
    statutoryProvisions: '法定条款与规范：',
    consumerBadge: '法定消费者权益保障文件',
    downloadsTitle: '官方 CPE 规定表格与标准学生合同下载',
    downloadsDesc: '在缴纳任何课程费用之前，建议所有新生与在读学员查阅私立教育理事会（CPE）法定学生咨询须知（Form 12）及标准私立教育机构学生合同（4.1版）。',
    btnForms: '获取全部学生表格',
    btnContact: '联系学院教务处',
  },
  'ta-sg': {
    issuedBy: 'வழங்கிய அமைப்பு:',
    statutoryProvisions: 'சட்டப்பூர்வ விதிகள்:',
    consumerBadge: 'சட்டப்பூர்வ நுகர்வோர் பாதுகாப்பு ஆவணங்கள்',
    downloadsTitle: 'அதிகாரப்பூர்வ CPE படிவங்கள் & மாணவர் ஒப்பந்த பதிவிறக்கங்கள்',
    downloadsDesc: 'கட்டணம் செலுத்துவதற்கு முன், CPE மாணவர் ஆலோசனைக் குறிப்பு (படிவம் 12) மற்றும் நிலையான மாணவர் ஒப்பந்தம் பதிப்பு 4.1 ஆகியவற்றை மதிப்பாய்வு செய்ய மாணவர்கள் ஊக்குவிக்கப்படுகிறார்கள்.',
    btnForms: 'அனைத்து மாணவர் படிவங்களையும் அணுகவும்',
    btnContact: 'பதிவாளர் அலுவலகத் தொடர்பு',
  },
};

export const CertificatesViewer: React.FC<CertificatesViewerProps> = ({ locale }) => {
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REGULATORY_CREDENTIALS.map((cred) => (
          <Card
            key={cred.id}
            variant="elevated"
            className="border border-slate-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-sm"
          >
            <div>
              <div className="p-6 bg-slate-50 border-b border-slate-100">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="gold" className="text-[10px]">
                    {cred.badge}
                  </Badge>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                </div>
                <h4 className="font-serif font-bold text-base text-navy-950">
                  {cred.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-sans mt-1">
                  {ui.issuedBy} {cred.authority}
                </p>
              </div>

              <CardContent className="p-6 space-y-4">
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  {cred.description}
                </p>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    {ui.statutoryProvisions}
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600" role="list">
                    {cred.keyPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between font-mono">
              <span>{cred.validity}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Official Downloads & Forms Integration */}
      <Card variant="default" className="border-2 border-navy-900/10 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-900 text-white p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <Badge variant="gold" className="text-[11px]">
              {ui.consumerBadge}
            </Badge>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {ui.downloadsTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {ui.downloadsDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Button
              href={`/${locale}/forms/`}
              variant="royal"
              size="sm"
              iconRight={<FileText className="w-4 h-4 ml-1" />}
            >
              {ui.btnForms}
            </Button>
            <Button
              href={`/${locale}/contact/`}
              variant="outline"
              size="sm"
              className="border-slate-500 text-white hover:bg-white/10"
              iconRight={<ExternalLink className="w-4 h-4 ml-1" />}
            >
              {ui.btnContact}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
