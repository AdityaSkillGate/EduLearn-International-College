'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Maximize2,
  Compass,
} from 'lucide-react';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { Container, SectionHeading, Badge, Button } from '@/components/ui';
import { ScrollReveal } from '@/lib/motion';

interface FacilitiesPreviewProps {
  locale: Locale;
  dict: Dictionary;
}

const UI_STRINGS = {
  en: {
    campusOverlay: 'NEW WORLD CENTRE CAMPUS',
    classCap: 'Classrooms 1 & 2 (15 & 14 Capacity)',
    galleryBtn: 'Gallery',
    eyebrow: 'Campus Environment',
    title: 'Modern Interactive Classrooms at Little India',
    description: 'Located at 1 Jalan Berseh, #02-28 New World Centre, Singapore 209037. Specifically audited for intimate small-group instruction.',
    c1Badge: 'Classroom 1',
    c1Title: 'Engineering & CAD Lecture Suite',
    c1Desc: 'Approved capacity of 15 students. Tailored for computer-aided engineering drafting, civil blueprint analysis, and IT tutorials.',
    c2Badge: 'Classroom 2',
    c2Title: 'Executive Seminar & Tutorial Room',
    c2Desc: 'Approved capacity of 14 students. Configured for business management, facilities discussions, and interactive group mentorship.',
    b1: 'Fully air-conditioned lecture spaces with high-speed multimedia projection',
    b2: 'bizSAFE Level 3 certified emergency evacuation and risk management systems',
    b3: 'Minutes walk from Downtown Line (Jalan Besar) and North East Line (Farrer Park)',
    btnInspect: 'Inspect Campus Facilities & Capacities',
  },
  'zh-sg': {
    campusOverlay: '新世界中心校区',
    classCap: '1号与2号课室（15及14座容量）',
    galleryBtn: '实景图库',
    eyebrow: '教学环境与校区',
    title: '小印度现代化多媒体互动课室',
    description: '位于新加坡惹兰勿刹1号新世界中心 #02-28（邮编 209037）。专为精品小班面对面研讨教学量身规划。',
    c1Badge: '1 号课室',
    c1Title: '工程制图与 CAD 电脑实训课室',
    c1Desc: '核准容量 15 名学生。专用于计算机辅助工程制图、土木蓝图识图及 IT 电脑上机实验。',
    c2Badge: '2 号课室',
    c2Title: '行政研讨与专业案例研习课室',
    c2Desc: '核准容量 14 名学生。专用于工商管理小组研讨、物业设施管理案例推演与师生互动交流。',
    b1: '全空调课室配备高速多媒体数码投影与音响设备',
    b2: '新加坡 bizSAFE Level 3 认证应急疏散与全方位风险管控体系',
    b3: '步行数分钟即达滨海市区线（惹兰勿刹）及东北线（花拉公园）地铁站',
    btnInspect: '查阅完整校区设施与空间规格',
  },
  'ta-sg': {
    campusOverlay: 'நியூ வேர்ல்ட் சென்டர் வளாகம்',
    classCap: 'வகுப்பறைகள் 1 & 2 (15 & 14 இடங்கள்)',
    galleryBtn: 'புகைப்படங்கள்',
    eyebrow: 'வளாக சூழல்',
    title: 'லிட்டில் இந்தியாவில் நவீன வகுப்பறைகள்',
    description: '1 ஜலான் பெசார், #02-28 நியூ வேர்ல்ட் சென்டரில் அமைந்துள்ளது. சிறிய குழு பயிற்சிக்காக அங்கீகரிக்கப்பட்டது.',
    c1Badge: 'வகுப்பறை 1',
    c1Title: 'பொறியியல் & வரைபட விரிவுரை கூடம்',
    c1Desc: '15 மாணவர்களுக்கான கொள்ளளவு. பொறியியல் வரைபடம் மற்றும் கணினி பயிற்சிகளுக்காக வடிவமைக்கப்பட்டது.',
    c2Badge: 'வகுப்பறை 2',
    c2Title: 'நிர்வாக கருத்தரங்கு & பயிற்சி அறை',
    c2Desc: '14 மாணவர்களுக்கான கொள்ளளவு. வணிக மேலாண்மை மற்றும் கலந்துரையாடல்களுக்கு ஏற்றது.',
    b1: 'முழுமையான குளிர்சாதன வசதி மற்றும் மல்டிமீடியா ப்ரொஜெக்டர்',
    b2: 'bizSAFE நிலை 3 சான்றளிக்கப்பட்ட அவசரகால வெளியேற்ற மற்றும் பாதுகாப்பு அமைப்புகள்',
    b3: 'ஜலான் பெசார் மற்றும் ஃபேரர் பார்க் எம்ஆர்டி நிலையங்களிலிருந்து சில நிமிட நடைபயணம்',
    btnInspect: 'வளாக வசதிகள் & கொள்ளளவை ஆய்வு செய்க',
  },
};

export const FacilitiesPreview: React.FC<FacilitiesPreviewProps> = ({ locale, dict }) => {
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  return (
    <section aria-labelledby="facilities-preview-heading" className="py-16 sm:py-20 bg-white">
      <Container size="default" className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Authentic Photography & Visual Callout (6 cols) */}
          <ScrollReveal className="lg:col-span-6 relative" fadeOnly>
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-prestige group">
              <img
                src="/images/classroom-facilities.jpg"
                alt="Edulearn International College seminar classroom at New World Centre Singapore with small cohort learning"
                width={1280}
                height={720}
                loading="lazy"
                className="w-full h-auto object-cover aspect-[16/10] sm:aspect-[16/9] transform group-hover:scale-102 motion-reduce:group-hover:scale-100 transition-transform duration-500"
              />

              {/* Floating Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-navy-950/90 backdrop-blur-md border border-navy-700/80 rounded-xl p-3.5 text-white flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-gold-400 font-semibold uppercase tracking-wider">
                    {ui.campusOverlay}
                  </div>
                  <div className="text-xs sm:text-sm font-serif font-bold mt-0.5">
                    {ui.classCap}
                  </div>
                </div>
                <Link
                  href={`/${locale}/gallery/`}
                  className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-gold-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>{ui.galleryBtn}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Classroom Specifications (6 cols) */}
          <ScrollReveal delay={0.08} className="lg:col-span-6 space-y-6">
            <SectionHeading
              id="facilities-preview-heading"
              eyebrow={ui.eyebrow}
              title={ui.title}
              description={ui.description}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="navy">{ui.c1Badge}</Badge>
                  <span className="text-[11px] font-mono font-bold text-slate-700">23 m²</span>
                </div>
                <h3 className="text-sm font-serif font-bold text-navy-950">
                  {ui.c1Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {ui.c1Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="navy">{ui.c2Badge}</Badge>
                  <span className="text-[11px] font-mono font-bold text-slate-700">22 m²</span>
                </div>
                <h3 className="text-sm font-serif font-bold text-navy-950">
                  {ui.c2Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {ui.c2Desc}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{ui.b1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{ui.b2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{ui.b3}</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                href={`/${locale}/about/facilities/`}
                variant="royal"
                iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                {ui.btnInspect}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
};
