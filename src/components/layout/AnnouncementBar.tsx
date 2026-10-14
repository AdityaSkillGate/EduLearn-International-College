import React from 'react';
import { ShieldCheck, MapPin, Phone, MessageSquare } from 'lucide-react';
import { Dictionary } from '@/lib/i18n/types';

interface AnnouncementBarProps {
  dict: Dictionary;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ dict }) => {
  return (
    <div
      role="region"
      aria-label="Statutory Accreditation and Campus Information"
      className="bg-slate-50 text-slate-700 text-xs border-b border-slate-200/90 py-1.5 px-4 hidden lg:block"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Official CPE Status & Physical Campus */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 font-medium tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-600 shrink-0" aria-hidden="true" />
            <span className="text-slate-800 font-semibold">{dict.announcement.cpeBadge}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" aria-hidden="true" />
            <span>{dict.announcement.campusLocation}</span>
          </div>
        </div>

        {/* Right: Telephony & Fast Messaging */}
        <div className="flex items-center gap-5">
          <a
            href="tel:+6590049657"
            className="flex items-center gap-1.5 text-slate-700 hover:text-navy-950 focus-visible:ring-1 focus-visible:ring-gold-500 rounded transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-gold-600 shrink-0" aria-hidden="true" />
            <span>{dict.announcement.hotlineLabel} <strong className="text-navy-950 font-bold">{dict.announcement.hotlineNumber}</strong></span>
          </a>

          <a
            href="https://wa.me/6590049657?text=Hello%20Edulearn%2C%20I%20would%20like%20to%20inquire%20about%20course%20enrollment."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold focus-visible:ring-1 focus-visible:ring-emerald-400 rounded transition-colors"
            aria-label={`${dict.announcement.whatsappLabel} (opens in new tab)`}
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{dict.announcement.whatsappLabel}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
