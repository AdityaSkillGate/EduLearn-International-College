'use client';

import React from 'react';
import Link from 'next/link';
import {
  Wrench,
  Laptop,
  Building,
  Briefcase,
  Clock,
  Users,
  ArrowRight,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { Container, SectionHeading, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@/components/ui';
import { ScrollReveal } from '@/lib/motion';

interface CourseDiscoveryProps {
  locale: Locale;
  dict: Dictionary;
}

const UI_STRINGS = {
  en: {
    eyebrow: 'Academic Prospectus',
    title: 'Explore 21 CPE-Registered Qualifications',
    description: 'Designed for ambitious adult learners and international candidates seeking verified credentials in Singapore.',
    exploreBtn: 'Explore Programs',
    ratioLabel: '1:14 Ratio',
  },
  'zh-sg': {
    eyebrow: '学术大纲与课程导览',
    title: '探索 21 项经 CPE 注册核准的学术资质',
    description: '专为在职成年进修人士及立志在新加坡考取正规文凭资质的国际学子设计。',
    exploreBtn: '探索课程详情',
    ratioLabel: '1:14 师生比',
  },
  'ta-sg': {
    eyebrow: 'கல்வி வாய்ப்புகள்',
    title: '21 அங்கீகரிக்கப்பட்ட தகுதிகளை ஆராயுங்கள்',
    description: 'சிங்கப்பூரில் சான்றளிக்கப்பட்ட தகுதிகளைப் பெற விரும்பும் மாணவர்கள் மற்றும் பணியாளர்களுக்காக வடிவமைக்கப்பட்டது.',
    exploreBtn: 'படிப்புகளை ஆராயுங்கள்',
    ratioLabel: '1:14 விகிதம்',
  },
};

const CATEGORIES = [
  {
    id: 'engineering',
    title: {
      en: 'Engineering & Construction Specializations',
      'zh-sg': '工程与建筑专业大专',
      'ta-sg': 'பொறியியல் & கட்டடவியல் டிப்ளமோ',
    },
    desc: {
      en: 'Civil, Mechanical, and Electrical engineering diplomas alongside Advanced Diplomas in Construction Management.',
      'zh-sg': '土木工程、机械工程、电气工程大专以及建筑工程管理高级大专课程。',
      'ta-sg': 'சிவில், மெக்கானிக்கல் மற்றும் எலக்ட்ரிகல் இன்ஜினியரிங் டிப்ளமோக்கள் மற்றும் கட்டுமான மேலாண்மை படிப்புகள்.',
    },
    icon: Wrench,
    badge: {
      en: '18 Programs',
      'zh-sg': '18 项专业课程',
      'ta-sg': '18 படிப்புகள்',
    },
    duration: {
      en: '6 – 12 Months',
      'zh-sg': '6 至 12 个月',
      'ta-sg': '6 – 12 மாதங்கள்',
    },
    hours: '96 – 192 Hours',
    linkAnchor: 'diplomas',
    color: 'border-t-gold-500',
  },
  {
    id: 'it',
    title: {
      en: 'Information Technology & Systems',
      'zh-sg': '资讯科技与系统技术',
      'ta-sg': 'தகவல் தொழில்நுட்பம் & நெட்வொர்க்கிங்',
    },
    desc: {
      en: 'Enterprise IT architecture, software fundamentals, database administration, and practical hardware diagnostic skills.',
      'zh-sg': '企业级 IT 架构、软件基础、数据库管理及实用电脑硬件排障实务。',
      'ta-sg': 'மென்பொருள் அடிப்படைகள், தரவுத்தள நிர்வாகம் மற்றும் நடைமுறை கணினி வன்பொருள் பயிற்சிகள்.',
    },
    icon: Laptop,
    badge: {
      en: 'Diploma & Modular',
      'zh-sg': '大专与模块课程',
      'ta-sg': 'டிப்ளமோ & மாடுலர்',
    },
    duration: {
      en: '1 – 6 Months',
      'zh-sg': '1 至 6 个月',
      'ta-sg': '1 – 6 மாதங்கள்',
    },
    hours: '24 – 96 Hours',
    linkAnchor: 'diplomas',
    color: 'border-t-navy-800',
  },
  {
    id: 'facilities',
    title: {
      en: 'Facilities Management & Instrumentation',
      'zh-sg': '物业设施管理与仪器控制',
      'ta-sg': 'கட்டட பராமரிப்பு & மேலாண்மை',
    },
    desc: {
      en: 'Sustainable building operations, MEP systems, fire safety compliance, and Postgraduate instrumentation control engineering.',
      'zh-sg': '可持续建筑运营、机电（MEP）系统、消防安全合规及仪器控制工程研究生文凭。',
      'ta-sg': 'நிலையான கட்டிட செயல்பாடுகள், தீ பாதுகாப்பு மற்றும் கருவி கட்டுப்பாடு முதுகலை டிப்ளமோ.',
    },
    icon: Building,
    badge: {
      en: 'Diploma & Postgrad',
      'zh-sg': '大专与研究生文凭',
      'ta-sg': 'டிப்ளமோ & முதுகலை',
    },
    duration: {
      en: '6 – 12 Months',
      'zh-sg': '6 至 12 个月',
      'ta-sg': '6 – 12 மாதங்கள்',
    },
    hours: '96 – 192 Hours',
    linkAnchor: 'postgraduate',
    color: 'border-t-emerald-600',
  },
  {
    id: 'business',
    title: {
      en: 'Business Administration & Caregiving',
      'zh-sg': '工商管理与专业护理实务',
      'ta-sg': 'வணிக நிர்வாகம் & நர்சிங் கேர்',
    },
    desc: {
      en: 'Strategic business operations, organizational leadership, workplace communication, and professional elderly caregiving.',
      'zh-sg': '战略商业运营、组织领导力、职场商务沟通及专业老年长者护理实务。',
      'ta-sg': 'வணிக செயல்பாடுகள், நிறுவன தலைமைத்துவம் மற்றும் தொழில்முறை முதியோர் பராமரிப்பு.',
    },
    icon: Briefcase,
    badge: {
      en: 'Executive & Care',
      'zh-sg': '大专与护理认证',
      'ta-sg': 'வணிகம் & நர்சிங்',
    },
    duration: {
      en: '6 Months',
      'zh-sg': '6 个月',
      'ta-sg': '6 மாதங்கள்',
    },
    hours: '96 Hours',
    linkAnchor: 'short-term',
    color: 'border-t-blue-600',
  },
];

export const CourseDiscovery: React.FC<CourseDiscoveryProps> = ({ locale, dict }) => {
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  return (
    <section aria-labelledby="course-discovery-heading" className="py-16 sm:py-20 bg-slate-50">
      <Container size="default" className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            id="course-discovery-heading"
            eyebrow={ui.eyebrow}
            title={ui.title}
            description={ui.description}
          />
          <Button
            href={`/${locale}/courses/`}
            variant="outline"
            iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
            className="shrink-0 self-start md:self-auto"
          >
            {dict.common.viewAllCourses}
          </Button>
        </div>

        {/* 4 Category Discovery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, index) => {
            const Icon = cat.icon;
            const title = cat.title[locale] || cat.title.en;
            const desc = cat.desc[locale] || cat.desc.en;
            const badge = cat.badge[locale] || cat.badge.en;
            const duration = cat.duration[locale] || cat.duration.en;

            return (
              <ScrollReveal
                key={cat.id}
                delay={index * 0.06}
              >
                <Card variant="interactive" className={`h-full flex flex-col justify-between border-t-4 ${cat.color}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center shadow-sm">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <Badge variant="navy">{badge}</Badge>
                    </div>
                    <CardTitle className="text-base leading-snug">
                      {title}
                    </CardTitle>
                    <CardDescription className="text-xs mt-1.5 leading-relaxed line-clamp-3">
                      {desc}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gold-600 shrink-0" aria-hidden="true" />
                        <span>{duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gold-600 shrink-0" aria-hidden="true" />
                        <span>{ui.ratioLabel}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2 border-t border-slate-100">
                    <Link
                      href={`/${locale}/courses/#${cat.linkAnchor}`}
                      className="inline-flex items-center justify-between w-full text-xs font-bold text-navy-900 hover:text-gold-700 transition-colors group"
                    >
                      <span>{ui.exploreBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0 transition-transform" aria-hidden="true" />
                    </Link>
                  </CardFooter>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
