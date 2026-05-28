# Beacon of Blessings Website

Production website for **Beacon of Blessings Charity Initiative**, an education-focused nonprofit serving children and families in Nigeria.

This repository is a Next.js application with:

- A public nonprofit website
- Sanity CMS content management
- Static fallback content when Sanity is unavailable
- Stripe donation checkout
- Resend-powered email notifications and receipts
- Public document/resource downloads
- Project lifecycle logic that automatically moves projects between upcoming, current, and completed based on dates
- Tests, linting, security headers, and Vercel deployment support

The site is designed so non-developers can manage as much content as possible through Sanity while the codebase keeps reliable fallbacks and business logic.

## Table of Contents

- [What This Website Does](#what-this-website-does)
- [Technology Stack](#technology-stack)
- [Core Architecture](#core-architecture)
- [Project Structure](#project-structure)
- [Routes and Pages](#routes-and-pages)
- [Content System](#content-system)
- [Sanity CMS](#sanity-cms)
- [Static Fallback Content](#static-fallback-content)
- [Project Lifecycle System](#project-lifecycle-system)
- [Resources and Public Documents](#resources-and-public-documents)
- [Donations and Stripe](#donations-and-stripe)
- [Email System](#email-system)
- [Gallery, Albums, Blog, and Programs](#gallery-albums-blog-and-programs)
- [Styling and Design System](#styling-and-design-system)
- [Images and Media](#images-and-media)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Testing and Quality Checks](#testing-and-quality-checks)
- [Deployment](#deployment)
- [Common Content Tasks](#common-content-tasks)
- [Common Developer Tasks](#common-developer-tasks)
- [Troubleshooting](#troubleshooting)
- [Security and Accessibility Notes](#security-and-accessibility-notes)
- [Important Files](#important-files)
- [Future Maintenance Checklist](#future-maintenance-checklist)

## What This Website Does

The site presents Beacon of Blessings as a legitimate, transparent, donor-ready nonprofit. It explains the mission, shows programs, publishes documents, collects donations, and gives the team a CMS-driven way to keep the site current.

The public visitor experience includes:

- Homepage with mission, donor confidence, program highlights, field imagery, gift examples, and calls to donate or contact.
- About page with founding story, principles, milestones, and organization goals.
- Programs pages describing the main work areas and how donations support each program.
- Impact page summarizing outcomes, metrics, evidence, and proof points.
- Transparency page with registration facts, board/governance details, reporting cadence, document statuses, and policy links.
- Projects page showing current, completed, and upcoming projects.
- Resources page with public documents, registration certificate, reports, policies, and a link to the project timeline.
- Gallery and album pages for photo-based storytelling.
- Blog/story pages for updates.
- Contact form.
- Donation flow through Stripe Checkout.
- Privacy and terms pages.

## Technology Stack

| Area | Tool |
| --- | --- |
| Framework | Next.js 15 App Router |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI primitives | Base UI |
| Icons | Lucide React |
| CMS | Sanity |
| Payments | Stripe Checkout |
| Email | Resend |
| Hosting | Vercel |
| Testing | Vitest + Testing Library |
| Linting | ESLint |
| Analytics | Vercel Analytics and Speed Insights |

## Core Architecture

The application follows a Sanity-first, static-fallback architecture.

At a high level:

1. Pages call query helpers from `src/lib/sanity/queries.ts`.
2. Query helpers check whether Sanity is configured.
3. If Sanity is configured, the app fetches live CMS documents.
4. If Sanity is not configured, returns empty, errors, or has missing values, the app falls back to static content in `src/data/`.
5. Page components render the normalized content.

This means the site can keep working even if:

- Sanity credentials are missing locally.
- Sanity has no document yet for a page.
- A Sanity document is partially empty.
- A CMS request fails temporarily.

The fallback data is not temporary placeholder data. It is an intentional safety layer.

## Project Structure

```txt
.
|-- src/
|   |-- app/                 # Next.js App Router pages, layouts, API routes, and server actions
|   |-- components/          # Reusable UI, forms, layout, gallery, resources
|   |-- data/                # Static fallback content
|   `-- lib/                 # Sanity, Stripe, Resend, lifecycle, utilities
|-- sanity/
|   `-- schemas/             # Sanity schema definitions
|-- scripts/
|   `-- seed-sanity.ts       # Seeds fallback content into Sanity
|-- public/
|   `-- documents/           # Public PDF/document assets
|-- __tests__/               # Unit and page/component tests
|-- next.config.ts           # Next config, image domains, security headers
|-- vercel.json              # Vercel function/region config
|-- package.json             # Scripts and dependencies
`-- README.md                # This guide
```

## Routes and Pages

### Public Pages

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Homepage and primary donor-facing story |
| `/about` | `src/app/about/page.tsx` | Founding story, principles, milestones |
| `/programs` | `src/app/programs/page.tsx` | Program overview |
| `/programs/[slug]` | `src/app/programs/[slug]/page.tsx` | Individual program detail pages |
| `/impact` | `src/app/impact/page.tsx` | Impact report, metrics, outcome pathway |
| `/transparency` | `src/app/transparency/page.tsx` | Governance, registration, reporting, policies |
| `/projects` | `src/app/projects/page.tsx` | Current, completed, and upcoming project timeline |
| `/resources` | `src/app/resources/page.tsx` | Public document library |
| `/gallery` | `src/app/gallery/page.tsx` | Gallery overview |
| `/gallery/[slug]` | `src/app/gallery/[slug]/page.tsx` | Album detail pages |
| `/blog` | `src/app/blog/page.tsx` | Stories/blog index |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Individual story pages |
| `/contact` | `src/app/contact/page.tsx` | Contact form and involvement paths |
| `/donate` | `src/app/donate/page.tsx` | Donation page and Stripe checkout form |
| `/donate/success` | `src/app/donate/success/page.tsx` | Post-checkout success page |
| `/donate/cancel` | `src/app/donate/cancel/page.tsx` | Cancelled checkout page |
| `/privacy` | `src/app/privacy/page.tsx` | Privacy policy |
| `/terms` | `src/app/terms/page.tsx` | Terms page |

### API and Server-Side Logic

| Route/File | Purpose |
| --- | --- |
| `src/app/api/webhooks/stripe/route.ts` | Receives Stripe webhook events |
| `src/app/actions/checkout.ts` | Creates Stripe Checkout sessions |
| `src/app/actions/contact.ts` | Handles contact form submission |
| `src/app/actions/emails.ts` | Sends contact notifications, donation notifications, and donation receipts |

## Content System

The content system has three layers:

1. **Sanity CMS documents** for team-editable content.
2. **Static fallback files** in `src/data/` for reliability.
3. **Page components** in `src/app/` that render the content.

The most important file for content fetching is:

```txt
src/lib/sanity/queries.ts
```

It contains functions like:

- `getHomePage()`
- `getProgramsPage()`
- `getAboutPage()`
- `getImpactPage()`
- `getTransparencyPage()`
- `getContactPage()`
- `getDonatePage()`
- `getProjectsPage()`
- `getResourcesPage()`
- `getPrograms()`
- `getProjects()`
- `getResources()`
- `getAlbums()`
- `getBlogPosts()`

Most page components do not fetch Sanity directly. They call these helper functions.

## Sanity CMS

Sanity is used for content that the nonprofit team should be able to edit without touching code.

### Sanity Schemas

Schema files live in:

```txt
sanity/schemas/
```

Important schemas:

| Schema | File | Purpose |
| --- | --- | --- |
| Site config | `sanity/schemas/site-config.ts` | Organization name, legal name, contact info, navigation, social links |
| Pages | `sanity/schemas/pages.ts` | Editable content for homepage and major static pages |
| Programs | `sanity/schemas/program.ts` | Program cards and program detail pages |
| Projects | `sanity/schemas/project.ts` | Project records, dates, lifecycle mode, budgets, impacts |
| Resources | `sanity/schemas/resource.ts` | Public documents and downloads |
| Blog posts | `sanity/schemas/blog-post.ts` | Stories/blog content |
| Albums | `sanity/schemas/album.ts` | Photo albums |
| Gallery items | `sanity/schemas/gallery-item.ts` | Gallery cards |
| Founders | `sanity/schemas/founder.ts` | Founder/team content |
| Impact stats | `sanity/schemas/impact-stat.ts` | Reusable impact statistics |
| Core values | `sanity/schemas/core-value.ts` | Values shown across the site |

### How Sanity Is Connected

Sanity connection code is in:

```txt
src/lib/sanity/client.ts
```

The site considers Sanity configured when `SANITY_PROJECT_ID` exists.

```ts
export const isSanityConfigured = Boolean(projectId);
```

If `SANITY_TOKEN` exists, the client uses authenticated requests. If no token is available in production, it uses Sanity CDN reads.

### Seeding Sanity

The script:

```txt
scripts/seed-sanity.ts
```

builds Sanity documents from static data and writes them to Sanity.

Commands:

```bash
npm run sanity:seed -- --dry-run
npm run sanity:seed
npm run sanity:seed -- --no-overwrite
```

What the options mean:

- `--dry-run`: shows what would be created or updated without writing.
- No flag: creates or replaces all seeded documents.
- `--no-overwrite`: only creates documents that do not already exist.

Required environment variables for seeding:

```bash
SANITY_PROJECT_ID=...
SANITY_DATASET=production
SANITY_TOKEN=...
SANITY_API_VERSION=2024-01-01
```

Do not commit `.env` or any Sanity token.

## Static Fallback Content

Static fallback content lives in:

```txt
src/data/
```

Important files:

| File | Purpose |
| --- | --- |
| `src/data/site.ts` | Site config, navigation, footer links, social links, core values |
| `src/data/pages.ts` | Page-level content for homepage, about, contact, donate, resources, etc. |
| `src/data/programs.ts` | Program fallback data |
| `src/data/projects.ts` | Project fallback data and helper functions |
| `src/data/resources.ts` | Public resources/documents fallback data |
| `src/data/impact.ts` | Transparency, impact report, board/governance fallback data |
| `src/data/gallery.ts` | Gallery item fallback data |
| `src/data/albums.ts` | Album fallback data |
| `src/data/blog-posts.ts` | Blog/story fallback data |
| `src/data/founders.ts` | Founder fallback data |
| `src/data/stock-images.ts` | Curated fallback image URLs |

Fallbacks matter because the website should not go blank just because a CMS field is missing.

The query helpers also merge Sanity content with fallback content where appropriate. This allows a partially filled Sanity document to still render safely.

## Project Lifecycle System

Projects now move automatically through lifecycle sections based on dates.

The lifecycle logic lives in:

```txt
src/lib/project-lifecycle.ts
```

The project model supports:

```ts
status: "completed" | "current" | "upcoming";
lifecycleMode?: "auto" | "manual";
startDate?: string;
endDate?: string;
```

### Automatic Mode

When `lifecycleMode` is `"auto"`:

| Date Condition | Section |
| --- | --- |
| Today is before `startDate` | Upcoming Projects |
| Today is between `startDate` and `endDate` | Current Projects |
| Today is after `endDate` | Completed Projects |

### Manual Mode

When `lifecycleMode` is `"manual"`:

The site uses the `status` field exactly as entered.

Manual mode is useful if:

- A project is paused.
- A project needs to remain current after its planned end date.
- A launch date changed but the team does not want the site to move it yet.
- The team wants editorial control over a special project.

### Relative Completed Dates

Completed projects show relative time through:

```ts
formatProjectCompletedAgo(project)
```

Examples:

- `Completed today`
- `20 months ago`
- `2 years ago`
- `10 years ago`

This is why a project completed today will naturally read as older in future years without editing code.

### Current Project Data

Fallback project examples in `src/data/projects.ts`:

| Project | Start | End | Current Lifecycle on May 27, 2026 |
| --- | --- | --- | --- |
| School Supplies Drive 2024 | 2024-06-01 | 2024-09-30 | Completed |
| Digital Learning Initiative | 2026-01-01 | 2026-12-31 | Current |
| Girls' Education Scholarship Program | 2026-09-01 | 2027-07-31 | Upcoming |
| Community Library Project | 2027-01-01 | 2027-12-31 | Upcoming |

### Important Note

There is no background cron job moving projects every night. The lifecycle is computed when the site renders or revalidates. This is better for this site because it avoids maintaining a separate scheduler and keeps the logic deterministic.

## Resources and Public Documents

The Resources page is:

```txt
src/app/resources/page.tsx
```

The resource list component is:

```txt
src/components/resource-list.tsx
```

Fallback resource data is:

```txt
src/data/resources.ts
```

### Resource Categories

Resources can be grouped into:

- `registration`
- `annual-reports`
- `project-reports`
- `policies`

The UI lets visitors filter by category.

### Public Certificate

The incorporation certificate PDF is available from:

```txt
public/documents/beacon-of-blessings-certificate-of-incorporation.pdf
```

The public website links to this document from the Resources page and transparency-related content.

Current certificate facts used on the site:

- Organization: Beacon of Blessings Charity Initiative
- Registration number: `8271788`
- TIN: `32841511-0001`
- Registration date: February 15, 2025
- Jurisdiction: Nigeria Corporate Affairs Commission

### Resource URL Safety

`ResourceList` validates resource URLs before rendering download links. It allows:

- Same-site document URLs under `/documents/`
- Sanity CDN file URLs under `cdn.sanity.io/files/`

This prevents arbitrary or unsafe URLs from being rendered as trusted downloads.

### Resources to Projects Link

The Resources page includes a "Project Timeline" section that links to:

```txt
/projects
```

This connects public documents and project history so visitors can move from proof/documents into the project lifecycle view.

## Donations and Stripe

The donation page is:

```txt
src/app/donate/page.tsx
```

The donation form component is:

```txt
src/components/donate-form.tsx
```

Checkout session creation is handled by:

```txt
src/app/actions/checkout.ts
```

Stripe client setup is:

```txt
src/lib/stripe.ts
```

### Donation Flow

1. Visitor opens `/donate`.
2. Visitor chooses one-time or monthly donation.
3. Visitor selects a preset amount or enters a custom amount.
4. Optionally, donation can be tied to a program through the `program` query parameter.
5. Form submits to the `createCheckoutSession` server action.
6. Server action creates a Stripe Checkout session.
7. Visitor is redirected to Stripe.
8. Stripe redirects back to:
   - `/donate/success`
   - `/donate/cancel`
9. Stripe webhooks notify the app about completed payments and recurring invoices.
10. The app sends donor receipt and internal notification emails through Resend.

### Program-Specific Donations

If the URL includes:

```txt
/donate?program=school-readiness-kits
```

the donation form looks up the program and adds its name/slug to Stripe metadata.

This helps connect donation records to program intent.

### Stripe Webhook

The webhook route is:

```txt
src/app/api/webhooks/stripe/route.ts
```

It handles:

- `checkout.session.completed`
- `invoice.paid`
- `customer.subscription.deleted`

For one-time paid Checkout sessions:

- Sends donor receipt email.
- Sends internal donation notification email.

For recurring donation invoices:

- Sends recurring donation receipt email.
- Sends internal donation notification email.

Webhook signature verification uses:

```bash
STRIPE_WEBHOOK_SECRET
```

## Email System

Email is powered by Resend.

Client setup is:

```txt
src/lib/resend.ts
```

Email formatting helpers are:

```txt
src/lib/email-format.ts
```

Email server actions are:

```txt
src/app/actions/emails.ts
```

The email system sends:

- Contact form notifications to the organization email.
- Donation receipts to donors.
- Donation notifications to the organization email.

Environment variables:

```bash
RESEND_API_KEY=...
EMAIL_FROM=Beacon of Blessings <noreply@yourdomain.com>
ORG_EMAIL=info@beaconofblessings.org
```

Important behavior:

- Contact form validation happens server-side.
- Contact form email errors are logged but not exposed in detail to visitors.
- Donation receipt content escapes user-provided values before placing them into HTML.

## Gallery, Albums, Blog, and Programs

### Programs

Programs are managed through:

- `src/data/programs.ts`
- `sanity/schemas/program.ts`
- `src/app/programs/page.tsx`
- `src/app/programs/[slug]/page.tsx`

Program pages include:

- Title
- Kicker
- Summary
- Location
- Status
- Who benefits
- What happens
- Gift examples
- Outcomes
- Proof points
- CTA labels
- Donation CTA
- Image

### Projects

Projects are managed through:

- `src/data/projects.ts`
- `sanity/schemas/project.ts`
- `src/app/projects/page.tsx`
- `src/lib/project-lifecycle.ts`

Projects are date-aware and can automatically move between lifecycle sections.

### Gallery

Gallery overview uses:

- `src/data/gallery.ts`
- `sanity/schemas/gallery-item.ts`
- `src/app/gallery/page.tsx`

Album detail pages use:

- `src/data/albums.ts`
- `sanity/schemas/album.ts`
- `src/app/gallery/[slug]/page.tsx`
- `src/components/album-photo-grid.tsx`
- `src/components/lightbox.tsx`

### Blog/Stories

Blog/story content uses:

- `src/data/blog-posts.ts`
- `sanity/schemas/blog-post.ts`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`

## Styling and Design System

The visual direction is warm, trustworthy, child-development friendly, and nonprofit-oriented.

Core brand palette currently includes:

- Growth green: primary brand color
- Warm gold: donation/action accent
- Trust indigo: registration/governance accent
- Soft cream/off-white backgrounds

Global styles live in:

```txt
src/app/globals.css
```

Reusable UI primitives live in:

```txt
src/components/ui/
```

Button styling is centralized in:

```txt
src/components/ui/button-variants.ts
```

Important pattern:

- Use `Button` for real button behavior.
- Use `Link` or `<a>` with `buttonVariants()` for navigation/download links.

This avoids Base UI accessibility warnings and keeps correct link semantics.

## Images and Media

Images come from three possible places:

1. Sanity image assets.
2. External allowed URLs, such as Pexels.
3. Static URLs in fallback content.

Allowed remote image domains are configured in:

```txt
next.config.ts
```

Current allowed hosts:

- `cdn.sanity.io`
- `images.pexels.com`

If a new image host is used, add it to `remotePatterns` in `next.config.ts`.

For public files like PDFs, use:

```txt
public/documents/
```

Files in `public/` are served from the site root. For example:

```txt
public/documents/example.pdf
```

is available at:

```txt
/documents/example.pdf
```

## Environment Variables

Start from:

```txt
.env.example
```

Create a local environment file:

```bash
cp .env.example .env
```

or:

```bash
cp .env.example .env.local
```

### Site

```bash
NEXT_PUBLIC_SITE_URL=https://beaconofblessings.org
```

Used for Stripe success/cancel URLs and canonical site behavior.

For local development, it can be:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

### Sanity

```bash
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_TOKEN=your-token
```

Notes:

- `SANITY_PROJECT_ID` turns on Sanity fetching.
- `SANITY_TOKEN` is needed for authenticated/private reads and seeding.
- Without Sanity config, the site uses static fallback data.

### Stripe

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Notes:

- `STRIPE_SECRET_KEY` is required for Checkout.
- `STRIPE_WEBHOOK_SECRET` is required for webhook verification.
- The current donation form uses server-side Checkout creation.

### Resend

```bash
RESEND_API_KEY=re_...
EMAIL_FROM=Beacon of Blessings <noreply@yourdomain.com>
ORG_EMAIL=info@beaconofblessings.org
```

Notes:

- `ORG_EMAIL` receives contact form and donation notification emails.
- `EMAIL_FROM` must be a sender address allowed by Resend.

### Analytics

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

The app also includes Vercel Analytics and Speed Insights dependencies.

## Local Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

By default, Next.js uses port `3000`. In this working session the site is commonly run on port `3001`:

```bash
PORT=3001 npm run dev
```

Open:

```txt
http://localhost:3001
```

### Important Dev Server Note

After running:

```bash
npm run build
```

the `.next` directory is rewritten for production output. If a dev server is already running, it can sometimes show stale or broken development state.

Clean restart:

```bash
lsof -ti tcp:3001 | xargs -r kill
rm -rf .next
PORT=3001 npm run dev
```

## Testing and Quality Checks

### Lint

```bash
npm run lint
```

Runs ESLint across the project.

### Tests

```bash
npm test
```

Runs Vitest once.

```bash
npm run test:watch
```

Runs Vitest in watch mode.

```bash
npm run test:coverage
```

Runs coverage.

### Build

```bash
npm run build
```

Creates a production Next.js build.

### Recommended Verification Before Deploying

Run:

```bash
npm run lint
npm test
npm run build
```

Then start or restart the local dev server and manually smoke test:

- `/`
- `/programs`
- `/projects`
- `/resources`
- `/donate`
- `/contact`
- `/transparency`

## Deployment

The app is configured for Vercel.

Important files:

```txt
vercel.json
DEPLOYMENT.md
```

`vercel.json` sets:

- Framework: Next.js
- Region: `iad1`
- Stripe webhook max duration: 30 seconds

Deploy through Vercel with the required environment variables set in the Vercel dashboard.

### Production Environment Checklist

Set these in Vercel:

```bash
NEXT_PUBLIC_SITE_URL=https://beaconofblessings.org
SANITY_PROJECT_ID=...
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_TOKEN=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
RESEND_API_KEY=...
EMAIL_FROM=...
ORG_EMAIL=...
```

Then configure Stripe webhook endpoint:

```txt
https://beaconofblessings.org/api/webhooks/stripe
```

Webhook events to send:

- `checkout.session.completed`
- `invoice.paid`
- `customer.subscription.deleted`

## Common Content Tasks

### Update Homepage Text

Preferred:

1. Open Sanity Studio.
2. Edit the `homePage` document.
3. Update hero, donor confidence cards, field moments, program intro, gift section, or final CTA.
4. Publish.

Fallback/code:

```txt
src/data/pages.ts
```

### Add a New Program

Preferred:

1. Add a `program` document in Sanity.
2. Fill slug, title, summary, status, beneficiary details, gift examples, outcomes, proof points, and image.
3. Set `visible` to true.

Fallback/code:

```txt
src/data/programs.ts
```

### Add a New Project

Preferred:

1. Add a `project` document in Sanity.
2. Fill title and slug.
3. Set `lifecycleMode`.
4. Add `startDate` and `endDate`.
5. Fill display date, budget, description, impact points, image, and featured flag.

Use `lifecycleMode: auto` if the project should move automatically.

Use `lifecycleMode: manual` if the team wants to force the status.

Fallback/code:

```txt
src/data/projects.ts
```

### Add a Project Report

Preferred:

1. Upload a file to Sanity or place it under `public/documents/`.
2. Add a `resource` document in Sanity.
3. Choose category `project-reports`.
4. Set title, description, file type, file size, date, and file URL/file.
5. Publish.

Fallback/code:

```txt
src/data/resources.ts
```

### Add a Public PDF

For code-hosted PDFs:

1. Place the PDF in:

```txt
public/documents/
```

2. Link it as:

```txt
/documents/file-name.pdf
```

3. Add or update a resource in Sanity or `src/data/resources.ts`.

### Update Registration Details

Likely places:

- Sanity `siteConfig.registrationStatus`
- Sanity `resourcesPage.registrationBanner`
- Sanity `transparencyPage.facts`
- Sanity `resource` documents for certificate/TIN

Fallback/code:

- `src/data/site.ts`
- `src/data/pages.ts`
- `src/data/resources.ts`
- `src/data/impact.ts`

### Add Gallery Photos

Preferred:

1. Create or update an `album` document in Sanity.
2. Add photos with image, alt text, title, and description.
3. Choose a cover image.
4. Publish.

Fallback/code:

- `src/data/albums.ts`
- `src/data/gallery.ts`

### Add a Blog/Story Post

Preferred:

1. Add a `blogPost` document in Sanity.
2. Fill title, slug, excerpt, content, author, date, category, read time, tags, and image.
3. Publish.

Fallback/code:

```txt
src/data/blog-posts.ts
```

## Common Developer Tasks

### Add a New Page

1. Create a route under `src/app/`.
2. Add fallback content to `src/data/pages.ts` if the page is CMS-managed.
3. Add a Sanity schema section in `sanity/schemas/pages.ts` if editors should control it.
4. Add types in `src/lib/sanity/types.ts`.
5. Add a query helper in `src/lib/sanity/queries.ts`.
6. Add tests under `__tests__/app/`.
7. Run lint, tests, and build.

### Add a New Sanity Document Type

1. Add a schema file under `sanity/schemas/`.
2. Export it from `sanity/schemas/index.ts`.
3. Add a TypeScript interface in `src/lib/sanity/types.ts`.
4. Add a GROQ projection and query function in `src/lib/sanity/queries.ts`.
5. Add fallback data in `src/data/` if needed.
6. Update `scripts/seed-sanity.ts` if it should be seeded.

### Add a New Document Category

1. Update `ResourceCategory` in `src/data/resources.ts`.
2. Add it to `resourceCategories`.
3. Add border color mapping in `src/components/resource-list.tsx`.
4. Update `sanity/schemas/resource.ts`.
5. Add or update tests.

### Add a New Project Lifecycle Rule

Edit:

```txt
src/lib/project-lifecycle.ts
```

Then add tests in:

```txt
__tests__/lib/project-lifecycle.test.ts
```

Do not place lifecycle rules directly inside page components.

## Troubleshooting

### Page Shows Old Content

Possible causes:

- Sanity content is cached for revalidation.
- Browser has stale dev bundle.
- Dev server is using production `.next` output after `npm run build`.

Try:

```bash
rm -rf .next
PORT=3001 npm run dev
```

### Sanity Content Is Not Showing

Check:

```bash
SANITY_PROJECT_ID
SANITY_DATASET
SANITY_API_VERSION
SANITY_TOKEN
```

If `SANITY_PROJECT_ID` is missing, the site intentionally uses static fallback content.

Also check that the Sanity document IDs match what queries expect:

- `siteConfig`
- `homePage`
- `programsPage`
- `aboutPage`
- `impactPage`
- `transparencyPage`
- `contactPage`
- `donatePage`
- `projectsPage`
- `galleryPage`
- `resourcesPage`

### Donation Checkout Fails

Check:

- `STRIPE_SECRET_KEY`
- Donation amount is valid.
- `NEXT_PUBLIC_SITE_URL` is correct.
- Stripe account is in the right test/live mode.

### Donation Receipt Email Does Not Send

Check:

- Stripe webhook is configured.
- `STRIPE_WEBHOOK_SECRET` is correct.
- `RESEND_API_KEY` is set.
- `EMAIL_FROM` is verified/allowed in Resend.
- `ORG_EMAIL` is set.
- Stripe event is actually reaching `/api/webhooks/stripe`.

### Contact Form Says Success But No Email Arrives

The contact form intentionally does not expose internal email delivery errors to visitors. Check server logs for:

```txt
[submitContactForm] email failed
[sendContactNotification]
```

Then check:

- `RESEND_API_KEY`
- `EMAIL_FROM`
- `ORG_EMAIL`
- Resend domain/sender verification

### Base UI Native Button Warning

If you see:

```txt
Base UI: A component that acts as a button expected a native <button>
```

Root cause is usually rendering a `Button` as a `Link` or `<a>`.

Correct pattern:

```tsx
<Link href="/projects" className={buttonVariants()}>
  View Projects
</Link>
```

Use the `Button` component for actual buttons, not navigation links.

### Image Does Not Render

If the image is remote, check:

```txt
next.config.ts
```

The image host must be allowed in `images.remotePatterns`.

### Project Is in the Wrong Section

Check the project fields:

- `lifecycleMode`
- `status`
- `startDate`
- `endDate`

If `lifecycleMode` is `auto`, dates control the section.

If `lifecycleMode` is `manual`, `status` controls the section.

## Security and Accessibility Notes

### Security Headers

Security headers are configured in:

```txt
next.config.ts
```

Current headers:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

### Stripe Webhook Security

The webhook verifies Stripe signatures using:

```bash
STRIPE_WEBHOOK_SECRET
```

Never process Stripe webhook payloads without signature verification.

### Email Safety

Email content escapes user-provided values before inserting them into HTML.

Relevant files:

- `src/app/actions/emails.ts`
- `src/lib/email-format.ts`

### Resource URL Safety

Resource downloads are restricted to approved URL patterns.

Relevant file:

```txt
src/components/resource-list.tsx
```

### Accessibility

Important conventions:

- Use real links for navigation and downloads.
- Use real buttons for actions.
- Include alt text for images.
- Keep form labels connected to inputs.
- Avoid hiding important text inside decorative-only elements.

## Important Files

### App and Routing

| File | Purpose |
| --- | --- |
| `src/app/layout.tsx` | Root layout, metadata, analytics, global layout |
| `src/app/page.tsx` | Homepage |
| `src/app/globals.css` | Global CSS and theme tokens |
| `src/app/error.tsx` | Error boundary UI |
| `src/app/not-found.tsx` | 404 page |
| `src/app/loading.tsx` | Loading state |
| `src/app/opengraph-image.tsx` | Dynamic Open Graph image |
| `src/app/sitemap.xml` | Sitemap route |
| `src/app/robots.txt` | Robots route |

### Content and CMS

| File | Purpose |
| --- | --- |
| `src/lib/sanity/client.ts` | Sanity client setup |
| `src/lib/sanity/queries.ts` | All Sanity/fallback fetch functions |
| `src/lib/sanity/types.ts` | TypeScript types for Sanity content |
| `src/lib/sanity/image.ts` | Sanity image helper |
| `sanity/schemas/index.ts` | Exports all Sanity schemas |
| `scripts/seed-sanity.ts` | Seeds Sanity with fallback data |

### Business Logic

| File | Purpose |
| --- | --- |
| `src/lib/project-lifecycle.ts` | Automatic project status/date logic |
| `src/app/actions/checkout.ts` | Stripe Checkout creation |
| `src/app/api/webhooks/stripe/route.ts` | Stripe webhook handler |
| `src/app/actions/contact.ts` | Contact form server action |
| `src/app/actions/emails.ts` | Email sending actions |
| `src/lib/stripe.ts` | Stripe client |
| `src/lib/resend.ts` | Resend client |
| `src/lib/email-format.ts` | Email formatting and escaping |

### UI Components

| File | Purpose |
| --- | --- |
| `src/components/layout/header.tsx` | Desktop header |
| `src/components/layout/mobile-nav.tsx` | Mobile navigation |
| `src/components/layout/footer.tsx` | Footer |
| `src/components/donate-form.tsx` | Donation form |
| `src/components/contact-form.tsx` | Contact form |
| `src/components/resource-list.tsx` | Filterable document/resource list |
| `src/components/gallery-grid.tsx` | Gallery grid |
| `src/components/album-photo-grid.tsx` | Album photo grid |
| `src/components/lightbox.tsx` | Image lightbox |
| `src/components/ui/button.tsx` | Button primitive wrapper |
| `src/components/ui/button-variants.ts` | Button classes shared by buttons and links |

## Future Maintenance Checklist

Use this checklist before major releases:

- Run `npm run lint`.
- Run `npm test`.
- Run `npm run build`.
- Confirm `/resources` has no console errors.
- Confirm `/projects` shows Current, Completed, and Upcoming sections correctly.
- Confirm completed projects show relative dates.
- Confirm certificate PDF opens.
- Confirm contact form sends or logs correctly.
- Confirm donation checkout redirects to Stripe in test mode before switching live mode.
- Confirm Stripe webhook endpoint is configured in the correct Stripe mode.
- Confirm Resend sender/domain is verified.
- Confirm Sanity content has the expected required page documents.
- Confirm fallback content is still accurate.
- Confirm Vercel environment variables match production values.
- Confirm no secrets were committed.

## Related Documentation

Additional project documentation files:

- `SANITY_SETUP.md`
- `CONTENT_EDITOR_GUIDE.md`
- `ADMIN_SETUP_GUIDE.md`
- `DEPLOYMENT.md`
- `CODEBASE_REVIEW.md`

This README is the main technical and operational overview. The other documents may contain deeper setup or historical review notes.
