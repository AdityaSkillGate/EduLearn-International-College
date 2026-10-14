import { Locale } from '@/lib/i18n/types';

/**
 * Educational program levels offered by Edulearn International College.
 */
export type CourseLevel =
  | 'diploma'
  | 'advanced-diploma'
  | 'short-term'
  | 'postgraduate';

/**
 * Official delivery mode approved under Singapore PEI regulations.
 */
export type DeliveryMode = 'classroom' | 'elearning' | 'hybrid';

/**
 * Academic faculty & category taxonomy.
 */
export type CourseCategory =
  | 'engineering'
  | 'it'
  | 'facilities'
  | 'business'
  | 'healthcare'
  | 'hospitality';

/**
 * Trilingual localized text structure covering English, Singapore Simplified Chinese, and Tamil.
 */
export interface LocalizedText {
  en: string;
  'zh-sg': string;
  'ta-sg': string;
}

/**
 * Detailed localized content for rich course presentation.
 */
export interface LocalizedCourseContent {
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  careerOutcomes?: {
    en: string[];
    'zh-sg': string[];
    'ta-sg': string[];
  };
}

/**
 * Individual academic syllabus unit or module.
 */
export interface Module {
  code: string;
  title: string;
  titleZh?: string;
  titleTa?: string;
  contactHours: number;
  assessment: string;
  synopsis?: {
    en: string;
    'zh-sg'?: string;
    'ta-sg'?: string;
  };
  isVerified: boolean;
}

// Backward-compatible alias for existing imports
export type CourseModule = Module;

/**
 * Detailed installment fee breakdown for a specific study mode (Full-Time or Part-Time).
 */
export interface CourseFeeSchedule {
  courseFee: number;
  registrationFee: number;
  installmentsCount: number;
  installmentAmount: number;
  currency: string;
  notes?: string;
  isVerified: boolean;
}

/**
 * Comprehensive institutional fee structure compliant with CPE Standard Student Contract Schedule B.
 */
export interface FeeStructure {
  fullTime?: CourseFeeSchedule | null;
  partTime?: CourseFeeSchedule | null;
  modular?: {
    fee: number;
    currency: string;
    isVerified: boolean;
  } | null;
  applicationFee: {
    amount: number;
    currency: string;
    isNonRefundable: boolean;
    isVerified: boolean;
  };
  medicalInsuranceFee?: {
    amount: number;
    currency: string;
    period: string;
    isVerified: boolean;
  } | null;
  isVerified: boolean;
}

// Backward-compatible alias
export type CourseFeeStructure = FeeStructure;

/**
 * Academic entry criteria, age thresholds, and mature candidate clauses.
 */
export interface EntryRequirement {
  academicPrerequisites: LocalizedText;
  languageProficiency?: LocalizedText | null;
  minimumAge?: number | null;
  workExperienceYears?: number | null;
  matureCandidateClause?: LocalizedText | null;
  isVerified: boolean;
  // Shorthand string accessors for template compatibility
  en: string;
  'zh-sg': string;
  'ta-sg': string;
}

// Backward-compatible alias
export type CourseEntryRequirement = EntryRequirement;

/**
 * Individual modular certificate offered under the consolidated Short-Term Courses catalog entry.
 */
export interface ShortTermSubCourse {
  id: string;
  slug: string;
  title: LocalizedText;
  durationMonths: number;
  contactHours: number;
  fee: number;
  currency: string;
  targetSkills: LocalizedText;
  isVerified: boolean;
}

/**
 * Master Course entity representing an official academic program at EIC.
 */
export interface Course {
  id: string; // Stable backend audit ID (e.g., '26', '35', '38', '71')
  slug: string; // Canonical URL slug (e.g., 'diploma-mechanical-and-electrical-engineering')
  level: CourseLevel;
  category: CourseCategory;
  deliveryMode: DeliveryMode;

  durationMonths: number;
  contactHours: number;
  attendanceRequirement: string;
  teacherStudentRatio: string;
  awardingBody: string;

  // Localized narrative copy
  content: LocalizedCourseContent;

  // Direct access aliases for backward compatibility with existing components
  title: LocalizedText;
  overview: LocalizedText;

  // Modules & curriculum
  modules: Module[];

  // Entry requirements
  entryRequirements: EntryRequirement;

  // Fees & payments
  fees: FeeStructure;

  // Relational mappings
  relatedCourseIds: string[];

  // Modular components (for consolidated course ID '38')
  subCourses?: ShortTermSubCourse[];

  // Data authenticity flag
  isVerified: boolean;
  cpeRegistration?: {
    isRegistered: boolean;
    peiRegistrationNo: string;
  };
}
