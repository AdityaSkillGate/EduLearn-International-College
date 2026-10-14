'use client';

import React, { useState, useRef, useId } from 'react';
import { Locale, getDictionary } from '@/lib/i18n';
import { COURSES } from '@/data/courses';
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import {
  Send,
  MessageSquare,
  Mail,
  CheckCircle2,
  AlertCircle,
  Copy,
  RotateCcw,
  ShieldCheck,
  Phone,
  Clock,
  ExternalLink,
  Info,
  Check,
} from 'lucide-react';

export interface AdmissionsEnquiryFormProps {
  locale: Locale;
  defaultCourseSlug?: string;
  variant?: 'contact' | 'apply';
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  preferredLanguage: string;
  courseSlug: string;
  studyMode: string;
  message: string;
  privacyConsent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  preferredLanguage?: string;
  courseSlug?: string;
  studyMode?: string;
  message?: string;
  privacyConsent?: string;
}

const FORM_LOCALIZED = {
  en: {
    applyBadge: 'Course Enrolment Enquiry',
    contactBadge: 'Admissions Consultation Desk',
    applyTitle: 'Course Application & Advisory Enquiry',
    contactTitle: 'Send an Official Admissions Enquiry',
    formDesc: 'Connect directly with our admissions officers at New World Centre. Complete your details below to receive program syllabi, intake dates, and course fee structures.',
    namePlaceholder: 'e.g. Tan Wei Ming / John Smith',
    phonePlaceholder: '+65 XXXX XXXX or international format',
    phoneHint: 'Include country code if applying from overseas (e.g. +65, +91, +86).',
    emailPlaceholder: 'student.name@example.com',
    selectCoursePlaceholder: '-- Select from 21 CPE Registered Programs --',
    generalEnquiryOption: 'General Admissions Consultation (Undecided / Academic Advice)',
    generalEnquiryResolved: 'General Admissions Consultation / Undecided',
    groupDiploma: 'Diploma Programs (13)',
    groupAdvDiploma: 'Advanced Diploma Programs (5)',
    groupPgDiploma: 'Postgraduate Diploma Programs (2)',
    groupShortTerm: 'Short-Term Modular Certifications',
    courseHint: 'All listed courses are actively registered under the CPE Enhanced Registration Framework (ERF).',
    msgPlaceholder: 'Please let us know your questions regarding upcoming intake dates, module schedules, installment fees, or course entry prerequisites.',
    msgHint: 'Minimum 10 characters. Our admissions team reads and answers each question individually.',
    pdpaTitle: 'Personal Data Protection Act (PDPA) & Privacy Notice',
    pdpaDesc: 'Edulearn International College Pte. Ltd. (UEN: 201708935D) respects your privacy. The information collected above will be used solely by authorized admissions staff to provide course syllabus details, intake schedules, and fee consultation. We never share, sell, or disclose personal data to third parties.',
    pdpaWarning: 'Notice: For identity security, do not submit NRIC, FIN, Passport numbers, or original academic transcripts through this web form. Formal verification documents are examined only in-person at our campus during official contract execution.',
    submissionNote: 'Submitting directly formats your details for WhatsApp (+65 9004 9657) or official email (admin@edulearn.edu.sg). No sensitive credentials are stored in any database.',
    dispatchBadge: 'Enquiry Prepared for Dispatch',
    channelLabel: 'Channel',
    channelWa: 'Official WhatsApp',
    channelEmail: 'Default Mail Client',
    actionRequiredIn: 'Action Required in Your',
    dispatchDesc: 'Because Edulearn operates under a privacy-first static architecture, your browser or mobile phone has prepared this enquiry in your chosen application.',
    dispatchActionWa: 'Please tap "Send" in WhatsApp to deliver your message directly to our Admissions Advisor.',
    dispatchActionEmail: 'Please tap "Send" in your mail client to deliver your message directly to our Admissions Advisor.',
    transcriptTitle: 'Formatted Message Transcript',
    copyText: 'Copy Text',
    copiedText: 'Copied to Clipboard!',
    fallbackTitle: "If the application didn't open:",
    fallbackDescPart1: 'Copy the text above and send it manually to',
    fallbackDescPart2: 'or WhatsApp',
    hoursTitle: 'Advisor Operating Hours:',
    hoursDesc: 'Monday – Saturday: 10:00 AM – 7:00 PM (Singapore Time). Responses are typically dispatched within 2 business hours.',
    modifyDetails: 'Modify Enquiry Details',
    reopenWa: 'Re-open WhatsApp Chat',
    reopenEmail: 'Re-open Mail Client',
    resetConfirm: 'Are you sure you want to clear your entered details?',
    studyModes: [
      { value: 'Part-Time', label: 'Part-Time (Evenings & Weekends)' },
      { value: 'Full-Time', label: 'Full-Time (Day Cohort)' },
      { value: 'Modular / Short-Term', label: 'Modular / Short Course' },
      { value: 'Undecided / Flexible', label: 'Undecided / Need Academic Advice' },
    ],
    languages: [
      { value: 'English', label: 'English' },
      { value: 'Chinese (Mandarin)', label: 'Chinese (中文 / 华语)' },
      { value: 'Tamil', label: 'Tamil (தமிழ்)' },
      { value: 'Malay', label: 'Malay (Bahasa Melayu)' },
      { value: 'Hindi', label: 'Hindi (हिन्दी)' },
      { value: 'Other', label: 'Other Language' },
    ],
  },
  'zh-sg': {
    applyBadge: '课程报名与咨询专区',
    contactBadge: '官方招生咨询接待处',
    applyTitle: '课程申请与选课指导咨询',
    contactTitle: '发送官方入学与选课咨询',
    formDesc: '直接联系新世界中心校区招生教务专员。填写以下基本信息，即可获取最新课程大纲、开课日期及学费缴费分期方案。',
    namePlaceholder: '例如：陈伟明 / Tan Wei Ming',
    phonePlaceholder: '+65 XXXX XXXX 或国际电话格式',
    phoneHint: '如由海外咨询申请，请包含国家区号（如 +65、+86、+91）。',
    emailPlaceholder: 'student.name@example.com',
    selectCoursePlaceholder: '-- 请在21门CPE注册课程中选择 --',
    generalEnquiryOption: '综合入学咨询（尚未确定专业 / 需要选课指导）',
    generalEnquiryResolved: '综合入学咨询 / 尚未确定专业',
    groupDiploma: '大专文凭课程 (13门)',
    groupAdvDiploma: '高级大专文凭课程 (5门)',
    groupPgDiploma: '研究生文凭课程 (2门)',
    groupShortTerm: '短期模块化专业技能认证',
    courseHint: '所有列出课程均在私立教育理事会（CPE）强化注册框架（ERF）下严格注册生效。',
    msgPlaceholder: '请在此填写您想咨询的内容（如：最新开课班期、上课时间表、分期学费支付方式或入学学历审核要求）。',
    msgHint: '最少10个字符。我们的招生教务团队将逐一查阅并为您提供一对一回复。',
    pdpaTitle: '个人资料保护法（PDPA）与隐私声明',
    pdpaDesc: '爱学习国际学院私人有限公司（UEN：201708935D）严格遵守新加坡个人资料保护法。所收集信息仅供授权招生人员用于答复课程咨询、安排开学日程及学费说明，绝不向第三方透露或转售。',
    pdpaWarning: '特别提醒：为保护您的个人身份隐私与信息安全，切勿在此表单中上传身份证（NRIC）、准证（FIN）、护照号码或学历成绩单原件。正式入学材料仅在校区面对面核验并签署合同时呈交。',
    submissionNote: '点击提交将自动把您填写的内容排版生成至WhatsApp（+65 9004 9657）或官方电子邮箱（admin@edulearn.edu.sg），纯静态加密环境，无数据库存储泄露风险。',
    dispatchBadge: '咨询信息已成功生成',
    channelLabel: '咨询渠道',
    channelWa: '官方 WhatsApp 咨询渠道',
    channelEmail: '默认电子邮箱客户端',
    actionRequiredIn: '请在您的',
    dispatchDesc: '基于爱学习学院隐私优先的纯静态架构，您的浏览器或手机已在您所选择的应用程序中完整排版好此咨询内容。',
    dispatchActionWa: '请点击 WhatsApp 应用中的“发送”按钮，将咨询信息直接发送给学院招生顾问。',
    dispatchActionEmail: '请点击邮件客户端中的“发送”按钮，将咨询信息直接发送给学院招生顾问。',
    transcriptTitle: '咨询内容信息文本',
    copyText: '复制文本',
    copiedText: '已成功复制到剪贴板！',
    fallbackTitle: '如果应用程序未能自动调起：',
    fallbackDescPart1: '您可以点击上方按钮复制文本，手动发送邮件至',
    fallbackDescPart2: '或通过 WhatsApp 联系',
    hoursTitle: '招生老师接待与回复时间：',
    hoursDesc: '周一至周六：上午10:00 至 晚上7:00（新加坡时间）。工作时间内通常在2小时内为您答复。',
    modifyDetails: '返回修改咨询信息',
    reopenWa: '重新打开 WhatsApp 对话',
    reopenEmail: '重新打开邮件客户端',
    resetConfirm: '您确定要清空已输入的咨询信息吗？',
    studyModes: [
      { value: 'Part-Time', label: '业余兼读制（晚间及周末上课）' },
      { value: 'Full-Time', label: '全日制（日间常规班）' },
      { value: 'Modular / Short-Term', label: '模块化进修 / 短期技能认证' },
      { value: 'Undecided / Flexible', label: '尚未确定 / 需要专业选课规划建议' },
    ],
    languages: [
      { value: 'English', label: '英语 (English)' },
      { value: 'Chinese (Mandarin)', label: '中文 / 华语 (Chinese)' },
      { value: 'Tamil', label: '泰米尔语 (Tamil)' },
      { value: 'Malay', label: '马来语 (Bahasa Melayu)' },
      { value: 'Hindi', label: '印地语 (Hindi)' },
      { value: 'Other', label: '其他语言 (Other Language)' },
    ],
  },
  'ta-sg': {
    applyBadge: 'பாடநெறி சேர்க்கை விசாரணை',
    contactBadge: 'அதிகாரப்பூர்வ சேர்க்கை ஆலோசனை',
    applyTitle: 'பாடநெறி விண்ணப்பம் மற்றும் ஆலோசனை',
    contactTitle: 'அதிகாரப்பூர்வ சேர்க்கை விசாரணையை அனுப்பவும்',
    formDesc: 'நியூ வேர்ல்ட் சென்டரில் உள்ள எங்கள் சேர்க்கை அதிகாரிகளுடன் நேரடியாக தொடர்பு கொள்ளவும். பாடத்திட்டம், சேர்க்கை தேதிகள் மற்றும் கட்டண விவரங்களை அறிய உங்கள் தகவல்களை பூர்த்தி செய்யவும்.',
    namePlaceholder: 'எ.கா. Tan Wei Ming / John Smith',
    phonePlaceholder: '+65 XXXX XXXX அல்லது சர்வதேச வடிவம்',
    phoneHint: 'வெளிநாட்டிலிருந்து விண்ணப்பித்தால் நாட்டின் குறியீட்டைச் சேர்க்கவும் (+65, +91).',
    emailPlaceholder: 'student.name@example.com',
    selectCoursePlaceholder: '-- 21 CPE பதிவுசெய்யப்பட்ட படிப்புகளிலிருந்து தேர்வு செய்க --',
    generalEnquiryOption: 'பொது சேர்க்கை ஆலோசனை (முடிவெடுக்கவில்லை / கல்வி ஆலோசனை)',
    generalEnquiryResolved: 'பொது சேர்க்கை ஆலோசனை / முடிவெடுக்கவில்லை',
    groupDiploma: 'டிப்ளோமா படிப்புகள் (13)',
    groupAdvDiploma: 'மேம்பட்ட டிப்ளோமா படிப்புகள் (5)',
    groupPgDiploma: 'முதுகலை டிப்ளோமா படிப்புகள் (2)',
    groupShortTerm: 'குறுகிய கால சான்றிதழ் படிப்புகள்',
    courseHint: 'அனைத்து படிப்புகளும் CPE மேம்பட்ட பதிவு கட்டமைப்பின் (ERF) கீழ் பதிவு செய்யப்பட்டுள்ளன.',
    msgPlaceholder: 'சேர்க்கை தேதிகள், கட்டண தவணைகள் அல்லது தகுதி தேவைகள் குறித்த உங்கள் கேள்விகளை இங்கே குறிப்பிடவும்.',
    msgHint: 'குறைந்தபட்சம் 10 எழுத்துக்கள். எங்கள் சேர்க்கை குழுவினர் ஒவ்வொரு விசாரணைக்கும் பதிலளிப்பார்கள்.',
    pdpaTitle: 'தனிநபர் தரவு பாதுகாப்பு சட்டம் (PDPA) & தனியுரிமை அறிவிப்பு',
    pdpaDesc: 'எடுலெர்ன் சர்வதேச கல்லூரி உங்கள் தனியுரிமையை மதிக்கிறது. சேகரிக்கப்பட்ட தகவல் பாட விவரங்கள் மற்றும் சேர்க்கை ஆலோசனைக்காக மட்டுமே பயன்படுத்தப்படும். மூன்றாம் தரப்பினருக்கு பகிரப்படாது.',
    pdpaWarning: 'அறிவிப்பு: பாதுகாப்பு காரணங்களுக்காக, இந்த படிவத்தில் NRIC, FIN, பாஸ்போர்ட் எண்கள் அல்லது அசல் சான்றிதழ்களை சமர்ப்பிக்க வேண்டாம். ஒப்பந்த கையொப்பத்தின் போது மட்டுமே ஆவணங்கள் நேரில் சரிபார்க்கப்படும்.',
    submissionNote: 'சமர்ப்பிப்பது உங்கள் விவரங்களை WhatsApp (+65 9004 9657) அல்லது மின்னஞ்சல் (admin@edulearn.edu.sg) க்கு நேரடியாக மாற்றும். தரவுத்தளத்தில் எதுவும் சேமிக்கப்படுவதில்லை.',
    dispatchBadge: 'விசாரணை அனுப்ப தயாராக உள்ளது',
    channelLabel: 'சேனல்',
    channelWa: 'அதிகாரப்பூர்வ WhatsApp',
    channelEmail: 'மின்னஞ்சல் செயலி',
    actionRequiredIn: 'உங்கள் செயலியில் நடவடிக்கை தேவை:',
    dispatchDesc: 'எங்கள் பாதுகாப்பான நிலையான கட்டமைப்பின் காரணமாக, உங்கள் உலாவி இந்த விசாரணையை நீங்கள் தேர்ந்தெடுத்த செயலியில் தயார் செய்துள்ளது.',
    dispatchActionWa: 'செய்தியை எங்கள் சேர்க்கை ஆலோசகருக்கு அனுப்ப WhatsApp-ல் "Send" என்பதை அழுத்தவும்.',
    dispatchActionEmail: 'செய்தியை எங்கள் சேர்க்கை ஆலோசகருக்கு அனுப்ப உங்கள் மின்னஞ்சல் செயலியில் "Send" என்பதை அழுத்தவும்.',
    transcriptTitle: 'வடிவமைக்கப்பட்ட செய்தி உரை',
    copyText: 'உரையை நகலெடு',
    copiedText: 'நகலெடுக்கப்பட்டது!',
    fallbackTitle: 'செயலி திறக்கவில்லை என்றால்:',
    fallbackDescPart1: 'மேலே உள்ள உரையை நகலெடுத்து கைமுறையாக மின்னஞ்சல் செய்யவும்:',
    fallbackDescPart2: 'அல்லது WhatsApp மூலம் தொடர்பு கொள்ளவும்:',
    hoursTitle: 'ஆலோசகர் இயங்கும் நேரம்:',
    hoursDesc: 'திங்கள் – சனி: காலை 10:00 – மாலை 7:00 (சிங்கப்பூர் நேரம்).',
    modifyDetails: 'விவரங்களை மாற்றுக',
    reopenWa: 'WhatsApp உரையாடலை மீண்டும் திறக்கவும்',
    reopenEmail: 'மின்னஞ்சல் செயலியை மீண்டும் திறக்கவும்',
    resetConfirm: 'உள்ளிடப்பட்ட விவரங்களை அழிக்க விரும்புகிறீர்களா?',
    studyModes: [
      { value: 'Part-Time', label: 'பகுதி நேரம் (மாலை மற்றும் வார இறுதி)' },
      { value: 'Full-Time', label: 'முழு நேரம் (பகல் வகுப்புகள்)' },
      { value: 'Modular / Short-Term', label: 'குறுகிய கால படிப்பு' },
      { value: 'Undecided / Flexible', label: 'முடிவெடுக்கவில்லை / ஆலோசனை தேவை' },
    ],
    languages: [
      { value: 'English', label: 'ஆங்கிலம் (English)' },
      { value: 'Chinese (Mandarin)', label: 'சீனம் (Chinese)' },
      { value: 'Tamil', label: 'தமிழ் (Tamil)' },
      { value: 'Malay', label: 'மலாய் (Bahasa Melayu)' },
      { value: 'Hindi', label: 'இந்தி (Hindi)' },
      { value: 'Other', label: 'பிற மொழி (Other Language)' },
    ],
  },
};

export const AdmissionsEnquiryForm: React.FC<AdmissionsEnquiryFormProps> = ({
  locale,
  defaultCourseSlug = '',
  variant = 'contact',
}) => {
  const formId = useId();
  const dict = getDictionary(locale);
  const f = FORM_LOCALIZED[locale];
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successSummaryRef = useRef<HTMLDivElement>(null);

  // Group courses by level for accessible and organized select options
  const diplomaCourses = COURSES.filter((c) => c.level === 'diploma');
  const advDiplomaCourses = COURSES.filter((c) => c.level === 'advanced-diploma');
  const pgDiplomaCourses = COURSES.filter((c) => c.level === 'postgraduate');
  const shortCourses = COURSES.filter((c) => c.level === 'short-term');

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    preferredLanguage: locale === 'zh-sg' ? 'Chinese (Mandarin)' : locale === 'ta-sg' ? 'Tamil' : 'English',
    courseSlug: defaultCourseSlug,
    studyMode: 'Part-Time',
    message: '',
    privacyConsent: false,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'dispatched'>('idle');
  const [dispatchedChannel, setDispatchedChannel] = useState<'whatsapp' | 'email' | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Validation function with localized error messages
  const validateField = (name: keyof FormState, value: any): string | undefined => {
    switch (name) {
      case 'name':
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return dict.validation.required;
        }
        return undefined;

      case 'email':
        if (!value || typeof value !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return dict.validation.invalidEmail;
        }
        return undefined;

      case 'phone':
        if (!value || typeof value !== 'string') {
          return dict.validation.invalidPhone;
        }
        const cleanedPhone = value.replace(/[\s\-\+\(\)]/g, '');
        if (cleanedPhone.length < 8) {
          return dict.validation.invalidPhone;
        }
        return undefined;

      case 'preferredLanguage':
        if (!value) {
          return dict.validation.required;
        }
        return undefined;

      case 'courseSlug':
        if (!value) {
          return dict.validation.required;
        }
        return undefined;

      case 'message':
        if (!value || typeof value !== 'string' || value.trim().length < 10) {
          return dict.validation.minCharacters;
        }
        return undefined;

      case 'privacyConsent':
        if (!value) {
          return dict.validation.consentRequired;
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormState>).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) {
        newErrors[field] = err;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      preferredLanguage: true,
      courseSlug: true,
      studyMode: true,
      message: true,
      privacyConsent: true,
    });

    if (!isValid && errorSummaryRef.current) {
      errorSummaryRef.current.focus();
      errorSummaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (touched[name]) {
      const err = validateField(name as keyof FormState, type === 'checkbox' ? checked : value);
      setErrors((prev) => ({
        ...prev,
        [name]: err,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name as keyof FormState, type === 'checkbox' ? checked : value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  // Resolve selected course title
  const getSelectedCourseTitle = (): string => {
    if (formData.courseSlug === 'general-enquiry') {
      return f.generalEnquiryResolved;
    }
    const found = COURSES.find((c) => c.slug === formData.courseSlug);
    if (found) {
      return found.title[locale] || found.title.en;
    }
    return formData.courseSlug || 'Not Specified';
  };

  // Compile formatted message for honest static dispatch
  const getFormattedEnquiryBody = (): string => {
    const courseTitle = getSelectedCourseTitle();
    return [
      `--- EDULEARN ADMISSIONS ENQUIRY ---`,
      `Full Name: ${formData.name}`,
      `Contact Number: ${formData.phone}`,
      `Email Address: ${formData.email}`,
      `Preferred Language: ${formData.preferredLanguage}`,
      `Course of Interest: ${courseTitle}`,
      `Preferred Study Mode: ${formData.studyMode}`,
      ``,
      `Enquiry Message:`,
      formData.message,
      ``,
      `--- INSTITUTIONAL REFERENCE ---`,
      `Edulearn International College (CPE Reg: 201708935D)`,
      `Campus: 1 Jalan Berseh, #02-28 New World Centre, Singapore 209037`,
    ].join('\n');
  };

  // Dispatch via WhatsApp (Primary fast channel)
  const handleDispatchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    const body = getFormattedEnquiryBody();
    const encodedText = encodeURIComponent(body);
    const whatsappUrl = `https://wa.me/6590049657?text=${encodedText}`;

    // Open WhatsApp in new tab
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    setDispatchedChannel('whatsapp');
    setDispatchStatus('dispatched');

    setTimeout(() => {
      if (successSummaryRef.current) {
        successSummaryRef.current.focus();
        successSummaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Dispatch via pre-filled mailto
  const handleDispatchEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    const courseTitle = getSelectedCourseTitle();
    const subject = encodeURIComponent(`Admissions Enquiry: ${formData.name} - ${courseTitle}`);
    const body = encodeURIComponent(getFormattedEnquiryBody());
    const mailtoUrl = `mailto:admin@edulearn.edu.sg?subject=${subject}&body=${body}`;

    // Trigger user mail client
    if (typeof window !== 'undefined') {
      window.location.href = mailtoUrl;
    }

    setDispatchedChannel('email');
    setDispatchStatus('dispatched');

    setTimeout(() => {
      if (successSummaryRef.current) {
        successSummaryRef.current.focus();
        successSummaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleCopyFormattedText = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(getFormattedEnquiryBody());
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch {
        // Fallback if clipboard API is blocked
      }
    }
  };

  const handleResetForm = () => {
    if (
      formData.name ||
      formData.email ||
      formData.phone ||
      formData.message
    ) {
      if (!window.confirm(f.resetConfirm)) {
        return;
      }
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      preferredLanguage: 'English',
      courseSlug: defaultCourseSlug,
      studyMode: 'Part-Time',
      message: '',
      privacyConsent: false,
    });
    setTouched({});
    setErrors({});
    setDispatchStatus('idle');
    setDispatchedChannel(null);
  };

  const handleReturnToEdit = () => {
    setDispatchStatus('idle');
  };

  const errorCount = Object.keys(errors).filter((k) => errors[k as keyof FormErrors]).length;

  return (
    <div className="w-full">
      {/* 1. DISPATCH CONFIRMATION & VERIFICATION STATE */}
      {dispatchStatus === 'dispatched' ? (
        <Card
          ref={successSummaryRef}
          tabIndex={-1}
          variant="elevated"
          className="border-2 border-emerald-500 bg-white p-6 sm:p-8 space-y-6 shadow-prestige focus:outline-none"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="emerald" className="text-[11px]">
                  {f.dispatchBadge}
                </Badge>
                <span className="text-xs text-slate-500 font-mono">
                  {f.channelLabel}: {dispatchedChannel === 'whatsapp' ? f.channelWa : f.channelEmail}
                </span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-navy-950">
                {f.actionRequiredIn} {dispatchedChannel === 'whatsapp' ? 'WhatsApp' : 'Email'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {f.dispatchDesc}
                <strong className="text-navy-950 font-semibold block mt-1">
                  {dispatchedChannel === 'whatsapp' ? f.dispatchActionWa : f.dispatchActionEmail}
                </strong>
              </p>
            </div>
          </div>

          {/* Formatted Copy Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-navy-900 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-gold-600" aria-hidden="true" />
                <span>{f.transcriptTitle}</span>
              </span>
              <button
                type="button"
                onClick={handleCopyFormattedText}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-white border border-slate-300 text-navy-900 hover:bg-slate-100 hover:border-slate-400 transition-colors shadow-xs"
                aria-label={f.copyText}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                    <span className="text-emerald-700">{f.copiedText}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                    <span>{f.copyText}</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs font-mono bg-white p-3.5 rounded-lg border border-slate-200 text-slate-800 whitespace-pre-wrap overflow-x-auto leading-relaxed max-h-56 overflow-y-auto">
              {getFormattedEnquiryBody()}
            </pre>
          </div>

          {/* Fallback Channels & Office Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200/80 space-y-1">
              <span className="font-bold text-navy-950 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>{f.fallbackTitle}</span>
              </span>
              <p className="text-[11px] text-slate-700 leading-snug">
                {f.fallbackDescPart1} <a href="mailto:admin@edulearn.edu.sg" className="underline font-semibold text-navy-900">admin@edulearn.edu.sg</a> {f.fallbackDescPart2} <a href="https://wa.me/6590049657" className="underline font-semibold text-navy-900">+65 9004 9657</a>.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-navy-950 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold-600" />
                <span>{f.hoursTitle}</span>
              </span>
              <p className="text-[11px] text-slate-700 leading-snug">
                {f.hoursDesc}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleReturnToEdit}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{f.modifyDetails}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {dispatchedChannel === 'whatsapp' ? (
                <a
                  href={`https://wa.me/6590049657?text=${encodeURIComponent(getFormattedEnquiryBody())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{f.reopenWa}</span>
                </a>
              ) : (
                <a
                  href={`mailto:admin@edulearn.edu.sg?subject=${encodeURIComponent(`Admissions Enquiry: ${formData.name}`)}&body=${encodeURIComponent(getFormattedEnquiryBody())}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <Mail className="w-4 h-4" />
                  <span>{f.reopenEmail}</span>
                </a>
              )}
            </div>
          </div>
        </Card>
      ) : (
        /* 2. ACTIVE ENQUIRY FORM */
        <Card variant="elevated" className="border-t-4 border-t-gold-500 bg-white">
          <CardHeader className="p-6 sm:p-8 pb-4">
            <div className="flex items-center justify-between gap-2 mb-1">
              <Badge variant="gold">
                {variant === 'apply' ? f.applyBadge : f.contactBadge}
              </Badge>
              <span className="text-[11px] font-mono text-slate-500">
                CPE Reg No: 201708935D
              </span>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-serif text-navy-950">
              {variant === 'apply' ? f.applyTitle : f.contactTitle}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              {f.formDesc}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 pt-2 space-y-6">
            {/* Top Error Alert Summary (Keyboard accessible) */}
            {touched.name && errorCount > 0 && (
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                role="alert"
                aria-live="assertive"
                className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <div className="flex items-center gap-2 text-red-800 font-bold text-xs">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" aria-hidden="true" />
                  <span>{dict.validation.resolveErrors} ({errorCount})</span>
                </div>
                <ul className="list-disc list-inside text-xs text-red-700 space-y-0.5 font-sans pl-1">
                  {errors.name && <li>{dict.forms.fullName}: {errors.name}</li>}
                  {errors.email && <li>{dict.forms.email}: {errors.email}</li>}
                  {errors.phone && <li>{dict.forms.phone}: {errors.phone}</li>}
                  {errors.preferredLanguage && <li>{dict.forms.preferredLanguage}: {errors.preferredLanguage}</li>}
                  {errors.courseSlug && <li>{dict.forms.courseInterest}: {errors.courseSlug}</li>}
                  {errors.message && <li>{dict.forms.message}: {errors.message}</li>}
                  {errors.privacyConsent && <li>{dict.forms.privacyConsent}: {errors.privacyConsent}</li>}
                </ul>
              </div>
            )}

            <form noValidate className="space-y-5" onSubmit={handleDispatchWhatsApp}>
              {/* Row 1: Full Name & Contact Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor={`${formId}-name`}
                    className="block text-xs font-semibold text-navy-950 tracking-wide"
                  >
                    {dict.forms.fullName} <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${formId}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={f.namePlaceholder}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border text-navy-900 placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                      errors.name && touched.name
                        ? 'border-red-500 focus-visible:ring-red-400'
                        : 'border-slate-300 hover:border-slate-400 focus-visible:ring-gold-500 focus-visible:border-gold-500'
                    }`}
                  />
                  {errors.name && touched.name && (
                    <p id={`${formId}-name-error`} role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor={`${formId}-phone`}
                    className="block text-xs font-semibold text-navy-950 tracking-wide"
                  >
                    {dict.forms.phone} <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${formId}-phone`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? `${formId}-phone-error` : `${formId}-phone-hint`}
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={f.phonePlaceholder}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border text-navy-900 placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                      errors.phone && touched.phone
                        ? 'border-red-500 focus-visible:ring-red-400'
                        : 'border-slate-300 hover:border-slate-400 focus-visible:ring-gold-500 focus-visible:border-gold-500'
                    }`}
                  />
                  {errors.phone && touched.phone ? (
                    <p id={`${formId}-phone-error`} role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span>{errors.phone}</span>
                    </p>
                  ) : (
                    <p id={`${formId}-phone-hint`} className="text-[10px] text-slate-500">
                      {f.phoneHint}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Email Address & Preferred Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor={`${formId}-email`}
                    className="block text-xs font-semibold text-navy-950 tracking-wide"
                  >
                    {dict.forms.email} <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={f.emailPlaceholder}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border text-navy-900 placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                      errors.email && touched.email
                        ? 'border-red-500 focus-visible:ring-red-400'
                        : 'border-slate-300 hover:border-slate-400 focus-visible:ring-gold-500 focus-visible:border-gold-500'
                    }`}
                  />
                  {errors.email && touched.email && (
                    <p id={`${formId}-email-error`} role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor={`${formId}-language`}
                    className="block text-xs font-semibold text-navy-950 tracking-wide"
                  >
                    {dict.forms.preferredLanguage} <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <select
                    id={`${formId}-language`}
                    name="preferredLanguage"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.preferredLanguage}
                    aria-describedby={errors.preferredLanguage ? `${formId}-language-error` : undefined}
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border text-navy-900 transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                      errors.preferredLanguage && touched.preferredLanguage
                        ? 'border-red-500 focus-visible:ring-red-400'
                        : 'border-slate-300 hover:border-slate-400 focus-visible:ring-gold-500 focus-visible:border-gold-500'
                    }`}
                  >
                    {f.languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                  {errors.preferredLanguage && touched.preferredLanguage && (
                    <p id={`${formId}-language-error`} role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span>{errors.preferredLanguage}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Course of Interest Dropdown (Categorized from Local Data) */}
              <div className="space-y-1.5 text-left">
                <label
                  htmlFor={`${formId}-course`}
                  className="block text-xs font-semibold text-navy-950 tracking-wide"
                >
                  {dict.forms.courseInterest} <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <select
                  id={`${formId}-course`}
                  name="courseSlug"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.courseSlug}
                  aria-describedby={errors.courseSlug ? `${formId}-course-error` : `${formId}-course-hint`}
                  value={formData.courseSlug}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border text-navy-900 transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                    errors.courseSlug && touched.courseSlug
                      ? 'border-red-500 focus-visible:ring-red-400'
                      : 'border-slate-300 hover:border-slate-400 focus-visible:ring-gold-500 focus-visible:border-gold-500'
                  }`}
                >
                  <option value="" disabled>{f.selectCoursePlaceholder}</option>
                  <option value="general-enquiry">{f.generalEnquiryOption}</option>

                  <optgroup label={f.groupDiploma}>
                    {diplomaCourses.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.title[locale] || c.title.en} (Diploma - 6 Months)
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label={f.groupAdvDiploma}>
                    {advDiplomaCourses.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.title[locale] || c.title.en} (Advanced Diploma)
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label={f.groupPgDiploma}>
                    {pgDiplomaCourses.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.title[locale] || c.title.en} (Postgraduate Diploma)
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label={f.groupShortTerm}>
                    {shortCourses.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.title[locale] || c.title.en} (Modular Certifications)
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.courseSlug && touched.courseSlug ? (
                  <p id={`${formId}-course-error`} role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span>{errors.courseSlug}</span>
                  </p>
                ) : (
                  <p id={`${formId}-course-hint`} className="text-[10px] text-slate-500">
                    {f.courseHint}
                  </p>
                )}
              </div>

              {/* Row 4: Preferred Study Mode */}
              <div className="space-y-1.5 text-left">
                <label
                  htmlFor={`${formId}-studyMode`}
                  className="block text-xs font-semibold text-navy-950 tracking-wide"
                >
                  {dict.forms.studyMode}
                </label>
                <select
                  id={`${formId}-studyMode`}
                  name="studyMode"
                  value={formData.studyMode}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border border-slate-300 hover:border-slate-400 text-navy-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:border-gold-500"
                >
                  {f.studyModes.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 5: Enquiry Message */}
              <div className="space-y-1.5 text-left">
                <label
                  htmlFor={`${formId}-message`}
                  className="block text-xs font-semibold text-navy-950 tracking-wide"
                >
                  {dict.forms.message} <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  rows={4}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? `${formId}-message-error` : `${formId}-message-hint`}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={f.msgPlaceholder}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border text-navy-900 placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 min-h-[90px] ${
                    errors.message && touched.message
                      ? 'border-red-500 focus-visible:ring-red-400'
                      : 'border-slate-300 hover:border-slate-400 focus-visible:ring-gold-500 focus-visible:border-gold-500'
                  }`}
                />
                {errors.message && touched.message ? (
                  <p id={`${formId}-message-error`} role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                ) : (
                  <p id={`${formId}-message-hint`} className="text-[10px] text-slate-500">
                    {f.msgHint}
                  </p>
                )}
              </div>

              {/* 4. Privacy Notice & Sensitive Data Protection Callout (Task 4 & 8) */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-navy-950">
                      {f.pdpaTitle}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                      {f.pdpaDesc}
                    </p>
                    <p className="text-[11px] text-amber-800 font-medium pt-0.5">
                      {f.pdpaWarning}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-start gap-2.5">
                  <input
                    id={`${formId}-privacy`}
                    name="privacyConsent"
                    type="checkbox"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.privacyConsent}
                    aria-describedby={errors.privacyConsent ? `${formId}-privacy-error` : undefined}
                    checked={formData.privacyConsent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-gold-600 focus:ring-gold-500 cursor-pointer"
                  />
                  <label htmlFor={`${formId}-privacy`} className="text-xs text-navy-900 cursor-pointer select-none">
                    {dict.forms.privacyConsent} <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                </div>
                {errors.privacyConsent && touched.privacyConsent && (
                  <p id={`${formId}-privacy-error`} role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span>{errors.privacyConsent}</span>
                  </p>
                )}
              </div>

              {/* 6. Honest Static-Site Submission Buttons & Cancellation Guidance */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors order-2 sm:order-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{dict.forms.clearForm}</span>
                </button>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 order-1 sm:order-2">
                  <Button
                    type="button"
                    onClick={handleDispatchEmail}
                    variant="secondary"
                    iconLeft={<Mail className="w-4 h-4 text-slate-300" />}
                    className="text-xs sm:text-sm"
                  >
                    <span>{dict.forms.submitEmail}</span>
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    iconLeft={<MessageSquare className="w-4 h-4 text-navy-950" />}
                    className="text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-navy-950 border border-emerald-400"
                  >
                    <span>{dict.forms.submitWhatsApp}</span>
                  </Button>
                </div>
              </div>

              <div className="pt-1 text-center">
                <span className="text-[10px] text-slate-600">
                  {f.submissionNote}
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
