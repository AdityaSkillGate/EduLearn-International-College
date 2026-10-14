'use client';

import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/types';
import { AssistantResponse, AssistantAction } from '@/lib/chatbot/assistantEngine';
import {
  Sparkles,
  User,
  ExternalLink,
  MessageSquare,
  Phone,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  response: AssistantResponse;
  userQuery?: string;
}

interface ChatMessageItemProps {
  message: ChatMessage;
  locale: Locale;
  onSelectQuery?: (query: string) => void;
}

/**
 * Safely parses bold formatting and markdown links without dangerouslySetInnerHTML
 */
function parseLineText(text: string, locale: Locale): React.ReactNode[] {
  // Regex pattern matching **bold** or [label](url)
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      const boldText = token.slice(2, -2);
      parts.push(
        <strong key={`bold-${match.index}`} className="font-semibold text-navy-950">
          {boldText}
        </strong>
      );
    } else if (token.startsWith('[') && token.includes('](') && token.endsWith(')')) {
      const labelEnd = token.indexOf('](');
      const label = token.slice(1, labelEnd);
      const url = token.slice(labelEnd + 2, -1);
      parts.push(
        <Link
          key={`link-${match.index}`}
          href={url}
          className="text-royal-600 hover:text-royal-700 underline font-medium inline-flex items-center gap-0.5"
        >
          <span>{label}</span>
          <ExternalLink className="w-3 h-3 inline shrink-0" aria-hidden="true" />
        </Link>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

function renderFormattedText(text: string, locale: Locale) {
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={`empty-${idx}`} className="h-1.5" />;
    }

    if (trimmed.startsWith('• ')) {
      const content = trimmed.substring(2);
      return (
        <div key={`bullet-${idx}`} className="flex items-start gap-2 my-1 text-xs sm:text-sm text-slate-700">
          <span className="text-gold-600 font-bold select-none shrink-0 mt-0.5">•</span>
          <div className="flex-1 leading-relaxed">{parseLineText(content, locale)}</div>
        </div>
      );
    }

    return (
      <p key={`p-${idx}`} className="my-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
        {parseLineText(line, locale)}
      </p>
    );
  });
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  locale,
  onSelectQuery,
}) => {
  const isAssistant = message.sender === 'assistant';

  if (!isAssistant) {
    return (
      <div className="flex justify-end mb-4 animate-in fade-in slide-in-from-bottom-1 duration-200">
        <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[78%]">
          <div className="bg-navy-900 text-white rounded-2xl rounded-br-xs px-4 py-2.5 shadow-sm text-xs sm:text-sm leading-relaxed break-words border border-navy-800">
            {message.userQuery}
          </div>
          <div className="w-6 h-6 rounded-full bg-navy-800 text-gold-400 flex items-center justify-center shrink-0 mb-0.5">
            <User className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
        </div>
      </div>
    );
  }

  const { response } = message;

  return (
    <div className="flex justify-start mb-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="flex items-start gap-2.5 max-w-[92%] sm:max-w-[88%]">
        <div className="w-7 h-7 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center shrink-0 mt-0.5 shadow-xs border border-gold-400">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
        </div>

        <div className="flex-1 space-y-2.5">
          {/* Main Bubble Card */}
          <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 sm:p-4 border border-slate-200 shadow-sm text-xs sm:text-sm text-slate-800 space-y-2.5">
            {/* Header Badge */}
            <div className="flex items-center gap-1.5 text-[11px] font-semibold">
              {response.sourceType === 'course' && (
                <span className="inline-flex items-center gap-1 text-navy-900 bg-navy-50 px-2 py-0.5 rounded-md border border-navy-200">
                  <GraduationCap className="w-3 h-3 text-gold-600" />
                  <span>CPE Course Catalogue</span>
                </span>
              )}
              {response.sourceType === 'privacy_guard' && (
                <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  <ShieldCheck className="w-3 h-3 text-amber-600" />
                  <span>PDPA Privacy Guard</span>
                </span>
              )}
              {response.sourceType === 'faq' && (
                <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <BookOpen className="w-3 h-3 text-emerald-600" />
                  <span>Verified FAQ</span>
                </span>
              )}
              {response.sourceType === 'fallback' && (
                <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                  <span>Admissions Guidance</span>
                </span>
              )}
              <span className="text-[10px] text-slate-400 ml-auto font-mono">
                {message.timestamp}
              </span>
            </div>

            {/* Formatted Text Content */}
            <div className="space-y-1">
              {renderFormattedText(response.text, locale)}
            </div>

            {/* Course Preview Cards (if single course match with quick specs) */}
            {response.courseMatches && response.courseMatches.length === 1 && (
              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 flex items-center justify-between gap-2 mt-2">
                <div className="min-w-0">
                  <div className="font-semibold text-navy-950 text-xs truncate">
                    {response.courseMatches[0].title}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{response.courseMatches[0].duration}</span>
                    <span>•</span>
                    <span className="font-medium text-navy-900">{response.courseMatches[0].fee}</span>
                  </div>
                </div>
                <Link
                  href={`/${locale}/courses/${response.courseMatches[0].slug}`}
                  className="px-2.5 py-1.5 rounded-lg bg-navy-900 text-white text-[11px] font-semibold hover:bg-navy-800 shrink-0 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}

            {/* Action Buttons */}
            {response.actions && response.actions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                {response.actions.map((act, actIdx) => {
                  if (act.type === 'link' && act.url) {
                    return (
                      <Link
                        key={actIdx}
                        href={act.url}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gold-50 text-gold-900 border border-gold-300 hover:bg-gold-100 transition-colors"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </Link>
                    );
                  }

                  if (act.type === 'whatsapp' && act.url) {
                    return (
                      <a
                        key={actIdx}
                        href={act.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors"
                      >
                        <MessageSquare className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                        <span>{act.label}</span>
                      </a>
                    );
                  }

                  if (act.type === 'call' && act.url) {
                    return (
                      <a
                        key={actIdx}
                        href={act.url}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200 transition-colors"
                      >
                        <Phone className="w-3 h-3 text-slate-600" aria-hidden="true" />
                        <span>{act.label}</span>
                      </a>
                    );
                  }

                  if (act.type === 'query' && act.queryText && onSelectQuery) {
                    return (
                      <button
                        key={actIdx}
                        type="button"
                        onClick={() => onSelectQuery(act.queryText!)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-navy-900 border border-slate-200 hover:bg-slate-200 transition-colors text-left"
                      >
                        <span>{act.label}</span>
                      </button>
                    );
                  }

                  return null;
                })}
              </div>
            )}
          </div>

          {/* Statutory Disclaimer Note */}
          {response.disclaimer && (
            <div className="text-[10px] text-slate-600 pl-1">
              {response.disclaimer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
