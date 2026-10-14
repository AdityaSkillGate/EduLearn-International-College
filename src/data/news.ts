import { NewsArticle, ArticleCategory } from '@/types/news';

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'art-intakes-2026',
    slug: 'admissions-open-2026-diploma-advanced-diploma-intakes',
    category: 'admissions',
    status: 'published',
    featured: true,
    publishDate: '2026-01-15',
    displayDate: {
      en: '15 January 2026',
      'zh-sg': '2026年1月15日',
      'ta-sg': '15 ஜனவரி 2026',
    },
    author: 'Office of Admissions & Student Registry',
    readingTime: '3 min read',
    image: '/images/hero-campus.jpg',
    tags: ['Admissions', '2026 Intake', 'Engineering', 'Facilities Management', 'IT'],
    content: {
      en: {
        title: 'Admissions Open for 2026 Diploma & Advanced Diploma Intakes',
        summary: 'Enrolment applications are officially open for 2026 cohorts across Civil Engineering, Mechanical Engineering, Facilities Management, and Information Technology.',
        body: [
          'Edulearn International College (EIC) is pleased to announce that registrations are formally accepted for upcoming 2026 cohorts across our 13 Diploma and 5 Advanced Diploma academic programs. Designed specifically for ambitious adult learners, practicing technicians, and international students, courses are scheduled in flexible evening and weekend cohorts.',
          'To ensure close personal mentorship and rigorous learning outcomes, classroom cohort sizes at our New World Centre campus remain strictly capped at a 1:14 teacher-to-student ratio. Each program incorporates practical case studies aligned directly with Singapore industry benchmarks, including the Workplace Safety and Health Act and BCA green building standards.',
          'In compliance with Committee for Private Education (CPE) Enhanced Registration Framework guidelines, all matriculated students execute the Standard PEI-Student Contract Version 4.1. Tuition fees are payable in transparent monthly installments with no multi-year lock-in.',
          'Prospective candidates are invited to attend our upcoming intake orientation briefing at New World Centre or connect directly with our admissions advisors for preliminary entry qualification assessments.',
        ],
        altText: 'Edulearn students and faculty engaged in campus discussions at New World Centre',
      },
      'zh-sg': {
        title: '2026年度大专及高级大专文凭课程招生全面启动',
        summary: '土木工程、机械工程、设施管理及信息技术等21门注册文凭课程现已开放2026年度新生报名。',
        body: [
          '爱尔莱国际学院（EIC）正式启动2026年度学术课程招生工作，涵盖13门大专文凭与5门高级大专文凭专业。课程专为在职成人进修人士、工程技术人员及国际学员定制，提供灵活的夜间及周末面授班次。',
          '为保障高质量的师生互动与严谨的教学成果，新世界中心校区班级严格执行1:14师生比例上限。课程紧扣新加坡行业实务标准，融合工作场所安全法规与BCA绿色建筑前沿技术。',
          '根据私立教育理事会（CPE）强化注册架构规定，所有学员均统一签署4.1版标准学生合同。学费按月分期缴纳，免除大额预付款风险。',
          '欢迎有意报读学员参加即将举办的新生说明会，或联系招生顾问进行前置学历与工作经验审核。',
        ],
        altText: '爱尔莱国际学院新世界中心校区师生交流与课业研讨场景',
      },
      'ta-sg': {
        title: '2026 பட்டய & மேம்பட்ட பட்டயப் படிப்புகளுக்கான சேர்க்கை துவங்கியது',
        summary: 'சிவில் இன்ஜினியரிங், மெக்கானிக்கல், வசதிகள் மேலாண்மை மற்றும் தகவல் தொழில்நுட்பப் படிப்புகளுக்கான 2026 சேர்க்கை அதிகாரப்பூர்வமாகத் துவங்கியுள்ளது.',
        body: [
          'எடுலேர்ன் சர்வதேசக் கல்லூரி (EIC) தனது 13 பட்டயம் மற்றும் 5 மேம்பட்ட பட்டயப் படிப்புகளுக்கான 2026 புதிய சேர்க்கையைத் தொடங்கியுள்ளது. பணிபுரியும் தொழில் வல்லுநர்களுக்காக மாலை மற்றும் வார இறுதி வகுப்புகள் வழங்கப்படுகின்றன.',
          'தரமான கற்றலை உறுதிசெய்ய வகுப்பறை மாணவர்-ஆசிரியர் விகிதம் 1:14 என்ற அளவில் கண்டிப்பாகப் பராமரிக்கப்படுகிறது. பாடத்திட்டம் சிங்கப்பூர் தொழில்துறை பாதுகாப்புத் தரங்களுடன் ஒருங்கிணைக்கப்பட்டுள்ளது.',
          'CPE விதிகளின்படி மாணவர்கள் நிலையான மாணவர் ஒப்பந்தம் பதிப்பு 4.1 இல் கையெழுத்திடுகின்றனர். கட்டணங்கள் எளிய மாதாந்திர தவணைகளாக வசூலிக்கப்படுகின்றன.',
          'விருப்பமுள்ள மாணவர்கள் எங்கள் சேர்க்கை ஆலோசகர்களைத் தொடர்பு கொண்டு தகுதி வழிகாட்டலைப் பெறலாம்.',
        ],
        altText: 'எடுலேர்ன் வளாகத்தில் மாணவர்கள் மற்றும் விரிவுரையாளர்கள் கலந்தாய்வு',
      },
    },
    eventDetails: {
      eventDate: '2026-02-21',
      displayDate: {
        en: 'Saturday, 21 February 2026',
        'zh-sg': '2026年2月21日（星期六）',
        'ta-sg': 'சனிக்கிழமை, 21 பிப்ரவரி 2026',
      },
      time: '2:00 PM – 4:00 PM SGT',
      venue: 'Classroom 1, #02-28 New World Centre, 1 Jalan Berseh, Singapore 209037',
      registrationRequired: true,
      registrationNotice: {
        en: 'RSVP required via Admissions Desk or WhatsApp (+65 9004 9657) due to classroom capacity limits.',
        'zh-sg': '受教室座位上限限制，请通过招生专线或WhatsApp（+65 9004 9657）提前预约。',
        'ta-sg': 'வகுப்பறை இட வரம்பு காரணமாக WhatsApp (+65 9004 9657) மூலம் முன்பதிவு செய்வது அவசியம்.',
      },
    },
  },
  {
    id: 'art-bizsafe-renewal',
    slug: 'wshc-renews-bizsafe-level-3-certification',
    category: 'institutional',
    status: 'published',
    publishDate: '2025-11-10',
    displayDate: {
      en: '10 November 2025',
      'zh-sg': '2025年11月10日',
      'ta-sg': '10 நவம்பர் 2025',
    },
    author: 'Campus Health & Safety Committee',
    readingTime: '2 min read',
    image: '/images/classroom-facilities.jpg',
    tags: ['bizSAFE', 'WSHC', 'Campus Safety', 'Accreditation'],
    content: {
      en: {
        title: 'Workplace Safety & Health Council Renews bizSAFE Level 3 Certification',
        summary: 'Edulearn International College has successfully renewed its bizSAFE Level 3 accreditation following an independent campus risk management audit.',
        body: [
          'The Workplace Safety and Health Council (WSHC), operating under the purview of the Ministry of Manpower, has officially renewed Edulearn International College’s bizSAFE Level 3 certification.',
          'The accreditation follows a rigorous third-party risk management audit evaluating campus infrastructure, emergency egress routes, chemical storage protocols in engineering laboratories, and staff emergency preparedness across our facilities at New World Centre.',
          'As an educational institution delivering engineering and technical curricula, maintaining verified workplace safety standards is central to ensuring a secure learning environment for our faculty and student body.',
          'The College continues to integrate practical Risk Assessment (RA) methodologies directly into our Diploma in Construction Management and Facilities Management modules, instilling frontline safety consciousness in our graduates.',
        ],
        altText: 'Classroom facilities at Edulearn New World Centre adhering to bizSAFE safety standards',
      },
      'zh-sg': {
        title: '新加坡工作场所安全与卫生理事会续批 bizSAFE Level 3 安全认证',
        summary: '经第三方独立机构对新世界中心校区进行全面风险管理审计，学院顺利获批续期 bizSAFE Level 3 资质。',
        body: [
          '新加坡人力部下辖工作场所安全与卫生理事会（WSHC）已正式批准爱尔莱国际学院续展其 bizSAFE Level 3 企业安全资质。',
          '该认证基于严谨的第三方现场风险管理审查，全面评估了新世界中心校区的应急疏散通道、工程实训防护措施及全员应急响应机制。',
          '作为开设工程及设施管理文凭的专业学府，维持严格的法定安全标准是保障全体师生健康教学环境的基石。',
          '学院将继续将风险评估（RA）实战知识融入建筑施工管理及设施管理教学大纲，培育具备高标准安全素养的专业技术人才。',
        ],
        altText: '爱尔莱国际学院新世界中心符合bizSAFE三级认证的教学设施环境',
      },
      'ta-sg': {
        title: 'WSH கவுன்சில் எங்களின் bizSAFE நிலை 3 சான்றிதழைப் புதுப்பித்துள்ளது',
        summary: 'வளாக இடர் மேலாண்மை தணிக்கையை வெற்றிகரமாக முடித்த பிறகு கல்லூரி தனது bizSAFE நிலை 3 சான்றிதழைப் புதுப்பித்துள்ளது.',
        body: [
          'சிங்கப்பூர் மனிதவள அமைச்சகத்தின் கீழ் இயங்கும் பணியிட பாதுகாப்பு மற்றும் சுகாதார கவுன்சில் (WSHC), எடுலேர்ன் சர்வதேசக் கல்லூரியின் bizSAFE நிலை 3 சான்றிதழைப் புதுப்பித்துள்ளது.',
          'சுயாதீன இடர் மேலாண்மை தணிக்கை மூலம் வளாக உள்கட்டமைப்பு, அவசரகால வழிகள் மற்றும் பாதுகாப்பு நெறிமுறைகள் ஆய்வு செய்யப்பட்டு இந்த அங்கீகாரம் வழங்கப்பட்டது.',
          'பொறியியல் மற்றும் தொழில்நுட்பக் கல்வியை வழங்கும் நிறுவனம் என்ற வகையில், மாணவர்களுக்கான பாதுகாப்பான சூழலை உறுதிசெய்வது எங்கள் தலையாய கடமையாகும்.',
          'பாதுகாப்பு விழிப்புணர்வு நடைமுறைகள் கட்டுமான மேலாண்மை மற்றும் வசதிகள் மேலாண்மை பாடத்திட்டங்களில் தொடர்ந்து கற்பிக்கப்படுகின்றன.',
        ],
        altText: 'bizSAFE தரநிலைகளைப் பூர்த்தி செய்யும் எடுலேர்ன் வகுப்பறை உள்கட்டமைப்பு',
      },
    },
  },
  {
    id: 'art-convocation-recap',
    slug: 'annual-academic-graduation-diploma-conferment',
    category: 'events',
    status: 'published',
    publishDate: '2025-08-28',
    displayDate: {
      en: '28 August 2025',
      'zh-sg': '2025年8月28日',
      'ta-sg': '28 ஆகஸ்ட் 2025',
    },
    author: 'Academic Board Secretariat',
    readingTime: '3 min read',
    image: '/images/business-classroom.jpg',
    tags: ['Graduation', 'Convocation', 'Academic Excellence', 'Alumni'],
    content: {
      en: {
        title: 'Annual Academic Graduation & Diploma Conferment Ceremony',
        summary: 'Celebrating our graduating cohorts in Advanced Diplomas in Construction Management and Postgraduate Diplomas in M&E Control.',
        body: [
          'Edulearn International College celebrated the academic conferment of diplomas for our 2024/2025 graduating cohorts during our annual Graduation Ceremony held at New World Centre.',
          'Graduates received their official diplomas and transcripts, having completed rigorous six-month and twelve-month academic trajectories while balancing demanding professional responsibilities in Singapore’s built environment, marine, and IT sectors.',
          'Members of the Academic and Examination Boards commended the graduates for their resilience and commitment to lifelong skill upgrading, noting that several graduates have successfully transitioned into supervisory and project engineering roles.',
          'The College congratulates all graduates and warmly welcomes them into the EIC Alumni Network.',
        ],
        altText: 'Graduation convocation ceremony recognizing Edulearn diploma recipients',
      },
      'zh-sg': {
        title: '年度毕业典礼暨专业文凭授予仪式圆满落幕',
        summary: '表彰在建筑管理高级大专文凭与机电系统控制研究生文凭课程中圆满毕业的学员。',
        body: [
          '爱尔莱国际学院于新世界中心隆重举办2024/2025学年毕业典礼，向圆满结业的学员正式颁发毕业文凭与完整成绩单。',
          '本届毕业生在全职工作之余克服重重挑战，通过严谨的考核顺利结业，专业领域涵盖建筑工程、造船海事及信息系统维护。',
          '学术与考试委员会成员向毕业生致以诚挚祝贺，勉励大家秉持终身学习信念，将所学知识积极运用于新加坡基础设施建设与管理实务中。',
          '学院向全体毕业生表示热烈祝贺，并热烈欢迎各位加入爱尔莱校友联络网络。',
        ],
        altText: '爱尔莱国际学院大专文凭结业学员毕业典礼现场',
      },
      'ta-sg': {
        title: 'ஆண்டு பட்டமளிப்பு விழா & பட்டயச் சான்றிதழ் வழங்கும் நிகழ்வு',
        summary: 'கட்டுமான மேலாண்மை மற்றும் மெக்கானிக்கல் & எலக்ட்ரிக்கல் படிப்புகளில் தேர்ச்சி பெற்ற மாணவர்களுக்குப் பட்டங்கள் வழங்கப்பட்டன.',
        body: [
          'எடுலேர்ன் சர்வதேசக் கல்லூரி தனது 2024/2025 ஆண்டின் பட்டமளிப்பு விழாவை நியூ வேர்ல்ட் சென்டரில் சிறப்பாக நடத்தியது.',
          'சிங்கப்பூரின் கட்டுமான மற்றும் தொழில்நுட்பத் துறைகளில் பணிபுரிந்து கொண்டே படித்துத் தேறிய மாணவர்கள் தங்களின் பட்டயச் சான்றிதழ்களைப் பெற்றனர்.',
          'கல்வி மற்றும் தேர்வு வாரிய உறுப்பினர்கள் மாணவர்களின் விடாமுயற்சியைப் பாராட்டி, வாழ்நாள் கற்றலின் முக்கியத்துவத்தை வலியுறுத்தினர்.',
          'தேர்ச்சி பெற்ற அனைத்து மாணவர்களுக்கும் கல்லூரி நிர்வாகம் தனது மனமார்ந்த வாழ்த்துகளைத் தெரிவித்துக் கொள்கிறது.',
        ],
        altText: 'எடுலேர்ன் பட்டமளிப்பு விழாவில் சான்றிதழ் பெற்ற மாணவர்கள்',
      },
    },
    eventDetails: {
      eventDate: '2025-08-28',
      displayDate: {
        en: 'Thursday, 28 August 2025',
        'zh-sg': '2025年8月28日（星期四）',
        'ta-sg': 'வியாழக்கிழமை, 28 ஆகஸ்ட் 2025',
      },
      time: '10:00 AM – 1:00 PM SGT',
      venue: 'Auditorium Hall, New World Centre, 1 Jalan Berseh, Singapore 209037',
      registrationRequired: false,
    },
  },
  {
    id: 'art-cpe-erf-standing',
    slug: 'cpe-enhanced-registration-framework-erf-standing',
    category: 'institutional',
    status: 'published',
    publishDate: '2025-05-18',
    displayDate: {
      en: '18 May 2025',
      'zh-sg': '2025年5月18日',
      'ta-sg': '18 மே 2025',
    },
    author: 'Office of the College Director',
    readingTime: '2 min read',
    image: '/images/engineering-lab.jpg',
    tags: ['CPE', 'SSG', 'ERF', 'Governance', 'Statutory Compliance'],
    content: {
      en: {
        title: 'CPE Enhanced Registration Framework (ERF) Regulatory Standing',
        summary: 'Committee for Private Education reaffirms EIC institutional standing under registration UEN 201708935D.',
        body: [
          'Edulearn International College Pte. Ltd. reaffirms its statutory standing under the Enhanced Registration Framework (ERF) administered by the Committee for Private Education (CPE), a regulatory arm of SkillsFuture Singapore (SSG).',
          'Operating under UEN 201708935D, the College undergoes continuous audits covering corporate governance, academic board deployment, fee protection safeguards, and campus premises compliance.',
          'All 21 academic offerings listed in the college catalogue remain registered and accessible on the national Training Partners Gateway (TPGateway).',
          'We remain dedicated to transparent consumer safeguards, upholding the 7-day statutory cooling-off window and transparent fee collection schedules.',
        ],
        altText: 'Engineering practical lab facilities at Edulearn meeting CPE ERF regulatory standards',
      },
      'zh-sg': {
        title: '私立教育理事会（CPE）强化注册架构（ERF）法定资质公报',
        summary: '新加坡精深局下属私立教育理事会确认学院注册资格（UEN: 201708935D）与合规运营状态。',
        body: [
          '爱尔莱国际学院（EIC）重申其在新加坡精深技能发展局（SSG）私立教育理事会（CPE）强化注册架构（ERF）下的法定办学资质。',
          '学院严格依照 UEN: 201708935D 规范运营，持续接受有关学术治理结构、师资部署标准、学费保障机制及校区设施合规性的审计。',
          '学院目录所列的全部21门学术课程均在国家培训伙伴门户网（TPGateway）完成合法备案。',
          '我们将持续坚守透明诚信的消费者保护原则，严格贯彻7天法定冷静期与分期付款机制。',
        ],
        altText: '爱尔莱国际学院符合CPE强化注册架构标准的工程实训设施',
      },
      'ta-sg': {
        title: 'CPE மேம்பட்ட பதிவு கட்டமைப்பு (ERF) சட்டப்பூர்வ நிலை அறிக்கை',
        summary: 'தனியார் கல்வி ஆணையம் (CPE/SSG) UEN 201708935D இன் கீழ் கல்லூரியின் சட்டப்பூர்வ அங்கீகாரத்தை உறுதிப்படுத்தியுள்ளது.',
        body: [
          'எடுலேர்ன் சர்வதேசக் கல்லூரி ஸ்கில்ஸ்பியூச்சர் சிங்கப்பூரின் கீழ் இயங்கும் தனியார் கல்வி ஆணையத்தின் (CPE) ERF சட்டப்பூர்வ அங்கீகாரத்தைத் தக்கவைத்துள்ளது.',
          'UEN: 201708935D இன் கீழ் இயங்கும் கல்லூரி, நிர்வாக ஆளுமை மற்றும் ஆசிரியர் வரிசைப்படுத்தல் விதிமுறைகளை முழுமையாகப் பூர்த்தி செய்கிறது.',
          'எங்கள் 21 கல்விப் படிப்புகளும் தேசிய TPGateway போர்ட்டலில் பதிவு செய்யப்பட்டு அதிகாரப்பூர்வமாகச் சரிபார்க்கப்படலாம்.',
          'மாணவர்களின் கட்டணப் பாதுகாப்பு மற்றும் 7 நாள் மறுபரிசீலனை உரிமைகளை நாங்கள் தொடர்ந்து உறுதிசெய்கிறோம்.',
        ],
        altText: 'CPE தரநிலைகளைப் பூர்த்தி செய்யும் எடுலேர்ன் பொறியியல் ஆய்வகம்',
      },
    },
  },
  {
    id: 'art-green-building-curriculum',
    slug: 'academic-board-modernizes-green-building-curriculum',
    category: 'academic',
    status: 'published',
    publishDate: '2025-03-12',
    displayDate: {
      en: '12 March 2025',
      'zh-sg': '2025年3月12日',
      'ta-sg': '12 மார்ச் 2025',
    },
    author: 'Academic & Examination Board',
    readingTime: '3 min read',
    image: '/images/it-computer-lab.jpg',
    tags: ['Curriculum', 'Green Building', 'Facilities Management', 'BCA'],
    content: {
      en: {
        title: 'Academic Board Modernizes Green Building & Sustainable Facilities Modules',
        summary: 'Module syllabi in Facilities Management and Civil Engineering updated to align with the Singapore Green Building Masterplan.',
        body: [
          'Following its annual curriculum review, the Edulearn Academic and Examination Board has approved enhancements to the Diploma in Facilities Management and Diploma in Civil Engineering programs.',
          'The updated syllabi incorporate contemporary case studies addressing energy optimization, Building Management Systems (BMS), predictive HVAC maintenance, and sustainable materials matching BCA Green Mark 2021 standards.',
          'These additions ensure graduates possess competitive technical knowledge directly applicable to Singapore’s decarbonization targets and smart facility operations.',
          'The enhanced modules take immediate effect across all incoming cohorts without any changes to course fees or graduation requirements.',
        ],
        altText: 'Computer lab students analyzing digital building management systems and green building simulations',
      },
      'zh-sg': {
        title: '学术委员会审定升级绿色建筑与智能设施管理核心模块',
        summary: '设施管理大专与土木工程大专大纲紧密对接《新加坡绿色建筑总体规划》与节能减排标杆。',
        body: [
          '在完成年度课程学术评审后，爱尔莱国际学院学术与考试委员会正式审定并批准了设施管理大专与土木工程大专的课程大纲升级方案。',
          '新大纲全面融入楼宇能源优化、建筑设备自动化管理（BMS）、暖通空调智能维保及符合新加坡建设局（BCA）Green Mark标准的环保建材实践。',
          '此项改进确保毕业学员掌握直接契合新加坡智慧城市发展与双碳目标的实战技术能力。',
          '升级后的教学内容即日起对新入学 cohort 生效，不产生任何额外学费变动。',
        ],
        altText: '学员在计算机实训室内进行智慧楼宇管理系统与绿色建材数据模拟分析',
      },
      'ta-sg': {
        title: 'கல்வி வாரியம் பசுமைக் கட்டிடம் & வசதிகள் மேலாண்மைப் பாடங்களை மேம்படுத்துகிறது',
        summary: 'சிங்கப்பூர் பசுமைக் கட்டிடத் திட்டத்திற்கு இணங்க வசதிகள் மேலாண்மை மற்றும் சிவில் இன்ஜினியரிங் பாடத்திட்டங்கள் புதுப்பிக்கப்பட்டுள்ளன.',
        body: [
          'எடுலேர்ன் கல்வி மற்றும் தேர்வு வாரியம் வசதிகள் மேலாண்மை மற்றும் சிவில் இன்ஜினியரிங் பட்டயப் படிப்புகளுக்கான பாடத்திட்டப் புதுப்பித்தலுக்கு ஒப்புதல் அளித்துள்ளது.',
          'ஆற்றல் மேலாண்மை, தானியங்கி கட்டிட அமைப்புகள் (BMS) மற்றும் சிங்கப்பூர் BCA Green Mark 2021 விதிமுறைகள் புதிய பாடத்திட்டத்தில் சேர்க்கப்பட்டுள்ளன.',
          'இந்த மேம்பாடுகள் எங்கள் மாணவர்கள் நவீன ஸ்மார்ட் வசதிகள் மேலாண்மைத் துறையில் முன்னணி நிபுணர்களாகத் திகழ உதவும்.',
          'புதிய பாடத்திட்டம் அனைத்து புதிய மாணவர் குழுக்களுக்கும் உடனடியாக அமலுக்கு வருகிறது.',
        ],
        altText: 'கணினி ஆய்வகத்தில் பசுமைக் கட்டிட உருவகப்படுத்துதலைக் கற்கும் எடுலேர்ன் மாணவர்கள்',
      },
    },
  },
  {
    id: 'art-draft-ai-diploma',
    slug: 'draft-specialist-diploma-in-artificial-intelligence',
    category: 'academic',
    status: 'draft', // DRAFT: Must NEVER be published or generated
    publishDate: '2026-06-01',
    displayDate: {
      en: '1 June 2026 (Draft)',
      'zh-sg': '2026年6月1日（草稿）',
      'ta-sg': '1 ஜூன் 2026 (வரைவு)',
    },
    author: 'Curriculum Working Group',
    readingTime: '2 min read',
    image: '/images/it-computer-lab.jpg',
    tags: ['Draft', 'AI', 'Internal'],
    content: {
      en: {
        title: 'DRAFT: Specialist Diploma in Applied AI for Built Environment',
        summary: 'Internal review draft for upcoming specialist curriculum filing with CPE.',
        body: ['This is an internal unapproved draft. It must remain unpublished.'],
        altText: 'Draft image',
      },
      'zh-sg': {
        title: '草稿：建筑环境应用人工智能专业文凭',
        summary: '内部课程提议草案，尚未经CPE审批。',
        body: ['此文为内部草稿，绝不对外发布。'],
        altText: '草稿图像',
      },
      'ta-sg': {
        title: 'வரைவு: செயற்கை நுண்ணறிவு சிறப்புப் பட்டயம்',
        summary: 'உள் மதிப்பாய்வு வரைவு. வெளியிடப்படவில்லை.',
        body: ['இது ஒரு உள் வரைவு மட்டுமே.'],
        altText: 'வரைவு படம்',
      },
    },
  },
];

/* Helper queries guaranteeing only published articles are served */
export function getPublishedArticles(): NewsArticle[] {
  return NEWS_ARTICLES.filter((art) => art.status === 'published');
}

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((art) => art.slug === slug && art.status === 'published');
}

export function getFeaturedArticle(): NewsArticle | undefined {
  return NEWS_ARTICLES.find((art) => art.featured && art.status === 'published') || getPublishedArticles()[0];
}

export function getRelatedArticles(currentSlug: string, category: ArticleCategory, limit: number = 3): NewsArticle[] {
  return getPublishedArticles()
    .filter((art) => art.slug !== currentSlug)
    .sort((a, b) => (a.category === category ? -1 : 1))
    .slice(0, limit);
}

export function getVerifiedEvents(): NewsArticle[] {
  return getPublishedArticles().filter((art) => art.eventDetails !== undefined);
}
