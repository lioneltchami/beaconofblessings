# Sanity CMS Setup Guide

This guide walks through connecting Beacon of Blessings to Sanity as a headless CMS.
No prior Sanity experience is required.

---

## How the site works without Sanity

The site ships with static fallback data in `src/data/`. As long as `SANITY_PROJECT_ID`
is not set in your environment, every page renders from those local TypeScript files.
The site builds and runs completely without a Sanity account.

Once `SANITY_PROJECT_ID` is present in the environment, the client in
`src/lib/sanity/client.ts` activates and all data fetching switches to live GROQ
queries against your Sanity dataset. The static files in `src/data/` are no longer
used at runtime but remain in the repository as the authoritative fallback.

This means you can deploy the site at any point and add Sanity later without
any code changes.

---

## Prerequisites

- Node.js 18 or later
- A free account at [sanity.io](https://www.sanity.io)
- Access to the project's `.env.local` file (local) or your hosting platform's
  environment variable settings (production)

---

## Step 1 — Create a Sanity account

Go to [sanity.io](https://www.sanity.io) and sign up. A free plan supports all
features this site requires: unlimited API requests on the free tier are capped
at 500k CDN requests per month, which is sufficient for a non-profit site of
this scale.

---

## Step 2 — Create a new Sanity project

1. Log in to the Sanity dashboard at [sanity.io/manage](https://www.sanity.io/manage).
2. Click **Create new project**.
3. Give the project a name (e.g., `Beacon of Blessings`).
4. Select **Production** as the dataset name, or accept the default `production`.
   The client defaults to `production` if `SANITY_DATASET` is not set.
5. Choose the free plan.

---

## Step 3 — Get the project ID

After creation, the dashboard shows your project. The **Project ID** is the
short alphanumeric string displayed under the project name (e.g., `abc12xyz`).
You will use this value as `SANITY_PROJECT_ID`.

---

## Step 4 — Set environment variables

Copy `.env.example` to `.env.local` if you have not done so already:

```bash
cp .env.example .env.local
```

Fill in the Sanity section:

```
SANITY_PROJECT_ID=abc12xyz          # replace with your actual project ID
SANITY_DATASET=production           # matches the dataset you created in Step 2
SANITY_API_VERSION=2024-01-01       # keep this value; it pins the API behavior
```

`SANITY_DATASET` and `SANITY_API_VERSION` have defaults built into
`src/lib/sanity/client.ts` (`"production"` and `"2024-01-01"` respectively), so
only `SANITY_PROJECT_ID` is strictly required to activate Sanity. Set all three
explicitly to avoid surprises when defaults change.

For production deployments (Vercel, Netlify, etc.), add these same three
variables through your hosting provider's environment variable UI. Do not commit
`.env.local` to version control.

---

## Step 5 — Set up Sanity Studio

Sanity Studio is the editorial interface where your team will create and edit
content. It runs as a separate application that you connect to your project.

### 5a — Initialize a Studio project

In a directory outside this repository (e.g., `~/beaconofblessings-studio`), run:

```bash
npx sanity@latest init
```

When prompted:

- Select **Create new project** and choose the project you created in Step 2.
- Select **Clean project with no predefined schemas** as the template.
- Accept the default dataset (`production`).

This generates a minimal Studio project with a `sanity.config.ts` and a
`schemaTypes/` directory.

### 5b — Copy the schema files

Copy the schema files from this repository into the Studio's `schemaTypes/`
directory:

```bash
cp /path/to/beaconofblessings/sanity/schemas/*.ts ~/beaconofblessings-studio/schemaTypes/
```

The schemas to copy are:

| File              | Document type |
| ----------------- | ------------- |
| `project.ts`      | `project`     |
| `blog-post.ts`    | `blogPost`    |
| `founder.ts`      | `founder`     |
| `gallery-item.ts` | `galleryItem` |
| `site-config.ts`  | `siteConfig`  |
| `core-value.ts`   | `coreValue`   |
| `impact-stat.ts`  | `impactStat`  |

### 5c — Register schemas in the Studio config

Open `~/beaconofblessings-studio/sanity.config.ts` and update the `schema`
section to include all seven types:

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
  projectId: "abc12xyz", // your project ID
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

### 5d — Start the Studio locally

```bash
cd ~/beaconofblessings-studio
npm run dev
```

The Studio opens at `http://localhost:3333`.

---

## Step 6 — Understand the content types

The table below lists every document type, its Sanity `_type` name, the fields
defined in the schema, and which fields are required.

### project

GROQ type string: `"project"`

| Field         | Type            | Required | Notes                                      |
| ------------- | --------------- | -------- | ------------------------------------------ |
| `title`       | string          | yes      |                                            |
| `slug`        | slug            | yes      | auto-generated from title                  |
| `status`      | string          | yes      | `"completed"` or `"upcoming"`              |
| `date`        | string          | no       | free-form, e.g., `"June - September 2024"` |
| `budget`      | string          | no       | free-form, e.g., `"N2.5M"`                 |
| `description` | text            | no       |                                            |
| `impact`      | array of string | no       | bullet-point impact statements             |
| `featured`    | boolean         | no       | defaults to `false`                        |
| `image`       | image           | no       | supports hotspot cropping                  |

### blogPost

GROQ type string: `"blogPost"`

| Field      | Type            | Required | Notes                                                                                    |
| ---------- | --------------- | -------- | ---------------------------------------------------------------------------------------- |
| `title`    | string          | yes      |                                                                                          |
| `slug`     | slug            | yes      | auto-generated from title                                                                |
| `excerpt`  | text            | no       | displayed on listing pages                                                               |
| `content`  | text            | no       | full post body                                                                           |
| `author`   | string          | no       |                                                                                          |
| `date`     | date            | no       | ISO date                                                                                 |
| `category` | string          | no       | one of: `"Impact Stories"`, `"Ministry Updates"`, `"Annual Reports"`, `"Community News"` |
| `readTime` | string          | no       | e.g., `"5 min read"`                                                                     |
| `tags`     | array of string | no       |                                                                                          |
| `image`    | image           | no       | featured image, supports hotspot                                                         |

### founder

GROQ type string: `"founder"`

| Field      | Type   | Required | Notes                                 |
| ---------- | ------ | -------- | ------------------------------------- |
| `name`     | string | yes      |                                       |
| `role`     | string | no       |                                       |
| `bio`      | text   | no       |                                       |
| `initials` | string | no       | used as avatar fallback, e.g., `"LT"` |
| `image`    | image  | no       | supports hotspot                      |
| `order`    | number | no       | controls display order (ascending)    |

### galleryItem

GROQ type string: `"galleryItem"`

| Field         | Type   | Required | Notes                                                                  |
| ------------- | ------ | -------- | ---------------------------------------------------------------------- |
| `title`       | string | yes      |                                                                        |
| `description` | text   | no       |                                                                        |
| `category`    | string | no       | one of: `"education"`, `"community"`, `"events"`, `"team"`, `"impact"` |
| `date`        | date   | no       | ISO date                                                               |
| `image`       | image  | yes      | supports hotspot                                                       |

### siteConfig

GROQ type string: `"siteConfig"`

Create exactly one document of this type. It holds organization-wide contact
information displayed across the site.

| Field         | Type   | Required | Notes             |
| ------------- | ------ | -------- | ----------------- |
| `name`        | string | no       | organization name |
| `tagline`     | string | no       |                   |
| `description` | text   | no       |                   |
| `email`       | string | no       |                   |
| `phone`       | string | no       |                   |
| `address`     | string | no       |                   |
| `officeHours` | string | no       |                   |

### coreValue

GROQ type string: `"coreValue"`

| Field         | Type   | Required | Notes                                       |
| ------------- | ------ | -------- | ------------------------------------------- |
| `title`       | string | yes      |                                             |
| `description` | text   | no       |                                             |
| `verse`       | string | no       | Bible verse reference, e.g., `"James 2:17"` |
| `order`       | number | no       | controls display order (ascending)          |

### impactStat

GROQ type string: `"impactStat"`

| Field   | Type   | Required | Notes                              |
| ------- | ------ | -------- | ---------------------------------- |
| `value` | string | yes      | e.g., `"500+"` or `"100%"`         |
| `label` | string | yes      | e.g., `"Students Supported"`       |
| `order` | number | no       | controls display order (ascending) |

---

## Step 7 — Populate content

Open the Studio at `http://localhost:3333` and create documents for each type.
As a starting point, mirror the entries in the static fallback files:

| Static file              | Content type to populate                |
| ------------------------ | --------------------------------------- |
| `src/data/projects.ts`   | `project`                               |
| `src/data/blog-posts.ts` | `blogPost`                              |
| `src/data/founders.ts`   | `founder`                               |
| `src/data/gallery.ts`    | `galleryItem`                           |
| `src/data/site.ts`       | `siteConfig`, `coreValue`, `impactStat` |

For `order` fields (founders, coreValues, impactStats), use sequential integers
starting at 1. The GROQ queries sort these ascending, so a lower number appears
first on the page.

For `slug` fields, click **Generate** in the Studio to auto-populate from the
title. The blog post query at `src/lib/sanity/queries.ts` matches slugs with
`*[_type == "blogPost" && slug == $slug][0]`, so changing a slug after
publishing will break existing URLs.

---

## Step 8 — Configure CORS origins

The Sanity API rejects requests from origins not on its allowlist. You must add
every domain that will call the API — including your local development server.

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and open your project.
2. Select **API** in the left navigation, then **CORS Origins**.
3. Add the following origins:

| Origin                              | Purpose                          |
| ----------------------------------- | -------------------------------- |
| `http://localhost:3000`             | Local Next.js development server |
| `https://beaconofblessings.org`     | Production site                  |
| `https://www.beaconofblessings.org` | Production site with www prefix  |

If you use Vercel preview deployments, also add your `*.vercel.app` preview URL
or the specific preview domain.

The client in `src/lib/sanity/client.ts` sets `useCdn: true` in production. CDN
requests do not require CORS configuration, but the initial fetch from the
Next.js server (not the browser) also does not require CORS. CORS only applies
to requests made directly from a browser, which can occur if you add client-side
fetching in the future. Adding CORS origins now prevents issues later.

---

## Step 9 — Deploy and verify

### For Vercel

1. Open your project in the Vercel dashboard.
2. Go to **Settings > Environment Variables**.
3. Add `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_API_VERSION` with
   production values.
4. Redeploy the project (a new deployment is required for environment variable
   changes to take effect).

### Verification checklist

After deployment, confirm the following:

- The homepage shows projects and impact stats from your Sanity dataset, not
  the static fallback values.
- The `/blog` page lists the blog posts you created in Sanity.
- Navigating to a blog post's URL (using its slug) loads the correct content.
- The gallery page shows images uploaded to Sanity.
- The about page shows the correct founder bios and core values.

If any page shows the static fallback data instead of Sanity content, check:

1. `SANITY_PROJECT_ID` is set in the deployment environment (not just `.env.local`).
2. The variable name is exactly `SANITY_PROJECT_ID` (no `NEXT_PUBLIC_` prefix —
   this variable is server-side only by design).
3. The deployment was triggered after the variable was added.

---

## ISR revalidation behavior

The site uses Next.js Incremental Static Regeneration. Pages are statically
rendered at build time and revalidated in the background on a per-query basis.

| Content type  | Revalidation interval | Rationale                              |
| ------------- | --------------------- | -------------------------------------- |
| `project`     | 60 seconds            | Operational content, updated regularly |
| `blogPost`    | 60 seconds            | Publishing cadence is frequent         |
| `galleryItem` | 60 seconds            | New photos may be added during events  |
| `siteConfig`  | 300 seconds           | Rarely changes                         |
| `founder`     | 300 seconds           | Rarely changes                         |
| `coreValue`   | 300 seconds           | Rarely changes                         |
| `impactStat`  | 300 seconds           | Updated periodically, not in real time |

These intervals are set in the `{ next: { revalidate: N } }` option passed to
each `client.fetch()` call in `src/lib/sanity/queries.ts`. To change an
interval, edit the corresponding `revalidate` value in that file.

---

## Rollback: disabling Sanity

To revert to static data without code changes, remove or unset `SANITY_PROJECT_ID`
from your environment and redeploy. The check `isSanityConfigured = Boolean(projectId)`
in `src/lib/sanity/client.ts` will be `false`, and every query function in
`src/lib/sanity/queries.ts` will return from the static fallback instead of
calling the Sanity API.

---

## Troubleshooting

**"SANITY_PROJECT_ID is not set. Sanity CMS is not configured."**

This error is thrown by `getSanityClient()` in `src/lib/sanity/client.ts` when
the variable is absent but something attempts to call the Sanity client directly.
Under normal operation this should not occur because every query function checks
`isSanityConfigured` before calling `getSanityClient()`. If you see this error,
a code path is calling `getSanityClient()` directly without the guard. Check
that `SANITY_PROJECT_ID` is present in the environment, then restart the
development server.

**Content updates in the Studio are not reflected on the site**

The site is statically generated with ISR. Changes do not appear instantly.
Wait for the revalidation interval to pass (60 or 300 seconds depending on the
content type), then reload the page. If you need immediate updates, trigger a
manual redeploy or use Sanity webhooks to call Next.js's on-demand revalidation
API (not implemented in this version).

**Images are not displaying**

Images stored in Sanity are served via the Sanity CDN. The `@sanity/image-url`
package (version `^2.1.0`, listed in `package.json`) builds image URLs from the
`SanityImage` asset reference. If images render as broken links:

1. Confirm the image was fully uploaded in the Studio (not just referenced).
2. Confirm `SANITY_PROJECT_ID` matches the project where the image was uploaded.
3. Check that the image field in the document is not empty (`image.asset._ref`
   must be present).

**CORS errors in the browser console**

Add the origin shown in the error to the CORS allowlist in your Sanity project
settings (see Step 8). Note that server-side Next.js data fetching does not
trigger CORS checks; this only applies to client-side fetch calls.
