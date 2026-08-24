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

## Directory Structure

```
hirelume/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── extract-text/
│   │   │       └── route.ts           # POST endpoint: accepts PDF/DOCX, extracts plain text
│   │   ├── upload/
│   │   │   └── page.tsx               # Upload page: tabbed file/paste input, extraction, results
│   │   ├── favicon.ico                # Browser tab icon
│   │   ├── globals.css                # Global styles: CSS vars, .text-accent, .glass-card, .btn-solid, animations
│   │   ├── layout.tsx                 # Root layout: Navbar + Footer, Geist font, dark class, metadata
│   │   └── page.tsx                   # Landing page: hero, features, how-it-works, CTA
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx             # Site footer: brand, product links, legal links, copyright
│   │   │   └── Navbar.tsx             # Sticky navbar: logo, desktop nav, CTA, mobile menu
│   │   └── upload/
│   │       ├── ExtractedTextView.tsx   # Extracted text display: char count, copy, scanned-PDF warning
│   │       └── FileUploader.tsx        # Drag-and-drop file upload zone with client-side validation
│   └── lib/
│       ├── extract-text.ts            # Text extraction: pdf-parse v2, mammoth, scanned-PDF detection
│       └── utils.ts                   # cn() utility: clsx + tailwind-merge className composition
├── public/
│   ├── file.svg                       # Static asset
│   ├── globe.svg                      # Static asset
│   ├── next.svg                       # Static asset
│   ├── vercel.svg                     # Static asset
│   └── window.svg                     # Static asset
├── .freebuff/
│   └── run.md                         # Dev server run instructions
├── eslint.config.mjs                  # ESLint: Next.js core-web-vitals + TypeScript
├── next-env.d.ts                      # Next.js TypeScript declarations (auto-generated)
├── next.config.ts                     # Next.js config (default)
├── package.json                       # Dependencies: Next.js 16, React 19, pdf-parse v2, mammoth, Tailwind v4
├── plan.md                            # Full product & engineering plan
├── postcss.config.mjs                 # PostCSS: @tailwindcss/postcss
├── tsconfig.json                      # TypeScript: strict, path alias @/* → ./src/*
├── AGENTS.md                          # Next.js agent rules (auto-generated)
├── CLAUDE.md                          # Agent instructions
└── README.md                          # This file
```

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
