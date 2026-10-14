import { Locale, Dictionary, DEFAULT_LOCALE, LOCALES } from './types';
import { enDictionary } from './dictionaries/en';
import { zhDictionary } from './dictionaries/zh';
import { taDictionary } from './dictionaries/ta';

const dictionaries: Record<Locale, Dictionary> = {
  en: enDictionary,
  'zh-sg': zhDictionary,
  'ta-sg': taDictionary,
};

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}

export * from './types';
