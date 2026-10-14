import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Award,
  CheckCircle2,
  MessageSquare,
  Navigation,
} from 'lucide-react';
import { Locale, Dictionary } from '@/lib/i18n/types';

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export const Footer: React.FC<FooterProps> = ({ locale, dict }) => {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800" aria-label="College Footer">
      {/* 1. Regulatory Trust & Accreditation Banner */}
      <div className="border-b border-navy-800/80 bg-navy-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Item 1: CPE Enhanced Registration Framework */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-navy-800 text-gold-500 border border-navy-700 shrink-0">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-white font-semibold text-xs tracking-wide uppercase">
                {dict.footer.erfRegistered}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                CPE / SSG Reg No: <strong className="text-gold-400 font-mono">201708935D</strong>
              </div>
            </div>
          </div>

          {/* Item 2: bizSAFE Certification */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-navy-800 text-emerald-400 border border-navy-700 shrink-0">
              <Award className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-white font-semibold text-xs tracking-wide uppercase">
                {dict.footer.bizsafeCertified}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Workplace Safety and Health Council (WSHC), Singapore
              </div>
            </div>
          </div>

          {/* Item 3: Standard Student Contract Version 4.1 */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-navy-800 text-blue-400 border border-navy-700 shrink-0">
              <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-white font-semibold text-xs tracking-wide uppercase">
                {locale === 'zh-sg'
                  ? 'CPE标准私立教育学生合同'
                  : locale === 'ta-sg'
                  ? 'நிலையான PEI மாணவர் ஒப்பந்தம்'
                  : 'Standard PEI-Student Contract'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {locale === 'zh-sg'
                  ? '4.1版本合规 • 享有7天冷静期全额保障'
                  : locale === 'ta-sg'
                  ? 'பதிப்பு 4.1 • 7 நாட்கள் மறுபரிசீலனை கால பாதுகாப்பு'
                  : 'Version 4.1 Compliance • 7-Day Cooling-Off Period'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation & Information Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
          {/* Column 1: College Identity & Statement */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-xl shadow-sm border border-white/20 shrink-0">
                <img
                  src="/images/edulearn-logo-mark.png"
                  alt="Edulearn International College"
                  className="h-11 w-11 object-contain"
                />
              </div>
              <div>
                <div className="text-white font-serif font-bold text-sm tracking-tight leading-snug">
                  Edulearn International College
                </div>
                <div className="text-[10px] text-gold-400 font-mono mt-0.5">
                  PEI Reg: 201708935D
                </div>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-300 font-serif italic">
              &ldquo;{dict.footer.tagline}&rdquo;
            </p>
            <div className="text-xs text-slate-400 leading-relaxed border-t border-navy-800/80 pt-3">
              {dict.footer.cpeNotice}
            </div>
          </div>

          {/* Column 2: Academic Programs */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-400 font-sans">
              {dict.footer.academicPrograms}
            </h3>
            <ul className="space-y-2 text-xs" role="list">
              <li>
                <Link
                  href={`/${locale}/courses/`}
                  className="font-medium text-gold-300 hover:text-gold-200 transition-colors"
                >
                  {dict.nav.sub.allCourses}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/courses/#diplomas`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.diplomaCourses}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/courses/#advanced-diplomas`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.advDiplomaCourses}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/courses/#short-term`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.shortTermCourses}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/courses/#postgraduate`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.pgDiplomaCourses}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/apply/`}
                  className="text-gold-400 font-medium hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <span>{dict.nav.applyNow}</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Student Hub & Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-400 font-sans">
              {dict.footer.studentServices}
            </h3>
            <ul className="space-y-2 text-xs" role="list">
              <li>
                <Link
                  href={`/${locale}/forms/`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.formsDownloads}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/student-corner/`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.studentSupport}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/useful-links/`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.usefulLinks}
                </Link>
              </li>
              <li>
                <a
                  href="http://www.tpgateway.gov.sg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors inline-flex items-center gap-1 text-slate-400"
                >
                  <span>TPGateway Singapore</span>
                  <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.ica.gov.sg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors inline-flex items-center gap-1 text-slate-400"
                >
                  <span>ICA Singapore</span>
                  <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Governance */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-400 font-sans">
              {dict.footer.regulatoryTrust}
            </h3>
            <ul className="space-y-2 text-xs" role="list">
              <li>
                <Link
                  href={`/${locale}/about/`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.aboutOverview}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/governance/#academic-board`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.academicBoard}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/governance/#faculty`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.facultyDeployment}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about/facilities/`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {dict.nav.sub.facilities}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/news/`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {dict.nav.newsEvents}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/gallery/`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {dict.nav.gallery}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Campus Telephony & Location */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-400 font-sans">
              {locale === 'zh-sg'
                ? '校区与招生咨询'
                : locale === 'ta-sg'
                ? 'வளாகம் மற்றும் சேர்க்கை'
                : 'Campus & Enquiries'}
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-gold-500 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p>1 Jalan Berseh, #02-28 New World Centre, Singapore 209037</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=1+Jalan+Berseh,+%2302-28+New+World+Centre,+Singapore+209037"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-400 hover:underline inline-flex items-center gap-1 mt-0.5 text-[11px]"
                  >
                    <span>
                      {locale === 'zh-sg'
                        ? '查看谷歌地图导航'
                        : locale === 'ta-sg'
                        ? 'கூகிள் வரைபடத்தில் பார்க்க'
                        : 'View Google Map'}
                    </span>
                    <Navigation className="w-2.5 h-2.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-gold-500 shrink-0" aria-hidden="true" />
                <a href="tel:+6590049657" className="hover:text-gold-300 transition-colors">
                  +65 9004 9657 / +65 6258 7189
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-gold-500 shrink-0" aria-hidden="true" />
                <a href="mailto:admin@edulearn.edu.sg" className="hover:text-gold-300 transition-colors truncate">
                  admin@edulearn.edu.sg
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-gold-500 shrink-0" aria-hidden="true" />
                <span>
                  {locale === 'zh-sg'
                    ? '周一至周六：上午10:00 至 晚上7:00'
                    : locale === 'ta-sg'
                    ? 'திங்கள் – சனி: காலை 10:00 – மாலை 7:00'
                    : 'Mon – Sat: 10:00 AM – 7:00 PM'}
                </span>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/6590049657?text=Hello%20Edulearn%20Admissions%2C%20I%20would%20like%20to%20enquire%20about%20course%20enrollment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600/20 text-emerald-300 border border-emerald-600/40 hover:bg-emerald-600/30 text-xs font-medium transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  <span>
                    {locale === 'zh-sg'
                      ? 'WhatsApp 招生咨询'
                      : locale === 'ta-sg'
                      ? 'WhatsApp சேர்க்கை'
                      : 'WhatsApp Admissions'}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal Disclaimer & Copyright */}
      <div className="border-t border-navy-800/80 bg-[#0B041C] pt-5 pb-8 sm:pb-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
          <p className="text-center lg:text-left">
            &copy; 2026 Edulearn International College Pte. Ltd. (PEI Reg No: 201708935D). {dict.footer.allRightsReserved}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <Link href={`/${locale}/governance/#dispute`} className="hover:text-gold-300 transition-colors">
              {locale === 'zh-sg'
                ? '争端解决机制 (CPE)'
                : locale === 'ta-sg'
                ? 'சர்ச்சை தீர்வு நெறிமுறை (CPE)'
                : 'Dispute Resolution (CPE)'}
            </Link>
            <span className="text-slate-700">|</span>
            <Link href={`/${locale}/forms/#refund`} className="hover:text-gold-300 transition-colors">
              {locale === 'zh-sg'
                ? '退款条例与政策'
                : locale === 'ta-sg'
                ? 'கட்டண திருப்பி செலுத்தும் கொள்கை'
                : 'Refund Policy'}
            </Link>
            <span className="text-slate-700">|</span>
            <Link href={`/${locale}/contact/`} className="hover:text-gold-300 transition-colors">
              {locale === 'zh-sg'
                ? '校区地理位置'
                : locale === 'ta-sg'
                ? 'வளாக இருப்பிடம்'
                : 'Campus Location'}
            </Link>
          </div>
        </div>

        {/* Agency Design & Development Attribution */}
        <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            <span>Designed &amp; Developed by</span>
            <a
              href="https://adityaskillgate.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 font-semibold inline-flex items-center gap-1 underline underline-offset-2 transition-colors group/aditya"
            >
              <span>Aditya Skill Gate IT Solution</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-80 group-hover/aditya:translate-x-0.5 group-hover/aditya:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </a>
          </div>
          <div className="text-slate-400 text-center sm:text-right pr-0 sm:pr-32 lg:pr-36">
            <span>Enterprise Academic Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
