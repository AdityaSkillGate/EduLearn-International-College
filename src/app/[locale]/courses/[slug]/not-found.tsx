import React from 'react';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import { BookOpen, SearchX, ArrowLeft, ArrowRight } from 'lucide-react';

export default function CourseNotFound() {
  return (
    <div className="py-20 bg-slate-50 min-h-[600px] flex items-center justify-center">
      <Container size="narrow" className="text-center">
        <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-6 shadow-sm border border-amber-200">
          <SearchX className="w-10 h-10" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-gold-700 block mb-2">
          Course Catalog Notice
        </span>

        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-navy-950 mb-4">
          Course Not Found
        </h1>

        <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
          The requested program could not be located in our official academic prospectus. It may have been updated,
          or the URL was mistyped.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/en/courses"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-900 text-white rounded-xl text-xs font-bold hover:bg-navy-800 transition-colors shadow-md"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse All 21 Programs</span>
          </Link>
          <Link
            href="/en"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        {/* Quick Links to Categories */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-xs text-slate-500">
          <span className="block font-medium text-navy-900 mb-3">Explore Official Faculty Portals:</span>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/en/courses/diploma" className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-navy-900 text-navy-900 transition-colors">
              Diplomas (13)
            </Link>
            <Link href="/en/courses/advanced-diploma" className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-navy-900 text-navy-900 transition-colors">
              Advanced Diplomas (5)
            </Link>
            <Link href="/en/courses/short-term" className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-navy-900 text-navy-900 transition-colors">
              Short-Term Modular (5)
            </Link>
            <Link href="/en/courses/postgraduate-diploma" className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-navy-900 text-navy-900 transition-colors">
              Postgraduate Diplomas (2)
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
