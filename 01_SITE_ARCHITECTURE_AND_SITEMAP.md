# PHASE 1: SITE ARCHITECTURE & SITE MAP AUDIT
**Target URL:** `https://www.edulearn.edu.sg/`  
**Institution:** Edulearn International College Pte. Ltd. (PEI Reg No: 201708935D)  
**Auditor:** Lead Full-Stack Web Architect, UX Researcher & CRO Specialist

---

## 1. Executive Summary & Site Footprint

The website for Edulearn International College (EIC) is a hybrid server-side rendered application (Symfony PHP framework) with client-side React islands (Symfony UX React via Webpack Encore) and Bootstrap 5 frontend styling. Assets and images are hosted across both the primary domain and a third-party agency domain (`https://www.srkeducare.com/`).

A comprehensive automated crawl revealed a total footprint of **39 indexable routes**:
- **1 Homepage** (`/`)
- **6 Institutional / Compliance Pages** (`/page/*`)
- **4 Course Category Index Pages** (`/course/*`)
- **21 Specific Course Detail Pages** (`/course/details/*`)
- **4 Operational & Student Corner Utility Pages** (`/applynow`, `/contact`, `/forms`, `/verification`)
- **3 Auxiliary Pages** (`/page/useful-links`, `/page/news-and-events`, `/gallery`)

---

## 2. Global Navigation System & Inventory

### 2.1 Top-Level Primary Navigation Bar
The desktop navigation consists of an 8-item horizontal menu bar with dropdown menus:

| Nav Item | Destination URL | Type | Status | Sub-Items / Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Home** | `/` | Direct Link | 200 OK | Canonical homepage |
| **About College** | `#` | Dropdown Toggle | N/A | Contains 6 governance and facility pages |
| ↳ *Facilites* | `/page/facilites` | Sub-page | 200 OK | Typo in URL slug and menu label (`facilites`) |
| ↳ *Our Managers* | `/page/our-managers` | Sub-page | 200 OK | Academic leadership profiles |
| ↳ *Our Academic and Examination Board* | `/page/our-academic-and-examination-board` | Sub-page | 200 OK | CPE-mandated board responsibilities & members |
| ↳ *Our Teachers Deployment* | `/page/our-teachers-deployment` | Sub-page | 200 OK | Massive 94KB monolithic page listing 35 deployments |
| ↳ *Our Registration Certificates* | `/page/our-registration-certificates` | Sub-page | 200 OK | Base64-embedded scan images (SWDA/CPE, bizSAFE) |
| ↳ *Our Organisation Structure* | `/page/our-organisation-structure` | Sub-page | 200 OK | Static raster image of organisation hierarchy |
| **Courses** | `#` | Dropdown Toggle | N/A | Categorical course taxonomy |
| ↳ *Diploma Courses* | `/course/diploma-courses` | Category Page | 200 OK | Lists 13 diploma programs |
| ↳ *Advanced Diploma Courses* | `/course/advanced-diploma-courses` | Category Page | 200 OK | Lists 5 advanced diploma programs |
| ↳ *Short Term Courses* | `/course/short-term-courses` | Category Page | 200 OK | Single view of 5 modular certificates |
| ↳ *Postgraduate Diploma Courses* | `/course/postgraduate-diploma-courses` | Category Page | 200 OK | Lists 2 postgraduate diplomas |
| **Student Corner** | `#` | Dropdown Toggle | N/A | Student portal and governance forms |
| ↳ *Useful Links* | `/page/useful-links` | Sub-page | 200 OK | Outbound links to TP Gateway, MOE, ICA |
| ↳ *Forms* | `/forms` | Sub-page | 200 OK | Table of 3 downloadable compliance PDFs |
| ↳ *Student Certiticate Verification* | `/verification` | Sub-page | 200 OK | Typo in slug/title (`Certiticate`); React form |
| **News and Events** | `/page/news-and-events` | Direct Link | 200 OK | Text announcements duplicates ticker |
| **Gallery** | `/gallery` | Direct Link | 200 OK | Photo gallery using `gg-box` grid script |
| **Contact Us** | `/contact` | Direct Link | 200 OK | Contact info, map details, React inquiry form |
| **Apply Now** (CTA) | `/applynow` | Action Button | 200 OK | Styled as orange pill button (`web-bg-orange`) |

### 2.2 Complete Course Route Inventory (21 Programs)

#### Diploma Programs (`/course/diploma-courses`)
1. `/course/details/26` — Diploma in Mechanical And Electrical Engineering
2. `/course/details/27` — Diploma in Information Technology
3. `/course/details/28` — Diploma in Facilities Management
4. `/course/details/29` — Diploma in Chemical and Process Engineering
5. `/course/details/30` — Diploma in Quantity Surveying and Construction Management
6. `/course/details/31` — Diploma in Civil Engineering
7. `/course/details/32` — Diploma in Mechanical Engineering
8. `/course/details/33` — Diploma in Electrical and Electronics Engineering
9. `/course/details/34` — Diploma in Hospitality Management
10. `/course/details/78` — Diploma in Caregiving and Healthcare Assistant
11. `/course/details/80` — Diploma in Logistics and Supply Chain Management (E-Learning)
12. `/course/details/81` — Diploma in Business Management (E-Learning)
13. `/course/details/82` — Diploma in Human Resource Management (E-Learning)

#### Advanced Diploma Programs (`/course/advanced-diploma-courses`)
14. `/course/details/35` — Advanced Diploma in Civil Engineering
15. `/course/details/36` — Advanced Diploma in Electrical and Electronics Engineering
16. `/course/details/37` — Advanced Diploma in Mechanical Engineering
17. `/course/details/70` — Advanced Diploma in Mechanical and Electrical Engineering
18. `/course/details/79` — Advanced Diploma in Construction Management

#### Short Term Courses (`/course/short-term-courses`)
19. `/course/details/38` — Short Term Courses (Consolidated page featuring MS Office Basic, MS Office Advanced, Spoken English, CAD, and Computer Hardware & Networking)

#### Postgraduate Diploma Programs (`/course/postgraduate-diploma-courses`)
20. `/course/details/71` — Postgraduate Diploma in Mechanical and Electrical Instrumentation Control Engineering
21. `/course/details/72` — Postgraduate Diploma in Business Management

---

## 3. Visual Tree Diagram: Current Information Architecture

```
[ https://www.edulearn.edu.sg/ ] (Homepage)
 │
 ├── [ Header Section ]
 │    ├── Logo (External SRKEduCare link)
 │    ├── bizSAFE Accreditation Badge
 │    └── Global "Apply Now" CTA Button
 │
 ├── [ Main Navigation Menu ]
 │    │
 │    ├── 01. Home [/]
 │    │
 │    ├── 02. About College [Dropdown]
 │    │    ├── Facilities [/page/facilites] (Typo in URL)
 │    │    ├── Our Managers [/page/our-managers]
 │    │    ├── Academic & Examination Board [/page/our-academic-and-examination-board]
 │    │    ├── Teachers Deployment [/page/our-teachers-deployment] (Monolithic 94KB)
 │    │    ├── Registration Certificates [/page/our-registration-certificates] (Base64 Scans)
 │    │    └── Organisation Structure [/page/our-organisation-structure] (Static Image)
 │    │
 │    ├── 03. Courses [Dropdown]
 │    │    ├── Diploma Courses [/course/diploma-courses]
 │    │    │    ├── Diploma in Mechanical & Electrical Engineering [/course/details/26]
 │    │    │    ├── Diploma in Information Technology [/course/details/27]
 │    │    │    ├── Diploma in Facilities Management [/course/details/28]
 │    │    │    ├── Diploma in Chemical & Process Engineering [/course/details/29]
 │    │    │    ├── Diploma in QS & Construction Management [/course/details/30]
 │    │    │    ├── Diploma in Civil Engineering [/course/details/31]
 │    │    │    ├── Diploma in Mechanical Engineering [/course/details/32]
 │    │    │    ├── Diploma in Electrical & Electronics Engineering [/course/details/33]
 │    │    │    ├── Diploma in Hospitality Management [/course/details/34]
 │    │    │    ├── Diploma in Caregiving & Healthcare Assistant [/course/details/78]
 │    │    │    ├── Diploma in Logistics & SCM (E-Learning) [/course/details/80]
 │    │    │    ├── Diploma in Business Management (E-Learning) [/course/details/81]
 │    │    │    └── Diploma in Human Resource Management (E-Learning) [/course/details/82]
 │    │    │
 │    │    ├── Advanced Diploma Courses [/course/advanced-diploma-courses]
 │    │    │    ├── Adv Diploma in Civil Engineering [/course/details/35]
 │    │    │    ├── Adv Diploma in Electrical & Electronics Engineering [/course/details/36]
 │    │    │    ├── Adv Diploma in Mechanical Engineering [/course/details/37]
 │    │    │    ├── Adv Diploma in Mechanical & Electrical Engineering [/course/details/70]
 │    │    │    └── Adv Diploma in Construction Management [/course/details/79]
 │    │    │
 │    │    ├── Short Term Courses [/course/short-term-courses]
 │    │    │    └── Consolidated Modular Certifications [/course/details/38]
 │    │    │         ├── MS Office Basic
 │    │    │         ├── MS Office Advanced
 │    │    │         ├── Spoken English
 │    │    │         ├── CAD
 │    │    │         └── Computer Hardware & Networking
 │    │    │
 │    │    └── Postgraduate Diploma Courses [/course/postgraduate-diploma-courses]
 │    │         ├── PG Diploma in M&E Instrumentation Control Eng [/course/details/71]
 │    │         └── PG Diploma in Business Management [/course/details/72]
 │    │
 │    ├── 04. Student Corner [Dropdown]
 │    │    ├── Useful Links [/page/useful-links] (TPGateway, MOE, ICA)
 │    │    ├── Forms [/forms]
 │    │    │    ├── Student Advisory Note [PDF Download]
 │    │    │    ├── Sample Student Contract ver 4.1 [PDF Download]
 │    │    │    └── Sample Diploma Certificate [PDF Download]
 │    │    └── Certificate Verification [/verification] (React Form)
 │    │
 │    ├── 05. News and Events [/page/news-and-events]
 │    ├── 06. Gallery [/gallery]
 │    ├── 07. Contact Us [/contact] (React Form + Little India Office Details)
 │    └── 08. Apply Now [/applynow] (React Form -> /contactaction)
 │
 ├── [ Floating Interactive Elements ]
 │    └── Persistent WhatsApp Chat Widget (`wa.me/6590049657`)
 │
 └── [ Global Footer ]
      ├── Regulatory Disclaimer ("Private Education Institute (PEI)")
      ├── Replicated About College Links
      ├── Replicated Courses Taxonomy
      ├── Replicated Student Corner Links
      ├── Appointment & Phone Lines (+65 9004 9657, +65 9641 0630, +65 6258 7189)
      ├── Direct Inboxes (admin@edulearn.edu.sg, edulearninternationalcollege@gmail.com)
      ├── Physical Campus Address (1 Jalan Berseh #02-28 New World Centre, Singapore 209037)
      ├── Social Media Links (Facebook, Instagram)
      └── Agency Attribution ("Powered by SRKEduCare")
```

---

## 4. Architectural Gaps, Redundant Paths & Structural Flaws

### 4.1 URL Slug Typos & Poor Semantic Routing
- **Typo in core route:** `/page/facilites` (spelled `facilites` instead of `facilities`). This typo appears both in the routing definition and in the navigation menu anchor text.
- **Typo in Student Corner menu:** Link says `Student Certiticate Verification` (`Certiticate` instead of `Certificate`).
- **Opaque Database IDs:** Individual course detail pages use database primary keys (`/course/details/26`, `/course/details/78`) instead of SEO-friendly, readable URL slugs like `/courses/diploma-mechanical-electrical-engineering`. This severely degrades search engine discoverability and link credibility.

### 4.2 Application Funnel Deception & Dead Ends
- The primary conversion CTA throughout the site is **"Apply Now"** (`/applynow`). However, inspecting the component (`Applynow.jsx`) shows it is **not an application portal**. It is merely a duplicate contact form that executes `axios.post('/contactaction', { ... })`.
- There is no applicant identity verification, document submission (transcripts, passport/NRIC copy, work permits), intake selection validation, or application fee payment gateway.
- A student clicking "Apply Now" expecting to matriculate is greeted with an generic 4-field inquiry form.

### 4.3 Monolithic and Bloated Page Architectures
- **`/page/our-teachers-deployment`:** This page is **94,275 bytes** long. Instead of a searchable database, filterable catalog, or grouped directory by faculty/department, it dumps all 35 teacher deployment assignments in a continuous, unstyled vertical wall of text.
- **`/page/our-registration-certificates`:** Rather than serving standard web-optimized images or official vector PDFs, this page embeds **massive base64 JPEG strings** directly in the HTML (one string is ~97KB, the second is ~296KB). This drastically inflates page weight and blocks mobile DOM rendering.

### 4.4 Redundant Content & Layout Duplication
- **News & Events Duplication:** The homepage contains a 1990s-style vertical scrolling `<marquee>` widget displaying "New Courses" and phone numbers. The dedicated `/page/news-and-events` page displays the exact same bulleted list without any dates, articles, photos, or archive.
- **Short Term Courses Architecture:** While Diploma and Advanced Diploma courses have individual sub-pages with detailed syllabi, all 5 Short Term Courses are lumped onto a single page (`/course/details/38`) with sparse formatting and no individual syllabus breakdown.

### 4.5 External Domain Coupling & Security Risks
- Critical brand assets (including the institution's primary logo `edulern-logo-6a9e91ff7b1dc.jpg`, carousel banners, and student contract PDFs) are hosted on an external agency server (`https://www.srkeducare.com/`).
- If the third-party agency domain undergoes maintenance, changes hosting, or encounters DNS failure, the college's entire website loses its branding, hero banners, and statutory compliance documents.
