# Edulearn International College — Singapore Portal

> Official modernized web portal for **Edulearn International College Pte. Ltd.**  
> Registered Private Education Institute (PEI) with the Committee for Private Education (CPE / SSG) • **PEI Reg No: 201708935D**  
> Campus: 1 Jalan Berseh, #02-28 New World Centre, Singapore 209037.

---

## 1. Project Overview & Features

This project is a high-performance, accessible, and multilingual institutional web application built with the **Next.js App Router** and exported as a **100% static site (SSG)** with zero database dependencies.

- **Multilingual Support:** Full coverage across English (`/en/`), Singapore Simplified Chinese (`/zh-sg/`), and Singapore Tamil (`/ta-sg/`).
- **21 Verified Academic Programs:** Full curricula, contact hours, 80% attendance mandate, and installment fee schedules for 13 Diplomas, 5 Advanced Diplomas, 5 Short Term Modular Certificates, and 2 Postgraduate Diplomas.
- **Singapore CPE Compliance:** Integrated Committee for Private Education standard contract (Version 4.1), statutory refund schedules, academic board disclosures, and bizSAFE certification.
- **Accessible & Responsive:** WCAG 2.1 AA compliant, screen reader skip links, focus indicators, keyboard traps, and reduced-motion support.
- **Pure Static Export:** Outputs standalone static HTML/CSS/JS into `out/` for instant deployment on any edge CDN (Vercel, Cloudflare, Netlify, AWS S3).

---

## 2. Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | 16.4.0 | Prerendering, static export, routing |
| **UI Library** | React | 19.3.0 | Component hierarchy |
| **Language** | TypeScript | 7.0.2 | Strict type safety and data models |
| **Styling** | Tailwind CSS | 3.4.19 | Prestige executive design tokens |
| **Motion** | Framer Motion | 14.1.0 | Accessible micro-animations |
| **Icons** | Lucide React | 1.55.0 | Crisp, accessible iconography |
| **Output Mode** | Static Export (`output: 'export'`) | N/A | Serverless, immutable deployment |

---

## 3. Getting Started

### 3.1 Prerequisites
- **Node.js:** v18.18.0 or newer (v20+ recommended)
- **npm:** v9.0.0 or newer

### 3.2 Installation
```bash
# Clone or navigate to the project directory
cd EduLearn

# Install dependencies
npm install
```

### 3.3 Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The root page automatically forwards to `/en/`.

### 3.4 Type-Checking
```bash
npm run typecheck
```
Executes strict TypeScript validation across all routes, dictionaries, and components.

### 3.5 Production Build (Static Export)
```bash
npm run build
```
Generates an optimized static production export inside the `out/` folder:
- `out/index.html` (Root redirect)
- `out/en/index.html` (English edition)
- `out/zh-sg/index.html` (Singapore Chinese edition)
- `out/ta-sg/index.html` (Singapore Tamil edition)
- `out/images/edulern-logo.jpg` (Official branding asset)

---

## 4. Directory Structure

```
EduLearn/
├── public/
│   └── images/
│       └── edulern-logo.jpg       # Official college logo asset
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── error.tsx          # Client-side error boundary
│   │   │   ├── layout.tsx         # Localized layout with generateStaticParams
│   │   │   ├── loading.tsx        # Accessible loading skeleton
│   │   │   ├── not-found.tsx      # Localized 404 page
│   │   │   └── page.tsx           # Localized homepage
│   │   ├── globals.css            # Web fonts, design tokens & reduced motion
│   │   ├── layout.tsx             # Root baseline HTML shell
│   │   ├── loading.tsx            # Global loading state
│   │   ├── not-found.tsx          # Global 404 page
│   │   └── page.tsx               # Root route with static redirect
│   ├── components/
│   │   ├── common/
│   │   │   └── SkipToContent.tsx  # Accessible keyboard skip link
│   │   ├── home/
│   │   │   └── HeroSection.tsx    # Prestige editorial hero section
│   │   └── layout/
│   │       ├── AnnouncementBar.tsx# Statutory CPE details & hotline
│   │       ├── Footer.tsx         # Regulatory trust & contact footer
│   │       ├── Header.tsx         # Sticky navigation with dropdowns
│   │       ├── LanguageSwitcher.tsx # Accessible locale selector
│   │       └── MobileNav.tsx      # Sliding mobile navigation drawer
│   ├── data/
│   │   └── courses.ts             # Master registry of all 21 college programs
│   └── lib/
│       └── i18n/
│           ├── dictionaries/
│           │   ├── en.ts          # English dictionary
│           │   ├── zh.ts          # Singapore Chinese dictionary
│           │   └── ta.ts          # Singapore Tamil dictionary
│           ├── index.ts           # Dictionary helper resolver
│           └── types.ts           # Locale types and dictionary contracts
├── next.config.mjs                # Static export configuration
├── tailwind.config.ts             # Prestige Navy & Champagne Gold palette
├── tsconfig.json                  # TypeScript compiler settings
└── README.md                      # Documentation
```

---

## 5. Design System Tokens

```
Prestige Navy (Primary):      #0A192F (Tailwind: navy-900)
Champagne Gold (Accent):      #C5A880 (Tailwind: gold-500)
Alabaster (Background):       #F8FAFC (Tailwind: alabaster)
Pure White (Card Panels):     #FFFFFF
Royal Blue (Accessible CTA):  #2563EB (Tailwind: royal-600)
Emerald (Compliance Badges):  #059669 (Tailwind: emerald-600)

Editorial Headings Font:      Playfair Display, Noto Serif SC, Noto Serif Tamil, serif
UI & Body Typography:         Plus Jakarta Sans, Inter, PingFang SC, sans-serif
```

---

## 6. Static Deployment Guide

### Vercel
1. Link your Git repository on Vercel.
2. Build Command: `npm run build`
3. Output Directory: `out`
4. The deployment will deploy as a global edge static site with zero server maintenance.

### Cloudflare Pages / Netlify / AWS S3
Upload the contents of the `out/` directory. Configure single-page fallback or set root redirect to `/en/`.
See [`STATIC_HOSTING_ARCHITECTURE.md`](./STATIC_HOSTING_ARCHITECTURE.md) for web server Nginx/Apache configuration blocks.
