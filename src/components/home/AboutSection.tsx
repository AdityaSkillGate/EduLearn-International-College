'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { Container, SectionHeading, Badge, Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { ScrollReveal, MOTION_STAGGERS } from '@/lib/motion';

interface AboutSectionProps {
  locale: Locale;
  dict: Dictionary;
}

const UI_STRINGS = {
  en: {
    eyebrow: 'Institutional Heritage',
    title: 'Preparing Global Mindsets for High-Growth Industries',
    description: 'Edulearn International College Pte. Ltd. is registered with the Committee for Private Education (CPE), SkillsFuture Singapore (SSG), under PEI Registration No: 201708935D.',
    p1: 'Founded on the guiding ethos that “Education is a Lifelong Learning Journey”, we empower technical tradespeople, adult professionals, and international scholars to acquire certified qualifications that align with industry demand across Singapore.',
    p2: 'From foundational diplomas to advanced engineering leadership credentials, our curricula merge classroom theoretical precision with applied technical training at our Little India campus.',
    btnAbout: 'Learn More About Our College',
    btnGov: 'Academic Governance & Faculty',
    card1Badge: 'Institutional Vision',
    card1Title: 'Internationally Recognized',
    card1Desc: 'To grow into an internationally recognized Private Education Institute providing superior education through outstanding techniques and dedicated commitment.',
    card2Badge: 'Institutional Mission',
    card2Title: 'Workforce Empowerment',
    card2Desc: 'To prepare students with a global mindset to tackle emerging workplace opportunities across Singapore and Southeast Asia.',
    card3Badge: 'Core Educational Philosophy',
    card3Quote: '“EDUcation is a Lifelong LEARNing Journey which never ends…”',
    card3Desc: 'Designed for adult practitioners seeking structured evening/weekend modular progression and international students striving for Singapore certifications.',
  },
  'zh-sg': {
    eyebrow: '学院传统与办学资质',
    title: '立足前沿行业，培养具备全球化视野的专业人才',
    description: '新加坡爱学习国际学院经精深技能发展局（SSG）旗下私立教育理事会（CPE）严格核准注册（PEI 注册号：201708935D）。',
    p1: '秉承“教育是一场永不停歇的终身学习之旅”的核心理念，我们助力技术工匠、在职人士与国际学子获取符合新加坡各行业发展需求的正规认证学历。',
    p2: '从小班大专课程到高阶工程管理资质，我们在小印度校区将严谨的理论精要与实际操作演练深度结合。',
    btnAbout: '深入了解学院概况',
    btnGov: '学术治理与师资配置',
    card1Badge: '学院愿景',
    card1Title: '国际公认的办学水准',
    card1Desc: '通过卓越的教学技能与坚定的教育承诺，成长为提供优质教育的国际知名私立教育学院。',
    card2Badge: '学院使命',
    card2Title: '赋能职场精英',
    card2Desc: '培养具备全球视野的学生，以从容应对新加坡及东南亚地区不断涌现的职场新机遇。',
    card3Badge: '核心教育哲学',
    card3Quote: '“EDUcation（教育）是一场永无止境的终身 LEARNing（学习）之旅……”',
    card3Desc: '专为寻求晚间与周末模块化进修的在职人员，以及追求新加坡权威资质认证的广大学员精心设计。',
  },
  'ta-sg': {
    eyebrow: 'நிறுவன பாரம்பரியம்',
    title: 'வளர்ந்து வரும் தொழில்களுக்கான உலகளாவிய சிந்தனையை உருவாக்குதல்',
    description: 'எடுலேர்ன் சர்வதேசக் கல்லூரி சிங்கப்பூர் CPE (201708935D) கீழ் பதிவு செய்யப்பட்ட கல்வி நிறுவனமாகும்.',
    p1: 'தொழில் வல்லுநர்கள், பணியாளர்கள் மற்றும் மாணவர்கள் சிங்கப்பூரின் தொழில் தேவைகளுக்கு ஏற்ப சான்றளிக்கப்பட்ட தகுதிகளைப் பெற உதவுகிறோம்.',
    p2: 'அடிப்படை டிப்ளமோ முதல் மேம்பட்ட பொறியியல் மேலாண்மை வரை, எங்கள் பாடத்திட்டங்கள் நேரடி தொழில்நுட்ப பயிற்சியை ஒருங்கிணைக்கின்றன.',
    btnAbout: 'எங்கள் கல்லூரி பற்றி மேலும் அறிய',
    btnGov: 'கல்வி ஆளுமை & ஆசிரியர்கள்',
    card1Badge: 'நிறுவன பார்வை',
    card1Title: 'சர்வதேச அளவில் அங்கீகரிக்கப்பட்டது',
    card1Desc: 'சிறந்த கற்பித்தல் நுட்பங்கள் மற்றும் அர்ப்பணிப்பு மூலம் உயர்தர கல்வியை வழங்கும் சர்வதேச அங்கீகாரம் பெற்ற தனியார் கல்வி நிறுவனமாக மாறுதல்.',
    card2Badge: 'நிறுவன நோக்கம்',
    card2Title: 'பணியாளர் அதிகாரமளித்தல்',
    card2Desc: 'சிங்கப்பூர் மற்றும் தென்கிழக்கு ஆசியா முழுவதும் புதிய வேலை வாய்ப்புகளை எதிர்கொள்ளும் வகையில் உலகளாவிய சிந்தனையுடன் மாணவர்களை தயார்படுத்துதல்.',
    card3Badge: 'முக்கிய கல்வித் தத்துவம்',
    card3Quote: '“கல்வி என்பது ஒருபோதும் முடிவடையாத வாழ்நாள் கற்றல் பயணம்…”',
    card3Desc: 'பணியாளர்கள் மற்றும் சர்வதேச மாணவர்களுக்காக வடிவமைக்கப்பட்ட மாலை மற்றும் வார இறுதி விரிவுரைகள்.',
  },
};

export const AboutSection: React.FC<AboutSectionProps> = ({ locale, dict }) => {
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  return (
    <section aria-labelledby="about-section-heading" className="py-16 sm:py-20 bg-white">
      <Container size="default" className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: College Introduction (6 cols) */}
          <ScrollReveal className="lg:col-span-6 space-y-6">
            <SectionHeading
              id="about-section-heading"
              eyebrow={ui.eyebrow}
              title={ui.title}
              description={ui.description}
            />

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-sans">
              <p>{ui.p1}</p>
              <p>{ui.p2}</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Button
                href={`/${locale}/about/`}
                variant="royal"
                iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                {ui.btnAbout}
              </Button>
              <Button
                href={`/${locale}/governance/`}
                variant="outline"
              >
                {ui.btnGov}
              </Button>
            </div>
          </ScrollReveal>

          {/* Right Column: Vision, Mission & Philosophy Cards (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: Vision */}
            <ScrollReveal delay={MOTION_STAGGERS.normal}>
              <div className="h-full p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 text-gold-700 flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gold-700 font-semibold block">
                    {ui.card1Badge}
                  </span>
                  <h3 className="text-base font-serif font-bold text-navy-950 mt-1">
                    {ui.card1Title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {ui.card1Desc}
                </p>
              </div>
            </ScrollReveal>

            {/* Card 2: Mission */}
            <ScrollReveal delay={MOTION_STAGGERS.normal * 2}>
              <div className="h-full p-5 rounded-2xl bg-navy-950 text-white border border-navy-800 shadow-prestige space-y-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500 text-navy-950 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gold-400 font-semibold block">
                    {ui.card2Badge}
                  </span>
                  <h3 className="text-base font-serif font-bold text-white mt-1">
                    {ui.card2Title}
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {ui.card2Desc}
                </p>
              </div>
            </ScrollReveal>

            {/* Card 3: Philosophy Full Width */}
            <ScrollReveal delay={MOTION_STAGGERS.normal * 3} className="sm:col-span-2">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-950 text-white border border-navy-800 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-navy-800 border border-navy-700 text-gold-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gold-400 font-semibold">
                    {ui.card3Badge}
                  </div>
                  <h4 className="text-sm font-serif font-bold text-white italic">
                    {ui.card3Quote}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ui.card3Desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
