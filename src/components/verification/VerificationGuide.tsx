'use client';

import React, { useState } from 'react';
import { Locale } from '@/lib/i18n';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, FormField, Input } from '@/components/ui';
import { ShieldCheck, Award, Mail, FileText, CheckCircle2, AlertCircle, Building2, Lock, ArrowRight, Copy, Check } from 'lucide-react';

interface VerificationGuideProps {
  locale: Locale;
}

const UI_STRINGS = {
  en: {
    privacyTitle: 'Singapore PDPA & CPE Student Privacy Directive',
    privacyP1: 'In strict compliance with the Singapore Personal Data Protection Act (PDPA) and the Committee for Private Education (CPE) privacy framework, student academic records, graduation dates, and transcripts are strictly confidential. Edulearn International College does not expose personal graduate databases to open public web searches.',
    privacyP2: 'Official parchment verification for employers, embassies, and academic institutions is conducted securely through our Office of the Registrar upon receipt of proper authorization.',
    protoBadge: 'Institutional Protocol',
    protoTitle: 'Official 3-Step Certificate Verification Procedure',
    protoSubtitle: 'Standard operating procedure for third-party background checks and educational credential verification.',
    step1Title: 'Obtain Graduate Authorization',
    step1Desc: 'Under Singapore law, requesting organizations must obtain a signed consent form or Letter of Authorization from the graduate releasing their educational records for verification.',
    step2Title: 'Submit Scanned Parchment',
    step2Desc: 'Email a clear scan of the physical Diploma Parchment and Academic Transcript showing the Certificate Serial Number to the Office of the Registrar at admin@edulearn.edu.sg.',
    step3Title: 'Registry Cross-Audit & Attestation',
    step3Desc: 'The Examination Office verifies the parchment serial against institutional graduation archives and issues an official formal Letter of Educational Verification within 3 to 5 working days.',
    authBadge: 'Authentication Guide',
    antiFraud: 'Anti-Fraud Standards',
    securityTitle: 'Security Features on Genuine EIC Parchments',
    securitySubtitle: 'Every diploma awarded by Edulearn International College incorporates distinctive security elements:',
    sec1Title: 'Institutional Seal',
    sec1Desc: 'Official embossed metallic or blind seal of Edulearn International College Pte. Ltd.',
    sec2Title: 'CPE Registration Details',
    sec2Desc: 'Prominently displays statutory registration number: 201708935D.',
    sec3Title: 'Unique Serial Number',
    sec3Desc: 'Permanent matriculation serial assigned by the Academic & Examination Board.',
    sec4Title: 'Authorized Signatories',
    sec4Desc: 'Signed by College Manager & Academic Director in office at the time of conferment.',
    sampleNotice: 'View an official sample parchment layout:',
    downloadSample: 'Download Sample Parchment PDF',
    formBadge: 'Official Request Form',
    formTitle: 'Draft a Formal Verification Request',
    formDesc: 'Fill in the details below to generate a formatted verification inquiry directly addressed to the Office of the Registrar.',
    labelOrg: 'Requesting Organization / Employer',
    phOrg: 'e.g. Acme Engineering Pte. Ltd.',
    labelEmail: 'Official Contact Email',
    phEmail: 'hr@acme.com',
    labelStudent: "Graduate's Full Legal Name",
    phStudent: 'Name as printed on certificate',
    labelSerial: 'Certificate Serial Number',
    phSerial: 'Serial number on diploma',
    destLabel: 'Destination:',
    copyBtn: 'Copy Template',
    copiedBtn: 'Template Copied',
    openEmailBtn: 'Open in Email Client',
  },
  'zh-sg': {
    privacyTitle: '新加坡 PDPA 个人数据保护法与 CPE 学籍隐私保护指令',
    privacyP1: '根据《新加坡个人数据保护法》（PDPA）及私立教育理事会（CPE）隐私合规框架，学生学籍记录、毕业日期和成绩单均属严格机密信息。爱学习国际学院绝不对公网公开毕业生个人数据库供随意检索。',
    privacyP2: '用人单位、使领馆及高等院校的毕业证书真伪核验，均需在获得毕业生授权后，由我校教务处（Office of the Registrar）通过加密合规途径正式受理。',
    protoBadge: '官方核验流程',
    protoTitle: '官方毕业文凭真伪核验三步流程',
    protoSubtitle: '第三方背景调查、学历认证与正规文凭核验标准作业程序。',
    step1Title: '第一步：获取毕业生授权同意书',
    step1Desc: '依照新加坡法律，调档机构必须先行取得该名毕业生亲笔签署的授权委托书（Letter of Authorization）或同意函，方可申请核验。',
    step2Title: '第二步：提交文凭扫描件至教务处',
    step2Desc: '将包含文凭序列号（Serial Number）的高清文凭正本扫描件及成绩单发送至教务处官方邮箱 admin@edulearn.edu.sg。',
    step3Title: '第三步：档案库核查与官方核验函出具',
    step3Desc: '考试委员会与教务处调取历史归档记录进行三重比对，并在 3 至 5 个工作日内出具正式的官方学历认证函（Letter of Verification）。',
    authBadge: '防伪鉴别指南',
    antiFraud: '法定防伪标准',
    securityTitle: '爱学习国际学院正规毕业文凭防伪特征',
    securitySubtitle: '爱学习国际学院颁发的所有大专文凭均具备以下严格的官方防伪特征：',
    sec1Title: '学院官方钢印/火漆防伪印章',
    sec1Desc: '新加坡爱学习国际学院官方金属浮雕钢印或特制防伪压纹印章。',
    sec2Title: '法定 CPE 办学执照编号',
    sec2Desc: '醒目标注经新加坡政府核准的办学机构注册号：201708935D。',
    sec3Title: '唯一证书专属序列号',
    sec3Desc: '由学术与考试委员会统一编排分配的终身唯一学籍序列编号。',
    sec4Title: '官方授权签字人亲笔签名',
    sec4Desc: '文凭颁发时在任的学院经理（College Manager）及学术主管官方联名签署。',
    sampleNotice: '查阅官方样本证书版式规范：',
    downloadSample: '下载文凭样本 PDF',
    formBadge: '官方核验申请表单',
    formTitle: '起草正式证书核验申请邮件',
    formDesc: '填写以下必要信息，即可自动生成格式严谨的致教务处核验公函草稿。',
    labelOrg: '调档机构名称 / 雇主单位',
    phOrg: '例如：Acme Engineering Pte. Ltd.',
    labelEmail: '机构官方联系电邮',
    phEmail: 'hr@acme.com',
    labelStudent: '毕业生法定全名（英文字母）',
    phStudent: '需与文凭打印姓名一致',
    labelSerial: '文凭序列编号',
    phSerial: '文凭下方打印的专属序列号',
    destLabel: '收件邮箱：',
    copyBtn: '复制邮件草稿',
    copiedBtn: '已复制草稿',
    openEmailBtn: '在邮件客户端中打开',
  },
  'ta-sg': {
    privacyTitle: 'சிங்கப்பூர் PDPA & CPE மாணவர் தனியுரிமை வழிகாட்டல்',
    privacyP1: 'சிங்கப்பூர் தனிநபர் தரவு பாதுகாப்பு சட்டம் (PDPA) மற்றும் CPE விதிகளின்படி, மாணவர் கல்வி பதிவுகள் மற்றும் சான்றிதழ் விவரங்கள் கண்டிப்பாக ரகசியமானவை. பொது வலைத்தள தேடல்களில் தனிநபர் தரவுகள் பகிரப்படாது.',
    privacyP2: 'முதலாளிகள், தூதரகங்கள் மற்றும் கல்வி நிறுவனங்களுக்கான அதிகாரப்பூர்வ சான்றிதழ் சரிபார்ப்பு மாணவர் அனுமதியுடன் மட்டுமே பதிவுத்துறை மூலம் பாதுகாப்பாக மேற்கொள்ளப்படுகிறது.',
    protoBadge: 'நிறுவன நடைமுறை',
    protoTitle: 'அதிகாரப்பூர்வ 3-படி சான்றிதழ் சரிபார்ப்பு நடைமுறை',
    protoSubtitle: 'மூன்றாம் தரப்பு பின்னணி சோதனைகள் மற்றும் கல்வி சான்றிதழ் சரிபார்ப்புக்கான நிலையான நடைமுறை.',
    step1Title: 'படி 1: பட்டதாரி அனுமதி பெறுதல்',
    step1Desc: 'சிங்கப்பூர் சட்டத்தின்படி, கோரும் அமைப்புகள் பட்டதாரியிடமிருந்து கையொப்பமிடப்பட்ட ஒப்புதல் படிவத்தை பெற்றிருக்க வேண்டும்.',
    step2Title: 'படி 2: ஸ்கேன் செய்யப்பட்ட சான்றிதழை சமர்ப்பித்தல்',
    step2Desc: 'சான்றிதழ் வரிசை எண் தெரியும் வகையிலான தெளிவான நகலை பதிவுத்துறைக்கு admin@edulearn.edu.sg என்ற மின்னஞ்சலில் அனுப்பவும்.',
    step3Title: 'படி 3: ஆவண சரிபார்ப்பு & உறுதிப்படுத்தல்',
    step3Desc: 'தேர்வு அலுவலகம் பட்டமளிப்பு ஆவணங்களுடன் சரிபார்த்து 3 முதல் 5 வேலை நாட்களுக்குள் அதிகாரப்பூர்வ சரிபார்ப்புக் கடிதத்தை வழங்கும்.',
    authBadge: 'நம்பகத்தன்மை வழிகாட்டி',
    antiFraud: 'மோசடி எதிர்ப்பு தரநிலைகள்',
    securityTitle: 'எடுலேர்ன் அசல் சான்றிதழ்களின் பாதுகாப்பு அம்சங்கள்',
    securitySubtitle: 'எடுலேர்ன் கல்லூரி வழங்கும் ஒவ்வொரு பட்டயமும் தனித்துவமான பாதுகாப்பு கூறுகளைக் கொண்டுள்ளது:',
    sec1Title: 'நிறுவன முத்திரை',
    sec1Desc: 'எடுலேர்ன் கல்லூரியின் அதிகாரப்பூர்வ பதிக்கப்பட்ட உலோகம் அல்லது முத்திரை.',
    sec2Title: 'CPE பதிவு விவரங்கள்',
    sec2Desc: 'சட்டப்பூர்வ பதிவு எண் தெளிவாகக் காட்டப்பட்டுள்ளது: 201708935D.',
    sec3Title: 'தனித்துவ வரிசை எண்',
    sec3Desc: 'கல்வி மற்றும் தேர்வு வாரியத்தால் ஒதுக்கப்பட்ட நிரந்தர வரிசை எண்.',
    sec4Title: 'அங்கீகரிக்கப்பட்ட கையொப்பங்கள்',
    sec4Desc: 'பட்டமளிப்பின் போது பதவியில் இருந்த கல்லூரி மேலாளர் மற்றும் கல்வி இயக்குநரால் கையொப்பமிடப்பட்டது.',
    sampleNotice: 'அதிகாரப்பூர்வ மாதிரி சான்றிதழ் அமைப்பைக் காண்க:',
    downloadSample: 'மாதிரி சான்றிதழ் PDF பதிவிறக்கவும்',
    formBadge: 'அதிகாரப்பூர்வ கோரிக்கை படிவம்',
    formTitle: 'முறையான சரிபார்ப்பு கோரிக்கையை உருவாக்கவும்',
    formDesc: 'பதிவுத்துறைக்கு நேரடியாக அனுப்பக்கூடிய சரிபார்ப்பு விசாரணையை உருவாக்க கீழே உள்ள விவரங்களை நிரப்பவும்.',
    labelOrg: 'கோரும் அமைப்பு / முதலாளி',
    phOrg: 'எ.கா. அக்மே இன்ஜினியரிங்',
    labelEmail: 'அதிகாரப்பூர்வ தொடர்பு மின்னஞ்சல்',
    phEmail: 'hr@acme.com',
    labelStudent: 'பட்டதாரியின் முழு சட்டப்பூர்வ பெயர்',
    phStudent: 'சான்றிதழில் உள்ளவாறு பெயர்',
    labelSerial: 'சான்றிதழ் வரிசை எண்',
    phSerial: 'சான்றிதழில் உள்ள வரிசை எண்',
    destLabel: 'சேருமிடம்:',
    copyBtn: 'டெம்ப்ளேட்டை நகலெடு',
    copiedBtn: 'நகலெடுக்கப்பட்டது',
    openEmailBtn: 'மின்னஞ்சலில் திறக்கவும்',
  },
};

export const VerificationGuide: React.FC<VerificationGuideProps> = ({ locale }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    requesterEmail: '',
    studentName: '',
    serialNumber: '',
  });

  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  const emailSubject = `Official Certificate Verification Request: ${formData.studentName || '[Student Name]'}`;
  const emailBody = `Dear Office of the Registrar,
Edulearn International College Singapore,

I am requesting official verification of the following educational parchment/transcript:

- Requesting Organization: ${formData.organizationName || '[Organization Name]'}
- Contact Email: ${formData.requesterEmail || '[Your Email]'}
- Graduate's Full Name: ${formData.studentName || '[Student Full Name]'}
- Certificate Serial Number: ${formData.serialNumber || '[e.g., Serial on Parchment]'}

We confirm that written authorization/consent from the graduate has been obtained in compliance with the Singapore Personal Data Protection Act (PDPA).

Please find attached a scanned copy of the diploma certificate for verification.

Regards,
${formData.organizationName || '[Organization]'}`;

  const mailtoLink = `mailto:admin@edulearn.edu.sg?cc=edulearninternationalcollege@gmail.com&subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-10">
      {/* Statutory Privacy & PDPA Compliance Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start gap-4">
        <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl shrink-0 mt-0.5">
          <Lock className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="space-y-1.5 text-xs sm:text-sm text-amber-950 font-sans leading-relaxed">
          <div className="font-serif font-bold text-base text-amber-950">
            {ui.privacyTitle}
          </div>
          <p>
            {ui.privacyP1}
          </p>
          <p className="text-amber-800 text-xs">
            {ui.privacyP2}
          </p>
        </div>
      </div>

      {/* 3-Step Verification Protocol */}
      <div className="space-y-5">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <Badge variant="gold">{ui.protoBadge}</Badge>
          <h3 className="font-serif font-bold text-2xl text-navy-950">
            {ui.protoTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {ui.protoSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="elevated" className="border border-slate-200 p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-navy-900 text-gold-400 font-serif font-bold flex items-center justify-center text-sm">
              01
            </div>
            <h4 className="font-serif font-bold text-base text-navy-950">
              {ui.step1Title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {ui.step1Desc}
            </p>
          </Card>

          <Card variant="elevated" className="border border-slate-200 p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-navy-900 text-gold-400 font-serif font-bold flex items-center justify-center text-sm">
              02
            </div>
            <h4 className="font-serif font-bold text-base text-navy-950">
              {ui.step2Title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {ui.step2Desc}
            </p>
          </Card>

          <Card variant="elevated" className="border border-slate-200 p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-navy-900 text-gold-400 font-serif font-bold flex items-center justify-center text-sm">
              03
            </div>
            <h4 className="font-serif font-bold text-base text-navy-950">
              {ui.step3Title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {ui.step3Desc}
            </p>
          </Card>
        </div>
      </div>

      {/* Physical Parchment Security Features Guide */}
      <Card variant="default" className="border border-slate-200 p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="emerald">{ui.authBadge}</Badge>
            <span className="text-xs text-slate-500 font-mono">{ui.antiFraud}</span>
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-navy-950">
            {ui.securityTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {ui.securitySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-gold-600" />
              {ui.sec1Title}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {ui.sec1Desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {ui.sec2Title}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {ui.sec2Desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              {ui.sec3Title}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {ui.sec3Desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold-600" />
              {ui.sec4Title}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {ui.sec4Desc}
            </p>
          </div>
        </div>

        <div className="bg-slate-100 p-4 rounded-xl flex items-center justify-between gap-4">
          <span className="text-xs text-slate-700">
            {ui.sampleNotice}
          </span>
          <a
            href="/documents/EIC-Sample-Diploma-Certificate.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-gold-600 transition-colors"
          >
            <span>{ui.downloadSample}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </Card>

      {/* Interactive Verification Request Generator */}
      <Card variant="elevated" className="border-t-4 border-t-gold-500 overflow-hidden shadow-sm">
        <CardHeader className="bg-slate-50 p-6 sm:p-7 border-b border-slate-200">
          <Badge variant="royal" className="w-fit mb-1">
            {ui.formBadge}
          </Badge>
          <CardTitle className="text-xl text-navy-950">
            {ui.formTitle}
          </CardTitle>
          <p className="text-xs sm:text-sm text-slate-600">
            {ui.formDesc}
          </p>
        </CardHeader>

        <CardContent className="p-6 sm:p-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label={ui.labelOrg}
              htmlFor="org-name"
              required
            >
              <Input
                id="org-name"
                placeholder={ui.phOrg}
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              />
            </FormField>

            <FormField
              label={ui.labelEmail}
              htmlFor="requester-email"
              required
            >
              <Input
                id="requester-email"
                type="email"
                placeholder={ui.phEmail}
                value={formData.requesterEmail}
                onChange={(e) => setFormData({ ...formData, requesterEmail: e.target.value })}
              />
            </FormField>

            <FormField
              label={ui.labelStudent}
              htmlFor="student-name"
              required
            >
              <Input
                id="student-name"
                placeholder={ui.phStudent}
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              />
            </FormField>

            <FormField
              label={ui.labelSerial}
              htmlFor="serial-number"
              required
            >
              <Input
                id="serial-number"
                placeholder={ui.phSerial}
                value={formData.serialNumber}
                onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
              />
            </FormField>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 font-sans">
              {ui.destLabel} <strong className="text-slate-800">admin@edulearn.edu.sg</strong>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopyTemplate}
                icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copied ? ui.copiedBtn : ui.copyBtn}
              </Button>

              <a
                href={mailtoLink}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white hover:bg-gold-500 hover:text-navy-950 text-xs font-semibold transition-colors shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{ui.openEmailBtn}</span>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
