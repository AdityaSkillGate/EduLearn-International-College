'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { Container, SectionHeading, Accordion, AccordionItemData, Button } from '@/components/ui';
import { ScrollReveal } from '@/lib/motion';

interface HomeFAQProps {
  locale: Locale;
  dict: Dictionary;
}

const UI_STRINGS = {
  en: {
    eyebrow: 'Admissions Guidance',
    title: 'Frequently Asked Questions',
    description: 'Clear answers regarding statutory registration, class ratios, fee structures, and admissions criteria.',
    cardTitle: 'Have Specific Questions About Your Eligibility?',
    cardDesc: 'Our Admissions Officers provide individualized course counseling, prerequisite evaluations, and contract reviews.',
    whatsappBtn: 'Chat on WhatsApp (+65 9004 9657)',
    contactBtn: 'Contact Admissions Desk',
  },
  'zh-sg': {
    eyebrow: '入学申请指南',
    title: '常见问题解答',
    description: '关于官方办学资质、小班师生比例、学费分期机制及录取要求的权威解答。',
    cardTitle: '对个人报读资格或选科有具体疑问？',
    cardDesc: '我们的招生顾问团队为您提供一对一课程咨询、学术前置资格评估及标准学生合同细则讲解。',
    whatsappBtn: 'WhatsApp 在线咨询 (+65 9004 9657)',
    contactBtn: '联系招生总务处',
  },
  'ta-sg': {
    eyebrow: 'சேர்க்கை வழிகாட்டுதல்',
    title: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    description: 'சட்டப்பூர்வ பதிவு, வகுப்பு விகிதங்கள், கட்டண முறைகள் மற்றும் சேர்க்கை அளவுகோல்கள் பற்றிய தெளிவான பதில்கள்.',
    cardTitle: 'உங்கள் தகுதி குறித்து கேள்விகள் உள்ளதா?',
    cardDesc: 'எங்கள் சேர்க்கை அதிகாரிகள் தனிப்பட்ட பாட ஆலோசனை மற்றும் தகுதி மதிப்பீட்டை வழங்குகிறார்கள்.',
    whatsappBtn: 'WhatsApp அரட்டை (+65 9004 9657)',
    contactBtn: 'சேர்க்கை பிரிவைத் தொடர்பு கொள்ளவும்',
  },
};

const FAQ_DATA = [
  {
    id: 'cpe-registration',
    question: {
      en: 'What is Edulearn International College’s official registration status in Singapore?',
      'zh-sg': '新加坡爱学习国际学院的新加坡官方办学注册资质是什么？',
      'ta-sg': 'சிங்கப்பூரில் எடுலேர்ன் சர்வதேசக் கல்லூரியின் அதிகாரப்பூர்வ பதிவு நிலை என்ன?',
    },
    answer: {
      en: 'Edulearn International College Pte. Ltd. is registered under the Private Education Act with the Committee for Private Education (CPE), part of SkillsFuture Singapore (SSG), under PEI Registration Number 201708935D. The college operates under the Enhanced Registration Framework (ERF) and is bizSAFE Level 3 certified.',
      'zh-sg': '爱学习国际学院（Edulearn International College Pte. Ltd.）依据《私立教育法案》在精深技能发展局（SSG）旗下私立教育理事会（CPE）注册，机构注册编号（PEI Reg No）为 201708935D。学院在强化注册框架（ERF）下合规办学，并持有新加坡工作场所安全与卫生理事会颁发的 bizSAFE Level 3 安全认证。',
      'ta-sg': 'எடுலேர்ன் சர்வதேசக் கல்லூரி சிங்கப்பூர் தனியார் கல்விச் சட்டத்தின் கீழ் தனியார் கல்வி வாரியத்தில் (CPE/SSG) பதிவு எண் 201708935D உடன் பதிவு செய்யப்பட்டுள்ளது. மேலும் bizSAFE நிலை 3 சான்றிதழ் பெற்றுள்ளது.',
    },
  },
  {
    id: 'entry-requirements',
    question: {
      en: 'What are the admission requirements for Diploma and Advanced Diploma programs?',
      'zh-sg': '申请入读大专（Diploma）及高级大专（Advanced Diploma）课程有哪些入学要求？',
      'ta-sg': 'டிப்ளமோ மற்றும் மேம்பட்ட டிப்ளமோ படிப்புகளுக்கான சேர்க்கை தகுதிகள் யாவை?',
    },
    answer: {
      en: 'Applicants generally require a minimum of 3 GCE ‘O’ Level passes (Grade C6 or above), recognized High School completion, or equivalent international qualifications. Working adults aged 21 and above with at least 2 years of documented industry experience may be evaluated on a case-by-case basis under mature candidate criteria.',
      'zh-sg': '常规申请者通常需具备至少 3 门新加坡剑桥 GCE ‘O’ 水准及格（C6 或以上成绩）、受认可的高中毕业文凭或同等国际学术资历。对于年满 21 周岁且拥有至少 2 年经核实行业从业经验的在职成年人士，可通过成年考生（Mature Candidate）通道进行个案评估审核。',
      'ta-sg': 'பொதுவாக 3 GCE ‘O’ நிலை தேர்ச்சிகள் அல்லது அங்கீகரிக்கப்பட்ட பள்ளிப் படிப்பு தேவை. 21 வயதுக்கு மேற்பட்ட 2 வருட பணி அனுபவம் உள்ள பெரியவர்கள் முதிர்ந்த வேட்பாளர் விதிகளின் கீழ் பரிசீலிக்கப்படுவர்.',
    },
  },
  {
    id: 'teacher-ratio',
    question: {
      en: 'What is the cohort size and teacher-student ratio in the classrooms?',
      'zh-sg': '课室容纳人数及师生配比标准是怎样的？',
      'ta-sg': 'வகுப்பறை அளவு மற்றும் ஆசிரியர்-மாணவர் விகிதம் என்ன?',
    },
    answer: {
      en: 'Edulearn strictly adheres to an intimate 1:14 teacher-to-student ratio. Our campus facilities at New World Centre consist of Classroom 1 (approved capacity of 15 students) and Classroom 2 (approved capacity of 14 students), guaranteeing close pedagogical interaction with each lecturer.',
      'zh-sg': '学院严格坚守 1:14 的精品师生比。位于新世界中心的校区包含 1 号课室（核准容量 15 名学员）与 2 号课室（核准容量 14 名学员），杜绝拥挤大班，保障学生与讲师之间的紧密教学互动与答疑。',
      'ta-sg': 'எடுலேர்ன் 1:14 ஆசிரியர்-மாணவர் விகிதத்தை கண்டிப்பாக பின்பற்றுகிறது. எங்கள் வளாகத்தில் வகுப்பறை 1 (15 மாணவர்கள்) மற்றும் வகுப்பறை 2 (14 மாணவர்கள்) மட்டுமே கொள்ளளவு கொண்டவை.',
    },
  },
  {
    id: 'fee-schedule',
    question: {
      en: 'How are course fees structured and can they be paid in installments?',
      'zh-sg': '学费结构如何制定？是否支持按月分期付款？',
      'ta-sg': 'கட்டண அமைப்பு எவ்வாறு உள்ளது மற்றும் தவணை முறையில் செலுத்த முடியுமா?',
    },
    answer: {
      en: 'Tuition fees are transparently scheduled and payable in approved monthly installments pursuant to the Standard PEI-Student Contract. Modular certificates begin from S$250, while 6-month Diplomas start from S$2,400 to S$3,000. An official non-refundable Course Application Fee of S$54.50 (inclusive of GST) applies.',
      'zh-sg': '所有学费均依据标准私立教育机构学生合同（PEI-Student Contract）透明列明，并严格按照批准的时间表按月分期缴纳。模块化短期证书课程学费为 S$ 250 起，6 个月大专文凭课程学费为 S$ 2,400 至 S$ 3,000。报名时需缴纳法定不可退还的课程申请费 S$ 54.50（含消费税 GST）。',
      'ta-sg': 'கட்டணங்கள் நிலையான PEI-மாணவர் ஒப்பந்தத்தின்படி மாதாந்திர தவணைகளில் செலுத்தப்படலாம். மட்டு படிப்புகள் S$250 முதல், 6 மாத டிப்ளமோ S$2,400 முதல் தொடங்குகின்றன. பதிவு கட்டணம் S$54.50.',
    },
  },
  {
    id: 'attendance-mandate',
    question: {
      en: 'What is the minimum attendance mandate for students?',
      'zh-sg': '学生的最低出勤率法定考核标准是什么？',
      'ta-sg': 'மாணவர்களுக்கான குறைந்தபட்ச வருகை விதிமுறை என்ன?',
    },
    answer: {
      en: 'In accordance with CPE guidelines, all enrolled students must maintain at least 80% monthly attendance (and 90% for Student Pass holders where applicable) to be eligible for module examinations and formal graduation parchment conferment.',
      'zh-sg': '根据私立教育理事会（CPE）法定准则，所有在册学员必须维持每月至少 80% 的出勤率（若为学生准证持有者则须达 90%），方具备参加模块结业考试及获取毕业文凭的法定资格。',
      'ta-sg': 'CPE வழிகாட்டுதலின்படி, அனைத்து மாணவர்களும் குறைந்தபட்சம் 80% மாதாந்திர வருகையை பராமரிக்க வேண்டும் (மாணவர் பாஸ் வைத்திருப்பவர்கள் 90%).',
    },
  },
  {
    id: 'cooling-off-period',
    question: {
      en: 'What student protection measures exist in the Student Contract?',
      'zh-sg': '标准学生合同中有哪些保障学生权益的法定措施？',
      'ta-sg': 'மாணவர் ஒப்பந்தத்தில் உள்ள பாதுகாப்பு நடவடிக்கைகள் என்ன?',
    },
    answer: {
      en: 'All enrollments require the Standard PEI-Student Contract Version 4.1. Under Clause 2.4, students are entitled to a mandatory 7-working-day cooling-off period from the date of contract execution, guaranteeing refund terms according to CPE Schedule D guidelines.',
      'zh-sg': '所有正式入学均须签署 4.1 版标准 PEI 学生合同。依据合同第 2.4 条款，学员自签署合同之日起享有法定的 7 个工作日冷静期（Cooling-off Period），在此期间有权依据 CPE Schedule D 规定申请全额退款保障。',
      'ta-sg': 'அனைத்து மாணவர் சேர்க்கைகளும் நிலையான ஒப்பந்தம் 4.1 இன் கீழ் வருகின்றன. பிரிவு 2.4 இன் கீழ், மாணவர்கள் ஒப்பந்தம் கையெழுத்தான 7 வேலை நாட்களுக்குள் முழு பணத்தைத் திரும்பப் பெற உரிமை உண்டு.',
    },
  },
];

export const HomeFAQ: React.FC<HomeFAQProps> = ({ locale, dict }) => {
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  const accordionItems: AccordionItemData[] = FAQ_DATA.map((item) => ({
    id: item.id,
    title: item.question[locale] || item.question.en,
    content: (
      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans pt-1">
        {item.answer[locale] || item.answer.en}
      </p>
    ),
  }));

  return (
    <section aria-labelledby="faq-heading" className="py-16 sm:py-20 bg-slate-50">
      <Container size="narrow" className="space-y-10">
        <SectionHeading
          id="faq-heading"
          eyebrow={ui.eyebrow}
          title={ui.title}
          description={ui.description}
          align="center"
        />

        <ScrollReveal
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm"
        >
          <Accordion items={accordionItems} defaultOpenId="cpe-registration" />
        </ScrollReveal>

        {/* Still have questions card */}
        <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-navy-800 text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-gold-500/15 text-gold-400 mx-auto flex items-center justify-center">
            <HelpCircle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="space-y-1 max-w-lg mx-auto">
            <h3 className="text-base font-serif font-bold text-white">
              {ui.cardTitle}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {ui.cardDesc}
            </p>
          </div>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/6590049657?text=Hello%20Edulearn%20Admissions%2C%20I%20have%20questions%20regarding%20enrolment."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{ui.whatsappBtn}</span>
            </a>
            <Button
              href={`/${locale}/contact/`}
              variant="outline"
              size="sm"
              className="border-slate-400 text-white hover:bg-white/10 hover:text-white"
            >
              {ui.contactBtn}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
