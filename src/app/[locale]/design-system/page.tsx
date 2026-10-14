import React from 'react';
import { Metadata } from 'next';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, Locale } from '@/lib/i18n';
import { DesignSystemClient } from './DesignSystemClient';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? (resolved.locale as Locale) : DEFAULT_LOCALE;

  const titles: Record<Locale, string> = {
    en: 'Design System & Accessibility Standards | Edulearn International College Singapore',
    'zh-sg': '设计规范与无障碍体系 | 新加坡爱尔莱国际学院',
    'ta-sg': 'வடிவமைப்பு அமைப்பு & அணுகல்தன்மை தரநிலைகள் | எடுலேர்ன் சர்வதேசக் கல்லூரி',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Centralized UI tokens, responsive design scales, WCAG 2.1 AA accessibility guidelines, and component specifications.',
    'zh-sg': '集中式UI设计令牌、响应式网格体系、WCAG 2.1 AA无障碍指引及组件规范说明。',
    'ta-sg': 'மையப்படுத்தப்பட்ட UI டோக்கன்கள், பதிலளிக்கக்கூடிய அளவுகள், WCAG 2.1 AA வழிகாட்டுதல்கள் மற்றும் கூறு விவரக்குறிப்புகள்.',
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    metadataBase: new URL('https://edulearn.edu.sg'),
    alternates: {
      canonical: `/${locale}/design-system/`,
      languages: {
        en: '/en/design-system/',
        'zh-sg': '/zh-sg/design-system/',
        'ta-sg': '/ta-sg/design-system/',
        'x-default': '/en/design-system/',
      },
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function DesignSystemPage() {
  return <DesignSystemClient />;
}
