'use client';

import React from 'react';
import { Locale } from '@/lib/i18n';
import { COMPLIANCE_CHECKLIST } from '@/data/documents';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';
import { ShieldCheck, CheckCircle2, Clock, AlertTriangle, ExternalLink, Calendar } from 'lucide-react';

interface ComplianceChecklistProps {
  locale?: Locale;
}

const UI_STRINGS = {
  en: {
    badge: 'Institutional Trust Audit',
    schedule: 'Active Regulatory Compliance Schedule',
    title: 'Statutory Compliance & Accreditation Review Matrix',
    subtitle: 'Regularly audited against the Committee for Private Education (CPE / SSG) directives, Singapore Workplace Safety & Health Council, and the Singapore Ministry of Manpower.',
    colArea: 'Regulatory Area & Title',
    colAuthority: 'Statutory Authority',
    colRef: 'Official Reference',
    colStatus: 'Compliance Status',
    colCycle: 'Review Audit Cycle',
    regNotice: 'Statutory Registration: Edulearn International College Pte. Ltd. (UEN: 201708935D)',
    verifyTpg: 'Verify Live on TPGateway Singapore',
    items: {
      'chk-cpe-erf': {
        title: 'CPE Enhanced Registration Framework (ERF)',
        notes: 'Registration active under Private Education Act. Governed by CPE quality frameworks.',
        status: 'Compliant',
        cycle: 'Annual Statutory Audit Cycle',
      },
      'chk-student-contract': {
        title: 'Standard PEI-Student Contract Compliance',
        notes: 'Executed with every student. Features mandatory 7-working-day cooling-off period.',
        status: 'Statutory Standard',
        cycle: 'Active Enrollment Cycles',
      },
      'chk-bizsafe': {
        title: 'bizSAFE Level 3 Safety Management Audit',
        notes: 'Classrooms 1 & 2 fully audited for emergency egress, electrical safety, and risk assessment.',
        status: 'Compliant',
        cycle: 'Workplace Risk Audit Completed',
      },
      'chk-teacher-deployment': {
        title: 'CPE Teacher Deployment Approvals',
        notes: 'Every deployed lecturer individually vetted and notified to CPE; 1:14 teacher ratio cap maintained.',
        status: 'Annual Review Active',
        cycle: 'Academic Board Annual Review',
      },
      'chk-exam-moderation': {
        title: 'Examination Moderation & Script Custody',
        notes: 'Dual-key physical/digital question paper security, mark moderation, and formal student appeal avenues.',
        status: 'Statutory Standard',
        cycle: 'Pre-Semester & Post-Exam Cycles',
      },
      'chk-fee-protection': {
        title: 'Fee Transparency & Installment Schedules',
        notes: 'Fees collected strictly in approved monthly installments (e.g., $400 - $500/month) to protect student finances.',
        status: 'Compliant',
        cycle: 'Audited Fee Matrices',
      },
    },
  },
  'zh-sg': {
    badge: '学院公信力法定审查',
    schedule: '现行法定合规审核周期表',
    title: '法定合规与官方资质审查矩阵',
    subtitle: '严格依据新加坡精深技能发展局旗下私立教育理事会（CPE / SSG）法规、工作场所安全与卫生理事会及人力部要求定期审查。',
    colArea: '法定监管领域与项目名称',
    colAuthority: '主管法定机构',
    colRef: '官方备案参考编号',
    colStatus: '合规认证状态',
    colCycle: '复审与审计周期',
    regNotice: '法定注册机构：Edulearn International College Pte. Ltd.（机构统一编码 UEN：201708935D）',
    verifyTpg: '在新加坡 TPGateway 官方核验办学资质',
    items: {
      'chk-cpe-erf': {
        title: 'CPE 强化注册架构 (ERF) 认证',
        notes: '依据《私立教育法案》正规注册，严格遵循 CPE 质量管理体系与评估准则。',
        status: '全面合规',
        cycle: '年度法定审计周期',
      },
      'chk-student-contract': {
        title: '标准私立教育学生合同 (Version 4.1) 合规',
        notes: '与全体学员逐一签署，依法提供 7 个工作日冷静期与法定退费权益。',
        status: '法定标准规范',
        cycle: '现行录取周期执行',
      },
      'chk-bizsafe': {
        title: 'bizSAFE Level 3 级校园安全管理认证',
        notes: '1号与2号课室全面通过消防疏散、用电安全与环境风险评估审核。',
        status: '全面合规',
        cycle: '工作场所风险审查已完成',
      },
      'chk-teacher-deployment': {
        title: 'CPE 授课教师师资备案核准',
        notes: '全院35名注册讲师均经 CPE 审核备案，严格恪守 1:14 师生比例上限。',
        status: '年度审查有效',
        cycle: '学术委员会年度审查',
      },
      'chk-exam-moderation': {
        title: '考试合议评定与试卷保密管理',
        notes: '实体及数字试卷双重密匙保密保管、成绩合议（Moderation）及学生考试申诉仲裁机制。',
        status: '法定标准规范',
        cycle: '学期前及考后审查周期',
      },
      'chk-fee-protection': {
        title: '学费公开透明与分期缴纳机制',
        notes: '学费严格按月分期收取（如每月 S$400 – S$500），全面保障学员财务安全。',
        status: '全面合规',
        cycle: '已审计学费明细表',
      },
    },
  },
  'ta-sg': {
    badge: 'நிறுவன நம்பகத்தன்மை தணிக்கை',
    schedule: 'ஒழுங்குமுறை இணக்க அட்டவணை',
    title: 'சட்டப்பூர்வ இணக்கம் மற்றும் அங்கீகார ஆய்வு அணிவரிசை',
    subtitle: 'சிங்கப்பூர் தனியார் கல்விக் குழுமம் (CPE / SSG), பணியிட பாதுகாப்பு மற்றும் சுகாதார கவுன்சில் மற்றும் மனிதவள அமைச்சக விதிகளுக்கு உட்பட்ட தணிக்கை.',
    colArea: 'ஒழுங்குமுறை துறை & தலைப்பு',
    colAuthority: 'ஒழுங்குமுறை ஆணையம்',
    colRef: 'அதிகாரப்பூர்வ குறிப்பு',
    colStatus: 'இணக்க நிலை',
    colCycle: 'தணிக்கை மறுஆய்வு சுழற்சி',
    regNotice: 'சட்டப்பூர்வ பதிவு: Edulearn International College Pte. Ltd. (UEN: 201708935D)',
    verifyTpg: 'சிங்கப்பூர் TPGateway தளத்தில் சரிபார்க்கவும்',
    items: {
      'chk-cpe-erf': {
        title: 'CPE மேம்படுத்தப்பட்ட பதிவு கட்டமைப்பு (ERF)',
        notes: 'தனியார் கல்விச் சட்டத்தின் கீழ் பதிவு செயலில் உள்ளது. CPE தர கட்டமைப்பால் நிர்வகிக்கப்படுகிறது.',
        status: 'இணக்கமானது',
        cycle: 'வருடாந்திர தணிக்கை சுழற்சி',
      },
      'chk-student-contract': {
        title: 'நிலையான மாணவர் ஒப்பந்த இணக்கம் (பதிப்பு 4.1)',
        notes: 'அனைத்து மாணவர்களுடனும் கையெழுத்தானது. கட்டாய 7 வேலை நாட்கள் யோசனை காலத்தைக் கொண்டுள்ளது.',
        status: 'சட்டப்பூர்வ தரம்',
        cycle: 'சேர்க்கை சுழற்சிகள்',
      },
      'chk-bizsafe': {
        title: 'bizSAFE நிலை 3 பாதுகாப்பு மேலாண்மை தணிக்கை',
        notes: 'வகுப்பறைகள் 1 & 2 அவசரகால வெளியேற்றம் மற்றும் அபாய மதிப்பீட்டிற்காக முழுமையாக தணிக்கை செய்யப்பட்டுள்ளன.',
        status: 'இணக்கமானது',
        cycle: 'பணியிட அபாய தணிக்கை முடிந்தது',
      },
      'chk-teacher-deployment': {
        title: 'CPE ஆசிரியர் நியமன ஒப்புதல்கள்',
        notes: 'ஒவ்வொரு விரிவுரையாளரும் தனித்தனியாக பரிசீலிக்கப்பட்டு CPE-க்கு தெரிவிக்கப்பட்டுள்ளனர்; 1:14 விகிதம் பராமரிக்கப்படுகிறது.',
        status: 'வருடாந்திர ஆய்வு செயலில்',
        cycle: 'கல்வி வாரிய வருடாந்திர ஆய்வு',
      },
      'chk-exam-moderation': {
        title: 'தேர்வு மதிப்பாய்வு மற்றும் விடைத்தாள் பாதுகாப்பு',
        notes: 'வினாத்தாள் பாதுகாப்பு, மதிப்பெண் நடுநிலையான ஆய்வு மற்றும் மாணவர் மேல்முறையீட்டு நடைமுறைகள்.',
        status: 'சட்டப்பூர்வ தரம்',
        cycle: 'தேர்வு கால சுழற்சிகள்',
      },
      'chk-fee-protection': {
        title: 'கட்டண வெளிப்படைத்தன்மை & தவணை முறை',
        notes: 'மாணவர்களின் நிதிப் பாதுகாப்பிற்காக அனுமதிக்கப்பட்ட மாதாந்திர தவணைகளில் மட்டுமே கட்டணம் வசூலிக்கப்படுகிறது.',
        status: 'இணக்கமானது',
        cycle: 'தணிக்கை செய்யப்பட்ட அட்டவணை',
      },
    },
  },
};

export const ComplianceChecklist: React.FC<ComplianceChecklistProps> = ({ locale = 'en' }) => {
  const t = UI_STRINGS[locale] || UI_STRINGS.en;

  return (
    <Card variant="elevated" className="border border-slate-200 overflow-hidden shadow-sm">
      <CardHeader className="bg-gradient-to-r from-navy-950 to-navy-900 text-white p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <Badge variant="gold">{t.badge}</Badge>
          <span className="text-xs text-slate-300 font-mono flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gold-400" />
            {t.schedule}
          </span>
        </div>
        <CardTitle className="text-xl sm:text-2xl text-white">
          {t.title}
        </CardTitle>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 font-sans">
          {t.subtitle}
        </p>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-xs text-left text-slate-700 border-collapse">
          <thead className="bg-slate-100 text-navy-950 font-sans uppercase text-[11px] tracking-wider border-b border-slate-200">
            <tr>
              <th scope="col" className="px-5 py-3.5 font-bold">{t.colArea}</th>
              <th scope="col" className="px-5 py-3.5 font-bold">{t.colAuthority}</th>
              <th scope="col" className="px-5 py-3.5 font-bold">{t.colRef}</th>
              <th scope="col" className="px-5 py-3.5 font-bold">{t.colStatus}</th>
              <th scope="col" className="px-5 py-3.5 font-bold">{t.colCycle}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {COMPLIANCE_CHECKLIST.map((item) => {
              const itemT = t.items[item.id as keyof typeof t.items];
              const title = itemT ? itemT.title : item.title;
              const notes = itemT ? itemT.notes : item.notes;
              const status = itemT ? itemT.status : item.currentStatus;
              const cycle = itemT ? itemT.cycle : item.lastReviewed;

              return (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 font-semibold text-navy-950">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                      <span>{title}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-normal pl-6 mt-0.5">
                      {notes}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {item.authority}
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-800">
                    {item.reference}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant="emerald" className="text-[10px]">
                      {status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-slate-500 font-sans">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cycle}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>

      <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="font-sans">
          {t.regNotice}
        </span>
        <a
          href="https://www.tpgateway.gov.sg/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-navy-900 font-bold hover:underline inline-flex items-center gap-1"
        >
          <span>{t.verifyTpg}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </Card>
  );
};
