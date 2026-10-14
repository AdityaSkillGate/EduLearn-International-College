import { enDictionary } from '../src/lib/i18n/dictionaries/en';
import { zhDictionary } from '../src/lib/i18n/dictionaries/zh';
import { taDictionary } from '../src/lib/i18n/dictionaries/ta';
import { COURSES, MODULAR_COURSES } from '../src/data/courses';
import { NEWS_ARTICLES } from '../src/data/news';
import { COLLEGE_MANAGERS, ACADEMIC_BOARD, EXAMINATION_BOARD } from '../src/data/governance';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Automated Locale Parity & Translation Completeness QA Suite
 * Audits dictionaries, catalog content, metadata, and statutory terms
 * across all supported locales: en, zh-sg, ta-sg.
 */

interface CheckResult {
  category: string;
  checksRun: number;
  passed: number;
  errors: string[];
  warnings: string[];
}

function recursiveKeyCheck(
  base: Record<string, any>,
  target: Record<string, any>,
  targetLocale: string,
  prefix = ''
): { errors: string[]; checks: number } {
  const errors: string[] = [];
  let checks = 0;

  for (const key of Object.keys(base)) {
    checks++;
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (!(key in target)) {
      errors.push(`Missing key [${fullPath}] in ${targetLocale} dictionary`);
      continue;
    }

    const baseVal = base[key];
    const targetVal = target[key];

    if (typeof baseVal === 'object' && baseVal !== null && !Array.isArray(baseVal)) {
      if (typeof targetVal !== 'object' || targetVal === null || Array.isArray(targetVal)) {
        errors.push(`Type mismatch at [${fullPath}]: expected object, found ${typeof targetVal} in ${targetLocale}`);
      } else {
        const nested = recursiveKeyCheck(baseVal, targetVal, targetLocale, fullPath);
        errors.push(...nested.errors);
        checks += nested.checks;
      }
    } else if (typeof baseVal === 'string') {
      if (typeof targetVal !== 'string') {
        errors.push(`Type mismatch at [${fullPath}]: expected string, found ${typeof targetVal} in ${targetLocale}`);
      } else if (targetVal.trim().length === 0) {
        errors.push(`Empty string value at [${fullPath}] in ${targetLocale}`);
      }
    }
  }

  // Check for extraneous keys in target
  for (const key of Object.keys(target)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (!(key in base)) {
      errors.push(`Extraneous unexpected key [${fullPath}] found in ${targetLocale} dictionary`);
    }
  }

  return { errors, checks };
}

function runLocaleQASuite() {
  console.log('='.repeat(75));
  console.log('  Edulearn Singapore — Phase 18 Translation Completeness & Locale QA');
  console.log('  Testing Locales: en (English), zh-sg (Simplified Chinese), ta-sg (Tamil)');
  console.log('='.repeat(75));

  const results: CheckResult[] = [];

  // ==========================================
  // 1. DICTIONARY PARITY AUDIT
  // ==========================================
  console.log('\n[1] Auditing System Message Dictionaries (en, zh-sg, ta-sg)...');
  const dictResult: CheckResult = {
    category: 'Dictionary Parity',
    checksRun: 0,
    passed: 0,
    errors: [],
    warnings: [],
  };

  const zhParity = recursiveKeyCheck(enDictionary, zhDictionary, 'zh-sg');
  const taParity = recursiveKeyCheck(enDictionary, taDictionary, 'ta-sg');

  dictResult.checksRun = zhParity.checks + taParity.checks;
  dictResult.errors.push(...zhParity.errors, ...taParity.errors);
  dictResult.passed = dictResult.checksRun - dictResult.errors.length;

  console.log(`  - Total dictionary keys tested: ${dictResult.checksRun}`);
  console.log(`  - zh-sg parity status: ${zhParity.errors.length === 0 ? '✓ 100% MATCH' : `✗ ${zhParity.errors.length} MISMATCHES`}`);
  if (zhParity.errors.length > 0) zhParity.errors.forEach(e => console.log(`      * ${e}`));
  console.log(`  - ta-sg parity status: ${taParity.errors.length === 0 ? '✓ 100% MATCH' : `✗ ${taParity.errors.length} MISMATCHES`}`);
  if (taParity.errors.length > 0) taParity.errors.forEach(e => console.log(`      * ${e}`));
  results.push(dictResult);

  // ==========================================
  // 2. STATUTORY TERMS & IDENTIFIER INTEGRITY
  // ==========================================
  console.log('\n[2] Verifying Statutory Identifiers & Regulatory References...');
  const statutoryResult: CheckResult = {
    category: 'Statutory Verification',
    checksRun: 0,
    passed: 0,
    errors: [],
    warnings: [],
  };

  const PEI_REG_NO = '201708935D';
  const POSTAL_CODE = '209037';
  const PHONE_REGEX = /9004\s*9657/;

  // Check PEI registration number presence in announcement bar and footer
  statutoryResult.checksRun += 6;
  if (!enDictionary.announcement.cpeBadge.includes(PEI_REG_NO)) statutoryResult.errors.push('en: CPE badge missing PEI Reg No');
  if (!zhDictionary.announcement.cpeBadge.includes(PEI_REG_NO)) statutoryResult.errors.push('zh-sg: CPE badge missing PEI Reg No');
  if (!taDictionary.announcement.cpeBadge.includes(PEI_REG_NO)) statutoryResult.errors.push('ta-sg: CPE badge missing PEI Reg No');

  if (!enDictionary.footer.cpeNotice.includes(PEI_REG_NO)) statutoryResult.errors.push('en: Footer CPE notice missing PEI Reg No');
  if (!zhDictionary.footer.cpeNotice.includes(PEI_REG_NO)) statutoryResult.errors.push('zh-sg: Footer CPE notice missing PEI Reg No');
  if (!taDictionary.footer.cpeNotice.includes(PEI_REG_NO)) statutoryResult.errors.push('ta-sg: Footer CPE notice missing PEI Reg No');

  // Check campus location address
  statutoryResult.checksRun += 3;
  if (!enDictionary.footer.registeredAddress.includes(POSTAL_CODE)) statutoryResult.errors.push('en: Footer missing Singapore 209037');
  if (!zhDictionary.footer.registeredAddress.includes(POSTAL_CODE)) statutoryResult.errors.push('zh-sg: Footer missing Singapore 209037');
  if (!taDictionary.footer.registeredAddress.includes(POSTAL_CODE)) statutoryResult.errors.push('ta-sg: Footer missing Singapore 209037');

  // Check hotline phone number
  statutoryResult.checksRun += 3;
  if (!PHONE_REGEX.test(enDictionary.announcement.hotlineNumber)) statutoryResult.errors.push('en: HotlineNumber missing 9004 9657');
  if (!PHONE_REGEX.test(zhDictionary.announcement.hotlineNumber)) statutoryResult.errors.push('zh-sg: HotlineNumber missing 9004 9657');
  if (!PHONE_REGEX.test(taDictionary.announcement.hotlineNumber)) statutoryResult.errors.push('ta-sg: HotlineNumber missing 9004 9657');

  statutoryResult.passed = statutoryResult.checksRun - statutoryResult.errors.length;
  console.log(`  - Statutory checks: ${statutoryResult.passed}/${statutoryResult.checksRun} passed`);
  if (statutoryResult.errors.length > 0) statutoryResult.errors.forEach(e => console.log(`      * ${e}`));
  results.push(statutoryResult);

  // ==========================================
  // 3. COURSE CATALOG TRANSLATION COMPLETENESS
  // ==========================================
  console.log('\n[3] Auditing Course Catalog Multi-lingual Content...');
  const courseResult: CheckResult = {
    category: 'Course Catalog Localization',
    checksRun: 0,
    passed: 0,
    errors: [],
    warnings: [],
  };

  const allCourses = [...COURSES, ...MODULAR_COURSES];
  for (const course of allCourses) {
    // Title checks
    courseResult.checksRun += 3;
    if (!course.title.en) courseResult.errors.push(`Course ${course.slug}: missing en title`);
    if (!course.title['zh-sg']) courseResult.errors.push(`Course ${course.slug}: missing zh-sg title`);
    if (!course.title['ta-sg']) courseResult.errors.push(`Course ${course.slug}: missing ta-sg title`);

    // Overview checks
    courseResult.checksRun += 3;
    if (!course.overview.en) courseResult.errors.push(`Course ${course.slug}: missing en overview`);
    if (!course.overview['zh-sg']) courseResult.errors.push(`Course ${course.slug}: missing zh-sg overview`);
    if (!course.overview['ta-sg']) courseResult.errors.push(`Course ${course.slug}: missing ta-sg overview`);

    // Entry requirements checks
    courseResult.checksRun += 3;
    if (!course.entryRequirements.academicPrerequisites?.en) courseResult.errors.push(`Course ${course.slug}: missing en academic requirements`);
    if (!course.entryRequirements.academicPrerequisites?.['zh-sg']) courseResult.errors.push(`Course ${course.slug}: missing zh-sg academic requirements`);
    if (!course.entryRequirements.academicPrerequisites?.['ta-sg']) courseResult.errors.push(`Course ${course.slug}: missing ta-sg academic requirements`);

    // Detailed content checks
    courseResult.checksRun += 6;
    if (!course.content.description.en) courseResult.errors.push(`Course ${course.slug}: missing en content description`);
    if (!course.content.description['zh-sg']) courseResult.errors.push(`Course ${course.slug}: missing zh-sg content description`);
    if (!course.content.description['ta-sg']) courseResult.errors.push(`Course ${course.slug}: missing ta-sg content description`);

    if (!course.content.summary.en) courseResult.errors.push(`Course ${course.slug}: missing en content summary`);
    if (!course.content.summary['zh-sg']) courseResult.errors.push(`Course ${course.slug}: missing zh-sg content summary`);
    if (!course.content.summary['ta-sg']) courseResult.errors.push(`Course ${course.slug}: missing ta-sg content summary`);
  }

  courseResult.passed = courseResult.checksRun - courseResult.errors.length;
  console.log(`  - Total course translation fields verified: ${courseResult.checksRun}`);
  console.log(`  - Course localization status: ${courseResult.errors.length === 0 ? '✓ 100% COMPLETE' : `✗ ${courseResult.errors.length} ERRORS`}`);
  results.push(courseResult);

  // ==========================================
  // 4. NEWS ARTICLES TRANSLATION AUDIT
  // ==========================================
  console.log('\n[4] Auditing News Articles Localization...');
  const newsResult: CheckResult = {
    category: 'News Articles Localization',
    checksRun: 0,
    passed: 0,
    errors: [],
    warnings: [],
  };

  for (const article of NEWS_ARTICLES) {
    newsResult.checksRun += 6;
    if (!article.content.en?.title) newsResult.errors.push(`Article ${article.slug}: missing en title`);
    if (!article.content['zh-sg']?.title) newsResult.errors.push(`Article ${article.slug}: missing zh-sg title`);
    if (!article.content['ta-sg']?.title) newsResult.errors.push(`Article ${article.slug}: missing ta-sg title`);

    if (!article.content.en?.summary) newsResult.errors.push(`Article ${article.slug}: missing en summary`);
    if (!article.content['zh-sg']?.summary) newsResult.errors.push(`Article ${article.slug}: missing zh-sg summary`);
    if (!article.content['ta-sg']?.summary) newsResult.errors.push(`Article ${article.slug}: missing ta-sg summary`);
  }

  newsResult.passed = newsResult.checksRun - newsResult.errors.length;
  console.log(`  - Total article translation fields verified: ${newsResult.checksRun}`);
  console.log(`  - News localization status: ${newsResult.errors.length === 0 ? '✓ 100% COMPLETE' : `✗ ${newsResult.errors.length} ERRORS`}`);
  if (newsResult.errors.length > 0) newsResult.errors.forEach(e => console.log(`      * ${e}`));
  results.push(newsResult);

  // ==========================================
  // 5. GOVERNANCE & FACULTY DATA PARITY
  // ==========================================
  console.log('\n[5] Auditing Governance & Faculty Profiles...');
  const govResult: CheckResult = {
    category: 'Governance & Faculty',
    checksRun: 0,
    passed: 0,
    errors: [],
    warnings: [],
  };

  for (const m of COLLEGE_MANAGERS) {
    govResult.checksRun += 3;
    if (!m.name) govResult.errors.push(`Management member ${m.id} missing name`);
    if (!m.title?.en || !m.title?.['zh-sg'] || !m.title?.['ta-sg']) govResult.errors.push(`Management member ${m.id} missing localized title`);
    if (!m.qualifications || m.qualifications.length === 0) govResult.errors.push(`Management member ${m.id} missing qualifications`);
  }

  // Academic Board checks
  govResult.checksRun += 6;
  if (!ACADEMIC_BOARD.title.en || !ACADEMIC_BOARD.title['zh-sg'] || !ACADEMIC_BOARD.title['ta-sg']) {
    govResult.errors.push(`Academic Board title not localized across 3 languages`);
  }
  if (!ACADEMIC_BOARD.responsibilities.en || !ACADEMIC_BOARD.responsibilities['zh-sg'] || !ACADEMIC_BOARD.responsibilities['ta-sg']) {
    govResult.errors.push(`Academic Board responsibilities not localized across 3 languages`);
  }

  // Examination Board checks
  govResult.checksRun += 6;
  if (!EXAMINATION_BOARD.title.en || !EXAMINATION_BOARD.title['zh-sg'] || !EXAMINATION_BOARD.title['ta-sg']) {
    govResult.errors.push(`Examination Board title not localized across 3 languages`);
  }
  if (!EXAMINATION_BOARD.responsibilities.en || !EXAMINATION_BOARD.responsibilities['zh-sg'] || !EXAMINATION_BOARD.responsibilities['ta-sg']) {
    govResult.errors.push(`Examination Board responsibilities not localized across 3 languages`);
  }

  govResult.passed = govResult.checksRun - govResult.errors.length;
  console.log(`  - Governance entries verified: ${govResult.checksRun}`);
  console.log(`  - Governance localization status: ${govResult.errors.length === 0 ? '✓ 100% VERIFIED' : `✗ ${govResult.errors.length} ERRORS`}`);
  if (govResult.errors.length > 0) govResult.errors.forEach(e => console.log(`      * ${e}`));
  results.push(govResult);

  // ==========================================
  // 6. ROUTE HREFLANG & CANONICAL CHECK
  // ==========================================
  console.log('\n[6] Scanning Page Routes for Reciprocal Hreflang & Canonical URL Parity...');
  const routeResult: CheckResult = {
    category: 'Hreflang & Canonical Parity',
    checksRun: 0,
    passed: 0,
    errors: [],
    warnings: [],
  };

  const appLocaleDir = path.resolve(__dirname, '../src/app/[locale]');

  function scanPages(dir: string) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const full = path.join(dir, f);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        scanPages(full);
      } else if (f === 'page.tsx') {
        const content = fs.readFileSync(full, 'utf-8');
        routeResult.checksRun += 4;
        const relativePath = path.relative(appLocaleDir, full);

        // Check canonical
        if (!content.includes('canonical:')) {
          routeResult.errors.push(`Page [${relativePath}] is missing canonical URL metadata`);
        }

        // Check hreflangs
        if (!content.includes("en:") || !content.includes("'zh-sg':") || !content.includes("'ta-sg':")) {
          // Some dynamic pages like course detail might format differently
          if (!content.includes('languages:')) {
            routeResult.errors.push(`Page [${relativePath}] is missing alternates.languages hreflang mapping`);
          }
        }

        // Check for incorrect uppercase BCP 47 tags in metadata languages
        if (content.includes("'zh-SG':") || content.includes("'ta-SG':")) {
          routeResult.errors.push(`Page [${relativePath}] has uppercase hreflang tags; must be lowercase 'zh-sg' and 'ta-sg'`);
        }
      }
    }
  }

  scanPages(appLocaleDir);
  routeResult.passed = routeResult.checksRun - routeResult.errors.length;
  console.log(`  - Route metadata checks: ${routeResult.checksRun}`);
  console.log(`  - Hreflang & canonical status: ${routeResult.errors.length === 0 ? '✓ 100% STANDARDIZED' : `✗ ${routeResult.errors.length} ISSUES`}`);
  results.push(routeResult);

  // ==========================================
  // FINAL CONSOLIDATED SUMMARY
  // ==========================================
  console.log('\n' + '='.repeat(75));
  console.log('  PHASE 18 LOCALE QA & PARITY AUDIT RESULTS');
  console.log('='.repeat(75));

  let totalChecks = 0;
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const r of results) {
    totalChecks += r.checksRun;
    totalErrors += r.errors.length;
    totalWarnings += r.warnings.length;
    const status = r.errors.length === 0 ? 'PASSED' : 'FAILED';
    console.log(`  [${status}] ${r.category.padEnd(32)} ${r.passed}/${r.checksRun} checks (${r.errors.length} errors)`);
  }

  console.log('-'.repeat(75));
  console.log(`  Total Checks Executed : ${totalChecks}`);
  console.log(`  Total Critical Errors : ${totalErrors}`);
  console.log(`  Total Warnings        : ${totalWarnings}`);
  console.log(`  Overall Result        : ${totalErrors === 0 ? '✓ ALL CHECKS PASSED' : '✗ FAILED'}`);
  console.log('='.repeat(75) + '\n');

  if (totalErrors > 0) {
    console.error('Detailed Error Log:');
    for (const r of results) {
      if (r.errors.length > 0) {
        console.error(`\n--- ${r.category} ---`);
        r.errors.forEach((e) => console.error(`  * ${e}`));
      }
    }
    process.exit(1);
  }
}

runLocaleQASuite();
