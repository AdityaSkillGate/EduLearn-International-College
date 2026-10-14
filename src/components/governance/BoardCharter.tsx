'use client';

import React, { useState } from 'react';
import { Locale } from '@/lib/i18n';
import { ACADEMIC_BOARD, EXAMINATION_BOARD, BoardCharter as BoardCharterType } from '@/data/governance';
import { Card, CardContent, Badge } from '@/components/ui';
import { ShieldCheck, Scale, CheckCircle2, UserCheck, BookOpen, FileCheck } from 'lucide-react';

interface BoardCharterProps {
  locale: Locale;
}

const UI_STRINGS = {
  en: {
    mandateTitle: 'Statutory Governance Charters (CPE Mandate):',
    bothBoards: 'Both Boards (Overview)',
    academicBoard: 'Academic Board',
    examinationBoard: 'Examination Board',
    academicBadge: 'Pedagogical Standards',
    examBadge: 'Assessment Integrity',
    termsOfReference: 'Statutory Terms of Reference',
    cpeResponsibilities: 'Documented CPE Responsibilities',
    boardMembers: 'Appointed Board Members',
    annualReview: 'Annual Policy Review Mandated',
    regNo: 'CPE Reg No: 201708935D',
  },
  'zh-sg': {
    mandateTitle: '法定治理章程（CPE 法定职责）：',
    bothBoards: '双委员会（综合概览）',
    academicBoard: '学术委员会',
    examinationBoard: '考试委员会',
    academicBadge: '教学与学术标准',
    examBadge: '考试与评估诚信',
    termsOfReference: '法定职权范围与章程',
    cpeResponsibilities: 'CPE 备案法定管理职责',
    boardMembers: '已任命委员会成员',
    annualReview: '依规执行年度政策合规审查',
    regNo: 'CPE 注册号：201708935D',
  },
  'ta-sg': {
    mandateTitle: 'சட்டப்பூர்வ நிர்வாக சாசனங்கள் (CPE ஆணை):',
    bothBoards: 'இரு வாரியங்கள் (கண்ணோட்டம்)',
    academicBoard: 'கல்வி வாரியம்',
    examinationBoard: 'தேர்வு வாரியம்',
    academicBadge: 'கற்பித்தல் தரநிலைகள்',
    examBadge: 'மதிப்பீட்டு ஒருமைப்பாடு',
    termsOfReference: 'சட்டப்பூர்வ விதிமுறைகள் மற்றும் குறிப்புகள்',
    cpeResponsibilities: 'ஆவணப்படுத்தப்பட்ட CPE பொறுப்புகள்',
    boardMembers: 'நியமிக்கப்பட்ட வாரிய உறுப்பினர்கள்',
    annualReview: 'வருடாந்திர கொள்கை மறுஆய்வு கட்டாயமாக்கப்பட்டது',
    regNo: 'CPE பதிவு எண்: 201708935D',
  },
};

export const BoardCharter: React.FC<BoardCharterProps> = ({ locale }) => {
  const [activeBoard, setActiveBoard] = useState<'both' | 'academic' | 'examination'>('both');
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  const boards: BoardCharterType[] = 
    activeBoard === 'academic' 
      ? [ACADEMIC_BOARD] 
      : activeBoard === 'examination' 
      ? [EXAMINATION_BOARD] 
      : [ACADEMIC_BOARD, EXAMINATION_BOARD];

  return (
    <div className="space-y-6">
      {/* Filter Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
          {ui.mandateTitle}
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveBoard('both')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeBoard === 'both' ? 'bg-navy-900 text-white shadow-sm' : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            {ui.bothBoards}
          </button>
          <button
            type="button"
            onClick={() => setActiveBoard('academic')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeBoard === 'academic' ? 'bg-navy-900 text-white shadow-sm' : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            {ui.academicBoard}
          </button>
          <button
            type="button"
            onClick={() => setActiveBoard('examination')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeBoard === 'examination' ? 'bg-navy-900 text-white shadow-sm' : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            {ui.examinationBoard}
          </button>
        </div>
      </div>

      {/* Boards Grid */}
      <div className={`grid grid-cols-1 ${boards.length > 1 ? 'lg:grid-cols-2' : 'max-w-4xl mx-auto'} gap-8`}>
        {boards.map((board) => {
          const isAcademic = board.id === 'academic';
          const Icon = isAcademic ? ShieldCheck : Scale;

          return (
            <Card
              key={board.id}
              variant="elevated"
              className="border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div
                  className={`p-6 sm:p-7 text-white ${
                    isAcademic
                      ? 'bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800'
                      : 'bg-gradient-to-br from-slate-900 via-navy-950 to-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <Badge variant={isAcademic ? 'gold' : 'emerald'}>
                      {isAcademic ? ui.academicBadge : ui.examBadge}
                    </Badge>
                    <Icon className="w-5 h-5 text-gold-400" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold tracking-tight text-white mt-1">
                    {board.title[locale]}
                  </h3>
                  <p className="text-xs text-slate-300 font-mono mt-1">
                    {board.regulatoryReference}
                  </p>
                </div>

                <CardContent className="p-6 sm:p-7 space-y-6">
                  {/* Mandate */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <div className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-gold-600" />
                      {ui.termsOfReference}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {board.mandate[locale]}
                    </p>
                  </div>

                  {/* Core Responsibilities */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
                      <FileCheck className="w-3.5 h-3.5 text-navy-900" />
                      {ui.cpeResponsibilities}
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700" role="list">
                      {board.responsibilities[locale].map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                          <span className="leading-snug">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Members Roster */}
                  <div className="border-t border-slate-100 pt-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
                      <UserCheck className="w-3.5 h-3.5 text-navy-900" />
                      {ui.boardMembers}
                    </h4>
                    <div className="space-y-3">
                      {board.members.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 hover:bg-slate-100/60 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span className="font-serif font-bold text-sm text-navy-950">
                              {m.name}
                            </span>
                            <Badge variant="neutral" className="w-fit text-[10px]">
                              {m.role[locale]}
                            </Badge>
                          </div>
                          <ul className="mt-1.5 space-y-0.5 text-xs text-slate-600" role="list">
                            {m.qualifications.map((q, qIdx) => (
                              <li key={qIdx} className="line-clamp-2">
                                • {q}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>

              <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
                <span>{ui.annualReview}</span>
                <span>{ui.regNo}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
