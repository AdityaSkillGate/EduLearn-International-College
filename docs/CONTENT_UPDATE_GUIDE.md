# Edulearn International College (EIC) - Local Content Publishing & Operations Guide

> **Official Institutional Documentation for College Administrators & Academic Secretariat**  
> **Platform Architecture**: Next.js 16 (Static Export `output: 'export'`), TypeScript, Tailwind CSS  
> **Source of Truth**: CPE Statutory Filings, SSG Registration, and Official Academic Board Directives  
> **PEI Registration No**: 201708935D | bizSAFE Level 3  

---

## 1. Overview of the Local Content Publishing System

Edulearn International College operates on an immutable, privacy-first **Static-Site Architecture**. There are no external databases, CMS portals, or live administrative login dashboards that could create security risks or disclose student records.

All public content is governed by structured, strongly-typed TypeScript models located in the repository:
- **News, Dispatches & Events**: [`src/data/news.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/data/news.ts)
- **Course Catalogue & Modules**: [`src/data/courses.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/data/courses.ts)
- **Student Documents & Forms**: [`src/data/documents.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/data/documents.ts)
- **Student Welfare & External Links**: [`src/data/studentResources.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/data/studentResources.ts)
- **Leadership & Governance**: [`src/data/governance.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/data/governance.ts)
- **Campus Facilities**: [`src/data/facilities.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/data/facilities.ts)

---

## 2. Publishing News Articles & Campus Announcements

All articles are defined in [`src/data/news.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/data/news.ts).

### Step-by-Step Instructions:

1. Open [`src/data/news.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/data/news.ts).
2. Append a new object to the `NEWS_ARTICLES` array following the `NewsArticle` schema:

```typescript
{
  id: 'art-unique-id',
  slug: 'descriptive-kebab-case-slug', // Used in URL: /[locale]/news/[slug]/
  category: 'admissions', // 'admissions' | 'institutional' | 'academic' | 'events'
  status: 'published',    // Set 'published' to generate, or 'draft' to hide
  featured: false,        // If true, prominently featured on the news index
  publishDate: '2026-03-01', // ISO format YYYY-MM-DD
  displayDate: {
    en: '1 March 2026',
    'zh-sg': '2026年3月1日',
    'ta-sg': '1 மார்ச் 2026',
  },
  author: 'Office of Academic Affairs',
  readingTime: '3 min read',
  image: '/images/hero-campus.jpg', // File must reside in public/images/
  tags: ['Engineering', 'Admissions', '2026'],
  content: {
    en: {
      title: 'English Announcement Headline',
      summary: 'Concise 1-2 sentence overview for previews and social sharing.',
      body: [
        'First paragraph of official text.',
        'Second paragraph detailing course regulations or campus schedules.',
      ],
      altText: 'Descriptive explanation of the photography for screen readers',
    },
    'zh-sg': {
      title: '中文官方公告标题',
      summary: '用于首页与卡片展示的一句话简述。',
      body: [
        '第一段正式公报内容。',
        '第二段涉及学制安排或法规遵从说明。',
      ],
      altText: '无障碍图像文字说明',
    },
    'ta-sg': {
      title: 'தமிழ் தலைப்பு',
      summary: 'சுருக்கமான விளக்கம்.',
      body: [
        'முதல் பத்தி தகவல்.',
      ],
      altText: 'படத்தின் மாற்று உரை',
    },
  },
}
```

---

## 3. Draft & Staging Control (Preventing Accidental Indexing)

The static site generator strictly distinguishes between draft and live content:

* **Published Articles (`status: 'published'`)**:
  - Automatically prerendered by `generateStaticParams()` across all 3 locales (`en`, `zh-sg`, `ta-sg`).
  - Indexed in search engines and included in the chronological archive and news ticker.
* **Draft Articles (`status: 'draft'`)**:
  - Excluded from `getPublishedArticles()`.
  - **Zero static HTML files are generated** during `next build`.
  - Visiting a draft URL returns a 404 Not Found error.
  - Safe for preparing internal reviews, confidential board notices, or upcoming course approvals before regulatory sign-off.

---

## 4. Attaching Verified Campus Events

When an announcement involves a physical or scheduled seminar, orientation, or ceremony, add the `eventDetails` block:

```typescript
eventDetails: {
  eventDate: '2026-03-15',
  displayDate: {
    en: 'Saturday, 15 March 2026',
    'zh-sg': '2026年3月15日（星期六）',
    'ta-sg': 'சனிக்கிழமை, 15 மார்ச் 2026',
  },
  time: '2:00 PM – 4:00 PM SGT',
  venue: 'Classroom 1, #02-28 New World Centre, 1 Jalan Berseh, Singapore 209037',
  registrationRequired: true,
  registrationNotice: {
    en: 'RSVP required via WhatsApp (+65 9004 9657) due to classroom capacity limits.',
    'zh-sg': '受教室座位上限限制，请通过招生专线或WhatsApp（+65 9004 9657）提前预约。',
    'ta-sg': 'வகுப்பறை இட வரம்பு காரணமாக முன்பதிவு அவசியம்.',
  },
}
```

> **Important**: Never publish unconfirmed dates or placeholder venues. In accordance with CPE ERF guidelines, only publish real dates for orientation, examination, or convocation.

---

## 5. Adding New Photos or Documents

1. Place image files (JPEG, WebP, PNG) into [`public/images/`](file:///c:/Users/hp/Downloads/EduLearn/public/images).
2. Place official downloadable PDF forms into [`public/documents/`](file:///c:/Users/hp/Downloads/EduLearn/public/documents).
3. Reference them with root-relative paths in data files:
   - Images: `/images/your-photo.jpg`
   - Documents: `/documents/Your-Document.pdf`

---

## 6. Testing, Validation & Rebuilding the Static Site

To verify changes and build the updated website:

### Step 1: Type Checking
Run the TypeScript compiler to ensure all localized fields and data models are valid:
```bash
npm run typecheck
```
*Expected Result*: Exits with code `0` and no errors.

### Step 2: Local Preview
Launch the local development server:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser and verify the new article under `/en/news`, `/zh-sg/news`, and `/ta-sg/news`.

### Step 3: Production Static Build
Execute the production static export:
```bash
npm run build
```
*Expected Result*: Next.js compiles all pages with Turbopack and exports the complete HTML/CSS/JS bundles into the `out/` directory.

### Step 4: Deployment
Deploy the contents of the `out/` directory to your web server (e.g. AWS S3/CloudFront, Cloudflare Pages, Vercel, or institutional Apache/Nginx web server).
