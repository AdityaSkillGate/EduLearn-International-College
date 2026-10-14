'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, Dictionary, LOCALES, LOCALE_CONFIGS } from '@/lib/i18n';
import { processAssistantQuery, AssistantResponse } from '@/lib/chatbot/assistantEngine';
import { SUGGESTED_QUESTIONS, SuggestedQuestion } from '@/data/chatbotKnowledge';
import { ChatMessage, ChatMessageItem } from './ChatMessageItem';
import {
  MessageSquare,
  Sparkles,
  X,
  RotateCcw,
  Send,
  Phone,
  ShieldCheck,
  Bot,
  HelpCircle,
  Headphones,
  CheckCircle2,
} from 'lucide-react';

interface EICLearningAssistantProps {
  locale: Locale;
  dict: Dictionary;
}

export const EICLearningAssistant: React.FC<EICLearningAssistantProps> = ({
  locale,
  dict,
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLocale, setActiveLocale] = useState<Locale>(locale);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Avoid covering form fields or submit buttons on contact and enquiry pages
  const isFormPage = pathname?.includes('/contact') || pathname?.includes('/apply');
  if (isFormPage) {
    return null;
  }

  // Sync activeLocale if page locale changes
  useEffect(() => {
    setActiveLocale(locale);
  }, [locale]);

  // Initial welcome message factory
  const getInitialMessages = (targetLocale: Locale): ChatMessage[] => {
    const welcomeTextByLocale: Record<Locale, string> = {
      en: '👋 Hello! I am your **EIC Learning Assistant**.\n\nI can help you explore our **21 CPE-registered programs**, check tuition fee installments, review entry criteria, download official student forms, or find campus transit directions at New World Centre.\n\nHow can I help you today?',
      'zh-sg': '👋 您好！我是**爱尔莱智能学习顾问**。\n\n我可以协助您快速了解新加坡精深局（SSG/CPE）注册的 **21门专业文凭**、查询按月学费分期金额、核对录取前置资格、获取官方表格或查询新世界中心校区地铁公交换乘路线。\n\n请问您想了解哪些方面？',
      'ta-sg': '👋 வணக்கம்! நான் உங்கள் **எடுலேர்ன் கற்றல் உதவியாளர்**.\n\nஎங்கள் **21 அங்கீகரிக்கப்பட்ட டிப்ளமோ படிப்புகள்**, மாதாந்திர கட்டணத் தவணைகள், சேர்க்கை தகுதிகள், விண்ணப்பப் படிவங்கள் மற்றும் வளாக வழிமுறைகளை அறிய உங்களுக்கு உதவ முடியும்.\n\nஇன்று உங்களுக்கு எவ்வாறு உதவலாம்?',
    };

    return [
      {
        id: 'welcome-msg',
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        response: {
          text: welcomeTextByLocale[targetLocale] || welcomeTextByLocale.en,
          sourceType: 'faq',
          disclaimer: 'PEI Registration No: 201708935D • Committee for Private Education (CPE)',
        },
      },
    ];
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages(locale));

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Auto focus input when opened, return focus on close
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    } else {
      triggerButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  // Reset conversation handler
  const handleResetChat = () => {
    setMessages(getInitialMessages(activeLocale));
    setInputText('');
    setIsTyping(false);
  };

  // Switch assistant language handler
  const handleLanguageChange = (newLocale: Locale) => {
    setActiveLocale(newLocale);
    // Add system notification message
    const switchNoticeByLocale: Record<Locale, string> = {
      en: `🌐 Switched assistant language to **English**.`,
      'zh-sg': `🌐 已切换咨询助理语言为 **简体中文**。`,
      'ta-sg': `🌐 உதவியாளர் மொழி **தமிழுக்கு** மாற்றப்பட்டது.`,
    };

    const newMsg: ChatMessage = {
      id: `lang-switch-${Date.now()}`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      response: {
        text: switchNoticeByLocale[newLocale] || switchNoticeByLocale.en,
        sourceType: 'language_switch',
      },
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  // Submit user query
  const handleSendMessage = (queryToSend?: string) => {
    const query = (queryToSend !== undefined ? queryToSend : inputText).trim();
    if (!query) return;

    // Sanitize input length
    const sanitizedQuery = query.slice(0, 250);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      response: {
        text: sanitizedQuery,
        sourceType: 'faq',
      },
      userQuery: sanitizedQuery,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate 250ms processing pause for pleasant conversational UX
    setTimeout(() => {
      const response = processAssistantQuery(sanitizedQuery, activeLocale);
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        response,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 280);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  // Character limit calculation
  const charCount = inputText.length;
  const isNearLimit = charCount > 220;

  // Render suggested questions (only show if conversation is fresh or has <= 2 messages)
  const showSuggested = messages.length <= 2 && !isTyping;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 print:hidden">
      {/* 1. Expandable Chat Assistant Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={dict.chatbot.assistantTitle}
          aria-modal="false"
          className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-6 sm:right-6 w-auto sm:w-[420px] max-h-[85vh] sm:max-h-[640px] h-[600px] bg-slate-50 border border-navy-800/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-250 z-50 backdrop-blur-md"
        >
          {/* Header */}
          <div className="bg-navy-950 text-white p-3.5 sm:p-4 border-b border-navy-800 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-400 shrink-0">
                <Bot className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-semibold text-sm text-white truncate">
                    {dict.chatbot.assistantTitle}
                  </h3>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Online" />
                </div>
                <p className="text-[10px] text-slate-300 font-mono truncate">
                  {dict.chatbot.assistantSubtitle}
                </p>
              </div>
            </div>

            {/* Header Controls: Language Selector, Reset, Close */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Language Switcher Pills */}
              <div className="flex items-center bg-navy-900 rounded-lg p-0.5 border border-navy-800 text-[10px] font-semibold">
                <button
                  type="button"
                  onClick={() => handleLanguageChange('en')}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    activeLocale === 'en' ? 'bg-gold-500 text-navy-950' : 'text-slate-300 hover:text-white'
                  }`}
                  title="Switch to English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('zh-sg')}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    activeLocale === 'zh-sg' ? 'bg-gold-500 text-navy-950' : 'text-slate-300 hover:text-white'
                  }`}
                  title="切换为简体中文"
                >
                  中
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('ta-sg')}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    activeLocale === 'ta-sg' ? 'bg-gold-500 text-navy-950' : 'text-slate-300 hover:text-white'
                  }`}
                  title="தமிழுக்கு மாற்றவும்"
                >
                  த
                </button>
              </div>

              {/* Reset Conversation */}
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
                title={dict.chatbot.resetChat}
                aria-label={dict.chatbot.resetChat}
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
                title={dict.chatbot.closeAssistant}
                aria-label={dict.chatbot.closeAssistant}
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Quick Contact Ribbon */}
          <div className="bg-navy-900/90 border-b border-navy-800/80 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-slate-300 shrink-0">
            <span className="text-[10px] uppercase font-semibold text-gold-400 tracking-wider">
              {dict.chatbot.speedDialTitle}
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/6590049657?text=Hello%20EIC%2C%20I%20am%20enquiring%20about%20admissions."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
              <span>•</span>
              <a
                href="tel:+6590049657"
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-medium transition-colors"
              >
                <Phone className="w-3 h-3 text-gold-400" />
                <span>+65 9004 9657</span>
              </a>
            </div>
          </div>

          {/* Message Stream Area */}
          <div
            role="log"
            aria-live="polite"
            aria-label="Conversation history"
            className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 focus:outline-none"
          >
            {messages.map((msg) => (
              <ChatMessageItem
                key={msg.id}
                message={msg}
                locale={activeLocale}
                onSelectQuery={(q) => handleSendMessage(q)}
              />
            ))}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 text-xs pl-2 pt-1">
                <div className="w-5 h-5 rounded-full bg-gold-400/20 text-gold-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3 h-3 animate-spin" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce [animation-delay:0.3s]" />
                </div>
                <span className="text-[11px] text-slate-400 ml-1">Searching local catalog...</span>
              </div>
            )}

            {/* Suggested Question Chips (Only shown when fresh) */}
            {showSuggested && (
              <div className="pt-2 pb-1 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-1">
                  <HelpCircle className="w-3 h-3 text-gold-600" />
                  <span>{dict.chatbot.suggestedQuestionsTitle}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map((sq) => {
                    const text = sq.text[activeLocale] || sq.text.en;
                    return (
                      <button
                        key={sq.id}
                        type="button"
                        onClick={() => handleSendMessage(text)}
                        className="text-left text-xs px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-gold-400 hover:bg-gold-50/50 text-navy-950 font-medium transition-all shadow-2xs hover:shadow-xs"
                      >
                        {text}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Form Area */}
          <div className="bg-white border-t border-slate-200 p-3 sm:p-3.5 shrink-0 space-y-1.5">
            <form onSubmit={handleFormSubmit} className="relative flex items-center gap-1.5">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={250}
                placeholder={dict.chatbot.inputPlaceholder}
                className="w-full text-xs sm:text-sm pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/20 bg-slate-50/80 text-navy-950 placeholder:text-slate-400 outline-none transition-all"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                title={dict.chatbot.sendButtonLabel}
                aria-label={dict.chatbot.sendButtonLabel}
                className="absolute right-1.5 p-2 rounded-lg bg-navy-900 text-gold-400 hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </form>

            {/* Bottom Safeguard Notice & Counter */}
            <div className="flex items-center justify-between text-[10px] text-slate-600 px-1 pt-0.5">
              <span className="truncate pr-2">
                {dict.chatbot.disclaimerText}
              </span>
              <span className={`font-mono shrink-0 ${isNearLimit ? 'text-amber-600 font-bold' : ''}`}>
                {charCount}/250
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Floating Launcher Trigger Button */}
      <button
        ref={triggerButtonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? dict.chatbot.closeAssistant : `${dict.chatbot.assistantTitle} - ${dict.chatbot.openAssistant}`}
        className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 ${
          isOpen
            ? 'bg-navy-950 text-white border border-navy-700 hover:bg-navy-900'
            : 'bg-gradient-to-r from-navy-950 to-navy-900 hover:from-navy-900 hover:to-navy-800 text-white border border-gold-500/50 hover:border-gold-400'
        }`}
      >
        {isOpen ? (
          <>
            <X className="w-5 h-5 text-gold-400" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide text-white">
              {dict.chatbot.closeAssistant}
            </span>
          </>
        ) : (
          <>
            {/* Pulsing indicator */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-500"></span>
            </span>

            <Bot className="w-4 h-4 text-gold-400 shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold font-sans tracking-wide text-white">
              {dict.chatbot.assistantTitle}
            </span>
          </>
        )}
      </button>
    </div>
  );
};
