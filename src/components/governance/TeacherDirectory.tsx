'use client';

import React, { useState, useMemo } from 'react';
import { Locale } from '@/lib/i18n';
import { DEPLOYED_FACULTY, FacultyMember } from '@/data/governance';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui';
import { Search, Filter, BookOpen, GraduationCap, CheckCircle2, ChevronDown, ChevronUp, Users, Sparkles, X } from 'lucide-react';

interface TeacherDirectoryProps {
  locale: Locale;
}

type DisciplineFilter = 'all' | 'Engineering & Built Environment' | 'Information Technology' | 'Business & Management' | 'Hospitality Management' | 'Healthcare & Caregiving';
type DeploymentFilter = 'all' | 'FULL TIME' | 'PART TIME';

const UI_STRINGS = {
  en: {
    heading: 'CPE Registered Teaching Faculty Directory',
    subheading: 'Approved educator deployments registered with the Committee for Private Education (CPE).',
    facultyCount: (shown: number, total: number) => `${shown} of ${total} Faculty Members`,
    deploymentsBadge: '35 Statutory Deployments',
    searchPlaceholder: 'Search by lecturer name, qualification, course title, or module...',
    searchAria: 'Search faculty by name or course',
    clearSearch: 'Clear search',
    disciplinesAria: 'Discipline filters',
    deploymentAria: 'Deployment mode filters',
    statusLabel: 'Status:',
    statusAll: 'All',
    statusFullTime: 'Full Time',
    statusPartTime: 'Part Time',
    qualificationsLabel: 'Verified Qualifications',
    assignedCoursesLabel: 'Assigned Courses:',
    programsBadge: (count: number) => `${count} Program${count > 1 ? 's' : ''}`,
    approvedModulesLabel: 'Approved Modules:',
    cpeRatioCap: 'CPE Ratio Cap: 1:14',
    viewAllModules: 'View All Modules',
    hideDetails: 'Hide Details',
    noFaculty: 'No Faculty Members Found',
    noFacultyDesc: (term: string) => `No deployed educators match "${term}" within the selected discipline and deployment filters.`,
    resetFilters: 'Reset Filters',
    disciplines: {
      all: 'All Disciplines',
      engineering: 'Engineering & Built Env',
      it: 'Information Technology',
      business: 'Business & Management',
      hospitality: 'Hospitality',
      healthcare: 'Healthcare & Caregiving',
    },
  },
  'zh-sg': {
    heading: 'CPE 官方注册授课讲师名录',
    subheading: '经新加坡精深技能发展局旗下私立教育理事会（CPE）审核核准之正式授课师资。',
    facultyCount: (shown: number, total: number) => `显示 ${shown} / ${total} 位注册讲师`,
    deploymentsBadge: '35 项法定师资备案配置',
    searchPlaceholder: '按讲师姓名、学历资质、课程名称或模块搜索...',
    searchAria: '按讲师姓名或课程搜索师资',
    clearSearch: '清除搜索关键词',
    disciplinesAria: '专业学科分类筛选',
    deploymentAria: '授课聘用性质筛选',
    statusLabel: '聘用方式：',
    statusAll: '全部',
    statusFullTime: '全职',
    statusPartTime: '兼职',
    qualificationsLabel: '经核验学术与专业资质',
    assignedCoursesLabel: '主讲指派课程：',
    programsBadge: (count: number) => `${count} 门专业课程`,
    approvedModulesLabel: '官方核准讲授模块：',
    cpeRatioCap: 'CPE 师生比上限：1:14',
    viewAllModules: '查看所讲全部模块',
    hideDetails: '收起模块明细',
    noFaculty: '未找到符合条件的讲师',
    noFacultyDesc: (term: string) => `在所选学科和聘用方式下，未找到与“${term}”匹配的已注册讲师。`,
    resetFilters: '重置筛选条件',
    disciplines: {
      all: '全部学科',
      engineering: '工程与建筑环境',
      it: '资讯科技与系统',
      business: '商业与行政管理',
      hospitality: '酒店与餐饮运营',
      healthcare: '医护与健康照护',
    },
  },
  'ta-sg': {
    heading: 'CPE பதிவு பெற்ற விரிவுரையாளர்கள் விபரம்',
    subheading: 'தனியார் கல்வி வாரியத்தில் (CPE) பதிவு செய்யப்பட்டு அங்கீகரிக்கப்பட்ட விரிவுரையாளர்கள்.',
    facultyCount: (shown: number, total: number) => `${total} ஆசிரியர்களில் ${shown} காட்டப்படுகிறது`,
    deploymentsBadge: '35 சட்டப்பூர்வ நியமனங்கள்',
    searchPlaceholder: 'விரிவுரையாளர் பெயர், தகுதி, பாடம் அல்லது தொகுதி மூலம் தேடவும்...',
    searchAria: 'பெயர் அல்லது பாடம் மூலம் விரிவுரையாளர்களைத் தேடவும்',
    clearSearch: 'தேடலை அழிக்கவும்',
    disciplinesAria: 'துறை வாரியான வடிகட்டிகள்',
    deploymentAria: 'பணி வகை வடிகட்டிகள்',
    statusLabel: 'பணி வகை:',
    statusAll: 'அனைத்தும்',
    statusFullTime: 'முழு நேரம்',
    statusPartTime: 'பகுதி நேரம்',
    qualificationsLabel: 'சரிபார்க்கப்பட்ட கல்வித் தகுதிகள்',
    assignedCoursesLabel: 'ஒதுக்கப்பட்ட படிப்புகள்:',
    programsBadge: (count: number) => `${count} படிப்புகள்`,
    approvedModulesLabel: 'அங்கீகரிக்கப்பட்ட பாடத் தொகுதிகள்:',
    cpeRatioCap: 'CPE வகுப்பறை விகிதம்: 1:14',
    viewAllModules: 'அனைத்து தொகுதிகளையும் காண்க',
    hideDetails: 'விவரங்களை மறைக்க',
    noFaculty: 'விரிவுரையாளர்கள் யாரும் கிடைக்கவில்லை',
    noFacultyDesc: (term: string) => `தேர்ந்தெடுக்கப்பட்ட பிரிவில் "${term}" பொருந்தக்கூடிய விரிவுரையாளர்கள் இல்லை.`,
    resetFilters: 'வடிகட்டிகளை மீட்டமைக்க',
    disciplines: {
      all: 'அனைத்து துறைகள்',
      engineering: 'பொறியியல் & கட்டடவியல்',
      it: 'தகவல் தொழில்நுட்பம்',
      business: 'வணிக மேலாண்மை',
      hospitality: 'விருந்தோம்பல்',
      healthcare: 'மருத்துவ பராமரிப்பு',
    },
  },
};

export const TeacherDirectory: React.FC<TeacherDirectoryProps> = ({ locale }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineFilter>('all');
  const [selectedDeployment, setSelectedDeployment] = useState<DeploymentFilter>('all');
  const [expandedTeacherId, setExpandedTeacherId] = useState<string | null>(null);
  const t = UI_STRINGS[locale] || UI_STRINGS.en;

  // Filter logic
  const filteredFaculty = useMemo(() => {
    return DEPLOYED_FACULTY.filter((teacher) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        teacher.name.toLowerCase().includes(term) ||
        teacher.qualification.toLowerCase().includes(term) ||
        teacher.courses.some((c) =>
          c.courseTitle.toLowerCase().includes(term) ||
          c.modules.some((m) => m.toLowerCase().includes(term))
        );

      const matchesDiscipline =
        selectedDiscipline === 'all' || teacher.discipline === selectedDiscipline;

      const matchesDeployment =
        selectedDeployment === 'all' ||
        (selectedDeployment === 'FULL TIME' && teacher.deploymentType.includes('FULL TIME')) ||
        (selectedDeployment === 'PART TIME' && teacher.deploymentType.includes('PART TIME'));

      return matchesSearch && matchesDiscipline && matchesDeployment;
    });
  }, [searchTerm, selectedDiscipline, selectedDeployment]);

  const toggleTeacherExpanded = (id: string) => {
    setExpandedTeacherId((prev) => (prev === id ? null : id));
  };

  const disciplines: { id: DisciplineFilter; label: string }[] = [
    { id: 'all', label: t.disciplines.all },
    { id: 'Engineering & Built Environment', label: t.disciplines.engineering },
    { id: 'Information Technology', label: t.disciplines.it },
    { id: 'Business & Management', label: t.disciplines.business },
    { id: 'Hospitality Management', label: t.disciplines.hospitality },
    { id: 'Healthcare & Caregiving', label: t.disciplines.healthcare },
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filters Header */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-xl text-navy-950">
              {t.heading}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.subheading}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald">
              {t.facultyCount(filteredFaculty.length, DEPLOYED_FACULTY.length)}
            </Badge>
            <Badge variant="gold">
              {t.deploymentsBadge}
            </Badge>
          </div>
        </div>

        {/* Real-time search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:bg-white transition-all text-slate-800"
            aria-label={t.searchAria}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label={t.clearSearch}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
          {/* Discipline Filters */}
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={t.disciplinesAria}>
            {disciplines.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDiscipline(d.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedDiscipline === d.id
                    ? 'bg-navy-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Deployment Type Filters */}
          <div className="flex items-center gap-1.5 shrink-0" role="group" aria-label={t.deploymentAria}>
            <span className="text-[11px] font-semibold text-slate-400 uppercase mr-1">{t.statusLabel}</span>
            <button
              type="button"
              onClick={() => setSelectedDeployment('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedDeployment === 'all'
                  ? 'bg-gold-500 text-navy-950 font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.statusAll}
            </button>
            <button
              type="button"
              onClick={() => setSelectedDeployment('FULL TIME')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedDeployment === 'FULL TIME'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.statusFullTime}
            </button>
            <button
              type="button"
              onClick={() => setSelectedDeployment('PART TIME')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedDeployment === 'PART TIME'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.statusPartTime}
            </button>
          </div>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      {filteredFaculty.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFaculty.map((teacher) => {
            const isExpanded = expandedTeacherId === teacher.id;
            const isFullTime = teacher.deploymentType.includes('FULL TIME');

            return (
              <Card
                key={teacher.id}
                variant="default"
                className="border border-slate-200 hover:border-gold-300 transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-sm"
              >
                <div>
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <Badge
                        variant={isFullTime ? 'emerald' : 'neutral'}
                        className="text-[10px] uppercase font-bold"
                      >
                        {teacher.deploymentType}
                      </Badge>
                      <Badge variant="navy" className="text-[10px]">
                        {teacher.discipline}
                      </Badge>
                    </div>

                    <CardTitle className="text-lg font-serif font-bold text-navy-950">
                      {teacher.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-0">
                    {/* Academic Qualification */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-navy-800" />
                        {t.qualificationsLabel}
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {teacher.qualification}
                      </p>
                    </div>

                    {/* Assigned Courses Summary */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-gold-600" />
                          {t.assignedCoursesLabel}
                        </span>
                        <Badge variant="gold" className="text-[10px]">
                          {t.programsBadge(teacher.courses.length)}
                        </Badge>
                      </div>

                      <div className="space-y-1.5">
                        {teacher.courses.slice(0, isExpanded ? teacher.courses.length : 2).map((c, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-100 text-xs"
                          >
                            <div className="font-semibold text-navy-900">
                              {c.courseTitle}
                            </div>
                            {isExpanded && c.modules.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-slate-200/60">
                                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                                  {t.approvedModulesLabel}
                                </span>
                                <ul className="space-y-1 text-[11px] text-slate-600 list-disc list-inside">
                                  {c.modules.map((m, mIdx) => (
                                    <li key={mIdx}>{m}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Card Footer: Expand/Collapse */}
                <div className="bg-slate-50/80 px-6 py-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {t.cpeRatioCap}
                  </span>
                  {teacher.courses.length > 2 || teacher.courses.some(c => c.modules.length > 0) ? (
                    <button
                      type="button"
                      onClick={() => toggleTeacherExpanded(teacher.id)}
                      className="text-xs font-semibold text-navy-900 hover:text-gold-600 flex items-center gap-1 transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? t.hideDetails : t.viewAllModules}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  ) : null}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h4 className="font-serif font-bold text-lg text-navy-950">
            {t.noFaculty}
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {t.noFacultyDesc(searchTerm)}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setSelectedDiscipline('all');
              setSelectedDeployment('all');
            }}
          >
            {t.resetFilters}
          </Button>
        </div>
      )}
    </div>
  );
};
