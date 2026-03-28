# Admin Setup Guide — Everything You Need to Do

**Audience:** Lionel Tchami (technical founder)
**Purpose:** Complete walkthrough from "code deployed on Vercel" to fully operational website at https://beaconofblessings.org
**Time estimate:** 3–5 hours of active work, plus up to 48 hours waiting for DNS propagation

---

## Overview

### Current state

The website is built and deployed on Vercel. The codebase is complete.

**What works right now (no setup required):**

- All pages load and navigate correctly
- Full design: deep purple and radiant gold palette
- Donation page UI renders
- Contact form UI renders
- Blog, gallery, projects, resources pages all display content

**What is displaying as placeholder/static data right now:**

- All site content (projects, blog posts, founders, gallery, impact stats, core values) comes from TypeScript files in `src/data/` — not from a CMS
- The phone number in `src/data/site.ts` is a placeholder: `+234 (0) 812 345 6789`
- Social media links in `src/data/site.ts` are placeholder URLs
- The CAC registration number in `src/app/resources/page.tsx` is hardcoded as `RC: XXXXXXX`
- Resource files (PDFs) have no download URLs — `fileUrl` is undefined for all entries

**What breaks silently without setup:**

- Clicking "Donate" creates a Stripe session — without `STRIPE_SECRET_KEY` set, the server throws an error
- Submitting the contact form calls Resend — without `RESEND_API_KEY` set, no email is sent
- Content edits in a CMS do nothing — Sanity is not connected until `SANITY_PROJECT_ID` is set

---

## Priority Order

Do these in this sequence. Steps 1–5 are required for a functional launch. Steps 6–9 are important but can follow after go-live.

| #   | Step                  | Blocking?                                                        | Time                  |
| --- | --------------------- | ---------------------------------------------------------------- | --------------------- |
| 1   | Merge the PR          | Yes — deploys the code                                           | 2 minutes             |
| 2   | Custom domain setup   | Yes — needed for all other services                              | 15 minutes + DNS wait |
| 3   | Sanity CMS setup      | No — site works without it, but Grace needs it to manage content | 60–90 minutes         |
| 4   | Resend email setup    | Yes — contact form and donation receipts are silent without it   | 20 minutes + DNS wait |
| 5   | Stripe setup          | Yes — donations fail without it                                  | 30 minutes            |
| 6   | Google Analytics      | No                                                               | 10 minutes            |
| 7   | Google Search Console | No                                                               | 10 minutes            |
| 8   | Google Ad Grants      | No — requires verified Search Console first                      | 30 minutes            |
| 9   | Social media          | No                                                               | 30 minutes            |

---

## Step 1: Merge the PR

This deploys the latest code to the production domain on Vercel.

1. Go to: https://github.com/lioneltchami/beaconofblessings/pull/4
2. Review the changes if you want to.
3. Click **Merge pull request**.
4. Click **Confirm merge**.

After merging, Vercel automatically triggers a new deployment. To confirm it succeeded:

1. Go to https://vercel.com/dashboard
2. Click the **beacon-of-blessings** project.
3. On the **Deployments** tab, the top deployment should show a green **Ready** badge within 1–2 minutes.
4. If it shows red **Error**, click the deployment row, then click **Build Logs** to see what failed.

---

## Step 2: Custom Domain Setup

Connect beaconofblessings.org to the Vercel deployment.

### 2a. Add the domain in Vercel

1. Go to https://vercel.com/dashboard
2. Click the **beacon-of-blessings** project.
3. Click **Settings** in the top navigation bar.
4. Click **Domains** in the left sidebar.
5. In the input field, type: `beaconofblessings.org`
6. Click **Add**.
7. Vercel will show you the DNS records you need to create. Keep this page open.

### 2b. Add DNS records at your domain registrar

Log in to the service where you purchased beaconofblessings.org (Namecheap, GoDaddy, Google Domains, etc.).

Find the DNS management section. The path varies by registrar:

- **Namecheap:** Domain List → Manage → Advanced DNS
- **GoDaddy:** My Products → DNS → Manage
- **Google Domains / Squarespace:** Your domain → DNS → Custom records
- **Cloudflare:** Select domain → DNS → Records

Add the records Vercel shows you. They will look like one of these two options:

**Option A — if you want to point the apex domain (beaconofblessings.org) directly:**

| Type  | Name | Value                |
| ----- | ---- | -------------------- |
| A     | @    | 76.76.21.21          |
| CNAME | www  | cname.vercel-dns.com |

**Option B — if Vercel shows a CNAME for the apex (some registrars support CNAME flattening):**

| Type  | Name | Value                |
| ----- | ---- | -------------------- |
| CNAME | @    | cname.vercel-dns.com |
| CNAME | www  | cname.vercel-dns.com |

Use the exact values Vercel displays — do not type them from this document.

### 2c. Wait for DNS propagation

DNS changes take anywhere from a few minutes to 48 hours. You can check propagation progress at https://dnschecker.org — type `beaconofblessings.org` and watch for green checkmarks spreading across regions.

Vercel's Domains page will show a green **Valid Configuration** badge when it detects the records.

### 2d. SSL certificate

SSL is automatic. Vercel provisions a free Let's Encrypt certificate as soon as it validates your domain. No action required. The site will be available at both `http://` and `https://`, with `https://` enforced.

---

## Step 3: Sanity CMS Setup

Sanity is the content management system Grace will use to update all content on the site — projects, blog posts, gallery photos, founder bios, impact numbers, and organization details.

**Important behavior to understand:** The site has a built-in fallback. Without `SANITY_PROJECT_ID` set, every page loads static data from `src/data/*.ts` files in the codebase. Once you add `SANITY_PROJECT_ID` to Vercel's environment variables, the site switches fully to Sanity data. The static files stop being used at runtime (but remain in the repo as backup).

This means you can go live before Sanity is set up. The site will show the static content until you flip the switch.

### 3a. Create a Sanity account

1. Go to https://sanity.io
2. Click **Start building for free**.
3. Sign up with your email or GitHub account.
4. Verify your email if prompted.

The free plan supports everything this site requires: up to 500,000 CDN API requests per month, which is well above what a non-profit site of this scale will use.

### 3b. Create a new Sanity project

1. After logging in, go to https://www.sanity.io/manage
2. Click **Create new project**.
3. Give the project the name: `Beacon of Blessings`
4. When asked for a dataset name, type `production` (or accept the default if it already says `production`).
5. Select the **Free** plan.
6. Click **Create project**.

### 3c. Get your Project ID

After the project is created, you land on the project overview page. Look directly under the project name. You will see a short alphanumeric string like `abc12xyz`. That is your **Project ID**.

Copy it. You will need it in Step 3f.

### 3d. Set up Sanity Studio

Sanity Studio is the editorial interface — the admin dashboard where Grace creates and edits content. It runs as a separate small application that you install and host.

Open a terminal on your computer. Run these commands one at a time:

**Step 1: Go to a directory outside the website repo** (for example, your home folder or a `projects` folder):

```bash
cd ~
```

**Step 2: Initialize a new Studio project:**

```bash
npx sanity@latest init
```

When prompted:

- **Create new project or use existing?** → Select **Use an existing project**, then choose `Beacon of Blessings` from the list.
- **Use the default dataset configuration?** → Yes (this selects `production`).
- **Project output path?** → Accept the default or type `beaconofblessings-studio`.
- **Select a project template?** → Choose **Clean project with no predefined schemas**.

This creates a folder called `beaconofblessings-studio` (or whatever path you chose) with the Studio application inside it.

**Step 3: Copy the schema files from the website repo into the Studio:**

```bash
cp /Users/lionel/builders/beaconofblessings/sanity/schemas/*.ts ~/beaconofblessings-studio/schemaTypes/
```

The schemas being copied are:

| File              | Content type it defines                |
| ----------------- | -------------------------------------- |
| `project.ts`      | Projects (e.g., School Supplies Drive) |
| `blog-post.ts`    | Blog posts                             |
| `founder.ts`      | Founder profiles (Lionel, Grace)       |
| `gallery-item.ts` | Gallery photos                         |
| `site-config.ts`  | Organization contact info and settings |
| `core-value.ts`   | Core values shown on the About page    |
| `impact-stat.ts`  | Impact numbers shown on the homepage   |

**Step 4: Register the schemas in the Studio configuration:**

Open the file `~/beaconofblessings-studio/sanity.config.ts` in a text editor. Replace its entire contents with the following (substituting your actual Project ID for `YOUR_PROJECT_ID`):

```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { project } from "./schemaTypes/project";
import { blogPost } from "./schemaTypes/blog-post";
import { founder } from "./schemaTypes/founder";
import { galleryItem } from "./schemaTypes/gallery-item";
import { siteConfig } from "./schemaTypes/site-config";
import { coreValue } from "./schemaTypes/core-value";
import { impactStat } from "./schemaTypes/impact-stat";

export default defineConfig({
  projectId: "YOUR_PROJECT_ID",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: [
      project,
      blogPost,
      founder,
      galleryItem,
      siteConfig,
      coreValue,
      impactStat,
    ],
  },
});
```

**Step 5: Start the Studio:**

```bash
cd ~/beaconofblessings-studio
npm install
npm run dev
```

The Studio opens at http://localhost:3333 in your browser. You will see the Sanity editorial interface with all seven content types in the left sidebar.

### 3e. Configure CORS origins

The Sanity API needs to be told which domains are allowed to talk to it. You must add your domains before the live site can fetch content.

1. Go to https://www.sanity.io/manage
2. Click on the **Beacon of Blessings** project.
3. In the left sidebar, click **API**.
4. Click **CORS Origins**.
5. Click **Add CORS origin**.
6. Add each of the following, one at a time:

| Origin                              | Why                        |
| ----------------------------------- | -------------------------- |
| `http://localhost:3000`             | Local development          |
| `https://beaconofblessings.org`     | Production site            |
| `https://www.beaconofblessings.org` | Production with www prefix |

For Vercel preview deployments, also add your `*.vercel.app` URL if you use previews for testing.

Note: The Next.js server fetches Sanity data server-side, which does not trigger browser CORS checks. These CORS entries protect against future client-side fetch calls and are good practice to configure now.

### 3f. Set environment variables in Vercel

1. Go to https://vercel.com/dashboard
2. Click the **beacon-of-blessings** project.
3. Click **Settings** → **Environment Variables**.
4. Add these three variables:

| Key                  | Value                                    | Environment          |
| -------------------- | ---------------------------------------- | -------------------- |
| `SANITY_PROJECT_ID`  | Your 8-character project ID from Step 3c | Production + Preview |
| `SANITY_DATASET`     | `production`                             | Production + Preview |
| `SANITY_API_VERSION` | `2024-01-01`                             | Production + Preview |

**Critical:** `SANITY_PROJECT_ID` does NOT have a `NEXT_PUBLIC_` prefix. It is intentionally server-side only. Do not add that prefix.

After adding all three variables, redeploy:

1. Go to the **Deployments** tab.
2. Click the three-dot menu (···) on the most recent deployment.
3. Click **Redeploy**.
4. Wait for it to show **Ready**.

### 3g. Populate initial content

Open the Studio at http://localhost:3333 and create the following documents. Go in this order — simpler documents first, then the ones that display on the homepage.

---

#### Document 1: Site Config (create exactly one)

Click **Site Config** in the left sidebar → **Create new Site Config**.

| Field        | Value to enter                                                                                                               |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Name         | `Beacon of Blessings`                                                                                                        |
| Tagline      | `Illuminating Futures Through Education`                                                                                     |
| Description  | `Beacon of Blessings Charity Initiative transforms lives through educational support for vulnerable communities in Nigeria.` |
| Email        | `info@beaconofblessings.org`                                                                                                 |
| Phone        | Your real phone number (see Step 8 — replace the placeholder `+234 (0) 812 345 6789`)                                        |
| Address      | `Lagos, Nigeria`                                                                                                             |
| Office Hours | `Monday - Friday, 9:00 AM - 5:00 PM WAT`                                                                                     |

Click **Publish**.

---

#### Documents 2–5: Core Values (create 4 documents)

Click **Core Value** in the sidebar → **Create new Core Value** for each:

**Core Value 1:**

| Field       | Value                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------ |
| Title       | `Faith in Action`                                                                          |
| Description | `We believe faith should be demonstrated through tangible acts of service and compassion.` |
| Verse       | `James 2:17`                                                                               |
| Order       | `1`                                                                                        |

**Core Value 2:**

| Field       | Value                                                                          |
| ----------- | ------------------------------------------------------------------------------ |
| Title       | `Education First`                                                              |
| Description | `We invest in education as the most powerful tool to break cycles of poverty.` |
| Verse       | `Proverbs 22:6`                                                                |
| Order       | `2`                                                                            |

**Core Value 3:**

| Field       | Value                                                                           |
| ----------- | ------------------------------------------------------------------------------- |
| Title       | `Community Partnership`                                                         |
| Description | `We work alongside local leaders and families, building lasting relationships.` |
| Verse       | `Ecclesiastes 4:9`                                                              |
| Order       | `3`                                                                             |

**Core Value 4:**

| Field       | Value                                                                       |
| ----------- | --------------------------------------------------------------------------- |
| Title       | `Transparent Stewardship`                                                   |
| Description | `We honor every gift by ensuring resources reach those who need them most.` |
| Verse       | `Luke 16:10`                                                                |
| Order       | `4`                                                                         |

Publish each one after filling in the fields.

---

#### Documents 6–9: Impact Stats (create 4 documents)

Click **Impact Stat** in the sidebar → **Create new Impact Stat** for each:

| Value field | Label field           | Order |
| ----------- | --------------------- | ----- |
| `500+`      | `Students Supported`  | `1`   |
| `5`         | `Communities Reached` | `2`   |
| `2,000+`    | `Items Distributed`   | `3`   |
| `100%`      | `Community Focused`   | `4`   |

Publish each one.

---

#### Documents 10–11: Founders (create 2 documents)

Click **Founder** in the sidebar → **Create new Founder** for each.

**Founder 1 (Lionel):**

| Field    | Value                                                                                                                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name     | `Lionel Tchami`                                                                                                                                                                                                   |
| Role     | `Co-Founder & Director`                                                                                                                                                                                           |
| Bio      | `Driven by a deep conviction to make quality education accessible to every child, Lionel founded Beacon of Blessings to bridge the gap between underprivileged communities and educational resources in Nigeria.` |
| Initials | `LT`                                                                                                                                                                                                              |
| Image    | Upload a headshot photo (see Step 9 content checklist)                                                                                                                                                            |
| Order    | `1`                                                                                                                                                                                                               |

**Founder 2 (Grace):**

| Field    | Value                                                                                                                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name     | `Grace Kure`                                                                                                                                                                                    |
| Role     | `Co-Founder & Nigeria Operations Lead`                                                                                                                                                          |
| Bio      | `Based in Lagos, Grace leads on-the-ground operations, building relationships with local schools, community leaders, and families to ensure that every program reaches those who need it most.` |
| Initials | `GK`                                                                                                                                                                                            |
| Image    | Upload a headshot photo (see Step 9 content checklist)                                                                                                                                          |
| Order    | `2`                                                                                                                                                                                             |

Publish each one. The `image` field can be left empty for now and added once photos are available. The `Initials` field is used as an avatar fallback when no photo is uploaded.

---

#### Documents 12–15: Projects (create 4 documents)

Click **Project** in the sidebar → **Create new Project** for each.

**Project 1 — School Supplies Drive 2024 (completed, featured):**

| Field       | Value                                                                                                                                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Title       | `School Supplies Drive 2024`                                                                                                                                                                                      |
| Slug        | Click **Generate** (auto-fills from title)                                                                                                                                                                        |
| Status      | `completed`                                                                                                                                                                                                       |
| Date        | `June - September 2024`                                                                                                                                                                                           |
| Budget      | `N2.5M`                                                                                                                                                                                                           |
| Description | `Our inaugural project distributed essential school supplies to 500+ students across 5 communities in Lagos. Items included school bags, notebooks, textbooks, and writing materials.`                            |
| Impact      | Add each as a separate list item: `500+ students received school supplies`, `5 Lagos communities served`, `2,000+ notebooks distributed`, `1,000+ textbooks provided`, `Zero dropouts among beneficiary students` |
| Featured    | Toggle ON                                                                                                                                                                                                         |
| Image       | Upload a photo from the drive (see Step 9)                                                                                                                                                                        |

**Project 2 — Digital Learning Initiative (upcoming, featured):**

| Field       | Value                                                                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Title       | `Digital Learning Initiative`                                                                                                             |
| Slug        | Click **Generate**                                                                                                                        |
| Status      | `upcoming`                                                                                                                                |
| Date        | `2026`                                                                                                                                    |
| Budget      | `N5M`                                                                                                                                     |
| Description | `Equipping students with tablets and establishing solar-powered charging stations to bring digital education to underserved communities.` |
| Impact      | `300 tablets for students`, `Solar charging stations`, `Teacher digital literacy training`                                                |
| Featured    | Toggle ON                                                                                                                                 |

**Project 3 — Girls' Education Scholarship Program (upcoming):**

| Field       | Value                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Title       | `Girls' Education Scholarship Program`                                                                                                |
| Slug        | Click **Generate**                                                                                                                    |
| Status      | `upcoming`                                                                                                                            |
| Date        | `2026`                                                                                                                                |
| Budget      | `N8M`                                                                                                                                 |
| Description | `Full academic scholarships for 100 girls, coupled with mentorship programs to support their educational journey through completion.` |
| Impact      | `100 full scholarships`, `Mentorship program`, `Career guidance workshops`                                                            |
| Featured    | Toggle OFF                                                                                                                            |

**Project 4 — Community Library Project (upcoming):**

| Field       | Value                                                                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Title       | `Community Library Project`                                                                                                                      |
| Slug        | Click **Generate**                                                                                                                               |
| Status      | `upcoming`                                                                                                                                       |
| Date        | `2027`                                                                                                                                           |
| Budget      | `N15M`                                                                                                                                           |
| Description | `Establishing 5 community libraries across Lagos to provide free access to books, study spaces, and reading programs for children and families.` |
| Impact      | `5 community libraries`, `10,000+ books`, `Reading programs for children`                                                                        |
| Featured    | Toggle OFF                                                                                                                                       |

---

#### Documents 16–18: Blog Posts (create 3 documents)

Click **Blog Post** in the sidebar → **Create new Blog Post** for each.

**Post 1:**

| Field     | Value                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------- |
| Title     | `Transforming Lives Through Education`                                                                    |
| Slug      | Click **Generate** — must produce `transforming-lives-through-education`                                  |
| Excerpt   | `See how our School Supplies Drive 2024 is making a lasting impact on students across Lagos communities.` |
| Content   | Paste the full text from `src/data/blog-posts.ts`, entry with slug `transforming-lives-through-education` |
| Author    | `Beacon of Blessings Team`                                                                                |
| Date      | `2024-10-15`                                                                                              |
| Category  | `Impact Stories`                                                                                          |
| Read Time | `5 min read`                                                                                              |
| Tags      | `education`, `impact`, `Lagos`, `school supplies`                                                         |

**Warning:** Do not change a blog post's slug after publishing. The GROQ query in the site (`*[_type == "blogPost" && slug == $slug][0]`) matches exact slugs. A changed slug produces a 404 for anyone who has the old URL bookmarked or linked.

**Post 2:**

| Field     | Value                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------- |
| Title     | `Together We Build Hope`                                                                                    |
| Slug      | Click **Generate** — must produce `together-we-build-hope`                                                  |
| Excerpt   | `A reflection on the power of community partnership in creating sustainable change for Nigeria's children.` |
| Content   | Paste the full text from `src/data/blog-posts.ts`, entry with slug `together-we-build-hope`                 |
| Author    | `Lionel Tchami`                                                                                             |
| Date      | `2024-11-20`                                                                                                |
| Category  | `Ministry Updates`                                                                                          |
| Read Time | `4 min read`                                                                                                |
| Tags      | `community`, `partnership`, `volunteer`                                                                     |

**Post 3:**

| Field     | Value                                                                                     |
| --------- | ----------------------------------------------------------------------------------------- |
| Title     | `2024 Year-End Report: A Year of Beginnings`                                              |
| Slug      | Click **Generate** — must produce `2024-year-end-report`                                  |
| Excerpt   | `Reflecting on our first year of operations and the impact we have made together.`        |
| Content   | Paste the full text from `src/data/blog-posts.ts`, entry with slug `2024-year-end-report` |
| Author    | `Beacon of Blessings Team`                                                                |
| Date      | `2024-12-30`                                                                              |
| Category  | `Annual Reports`                                                                          |
| Read Time | `3 min read`                                                                              |
| Tags      | `annual report`, `transparency`, `impact`, `2024`                                         |

---

#### Gallery Items (create after you have real photos)

Gallery items each require an uploaded image — there is no useful gallery item without one. Skip this until you have photos ready (see Step 9 content checklist).

When you are ready, click **Gallery Item** in the sidebar → **Create new Gallery Item** for each photo. The category field accepts: `education`, `community`, `events`, `team`, `impact`.

---

### 3h. Invite Grace to Sanity

1. Go to https://www.sanity.io/manage
2. Click the **Beacon of Blessings** project.
3. Click **Members** in the left sidebar.
4. Click **Invite members**.
5. Enter Grace's email address.
6. Set her role to **Editor**.
   - Editor can: create, edit, and publish all content types.
   - Editor cannot: change project settings, manage API tokens, delete the project.
7. Click **Send invitation**.

Grace will receive an email with a link to join the project. She will need to create a free Sanity account if she does not have one.

Once she accepts, she can log in to the Studio at http://localhost:3333 (when running locally) or at the hosted Studio URL (if you deploy Studio to Sanity's hosting — see the note below).

**Optional: Deploy Studio to Sanity hosting so Grace does not need to run it locally.**

From the Studio project directory:

```bash
cd ~/beaconofblessings-studio
npx sanity deploy
```

When prompted for a Studio hostname, enter something like `beaconofblessings-studio`. Sanity deploys the Studio at a URL like `https://beaconofblessings-studio.sanity.studio`. Share that URL with Grace.

### 3i. Verify Sanity is live

After adding `SANITY_PROJECT_ID` to Vercel and redeploying, verify each section pulls live data:

- Homepage: impact stats and featured projects should match what you created in Sanity
- `/about` page: founders and core values should reflect Sanity entries
- `/blog` page: the three blog posts should appear with correct titles and dates
- `/projects` page: all four projects should appear
- `/gallery` page: gallery items you created should appear

If any page shows the old static data instead:

1. Confirm `SANITY_PROJECT_ID` is set in Vercel's Environment Variables (not just in `.env.local`).
2. Confirm the variable name is exactly `SANITY_PROJECT_ID` — no `NEXT_PUBLIC_` prefix.
3. Confirm you redeployed after adding the variable.

---

## Step 4: Resend Email Setup

Resend sends all outgoing emails: donation receipts to donors, donation notifications to your inbox, and contact form submissions to your inbox. Without Resend, the contact form silently does nothing and donors receive no receipt.

### 4a. Create a Resend account

1. Go to https://resend.com
2. Click **Get Started**.
3. Sign up with your email.
4. Verify your email address when the confirmation link arrives.

### 4b. Create an API key

1. After logging in, go to https://resend.com/api-keys
2. Click **Create API Key**.
3. Name it: `Beacon of Blessings Production`
4. Under **Permission**, choose **Sending access** (more secure than Full access).
5. Under **Domain**, choose **All domains** for now.
6. Click **Add**.
7. Copy the key immediately — it starts with `re_`. This is the only time Resend shows it. If you lose it, delete it and create a new one.

### 4c. Set initial environment variables in Vercel

1. Go to Vercel → your project → **Settings** → **Environment Variables**.
2. Add these two variables now (before domain verification):

| Key              | Value                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY` | `re_...` (the key you just copied)                                                                              |
| `EMAIL_FROM`     | `Beacon of Blessings <onboarding@resend.dev>`                                                                   |
| `ORG_EMAIL`      | The email address you actively monitor (e.g., `info@beaconofblessings.org` or your personal email during setup) |

During the testing phase, emails are sent from `onboarding@resend.dev`. Recipients see "via onboarding@resend.dev" next to your name. This is expected and normal before you verify your domain.

### 4d. Verify your sending domain

Domain verification prevents your emails from landing in spam and removes the "via onboarding@resend.dev" line from the sender field.

1. Go to https://resend.com/domains
2. Click **Add Domain**.
3. Type `beaconofblessings.org` and click **Add**.
4. Resend shows you DNS records to add. Copy the exact values from your Resend dashboard.

The records look similar to this (use the values Resend shows you, not these):

| Type | Name                | Value                                   |
| ---- | ------------------- | --------------------------------------- |
| TXT  | `resend._domainkey` | `v=DKIM1; p=...`                        |
| TXT  | `@`                 | `v=spf1 include:amazonses.com ~all`     |
| MX   | `bounce`            | `feedback-smtp.us-east-1.amazonses.com` |

Add these records at your domain registrar (the same place you went in Step 2b for Vercel DNS records). After adding them, click **Verify** in Resend. Propagation takes a few minutes to 48 hours.

### 4e. Switch to your own domain after verification

Once Resend shows your domain as verified:

1. Go to Vercel → your project → **Settings** → **Environment Variables**.
2. Edit `EMAIL_FROM`. Change the value to:
   ```
   Beacon of Blessings <noreply@beaconofblessings.org>
   ```
3. Redeploy on Vercel.

From this point, all outgoing emails show `noreply@beaconofblessings.org` as the sender.

### 4f. Test the contact form

1. Go to https://beaconofblessings.org/contact
2. Fill in all fields with real information.
3. Submit the form.
4. Check the inbox you set as `ORG_EMAIL`. The message should arrive within one minute.
5. If it lands in spam, your domain DNS records are not fully propagated yet — wait a few hours and test again.
6. If no email arrives at all, check Vercel function logs: go to your Vercel project → **Functions** tab and look for errors from the contact form API route.

---

## Step 5: Stripe Setup

Stripe processes all donations — one-time and monthly. The site uses Stripe Checkout, which means donors are redirected to a Stripe-hosted payment page. Your server only creates the session; Stripe handles all card data.

### 5a. Create a Stripe account

1. Go to https://stripe.com
2. Click **Start now**.
3. Fill in your email, name, country (Nigeria), and password.
4. Verify your email when the confirmation link arrives.
5. For now, stay in **Test mode**. You do not need to complete full account activation to run test payments.

### 5b. Get your test API keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. Confirm you are in **Test mode** — you should see an orange **TEST** badge in the top-left.
3. Copy the **Publishable key** (starts with `pk_test_`).
4. Click **Reveal test key** next to the **Secret key** (starts with `sk_test_`). Copy it. Treat it like a password.

### 5c. Set Stripe keys in Vercel

1. Go to Vercel → your project → **Settings** → **Environment Variables**.
2. Add:

| Key                                  | Value         |
| ------------------------------------ | ------------- |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` |
| `STRIPE_SECRET_KEY`                  | `sk_test_...` |

### 5d. Create the webhook endpoint

The webhook is how Stripe notifies the site when a donation is completed. Without it, donors receive no receipt email and you receive no notification.

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click **Add endpoint**.
3. In the **Endpoint URL** field, enter exactly:
   ```
   https://beaconofblessings.org/api/webhooks/stripe
   ```
4. Under **Listen to**, select **Events on your account**.
5. Click **Select events**.
6. Search for and tick these three events:
   - `checkout.session.completed`
   - `invoice.paid`
   - `customer.subscription.deleted`
7. Click **Add events**.
8. Click **Add endpoint**.

You land on the webhook endpoint detail page. Find the **Signing secret** section. Click **Reveal**. Copy the value — it starts with `whsec_`.

9. Go to Vercel → **Settings** → **Environment Variables** and add:

| Key                     | Value       |
| ----------------------- | ----------- |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |

Redeploy Vercel after adding this.

**Note on the 30-second timeout:** `vercel.json` sets `maxDuration: 30` for the webhook route. This means the webhook handler has up to 30 seconds to complete before Vercel terminates it. This is intentional — Stripe retries webhooks that time out.

### 5e. Run a test donation

1. Redeploy on Vercel after adding all three Stripe variables.
2. Go to https://beaconofblessings.org/donate
3. Enter a donation amount (e.g., 10), a name, and a real email address you can check.
4. Click **Donate**.
5. Stripe Checkout opens with a yellow **TEST MODE** banner.
6. Use Stripe's test card:
   - Card number: `4242 4242 4242 4242`
   - Expiry: any future date (e.g., `12/30`)
   - CVC: any 3 digits (e.g., `123`)
   - ZIP: any (e.g., `10001`)
7. Click **Pay**.
8. You should land on `/donate/success`.
9. Check the donor email — a receipt should arrive.
10. Check the `ORG_EMAIL` inbox — a donation notification should arrive.
11. Confirm the payment appears at https://dashboard.stripe.com/test/payments with status **Succeeded**.

If emails do not arrive after completing a test payment, check Vercel's function logs: go to your project → **Functions** tab, find `/api/webhooks/stripe`, and look at the invocation logs for errors. Most email failures are a Resend configuration issue, not a Stripe issue.

### 5f. Apply for the Stripe non-profit rate

Stripe offers registered non-profits a discounted rate of 2.2% + $0.30 per transaction (standard is 2.9% + $0.30). This applies to all donations processed through the platform.

1. First complete full account activation at https://dashboard.stripe.com/account (identity verification, bank account details).
2. Go to https://support.stripe.com/contact
3. Submit a support request — topic: **Account**, subject: "Non-profit rate request".
4. Explain that Beacon of Blessings is a registered charity in Nigeria and attach your CAC registration certificate.
5. Approval takes 5–10 business days.

You can launch and accept donations at the standard rate while this is processing.

### 5g. Switch to live keys when ready for real money

When you are ready to accept actual donations:

1. In the Stripe dashboard, toggle off **Test mode** (top-left toggle).
2. Complete full account activation if not already done.
3. Go to https://dashboard.stripe.com/apikeys (now in live mode).
4. Copy the live publishable key (`pk_live_...`) and live secret key (`sk_live_...`).
5. Go to https://dashboard.stripe.com/webhooks and create a new webhook endpoint for live mode, pointing to:
   ```
   https://beaconofblessings.org/api/webhooks/stripe
   ```
   Select the same three events. Copy the new signing secret.
6. In Vercel → **Settings** → **Environment Variables**, update all three:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → `pk_live_...`
   - `STRIPE_SECRET_KEY` → `sk_live_...`
   - `STRIPE_WEBHOOK_SECRET` → new `whsec_...`
7. Redeploy on Vercel.

**Do not mix test and live keys.** All three Stripe variables must be from the same mode — either all test or all live. A `pk_live_` publishable key paired with `sk_test_` secret key will cause errors.

---

## Step 6: Google Analytics

Google Analytics 4 (GA4) tracks visitor traffic, page views, and user behavior. The site also includes Vercel Analytics (always active, no setup required), so you have some analytics even without GA4.

### 6a. Create a GA4 property

1. Go to https://analytics.google.com
2. Sign in with a Google account you control (use an organizational account if you have one).
3. Click **Start measuring** if this is your first property, or **Admin** → **Create** → **Property**.
4. Property name: `Beacon of Blessings`
5. Reporting time zone: `Nigeria (WAT)`
6. Currency: `Nigerian Naira (NGN)` or `US Dollar (USD)` depending on preference.
7. Click **Next**. Describe your business (Non-profit, Small).
8. Click **Create**.

### 6b. Set up a data stream

After creating the property, you are prompted to create a data stream:

1. Choose **Web**.
2. Website URL: `https://beaconofblessings.org`
3. Stream name: `Beacon of Blessings Website`
4. Click **Create stream**.

You land on the stream detail page. Look for the **Measurement ID** — it looks like `G-XXXXXXXXXX`. Copy it.

### 6c. Add the Measurement ID to Vercel

1. Go to Vercel → your project → **Settings** → **Environment Variables**.
2. Add:

| Key                 | Value          | Environment         |
| ------------------- | -------------- | ------------------- |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | **Production only** |

Set this for Production only — you do not want development or preview traffic counted in your analytics.

3. Redeploy on Vercel.

After redeploying, visit your live site and then open https://analytics.google.com → **Realtime** report. You should see your visit appear within a minute or two. If you do not see it, disable any browser ad-blockers for that test.

---

## Step 7: Google Search Console

Search Console shows you how your site appears in Google Search — which keywords drive clicks, which pages are indexed, and any crawling or indexing errors.

### 7a. Add your property

1. Go to https://search.google.com/search-console
2. Sign in with the same Google account you used for Analytics.
3. Click **Add property**.
4. Choose **Domain** (not URL prefix) if you want to track all subdomains. Type: `beaconofblessings.org`
5. Or choose **URL prefix** and enter: `https://beaconofblessings.org`

### 7b. Verify ownership

Google needs to confirm you own the domain. The simplest method for a Vercel-hosted site:

**DNS verification (recommended):**

1. Google shows you a TXT record to add to your DNS.
2. Go to your domain registrar (same place you went in Step 2b).
3. Add the TXT record Google provides.
4. Back in Search Console, click **Verify**.
5. DNS propagation can take up to 48 hours. Google will keep checking.

**HTML tag alternative (faster):**

1. Google gives you a `<meta>` tag.
2. Add it to `src/app/layout.tsx` in the `<head>` section.
3. Push the change to GitHub (Vercel auto-deploys).
4. Click **Verify** in Search Console.

### 7c. Submit your sitemap

The site generates a sitemap automatically at `https://beaconofblessings.org/sitemap.xml`.

1. In Search Console, select your property.
2. In the left sidebar, click **Sitemaps**.
3. In the "Add a new sitemap" field, type: `sitemap.xml`
4. Click **Submit**.

Google begins crawling and indexing your pages. Initial indexing can take a few days to a few weeks for a new domain.

---

## Step 8: Google Ad Grants

Google Ad Grants gives eligible non-profits up to $10,000 USD per month in free Google Search Ads. This is worth applying for — it can drive significant traffic to donation and awareness pages at no cost.

**Prerequisites:**

- Google Search Console verified (Step 7 must be done first)
- Your organization must be a registered non-profit (Beacon of Blessings qualifies)
- You need a Google for Nonprofits account

### 8a. Apply for Google for Nonprofits

1. Go to https://www.google.com/nonprofits/
2. Click **Get started**.
3. You will be directed to a validation partner (Percent or TechSoup depending on your region). Nigeria uses Percent.
4. Submit your organization details and CAC registration documents.
5. Validation typically takes 2–14 business days.

### 8b. Apply for Ad Grants once approved

1. After your Google for Nonprofits account is approved, log in at https://www.google.com/nonprofits/
2. Click **Explore Google Ad Grants** and follow the activation steps.
3. You will need to create a Google Ads account (free).
4. Follow the Ad Grants eligibility requirements:
   - Account must have conversion tracking enabled (connect to GA4)
   - Ads must link to beaconofblessings.org (your verified domain)
   - At least 2 active campaigns with at least 2 ad groups each

Initial setup for a meaningful Ad Grants campaign takes a few hours. Suggested campaigns for Beacon of Blessings: one targeting donors searching for Nigerian charities, one targeting volunteers.

---

## Step 9: Update Static Data in the Codebase

Even after Sanity is connected, some data is hardcoded in source files and needs to be updated directly in the code. These are one-time code changes, not CMS updates.

### Items to update in `src/data/site.ts`

Open `/Users/lionel/builders/beaconofblessings/src/data/site.ts`.

1. **Phone number** — replace the placeholder with your real number:

   ```
   phone: "+234 (0) 812 345 6789",   // REPLACE THIS
   ```

2. **Social media URLs** — replace placeholder URLs with your real profile URLs:
   ```
   { label: "Facebook", href: "https://facebook.com/beaconofblessings" },
   { label: "Instagram", href: "https://instagram.com/beaconofblessings" },
   { label: "X (Twitter)", href: "https://x.com/beaconofblessings" },
   ```
   If any platform account does not exist yet, remove that entry from the array entirely rather than leaving a placeholder URL.

### Item to update in `src/app/resources/page.tsx`

Open `/Users/lionel/builders/beaconofblessings/src/app/resources/page.tsx`, line 54.

Replace `RC: XXXXXXX` with your actual CAC registration number. Example:

```
RC: 1234567
```

### After making these code changes

1. Commit the changes to git:
   ```bash
   git add src/data/site.ts src/app/resources/page.tsx
   git commit -m "Update real phone number, social URLs, and CAC registration number"
   git push origin main
   ```
2. Vercel automatically redeploys on push to main. Wait for the **Ready** status.

### Resource file URLs (after uploading PDFs to Sanity)

The resources page (`/resources`) lists documents with download links. Currently, all entries in `src/data/resources.ts` have no `fileUrl` — the download button has nowhere to link. To add real download links:

1. Upload each PDF to Sanity via the Studio (use the **Media** section or upload as image/file assets).
2. Copy the CDN URL Sanity assigns to each file.
3. Add the URL to the corresponding entry in `src/data/resources.ts` as the `fileUrl` field.
4. Commit and push.

Alternatively, host the PDFs in a different location (Google Drive, Dropbox) and link to them directly — the `fileUrl` field accepts any URL.

---

## Step 10: Social Media Setup

The social links in `src/data/site.ts` currently point to placeholder URLs. Before going live, create real accounts (if not already done) and update the URLs.

**Recommended platforms for a Nigerian non-profit:**

| Platform    | Why                                                        | Suggested handle     |
| ----------- | ---------------------------------------------------------- | -------------------- |
| Facebook    | Largest reach in Nigeria, good for donor/community updates | `@beaconofblessings` |
| Instagram   | Strong for photo-based impact stories                      | `@beaconofblessings` |
| X (Twitter) | Useful for reaching diaspora donors and press              | `@beaconofblessings` |

**To create accounts:**

- Facebook Page (not personal profile): https://www.facebook.com/pages/create — choose **Nonprofit Organization**
- Instagram Business account: create at https://www.instagram.com — switch to a Business account in settings after creating
- X account: https://twitter.com/i/flow/signup

After creating each account:

1. Set the profile photo to the Beacon of Blessings logo.
2. Add the website URL (`https://beaconofblessings.org`) to each profile.
3. Write a bio consistent with the site's tagline: "Illuminating Futures Through Education."
4. Make at least one introductory post before going live (do not send visitors to an empty profile).
5. Update `src/data/site.ts` with the real URLs, commit, and push.

---

## Step 11: Content to Prepare Before Going Live

This is a checklist of physical content — files, photos, and information — that Lionel and Grace need to gather before the website is fully ready. None of this requires technical work; it is a task list for the organization side.

### Required for launch

- [ ] Real phone number (for `src/data/site.ts` and the Site Config document in Sanity)
- [ ] Real email address for `ORG_EMAIL` (the address that receives all contact form and donation notifications)
- [ ] CAC registration number (to replace `RC: XXXXXXX` in the resources page)

### Strongly recommended for launch

- [ ] Founder headshot photo — Lionel (for the About page)
- [ ] Founder headshot photo — Grace (for the About page)
- [ ] At least 3–5 real photos from the School Supplies Drive 2024 (for the gallery)
- [ ] CAC Registration Certificate (PDF) — for the Resources page download
- [ ] 2024 Annual Report (PDF) — for the Resources page download

### Can follow after launch

- [ ] Tax Exemption Certificate (PDF) from FIRS
- [ ] Certificate of Incorporation (PDF)
- [ ] School Supplies Drive 2024 Final Report (PDF)
- [ ] School Supplies Drive 2024 Impact Presentation (PPTX)
- [ ] Terms of Reference document (PDF)
- [ ] Safeguarding Policy (PDF)
- [ ] Financial Policy & Procedures (PDF)
- [ ] Social media profile URLs (once accounts are created)
- [ ] Google Analytics Measurement ID (`G-XXXXXXXXXX`)

---

## Complete Environment Variable Reference

All variables used by the application. Set these in Vercel → Settings → Environment Variables.

| Variable                             | Required?                     | Where to get it                                                        | Expected format                                       | Environment          |
| ------------------------------------ | ----------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------- | -------------------- |
| `NEXT_PUBLIC_SITE_URL`               | Yes                           | You already know this — it is your domain                              | `https://beaconofblessings.org`                       | Production           |
| `STRIPE_SECRET_KEY`                  | Yes (for donations)           | https://dashboard.stripe.com/apikeys                                   | `sk_test_...` or `sk_live_...`                        | Production + Preview |
| `STRIPE_WEBHOOK_SECRET`              | Yes (for donation emails)     | https://dashboard.stripe.com/webhooks → your endpoint → Signing secret | `whsec_...`                                           | Production only      |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes (for donations)           | https://dashboard.stripe.com/apikeys                                   | `pk_test_...` or `pk_live_...`                        | Production + Preview |
| `RESEND_API_KEY`                     | Yes (for all emails)          | https://resend.com/api-keys                                            | `re_...`                                              | Production + Preview |
| `EMAIL_FROM`                         | Yes (for all emails)          | You set this yourself                                                  | `Beacon of Blessings <noreply@beaconofblessings.org>` | Production + Preview |
| `ORG_EMAIL`                          | Yes (for notifications)       | Your organization's inbox address                                      | `info@beaconofblessings.org`                          | Production + Preview |
| `SANITY_PROJECT_ID`                  | No (but needed for CMS)       | https://www.sanity.io/manage → your project                            | `abc12xyz` (8 chars, no NEXT*PUBLIC* prefix)          | Production + Preview |
| `SANITY_DATASET`                     | No (defaults to `production`) | Set this explicitly — value is always `production`                     | `production`                                          | Production + Preview |
| `SANITY_API_VERSION`                 | No (defaults to `2024-01-01`) | Set this explicitly to pin behavior                                    | `2024-01-01`                                          | Production + Preview |
| `NEXT_PUBLIC_GA_ID`                  | No                            | https://analytics.google.com → your stream                             | `G-XXXXXXXXXX`                                        | Production only      |

### Notes on specific variables

**`SANITY_PROJECT_ID` — no `NEXT_PUBLIC_` prefix:** This is intentional. The variable is read server-side in `src/lib/sanity/client.ts`. Adding `NEXT_PUBLIC_` would expose it to the browser, which is unnecessary and slightly less secure.

**`EMAIL_FROM` during testing:** Before your domain is verified with Resend, use `Beacon of Blessings <onboarding@resend.dev>`. After verification, update to `Beacon of Blessings <noreply@beaconofblessings.org>`.

**`STRIPE_WEBHOOK_SECRET` — Production only:** Webhooks only fire against registered endpoints. There is no reason to set this in Preview environments unless you have a separate webhook endpoint registered for a preview URL.

**`NEXT_PUBLIC_GA_ID` — Production only:** Setting GA in Preview or Development pollutes your analytics data with non-visitor traffic (your own testing). Keep it Production only.

---

## Troubleshooting Quick Reference

| Symptom                                           | Most likely cause                                                | Fix                                                                                    |
| ------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Donation button does nothing / server error       | `STRIPE_SECRET_KEY` not set                                      | Add to Vercel env vars, redeploy                                                       |
| Contact form submits but no email arrives         | `RESEND_API_KEY` not set, or `EMAIL_FROM` uses unverified domain | Check both variables; use `onboarding@resend.dev` until domain is verified             |
| Donation receipt email not received               | `STRIPE_WEBHOOK_SECRET` missing or incorrect                     | Re-copy from Stripe webhook detail page; confirm endpoint is registered                |
| Site shows static data even after Sanity setup    | `SANITY_PROJECT_ID` not set in Vercel, or not redeployed         | Check Vercel env vars for exact variable name with no `NEXT_PUBLIC_` prefix            |
| Content updated in Sanity but not showing on site | ISR cache has not expired yet                                    | Wait 60–300 seconds (see revalidation table in `SANITY_SETUP.md`), then reload         |
| Blog post URL returns 404 after editing           | Slug was changed after publishing                                | Do not change slugs of published posts                                                 |
| Gallery images show as broken                     | Image not fully uploaded, or wrong project ID                    | Re-upload in Studio; confirm `SANITY_PROJECT_ID` matches the project where image lives |
| Vercel build fails after adding env vars          | Unrelated build error                                            | Check build logs in Vercel → Deployments → Build Logs                                  |
| Stripe payment fails in test                      | Mixed test/live keys                                             | Confirm all three Stripe variables (`pk_`, `sk_`, `whsec_`) are from the same mode     |

---

## Rollback Notes

### Disabling Sanity without code changes

Remove `SANITY_PROJECT_ID` from Vercel environment variables and redeploy. The site automatically falls back to static data from `src/data/*.ts`. No code changes required. This is safe to do at any time.

### Reverting to static data permanently

If you decide not to use Sanity long-term, you can leave `SANITY_PROJECT_ID` unset indefinitely. Update the static data files in `src/data/` directly by editing the TypeScript files and pushing commits to GitHub.

---

_This guide reflects the codebase state as of the commit merged in Step 1. If the codebase changes significantly after this date, verify that command paths, variable names, and schema file names still match before following these instructions._
