import { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n';
import { COURSES, MODULAR_COURSES } from '@/data/courses';
import { getPublishedArticles } from '@/data/news';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

/**
 * Generates official XML sitemap with 100% published, canonical pages.
 * Includes reciprocal multilingual hreflang alternate links for Google.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date('2026-10-12T00:00:00Z');
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Core static route suffixes
  const staticRoutes: Array<{
    suffix: string;
    priority: number;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  }> = [
    { suffix: '', priority: 1.0, changeFrequency: 'weekly' },
    { suffix: 'about', priority: 0.85, changeFrequency: 'monthly' },
    { suffix: 'about/facilities', priority: 0.8, changeFrequency: 'monthly' },
    { suffix: 'governance', priority: 0.8, changeFrequency: 'monthly' },
    { suffix: 'courses', priority: 0.95, changeFrequency: 'weekly' },
    { suffix: 'courses/diploma', priority: 0.85, changeFrequency: 'weekly' },
    { suffix: 'courses/advanced-diploma', priority: 0.85, changeFrequency: 'weekly' },
    { suffix: 'courses/postgraduate-diploma', priority: 0.85, changeFrequency: 'weekly' },
    { suffix: 'courses/short-term', priority: 0.85, changeFrequency: 'weekly' },
    { suffix: 'news', priority: 0.8, changeFrequency: 'daily' },
    { suffix: 'gallery', priority: 0.7, changeFrequency: 'monthly' },
    { suffix: 'forms', priority: 0.75, changeFrequency: 'monthly' },
    { suffix: 'student-corner', priority: 0.7, changeFrequency: 'monthly' },
    { suffix: 'useful-links', priority: 0.7, changeFrequency: 'monthly' },
    { suffix: 'contact', priority: 0.85, changeFrequency: 'monthly' },
    { suffix: 'apply', priority: 0.9, changeFrequency: 'monthly' },
  ];

  // Helper to generate alternate language URLs
  const createAlternates = (pathPart: string) => ({
    languages: {
      en: `${SITE_URL}/en/${pathPart ? `${pathPart}/` : ''}`,
      'zh-sg': `${SITE_URL}/zh-sg/${pathPart ? `${pathPart}/` : ''}`,
      'ta-sg': `${SITE_URL}/ta-sg/${pathPart ? `${pathPart}/` : ''}`,
      'x-default': `${SITE_URL}/en/${pathPart ? `${pathPart}/` : ''}`,
    },
  });

  // 1. Static routes across all locales
  for (const route of staticRoutes) {
    for (const locale of LOCALES) {
      const url = `${SITE_URL}/${locale}/${route.suffix ? `${route.suffix}/` : ''}`;
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: createAlternates(route.suffix),
      });
    }
  }

  // 2. Published course detail pages
  const allCourses = [...COURSES, ...MODULAR_COURSES];
  for (const course of allCourses) {
    const coursePath = `courses/${course.slug}`;
    for (const locale of LOCALES) {
      const url = `${SITE_URL}/${locale}/${coursePath}/`;
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: createAlternates(coursePath),
      });
    }
  }

  // 3. Published news articles (Strictly exclude drafts)
  const publishedArticles = getPublishedArticles();
  for (const article of publishedArticles) {
    const articlePath = `news/${article.slug}`;
    const articleDate = new Date(article.publishDate || '2026-10-12');
    for (const locale of LOCALES) {
      const url = `${SITE_URL}/${locale}/${articlePath}/`;
      sitemapEntries.push({
        url,
        lastModified: isNaN(articleDate.getTime()) ? currentDate : articleDate,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: createAlternates(articlePath),
      });
    }
  }

  return sitemapEntries;
}
