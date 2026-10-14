/**
 * Edulearn International College (EIC) - Singapore
 * Institutional Governance, Leadership, Academic Board & Faculty Deployment Dataset
 * 
 * Source of Truth: CPE Statutory Filings, SSG Registration, and Official College Audits.
 * PEI Reg No: 201708935D | bizSAFE Level 3
 */

export interface ManagerProfile {
  id: string;
  name: string;
  title: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  role: string;
  qualifications: string[];
  bio: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  cpeStatus: string;
}

export interface BoardMember {
  name: string;
  role: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  qualifications: string[];
}

export interface BoardCharter {
  id: 'academic' | 'examination';
  title: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  mandate: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  regulatoryReference: string;
  responsibilities: {
    en: string[];
    'zh-sg': string[];
    'ta-sg': string[];
  };
  members: BoardMember[];
}

export interface FacultyDeploymentCourse {
  courseTitle: string;
  modules: string[];
}

export interface FacultyMember {
  id: string;
  name: string;
  qualification: string;
  discipline: 'Engineering & Built Environment' | 'Information Technology' | 'Business & Management' | 'Hospitality Management' | 'Healthcare & Caregiving';
  deploymentType: 'FULL TIME' | 'PART TIME' | 'FULL TIME & PART TIME';
  coursesCount: number;
  courses: FacultyDeploymentCourse[];
}

export interface OrgNode {
  id: string;
  title: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  holder?: string;
  qualifications?: string;
  type: 'governing' | 'management' | 'board' | 'academic' | 'operations';
  description: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  children?: OrgNode[];
}

/* =========================================================================
 * 1. College Managers (Leadership)
 * ========================================================================= */
export const COLLEGE_MANAGERS: ManagerProfile[] = [
  {
    id: 'santhosh-kumar',
    name: 'Mr. Sakkarapani Santhosh Kumar',
    title: {
      en: 'College Manager & Academic Lead',
      'zh-sg': '学院经理兼学术总监',
      'ta-sg': 'கல்லூரி மேலாளர் & கல்வி இயக்குனர்',
    },
    role: 'College Manager / Academic Director / Board Chair',
    qualifications: [
      'Master of Human Resource Management (M.H.R.M.) — Pondicherry University, India',
      'Master of Science in Hotel Management (M.Sc.) — Annamalai University, India',
      'Bachelor of Science in Hotel & Catering Management (B.Sc.) — University of Madras, India',
      'Advanced Certificate in Training and Assessment (ACTA) — Workforce Development Agency (WDA), Singapore',
      'Advanced Certificate in Workplace Safety and Health (Level B) — Workforce Development Agency (WDA), Singapore',
      'Certificate IV in Training and Assessment — Australia',
      'WSQ Diploma in Adult and Continuing Education (Accelerated mode) — Singapore Polytechnic, Singapore',
      'Specialist Diploma in Applied Learning and Teaching — Republic Polytechnic, Singapore',
    ],
    bio: {
      en: 'Mr. Sakkarapani Santhosh Kumar serves as College Manager and Academic Lead of Edulearn International College. Bringing over two decades of distinguished pedagogical leadership, adult continuing education expertise, and WDA/WSQ Singapore curriculum mastery, he directs academic standards, faculty appointments, and regulatory governance under the Committee for Private Education (CPE).',
      'zh-sg': 'Sakkarapani Santhosh Kumar 先生担任爱尔莱国际学院经理兼学术主管。拥有20余年卓越的教学领导经验、新加坡成人继续教育资历（ACTA/WSQ DACE）及跨国教育培训体系专长，负责全面统筹私立教育委员会（CPE）框架下的学术标准、师资聘任与合规治理。',
      'ta-sg': 'திரு. சக்கரபாணி சந்தோஷ் குமார் அவர்கள் எடுலேர்ன் சர்வதேசக் கல்லூரியின் மேலாளராகவும் கல்வி இயக்குநராகவும் பணியாற்றுகிறார். இருபது ஆண்டுகளுக்கும் மேலான கல்வி தலைமைத்துவம், சிங்கப்பூர் தொடர் கல்வி நிபுணத்துவம் (ACTA/WSQ DACE) ஆகியவற்றுடன் தனியார் கல்விக் குழுமத்தின் (CPE) வழிகாட்டுதலின்படி கல்வித் தரங்களையும் ஒழுங்குமுறை நிர்வாகத்தையும் வழிநடத்துகிறார்.',
    },
    cpeStatus: 'CPE Registered Manager & Academic Board Chair',
  },
  {
    id: 'muthiah-vanmathi',
    name: 'Ms. Muthiah Vanmathi',
    title: {
      en: 'College Manager & Operational Director',
      'zh-sg': '学院经理兼运营总监',
      'ta-sg': 'கல்லூரி மேலாளர் & செயல்பாட்டு இயக்குனர்',
    },
    role: 'College Manager / Academic & Examination Board Member',
    qualifications: [
      'Bachelor of Engineering (Information Engineering and Media) with Honours — Nanyang Technological University (NTU), Singapore (Full Time)',
    ],
    bio: {
      en: 'Ms. Muthiah Vanmathi serves as College Manager and Director of Operations at EIC. A graduate of Nanyang Technological University (NTU) Singapore in Information Engineering and Media (Honours), she oversees digital learning infrastructure, institutional quality assurance, and administrative compliance with Singapore statutory frameworks.',
      'zh-sg': 'Muthiah Vanmathi 女士担任爱尔莱国际学院经理兼运营总监。毕业于新加坡南洋理工大学（NTU）信息工程与媒体荣誉学士学位，主理数字化教学基础设施、学院质量保障体系以及新加坡法定框架下的行政合规工作。',
      'ta-sg': 'செல்வி. முத்தையா வான்மதி அவர்கள் கல்லூரியின் மேலாளராகவும் செயல்பாட்டு இயக்குநராகவும் பணியாற்றுகிறார். சிங்கப்பூர் நன்யாங் தொழில்நுட்ப பல்கலைக்கழகத்தில் (NTU) தகவல் பொறியியல் மற்றும் ஊடகத்தில் இளநிலைப் பட்டம் (ஹானர்ஸ்) பெற்ற இவர், டிஜிட்டல் கல்வி உள்கட்டமைப்பு மற்றும் நிர்வாக மேற்பார்வையை வழிநடத்துகிறார்.',
    },
    cpeStatus: 'CPE Registered Manager & Board Member',
  },
];

/* =========================================================================
 * 2. Academic Board & Examination Board
 * ========================================================================= */
export const ACADEMIC_BOARD: BoardCharter = {
  id: 'academic',
  title: {
    en: 'Academic Board',
    'zh-sg': '学术委员会',
    'ta-sg': 'கல்வி வாரியம்',
  },
  regulatoryReference: 'Private Education Act (Cap. 247A) — CPE Statutory Mandate',
  mandate: {
    en: 'The Academic Board is established under CPE regulations to look into and safeguard the academic quality, rigour, and educational standards of the Private Education Institute (PEI).',
    'zh-sg': '学术委员会依据新加坡私立教育理事会（CPE）法规设立，专门负责审查并维护学院的学术质量、教学严谨度及专业教育水准。',
    'ta-sg': 'தனியார் கல்விக் குழுமத்தின் (CPE) விதிகளின்படி, கல்லூரியின் கல்வித் தரம், கற்பித்தல் தரம் மற்றும் பாடத்திட்டங்களின் நம்பகத்தன்மையை உறுதி செய்வதற்காகக் கல்வி வாரியம் நிறுவப்பட்டுள்ளது.',
  },
  responsibilities: {
    en: [
      'Developing institutional policies and procedures to ensure academic quality and pedagogical rigour.',
      'Ensuring that the content and duration of modules/subjects, as well as the entry and graduation requirements of courses, are appropriate and aligned with national frameworks.',
      'Approving the deployment of teachers based on the rigorous requirements and credentials stipulated by the CPE.',
      'Facilitating the PEI to implement and strictly comply with approved quality assurance policies and procedures.',
      'Reviewing, at least once a calendar year, all academic policies, curricula, and instructional methodologies.',
    ],
    'zh-sg': [
      '制定学院各项学术质量与教学严谨度规章与程序。',
      '确保各科目/模块的内容深度、课时设置以及入学与毕业条件符合新加坡行业与法定标准。',
      '根据私立教育理事会（CPE）规定的教师资质标准，严格审查并批准教师的授课部署。',
      '督促并协助学院全面落实和遵循已制定的学术质量保障政策与操作规程。',
      '每年至少进行一次全面的学术政策、课程大纲与教学实施评估审查。',
    ],
    'ta-sg': [
      'கல்வித் தரம் மற்றும் கற்பித்தல் நெறிமுறைகளை உறுதி செய்வதற்கான கொள்கைகள் மற்றும் நடைமுறைகளை உருவாக்குதல்.',
      'பாடப்பிரிவுகளின் உள்ளடக்கம், கால அளவு, நுழைவு மற்றும் பட்டமளிப்பு தகுதிகள் பொருத்தமானவை என்பதை உறுதி செய்தல்.',
      'CPE விதிகளின்படி ஆசிரியர்களின் தகுதியை ஆய்வு செய்து பணி ஒதுக்கீட்டிற்கு ஒப்புதல் அளித்தல்.',
      'கல்வித் தரக் கொள்கைகளை நிறுவனம் முழுமையாக நடைமுறைப்படுத்துவதை மேற்பார்வையிடுதல்.',
      'ஆண்டிற்கு ஒருமுறையாவது அனைத்துக் கல்விக் கொள்கைகளையும் பாடத்திட்டங்களையும் மறுஆய்வு செய்தல்.',
    ],
  },
  members: [
    {
      name: 'Mr. Sakkarapani Santhosh Kumar',
      role: {
        en: 'Chairman, Academic Board',
        'zh-sg': '学术委员会主席',
        'ta-sg': 'கல்வி வாரியத் தலைவர்',
      },
      qualifications: [
        'M.H.R.M. (Human Resource Management) — Pondicherry University',
        'M.Sc. (Hotel Management) — Annamalai University',
        'ACTA (WDA Singapore) & WSQ DACE (Singapore Polytechnic)',
      ],
    },
    {
      name: 'Ms. Muthiah Vanmathi',
      role: {
        en: 'Board Member',
        'zh-sg': '委员会委员',
        'ta-sg': 'வாரிய உறுப்பினர்',
      },
      qualifications: [
        'B.Eng. (Information Engineering and Media) with Honours — Nanyang Technological University (NTU), Singapore',
      ],
    },
    {
      name: 'Ms. Velusamy Selvi',
      role: {
        en: 'Board Member',
        'zh-sg': '委员会委员',
        'ta-sg': 'வாரிய உறுப்பினர்',
      },
      qualifications: [
        'Bachelor of Business Administration (BBA) — Bharathidasan University, India',
      ],
    },
  ],
};

export const EXAMINATION_BOARD: BoardCharter = {
  id: 'examination',
  title: {
    en: 'Examination Board',
    'zh-sg': '考试委员会',
    'ta-sg': 'தேர்வு வாரியம்',
  },
  regulatoryReference: 'Private Education Act (Cap. 247A) — CPE Assessment & Integrity Protocols',
  mandate: {
    en: 'The Examination Board is in charge of formulating, facilitating, and safeguarding all examination, assessment, and grading moderation procedures across all diplomas.',
    'zh-sg': '考试委员会负责制定、推行并严格监督所有大专文凭课程的考试、评估标准及成绩审核评定流程，恪守学术公平。',
    'ta-sg': 'அனைத்து டிப்ளமோ படிப்புகளுக்கான தேர்வு முறைகள், மதிப்பீட்டு வழிகாட்டுதல்கள் மற்றும் மதிப்பெண் மறுஆய்வு நடைமுறைகளை நிர்வகிப்பதற்குத் தேர்வு வாரியம் பொறுப்பாகும்.',
  },
  responsibilities: {
    en: [
      'Developing and facilitating examination and assessment procedures to maintain rigorous academic honesty.',
      'Ensuring the absolute physical and digital security of all examination question papers and student answer scripts.',
      'Ensuring the proper, invigilated, and standardized conduct of all written examinations and practical assessments.',
      'Defining and enforcing the proper discharge of duties and responsibilities of invigilators and markers.',
      'Conducting systematic moderation of examination and assessment marks prior to result release.',
      'Formally adjudicating and resolving appeals from students with regard to examination or assessment results.',
    ],
    'zh-sg': [
      '制定并推行严格的考试与评估流程，维护学术诚信。',
      '确保所有试卷原件、数字题库与学生答卷实物/电子档案的绝对保密与安全。',
      '规范化组织实施所有笔试、实验考核与平时作业评估，确保考场纪律。',
      '明确界定并监督监考人员（Invigilators）及阅卷考官（Markers）的工作职责与纪律。',
      '在成绩正式发布前实施系统性的成绩合议与审核评定（Mark Moderation）。',
      '依法独立受理并公正仲裁学生提出的学术成绩复核与考试申诉。',
    ],
    'ta-sg': [
      'தேர்வு மற்றும் மதிப்பீட்டு நடைமுறைகளை வெளிப்படைத்தன்மையுடன் உருவாக்குதல்.',
      'தேர்வு வினாத்தாள்கள் மற்றும் மாணவர்களின் விடைத்தாள்களின் பாதுகாப்பை முழுமையாக உறுதி செய்தல்.',
      'அனைத்து எழுத்து மற்றும் செய்முறைத் தேர்வுகளையும் முறையான கண்காணிப்புடன் நடத்துதல்.',
      'தேர்வுக் கண்காணிப்பாளர்கள் மற்றும் மதிப்பீட்டாளர்களின் கடமைகளை வரையறுத்து அமல்படுத்துதல்.',
      'முடிவுகள் வெளியிடுவதற்கு முன் மதிப்பெண்களை நடுநிலையாக மறுஆய்வு செய்தல்.',
      'தேர்வு முடிவுகள் தொடர்பான மாணவர்களின் மறுபரிசீலனை மற்றும் மேல்முறையீடுகளை முறைப்படி கையாளுதல்.',
    ],
  },
  members: [
    {
      name: 'Mr. Sakkarapani Santhosh Kumar',
      role: {
        en: 'Chairman, Examination Board',
        'zh-sg': '考试委员会主席',
        'ta-sg': 'தேர்வு வாரியத் தலைவர்',
      },
      qualifications: [
        'M.H.R.M. — Pondicherry University; M.Sc. — Annamalai University',
        'Specialist Diploma in Applied Learning and Teaching — Republic Polytechnic',
      ],
    },
    {
      name: 'Ms. Muthiah Vanmathi',
      role: {
        en: 'Board Member',
        'zh-sg': '委员会委员',
        'ta-sg': 'வாரிய உறுப்பினர்',
      },
      qualifications: [
        'B.Eng. (Honours) — Nanyang Technological University (NTU), Singapore',
      ],
    },
    {
      name: 'Ms. Velusamy Selvi',
      role: {
        en: 'Board Member',
        'zh-sg': '委员会委员',
        'ta-sg': 'வாரிய உறுப்பினர்',
      },
      qualifications: [
        'Bachelor of Business Administration (BBA) — Bharathidasan University, India',
      ],
    },
  ],
};

/* =========================================================================
 * 3. Responsive Semantic Organisation Structure Tree
 * ========================================================================= */
export const ORGANISATION_STRUCTURE: OrgNode = {
  id: 'org-governing',
  title: {
    en: 'Committee for Private Education (CPE / SSG)',
    'zh-sg': '新加坡私立教育理事会 (CPE / SSG)',
    'ta-sg': 'சிங்கப்பூர் தனியார் கல்விக் குழுமம் (CPE / SSG)',
  },
  type: 'governing',
  description: {
    en: 'Statutory regulatory body overseeing private education institutes under the Ministry of Education (MOE). Reg No: 201708935D.',
    'zh-sg': '新加坡教育部下属法定机构，负责依据私立教育法监督管理私立教育机构。注册编号：201708935D。',
    'ta-sg': 'சிங்கப்பூர் கல்வி அமைச்சகத்தின் கீழ் தனியார் கல்வி நிறுவனங்களை மேற்பார்வையிடும் சட்டரீதியான ஒழுங்குமுறை ஆணையம்.',
  },
  children: [
    {
      id: 'org-management',
      title: {
        en: 'Board of Directors & College Managers',
        'zh-sg': '董事会与学院管理层',
        'ta-sg': 'இயக்குனர் குழு & கல்லூரி மேலாளர்கள்',
      },
      holder: 'Mr. Sakkarapani Santhosh Kumar & Ms. Muthiah Vanmathi',
      type: 'management',
      description: {
        en: 'Institutional governance, strategic leadership, regulatory compliance, and fiscal oversight.',
        'zh-sg': '学院最高治理层，统筹战略规划、行业声誉、法律合规与财务安全。',
        'ta-sg': 'நிறுவன நிர்வாகம், உத்திசார் தலைமைத்துவம் மற்றும் சட்டப்பூர்வ இணக்கம்.',
      },
      children: [
        {
          id: 'org-academic-board',
          title: {
            en: 'Academic Board',
            'zh-sg': '学术委员会',
            'ta-sg': 'கல்வி வாரியம்',
          },
          holder: 'Chair: Mr. S. Santhosh Kumar',
          type: 'board',
          description: {
            en: 'Curriculum development, pedagogical quality, and 35 CPE teacher deployment approvals.',
            'zh-sg': '审查课程大纲、保障教学水准及批准35名CPE注册教师授课部署。',
            'ta-sg': 'பாடத்திட்ட உருவாக்கம் மற்றும் 35 விரிவுரையாளர்களின் பணி நியமன மேற்பார்வை.',
          },
          children: [
            {
              id: 'org-school-eng',
              title: {
                en: 'Department of Engineering & Built Environment',
                'zh-sg': '工程与建筑环境工程系',
                'ta-sg': 'பொறியியல் & கட்டுமானத் துறை',
              },
              type: 'academic',
              description: {
                en: 'Mechanical, Electrical, Civil, M&E, Chemical & Facilities Management diplomas.',
                'zh-sg': '统管机械工程、电气电子、土木工程、机电仪表及设施管理大专与高级大专课程。',
                'ta-sg': 'மெக்கானிக்கல், எலக்ட்ரிக்கல், சிவில் மற்றும் கட்டுமான டிப்ளமோ பாடப்பிரிவுகள்.',
              },
            },
            {
              id: 'org-school-it',
              title: {
                en: 'Department of Computing & Information Technology',
                'zh-sg': '计算与信息技术系',
                'ta-sg': 'தகவல் தொழில்நுட்பத் துறை',
              },
              type: 'academic',
              description: {
                en: 'Diploma in Information Technology, networking, databases, and modular software units.',
                'zh-sg': '开设信息技术大专、网络工程、数据库管理及应用软件专项证书课程。',
                'ta-sg': 'தகவல் தொழில்நுட்ப டிப்ளமோ, நெட்வொர்க்கிங் மற்றும் மென்பொருள் பயிற்சி.',
              },
            },
            {
              id: 'org-school-biz',
              title: {
                en: 'Department of Business, Logistics & HR',
                'zh-sg': '商学、物流与人力资源管理系',
                'ta-sg': 'வணிகவியல் & மனிதவள மேலாண்மைத் துறை',
              },
              type: 'academic',
              description: {
                en: 'Business Management, Human Resource Management, and Logistics & Supply Chain diplomas.',
                'zh-sg': '开设商务管理、人力资源管理及物流供应链管理（E-Learning）文凭课程。',
                'ta-sg': 'வணிக மேலாண்மை, மனிதவளம் மற்றும் விநியோகச் சங்கிலி டிப்ளமோ படிப்புகள்.',
              },
            },
            {
              id: 'org-school-health',
              title: {
                en: 'Department of Caregiving & Hospitality',
                'zh-sg': '医护保健与酒店管理系',
                'ta-sg': 'மருத்துவப் பராமரிப்பு & விருந்தோம்பல் துறை',
              },
              type: 'academic',
              description: {
                en: 'Diploma in Caregiving & Healthcare Assistant, Diploma in Hospitality Management.',
                'zh-sg': '开设计护与医疗助理大专课程，以及酒店与餐饮运营管理文凭课程。',
                'ta-sg': 'மருத்துவ பராமரிப்பு மற்றும் விருந்தோம்பல் மேலாண்மை டிப்ளமோ படிப்புகள்.',
              },
            },
          ],
        },
        {
          id: 'org-exam-board',
          title: {
            en: 'Examination Board',
            'zh-sg': '考试委员会',
            'ta-sg': 'தேர்வு வாரியம்',
          },
          holder: 'Chair: Mr. S. Santhosh Kumar',
          type: 'board',
          description: {
            en: 'Assessment security, script custody, grading moderation, and formal student result appeals.',
            'zh-sg': '试卷保管保密、考场监考统筹、成绩评定审核及学生考试申诉仲裁。',
            'ta-sg': 'தேர்வு வினாத்தாள் பாதுகாப்பு, மதிப்பெண் மறுஆய்வு மற்றும் மாணவர் மேல்முறையீடு.',
          },
        },
        {
          id: 'org-operations',
          title: {
            en: 'Student Services & Campus Operations',
            'zh-sg': '学生服务与校园运营处',
            'ta-sg': 'மாணவர் சேவைகள் & வளாக செயல்பாடுகள்',
          },
          holder: 'Ms. Muthiah Vanmathi (Director)',
          type: 'operations',
          description: {
            en: 'Student admissions, CPE Contract ver 4.1, bizSAFE Level 3 safety, and fee protections.',
            'zh-sg': '学生录取咨询、标准合同签署管理、bizSAFE 3级校园安全管理及学费保障。',
            'ta-sg': 'மாணவர் சேர்க்கை, CPE ஒப்பந்தப் பாதுகாப்பு மற்றும் வளாகப் பாதுகாப்பு.',
          },
        },
      ],
    },
  ],
};

/* =========================================================================
 * 4. Regulatory Credentials & Accreditations
 * ========================================================================= */
export const REGULATORY_CREDENTIALS = [
  {
    id: 'cpe-erf',
    title: 'Committee for Private Education (CPE / SSG) Registration',
    badge: 'CPE Reg No: 201708935D',
    authority: 'SkillsFuture Singapore (SSG) / Ministry of Education',
    validity: 'Registered Private Education Institute (PEI)',
    description:
      'Registration under the Private Education Act ensures stringent institutional governance, financial viability, qualified academic teachers, and student protection frameworks.',
    keyPoints: [
      'Statutory CPE Enhanced Registration Framework (ERF) compliance',
      'All 21 academic programs vetted and notified to SSG',
      'Small cohort cap: 1:14 teacher-student lecture ratio',
    ],
  },
  {
    id: 'bizsafe-level3',
    title: 'bizSAFE Level 3 Workplace Safety Certification',
    badge: 'WSH Council Certified',
    authority: 'Workplace Safety and Health Council (WSHC), Singapore',
    validity: 'Audited Campus Safety Standards',
    description:
      'Official workplace risk management recognition awarded to EIC premises at New World Centre, certifying comprehensive safety protocols, emergency evacuation, and incident risk assessments.',
    keyPoints: [
      'Certified Risk Assessment audits conducted on Classrooms 1 & 2',
      'Emergency egress, first-aid trained personnel, and fire safety systems',
      'Maintained in full alignment with Singapore Ministry of Manpower (MOM) safety codes',
    ],
  },
  {
    id: 'student-contract',
    title: 'Standard PEI-Student Contract Version 4.1',
    badge: 'Consumer Protection Assured',
    authority: 'Committee for Private Education (CPE)',
    validity: 'Statutory Standard Contract',
    description:
      'Every enrolled learner executes the legally binding Standard PEI-Student Contract Version 4.1, clearly defining fee schedules, refund terms, and a mandatory 7-day cooling-off period.',
    keyPoints: [
      '7-day cooling-off window guaranteeing maximum refund rights upon signing',
      'Transparent course fee installments without hidden surcharges',
      'Official dispute resolution via Singapore Mediation Centre (SMC) & SIArb',
    ],
  },
];

/* =========================================================================
 * 5. Complete 35-Record CPE Deployed Faculty Roster
 * ========================================================================= */
export const DEPLOYED_FACULTY: FacultyMember[] = [
  {
    "id": "fac-ariyappan-ramesh-kumar",
    "name": "ARIYAPPAN RAMESH KUMAR",
    "qualification": "BE (Civil Engineering) - University of Madras, India",
    "discipline": "Healthcare & Caregiving",
    "deploymentType": "FULL TIME",
    "coursesCount": 8,
    "courses": [
      {
        "courseTitle": "DIPLOMA IN CIVIL ENGINEERING",
        "modules": [
          "Strength of Materials",
          "Hydraulic Machinery",
          "Engineering Drawings",
          "Quantity Surveying",
          "Estimating and Costing",
          "Structural Engineering"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN FACILITIES MANAGEMENT",
        "modules": [
          "Introduction To Facilities Management",
          "Workplace Safety And Management",
          "Sustainability Management",
          "Facility Maintenance Planning And Management",
          "Risk Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CHEMICAL AND PROCESS ENGINEERING",
        "modules": [
          "Fluid Mechanics Engineering",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN QUANTITY SURVEYING AND CONSTRUCTION MANAGEMENT",
        "modules": [
          "Introduction to Quantity Surveying",
          "Strength of Materials",
          "Contract Procurement",
          "Environmental Sustainability Management",
          "Estimating and Costing",
          "Construction Management"
        ]
      },
      {
        "courseTitle": "ADVANCED DIPLOMA IN CIVIL ENGINEERING",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Advanced Strength Of Materials Engineering",
          "Advanced Structural Engineering",
          "Engineering Mathematics",
          "Hydraulics Engineering"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN MECHANICAL AND ELECTRICAL ENGINEERING",
        "modules": [
          "Strength of Materials",
          "Mechanics of Fluid",
          "Manufacturing Technology"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "1. ADVANCED STRENGTH OF MATERIALS ENGINEERING",
          "2. ADVANCED ENGINEERING IN PRODUCTION TECHNOLOGY",
          "3. ADVANCED FLUID MECHANICS ENGINEERING",
          "4.PRINCIPLES OF ELECTRICAL ENGINEERING",
          "5.ELECTRICAL SERVICES AND ELECTRICAL MACHINES ENGINEERING",
          "6.POWER SYSTEMS ENGINEERING"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CAREGIVING AND HEALTHCARE ASSISTANT",
        "modules": [
          "HEALTH, SAFETY , ENVIRONMENTAL AND RISKMANAGEMENT",
          "PROBLEM-SOLVING AND DECISION-MAKING"
        ]
      }
    ]
  },
  {
    "id": "fac-g-perbhagaran",
    "name": "G PERBHAGARAN",
    "qualification": "Master of Science (Mathematics) - Bharathidasan University, India; Postgraduate Diploma in Computer Applications - Bharathidasan University, India; Bachelor of Science (Mathematics) - University of Madras, India",
    "discipline": "Healthcare & Caregiving",
    "deploymentType": "PART TIME",
    "coursesCount": 6,
    "courses": [
      {
        "courseTitle": "Diploma in Information Technology",
        "modules": [
          "Introduction To  Information Technology",
          "Fundamentals Of Computer Systems",
          "Microsoft Office",
          "Programming Language",
          "Networking Principles",
          "Introduction To Database"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Electrical and Electronics Engineering",
        "modules": []
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical Engineering",
        "modules": []
      },
      {
        "courseTitle": "Advanced Diploma in Civil Engineering",
        "modules": []
      },
      {
        "courseTitle": "Postgraduate Diploma in Business Management",
        "modules": [
          "Strategic Business Management",
          "Organisational Behaviour",
          "Operations And Supply Chain Management",
          "Marketing Management",
          "Human Resource Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CAREGIVING AND HEALTHCARE ASSISTANT",
        "modules": [
          "HEALTH, SAFETY , ENVIRONMENTAL AND RISK MANAGEMENT",
          "PROBLEM-SOLVING AND DECISION-MAKING"
        ]
      }
    ]
  },
  {
    "id": "fac-kanna-krishna-singh-balaji-singh",
    "name": "KANNA KRISHNA SINGH BALAJI SINGH",
    "qualification": "Master of Business Administration - Annamalai University, India; Bachelor of Engineering (Mechanical Engineering) - Anna University, India",
    "discipline": "Healthcare & Caregiving",
    "deploymentType": "FULL TIME & PART TIME",
    "coursesCount": 16,
    "courses": [
      {
        "courseTitle": "Diploma in Chemical and Process Engineering",
        "modules": [
          "Introduction To Chemical And Process Engineering",
          "Principles Of Chemical Process Engineering",
          "Design And Operation Of Chemical Process Engineering",
          "Chemical Process Control  Optimisation  And Safety Engineering",
          "Fluid Mechanics Engineering",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical Engineering",
        "modules": [
          "Technical Engineering Management",
          "Manufacturing Technology",
          "Metrology and Instrumentation Engineering",
          "Strength of Materials",
          "Mechanics of Fluid"
        ]
      },
      {
        "courseTitle": "Diploma in Civil Engineering",
        "modules": [
          "Engineering Drawings",
          "Strength of Materials",
          "Hydraulic Machinery",
          "Structural Engineering",
          "Quantity Surveying",
          "Estimating and Costing"
        ]
      },
      {
        "courseTitle": "Diploma in Electrical and Electronics Engineering",
        "modules": [
          "Electrical Machines",
          "Circuit Theory",
          "Power Systems",
          "Principles of Electronics",
          "Engineering Drawings",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "Strength of Materials",
          "Electrical Machines",
          "Mechanics of Fluid",
          "Circuit Theory",
          "Manufacturing Technology",
          "Power Systems"
        ]
      },
      {
        "courseTitle": "Diploma in Facilities Management",
        "modules": [
          "Introduction To Facilities Management",
          "Workplace Safety And Management",
          "Sustainability Management",
          "Facility Maintenance Planning And Managemen",
          "Risk Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "Diploma in Quantity Surveying and Construction Management",
        "modules": [
          "Introduction To Quantity Surveying",
          "Strength of Materials",
          "Contract Procurement",
          "Environmental Sustainability Management",
          "Estimating and Costing",
          "Construction Management"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Electrical and Electronics Engineering",
        "modules": [
          "Engineering Drawings And Design",
          "Advanced Technical Engineering Management",
          "Electrical Services And Electrical Machines Engineering",
          "Advanced Industrial Electronics Engineering",
          "Engineering Mathematics",
          "Power Systems Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical Engineering",
        "modules": [
          "Advanced Strength of Materials Engineering.",
          "Advanced Engineering In Production Technology",
          "Advanced Strength of Materials Engineering.",
          "Advanced Engineering In Production Technology",
          "Engineering Mathematics",
          "Advanced Fluid Mechanics Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Civil Engineering",
        "modules": [
          "Engineering Drawings And Design",
          "Advanced Technical Engineering Management",
          "Advanced Strength Of Materials Engineering.",
          "Engineering Mathematics",
          "Hydraulics Engineering",
          "Advanced Structural Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "1. ADVANCED STRENGTH OF MATERIALS ENGINEERING",
          "2. ADVANCED ENGINEERING IN PRODUCTION TECHNOLOGY",
          "3. ADVANCED FLUID MECHANICS ENGINEERING",
          "4.PRINCIPLES OF ELECTRICAL ENGINEERING",
          "5.ELECTRICAL SERVICES AND ELECTRICAL MACHINES ENGINEERING",
          "6.POWER SYSTEMS ENGINEERING"
        ]
      },
      {
        "courseTitle": "Postgraduate Diploma in Business Management",
        "modules": [
          "Strategic Business Management",
          "Organisational Behaviour",
          "Operations And Supply Chain Management",
          "Marketing Management",
          "Human Resource Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CAREGIVING AND HEALTHCARE ASSISTANT",
        "modules": [
          "HEALTH, SAFETY , ENVIRONMENTAL AND RISK MANAGEMENT",
          "PROBLEM-SOLVING AND DECISION-MAKING"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN HUMAN RESOURCE MANAGEMENT(E-LEARNING)",
        "modules": [
          "HUMAN RESOURCE MANAGEMENT",
          "TRAINING AND DEVELOPMENT",
          "EFFECTIVE COMMUNICATION",
          "STRATEGIC HUMAN RESOURCE MANAGEMENT",
          "PRINCIPLES OF MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN BUSINESS MANAGEMENT(E-LEARNING)",
        "modules": []
      },
      {
        "courseTitle": "DIPLOMA IN LOGISTICS AND SUPPLY CHAIN MANAGEMENT(E-LEARNING)",
        "modules": [
          "LOGISTICS AND SUPPLY CHAIN MANAGEMENT",
          "PURCHASING SUPPLY CHAIN MANAGEMENT",
          "PHYSICAL DISTRIBUTION MANAGEMENT",
          "MANAGEMENT INFORMATION SYSTEMS",
          "WAREHOUSE MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      }
    ]
  },
  {
    "id": "fac-kanniah-mukilan",
    "name": "KANNIAH MUKILAN",
    "qualification": "Bachelor of Engineering (Electrical & Electronics Engineering) - Anna University, India",
    "discipline": "Engineering & Built Environment",
    "deploymentType": "PART TIME",
    "coursesCount": 7,
    "courses": [
      {
        "courseTitle": "Diploma in Electrical and Electronics Engineering",
        "modules": [
          "Electrical Machines",
          "Circuit Theory",
          "Power Systems",
          "Principles of Electronics",
          "Engineering Drawings",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical Engineering",
        "modules": [
          "Engineering Drawings",
          "Technical Engineering Management",
          "Manufacturing Technology",
          "Metrology and Instrumentation Engineering",
          "Strength of Materials",
          "Mechanics of Fluid"
        ]
      },
      {
        "courseTitle": "Diploma in Civil Engineering",
        "modules": [
          "Engineering Drawings",
          "Strength of Materials",
          "Hydraulic Machinery",
          "Estimating and Costing",
          "Quantity Surveying",
          "Structural Engineering"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "Strength of Materials",
          "Electrical Machines",
          "Mechanics of Fluid",
          "Circuit Theory",
          "Manufacturing Technology",
          "Power Systems"
        ]
      },
      {
        "courseTitle": "Diploma in Facilities Management",
        "modules": [
          "Introduction To Facilities Management",
          "Workplace Safety And Management",
          "Sustainability Management",
          "Facility Maintenance Planning And Management",
          "Risk Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "Diploma in Chemical and Process Engineering",
        "modules": [
          "Fluid Mechanics Engineering",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "Diploma in Quantity Surveying and Construction Management",
        "modules": [
          "Strength of Materials",
          "Environmental Sustainability Management",
          "Introduction to Quantity Surveying",
          "Construction Management",
          "Estimatimg and Costing",
          "Contract Procurement"
        ]
      }
    ]
  },
  {
    "id": "fac-krishnasamy-jayaprakash",
    "name": "KRISHNASAMY JAYAPRAKASH",
    "qualification": "Bachelor of Arts (Business Management) - Kingston University, UK; Postgraduate Diploma in Financial Management - Annamalai University, India",
    "discipline": "Healthcare & Caregiving",
    "deploymentType": "PART TIME",
    "coursesCount": 16,
    "courses": [
      {
        "courseTitle": "Diploma in Hospitality Management",
        "modules": [
          "Modules deployed to teach",
          "Introduction  To Hospitality Industry",
          "Housekeeping Management",
          "Front Office Management",
          "Food And Beverage Service Management",
          "Banquet Service Management",
          "Sales And Marketing In Hospitality Industry"
        ]
      },
      {
        "courseTitle": "Diploma in Electrical and Electronics Engineering",
        "modules": [
          "Electrical Machines",
          "Circuit Theory",
          "Power Systems",
          "Principles of Electronics",
          "Engineering Drawings",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical Engineering",
        "modules": [
          "Engineering Drawings",
          "Technical Engineering Management",
          "Manufacturing Technology",
          "Metrology and Instrumentation Engineering",
          "Strength of Materials",
          "Mechanics of Fluid"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "Strength Of Materials",
          "Electrical Machines",
          "Mechanics Of Fluid",
          "Circuit Theory",
          "Manufacturing Technology",
          "Power Systems"
        ]
      },
      {
        "courseTitle": "Diploma in Civil Engineering",
        "modules": [
          "Engineering Drawings",
          "Strength of Materials",
          "Hydraulic Machinery",
          "Estimating And Costing",
          "Structural Engineering",
          "Quantity Surveying"
        ]
      },
      {
        "courseTitle": "Diploma in Facilities Management",
        "modules": [
          "Introduction To Facilities Management",
          "Workplace Safety And Management",
          "Sustainability Management",
          "Facility Maintenance Planning And Management",
          "Risk Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "Diploma in Quantity Surveying and Construction Management",
        "modules": [
          "Strength Of Materials",
          "Contract Procurement",
          "Environmental Sustainability Management",
          "Estimating And Costing",
          "Introduction To Quantity Surveying",
          "Construction Management"
        ]
      },
      {
        "courseTitle": "Diploma in Chemical and Process Engineering",
        "modules": [
          "Technical Engineering Management",
          "Fluid Mechanics Engineering",
          "Introduction to Chemical and Process Engineering",
          "Design and Operation of Chenical Process Engineering",
          "Chemical Process Control Optimisation and Safety Engineering",
          "Principles of Chemical Process Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Electrical and Electronics Engineering",
        "modules": [
          "Engineering Drawings And Design",
          "Advanced Technical Engineering Management",
          "Electrical Services And Electrical Machines Engineering",
          "Advanced Industrial Electronics Engineering",
          "Engineering Mathematics",
          "Power Systems Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical Engineering",
        "modules": [
          "Engineering Drawings And Design",
          "Advanced Technical Engineering Management",
          "Advanced Strength of Materials Engineering.",
          "Advanced Engineering In Production Technology",
          "Engineering Mathematics",
          "Advanced Fluid Mechanics Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Civil Engineering",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Engineering Mathematics",
          "Hydraulics Engineering",
          "Advanced Strength of Materials Engineering",
          "Advanced Structural Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "1. ADVANCED STRENGTH OF MATERIALS ENGINEERING",
          "2. ADVANCED ENGINEERING IN PRODUCTION TECHNOLOGY",
          "3. ADVANCED FLUID MECHANICS ENGINEERING",
          "4.PRINCIPLES OF ELECTRICAL ENGINEERING",
          "5.ELECTRICAL SERVICES AND ELECTRICAL MACHINES ENGINEERING",
          "6.POWER SYSTEMS ENGINEERING"
        ]
      },
      {
        "courseTitle": "Diploma in Electrical and Electronics Engineering",
        "modules": [
          "Electrical Machines",
          "Circuit Theory",
          "Power Systems",
          "Principles of Electronics",
          "Engineering Drawings",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical Engineering",
        "modules": [
          "Engineering Drawings",
          "Technical Engineering Management",
          "Manufacturing Technology",
          "Metrology and Instrumentation Engineering",
          "Strength of Materials",
          "Mechanics of Fluid"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "Strength Of Materials",
          "Electrical Machines",
          "Mechanics Of Fluid",
          "Circuit Theory",
          "Manufacturing Technology",
          "Power Systems"
        ]
      },
      {
        "courseTitle": "Diploma in Civil Engineering",
        "modules": [
          "Engineering Drawings",
          "Strength of Materials",
          "Hydraulic Machinery",
          "Estimating And Costing",
          "Structural Engineering",
          "Quantity Surveying"
        ]
      },
      {
        "courseTitle": "Diploma in Facilities Management",
        "modules": [
          "Introduction To Facilities Management",
          "Workplace Safety And Management",
          "Sustainability Management",
          "Facility Maintenance Planning And Management",
          "Risk Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "Diploma in Quantity Surveying and Construction Management",
        "modules": [
          "Strength Of Materials",
          "Contract Procurement",
          "Environmental Sustainability Management",
          "Estimating And Costing",
          "Introduction To Quantity Surveying",
          "Construction Management"
        ]
      },
      {
        "courseTitle": "Diploma in Chemical and Process Engineering",
        "modules": [
          "Technical Engineering Management",
          "Fluid Mechanics Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Electrical and Electronics Engineering",
        "modules": [
          "Engineering Drawings And Design",
          "Advanced Technical Engineering Management",
          "Electrical Services And Electrical Machines Engineering",
          "Advanced Industrial Electronics Engineering",
          "Engineering Mathematics",
          "Power Systems Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical Engineering",
        "modules": [
          "Engineering Drawings And Design",
          "Advanced Technical Engineering Management",
          "Advanced Strength of Materials Engineering.",
          "Advanced Engineering In Production Technology",
          "Engineering Mathematics",
          "Advanced Fluid Mechanics Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Civil Engineering",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Engineering Mathematics",
          "Hydraulics Engineering",
          "Advanced Strength of Materials Engineering",
          "Advanced Structural Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "1. ADVANCED STRENGTH OF MATERIALS ENGINEERING",
          "2. ADVANCED ENGINEERING IN PRODUCTION TECHNOLOGY",
          "3. ADVANCED FLUID MECHANICS ENGINEERING",
          "4.PRINCIPLES OF ELECTRICAL ENGINEERING",
          "5.ELECTRICAL SERVICES AND ELECTRICAL MACHINES ENGINEERING",
          "6.POWER SYSTEMS ENGINEERING"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CAREGIVING AND HEALTHCARE ASSISTANT",
        "modules": [
          "FUNDAMENTALS OF CAREGIVING AND HEALTH",
          "CARE",
          "NUTRITION AND MEAL PLANNING",
          "FIRST AID AND BASIC LIFE SUPPORT",
          "INFANT AND ELDERLY CARE",
          "HEALTH, SAFETY , ENVIRONMENTAL AND RISK MANAGEMENT",
          "PROBLEM-SOLVING AND DECISION-MAKING"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN BUSINESS MANAGEMENT(E-LEARNING)",
        "modules": [
          "PRINCIPLES OF BUSINESS MANAGEMENT",
          "HUMAN RESOURCE MANAGEMENT",
          "EFFECTIVE COMMUNICATION",
          "STRATEGIC BUSINESS MANAGEMENT",
          "PROJECT MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN LOGISTICS AND SUPPLY CHAIN MANAGEMENT(E-LEARNING)",
        "modules": [
          "LOGISTICS AND SUPPLY CHAIN MANAGEMENT",
          "PURCHASING SUPPLY CHAIN MANAGEMENT",
          "PHYSICAL DISTRIBUTION MANAGEMENT",
          "MANAGEMENT INFORMATION SYSTEMS",
          "WAREHOUSE MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN HUMAN RESOURCE MANAGEMENT(E-LEARNING)",
        "modules": [
          "HUMAN RESOURCE MANAGEMENT",
          "TRAINING AND DEVELOPMENT",
          "EFFECTIVE COMMUNICATION",
          "STRATEGIC HUMAN RESOURCE MANAGEMENT",
          "PRINCIPLES OF MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      }
    ]
  },
  {
    "id": "fac-kumar-hitesh",
    "name": "KUMAR HITESH",
    "qualification": "Bachelor of Technology (Civil Engineering) - Kurukshetra University, India",
    "discipline": "Engineering & Built Environment",
    "deploymentType": "PART TIME",
    "coursesCount": 12,
    "courses": [
      {
        "courseTitle": "DIPLOMA IN MECHANICAL ENGINEERING",
        "modules": [
          "Metrology and Instrumentation Engineering",
          "Engineering Drawings",
          "Manufacturing Technology",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN ELECTRICAL AND ELECTRONICS ENGINEERING",
        "modules": [
          "Electrical Machines",
          "Circuit Theory",
          "Power Systems",
          "Principles of Electronics",
          "Engineering Drawings",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CIVIL ENGINEERING",
        "modules": [
          "Engineering Drawings"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN FACILITIES MANAGEMENT",
        "modules": [
          "Introduction To Facilities Management",
          "Workplace Safety And Management",
          "Sustainability Management",
          "Facility Maintenance Planning And Management",
          "Risk Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CHEMICAL AND PROCESS ENGINEERING",
        "modules": [
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN QUANTITY SURVEYING AND CONSTRUCTION MANAGEMENT",
        "modules": [
          "Strength of Materials",
          "Contract Procurement",
          "Environmental Sustainability Management",
          "Estimating and Costing"
        ]
      },
      {
        "courseTitle": "ADVANCED DIPLOMA IN MECHANICAL ENGINEERING",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Advanced Strength of Materials Engineering",
          "Advanced Engineering in Production Technology",
          "Engineering Mathematics",
          "Advanced Fluid Mechanics Engineering"
        ]
      },
      {
        "courseTitle": "ADVANCED DIPLOMA IN ELECTRICAL AND ELECTRONICS ENGINEERING",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Electrical Services And Electrical Machines Engineering",
          "Advanced Industrial Electronics Engineering",
          "Engineering Mathematics",
          "Power Systems Engineering"
        ]
      },
      {
        "courseTitle": "ADVANCED DIPLOMA IN CIVIL ENGINEERING",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Engineering Mathematics"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical and Electrical Engineering",
        "modules": []
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "1. ADVANCED STRENGTH OF MATERIALS ENGINEERING",
          "2. ADVANCED ENGINEERING IN PRODUCTION TECHNOLOGY",
          "3. ADVANCED FLUID MECHANICS ENGINEERING",
          "4.PRINCIPLES OF ELECTRICAL ENGINEERING",
          "5.ELECTRICAL SERVICES AND ELECTRICAL MACHINES ENGINEERING",
          "6.POWER SYSTEMS ENGINEERING"
        ]
      },
      {
        "courseTitle": "Postgraduate Diploma in Mechanical and Electrical Instrumentation Control Engineering",
        "modules": [
          "MECHANICAL SYSTEMS DESIGN",
          "THERMODYNAMICS AND APPLIED FLUID MECHANICS",
          "ELECTRICAL MACHINES AND DRIVES",
          "INDUSTRIAL INSTRUMENTATION SYSTEMS",
          "PROCESS INSTRUMENTATION AND CONTROL SYSTEMS ENGINEERING",
          "PROGRAMMABLE LOGIC CONTROLLERS (PLCS) AND ADVANCED PROCESS CONTROL (APC)"
        ]
      },
      {
        "courseTitle": "ADVANCED DIPLOMA IN CONSTRUCTION MANAGEMENT",
        "modules": [
          "Construction Planning Programming And Project Management",
          "Construction Technology",
          "Cost And Financial Management",
          "Contract Administration",
          "Health, Safety , Environmental And Risk Management",
          "Problem-Solving And Decision-Making"
        ]
      }
    ]
  },
  {
    "id": "fac-mohamed-haja-guthupudeen-s-o-abdul-rajack",
    "name": "MOHAMED HAJA GUTHUPUDEEN S/O ABDUL RAJACK",
    "qualification": "Master of Science (Information Technology) - Bharathidasan University, India; Bachelor of Science (Computer Science) - Bharathidasan University, India",
    "discipline": "Engineering & Built Environment",
    "deploymentType": "PART TIME",
    "coursesCount": 11,
    "courses": [
      {
        "courseTitle": "Diploma in Electrical and Electronics Engineering",
        "modules": [
          "Electrical Machines",
          "Circuit Theory",
          "Power Systems",
          "Principles of Electronics",
          "Engineering Drawings",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical Engineering",
        "modules": [
          "Engineering Drawings",
          "Technical Engineering Management",
          "Manufacturing Technology",
          "Metrology and Instrumentation Engineering",
          "Strength of Materials",
          "Mechanics of Fluid"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "Strength Of Materials",
          "Electrical Machines",
          "Mechanics Of Fluid",
          "Circuit Theory",
          "Manufacturing Technology",
          "Power Systems"
        ]
      },
      {
        "courseTitle": "Diploma in Civil Engineering",
        "modules": [
          "Engineering Drawings",
          "Strength of Materials",
          "Hydraulic Machinery",
          "Estimating And Costing",
          "Structural Engineering",
          "Quantity Surveying"
        ]
      },
      {
        "courseTitle": "Diploma in Facilities Management",
        "modules": [
          "Introduction To Facilities Management",
          "Workplace Safety And Management",
          "Sustainability Management",
          "Facility Maintenance Planning And Management",
          "Risk Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "Diploma in Quantity Surveying and Construction Management",
        "modules": [
          "Strength Of Materials",
          "Contract Procurement",
          "Environmental Sustainability Management",
          "Estimating And Costing",
          "Introduction To Quantity Surveying",
          "Construction Management"
        ]
      },
      {
        "courseTitle": "Diploma in Chemical and Process Engineering",
        "modules": [
          "Technical Engineering Management",
          "Fluid Mechanics Engineering",
          "Introduction to Chemical and Process Engineering",
          "Design and Operation of Chenical Process Engineering",
          "Chemical Process Control Optimisation and Safety Engineering",
          "Principles of Chemical Process Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Electrical and Electronics Engineering",
        "modules": [
          "Engineering Drawings And Design",
          "Advanced Technical Engineering Management",
          "Electrical Services And Electrical Machines Engineering",
          "Advanced Industrial Electronics Engineering",
          "Engineering Mathematics",
          "Power Systems Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical Engineering",
        "modules": [
          "Engineering Drawings And Design",
          "Advanced Technical Engineering Management",
          "Advanced Strength of Materials Engineering.",
          "Advanced Engineering In Production Technology",
          "Engineering Mathematics",
          "Advanced Fluid Mechanics Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Civil Engineering",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Engineering Mathematics",
          "Hydraulics Engineering",
          "Advanced Strength of Materials Engineering",
          "Advanced Structural Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "Electrical Services And Electrical Machines Engineering",
          "Power Systems Engineering",
          "Principles of Electrical Engineering",
          "Advanced Strength of Materials Engineering.",
          "Advanced Engineering In Production Technology",
          "Advanced Fluid Mechanics Engineering"
        ]
      }
    ]
  },
  {
    "id": "fac-muraleedharan-pathari",
    "name": "MURALEEDHARAN PATHARI",
    "qualification": "Master of Technology (Civil Engineering) - Visvesvaraya Technological University, India; Bachelor of Engineering (Civil Engineering) - University of Calicut, India",
    "discipline": "Engineering & Built Environment",
    "deploymentType": "PART TIME",
    "coursesCount": 11,
    "courses": [
      {
        "courseTitle": "DIPLOMA IN ELECTRICAL AND ELECTRONICS ENGINEERING",
        "modules": [
          "Electrical Machines",
          "Circuit Theory",
          "Power Systems",
          "Principles of Electronics",
          "Engineering Drawings",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN MECHANICAL ENGINEERING",
        "modules": [
          "Strength of Materials",
          "Metrology and Instrumentation Engineering",
          "Mechanics of Fluid",
          "Engineering Drawings",
          "Manufacturing Technology",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CIVIL ENGINEERING",
        "modules": [
          "Strength of Materials",
          "Hydraulic Machinery",
          "Engineering Drawings",
          "Quantity Surveying",
          "Structural Engineering",
          "Estimating and Costing"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN FACILITIES MANAGEMENT",
        "modules": [
          "Introduction To Facilities Management",
          "Workplace Safety And Management",
          "Sustainability Management",
          "Facility Maintenance Planning And Management",
          "Risk Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CHEMICAL AND PROCESS ENGINEERING",
        "modules": [
          "Technical Engineering Management",
          "Introduction to Chemical and Process Engineering",
          "Principle of Chemical Process Engineering",
          "Design and Operation of Chemical Process Engineering",
          "Chemical Process Control Optimisation and Safety Engineering",
          "Fluid Mechanics Engineering"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN QUANTITY SURVEYING AND CONSTRUCTION MANAGEMENT",
        "modules": [
          "Strength of Materials",
          "Contract Procurement",
          "Environmental Sustainability Management",
          "Estimating and Costing",
          "Introduction to Quantity Surveying",
          "Construction Management"
        ]
      },
      {
        "courseTitle": "ADVANCED DIPLOMA IN MECHANICAL ENGINEERING",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Advanced Strength of Materials Engineering",
          "Advanced Engineering in Production Technology",
          "Engineering Mathematics",
          "Advanced Fluid Mechanics Engineering"
        ]
      },
      {
        "courseTitle": "ADVANCED DIPLOMA IN ELECTRICAL AND ELECTRONICS ENGINEERING",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Electrical Services And Electrical Machines Engineering",
          "Advanced Industrial Electronics Engineering",
          "Engineering Mathematics",
          "Power Systems Engineering"
        ]
      },
      {
        "courseTitle": "ADVANCED DIPLOMA IN CIVIL ENGINEERING",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Engineering Mathematics",
          "Hydraulics Engineering",
          "Advanced Structural Engineering",
          "Advanced Strength of Materials Engineering."
        ]
      },
      {
        "courseTitle": "DIPLOMA IN MECHANICAL AND ELECTRICAL ENGINEERING",
        "modules": [
          "Strength of Materials",
          "Mechanics of Fluid Systems",
          "Manufacturing Technology",
          "Electrical Machines",
          "Circuit Theory",
          "Power Systems"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "1. ADVANCED STRENGTH OF MATERIALS ENGINEERING",
          "2. ADVANCED ENGINEERING IN PRODUCTION TECHNOLOGY",
          "3. ADVANCED FLUID MECHANICS ENGINEERING",
          "4.PRINCIPLES OF ELECTRICAL ENGINEERING",
          "5.ELECTRICAL SERVICES AND ELECTRICAL MACHINES ENGINEERING",
          "6.POWER SYSTEMS ENGINEERING"
        ]
      }
    ]
  },
  {
    "id": "fac-murugaiyan-ramkumar",
    "name": "MURUGAIYAN RAMKUMAR",
    "qualification": "Master of Technology (Power Electronics & Drives) - SRM University, India; Bachelor of Engineering (Electrical & Electronics Engineering) - Anna University, India",
    "discipline": "Healthcare & Caregiving",
    "deploymentType": "PART TIME",
    "coursesCount": 11,
    "courses": [
      {
        "courseTitle": "Diploma in Electrical and Electronics Engineering",
        "modules": [
          "Electrical Machines",
          "Circuit Theory",
          "Power Systems",
          "Principles of Electronics",
          "Engineering Drawings",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical Engineering",
        "modules": [
          "Engineering Drawings",
          "Technical Engineering Management",
          "Manufacturing Technology",
          "Metrology and Instrumentation Engineering",
          "Strength of Materials",
          "Mechanics of Fluid"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "Strength Of Materials",
          "Electrical Machines",
          "Mechanics Of Fluid",
          "Circuit Theory",
          "Manufacturing Technology",
          "Power Systems"
        ]
      },
      {
        "courseTitle": "Diploma in Civil Engineering",
        "modules": [
          "Engineering Drawings",
          "Strength of Materials",
          "Hydraulic Machinery",
          "Estimating And Costing",
          "Structural Engineering",
          "Quantity Surveying"
        ]
      },
      {
        "courseTitle": "Diploma in Facilities Management",
        "modules": [
          "Introduction To Facilities Management",
          "Workplace Safety And Management",
          "Sustainability Management",
          "Facility Maintenance Planning And Management",
          "Risk Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "Diploma in Quantity Surveying and Construction Management",
        "modules": [
          "Strength Of Materials",
          "Contract Procurement",
          "Environmental Sustainability Management",
          "Estimating And Costing",
          "Introduction To Quantity Surveying",
          "Construction Management"
        ]
      },
      {
        "courseTitle": "Diploma in Chemical and Process Engineering",
        "modules": [
          "Technical Engineering Management",
          "Fluid Mechanics Engineering",
          "Introduction to Chemical and Process Engineering",
          "Design and Operation of Chenical Process Engineering",
          "Chemical Process Control Optimisation and Safety Engineering",
          "Principles of Chemical Process Engineering"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CAREGIVING AND HEALTHCARE ASSISTANT",
        "modules": [
          "HEALTH, SAFETY , ENVIRONMENTAL AND RISK MANAGEMENT",
          "PROBLEM-SOLVING AND DECISION-MAKING"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN HUMAN RESOURCE MANAGEMENT(E-LEARNING)",
        "modules": [
          "HUMAN RESOURCE MANAGEMENT",
          "TRAINING AND DEVELOPMENT",
          "EFFECTIVE COMMUNICATION",
          "STRATEGIC HUMAN RESOURCE MANAGEMENT",
          "PRINCIPLES OF MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN BUSINESS MANAGEMENT(E-LEARNING)",
        "modules": [
          "PRINCIPLES OF BUSINESS MANAGEMENT",
          "HUMAN RESOURCE MANAGEMENT",
          "EFFECTIVE COMMUNICATION",
          "STRATEGIC BUSINESS MANAGEMENT",
          "PROJECT MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN LOGISTICS AND SUPPLY CHAIN MANAGEMENT(E-LEARNING)",
        "modules": [
          "LOGISTICS AND SUPPLY CHAIN MANAGEMENT",
          "PURCHASING SUPPLY CHAIN MANAGEMENT",
          "PHYSICAL DISTRIBUTION MANAGEMENT",
          "MANAGEMENT INFORMATION SYSTEMS",
          "WAREHOUSE MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      }
    ]
  },
  {
    "id": "fac-rajamanickam-saminathan",
    "name": "RAJAMANICKAM SAMINATHAN",
    "qualification": "Bachelor of Engineering (Electrical & Electronics Engineering) - Anna University, India",
    "discipline": "Healthcare & Caregiving",
    "deploymentType": "PART TIME",
    "coursesCount": 15,
    "courses": [
      {
        "courseTitle": "Diploma in Electrical and Electronics Engineering",
        "modules": [
          "Electrical Machines",
          "Circuit Theory",
          "Power Systems",
          "Principles of Electronics",
          "Engineering Drawings",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical Engineering",
        "modules": [
          "Engineering Drawings",
          "Technical Engineering Management",
          "Manufacturing Technology",
          "Metrology and Instrumentation Engineering",
          "Strength of Materials",
          "Mechanics of Fluid"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "Strength Of Materials",
          "Electrical Machines",
          "Mechanics Of Fluid",
          "Circuit Theory",
          "Manufacturing Technology",
          "Power Systems"
        ]
      },
      {
        "courseTitle": "Diploma in Civil Engineering",
        "modules": [
          "Engineering Drawings",
          "Strength of Materials",
          "Hydraulic Machinery",
          "Estimating And Costing",
          "Structural Engineering",
          "Quantity Surveying"
        ]
      },
      {
        "courseTitle": "Diploma in Facilities Management",
        "modules": [
          "Introduction To Facilities Management",
          "Workplace Safety And Management",
          "Sustainability Management",
          "Facility Maintenance Planning And Management",
          "Risk Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "Diploma in Quantity Surveying and Construction Management",
        "modules": [
          "Strength Of Materials",
          "Contract Procurement",
          "Environmental Sustainability Management",
          "Estimating And Costing",
          "Introduction To Quantity Surveying",
          "Construction Management"
        ]
      },
      {
        "courseTitle": "Diploma in Chemical and Process Engineering",
        "modules": [
          "Technical Engineering Management",
          "Fluid Mechanics Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Electrical and Electronics Engineering",
        "modules": [
          "Engineering Drawings And Design",
          "Advanced Technical Engineering Management",
          "Electrical Services And Electrical Machines Engineering",
          "Advanced Industrial Electronics Engineering",
          "Engineering Mathematics",
          "Power Systems Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical Engineering",
        "modules": [
          "Engineering Drawings And Design",
          "Advanced Technical Engineering Management",
          "Advanced Strength of Materials Engineering.",
          "Advanced Engineering In Production Technology",
          "Engineering Mathematics",
          "Advanced Fluid Mechanics Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Civil Engineering",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Engineering Mathematics",
          "Hydraulics Engineering",
          "Advanced Strength of Materials Engineering",
          "Advanced Structural Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "Electrical Services And Electrical Machines Engineering",
          "Power Systems Engineering",
          "Principles of Electrical Engineering",
          "Advanced Strength of Materials Engineering.",
          "Advanced Engineering In Production Technology",
          "Advanced Fluid Mechanics Engineering"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CAREGIVING AND HEALTHCARE ASSISTANT",
        "modules": [
          "HEALTH, SAFETY , ENVIRONMENTAL AND RISK MANAGEMENT",
          "PROBLEM-SOLVING AND DECISION-MAKING"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN HUMAN RESOURCE MANAGEMENT(E-LEARNING)",
        "modules": [
          "HUMAN RESOURCE MANAGEMENT",
          "TRAINING AND DEVELOPMENT",
          "EFFECTIVE COMMUNICATION",
          "STRATEGIC HUMAN RESOURCE MANAGEMENT",
          "PRINCIPLES OF MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN BUSINESS MANAGEMENT(E-LEARNING)",
        "modules": [
          "PRINCIPLES OF BUSINESS MANAGEMENT",
          "HUMAN RESOURCE MANAGEMENT",
          "EFFECTIVE COMMUNICATION",
          "STRATEGIC BUSINESS MANAGEMENT",
          "PROJECT MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN LOGISTICS AND SUPPLY CHAIN MANAGEMENT(E-LEARNING)",
        "modules": [
          "LOGISTICS AND SUPPLY CHAIN MANAGEMENT",
          "PURCHASING SUPPLY CHAIN MANAGEMENT",
          "PHYSICAL DISTRIBUTION MANAGEMENT",
          "MANAGEMENT INFORMATION SYSTEMS",
          "WAREHOUSE MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      }
    ]
  },
  {
    "id": "fac-rajendran-sri-ramanan",
    "name": "RAJENDRAN SRI RAMANAN",
    "qualification": "BE (Mechanical Engineering) - University of Madras, India",
    "discipline": "Engineering & Built Environment",
    "deploymentType": "FULL TIME",
    "coursesCount": 8,
    "courses": [
      {
        "courseTitle": "DIPLOMA IN MECHANICAL ENGINEERING",
        "modules": [
          "Strength of Materials",
          "Metrology and Instrumentation Engineering",
          "Mechanics of Fluid",
          "Engineering Drawings",
          "Manufacturing Technology",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN FACILITIES MANAGEMENT",
        "modules": [
          "Introduction To Facilities Management",
          "Workplace Safety And Management",
          "Sustainability Management",
          "Facility Maintenance Planning And Management",
          "Risk Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CHEMICAL AND PROCESS ENGINEERING",
        "modules": [
          "Fluid Mechanics Engineering",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN QUANTITY SURVEYING AND CONSTRUCTION MANAGEMENT",
        "modules": [
          "Strength of Materials",
          "Contract Procurement",
          "Environmental Sustainability Management",
          "Estimating and Costing"
        ]
      },
      {
        "courseTitle": "ADVANCED DIPLOMA IN MECHANICAL ENGINEERING",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Advanced Strength of Materials Engineering",
          "Advanced Engineering in Production Technology",
          "Engineering Mathematics",
          "Advanced Fluid Mechanics Engineering"
        ]
      },
      {
        "courseTitle": "ADVANCED DIPLOMA IN ELECTRICAL AND ELECTRONICS ENGINEERING",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Engineering Mathematics"
        ]
      },
      {
        "courseTitle": "ADVANCED DIPLOMA IN CIVIL ENGINEERING",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Advanced Strength of Materials Management",
          "Engineering Mathematics",
          "Hydraulics Engineering"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN MECHANICAL AND ELECTRICAL ENGINEERING",
        "modules": [
          "Strength of Materials",
          "Mechanics of Fluid",
          "Manufacturing Technology",
          "Electrical Machines",
          "Circuit Theory",
          "Power Systems"
        ]
      }
    ]
  },
  {
    "id": "fac-ramadass-muruganandam",
    "name": "RAMADASS MURUGANANDAM",
    "qualification": "Master of Business Administration - Anna University, India; Bachelor of Engineering (Electrical & Electronics Engineering) - Bharathidasan University, India",
    "discipline": "Information Technology",
    "deploymentType": "FULL TIME & PART TIME",
    "coursesCount": 14,
    "courses": [
      {
        "courseTitle": "Postgraduate Diploma In Business Management",
        "modules": [
          "Strategic business management",
          "Organisational behaviour",
          "Operations and supply chain management",
          "Marketing management",
          "Human resource management",
          "Project management"
        ]
      },
      {
        "courseTitle": "Diploma in Electrical and Electronics Engineering",
        "modules": [
          "Electrical Machines",
          "Circuit Theory",
          "Power Systems",
          "Principles of Electronics",
          "Engineering Drawings",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical Engineering",
        "modules": [
          "Engineering Drawings",
          "Technical Engineering Management",
          "Manufacturing Technology",
          "Metrology and Instrumentation Engineering",
          "Strength of Materials",
          "Mechanics of Fluid"
        ]
      },
      {
        "courseTitle": "Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "Strength Of Materials",
          "Electrical Machines",
          "Mechanics Of Fluid",
          "Circuit Theory",
          "Manufacturing Technology",
          "Power Systems"
        ]
      },
      {
        "courseTitle": "Diploma in Civil Engineering",
        "modules": [
          "Engineering Drawings",
          "Strength of Materials",
          "Hydraulic Machinery",
          "Estimating And Costing",
          "Structural Engineering",
          "Quantity Surveying"
        ]
      },
      {
        "courseTitle": "Diploma in Facilities Management",
        "modules": [
          "Introduction To Facilities Management",
          "Workplace Safety And Management",
          "Sustainability Management",
          "Facility Maintenance Planning And Management",
          "Risk Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "Diploma in Quantity Surveying and Construction Management",
        "modules": [
          "Strength Of Materials",
          "Contract Procurement",
          "Environmental Sustainability Management",
          "Estimating And Costing",
          "Introduction To Quantity Surveying",
          "Construction Management"
        ]
      },
      {
        "courseTitle": "Diploma in Chemical and Process Engineering",
        "modules": [
          "Technical Engineering Management",
          "Fluid Mechanics Engineering",
          "Introduction to Chemical and Process Engineering",
          "Design and Operation of Chenical Process Engineering",
          "Chemical Process Control Optimisation and Safety Engineering",
          "Principles of Chemical Process Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Electrical and Electronics Engineering",
        "modules": [
          "Engineering Drawings And Design",
          "Advanced Technical Engineering Management",
          "Electrical Services And Electrical Machines Engineering",
          "Advanced Industrial Electronics Engineering",
          "Engineering Mathematics",
          "Power Systems Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical Engineering",
        "modules": [
          "Engineering Drawings And Design",
          "Advanced Technical Engineering Management",
          "Advanced Strength of Materials Engineering.",
          "Advanced Engineering In Production Technology",
          "Engineering Mathematics",
          "Advanced Fluid Mechanics Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Civil Engineering",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Engineering Mathematics",
          "Hydraulics Engineering",
          "Advanced Strength of Materials Engineering",
          "Advanced Structural Engineering"
        ]
      },
      {
        "courseTitle": "Advanced Diploma in Mechanical and Electrical Engineering",
        "modules": [
          "1. ADVANCED STRENGTH OF MATERIALS ENGINEERING",
          "2. ADVANCED ENGINEERING IN PRODUCTION TECHNOLOGY",
          "3. ADVANCED FLUID MECHANICS ENGINEERING",
          "4.PRINCIPLES OF ELECTRICAL ENGINEERING",
          "5.ELECTRICAL SERVICES AND ELECTRICAL MACHINES ENGINEERING",
          "6.POWER SYSTEMS ENGINEERING"
        ]
      },
      {
        "courseTitle": "Diploma in Information Technology",
        "modules": [
          "Introduction To  Information Technology",
          "Fundamentals Of Computer Systems",
          "Microsoft Office",
          "Programming Language",
          "Networking Principles",
          "Introduction To Database"
        ]
      },
      {
        "courseTitle": "Postgraduate Diploma in Mechanical and Electrical Instrumentation Control Engineering",
        "modules": [
          "MECHANICAL SYSTEMS DESIGN",
          "THERMODYNAMICS AND APPLIED FLUID MECHANICS",
          "ELECTRICAL MACHINES AND DRIVES",
          "INDUSTRIAL INSTRUMENTATION SYSTEMS",
          "PROCESS INSTRUMENTATION AND CONTROL SYSTEMS ENGINEERING",
          "PROGRAMMABLE LOGIC CONTROLLERS (PLCS) AND ADVANCED PROCESS CONTROL (APC)"
        ]
      }
    ]
  },
  {
    "id": "fac-ramadass-muruganandam-academic-qualifications",
    "name": "RAMADASS MURUGANANDAM Academic Qualifications:",
    "qualification": "Name of the Teacher - RAMADASS MURUGANANDAM",
    "discipline": "Engineering & Built Environment",
    "deploymentType": "PART TIME",
    "coursesCount": 0,
    "courses": []
  },
  {
    "id": "fac-sakkarapani-santhosh-kumar",
    "name": "SAKKARAPANI SANTHOSH KUMAR",
    "qualification": "M.H.R.M. (Human Resource Management) - Pondicherry University, India; M.Sc. (Hotel Management) - Annamalai University, India; B.Sc. (Hotel & Catering Management) - University of Madras, India; ACTA (WDA Singapore); WSQ DACE (Singapore Polytechnic)",
    "discipline": "Healthcare & Caregiving",
    "deploymentType": "FULL TIME",
    "coursesCount": 5,
    "courses": [
      {
        "courseTitle": "DIPLOMA IN HOSPITALITY MANAGEMENT",
        "modules": [
          "Introduction To Hospitality Industry",
          "Housekeeping Management",
          "Front Office Management",
          "Food and Beverage Service Management",
          "Banquet Service Management",
          "Sales and Marketing in Hospitality Industry"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CAREGIVING AND HEALTHCARE ASSISTANT",
        "modules": [
          "NUTRITION AND MEAL PLANNING",
          "HEALTH, SAFETY , ENVIRONMENTAL AND RISK MANAGEMENT",
          "PROBLEM-SOLVING AND DECISION-MAKING"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN HUMAN RESOURCE MANAGEMENT(E-LEARNING)",
        "modules": [
          "HUMAN RESOURCE MANAGEMENT",
          "TRAINING AND DEVELOPMENT",
          "EFFECTIVE COMMUNICATION",
          "STRATEGIC HUMAN RESOURCE MANAGEMENT",
          "PRINCIPLES OF MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN LOGISTICS AND SUPPLY CHAIN MANAGEMENT(E-LEARNING)",
        "modules": [
          "LOGISTICS AND SUPPLY CHAIN MANAGEMENT",
          "PURCHASING SUPPLY CHAIN MANAGEMENT",
          "PHYSICAL DISTRIBUTION MANAGEMENT",
          "MANAGEMENT INFORMATION SYSTEMS",
          "WAREHOUSE MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN BUSINESS MANAGEMENT(E-LEARNING)",
        "modules": [
          "PRINCIPLES OF BUSINESS MANAGEMENT",
          "HUMAN RESOURCE MANAGEMENT",
          "EFFECTIVE COMMUNICATION",
          "STRATEGIC BUSINESS MANAGEMENT",
          "PROJECT MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      }
    ]
  },
  {
    "id": "fac-subramanian-balaji",
    "name": "SUBRAMANIAN BALAJI",
    "qualification": "Bachelor of Technology (Chemical Engineering) - University of Madras, India",
    "discipline": "Engineering & Built Environment",
    "deploymentType": "FULL TIME",
    "coursesCount": 3,
    "courses": [
      {
        "courseTitle": "DIPLOMA IN FACILITIES MANAGEMENT",
        "modules": [
          "Introduction To Facilities Management",
          "Workplace Safety And Management",
          "Sustainability Management",
          "Facility Maintenance Planning And Management",
          "Risk Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CHEMICAL AND PROCESS ENGINEERING",
        "modules": [
          "Introduction To Chemical And Process Engineering",
          "Principles Of Chemical Process Engineering",
          "Design And Operation Of Chemical Process Engineering",
          "Chemical Process Control Optimisation  And Safety Engineering",
          "Fluid Mechanics Engineering",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN QUANTITY SURVEYING AND CONSTRUCTION MANAGEMENT",
        "modules": [
          "Contract Procurement",
          "Environmental Sustainability Management"
        ]
      }
    ]
  },
  {
    "id": "fac-valmuni-murugesan",
    "name": "VALMUNI MURUGESAN",
    "qualification": "Bachelor of Engineering (Mechanical Engineering) - Madurai Kamaraj University, India",
    "discipline": "Engineering & Built Environment",
    "deploymentType": "PART TIME",
    "coursesCount": 1,
    "courses": [
      {
        "courseTitle": "DIPLOMA IN ELECTRICAL AND ELECTRONICS ENGINEERING",
        "modules": [
          "Electrical Machines",
          "Circuit Theory",
          "Power Systems",
          "Principles of Electronics",
          "Engineering Drawings",
          "Technical Engineering Management"
        ]
      }
    ]
  },
  {
    "id": "fac-velayutham-muthupalaniappan",
    "name": "VELAYUTHAM MUTHUPALANIAPPAN",
    "qualification": "Bachelor of Computer Application - Alagappa University, India; Diploma in Mechanical Engineering - Department of Technical Education, Tamil Nadu, India",
    "discipline": "Information Technology",
    "deploymentType": "PART TIME",
    "coursesCount": 11,
    "courses": [
      {
        "courseTitle": "DIPLOMA IN MECHANICAL ENGINEERING",
        "modules": [
          "Strength of Materials",
          "Metrology and Instrumentation Engineering",
          "Mechanics of Fluid",
          "Engineering Drawings",
          "Manufacturing Technology",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN ELECTRICAL AND ELECTRONICS ENGINEERING",
        "modules": [
          "Engineering Drawings",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CIVIL ENGINEERING",
        "modules": [
          "Engineering Drawings",
          "Strength Of Materials",
          "Hydraulic Machinery"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN FACILITIES MANAGEMENT",
        "modules": [
          "Introduction To Facilities Management",
          "Workplace Safety And Management",
          "Sustainability Management",
          "Facility Maintenance Planning And Management",
          "Risk Management",
          "Project Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN CHEMICAL AND PROCESS ENGINEERING",
        "modules": [
          "Fluid Mechanics Engineering",
          "Technical Engineering Management"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN QUANTITY SURVEYING AND CONSTRUCTION MANAGEMENT",
        "modules": [
          "Strength of Materials",
          "Contract Procurement",
          "Environmental Sustainability Management",
          "Estimating and Costing"
        ]
      },
      {
        "courseTitle": "ADVANCED DIPLOMA IN MECHANICAL ENGINEERING",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Advanced Strength of Materials Engineering",
          "Advanced Engineering in Production Technology",
          "Engineering Mathematics",
          "Advanced Fluid Mechanics Engineering"
        ]
      },
      {
        "courseTitle": "ADVANCED DIPLOMA IN ELECTRICAL AND ELECTRONICS ENGINEERING",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Engineering Mathematics"
        ]
      },
      {
        "courseTitle": "ADVANCED DIPLOMA IN CIVIL ENGINEERING",
        "modules": [
          "Engineering Drawings and Design",
          "Advanced Technical Engineering Management",
          "Advanced Strength of Materials Management",
          "Engineering Mathematics",
          "Hydraulics Engineering"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN INFORMATION TECHNOLOGY",
        "modules": [
          "Introduction To Information Technology",
          "Fundamentals of Computer Systems",
          "Microsoft Office",
          "Programming Language",
          "Networking Principles",
          "Introduction To Database"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN MECHANICAL AND ELECTRICAL ENGINEERING",
        "modules": [
          "Strength of Materials",
          "Mechanics of Fluid",
          "Manufacturing Technology",
          "Electrical Machines",
          "Circuit Theory",
          "Power Systems"
        ]
      }
    ]
  },
  {
    "id": "fac-veluchamy-karthikraja",
    "name": "VELUCHAMY KARTHIKRAJA",
    "qualification": "Bachelor of Engineering (Civil Engineering) - Anna University, India",
    "discipline": "Healthcare & Caregiving",
    "deploymentType": "PART TIME",
    "coursesCount": 4,
    "courses": [
      {
        "courseTitle": "DIPLOMA IN CAREGIVING AND HEALTHCARE ASSISTANT",
        "modules": [
          "HEALTH, SAFETY , ENVIRONMENTAL AND RISK MANAGEMENT",
          "PROBLEM-SOLVING AND DECISION-MAKING"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN HUMAN RESOURCE MANAGEMENT(E-LEARNING)",
        "modules": [
          "HUMAN RESOURCE MANAGEMENT",
          "TRAINING AND DEVELOPMENT",
          "EFFECTIVE COMMUNICATION",
          "STRATEGIC HUMAN RESOURCE MANAGEMENT",
          "PRINCIPLES OF MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN BUSINESS MANAGEMENT(E-LEARNING)",
        "modules": [
          "PRINCIPLES OF BUSINESS MANAGEMENT",
          "HUMAN RESOURCE MANAGEMENT",
          "EFFECTIVE COMMUNICATION",
          "STRATEGIC BUSINESS MANAGEMENT",
          "PROJECT MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      },
      {
        "courseTitle": "DIPLOMA IN LOGISTICS AND SUPPLY CHAIN MANAGEMENT(E-LEARNING)",
        "modules": [
          "LOGISTICS AND SUPPLY CHAIN MANAGEMENT",
          "PURCHASING SUPPLY CHAIN MANAGEMENT",
          "PHYSICAL DISTRIBUTION MANAGEMENT",
          "MANAGEMENT INFORMATION SYSTEMS",
          "WAREHOUSE MANAGEMENT",
          "ORGANIZATIONAL BEHAVIOUR"
        ]
      }
    ]
  }
];
