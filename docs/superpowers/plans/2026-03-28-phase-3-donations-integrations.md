# Phase 3: Donations & Integrations — Implementation Plan

> **For agentic workers:** Execute task-by-task with parallel agents where possible.

**Goal:** Make the site functional with real Stripe donation processing, Resend email delivery, and a working contact form backend.

**Architecture:** Stripe Checkout (hosted redirect) for donations — no client-side Stripe SDK needed. Resend for transactional emails (receipts, notifications). Server Actions for form submissions. All integrations gracefully handle missing API keys for build safety.

**Tech Stack:** Stripe (server-side SDK), Resend, Next.js 15 Server Actions, App Router API routes.

---

## File Structure

```
src/
├── app/
│   ├── api/webhooks/stripe/route.ts    # Stripe webhook handler
│   ├── donate/
│   │   ├── page.tsx                     # Donate page (Server Component wrapper)
│   │   ├── success/page.tsx             # Post-payment success page
│   │   └── cancel/page.tsx              # Payment cancelled page
│   └── actions/
│       ├── checkout.ts                  # Server Action: create Stripe Checkout
│       ├── contact.ts                   # Server Action: send contact email
│       └── emails.ts                    # Email sending functions
├── components/
│   └── donate-form.tsx                  # Client: amount selection + checkout trigger
├── lib/
│   ├── stripe.ts                        # Stripe client singleton
│   └── resend.ts                        # Resend client singleton
```
