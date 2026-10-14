'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { Container, SectionHeading, Badge, Button } from '@/components/ui';
import { ScrollReveal } from '@/lib/motion';

interface CampusGalleryProps {
  locale: Locale;
  dict: Dictionary;
}

const GALLERY_CARDS = [
  {
    title: 'Collaborative Engineering Seminars',
    category: 'Classroom 1 Suite',
    image: '/images/hero-campus.jpg',
    alt: 'Edulearn students analyzing civil and mechanical engineering designs around conference tables in Singapore',
    desc: 'Intimate cohort discussions examining structural plans and construction management methodologies.',
  },
  {
    title: 'Modern Seminar Learning Facility',
    category: 'Classroom 2 Suite',
    image: '/images/classroom-facilities.jpg',
    alt: 'Modern interactive seminar room at New World Centre with students working on laptops and drafting models',
    desc: 'Equipped with presentation screens, oakwood finishes, and individual workstation ports for adult learners.',
  },
  {
    title: 'Technical Workstations & IT Lab',
    category: 'Applied Diagnostics',
    image: '/images/classroom-facilities.jpg',
    alt: 'Workstations configured for software engineering and technical drafting at Edulearn Singapore',
    desc: 'Hands-on CAD drafting practice and database management tutorials.',
  },
  {
    title: 'Admissions & Academic Advising',
    category: 'New World Centre #02-28',
    image: '/images/hero-campus.jpg',
    alt: 'Student affairs and admissions advisory suite at Edulearn International College Singapore',
    desc: 'Personalized course counseling and Standard PEI-Student Contract guidance.',
  },
];

export const CampusGallery: React.FC<CampusGalleryProps> = ({ locale, dict }) => {
  const railRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollLeft = () => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: -340, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  const scrollRight = () => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: 340, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section aria-labelledby="campus-gallery-heading" className="py-16 sm:py-20 bg-slate-50 overflow-hidden">
      <Container size="default" className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeading
            id="campus-gallery-heading"
            eyebrow="Campus Environment"
            title="Learning Moments & Facilities Gallery"
            description="Take a visual tour of our lecture rooms, practical tutorials, and student engagement at New World Centre."
          />

          {/* Accessible Scroll Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Scroll gallery left"
              className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-navy-950 hover:bg-slate-100 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll gallery right"
              className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-navy-950 hover:bg-slate-100 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Accessible Horizontal Image Rail */}
        <div
          ref={railRef}
          tabIndex={0}
          role="region"
          aria-label="Campus photos carousel. Use arrow buttons or scroll horizontally."
          className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-xl"
        >
          {GALLERY_CARDS.map((item, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.06}
              className="w-[290px] sm:w-[340px] shrink-0 snap-start bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden bg-navy-900">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={680}
                  height={382}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 motion-reduce:group-hover:scale-100 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="navy" className="text-[10px] shadow-sm">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-navy-950 group-hover:text-royal-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1.5 font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Little India Campus</span>
                  <Link
                    href={`/${locale}/gallery/`}
                    className="text-royal-600 hover:text-royal-700 font-semibold inline-flex items-center gap-1 group-hover:underline"
                  >
                    <span>View More</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center pt-2">
          <Button
            href={`/${locale}/gallery/`}
            variant="outline"
            iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
          >
            Explore Complete Campus Tour & Photo Gallery
          </Button>
        </div>
      </Container>
    </section>
  );
};
