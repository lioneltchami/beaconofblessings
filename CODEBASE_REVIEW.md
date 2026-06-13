# Beacon of Blessings — Comprehensive Codebase Review

> **Review Date:** March 28, 2026
> **Reviewed By:** 9 specialized AI agents (Codebase Explorer, React Specialist, Backend Developer, Code Reviewer, UX Researcher, Deep Researcher, Content Writer, Git Historian, DevOps Engineer)
> **Purpose:** Full understanding of the existing codebase to inform a ground-up rebuild

---

## Table of Contents

1. [Organization Overview](#1-organization-overview)
2. [Current Tech Stack](#2-current-tech-stack)
3. [Site Architecture & Pages](#3-site-architecture--pages)
4. [Component Inventory](#4-component-inventory)
5. [CMS Integration (Contentful)](#5-cms-integration-contentful)
6. [Payment Processing (Stripe)](#6-payment-processing-stripe)
7. [Content & Messaging Analysis](#7-content--messaging-analysis)
8. [Design System & Branding](#8-design-system--branding)
9. [SEO & Analytics](#9-seo--analytics)
10. [Accessibility](#10-accessibility)
11. [Security Audit](#11-security-audit)
12. [Performance Analysis](#12-performance-analysis)
13. [Infrastructure & Deployment](#13-infrastructure--deployment)
14. [Git History & Project Timeline](#14-git-history--project-timeline)
15. [Critical Issues Summary](#15-critical-issues-summary)
16. [Content Gaps & Missing Features](#16-content-gaps--missing-features)
17. [Dead Code & Unused Dependencies](#17-dead-code--unused-dependencies)
18. [Recommended Stack for Rebuild](#18-recommended-stack-for-rebuild)
19. [Rebuild Priorities & Roadmap](#19-rebuild-priorities--roadmap)

---

## 1. Organization Overview

**Beacon of Blessings Charity Initiative** is a faith-based (Christian) non-profit organization registered in Nigeria.

| Field             | Details                                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Founded**       | 2024                                                                                                                                                         |
| **Co-Founders**   | Lionel Tchami (Director, international) and Grace Kure (Nigeria Operations Lead, Lagos)                                                                      |
| **Mission**       | To share the love of Jesus Christ through practical, compassionate service to vulnerable communities in Nigeria, with a primary focus on educational support |
| **Vision**        | To be a transformative beacon of hope across Nigeria, illuminating pathways to education, opportunity, and spiritual growth                                  |
| **Focus**         | Educational support — school supplies, scholarships, digital learning, community libraries                                                                   |
| **Location**      | Lagos, Nigeria                                                                                                                                               |
| **Target Donors** | International diaspora Christians (US, Canada, UK, Australia) and Nigerians                                                                                  |
| **Domain**        | blessedbeaconcharity.org                                                                                                                                        |

### Programs & Projects

| Project                      | Status                   | Budget | Impact                                                                                                |
| ---------------------------- | ------------------------ | ------ | ----------------------------------------------------------------------------------------------------- |
| School Supplies Drive 2024   | Completed (Jun-Sep 2024) | N2.5M  | 500 school bags, 2,000 notebooks, 1,000 textbooks, 1,500 writing materials across 5 Lagos communities |
| Digital Learning Initiative  | Planned Q2 2025          | N5M    | 300 tablets, solar charging, teacher training                                                         |
| Girls' Education Scholarship | Planned Q3 2025          | N8M    | 100 full scholarships with mentorship                                                                 |
| Community Library Project    | Planned 2026             | N15M   | 5 community libraries                                                                                 |

**Note:** The Q2 2025 and Q3 2025 planned projects are now past their target dates (it's March 2026), creating a credibility concern if the site is live.

---

## 2. Current Tech Stack

### Core Framework

| Technology   | Version | Purpose                      |
| ------------ | ------- | ---------------------------- |
| Next.js      | 16.0.10 | React framework (App Router) |
| React        | 19.2.0  | UI library                   |
| TypeScript   | 5.x     | Type safety                  |
| Tailwind CSS | 4.x     | Utility-first CSS            |

### Dependencies (Production)

| Package                   | Version  | Status                                                 |
| ------------------------- | -------- | ------------------------------------------------------ |
| `contentful`              | 11.8.12  | **Dead code** — configured but never consumed by pages |
| `stripe`                  | 19.3.1   | Server-side Stripe SDK — API routes built              |
| `@stripe/react-stripe-js` | 5.3.0    | **Dead code** — never imported on frontend             |
| `@stripe/stripe-js`       | 8.4.0    | **Dead code** — `loadStripe` never called              |
| `framer-motion`           | 12.23.24 | Animation library — used on every page                 |
| `react-hook-form`         | 7.66.0   | Form state management — Donate + Contact forms         |
| `lucide-react`            | 0.553.0  | Icon library — used throughout                         |
| `react-icons`             | 5.5.0    | **Dead code** — never imported                         |
| `@radix-ui/react-dialog`  | 1.1.15   | **Dead code** — never imported                         |
| `@radix-ui/react-select`  | 2.2.6    | **Dead code** — never imported                         |
| `jspdf`                   | 3.0.3    | PDF receipt generation                                 |
| `html2canvas`             | 1.4.1    | **Dead code** — never imported                         |
| `@vercel/analytics`       | 1.5.0    | Web analytics                                          |
| `@vercel/speed-insights`  | 1.2.0    | Performance monitoring                                 |

### Development Dependencies

| Package               | Version | Purpose              |
| --------------------- | ------- | -------------------- |
| Jest                  | 30.2.0  | Testing framework    |
| React Testing Library | 16.3.0  | Component testing    |
| ESLint                | 9.x     | Linting              |
| eslint-config-next    | 16.0.3  | Next.js ESLint rules |

---

## 3. Site Architecture & Pages

### Route Map (10 pages + 3 API routes)

| Route          | File                           | Rendering        | Description                                       |
| -------------- | ------------------------------ | ---------------- | ------------------------------------------------- |
| `/`            | `src/app/page.tsx`             | **Client**       | Homepage — hero, stats, mission, projects, CTA    |
| `/about`       | `src/app/about/page.tsx`       | **Client**       | Story, vision/mission, founders, values, timeline |
| `/projects`    | `src/app/projects/page.tsx`    | **Client**       | 1 completed + 3 future projects                   |
| `/blog`        | `src/app/blog/page.tsx`        | **Server**       | Blog listing — 3 static posts                     |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | **Server (SSG)** | Individual blog post with `generateStaticParams`  |
| `/gallery`     | `src/app/gallery/page.tsx`     | **Client**       | **Placeholder** — "Coming Soon"                   |
| `/donate`      | `src/app/donate/page.tsx`      | **Client**       | Donation form — **payment simulated, not real**   |
| `/contact`     | `src/app/contact/page.tsx`     | **Client**       | Contact form — **submission simulated**           |
| `/privacy`     | `src/app/privacy/page.tsx`     | **Client**       | Privacy policy                                    |
| `/terms`       | `src/app/terms/page.tsx`       | **Client**       | Terms of service                                  |

| API Route                    | Method | Purpose                    |
| ---------------------------- | ------ | -------------------------- |
| `/api/create-payment-intent` | POST   | One-time Stripe donation   |
| `/api/create-subscription`   | POST   | Monthly recurring donation |
| `/api/webhooks/stripe`       | POST   | Stripe webhook handler     |

**Critical architectural issue:** 8 of 10 pages are marked `'use client'` solely for Framer Motion animations, preventing Next.js static generation on the most SEO-critical pages (homepage, about, projects). Only the blog pages are server components.

---

## 4. Component Inventory

| Component         | Path                                           | Type                 | Purpose                                                      |
| ----------------- | ---------------------------------------------- | -------------------- | ------------------------------------------------------------ |
| `Header`          | `src/components/layout/Header.tsx`             | Client, `React.memo` | Fixed nav with mobile hamburger, persistent "Donate Now" CTA |
| `Footer`          | `src/components/layout/Footer.tsx`             | Client, `React.memo` | 3-column footer with links, contact, social (all `href="#"`) |
| `Button`          | `src/components/ui/Button.tsx`                 | Server-compatible    | Polymorphic button/link — 4 variants, 3 sizes                |
| `Chatbot`         | `src/components/ui/Chatbot.tsx`                | Client               | Floating FAQ chatbot — keyword matching, no AI/LLM           |
| `SkipToContent`   | `src/components/ui/SkipToContent.tsx`          | Client               | Accessibility skip-to-main link                              |
| `GoogleAnalytics` | `src/components/analytics/GoogleAnalytics.tsx` | Client               | GA4 via `next/script`                                        |
| `StructuredData`  | `src/components/seo/StructuredData.tsx`        | Server               | JSON-LD for Organization, Donation, Breadcrumb               |

**Root Layout** (`src/app/layout.tsx`): Wraps all pages with SkipToContent → Header → main → Footer → Chatbot → Analytics → StructuredData.

---

## 5. CMS Integration (Contentful)

### Status: Fully scaffolded, completely unused

**Files:**

- `src/lib/contentful.ts` — 30+ exported query functions with REST Content Delivery API
- `src/types/contentful.ts` — 13 TypeScript content type interfaces
- `CONTENTFUL_MIGRATION.md` — Migration plan (never executed)

### Content Model (13 Types)

| Content Type       | Purpose         | Key Fields                                            |
| ------------------ | --------------- | ----------------------------------------------------- |
| `heroSection`      | Homepage hero   | title, subtitle, buttons, backgroundImage, bibleVerse |
| `organizationInfo` | Org metadata    | name, mission, vision, socialMediaLinks, logo         |
| `founderProfile`   | Founder bios    | name, role, bio, photo, achievements, order           |
| `project`          | Projects        | slug, status, budget, impactMetrics (JSON), featured  |
| `testimonial`      | Testimonials    | name, quote, photo, featured, order                   |
| `galleryItem`      | Gallery photos  | image, category (6 enums), date, featured             |
| `impactStatistic`  | Impact numbers  | value, icon (lucide name), category, featured         |
| `blogPost`         | Blog articles   | slug, content, publishDate, category[], tags[]        |
| `faqItem`          | FAQ entries     | question, answer, category (5 enums)                  |
| `coreValue`        | Core values     | title, description, bibleVerse, icon                  |
| `bibleVerse`       | Scripture       | verse, reference, category (6 enums)                  |
| `pageContent`      | Flexible pages  | pageName, sections (JSON array), SEO fields           |
| `contactInfo`      | Contact details | type (5 enums), title, details, icon                  |

### Findings

- **Zero page components import from `contentful.ts`** — every page uses hardcoded inline data
- In-memory cache layer (5-minute TTL) is built but never called
- `fetchEntry<T>()` is defined but has eslint-disable for unused vars
- No ISR revalidation configured anywhere
- The entire Contentful layer is dead code in the deployed state

### Environment Variables Required

```
CONTENTFUL_SPACE_ID
CONTENTFUL_ACCESS_TOKEN
CONTENTFUL_PREVIEW_TOKEN
CONTENTFUL_ENVIRONMENT (default: 'master')
```

---

## 6. Payment Processing (Stripe)

### Status: Backend API routes built, frontend NOT connected

**Server-Side (functional in isolation):**

| Route                   | Functionality                                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `create-payment-intent` | Validates amount ($1-$999,999), email, donor name. Rate limited (5 req/min/IP). Creates Stripe PaymentIntent with `receipt_email`. Returns `clientSecret` + `paymentIntentId`            |
| `create-subscription`   | Validates amount ($5+ monthly). Creates/retrieves Stripe Customer. **Creates a new Price object per request** (will pollute Stripe dashboard). Returns `subscriptionId` + `clientSecret` |
| `webhooks/stripe`       | Verifies signature. Handles 6 event types. **All handlers are TODO stubs** — log to console only, no emails/database                                                                     |

**Client-Side (broken):**

The donate page at `src/app/donate/page.tsx` line 99:

```tsx
// Simulate payment processing
await new Promise((resolve) => setTimeout(resolve, 2000));
```

- `loadStripe` is never called
- Stripe Elements are never rendered
- `@stripe/react-stripe-js` is never imported
- A fake transaction ID is generated
- Users see a "Thank You" screen believing they donated — **no money is processed**

### Issues

1. **Donation form fakes success** — the most critical functional defect
2. **Subscription route creates unbounded Price objects** — no reuse
3. **No rate limiting on subscription route** (payment-intent has it)
4. **In-memory rate limiter won't work on Vercel serverless** — resets on cold starts
5. **Webhook handlers are all stubs** — no email, no database
6. **No `.env.example`** documenting required Stripe keys

### Environment Variables Required

```
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (referenced nowhere — incomplete)
```

---

## 7. Content & Messaging Analysis

### Tone & Voice

- **Warm, compassionate, faith-forward** — every page includes Bible verses
- **Aspirational** — "beacon," "hope," "transformation," "brighter future"
- **Formal but accessible** — professional without being cold
- **High Bible verse density** — at least one scripture per page, sometimes 2-3
- **More institutional than humanized** — describes what the org does rather than showing individual lives changed

### Page-by-Page Content Map

| Page         | Key Content                                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Homepage** | Hero (Matthew 25:35), 4 impact stats, about preview, recent project card, CTA with Proverbs 19:17                                          |
| **About**    | Founding narrative (Luke 4:18), vision/mission, 2 founder bios with placeholder images, 4 core values with scripture, 3-milestone timeline |
| **Projects** | James 2:17 hero, 4 stats, School Supplies Drive (detailed with outcomes/partners), 3 future project cards                                  |
| **Blog**     | 3 sample posts (hardcoded): "Transforming Lives Through Education," "Together We Build Hope," "2024 Year-End Report"                       |
| **Gallery**  | "Coming Soon" placeholder with 6 planned categories                                                                                        |
| **Contact**  | Info cards (email, phone, address, hours + Ecclesiastes 4:9), contact form, 4 "Get Involved" cards                                         |
| **Donate**   | Amount picker (6 tiers with impact framing), frequency toggle, donor form, dedication section, Luke 6:38                                   |
| **Privacy**  | Standard policy, last updated Nov 14, 2025                                                                                                 |
| **Terms**    | Standard terms including refund policy, governing law (Nigeria)                                                                            |

### Critical Content Gaps

1. **No real photographs anywhere** — zero images of actual impact, beneficiaries, or team
2. **No beneficiary stories** — the most effective fundraising content type is absent
3. **No annual report or financial transparency page**
4. **No dedicated volunteer page or signup process** — "Get Involved" cards link to dead anchors
5. **No newsletter/email signup** outside the donation form
6. **No events page**
7. **No board of directors or team page beyond founders**
8. **Social media links all `href="#"`** — no connected presence
9. **Phone number appears to be placeholder** (`+234 (0) 123 456 7890`)
10. **Blog posts are sample data** — not connected to any CMS
11. **Inconsistent impact stats** — homepage says "50+ School Bags," donate page says "2,000+ School Items"

---

## 8. Design System & Branding

### Color Palette: "Deep Purple + Radiant Gold"

**Primary (Deep Purple):**
| Token | Value | Usage |
|-------|-------|-------|
| `--primary-50` | `#faf5ff` | Light backgrounds |
| `--primary-100` | `#f3e8ff` | Card backgrounds |
| `--primary-600` | `#9333ea` | Primary action color |
| `--primary-700` | `#7e22ce` | Hover states |
| `--primary-900` | `#581c87` | Dark accents |
| `--primary-950` | `#3b0764` | Darkest shade |

**Secondary (Radiant Gold):**
| Token | Value | Usage |
|-------|-------|-------|
| `--secondary-400` | `#fbbf24` | Accent |
| `--secondary-500` | `#f59e0b` | Base gold |
| `--secondary-600` | `#d97706` | Darker gold |

**Key Finding:** The gold palette is defined in CSS variables but **almost never used in actual components**. The Button's `secondary` variant references it but is used once and immediately overridden. The `gradient-accent` (gold) is defined but never applied. The site reads as **purple monotone**.

### Typography

- **Body:** System UI sans-serif (`ui-sans-serif, system-ui, -apple-system...`)
- **Display:** Serif token defined (`--font-display`) but **never used**
- **No custom web fonts loaded** — fast but generic
- **Heading scale:** Hero h1 `text-5xl md:text-7xl`, page h1s `text-5xl md:text-6xl`, section h2s `text-4xl`

### Branding Inconsistencies

- `meta theme-color` is `#22c55e` (green) — leftover from pre-rebrand
- PDF receipt generator uses green colors (`primaryGreen = [34, 197, 94]`)
- No logo exists (referenced but not in `/public/`)
- OG/Twitter images referenced but don't exist

### Animations

- Framer Motion on every client page: fade-in on load, scroll-triggered reveals, staggered card grids
- CSS transitions (0.2s ease) on all interactive elements
- Card hover lift effect (`hover:-translate-y-1`)
- AnimatePresence for chatbot and mobile menu

---

## 9. SEO & Analytics

### SEO Implementation

| Feature                                      | Status                                                          |
| -------------------------------------------- | --------------------------------------------------------------- |
| Root metadata (title, description, keywords) | Present                                                         |
| Open Graph tags                              | Present (but images 404)                                        |
| Twitter Card tags                            | Present (but images 404)                                        |
| `robots.ts`                                  | Present — blocks GPTBot, ChatGPT-User                           |
| `sitemap.ts`                                 | Present — 8 static pages (missing blog URLs)                    |
| JSON-LD structured data                      | Organization + DonateAction                                     |
| Per-page metadata                            | Only on blog pages                                              |
| Google Site Verification                     | **Placeholder string** (`"your-google-site-verification-code"`) |
| Breadcrumb structured data                   | Component built but never used                                  |
| `next/image` optimization                    | **Not used anywhere**                                           |

### Analytics

| Service                        | Status                                               |
| ------------------------------ | ---------------------------------------------------- |
| Google Analytics 4             | Configured via env var, typed event tracking library |
| Vercel Analytics               | Active in layout                                     |
| Vercel Speed Insights          | Active in layout                                     |
| Error monitoring (Sentry etc.) | **Not configured**                                   |

---

## 10. Accessibility

### Strengths

- Skip-to-content link component
- ARIA roles on header (`role="banner"`) and footer (`role="contentinfo"`)
- ARIA labels on navigation regions
- Mobile menu button has `aria-expanded` and `aria-controls`
- Focus-visible styling with purple ring
- Mouse-only focus suppression
- `sr-only` utility class

### Weaknesses

- Form inputs lack `id` + `<label htmlFor>` bindings (Donate + Contact pages)
- Chatbot has no `aria-live` region for new messages
- Chatbot uses deprecated `onKeyPress` (should be `onKeyDown`)
- Blog content loses heading structure (raw Markdown not parsed)
- Color contrast concerns: `text-primary-200` and `text-primary-300` on dark backgrounds may fail WCAG AA
- No loading announcements on form submissions

---

## 11. Security Audit

### Priority Findings

| #   | Severity     | Issue                                                     | File                                           |
| --- | ------------ | --------------------------------------------------------- | ---------------------------------------------- |
| 1   | **CRITICAL** | Donation form fakes success without processing payment    | `src/app/donate/page.tsx`                      |
| 2   | **CRITICAL** | XSS via `dangerouslySetInnerHTML` on blog content         | `src/app/blog/[slug]/page.tsx`                 |
| 3   | **HIGH**     | GA script injection via unvalidated env var interpolation | `src/components/analytics/GoogleAnalytics.tsx` |
| 4   | **HIGH**     | Placeholder verification code shipped to production       | `src/app/layout.tsx`                           |
| 5   | **MEDIUM**   | Unbounded Stripe Price creation per subscription          | `src/app/api/create-subscription/route.ts`     |
| 6   | **MEDIUM**   | No rate limiting on subscription endpoint                 | `src/app/api/create-subscription/route.ts`     |
| 7   | **MEDIUM**   | In-memory rate limiter useless on serverless              | `src/lib/rate-limit.ts`                        |
| 8   | **MEDIUM**   | `console.error` globally suppressed                       | `src/app/contact/page.tsx`                     |
| 9   | **MEDIUM**   | Contact form fakes submission                             | `src/app/contact/page.tsx`                     |

### Security Headers (Well Configured)

- Content Security Policy (whitelists GA, Vercel, Stripe)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- XSS Protection
- HSTS (1 year, includeSubDomains)
- Referrer Policy: strict-origin-when-cross-origin
- Permissions Policy (camera, mic, geo denied)
- **Issue:** CSP includes `'unsafe-eval'` which weakens protection

---

## 12. Performance Analysis

### Issues

1. **All pages client-rendered** — homepage (most SEO-critical) is `'use client'`, preventing static generation
2. **Heavy libraries loaded synchronously** — `jspdf` (~2.5MB) and `html2canvas` (~1.3MB) imported eagerly on donate page
3. **Framer Motion (~150KB)** sent to every page for simple fade-in animations
4. **No `next/image`** — when real images are added, they'll lack optimization, lazy loading, responsive sizing
5. **No dynamic imports** — Chatbot and PDF generator should be lazy-loaded
6. **No ISR revalidation** configured for any content

### What Works

- System fonts (no web font loading delay)
- Vercel Edge CDN for static assets
- `React.memo` on Header and Footer

---

## 13. Infrastructure & Deployment

### Current Setup

| Aspect               | Details                                                        |
| -------------------- | -------------------------------------------------------------- |
| **Hosting**          | Vercel (zero-config Next.js)                                   |
| **CI/CD**            | **None** — no GitHub Actions, no automated tests before deploy |
| **Docker**           | None                                                           |
| **Node.js version**  | Not pinned (no `.nvmrc` or `engines` field)                    |
| **Package manager**  | npm (lockfileVersion 3)                                        |
| **Error monitoring** | **None** (no Sentry, Datadog, etc.)                            |
| **Domain**           | blessedbeaconcharity.org                                          |
| **Build status**     | **FAILING** — Next.js 16.2.1 Turbopack error                   |

### Build Error

```
Error: Turbopack build failed with 1 errors:
Next.js inferred your workspace root, but it may not be correct.
We couldn't find the Next.js package (next/package.json) from the
project directory: /Users/lionel/builders/beaconofblessings/src/app
```

### Environment Variables (Complete Inventory)

| Variable                   | Scope  | Service          | Required             |
| -------------------------- | ------ | ---------------- | -------------------- |
| `CONTENTFUL_SPACE_ID`      | Server | Contentful       | No (CMS unused)      |
| `CONTENTFUL_ACCESS_TOKEN`  | Server | Contentful       | No (CMS unused)      |
| `CONTENTFUL_PREVIEW_TOKEN` | Server | Contentful       | No (CMS unused)      |
| `CONTENTFUL_ENVIRONMENT`   | Server | Contentful       | No (default: master) |
| `STRIPE_SECRET_KEY`        | Server | Stripe           | Yes (payments)       |
| `STRIPE_WEBHOOK_SECRET`    | Server | Stripe           | Yes (webhooks)       |
| `NEXT_PUBLIC_GA_ID`        | Client | Google Analytics | Optional             |
| `NEXT_PUBLIC_SITE_URL`     | Client | Self             | Yes (SEO)            |

### Missing Infrastructure

- No `.env.example` documenting required configuration
- No CI/CD pipeline — `test:ci` script exists but nothing runs it
- No error monitoring
- No staging environment
- No database (all data hardcoded or in Stripe)

---

## 14. Git History & Project Timeline

### Repository Stats

- **Remote:** `https://github.com/lioneltchami/beaconofblessings.git`
- **Total commits:** 14 (including 3 merges)
- **Active development:** ~10 hours on Nov 14, 2025
- **Dormant since:** Jan 17, 2026 (automated CVE patch)

### Contributors

| Commits | Author        | Role                        |
| ------- | ------------- | --------------------------- |
| 8       | Claude (AI)   | All feature code            |
| 4       | Lionel Tchami | Reviews, merges, .gitignore |
| 2       | GitHub Setup  | Scaffolding                 |
| 1       | Vercel Bot    | CVE security patch          |

### Evolution Timeline

| Date            | Phase     | What Happened                                                                                                          |
| --------------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| Nov 13, 2025    | Template  | `create-next-app` scaffold — 17 default files                                                                          |
| Nov 14, 2025 AM | Full Drop | 6,500+ line single commit — complete charity website                                                                   |
| Nov 14, 2025    | Cleanup   | Build fixes, font stack, removed test files                                                                            |
| Nov 14, 2025    | Payments  | 3 Stripe API routes, Privacy/Terms pages                                                                               |
| Nov 14, 2025    | Quality   | A11y, GA4, Vercel analytics, sitemap, robots, structured data, 44+ tests, blog system, security headers, rate limiting |
| Nov 14, 2025    | Rebrand   | Blue → Deep Purple/Gold (CSS variables only)                                                                           |
| Nov 15, 2025    | Chatbot   | Complete rewrite with localStorage, export, WCAG                                                                       |
| Nov 28, 2025    | Minor     | .gitignore update                                                                                                      |
| Jan 17, 2026    | Security  | Automated React Server Components CVE fix                                                                              |

### Template vs Custom Code

- **Template:** `.gitignore`, configs, 5 SVGs in `public/`, original `page.tsx`/`layout.tsx`/`globals.css`
- **Custom:** Everything else — 8 pages, 3 API routes, 7 components, 4 libs, blog data, types

---

## 15. Critical Issues Summary

### Showstoppers (Must Fix Before Any Launch)

| Issue                                   | Impact                                                      | Location                       |
| --------------------------------------- | ----------------------------------------------------------- | ------------------------------ |
| **Donation form fakes payment success** | Donors believe they gave money; org receives nothing        | `donate/page.tsx:99`           |
| **Contact form fakes submission**       | Messages are discarded; users think they sent them          | `contact/page.tsx:121-137`     |
| **Build is currently failing**          | Site cannot be deployed                                     | Turbopack workspace root error |
| **No real images exist**                | No visual proof of charitable work; OG/Twitter cards broken | Entire `public/` directory     |

### Security Vulnerabilities

| Issue                              | Severity                      | Location                     |
| ---------------------------------- | ----------------------------- | ---------------------------- |
| XSS via `dangerouslySetInnerHTML`  | Critical (when CMS connected) | `blog/[slug]/page.tsx:95-98` |
| GA script injection                | High (if env compromised)     | `GoogleAnalytics.tsx:32`     |
| CSP includes `'unsafe-eval'`       | Medium                        | `next.config.ts`             |
| In-memory rate limiter ineffective | Medium                        | `lib/rate-limit.ts`          |

### Architecture Problems

| Issue                                        | Impact                                        |
| -------------------------------------------- | --------------------------------------------- |
| 8/10 pages unnecessarily client-rendered     | Kills SSG, hurts SEO, larger bundles          |
| Contentful fully built but completely unused | Dead code complexity                          |
| No database or persistence layer             | No donation records, no contact messages      |
| No email integration                         | No receipts, no notifications, no newsletters |
| No CI/CD pipeline                            | Tests never run before production deploy      |

---

## 16. Content Gaps & Missing Features

### Content Needed for Credible Non-Profit Site

| Content Type                            | Status               | Priority     |
| --------------------------------------- | -------------------- | ------------ |
| Real project photographs                | Missing              | **Critical** |
| Beneficiary stories (individual impact) | Missing              | **Critical** |
| Founder headshots                       | Placeholder initials | High         |
| Organization logo                       | Missing              | High         |
| OG/Twitter share images                 | Referenced but 404   | High         |
| Annual report / financial transparency  | Missing              | High         |
| Board of directors / team page          | Missing              | Medium       |
| Donor testimonials                      | Missing              | Medium       |
| Volunteer stories                       | Missing              | Medium       |
| Event listings                          | Missing              | Medium       |
| Newsletter signup (standalone)          | Missing              | Medium       |
| Social media profiles                   | Placeholder links    | Medium       |
| Real phone number                       | Placeholder format   | Low          |
| FAQ page (standalone)                   | In chatbot only      | Low          |

### Features Needed

| Feature                                 | Current State             | Priority     |
| --------------------------------------- | ------------------------- | ------------ |
| Working payment processing              | Simulated with setTimeout | **Critical** |
| Working contact form                    | Simulated with setTimeout | **Critical** |
| Email system (receipts + notifications) | Not implemented           | High         |
| CMS for content management              | Configured but unused     | High         |
| Volunteer signup flow                   | Dead anchor links         | Medium       |
| Newsletter/email list                   | Not implemented           | Medium       |
| Event management                        | Not implemented           | Medium       |
| Donor dashboard / recurring management  | Not implemented           | Low          |
| Multi-language support                  | Not implemented           | Low          |

---

## 17. Dead Code & Unused Dependencies

### Unused npm Packages (6)

| Package                   | Size Impact | Notes                                |
| ------------------------- | ----------- | ------------------------------------ |
| `react-icons`             | ~50KB       | All icons use `lucide-react` instead |
| `@radix-ui/react-dialog`  | ~15KB       | Never imported                       |
| `@radix-ui/react-select`  | ~20KB       | Never imported                       |
| `@stripe/react-stripe-js` | ~30KB       | `loadStripe` never called            |
| `@stripe/stripe-js`       | ~40KB       | Never imported on frontend           |
| `html2canvas`             | ~1.3MB      | Never imported                       |

### Dead Code Files

| File                                    | Reason                                        |
| --------------------------------------- | --------------------------------------------- |
| `src/lib/contentful.ts` (entire file)   | 30+ functions, zero imports from pages        |
| `src/types/contentful.ts` (entire file) | 13 interfaces, only imported by contentful.ts |
| `CONTENTFUL_MIGRATION.md`               | Migration plan never executed                 |
| `public/file.svg`                       | Next.js template default, unused              |
| `public/globe.svg`                      | Next.js template default, unused              |
| `public/next.svg`                       | Next.js template default, unused              |
| `public/vercel.svg`                     | Next.js template default, unused              |
| `public/window.svg`                     | Next.js template default, unused              |

### Dead Code Patterns

- `BlogCategory` type in `blog.ts` — never used
- `fetchEntry` in `contentful.ts` — eslint-disable for unused
- `filteredGallery` and `openImageModal` in gallery — eslint-disable for unused
- `BreadcrumbStructuredData` — built but never rendered on any page
- Dark mode CSS variables — defined but no dark mode support in components
- `--font-display` serif token — defined but never applied

---

## 18. Recommended Stack for Rebuild

Based on extensive research into 2025-2026 non-profit website best practices, here is the recommended stack:

### Core Framework

| Choice        | Recommendation                 | Why                                                                                                                            |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **Framework** | **Next.js 15+ (App Router)**   | Best for SSR/SSG hybrid, great DX, Vercel-optimized. Keep what you know — the framework itself isn't the problem               |
| **Language**  | **TypeScript 5**               | Type safety, better DX, catch errors at compile time                                                                           |
| **Styling**   | **Tailwind CSS 4 + shadcn/ui** | shadcn/ui gives you accessible, beautiful, customizable components you own (built on Radix UI). Industry standard in 2025-2026 |
| **Hosting**   | **Vercel**                     | Zero-config Next.js hosting, generous free tier (100GB bandwidth), Edge CDN, analytics built-in                                |

### CMS (Content Management)

| Option          | Recommendation  | Why                                                                                                                                              |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Primary**     | **Sanity.io**   | Free tier generous (100K API requests/month), real-time collaboration, excellent React integration, visual editing, no vendor lock-in on content |
| **Alternative** | **Payload CMS** | Next.js-native, free, self-hosted, Local API in Server Components. Best if you want full control                                                 |
| **Avoid**       | Contentful      | Free tier is limited (5 users, 1 locale), pricing scales poorly for non-profits                                                                  |

### Payments & Donations

| Choice                | Recommendation                                                                                    | Why                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Payment processor** | **Stripe**                                                                                        | Reduced non-profit rate (2.2% + $0.30), recurring donations, Apple/Google Pay, ACH |
| **Implementation**    | **Stripe Checkout (hosted)** or **Stripe Elements**                                               | Hosted checkout is simpler and PCI-compliant out of the box                        |
| **Features to add**   | "Cover the processing fee" checkbox, impact-linked amounts, monthly as default, auto tax receipts |

### Email

| Purpose                  | Recommendation | Why                                                                               |
| ------------------------ | -------------- | --------------------------------------------------------------------------------- |
| **Transactional**        | **Resend**     | Modern, React Email templates, generous free tier (3K emails/month), excellent DX |
| **Marketing/Newsletter** | **MailerLite** | 30% non-profit discount, easiest to use, 1K subscribers free                      |

### UI Components & Design

| Choice                | Recommendation                                      | Why                                                                              |
| --------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Component library** | **shadcn/ui**                                       | Built on Radix UI, fully accessible (WCAG AA), Tailwind-native, you own the code |
| **Icons**             | **Lucide React**                                    | Already using — keep it                                                          |
| **Animations**        | **Framer Motion** (selective) or **CSS animations** | Use sparingly, don't make every page `'use client'`                              |
| **Images**            | **`next/image`** (mandatory)                        | Optimization, lazy loading, responsive, blur placeholder                         |
| **Fonts**             | **`next/font`**                                     | Self-hosted, no render-blocking, eliminates CLS                                  |

### Analytics & Monitoring

| Purpose              | Recommendation                       | Why                                                                             |
| -------------------- | ------------------------------------ | ------------------------------------------------------------------------------- |
| **Web analytics**    | **Vercel Analytics** + **Plausible** | Plausible is privacy-friendly (no cookies, GDPR-compliant), lightweight (< 1KB) |
| **Error monitoring** | **Sentry** (free tier)               | Catch errors before users report them                                           |
| **Performance**      | **Vercel Speed Insights**            | Already have it — keep it                                                       |

### Other Integrations

| Need                     | Recommendation                                                        | Why                                            |
| ------------------------ | --------------------------------------------------------------------- | ---------------------------------------------- |
| **Events**               | **Luma** (free)                                                       | Embeddable widgets, RSVP management, reminders |
| **Volunteer management** | Custom form → Airtable/Notion                                         | Start simple, graduate to VolunteerHub later   |
| **Social media**         | Open Graph + dynamic OG images via `next/og`                          | Auto-generated share images                    |
| **SEO**                  | JSON-LD structured data (NonprofitType, Event, FAQPage, DonateAction) | Rich search results                            |
| **Rate limiting**        | **Upstash Redis**                                                     | Works in serverless (unlike in-memory)         |

### Architecture Principles for Rebuild

1. **Server Components by default** — only use `'use client'` when truly needed (forms, animations)
2. **CMS-driven content** — no hardcoded text in components
3. **Real payment processing** from day one (Stripe test mode → live)
4. **Real email delivery** from day one (Resend)
5. **CI/CD pipeline** — GitHub Actions running lint + test + build on every PR
6. **Image optimization** — `next/image` everywhere, real photography
7. **Accessibility first** — WCAG 2.2 AA compliance, proper label bindings, aria-live regions
8. **Mobile-first design** — test at 320px width minimum

### Apply for Non-Profit Benefits

- **Google Ad Grants** — $10,000/month in free Google search ads (for eligible 501(c)(3) or equivalent)
- **Vercel Open Source Program** — potential free Pro tier
- **Stripe Non-profit rate** — 2.2% + $0.30 (vs standard 2.9%)
- **MailerLite** — 30% non-profit discount

---

## 19. Rebuild Priorities & Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ] Set up new Next.js 15 project with App Router
- [ ] Configure shadcn/ui + Tailwind CSS 4
- [ ] Set up TypeScript strict mode
- [ ] Configure ESLint + Prettier
- [ ] Set up GitHub Actions CI/CD (lint → test → build)
- [ ] Set up Sanity.io (or Payload CMS) with content model
- [ ] Configure Vercel deployment with environment variables
- [ ] Pin Node.js version (`.nvmrc`)
- [ ] Create `.env.example`

### Phase 2: Core Pages (Week 2-3)

- [ ] Root layout with `next/font`, proper `theme-color`, metadata
- [ ] Header (responsive, sticky, Donate CTA)
- [ ] Footer (with real social links when available)
- [ ] Homepage (Server Component, hero, stats from CMS, projects, CTA)
- [ ] About page (story, founders with real photos, values, timeline from CMS)
- [ ] Projects page (from CMS, with real images)
- [ ] Contact page (with real form submission via Resend)

### Phase 3: Donations (Week 3-4)

- [ ] Stripe integration (Checkout or Elements — real from day one)
- [ ] One-time and recurring donation flows
- [ ] "Cover the fee" checkbox
- [ ] Impact-linked amount suggestions
- [ ] Donation receipt emails via Resend
- [ ] Stripe webhook handler (with real email + database)
- [ ] Rate limiting via Upstash Redis
- [ ] Donor thank-you page

### Phase 4: Content & Engagement (Week 4-5)

- [ ] Blog system (CMS-driven, Markdown rendering, proper SEO)
- [ ] Gallery (CMS-driven, real photos, lightbox)
- [ ] Volunteer signup page and flow
- [ ] Newsletter signup (MailerLite integration)
- [ ] Event listings (Luma embed or custom)
- [ ] FAQ page (from CMS)

### Phase 5: Polish & Launch (Week 5-6)

- [ ] SEO audit (all pages have metadata, sitemap includes all routes)
- [ ] Accessibility audit (WCAG 2.2 AA)
- [ ] Performance optimization (Lighthouse 90+ all categories)
- [ ] Error monitoring (Sentry)
- [ ] Real content population (photos, stories, board members)
- [ ] Social media profile creation and linking
- [ ] Google Search Console verification
- [ ] Apply for Google Ad Grants
- [ ] Stripe live mode activation
- [ ] Launch

---

## Appendix A: File Tree

```
beaconofblessings/
├── public/
│   ├── file.svg (template)
│   ├── globe.svg (template)
│   ├── next.svg (template)
│   ├── vercel.svg (template)
│   └── window.svg (template)
├── src/
│   ├── app/
│   │   ├── about/page.tsx
│   │   ├── api/
│   │   │   ├── create-payment-intent/route.ts
│   │   │   ├── create-subscription/route.ts
│   │   │   └── webhooks/stripe/route.ts
│   │   ├── blog/
│   │   │   ├── [slug]/page.tsx
│   │   │   └── page.tsx
│   │   ├── contact/page.tsx
│   │   ├── donate/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── analytics/GoogleAnalytics.tsx
│   │   ├── layout/Header.tsx
│   │   ├── layout/Footer.tsx
│   │   ├── seo/StructuredData.tsx
│   │   ├── ui/Button.tsx
│   │   ├── ui/Chatbot.tsx
│   │   └── ui/SkipToContent.tsx
│   ├── data/blog-posts.ts
│   ├── lib/
│   │   ├── analytics.ts
│   │   ├── contentful.ts
│   │   ├── pdfGenerator.ts
│   │   └── rate-limit.ts
│   └── types/
│       ├── blog.ts
│       └── contentful.ts
├── CONTENTFUL_MIGRATION.md
├── README.md
├── eslint.config.mjs
├── jest.config.ts
├── jest.setup.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
└── tsconfig.json
```

## Appendix B: All Test Files

```
src/components/analytics/__tests__/GoogleAnalytics.test.tsx
src/components/seo/__tests__/StructuredData.test.tsx
src/components/ui/__tests__/SkipToContent.test.tsx
src/lib/__tests__/analytics.test.ts
```

Coverage threshold: 80% (branches, functions, lines, statements)

---

_This review was conducted by 9 specialized AI agents analyzing the codebase from different perspectives: architecture, frontend, backend, security, UX, content, deployment, git history, and modern best practices research. All source files were read and analyzed._
