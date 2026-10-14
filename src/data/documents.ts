/**
 * Edulearn International College (EIC) - Singapore
 * Official Institutional Documents, Forms, Regulatory Specifications & Compliance Checklist
 * 
 * Source of Truth: CPE Statutory Filings, SSG Registration, and Official College Audits.
 * PEI Reg No: 201708935D | bizSAFE Level 3
 */

import { Locale } from '@/lib/i18n/types';

export type DocumentCategory = 
  | 'statutory'
  | 'contracts'
  | 'admissions'
  | 'academic';

export interface OfficialDocument {
  id: string;
  code: string;
  title: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  category: DocumentCategory;
  documentType: 'PDF Document' | 'Official Specification' | 'Statutory Framework';
  version: string;
  issueDate?: string;
  fileSize?: string;
  downloadUrl?: string;
  authority: string;
  description: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  keyProvisions: {
    en: string[];
    'zh-sg': string[];
    'ta-sg': string[];
  };
}

export interface ComplianceChecklistItem {
  id: string;
  title: string;
  authority: string;
  reference: string;
  currentStatus: 'Compliant' | 'Annual Review Active' | 'Statutory Standard';
  lastReviewed: string;
  notes: string;
}

export const OFFICIAL_DOCUMENTS: OfficialDocument[] = [
  {
    id: 'doc-form-12',
    code: 'CPE-FORM-12',
    title: {
      en: 'Student Advisory Note (CPE Form 12)',
      'zh-sg': '学生须知通告 (CPE Form 12 表格)',
      'ta-sg': 'மாணவர் ஆலோசனைக் குறிப்பு (CPE படிவம் 12)',
    },
    category: 'statutory',
    documentType: 'PDF Document',
    version: 'Statutory Form 12',
    issueDate: 'Statutory Requirement',
    fileSize: '375 KB (PDF)',
    downloadUrl: '/documents/EIC-Student-Advisory-Note-Form-12.pdf',
    authority: 'Committee for Private Education (CPE / SSG)',
    description: {
      en: 'Mandatory pre-course disclosure document required by Singapore statute. Highlights key institutional obligations, fee structures, and student rights prior to signing the student contract.',
      'zh-sg': '新加坡法律规定的强制性课程前须知文件。在学生签署入学合同前，重点声明学院法定责任、学费架构及学生各项合法权益。',
      'ta-sg': 'சிங்கப்பூர் சட்டத்தின்படி மாணவர் ஒப்பந்தத்தில் கையெழுத்திடுவதற்கு முன் வழங்கப்பட வேண்டிய கட்டாய ஆலோசனைக் குறிப்பு.',
    },
    keyProvisions: {
      en: [
        'Mandatory reading prior to signing any enrolment agreement',
        'Transparent disclosure of course fees and refund timelines',
        'Official recognition of student protections under Private Education Act',
      ],
      'zh-sg': [
        '在签署任何入学协议或支付款项前必须仔细审阅并签署确认',
        '明确披露全部课程费用、付款分期安排及退款保障条款',
        '受新加坡《私立教育法》法定保护的各项学员权益声明',
      ],
      'ta-sg': [
        'ஒப்பந்தத்தில் கையெழுத்திடுவதற்கு முன் கட்டாயம் படிக்க வேண்டிய வழிகாட்டல்',
        'கட்டண அட்டவணை மற்றும் பணத்தைத் திரும்பப் பெறும் விதிகள் குறித்த வெளிப்படையான விவரங்கள்',
        'சிங்கப்பூர் தனியார் கல்விச் சட்டத்தின் கீழ் மாணவர் உரிமைகளின் அதிகாரப்பூர்வ அறிவிப்பு',
      ],
    },
  },
  {
    id: 'doc-student-contract',
    code: 'CPE-CONTRACT-V4.1',
    title: {
      en: 'Standard PEI-Student Contract (Version 4.1)',
      'zh-sg': '标准私立教育机构-学生合同 (4.1版本)',
      'ta-sg': 'நிலையான மாணவர் ஒப்பந்தம் (பதிப்பு 4.1)',
    },
    category: 'contracts',
    documentType: 'PDF Document',
    version: 'Version 4.1',
    issueDate: 'Standard Form',
    fileSize: '824 KB (PDF)',
    downloadUrl: '/documents/CPE-Standard-Student-Contract-ver-4-1.pdf',
    authority: 'Committee for Private Education (CPE / SSG)',
    description: {
      en: 'The legally binding statutory contract executed between each enrolled student and Edulearn International College. Fully incorporates fee installment schedules, refund matrices, and the mandatory 7-day cooling-off period.',
      'zh-sg': '每位在册学生与爱尔莱国际学院依法签署的具有法律约束力的标准合同。完整载明学费分期明细、退费政策及7天法定冷静期。',
      'ta-sg': 'மாணவருக்கும் எடுலேர்ன் சர்வதேசக் கல்லூரிக்கும் இடையே கையெழுத்திடப்படும் சட்டப்பூர்வ ஒப்பந்தம். 7-நாள் மறுபரிசீலனைக் காலப் பாதுகாப்பு இதில் அடங்கும்.',
    },
    keyProvisions: {
      en: [
        'Clause 2.4: Mandatory 7-working-day cooling-off period from contract signing',
        'Schedule B & C: Transparent course fee breakdown and monthly installment dates',
        'Schedule D: Detailed Course Refund Policy Matrix',
      ],
      'zh-sg': [
        '第2.4条：自签署合同之日起享有法定7个工作日无条件冷静期保障',
        '附表B及附表C：公开透明的课程学费明细及每月分期缴费日期',
        '附表D：规范化课程退费政策矩阵及法定申诉仲裁机制',
      ],
      'ta-sg': [
        'பிரிவு 2.4: ஒப்பந்தம் கையெழுத்திட்ட நாளிலிருந்து 7 வேலை நாட்கள் மறுபரிசீலனைக் காலம்',
        'அட்டவணை B & C: கட்டண விவரங்கள் மற்றும் தவணை செலுத்தும் தேதிகள்',
        'அட்டவணை D: கட்டணத்தைத் திரும்பப் பெறுவதற்கான விதிமுறைகள்',
      ],
    },
  },
  {
    id: 'doc-sample-cert',
    code: 'EIC-SAMPLE-PARCHMENT',
    title: {
      en: 'Official Parchment & Transcript Sample',
      'zh-sg': '官方毕业文凭与成绩单样本',
      'ta-sg': 'அதிகாரப்பூர்வ பட்டயச் சான்றிதழ் மாதிரி',
    },
    category: 'academic',
    documentType: 'PDF Document',
    version: 'Parchment Spec 2024',
    issueDate: 'Academic Board Approved',
    fileSize: '453 KB (PDF)',
    downloadUrl: '/documents/EIC-Sample-Diploma-Certificate.pdf',
    authority: 'EIC Academic Board / CPE Reg: 201708935D',
    description: {
      en: 'Official layout sample of the Diploma Certificate and Academic Transcript awarded upon successful program completion, demonstrating tamper-evident markings and verifiable credentials.',
      'zh-sg': '学生顺利完成课程要求并经考试委员会评定后颁发的大专文凭样本，展示官方防伪标识与真伪核验证明要素。',
      'ta-sg': 'கல்லூரியில் படிப்பை வெற்றிகரமாக முடிக்கும் மாணவர்களுக்கு வழங்கப்படும் டிப்ளமோ சான்றிதழின் அதிகாரப்பூர்வ மாதிரி.',
    },
    keyProvisions: {
      en: [
        'Official institutional seal and authorized academic leadership signatures',
        'Unique Certificate Serial Number for employer and embassy verification',
        'CPE Registration Number 201708935D prominently identified',
      ],
      'zh-sg': [
        '印有学院官方钢印及学术总监/经理亲笔法定签发标识',
        '包含唯一证书序列号，供用人单位、使领馆及学术机构查验',
        '证书正文明确标注CPE注册号：201708935D',
      ],
      'ta-sg': [
        'அதிகாரப்பூர்வ முத்திரை மற்றும் கல்வி இயக்குனரின் கையொப்பம்',
        'சரிபார்ப்புக்கான தனித்துவமான சான்றிதழ் வரிசை எண்',
        'CPE பதிவு எண் 201708935D சான்றிதழில் தெளிவாகக் குறிப்பிடப்பட்டுள்ளது',
      ],
    },
  },
  {
    id: 'doc-erf-cert',
    code: 'CPE-ERF-201708935D',
    title: {
      en: 'CPE Enhanced Registration Framework (ERF) Credentials',
      'zh-sg': 'CPE 强化注册架构 (ERF) 资质认证文件',
      'ta-sg': 'CPE மேம்படுத்தப்பட்ட பதிவுச் சான்றிதழ் (ERF)',
    },
    category: 'statutory',
    documentType: 'Official Specification',
    version: 'PEI Reg No: 201708935D',
    issueDate: 'Active CPE Registration',
    authority: 'Committee for Private Education / SkillsFuture Singapore',
    description: {
      en: 'Statutory certificate confirming registration of Edulearn International College Pte. Ltd. under the Private Education Act of Singapore.',
      'zh-sg': '确认爱尔莱国际学院有限公司（EIC）依据新加坡《私立教育法》在私立教育理事会合法注册的法定文件。',
      'ta-sg': 'எடுலேர்ன் சர்வதேசக் கல்லூரி சிங்கப்பூர் தனியார் கல்விச் சட்டத்தின் கீழ் பதிவு செய்யப்பட்டுள்ளதை உறுதிப்படுத்தும் சான்றிதழ்.',
    },
    keyProvisions: {
      en: [
        'UEN: 201708935D registered with SkillsFuture Singapore (SSG)',
        'Approved campus premises: 1 Jalan Berseh, #02-28 New World Centre, Singapore 209037',
        'Authorised to conduct 21 Diploma, Advanced Diploma, Short & Postgraduate programs',
      ],
      'zh-sg': [
        '新加坡精深技能发展局 (SSG) 官方注册唯一机构编号 (UEN): 201708935D',
        '法定校址：1 Jalan Berseh, #02-28 New World Centre, Singapore 209037',
        '经批准开办21门大专、高级大专、短期模块进修及研究生文凭课程',
      ],
      'ta-sg': [
        'நிறுவனப் பதிவு எண் (UEN): 201708935D',
        'அங்கீகரிக்கப்பட்ட வளாகம்: 1 ஜாலான் பெர்சே, #02-28 நியூ வேர்ல்ட் சென்டர், சிங்கப்பூர் 209037',
        'அங்கீகரிக்கப்பட்ட 21 பாடநெறிகளை நடத்துவதற்கான முழு அதிகாரம்',
      ],
    },
  },
  {
    id: 'doc-bizsafe',
    code: 'WSHC-BIZSAFE-LVL3',
    title: {
      en: 'bizSAFE Level 3 Safety Management Certification',
      'zh-sg': 'bizSAFE 三级企业安全管理体系认证',
      'ta-sg': 'bizSAFE நிலை 3 பாதுகாப்பு மேலாண்மைச் சான்றிதழ்',
    },
    category: 'statutory',
    documentType: 'Official Specification',
    version: 'Level 3 Standards',
    issueDate: 'Audited Standards',
    authority: 'Workplace Safety and Health Council (WSHC), Singapore',
    description: {
      en: 'Official workplace risk management recognition awarded by the WSH Council, verifying that EIC campus operations, classroom fit-outs, and emergency systems meet rigorous national safety standards.',
      'zh-sg': '新加坡工作场所安全与卫生理事会颁发的官方企业风险管理认证，证明学院校区运作、课室设施及应急预案符合国家安全规范。',
      'ta-sg': 'கல்லூரி வளாகம் மற்றும் வகுப்பறைகள் சிங்கப்பூர் பாதுகாப்புத் தரங்களுக்கு உட்பட்டவை என்பதை உறுதிப்படுத்தும் bizSAFE சான்றிதழ்.',
    },
    keyProvisions: {
      en: [
        'Full Risk Assessment and Risk Management audits for Classrooms 1 & 2',
        'Emergency response, certified first-aid equipment, and clear evacuation pathways',
        'Aligned with Singapore Ministry of Manpower (MOM) workplace safety directives',
      ],
      'zh-sg': [
        '对课室1、课室2及行政办公区实施全面的风险评估与风险管理审计',
        '完备的应急预案、急救器材配置及符合民防规范的疏散指引',
        '严格遵循新加坡人力部 (MOM) 工作场所安全与卫生指导准则',
      ],
      'ta-sg': [
        'வகுப்பறைகள் 1 & 2க்கான முழுமையான இடர் மதிப்பீட்டு தணிக்கை',
        'அவசர கால மீட்புத் திட்டம் மற்றும் முதலுதவி வசதிகள்',
        'சிங்கப்பூர் மனிதவள அமைச்சகத்தின் (MOM) பாதுகாப்பு வழிகாட்டுதல்களுக்கு இணங்க அமைந்தது',
      ],
    },
  },
  {
    id: 'doc-app-form',
    code: 'EIC-ADM-APP-2025',
    title: {
      en: 'Official Course Application & Admissions Form Guide',
      'zh-sg': '官方课程申请与入学指南表格',
      'ta-sg': 'அதிகாரப்பூர்வ சேர்க்கை விண்ணப்பப் படிவ வழிகாட்டி',
    },
    category: 'admissions',
    documentType: 'Statutory Framework',
    version: '2025/2026 Intake',
    issueDate: 'Current Admissions Cycle',
    authority: 'EIC Admissions Office / Academic Board',
    description: {
      en: 'Official checklist and documentation guide for applicants matriculating into technical, business, IT, or healthcare programs at Edulearn International College.',
      'zh-sg': '申请入读爱尔莱国际学院工程、商务、信息技术及护理大专各课程的官方材料清单与申请指引。',
      'ta-sg': 'எடுலேர்ன் சர்வதேசக் கல்லூரியில் சேர விரும்பும் மாணவர்களுக்கான விண்ணப்ப வழிகாட்டி மற்றும் ஆவணப் பட்டியல்.',
    },
    keyProvisions: {
      en: [
        'Academic transcripts, proof of English proficiency, and identification checklist',
        'Mature candidate assessment protocol (minimum age 25 with 3 years work experience)',
        'Mandatory S$54.50 (inclusive of GST) application fee guidelines',
      ],
      'zh-sg': [
        '学历证明文件、英语能力证明及身份核验所需材料清单',
        '成熟学员评估指引（年满25周岁并具备3年以上相关行业工作经验）',
        '课程申请费 S$54.50（含消费税）缴付指南',
      ],
      'ta-sg': [
        'கல்விச் சான்றிதழ்கள், ஆங்கிலத் தகுதி மற்றும் அடையாள ஆவணங்களின் சரிபார்ப்புப் பட்டியல்',
        'முதிர்ந்த மாணவர்களுக்கான வழிகாட்டல் (குறைந்தபட்சம் 25 வயது & 3 வருட பணி அனுபவம்)',
        'விண்ணப்பக் கட்டணம் S$54.50 (ஜிஎஸ்டி உட்பட) செலுத்துவதற்கான வழிகாட்டுதல்',
      ],
    },
  },
];

/* =========================================================================
 * Institutional Trust & Compliance Checklist
 * ========================================================================= */
export const COMPLIANCE_CHECKLIST: ComplianceChecklistItem[] = [
  {
    id: 'chk-cpe-erf',
    title: 'CPE Enhanced Registration Framework (ERF)',
    authority: 'SkillsFuture Singapore (SSG) / CPE',
    reference: 'Registration No: 201708935D',
    currentStatus: 'Compliant',
    lastReviewed: 'Annual Statutory Audit Cycle',
    notes: 'Registration active under Private Education Act. Governed by CPE quality frameworks.',
  },
  {
    id: 'chk-student-contract',
    title: 'Standard PEI-Student Contract Compliance',
    authority: 'Committee for Private Education',
    reference: 'Version 4.1 Mandate',
    currentStatus: 'Statutory Standard',
    lastReviewed: 'Active Enrollment Cycles',
    notes: 'Executed with every student. Features mandatory 7-working-day cooling-off period.',
  },
  {
    id: 'chk-bizsafe',
    title: 'bizSAFE Level 3 Safety Management Audit',
    authority: 'Workplace Safety & Health Council (WSHC)',
    reference: 'Campus: New World Centre #02-28',
    currentStatus: 'Compliant',
    lastReviewed: 'Workplace Risk Audit Completed',
    notes: 'Classrooms 1 & 2 fully audited for emergency egress, electrical safety, and risk assessment.',
  },
  {
    id: 'chk-teacher-deployment',
    title: 'CPE Teacher Deployment Approvals',
    authority: 'EIC Academic Board & CPE',
    reference: '35 Registered Faculty Deployments',
    currentStatus: 'Annual Review Active',
    lastReviewed: 'Academic Board Annual Review',
    notes: 'Every deployed lecturer individually vetted and notified to CPE; 1:14 teacher ratio cap maintained.',
  },
  {
    id: 'chk-exam-moderation',
    title: 'Examination Moderation & Script Custody',
    authority: 'EIC Examination Board',
    reference: 'PE Act Regulations 15 & 16',
    currentStatus: 'Statutory Standard',
    lastReviewed: 'Pre-Semester & Post-Exam Cycles',
    notes: 'Dual-key physical/digital question paper security, mark moderation, and formal student appeal avenues.',
  },
  {
    id: 'chk-fee-protection',
    title: 'Fee Transparency & Installment Schedules',
    authority: 'Committee for Private Education',
    reference: 'CPE Fee Collection Directives',
    currentStatus: 'Compliant',
    lastReviewed: 'Audited Fee Matrices',
    notes: 'Fees collected strictly in approved monthly installments (e.g., $400 - $500/month) to protect student finances.',
  },
];
