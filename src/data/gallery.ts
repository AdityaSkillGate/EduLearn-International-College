import { Locale } from '@/lib/i18n/types';

export type GalleryCategory = 'all' | 'campus' | 'classrooms' | 'learning' | 'events';

export interface GalleryMediaItem {
  id: string;
  category: 'campus' | 'classrooms' | 'learning' | 'events';
  title: Record<Locale, string>;
  caption: Record<Locale, string>;
  alt: Record<Locale, string>;
  src: string;
  aspectClass: string; // Tailwind aspect ratio class
  gridSpanClass: string; // Tailwind grid span for editorial variety
  tag: Record<Locale, string>;
  facilitySpecs: Record<Locale, string>;
}

export const GALLERY_MEDIA: GalleryMediaItem[] = [
  {
    id: 'media-campus-hub',
    category: 'campus',
    title: {
      en: 'Central Campus at New World Centre',
      'zh-sg': '新世界中心中央校区主环境',
      'ta-sg': 'நியூ வேர்ல்ட் சென்டர் மத்திய வளாகம்',
    },
    caption: {
      en: 'Edulearn International College campus entrance and collaborative student reception at 1 Jalan Berseh, #02-28 New World Centre, Singapore.',
      'zh-sg': '位于新加坡惹兰勿刹1号新世界中心#02-28的爱尔莱国际学院校区迎新与综合咨询大厅。',
      'ta-sg': '1 ஜலான் பெர்சே, #02-28 நியூ வேர்ல்ட் சென்டரில் உள்ள எடுலேர்ன் சர்வதேசக் கல்லூரி வளாகம்.',
    },
    alt: {
      en: 'Edulearn International College campus entrance and student advisory foyer at New World Centre Little India',
      'zh-sg': '爱尔莱国际学院新世界中心小印度校区入口及学生咨询大厅',
      'ta-sg': 'நியூ வேர்ல்ட் சென்டர் லிட்டில் இந்தியாவிலுள்ள எடுலேர்ன் சர்வதேசக் கல்லூரி வளாக நுழைவாயில்',
    },
    src: '/images/hero-campus.jpg',
    aspectClass: 'aspect-[16/9] sm:aspect-[21/9]',
    gridSpanClass: 'col-span-1 md:col-span-2 lg:col-span-3',
    tag: {
      en: 'Campus Environment',
      'zh-sg': '校区环境',
      'ta-sg': 'வளாக சூழல்',
    },
    facilitySpecs: {
      en: 'Central Little India Location • Jalan Besar MRT (3 mins walk) • Registered PEI Premises',
      'zh-sg': '小印度核心枢纽 • 步行3分钟至惹兰勿刹地铁站 • CPE法定注册校址',
      'ta-sg': 'லிட்டில் இந்தியா மையம் • ஜலான் பெர்சே MRT 3 நிமிட நடை • பதிவு செய்யப்பட்ட வளாகம்',
    },
  },
  {
    id: 'media-classroom-instructional',
    category: 'classrooms',
    title: {
      en: 'Lecture Classrooms 1 & 2',
      'zh-sg': '多媒体理论教学大课室（课室1与2）',
      'ta-sg': 'விரிவுரை வகுப்பறைகள் 1 & 2',
    },
    caption: {
      en: 'Fully air-conditioned instructional classroom configured with individual examination writing desks, acoustic soundproofing, and dual-projection presentation boards.',
      'zh-sg': '全空调实体教学课室，配备独立考试写字课桌椅、专业声学降噪及多媒体电子白板。',
      'ta-sg': 'குளிர்சாதன வசதி, தனிப்பட்ட தேர்வறை மேசைகள் மற்றும் மல்டிமீடியா ப்ரொஜெக்டர் கொண்ட வகுப்பறை.',
    },
    alt: {
      en: 'Lecture classroom 1 and 2 at Edulearn New World Centre with student study desks and instructor podium',
      'zh-sg': '爱尔莱国际学院新世界中心课室1与2内部写字课桌椅及教师讲台全貌',
      'ta-sg': 'மாணவர் மேசைகள் மற்றும் விரிவுரையாளர் மேடை கொண்ட வகுப்பறைகள் 1 & 2',
    },
    src: '/images/classroom-facilities.jpg',
    aspectClass: 'aspect-[4/3]',
    gridSpanClass: 'col-span-1 md:col-span-1 lg:col-span-1',
    tag: {
      en: 'Classroom Facilities',
      'zh-sg': '理论课室',
      'ta-sg': 'வகுப்பறை வசதிகள்',
    },
    facilitySpecs: {
      en: 'Capacity: 15 Students • 1:14 Ratio • bizSAFE Level 3 Audited',
      'zh-sg': '容量：15名学员 • 1:14小班上限 • bizSAFE 3级安全认证',
      'ta-sg': 'கொள்ளளவு: 15 மாணவர்கள் • 1:14 விகிதம் • bizSAFE நிலை 3 பாதுகாப்பு',
    },
  },
  {
    id: 'media-engineering-drafting-lab',
    category: 'learning',
    title: {
      en: 'Technical Engineering & CAD Drafting Bench',
      'zh-sg': '工程技术与建筑CAD绘图实训台',
      'ta-sg': 'பொறியியல் & வரைபட ஆய்வக மேடை',
    },
    caption: {
      en: 'Specialized structural drawing tables equipped with architectural blueprints, calipers, engineering scale rules, and BCA structural code reference manuals.',
      'zh-sg': '结构工程实训操作台，配备建筑工程蓝图、数显游标卡尺、工程专业比例尺及BCA建筑结构标准手册。',
      'ta-sg': 'கட்டடக்கலை வரைபடங்கள், அளவீட்டு கருவிகள் மற்றும் குறிப்பேடுகள் கொண்ட பொறியியல் ஆய்வகம்.',
    },
    alt: {
      en: 'Engineering students practical drafting workbench with structural blueprints and technical tools',
      'zh-sg': '工程技术实训绘图操作台，摆放结构蓝图与精密测量工具',
      'ta-sg': 'பொறியியல் வரைபடங்கள் மற்றும் அளவீட்டுக் கருவிகள் கொண்ட செய்முறை மேசை',
    },
    src: '/images/engineering-lab.jpg',
    aspectClass: 'aspect-[4/3] sm:aspect-[3/4]',
    gridSpanClass: 'col-span-1 md:col-span-1 lg:col-span-1',
    tag: {
      en: 'Learning Activities',
      'zh-sg': '技术实训',
      'ta-sg': 'கற்றல் செய்முறைகள்',
    },
    facilitySpecs: {
      en: 'Practical CAD & Structural Blueprints • Applied M&E Diagnostics',
      'zh-sg': 'CAD实务制图与施工蓝图分析 • 机电系统诊断实操',
      'ta-sg': 'CAD வரைபடப் பயிற்சி • மெக்கானிக்கல் & எலக்ட்ரிக்கல் ஆய்வுகள்',
    },
  },
  {
    id: 'media-it-computing-lab',
    category: 'learning',
    title: {
      en: 'IT Computing & Network Diagnostics Lab',
      'zh-sg': '计算机与网络架构实训机房',
      'ta-sg': 'கணினி & நெட்வொர்க் ஆய்வகம்',
    },
    caption: {
      en: 'Dedicated high-speed PC computing terminals for web development, system virtualization, network cabling diagnostics, and database querying modules.',
      'zh-sg': '专业电脑实训室，配备高速台式工作站、网络模拟器、局域网架构测试终端及数据库开发环境。',
      'ta-sg': 'வலை மேம்பாடு, நெட்வொர்க் மற்றும் தகவல் தொகுதி பயிற்சிக்கான கணினி முனையங்கள்.',
    },
    alt: {
      en: 'IT computer lab stations with dual-monitor developer setups and high-speed terminals',
      'zh-sg': '信息技术实训机房工作站，配备双屏显示与网络诊断工作台',
      'ta-sg': 'இரட்டைத் திரை கணினி முனையங்கள் கொண்ட தகவல் தொழில்நுட்ப ஆய்வகம்',
    },
    src: '/images/it-computer-lab.jpg',
    aspectClass: 'aspect-[4/3]',
    gridSpanClass: 'col-span-1 md:col-span-1 lg:col-span-1',
    tag: {
      en: 'Computing Lab',
      'zh-sg': '电脑机房',
      'ta-sg': 'கணினி ஆய்வகம்',
    },
    facilitySpecs: {
      en: 'Modern Workstations • High-Speed LAN & Wi-Fi • Dedicated Test Server',
      'zh-sg': '现代电脑终端 • 高速局域网与Wi-Fi • 独立测试服务器',
      'ta-sg': 'நவீன கணினிகள் • அதிவேக இணையம் • பிரத்யேக சோதனை சர்வர்',
    },
  },
  {
    id: 'media-executive-seminar-room',
    category: 'classrooms',
    title: {
      en: 'Executive Business & Management Seminar Suite',
      'zh-sg': '行政商务研讨课室与管理学讲堂',
      'ta-sg': 'வணிக மேலாண்மை கருத்தரங்கு அறை',
    },
    caption: {
      en: 'Flexible seminar configuration designed for postgraduate management case studies, construction contract negotiations, and collaborative peer breakout sessions.',
      'zh-sg': '专为研究生商业案例研讨、建筑合同条款法律推演及小组头脑风暴定制的模块化研讨课室。',
      'ta-sg': 'முதுகலை வணிக ஆய்வுகள் மற்றும் மாணவர் கலந்துரையாடல்களுக்கான நெகிழ்வான கருத்தரங்கு அறை.',
    },
    alt: {
      en: 'Executive business classroom setup with modern modular seminar desks and executive chairs',
      'zh-sg': '行政商务研讨课室现代化组合课桌与人体工学校具全景',
      'ta-sg': 'நவீன மேசைகள் கொண்ட வணிக மேலாண்மை கருத்தரங்கு வகுப்பறை',
    },
    src: '/images/business-classroom.jpg',
    aspectClass: 'aspect-[16/9] sm:aspect-[16/10]',
    gridSpanClass: 'col-span-1 md:col-span-2 lg:col-span-2',
    tag: {
      en: 'Executive Seminar',
      'zh-sg': '商务研讨',
      'ta-sg': 'வணிகக் கருத்தரங்கு',
    },
    facilitySpecs: {
      en: 'Capacity: 14 Students • Modular Cohort Layout • Ergonomic Seating',
      'zh-sg': '容量：14名学员 • 模块化研讨布局 • 人体工学舒适座椅',
      'ta-sg': 'கொள்ளளவு: 14 மாணவர்கள் • நெகிழ்வான வடிவமைப்பு • வசதியான இருக்கைகள்',
    },
  },
];
