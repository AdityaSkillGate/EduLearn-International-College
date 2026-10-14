'use client';

import React from 'react';
import { Locale } from '@/lib/i18n';
import { ORGANISATION_STRUCTURE, OrgNode } from '@/data/governance';
import { Card, Badge } from '@/components/ui';
import { Building2, Users, ShieldCheck, Scale, GraduationCap, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react';

interface OrganisationChartProps {
  locale: Locale;
}

const UI_STRINGS = {
  en: {
    headerTitle: 'Edulearn International College Organisational Hierarchy',
    headerDesc: 'Structured governance model compliant with CPE Enhanced Registration Framework (ERF) standards.',
    badgeStatutory: 'Statutory Private Education Institute',
    badgeExternal: 'External Statutory Regulator',
    badgeExec: 'Executive Leadership',
    academicQuality: 'Academic Quality',
    integrity: 'Integrity',
    campusOps: 'Campus Ops',
    academicDepts: 'Academic Departments:',
    a11yNoteTitle: 'Accessibility Navigation Note: ',
    a11yNoteBody: 'The diagram above reflects a 4-tier reporting line: Committee for Private Education (CPE) → Board of Directors & College Managers → Academic Board, Examination Board, and Operations → Academic Disciplines (Engineering, Computing, Business, Healthcare & Hospitality) deploying 35 registered faculty members.',
  },
  'zh-sg': {
    headerTitle: '新加坡爱学习国际学院组织架构图',
    headerDesc: '严格符合新加坡私立教育理事会（CPE）强化注册架构（ERF）标准的治理模型。',
    badgeStatutory: '新加坡法定私立教育机构',
    badgeExternal: '外部法定监管机构',
    badgeExec: '执行管理层',
    academicQuality: '学术质量',
    integrity: '考试诚信',
    campusOps: '校务运营',
    academicDepts: '学术系别设置：',
    a11yNoteTitle: '无障碍导航说明：',
    a11yNoteBody: '上图显示了四级汇报层级：私立教育理事会（CPE）→ 董事会与学院经理 → 学术委员会、考试委员会及运营部 → 部署35位注册教职员的四大专业系别（工程、计算机、商业、医疗与酒店管理）。',
  },
  'ta-sg': {
    headerTitle: 'எடுலேர்ன் சர்வதேசக் கல்லூரி நிறுவன படிநிலை அமைப்பு',
    headerDesc: 'சிங்கப்பூர் CPE விதிகளுக்கு இணங்க அமைக்கப்பட்ட கட்டமைப்பு.',
    badgeStatutory: 'சட்டப்பூர்வ தனியார் கல்வி நிறுவனம்',
    badgeExternal: 'வெளிப்புற சட்டப்பூர்வ ஒழுங்குமுறை ஆணையம்',
    badgeExec: 'நிர்வாக தலைமைத்துவம்',
    academicQuality: 'கல்வி தரம்',
    integrity: 'ஒருமைப்பாடு',
    campusOps: 'வளாக செயல்பாடுகள்',
    academicDepts: 'கல்வித் துறைகள்:',
    a11yNoteTitle: 'அணுகல்தன்மை வழிகாட்டல் குறிப்பு: ',
    a11yNoteBody: 'மேற்கண்ட வரைபடம் 4-அடுக்கு நிர்வாக அறிக்கையிடல் வழியை விளக்குகிறது: தனியார் கல்வி வாரியம் (CPE) → இயக்குநர் குழு & கல்லூரி மேலாளர்கள் → கல்வி & தேர்வு வாரியம் → கல்வித் துறைகள் (பொறியியல், கணினி, வணிகம், மருத்துவம்).',
  },
};

export const OrganisationChart: React.FC<OrganisationChartProps> = ({ locale }) => {
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  return (
    <div className="space-y-8">
      {/* Introduction note */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-navy-950">
            {ui.headerTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {ui.headerDesc}
          </p>
        </div>
        <Badge variant="emerald" className="shrink-0">
          {ui.badgeStatutory}
        </Badge>
      </div>

      {/* Responsive Visual Hierarchy */}
      <div className="space-y-6">
        {/* Tier 1: Statutory Regulator */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-xl bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-xl p-5 border border-navy-800 shadow-sm text-center">
            <Badge variant="gold" className="mb-2">{ui.badgeExternal}</Badge>
            <h4 className="font-serif text-lg font-bold text-white">
              {ORGANISATION_STRUCTURE.title[locale]}
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
              {ORGANISATION_STRUCTURE.description[locale]}
            </p>
          </div>
          {/* Connector Line */}
          <div className="w-0.5 h-8 bg-slate-300" aria-hidden="true" />
        </div>

        {/* Tier 2: College Leadership & Management */}
        {ORGANISATION_STRUCTURE.children?.map((mgmtNode) => (
          <div key={mgmtNode.id} className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-2xl bg-white border-2 border-gold-500/80 rounded-xl p-6 shadow-md text-center">
                <Badge variant="gold" className="mb-2">{ui.badgeExec}</Badge>
                <h4 className="font-serif text-xl font-bold text-navy-950">
                  {mgmtNode.title[locale]}
                </h4>
                {mgmtNode.holder && (
                  <p className="text-sm font-semibold text-gold-700 font-sans mt-1">
                    {mgmtNode.holder}
                  </p>
                )}
                <p className="text-xs text-slate-600 mt-2 max-w-lg mx-auto">
                  {mgmtNode.description[locale]}
                </p>
              </div>
              {/* Connector Line */}
              <div className="w-0.5 h-8 bg-slate-300" aria-hidden="true" />
            </div>

            {/* Tier 3: Statutory Boards & Operations (3 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mgmtNode.children?.map((subNode) => {
                const isAcademic = subNode.id === 'org-academic-board';
                const isExam = subNode.id === 'org-exam-board';
                const isOps = subNode.id === 'org-operations';

                return (
                  <div
                    key={subNode.id}
                    className={`rounded-xl border p-5 flex flex-col justify-between shadow-sm transition-all ${
                      isAcademic
                        ? 'bg-blue-50/50 border-blue-200'
                        : isExam
                        ? 'bg-amber-50/50 border-amber-200'
                        : 'bg-emerald-50/50 border-emerald-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Badge
                          variant={isAcademic ? 'royal' : isExam ? 'gold' : 'emerald'}
                          className="text-[10px]"
                        >
                          {isAcademic ? ui.academicQuality : isExam ? ui.integrity : ui.campusOps}
                        </Badge>
                        {isAcademic && <ShieldCheck className="w-4 h-4 text-navy-800" />}
                        {isExam && <Scale className="w-4 h-4 text-amber-700" />}
                        {isOps && <Building2 className="w-4 h-4 text-emerald-700" />}
                      </div>

                      <h5 className="font-serif font-bold text-base text-navy-950">
                        {subNode.title[locale]}
                      </h5>

                      {subNode.holder && (
                        <div className="text-xs font-semibold text-slate-700 mt-1">
                          {subNode.holder}
                        </div>
                      )}

                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {subNode.description[locale]}
                      </p>
                    </div>

                    {/* Tier 4: Academic Disciplines if Academic Board */}
                    {subNode.children && (
                      <div className="mt-5 pt-4 border-t border-blue-200/80 space-y-2">
                        <div className="text-[11px] font-bold uppercase text-navy-900 tracking-wider flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 text-navy-800" />
                          {ui.academicDepts}
                        </div>
                        <div className="space-y-2">
                          {subNode.children.map((dept) => (
                            <div
                              key={dept.id}
                              className="bg-white p-2.5 rounded-lg border border-blue-100 text-xs shadow-xs"
                            >
                              <div className="font-semibold text-navy-950 flex items-center gap-1.5">
                                <ChevronRight className="w-3 h-3 text-gold-600 shrink-0" />
                                {dept.title[locale]}
                              </div>
                              <p className="text-[11px] text-slate-500 mt-1 pl-4 leading-normal">
                                {dept.description[locale]}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Screen Reader & Textual Outline for full WCAG Accessibility */}
      <div className="bg-slate-100 p-4 rounded-lg text-xs text-slate-600">
        <span className="font-bold text-slate-800">{ui.a11yNoteTitle}</span>
        {ui.a11yNoteBody}
      </div>
    </div>
  );
};
