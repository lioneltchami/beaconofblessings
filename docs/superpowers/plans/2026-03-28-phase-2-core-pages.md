# Phase 2: Core Pages & Navigation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the complete navigable website with Header, Footer, 8 pages, blog system, contact form, and SEO — all as Server Components with static data ready for future CMS integration.

**Architecture:** All pages are React Server Components (no `'use client'` except for interactive elements like mobile menu and contact form). Content lives in `src/data/` as typed constants — these will be swapped for CMS queries in a later phase. Layout uses a shared Header/Footer wrapper. Blog uses MDX-free approach with simple Markdown rendering.

**Tech Stack:** Next.js 15 App Router, shadcn/ui (card, badge, input, textarea, label, separator, sheet), Lucide React icons, Tailwind CSS 4.

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Modify: add Header + Footer
│   ├── page.tsx                # Rewrite: full homepage
│   ├── about/page.tsx          # Create: about page
│   ├── projects/page.tsx       # Create: projects page
│   ├── blog/
│   │   ├── page.tsx            # Create: blog listing
│   │   └── [slug]/page.tsx     # Create: blog post detail
│   ├── contact/page.tsx        # Create: contact page with form
│   ├── privacy/page.tsx        # Create: privacy policy
│   ├── terms/page.tsx          # Create: terms of service
│   ├── robots.ts               # Create: robots.txt
│   └── sitemap.ts              # Create: dynamic sitemap
├── components/
│   ├── layout/
│   │   ├── header.tsx          # Create: site header with nav
│   │   ├── footer.tsx          # Create: site footer
│   │   └── mobile-nav.tsx      # Create: mobile navigation (client)
│   ├── sections/
│   │   ├── hero.tsx            # Create: reusable hero section
│   │   └── cta-section.tsx     # Create: reusable CTA section
│   └── ui/                     # shadcn components (already installed)
├── data/
│   ├── site.ts                 # Create: org info, nav links, social
│   ├── projects.ts             # Create: project data
│   ├── blog-posts.ts           # Create: blog post data
│   └── founders.ts             # Create: founder profiles
└── lib/
    └── utils.ts                # Existing: cn() utility
```

## Implementation Tasks

### Task 1: Site data layer

### Task 2: Header + Mobile Nav + Footer (parallel)

### Task 3: Root layout integration

### Task 4: Full Homepage

### Task 5: About page

### Task 6: Projects page

### Task 7: Blog listing + [slug] pages

### Task 8: Contact page with form

### Task 9: Privacy + Terms pages

### Task 10: SEO (robots.ts, sitemap.ts, per-page metadata)

### Task 11: Tests for all components and pages

### Task 12: Final verification + commit
