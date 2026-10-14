'use client';

import React, { useState } from 'react';
import {
  Container,
  Button,
  Badge,
  SectionHeading,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Breadcrumbs,
  Divider,
  FormField,
  Input,
  Select,
  Textarea,
  Accordion,
} from '@/components/ui';
import {
  ShieldCheck,
  Award,
  BookOpen,
  ArrowRight,
  Send,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';

export function DesignSystemClient() {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [formInput, setFormInput] = useState('');
  const [hasError, setHasError] = useState(false);

  return (
    <div className="py-12 space-y-16 bg-alabaster min-h-screen">
      {/* Showcase Notice Banner */}
      <Container size="default">
        <div className="p-4 rounded-xl bg-gold-100 border border-gold-300 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-gold-800 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs text-gold-900 space-y-1">
            <strong className="block font-semibold">
              EIC Production Design System Showcase (Phase 3 Testing Environment)
            </strong>
            <p>
              This showcase isolates and verifies all centralized UI tokens, responsive scales, WCAG 2.1 AA color contrast, interactive states, and typography. It is modular and can be removed cleanly prior to production release.
            </p>
          </div>
        </div>
      </Container>

      {/* 1. Palette & Design Tokens */}
      <Container size="default" className="space-y-6">
        <SectionHeading
          eyebrow="Color Architecture"
          title="Centralized Institutional Palette"
          description="Tokens configured to maintain academic authority, visual prestige, and strict WCAG 2.1 AA contrast."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Token 1 */}
          <div className="p-4 rounded-xl bg-navy-900 text-white space-y-2 border border-navy-800 shadow-sm">
            <div className="h-10 rounded bg-navy-900 border border-navy-700" />
            <div className="text-xs font-bold font-serif">Prestige Navy</div>
            <div className="text-[10px] font-mono text-slate-300">#0A192F (Primary)</div>
          </div>

          {/* Token 2 */}
          <div className="p-4 rounded-xl bg-navy-950 text-white space-y-2 border border-navy-800 shadow-sm">
            <div className="h-10 rounded bg-navy-950 border border-navy-700" />
            <div className="text-xs font-bold font-serif">Midnight Navy</div>
            <div className="text-[10px] font-mono text-slate-300">#060D17 (Deep)</div>
          </div>

          {/* Token 3 */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="h-10 rounded bg-gold-500 shadow-sm" />
            <div className="text-xs font-bold font-serif text-navy-900">Champagne Gold</div>
            <div className="text-[10px] font-mono text-slate-600">#C5A880 (Accent)</div>
          </div>

          {/* Token 4 */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="h-10 rounded bg-royal-600 shadow-sm" />
            <div className="text-xs font-bold font-serif text-navy-900">Royal Blue</div>
            <div className="text-[10px] font-mono text-slate-600">#2563EB (Action)</div>
          </div>

          {/* Token 5 */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="h-10 rounded bg-emerald-600 shadow-sm" />
            <div className="text-xs font-bold font-serif text-navy-900">Emerald Trust</div>
            <div className="text-[10px] font-mono text-slate-600">#059669 (bizSAFE)</div>
          </div>

          {/* Token 6 */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="h-10 rounded bg-slate-100 border border-slate-200" />
            <div className="text-xs font-bold font-serif text-navy-900">Alabaster</div>
            <div className="text-[10px] font-mono text-slate-600">#F8FAFC (Surface)</div>
          </div>
        </div>
      </Container>

      <Divider variant="subtle" />

      {/* 2. Typography Scales & Multilingual Fallbacks */}
      <Container size="default" className="space-y-6">
        <SectionHeading
          eyebrow="Typography Hierarchy"
          title="Editorial Serifs & Multilingual Type"
          description="High-dignity serif headlines paired with ultra-legible geometric sans body copy across English, Chinese, and Tamil."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          {/* Left: Heading Scale */}
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">
              Scale Hierarchy (Serif)
            </span>
            <div className="space-y-3 border-l-2 border-gold-400 pl-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400">Display / H1 (36px - 48px)</span>
                <p className="text-3xl sm:text-4xl font-serif font-bold text-navy-900">
                  Empowering Global Careers
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400">Section / H2 (24px - 30px)</span>
                <p className="text-2xl font-serif font-bold text-navy-900">
                  Academic Board & Examination Rigour
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400">Subsection / H3 (18px - 20px)</span>
                <p className="text-lg font-serif font-bold text-navy-900">
                  Diploma in Mechanical & Electrical Engineering
                </p>
              </div>
            </div>
          </div>

          {/* Right: Multilingual Script Fallbacks */}
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">
              Multilingual Typography Rendering
            </span>
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs leading-relaxed">
              <div>
                <strong className="block text-navy-900">English (Plus Jakarta Sans / Inter):</strong>
                <p className="text-slate-600">
                  Registered Private Education Institute with the Committee for Private Education (CPE), SkillsFuture Singapore.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <strong className="block text-navy-900">Singapore Chinese (Noto Serif SC / PingFang):</strong>
                <p className="text-slate-600">
                  新加坡育学国际学院（私立教育理事会 CPE 注册编号：201708935D）提供受官方认证的大专文凭。
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <strong className="block text-navy-900">Singapore Tamil (Noto Serif Tamil / Latha):</strong>
                <p className="text-slate-600">
                  சிங்கப்பூர் தனியார் கல்வி வாரியத்தில் (CPE Reg No: 201708935D) பதிவு பெற்ற எடுலேர்ன் சர்வதேச கல்லூரி.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Divider variant="subtle" />

      {/* 3. Buttons & Interaction States */}
      <Container size="default" className="space-y-6">
        <SectionHeading
          eyebrow="Interactive Elements"
          title="Button System & Action Variants"
          description="All button variants, responsive sizes, focus-visible states, disabled guards, and dynamic loading spinners."
        />

        <div className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          {/* Variants Row */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-500 mb-3 tracking-wider">
              Style Variants
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary (Gold)</Button>
              <Button variant="secondary">Secondary (Navy)</Button>
              <Button variant="royal">Royal Action (Blue)</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          {/* Sizes Row */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-500 mb-3 tracking-wider">
              Responsive Sizing
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" variant="secondary">Small (sm)</Button>
              <Button size="md" variant="secondary">Medium (md)</Button>
              <Button size="lg" variant="secondary">Large (lg)</Button>
            </div>
          </div>

          {/* Icons & State Controls */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-500 mb-3 tracking-wider">
              Icons & Dynamic States
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                iconRight={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
              >
                With Icon Right
              </Button>
              <Button
                variant="secondary"
                iconLeft={<Send className="w-4 h-4" aria-hidden="true" />}
              >
                With Icon Left
              </Button>
              <Button
                variant="royal"
                isLoading={loadingBtn}
                onClick={() => {
                  setLoadingBtn(true);
                  setTimeout(() => setLoadingBtn(false), 2000);
                }}
              >
                {loadingBtn ? 'Simulating Action...' : 'Click to Test Loading'}
              </Button>
              <Button variant="primary" disabled>
                Disabled Button
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <Divider variant="subtle" />

      {/* 4. Badges & Status Indicators */}
      <Container size="default" className="space-y-6">
        <SectionHeading
          eyebrow="Micro-Indicators"
          title="Badges & Accreditation Tags"
          description="Pill badges for statutory accreditation, intake status, and academic categories."
        />

        <div className="flex flex-wrap items-center gap-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <Badge variant="gold" icon={<Sparkles className="w-3 h-3" />}>
            CPE Registered 201708935D
          </Badge>
          <Badge variant="emerald" icon={<ShieldCheck className="w-3 h-3" />}>
            bizSAFE Level 3 Certified
          </Badge>
          <Badge variant="navy" icon={<BookOpen className="w-3 h-3" />}>
            Diploma Level
          </Badge>
          <Badge variant="royal" icon={<Award className="w-3 h-3" />}>
            E-Learning Available
          </Badge>
          <Badge variant="neutral">
            Class Ratio 1:14
          </Badge>
        </div>
      </Container>

      <Divider variant="subtle" />

      {/* 5. Cards & Containers */}
      <Container size="default" className="space-y-6">
        <SectionHeading
          eyebrow="Surfaces & Containers"
          title="Modular Card Architectures"
          description="Default, elevated, interactive, and dark executive card variants."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Default */}
          <Card variant="default">
            <CardHeader>
              <Badge variant="gold" size="sm">Academic Disclosure</Badge>
              <CardTitle>Default Surface</CardTitle>
              <CardDescription>
                Clean slate-200 border for documentation and informational lists.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600">
                Classroom 1 (23 m²) with 15 student seats and digital instructional projectors.
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-[11px] text-slate-400">Little India Campus</span>
              <Button size="sm" variant="ghost">Learn More</Button>
            </CardFooter>
          </Card>

          {/* Card 2: Interactive */}
          <Card variant="interactive">
            <CardHeader>
              <Badge variant="emerald" size="sm">Intake Open</Badge>
              <CardTitle>Interactive Hover</CardTitle>
              <CardDescription>
                Hover triggers subtle elevation, smooth translateY, and gold border glow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600">
                Recommended for course cards and primary programmatic discovery tiles.
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-[11px] font-bold text-navy-900">$2,700 Total Fee</span>
              <Button size="sm" variant="primary">View Course</Button>
            </CardFooter>
          </Card>

          {/* Card 3: Navy Dark */}
          <Card variant="navy">
            <CardHeader>
              <Badge variant="gold" size="sm">Statutory Protection</Badge>
              <h3 className="text-lg font-serif font-bold text-white">Executive Navy</h3>
              <p className="text-xs text-slate-300">
                Premium authority card for governance, contracts, and board profiles.
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-300 leading-relaxed">
                Standard PEI-Student Contract Version 4.1 with mandatory 7-day cooling-off period protection.
              </p>
            </CardContent>
            <CardFooter className="border-navy-800">
              <span className="text-[11px] text-gold-400 font-mono">ERF Compliant</span>
              <Button size="sm" variant="outline" className="border-navy-700 text-white hover:bg-navy-800">
                View Contract
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Container>

      <Divider variant="subtle" />

      {/* 6. Form Fields & Interactive Inputs */}
      <Container size="default" className="space-y-6">
        <SectionHeading
          eyebrow="Form Components"
          title="Accessible Form Controls & Validation States"
          description="Built with visible focus-visible rings, explicit ARIA bindings, helper texts, and error alert states."
        />

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-700">Form States Testing:</span>
            <button
              type="button"
              onClick={() => setHasError(!hasError)}
              className="text-xs text-royal-600 hover:underline font-medium"
            >
              Toggle Error State ({hasError ? 'Active' : 'Inactive'})
            </button>
          </div>

          <FormField
            id="test-name"
            label="Full Legal Name (as per NRIC / Passport)"
            required
            error={hasError ? 'Please enter your legal name exactly as shown on official identity documents.' : undefined}
            helperText={!hasError ? 'Used strictly for student contract matriculation.' : undefined}
          >
            <Input
              id="test-name"
              placeholder="e.g. Tan Wei Ming / Alex Raj"
              value={formInput}
              onChange={(e) => setFormInput(e.target.value)}
              hasError={hasError}
            />
          </FormField>

          <FormField
            id="test-program"
            label="Selected Academic Course"
            required
            helperText="Choose from 21 verified CPE-registered programs."
          >
            <Select id="test-program">
              <option value="">Select an academic qualification...</option>
              <option value="26">Diploma in Mechanical and Electrical Engineering</option>
              <option value="27">Diploma in Information Technology</option>
              <option value="35">Advanced Diploma in Civil Engineering</option>
              <option value="38-1">Certificate in MS Office Basic Level</option>
              <option value="71">Postgraduate Diploma in Instrumentation Control</option>
            </Select>
          </FormField>

          <FormField
            id="test-message"
            label="Educational Background / Inquiry Notes"
            helperText="Indicate any prior diplomas or relevant work experience."
          >
            <Textarea
              id="test-message"
              placeholder="Provide a brief summary of your background..."
            />
          </FormField>
        </div>
      </Container>

      <Divider variant="subtle" />

      {/* 7. Accessible Accordions */}
      <Container size="default" className="space-y-6">
        <SectionHeading
          eyebrow="Disclosure Patterns"
          title="Accessible Accordion Modules"
          description="Used for syllabus module breakdown, examination weightings, and regulatory policy schedules."
        />

        <div className="max-w-3xl">
          <Accordion
            defaultOpenId="mod-1"
            items={[
              {
                id: 'mod-1',
                title: 'Module 01: Engineering Mathematics',
                subtitle: '16 Contact Hours • Written Exam 40% + Assignment 60%',
                badge: 'Core Subject',
                content: (
                  <div className="space-y-2">
                    <p>
                      Covers algebraic modeling, calculus principles, differential equations, and vectors applied to electrical and mechanical engineering problems.
                    </p>
                    <div className="text-[11px] font-mono text-slate-500">
                      Lecturer Deployment: RAJENDRAN SRI RAMANAN (Full-Time)
                    </div>
                  </div>
                ),
              },
              {
                id: 'mod-2',
                title: 'Module 02: Principles of Electrical Engineering',
                subtitle: '16 Contact Hours • Written Exam 40% + Assignment 60%',
                badge: 'Core Subject',
                content: (
                  <div className="space-y-2">
                    <p>
                      Fundamental circuits, Ohm&apos;s and Kirchhoff&apos;s laws, AC/DC analysis, magnetic circuits, and power factor calculations.
                    </p>
                    <div className="text-[11px] font-mono text-slate-500">
                      Lecturer Deployment: VALMUNI MURUGESAN (Part-Time)
                    </div>
                  </div>
                ),
              },
              {
                id: 'mod-3',
                title: 'CPE Mandatory Refund Policy Schedule',
                subtitle: 'Standard PEI-Student Contract Version 4.1 Clause 3',
                badge: 'Statutory Notice',
                content: (
                  <div className="space-y-2 text-xs">
                    <p>
                      Written notice received &gt;30 days before commencement: <strong>100% refund</strong>.
                    </p>
                    <p>
                      Written notice received &le;30 days before commencement: <strong>75% refund</strong>.
                    </p>
                    <p>
                      Notice received 1–5 days after commencement: <strong>25% refund</strong>.
                    </p>
                    <p className="text-slate-500 italic">
                      Registration fee ($300.00) is non-refundable and non-transferable.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Container>

      {/* 8. Breadcrumbs Test */}
      <Container size="default" className="space-y-4">
        <h4 className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
          Breadcrumbs Navigation Test
        </h4>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <Breadcrumbs
            homeHref="/en/"
            items={[
              { label: 'Academic Courses', href: '/en/courses/' },
              { label: 'Diploma Programs', href: '/en/courses/#diplomas' },
              { label: 'Diploma in Mechanical and Electrical Engineering', current: true },
            ]}
          />
        </div>
      </Container>
    </div>
  );
}
