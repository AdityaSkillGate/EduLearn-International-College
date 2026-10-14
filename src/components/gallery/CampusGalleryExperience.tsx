'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/types';
import { GalleryMediaItem, GalleryCategory, GALLERY_MEDIA } from '@/data/gallery';
import { Badge, Button } from '@/components/ui';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Info,
  Camera,
} from 'lucide-react';

interface CampusGalleryExperienceProps {
  locale: Locale;
}

const UI_STRINGS = {
  en: {
    photoCount: (count: number) => `${count} ${count === 1 ? 'Photograph' : 'Photographs'}`,
    emptyTitle: 'Ceremonial & Event Photo Albums',
    emptyDesc: 'Photographs of annual convocation ceremonies and student orientations are preserved directly within their official dispatches to ensure date and cohort authenticity.',
    browseDispatches: 'Browse Convocation Dispatches',
    viewAllFacilities: 'View All Campus Facilities',
    viewEnlarged: 'View enlarged photograph:',
    closeLightbox: 'Close image lightbox (Escape)',
    prevPhoto: 'Previous photograph (Left arrow)',
    nextPhoto: 'Next photograph (Right arrow)',
    keyboardHelp: 'Keyboard shortcuts: ← / → / Esc',
  },
  'zh-sg': {
    photoCount: (count: number) => `共收录 ${count} 张官方实景摄影`,
    emptyTitle: '典礼与活动摄影影集',
    emptyDesc: '历届毕业典礼及新生开学指导摄影集已归档至对应的新闻专栏，以确保日期与批次真实权威。',
    browseDispatches: '浏览毕业典礼纪实报道',
    viewAllFacilities: '查看全院教学设施',
    viewEnlarged: '查看放大原图：',
    closeLightbox: '关闭大图预览 (Escape)',
    prevPhoto: '上一张照片 (左方向键)',
    nextPhoto: '下一张照片 (右方向键)',
    keyboardHelp: '键盘快捷键：← / → / Esc',
  },
  'ta-sg': {
    photoCount: (count: number) => `${count} அதிகாரப்பூர்வ புகைப்படங்கள்`,
    emptyTitle: 'பட்டமளிப்பு & நிகழ்வு புகைப்படத் தொகுப்பு',
    emptyDesc: 'ஆண்டு பட்டமளிப்பு விழா மற்றும் மாணவர் வழிகாட்டல் புகைப்படங்கள் தேதி நம்பகத்தன்மையை உறுதி செய்ய செய்திகள் பகுதியில் பாதுகாக்கப்படுகின்றன.',
    browseDispatches: 'பட்டமளிப்புச் செய்திகளைக் காண்க',
    viewAllFacilities: 'அனைத்து வளாக வசதிகளையும் காண்க',
    viewEnlarged: 'பெரிதாக்கப்பட்ட படத்தைக் காண்க:',
    closeLightbox: 'மூடவும் (Escape)',
    prevPhoto: 'முந்தைய படம் (இடது அம்பு)',
    nextPhoto: 'அடுத்த படம் (வலது அம்பு)',
    keyboardHelp: 'விசைப்பலகை குறுக்குவழிகள்: ← / → / Esc',
  },
};

export const CampusGalleryExperience: React.FC<CampusGalleryExperienceProps> = ({ locale }) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const t = UI_STRINGS[locale] || UI_STRINGS.en;

  // Focus restoration ref (Task 5)
  const triggerRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const lightboxCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  // Touch swipe support on mobile
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const categories: Array<{ id: GalleryCategory; label: Record<Locale, string> }> = [
    {
      id: 'all',
      label: {
        en: 'All Facilities & Spaces',
        'zh-sg': '全景设施与空间',
        'ta-sg': 'அனைத்து வளாக இடங்கள்',
      },
    },
    {
      id: 'campus',
      label: {
        en: 'Campus & Location',
        'zh-sg': '校区环境与区位',
        'ta-sg': 'வளாக சூழல் & இடம்',
      },
    },
    {
      id: 'classrooms',
      label: {
        en: 'Lecture Classrooms & Seminars',
        'zh-sg': '实体理论大课室与研讨室',
        'ta-sg': 'வகுப்பறைகள் & கருத்தரங்கு',
      },
    },
    {
      id: 'learning',
      label: {
        en: 'Technical Labs & Practical Suites',
        'zh-sg': '技术实训操作台与机房',
        'ta-sg': 'தொழில்நுட்ப ஆய்வகங்கள்',
      },
    },
    {
      id: 'events',
      label: {
        en: 'Academic Ceremonies & Events',
        'zh-sg': '学术典礼与活动',
        'ta-sg': 'கல்வி நிகழ்வுகள் & விழாக்கள்',
      },
    },
  ];

  // Filter items
  const filteredItems = selectedCategory === 'all'
    ? GALLERY_MEDIA
    : GALLERY_MEDIA.filter((item) => item.category === selectedCategory);

  // Open Lightbox
  const handleOpenLightbox = (index: number, id: string) => {
    setLightboxIndex(index);
  };

  // Close Lightbox
  const handleCloseLightbox = useCallback(() => {
    if (lightboxIndex !== null) {
      const currentItem = filteredItems[lightboxIndex];
      setLightboxIndex(null);
      // Restore focus to opening button (Task 5)
      if (currentItem && triggerRefs.current[currentItem.id]) {
        setTimeout(() => {
          triggerRefs.current[currentItem.id]?.focus();
        }, 50);
      }
    }
  }, [filteredItems, lightboxIndex]);

  // Navigate next / prev in lightbox
  const handleNext = useCallback(() => {
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((prev) => ((prev ?? 0) + 1) % filteredItems.length);
    }
  }, [filteredItems.length, lightboxIndex]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((prev) => ((prev ?? 0) - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [filteredItems.length, lightboxIndex]);

  // Prevent background scrolling while lightbox is active (Task 4)
  useEffect(() => {
    if (lightboxIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus close button on open
      setTimeout(() => {
        lightboxCloseBtnRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lightboxIndex]);

  // Keyboard navigation inside lightbox (Task 3)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseLightbox();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCloseLightbox, handleNext, handlePrev, lightboxIndex]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const activeMedia = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="space-y-8">
      {/* Category Filter Pills (Task 2) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Campus Media Categories">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                  isActive
                    ? 'bg-navy-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-navy-950 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label[locale] || cat.label.en}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 font-mono">
          {t.photoCount(filteredItems.length)}
        </div>
      </div>

      {/* Polished Empty State for Categories Without Standalone Assets (Task 10) */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 max-w-2xl mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/15 text-gold-700 flex items-center justify-center mx-auto">
            <Camera className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-serif font-bold text-xl text-navy-950">
              {t.emptyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              {t.emptyDesc}
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              href={`/${locale}/news/`}
              variant="primary"
              size="sm"
              iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
            >
              {t.browseDispatches}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              {t.viewAllFacilities}
            </Button>
          </div>
        </div>
      ) : (
        /* Responsive Editorial Grid with Mix of Landscape and Portrait (Task 1, 6, 7, 8) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`group flex flex-col justify-between overflow-hidden bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all ${item.gridSpanClass}`}
              >
                {/* Image Container with Fixed Aspect Ratio to avoid CLS (Task 6) */}
                <div className={`relative w-full overflow-hidden bg-slate-100 ${item.aspectClass}`}>
                  <Image
                    src={item.src}
                    alt={item.alt[locale] || item.alt.en}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Gentle hover overlay with enlarge trigger */}
                  <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-navy-950/40 transition-colors flex items-center justify-center pointer-events-none">
                    <button
                      ref={(el) => {
                        triggerRefs.current[item.id] = el;
                      }}
                      type="button"
                      onClick={() => handleOpenLightbox(index, item.id)}
                      aria-label={`${t.viewEnlarged} ${item.title[locale] || item.title.en}`}
                      className="pointer-events-auto opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity p-3 rounded-full bg-navy-950/80 hover:bg-gold-500 hover:text-navy-950 text-white shadow-prestige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                    >
                      <Maximize2 className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="navy" className="text-[10px] font-bold shadow-xs">
                      {item.tag[locale] || item.tag.en}
                    </Badge>
                  </div>
                </div>

                {/* Editorial Caption Bar */}
                <div className="p-5 space-y-2 border-t border-slate-100">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif font-bold text-base text-navy-950 leading-snug">
                      {item.title[locale] || item.title.en}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleOpenLightbox(index, item.id)}
                      className="text-slate-400 hover:text-gold-600 transition-colors p-1 -mr-1"
                      aria-label={`${t.viewEnlarged} ${item.title[locale] || item.title.en}`}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-2">
                    {item.caption[locale] || item.caption.en}
                  </p>

                  <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                    {item.facilitySpecs[locale] || item.facilitySpecs.en}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Accessible Fullscreen Lightbox Modal (Task 3, 4, 5) */}
      {lightboxIndex !== null && activeMedia && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${t.viewEnlarged} ${activeMedia.title[locale] || activeMedia.title.en}`}
          className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 overflow-hidden animate-in fade-in duration-200"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between text-white z-10 py-1 border-b border-navy-800">
            <div className="flex items-center gap-3">
              <Badge variant="gold" className="text-[10px]">
                {activeMedia.tag[locale] || activeMedia.tag.en}
              </Badge>
              <span className="text-xs text-slate-300 font-mono hidden sm:inline">
                {activeMedia.title[locale] || activeMedia.title.en}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">
                {lightboxIndex + 1} of {filteredItems.length}
              </span>

              {/* Close Button */}
              <button
                ref={lightboxCloseBtnRef}
                type="button"
                onClick={handleCloseLightbox}
                aria-label={t.closeLightbox}
                className="p-2 rounded-full bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Central Image Showcase & Navigation */}
          <div className="relative flex-1 flex items-center justify-center my-3 min-h-0">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label={t.prevPhoto}
              className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-navy-900/80 hover:bg-gold-500 hover:text-navy-950 text-white transition-colors backdrop-blur-sm border border-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            </button>

            {/* Main Lightbox Image */}
            <div className="relative w-full h-full max-w-5xl max-h-[70vh] flex items-center justify-center">
              <Image
                src={activeMedia.src}
                alt={activeMedia.alt[locale] || activeMedia.alt.en}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1280px"
                className="object-contain rounded-lg"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label={t.nextPhoto}
              className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-navy-900/80 hover:bg-gold-500 hover:text-navy-950 text-white transition-colors backdrop-blur-sm border border-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            </button>
          </div>

          {/* Bottom Captions & Specifications Panel */}
          <div className="bg-navy-900/90 border border-navy-800 rounded-2xl p-4 sm:p-5 text-white max-w-4xl mx-auto w-full space-y-1.5 shadow-lg">
            <h4 className="font-serif font-bold text-base sm:text-lg text-gold-400">
              {activeMedia.title[locale] || activeMedia.title.en}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {activeMedia.caption[locale] || activeMedia.caption.en}
            </p>
            <div className="pt-1.5 border-t border-navy-800 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <span>{activeMedia.facilitySpecs[locale] || activeMedia.facilitySpecs.en}</span>
              <span className="text-slate-500">{t.keyboardHelp}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
