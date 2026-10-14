'use client';

import React, { useState, useMemo } from 'react';
import { Locale } from '@/lib/i18n';
import { OFFICIAL_DOCUMENTS, OfficialDocument, DocumentCategory } from '@/data/documents';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui';
import { Search, FileText, Download, ShieldCheck, CheckCircle2, X, ExternalLink, Award, FileCode } from 'lucide-react';

interface DocumentLibraryProps {
  locale: Locale;
}

const UI_STRINGS = {
  en: {
    heading: 'Official Document & Form Repository',
    subheading: 'Approved downloadable compliance documents, CPE standard forms, and institutional specifications.',
    docCount: (count: number) => `${count} Document${count > 1 ? 's' : ''} Available`,
    searchPlaceholder: 'Search by document title, CPE code (e.g., FORM-12), or regulatory authority...',
    searchAria: 'Search official documents',
    clearSearch: 'Clear search query',
    categoryFiltersAria: 'Document category filters',
    authority: 'Authority:',
    keySpecs: 'Key Specifications:',
    downloadPdf: 'Download PDF',
    officialPolicy: 'Official Policy',
    registeredStandard: 'Registered Standard',
    noDocs: 'No Documents Found',
    noDocsDesc: (term: string) => `No official documents or forms match "${term}" in the selected category.`,
    resetFilters: 'Reset Filters',
    categories: {
      all: 'All Documents',
      statutory: 'Statutory & Regulatory',
      contracts: 'Contracts & Policies',
      admissions: 'Admissions & Forms',
      academic: 'Academic & Parchments',
    },
  },
  'zh-sg': {
    heading: '官方文件与表格资料库',
    subheading: '官方核准之可下载合规文件、CPE标准表格及学院规章细则。',
    docCount: (count: number) => `共提供 ${count} 份官方文件`,
    searchPlaceholder: '按文件名称、CPE代码（如 FORM-12）或监管机构搜索...',
    searchAria: '搜索官方文件',
    clearSearch: '清除搜索关键词',
    categoryFiltersAria: '文件分类筛选',
    authority: '签发与监管机构：',
    keySpecs: '法定要点与规范：',
    downloadPdf: '下载 PDF 文件',
    officialPolicy: '学院法定政策',
    registeredStandard: '官方注册标准',
    noDocs: '未找到相关文件',
    noDocsDesc: (term: string) => `在所选分类中未找到与“${term}”匹配的官方文件或表格。`,
    resetFilters: '重置筛选条件',
    categories: {
      all: '全部文件',
      statutory: '法定注册与监管',
      contracts: '标准合同与规章',
      admissions: '招生表格与须知',
      academic: '学术规范与文凭',
    },
  },
  'ta-sg': {
    heading: 'அதிகாரப்பூர்வ ஆவணங்கள் மற்றும் படிவங்கள் தளம்',
    subheading: 'பதிவிறக்கம் செய்யக்கூடிய சட்டப்பூர்வ ஆவணங்கள், CPE நிலையான படிவங்கள் மற்றும் கல்லூரி விதிகள்.',
    docCount: (count: number) => `${count} ஆவணங்கள் கிடைக்கின்றன`,
    searchPlaceholder: 'ஆவண தலைப்பு, CPE குறியீடு (எ.கா. FORM-12) அல்லது துறை மூலம் தேடவும்...',
    searchAria: 'அதிகாரப்பூர்வ ஆவணங்களைத் தேடவும்',
    clearSearch: 'தேடலை அழிக்கவும்',
    categoryFiltersAria: 'ஆவண வகை வடிகட்டிகள்',
    authority: 'ஒழுங்குமுறை ஆணையம்:',
    keySpecs: 'முக்கிய விதிமுறைகள்:',
    downloadPdf: 'PDF பதிவிறக்கம்',
    officialPolicy: 'கல்லூரி கொள்கை',
    registeredStandard: 'பதிவு செய்யப்பட்ட தரம்',
    noDocs: 'ஆவணங்கள் எதுவும் கிடைக்கவில்லை',
    noDocsDesc: (term: string) => `தேர்ந்தெடுக்கப்பட்ட பிரிவில் "${term}" பொருந்தக்கூடிய ஆவணங்கள் எதுவும் இல்லை.`,
    resetFilters: 'வடிகட்டிகளை மீட்டமைக்க',
    categories: {
      all: 'அனைத்து ஆவணங்கள்',
      statutory: 'சட்டப்பூர்வ & ஒழுங்குமுறை',
      contracts: 'ஒப்பந்தங்கள் & கொள்கைகள்',
      admissions: 'சேர்க்கை & படிவங்கள்',
      academic: 'கல்வி & சான்றிதழ்கள்',
    },
  },
};

export const DocumentLibrary: React.FC<DocumentLibraryProps> = ({ locale }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'all'>('all');
  const t = UI_STRINGS[locale] || UI_STRINGS.en;

  const filteredDocs = useMemo(() => {
    return OFFICIAL_DOCUMENTS.filter((doc) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        doc.title[locale].toLowerCase().includes(term) ||
        doc.code.toLowerCase().includes(term) ||
        doc.authority.toLowerCase().includes(term) ||
        doc.description[locale].toLowerCase().includes(term);

      const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory, locale]);

  const categories: { id: DocumentCategory | 'all'; label: string }[] = [
    { id: 'all', label: t.categories.all },
    { id: 'statutory', label: t.categories.statutory },
    { id: 'contracts', label: t.categories.contracts },
    { id: 'admissions', label: t.categories.admissions },
    { id: 'academic', label: t.categories.academic },
  ];

  return (
    <div className="space-y-6">
      {/* Search and Category Filter Strip */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-xl text-navy-950">
              {t.heading}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.subheading}
            </p>
          </div>
          <Badge variant="emerald" className="w-fit">
            {t.docCount(filteredDocs.length)}
          </Badge>
        </div>

        {/* Real-time Search Input */}
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

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100" role="group" aria-label={t.categoryFiltersAria}>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === c.id
                  ? 'bg-navy-900 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      {filteredDocs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => {
            const isPdf = doc.downloadUrl?.endsWith('.pdf');

            return (
              <Card
                key={doc.id}
                variant="default"
                className="border border-slate-200 hover:border-gold-300 transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-sm"
              >
                <div>
                  <div className="p-5 bg-slate-50 border-b border-slate-100">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge variant="gold" className="text-[10px] font-mono">
                        {doc.code}
                      </Badge>
                      <span className="text-[11px] font-bold text-slate-500 uppercase font-sans">
                        {doc.version}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-navy-950 leading-snug">
                      {doc.title[locale]}
                    </h3>

                    <div className="text-[11px] text-slate-500 font-sans mt-1">
                      {t.authority} <strong className="text-slate-700">{doc.authority}</strong>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {doc.description[locale]}
                    </p>

                    {/* Key Provisions */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase font-bold text-slate-600 block tracking-wider">
                        {t.keySpecs}
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700" role="list">
                        {doc.keyProvisions[locale].map((prov, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                            <span className="leading-snug">{prov}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500 font-mono">
                    {doc.fileSize || t.officialPolicy}
                  </div>

                  {doc.downloadUrl ? (
                    <a
                      href={doc.downloadUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 text-white hover:bg-gold-500 hover:text-navy-950 text-xs font-semibold transition-colors shadow-xs"
                      aria-label={`${t.downloadPdf}: ${doc.title[locale]}`}
                    >
                      <Download className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.downloadPdf}</span>
                    </a>
                  ) : (
                    <Badge variant="neutral" className="text-[10px]">
                      {t.registeredStandard}
                    </Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h4 className="font-serif font-bold text-lg text-navy-950">
            {t.noDocs}
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {t.noDocsDesc(searchTerm)}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            {t.resetFilters}
          </Button>
        </div>
      )}
    </div>
  );
};
