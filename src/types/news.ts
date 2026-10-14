import { Locale } from '@/lib/i18n/types';

export type ArticleCategory = 'admissions' | 'institutional' | 'academic' | 'events';
export type PublicationStatus = 'published' | 'draft';

export interface LocalizedArticleContent {
  title: string;
  summary: string;
  body: string[];
  altText: string;
}

export interface VerifiedEventDetails {
  eventDate: string; // ISO date format 'YYYY-MM-DD'
  displayDate: Record<Locale, string>;
  time: string;
  venue: string;
  registrationRequired: boolean;
  registrationNotice?: Record<Locale, string>;
}

export interface NewsArticle {
  id: string;
  slug: string;
  category: ArticleCategory;
  status: PublicationStatus;
  featured?: boolean;
  publishDate: string; // ISO format 'YYYY-MM-DD'
  displayDate: Record<Locale, string>;
  author: string;
  readingTime: string;
  image: string;
  tags: string[];
  content: Record<Locale, LocalizedArticleContent>;
  eventDetails?: VerifiedEventDetails;
}
