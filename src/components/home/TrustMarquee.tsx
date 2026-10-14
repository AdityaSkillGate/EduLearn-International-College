'use client';

import React, { useState } from 'react';
import { ShieldCheck, Award, CheckCircle2, Users, Pause, Play } from 'lucide-react';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { Container } from '@/components/ui';

interface TrustMarqueeProps {
  locale: Locale;
  dict: Dictionary;
}

const LOCALIZED_TRUST_ITEMS: Record<Locale, string[]> = {
  en: [
    'Singapore CPE / SSG PEI Registration No: 201708935D',
    'Enhanced Registration Framework (ERF) Compliant',
    'bizSAFE Level 3 Safety Certified by Workplace Safety & Health Council',
    'Standard PEI-Student Contract Version 4.1 • 7-Day Cooling-Off Period Protected',
    'Guaranteed 1:14 Teacher-to-Student Ratio in Classrooms 1 & 2',
    '35 CPE-Registered Deployed Specialist Lecturers',
    'Campus at 1 Jalan Berseh, #02-28 New World Centre, Singapore 209037',
  ],
  'zh-sg': [
    '新加坡精深技能发展局 (SSG) / 私立教育理事会 (CPE) 注册号：201708935D',
    '新加坡强化注册架构 (ERF) 合规认证办学机构',
    '新加坡工作场所安全与卫生理事会 (WSHC) bizSAFE Level 3 安全认证',
    '4.1 版标准学生合同保障 • 享法定 7 个工作日冷静期全额退费机制',
    '1号及2号面授课室严格坚守 1:14 精品师生比例上限',
    '35 名经私立教育理事会备案审核之专业执教导师',
    '校址：新加坡 惹兰勿刹 1号 新世界中心 #02-28（邮编 209037）',
  ],
  'ta-sg': [
    'சிங்கப்பூர் CPE / SSG PEI பதிவு எண்: 201708935D',
    'மேம்படுத்தப்பட்ட பதிவு கட்டமைப்பு (ERF) இணக்கமானது',
    'WSHC சிங்கப்பூர் bizSAFE நிலை 3 பாதுகாப்பு சான்றிதழ்',
    'நிலையான மாணவர் ஒப்பந்தம் 4.1 • 7 நாட்கள் யோசனை கால பாதுகாப்பு',
    'வகுப்பறைகள் 1 & 2 இல் 1:14 ஆசிரியர்-மாணவர் விகித உத்தரவாதம்',
    '35 CPE-பதிவு பெற்ற சிறப்பு விரிவுரையாளர்கள்',
    'வளாகம்: 1 ஜாலான் பெர்சே, #02-28 நியூ வேர்ல்ட் சென்டர், சிங்கப்பூர் 209037',
  ],
};

const BADGE_STRINGS = {
  en: {
    badge1Cat: 'CPE Registered',
    badge1Val: 'PEI: 201708935D',
    badge1Sub: 'Enhanced Registration Framework',
    badge2Cat: 'Workplace Safety',
    badge2Val: 'bizSAFE Level 3',
    badge2Sub: 'WSHC Singapore Certified',
    badge3Cat: 'Student Contract',
    badge3Val: 'Version 4.1',
    badge3Sub: '7-Day Cooling-off Period',
    badge4Cat: 'Cohort Guarantee',
    badge4Val: '1:14 Class Ratio',
    badge4Sub: 'Classrooms 1 & 2 at New World',
    pauseLabel: 'Pause scrolling ticker',
    playLabel: 'Resume scrolling ticker',
  },
  'zh-sg': {
    badge1Cat: 'CPE 官方注册',
    badge1Val: '注册号：201708935D',
    badge1Sub: '强化注册框架 (ERF) 认证',
    badge2Cat: '安全环境认证',
    badge2Val: 'bizSAFE Level 3',
    badge2Sub: '新加坡工作场所安全理事会',
    badge3Cat: '标准学生合同',
    badge3Val: '4.1 标准版本',
    badge3Sub: '法定 7 个工作日冷静期',
    badge4Cat: '精品小班保障',
    badge4Val: '1:14 师生比例',
    badge4Sub: '新世界中心 1号与2号课室',
    pauseLabel: '暂停滚动机关认证信息',
    playLabel: '恢复滚动机关认证信息',
  },
  'ta-sg': {
    badge1Cat: 'CPE பதிவு பெற்றது',
    badge1Val: 'PEI: 201708935D',
    badge1Sub: 'மேம்பட்ட பதிவு கட்டமைப்பு',
    badge2Cat: 'பணி இட பாதுகாப்பு',
    badge2Val: 'bizSAFE நிலை 3',
    badge2Sub: 'WSHC சிங்கப்பூர் சான்றிதழ்',
    badge3Cat: 'மாணவர் ஒப்பந்தம்',
    badge3Val: 'பதிப்பு 4.1',
    badge3Sub: '7 நாட்கள் யோசனை காலம்',
    badge4Cat: 'வகுப்பறை உத்தரவாதம்',
    badge4Val: '1:14 வகுப்பு விகிதம்',
    badge4Sub: 'வகுப்பறைகள் 1 & 2',
    pauseLabel: 'தகவல் உருளலை இடைநிறுத்து',
    playLabel: 'தகவல் உருளலை இயக்கு',
  },
};

export const TrustMarquee: React.FC<TrustMarqueeProps> = ({ locale }) => {
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const items = LOCALIZED_TRUST_ITEMS[locale] || LOCALIZED_TRUST_ITEMS.en;
  const labels = BADGE_STRINGS[locale] || BADGE_STRINGS.en;

  return (
    <section
      aria-label={labels.badge1Cat}
      className="bg-navy-900 border-y border-navy-800/90 text-white overflow-hidden py-3"
    >
      {/* 1. CSS-Powered Marquee with Visible Pause Control & Reduced-Motion Bypass */}
      <div className="relative flex items-center">
        {/* Pause / Play Toggle for Accessibility (WCAG 2.2.2 Pause, Stop, Hide) */}
        <div className="absolute left-3 z-10 hidden sm:block">
          <button
            type="button"
            onClick={() => setIsManuallyPaused((prev) => !prev)}
            aria-pressed={isManuallyPaused}
            aria-label={isManuallyPaused ? labels.playLabel : labels.pauseLabel}
            title={isManuallyPaused ? labels.playLabel : labels.pauseLabel}
            className="p-1.5 rounded-md bg-navy-950/80 hover:bg-navy-800 text-gold-400 border border-navy-700/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            {isManuallyPaused ? (
              <Play className="w-3 h-3 fill-current" aria-hidden="true" />
            ) : (
              <Pause className="w-3 h-3 fill-current" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Continuous Marquee Ticker */}
        <div
          className="group relative flex overflow-x-hidden w-full select-none"
          tabIndex={0}
          aria-label={`${labels.badge1Cat}. Focus or hover to pause scrolling.`}
        >
          <div
            className={`flex shrink-0 items-center gap-8 ${
              isManuallyPaused
                ? '[animation-play-state:paused]'
                : 'animate-marquee group-hover:[animation-play-state:paused] group-focus:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]'
            }`}
          >
            {items.concat(items).map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 text-xs text-slate-300 font-sans tracking-wide shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. 4 Core Quantitative Trust Badges */}
      <Container size="default" className="pt-6 pb-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Badge 1: CPE Registration */}
          <div className="bg-navy-950/80 border border-navy-800 rounded-xl p-3.5 sm:p-4 flex items-start gap-3 transition-colors hover:border-gold-500/40">
            <div className="p-2 rounded-lg bg-navy-800 text-gold-400 border border-navy-700 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-gold-400 font-semibold font-mono">
                {labels.badge1Cat}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                {labels.badge1Val}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {labels.badge1Sub}
              </div>
            </div>
          </div>

          {/* Badge 2: bizSAFE Level 3 */}
          <div className="bg-navy-950/80 border border-navy-800 rounded-xl p-3.5 sm:p-4 flex items-start gap-3 transition-colors hover:border-emerald-500/40">
            <div className="p-2 rounded-lg bg-navy-800 text-emerald-400 border border-navy-700 shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold font-mono">
                {labels.badge2Cat}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                {labels.badge2Val}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {labels.badge2Sub}
              </div>
            </div>
          </div>

          {/* Badge 3: Student Contract */}
          <div className="bg-navy-950/80 border border-navy-800 rounded-xl p-3.5 sm:p-4 flex items-start gap-3 transition-colors hover:border-royal-500/40">
            <div className="p-2 rounded-lg bg-navy-800 text-blue-400 border border-navy-700 shrink-0">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-blue-400 font-semibold font-mono">
                {labels.badge3Cat}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                {labels.badge3Val}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {labels.badge3Sub}
              </div>
            </div>
          </div>

          {/* Badge 4: Teacher Ratio */}
          <div className="bg-navy-950/80 border border-navy-800 rounded-xl p-3.5 sm:p-4 flex items-start gap-3 transition-colors hover:border-gold-500/40">
            <div className="p-2 rounded-lg bg-navy-800 text-gold-400 border border-navy-700 shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-gold-400 font-semibold font-mono">
                {labels.badge4Cat}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                {labels.badge4Val}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {labels.badge4Sub}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
