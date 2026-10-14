import React from 'react';
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDictionary, LOCALE_CONFIGS } from '@/lib/i18n';
import { SkipToContent } from '@/components/common/SkipToContent';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { EICLearningAssistant } from '@/components/chatbot';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const resolvedParams = await params;
  const rawLocale = resolvedParams.locale;
  const locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);
  const config = LOCALE_CONFIGS[locale];

  return (
    <div lang={config.langAttr} dir={config.dir} className="flex-1 flex flex-col min-h-screen">
      <SkipToContent label={dict.common.skipToContent} />
      <Header locale={locale} dict={dict} />
      <main id="main-content" className="flex-1 flex flex-col focus:outline-none">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer locale={locale} dict={dict} />
      <EICLearningAssistant locale={locale} dict={dict} />
    </div>
  );
}
