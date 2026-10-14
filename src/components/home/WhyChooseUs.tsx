'use client';

import React from 'react';
import {
  Users,
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
} from 'lucide-react';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { Container, SectionHeading, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { ScrollReveal } from '@/lib/motion';

interface WhyChooseUsProps {
  locale: Locale;
  dict: Dictionary;
}

const UI_STRINGS = {
  en: {
    eyebrow: 'Institutional Advantages',
    title: 'Why Choose Edulearn International College',
    description: 'Grounded exclusively in official Singapore regulatory accreditations and authentic operational standards.',
  },
  'zh-sg': {
    eyebrow: '学院办学优势',
    title: '为什么选择新加坡爱学习国际学院',
    description: '完全立足于新加坡官方资质认证与真实可靠的办学标准。',
  },
  'ta-sg': {
    eyebrow: 'நிறுவன நன்மைகள்',
    title: 'எடுலேர்ன் சர்வதேசக் கல்லூரியை ஏன் தேர்வு செய்ய வேண்டும்',
    description: 'அதிகாரப்பூர்வ சிங்கப்பூர் ஒழுங்குமுறை அங்கீகாரங்கள் மற்றும் உண்மையான தரநிலைகளை அடிப்படையாகக் கொண்டது.',
  },
};

const STRENGTHS_DATA = [
  {
    icon: Users,
    title: {
      en: 'Guaranteed 1:14 Class Ratio',
      'zh-sg': '严守 1:14 精品师生比',
      'ta-sg': 'உறுதிசெய்யப்பட்ட 1:14 வகுப்பு விகிதம்',
    },
    desc: {
      en: 'Intimate cohort learning capped at 14 and 15 students per classroom (Classrooms 1 & 2), ensuring personal feedback and focused tutorial support.',
      'zh-sg': '严格将课室容量控制在14至15人（1号及2号课室），确保每位学员都能获得讲师的针对性辅导与充分互动。',
      'ta-sg': 'ஒரு வகுப்பறைக்கு 14 மற்றும் 15 மாணவர்கள் மட்டுமே அனுமதிக்கப்பட்டு, தனிப்பட்ட வழிகாட்டல் வழங்கப்படுகிறது.',
    },
    badge: {
      en: 'Cohort Cap',
      'zh-sg': '班级上限',
      'ta-sg': 'மாணவர் வரம்பு',
    },
  },
  {
    icon: Award,
    title: {
      en: '35 Registered Faculty Members',
      'zh-sg': '35 位经 CPE 注册合规讲师',
      'ta-sg': '35 பதிவு செய்யப்பட்ட பேராசிரியர்கள்',
    },
    desc: {
      en: 'Every lecturer deployed is officially registered with the Committee for Private Education (CPE), possessing certified university and industry credentials.',
      'zh-sg': '所有授课教师均在私立教育理事会（CPE）正式备案，具备大学本科或硕士学术资历及丰富的行业实战经验。',
      'ta-sg': 'ஒவ்வொரு விரிவுரையாளரும் CPE இல் பதிவு செய்யப்பட்டு, தகுதியான கல்வி மற்றும் தொழில் அனுபவம் கொண்டவர்கள்.',
    },
    badge: {
      en: 'Faculty Oversight',
      'zh-sg': '师资监管',
      'ta-sg': 'ஆசிரியர் மேற்பார்வை',
    },
  },
  {
    icon: ShieldCheck,
    title: {
      en: 'Standard Contract Version 4.1',
      'zh-sg': '4.1 版标准 PEI 学生合同保障',
      'ta-sg': 'நிலையான ஒப்பந்தம் பதிப்பு 4.1',
    },
    desc: {
      en: 'Protected under Singapore statutory provisions including the mandatory 7-working-day cooling-off period and Schedule D transparent refund matrix.',
      'zh-sg': '受新加坡法定法规全面保障，包括强制执行的 7 个工作日冷静期及 Schedule D 透明学费退款机制。',
      'ta-sg': '7 வேலை நாள் யோசனை காலம் மற்றும் அட்டவணை D கட்டண திரும்பப் பெறும் வழிகாட்டலின் கீழ் முழு பாதுகாப்பு.',
    },
    badge: {
      en: 'Student Rights',
      'zh-sg': '学生权益',
      'ta-sg': 'மாணவர் உரிமை',
    },
  },
  {
    icon: CheckCircle2,
    title: {
      en: 'bizSAFE Level 3 Certified Campus',
      'zh-sg': 'bizSAFE Level 3 安全认证校园',
      'ta-sg': 'bizSAFE நிலை 3 சான்றளிக்கப்பட்ட வளாகம்',
    },
    desc: {
      en: 'Awarded by Singapore’s Workplace Safety and Health Council (WSHC), confirming thorough risk assessment audits across all facilities.',
      'zh-sg': '获得新加坡工作场所安全与卫生理事会（WSHC）认证，确保全校教学及办公设施均通过严格风险评估审查。',
      'ta-sg': 'சிங்கப்பூர் WSH கவுன்சிலால் வழங்கப்பட்டது, அனைத்து வசதிகளிலும் முழுமையான பாதுகாப்பு தணிக்கை உறுதிப்படுத்தப்பட்டுள்ளது.',
    },
    badge: {
      en: 'Campus Safety',
      'zh-sg': '校园安全',
      'ta-sg': 'வளாக பாதுகாப்பு',
    },
  },
  {
    icon: Clock,
    title: {
      en: 'Part-Time & Modular Flexibility',
      'zh-sg': '兼读制与模块化灵活修读',
      'ta-sg': 'பகுதி நேர & மட்டு நெகிழ்வுத்தன்மை',
    },
    desc: {
      en: 'Evening and weekend lecture options specifically designed for adult technicians, working professionals, and continuous upskilling.',
      'zh-sg': '开设晚间及周末面授班，专为在职技术工匠、工程技术人员及追求技能提升的职场人士量身定制。',
      'ta-sg': 'பணியாளர்கள் மற்றும் தொழில்நுட்ப வல்லுநர்களுக்காக வடிவமைக்கப்பட்ட மாலை மற்றும் வார இறுதி விரிவுரைகள்.',
    },
    badge: {
      en: 'Adult Learners',
      'zh-sg': '在职进修',
      'ta-sg': 'வயதுவந்த கற்பவர்கள்',
    },
  },
  {
    icon: MapPin,
    title: {
      en: 'Central City Accessibility',
      'zh-sg': '新加坡核心市区优越交通',
      'ta-sg': 'நகர மைய அணுகல்தன்மை',
    },
    desc: {
      en: 'Situated at New World Centre in Little India, just 3 minutes walk from Jalan Besar MRT (Downtown Line) and 7 minutes from Farrer Park MRT.',
      'zh-sg': '校区坐落于小印度新世界中心，步行 3 分钟即可抵达惹兰勿刹地铁站（滨海市区线），7 分钟即达花拉公园地铁站。',
      'ta-sg': 'லிட்டில் இந்தியா நியூ வேர்ல்ட் சென்டரில் அமைந்துள்ளது, ஜலான் பெசார் எம்ஆர்டியில் இருந்து 3 நிமிட நடைபயணம்.',
    },
    badge: {
      en: 'Central Singapore',
      'zh-sg': '交通枢纽',
      'ta-sg': 'மைய சிங்கப்பூர்',
    },
  },
];

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ locale, dict }) => {
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  return (
    <section aria-labelledby="why-choose-us-heading" className="py-16 sm:py-20 bg-slate-50">
      <Container size="default" className="space-y-12">
        <SectionHeading
          id="why-choose-us-heading"
          eyebrow={ui.eyebrow}
          title={ui.title}
          description={ui.description}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STRENGTHS_DATA.map((item, index) => {
            const Icon = item.icon;
            const title = item.title[locale] || item.title.en;
            const desc = item.desc[locale] || item.desc.en;
            const badge = item.badge[locale] || item.badge.en;

            return (
              <ScrollReveal
                key={index}
                delay={index * 0.06}
              >
                <div className="h-full bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-prestige hover:border-gold-500/50 transition-[border-color,box-shadow] duration-200 space-y-3 group">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
                      {badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-navy-950 group-hover:text-royal-600 transition-colors">
                    {title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
