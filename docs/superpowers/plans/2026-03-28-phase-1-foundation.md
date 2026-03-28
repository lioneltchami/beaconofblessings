# Phase 1: Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Beacon of Blessings from scratch with a modern, production-ready Next.js 15 foundation — clean project structure, shadcn/ui components, Vitest testing, CI/CD pipeline, and the Deep Purple + Radiant Gold design system.

**Architecture:** Fresh Next.js 15 App Router project with React Server Components by default (no unnecessary `'use client'`). shadcn/ui for accessible, Tailwind-native components. Vitest for fast testing. GitHub Actions for CI. Vercel for deployment.

**Tech Stack:** Next.js 15, React 19, TypeScript 5 (strict), Tailwind CSS 4, shadcn/ui (new-york style), Vitest, React Testing Library, Lucide React icons, GitHub Actions CI.

---

## File Structure

```
beaconofblessings/
├── .github/workflows/ci.yml          # CI pipeline
├── .nvmrc                             # Node.js version pin
├── .env.example                       # Environment variable documentation
├── components.json                    # shadcn/ui configuration
├── eslint.config.mjs                  # ESLint flat config
├── next.config.ts                     # Next.js configuration
├── package.json                       # Dependencies and scripts
├── postcss.config.mjs                 # PostCSS (Tailwind)
├── tsconfig.json                      # TypeScript strict config
├── vitest.config.mts                  # Vitest configuration
├── public/
│   └── favicon.ico                    # Favicon
├── src/
│   ├── app/
│   │   ├── globals.css                # Tailwind + Deep Purple/Gold tokens
│   │   ├── layout.tsx                 # Root layout (Server Component)
│   │   └── page.tsx                   # Homepage placeholder (Server Component)
│   ├── components/
│   │   └── ui/                        # shadcn/ui components (auto-generated)
│   │       └── button.tsx             # First shadcn component
│   └── lib/
│       └── utils.ts                   # shadcn cn() utility
├── __tests__/
│   ├── app/
│   │   └── page.test.tsx              # Homepage test
│   └── setup.ts                       # Vitest setup
├── CODEBASE_REVIEW.md                 # Preserved from analysis
└── docs/superpowers/plans/            # This plan
```

---

### Task 1: Create rebuild branch and clean old files

**Files:**

- Remove: All old `src/`, `public/`, config files, `node_modules/`, `package-lock.json`
- Keep: `.git/`, `CODEBASE_REVIEW.md`, `.github/workflows/ci.yml`, `docs/`

- [ ] **Step 1: Create rebuild branch**

```bash
git checkout -b rebuild/v2
```

- [ ] **Step 2: Remove old source and config files**

Remove everything except `.git`, `CODEBASE_REVIEW.md`, `.github/`, and `docs/`:

```bash
rm -rf src/ public/ node_modules/ .next/
rm -f package.json package-lock.json tsconfig.json next.config.ts eslint.config.mjs postcss.config.mjs jest.config.ts jest.setup.ts README.md CONTENTFUL_MIGRATION.md .nvmrc components.json
```

- [ ] **Step 3: Verify only intended files remain**

```bash
ls -la
# Expected: .git/ .github/ CODEBASE_REVIEW.md docs/
```

---

### Task 2: Scaffold fresh Next.js 15 project

**Files:**

- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `public/`

- [ ] **Step 1: Run create-next-app in temp directory**

```bash
npx create-next-app@15 temp-beacon --typescript --eslint --tailwind --app --src-dir --import-alias "@/*" --no-turbopack
```

- [ ] **Step 2: Move scaffolded files to project root**

```bash
# Move all files from temp to root (including dotfiles)
cp -r temp-beacon/* temp-beacon/.* . 2>/dev/null || true
rm -rf temp-beacon
```

- [ ] **Step 3: Verify scaffold**

```bash
npm run build
# Expected: Build succeeds
```

---

### Task 3: Pin Node.js version and create .env.example

**Files:**

- Create: `.nvmrc`
- Create: `.env.example`

- [ ] **Step 1: Create .nvmrc**

```
22
```

- [ ] **Step 2: Create .env.example**

```bash
# Beacon of Blessings - Environment Variables
# Copy this file to .env.local and fill in values

# ── Site ──────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://beaconofblessings.org

# ── Stripe (Donations) ───────────────────────
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# ── Analytics (Optional) ─────────────────────
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

### Task 4: Configure Vitest for testing

**Files:**

- Create: `vitest.config.mts`
- Create: `__tests__/setup.ts`
- Modify: `package.json` (add vitest deps and scripts)

- [ ] **Step 1: Install Vitest and testing dependencies**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event vite-tsconfig-paths
```

- [ ] **Step 2: Create vitest.config.mts**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./__tests__/setup.ts"],
    include: ["__tests__/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/index.ts", "src/**/*.d.ts"],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
```

- [ ] **Step 3: Create **tests**/setup.ts**

```typescript
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Update package.json scripts**

Add/replace these scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ci": "vitest run --coverage"
  }
}
```

---

### Task 5: Initialize shadcn/ui

**Files:**

- Create: `components.json`
- Create: `src/lib/utils.ts`
- Modify: `src/app/globals.css` (shadcn base styles)

- [ ] **Step 1: Run shadcn init**

```bash
npx shadcn@latest init -d
```

If prompted, select: style=new-york, baseColor=neutral, cssVariables=yes.

- [ ] **Step 2: Verify components.json has empty tailwind config (Tailwind v4 requirement)**

Check `components.json` — the `tailwind.config` field must be empty string `""`.

- [ ] **Step 3: Add Button component to verify shadcn works**

```bash
npx shadcn@latest add button
```

- [ ] **Step 4: Verify button component was created at src/components/ui/button.tsx**

```bash
ls src/components/ui/button.tsx
```

---

### Task 6: Set up Deep Purple + Radiant Gold design tokens

**Files:**

- Modify: `src/app/globals.css`

- [ ] **Step 1: Add custom CSS variables for brand colors**

Add to `globals.css` after the shadcn theme variables — the Deep Purple primary and Radiant Gold accent:

```css
/* ── Beacon of Blessings Brand Tokens ─────────── */
:root {
  --bob-purple-50: #faf5ff;
  --bob-purple-100: #f3e8ff;
  --bob-purple-200: #e9d5ff;
  --bob-purple-300: #d8b4fe;
  --bob-purple-400: #c084fc;
  --bob-purple-500: #a855f7;
  --bob-purple-600: #9333ea;
  --bob-purple-700: #7e22ce;
  --bob-purple-800: #6b21a8;
  --bob-purple-900: #581c87;
  --bob-purple-950: #3b0764;

  --bob-gold-50: #fffbeb;
  --bob-gold-100: #fef3c7;
  --bob-gold-200: #fde68a;
  --bob-gold-300: #fcd34d;
  --bob-gold-400: #fbbf24;
  --bob-gold-500: #f59e0b;
  --bob-gold-600: #d97706;
  --bob-gold-700: #b45309;
  --bob-gold-800: #92400e;
  --bob-gold-900: #78350f;
}
```

---

### Task 7: Create root layout with proper metadata

**Files:**

- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace default layout with Beacon of Blessings layout**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://beaconofblessings.org",
  ),
  title: {
    default: "Beacon of Blessings — Illuminating Futures Through Education",
    template: "%s | Beacon of Blessings",
  },
  description:
    "Beacon of Blessings Charity Initiative transforms lives through educational support for vulnerable communities in Nigeria. Join us in making a difference.",
  keywords: [
    "charity",
    "non-profit",
    "education",
    "Nigeria",
    "Beacon of Blessings",
    "school supplies",
    "donate",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Beacon of Blessings",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#9333ea" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

---

### Task 8: Create placeholder homepage (Server Component)

**Files:**

- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace default page with Beacon of Blessings placeholder**

```tsx
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--bob-purple-100)" }}
        >
          <Heart
            className="h-8 w-8"
            style={{ color: "var(--bob-purple-600)" }}
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Beacon of Blessings
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Illuminating futures through education in Nigeria.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Button size="lg">Donate Now</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          Site rebuild in progress. Phase 1: Foundation complete.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Install lucide-react**

```bash
npm install lucide-react
```

---

### Task 9: Write homepage test

**Files:**

- Create: `__tests__/app/page.test.tsx`

- [ ] **Step 1: Create the test file**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the organization name", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /beacon of blessings/i }),
    ).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<HomePage />);
    expect(
      screen.getByText(/illuminating futures through education/i),
    ).toBeInTheDocument();
  });

  it("renders donate and learn more buttons", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("button", { name: /donate now/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /learn more/i }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests and verify they pass**

```bash
npm test
# Expected: 3 tests pass
```

---

### Task 10: Update GitHub Actions CI workflow

**Files:**

- Modify: `.github/workflows/ci.yml`

- [ ] **Step 1: Update CI to use Vitest**

The existing CI workflow already calls `npm run test:ci`, which now maps to `vitest run --coverage`. Verify the workflow file is correct and has the right Node version reading from `.nvmrc`.

---

### Task 11: Update Next.js config with security headers

**Files:**

- Modify: `next.config.ts`

- [ ] **Step 1: Add security headers to next.config.ts**

```typescript
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

---

### Task 12: Final verification

- [ ] **Step 1: Run lint**

```bash
npm run lint
# Expected: No errors
```

- [ ] **Step 2: Run tests**

```bash
npm test
# Expected: All tests pass
```

- [ ] **Step 3: Run build**

```bash
npm run build
# Expected: Build succeeds with no errors
```

- [ ] **Step 4: Run dev server smoke test**

```bash
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o "Beacon of Blessings"
kill %1
# Expected: "Beacon of Blessings" appears in output
```

---

### Task 13: Commit

- [ ] **Step 1: Stage all new files**

```bash
git add -A
```

- [ ] **Step 2: Commit**

```bash
git commit -m "feat: Phase 1 — rebuild foundation with Next.js 15, shadcn/ui, Vitest, CI/CD

- Fresh Next.js 15 project with App Router and React Server Components
- shadcn/ui with new-york style and Tailwind CSS 4
- Vitest + React Testing Library for testing
- GitHub Actions CI pipeline (lint → test → build)
- Deep Purple + Radiant Gold design tokens
- Proper metadata and security headers
- Server Component homepage (no unnecessary 'use client')
- .nvmrc pinning Node 22, .env.example documenting all vars

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```
