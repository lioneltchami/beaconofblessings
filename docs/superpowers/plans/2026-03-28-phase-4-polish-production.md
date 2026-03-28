# Phase 4: Production Polish — Implementation Plan

> **For agentic workers:** Execute task-by-task with parallel agents where possible.

**Goal:** Production-ready polish — Vercel analytics, dynamic OG images, gallery page, error/loading states, custom 404, and accessibility fixes.

**Architecture:** All additions follow established patterns — Server Components by default, client components only for interactive gallery filtering. OG images use next/og ImageResponse API. Analytics injected via root layout.

**Tech Stack:** @vercel/analytics, @vercel/speed-insights, next/og (ImageResponse), Next.js App Router conventions (not-found, loading, error).

---

## Tasks

1. Vercel Analytics + Speed Insights in root layout
2. Dynamic OG image route
3. Gallery page with category filtering
4. Custom not-found (404) page
5. Loading states (loading.tsx)
6. Error boundary (error.tsx)
7. Tests + verification
