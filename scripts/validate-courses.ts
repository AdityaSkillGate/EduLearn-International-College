import {
  COURSES,
  MODULAR_COURSES,
  ALL_COURSES,
  Course,
  CourseLevel,
} from '../src/data/courses';

/**
 * Validation test runner for Edulearn International College Course Content Architecture.
 * Verifies strict data integrity, referential validity, localization coverage,
 * and compliance with CPE statutory standards.
 */

function runValidation() {
  console.log('='.repeat(70));
  console.log('  Edulearn Course Data Integrity & Architecture Validator');
  console.log('='.repeat(70));

  let errors: string[] = [];
  let warnings: string[] = [];

  // 1. Catalog count verification
  const diplomas = COURSES.filter((c) => c.level === 'diploma');
  const advDiplomas = COURSES.filter((c) => c.level === 'advanced-diploma');
  const shortTerm = COURSES.filter((c) => c.level === 'short-term');
  const postgrad = COURSES.filter((c) => c.level === 'postgraduate');

  console.log(`\n[1] Catalog Entry Breakdown:`);
  console.log(`  - Total Primary Catalog Entries: ${COURSES.length} (Expected: 21)`);
  console.log(`    * Diploma Programs:           ${diplomas.length} (Expected: 13)`);
  console.log(`    * Advanced Diploma Programs:  ${advDiplomas.length} (Expected: 5)`);
  console.log(`    * Short-Term Modular Entry:   ${shortTerm.length} (Expected: 1)`);
  console.log(`    * Postgraduate Diplomas:      ${postgrad.length} (Expected: 2)`);
  console.log(`  - Standalone Modular Units:     ${MODULAR_COURSES.length} (Expected: 5)`);
  console.log(`  - Total Discoverable Entities:  ${ALL_COURSES.length} (Expected: 26)`);

  if (COURSES.length !== 21) {
    errors.push(`Expected exactly 21 primary catalog courses, but found ${COURSES.length}`);
  }
  if (diplomas.length !== 13) {
    errors.push(`Expected exactly 13 diplomas, but found ${diplomas.length}`);
  }
  if (advDiplomas.length !== 5) {
    errors.push(`Expected exactly 5 advanced diplomas, but found ${advDiplomas.length}`);
  }
  if (shortTerm.length !== 1) {
    errors.push(`Expected exactly 1 consolidated short-term entry, but found ${shortTerm.length}`);
  }
  if (postgrad.length !== 2) {
    errors.push(`Expected exactly 2 postgraduate diplomas, but found ${postgrad.length}`);
  }
  if (MODULAR_COURSES.length !== 5) {
    errors.push(`Expected exactly 5 standalone modular units, but found ${MODULAR_COURSES.length}`);
  }
  if (ALL_COURSES.length !== 26) {
    errors.push(`Expected 26 total discoverable course entities, but found ${ALL_COURSES.length}`);
  }

  // 2. ID and Slug Uniqueness
  console.log(`\n[2] Checking ID & Slug Uniqueness:`);
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();

  for (const course of ALL_COURSES) {
    if (!course.id || typeof course.id !== 'string') {
      errors.push(`Course has invalid or missing ID: ${JSON.stringify(course)}`);
    } else if (seenIds.has(course.id)) {
      errors.push(`Duplicate course ID found: "${course.id}" in course "${course.slug}"`);
    } else {
      seenIds.add(course.id);
    }

    if (!course.slug || typeof course.slug !== 'string') {
      errors.push(`Course ID "${course.id}" has invalid or missing slug`);
    } else if (seenSlugs.has(course.slug)) {
      errors.push(`Duplicate slug found: "${course.slug}" for course ID "${course.id}"`);
    } else {
      // Validate slug format: lowercase kebab-case
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(course.slug)) {
        errors.push(`Slug "${course.slug}" does not match kebab-case format.`);
      }
      seenSlugs.add(course.slug);
    }
  }
  console.log(`  ✓ Checked ${seenIds.size} unique IDs and ${seenSlugs.size} unique slugs.`);

  // 3. Referential Integrity for Related Courses
  console.log(`\n[3] Checking Referential Integrity for Related Courses:`);
  let relatedLinksChecked = 0;
  for (const course of ALL_COURSES) {
    if (course.relatedCourseIds) {
      for (const relId of course.relatedCourseIds) {
        relatedLinksChecked++;
        if (!seenIds.has(relId)) {
          errors.push(`Course "${course.slug}" references non-existent related course ID: "${relId}"`);
        }
      }
    }
  }
  console.log(`  ✓ Verified ${relatedLinksChecked} inter-course relationships. All target IDs resolve.`);

  // 4. Localization Coverage (en, zh-sg, ta-sg)
  console.log(`\n[4] Checking Localization Coverage (English, Chinese, Tamil):`);
  for (const course of ALL_COURSES) {
    // Title
    if (!course.title?.en || course.title.en.trim() === '') {
      errors.push(`Course "${course.slug}" missing English title.`);
    }
    if (!course.title?.['zh-sg'] || course.title['zh-sg'].trim() === '') {
      errors.push(`Course "${course.slug}" missing Simplified Chinese title.`);
    }
    if (!course.title?.['ta-sg'] || course.title['ta-sg'].trim() === '') {
      errors.push(`Course "${course.slug}" missing Tamil title.`);
    }

    // Overview / Summary
    if (!course.overview?.en || course.overview.en.trim() === '') {
      errors.push(`Course "${course.slug}" missing English overview.`);
    }
    if (!course.overview?.['zh-sg'] || course.overview['zh-sg'].trim() === '') {
      errors.push(`Course "${course.slug}" missing Simplified Chinese overview.`);
    }
    if (!course.overview?.['ta-sg'] || course.overview['ta-sg'].trim() === '') {
      errors.push(`Course "${course.slug}" missing Tamil overview.`);
    }

    // Entry requirements
    if (!course.entryRequirements?.en || course.entryRequirements.en.trim() === '') {
      errors.push(`Course "${course.slug}" missing English entry requirements.`);
    }
    if (!course.entryRequirements?.['zh-sg'] || course.entryRequirements['zh-sg'].trim() === '') {
      errors.push(`Course "${course.slug}" missing Chinese entry requirements.`);
    }
    if (!course.entryRequirements?.['ta-sg'] || course.entryRequirements['ta-sg'].trim() === '') {
      errors.push(`Course "${course.slug}" missing Tamil entry requirements.`);
    }
  }
  console.log(`  ✓ All ${ALL_COURSES.length} courses have 100% complete en, zh-sg, and ta-sg metadata.`);

  // 5. Academic Structure & Module Integrity
  console.log(`\n[5] Checking Curriculum Modules & Contact Hours:`);
  for (const course of ALL_COURSES) {
    if (!course.modules || course.modules.length === 0) {
      errors.push(`Course "${course.slug}" has no modules defined.`);
    } else {
      let sumHours = 0;
      for (const mod of course.modules) {
        if (!mod.code || !mod.title) {
          errors.push(`Course "${course.slug}" has a module with missing code or title: ${JSON.stringify(mod)}`);
        }
        if (mod.contactHours <= 0) {
          errors.push(`Course "${course.slug}" module "${mod.title}" has invalid contactHours: ${mod.contactHours}`);
        }
        sumHours += mod.contactHours;
      }

      // Check sum of contact hours against course.contactHours
      if (sumHours !== course.contactHours) {
        errors.push(`Course "${course.slug}" module contact hours sum (${sumHours}) does not equal course contactHours (${course.contactHours})`);
      }
    }
  }
  console.log(`  ✓ All curriculum module contact hours sum accurately to course totals.`);

  // 6. Financial Structure & Fee Breakdown Integrity
  console.log(`\n[6] Checking Fee Structures & Financial Schedules:`);
  for (const course of ALL_COURSES) {
    const fees = course.fees;
    if (!fees) {
      errors.push(`Course "${course.slug}" has no fees defined.`);
      continue;
    }

    if (fees.fullTime) {
      if (fees.fullTime.courseFee <= 0 || fees.fullTime.installmentsCount <= 0 || fees.fullTime.installmentAmount <= 0) {
        errors.push(`Course "${course.slug}" has invalid full-time fee structure.`);
      }
      if (fees.fullTime.currency !== 'SGD') {
        errors.push(`Course "${course.slug}" full-time currency should be 'SGD', found '${fees.fullTime.currency}'`);
      }
    }

    if (fees.partTime) {
      if (fees.partTime.courseFee <= 0 || fees.partTime.installmentsCount <= 0 || fees.partTime.installmentAmount <= 0) {
        errors.push(`Course "${course.slug}" has invalid part-time fee structure.`);
      }
      if (fees.partTime.currency !== 'SGD') {
        errors.push(`Course "${course.slug}" part-time currency should be 'SGD', found '${fees.partTime.currency}'`);
      }
    }

    if (fees.modular) {
      if (fees.modular.fee <= 0) {
        errors.push(`Course "${course.slug}" has invalid modular fee: ${fees.modular.fee}`);
      }
      if (fees.modular.currency !== 'SGD') {
        errors.push(`Course "${course.slug}" modular currency should be 'SGD', found '${fees.modular.currency}'`);
      }
    }

    if (fees.applicationFee) {
      if (fees.applicationFee.amount !== 54.5) {
        warnings.push(`Course "${course.slug}" application fee is S$${fees.applicationFee.amount} (standard is S$54.50)`);
      }
    }
  }
  console.log(`  ✓ Fee schedules verified. All financial schedules use SGD and valid non-negative amounts.`);

  // 7. Statutory & Regulatory Data Verification
  console.log(`\n[7] Checking Regulatory & CPE PEI Details:`);
  for (const course of ALL_COURSES) {
    if (!course.isVerified) {
      warnings.push(`Course "${course.slug}" is flagged as isVerified: false`);
    }
    if (course.cpeRegistration?.peiRegistrationNo !== '201708935D') {
      errors.push(`Course "${course.slug}" has incorrect or missing PEI Registration No: ${course.cpeRegistration?.peiRegistrationNo}`);
    }
  }
  console.log(`  ✓ CPE PEI Registration No: 201708935D verified across all courses.`);

  // Summary
  console.log('\n' + '='.repeat(70));
  if (warnings.length > 0) {
    console.log(`⚠️  ${warnings.length} Warning(s):`);
    warnings.forEach((w) => console.log(`   - ${w}`));
  }

  if (errors.length > 0) {
    console.error(`❌ Validation FAILED with ${errors.length} error(s):`);
    errors.forEach((e) => console.error(`   - ${e}`));
    console.log('='.repeat(70));
    process.exit(1);
  } else {
    console.log(`✅ All validation checks PASSED successfully!`);
    console.log(`   - 21 Primary Catalog Courses`);
    console.log(`   - 5 Standalone Modular Micro-Credentials`);
    console.log(`   - 26 Total Discoverable Slugs`);
    console.log(`   - 100% Referential Integrity & Localization Verified`);
    console.log('='.repeat(70));
    process.exit(0);
  }
}

runValidation();
