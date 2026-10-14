import { Locale } from '@/lib/i18n/types';
import { ALL_COURSES, Course } from '@/data/courses';
import { ASSISTANT_FAQ_ITEMS, AssistantFAQItem } from '@/data/chatbotKnowledge';

export interface AssistantAction {
  type: 'link' | 'whatsapp' | 'call' | 'query';
  label: string;
  url?: string;
  queryText?: string;
}

export interface AssistantResponse {
  text: string;
  sourceType: 'faq' | 'course' | 'privacy_guard' | 'application_notice' | 'language_switch' | 'fallback';
  courseMatches?: {
    id: string;
    slug: string;
    title: string;
    level: string;
    duration: string;
    fee: string;
  }[];
  actions?: AssistantAction[];
  disclaimer?: string;
}

/**
 * Tokenize and normalize text into clean lowercase search tokens
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'<>]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.trim().length > 0);
}

/**
 * Deterministic Regex patterns for Singapore NRIC/FIN identification
 */
const NRIC_FIN_REGEX = /\b[STFGMstfgm]\d{7}[A-Za-z]\b/;
const PASSPORT_REGEX = /\b(passport|ic|nric|fin|my id is)\s*[:=]?\s*[a-zA-Z0-9]{6,12}\b/i;

/**
 * Checks for application intent
 */
const APPLY_PATTERNS = [
  'apply', 'application', 'enroll', 'enrol', 'register me', 'sign up',
  'submit application', 'admission form', 'i want to join', 'matriculate',
  '申请', '报名', '我要报名', '提交申请', '入学申请',
  'விண்ணப்பிக்க', 'சேர்க்கை', 'பதிவு செய்'
];

/**
 * Checks for language switch questions
 */
const LANG_PATTERNS = [
  'chinese', 'tamil', 'english', 'mandarin', 'language', 'speak',
  '中文', '华语', '切换语言', '语言',
  'தமிழ்', 'மொழி', 'ஆங்கிலம்'
];

/**
 * Main Deterministic Query Processor
 */
export function processAssistantQuery(
  rawQuery: string,
  locale: Locale = 'en'
): AssistantResponse {
  const query = rawQuery.trim();
  const lowerQuery = query.toLowerCase();
  const tokens = tokenize(query);

  // 1. PRIVACY & SENSITIVE INFORMATION GUARD (PDPA Protection)
  if (NRIC_FIN_REGEX.test(query) || PASSPORT_REGEX.test(query)) {
    const textByLocale: Record<Locale, string> = {
      en: '🔒 For your privacy and protection under the Singapore Personal Data Protection Act (PDPA), please do NOT share NRIC, FIN, or passport numbers in this chat. EIC never collects identification numbers through this public information assistant. Official identity documents are handled confidentially through the Student Registry upon formal matriculation.',
      'zh-sg': '🔒 为保护您的个人隐私与符合新加坡《个人数据保护法》（PDPA）法规，请切勿在此公共咨询窗口中提供身份证号（NRIC/FIN）或护照号码。爱尔莱国际学院绝不会在此公开渠道收集敏感身份证明。正式入学身份文件将由教务处总注册办公室通过加密渠道保密处理。',
      'ta-sg': '🔒 உங்கள் தனியுரிமையைப் பாதுகாக்க, NRIC, FIN அல்லது கடவுச்சீட்டு (பாஸ்போர்ட்) எண்களை இந்த அரட்டையில் பகிர வேண்டாம். பொது தகவல் உதவியாளர் மூலம் தனிப்பட்ட அடையாள எண்களை கல்லூரி சேகரிப்பதில்லை. உத்தியோகபூர்வ சேர்க்கையின் போது இவை பாதுகாப்பாகப் பெறப்படும்.',
    };

    return {
      text: textByLocale[locale] || textByLocale.en,
      sourceType: 'privacy_guard',
      actions: [
        {
          type: 'link',
          label: locale === 'zh-sg' ? '查看官方隐私声明' : locale === 'ta-sg' ? 'தனியுரிமை கொள்கை' : 'View Privacy Notice',
          url: `/${locale}/contact#privacy`,
        },
      ],
    };
  }

  // 2. ADMISSIONS / APPLY NOTICE (Prevent false claim of direct submission)
  const isApplyIntent = APPLY_PATTERNS.some((p) => lowerQuery.includes(p));
  if (isApplyIntent && !lowerQuery.includes('fee') && !lowerQuery.includes('requirement')) {
    const textByLocale: Record<Locale, string> = {
      en: '📝 EIC Learning Assistant provides instant course facts and statutory guidance, but cannot submit an application on your behalf. To apply for an upcoming intake, please submit our Admissions Enquiry Form or connect directly with our Admissions Desk via WhatsApp.',
      'zh-sg': '📝 爱尔莱智能咨询助理可为您解答课程信息与入学要求，但无法直接代您提交正式入学申请。如需报名 2026 年度班次并签署标准学生合同，请通过官方招生咨询表提交，或直接联系招生处 WhatsApp 专员。',
      'ta-sg': '📝 இந்த உதவியாளர் பாடத் தகவல்களை மட்டுமே வழங்குகிறது; நேரடியாக விண்ணப்பத்தை ஏற்க முடியாது. அதிகாரப்பூர்வ சேர்க்கைக்கு, எங்கள் சேர்க்கை விசாரணை படிவத்தைப் பூர்த்தி செய்யவும் அல்லது WhatsApp மூலம் எங்களைத் தொடர்பு கொள்ளவும்.',
    };

    return {
      text: textByLocale[locale] || textByLocale.en,
      sourceType: 'application_notice',
      actions: [
        {
          type: 'link',
          label: locale === 'zh-sg' ? '前往招生意向表' : locale === 'ta-sg' ? 'விண்ணப்பப் படிவம்' : 'Admissions Enquiry Form',
          url: `/${locale}/apply`,
        },
        {
          type: 'whatsapp',
          label: locale === 'zh-sg' ? 'WhatsApp 招生专线' : locale === 'ta-sg' ? 'WhatsApp சேர்க்கை' : 'Chat on WhatsApp (+65 9004 9657)',
          url: 'https://wa.me/6590049657?text=Hello%20Edulearn%20Admissions%2C%20I%20would%20like%20to%20apply%20for%20a%20course.',
        },
      ],
    };
  }

  // 3. LANGUAGE SWITCH INTENT
  const isLangIntent = LANG_PATTERNS.some((p) => lowerQuery.includes(p));
  if (isLangIntent && (lowerQuery.includes('switch') || lowerQuery.includes('change') || lowerQuery.includes('how to') || lowerQuery.includes('language') || lowerQuery.includes('语言') || lowerQuery.includes('மொழி'))) {
    const textByLocale: Record<Locale, string> = {
      en: '🌐 Edulearn website and learning assistant fully support English (en), Singapore Simplified Chinese (zh-sg), and Tamil (ta-sg). You can toggle the assistant language using the language pills at the top right of this chat panel, or switch the website language in the top navbar.',
      'zh-sg': '🌐 爱尔莱学院官方网站及咨询助理全面支持英语（English）、新加坡简体中文（zh-sg）和新加坡泰米尔语（Tamil）。您可直接点击本对话框右上方的语言按钮切换当前助手语言，亦可在网站顶部导航栏切换全站语言。',
      'ta-sg': '🌐 எடுலேர்ன் வலைத்தளம் மற்றும் கற்றல் உதவியாளர் ஆங்கிலம், எளிமைப்படுத்தப்பட்ட சீனம் மற்றும் தமிழ் ஆகிய மொழிகளை ஆதரிக்கிறது. இந்த அரட்டை பலகத்தின் மேலே உள்ள மொழி பொத்தான்களைப் பயன்படுத்தி மொழியை மாற்றிக் கொள்ளலாம்.',
    };

    return {
      text: textByLocale[locale] || textByLocale.en,
      sourceType: 'language_switch',
      actions: [
        {
          type: 'query',
          label: 'English Guide',
          queryText: 'What courses do you offer?',
        },
        {
          type: 'query',
          label: '中文课程指引',
          queryText: '学院提供哪些正规认证课程？',
        },
        {
          type: 'query',
          label: 'தமிழ் பாடநெறி வழிகாட்டி',
          queryText: 'கல்லூரியில் என்ன படிப்புகள் உள்ளன?',
        },
      ],
    };
  }

  // 4. COURSE CATALOG SEARCH & FACT RESOLVER
  const matchedCourses = findMatchingCourses(lowerQuery, tokens);
  if (matchedCourses.length > 0) {
    return generateCourseResponse(matchedCourses, lowerQuery, locale);
  }

  // 5. STRUCTURED FAQ MATCHING
  const matchedFAQ = findMatchingFAQ(lowerQuery, tokens);
  if (matchedFAQ) {
    const actions: AssistantAction[] = [];
    if (matchedFAQ.actionLink) {
      actions.push({
        type: 'link',
        label: matchedFAQ.actionLink.label[locale] || matchedFAQ.actionLink.label.en,
        url: `/${locale}${matchedFAQ.actionLink.href}`,
      });
    }
    actions.push({
      type: 'whatsapp',
      label: locale === 'zh-sg' ? '咨询招生总务处' : locale === 'ta-sg' ? 'ஆலோசகரிடம் பேசவும்' : 'Speak to an Advisor',
      url: 'https://wa.me/6590049657',
    });

    return {
      text: matchedFAQ.answer[locale] || matchedFAQ.answer.en,
      sourceType: 'faq',
      actions,
      disclaimer: locale === 'zh-sg' ? '信息依据 CPE 注册及官方审核发布。' : locale === 'ta-sg' ? 'CPE பதிவு மற்றும் கல்லூரி விதிகளின்படி சரிபார்க்கப்பட்டது.' : 'Verified against CPE Statutory Filings & College Regulations.',
    };
  }

  // 6. SAFE DETERMINISTIC FALLBACK
  const fallbackByLocale: Record<Locale, string> = {
    en: "I couldn't find a direct match for your query in our validated course catalogue or regulatory guide. Here are key resources to assist you, or you may speak directly with our Admissions Desk on WhatsApp (+65 9004 9657) or phone (+65 6258 7189).",
    'zh-sg': '抱歉，在现有经官方核准的课程名录与规章手册中未检索到与您问题完全匹配的内容。您可以浏览下方常用通道，或直接通过 WhatsApp（+65 9004 9657）及校区热线（+65 6258 7189）联系招生学术顾问。',
    'ta-sg': 'மன்னிக்கவும், எங்கள் சரிபார்க்கப்பட்ட பாடக் பட்டியல் மற்றும் வழிகாட்டலில் இதற்கு நேரடிப் பதில் இல்லை. கூடுதல் தகவலுக்கு எங்கள் சேர்க்கை அதிகாரிகளை WhatsApp (+65 9004 9657) அல்லது தொலைபேசி (+65 6258 7189) மூலம் தொடர்பு கொள்ளலாம்.',
  };

  return {
    text: fallbackByLocale[locale] || fallbackByLocale.en,
    sourceType: 'fallback',
    actions: [
      {
        type: 'link',
        label: locale === 'zh-sg' ? '浏览全部 21 门专业课程' : locale === 'ta-sg' ? 'அனைத்து 21 படிப்புகள்' : 'Browse All 21 Programs',
        url: `/${locale}/courses`,
      },
      {
        type: 'whatsapp',
        label: locale === 'zh-sg' ? 'WhatsApp 即时在线咨询' : locale === 'ta-sg' ? 'வாட்ஸ்அப் அரட்டை' : 'WhatsApp Admissions Desk',
        url: 'https://wa.me/6590049657?text=Hello%20Edulearn%20Admissions%2C%20I%20have%20an%20enquiry.',
      },
      {
        type: 'link',
        label: locale === 'zh-sg' ? '查看校区交通路线' : locale === 'ta-sg' ? 'வளாக முகவரி & வழிகள்' : 'Campus Directions & MRT',
        url: `/${locale}/about/facilities#transit`,
      },
    ],
  };
}

/**
 * Matches courses based on keywords, disciplines, and level terms
 */
function findMatchingCourses(lowerQuery: string, tokens: string[]): Course[] {
  // Check for specific categories or terms
  const matches: { course: Course; score: number }[] = [];

  for (const course of ALL_COURSES) {
    let score = 0;
    const titleEn = course.title.en.toLowerCase();
    const titleZh = course.title['zh-sg']?.toLowerCase() || '';
    const titleTa = course.title['ta-sg']?.toLowerCase() || '';
    const slug = course.slug.toLowerCase();

    // Exact or phrase containment in title or slug
    if (lowerQuery.includes(slug)) score += 20;
    if (titleEn.includes(lowerQuery) && lowerQuery.length > 3) score += 15;
    if (titleZh.includes(lowerQuery) && lowerQuery.length > 1) score += 15;
    if (titleTa.includes(lowerQuery) && lowerQuery.length > 2) score += 15;

    // Field/Category keyword checks
    if (course.category === 'engineering' && (lowerQuery.includes('engineering') || lowerQuery.includes('工程') || lowerQuery.includes('பொறியியல்'))) score += 5;
    if (course.category === 'it' && (lowerQuery.includes('it') || lowerQuery.includes('computer') || lowerQuery.includes('information technology') || lowerQuery.includes('信息技术') || lowerQuery.includes('தகவல் தொழில்'))) score += 5;
    if (course.category === 'facilities' && (lowerQuery.includes('facilities') || lowerQuery.includes('facility') || lowerQuery.includes('设施管理') || lowerQuery.includes('வசதிகள்'))) score += 5;
    if (course.category === 'business' && (lowerQuery.includes('business') || lowerQuery.includes('management') || lowerQuery.includes('商业') || lowerQuery.includes('工商管理') || lowerQuery.includes('வணிக'))) score += 5;
    if (course.category === 'hospitality' && (lowerQuery.includes('hospitality') || lowerQuery.includes('hotel') || lowerQuery.includes('酒店') || lowerQuery.includes('விருந்தோம்பல்'))) score += 5;

    // Sub-discipline keywords
    if (lowerQuery.includes('mechanical') && titleEn.includes('mechanical')) score += 8;
    if (lowerQuery.includes('electrical') && titleEn.includes('electrical')) score += 8;
    if (lowerQuery.includes('civil') && titleEn.includes('civil')) score += 8;
    if (lowerQuery.includes('m&e') && (titleEn.includes('mechanical') || titleEn.includes('electrical'))) score += 8;
    if (lowerQuery.includes('instrumentation') && titleEn.includes('instrumentation')) score += 8;
    if (lowerQuery.includes('ms office') && slug.includes('ms-office')) score += 10;
    if (lowerQuery.includes('short term') || lowerQuery.includes('modular') || lowerQuery.includes('短期')) {
      if (course.level === 'short-term') score += 5;
    }
    if (lowerQuery.includes('postgraduate') || lowerQuery.includes('pg diploma') || lowerQuery.includes('研究生')) {
      if (course.level === 'postgraduate') score += 5;
    }
    if (lowerQuery.includes('advanced diploma') || lowerQuery.includes('高级大专') || lowerQuery.includes('உயர் டிப்ளமோ')) {
      if (course.level === 'advanced-diploma') score += 5;
    }

    if (score > 0) {
      matches.push({ course, score });
    }
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.map((m) => m.course);
}

/**
 * Formats a rich, factual response for matched course(s)
 */
function generateCourseResponse(courses: Course[], lowerQuery: string, locale: Locale): AssistantResponse {
  const isFeeQuestion = lowerQuery.includes('fee') || lowerQuery.includes('cost') || lowerQuery.includes('price') || lowerQuery.includes('how much') || lowerQuery.includes('installment') || lowerQuery.includes('学费') || lowerQuery.includes('费用') || lowerQuery.includes('多少钱') || lowerQuery.includes('கட்டணம்');
  const isRequirementQuestion = lowerQuery.includes('entry') || lowerQuery.includes('requirement') || lowerQuery.includes('prerequisite') || lowerQuery.includes('eligible') || lowerQuery.includes('age') || lowerQuery.includes('mature') || lowerQuery.includes('入学') || lowerQuery.includes('资格') || lowerQuery.includes('条件') || lowerQuery.includes('தகுதி');
  const isDurationQuestion = lowerQuery.includes('duration') || lowerQuery.includes('how long') || lowerQuery.includes('months') || lowerQuery.includes('hours') || lowerQuery.includes('学制') || lowerQuery.includes('时长') || lowerQuery.includes('கால அளவு');

  // Single Course Direct Detailed Answer
  if (courses.length === 1 || (!isFeeQuestion && !isRequirementQuestion && !isDurationQuestion && courses.length <= 2)) {
    const course = courses[0];
    const localizedTitle = course.title[locale] || course.title.en;
    const duration = `${course.durationMonths} ${locale === 'zh-sg' ? '个月' : locale === 'ta-sg' ? 'மாதங்கள்' : 'Months'}`;
    const hours = `${course.contactHours} ${locale === 'zh-sg' ? '授课学时' : locale === 'ta-sg' ? 'மணிநேரம்' : 'Contact Hours'}`;
    const ratio = course.teacherStudentRatio;

    let text = '';

    if (isFeeQuestion) {
      const ft = course.fees.fullTime ? `S$${course.fees.fullTime.courseFee.toLocaleString()} (${course.fees.fullTime.installmentsCount} x S$${course.fees.fullTime.installmentAmount})` : 'N/A';
      const pt = course.fees.partTime ? `S$${course.fees.partTime.courseFee.toLocaleString()} (${course.fees.partTime.installmentsCount} x S$${course.fees.partTime.installmentAmount})` : 'N/A';
      const reg = course.fees.fullTime?.registrationFee || course.fees.partTime?.registrationFee || 300;

      if (locale === 'zh-sg') {
        text = `🎓 **${localizedTitle}**（官方编号 ID ${course.id}）：\n\n• **全日制学费**：${ft}\n• **兼读制学费**：${pt}\n• **入学注册费**：S$${reg}（入学时缴纳，不可退还）\n• **不可退还申请费**：S$54.50（含GST消费税）\n• **分期机制**：学费严格遵循私立教育理事会（CPE）4.1版标准合同，按月分期缴纳，免除长期预缴风险。`;
      } else if (locale === 'ta-sg') {
        text = `🎓 **${localizedTitle}** (பாட எண்: ${course.id}):\n\n• **முழு நேர கட்டணம்**: ${ft}\n• **பகுதி நேர கட்டணம்**: ${pt}\n• **பதிவு கட்டணம்**: S$${reg}\n• **விண்ணப்பக் கட்டணம்**: S$54.50 (GST உட்பட)\n• **தவணை முறை**: CPE ஒப்பந்தம் 4.1 இன் படி சமமான மாதாந்திர தவணைகளில் செலுத்தலாம்.`;
      } else {
        text = `🎓 **${localizedTitle}** (Course ID: ${course.id}):\n\n• **Full-Time Tuition**: ${ft}\n• **Part-Time Tuition**: ${pt}\n• **Registration Fee**: S$${reg} (Non-refundable upon enrollment)\n• **Course Application Fee**: S$54.50 (Non-refundable, incl. GST)\n• **Installment Protection**: Payable in equal monthly installments under CPE Standard PEI-Student Contract Version 4.1.`;
      }
    } else if (isRequirementQuestion) {
      const academicReq = course.entryRequirements.academicPrerequisites[locale] || course.entryRequirements.academicPrerequisites.en;
      const matureClause = course.entryRequirements.matureCandidateClause?.[locale] || course.entryRequirements.matureCandidateClause?.en || 'Evaluated case-by-case by the Academic Board.';

      if (locale === 'zh-sg') {
        text = `📋 **${localizedTitle}** 入学录取资格：\n\n• **前置学术学历**：${academicReq}\n• **最低年龄限制**：${course.entryRequirements.minimumAge || 16} 周岁\n• **成熟考生条款（在职成年人）**：${matureClause}\n• **评估流程**：提交工作证明或前置毕业文凭，由学院学术委员会进行合规审核。`;
      } else if (locale === 'ta-sg') {
        text = `📋 **${localizedTitle}** சேர்க்கை தகுதிகள்:\n\n• **கல்வித் தகுதி**: ${academicReq}\n• **குறைந்தபட்ச வயது**: ${course.entryRequirements.minimumAge || 16} வயது\n• **முதிர்ந்த விண்ணப்பதாரர் சலுகை**: ${matureClause}`;
      } else {
        text = `📋 **${localizedTitle}** Admission Requirements:\n\n• **Academic Prerequisites**: ${academicReq}\n• **Minimum Age**: ${course.entryRequirements.minimumAge || 16} years\n• **Mature Candidate Scheme**: ${matureClause}\n• **Approval**: Credentials reviewed and approved under Academic Board governance.`;
      }
    } else if (isDurationQuestion) {
      if (locale === 'zh-sg') {
        text = `⏱️ **${localizedTitle}** 学制与课时设置：\n\n• **课程学制**：${duration}\n• **法定总授课学时**：${hours}\n• **面授师生比例**：严格上限 ${ratio}\n• **出勤率考核**：需达每月至少 80% 出勤率方具备期末考核资格。`;
      } else if (locale === 'ta-sg') {
        text = `⏱️ **${localizedTitle}** கால அளவு & மணிநேரம்:\n\n• **பாட கால அளவு**: ${duration}\n• **கற்பித்தல் மணிநேரம்**: ${hours}\n• **ஆசிரியர் விகிதம்**: ${ratio}\n• **குறைந்தபட்ச வருகை**: 80% கட்டாயம்.`;
      } else {
        text = `⏱️ **${localizedTitle}** Duration & Delivery:\n\n• **Course Duration**: ${duration}\n• **Contact Hours**: ${hours}\n• **Classroom Ratio**: Intimate ${ratio} capping at New World Centre\n• **Mandatory Attendance**: Minimum 80% monthly attendance required for examination eligibility.`;
      }
    } else {
      const summary = course.overview[locale] || course.overview.en;
      if (locale === 'zh-sg') {
        text = `📚 **${localizedTitle}**（官方编号 ID ${course.id}）：\n\n${summary}\n\n• **学制/学时**：${duration} / ${hours}\n• **授课模式**：校区面授（新世界中心校区，师生比 ${ratio}）\n• **毕业证书**：由爱尔莱国际学院颁发（CPE注册编号：201708935D）。`;
      } else if (locale === 'ta-sg') {
        text = `📚 **${localizedTitle}** (ID: ${course.id}):\n\n${summary}\n\n• **கால அளவு**: ${duration} / ${hours}\n• **கற்பித்தல்**: நேரடி வகுப்பு (${ratio})\n• **சான்றிதழ்**: எடுலேர்ன் சர்வதேசக் கல்லூரி (CPE எண்: 201708935D).`;
      } else {
        text = `📚 **${localizedTitle}** (Course ID: ${course.id}):\n\n${summary}\n\n• **Duration / Contact Hours**: ${duration} / ${hours}\n• **Delivery**: Classroom face-to-face at New World Centre (${ratio} ratio)\n• **Awarding Body**: Edulearn International College (CPE Reg No: 201708935D).`;
      }
    }

    return {
      text,
      sourceType: 'course',
      courseMatches: [
        {
          id: course.id,
          slug: course.slug,
          title: localizedTitle,
          level: course.level,
          duration,
          fee: course.fees.fullTime ? `S$${course.fees.fullTime.courseFee.toLocaleString()}` : 'Modular Fee',
        },
      ],
      actions: [
        {
          type: 'link',
          label: locale === 'zh-sg' ? '查看完整课程大纲与学费明细' : locale === 'ta-sg' ? 'முழு பாடத்திட்ட விவரங்கள்' : 'View Full Course Details',
          url: `/${locale}/courses/${course.slug}`,
        },
        {
          type: 'whatsapp',
          label: locale === 'zh-sg' ? '咨询本课程招生顾问' : locale === 'ta-sg' ? 'வாட்ஸ்அப் ஆலோசனை' : 'Enquire on WhatsApp',
          url: `https://wa.me/6590049657?text=Hello%20EIC%2C%20I%20am%20enquiring%20about%20${encodeURIComponent(course.title.en)}`,
        },
      ],
    };
  }

  // Multiple Matching Courses Overview List
  const topCourses = courses.slice(0, 4);
  const courseItems = topCourses.map((c) => {
    const title = c.title[locale] || c.title.en;
    const dur = `${c.durationMonths} ${locale === 'zh-sg' ? '个月' : locale === 'ta-sg' ? 'மாதங்கள்' : 'Mo'}`;
    const fee = c.fees.fullTime ? `S$${c.fees.fullTime.courseFee.toLocaleString()}` : `S$${c.fees.partTime?.courseFee.toLocaleString() || 'Modular'}`;
    return `• **[${title}](/${locale}/courses/${c.slug})** (${dur} • ${fee})`;
  }).join('\n');

  const introByLocale: Record<Locale, string> = {
    en: `Here are the official courses matching your query from our 21 CPE-registered programs:\n\n${courseItems}\n\nSelect a course link above or click below to browse all offerings:`,
    'zh-sg': `以下为您检索到的相关官方认证课程（共21门注册文凭）：\n\n${courseItems}\n\n点击上方课程链接查看详细大纲，或浏览完整课程库：`,
    'ta-sg': `உங்கள் தேடலுக்குப் பொருத்தமான 21 அங்கீகரிக்கப்பட்ட படிப்புகள்:\n\n${courseItems}\n\nமுழு விவரங்களை அறிய மேலே உள்ள இணைப்புகளை கிளிக் செய்யவும்:`,
  };

  return {
    text: introByLocale[locale] || introByLocale.en,
    sourceType: 'course',
    courseMatches: topCourses.map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title[locale] || c.title.en,
      level: c.level,
      duration: `${c.durationMonths} Months`,
      fee: c.fees.fullTime ? `S$${c.fees.fullTime.courseFee.toLocaleString()}` : 'Modular Fee',
    })),
    actions: [
      {
        type: 'link',
        label: locale === 'zh-sg' ? '查看全部 21 门专业大纲' : locale === 'ta-sg' ? 'அனைத்து படிப்புகளையும் காண்க' : 'View All 21 Courses',
        url: `/${locale}/courses`,
      },
    ],
  };
}

/**
 * Matches general query against structured knowledge FAQ items
 */
function findMatchingFAQ(lowerQuery: string, tokens: string[]): AssistantFAQItem | null {
  let bestMatch: AssistantFAQItem | null = null;
  let highestScore = 0;

  for (const faq of ASSISTANT_FAQ_ITEMS) {
    let score = 0;
    const allKeywords = [
      ...faq.keywords.en,
      ...faq.keywords['zh-sg'],
      ...faq.keywords['ta-sg'],
    ];

    for (const kw of allKeywords) {
      const lowerKw = kw.toLowerCase();
      if (lowerQuery.includes(lowerKw)) {
        score += 5;
      }
      for (const token of tokens) {
        if (token === lowerKw) {
          score += 3;
        }
      }
    }

    if (score > highestScore && score >= 5) {
      highestScore = score;
      bestMatch = faq;
    }
  }

  return bestMatch;
}
