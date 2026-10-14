import { Locale } from '@/lib/i18n/types';

export interface AssistantFAQItem {
  id: string;
  category: 'statutory' | 'fees' | 'admissions' | 'campus' | 'pedagogy' | 'forms' | 'contact' | 'verification';
  keywords: {
    en: string[];
    'zh-sg': string[];
    'ta-sg': string[];
  };
  question: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  answer: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  actionLink?: {
    href: string;
    label: {
      en: string;
      'zh-sg': string;
      'ta-sg': string;
    };
  };
}

export interface SuggestedQuestion {
  id: string;
  text: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  intentKey: string;
}

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: 'sq-courses',
    text: {
      en: 'What courses do you offer?',
      'zh-sg': '学院提供哪些正规认证课程？',
      'ta-sg': 'கல்லூரியில் என்ன படிப்புகள் உள்ளன?',
    },
    intentKey: 'courses_list',
  },
  {
    id: 'sq-fees',
    text: {
      en: 'How much are course fees and installments?',
      'zh-sg': '学费多少？是否支持按月分期？',
      'ta-sg': 'கட்டணம் மற்றும் மாதாந்திர தவணைகள் என்ன?',
    },
    intentKey: 'fees_overview',
  },
  {
    id: 'sq-entry',
    text: {
      en: 'What are the admission requirements?',
      'zh-sg': '入学资格与前置学历要求是什么？',
      'ta-sg': 'சேர்க்கைக்கான கல்வித் தகுதிகள் யாவை?',
    },
    intentKey: 'entry_requirements',
  },
  {
    id: 'sq-campus',
    text: {
      en: 'Where is the campus located (MRT directions)?',
      'zh-sg': '校区地址在哪里？如何搭乘地铁？',
      'ta-sg': 'வளாக முகவரி மற்றும் ரயில் வழிகள் எவை?',
    },
    intentKey: 'campus_directions',
  },
  {
    id: 'sq-ratio',
    text: {
      en: 'What is the teacher-to-student ratio?',
      'zh-sg': '课堂师生比例与班级规模标准？',
      'ta-sg': 'ஆசிரியர்-மாணவர் விகிதம் என்ன?',
    },
    intentKey: 'teacher_ratio',
  },
  {
    id: 'sq-forms',
    text: {
      en: 'Where can I download student forms?',
      'zh-sg': '在哪里可以下载官方申请与退款表格？',
      'ta-sg': 'விண்ணப்பப் படிவங்களை எங்கு பதிவிறக்கலாம்?',
    },
    intentKey: 'student_forms',
  },
];

export const ASSISTANT_FAQ_ITEMS: AssistantFAQItem[] = [
  // 1. Statutory Registration
  {
    id: 'faq-registration',
    category: 'statutory',
    keywords: {
      en: ['cpe', 'registration', 'pei', 'ssg', 'license', 'legitimate', 'government', 'registered', 'status'],
      'zh-sg': ['cpe', '注册', '资质', '教育部', '精深技能', '合法', '办学', '备案', '执照'],
      'ta-sg': ['பதிவு', 'அங்கீகாரம்', 'அரசு', 'சட்டம்', 'கல்வி வாரியம்', 'நிலை', 'சான்றிதழ்'],
    },
    question: {
      en: 'Is Edulearn International College officially registered in Singapore?',
      'zh-sg': '爱尔莱国际学院是否在新加坡官方正规注册？',
      'ta-sg': 'எடுலேர்ன் கல்லூரி சிங்கப்பூரில் அதிகாரப்பூர்வமாக பதிவு செய்யப்பட்டுள்ளதா?',
    },
    answer: {
      en: 'Yes. Edulearn International College Pte. Ltd. is officially registered under the Private Education Act with the Committee for Private Education (CPE), a statutory board under SkillsFuture Singapore (SSG). Our PEI Registration Number is 201708935D. The college also maintains bizSAFE Level 3 certification from the Workplace Safety and Health Council.',
      'zh-sg': '是的。爱尔莱国际学院（Edulearn International College Pte. Ltd.）依据新加坡《私立教育法案》在精深技能发展局（SSG）旗下私立教育理事会（CPE）正式注册，机构注册编号（PEI Reg No）为 201708935D。学院完全符合强化注册框架（ERF），并持有新加坡工作场所安全与卫生理事会颁发的 bizSAFE Level 3 安全认证。',
      'ta-sg': 'ஆம். எடுலேர்ன் சர்வதேசக் கல்லூரி (PEI பதிவு எண்: 201708935D) சிங்கப்பூர் ஸ்கில்ஸ்பியூச்சர் (SSG) அமைப்பின் கீழ் இயங்கும் தனியார் கல்விக் குழுமத்தில் (CPE) முறைப்படி பதிவு செய்யப்பட்டுள்ளது. மேலும் இது bizSAFE நிலை 3 சான்றிதழ் பெற்ற நிறுவனம்.',
    },
    actionLink: {
      href: '/governance',
      label: {
        en: 'View Governance & Certificates',
        'zh-sg': '查看治理与注册证书',
        'ta-sg': 'நிர்வாக சான்றிதழ்களைக் காண்க',
      },
    },
  },

  // 2. Student Contract & Protection
  {
    id: 'faq-student-contract',
    category: 'statutory',
    keywords: {
      en: ['contract', 'cooling off', 'refund', 'protection', 'standard student contract', 'schedule d', 'insurance'],
      'zh-sg': ['合同', '学生合同', '冷静期', '退款', '保障', '保险', '协议', '权益'],
      'ta-sg': ['ஒப்பந்தம்', 'பணத்தைத் திரும்பப்பெறுதல்', 'பாதுகாப்பு', 'விதிகள்'],
    },
    question: {
      en: 'What student protection measures exist in the Student Contract?',
      'zh-sg': '标准学生合同中有哪些保障学生权益的法定措施？',
      'ta-sg': 'மாணவர் ஒப்பந்தத்தில் உள்ள பாதுகாப்பு நடவடிக்கைகள் என்ன?',
    },
    answer: {
      en: 'Every matriculated student executes the CPE Standard PEI-Student Contract Version 4.1. Under Clause 2.4, students are entitled to a mandatory 7-working-day cooling-off period from contract signing with refund rights per CPE Schedule D. Course fees are payable in transparent monthly installments to protect learners against large upfront outlays.',
      'zh-sg': '所有学员均统一签署私立教育理事会（CPE）4.1版标准学生合同。依据合同第2.4条款，学员享有法定的7个工作日冷静期（Cooling-off Period），在此期间有权依照 Schedule D 条款申请退费保障。学费按月分期缴纳，保障学员资金安全。',
      'ta-sg': 'அனைத்து மாணவர்களும் 4.1 பதிப்பு நிலையான மாணவர் ஒப்பந்தத்தில் கையெழுத்திடுகின்றனர். பிரிவு 2.4 இன் கீழ் 7 வேலை நாட்கள் யோசனை காலமும் (cooling-off period), CPE அட்டவணை D இன் படி பணத்தைத் திரும்பப் பெறும் உரிமையும் உண்டு.',
    },
    actionLink: {
      href: '/forms',
      label: {
        en: 'Download Sample Contract v4.1',
        'zh-sg': '下载 4.1 版学生合同样本',
        'ta-sg': 'மாதிரி ஒப்பந்தத்தைப் பதிவிறக்கவும்',
      },
    },
  },

  // 3. Class Ratio & Cohort Size
  {
    id: 'faq-teacher-ratio',
    category: 'pedagogy',
    keywords: {
      en: ['ratio', 'class size', 'cohort', 'teacher student', 'capacity', 'seats', 'classroom size'],
      'zh-sg': ['师生比', '班级规模', '人数', '小班', '课室容量', '配比', '几个人'],
      'ta-sg': ['வகுப்பறை அளவு', 'மாணவர் விகிதம்', 'ஆசிரியர் விகிதம்', 'கொள்ளளவு'],
    },
    question: {
      en: 'What is the teacher-to-student ratio and classroom capacity?',
      'zh-sg': '学院的师生比例及课室核准容量是多少？',
      'ta-sg': 'ஆசிரியர்-மாணவர் விகிதம் மற்றும் வகுப்பறை கொள்ளளவு என்ன?',
    },
    answer: {
      en: 'EIC operates with an intimate 1:14 teacher-to-student ratio. Our campus at New World Centre comprises Classroom 1 (approved capacity of 15 students, 23 m²) and Classroom 2 (approved capacity of 14 students, 21 m²), ensuring individual academic attention and hands-on guidance.',
      'zh-sg': '学院严格执行 1:14 精品师生比。位于新世界中心校区包含 1 号课室（核准容量 15 人，23 平方米）及 2 号课室（核准容量 14 人，21 平方米），保障每位学员获得充足的导师指导与互动。',
      'ta-sg': 'எடுலேர்ன் 1:14 ஆசிரியர்-மாணவர் விகிதத்தைக் கடைப்பிடிக்கிறது. வகுப்பறை 1 (15 மாணவர்கள், 23 சதுர மீட்டர்) மற்றும் வகுப்பறை 2 (14 மாணவர்கள், 21 சதுர மீட்டர்) ஆகியவற்றைக் கொண்டுள்ளது.',
    },
    actionLink: {
      href: '/about/facilities',
      label: {
        en: 'View Campus Facilities',
        'zh-sg': '查看校区课室设施',
        'ta-sg': 'வளாக வசதிகளைக் காண்க',
      },
    },
  },

  // 4. Attendance Mandate
  {
    id: 'faq-attendance',
    category: 'pedagogy',
    keywords: {
      en: ['attendance', '80%', '90%', 'mandatory', 'absence', 'miss class', 'exam eligibility'],
      'zh-sg': ['出勤率', '考勤', '80%', '90%', '缺课', '请假', '考试资格'],
      'ta-sg': ['வருகை', '80%', 'தேர்வு தகுதி', 'வருகைப்பதிவு'],
    },
    question: {
      en: 'What is the minimum mandatory attendance requirement?',
      'zh-sg': '学员参加考试及毕业的最低法定出勤率要求是多少？',
      'ta-sg': 'தேர்வு எழுத குறைந்தபட்ச வருகை சதவீதம் என்ன?',
    },
    answer: {
      en: 'In compliance with CPE regulations, local/part-time students must maintain a minimum 80% monthly attendance in every module to be eligible for module examinations and parchment conferment. Full-time international students on Student Passes must maintain 90% attendance as mandated by the Immigration & Checkpoints Authority (ICA).',
      'zh-sg': '依据私立教育理事会（CPE）法规，本地在职学员各模块每月出勤率须达到至少 80%，方符合参加期末评估及颁发毕业证书资格；持有移民局学生准证（Student Pass）的国际全日制学员月度出勤率须达到至少 90%。',
      'ta-sg': 'CPE விதிகளின்படி அனைத்து மாணவர்களும் ஒவ்வொரு பாடப்பிரிவிலும் குறைந்தபட்சம் 80% மாதாந்திர வருகையைப் பெற்றிருக்க வேண்டும். மாணவர் பாஸ் உள்ளவர்கள் 90% வருகை வைத்திருக்க வேண்டும்.',
    },
  },

  // 5. Fee Schedule & Payment
  {
    id: 'faq-fees-schedule',
    category: 'fees',
    keywords: {
      en: ['fees', 'tuition', 'cost', 'how much', 'installment', 'payment', 'monthly', 'application fee', 'registration fee', 'gst'],
      'zh-sg': ['学费', '费用', '多少钱', '分期', '按月', '申请费', '注册费', '消费税', '付款'],
      'ta-sg': ['கட்டணம்', 'விலை', 'மாத தவணை', 'பதிவு கட்டணம்', 'பணம்'],
    },
    question: {
      en: 'How are course fees structured and can they be paid in installments?',
      'zh-sg': '学费结构如何设置？是否支持按月分期付款？',
      'ta-sg': 'கட்டணங்கள் எவ்வாறு நிர்ணயிக்கப்பட்டுள்ளன? தவணையில் செலுத்தலாமா?',
    },
    answer: {
      en: 'Course fees are scheduled in equal monthly installments without multi-year lock-in. 6-month Diplomas are S$2,400 (Part-Time: S$400/mo) or S$2,700 (Full-Time: S$500/mo), with a S$300 registration fee. 12-month Postgraduate Diplomas are S$4,800 to S$5,400 (S$400–S$450/mo). Standalone Modular certificates are S$250 to S$450. A non-refundable course application fee of S$54.50 (incl. GST) applies at enrollment.',
      'zh-sg': '所有学费均按月分期缴纳，免除长期绑定。6个月大专文凭学费为 S$ 2,400（兼读制：每月 S$ 400）或 S$ 2,700（全日制：每月 S$ 500），注册费 S$ 300；12个月研究生文凭为 S$ 4,800 至 S$ 5,400（每月 S$ 400 至 S$ 450）；短期模块证书为 S$ 250 至 S$ 450。报名时需缴纳法定不可退还课程申请费 S$ 54.50（含GST）。',
      'ta-sg': 'கட்டணங்கள் எளிய மாதாந்திர தவணைகளாக வசூலிக்கப்படுகின்றன. 6 மாத டிப்ளமோ S$2,400 (பகுதி நேரம்: மாதம் S$400) அல்லது S$2,700 (முழு நேரம்: மாதம் S$500). பதிவு கட்டணம் S$300. விண்ணப்பக் கட்டணம் S$54.50 (GST உட்பட).',
    },
    actionLink: {
      href: '/courses',
      label: {
        en: 'Explore Course Fees',
        'zh-sg': '浏览课程学费一览',
        'ta-sg': 'கட்டண விபரங்களைக் காண்க',
      },
    },
  },

  // 6. Entry Requirements & Mature Applicants
  {
    id: 'faq-entry-requirements',
    category: 'admissions',
    keywords: {
      en: ['entry', 'requirement', 'eligibility', 'prerequisite', 'mature', 'o level', 'age', 'qualification', 'apply'],
      'zh-sg': ['入学', '要求', '资格', '条件', 'o水准', '成年考生', '年龄', '前置学历', '报名条件'],
      'ta-sg': ['நுழைவு தகுதி', 'வயது', 'முதிர்ந்த விண்ணப்பதாரர்', 'கல்வித் தகுதி'],
    },
    question: {
      en: 'What are the admission requirements for Diploma and mature applicants?',
      'zh-sg': '大专课程的入学要求是什么？在职成年人如何申请？',
      'ta-sg': 'டிப்ளமோ சேர்க்கை தகுதிகள் யாவை? பணிபுரிபவர்கள் எவ்வாறு சேரலாம்?',
    },
    answer: {
      en: 'For Diplomas, standard entry requires minimum 3 GCE ‘O’ Level passes (Grade C6 or above, incl. English) or Year 10 international equivalent. For adult learners without formal papers, our Mature Candidate Scheme accepts applicants aged 21+ with at least 2 years documented industry experience (or age 25+ with 3 years for engineering), evaluated through an Academic Board assessment.',
      'zh-sg': '大专课程常规入学要求为：至少 3 门 GCE ‘O’ 水准及格（包含英语达 C6 或以上），或国际十年级等同资历。对于在职人士，年满 21 周岁且具备至少 2 年相关工作经验（工程类为 25 岁及 3 年经验）者，可通过“成熟考生条款（Mature Candidate Scheme）”由学术委员会进行个案评估审核。',
      'ta-sg': 'டிப்ளமோ படிப்புகளுக்கு 3 ‘O’ நிலை தேர்ச்சிகள் (ஆங்கிலம் C6 உட்பட) அல்லது 10-ஆம் வகுப்பு படிப்பு தேவை. 21 வயது மற்றும் 2 வருட பணி அனுபவம் கொண்ட முதிர்ந்த விண்ணப்பதாரர்கள் கல்வி வாரிய நேர்காணல் மூலம் சேரலாம்.',
    },
    actionLink: {
      href: '/apply',
      label: {
        en: 'Admissions Enquiry Form',
        'zh-sg': '在线填写入学意向表',
        'ta-sg': 'சேர்க்கை விசாரணை படிவம்',
      },
    },
  },

  // 7. Campus Location & Transit Directions
  {
    id: 'faq-campus-location',
    category: 'campus',
    keywords: {
      en: ['location', 'address', 'where', 'mrt', 'bus', 'directions', 'jalan berseh', 'new world centre', 'little india'],
      'zh-sg': ['校区', '地址', '在哪里', '地铁', '巴士', '公交', '路线', '惹兰勿刹', '新世界中心', '小印度'],
      'ta-sg': ['முகவரி', 'இடம்', 'எங்கு', 'ரயில்', 'பேருந்து', 'லிட்டில் இந்தியா', 'செல்லும் வழி'],
    },
    question: {
      en: 'Where is Edulearn campus located and how do I get there by public transit?',
      'zh-sg': '爱尔莱校区具体地址在哪里？公共交通如何到达？',
      'ta-sg': 'கல்லூரி வளாகம் எங்குள்ளது? பொதுப் போக்குவரத்தில் எவ்வாறு செல்வது?',
    },
    answer: {
      en: 'Our campus is located at 1 Jalan Berseh, #02-28 New World Centre, Singapore 209037. Transit: Jalan Besar MRT (Downtown Line DT22, Exit B) is a 2-minute walk (180m); Farrer Park MRT (North East Line NE8, Exit H) is 6 minutes away; Lavender MRT (East West Line EW11) is 8 minutes away. Bus services stopping directly outside include 23, 64, 65, 66, 67, 130, 139, 147, and 857.',
      'zh-sg': '校区地址位于新加坡 惹兰勿刹 1号 新世界中心 #02-28（邮编 209037）。交通极具便利：惹兰勿刹地铁站（滨海市区线 DT22，B出口）步行仅需 2 分钟（180米）；花拉公园站（东北线 NE8，H出口）步行 6 分钟；劳明达站（东西线 EW11）步行 8 分钟。楼下经停巴士线路包含 23、64、65、66、67、130、139、147 及 857 路。',
      'ta-sg': 'எங்கள் வளாகம் 1 ஜாலான் பெர்சே, #02-28 நியூ வேர்ல்ட் சென்டர், சிங்கப்பூர் 209037 இல் அமைந்துள்ளது. ஜாலான் பெர்சே எம்ஆர்டி (DT22) 2 நிமிட நடைபயணம்; ஃபேரர் பார்க் எம்ஆர்டி (NE8) 6 நிமிடம். பேருந்து எண்கள்: 23, 64, 65, 66, 67, 130, 139, 147, 857.',
    },
    actionLink: {
      href: '/about/facilities#transit',
      label: {
        en: 'View Transit Map & Directions',
        'zh-sg': '查看校区交通导览地图',
        'ta-sg': 'போக்குவரத்து வரைபடத்தைக் காண்க',
      },
    },
  },

  // 8. Official Student Forms
  {
    id: 'faq-forms-downloads',
    category: 'forms',
    keywords: {
      en: ['forms', 'download', 'form 12', 'advisory note', 'application form', 'refund form', 'transfer', 'withdrawal', 'pdf'],
      'zh-sg': ['表格', '下载', 'form 12', '学生须知', '申请表', '退学', '转学', '退款表'],
      'ta-sg': ['படிவங்கள்', 'பதிவிறக்கம்', 'விண்ணப்பம்', 'படிவம் 12', 'விலகல்'],
    },
    question: {
      en: 'Where can I access official student forms and advisory notes?',
      'zh-sg': '在哪里可以获取官方学生表格与咨询须知（Form 12）？',
      'ta-sg': 'அதிகாரப்பூர்வ மாணவர் படிவங்களை எங்கு பதிவிறக்கம் செய்யலாம்?',
    },
    answer: {
      en: 'All verified administrative documents, including the mandatory Student Advisory Note (Form 12), Enrolment Application Form, Sample Student Contract v4.1, Refund Request Form, and Deferment/Withdrawal Notices are available in our official Document Library.',
      'zh-sg': '所有经合规审查的行政表格均可在学院官方文件中心下载，包括强制性学生须知说明书（Form 12）、入学申请表、标准学生合同 v4.1 样本、退款申请表及延期/退学通知书。',
      'ta-sg': 'கட்டாய மாணவர் ஆலோசனை குறிப்பு (படிவம் 12), விண்ணப்பப் படிவம், மாதிரி ஒப்பந்தம் v4.1, மற்றும் கட்டணத் திரும்பப் பெறுதல் படிவம் ஆகியவை எங்கள் ஆவண நூலகத்தில் கிடைக்கின்றன.',
    },
    actionLink: {
      href: '/forms',
      label: {
        en: 'Go to Official Forms Library',
        'zh-sg': '前往官方表格下载中心',
        'ta-sg': 'படிவங்கள் நூலகத்திற்குச் செல்க',
      },
    },
  },

  // 9. Certificate Verification Process
  {
    id: 'faq-certificate-verification',
    category: 'verification',
    keywords: {
      en: ['verify', 'certificate', 'credential', 'registry', 'check diploma', 'authentic', 'valid', 'verification'],
      'zh-sg': ['核验', '证书验证', '文凭查询', '真伪', '官方验证', '学籍认证'],
      'ta-sg': ['சான்றிதழ் சரிபார்ப்பு', 'உண்மைத்தன்மை', 'டிப்ளமோ சரிபார்ப்பு'],
    },
    question: {
      en: 'How do employers or alumni verify an EIC diploma or certificate?',
      'zh-sg': '用人单位或毕业生如何核实爱尔莱文凭与证书的真实性？',
      'ta-sg': 'வேலை வழங்குநர்கள் அல்லது பழைய மாணவர்கள் சான்றிதழை எவ்வாறு சரிபார்க்கலாம்?',
    },
    answer: {
      en: 'To prevent fraud and maintain student privacy under Singapore PDPA, EIC verifies credentials via our Student Registry. Enquirers submit the graduate full name, student ID, and certificate serial number to registry@edulearn.edu.sg. Official verifications are processed within 2 to 3 working days with formal institutional confirmation.',
      'zh-sg': '为防范假冒证书并依据新加坡《个人数据保护法》（PDPA）严格保护学生隐私，学院由教务处总注册办公室提供官方核验。查询方请将毕业生法定全名、学号及证书序列号发送至 registry@edulearn.edu.sg，通常在 2 至 3 个工作日内出具正式核查结果。',
      'ta-sg': 'சிங்கப்பூர் PDPA சட்டத்தின் கீழ் மாணவர் தனியுரிமையைப் பாதுகாக்க, சான்றிதழ் சரிபார்ப்பு எங்கள் அலுவலகத்தின் மூலம் செய்யப்படுகிறது. மாணவர் எண் மற்றும் சான்றிதழ் எண்ணுடன் registry@edulearn.edu.sg க்கு மின்னஞ்சல் அனுப்பவும்.',
    },
    actionLink: {
      href: '/contact',
      label: {
        en: 'Contact Campus Registry',
        'zh-sg': '联系教务总注册处',
        'ta-sg': 'பதிவாளர் அலுவலகத் தொடர்பு',
      },
    },
  },

  // 10. Contact & Hotline
  {
    id: 'faq-contact-admissions',
    category: 'contact',
    keywords: {
      en: ['contact', 'phone', 'call', 'hotline', 'whatsapp', 'email', 'office hours', 'counselor', 'advisor'],
      'zh-sg': ['联系', '电话', '热线', '咨询', 'whatsapp', '邮箱', '办公时间', '顾问'],
      'ta-sg': ['தொடர்பு', 'தொலைபேசி', 'வாட்ஸ்அப்', 'மின்னஞ்சல்', 'நேரம்', 'ஆலோசகர்'],
    },
    question: {
      en: 'How can I speak directly with an admissions advisor?',
      'zh-sg': '如何直接联系招生学术顾问沟通？',
      'ta-sg': 'சேர்க்கை ஆலோசகரிடம் நேரடியாக எவ்வாறு பேசுவது?',
    },
    answer: {
      en: 'You can chat instantly on WhatsApp at +65 9004 9657, call our campus lines at +65 6258 7189 / +65 9004 9657, or email admissions@edulearn.edu.sg. Our office is open Monday through Saturday from 10:00 AM to 7:00 PM (closed on Sundays and Public Holidays).',
      'zh-sg': '您可通过 WhatsApp（+65 9004 9657）进行即时沟通，或拨打校区专线 +65 6258 7189 / +65 9004 9657，或发送电邮至 admissions@edulearn.edu.sg。总务处工作时间为周一至周六上午 10:00 至晚上 7:00（周日及新加坡法定公休日休息）。',
      'ta-sg': 'நீங்கள் வாட்ஸ்அப் வழியாக +65 9004 9657 என்ற எண்ணில் பேசலாம் அல்லது +65 6258 7189 எண்ணுக்கு அழைக்கலாம். வேலை நேரம்: திங்கள் முதல் சனி வரை காலை 10:00 மணி முதல் மாலை 7:00 மணி வரை.',
    },
    actionLink: {
      href: '/contact',
      label: {
        en: 'View Campus Contact Page',
        'zh-sg': '查看联系与到访页面',
        'ta-sg': 'தொடர்பு பக்கத்தைக் காண்க',
      },
    },
  },
];
