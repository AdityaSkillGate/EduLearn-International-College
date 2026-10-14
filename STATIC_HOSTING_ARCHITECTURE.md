# TECHNICAL FOUNDATION & STATIC HOSTING ARCHITECTURE
## EDULEARN INTERNATIONAL COLLEGE (SINGAPORE)
**Target Platform:** Next.js 16 (App Router) • Pure Static Site Generation (SSG) • Zero Database  
**Canonical Locales:** English (`/en/`), Singapore Chinese (`/zh-sg/`), Singapore Tamil (`/ta-sg/`)  
**PEI Registration No:** 201708935D (Committee for Private Education / SSG Singapore)  

---

## 1. Static Hosting Architecture Overview

The modernized Edulearn International College portal is architected as an **immutable, high-security, high-performance static website** (`output: 'export'`). 

### Core Architectural Decisions:
1. **Zero Database / Serverless Decoupling:**
   - No SQL/NoSQL databases (PostgreSQL, Supabase, Firebase) or cloud sheets are linked.
   - Eliminates database latency, SQL injection vectors, connection pool exhaustion, and recurring hosting costs.
2. **Deterministic Prerendering (SSG):**
   - Every page, course slug, governance charter, and localized view is pre-compiled into static HTML, CSS, and minimal client JavaScript at build time.
   - Time to First Byte (TTFB) is reduced to sub-50ms across global edge CDNs (Vercel Edge, Cloudflare, AWS CloudFront).
3. **Locale Routing Model:**
   - Locales are established as explicit path segments:
     - `https://www.edulearn.edu.sg/en/` (English default)
     - `https://www.edulearn.edu.sg/zh-sg/` (Singapore Simplified Chinese)
     - `https://www.edulearn.edu.sg/ta-sg/` (Singapore Tamil)
   - Prerendered via `generateStaticParams()` returning `['en', 'zh-sg', 'ta-sg']`.

---

## 2. Static Host Limitations & Production Workarounds

Because static export produces pre-rendered HTML without an active Node.js server runtime, traditional server-side features must be adapted:

### 2.1 HTTP Redirects & Root Navigation
- **Limitation:** In static hosting, standard Next.js `middleware.ts` cannot execute server-side request interception or dynamic HTTP 307 headers.
- **Production Solution:**
  1. The root index file (`out/index.html`) contains a dual-layer client redirect: an immediate `<meta http-equiv="refresh" content="0; url=/en/" />` header and a client-side `router.replace('/en/')` trigger.
  2. For platforms like **Vercel** (`vercel.json`) or **Cloudflare Pages** (`_redirects`), a single-line edge rule forwards `/` to `/en/` with HTTP 301.

### 2.2 Form Submissions & Application Ingestion
- **Limitation:** Next.js Server Actions and API route handlers (`/api/...`) cannot execute without a server runtime.
- **Production Solution:**
  - Prospective student inquiries and eligibility checks utilize **client-validated direct dispatch**:
    - **Admissions WhatsApp Integration:** Forms automatically serialize selected course, applicant name, and qualifications into an encrypted URL query string for 1-click WhatsApp Admissions dispatch (`https://wa.me/6590049657?text=...`).
    - **Mailto Dispatch / Static Webhooks:** Submissions can route directly via `mailto:admin@edulearn.edu.sg` or connect to serverless static form endpoints (e.g., Formspree, Formkeep, or AWS SES API Gateway) without exposing private college database credentials.
  - **Zero False Success Rule:** The UI explicitly discloses the transmission method and never triggers a false confirmation message before actual delivery.

### 2.3 Student Certificate Verification Portal
- **Limitation:** Real-time database queries to verify student diplomas cannot query a private server on a static host.
- **Production Solution:**
  - **Public Verification Registry Hash Table:** Verified graduate certificate serial numbers (e.g. `EIC-DCE-2025-25-39`) and conferment hashes are pre-indexed into a secure, read-only static index.
  - Verification requests match against this static registry client-side. Valid serials display the official qualification, conferment date, and course title instantly; unknown numbers prompt a direct administrative inquiry without exposing student databases.

### 2.4 Live Chat & Admissions Hotlines
- **Limitation:** Heavy JavaScript chatbots (e.g., Intercom, Zendesk) degrade Core Web Vitals (INP and TBT) and inject third-party tracking scripts.
- **Production Solution:**
  - Native, accessible WhatsApp floating trigger linking directly to the college admissions hotline (`+65 9004 9657`). Zero JavaScript footprint, 100% mobile responsive.

---

## 3. Deployment Configurations

### 3.1 Vercel Deployment (`vercel.json`)
```json
{
  "cleanUrls": false,
  "trailingSlash": true,
  "redirects": [
    {
      "source": "/",
      "destination": "/en/",
      "permanent": true
    }
  ]
}
```

### 3.2 Cloudflare Pages (`_redirects`)
```
/ /en/ 301
```

### 3.3 Apache / Nginx Static Servers
```nginx
location = / {
    return 301 /en/;
}
location / {
    try_files $uri $uri/ =404;
}
```
