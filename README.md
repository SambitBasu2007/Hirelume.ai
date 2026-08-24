# Hirelume — AI Resume Analyzer

Upload your resume and get instant AI-powered analysis with ATS scoring, keyword gaps, and actionable feedback — tailored to any job description you're targeting.

## Color Scheme

| Role | Color | Usage |
|---|---|---|
| Background | `#000000` | Page background, dominant surface |
| Accent | `#0076df` | Solid blue — buttons, links, badges, active states |
| Text primary | `#f1f5f9` | Headings, body text |
| Text secondary | `#94a3b8` | Descriptions, subtitles |
| Text muted | `#475569` | Captions, metadata |

All colors are solid — no gradients.



<pre>
```
hirelume/
├── src/
│   ├── app/                            # Next.js App Router
│   │   ├── api/
│   │   │   ├── analyze/               # AI analysis API (Week 2+)
│   │   │   │   └── route.ts           # POST: resume text + job description → Gemini analysis
│   │   │   └── extract-text/
│   │   │       └── route.ts           # POST: file upload → PDF/DOCX text extraction
│   │   ├── analyze/                   # Analysis results page (Week 2+)
│   │   │   └── page.tsx               # Displays AI scores, gaps, suggestions
│   │   ├── upload/
│   │   │   ├── error.tsx              # Error boundary for upload page
│   │   │   ├── loading.tsx            # Loading skeleton for upload page
│   │   │   └── page.tsx               # Upload page: file drop, paste text, extraction results
│   │   ├── globals.css                # Tailwind v4 CSS-first config, custom utilities, animations
│   │   ├── layout.tsx                 # Root layout: Navbar + Footer, Geist font, dark mode, metadata
│   │   ├── not-found.tsx              # 404 page
│   │   └── page.tsx                   # Landing page: hero, features, how-it-works, CTA
│   ├── components/
│   │   ├── analyze/                   # AI analysis UI components (Week 2+)
│   │   │   ├── AnalysisDashboard.tsx  # Main analysis results container
│   │   │   ├── KeywordGapList.tsx     # Missing keywords display
│   │   │   ├── ScoreCard.tsx          # Individual score circle/card
│   │   │   └── SuggestionList.tsx     # Actionable feedback items
│   │   ├── layout/
│   │   │   ├── Footer.tsx             # Site footer: brand, links, copyright
│   │   │   └── Navbar.tsx             # Sticky navbar: logo, nav links, CTA, mobile menu
│   │   └── upload/
│   │       ├── ExtractedTextView.tsx  # Extracted text: char count, copy button, scanned warning
│   │       └── FileUploader.tsx       # Drag-and-drop zone with client-side validation
│   ├── lib/
│   │   ├── extract-text.ts            # PDF/DOCX text extraction (pdf2json + mammoth)
│   │   ├── gemini.ts                  # Gemini API client (Week 2+)
│   │   ├── prompts.ts                 # AI system prompts (Week 2+)
│   │   ├── utils.ts                   # cn() utility: clsx + tailwind-merge
│   │   └── validation.ts              # Shared file validation constants & functions
│   └── types/
│       ├── analysis.ts                # AI analysis result types (Week 2+)
│       └── index.ts                   # Shared type declarations
├── public/                            # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .freebuff/
│   └── run.md                         # Dev server run instructions
├── eslint.config.mjs                  # ESLint: Next.js core-web-vitals + TypeScript
├── next-env.d.ts                      # Next.js TypeScript declarations (auto-generated)
├── next.config.ts                     # Next.js config: standalone, security headers, images
├── package.json                       # Dependencies: Next.js 16, React 19, pdf2json, mammoth, Tailwind v4
├── plan.md                            # Full product & engineering plan
├── postcss.config.mjs                 # PostCSS: @tailwindcss/postcss
├── tsconfig.json                      # TypeScript: strict, path alias @/* → ./src/*
├── AGENTS.md                          # Next.js agent rules (auto-generated)
├── CLAUDE.md                          # Agent instructions
└── README.md                          # This file
```
</pre>



## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server routes + frontend |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS v4 | Utility-first CSS (no component library) |
| PDF Parsing | pdf-parse v2 | PDF text extraction |
| DOCX Parsing | mammoth | Word text extraction |
| Hosting | Vercel | Zero-config deployment |

## Current Status

**Week 1 complete** — Upload and text extraction fully functional. AI analysis is next.


---

## 🧩 Modular Feature Architecture

Hirelume is built with **swappable modules**. Each major feature is self-contained in its own directory tree, making it easy to replace, extend, or remove without breaking the rest of the app.

### Current Module Map

| Module | Purpose | Files | Swap Cost |
|--------|---------|-------|-----------|
| **Landing** | Marketing page | `app/page.tsx` | Low — single file |
| **Upload** | File ingestion | `app/upload/`, `components/upload/`, `api/extract-text/` | Medium — 3 zones |
| **Text Extraction** | PDF/DOCX → plain text | `lib/extract-text.ts`, `lib/validation.ts` | Low — pure functions |
| **Layout Shell** | Nav + Footer | `components/layout/`, `app/layout.tsx` | Medium — wraps all pages |
| **Auth** *(planned)* | User accounts | `app/login/`, `app/register/`, `lib/auth.ts` | High — touches API routes |

---

### How to Swap a Module

#### Example 1: Replace the Landing Page

# 1. Remove old extraction layer
npm uninstall pdf2json mammoth
rm src/lib/extract-text.ts

# 2. Update API route to stream file to Gemini
# src/app/api/extract-text/route.ts → rename to /api/analyze/route.ts
# Accept: multipart file → forward to Gemini → return structured analysis

# 3. Update validation (optional)
# src/lib/validation.ts — remove PDF/DOCX specific checks if accepting any format

Add a New Feature Module (e.g., GitHub Import)
Pattern: Create a self-contained directory tree
bash
# 1. Create module directory
mkdir -p src/app/github-import
mkdir -p src/components/github-import
mkdir -p src/lib/github

# 2. Add route files
touch src/app/github-import/page.tsx          # UI entry point
touch src/app/api/github/repos/route.ts       # Server API: fetch repos
touch src/app/api/github/bullets/route.ts     # Server API: generate bullets

# 3. Add components
touch src/components/github-import/RepoSelector.tsx
touch src/components/github-import/BulletPreview.tsx

# 4. Add shared logic
touch src/lib/github/client.ts                # Octokit wrapper
touch src/lib/github/prompts.ts               # Gemini prompts for bullet generation

# 5. Wire into navigation
# Edit: src/components/layout/Navbar.tsx
# Add: { href: '/github-import', label: 'GitHub Import' }
Module boundary: Everything inside github-import/ and lib/github/ is isolated. If you later remove the feature, delete those directories and remove the nav link.

Module Contract Rules
To keep modules swappable, follow these contracts:
Table
Contract	Rule
API Routes	Always return { success: boolean, data?: T, error?: string }
Components	Accept props, don't import from sibling modules directly
Lib files	Pure functions only, no side effects, no React imports
State	Keep page-level state in page.tsx, pass down via props
Styling	Use only Tailwind utilities + shared glass-card / btn-solid classes

Future Module Ideas
Table
Module	Description	Estimated Effort
AI Analysis	Gemini-powered resume scoring	2–3 days
Job Description Matcher	Paste JD, get keyword gap analysis	1–2 days
GitHub Project Import	Auto-generate bullets from repos	2–3 days
Resume Builder	WYSIWYG editor with templates	3–5 days
Export Engine	PDF/Word export with ATS formatting	2–3 days
Auth & History	Clerk/NextAuth + saved analyses	2–3 days
Multi-language	i18n support (Spanish, Hindi, etc.)	1–2 days


Quick Start: Adding a Module
Copy this template for any new feature:
tsx
// src/app/[module]/page.tsx
'use client';

import { useState } from 'react';
import ModuleComponent from '@/components/[module]/ModuleComponent';

export default function ModulePage() {
  const [data, setData] = useState(null);
  
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Your module UI here */}
      </div>
    </div>
  );
}
TypeScript
// src/app/api/[module]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Module logic
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Module error' },
      { status: 500 }
    );
  }
}
plain

---

## Summary of Changes to `README.md`

| Section | Action |
|---------|--------|
| `## Directory Structure` | Replace with updated tree (added `error.tsx`, `loading.tsx`, `not-found.tsx`, `validation.ts`) |
| `## 🧩 Modular Feature Architecture` | **New section** — add after Directory Structure |

The modular guide gives you:
- A **module map** showing what's swappable
- **3 concrete examples** (Landing swap, Extraction engine swap, GitHub Import addition)
- **Contract rules** to keep future modules clean
- **Future module ideas** with effort estimates
- **Copy-paste template** for new modules

Push this and your README will serve as a living architecture guide for Week 2+.
