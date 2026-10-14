'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n/types';
import { Maximize2, X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  caption: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  src: string;
  category: 'classroom' | 'lab' | 'executive';
  tag: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'classroom-1',
    title: {
      en: 'Lecture Classroom 1 & 2',
      'zh-sg': '教学大课室（课室1与课室2）',
      'ta-sg': 'விரிவுரை வகுப்பறைகள் 1 & 2',
    },
    caption: {
      en: 'Air-conditioned instructional classroom configured with individual writing desks, teaching podium, and presentation boards.',
      'zh-sg': '全空调实体教学大课室，配备独立写字课桌椅、教师讲台与多媒体演示白板。',
      'ta-sg': 'குளிர்சாதன வசதியுடன் கூடிய விரிவுரை வகுப்பறை, எழுதும் மேசைகள் மற்றும் ஒயிட்போர்டு.',
    },
    src: '/images/classroom-facilities.jpg',
    category: 'classroom',
    tag: {
      en: 'Classroom',
      'zh-sg': '标准课室',
      'ta-sg': 'வகுப்பறை',
    },
  },
  {
    id: 'engineering-lab',
    title: {
      en: 'Technical Engineering & Drafting Lab',
      'zh-sg': '工程技术与制图实训台',
      'ta-sg': 'பொறியியல் & வரைபட ஆய்வகம்',
    },
    caption: {
      en: 'Dedicated drawing benches equipped with architectural blueprints, calipers, technical drafting tools, and calculation guides.',
      'zh-sg': '工程专业绘图台，配备建筑工程蓝图、游标卡尺、工程制图尺具与结构计算规范。',
      'ta-sg': 'பொறியியல் வரைபடங்கள், அளவீட்டு கருவிகள் மற்றும் தொழில்நுட்ப சாதனங்களுடன் கூடிய ஆய்வகம்.',
    },
    src: '/images/engineering-lab.jpg',
    category: 'lab',
    tag: {
      en: 'Laboratory',
      'zh-sg': '专业实训台',
      'ta-sg': 'ஆய்வகம்',
    },
  },
  {
    id: 'computer-lab',
    title: {
      en: 'IT Computing & Network Lab',
      'zh-sg': '计算机与网络实训机房',
      'ta-sg': 'கணினி & நெட்வொர்க் ஆய்வகம்',
    },
    caption: {
      en: 'Interactive computer stations featuring desktop terminals, network infrastructure monitors, and high-speed Wi-Fi.',
      'zh-sg': '实训电脑室配备台式机工作站、网络模拟器、局域网测试终端与高速无线网络。',
      'ta-sg': 'கணினி முனையங்கள், நெட்வொர்க் அமைப்புகள் மற்றும் அதிவேக இணைய வசதி கொண்ட ஆய்வகம்.',
    },
    src: '/images/it-computer-lab.jpg',
    category: 'lab',
    tag: {
      en: 'Computing',
      'zh-sg': '电脑机房',
      'ta-sg': 'கணினி மையம்',
    },
  },
  {
    id: 'business-seminar',
    title: {
      en: 'Executive Business Seminar Room',
      'zh-sg': '行政商务研讨课室',
      'ta-sg': 'வணிக கருத்தரங்கு அறை',
    },
    caption: {
      en: 'Modern seminar layout for postgraduate management case studies, leadership presentations, and peer discussions.',
      'zh-sg': '现代商务研讨室，用于研究生与商业大专案例分析、企业战略推演与团队汇报。',
      'ta-sg': 'முதுகலை வணிக ஆய்வுகள் மற்றும் விளக்கக்காட்சிகளுக்கான நவீன கருத்தரங்கு அறை.',
    },
    src: '/images/business-classroom.jpg',
    category: 'executive',
    tag: {
      en: 'Executive',
      'zh-sg': '行政研讨',
      'ta-sg': 'நிர்வாக அறை',
    },
  },
  {
    id: 'campus-collaboration',
    title: {
      en: 'Campus Learning & Consultation Space',
      'zh-sg': '校区学习辅导与交流中心',
      'ta-sg': 'வளாக கற்றல் & ஆலோசனை மையம்',
    },
    caption: {
      en: 'Collaborative student consultation lounge for one-on-one academic mentoring and pre-exam revisions.',
      'zh-sg': '课后学习与师生答疑空间，支持小组讨论、考前辅导及一对一学业咨询。',
      'ta-sg': 'ஆசிரியர்களுடன் கலந்துரையாட மற்றும் தேர்வு தயாரிப்பிற்கான கற்றல் மையம்.',
    },
    src: '/images/hero-campus.jpg',
    category: 'classroom',
    tag: {
      en: 'Campus Area',
      'zh-sg': '校区公共区',
      'ta-sg': 'வளாக பகுதி',
    },
  },
];

interface FacilityGalleryProps {
  locale: Locale;
}

export function FacilityGallery({ locale }: FacilityGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'classroom' | 'lab' | 'executive'>('all');
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const categories = [
    { id: 'all', en: 'All Photos', 'zh-sg': '全部照片', 'ta-sg': 'அனைத்து படங்கள்' },
    { id: 'classroom', en: 'Classrooms', 'zh-sg': '教学课室', 'ta-sg': 'வகுப்பறைகள்' },
    { id: 'lab', en: 'Technical Labs', 'zh-sg': '实训实验台', 'ta-sg': 'தொழில்நுட்ப ஆய்வகங்கள்' },
    { id: 'executive', en: 'Executive Suites', 'zh-sg': '行政研讨室', 'ta-sg': 'நிர்வாக அறைகள்' },
  ];

  const handleOpenModal = (index: number) => {
    setActiveModalIndex(index);
  };

  const handleCloseModal = () => {
    setActiveModalIndex(null);
  };

  const handleNext = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const label = cat[locale] || cat.en;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as typeof selectedCategory)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-navy-900 text-white shadow-xs ring-1 ring-navy-900'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => {
          const title = item.title[locale] || item.title.en;
          const caption = item.caption[locale] || item.caption.en;

          return (
            <div
              key={item.id}
              onClick={() => handleOpenModal(idx)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="relative h-56 sm:h-60 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={item.src}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white/90 text-navy-950 shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/60 text-white backdrop-blur-sm">
                    {item.tag[locale] || item.tag.en}
                  </span>
                </div>
              </div>

              {/* Caption Card */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-navy-950 group-hover:text-gold-700 transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {caption}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {locale === 'zh-sg' ? '已核验教学设施' : locale === 'ta-sg' ? 'சரிபார்க்கப்பட்ட வசதி' : 'Verified Facility'}
                  </span>
                  <span className="text-navy-900 group-hover:text-gold-700 font-medium inline-flex items-center gap-1">
                    {locale === 'zh-sg' ? '放大查看' : locale === 'ta-sg' ? 'பெரிதாக்குக' : 'Enlarge Photo'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeModalIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-4xl w-full bg-navy-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
              aria-label={locale === 'zh-sg' ? '关闭照片预览' : locale === 'ta-sg' ? 'படத்தை மூடுக' : 'Close photo preview'}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-[55vh] sm:h-[65vh] w-full bg-slate-950">
              <Image
                src={filteredItems[activeModalIndex].src}
                alt={filteredItems[activeModalIndex].title[locale] || filteredItems[activeModalIndex].title.en}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />

              {/* Prev / Next buttons */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
                    aria-label={locale === 'zh-sg' ? '上一张照片' : locale === 'ta-sg' ? 'முந்தைய படம்' : 'Previous photo'}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
                    aria-label={locale === 'zh-sg' ? '下一张照片' : locale === 'ta-sg' ? 'அடுத்த படம்' : 'Next photo'}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Caption */}
            <div className="p-5 sm:p-6 bg-navy-900 border-t border-white/10 text-white">
              <div className="flex items-center justify-between text-xs text-gold-400 mb-1">
                <span>{filteredItems[activeModalIndex].tag[locale] || filteredItems[activeModalIndex].tag.en}</span>
                <span>
                  {activeModalIndex + 1} / {filteredItems.length}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                {filteredItems[activeModalIndex].title[locale] || filteredItems[activeModalIndex].title.en}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {filteredItems[activeModalIndex].caption[locale] || filteredItems[activeModalIndex].caption.en}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
