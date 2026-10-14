/**
 * Edulearn International College (EIC) - Singapore
 * Student Resources, Welfare Frameworks & Verified External Statutory Portals Dataset
 * 
 * Source of Truth: CPE Statutory Filings, SSG Registration, and Official College Audits.
 * PEI Reg No: 201708935D | bizSAFE Level 3
 */

import { Locale } from '@/lib/i18n/types';

export interface StudentServicePolicy {
  id: string;
  title: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  category: 'attendance' | 'insurance' | 'guidance' | 'protection';
  subtitle: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  description: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  keyDetails: {
    en: string[];
    'zh-sg': string[];
    'ta-sg': string[];
  };
  badge: string;
}

export interface StatutoryExternalLink {
  id: string;
  title: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  category: 'regulator' | 'immigration' | 'safety' | 'dispute' | 'academic';
  tag: string;
  authority: string;
  url: string;
  description: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  verifiedStatus: 'Live & Verified';
}

/* =========================================================================
 * 1. Student Welfare & Academic Policies
 * ========================================================================= */
export const STUDENT_WELFARE_POLICIES: StudentServicePolicy[] = [
  {
    id: 'policy-attendance',
    title: {
      en: '80% Monthly Attendance Mandate',
      'zh-sg': '80% 月度出勤率强制标准',
      'ta-sg': '80% மாதாந்திர வருகை கட்டாயத் தேவை',
    },
    category: 'attendance',
    subtitle: {
      en: 'Statutory Course Assessment Prerequisite',
      'zh-sg': '法定课程考核前置条件',
      'ta-sg': 'தேர்வு எழுதுவதற்கான சட்டப்பூர்வ நிபந்தனை',
    },
    description: {
      en: 'In accordance with Committee for Private Education (CPE) standards, matriculated students must maintain at least 80% monthly attendance (and 90% for Student Pass holders) to be eligible for module examinations and diploma conferment.',
      'zh-sg': '根据新加坡私立教育理事会（CPE）规定，在读学生必须维持至少80%的月度出勤率（学生准证持有者须达90%），方具备参加学期结课考核及获颁毕业文凭的法定资格。',
      'ta-sg': 'CPE விதிகளின்படி, அனைத்து மாணவர்களும் குறைந்தபட்சம் 80% மாதாந்திர வருகையைப் பராமரிக்க வேண்டும். மாணவர் பாஸ் வைத்திருப்பவர்கள் 90% வருகையைக் கொண்டிருக்க வேண்டும்.',
    },
    keyDetails: {
      en: [
        'Mandatory 80% attendance threshold for local and adult learners',
        'Mandatory 90% attendance for full-time international Student Pass candidates',
        'Official medical certificates (MC) required for illness-related absences',
      ],
      'zh-sg': [
        '本地在读生及在职成人进修学员须达到最低80%出勤率底线',
        '全日制国际留学生/学生准证持有者须维持至少90%出勤率',
        '因病缺席必须提交新加坡注册医生出具的正式病假条 (MC)',
      ],
      'ta-sg': [
        'உள்ளூர் மற்றும் பணிபுரியும் மாணவர்களுக்கு 80% வருகை கட்டாயம்',
        'சர்வதேச மாணவர் பாஸ் வைத்திருப்பவர்களுக்கு 90% வருகை கட்டாயம்',
        'மருத்துவ விடுப்புகளுக்குப் பதிவுசெய்யப்பட்ட மருத்துவச் சான்றிதழ் அவசியம்',
      ],
    },
    badge: 'CPE Attendance Regulation',
  },
  {
    id: 'policy-insurance',
    title: {
      en: 'Student Medical Insurance Protection',
      'zh-sg': '学生团体医疗保险法定保障',
      'ta-sg': 'மாணவர் மருத்துவக் காப்பீட்டுப் பாதுகாப்பு',
    },
    category: 'insurance',
    subtitle: {
      en: 'Liberty Insurance Group Protection Framework',
      'zh-sg': '利宝保险团体住院与手术保障机制',
      'ta-sg': 'லிபர்ட்டி இன்சூரன்ஸ் மருத்துவக் காப்பீடு',
    },
    description: {
      en: 'EIC provides mandatory medical insurance coverage with Liberty Insurance Pte Ltd, providing hospitalization and surgical coverage up to S$20,000 per policy year for all eligible enrolled students.',
      'zh-sg': '爱尔莱国际学院为符合条件的注册学生统一投保利宝保险（Liberty Insurance），提供保单年度内最高达 S$20,000 的住院及日间手术费用保障。',
      'ta-sg': 'கல்லூரி அனைத்து மாணவர்களுக்கும் லிபர்ட்டி இன்சூரன்ஸ் மூலம் ஆண்டுக்கு S$20,000 வரை மருத்துவமனை மற்றும் அறுவை சிகிச்சைக் காப்பீட்டை வழங்குகிறது.',
    },
    keyDetails: {
      en: [
        'Hospitalisation and day surgery benefits up to S$20,000 annual limit',
        'Coverage within Singapore Government and Restructured Hospitals (B2/C Ward standards)',
        'Claims assistance coordinated through the Office of Student Affairs',
      ],
      'zh-sg': [
        '每名学生每个保单年度享有最高 S$20,000 住院与日间手术赔付额度',
        '保障范围覆盖新加坡公立及重组医院（B2/C级病房基准）',
        '出险由学院学生事务处全程协助理赔申请与材料递交',
      ],
      'ta-sg': [
        'ஆண்டுக்கு S$20,000 வரை மருத்துவமனை மற்றும் அறுவை சிகிச்சை பயன்கள்',
        'சிங்கப்பூர் அரசு மற்றும் சீரமைக்கப்பட்ட மருத்துவமனைகளில் பாதுகாப்பு',
        'மாணவர் விவகார அலுவலகம் மூலம் காப்பீட்டு கோரிக்கைகள் ஒருங்கிணைக்கப்படுகின்றன',
      ],
    },
    badge: 'Statutory Health Protection',
  },
  {
    id: 'policy-guidance',
    title: {
      en: 'Pastoral Care & Academic Guidance',
      'zh-sg': '全人关怀与个性化学术辅导',
      'ta-sg': 'மாணவர் வழிகாட்டல் & ஆதரவு அமைப்புகள்',
    },
    category: 'guidance',
    subtitle: {
      en: 'Holistic Student Mentorship Framework',
      'zh-sg': '全周期个性化学业与生活导师体系',
      'ta-sg': 'முழுமையான மாணவர் வழிகாட்டல் கட்டமைப்பு',
    },
    description: {
      en: 'Our dedicated student services team at New World Centre offers ongoing pastoral counseling, module progression advisory, career coaching, and cross-cultural orientation.',
      'zh-sg': '位于新世界中心的专业学生事务团队提供一对一学业咨询、出勤预警辅导、跨文化适应指引以及毕业升学与就业建议。',
      'ta-sg': 'நியூ வேர்ல்ட் சென்டரில் உள்ள எங்கள் குழு மாணவர்களுக்குத் தனிப்பட்ட கல்வி ஆலோசனை, தொழில் வழிகாட்டல் மற்றும் ஆதரவை வழங்குகிறது.',
    },
    keyDetails: {
      en: [
        'One-on-one academic progression consultations with course advisors',
        'Orientation briefings on Singapore culture, transport, and legal regulations',
        'Confidential pastoral care support for personal welfare challenges',
      ],
      'zh-sg': [
        '由资深课程顾问提供一对一学术进度与考试复习指导',
        '为新生举办新加坡法律法规、公共交通及生活适应迎新说明会',
        '为面临个人生活或心理困扰的学员提供严格保密的关怀疏导',
      ],
      'ta-sg': [
        'பாட ஆலோசகர்களுடன் தனிப்பட்ட கல்வி முன்னேற்ற ஆலோசனைகள்',
        'சிங்கப்பூர் கலாச்சாரம் மற்றும் சட்ட விதிமுறைகள் பற்றிய அறிமுகம்',
        'தனிப்பட்ட நலன் சார்ந்த ரகசிய ஆதரவு சேவைகள்',
      ],
    },
    badge: 'Comprehensive Student Care',
  },
  {
    id: 'policy-protection',
    title: {
      en: 'Standard Contract & Fee Protections',
      'zh-sg': '标准合同与学费保障机制',
      'ta-sg': 'நிலையான ஒப்பந்தம் & கட்டணப் பாதுகாப்பு',
    },
    category: 'protection',
    subtitle: {
      en: 'Version 4.1 Statutory Consumer Safeguards',
      'zh-sg': '4.1版法定消费者权益保护机制',
      'ta-sg': 'பதிப்பு 4.1 நுகர்வோர் பாதுகாப்பு',
    },
    description: {
      en: 'Every student enters into the Standard PEI-Student Contract Version 4.1 with EIC. Course fees are strictly collected in monthly installments to protect student finances and eliminate upfront risk.',
      'zh-sg': '学院与每位学员依法签署CPE标准学生合同（4.1版）。学费严格按月分期收取（如每月$400-$500），从制度上保障学员资金安全。',
      'ta-sg': 'அனைத்து மாணவர்களுக்கும் நிலையான மாணவர் ஒப்பந்தம் பதிப்பு 4.1 வழங்கப்படுகிறது. கட்டணங்கள் மாதாந்திர தவணைகளாக மட்டுமே வசூலிக்கப்படுகின்றன.',
    },
    keyDetails: {
      en: [
        'Mandatory 7-day cooling-off window ensuring maximum refund rights',
        'Zero upfront multi-year fee lock-in; flexible monthly installments',
        'Statutory dispute resolution via Singapore Mediation Centre (SMC) & SIArb',
      ],
      'zh-sg': [
        '签约即享7个工作日法定冷静期，享有法定最高比例退款权利',
        '坚决杜绝一次性收取多年学费，推行灵活透明的按月分期缴纳',
        '受新加坡调解中心（SMC）与新加坡仲裁员协会（SIArb）法定保护',
      ],
      'ta-sg': [
        'ஒப்பந்தம் செய்த 7 வேலை நாட்களுக்குள் முழுமையான மறுபரிசீலனை உரிமை',
        'நெகிழ்வான மாதாந்திர தவணைக் கட்டண முறை',
        'SMC மற்றும் SIArb மூலம் சட்டப்பூர்வ தீர்வு பாதுகாப்பு',
      ],
    },
    badge: 'Consumer Protection Assured',
  },
];

/* =========================================================================
 * 2. Verified External Statutory & Government Portals
 * ========================================================================= */
export const STATUTORY_EXTERNAL_LINKS: StatutoryExternalLink[] = [
  {
    id: 'link-tpgateway',
    title: {
      en: 'Training Partners Gateway (TPGateway)',
      'zh-sg': '新加坡培训伙伴门户网 (TPGateway)',
      'ta-sg': 'பயிற்சி கூட்டாளர்கள் போர்டல் (TPGateway)',
    },
    category: 'regulator',
    tag: 'SSG Singapore',
    authority: 'SkillsFuture Singapore (SSG)',
    url: 'https://www.tpgateway.gov.sg/',
    description: {
      en: 'National skills and training portal managed by SkillsFuture Singapore (SSG) for verifying registered training providers, accredited qualifications, and institutional standing.',
      'zh-sg': '由新加坡精深技能发展局（SSG）运营的国家级技能培训门户，用于查验证书真伪、培训机构注册资质及认证课程明细。',
      'ta-sg': 'சிங்கப்பூர் அங்கீகரிக்கப்பட்ட பயிற்சி நிறுவனங்கள் மற்றும் தகுதிகளைச் சரிபார்க்கும் தேசிய போர்டல்.',
    },
    verifiedStatus: 'Live & Verified',
  },
  {
    id: 'link-ssg',
    title: {
      en: 'SkillsFuture Singapore & CPE Regulatory Framework',
      'zh-sg': '新加坡精深局与私立教育理事会 (CPE)',
      'ta-sg': 'ஸ்கில்ஸ்பியூச்சர் சிங்கப்பூர் & CPE',
    },
    category: 'regulator',
    tag: 'Regulatory Authority',
    authority: 'Ministry of Education (MOE) / SSG',
    url: 'https://www.ssg.gov.sg/',
    description: {
      en: 'Official Singapore statutory authority regulating private education institutions under the Private Education Act, administering the Enhanced Registration Framework (ERF).',
      'zh-sg': '依据《私立教育法》监督管理新加坡所有私立教育机构的政府法定机构，主管强化注册架构（ERF）与教学质量评审。',
      'ta-sg': 'தனியார் கல்விச் சட்டத்தின் கீழ் தனியார் கல்வி நிறுவனங்களை மேற்பார்வையிடும் அதிகாரப்பூர்வ அரசு ஆணையம்.',
    },
    verifiedStatus: 'Live & Verified',
  },
  {
    id: 'link-ica',
    title: {
      en: 'Immigration & Checkpoints Authority (ICA)',
      'zh-sg': '新加坡移民与关卡局 (ICA)',
      'ta-sg': 'குடிவரவு & சோதனைச் சாவடிகள் ஆணையம் (ICA)',
    },
    category: 'immigration',
    tag: 'Student Pass & Visas',
    authority: 'Ministry of Home Affairs (MHA)',
    url: 'https://www.ica.gov.sg/',
    description: {
      en: 'Singapore government agency responsible for border control, visas, international Student Pass administration, and permanent residency regulations.',
      'zh-sg': '负责新加坡出入境关卡管制、国际留学生准证（Student Pass）审批、电子签证办理及居留权事务的官方机构。',
      'ta-sg': 'சிங்கப்பூர் சர்வதேச மாணவர் பாஸ் மற்றும் விசா நடைமுறைகளைக் கையாளும் அதிகாரப்பூர்வ அரசு ஆணையம்.',
    },
    verifiedStatus: 'Live & Verified',
  },
  {
    id: 'link-moe',
    title: {
      en: 'Ministry of Education Singapore (MOE)',
      'zh-sg': '新加坡教育部 (MOE)',
      'ta-sg': 'சிங்கப்பூர் கல்வி அமைச்சு (MOE)',
    },
    category: 'academic',
    tag: 'National Education',
    authority: 'Government of Singapore',
    url: 'https://www.moe.gov.sg/',
    description: {
      en: 'Official government ministry overseeing national education policy, curriculum benchmarks, academic standards, and lifelong learning initiatives.',
      'zh-sg': '统筹新加坡国家教育发展战略、课程标准制定、学术评审框架及终身学习倡议的中央政府部门。',
      'ta-sg': 'தேசியக் கல்விக் கொள்கைகள் மற்றும் தரநிலைகளை மேற்பார்வையிடும் சிங்கப்பூர் கல்வி அமைச்சகம்.',
    },
    verifiedStatus: 'Live & Verified',
  },
  {
    id: 'link-wshc',
    title: {
      en: 'Workplace Safety and Health Council (WSHC)',
      'zh-sg': '新加坡工作场所安全与卫生理事会 (WSHC)',
      'ta-sg': 'பணியிட பாதுகாப்பு & சுகாதார கவுன்சில் (WSHC)',
    },
    category: 'safety',
    tag: 'bizSAFE Standards',
    authority: 'Ministry of Manpower (MOM)',
    url: 'https://www.tal.sg/wshc',
    description: {
      en: 'National statutory agency administering the bizSAFE accreditation programme, ensuring risk management standards across Singapore education campuses.',
      'zh-sg': '推行国家级 bizSAFE 企业安全认证的专业理事会，监督评估教育场所与实训环境的风险管理及应急防护水准。',
      'ta-sg': 'வளாகப் பாதுகாப்பு மற்றும் bizSAFE தரநிலைகளை மேற்பார்வையிடும் தேசியப் பாதுகாப்பு கவுன்சில்.',
    },
    verifiedStatus: 'Live & Verified',
  },
  {
    id: 'link-smc',
    title: {
      en: 'Singapore Mediation Centre (SMC)',
      'zh-sg': '新加坡调解中心 (SMC)',
      'ta-sg': 'சிங்கப்பூர் சமரச மையம் (SMC)',
    },
    category: 'dispute',
    tag: 'Dispute Resolution Stage 2',
    authority: 'Singapore Academy of Law',
    url: 'https://www.mediation.com.sg/',
    description: {
      en: 'Designated independent dispute resolution authority under the CPE framework for amicable student-PEI mediation when internal resolution is unresolved.',
      'zh-sg': '私立教育理事会（CPE）指定的权威独立调解机构，在校内协商未果时为学员与学院提供公平中立的法律调解服务。',
      'ta-sg': 'மாணவர் தகராறுகளைச் சுமூகமாகத் தீர்ப்பதற்கான CPE அங்கீகாரம் பெற்ற சுயாதீன சமரச மையம்.',
    },
    verifiedStatus: 'Live & Verified',
  },
  {
    id: 'link-siarb',
    title: {
      en: 'Singapore Institute of Arbitrators (SIArb)',
      'zh-sg': '新加坡仲裁员协会 (SIArb)',
      'ta-sg': 'சிங்கப்பூர் நடுவர் மன்றம் (SIArb)',
    },
    category: 'dispute',
    tag: 'Dispute Resolution Stage 3',
    authority: 'National Arbitration Body',
    url: 'https://www.siarb.org.sg/',
    description: {
      en: 'Official arbitration body administering the statutory CPE-SIArb small claims and education dispute arbitration scheme for binding resolution.',
      'zh-sg': '负责执行法定 CPE-SIArb 私立教育仲裁机制的专业机构，依法对未解决争议作出具备法律约束力的最终仲裁裁决。',
      'ta-sg': 'தீர்க்கப்படாத கல்வித் தகராறுகளுக்கான சட்டப்பூர்வ நடுவர் தீர்ப்பாய அமைப்பு.',
    },
    verifiedStatus: 'Live & Verified',
  },
  {
    id: 'link-nlb',
    title: {
      en: 'National Library Board Singapore (NLB)',
      'zh-sg': '新加坡国家图书馆管理局 (NLB)',
      'ta-sg': 'சிங்கப்பூர் தேசிய நூலக வாரியம் (NLB)',
    },
    category: 'academic',
    tag: 'Learning Resources',
    authority: 'Ministry of Communications and Information',
    url: 'https://www.nlb.gov.sg/',
    description: {
      en: 'Public library network providing extensive physical, digital, and academic research databases across Singapore for independent study and research.',
      'zh-sg': '覆盖全岛的公共图书馆与数字学术资源网络，为学员提供广泛的电子书库、行业研究期刊与自习研究支持。',
      'ta-sg': 'மாணவர்களின் ஆய்வு மற்றும் வாசிப்புத் தேவைகளுக்கான சிங்கப்பூர் தேசிய நூலக நெட்வொர்க்.',
    },
    verifiedStatus: 'Live & Verified',
  },
];
