# LEGACY URL MIGRATION & 301 REDIRECTION SPECIFICATION

**Institution:** Edulearn International College Pte. Ltd. (PEI Registration No: 201708935D)  
**System:** Modern Multilingual Next.js Static Export Architecture (`/en/`, `/zh-sg/`, `/ta-sg/`)  
**Deployment Strategy:** Static Export Multi-Cloud Deployment (Cloudflare Pages / Netlify / Vercel / Nginx)  
**Phase:** 21 — Technical SEO & Legacy URL Migration  

---

## 1. Executive Summary

During the redevelopment of the Edulearn International College web portal, a complete crawl of the legacy web estate (`https://www.edulearn.edu.sg/`) identified **39 indexable routes**:
1. **1 Primary Entrypoint** (`/`)
2. **6 Institutional & Governance Pages** (`/page/*`)
3. **4 Course Category Taxonomies** (`/course/*`)
4. **21 Specific Course Detail Pages** (`/course/details/*`)
5. **4 Operational & Student Corner Utility Pages** (`/applynow`, `/contact`, `/forms`, `/verification`)
6. **3 Auxiliary Pages** (`/page/useful-links`, `/page/news-and-events`, `/gallery`)

Because Next.js `output: 'export'` disables dynamic server middleware and server-side redirect handlers, permanent 301 redirects must be configured directly within the static hosting edge layer. This document specifies the comprehensive mapping table, edge configuration artifacts, and server rules.

---

## 2. Complete 301 Redirect Mapping Table

| # | Legacy URL | New Canonical URL | Status | Transformation Rationale |
|---|------------|-------------------|:------:|--------------------------|
| 1 | `/` | `/en/` | `301` | Root locale handoff to primary English edition |
| 2 | `/applynow` | `/en/apply/` | `301` | Semantic Admissions Application page |
| 3 | `/contact` | `/en/contact/` | `301` | Campus location, phone, directions & inquiry desk |
| 4 | `/forms` | `/en/forms/` | `301` | Official Student Document & Forms Library |
| 5 | `/verification` | `/en/verification/` | `301` | Certificate Verification & Trust Center |
| 6 | `/gallery` | `/en/gallery/` | `301` | Campus Facilities & Photo Gallery |
| 7 | `/about` | `/en/about/` | `301` | Direct institutional profile alias |
| 8 | `/courses` | `/en/courses/` | `301` | Course directory root alias |
| 9 | `/news` | `/en/news/` | `301` | News & Academic Notices root alias |
| 10 | `/page/facilites` | `/en/about/facilities/` | `301` | Corrects legacy URL typo (`facilites` → `facilities`) |
| 11 | `/page/facilities` | `/en/about/facilities/` | `301` | Campus Seminar & Computer Lab facilities |
| 12 | `/page/our-managers` | `/en/governance/` | `301` | Academic Managers & Executive Leadership |
| 13 | `/page/our-academic-and-examination-board` | `/en/governance/` | `301` | CPE-mandated Academic & Examination Board |
| 14 | `/page/our-teachers-deployment` | `/en/governance/` | `301` | 35 Registered Faculty Members deployment table |
| 15 | `/page/our-registration-certificates` | `/en/verification/` | `301` | CPE PEI Registration & bizSAFE certifications |
| 16 | `/page/our-organisation-structure` | `/en/governance/` | `301` | Semantic, accessible organisation structure |
| 17 | `/page/useful-links` | `/en/useful-links/` | `301` | Official SSG, TP Gateway, MOE, and ICA portals |
| 18 | `/page/news-and-events` | `/en/news/` | `301` | College notices, intakes, and event announcements |
| 19 | `/course/diploma-courses` | `/en/courses/diploma/` | `301` | 6-Month Diploma programs taxonomy |
| 20 | `/course/advanced-diploma-courses` | `/en/courses/advanced-diploma/` | `301` | Advanced Diploma programs taxonomy |
| 21 | `/course/short-term-courses` | `/en/courses/short-term/` | `301` | Modular Certifications taxonomy |
| 22 | `/course/postgraduate-diploma-courses` | `/en/courses/postgraduate-diploma/` | `301` | Postgraduate Diploma programs taxonomy |
| 23 | `/course/details/26` | `/en/courses/diploma-mechanical-and-electrical-engineering/` | `301` | Replaces numeric ID 26 with descriptive slug |
| 24 | `/course/details/27` | `/en/courses/diploma-information-technology/` | `301` | Replaces numeric ID 27 with descriptive slug |
| 25 | `/course/details/28` | `/en/courses/diploma-facilities-management/` | `301` | Replaces numeric ID 28 with descriptive slug |
| 26 | `/course/details/29` | `/en/courses/diploma-chemical-and-process-engineering/` | `301` | Replaces numeric ID 29 with descriptive slug |
| 27 | `/course/details/30` | `/en/courses/diploma-quantity-surveying-and-construction-management/` | `301` | Replaces numeric ID 30 with descriptive slug |
| 28 | `/course/details/31` | `/en/courses/diploma-civil-engineering/` | `301` | Replaces numeric ID 31 with descriptive slug |
| 29 | `/course/details/32` | `/en/courses/diploma-mechanical-engineering/` | `301` | Replaces numeric ID 32 with descriptive slug |
| 30 | `/course/details/33` | `/en/courses/diploma-electrical-and-electronics-engineering/` | `301` | Replaces numeric ID 33 with descriptive slug |
| 31 | `/course/details/34` | `/en/courses/diploma-hospitality-management/` | `301` | Replaces numeric ID 34 with descriptive slug |
| 32 | `/course/details/78` | `/en/courses/diploma-caregiving-and-healthcare-assistant/` | `301` | Replaces numeric ID 78 with descriptive slug |
| 33 | `/course/details/80` | `/en/courses/diploma-logistics-and-supply-chain-management-elearning/` | `301` | Replaces numeric ID 80 with descriptive slug |
| 34 | `/course/details/81` | `/en/courses/diploma-business-management-elearning/` | `301` | Replaces numeric ID 81 with descriptive slug |
| 35 | `/course/details/82` | `/en/courses/diploma-human-resource-management-elearning/` | `301` | Replaces numeric ID 82 with descriptive slug |
| 36 | `/course/details/35` | `/en/courses/advanced-diploma-civil-engineering/` | `301` | Replaces numeric ID 35 with descriptive slug |
| 37 | `/course/details/36` | `/en/courses/advanced-diploma-electrical-and-electronics-engineering/` | `301` | Replaces numeric ID 36 with descriptive slug |
| 38 | `/course/details/37` | `/en/courses/advanced-diploma-mechanical-engineering/` | `301` | Replaces numeric ID 37 with descriptive slug |
| 39 | `/course/details/70` | `/en/courses/advanced-diploma-mechanical-and-electrical-engineering/` | `301` | Replaces numeric ID 70 with descriptive slug |
| 40 | `/course/details/79` | `/en/courses/advanced-diploma-construction-management/` | `301` | Replaces numeric ID 79 with descriptive slug |
| 41 | `/course/details/38` | `/en/courses/short-term/` | `301` | Replaces monolithic page 38 with modular directory |
| 42 | `/course/details/71` | `/en/courses/postgraduate-diploma-mechanical-and-electrical-instrumentation-control-engineering/` | `301` | Replaces numeric ID 71 with descriptive slug |
| 43 | `/course/details/72` | `/en/courses/postgraduate-diploma-business-management/` | `301` | Replaces numeric ID 72 with descriptive slug |

---

## 3. Platform-Specific Deployment Configurations

### 3.1 Cloudflare Pages & Netlify (`public/_redirects`)
The static redirect rules are published directly to [`public/_redirects`](./public/_redirects). Upon static build, Next.js copies this file into the export output root (`out/_redirects`).
- Cloudflare Pages and Netlify automatically process `_redirects` at the edge network layer prior to serving static files.
- The `!` flag forces immediate redirection even if a matching static directory or file exists.

### 3.2 Vercel (`vercel.json`)
The Vercel configuration file [`vercel.json`](./vercel.json) defines a top-level `redirects` array with `"permanent": true` (issuing HTTP 301 status headers).

### 3.3 Nginx Web Server Configuration
If deploying behind an Nginx reverse proxy or static web server, incorporate the following map into your `server` block:

```nginx
# Legacy EIC 301 Redirect Mapping
location = /applynow { return 301 /en/apply/; }
location = /contact { return 301 /en/contact/; }
location = /forms { return 301 /en/forms/; }
location = /verification { return 301 /en/verification/; }
location = /gallery { return 301 /en/gallery/; }

# Institutional
location = /page/facilites { return 301 /en/about/facilities/; }
location = /page/facilities { return 301 /en/about/facilities/; }
location = /page/our-managers { return 301 /en/governance/; }
location = /page/our-academic-and-examination-board { return 301 /en/governance/; }
location = /page/our-teachers-deployment { return 301 /en/governance/; }
location = /page/our-registration-certificates { return 301 /en/verification/; }
location = /page/our-organisation-structure { return 301 /en/governance/; }
location = /page/useful-links { return 301 /en/useful-links/; }
location = /page/news-and-events { return 301 /en/news/; }

# Course Categories
location = /course/diploma-courses { return 301 /en/courses/diploma/; }
location = /course/advanced-diploma-courses { return 301 /en/courses/advanced-diploma/; }
location = /course/short-term-courses { return 301 /en/courses/short-term/; }
location = /course/postgraduate-diploma-courses { return 301 /en/courses/postgraduate-diploma/; }

# Course Details
location = /course/details/26 { return 301 /en/courses/diploma-mechanical-and-electrical-engineering/; }
location = /course/details/27 { return 301 /en/courses/diploma-information-technology/; }
location = /course/details/28 { return 301 /en/courses/diploma-facilities-management/; }
location = /course/details/29 { return 301 /en/courses/diploma-chemical-and-process-engineering/; }
location = /course/details/30 { return 301 /en/courses/diploma-quantity-surveying-and-construction-management/; }
location = /course/details/31 { return 301 /en/courses/diploma-civil-engineering/; }
location = /course/details/32 { return 301 /en/courses/diploma-mechanical-engineering/; }
location = /course/details/33 { return 301 /en/courses/diploma-electrical-and-electronics-engineering/; }
location = /course/details/34 { return 301 /en/courses/diploma-hospitality-management/; }
location = /course/details/78 { return 301 /en/courses/diploma-caregiving-and-healthcare-assistant/; }
location = /course/details/80 { return 301 /en/courses/diploma-logistics-and-supply-chain-management-elearning/; }
location = /course/details/81 { return 301 /en/courses/diploma-business-management-elearning/; }
location = /course/details/82 { return 301 /en/courses/diploma-human-resource-management-elearning/; }

location = /course/details/35 { return 301 /en/courses/advanced-diploma-civil-engineering/; }
location = /course/details/36 { return 301 /en/courses/advanced-diploma-electrical-and-electronics-engineering/; }
location = /course/details/37 { return 301 /en/courses/advanced-diploma-mechanical-engineering/; }
location = /course/details/70 { return 301 /en/courses/advanced-diploma-mechanical-and-electrical-engineering/; }
location = /course/details/79 { return 301 /en/courses/advanced-diploma-construction-management/; }

location = /course/details/38 { return 301 /en/courses/short-term/; }

location = /course/details/71 { return 301 /en/courses/postgraduate-diploma-mechanical-and-electrical-instrumentation-control-engineering/; }
location = /course/details/72 { return 301 /en/courses/postgraduate-diploma-business-management/; }
```

### 3.4 Apache Web Server Configuration (`.htaccess`)
Add the following directives to `.htaccess`:

```apache
RewriteEngine On
Redirect 301 /applynow /en/apply/
Redirect 301 /contact /en/contact/
Redirect 301 /forms /en/forms/
Redirect 301 /verification /en/verification/
Redirect 301 /gallery /en/gallery/

Redirect 301 /page/facilites /en/about/facilities/
Redirect 301 /page/facilities /en/about/facilities/
Redirect 301 /page/our-managers /en/governance/
Redirect 301 /page/our-academic-and-examination-board /en/governance/
Redirect 301 /page/our-teachers-deployment /en/governance/
Redirect 301 /page/our-registration-certificates /en/verification/
Redirect 301 /page/our-organisation-structure /en/governance/
Redirect 301 /page/useful-links /en/useful-links/
Redirect 301 /page/news-and-events /en/news/

Redirect 301 /course/diploma-courses /en/courses/diploma/
Redirect 301 /course/advanced-diploma-courses /en/courses/advanced-diploma/
Redirect 301 /course/short-term-courses /en/courses/short-term/
Redirect 301 /course/postgraduate-diploma-courses /en/courses/postgraduate-diploma/

Redirect 301 /course/details/26 /en/courses/diploma-mechanical-and-electrical-engineering/
Redirect 301 /course/details/27 /en/courses/diploma-information-technology/
Redirect 301 /course/details/28 /en/courses/diploma-facilities-management/
Redirect 301 /course/details/29 /en/courses/diploma-chemical-and-process-engineering/
Redirect 301 /course/details/30 /en/courses/diploma-quantity-surveying-and-construction-management/
Redirect 301 /course/details/31 /en/courses/diploma-civil-engineering/
Redirect 301 /course/details/32 /en/courses/diploma-mechanical-engineering/
Redirect 301 /course/details/33 /en/courses/diploma-electrical-and-electronics-engineering/
Redirect 301 /course/details/34 /en/courses/diploma-hospitality-management/
Redirect 301 /course/details/78 /en/courses/diploma-caregiving-and-healthcare-assistant/
Redirect 301 /course/details/80 /en/courses/diploma-logistics-and-supply-chain-management-elearning/
Redirect 301 /course/details/81 /en/courses/diploma-business-management-elearning/
Redirect 301 /course/details/82 /en/courses/diploma-human-resource-management-elearning/

Redirect 301 /course/details/35 /en/courses/advanced-diploma-civil-engineering/
Redirect 301 /course/details/36 /en/courses/advanced-diploma-electrical-and-electronics-engineering/
Redirect 301 /course/details/37 /en/courses/advanced-diploma-mechanical-engineering/
Redirect 301 /course/details/70 /en/courses/advanced-diploma-mechanical-and-electrical-engineering/
Redirect 301 /course/details/79 /en/courses/advanced-diploma-construction-management/

Redirect 301 /course/details/38 /en/courses/short-term/

Redirect 301 /course/details/71 /en/courses/postgraduate-diploma-mechanical-and-electrical-instrumentation-control-engineering/
Redirect 301 /course/details/72 /en/courses/postgraduate-diploma-business-management/
```

---

## 4. Verification and Search Console Audit

1. **HTTP Status Code Validation**:
   - Every legacy path returns `301 Moved Permanently`.
   - The destination is a 200 OK canonical URL ending in a trailing slash.
   - Zero redirect loops (`A → B → A`) or multi-hop chains (`A → B → C`).

2. **Indexation & PageRank Preservation**:
   - Link equity and historical backlinks from Singapore government websites, SSG directories, and partner portals are retained without loss.
   - Hreflang alternates (`en`, `zh-sg`, `ta-sg`, and `x-default`) ensure Google surfaces the correct localized edition to prospective students.
