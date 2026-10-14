'use client';

import React from 'react';
import { Locale } from '@/lib/i18n';
import { COLLEGE_MANAGERS } from '@/data/governance';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';
import { Award, GraduationCap, CheckCircle2, ShieldCheck, Briefcase } from 'lucide-react';

interface LeadershipProfilesProps {
  locale: Locale;
}

const UI_STRINGS = {
  en: {
    cpeAuthorized: 'CPE Authorized Manager',
    profileScope: 'Institutional Profile & Scope',
    credentials: 'Academic & Professional Credentials',
    governanceRole: 'Governance Role:',
    regNo: 'PEI Reg: 201708935D',
  },
  'zh-sg': {
    cpeAuthorized: 'CPE 授权管理人员',
    profileScope: '机构简介与职责范围',
    credentials: '学术与专业资质',
    governanceRole: '治理职责：',
    regNo: 'PEI 注册号：201708935D',
  },
  'ta-sg': {
    cpeAuthorized: 'CPE அங்கீகரிக்கப்பட்ட மேலாளர்',
    profileScope: 'நிறுவன விவரக்குறிப்பு மற்றும் நோக்கம்',
    credentials: 'கல்வி மற்றும் தொழில்முறை சான்றுகள்',
    governanceRole: 'நிர்வாகப் பங்கு:',
    regNo: 'PEI பதிவு எண்: 201708935D',
  },
};

export const LeadershipProfiles: React.FC<LeadershipProfilesProps> = ({ locale }) => {
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {COLLEGE_MANAGERS.map((manager) => (
        <Card key={manager.id} variant="elevated" className="overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-900 p-6 sm:p-7 text-white border-b border-navy-800">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <Badge variant="gold" className="text-[11px] font-medium tracking-wide">
                  {manager.cpeStatus}
                </Badge>
                <span className="text-xs text-slate-300 font-sans flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {ui.cpeAuthorized}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                {manager.name}
              </h3>
              <p className="text-sm font-sans text-gold-400 font-medium mt-1">
                {manager.title[locale]}
              </p>
            </div>

            <CardContent className="p-6 sm:p-7 space-y-6">
              {/* Biography */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-2 font-sans">
                  <Briefcase className="w-3.5 h-3.5 text-navy-800" />
                  {ui.profileScope}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  {manager.bio[locale]}
                </p>
              </div>

              {/* Verified Qualifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3 font-sans">
                  <GraduationCap className="w-4 h-4 text-navy-800" />
                  {ui.credentials}
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700" role="list">
                  {manager.qualifications.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 mt-0.5 shrink-0" aria-hidden="true" />
                      <span className="leading-snug">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </div>

          <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
            <span className="font-medium">{ui.governanceRole} {manager.role}</span>
            <span className="text-[11px] text-slate-700 font-mono">{ui.regNo}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};
