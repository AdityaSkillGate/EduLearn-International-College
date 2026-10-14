# COMPLETE INSTITUTIONAL AUDIT & WEBSITE BLUEPRINT
## EDULEARN INTERNATIONAL COLLEGE (SINGAPORE)
**Website:** `https://www.edulearn.edu.sg/`  
**Registration:** Committee for Private Education (CPE) / SSG PEI Reg No: `201708935D`  
**Campus:** 1 Jalan Berseh, #02-28 New World Centre, Singapore 209037  
**Prepared By:** Full-Stack Web Architect, UX Researcher & CRO Specialist  

---

## TABLE OF CONTENTS
1. [Phase 1: Site Architecture & Site Map](#phase-1-site-architecture--site-map)
2. [Phase 2: Comprehensive Content Blueprint](#phase-2-comprehensive-content-blueprint)
3. [Phase 3: Branding & Visual Content Audit](#phase-3-branding--visual-content-audit)
4. [Phase 4: UX/UI Pain Points & Redesign Strategy](#phase-4-uxui-pain-points--redesign-strategy)
5. [Appendix: Directory of Generated Deliverable Documents](#appendix-directory-of-generated-deliverable-documents)

---

# PHASE 1: SITE ARCHITECTURE & SITE MAP

### 1.1 Technical Footprint & Crawl Overview
The website is powered by Symfony (PHP) with Symfony UX React components (Webpack Encore) and Bootstrap 5. Assets and images are split between `https://www.edulearn.edu.sg/` and third-party developer domain `https://www.srkeducare.com/`.

An exhaustive automated crawler discovered **39 indexable routes**:
- **Homepage:** `/`
- **6 Governance & Institutional Pages:**
  - `/page/facilites` (Typo in slug and label: `facilites`)
  - `/page/our-managers`
  - `/page/our-academic-and-examination-board`
  - `/page/our-teachers-deployment` (Monolithic 94KB wall of text)
  - `/page/our-registration-certificates` (Embedded 390KB base64 images)
  - `/page/our-organisation-structure` (Static raster graphic)
- **4 Course Category Index Pages:**
  - `/course/diploma-courses`
  - `/course/advanced-diploma-courses`
  - `/course/short-term-courses`
  - `/course/postgraduate-diploma-courses`
- **21 Individual Course Detail Pages:**
  - 13 Diplomas (`/course/details/26`, `27`, `28`, `29`, `30`, `31`, `32`, `33`, `34`, `78`, `80`, `81`, `82`)
  - 5 Advanced Diplomas (`/course/details/35`, `36`, `37`, `70`, `79`)
  - 1 Short Term Courses consolidated catalog (`/course/details/38`)
  - 2 Postgraduate Diplomas (`/course/details/71`, `72`)
- **4 Functional & Interaction Pages:**
  - `/applynow` (React form submitting to `/contactaction`)
  - `/contact` (React form submitting to `/contactaction`)
  - `/forms` (Table linking to 3 compliance PDFs)
  - `/verification` (Student Certificate Verification React form)
- **3 Auxiliary Pages:**
  - `/page/useful-links` (External links: TPGateway, MOE, ICA)
  - `/page/news-and-events` (Text announcements duplicated from marquee)
  - `/gallery` (Image gallery via `gg-box` plugin)

---

### 1.2 Information Architecture Tree Diagram

```
[ https://www.edulearn.edu.sg/ ]
 │
 ├── [ Header Utility ]
 │    ├── College Logo (Hosted externally on SRKEduCare)
 │    ├── bizSAFE Accreditation Badge
 │    └── Global CTA Button: "Apply Now"
 │
 ├── [ Navigation System ]
 │    ├── Home [/]
 │    │
 │    ├── About College [Dropdown]
 │    │    ├── Facilities [/page/facilites] (Notice URL typo)
 │    │    ├── Our Managers [/page/our-managers]
 │    │    ├── Academic & Examination Board [/page/our-academic-and-examination-board]
 │    │    ├── Teachers Deployment [/page/our-teachers-deployment]
 │    │    ├── Registration Certificates [/page/our-registration-certificates]
 │    │    └── Organisation Structure [/page/our-organisation-structure]
 │    │
 │    ├── Courses [Dropdown]
 │    │    ├── Diploma Courses [/course/diploma-courses]
 │    │    │    ├── 26: Diploma in Mechanical & Electrical Engineering
 │    │    │    ├── 27: Diploma in Information Technology
 │    │    │    ├── 28: Diploma in Facilities Management
 │    │    │    ├── 29: Diploma in Chemical & Process Engineering
 │    │    │    ├── 30: Diploma in QS & Construction Management
 │    │    │    ├── 31: Diploma in Civil Engineering
 │    │    │    ├── 32: Diploma in Mechanical Engineering
 │    │    │    ├── 33: Diploma in Electrical & Electronics Engineering
 │    │    │    ├── 34: Diploma in Hospitality Management
 │    │    │    ├── 78: Diploma in Caregiving & Healthcare Assistant
 │    │    │    ├── 80: Diploma in Logistics & SCM (E-Learning)
 │    │    │    ├── 81: Diploma in Business Management (E-Learning)
 │    │    │    └── 82: Diploma in Human Resource Management (E-Learning)
 │    │    │
 │    │    ├── Advanced Diploma Courses [/course/advanced-diploma-courses]
 │    │    │    ├── 35: Advanced Diploma in Civil Engineering
 │    │    │    ├── 36: Advanced Diploma in Electrical & Electronics Engineering
 │    │    │    ├── 37: Advanced Diploma in Mechanical Engineering
 │    │    │    ├── 70: Advanced Diploma in Mechanical & Electrical Engineering
 │    │    │    └── 79: Advanced Diploma in Construction Management
 │    │    │
 │    │    ├── Short Term Courses [/course/short-term-courses]
 │    │    │    └── 38: Modular Industry Certificates (MS Office, CAD, English, Hardware)
 │    │    │
 │    │    └── Postgraduate Diploma Courses [/course/postgraduate-diploma-courses]
 │    │         ├── 71: PG Diploma in M&E Instrumentation Control Engineering
 │    │         └── 72: PG Diploma in Business Management
 │    │
 │    ├── Student Corner [Dropdown]
 │    │    ├── Useful Links [/page/useful-links]
 │    │    ├── Forms [/forms]
 │    │    │    ├── Student Advisory Note [PDF]
 │    │    │    ├── Sample Student Contract ver 4.1 [PDF]
 │    │    │    └── Sample Certificate [PDF]
 │    │    └── Student Certificate Verification [/verification]
 │    │
 │    ├── News and Events [/page/news-and-events]
 │    ├── Gallery [/gallery]
 │    ├── Contact Us [/contact]
 │    └── Apply Now [/applynow]
 │
 ├── [ Interactive Overlays ]
 │    └── Floating WhatsApp Hotline Button (+65 9004 9657)
 │
 └── [ Global Footer ]
      ├── Regulatory Tagline: "Private Education Institute (PEI)"
      ├── Replicated About & Academic Menus
      ├── Little India Campus Address (New World Centre)
      ├── Direct Phone Lines (+65 9004 9657 / 9641 0630 / 6258 7189)
      ├── Official Emails (admin@edulearn.edu.sg, edulearninternationalcollege@gmail.com)
      └── Agency Credits ("Powered by SRKEduCare")
```

---

### 1.3 Key Architectural Flaws
1. **Opaque Routing:** Course detail URLs rely on database auto-increment IDs (`/course/details/26`) rather than descriptive SEO slugs (`/courses/diploma-in-electrical-engineering`).
2. **Critical Typographical Errors in URLs:** `/page/facilites` instead of `facilities`.
3. **Funnel Disconnection:** The primary conversion button ("Apply Now") routes to a standard contact form instead of an enrollment engine.
4. **Third-Party Dependency:** Key assets (logo, PDFs, banners) reside on an external agency server (`srkeducare.com`), creating brand risk and uptime vulnerability.

---

# PHASE 2: COMPREHENSIVE CONTENT BLUEPRINT

### 2.1 Corporate Identity & Institutional Copy
- **Legal Entity:** Edulearn International College Pte. Ltd.
- **PEI Registration No:** 201708935D (CPE / SSG Registered)
- **bizSAFE Accreditation:** Level 3 Certified (Workplace Safety and Health Council)
- **Campus Address:** 1 Jalan Berseh, #02-28 New World Centre, Singapore 209037
- **Primary Welcome Headline:** "Welcome"
- **Official Intro Copy:**  
  > "Edulearn International College is a Private Education Institute (PEI). Edulearn International College provides private education services for Diploma, Advanced Diploma Programmes, Short courses to students who wish to grow in Singapore and have a good career enhancement and upgrade themselves."
- **Official Vision:**  
  > "To grow into a Internationally recognized Private Education institute providing superior Education through outstanding techniques and commitment."
- **Official Mission:**  
  > "To prepare students with global mindset to tackle the future work opportunities."
- **Core Values:**  
  > "EDUcation is a Lifelong LEARNing Journey which never ends…"

---

### 2.2 Academic Leadership & Governance

#### College Managers
- **Mr. Sakkarapani Santhosh Kumar:**
  - M.H.R.M. (Human Resource Management) — Pondicherry University, India
  - M.Sc. (Hotel Management) — Annamalai University, India
  - B.Sc. (Hotel & Catering Management) — University of Madras, India
  - ACTA (Workforce Development Agency, Singapore)
  - Workplace Safety & Health Level B (WDA Singapore)
  - Certificate IV in Training & Assessment (Australia)
  - WSQ Diploma in Adult and Continuing Education (Singapore Polytechnic)
  - Specialist Diploma in Applied Learning and Teaching (Republic Polytechnic)
- **Ms. Muthiah Vanmathi:**
  - Bachelor of Engineering (Information Engineering and Media) with Honours — Nanyang Technological University (NTU), Singapore

#### Academic & Examination Boards
- **Members:** Mr. Sakkarapani Santhosh Kumar, Ms. Muthiah Vanmathi, Ms. Velusamy Selvi (Bachelor of Business Administration, Bharathidasan University).
- **Statutory Mandate:** Set academic policies, review curricula, deploy approved teachers, oversee exam paper security, conduct mark moderation, and handle student appeals according to CPE regulations.

---

### 2.3 Facilities & Campus Infrastructure
- **Location:** New World Centre, Little India, Singapore.
- **Classroom 1:** Floor area 23 m², seating capacity 15 students.
- **Classroom 2:** Floor area 22 m², seating capacity 14 students.
- **Admin Office:** Floor area 9 m².
- **Specifications:** Fully air-conditioned, writing desks, whiteboards, digital projectors.

---

### 2.4 Complete Curriculum & Fee Catalog (21 Programs)

#### Category A: Diploma Courses (13 Programs)
- **Framework:** 6 Months Duration. Part-time (1 day/week x 4 hrs) or Full-time (5 days/week x 3 hrs). Total 96 contact hours (6 modules x 16 hrs).
- **Fees:** Full-time: $3,000 ($2,700 course fee in $500 monthly installments + $300 reg fee). Part-time: $2,700 ($2,400 course fee in $400 monthly installments + $300 reg fee).
- **Entry Criteria:** 3 GCE 'O' Level passes (incl. English C6) OR Year 10 International Equivalent OR Mature student (age 25+ with 3 yrs experience) + EIC Entry Test.
- **Attendance Mandate:** Mandatory 80% attendance.
- **Class Ratio:** 1:14 (Lectures).

| ID | Course Title | Curriculum Modules (16 Hours Each) | Delivery Mode |
| :--- | :--- | :--- | :--- |
| **26** | **Dip. in Mechanical & Electrical Engineering** | Eng. Mathematics, Electrical Principles, Strength of Materials, Electrical Machines & Drives, Engineering Drawings, Manufacturing Technology | Classroom |
| **27** | **Dip. in Information Technology** | Intro to IT, Computer Systems, MS Office, Programming, Networking Principles, Intro to Database | Classroom |
| **28** | **Dip. in Facilities Management** | FM Principles, Building Maintenance, Health & Safety, Environmental Systems, Building Services, Security & Risk Management | Classroom |
| **29** | **Dip. in Chemical & Process Engineering** | Basic Chemical Principles, Plant Operations, Heat Transfer & Fluid Flow, Reaction Engineering, Safety Management, Quality Compliance | Classroom |
| **30** | **Dip. in Quantity Surveying & Construction Management** | QS Practice, Measurement of Works, Materials Technology, Cost Estimation & Tendering, Contract Law, Project Management | Classroom |
| **31** | **Dip. in Civil Engineering** | Civil Drawings, Structural Mechanics, Concrete & Steel, Soil Mechanics & Foundation, Surveying & Leveling, Planning & Safety | Classroom |
| **32** | **Dip. in Mechanical Engineering** | Engineering Drawing, Mechanics of Fluid, Strength of Materials, Metrology & Instrumentation, Manufacturing Technology, Thermodynamics Basics | Classroom |
| **33** | **Dip. in Electrical & Electronics Engineering** | Electrical Principles, Digital Electronics, Circuit Analysis, Power Distribution, Electrical Wiring & Safety, Electronic Devices | Classroom |
| **34** | **Dip. in Hospitality Management** | F&B Service, Front Office Operations, Housekeeping, Hospitality Customer Service, Tourism Fundamentals, Hospitality Accounting | Classroom |
| **78** | **Dip. in Caregiving & Healthcare Assistant** | Caregiving Fundamentals, Nutrition & Meal Planning, First Aid & Basic Life Support, Infant & Elderly Care, Safety & Risk Management, Problem-Solving | Classroom |
| **80** | **Dip. in Logistics & Supply Chain Management** | Logistics & SCM, Purchasing SCM, Physical Distribution, Management Information Systems, Warehouse Management, Organisational Behaviour | **E-Learning** |
| **81** | **Dip. in Business Management** | Principles of Business Management, Human Resource Management, Effective Communication, Strategic Business Management, Project Management, Organisational Behaviour | **E-Learning** |
| **82** | **Dip. in Human Resource Management** | Human Resource Management, Training & Development, Effective Communication, Strategic HRM, Principles of Management, Organisational Behaviour | **E-Learning** |

#### Category B: Advanced Diploma Courses (5 Programs)
- **Framework:** 6 Months Duration. Entry: Relevant Diploma or equivalent.
- **Modules (16 Hours Each):**
  - **35: Adv. Dip. in Civil Engineering:** Drawings & Design, Technical Eng. Management, Strength of Materials, Structural Engineering, Eng. Mathematics, Hydraulics.
  - **36: Adv. Dip. in Electrical & Electronics Engineering:** Drawings & Design, Technical Eng. Management, Electrical Services & Machines, Industrial Electronics, Eng. Mathematics, Power Systems.
  - **37: Adv. Dip. in Mechanical Engineering:** Drawings & Design, Technical Eng. Management, Strength of Materials, Production Technology, Eng. Mathematics, Fluid Mechanics.
  - **70: Adv. Dip. in Mechanical & Electrical Engineering:** Strength of Materials, Production Technology, Fluid Mechanics, Principles of Electrical Eng, Electrical Services & Machines, Power Systems.
  - **79: Adv. Dip. in Construction Management:** Construction Planning & Project Management, Construction Technology, Cost & Financial Management, Contract Administration, Safety & Risk Management, Decision-Making.

#### Category C: Short Term Modular Certifications (Course 38)
- **Certificate in MS Office Basic Level:** 1 Month | 6 Contact Hours | **S$ 250/-**
- **Certificate in MS Office Advanced Level:** 1 Month | 12 Contact Hours | **S$ 450/-**
- **Certificate for Spoken English:** 1 Month | 12 Contact Hours | **S$ 400/-**
- **Certificate in CAD:** 1 Month | 12 Contact Hours | **S$ 450/-**
- **Certificate in Computer Hardware & Networking:** 1 Month | 24 Contact Hours | **S$ 900/-**

#### Category D: Postgraduate Diploma Courses (2 Programs)
- **Framework:** 12 Months Duration. Entry: Relevant Degree or Advanced Diploma with supervisory experience.
  - **71: PG Dip. in M&E Instrumentation Control Engineering:** Mechanical Systems Design, Thermodynamics & Applied Fluid Mechanics, Electrical Machines & Drives, Industrial Instrumentation Systems, Process Instrumentation & Control, PLCs & Advanced Process Control.
  - **72: PG Dip. in Business Management:** Strategic Business Management, Organisational Behaviour, Operations & Supply Chain, Marketing Management, Human Resource Management, Project Management.

---

### 2.5 Singapore Regulatory Compliance & Refund Policies
- **CPE Standard PEI-Student Contract Version 4.1 in effect.**
- **Cooling-Off Period:** 7 working days from contract execution (100% refund).
- **Refund Policy Schedule:**
  - Notice received >30 days before start: **100% refund**
  - Notice received $\le$30 days before start: **75% refund**
  - Notice received 1–5 days after start: **25% refund**
  - Notice received 6–10 days after start: **10% refund**
  - Notice received >10 days after start: **0% refund**
  - Registration fee ($300): Non-refundable and non-transferable.

---

# PHASE 3: BRANDING & VISUAL CONTENT AUDIT

### 3.1 Design Tokens & Aesthetics
- **Colors:** Primary Purple (`#6F12C6`), Electric Orange (`#FB5200`), Charcoal Heading (`#222429`), Slate Body (`#191E24`), Off-white Background (`#F2F2F2`), WhatsApp Green (`#25D366`).
- **Chromatic Clash:** High vibration between bright purple and neon orange creates a commercial bargain aesthetic, failing WCAG AA contrast standards on orange-on-white text (ratio: 2.98:1).
- **Typography:** DM Sans is specified, but visual hierarchy is damaged by erratic inline heading tags and styling overrides.

### 3.2 Media & Asset Shortfalls
- **Hero Slider:** 4 external images with completely blank caption elements in DOM.
- **Facility Photos:** Poorly lit, low-resolution interior snapshots of empty rooms.
- **Deficits:** 0 student video testimonials, 0 faculty headshots, 0 career outcome charts, 0 interactive campus previews.
- **Code Bloat:** Certificate page loads 390KB of base64 images directly inside HTML source code.

### 3.3 Tone of Voice Flaws
- Plagued by informal SMS shorthand (*"Pls call us@"*), grammatical inaccuracies (*"To grow into a Internationally recognized..."*), and awkward pun-based slogans.
- Lacks the refined prestige and career-empowering narrative required by modern adult learners and international students.

---

# PHASE 4: UX/UI PAIN POINTS & REDESIGN STRATEGY

### 4.1 Conversion Obstacles & UX Friction
1. **The Deprecated `<marquee>`:** Ticker-style text on the homepage diminishes perceived academic authority.
2. **Infinite Zooming Footer:** CSS keyframe animation causes continuous motion at the bottom of pages.
3. **Unresponsive Tables:** Syllabus and fee tables clip horizontally on mobile devices.
4. **"Apply Now" Bait-and-Switch:** The CTA routes to a generic message form instead of a guided application portal.

---

### 4.2 Proposed Redesign Architecture for Leadership Pitch

#### 1. Tech Stack & Modern Framework
- **Core Engine:** Next.js 15 (App Router) + React 19 + TypeScript.
- **Styling:** Tailwind CSS + Radix UI (accessible component primitives).
- **Motion:** Framer Motion for subtle, prestigious micro-animations.
- **Target Performance:** 100/100 Core Web Vitals (LCP < 1.0s, CLS 0, INP < 50ms).

#### 2. Reimagined Visual Identity
- **Prestige Navy:** `#0A192F` (Authority, trust, academic depth)
- **Champagne Amber:** `#D97706` / `#C5A880` (Refined metallic accent)
- **Cobalt Blue:** `#2563EB` (Accessible, high-converting CTAs)
- **Editorial Typography:** *Playfair Display* / *Cinzel* for headings, paired with *Plus Jakarta Sans* for clean, modern interface reading.

#### 3. High-Converting 3-Step Enrollment Engine
- **Step 1:** Select Program, Delivery Mode (Classroom / E-Learning), and Intake Date.
- **Step 2:** Personal Details & Academic Qualification entry with instant eligibility checker.
- **Step 3:** Document Upload (NRIC / Passport, academic transcripts) + WhatsApp/Email auto-confirmation.

#### 4. Dedicated Governance & Certificate Verification Center
- Consolidated "Trust Hub" showcasing PEI Reg No: `201708935D`, bizSAFE badge, and board credentials.
- Instant Certificate QR-Code Verification engine providing real-time credential validation for employers.

---

# APPENDIX: DIRECTORY OF GENERATED DELIVERABLE DOCUMENTS

The following structured Markdown documents have been generated in the project workspace (`c:\Users\hp\Downloads\EduLearn\`):

1. **`01_SITE_ARCHITECTURE_AND_SITEMAP.md`**  
   *Complete URL inventory, visual user flow tree, broken links, routing evaluation, and structural gaps.*
2. **`02_COMPREHENSIVE_CONTENT_BLUEPRINT.md`**  
   *Exhaustive textual and curriculum blueprint covering all 21 programs, fees, refund matrices, board profiles, and campus specifications.*
3. **`03_BRANDING_AND_VISUAL_AUDIT.md`**  
   *Design tokens, color swatches, WCAG contrast ratings, media inventory, and copy tone evaluation.*
4. **`04_UX_CRO_AUDIT_AND_REDESIGN_STRATEGY.md`**  
   *Actionable redesign roadmap, tech stack specification, CRO enrollment funnels, and executive pitch deck.*
5. **`FULL_COLLEGE_ANALYSIS_BLUEPRINT.md`**  
   *This consolidated all-in-one institutional blueprint.*
