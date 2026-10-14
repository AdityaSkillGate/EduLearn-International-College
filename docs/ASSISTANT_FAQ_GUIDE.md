# EIC Learning Assistant — Multilingual FAQ & Course Engine Guide

## 1. Overview & Architecture

The **EIC Learning Assistant** is a client-side, zero-database, privacy-first conversational information guide designed for Edulearn International College Singapore.

### Key Architectural Tenets
- **100% Static & Client-Side**: Operates entirely in the browser using React state. No external AI APIs, external telemetry, or server databases required.
- **Deterministic Course & Policy Grounding**: Pulls facts directly from the audited, CPE-registered course catalogue ([`src/data/courses.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/data/courses.ts)) and local FAQ repository ([`src/data/chatbotKnowledge.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/data/chatbotKnowledge.ts)).
- **Trilingual Parity**: Supports English (`en`), Singapore Simplified Chinese (`zh-sg`), and Singapore Tamil (`ta-sg`) with real-time in-panel language switching.
- **Strict Privacy Safeguards (PDPA)**: Detects and actively guards against user input containing Singapore NRIC, FIN, or passport numbers.
- **Honest Admissions Guard**: Never falsely claims to submit an application or record private candidate records; instead, hands off to the official Admissions Enquiry Form or WhatsApp desk.

---

## 2. File Organization

| File | Purpose |
| :--- | :--- |
| [`src/data/chatbotKnowledge.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/data/chatbotKnowledge.ts) | Structured FAQ knowledge base, keyword mappings, and suggested question chips. |
| [`src/lib/chatbot/assistantEngine.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/lib/chatbot/assistantEngine.ts) | Deterministic matching engine, PDPA privacy guard, intent router, and course fact formatter. |
| [`src/components/chatbot/ChatMessageItem.tsx`](file:///c:/Users/hp/Downloads/EduLearn/src/components/chatbot/ChatMessageItem.tsx) | Accessible message bubble renderer with safe text formatting (bold, links), badge pills, and action buttons. |
| [`src/components/chatbot/EICLearningAssistant.tsx`](file:///c:/Users/hp/Downloads/EduLearn/src/components/chatbot/EICLearningAssistant.tsx) | Responsive floating launcher, chat dialog, quick contact ribbon, character limits, and reset actions. |

---

## 3. How to Add a New FAQ Item

To add a new verified institutional FAQ, open [`src/data/chatbotKnowledge.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/data/chatbotKnowledge.ts) and append an item to `ASSISTANT_FAQ_ITEMS`.

### FAQ Data Schema

```typescript
export interface AssistantFAQItem {
  id: string; // Unique kebab-case identifier (e.g. 'faq-library-access')
  category:
    | 'statutory'
    | 'fees'
    | 'admissions'
    | 'campus'
    | 'pedagogy'
    | 'forms'
    | 'contact'
    | 'verification';
  keywords: {
    en: string[];      // English search tokens and synonyms
    'zh-sg': string[]; // Singapore Simplified Chinese keywords
    'ta-sg': string[]; // Singapore Tamil keywords
  };
  question: {
    en: string;        // Full question in English
    'zh-sg': string;   // Full question in Simplified Chinese
    'ta-sg': string;   // Full question in Tamil
  };
  answer: {
    en: string;        // Verified factual answer in English
    'zh-sg': string;   // Verified answer in Simplified Chinese
    'ta-sg': string;   // Verified answer in Tamil
  };
  actionLink?: {       // Optional internal destination button
    href: string;      // e.g. '/about/facilities' or '/forms'
    label: {
      en: string;
      'zh-sg': string;
      'ta-sg': string;
    };
  };
}
```

### Example Implementation

```typescript
{
  id: 'faq-wifi-digital-library',
  category: 'campus',
  keywords: {
    en: ['wifi', 'internet', 'library', 'computers', 'digital resources'],
    'zh-sg': ['wifi', '无线网络', '网络', '数字图书馆', '电脑室'],
    'ta-sg': ['வைஃபை', 'இணையம்', 'நூலகம்', 'கணினி'],
  },
  question: {
    en: 'Does EIC provide high-speed Wi-Fi and digital learning resources on campus?',
    'zh-sg': '爱尔莱校区是否提供高速无线网络（Wi-Fi）及数字化教学资源？',
    'ta-sg': 'வளாகத்தில் அதிவேக வைஃபை மற்றும் டிஜிட்டல் கற்றல் வசதிகள் உள்ளதா?',
  },
  answer: {
    en: 'Yes. All enrolled students enjoy complimentary high-speed campus Wi-Fi throughout New World Centre classrooms and access to digital course materials and lecture slides.',
    'zh-sg': '是的。所有在册学员均可在新世界中心校区课室免费接入高速校园无线网络，并可通过学员中心获取数字化电子课件与教学讲义。',
    'ta-sg': 'ஆம். நியூ வேர்ல்ட் சென்டர் வளாகத்தில் உள்ள அனைத்து மாணவர்களுக்கும் அதிவேக வைஃபை மற்றும் டிஜிட்டல் பாடக் குறிப்புகள் இலவசமாக வழங்கப்படுகின்றன.',
  },
  actionLink: {
    href: '/about/facilities',
    label: {
      en: 'View Campus Infrastructure',
      'zh-sg': '查看校区教学设施',
      'ta-sg': 'வளாக வசதிகளைக் காண்க',
    },
  },
}
```

---

## 4. How to Add or Update Suggested Questions

Quick question chips appear when a new chat session starts. To modify them, edit `SUGGESTED_QUESTIONS` in [`src/data/chatbotKnowledge.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/data/chatbotKnowledge.ts):

```typescript
export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: 'sq-courses',
    text: {
      en: 'What courses do you offer?',
      'zh-sg': '学院提供哪些正规认证课程？',
      'ta-sg': 'கல்லூரியில் என்ன படிப்புகள் உள்ளன?',
    },
    intentKey: 'courses_list',
  },
  // Add new suggested chips here...
];
```

---

## 5. Course Catalog Queries (Automatic Synchronisation)

Course-specific questions do **not** require manual FAQ authoring. The assistant engine dynamically reads the master course catalogue in [`src/data/courses.ts`](file:///c:/Users/hp/Downloads/EduLearn/src/data/courses.ts).

When a user asks:
- *"How much is the Mechanical and Electrical Diploma?"*
- *"What is the duration of Civil Engineering?"*
- *"What are the entry requirements for IT?"*

The engine automatically:
1. Matches the course entity by slug, English title, Chinese title, Tamil title, or technical keywords.
2. Formats exact verified statutory data:
   - Full-Time and Part-Time fee schedules and monthly installments
   - Registration fee (S$300) and application fee (S$54.50 incl. GST)
   - Duration in months and contact hours
   - Minimum age and academic prerequisites
   - Mature candidate clauses (e.g. 21+/25+ years, 2-3 years experience)
3. Outputs an authoritative link directly to `/[locale]/courses/[slug]`.

---

## 6. Testing & Quality Verification

Before committing changes to the knowledge base:

1. **Verify TypeScript Types**:
   ```bash
   npm run typecheck
   ```
2. **Run Locale Parity Suite**:
   ```bash
   npx tsx scripts/check-locale-parity.ts
   ```
3. **Execute Static Export**:
   ```bash
   npm run build
   ```
