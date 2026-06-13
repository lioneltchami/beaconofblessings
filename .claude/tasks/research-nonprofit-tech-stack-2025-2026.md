# Research: Non-Profit Website Tech Stack & Best Practices (2025-2026)

## Session Overview

**Organization**: Beacon of Blessings
**Session Type**: Research
**Status**: `COMPLETE`
**Research Date**: 2026-03-28
**Success Criteria**: Comprehensive, evidence-based technology and practice recommendations for building a modern non-profit website

---

## Executive Summary

Beacon of Blessings already has a strong modern foundation: **Next.js 16, React 19, Tailwind CSS 4, Contentful CMS, Stripe, Radix UI, Framer Motion, and Vercel Analytics**. This research validates many of those choices and identifies targeted improvements. The current stack is production-grade and well-aligned with 2025-2026 best practices. Key upgrade opportunities include migrating from Contentful to **Payload CMS** (cost savings, Next.js-native), adopting **shadcn/ui** on top of Radix (already in the project), and adding structured data, accessibility hardening, and email marketing integration.

---

## 1. Framework Comparison: Next.js vs Astro vs Remix

### Current State: Next.js 16 (already in use)

| Framework      | Best For                                 | Performance                | Ecosystem                    | Non-Profit Fit                                            |
| -------------- | ---------------------------------------- | -------------------------- | ---------------------------- | --------------------------------------------------------- |
| **Next.js 16** | Full-stack apps, dynamic + static hybrid | Excellent (RSC, streaming) | Largest ecosystem            | **Strong** -- handles donations, dynamic content, SSR/SSG |
| **Astro**      | Content-heavy static sites               | Best (zero JS by default)  | Growing, smaller             | Good for pure content sites, weaker for interactivity     |
| **Remix**      | Data-heavy interactive apps              | Excellent (nested routes)  | Smaller, React Router merger | Overkill for non-profit content sites                     |

### Recommendation: **Stay with Next.js 16** (HIGH CONFIDENCE)

**Rationale**:

- Next.js 16 with React 19 Server Components delivers near-Astro static performance while supporting dynamic features (donations, volunteer forms, event registration)
- The project already uses Next.js 16 -- migration cost would be significant with no proportional benefit
- Largest ecosystem of any React framework means more plugins, tutorials, and community support
- Vercel hosting is optimized for Next.js with generous free tier
- App Router with React Server Components reduces client-side JavaScript significantly
- Built-in image optimization, metadata API, and font optimization are critical for non-profit SEO

**If starting fresh with a purely content site**: Astro would be worth considering for its zero-JS approach, but Beacon of Blessings needs interactive features (donations, forms, events) that make Next.js the better choice.

Sources:

- [Next.js 16 vs Remix vs Astro - DEV Community](https://dev.to/saswatapal/nextjs-16-vs-remix-vs-astro-choosing-the-right-react-framework-in-2025-3lio)
- [Astro vs Next.js 2026 - Pagepro](https://pagepro.co/blog/astro-nextjs/)
- [Best Frontend Frameworks 2026 - QuartzDevs](https://quartzdevs.com/resources/best-frontend-frameworks-2026-every-major-javascript-framework)

---

## 2. CMS Options for Non-Profits

### Current State: Contentful (already in use)

| CMS             | Type                        | Pricing                               | Next.js Integration         | Non-Profit Fit                       |
| --------------- | --------------------------- | ------------------------------------- | --------------------------- | ------------------------------------ |
| **Contentful**  | SaaS Headless               | Free tier; paid from $300/mo          | Good (REST/GraphQL)         | Expensive at scale, rigid            |
| **Payload CMS** | Open-source, Next.js-native | Free (self-hosted)                    | **Best** (Local API in RSC) | Excellent -- zero cost, full control |
| **Sanity**      | SaaS + Open-source          | Free tier; generous                   | Very good (GROQ)            | Strong for content teams             |
| **Strapi**      | Open-source                 | Free (self-hosted); Cloud from $15/mo | Good (REST/GraphQL)         | Good, mature, large community        |

### Recommendation: **Consider migrating to Payload CMS** (MEDIUM-HIGH CONFIDENCE)

**Rationale for Payload CMS**:

- **Next.js-native architecture**: Payload 3.x runs inside your Next.js app -- no separate server needed
- **Local API in Server Components**: Query content directly in React Server Components without HTTP overhead
- **Database flexibility**: Supports PostgreSQL, MongoDB, and SQLite
- **Zero hosting cost**: Runs alongside your Next.js app on the same Vercel deployment
- **Full TypeScript**: End-to-end type safety with auto-generated types
- **Admin panel included**: Beautiful, customizable admin UI out of the box
- **Open source**: No vendor lock-in, no pricing surprises

**Case for staying with Contentful**:

- Already integrated and working
- Migration has a real cost in development time
- Contentful's CDN is excellent for global content delivery
- If the free tier is sufficient, no immediate pressure to migrate

**Verdict**: If Contentful's free tier limitations are becoming a constraint (or if costs are a concern), Payload CMS is the strongest migration target for a Next.js project. Otherwise, Contentful remains viable.

Sources:

- [Headless CMS 2026: Contentful vs Strapi vs Sanity vs Payload - DEV Community](https://dev.to/pooyagolchian/headless-cms-2026-contentful-vs-strapi-vs-sanity-vs-payload-compared-25mh)
- [Top 5 Headless CMS 2026 - Sanity](https://www.sanity.io/top-5-headless-cms-platforms-2026)
- [Best Headless CMS 2026 - Pagepro](https://pagepro.co/blog/top-5-best-headless-cms-platforms/)

---

## 3. Non-Profit Website Design & UX Best Practices

### Critical Design Principles

1. **Mission-First Hero**: Lead with your mission statement and impact metrics, not organizational history
2. **Prominent Donate CTA**: A "Donate" button must appear in the main navigation AND be repeated on high-traffic pages -- never hidden in a hamburger menu
3. **3-Click Giving Rule**: Visitors should be able to complete a donation within 3 clicks from any page
4. **Impact Storytelling**: Use real stories, photos, and impact numbers to build emotional connection
5. **Trust Signals**: Display financial transparency (990 forms), charity ratings, partner logos, and donor testimonials
6. **Mobile-First Design**: Over 60% of donors prefer donating online; mobile optimization is non-negotiable

### Information Architecture

- **Primary navigation**: Home, About, Programs/Impact, Get Involved (Volunteer/Donate), Events, Contact
- **Secondary navigation**: Blog/News, Resources, Financial Transparency, Privacy Policy
- **Footer**: Quick links, social media, contact info, newsletter signup, charity registration number

### Conversion Optimization

- Pre-set donation amounts ($25, $50, $100, $250, custom)
- Monthly recurring option prominently displayed (with toggle, not hidden)
- Progress bars for fundraising campaigns
- Social proof: "X donors have contributed this month"
- Donor recognition wall (with permission)

Sources:

- [Nonprofit Website Design Tips - Zeffy](https://www.zeffy.com/blog/nonprofit-web-design)
- [21 Nonprofit Website Best Practices - Trajectory Web Design](https://www.trajectorywebdesign.com/blog/nonprofit-website-best-practices)
- [UX Design Tips for Nonprofit Success - Charly Agency](https://www.charlyagency.com/blog/ux-design-tips-for-non-profits)
- [Designing for Donor Engagement - Fionta](https://fionta.com/insights/ux-for-nonprofits/)

---

## 4. Donation Integration Best Practices

### Current State: Stripe (already integrated)

**Stripe for Non-Profits -- Key Facts**:

- **Reduced fees**: 2.2% + $0.30 per donation (vs 2.9% + $0.30 for non-donation transactions)
- **Recurring donations**: Built-in subscription billing with smart retry logic for failed payments
- **Payment methods**: Credit/debit cards, Apple Pay, Google Pay, ACH bank transfers
- **Stripe Checkout**: Hosted, PCI-compliant donation page with minimal development effort

### Best Practices for Donation Flow

1. **Multiple payment methods**: Cards + Apple Pay + Google Pay + ACH (bank transfers have lowest fees)
2. **Recurring donation emphasis**: Monthly giving should be the default toggle, with annual as an option
3. **Pre-set amounts with impact framing**: "$25 feeds a family for a week" instead of just "$25"
4. **Failed payment recovery**: Enable Stripe's Smart Retries and send pre-expiry card update reminders
5. **Fee coverage option**: "Cover the processing fee?" checkbox (many donors will opt in)
6. **Tax receipt automation**: Auto-generate and email donation receipts with EIN and tax-deductible language
7. **Donor upgrade nudges**: After 12 months of recurring giving, suggest a modest increase
8. **Mobile optimization**: Forms must be thumb-friendly with large tap targets

### Additional Donation Platforms to Consider

| Platform             | Fees                | Best For                          |
| -------------------- | ------------------- | --------------------------------- |
| **Stripe** (current) | 2.2% + $0.30        | Custom integration, full control  |
| **Zeffy**            | 0% (tip-funded)     | Zero-cost option for smaller orgs |
| **Donorbox**         | 1.5% + Stripe fees  | Pre-built donation forms          |
| **Every.org**        | Free for nonprofits | Simple embeddable widgets         |

Sources:

- [Stripe for Nonprofits](https://stripe.com/industries/nonprofits)
- [Nonprofit Stripe Best Practices - AssetLab](https://assetlab.us/nonprofit-stripe-best-practices/)
- [Recurring Donations Guide - Stripe](https://stripe.com/resources/more/how-to-handle-recurring-donations-in-nonprofit-payments)

---

## 5. Email Marketing Integration

### Top Platforms for Non-Profits

| Platform               | Non-Profit Pricing                      | Key Strength                            | Integration                  |
| ---------------------- | --------------------------------------- | --------------------------------------- | ---------------------------- |
| **MailerLite**         | 30% nonprofit discount; from $10/mo     | Easiest to use (G2 2025 winner)         | API, Zapier, Stripe          |
| **Brevo** (Sendinblue) | Generous free tier (300 emails/day)     | Integrated CRM + email                  | API, webhooks                |
| **GetResponse**        | 50% nonprofit discount                  | Best automation features                | API, Zapier                  |
| **Resend**             | Developer-first; free tier 3K emails/mo | Best for transactional email in Next.js | Native React Email templates |
| **Mailchimp**          | 15% nonprofit discount                  | Most recognizable                       | API, many integrations       |

### Recommended Approach: Dual-Platform Strategy

1. **Resend** for transactional emails (donation receipts, volunteer confirmations, event registrations)
   - React Email templates that match your site design
   - Native Next.js integration
   - Free tier: 3,000 emails/month

2. **MailerLite** for marketing emails (newsletters, campaigns, fundraising appeals)
   - 30% nonprofit discount
   - Drag-and-drop editor for non-technical staff
   - Built-in landing pages and automation
   - Stripe integration for donor segmentation

### Newsletter Best Practices

- **Double opt-in**: Not legally required everywhere but strongly recommended for GDPR compliance and list quality
- **Clear consent language**: "Subscribe to receive monthly updates about our programs and impact"
- **Unchecked checkboxes**: Never pre-tick subscription boxes
- **Easy unsubscribe**: One-click unsubscribe link in every email
- **Segmentation**: Group subscribers by interest (volunteer updates, donor updates, event notifications)
- **Privacy policy link**: Required on signup forms

Sources:

- [10 Free or Affordable Mailchimp Alternatives for Nonprofits - Donorbox](https://donorbox.org/nonprofit-blog/mailchimp-alternatives-nonprofits)
- [Best Email Marketing Platforms for Nonprofits - EmailToolTester](https://www.emailtooltester.com/en/blog/email-marketing-platforms-for-nonprofits/)
- [GDPR-Compliant Newsletters - CleverReach](https://www.cleverreach.com/en/push-magazin/email-marketing-strategy/newsletter-gdpr/sending-out-gdpr-compliant-newsletters-all-the-essentials-at-a-glance/)

---

## 6. SEO Best Practices for Non-Profits

### Technical SEO

1. **Next.js Metadata API**: Use the built-in `metadata` export on every page for title, description, Open Graph, and Twitter cards
2. **JSON-LD Structured Data**: Implement these schema types:
   - `NonprofitType` / `NGO` on homepage
   - `Event` on event pages
   - `FAQPage` for FAQ sections
   - `BreadcrumbList` for navigation
   - `DonateAction` on donation pages
3. **Sitemap**: Use Next.js `sitemap.ts` to auto-generate XML sitemap
4. **robots.txt**: Configure via Next.js `robots.ts`
5. **Canonical URLs**: Set on every page to prevent duplicate content

### Content SEO

- **Impact-focused keywords**: "help families in [city]", "donate to [cause]", "[organization] volunteer"
- **Blog/news section**: Regular content updates signal freshness to search engines
- **Local SEO**: Google Business Profile, local keywords, location-based landing pages
- **Alt text on all images**: Descriptive, not keyword-stuffed

### Open Graph for Social Sharing

```tsx
export const metadata: Metadata = {
  title: "Beacon of Blessings - Empowering Communities",
  description:
    "Support families and communities through Beacon of Blessings...",
  openGraph: {
    title: "Beacon of Blessings",
    description: "...",
    url: "https://beaconofblessings.org",
    siteName: "Beacon of Blessings",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beacon of Blessings",
    description: "...",
    images: ["/og-image.jpg"],
  },
};
```

### Google Ad Grants

- **Google offers $10,000/month in free search ads to eligible nonprofits** through Google Ad Grants
- Requirements: valid 501(c)(3) status, website with substantial content
- This is the single highest-ROI SEO/SEM opportunity for any nonprofit

Sources:

- [Nonprofit Schema Markup Guide - Pisarek](https://pisarek.com/blog/2025/11/26/nonprofit-schema-markup-guide/)
- [Schema Markup 2025 - Design Agency Group](https://www.designagencygroup.com/schema-markup-in-2025-the-structured-data-layer-your-seo-and-ai-visibility-depends-on/)
- [Nonprofit Website Best Practices - Wild Apricot](https://www.wildapricot.com/blog/nonprofit-website-best-practices)

---

## 7. Accessibility Requirements

### Current Legal Landscape (2025)

- **ADA Title III**: Courts increasingly rule that nonprofit websites must be accessible
- **Target standard**: WCAG 2.2 Level AA (the de facto legal standard)
- **Risk**: Lawsuits against nonprofits with inaccessible websites are increasing

### WCAG 2.2 Level AA Requirements

| Principle          | Key Requirements                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **Perceivable**    | Alt text on images, captions on video, 4.5:1 color contrast ratio, resizable text          |
| **Operable**       | Full keyboard navigation, no keyboard traps, skip navigation links, sufficient time limits |
| **Understandable** | Consistent navigation, clear labels, error identification and suggestions                  |
| **Robust**         | Valid HTML, ARIA attributes where needed, compatible with assistive technologies           |

### Implementation Strategy with Current Stack

1. **Radix UI primitives** (already in use): Provide ARIA-compliant dialogs, selects, and other components out of the box
2. **Semantic HTML first**: Use `<nav>`, `<main>`, `<article>`, `<aside>`, `<header>`, `<footer>` instead of `<div>` soup
3. **Skip navigation link**: Add at the top of every page
4. **Focus management**: Visible focus indicators on all interactive elements (never `outline: none`)
5. **Form accessibility**: Every input needs a visible `<label>`, error messages linked with `aria-describedby`
6. **Image alt text**: Descriptive for content images, empty `alt=""` for decorative images
7. **Color alone**: Never convey information through color alone (add icons, text, or patterns)

### Testing Tools

- **axe DevTools**: Browser extension for automated accessibility testing
- **Lighthouse**: Built into Chrome DevTools, includes accessibility audit
- **NVDA / VoiceOver**: Manual screen reader testing (essential, not optional)
- **Keyboard-only navigation**: Test entire site without a mouse

Sources:

- [Nonprofit Web Accessibility - DNL OmniMedia](https://www.dnlomnimedia.com/blog/nonprofit-website-accessibility/)
- [WCAG 2.2 Compliant Nonprofit Website - 501c3.org](https://www.501c3.org/wcag-compliant-nonprofit-website/)
- [ARIA Labels Implementation Guide - AllAccessible](https://www.allaccessible.org/blog/implementing-aria-labels-for-web-accessibility)

---

## 8. Analytics & Tracking

### Current State: Vercel Analytics + Speed Insights (already integrated)

### Recommended Analytics Stack

| Layer                         | Tool                            | Purpose                                      | Cost          |
| ----------------------------- | ------------------------------- | -------------------------------------------- | ------------- |
| **Core Analytics**            | Vercel Analytics (current)      | Page views, visitors, referrers              | Free on Hobby |
| **Performance**               | Vercel Speed Insights (current) | Core Web Vitals monitoring                   | Free on Hobby |
| **Privacy-First Alternative** | Plausible Analytics             | GDPR-compliant, no cookie banner needed      | $9/mo         |
| **Full Analytics**            | Google Analytics 4              | Deep funnel analysis, Google Ads integration | Free          |
| **Donation Tracking**         | Stripe Dashboard                | Revenue, recurring donors, churn             | Included      |

### Key Metrics for Non-Profits

- **Donation conversion rate**: % of visitors who donate
- **Average donation amount**: Track over time
- **Recurring donor retention**: Monthly churn rate
- **Volunteer signup rate**: Forms submitted / page views
- **Email signup rate**: Newsletter conversions
- **Top content**: Which impact stories drive the most donations
- **Traffic sources**: Where donors come from (organic, social, email, ads)

### Recommendation

Keep Vercel Analytics + Speed Insights as the primary stack. Add **Google Analytics 4** if you plan to use Google Ad Grants (required for tracking grant performance). Consider **Plausible** as an addition if privacy is a priority for your audience.

Sources:

- [Choosing Analytics for Nonprofits - DevCollaborative](https://devcollaborative.com/blog/choosing-right-analytics-tool-your-nonprofit-website)
- [Plausible Analytics](https://plausible.io/)
- [Fathom Analytics](https://usefathom.com/)

---

## 9. Volunteer Management Features

### Website-Integrated Volunteer Features

Rather than building a full volunteer management system, integrate with established platforms:

| Feature                      | Implementation Approach                                   |
| ---------------------------- | --------------------------------------------------------- |
| **Volunteer signup form**    | Custom React Hook Form on website with email notification |
| **Opportunity listings**     | CMS-managed content (list of current volunteer needs)     |
| **Event-based volunteering** | Tied to event management system                           |
| **Hour tracking**            | External platform (VolunteerHub, POINT, Golden)           |
| **Communication**            | Email marketing platform segmentation                     |

### Recommended Approach for Beacon of Blessings

1. **Build a custom volunteer interest form** using React Hook Form (already in project)
   - Name, email, phone, areas of interest (checkboxes), availability
   - Submit to a database or email notification

2. **CMS-managed volunteer opportunities page**
   - Each opportunity: title, description, time commitment, location, skills needed
   - "Sign Up" button linking to the interest form

3. **For advanced needs**, integrate with:
   - **VolunteerHub**: Best for large-scale programs with Zapier integration
   - **POINT**: Modern, mobile-first volunteer app
   - **SignUpGenius**: Simple scheduling for recurring tasks

Sources:

- [22 Top Volunteer Management Tools - Double the Donation](https://doublethedonation.com/volunteer-management-tools/)
- [Volunteer Management Features - AgileSoftLabs](https://www.agilesoftlabs.com/products/non-profit/volunteer-management/features)

---

## 10. Event Management Integration

### Recommended Platforms for Non-Profits

| Platform          | Fees                    | Best For                     | Embed Support |
| ----------------- | ----------------------- | ---------------------------- | ------------- |
| **Luma**          | Free for free events    | Community events, modern UX  | Yes (widget)  |
| **Humanitix**     | Profits go to charity   | Values-aligned ticketing     | Yes           |
| **Zeffy**         | Completely free         | Budget-conscious nonprofits  | Yes           |
| **Eventbrite**    | 3.7% + $1.79 per ticket | Larger events with marketing | Yes (widget)  |
| **Ticket Tailor** | 50% nonprofit discount  | Mid-size events              | Yes           |

### Implementation Strategy

1. **CMS-managed events page**: Display upcoming events from your CMS with title, date, location, description, and image
2. **External registration**: Link out to Luma/Zeffy/Eventbrite for RSVP/ticketing
3. **Calendar integration**: Add "Add to Calendar" buttons (Google Calendar, Apple Calendar, Outlook)
4. **Event schema markup**: JSON-LD `Event` schema for rich search results
5. **Post-event content**: Photo galleries and impact summaries to drive future attendance

### For Beacon of Blessings

**Luma** is the strongest recommendation for free community events -- modern design, built-in email list building, no fees, and embeddable widgets. For paid/ticketed events, **Zeffy** (completely free) or **Humanitix** (profits go to children's charities) align with nonprofit values.

Sources:

- [Luma vs Eventbrite - Luma Help](https://help.luma.com/p/luma-vs-eventbrite)
- [Best Eventbrite Alternatives 2025 - EventbriteAlternatives.com](https://eventbritealternatives.com/blog/eventbrite-alternatives-2025)

---

## 11. Hosting Options

### Current State: Likely Vercel (based on @vercel packages in project)

| Host                 | Free Tier                           | Next.js Support     | Non-Profit Program                    |
| -------------------- | ----------------------------------- | ------------------- | ------------------------------------- |
| **Vercel**           | 100GB bandwidth, unlimited projects | **Best** (native)   | Open Source Program (credits for OSS) |
| **Netlify**          | 100GB bandwidth, 300 build min      | Good                | No specific nonprofit program found   |
| **Cloudflare Pages** | Unlimited bandwidth                 | Good (via adapter)  | Free for all                          |
| **Railway**          | $5 free credit/month                | Good (Node hosting) | No specific program                   |

### Recommendation: **Stay with Vercel** (HIGH CONFIDENCE)

**Rationale**:

- Best-in-class Next.js support (they build both)
- Free Hobby tier is sufficient for most nonprofit traffic levels
- Built-in analytics and speed insights (already integrated)
- Edge functions, ISR, and image optimization included
- Global CDN for fast worldwide access
- If traffic grows, Pro plan is $20/month/member

**Important Note**: Vercel's free tier prohibits commercial use, but nonprofit websites are generally not considered commercial. If this becomes a concern, the Pro plan at $20/month is very affordable.

**Vercel Open Source Program**: If you open-source any part of your project, you can apply for credits through Vercel's OSS Program (running quarterly cohorts through 2025-2026).

Sources:

- [Vercel Pricing](https://vercel.com/pricing)
- [Netlify Pricing](https://www.netlify.com/pricing/)
- [Vercel Open Source Program](https://vercel.com/open-source-program)

---

## 12. Social Media Integration

### Open Graph Implementation (Critical)

Every page needs proper Open Graph meta tags for social sharing. Next.js Metadata API handles this:

- `og:title`, `og:description`, `og:image` (1200x630px), `og:url`, `og:type`
- Twitter Card tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- Use Next.js `opengraph-image.tsx` for dynamic OG image generation

### Social Sharing Features

1. **Share buttons on impact stories and blog posts**: Facebook, X/Twitter, LinkedIn, WhatsApp, Email
2. **Social proof**: Display follower counts or recent social activity
3. **Social feed embed**: Use Juicer or Taggbox to embed a combined social feed on the homepage
4. **Social login**: Optional for volunteer/donor accounts (use NextAuth.js)

### Platform-Specific Considerations

- **Facebook**: Still the largest driver of nonprofit social traffic; ensure OG tags are perfect
- **Instagram**: Link in bio to a landing page with key CTAs (donate, volunteer, events)
- **LinkedIn**: Valuable for corporate partnerships and professional volunteers
- **TikTok/YouTube Shorts**: Growing for nonprofit storytelling with younger demographics

Sources:

- [Open Graph Protocol](https://ogp.me/)
- [Social Media Integration Strategies 2025 - Hootsuite](https://blog.hootsuite.com/social-media-integration-for-your-website/)

---

## 13. Newsletter/Mailing List Best Practices

### Technical Implementation

1. **Signup form on every page**: Subtle footer form + dedicated signup page
2. **Double opt-in flow**: Signup -> Confirmation email -> Confirmed subscriber
3. **Segmentation at signup**: Let users choose what they want to hear about (programs, events, volunteer opportunities, general updates)
4. **Welcome sequence**: Automated 3-email series introducing the organization
5. **Regular cadence**: Monthly newsletter is the sweet spot for most nonprofits

### GDPR/CAN-SPAM Compliance

- Unchecked checkbox for consent (never pre-checked)
- Clear description of what subscribers will receive
- Privacy policy link on signup form
- One-click unsubscribe in every email
- Physical mailing address in email footer (CAN-SPAM requirement)
- Record of consent (timestamp, IP, what they consented to)

### Content Strategy

- **Impact updates**: "This month, we helped X families..."
- **Upcoming events**: Calendar of volunteer opportunities and fundraisers
- **Donor spotlight**: Feature a donor or volunteer story
- **Call to action**: Always include one clear CTA per email
- **Mobile-optimized**: 60%+ of email is read on mobile

Sources:

- [GDPR Email Marketing Compliance - MailDiver](https://maildiver.com/blog/gdpr-email-marketing-compliance-guide/)
- [GDPR Sign-Up Forms - MailerLite](https://www.mailerlite.com/blog/how-to-create-opt-in-forms-that-still-work-under-gdpr)
- [Nonprofit GDPR Compliance - Wired Impact](https://wiredimpact.com/blog/nonprofit-gdpr-compliance/)

---

## 14. UI Component Libraries

### Current State: Radix UI (already in use)

### Recommendation: **Adopt shadcn/ui on top of Radix** (HIGH CONFIDENCE)

**shadcn/ui** is the industry standard for React + Tailwind CSS projects in 2025-2026:

- **Built on Radix UI** (already in your project): shadcn/ui uses Radix primitives underneath
- **Copy-paste model**: Components are copied into your project, not installed as dependencies -- full control
- **Tailwind CSS styled**: Matches your existing Tailwind 4 setup perfectly
- **Accessible by default**: Inherits Radix's ARIA compliance
- **Visual Builder** (2026): New shadcn Visual Builder tool reduces setup friction
- **Supports Base UI as alternative**: Not locked into Radix exclusively
- **Massive community**: Most popular React component approach in 2025-2026

### Specific Components Useful for Non-Profits

| Component   | Use Case                                     |
| ----------- | -------------------------------------------- |
| `Button`    | Donate CTAs, form submissions                |
| `Card`      | Program listings, team members, impact stats |
| `Dialog`    | Donation modal, volunteer signup             |
| `Form`      | All forms (integrated with React Hook Form)  |
| `Sheet`     | Mobile navigation                            |
| `Tabs`      | Program categories, donation types           |
| `Accordion` | FAQ sections                                 |
| `Badge`     | Event tags, program categories               |
| `Calendar`  | Event dates                                  |
| `Carousel`  | Impact stories, testimonials                 |
| `Toast`     | Success/error notifications                  |
| `Progress`  | Fundraising campaign progress bars           |

### Additional UI Libraries

| Library           | Purpose                    | Already in Project |
| ----------------- | -------------------------- | ------------------ |
| **Framer Motion** | Animations and transitions | Yes                |
| **Lucide React**  | Icon library               | Yes                |
| **React Icons**   | Extended icon library      | Yes                |

Sources:

- [React UI Libraries 2025 - Makers Den](https://makersden.io/blog/react-ui-libs-2025-comparing-shadcn-radix-mantine-mui-chakra)
- [shadcn/ui vs Radix UI - ShadcnStudio](https://shadcnstudio.com/blog/radix-ui-vs-shadcn-ui)
- [14 Best React UI Component Libraries 2026 - Untitled UI](https://www.untitledui.com/blog/react-component-libraries)

---

## 15. Performance Optimization

### Core Web Vitals Targets (2025)

| Metric                              | Target  | What It Measures    |
| ----------------------------------- | ------- | ------------------- |
| **LCP** (Largest Contentful Paint)  | < 2.5s  | Loading performance |
| **INP** (Interaction to Next Paint) | < 200ms | Interactivity       |
| **CLS** (Cumulative Layout Shift)   | < 0.1   | Visual stability    |

### Next.js-Specific Optimizations

1. **Image Optimization**: Use `next/image` with `priority` on above-fold images, `placeholder="blur"` for below-fold
2. **Font Optimization**: Use `next/font` to self-host Google Fonts (eliminates render-blocking requests)
3. **React Server Components**: Default to server components; only use `'use client'` when interactivity is needed
4. **Static Generation**: Use `generateStaticParams` for content pages (blog, programs, team)
5. **Streaming**: Use Suspense boundaries for progressive loading
6. **Bundle Analysis**: Use `@next/bundle-analyzer` to identify large dependencies
7. **Dynamic Imports**: Lazy-load heavy components (e.g., donation form modal, maps)

### Image Best Practices

- **Format**: WebP (30-50% smaller than JPEG/PNG) -- Next.js does this automatically
- **Responsive images**: `sizes` prop on `next/image` for correct sizing per viewport
- **Explicit dimensions**: Always set `width` and `height` to prevent CLS
- **Lazy loading**: Default behavior in `next/image` for below-fold images
- **CDN**: Vercel's built-in image CDN handles optimization and caching

### Additional Optimizations

- **Preconnect to external origins**: Stripe, CMS API, analytics
- **Minimize third-party scripts**: Load non-critical scripts with `next/script` strategy="lazyOnload"
- **Cache headers**: Configure `Cache-Control` headers for static assets
- **ISR (Incremental Static Regeneration)**: Revalidate CMS content without full rebuilds

Sources:

- [Core Web Vitals Optimization Guide 2025 - GoldenWing](https://goldenwing.at/en/blog/core-web-vitals-optimization-guide)
- [Core Web Vitals 2025 Benchmarks - EnFuse](https://www.enfuse-solutions.com/core-web-vitals-2025-new-benchmarks-and-how-to-pass-every-test/)
- [How to Improve Core Web Vitals 2025 - OWDT](https://owdt.com/insight/how-to-improve-core-web-vitals/)

---

## Summary: Recommended Tech Stack for Beacon of Blessings

### Keep (Already Excellent)

| Technology            | Status                        | Confidence |
| --------------------- | ----------------------------- | ---------- |
| Next.js 16            | Keep                          | HIGH       |
| React 19              | Keep                          | HIGH       |
| Tailwind CSS 4        | Keep                          | HIGH       |
| Stripe                | Keep                          | HIGH       |
| Radix UI              | Keep (enhance with shadcn/ui) | HIGH       |
| Framer Motion         | Keep                          | HIGH       |
| Lucide React          | Keep                          | HIGH       |
| React Hook Form       | Keep                          | HIGH       |
| Vercel Analytics      | Keep                          | HIGH       |
| Vercel Speed Insights | Keep                          | HIGH       |
| TypeScript            | Keep                          | HIGH       |

### Enhance / Add

| Technology                  | Action                      | Priority | Confidence |
| --------------------------- | --------------------------- | -------- | ---------- |
| **shadcn/ui**               | Add on top of Radix         | HIGH     | HIGH       |
| **Resend**                  | Add for transactional email | MEDIUM   | HIGH       |
| **MailerLite**              | Add for marketing email     | MEDIUM   | HIGH       |
| **JSON-LD structured data** | Implement for SEO           | HIGH     | HIGH       |
| **Google Ad Grants**        | Apply for $10K/mo free ads  | HIGH     | HIGH       |
| **WCAG 2.2 AA audit**       | Conduct and remediate       | HIGH     | HIGH       |
| **Plausible Analytics**     | Consider adding for privacy | LOW      | MEDIUM     |

### Consider Migrating

| Current        | Potential Replacement | Priority                                         | Confidence  |
| -------------- | --------------------- | ------------------------------------------------ | ----------- |
| **Contentful** | **Payload CMS**       | MEDIUM (evaluate when Contentful limits are hit) | MEDIUM-HIGH |

### External Integrations

| Need                 | Recommended Tool                            | Priority   |
| -------------------- | ------------------------------------------- | ---------- |
| Event management     | Luma (free events) or Zeffy (ticketed)      | MEDIUM     |
| Volunteer management | Custom forms + VolunteerHub for scale       | LOW-MEDIUM |
| Social sharing       | Next.js OG image generation + share buttons | MEDIUM     |
| Newsletter           | MailerLite with double opt-in               | MEDIUM     |

---

## What Next Agent Needs from This Research

1. **Technology decisions are validated**: The current stack (Next.js 16, React 19, Tailwind 4, Stripe, Radix, Vercel) is strong and should be maintained
2. **Enhancement priorities**: shadcn/ui adoption, structured data, accessibility audit, email integration
3. **CMS migration path**: Payload CMS is documented as the recommended migration target when/if Contentful becomes limiting
4. **Implementation guidance**: Specific components, schema types, and integration approaches are detailed above
5. **Risk awareness**: Accessibility lawsuits are increasing; WCAG 2.2 AA compliance should be a priority
