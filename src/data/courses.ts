import { Locale } from '@/lib/i18n/types';
import {
  Course,
  CourseLevel,
  DeliveryMode,
  CourseCategory,
  Module,
  FeeStructure,
  EntryRequirement,
  ShortTermSubCourse,
  LocalizedCourseContent,
} from '@/types/course';

// Export types for consumer modules
export type {
  Course,
  CourseLevel,
  DeliveryMode,
  CourseCategory,
  Module,
  FeeStructure,
  EntryRequirement,
  ShortTermSubCourse,
  LocalizedCourseContent,
};

// Common standard fees for 6-month diplomas (SGD)
const STANDARD_DIPLOMA_FEES: FeeStructure = {
  fullTime: {
    courseFee: 2700,
    registrationFee: 300,
    installmentsCount: 6,
    installmentAmount: 500,
    currency: 'SGD',
    notes: 'S$500 per month across 6 equal installments. S$300 non-refundable registration fee upon enrollment.',
    isVerified: true,
  },
  partTime: {
    courseFee: 2400,
    registrationFee: 300,
    installmentsCount: 6,
    installmentAmount: 400,
    currency: 'SGD',
    notes: 'S$400 per month across 6 equal installments. S$300 non-refundable registration fee upon enrollment.',
    isVerified: true,
  },
  modular: null,
  applicationFee: {
    amount: 54.5,
    currency: 'SGD',
    isNonRefundable: true,
    isVerified: true,
  },
  medicalInsuranceFee: {
    amount: 21.8,
    currency: 'SGD',
    period: 'per year',
    isVerified: true,
  },
  isVerified: true,
};

// Common standard entry requirements for Technical & Business Diplomas
const STANDARD_DIPLOMA_ENTRY: EntryRequirement = {
  academicPrerequisites: {
    en: "Minimum 3 GCE 'O' Level passes including English at C6; OR International Secondary Qualification pass (Year 10 equivalent) in 3 subjects including English.",
    'zh-sg': '剑桥O水准至少3门及格（包括英语C6等级）；或受认可的高中一年级/十年级（Year 10）同等学术资历及格（包含英语科目）。',
    'ta-sg': 'ஆங்கிலம் (C6) உட்பட குறைந்தபட்சம் 3 ஜி.சி.இ "ஓ" நிலை தேர்ச்சிகள்; அல்லது ஆங்கிலம் உட்பட சர்வதேச 10-ஆம் வகுப்பு சமமான கல்வித்தகுதி.',
  },
  languageProficiency: {
    en: "Pass in GCE 'O' Level English (Grade C6 and above) or equivalent institutional proficiency test.",
    'zh-sg': '剑桥O水准英语达到C6或以上，或通过学院内部英语能力测试。',
    'ta-sg': 'ஜி.சி.இ "ஓ" நிலை ஆங்கில தேர்ச்சி அல்லது அதற்கு இணையான தேர்வு.',
  },
  minimumAge: 16,
  workExperienceYears: null,
  matureCandidateClause: {
    en: 'Mature applicants must be at least 25 years old with minimum 3 years of verifiable working experience and a pass in the EIC Entry Proficiency Test.',
    'zh-sg': '成熟考生条款：年满25周岁且具备至少3年可核实的行业工作经验，并通过学院入学能力评估测试。',
    'ta-sg': 'முதிர்ந்த விண்ணப்பதாரர்: 25 வயது பூர்த்தியாகி குறைந்தபட்சம் 3 ஆண்டுகள் பணி அனுபவம் மற்றும்学院 நுழைவுத் தேர்வு தேர்ச்சி.',
  },
  isVerified: true,
  en: "Minimum 3 GCE 'O' Level passes (incl. English at C6) OR Year 10 international equivalent OR Mature candidate (25+ yrs, 3 yrs work experience & EIC test pass).",
  'zh-sg': '剑桥O水准至少3门及格（包括英语C6）或国际十年级同等学历，或年满25岁具备3年工作经验并通过入学测试。',
  'ta-sg': '3 "ஓ" நிலை தேர்ச்சி (ஆங்கிலம் C6 உட்பட) அல்லது 10-ஆம் வகுப்பு சர்வதேச தகுதி அல்லது 25 வயது மற்றும் 3 ஆண்டுகள் பணி அனுபவம்.',
};

// Advanced Diploma Entry Requirements
const STANDARD_ADV_DIPLOMA_ENTRY: EntryRequirement = {
  academicPrerequisites: {
    en: 'Completion of a recognized Diploma in a relevant engineering or technical discipline; OR equivalent post-secondary technical qualifications.',
    'zh-sg': '完成受认可的相关工程或技术专业大专文凭课程；或获得同等资格的大专后技术资历。',
    'ta-sg': 'தொடர்புடைய பொறியியல் துறையில் அங்கீகரிக்கப்பட்ட டிப்ளமோ அல்லது அதற்கு இணையான தொழில்நுட்ப கல்வித்தகுதி.',
  },
  languageProficiency: {
    en: 'English language proficiency equivalent to Diploma level or pass in EIC evaluation.',
    'zh-sg': '具备相当于大专水平的英语运用能力，或通过学院入学综合考核。',
    'ta-sg': 'டிப்ளமோ கல்வி நிலைக்கு இணையான ஆங்கில அறிவுத்திறன்.',
  },
  minimumAge: 18,
  workExperienceYears: 1,
  matureCandidateClause: {
    en: 'Mature candidates with substantial industry track record (minimum 3 years in supervisory technical roles) subject to Academic Board interview.',
    'zh-sg': '成熟考生条款：具备至少3年工程基层管理或技术主管工作实绩，并通过学术委员会专项面试评估。',
    'ta-sg': '3 ஆண்டுகள் கள மேற்பார்வை பணி அனுபவம் கொண்ட விண்ணப்பதாரர்கள் கல்வி வாரிய நேர்காணல் மூலம் பரிசீலிக்கப்படுவர்.',
  },
  isVerified: true,
  en: 'Recognized Diploma in relevant discipline OR equivalent post-secondary technical qualification OR Mature candidate with 3+ years supervisory experience.',
  'zh-sg': '持有相关专业大专文凭或同等技术资历，或年满25岁具备3年以上基层技术管理经验。',
  'ta-sg': 'தொடர்புடைய துறையில் டிப்ளமோ அல்லது 3 ஆண்டுகள் மேற்பார்வை பணி அனுபவம் கொண்ட முதிர்ந்த விண்ணப்பதாரர்.',
};

// Postgraduate Diploma Entry Requirements
const STANDARD_POSTGRAD_ENTRY: EntryRequirement = {
  academicPrerequisites: {
    en: "Recognized Bachelor's Degree in an engineering or business-related discipline from an accredited university; OR Advanced Diploma with proven industry leadership experience.",
    'zh-sg': '持有正规高等院校受认可的工程学或商业管理学士学位；或持有高级大专文凭并附带充分的管理实务证明。',
    'ta-sg': 'அங்கீகரிக்கப்பட்ட பல்கலைக்கழகத்தில் இளங்கலை பட்டம் (பொறியியல் அல்லது வணிகம்) அல்லது பணி அனுபவத்துடன் கூடிய உயர் டிப்ளமோ.',
  },
  languageProficiency: {
    en: "IELTS 6.0 equivalent or Bachelor's degree instruction conducted in English.",
    'zh-sg': '雅思6.0分同等水平，或全英文授课本科学位文凭。',
    'ta-sg': 'ஆங்கில வழிக் கல்வி அல்லது ஐ.இ.எல்.டி.எஸ் 6.0 சமமான ஆங்கிலத்திறன்.',
  },
  minimumAge: 21,
  workExperienceYears: 3,
  matureCandidateClause: {
    en: 'Mature applicants with Advanced Diploma and minimum 3 to 5 years managerial/supervisory track record evaluated on case-by-case basis by the Academic Board.',
    'zh-sg': '成熟考生条款：持有高级大专文凭并拥有3至5年中高层主管实绩者，由学术委员会进行个案专业面试审核。',
    'ta-sg': 'உயர் டிப்ளமோ மற்றும் 3-5 ஆண்டுகள் மேலாண்மை அனுபவம் கொண்ட முதிர்ந்த விண்ணப்பதாரர்களுக்கு தனிப்பட்ட மதிப்பீடு.',
  },
  isVerified: true,
  en: "Recognized Bachelor's Degree in related discipline OR Advanced Diploma with minimum 3 years supervisory/managerial experience.",
  'zh-sg': '持有受认可的本科学士学位，或持有高级大专文凭并具备至少3年管理实践经验。',
  'ta-sg': 'இளங்கலை பட்டம் அல்லது 3 ஆண்டுகள் மேலாண்மை அனுபவத்துடன் கூடிய உயர் டிப்ளமோ.',
};

// ============================================================================
// 1. DIPLOMA PROGRAMS (13 CATALOG ENTRIES)
// ============================================================================
const DIPLOMA_COURSES: Course[] = [
  // 1. Diploma in Mechanical and Electrical Engineering (ID 26)
  {
    id: '26',
    slug: 'diploma-mechanical-and-electrical-engineering',
    level: 'diploma',
    category: 'engineering',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14 (Lecture & Practical)',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Diploma in Mechanical and Electrical Engineering',
        'zh-sg': '机电工程大专文凭课程',
        'ta-sg': 'மெக்கானிக்கல் மற்றும் எலக்ட்ரிக்கல் இன்ஜினியரிங் டிப்ளமோ',
      },
      summary: {
        en: 'Provides essential foundational knowledge in mechanical and electrical disciplines, preparing students for technical supervisory support roles in Singapore.',
        'zh-sg': '提供机械与电气工程领域的基础理论与实务知识，培养适应新加坡工程行业的专业技术人才。',
        'ta-sg': 'மெக்கானிக்கல் மற்றும் எலக்ட்ரிக்கல் பொறியியல் துறைகளில் அடிப்படை மற்றும் தொழில்நுட்ப அறிவை வழங்குகிறது.',
      },
      description: {
        en: 'The Diploma in Mechanical and Electrical Engineering is tailored to provide learners with an integrated foundation across mechanical structures, electrical machines, and engineering mathematics. Designed for technical professionals and site supervisors operating in Singapore building and industrial projects.',
        'zh-sg': '机电工程大专文凭课程专为在新加坡建筑和工业领域从事技术工作的专业人士设计，系统整合机械系统、电气运转、工程数学与制造技术的基础技能。',
        'ta-sg': 'கட்டடங்கள் மற்றும் தொழில்துறை திட்டங்களில் பணியாற்றும் பொறியியல் தொழில்நுட்ப வல்லுநர்களுக்காக வடிவமைக்கப்பட்ட ஒருங்கிணைந்த டிப்ளமோ படிப்பு.',
      },
      careerOutcomes: {
        en: ['M&E Site Supervisor', 'Assistant Mechanical Engineer', 'Electrical Facility Technician', 'Technical Coordinator'],
        'zh-sg': ['机电现场协调员', '助理机械工程师', '机电设施维护主管', '工程技术绘图员'],
        'ta-sg': ['கள மேற்பார்வையாளர்', 'உதவி மெக்கானிக்கல் பொறியாளர்', 'மின் பராமரிப்பு தொழில்நுட்ப வல்லுநர்'],
      },
    },
    title: {
      en: 'Diploma in Mechanical and Electrical Engineering',
      'zh-sg': '机电工程大专文凭课程',
      'ta-sg': 'மெக்கானிக்கல் மற்றும் எலக்ட்ரிக்கல் இன்ஜினியரிங் டிப்ளமோ',
    },
    overview: {
      en: 'Provides essential foundational knowledge in mechanical and electrical disciplines, preparing students for technical supervisory support roles in Singapore.',
      'zh-sg': '提供机械与电气工程领域的基础理论与实务知识，培养适应新加坡工程行业的专业技术人才。',
      'ta-sg': 'மெக்கானிக்கல் மற்றும் எலக்ட்ரிக்கல் பொறியியல் துறைகளில் அடிப்படை மற்றும் தொழில்நுட்ப அறிவை வழங்குகிறது.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Engineering Mathematics', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Principles of Electrical Engineering', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Strength of Materials', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Electrical Machines and Drives', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '05', title: 'Engineering Drawings', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '06', title: 'Manufacturing Technology', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
    ],
    relatedCourseIds: ['70', '32', '33'],
  },

  // 2. Diploma in Information Technology (ID 27)
  {
    id: '27',
    slug: 'diploma-information-technology',
    level: 'diploma',
    category: 'it',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14 (Lecture & Practical)',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Diploma in Information Technology',
        'zh-sg': '资讯科技大专文凭课程',
        'ta-sg': 'தகவல் தொழில்நுட்ப டிப்ளமோ',
      },
      summary: {
        en: 'Prepares students for entry-level computing and IT infrastructure support with comprehensive training in software, networking, databases, and programming.',
        'zh-sg': '涵盖计算机硬件系统、办公软件、编程语言、网络原理及数据库管理，为学生奠定扎实的IT技术基础。',
        'ta-sg': 'மென்பொருள், கணினி நெட்வொர்க் மற்றும் தரவுத்தள மேலாண்மை குறித்த விரிவான பயிற்சியை வழங்குகிறது.',
      },
      description: {
        en: 'Equips students with foundational modern computing skills. Covers software applications, hardware diagnostics, TCP/IP networking, programming fundamentals, and relational database management.',
        'zh-sg': '培养具备系统IT基础的实用型技术人员，掌握现代办公系统集成、网络搭建与数据管理技能。',
        'ta-sg': 'நவீன கணினி பயன்பாடு, மென்பொருள் வடிவமைப்பு மற்றும் நெட்வொர்க்கிங் குறித்த முழுமையான நடைமுறை பயிற்சி.',
      },
      careerOutcomes: {
        en: ['IT Support Specialist', 'Junior Network Administrator', 'Database Coordinator', 'Helpdesk Technical Specialist'],
        'zh-sg': ['IT技术支持专员', '初级网络管理员', '数据库录入与维护助理', '企业系统运维员'],
        'ta-sg': ['ஐடி ஆதரவு தொழில்நுட்ப வல்லுநர்', 'நெட்வொர்க் உதவியாளர்', 'தரவுத்தள உதவியாளர்'],
      },
    },
    title: {
      en: 'Diploma in Information Technology',
      'zh-sg': '资讯科技大专文凭课程',
      'ta-sg': 'தகவல் தொழில்நுட்ப டிப்ளமோ',
    },
    overview: {
      en: 'Prepares students for entry-level computing and IT infrastructure support with comprehensive training in software, networking, databases, and programming.',
      'zh-sg': '涵盖计算机硬件系统、办公软件、编程语言、网络原理及数据库管理，为学生奠定扎实的IT技术基础。',
      'ta-sg': 'மென்பொருள், கணினி நெட்வொர்க் மற்றும் தரவுத்தள மேலாண்மை குறித்த விரிவான பயிற்சியை வழங்குகிறது.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Introduction to Information Technology', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Fundamentals of Computer Systems', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Microsoft Office', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '04', title: 'Programming Language', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '05', title: 'Networking Principles', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '06', title: 'Introduction to Database', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
    ],
    relatedCourseIds: ['38-5', '38-2', '81'],
  },

  // 3. Diploma in Facilities Management (ID 28)
  {
    id: '28',
    slug: 'diploma-facilities-management',
    level: 'diploma',
    category: 'facilities',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Diploma in Facilities Management',
        'zh-sg': '设施管理大专文凭课程',
        'ta-sg': 'கட்டட மற்றும் வசதிகள் மேலாண்மை டிப்ளமோ',
      },
      summary: {
        en: 'Focuses on the maintenance, safety, environmental sustainability, and smart services required for modern commercial and residential infrastructure.',
        'zh-sg': '系统培训现代商业与民用建筑运维、环保设施管理、设备保养与综合风险控制。',
        'ta-sg': 'நவீன வணிக மற்றும் குடியிருப்பு கட்டட பராமரிப்பு, பாதுகாப்பு மற்றும் சுற்றுச்சூழல் மேலாண்மை.',
      },
      description: {
        en: 'Designed to address Singapore built environment requirements, covering building maintenance regimes, mechanical services, safety and health laws, and risk control.',
        'zh-sg': '面向新加坡物业与商业综合体设施管理需求，系统掌握建筑安全合规、机电设备运维与绿色环保体系。',
        'ta-sg': 'கட்டட பராமரிப்பு, பாதுகாப்பு விதிமுறைகள் மற்றும் சுற்றுச்சூழல் பாதுகாப்பு முறைகளை கற்றுத்தருகிறது.',
      },
      careerOutcomes: {
        en: ['Facilities Executive', 'Property Maintenance Supervisor', 'Building Operations Coordinator', 'Safety & Health Assistant'],
        'zh-sg': ['物业设施专员', '建筑维保主管', '楼宇运行协调员', '安全合规巡检员'],
        'ta-sg': ['கட்டட பராமரிப்பு அதிகாரி', 'வசதிகள் மேற்பார்வையாளர்'],
      },
    },
    title: {
      en: 'Diploma in Facilities Management',
      'zh-sg': '设施管理大专文凭课程',
      'ta-sg': 'கட்டட மற்றும் வசதிகள் மேலாண்மை டிப்ளமோ',
    },
    overview: {
      en: 'Focuses on the maintenance, safety, environmental sustainability, and smart services required for modern commercial and residential infrastructure.',
      'zh-sg': '系统培训现代商业与民用建筑运维、环保设施管理、设备保养与综合风险控制。',
      'ta-sg': 'நவீன வணிக மற்றும் குடியிருப்பு கட்டட பராமரிப்பு, பாதுகாப்பு மற்றும் சுற்றுச்சூழல் மேலாண்மை.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Principles of Facilities Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Building Maintenance Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Health and Safety in Facilities Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Environmental Management Systems', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Building Services Engineering', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '06', title: 'Security and Risk Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
    ],
    relatedCourseIds: ['79', '26', '71'],
  },

  // 4. Diploma in Chemical and Process Engineering (ID 29)
  {
    id: '29',
    slug: 'diploma-chemical-and-process-engineering',
    level: 'diploma',
    category: 'engineering',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Diploma in Chemical and Process Engineering',
        'zh-sg': '化工与工艺工程大专文凭课程',
        'ta-sg': 'வேதியியல் மற்றும் செயல்முறை பொறியியல் டிப்ளமோ',
      },
      summary: {
        en: 'Focuses on industrial chemical handling, plant instrumentation, and continuous process plant systems in Singapore petrochemical hub.',
        'zh-sg': '聚焦工业化工品操作规范、石化装置运行维护、工艺流程安全与环境合规标准。',
        'ta-sg': 'தொழில்துறை இரசாயன கையாளுதல், ஆலை செயல்பாடுகள் மற்றும் பாதுகாப்பு மேலாண்மை.',
      },
      description: {
        en: 'Delivers core technical know-how for Singapore Jurong Island petrochemical and pharmaceutical processing industries, covering heat transfer, reaction engineering, and process hazard safeguards.',
        'zh-sg': '为裕廊岛石化及制药工业基地培养一线工艺技术人员，掌握流体换热、反应控制及工艺安全防范。',
        'ta-sg': 'சிங்கப்பூர் இரசாயன மற்றும் சுத்திகரிப்பு ஆலைகளில் பணியாற்றுவதற்கான தொழில்நுட்ப தகுதி.',
      },
      careerOutcomes: {
        en: ['Process Plant Technician', 'Chemical Operations Assistant', 'Quality Control Inspector', 'Environmental Safety Technician'],
        'zh-sg': ['化工装置操作技师', '工艺巡检员', '质量化验技术员', '工业安全监督员'],
        'ta-sg': ['ஆலை தொழில்நுட்ப வல்லுநர்', 'இரசாயன செயல்முறை உதவியாளர்'],
      },
    },
    title: {
      en: 'Diploma in Chemical and Process Engineering',
      'zh-sg': '化工与工艺工程大专文凭课程',
      'ta-sg': 'வேதியியல் மற்றும் செயல்முறை பொறியியல் டிப்ளமோ',
    },
    overview: {
      en: 'Focuses on industrial chemical handling, plant instrumentation, and continuous process plant systems in Singapore petrochemical hub.',
      'zh-sg': '聚焦工业化工品操作规范、石化装置运行维护、工艺流程安全与环境合规标准。',
      'ta-sg': 'தொழில்துறை இரசாயன கையாளுதல், ஆலை செயல்பாடுகள் மற்றும் பாதுகாப்பு மேலாண்மை.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Basic Chemical Principles', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Process Plant Operations', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Heat Transfer and Fluid Flow', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Chemical Reaction Engineering', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Process Safety and Hazard Management', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '06', title: 'Quality Control and Environmental Compliance', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
    ],
    relatedCourseIds: ['71', '32', '26'],
  },

  // 5. Diploma in Quantity Surveying and Construction Management (ID 30)
  {
    id: '30',
    slug: 'diploma-quantity-surveying-and-construction-management',
    level: 'diploma',
    category: 'engineering',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Diploma in Quantity Surveying and Construction Management',
        'zh-sg': '工料测量与建筑管理大专文凭课程',
        'ta-sg': 'கட்டிட மதிப்பீடு மற்றும் கட்டுமான மேலாண்மை டிப்ளமோ',
      },
      summary: {
        en: 'Trains students in cost planning, measurement of building works, tender preparation, and construction contractual frameworks.',
        'zh-sg': '系统培训工程造价预算、工程量清单编制、招投标管理与施工合同法务。',
        'ta-sg': 'கட்டுமான திட்ட மதிப்பீடு, செலவு திட்டமிடல் மற்றும் ஒப்பந்த மேலாண்மை.',
      },
      description: {
        en: 'Essential training for cost engineers and site project executives in Singapore. Covers measurement of structural and architectural works, estimation, tendering, and dispute handling under standard conditions of contract.',
        'zh-sg': '面向新加坡建造工程领域的造价控制与合同管理人员，深入掌握SMM7工程量计算规则、预算编制与成本控制。',
        'ta-sg': 'கட்டுமான செலவு கட்டுப்பாடு மற்றும் ஒப்பந்த நிர்வாகத்தை நிர்வகிக்க உதவும் சிறப்பு படிப்பு.',
      },
      careerOutcomes: {
        en: ['Assistant Quantity Surveyor', 'Tender & Cost Estimator', 'Contracts Administrator', 'Site Progress Coordinator'],
        'zh-sg': ['助理工料测量师', '造价预算员', '合同商务专员', '工程项目协调员'],
        'ta-sg': ['உதவி கட்டிட மதிப்பீட்டாளர்', 'ஒப்பந்த நிர்வாகி'],
      },
    },
    title: {
      en: 'Diploma in Quantity Surveying and Construction Management',
      'zh-sg': '工料测量与建筑管理大专文凭课程',
      'ta-sg': 'கட்டிட மதிப்பீடு மற்றும் கட்டுமான மேலாண்மை டிப்ளமோ',
    },
    overview: {
      en: 'Trains students in cost planning, measurement of building works, tender preparation, and construction contractual frameworks.',
      'zh-sg': '系统培训工程造价预算、工程量清单编制、招投标管理与施工合同法务。',
      'ta-sg': 'கட்டுமான திட்ட மதிப்பீடு, செலவு திட்டமிடல் மற்றும் ஒப்பந்த மேலாண்மை.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Quantity Surveying Practice', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Measurement of Building Works', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Construction Technology and Materials', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Building Cost Estimation and Tendering', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '05', title: 'Contract Law and Dispute Resolution', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '06', title: 'Project Management Fundamentals', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
    ],
    relatedCourseIds: ['79', '31', '35'],
  },

  // 6. Diploma in Civil Engineering (ID 31)
  {
    id: '31',
    slug: 'diploma-civil-engineering',
    level: 'diploma',
    category: 'engineering',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Diploma in Civil Engineering',
        'zh-sg': '土木工程大专文凭课程',
        'ta-sg': 'சிவில் இன்ஜினியரிங் டிப்ளமோ',
      },
      summary: {
        en: 'Delivers comprehensive fundamentals in structural calculations, materials, concrete technology, and infrastructure site surveying.',
        'zh-sg': '全面掌握土木工程图纸绘制、结构力学、钢筋混凝土技术、地基基础与工程测量。',
        'ta-sg': 'கட்டட கட்டமைப்பு, கான்கிரீட் தொழில்நுட்பம் மற்றும் நில அளவீடு குறித்த விரிவான கல்வி.',
      },
      description: {
        en: 'Provides thorough grounding in structural analysis, concrete and steel technology, foundation design, and site levelling. Prepares learners for field supervision on civil projects across Singapore.',
        'zh-sg': '专为土建工程技术人员设计，深入掌握现场施工图纸识图、材料试验、测量放样与安全管理标准。',
        'ta-sg': 'சிங்கப்பூர் சிவில் மற்றும் கட்டடத் திட்டங்களில் கள மேற்பார்வைக்கான நடைமுறை அறிவு.',
      },
      careerOutcomes: {
        en: ['Resident Technical Officer Support', 'Civil Site Supervisor', 'Concrete & Material Inspector', 'Surveying Assistant'],
        'zh-sg': ['土建现场监督员', '助理结构技术员', '建材试验员', '工程测量助理'],
        'ta-sg': ['சிவில் தள மேற்பார்வையாளர்', 'கள தொழில்நுட்ப உதவியாளர்'],
      },
    },
    title: {
      en: 'Diploma in Civil Engineering',
      'zh-sg': '土木工程大专文凭课程',
      'ta-sg': 'சிவில் இன்ஜினியரிங் டிப்ளமோ',
    },
    overview: {
      en: 'Delivers comprehensive fundamentals in structural calculations, materials, concrete technology, and infrastructure site surveying.',
      'zh-sg': '全面掌握土木工程图纸绘制、结构力学、钢筋混凝土技术、地基基础与工程测量。',
      'ta-sg': 'கட்டட கட்டமைப்பு, கான்கிரீட் தொழில்நுட்பம் மற்றும் நில அளவீடு குறித்த விரிவான கல்வி.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Civil Engineering Drawing', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Structural Mechanics', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Concrete and Steel Technology', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Soil Mechanics and Foundation Engineering', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Surveying and Leveling', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '06', title: 'Construction Planning and Safety', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
    ],
    relatedCourseIds: ['35', '30', '79'],
  },

  // 7. Diploma in Mechanical Engineering (ID 32)
  {
    id: '32',
    slug: 'diploma-mechanical-engineering',
    level: 'diploma',
    category: 'engineering',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Diploma in Mechanical Engineering',
        'zh-sg': '机械工程大专文凭课程',
        'ta-sg': 'மெக்கானிக்கல் இன்ஜினியரிங் டிப்ளமோ',
      },
      summary: {
        en: 'Focuses on machine design, fluid mechanics, material tolerance, metrology, and precision manufacturing systems.',
        'zh-sg': '专注于机械结构设计、流体力学、材料强度试验、精密计量及现代制造生产技术。',
        'ta-sg': 'இயந்திர வடிவமைப்பு, திரவ இயக்கவியல் மற்றும் துல்லியமான உற்பத்தி அமைப்புகள்.',
      },
      description: {
        en: 'Develops core capabilities in mechanical design principles, strength calculations, fluid mechanics, and manufacturing quality control.',
        'zh-sg': '面向新加坡先进制造业与工程装配行业，系统掌握机械制图、热工基础与质量检验规范。',
        'ta-sg': 'தொழில்துறை இயந்திரங்கள் மற்றும் உற்பத்தி ஆலைகளில் பணிபுரிவதற்கான தொழில்நுட்ப அறிவு.',
      },
      careerOutcomes: {
        en: ['Mechanical Technician', 'Fabrication Supervisor', 'Equipment Maintenance Coordinator', 'Quality Control Inspector'],
        'zh-sg': ['机械维保技师', '精密加工班长', '设备巡检员', '质量检验助理'],
        'ta-sg': ['இயந்திர தொழில்நுட்ப வல்லுநர்', 'பராமரிப்பு ஒருங்கிணைப்பாளர்'],
      },
    },
    title: {
      en: 'Diploma in Mechanical Engineering',
      'zh-sg': '机械工程大专文凭课程',
      'ta-sg': 'மெக்கானிக்கல் இன்ஜினியரிங் டிப்ளமோ',
    },
    overview: {
      en: 'Focuses on machine design, fluid mechanics, material tolerance, metrology, and precision manufacturing systems.',
      'zh-sg': '专注于机械结构设计、流体力学、材料强度试验、精密计量及现代制造生产技术。',
      'ta-sg': 'இயந்திர வடிவமைப்பு, திரவ இயக்கவியல் மற்றும் துல்லியமான உற்பத்தி அமைப்புகள்.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Engineering Drawing', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Mechanics of Fluid', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Strength of Materials', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Metrology and Instrumentation Engineering', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '05', title: 'Manufacturing Technology', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '06', title: 'Thermodynamics Basics', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
    ],
    relatedCourseIds: ['37', '26', '70'],
  },

  // 8. Diploma in Electrical and Electronics Engineering (ID 33)
  {
    id: '33',
    slug: 'diploma-electrical-and-electronics-engineering',
    level: 'diploma',
    category: 'engineering',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Diploma in Electrical and Electronics Engineering',
        'zh-sg': '电气与电子工程大专文凭课程',
        'ta-sg': 'எலக்ட்ரிக்கல் மற்றும் எலக்ட்ரானிக்ஸ் இன்ஜினியரிங் டிப்ளமோ',
      },
      summary: {
        en: 'Teaches circuits, electrical machines, power distribution systems, and analogue/digital microelectronics.',
        'zh-sg': '系统讲授交直流电路分析、数字电路、低压配电系统、电气安全接线与电力驱动设备。',
        'ta-sg': 'மின்சார சுற்றுகள், மின் பகிர்வு மற்றும் டிஜிட்டல் எலக்ட்ரானிக்ஸ் தொழில்நுட்பம்.',
      },
      description: {
        en: 'Equips students with solid fundamentals across electrical power distribution, domestic and industrial wiring standards, digital logic circuits, and electrical safety codes.',
        'zh-sg': '深入培训供配电系统规范、变配电室日常操作、逻辑门电路与工业弱电设备检修技术。',
        'ta-sg': 'மின்சார விநியோக அமைப்புகள் மற்றும் தொழில்துறை மின் சாதனங்களின் செயல்முறை மேலாண்மை.',
      },
      careerOutcomes: {
        en: ['Electrical Technician', 'Control Panel Specialist', 'Power Maintenance Assistant', 'Electronics Diagnostic Technician'],
        'zh-sg': ['电气维保主管', '配电箱装配技术员', '弱电设备调试员', '现场电工督导'],
        'ta-sg': ['மின் தொழில்நுட்ப வல்லுநர்', 'சுற்று பலகை தொழில்நுட்ப உதவியாளர்'],
      },
    },
    title: {
      en: 'Diploma in Electrical and Electronics Engineering',
      'zh-sg': '电气与电子工程大专文凭课程',
      'ta-sg': 'எலக்ட்ரிக்கல் மற்றும் எலக்ட்ரானிக்ஸ் இன்ஜினியரிங் டிப்ளமோ',
    },
    overview: {
      en: 'Teaches circuits, electrical machines, power distribution systems, and analogue/digital microelectronics.',
      'zh-sg': '系统讲授交直流电路分析、数字电路、低压配电系统、电气安全接线与电力驱动设备。',
      'ta-sg': 'மின்சார சுற்றுகள், மின் பகிர்வு மற்றும் டிஜிட்டல் எலக்ட்ரானிக்ஸ் தொழில்நுட்பம்.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Electrical Principles', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Digital Electronics', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Circuit Analysis', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Power Distribution Systems', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Electrical Wiring and Safety', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '06', title: 'Electronic Devices and Circuits', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
    ],
    relatedCourseIds: ['36', '26', '70'],
  },

  // 9. Diploma in Hospitality Management (ID 34)
  {
    id: '34',
    slug: 'diploma-hospitality-management',
    level: 'diploma',
    category: 'hospitality',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Diploma in Hospitality Management',
        'zh-sg': '酒店与款待业管理大专文凭课程',
        'ta-sg': 'விருந்தோம்பல் மேலாண்மை டிப்ளமோ',
      },
      summary: {
        en: 'Prepares operational supervisors for hotels, tourism bureaus, restaurants, and resort attractions across Singapore.',
        'zh-sg': '培养适应新加坡酒店、餐饮综合体及旅游景点的基层督导与服务运营管理人才。',
        'ta-sg': 'ஹோட்டல்கள், சுற்றுலா மற்றும் உணவு சேவைத் துறையில் மேற்பார்வை பணிகளுக்கான பயிற்சி.',
      },
      description: {
        en: 'Covers essential hotel division operations: Food and Beverage service standards, Front Desk reservation systems, Housekeeping quality audits, and hospitality accounting.',
        'zh-sg': '全面涵盖餐饮部运营规范、前厅部接待与预订系统、客房部清洁品控及款待业成本核算。',
        'ta-sg': 'விருந்தோம்பல் துறையின் முக்கிய பிரிவுகளான உணவு சேவை, வரவேற்பு மற்றும் வாடிக்கையாளர் மேலாண்மை.',
      },
      careerOutcomes: {
        en: ['F&B Supervisor', 'Front Desk Operations Executive', 'Guest Relations Officer', 'Hospitality Coordinator'],
        'zh-sg': ['餐饮部领班', '前厅接待主管', '宾客关系主任', '度假村运营督导'],
        'ta-sg': ['உணவு சேவை மேற்பார்வையாளர்', 'வரவேற்பு அதிகாரி'],
      },
    },
    title: {
      en: 'Diploma in Hospitality Management',
      'zh-sg': '酒店与款待业管理大专文凭课程',
      'ta-sg': 'விருந்தோம்பல் மேலாண்மை டிப்ளமோ',
    },
    overview: {
      en: 'Prepares operational supervisors for hotels, tourism bureaus, restaurants, and resort attractions across Singapore.',
      'zh-sg': '培养适应新加坡酒店、餐饮综合体及旅游景点的基层督导与服务运营管理人才。',
      'ta-sg': 'ஹோட்டல்கள், சுற்றுலா மற்றும் உணவு சேவைத் துறையில் மேற்பார்வை பணிகளுக்கான பயிற்சி.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Food and Beverage Service Operations', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '02', title: 'Front Office Operations', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Housekeeping Management', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '04', title: 'Hospitality Customer Service', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Tourism Fundamentals', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '06', title: 'Hospitality Accounting Basics', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
    ],
    relatedCourseIds: ['81', '78', '38-3'],
  },

  // 10. Diploma in Caregiving and Healthcare Assistant (ID 78)
  {
    id: '78',
    slug: 'diploma-caregiving-and-healthcare-assistant',
    level: 'diploma',
    category: 'healthcare',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Diploma in Caregiving and Healthcare Assistant',
        'zh-sg': '专业护理与医护助理大专文凭课程',
        'ta-sg': 'பராமரிப்பு மற்றும் சுகாதார உதவியாளர் டிப்ளமோ',
      },
      summary: {
        en: 'Prepares healthcare assistants and community caregivers for infant, aged, and convalescent care across Singapore healthcare institutions.',
        'zh-sg': '为新加坡社区乐龄中心、康复疗养院及家庭护理机构培养具备生命救护与长者照料技能的专业护理人员。',
        'ta-sg': 'முதியோர் பராமரிப்பு, அவசர முதலுதவி மற்றும் சமூக சுகாதார பணிகளுக்கான தகுதி.',
      },
      description: {
        en: 'Addresses Singapore eldercare and clinical support demands. Students learn first aid, basic life support, nutritional diet planning, infection control, and geriatric psychology.',
        'zh-sg': '深入培训基础急救与心肺复苏（CPR）、老龄患者膳食营养调理、失智症照料与日常移动安全防护。',
        'ta-sg': 'மருத்துவமனை மற்றும் முதியோர் இல்லங்களில் திறம்பட பணியாற்ற தேவையான முதலுதவி மற்றும் நலம் சார்ந்த பயிற்சி.',
      },
      careerOutcomes: {
        en: ['Healthcare Assistant', 'Elderly Care Specialist', 'Community Care Coordinator', 'Rehabilitation Support Aide'],
        'zh-sg': ['医护助理', '乐龄中心护理员', '社区康养专员', '家庭特护助理'],
        'ta-sg': ['சுகாதார உதவியாளர்', 'முதியோர் நலம் பேணுநர்'],
      },
    },
    title: {
      en: 'Diploma in Caregiving and Healthcare Assistant',
      'zh-sg': '专业护理与医护助理大专文凭课程',
      'ta-sg': 'பராமரிப்பு மற்றும் சுகாதார உதவியாளர் டிப்ளமோ',
    },
    overview: {
      en: 'Prepares healthcare assistants and community caregivers for infant, aged, and convalescent care across Singapore healthcare institutions.',
      'zh-sg': '为新加坡社区乐龄中心、康复疗养院及家庭护理机构培养具备生命救护与长者照料技能的专业护理人员。',
      'ta-sg': 'முதியோர் பராமரிப்பு, அவசர முதலுதவி மற்றும் சமூக சுகாதார பணிகளுக்கான தகுதி.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Fundamentals of Caregiving and Health Care', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Nutrition and Meal Planning', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '03', title: 'First Aid and Basic Life Support', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '04', title: 'Infant and Elderly Care', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Health, Safety, Environmental and Risk Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '06', title: 'Problem-Solving and Decision-Making', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
    ],
    relatedCourseIds: ['34', '81', '38-3'],
  },

  // 11. Diploma in Logistics and Supply Chain Management (E-Learning) (ID 80)
  {
    id: '80',
    slug: 'diploma-logistics-and-supply-chain-management-elearning',
    level: 'diploma',
    category: 'business',
    deliveryMode: 'elearning',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance (Online Virtual Classroom & Portal)',
    teacherStudentRatio: '1:14 (Online)',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Diploma in Logistics and Supply Chain Management (E-Learning)',
        'zh-sg': '物流与供应链管理大专文凭课程（线上学习）',
        'ta-sg': 'தளவாடங்கள் மற்றும் விநியோகச் சங்கிலி மேலாண்மை டிப்ளமோ (மின்-கற்றல்)',
      },
      summary: {
        en: 'Prepares operations personnel to manage warehouse workflows, freight distribution, and procurement sourcing via 100% flexible e-learning.',
        'zh-sg': '通过100%全线上教学平台，灵活培训仓储运营、国际货运组织、采购供应链优化及企业信息系统。',
        'ta-sg': 'கிடங்கு மேலாண்மை, சரக்கு போக்குவரத்து மற்றும் விநியோகச் சங்கிலி மேலாண்மை குறித்த ஆன்லைன் படிப்பு.',
      },
      description: {
        en: 'Delivered via interactive digital learning for busy shift workers and international professionals. Focuses on physical distribution, inventory logistics, ERP warehouse modules, and global supply chains.',
        'zh-sg': '专为轮班技术人员和在职人士打造，兼顾日常工作与专业进修，深入掌握集装箱海空运调度、WMS系统与采购法务。',
        'ta-sg': 'பணிபுரிபவர்களுக்கான வசதியான ஆன்லைன் தளவாட மேலாண்மை பட்டயப் படிப்பு.',
      },
      careerOutcomes: {
        en: ['Logistics Coordinator', 'Warehouse Operations Supervisor', 'Freight Forwarding Assistant', 'Procurement Officer'],
        'zh-sg': ['物流调度协调员', '仓储运营主管', '货运代理业务助理', '采购行政专员'],
        'ta-sg': ['தளவாட ஒருங்கிணைப்பாளர்', 'கிடங்கு மேற்பார்வையாளர்'],
      },
    },
    title: {
      en: 'Diploma in Logistics and Supply Chain Management (E-Learning)',
      'zh-sg': '物流与供应链管理大专文凭课程（线上学习）',
      'ta-sg': 'தளவாடங்கள் மற்றும் விநியோகச் சங்கிலி மேலாண்மை டிப்ளமோ (மின்-கற்றல்)',
    },
    overview: {
      en: 'Prepares operations personnel to manage warehouse workflows, freight distribution, and procurement sourcing via 100% flexible e-learning.',
      'zh-sg': '通过100%全线上教学平台，灵活培训仓储运营、国际货运组织、采购供应链优化及企业信息系统。',
      'ta-sg': 'கிடங்கு மேலாண்மை, சரக்கு போக்குவரத்து மற்றும் விநியோகச் சங்கிலி மேலாண்மை குறித்த ஆன்லைன் படிப்பு.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Logistics and Supply Chain Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Purchasing Supply Chain Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Physical Distribution Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Management Information Systems', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Warehouse Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '06', title: 'Organizational Behaviour', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
    ],
    relatedCourseIds: ['81', '82', '72'],
  },

  // 12. Diploma in Business Management (E-Learning) (ID 81)
  {
    id: '81',
    slug: 'diploma-business-management-elearning',
    level: 'diploma',
    category: 'business',
    deliveryMode: 'elearning',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance (Online)',
    teacherStudentRatio: '1:14 (Online)',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Diploma in Business Management (E-Learning)',
        'zh-sg': '商业管理大专文凭课程（线上学习）',
        'ta-sg': 'வணிக மேலாண்மை டிப்ளமோ (மின்-கற்றல்)',
      },
      summary: {
        en: 'Core business administration covering corporate strategy, human capital, project management, and managerial communications.',
        'zh-sg': '全面涵盖企业战略管理、人力资源配置、商务沟通技巧、项目管理与组织行为学。',
        'ta-sg': 'வணிக நிர்வாகம், மூலோபாய திட்டமிடல் மற்றும் மனித வள மேலாண்மை.',
      },
      description: {
        en: 'Flexible 100% online curriculum imparting essential commercial competencies required for enterprise administration, supervisory leadership, and business operations.',
        'zh-sg': '为职场白领与初创团队打造的在线大专课程，掌握市场开拓、敏捷项目推动与企业跨部门协调。',
        'ta-sg': 'நவீன நிறுவனங்களை நிர்வகிப்பதற்கான அடிப்படை வணிக திறன்களை வழங்கும் படிப்பு.',
      },
      careerOutcomes: {
        en: ['Business Development Associate', 'Administrative Executive', 'Project Coordinator', 'Operations Supervisor'],
        'zh-sg': ['商务拓展专员', '综合行政主管', '项目运营协调员', '销售业务督导'],
        'ta-sg': ['வணிக நிர்வாகி', 'திட்ட ஒருங்கிணைப்பாளர்'],
      },
    },
    title: {
      en: 'Diploma in Business Management (E-Learning)',
      'zh-sg': '商业管理大专文凭课程（线上学习）',
      'ta-sg': 'வணிக மேலாண்மை டிப்ளமோ (மின்-கற்றல்)',
    },
    overview: {
      en: 'Core business administration covering corporate strategy, human capital, project management, and managerial communications.',
      'zh-sg': '全面涵盖企业战略管理、人力资源配置、商务沟通技巧、项目管理与组织行为学。',
      'ta-sg': 'வணிக நிர்வாகம், மூலோபாய திட்டமிடல் மற்றும் மனித வள மேலாண்மை.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Principles of Business Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Human Resource Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Effective Communication', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Strategic Business Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Project Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '06', title: 'Organizational Behaviour', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
    ],
    relatedCourseIds: ['82', '80', '72'],
  },

  // 13. Diploma in Human Resource Management (E-Learning) (ID 82)
  {
    id: '82',
    slug: 'diploma-human-resource-management-elearning',
    level: 'diploma',
    category: 'business',
    deliveryMode: 'elearning',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance (Online)',
    teacherStudentRatio: '1:14 (Online)',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Diploma in Human Resource Management (E-Learning)',
        'zh-sg': '人力资源管理大专文凭课程（线上学习）',
        'ta-sg': 'மனித வள மேலாண்மை டிப்ளமோ (மின்-கற்றல்)',
      },
      summary: {
        en: 'Specializes in talent recruitment, workplace training and development, labour relations, and corporate human capital strategies.',
        'zh-sg': '专注于人才招聘、企业员工培训与发展、职场劳资沟通、员工福利及人力资本战略规划。',
        'ta-sg': 'பணியாளர் ஆட்சேர்ப்பு, பயிற்சி மற்றும் நிறுவன மனித வள உத்திகள்.',
      },
      description: {
        en: 'Focuses on modern workforce governance. Teaches labour regulations, effective workplace conflict resolution, training needs analysis, and organizational dynamics.',
        'zh-sg': '专为企业HR从业者和行政人员打造，系统掌握劳动用工合规准则、绩效考核实施与培训项目统筹。',
        'ta-sg': 'பணியாளர் உறவுகள் மற்றும் மனித வள சட்ட விதிகளை திறம்பட கையாள வழிகாட்டும் ஆன்லைன் படிப்பு.',
      },
      careerOutcomes: {
        en: ['HR Officer', 'Talent Acquisition Coordinator', 'Training and Development Assistant', 'Personnel Administrator'],
        'zh-sg': ['人力资源专员', '招聘初审协调员', '培训实施助理', '员工关系管理员'],
        'ta-sg': ['மனித வள அதிகாரி', 'பயிற்சி உதவியாளர்'],
      },
    },
    title: {
      en: 'Diploma in Human Resource Management (E-Learning)',
      'zh-sg': '人力资源管理大专文凭课程（线上学习）',
      'ta-sg': 'மனித வள மேலாண்மை டிப்ளமோ (மின்-கற்றல்)',
    },
    overview: {
      en: 'Specializes in talent recruitment, workplace training and development, labour relations, and corporate human capital strategies.',
      'zh-sg': '专注于人才招聘、企业员工培训与发展、职场劳资沟通、员工福利及人力资本战略规划。',
      'ta-sg': 'பணியாளர் ஆட்சேர்ப்பு, பயிற்சி மற்றும் நிறுவன மனித வள உத்திகள்.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Human Resource Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Training and Development', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Effective Communication', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Strategic Human Resource Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Principles of Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '06', title: 'Organizational Behaviour', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
    ],
    relatedCourseIds: ['81', '80', '38-3'],
  },
];

// ============================================================================
// 2. ADVANCED DIPLOMA PROGRAMS (5 CATALOG ENTRIES)
// ============================================================================
const ADVANCED_DIPLOMA_COURSES: Course[] = [
  // 14. Advanced Diploma in Civil Engineering (ID 35)
  {
    id: '35',
    slug: 'advanced-diploma-civil-engineering',
    level: 'advanced-diploma',
    category: 'engineering',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Advanced Diploma in Civil Engineering',
        'zh-sg': '高级土木工程大专文凭课程',
        'ta-sg': 'மேம்பட்ட சிவில் இன்ஜினியரிங் டிப்ளமோ',
      },
      summary: {
        en: 'Advanced structural engineering, hydraulics, high-level materials analysis, and civil engineering management.',
        'zh-sg': '深度掌握高级结构工程力学、水力学工程、结构设计深化及工程技术统筹管理。',
        'ta-sg': 'மேம்பட்ட கட்டமைப்பு பொறியியல், ஹைட்ராலிக்ஸ் மற்றும் சிவில் மேலாண்மை.',
      },
      description: {
        en: 'Builds upon fundamental civil diplomas. Focuses on advanced structural calculations, reinforced concrete design, open-channel fluid hydraulics, and high-level technical team management.',
        'zh-sg': '面向有志晋升现场工程主管与副工程师的大专毕业生，提升高难度结构受力分析与大型施工组织能力。',
        'ta-sg': 'சிவில் இன்ஜினியரிங் டிப்ளமோ முடித்தவர்களுக்கான உயர்நிலை வடிவமைப்பு மற்றும் மேலாண்மை படிப்பு.',
      },
      careerOutcomes: {
        en: ['Assistant Civil Engineer', 'Senior Structural Coordinator', 'Civil Project Engineer', 'Resident Technical Officer Candidate'],
        'zh-sg': ['助理土木工程师', '高级结构现场主管', '土建项目工程师', '驻地技术代表候选人'],
        'ta-sg': ['உதவி சிவில் பொறியாளர்', 'மூத்த திட்ட பொறியாளர்'],
      },
    },
    title: {
      en: 'Advanced Diploma in Civil Engineering',
      'zh-sg': '高级土木工程大专文凭课程',
      'ta-sg': 'மேம்பட்ட சிவில் இன்ஜினியரிங் டிப்ளமோ',
    },
    overview: {
      en: 'Advanced structural engineering, hydraulics, high-level materials analysis, and civil engineering management.',
      'zh-sg': '深度掌握高级结构工程力学、水力学工程、结构设计深化及工程技术统筹管理。',
      'ta-sg': 'மேம்பட்ட கட்டமைப்பு பொறியியல், ஹைட்ராலிக்ஸ் மற்றும் சிவில் மேலாண்மை.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_ADV_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Engineering Drawings and Design', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Advanced Technical Engineering Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Advanced Strength of Materials Engineering', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Advanced Structural Engineering', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Engineering Mathematics', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '06', title: 'Hydraulics Engineering', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
    ],
    relatedCourseIds: ['31', '79', '30'],
  },

  // 15. Advanced Diploma in Electrical and Electronics Engineering (ID 36)
  {
    id: '36',
    slug: 'advanced-diploma-electrical-and-electronics-engineering',
    level: 'advanced-diploma',
    category: 'engineering',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Advanced Diploma in Electrical and Electronics Engineering',
        'zh-sg': '高级电气与电子工程大专文凭课程',
        'ta-sg': 'மேம்பட்ட எலக்ட்ரிக்கல் & எலக்ட்ரானிக்ஸ் இன்ஜினியரிங் டிப்ளமோ',
      },
      summary: {
        en: 'High-voltage power systems, industrial electronics, heavy electrical machinery, and advanced engineering management.',
        'zh-sg': '深入研讨高压电力网络、大功率电气旋转电机、工业级电子芯片控制与工程管理技术。',
        'ta-sg': 'தொழில்துறை எலக்ட்ரானிக்ஸ் மற்றும் மின் அமைப்புகளுக்கான மேம்பட்ட தொழில்நுட்ப பயிற்சி.',
      },
      description: {
        en: 'Specialized for technicians advancing to engineering positions. Encompasses substations, power transformers, harmonic analysis, and complex industrial automated electronic systems.',
        'zh-sg': '专为从事配电站升级改造、工业重电驱动与自动化流水线运维的骨干技术人员设计。',
        'ta-sg': 'மின்சார உற்பத்தி மற்றும் விநியோக நிலையங்களில் பணியாற்றுவதற்கான உயர்நிலை தகுதி.',
      },
      careerOutcomes: {
        en: ['Assistant Electrical Engineer', 'Power Substation Supervisor', 'Industrial Automation Specialist', 'Electrical Project Engineer'],
        'zh-sg': ['助理电气工程师', '变电站值班技术主管', '工业自控调试专家', '电气工程项目经理'],
        'ta-sg': ['உதவி மின் பொறியாளர்', 'துணை மின்நிலைய மேற்பார்வையாளர்'],
      },
    },
    title: {
      en: 'Advanced Diploma in Electrical and Electronics Engineering',
      'zh-sg': '高级电气与电子工程大专文凭课程',
      'ta-sg': 'மேம்பட்ட எலக்ட்ரிக்கல் & எலக்ட்ரானிக்ஸ் இன்ஜினியரிங் டிப்ளமோ',
    },
    overview: {
      en: 'High-voltage power systems, industrial electronics, heavy electrical machinery, and advanced engineering management.',
      'zh-sg': '深入研讨高压电力网络、大功率电气旋转电机、工业级电子芯片控制与工程管理技术。',
      'ta-sg': 'தொழில்துறை எலக்ட்ரானிக்ஸ் மற்றும் மின் அமைப்புகளுக்கான மேம்பட்ட தொழில்நுட்ப பயிற்சி.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_ADV_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Engineering Drawings and Design', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Advanced Technical Engineering Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Electrical Services and Electrical Machines Engineering', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Advanced Industrial Electronics Engineering', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Engineering Mathematics', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '06', title: 'Power Systems Engineering', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
    ],
    relatedCourseIds: ['33', '70', '26'],
  },

  // 16. Advanced Diploma in Mechanical Engineering (ID 37)
  {
    id: '37',
    slug: 'advanced-diploma-mechanical-engineering',
    level: 'advanced-diploma',
    category: 'engineering',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Advanced Diploma in Mechanical Engineering',
        'zh-sg': '高级机械工程大专文凭课程',
        'ta-sg': 'மேம்பட்ட மெக்கானிக்கல் இன்ஜினியரிங் டிப்ளமோ',
      },
      summary: {
        en: 'Production technology, advanced fluid dynamics, structural fatigue resilience, and engineering leadership.',
        'zh-sg': '强化先进制造加工工艺、高阶流体动力学、构件疲劳强度及机械生产管理体系。',
        'ta-sg': 'மேம்பட்ட திரவ இயக்கவியல், உற்பத்தி தொழில்நுட்பம் மற்றும் பொறியியல் மேலாண்மை.',
      },
      description: {
        en: 'Equips senior mechanical technicians with advanced skills in production line optimization, fluid machinery (pumps/compressors), dynamic stress analysis, and mechanical engineering drawings.',
        'zh-sg': '专为重型机械制造、空压泵组系统及自动化流水线资深技术管理人员设计的晋升课程。',
        'ta-sg': 'இயந்திர உற்பத்தி ஆலைகள் மற்றும் பராமரிப்பு பிரிவுகளுக்கான மேம்பட்ட தகுதி.',
      },
      careerOutcomes: {
        en: ['Assistant Mechanical Engineer', 'Plant Production Engineer', 'Machinery Overhaul Supervisor', 'Mechanical Quality Lead'],
        'zh-sg': ['助理机械工程师', '制造生产主管', '大型机电设备大修领班', '品质保证技术督导'],
        'ta-sg': ['உதவி மெக்கானிக்கல் பொறியாளர்', 'ஆலை உற்பத்தி பொறியாளர்'],
      },
    },
    title: {
      en: 'Advanced Diploma in Mechanical Engineering',
      'zh-sg': '高级机械工程大专文凭课程',
      'ta-sg': 'மேம்பட்ட மெக்கானிக்கல் இன்ஜினியரிங் டிப்ளமோ',
    },
    overview: {
      en: 'Production technology, advanced fluid dynamics, structural fatigue resilience, and engineering leadership.',
      'zh-sg': '强化先进制造加工工艺、高阶流体动力学、构件疲劳强度及机械生产管理体系。',
      'ta-sg': 'மேம்பட்ட திரவ இயக்கவியல், உற்பத்தி தொழில்நுட்பம் மற்றும் பொறியியல் மேலாண்மை.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_ADV_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Engineering Drawings and Design', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Advanced Technical Engineering Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Advanced Strength of Materials Engineering', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Advanced Engineering in Production Technology', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '05', title: 'Engineering Mathematics', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '06', title: 'Advanced Fluid Mechanics Engineering', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
    ],
    relatedCourseIds: ['32', '70', '26'],
  },

  // 17. Advanced Diploma in Mechanical and Electrical Engineering (ID 70)
  {
    id: '70',
    slug: 'advanced-diploma-mechanical-and-electrical-engineering',
    level: 'advanced-diploma',
    category: 'engineering',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Advanced Diploma in Mechanical and Electrical Engineering',
        'zh-sg': '高级机电工程大专文凭课程',
        'ta-sg': 'மேம்பட்ட மெக்கானிக்கல் மற்றும் எலக்ட்ரிக்கல் இன்ஜினியரிங் டிப்ளமோ',
      },
      summary: {
        en: 'Comprehensive cross-disciplinary training across heavy electrical machines, fluid mechanics, power grids, and manufacturing systems.',
        'zh-sg': '综合贯通重型电气装备、高阶流体力学、输配电网络与先进生产制造技术。',
        'ta-sg': 'இயந்திர மற்றும் மின் அமைப்புகளின் ஒருங்கிணைந்த மேம்பட்ட தொழில்நுட்ப கல்வி.',
      },
      description: {
        en: 'Delivers multi-disciplinary integration across heavy electrical machinery, grid distribution, mechanical thermal stress analysis, and industrial manufacturing plants in Singapore.',
        'zh-sg': '针对现代大型基建、地铁综合管廊与工业园区的综合机电工程管理，培养机电一体化资深骨干。',
        'ta-sg': 'பெரிய அளவிலான திட்டங்களில் இயந்திர-மின் ஒருங்கிணைப்பை வழிநடத்த உதவும் சிறப்பு படிப்பு.',
      },
      careerOutcomes: {
        en: ['Senior M&E Coordinator', 'Assistant M&E Engineer', 'Building Services Project Supervisor', 'Technical Facility Lead'],
        'zh-sg': ['高级机电协调员', '助理机电工程师', '楼宇机电项目主管', '综合技术服务领队'],
        'ta-sg': ['மூத்த எம்&இ ஒருங்கிணைப்பாளர்', 'உதவி பொறியாளர்'],
      },
    },
    title: {
      en: 'Advanced Diploma in Mechanical and Electrical Engineering',
      'zh-sg': '高级机电工程大专文凭课程',
      'ta-sg': 'மேம்பட்ட மெக்கானிக்கல் மற்றும் எலக்ட்ரிக்கல் இன்ஜினியரிங் டிப்ளமோ',
    },
    overview: {
      en: 'Comprehensive cross-disciplinary training across heavy electrical machines, fluid mechanics, power grids, and manufacturing systems.',
      'zh-sg': '综合贯通重型电气装备、高阶流体力学、输配电网络与先进生产制造技术。',
      'ta-sg': 'இயந்திர மற்றும் மின் அமைப்புகளின் ஒருங்கிணைந்த மேம்பட்ட தொழில்நுட்ப கல்வி.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_ADV_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Advanced Strength of Materials Engineering', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Advanced Engineering in Production Technology', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '03', title: 'Advanced Fluid Mechanics Engineering', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Principles of Electrical Engineering', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Electrical Services and Electrical Machines Engineering', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '06', title: 'Power Systems Engineering', contactHours: 16, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
    ],
    relatedCourseIds: ['26', '36', '37', '71'],
  },

  // 18. Advanced Diploma in Construction Management (ID 79)
  {
    id: '79',
    slug: 'advanced-diploma-construction-management',
    level: 'advanced-diploma',
    category: 'engineering',
    deliveryMode: 'classroom',
    durationMonths: 6,
    contactHours: 96,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Advanced Diploma in Construction Management',
        'zh-sg': '高级建筑施工管理大专文凭课程',
        'ta-sg': 'மேம்பட்ட கட்டுமான மேலாண்மை டிப்ளமோ',
      },
      summary: {
        en: 'Focuses on construction planning, project scheduling, financial control, contract administration, and statutory WSH safety standards.',
        'zh-sg': '全面培训施工进度排期控制、成本财务核算、施工合同索赔管理与新加坡WSH安全规范。',
        'ta-sg': 'கட்டுமான திட்டமிடல், திட்ட மேலாண்மை, செலவு கட்டுப்பாடு மற்றும் பாதுகாப்பு சட்ட விதிகள்.',
      },
      description: {
        en: 'Directly geared towards project supervisors and site managers navigating the Building and Construction Authority (BCA) and Ministry of Manpower (MOM) statutory landscape in Singapore.',
        'zh-sg': '依据新加坡建设局（BCA）与人力部（MOM）的法定标准，深度培训大型现场总包管理与合规实务。',
        'ta-sg': 'சிங்கப்பூர் கட்டுமான தளங்களில் திட்ட மேலாளராக பணியாற்றுவதற்கான தகுதி.',
      },
      careerOutcomes: {
        en: ['Construction Project Manager', 'Senior Site Supervisor', 'Contract Administrator', 'Project Planning Engineer'],
        'zh-sg': ['建筑项目经理', '资深现场主管', '总包合同商务经理', '工期进度规划工程师'],
        'ta-sg': ['கட்டுமான திட்ட மேலாளர்', 'மூத்த தள மேற்பார்வையாளர்'],
      },
    },
    title: {
      en: 'Advanced Diploma in Construction Management',
      'zh-sg': '高级建筑施工管理大专文凭课程',
      'ta-sg': 'மேம்பட்ட கட்டுமான மேலாண்மை டிப்ளமோ',
    },
    overview: {
      en: 'Focuses on construction planning, project scheduling, financial control, contract administration, and statutory WSH safety standards.',
      'zh-sg': '全面培训施工进度排期控制、成本财务核算、施工合同索赔管理与新加坡WSH安全规范。',
      'ta-sg': 'கட்டுமான திட்டமிடல், திட்ட மேலாண்மை, செலவு கட்டுப்பாடு மற்றும் பாதுகாப்பு சட்ட விதிகள்.',
    },
    fees: STANDARD_DIPLOMA_FEES,
    entryRequirements: STANDARD_ADV_DIPLOMA_ENTRY,
    modules: [
      { code: '01', title: 'Construction Planning Programming and Project Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Construction Technology', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Cost and Financial Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Contract Administration', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Health, Safety, Environmental and Risk Management', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '06', title: 'Problem-Solving and Decision-Making', contactHours: 16, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
    ],
    relatedCourseIds: ['30', '35', '31'],
  },
];

// ============================================================================
// 3. SHORT TERM MODULAR COURSES (1 CONSOLIDATED CATALOG ENTRY + 5 DISCOVERABLE UNITS)
// ============================================================================
const VERIFIED_SUB_COURSES: ShortTermSubCourse[] = [
  {
    id: '38-1',
    slug: 'certificate-ms-office-basic-level',
    title: {
      en: 'Certificate in MS Office Basic Level',
      'zh-sg': '微软办公软件初级认证课程 (MS Office Basic)',
      'ta-sg': 'எம்எஸ் ஆபிஸ் அடிப்படை சான்றிதழ் படிப்பு',
    },
    durationMonths: 1,
    contactHours: 6,
    fee: 250,
    currency: 'SGD',
    targetSkills: {
      en: 'Microsoft Word document formatting, text styling, and basic Microsoft Excel tabular arithmetic.',
      'zh-sg': 'Word基础文档排版、文字样式设置及Excel常用表格数据录入与简单算术运算。',
      'ta-sg': 'வேர்ட் ஆவண உருவாக்கம் மற்றும் எக்செல் எளிய கணக்கீடுகள்.',
    },
    isVerified: true,
  },
  {
    id: '38-2',
    slug: 'certificate-ms-office-advanced-level',
    title: {
      en: 'Certificate in MS Office Advanced Level',
      'zh-sg': '微软办公软件高级认证课程 (MS Office Advanced)',
      'ta-sg': 'எம்எஸ் ஆபிஸ் உயர்நிலை சான்றிதழ் படிப்பு',
    },
    durationMonths: 1,
    contactHours: 12,
    fee: 450,
    currency: 'SGD',
    targetSkills: {
      en: 'Advanced Excel formulas (VLOOKUP, XLOOKUP, Nested IF), Pivot Tables, and professional PowerPoint business presentations.',
      'zh-sg': '深入培训高级数据统计、透视表分析、跨表函数联动及商务演示汇报设计。',
      'ta-sg': 'மேம்பட்ட எக்செல் சூத்திரங்கள், பைவட் அட்டவணைகள் மற்றும் விளக்கக்காட்சிகள்.',
    },
    isVerified: true,
  },
  {
    id: '38-3',
    slug: 'certificate-for-spoken-english',
    title: {
      en: 'Certificate for Spoken English',
      'zh-sg': '职场英语口语进修证书课程 (Spoken English)',
      'ta-sg': 'ஆங்கில பேச்சுத்திறன் சான்றிதழ் படிப்பு',
    },
    durationMonths: 1,
    contactHours: 12,
    fee: 400,
    currency: 'SGD',
    targetSkills: {
      en: 'Conversational fluency, workplace dialogue, correct pronunciation, and customer communications in English.',
      'zh-sg': '专注于日常职场交际表达、标准英语发音矫正及新加坡多元文化职场有效沟通。',
      'ta-sg': 'வேலைத்தளத்தில் நம்பிக்கையுடன் ஆங்கிலத்தில் உரையாட பயிற்சி.',
    },
    isVerified: true,
  },
  {
    id: '38-4',
    slug: 'certificate-in-cad',
    title: {
      en: 'Certificate in CAD (Computer-Aided Design)',
      'zh-sg': 'CAD计算机辅助工程绘图证书课程',
      'ta-sg': 'CAD கணினி வரைபட சான்றிதழ் படிப்பு',
    },
    durationMonths: 1,
    contactHours: 12,
    fee: 450,
    currency: 'SGD',
    targetSkills: {
      en: 'Hands-on 2D drafting in AutoCAD, floorplan layout creation, dimensioning standards, and architectural detailing.',
      'zh-sg': '手把手传授AutoCAD工程二维制图、建筑平面图绘制、机械详图尺寸标注与图纸图层规范。',
      'ta-sg': '2D கணினி பொறியியல் வரைபடங்கள் மற்றும் திட்ட வடிவமைப்பு.',
    },
    isVerified: true,
  },
  {
    id: '38-5',
    slug: 'certificate-in-computer-hardware-and-networking',
    title: {
      en: 'Certificate in Computer Hardware and Networking',
      'zh-sg': '计算机硬件与网络技术认证课程',
      'ta-sg': 'கணினி வன்பொருள் மற்றும் நெட்வொர்க்கிங் சான்றிதழ்',
    },
    durationMonths: 1,
    contactHours: 24,
    fee: 900,
    currency: 'SGD',
    targetSkills: {
      en: 'Benchtop PC assembly, hardware diagnostics, LAN cabling, switch setup, and TCP/IP configuration.',
      'zh-sg': '实战组装电脑硬件、主板与电源故障排查、局域网布线压接、路由器与IP网络地址配置。',
      'ta-sg': 'கணினி பாகங்கள் பொருத்துதல், பழுது நீக்குதல் மற்றும் நெட்வொர்க் கட்டமைப்பு.',
    },
    isVerified: true,
  },
];

// 19. Consolidated Short-Term Modular Entry (ID 38)
const CONSOLIDATED_SHORT_TERM_COURSE: Course = {
  id: '38',
  slug: 'short-term-modular-courses',
  level: 'short-term',
  category: 'it',
  deliveryMode: 'classroom',
  durationMonths: 1,
  contactHours: 66, // Total cumulative contact hours across all 5 modules (6+12+12+12+24)
  attendanceRequirement: '80% Mandatory Attendance',
  teacherStudentRatio: '1:14 (Hands-on Computer Lab)',
  awardingBody: 'Edulearn International College',
  isVerified: true,
  cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
  content: {
    title: {
      en: 'Short-Term Modular Industry Certifications',
      'zh-sg': '短期实用技能模块认证系列课程',
      'ta-sg': 'குறுகிய கால தொழில் சான்றிதழ் படிப்புகள்',
    },
    summary: {
      en: 'Intensive 1-month hands-on industry certificates in MS Office, Spoken English, AutoCAD Drafting, and Computer Networking.',
      'zh-sg': '为期1个月的高强度实用技能认证，涵盖微软办公软件、职场英语口语、AutoCAD制图与计算机硬件网络。',
      'ta-sg': 'எம்எஸ் ஆபிஸ், ஆங்கில பேச்சு, ஆட்டோகேட் வரைபடம் மற்றும் கணினி வன்பொருள் குறித்த 1 மாத சிறப்பு பயிற்சிகள்.',
    },
    description: {
      en: 'Practical skill-enhancement certificates designed for working adults and technicians aiming to swiftly acquire immediately applicable workplace computer, drafting, language, and technical competencies.',
      'zh-sg': '针对在职人员和现场技术工人打造的高效技能提升认证体系，采用小班互动实操教学，快速提升日常办公效率与工程图纸识图绘图能力。',
      'ta-sg': 'பணிபுரியும் நபர்கள் குறுகிய காலத்தில் கணினி மற்றும் தொழில்நுட்ப திறன்களை மேம்படுத்திக்கொள்ள உதவும் நடைமுறை சான்றிதழ் படிப்புகள்.',
    },
    careerOutcomes: {
      en: ['CAD Drafter', 'Administrative Assistant', 'Junior IT Support Tech', 'Customer Communications Specialist'],
      'zh-sg': ['CAD绘图员', '企业行政助理', '初级IT维保专员', '涉外客服沟通专员'],
      'ta-sg': ['ஆட்டோகேட் வரைவாளர்', 'அலுவலக உதவியாளர்', 'ஐடி தொழில்நுட்ப வல்லுநர்'],
    },
  },
  title: {
    en: 'Short-Term Modular Industry Certifications',
    'zh-sg': '短期实用技能模块认证系列课程',
    'ta-sg': 'குறுகிய கால தொழில் சான்றிதழ் படிப்புகள்',
  },
  overview: {
    en: 'Intensive 1-month hands-on industry certificates in MS Office, Spoken English, AutoCAD Drafting, and Computer Networking.',
    'zh-sg': '为期1个月的高强度实用技能认证，涵盖微软办公软件、职场英语口语、AutoCAD制图与计算机硬件网络。',
    'ta-sg': 'எம்எஸ் ஆபிஸ், ஆங்கில பேச்சு, ஆட்டோகேட் வரைபடம் மற்றும் கணினி வன்பொருள் குறித்த 1 மாத சிறப்பு பயிற்சிகள்.',
  },
  fees: {
    modular: {
      fee: 250, // Starts from S$250
      currency: 'SGD',
      isVerified: true,
    },
    applicationFee: {
      amount: 54.5,
      currency: 'SGD',
      isNonRefundable: true,
      isVerified: true,
    },
    medicalInsuranceFee: null,
    isVerified: true,
  },
  entryRequirements: {
    academicPrerequisites: {
      en: 'Open entry to working adults, jobseekers, and technical personnel. No minimum academic qualification required.',
      'zh-sg': '面向零基础进修者、求职者及技术工人开放，无需特定学历前置门槛。',
      'ta-sg': 'அனைத்து பணிபுரியும் நபர்களுக்கும் திறந்த சேர்க்கை. குறைந்தபட்ச தகுதி தேவையில்லை.',
    },
    languageProficiency: null,
    minimumAge: 16,
    workExperienceYears: null,
    matureCandidateClause: null,
    isVerified: true,
    en: 'Open to all working adults and students seeking practical computer, CAD, networking, or English communication skills.',
    'zh-sg': '面向希望掌握计算机、工程绘图、网络技术或英语口语实操技能的学员开放。',
    'ta-sg': 'கணினி, வரைபடம் அல்லது ஆங்கில பேச்சாற்றலை வளர்க்க விரும்பும் அனைவருக்கும்.',
  },
  modules: [
    { code: 'M1', title: 'MS Office Basic Level (Word & Excel)', contactHours: 6, assessment: 'Practical Computer Assessment', isVerified: true },
    { code: 'M2', title: 'MS Office Advanced Level (Formulas, Pivots & Presentations)', contactHours: 12, assessment: 'Practical Computer Assessment', isVerified: true },
    { code: 'M3', title: 'Spoken English for the Workplace', contactHours: 12, assessment: 'Oral Presentation Assessment', isVerified: true },
    { code: 'M4', title: 'CAD Drafting Fundamentals (AutoCAD 2D)', contactHours: 12, assessment: 'Practical CAD Project', isVerified: true },
    { code: 'M5', title: 'Computer Hardware & Network Troubleshooting', contactHours: 24, assessment: 'Hands-on Hardware Lab', isVerified: true },
  ],
  subCourses: VERIFIED_SUB_COURSES,
  relatedCourseIds: ['27', '81', '31'],
};

// Also generate individual discoverable Course entities for each modular certificate
const INDIVIDUAL_MODULAR_COURSES: Course[] = VERIFIED_SUB_COURSES.map((sub) => {
  let cat: CourseCategory = 'it';
  if (sub.slug.includes('spoken-english')) cat = 'business';
  if (sub.slug.includes('cad')) cat = 'engineering';

  return {
    id: sub.id,
    slug: sub.slug,
    level: 'short-term' as CourseLevel,
    category: cat,
    deliveryMode: 'classroom' as DeliveryMode,
    durationMonths: sub.durationMonths,
    contactHours: sub.contactHours,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: sub.title,
      summary: {
        en: `Intensive 1-month practical modular certificate (${sub.contactHours} contact hours) awarded by EIC.`,
        'zh-sg': `由EIC颁发的1个月实用技能认证模块课程（共计${sub.contactHours}课时）。`,
        'ta-sg': `1 மாத கால நடைமுறை சிறப்பு சான்றிதழ் படிப்பு (${sub.contactHours} மணிநேரம்).`,
      },
      description: {
        en: `${sub.title.en} focuses on: ${sub.targetSkills.en}.`,
        'zh-sg': `${sub.title['zh-sg']}核心培训重点：${sub.targetSkills['zh-sg']}`,
        'ta-sg': `${sub.title['ta-sg']} முக்கிய பாடத்திட்டம்: ${sub.targetSkills['ta-sg']}`,
      },
      careerOutcomes: {
        en: ['Specialist Skill Certificate Holder', 'Upgraded Industry Practitioner'],
        'zh-sg': ['专业技术单科证书持有者', '技能提升在职人员'],
        'ta-sg': ['தொழில்நுட்ப சான்றிதழ் பெற்ற பணியாளர்'],
      },
    },
    title: sub.title,
    overview: {
      en: `Intensive 1-month practical modular certificate (${sub.contactHours} contact hours).`,
      'zh-sg': `1个月实用技能认证模块课程（${sub.contactHours}课时）。`,
      'ta-sg': `1 மாத நடைமுறை சான்றிதழ் படிப்பு (${sub.contactHours} மணிநேரம்).`,
    },
    fees: {
      modular: {
        fee: sub.fee,
        currency: sub.currency,
        isVerified: true,
      },
      applicationFee: {
        amount: 54.5,
        currency: 'SGD',
        isNonRefundable: true,
        isVerified: true,
      },
      medicalInsuranceFee: null,
      isVerified: true,
    },
    entryRequirements: {
      academicPrerequisites: {
        en: 'Open to all candidates seeking practical skills improvement.',
        'zh-sg': '面向所有希望提升实用技能的学员开放。',
        'ta-sg': 'அனைத்து ஆர்வமுள்ள நபர்களுக்கும்.',
      },
      languageProficiency: null,
      minimumAge: 16,
      workExperienceYears: null,
      matureCandidateClause: null,
      isVerified: true,
      en: 'Open to all individuals seeking foundational skills.',
      'zh-sg': '面向零基础进修者，无需特定学历门槛。',
      'ta-sg': 'அடிப்படை அறிவு பெற விரும்பும் எவருக்கும்.',
    },
    modules: [
      {
        code: 'M1',
        title: sub.title.en,
        contactHours: sub.contactHours,
        assessment: 'Practical Skills Assessment',
        isVerified: true,
      },
    ],
    relatedCourseIds: ['38', '27'],
  };
});

// ============================================================================
// 4. POSTGRADUATE DIPLOMA PROGRAMS (2 CATALOG ENTRIES)
// ============================================================================
const POSTGRADUATE_COURSES: Course[] = [
  // 20. Postgraduate Diploma in Mechanical and Electrical Instrumentation Control Engineering (ID 71)
  {
    id: '71',
    slug: 'postgraduate-diploma-me-instrumentation-control-engineering',
    level: 'postgraduate',
    category: 'engineering',
    deliveryMode: 'classroom',
    durationMonths: 12,
    contactHours: 192,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Postgraduate Diploma in Mechanical and Electrical Instrumentation Control Engineering',
        'zh-sg': '机电仪器与自控工程研究生文凭课程',
        'ta-sg': 'மெக்கானிக்கல் & எலக்ட்ரிக்கல் கருவி மற்றும் கட்டுப்பாட்டு பொறியியல் முதுகலை டிப்ளமோ',
      },
      summary: {
        en: 'Advanced control loops, PLC automation, and industrial instrumentation for petrochemical, energy, and automated manufacturing sectors.',
        'zh-sg': '面向石化、能源及智能制造行业，系统掌握高阶闭环控制、PLC可编程控制器与工业自控仪表体系。',
        'ta-sg': 'தொழில்துறை ஆட்டோமேஷன், பிஎல்சி கட்டுப்பாடுகள் மற்றும் துல்லியமான கருவிகள் மேலாண்மை.',
      },
      description: {
        en: 'Rigorous 12-month postgraduate qualification designed for practicing engineers and senior plant supervisors. Deepens knowledge in thermodynamic fluid mechanics, industrial instrumentation loops, PLC programming, and Advanced Process Control (APC).',
        'zh-sg': '为期12个月的研究生层次进修项目，面向石油化工、电力与高精制造领域工程人员，系统深化先进过程控制、自控回路诊断与设备安全联锁逻辑。',
        'ta-sg': 'பொறியாளர்களுக்கு தொழில்துறை செயல்முறை கட்டுப்பாடு மற்றும் நவீன ஆட்டோமேஷன் அமைப்புகளில் நிபுணத்துவம் வழங்கும் படிப்பு.',
      },
      careerOutcomes: {
        en: ['Instrumentation & Control Engineer', 'Senior Automation Specialist', 'Plant Reliability Lead', 'SCADA Project Engineer'],
        'zh-sg': ['自控仪表主任工程师', '资深自动化技术专家', '化工厂可靠性主管', 'SCADA监控项目经理'],
        'ta-sg': ['கருவி மற்றும் கட்டுப்பாட்டு பொறியாளர்', 'ஆட்டோமேஷன் நிபுணர்'],
      },
    },
    title: {
      en: 'Postgraduate Diploma in Mechanical and Electrical Instrumentation Control Engineering',
      'zh-sg': '机电仪器与自控工程研究生文凭课程',
      'ta-sg': 'மெக்கானிக்கல் & எலக்ட்ரிக்கல் கருவி மற்றும் கட்டுப்பாட்டு பொறியியல் முதுகலை டிப்ளமோ',
    },
    overview: {
      en: 'Advanced control loops, PLC automation, and industrial instrumentation for petrochemical, energy, and automated manufacturing sectors.',
      'zh-sg': '面向石化、能源及智能制造行业，系统掌握高阶闭环控制、PLC可编程控制器与工业自控仪表体系。',
      'ta-sg': 'தொழில்துறை ஆட்டோமேஷன், பிஎல்சி கட்டுப்பாடுகள் மற்றும் துல்லியமான கருவிகள் மேலாண்மை.',
    },
    fees: {
      fullTime: {
        courseFee: 5400,
        registrationFee: 300,
        installmentsCount: 12,
        installmentAmount: 450,
        currency: 'SGD',
        notes: 'S$450 per month across 12 equal installments. S$300 non-refundable registration fee upon enrollment.',
        isVerified: true,
      },
      partTime: {
        courseFee: 4800,
        registrationFee: 300,
        installmentsCount: 12,
        installmentAmount: 400,
        currency: 'SGD',
        notes: 'S$400 per month across 12 equal installments. S$300 non-refundable registration fee upon enrollment.',
        isVerified: true,
      },
      modular: null,
      applicationFee: {
        amount: 54.5,
        currency: 'SGD',
        isNonRefundable: true,
        isVerified: true,
      },
      medicalInsuranceFee: {
        amount: 21.8,
        currency: 'SGD',
        period: 'per year',
        isVerified: true,
      },
      isVerified: true,
    },
    entryRequirements: STANDARD_POSTGRAD_ENTRY,
    modules: [
      { code: '01', title: 'Mechanical Systems Design', contactHours: 32, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Thermodynamics and Applied Fluid Mechanics', contactHours: 32, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Electrical Machines and Drives', contactHours: 32, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Industrial Instrumentation Systems', contactHours: 32, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Process Instrumentation and Control Systems Engineering', contactHours: 32, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
      { code: '06', title: 'Programmable Logic Controllers (PLCs) and Advanced Process Control (APC)', contactHours: 32, assessment: 'Written Exam 40% + Practical Exam 60%', isVerified: true },
    ],
    relatedCourseIds: ['70', '26', '29'],
  },

  // 21. Postgraduate Diploma in Business Management (ID 72)
  {
    id: '72',
    slug: 'postgraduate-diploma-business-management',
    level: 'postgraduate',
    category: 'business',
    deliveryMode: 'classroom',
    durationMonths: 12,
    contactHours: 192,
    attendanceRequirement: '80% Mandatory Attendance',
    teacherStudentRatio: '1:14',
    awardingBody: 'Edulearn International College',
    isVerified: true,
    cpeRegistration: { isRegistered: true, peiRegistrationNo: '201708935D' },
    content: {
      title: {
        en: 'Postgraduate Diploma in Business Management',
        'zh-sg': '工商管理研究生文凭课程',
        'ta-sg': 'வணிக மேலாண்மை முதுகலை டிப்ளமோ',
      },
      summary: {
        en: 'Equips aspiring corporate leaders with advanced strategic management, global supply chain, marketing analytics, and organizational leadership.',
        'zh-sg': '面向企业中高层管理者，系统提升战略制定、跨国供应链运作、市场营销决策与敏捷项目管理能力。',
        'ta-sg': 'கார்ப்பரேட் தலைமைத்துவம், சந்தைப்படுத்தல் மற்றும் செயல்பாட்டு மேலாண்மை.',
      },
      description: {
        en: 'Designed to equip aspiring corporate leaders with executive decision-making capabilities. Spans organizational behaviour, supply chain operations, strategic management, and project execution frameworks.',
        'zh-sg': '全面培养具备全球化视野的企业管理领袖，系统研讨复杂多变经济环境下的商业决策、团队组织变革与品牌市场营销策略。',
        'ta-sg': 'நிறுவனங்களில் உயர் பதவிகளை வகிக்க விரும்பும் நிபுணர்களுக்கான விரிவான வணிக உத்தி மற்றும் தலைமைத்துவ படிப்பு.',
      },
      careerOutcomes: {
        en: ['General Manager', 'Operations Director', 'Strategy & Planning Consultant', 'Senior Business Lead'],
        'zh-sg': ['企业总经理/副总经理', '运营总监', '战略规划顾问', '高级项目拓展经理'],
        'ta-sg': ['பொது மேலாளர்', 'செயல்பாட்டு இயக்குனர்'],
      },
    },
    title: {
      en: 'Postgraduate Diploma in Business Management',
      'zh-sg': '工商管理研究生文凭课程',
      'ta-sg': 'வணிக மேலாண்மை முதுகலை டிப்ளமோ',
    },
    overview: {
      en: 'Equips aspiring corporate leaders with advanced strategic management, global supply chain, marketing analytics, and organizational leadership.',
      'zh-sg': '面向企业中高层管理者，系统提升战略制定、跨国供应链运作、市场营销决策与敏捷项目管理能力。',
      'ta-sg': 'கார்ப்பரேட் தலைமைத்துவம், சந்தைப்படுத்தல் மற்றும் செயல்பாட்டு மேலாண்மை.',
    },
    fees: {
      fullTime: {
        courseFee: 5400,
        registrationFee: 300,
        installmentsCount: 12,
        installmentAmount: 450,
        currency: 'SGD',
        notes: 'S$450 per month across 12 equal installments. S$300 non-refundable registration fee upon enrollment.',
        isVerified: true,
      },
      partTime: {
        courseFee: 4800,
        registrationFee: 300,
        installmentsCount: 12,
        installmentAmount: 400,
        currency: 'SGD',
        notes: 'S$400 per month across 12 equal installments. S$300 non-refundable registration fee upon enrollment.',
        isVerified: true,
      },
      modular: null,
      applicationFee: {
        amount: 54.5,
        currency: 'SGD',
        isNonRefundable: true,
        isVerified: true,
      },
      medicalInsuranceFee: {
        amount: 21.8,
        currency: 'SGD',
        period: 'per year',
        isVerified: true,
      },
      isVerified: true,
    },
    entryRequirements: STANDARD_POSTGRAD_ENTRY,
    modules: [
      { code: '01', title: 'Strategic Business Management', contactHours: 32, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '02', title: 'Organisational Behaviour', contactHours: 32, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '03', title: 'Operations and Supply Chain Management', contactHours: 32, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '04', title: 'Marketing Management', contactHours: 32, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '05', title: 'Human Resource Management', contactHours: 32, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
      { code: '06', title: 'Project Management', contactHours: 32, assessment: 'Written Exam 40% + Assignment 60%', isVerified: true },
    ],
    relatedCourseIds: ['81', '80', '82'],
  },
];

// ============================================================================
// MASTER COURSE COLLECTIONS
// ============================================================================

/**
 * Exactly the 21 official academic catalog entries identified in the Phase 1 audit:
 * - 13 Diplomas
 * - 5 Advanced Diplomas
 * - 1 Consolidated Short-Term Modular Entry (ID '38')
 * - 2 Postgraduate Diplomas
 */
export const COURSES: Course[] = [
  ...DIPLOMA_COURSES,
  ...ADVANCED_DIPLOMA_COURSES,
  CONSOLIDATED_SHORT_TERM_COURSE,
  ...POSTGRADUATE_COURSES,
];

/**
 * The 5 verified standalone modular units for micro-credential exploration.
 */
export const MODULAR_COURSES: Course[] = INDIVIDUAL_MODULAR_COURSES;

/**
 * Comprehensive list of all 26 discoverable course slugs and IDs.
 */
export const ALL_COURSES: Course[] = [
  ...COURSES,
  ...INDIVIDUAL_MODULAR_COURSES,
];

// ============================================================================
// QUERY AND NAVIGATION HELPERS
// ============================================================================

/**
 * Returns all 21 official core catalog programs.
 */
export function getAllCourses(): Course[] {
  return COURSES;
}

/**
 * Returns all 26 discoverable courses (including individual modular units).
 */
export function getAllDiscoverableCourses(): Course[] {
  return ALL_COURSES;
}

/**
 * Returns courses filtered by academic level.
 */
export function getCoursesByLevel(level: CourseLevel): Course[] {
  return COURSES.filter((c) => c.level === level);
}

/**
 * Returns courses filtered by category/faculty.
 */
export function getCoursesByCategory(category: CourseCategory): Course[] {
  return COURSES.filter((c) => c.category === category);
}

/**
 * Looks up any course or modular certificate by canonical slug.
 */
export function getCourseBySlug(slug: string): Course | undefined {
  return ALL_COURSES.find((c) => c.slug === slug);
}

/**
 * Looks up any course or modular certificate by ID.
 */
export function getCourseById(id: string): Course | undefined {
  return ALL_COURSES.find((c) => c.id === id);
}

/**
 * Returns all discoverable slugs for routing and static generation.
 */
export function getAllCourseSlugs(): string[] {
  return ALL_COURSES.map((c) => c.slug);
}

/**
 * Resolves full Course objects for the relatedCourseIds of a given course.
 */
export function getRelatedCourses(courseIdOrSlug: string, limit: number = 3): Course[] {
  const current = ALL_COURSES.find((c) => c.id === courseIdOrSlug || c.slug === courseIdOrSlug);
  if (!current || !current.relatedCourseIds || current.relatedCourseIds.length === 0) {
    return [];
  }

  const related: Course[] = [];
  for (const id of current.relatedCourseIds) {
    const found = ALL_COURSES.find((c) => c.id === id);
    if (found && !related.some((r) => r.id === found.id)) {
      related.push(found);
      if (related.length >= limit) break;
    }
  }

  return related;
}

/**
 * Helper to generate static route parameters for Next.js App Router generateStaticParams.
 */
export function getCourseStaticParams(): { locale: Locale; slug: string }[] {
  const locales: Locale[] = ['en', 'zh-sg', 'ta-sg'];
  const params: { locale: Locale; slug: string }[] = [];

  for (const locale of locales) {
    for (const course of ALL_COURSES) {
      params.push({
        locale,
        slug: course.slug,
      });
    }
  }

  return params;
}

/**
 * Category metadata helper for faculty badges and filter pills.
 */
export const CATEGORY_LABELS: Record<CourseCategory, { en: string; 'zh-sg': string; 'ta-sg': string }> = {
  engineering: {
    en: 'Engineering & Construction',
    'zh-sg': '工程与建造技术',
    'ta-sg': 'பொறியியல் & கட்டுமானம்',
  },
  it: {
    en: 'Information Technology',
    'zh-sg': '资讯科技与数码应用',
    'ta-sg': 'தகவல் தொழில்நுட்பம்',
  },
  facilities: {
    en: 'Facilities Management',
    'zh-sg': '设施设备与物业管理',
    'ta-sg': 'வசதிகள் மேலாண்மை',
  },
  business: {
    en: 'Business & Management',
    'zh-sg': '工商管理与供应链',
    'ta-sg': 'வணிகம் & மேலாண்மை',
  },
  healthcare: {
    en: 'Healthcare & Caregiving',
    'zh-sg': '医护照料与健康服务',
    'ta-sg': 'சுகாதாரம் & பராமரிப்பு',
  },
  hospitality: {
    en: 'Hospitality Management',
    'zh-sg': '酒店与款待业管理',
    'ta-sg': 'விருந்தோம்பல் மேலாண்மை',
  },
};
