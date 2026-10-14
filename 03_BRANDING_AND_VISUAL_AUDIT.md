# PHASE 3: BRANDING & VISUAL CONTENT AUDIT
**Target Website:** `https://www.edulearn.edu.sg/`  
**Brand Identity:** Edulearn International College (EIC)  
**Auditor:** Full-Stack Web Architect, UX Researcher & CRO Specialist

---

## 1. Visual Identity & Design Token Analysis

### 1.1 Color Palette & Swatches
The current color palette relies on high-contrast primary and accent tones extracted from the compiled CSS (`/build/app.css`):

```
┌────────────────────────────────────────────────────────────────────────┐
│ PRIMARY BRAND COLORS                                                   │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ #6F12C6 / #6E12C4 │ Deep Purple       │ Navbar background, headings    │
│ #FB5200           │ Electric Orange   │ CTAs, icons, badges, accents   │
├───────────────────┴───────────────────┴────────────────────────────────┤
│ FUNCTIONAL & ACCENT COLORS                                             │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ #25D366           │ WhatsApp Green    │ Floating WhatsApp button       │
│ #1DAF53           │ Shamrock Green    │ Card accent border, icons      │
│ #364E72           │ Steel Navy        │ Card accent border             │
│ #008080           │ Teal              │ Link highlights                │
├───────────────────┴───────────────────┴────────────────────────────────┤
│ NEUTRALS & BACKGROUNDS                                                 │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ #222429           │ Charcoal Black    │ Primary typography headings    │
│ #191E24 / #131313 │ Deep Slate        │ Body typography                │
│ #7D8185           │ Cool Grey         │ Metadata, subheaders           │
│ #F2F2F2           │ Off-White Gray    │ Section background alternating │
│ #FFFFFF           │ Pure White        │ Card containers, navbar text   │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

#### Color Evaluation & Contrast Rating:
- **Visual Vibration:** The pairing of Deep Purple (`#6F12C6`) directly against Electric Orange (`#FB5200`) generates chromatic vibration. It creates a commercial, bargain-store aesthetic rather than conveying the prestige, academic rigor, and trust expected of a Singaporean higher education institution.
- **Accessibility Failures (WCAG 2.1 AA):**
  - White text on the electric orange button (`#FB5200` on `#FFFFFF`) yields a contrast ratio of **2.98:1**, failing WCAG AA requirements for normal text (minimum 4.5:1 required).
  - Certain grey text elements (`#7D8185`) on off-white backgrounds (`#F2F2F2`) fail contrast checks on smaller viewports.

---

### 1.2 Typography System

| Property | Current Production Value | Redesign Assessment |
| :--- | :--- | :--- |
| **Primary Font Family** | `'DM Sans', sans-serif` | Clean modern sans-serif; underutilized due to arbitrary inline font tags. |
| **Icon Font** | `FontAwesome` (fa-solid, fa-brands) | Standard, but introduces external asset render-blocking latency. |
| **Heading Scale** | Inconsistent: H1 (`display-4`), H2, H3, H4, H5, H6 used haphazardly. | Lacks semantic hierarchy. H2 tags frequently wrap empty containers. |
| **Body Typography** | Default Bootstrap paragraph sizing (`1rem` / 16px). | Adequate, but line heights (`lh-lg`) are applied inconsistently. |
| **Inline Overrides** | Ubiquitous inline styles: `<span style="color:#6e12c4">` | Degrades maintainability, breaks dark mode/theming, bloats DOM. |

---

## 2. Media Inventory & Digital Asset Breakdown

### 2.1 Hero Imagery & Banner Carousel
- **Current Setup:** A 4-slide Bootstrap carousel on the homepage (`carouselExampleCaptions`).
- **Asset Sources:**
  - `banner1-6405b84e3c799.webp` (Hosted on `srkeducare.com`)
  - `banner2-6405b859b74d0.webp` (Hosted on `srkeducare.com`)
  - `banner3-6405b89348b84.webp` (Hosted on `srkeducare.com`)
  - `banner4-6405b89eb8f9e.webp` (Hosted on `srkeducare.com`)
- **Critical Flaw:** All slide captions are completely blank in the HTML DOM:
  ```html
  <div class="carousel-caption d-none d-md-block">
    <h2 class="display-4"><b></b> </h2>
    <h4></h4>
  </div>
  ```
  The images display generic stock classroom models with no college-specific value proposition, value headline, or conversion hook.

### 2.2 Facility & Campus Photos
- **Location:** Embedded in `/page/facilites`.
- **Quality:** Low-resolution, unflattering photos taken on mobile cameras of empty rooms with folding tables and fluorescent office lighting.
- **Spaces Shown:**
  - Administrative Counter
  - Classroom 1 (Seating 15)
  - Classroom 2 (Seating 14)
  - Outside View (Main Entrance at New World Centre)
- **Impression:** Projects an image of a cramped tuition center rather than an international college campus.

### 2.3 Regulatory & Governance Assets
- **Registration Certificates (`/page/our-registration-certificates`):**
  - Two massive base64 JPEG strings directly inlined in HTML:
    - SWDA / CPE Registration Certificate (~97 KB)
    - bizSAFE Level 3 Certificate (~296 KB)
  - Causes severe DOM bloat and slow First Contentful Paint (FCP).
- **Organisation Structure (`/page/our-organisation-structure`):**
  - Unresponsive raster graphic `download-1-6401eecb50174.webp`. Illegible on mobile screens without zooming.

### 2.4 Downloadable Documents (Forms / PDFs)
- **Location:** Hosted on `https://www.srkeducare.com/images/`
  1. `EIC-Student-Advisory-Note-6a9e8b88e71f1.pdf` — Mandatory CPE Form 12 (scanned document).
  2. `Sample-Student-Contract-ver-4-1-6a9e8b9ee1a57.pdf` — Singapore CPE Standard Student Contract Version 4.1.
  3. `2-Sample-Certificate-6a9e8bb2e7bd2.pdf` — Sample Diploma in Civil Engineering certificate.

### 2.5 Media Deficits & Absent Assets
- **Video Content:** **0 video assets**. No campus tours, faculty introductions, or program walkthroughs.
- **Student Testimonials:** **0 student reviews or success stories**. No graduate employment outcomes or alumni quotes.
- **Faculty Photography:** **0 portraits**. The 35 deployed educators and managers are listed purely as text.
- **Course Syllabi PDFs:** Downloadable program brochures/handbooks are missing or broken across course pages.

---

## 3. Tone of Voice & Copywriting Audit

### 3.1 Overall Persona & Writing Style
The current tone oscillates between **antiquated administrative prose** and **unprofessional informal phrasing**. It lacks the inspirational, future-forward confidence of premier Singapore private education institutes (like PSB Academy, MDIS, Kaplan, or SIM).

### 3.2 Grammatical Errors, Typographical Inconsistencies & Slang
The existing copy contains numerous glaring issues that erode institutional trust:

1. **Typos in Core Navigation & URLs:**
   - URL: `/page/facilites` $\rightarrow$ Spelled `facilites` instead of `facilities`.
   - Title tag: `Studen Resources - All Forms` $\rightarrow$ Missing 't' in `Student`.
   - Nav Link: `Student Certiticate Verification` $\rightarrow$ Spelled `Certiticate` instead of `Certificate`.
2. **Text Message Slang & Informal Shorthand on Official Pages:**
   - Homepage & News marquee:  
     > *"For More Info Pls call us@ 9004 9657 / 6258 7189 for further details."*  
     *(Use of "Pls", "@" symbol as a word, and missing spaces).*
3. **Punctuation & Grammar Flaws:**
   - Vision Statement:  
     > *"To grow into a Internationally recognized Private Education institute..."*  
     *(Should be "an internationally recognized private education institute").*
   - Mission Statement:  
     > *"To prepare students with global mindset to tackle the future work opportunities."*  
     *(Awkward phrasing; should be "with a global mindset to seize future career opportunities").*
   - Core Values Punning:  
     > *"EDUcation is a Lifelong LEARNing Journey which never ends…"*  
     *(Forced acronym pun that appears dated and uninspiring).*
4. **Encoding Artifacts in Legal Footer:**
   - Footer contains corrupted character entity:  
     > *" 2026, Edulearn International College.All Rights Reserved."*  
     *(Character encoding mismatch displaying black diamond question mark).*
