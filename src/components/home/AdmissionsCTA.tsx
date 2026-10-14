'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  ArrowRight,
  MessageSquare,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { Container, Button } from '@/components/ui';
import { ScrollReveal } from '@/lib/motion';

interface AdmissionsCTAProps {
  locale: Locale;
  dict: Dictionary;
}

const UI_STRINGS = {
  en: {
    eyebrow: 'Admissions & Cohort Enrolment',
    title: 'Ready to Advance Your Professional Career in Singapore?',
    description: 'Take the next decisive step in your career journey. Submit your enrolment application today or schedule an on-campus consultation with an academic advisor.',
    whatsappBtn: 'Chat on WhatsApp (+65 9004 9657)',
    callBtn: 'Call Campus: +65 6258 7189',
    strip1: 'CPE PEI Reg No: 201708935D',
    strip2: 'Standard Contract v4.1 Protected',
    strip3: 'bizSAFE Level 3 Certified Campus',
  },
  'zh-sg': {
    eyebrow: '招生咨询与新班报名',
    title: '准备好在新加坡开启更广阔的专业职业生涯了吗？',
    description: '在职业提升的道路上迈出坚实一步。立即提交报读咨询，或预约与专业学术顾问进行面对面线下面谈。',
    whatsappBtn: 'WhatsApp 在线咨询 (+65 9004 9657)',
    callBtn: '致电校区：+65 6258 7189',
    strip1: 'CPE PEI 注册机构编号：201708935D',
    strip2: '受 4.1 版标准学生合同全面保障',
    strip3: 'bizSAFE Level 3 安全认证校园',
  },
  'ta-sg': {
    eyebrow: 'சேர்க்கை & பதிவு',
    title: 'சிங்கப்பூரில் உங்கள் தொழில் வாழ்க்கையை மேம்படுத்த தயாரா?',
    description: 'உங்கள் தொழில் பயணத்தின் அடுத்த கட்டத்தை தொடங்குங்கள். இன்றே விண்ணப்பிக்கவும் அல்லது ஆலோசகருடன் ஆலோசிக்கவும்.',
    whatsappBtn: 'WhatsApp அரட்டை (+65 9004 9657)',
    callBtn: 'வளாகத்தை அழைக்கவும்: +65 6258 7189',
    strip1: 'CPE PEI பதிவு எண்: 201708935D',
    strip2: 'நிலையான ஒப்பந்தம் v4.1 பாதுகாப்பு',
    strip3: 'bizSAFE நிலை 3 சான்றளிக்கப்பட்ட வளாகம்',
  },
};

export const AdmissionsCTA: React.FC<AdmissionsCTAProps> = ({ locale, dict }) => {
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  return (
    <section aria-labelledby="admissions-cta-heading" className="py-16 sm:py-24 bg-navy-950 text-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-royal-600/10 rounded-full blur-3xl" />
      </div>

      <Container size="default" className="relative z-10">
        <ScrollReveal
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 text-xs font-semibold tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
            <span>{ui.eyebrow}</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2
              id="admissions-cta-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]"
            >
              {ui.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
              {ui.description}
            </p>
          </div>

          {/* High-Impact Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              href={`/${locale}/apply/`}
              variant="primary"
              size="lg"
              iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
              className="w-full sm:w-auto"
            >
              {dict.nav.applyNow}
            </Button>

            <a
              href="https://wa.me/6590049657?text=Hello%20Edulearn%20Admissions%2C%20I%20would%20like%20to%20enquire%20about%20course%20enrollment."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-base rounded-xl shadow-prestige transition-colors duration-200"
            >
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
              <span>{ui.whatsappBtn}</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>

            <a
              href="tel:+6562587189"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-navy-900/90 hover:bg-navy-800 text-slate-200 border border-navy-700 font-medium text-sm rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 text-gold-400" aria-hidden="true" />
              <span>{ui.callBtn}</span>
            </a>
          </div>

          {/* Statutory Reassurance Strip */}
          <div className="pt-8 border-t border-navy-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{ui.strip1}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{ui.strip2}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{ui.strip3}</span>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
