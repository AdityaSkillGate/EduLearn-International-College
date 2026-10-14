'use client';

import React from 'react';
import { Users, ShieldCheck, Scale, Building2, GraduationCap, Award, FileText } from 'lucide-react';

export const GovernanceNavTabs: React.FC = () => {
  const tabs = [
    { label: 'Leadership', href: '#leadership', icon: Users },
    { label: 'Academic Board', href: '#academic-board', icon: ShieldCheck },
    { label: 'Exam Board', href: '#examination-board', icon: Scale },
    { label: 'Organisation Chart', href: '#organisation-structure', icon: Building2 },
    { label: 'Teachers Deployment', href: '#faculty', icon: GraduationCap },
    { label: 'Certificates & Safety', href: '#certificates', icon: Award },
    { label: 'Dispute Resolution', href: '#dispute', icon: FileText },
  ];

  return (
    <nav
      className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-y border-slate-200 py-3 shadow-xs"
      aria-label="Governance in-page navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <a
                key={tab.href}
                href={tab.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-navy-950 hover:bg-slate-100 whitespace-nowrap transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-gold-600" aria-hidden="true" />
                <span>{tab.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
