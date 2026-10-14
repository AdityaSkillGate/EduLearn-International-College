'use client';

import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Globe, Mail, Share2 } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const getFullUrl = () => {
    if (url) return url;
    if (typeof window !== 'undefined') return window.location.href;
    return 'https://edulearn.edu.sg';
  };

  const handleCopyLink = async () => {
    const shareUrl = getFullUrl();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch {
        // Fallback
      }
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : (url || '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mr-1">
        <Share2 className="w-3.5 h-3.5 text-gold-600" aria-hidden="true" />
        <span>Share Notice:</span>
      </span>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors shadow-xs"
        aria-label="Copy article link to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
            <span className="text-emerald-700">Link Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* WhatsApp Share */}
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors shadow-xs"
        aria-label="Share article via WhatsApp (opens in a new tab)"
      >
        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
        <span>WhatsApp</span>
      </a>

      {/* LinkedIn Share */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 transition-colors shadow-xs"
        aria-label="Share article on LinkedIn (opens in a new tab)"
      >
        <Globe className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />
        <span>LinkedIn</span>
      </a>

      {/* Email Share */}
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`Read this official announcement from Edulearn International College Singapore:\n\n`)}${encodedUrl}`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-xs"
        aria-label="Share article via email"
      >
        <Mail className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
        <span>Email</span>
      </a>
    </div>
  );
};
