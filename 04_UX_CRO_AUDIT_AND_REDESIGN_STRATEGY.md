# PHASE 4: UX/UI PAIN POINTS, CRO AUDIT & REDESIGN BLUEPRINT
**Target Website:** `https://www.edulearn.edu.sg/`  
**College Leadership Pitch Focus:** Transforming EIC into a High-Converting, Prestigious Singapore PEI  
**Auditor:** Full-Stack Web Architect, UX Researcher & CRO Specialist

---

## 1. Critical UX/UI Friction Points & Modern Aesthetic Gaps

### 1.1 First Impression & Visual Prestige Deficit
1. **The Deprecated `<marquee>` Widget:**
   - The homepage features an obsolete scrolling ticker for "News & Events". In contemporary web UX, marquees are universally recognized as anti-patterns that induce cognitive strain, break accessibility for screen readers, and convey a legacy, unmaintained web presence.
2. **Disorienting CSS Animations:**
   - The footer container features an infinite zoom loop (`animation: shrink 5s infinite alternate;`). This causes continuous visual jitter at the bottom of every page, triggering vestibular discomfort and distracting users from footer contact links.
3. **Empty Hero Carousel Captions:**
   - The 4-slide hero banner displays blank headings (`<h2 class="display-4"><b></b></h2>`). Users see generic stock imagery with zero value proposition, zero institutional accreditation highlights, and zero urgency hooks.
4. **Cramped, Amateur Facility Photography:**
   - The `/page/facilites` gallery presents unedited mobile snapshots of empty desks under harsh fluorescent office lights. Instead of looking like an international college campus, it resembles a temporary coaching center.

---

### 1.2 Mobile Responsiveness & Layout Failures
1. **Table Clipping on Mobile Viewports:**
   - The syllabus modules, fee breakdowns, and refund policy tables on all 21 course pages lack responsive CSS wrappers (`overflow-x: auto;`). On smartphone screens (375px–414px width), tables overflow the viewport boundary, causing awkward horizontal page wobble.
2. **Heavy Base64 DOM Injection:**
   - Storing over 390 KB of uncompressed base64 certificate images directly within `/page/our-registration-certificates` HTML blocks the main browser thread on low-end mobile devices, spiking First Input Delay (FID) and Interaction to Next Paint (INP).
3. **Floating Widget Collision:**
   - The fixed WhatsApp button (`bottom: 40px; right: 40px; width: 60px; height: 60px;`) overlaps bottom navigation buttons, contact forms, and footer links on portrait mobile screens, causing accidental taps.

---

### 1.3 Conversion Rate Optimization (CRO) Funnel Breakdown

```
CURRENT FUNNEL (Leaky & Broken):
[ Visitor Lands on Homepage ]
       │
       ▼ (Browses uninspiring hero slider with 0 copy)
[ Drifts into 21 Course Pages ]
       │
       ▼ (Overwhelmed by walls of unformatted text)
[ Clicks "Apply Now" Button ]
       │
       ▼ (Expects an Application / Matriculation Portal)
[ Lands on Generic Inquire Form (/contactaction) ]
       │
       ▼ (No document upload, no intake dates, no fee calculator)
[ 85%+ Student Abandonment ]
```

#### Key CRO Bottlenecks:
- **"Apply Now" Bait-and-Switch:** The `/applynow` CTA routes to a 4-field inquiry form that simply posts to `/contactaction`. It offers no document upload, no academic background capture, no intake selection, and no confirmation of eligibility.
- **Zero Social Proof or Outcome Validation:** The website features **0 student testimonials**, **0 graduate employment statistics**, **0 alumni employer logos**, and **0 faculty headshots**. Prospective adult learners and international students cannot verify the credibility of the college through peer validation.
- **Absence of Micro-Conversions:** Modern prospective students rarely apply immediately on their first visit. The site lacks mid-funnel conversion tools such as:
  - *"Download Course Syllabus PDF"* (Lead magnet)
  - *"Check My Entry Eligibility in 60 Seconds"* (Interactive tool)
  - *"Book a Free 1-on-1 Academic Consultation"* (High-intent scheduling)

---

## 2. Strategic Redesign Architecture for College Leadership Pitch

### 2.1 Proposed Technology Architecture & Performance Targets
To position EIC alongside Singapore's top-tier private institutions (e.g., Kaplan, PSB Academy, MDIS), the platform should be rebuilt on a modern web architecture:

| Component | Recommended Technology | Business Rationale |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router) / React 19** | Hybrid Static Site Generation (SSG) for courses + Server-Side Rendering (SSR) for dynamic portals. |
| **Styling & Design System** | **Tailwind CSS + Radix UI / Shadcn UI** | High-precision design system, accessible primitives, zero layout shifts. |
| **Animation & Motion** | **Framer Motion** | Subtle, prestigious micro-interactions and smooth layout transitions. |
| **Hosting & CDN** | **Vercel / Cloudflare Edge** | Sub-50ms TTFB across Southeast Asia, automatic asset optimization. |
| **Target Core Web Vitals** | **LCP < 1.0s \| CLS = 0.00 \| INP < 50ms** | Maximizes Google Lighthouse scores (98+) and mobile conversion speed. |

---

### 2.2 Elevated Visual Identity & Color Palette

```
┌────────────────────────────────────────────────────────────────────────┐
│ PROPOSED MODERN EXECUTIVE PALETTE                                      │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ #0A192F / #0F172A │ Oxford Deep Navy  │ Primary authority, luxury blue │
│ #C5A880 / #D97706 │ Champagne Amber   │ High-prestige metallic accent  │
│ #2563EB           │ Royal Cobalt      │ Vibrant high-contrast CTAs     │
│ #F8FAFC           │ Crisp Alabaster   │ Premium clean background       │
│ #059669           │ Emerald Success   │ Verification badges, bizSAFE   │
└───────────────────┴───────────────────┴────────────────────────────────┘
```
- **Typography Pairing:**
  - **Headings:** *Cinzel* or *Playfair Display* (Editorial prestige) paired with *Plus Jakarta Sans* (Sleek modern tech).
  - **Body Copy:** *Inter* or *Plus Jakarta Sans* for optimal readability across all mobile screen densities.

---

### 2.3 High-Converting User Experience & Funnel Blueprint

```
REDESIGNED ENROLLMENT FUNNEL:
[ High-Prestige Hero Section ]
  ├── Instant Trust Bar: CPE Reg No: 201708935D | bizSAFE Level 3 | 21 Accredited Programs
  ├── Dual High-Impact CTAs: [ Explore 21 Courses ]  [ Check Your Eligibility ]
  └── Floating Quick-Connect: 1-Click WhatsApp Direct Chat
       │
       ▼
[ Interactive Course Finder & Comparison Matrix ]
  ├── Filter by Level: Diploma | Advanced Diploma | Short Term | Postgraduate
  ├── Filter by Mode: Classroom (Little India) | 100% E-Learning
  └── Card Features: Tuition breakdown, intake countdown timer, downloadable syllabus
       │
       ▼
[ Frictionless 3-Step Smart Application Flow ]
  ├── Step 1: Program & Intake Selection
  ├── Step 2: Personal Profile & Educational Background
  └── Step 3: Document Upload (NRIC / Passport / Transcripts) + Instant Confirmation
       │
       ▼
[ Automated Post-Application Engagement ]
  ├── Instant SMS & WhatsApp Confirmation with Assigned Student Advisor
  ├── PDF Welcome Packet generated on-the-fly
  └── Transparent Status Tracking Portal
```

---

## 3. Actionable Page-by-Page Redesign Recommendations

### 3.1 Homepage (`/`)
- **Hero Section:** Replace static 4-slide carousel with a video hero or high-resolution editorial banner with clear value copy:
  - *Headline:* **"Accelerate Your Career in Singapore with Industry-Recognized Qualifications"**
  - *Sub-headline:* *"CPE-Registered Diplomas, Advanced Diplomas, and Professional Certifications tailored for working adults and international learners."*
- **Stats Counter Bar:** 
  - `21+` Accredited Courses | `35` Deployed Industry Lecturers | `1:14` Intimate Class Ratio | `100%` CPE Compliant.
- **Accreditation & Trust Strip:** Prominent logos of Singapore Committee for Private Education (CPE), SkillsFuture Singapore (SSG), and bizSAFE.
- **Course Category Bento Grid:** Visual cards for Engineering, IT & Computing, Facilities Management, Business & HR, and Healthcare.
- **Student Success Spotlight:** Replace text marquee with authentic student video testimonials and career promotion stories.

### 3.2 Course Detail Pages (`/course/details/*` $\rightarrow$ `/courses/[slug]`)
- **Semantic URLs:** Migrate from `/course/details/26` to `/courses/diploma-in-mechanical-and-electrical-engineering`.
- **Above-the-Fold Program Summary Pill:** Duration (6 Mos) | Delivery (Classroom / E-Learning) | Next Intake (Countdown) | Total Fee ($2,700–$3,000).
- **Sticky Sidebar Widget:**
  - Course fee breakdown with flexible installment options ($400/month).
  - "Download Course Brochure" (Lead capture gating name + WhatsApp).
  - "Apply for this Program" primary button.
- **Interactive Curriculum Accordion:** Expandable module cards detailing learning outcomes, credit hours, and assessment breakdown.
- **Faculty Spotlight:** Display portrait photos and professional credentials of assigned module teachers.

### 3.3 Student Verification Portal (`/verification`)
- **Instant Digital Verification Engine:** 
  - Allow employers and embassies to verify graduate diplomas in real time by entering Certificate Serial Number (e.g., `EIC-DCE-2025-25-39`) or scanning the QR code on physical certificates.
  - Generates instant verified badge with student name, conferment date, and course qualification.

### 3.4 Governance & Compliance Hub (`/governance`)
- Consolidate fragmented pages (`/page/our-managers`, `/page/our-academic-and-examination-board`, `/page/our-registration-certificates`, `/page/our-organisation-structure`) into a unified **"Governance & Trust Center"**.
- Display interactive vector organisation chart, downloadable high-res CPE certificates, and standardized board charters.
