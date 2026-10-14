'use client';

import React from 'react';
import { Badge } from '@/components/ui';
import {
  Users,
  Maximize2,
  CheckCircle2,
  Wind,
  Tv,
  Wifi,
  ShieldCheck,
  LucideIcon,
} from 'lucide-react';

export interface FacilitySpec {
  id: string;
  name: string;
  nameZh: string;
  nameTa: string;
  type: string;
  areaSqm: number;
  capacityStudents: number;
  ratio: string;
  description: {
    en: string;
    'zh-sg': string;
    'ta-sg': string;
  };
  features: {
    en: string[];
    'zh-sg': string[];
    'ta-sg': string[];
  };
  badgeColor?: 'navy' | 'gold' | 'neutral';
}

interface FacilitySpecCardProps {
  spec: FacilitySpec;
  locale: 'en' | 'zh-sg' | 'ta-sg';
}

const UI_STRINGS = {
  en: {
    roomPrefix: 'Room',
    floorArea: 'Floor Area',
    approvedSeating: 'Approved Seating',
    studentsSuffix: 'Students',
    teacherRatio: 'Teacher Ratio',
    maximumSuffix: 'Maximum',
    approvedEquipment: 'Approved Equipment & Facilities:',
    airConditioning: 'Full Air-Conditioning',
    compliance: 'CPE & SCDF Compliant',
  },
  'zh-sg': {
    roomPrefix: '课室',
    floorArea: '建筑面积',
    approvedSeating: '核准座位',
    studentsSuffix: '名学员',
    teacherRatio: '师生比例',
    maximumSuffix: '最高',
    approvedEquipment: '核准教学设备与配置：',
    airConditioning: '全面冷气配备',
    compliance: '符合 CPE 与 SCDF 规范',
  },
  'ta-sg': {
    roomPrefix: 'அறை',
    floorArea: 'தரைப்பரப்பு',
    approvedSeating: 'அங்கீகரிக்கப்பட்ட இடங்கள்',
    studentsSuffix: 'மாணவர்கள்',
    teacherRatio: 'ஆசிரியர் விகிதம்',
    maximumSuffix: 'அதிகபட்சம்',
    approvedEquipment: 'அங்கீகரிக்கப்பட்ட உபகரணங்கள் மற்றும் வசதிகள்:',
    airConditioning: 'முழுமையான குளிர்சாதன வசதி',
    compliance: 'CPE & SCDF விதிமுறைகளுக்கு இணங்குவது',
  },
};

export function FacilitySpecCard({ spec, locale }: FacilitySpecCardProps) {
  const name = locale === 'zh-sg' ? spec.nameZh : locale === 'ta-sg' ? spec.nameTa : spec.name;
  const desc = spec.description[locale] || spec.description.en;
  const features = spec.features[locale] || spec.features.en;
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Header with Title & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <Badge variant={spec.badgeColor || 'navy'} className="text-[11px] font-semibold">
            {spec.type}
          </Badge>
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium">
            {ui.roomPrefix} {spec.id}
          </span>
        </div>

        <h3 className="font-heading font-bold text-xl text-navy-950 group-hover:text-navy-700 transition-colors">
          {name}
        </h3>

        {locale !== 'en' && (
          <p className="text-xs text-slate-600 mt-0.5 italic font-sans">{spec.name}</p>
        )}

        <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
          {desc}
        </p>

        {/* Core Dimensions & Capacity Grid */}
        <div className="grid grid-cols-2 gap-3 my-5 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-gold-600 shrink-0" />
            <div>
              <span className="text-[10px] uppercase text-slate-600 block font-medium">{ui.floorArea}</span>
              <span className="font-bold text-navy-900">{spec.areaSqm} m²</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-navy-600 shrink-0" />
            <div>
              <span className="text-[10px] uppercase text-slate-600 block font-medium">{ui.approvedSeating}</span>
              <span className="font-bold text-navy-900">{spec.capacityStudents} {ui.studentsSuffix}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 col-span-2 pt-2 border-t border-slate-200/60">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] uppercase text-slate-600 block font-medium">{ui.teacherRatio}</span>
              <span className="font-semibold text-navy-900">{spec.ratio} {ui.maximumSuffix}</span>
            </div>
          </div>
        </div>

        {/* Verified Fit-out & Equipment Features */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block">
            {ui.approvedEquipment}
          </span>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
        <span className="flex items-center gap-1.5">
          <Wind className="w-3.5 h-3.5 text-navy-600" />
          <span>{ui.airConditioning}</span>
        </span>
        <span className="text-emerald-700 font-medium">{ui.compliance}</span>
      </div>
    </div>
  );
}
