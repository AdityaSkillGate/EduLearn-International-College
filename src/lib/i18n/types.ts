export type Locale = 'en' | 'zh-sg' | 'ta-sg';

export const LOCALES: Locale[] = ['en', 'zh-sg', 'ta-sg'];
export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  langAttr: string;
  dir: 'ltr' | 'rtl';
}

export const LOCALE_CONFIGS: Record<Locale, LocaleConfig> = {
  en: {
    code: 'en',
    name: 'English (Singapore)',
    nativeName: 'English',
    langAttr: 'en-SG',
    dir: 'ltr',
  },
  'zh-sg': {
    code: 'zh-sg',
    name: 'Simplified Chinese (Singapore)',
    nativeName: '简体中文',
    langAttr: 'zh-Hans-SG',
    dir: 'ltr',
  },
  'ta-sg': {
    code: 'ta-sg',
    name: 'Tamil (Singapore)',
    nativeName: 'தமிழ்',
    langAttr: 'ta-SG',
    dir: 'ltr',
  },
};

export interface Dictionary {
  meta: {
    siteTitle: string;
    siteDescription: string;
    keywords: string;
  };
  announcement: {
    cpeBadge: string;
    campusLocation: string;
    hotlineLabel: string;
    hotlineNumber: string;
    whatsappLabel: string;
  };
  nav: {
    home: string;
    about: string;
    courses: string;
    governance: string;
    studentCorner: string;
    newsEvents: string;
    gallery: string;
    contact: string;
    applyNow: string;
    checkEligibility: string;
    verifyCertificate: string;
    sub: {
      aboutOverview: string;
      facilities: string;
      leadership: string;
      academicBoard: string;
      facultyDeployment: string;
      regulatoryCertificates: string;
      organisationStructure: string;
      allCourses: string;
      diplomaCourses: string;
      advDiplomaCourses: string;
      shortTermCourses: string;
      pgDiplomaCourses: string;
      studentSupport: string;
      usefulLinks: string;
      formsDownloads: string;
      studentVerification: string;
    };
  };
  footer: {
    tagline: string;
    cpeNotice: string;
    registeredAddress: string;
    quickLinks: string;
    academicPrograms: string;
    studentServices: string;
    regulatoryTrust: string;
    allRightsReserved: string;
    bizsafeCertified: string;
    erfRegistered: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
  };
  hero: {
    eyebrow: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    description: string;
    ctaExploreCourses: string;
    ctaApplyNow: string;
    ctaWhatsapp: string;
    ctaSpeakAdvisor: string;
    stats: {
      stat1Number: string;
      stat1Label: string;
      stat2Number: string;
      stat2Label: string;
      stat3Number: string;
      stat3Label: string;
      stat4Number: string;
      stat4Label: string;
    };
  };
  common: {
    skipToContent: string;
    selectLanguage: string;
    openMobileMenu: string;
    closeMobileMenu: string;
    viewAllCourses: string;
    learnMore: string;
    registeredPei: string;
    littleIndiaCampus: string;
    loading: string;
    pageNotFound: string;
    pageNotFoundDesc: string;
    returnHome: string;
    somethingWentWrong: string;
    tryAgain: string;
  };
  forms: {
    fullName: string;
    phone: string;
    email: string;
    preferredLanguage: string;
    courseInterest: string;
    studyMode: string;
    message: string;
    privacyConsent: string;
    submitWhatsApp: string;
    submitEmail: string;
    clearForm: string;
  };
  validation: {
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    minCharacters: string;
    consentRequired: string;
    resolveErrors: string;
  };
  chatbot: {
    speedDialTitle: string;
    speedDialSubtitle: string;
    whatsAppAdvisor: string;
    callAdmissions: string;
    onlineApplication: string;
    openDial: string;
    closeDial: string;
    assistantTitle: string;
    assistantSubtitle: string;
    openAssistant: string;
    closeAssistant: string;
    welcomeMessage: string;
    suggestedQuestionsTitle: string;
    inputPlaceholder: string;
    sendButtonLabel: string;
    resetChat: string;
    charLimitLabel: string;
    disclaimerText: string;
  };
  sharedUi: {
    verified: string;
    downloadPdf: string;
    viewDetails: string;
    openInNewTab: string;
    backToTop: string;
    allDispatches: string;
    readMore: string;
    filterByCategory: string;
  };
}
