# Topnotch Nonprofit Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn Beacon of Blessings from a competent nonprofit site into a donor-trust-first, impact-led, launch-ready nonprofit website.

**Architecture:** Preserve the existing Next.js 15, Sanity fallback, Stripe Checkout, and Resend foundation. Rebuild the public information architecture around Programs, Impact, Transparency, Stories, and Donate while hardening the live donation/CMS paths.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind 4, Sanity client, Stripe Checkout, Resend, Vitest/Testing Library.

---

## File Ownership

- Worker A owns nonprofit content architecture: `src/data/programs.ts`, `src/data/impact.ts`, `src/app/programs/**`, `src/app/impact/**`, `src/app/transparency/**`, and matching tests.
- Worker B owns donation/payment/email hardening: `src/components/donate-form.tsx`, `src/app/actions/checkout.ts`, `src/app/actions/emails.ts`, `src/app/api/webhooks/stripe/route.ts`, `src/app/donate/success/page.tsx`, and matching tests.
- Worker C owns CMS/media/SEO hardening: `src/lib/sanity/**`, `src/components/gallery-grid.tsx`, `src/components/album-photo-grid.tsx`, `src/components/resource-list.tsx`, `src/app/sitemap.ts`, `src/app/layout.tsx` structured data, `next.config.ts`, and matching tests.
- Parent owns homepage, navigation, footer, global visual integration, plan integration, and final verification.

## Tasks

### Task 1: Nonprofit Information Architecture

Create a top-level Programs, Impact, and Transparency architecture. Each page must answer donor trust questions: what work happens, where it happens, who benefits, what donations fund, what proof exists, and how the organization is accountable.

- [ ] Add reusable `programs` and `impact` static data with specific school-support programs, outcomes, gift uses, and transparency facts.
- [ ] Build `/programs` and `/programs/[slug]` pages with program-specific donation CTAs.
- [ ] Build `/impact` with annual results, evidence, metrics, and a photo/report framing.
- [ ] Build `/transparency` with registration placeholders, board/trustees, donation use, policies, and financial document links.
- [ ] Add focused tests for rendering the new pages.

### Task 2: Donation UX And Payment Trust

Keep Stripe-hosted Checkout, but make the donor flow stronger and safer.

- [ ] Add different preset amounts for one-time vs monthly gifts.
- [ ] Add trust and tax/jurisdiction language near the donation form.
- [ ] Make checkout metadata robust and enable Stripe receipt/invoice support where appropriate.
- [ ] Use `customer_details.email` as webhook fallback when donor metadata email is missing.
- [ ] Send recurring donation receipt/notification emails for `invoice.paid`.
- [ ] Escape HTML in all outbound emails.
- [ ] Add tests for donation form presets, email escaping, checkout action behavior, and webhook email paths where practical.

### Task 3: CMS, Media, SEO, And Build Hardening

Make Sanity live mode match the static fallback behavior and turn media into proof.

- [ ] Fix Sanity slug projections for blog posts and projects.
- [ ] Project Sanity resource file URLs and album/photo image fields.
- [ ] Render real gallery images when present, falling back to the existing branded placeholders.
- [ ] Render downloadable resource URLs from either static `fileUrl` or Sanity asset URLs.
- [ ] Update sitemap to use query helpers where possible instead of only static data.
- [ ] Add NGO/Organization JSON-LD and route metadata improvements.
- [ ] Add `outputFileTracingRoot` in `next.config.ts` to silence the workspace-root warning.
- [ ] Add tests for Sanity projections/media rendering where practical.

### Task 4: Homepage, Navigation, Footer, And Visual System

Make the first impression donor-grade: mission clarity, proof, real-world specificity, and one obvious next action.

- [ ] Update nav to `About`, `Programs`, `Impact`, `Transparency`, `Stories`, `Contact`, `Donate`.
- [ ] Rebuild homepage sections: hero, trust strip, impact dashboard, program pathways, story/proof, where gifts go, final CTA.
- [ ] Replace generic “Projects” language in user-facing navigation with “Programs.”
- [ ] Update footer to surface Transparency, Annual Reports, Donor Privacy, Contact, and key donor trust links.
- [ ] Preserve accessibility, responsive layout, and strong contrast.
- [ ] Update homepage/header/footer tests.

### Task 5: Verification

- [ ] Run `npm test`.
- [ ] Run `npm run test:coverage`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Start the local dev server and inspect the redesigned routes in browser.
- [ ] Fix any regressions found during verification.
