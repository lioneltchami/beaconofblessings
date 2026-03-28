# Beacon of Blessings — Deployment & Go-Live Guide

This document is the single source of truth for everything you need to do manually
to take the Beacon of Blessings website from the current state to fully live at
https://beaconofblessings.org. Follow the parts in order. Each part includes the
exact URLs, exact steps, and what you should see when each step is complete.

**Time estimate:** 3–5 hours to complete everything the first time through,
plus up to 48 hours for DNS propagation (Part 7) and domain verification emails.

---

## Table of Contents

1. [Vercel Deployment — Verify It Is Working](#part-1-vercel-deployment--verify-it-is-working)
2. [Environment Variables in Vercel](#part-2-environment-variables-in-vercel)
3. [Stripe Setup (Donations)](#part-3-stripe-setup-donations)
4. [Resend Email Setup](#part-4-resend-email-setup)
5. [Sanity CMS Setup](#part-5-sanity-cms-setup)
6. [Google Analytics Setup](#part-6-google-analytics-setup)
7. [Domain and DNS](#part-7-domain-and-dns)
8. [Google Search Console](#part-8-google-search-console)
9. [Google Ad Grants](#part-9-google-ad-grants-free-10k-per-month)
10. [Social Media Profiles](#part-10-social-media-profiles)
11. [Content Population](#part-11-content-population)
12. [Pre-Launch Checklist](#part-12-pre-launch-checklist)
13. [Post-Launch Monitoring](#part-13-post-launch-monitoring)

---

## Part 1: Vercel Deployment — Verify It Is Working

The repository has already been pushed to GitHub and connected to Vercel. This
part confirms the deployment is healthy before you add environment variables.

### 1.1 — Open the Vercel dashboard

Go to https://vercel.com/dashboard

Sign in with the GitHub account you used to connect the repository.

You should see a project card named **beacon-of-blessings** (or similar). Click on it.

### 1.2 — Check the deployment status

You are now on the project overview page. The top section shows the most recent
deployment. Look for:

- A green label that reads **Ready** — this means the site built and deployed
  successfully.
- A red label that reads **Error** or **Failed** — this means the build broke.
  Click the deployment row to open the build logs and look for the error message
  near the bottom.

At this stage the site may have build warnings about missing environment variables
(Stripe, Resend, Sanity). That is expected. The site is designed to run without
those configured — it falls back to static data. The build should still pass.

### 1.3 — Open the deployed preview URL

On the project overview page, find the **Domains** section or click the deployment
row. There will be a URL like:

```
beacon-of-blessings.vercel.app
```

or a custom preview URL. Click it. You should see the Beacon of Blessings homepage
with the purple and gold design. All pages should load. If you see a blank page or
a Next.js error overlay, go to the build logs as described in step 1.2.

### 1.4 — Check the build logs

Click **Deployments** in the left sidebar. Click the most recent deployment. Click
**Build Logs**. Scroll to the bottom. A successful build ends with:

```
Build completed in X seconds
Finalizing output
```

A failed build ends with a red error message. The most common early cause is a
TypeScript error or a missing dependency. If you see one, open a GitHub issue or
contact the developer who set up the project.

---

## Part 2: Environment Variables in Vercel

Environment variables are secrets and configuration values that the site needs
at runtime. None of them are stored in the code — they are set in the Vercel
dashboard and injected into each deployment.

### How to open the Environment Variables page

1. Go to https://vercel.com/dashboard
2. Click your project (beacon-of-blessings).
3. Click **Settings** in the top navigation bar.
4. Click **Environment Variables** in the left sidebar.

You will see a form with fields for **Key**, **Value**, and **Environment**
(Production, Preview, Development). Add each variable below one by one.

For each variable: type the key name exactly as shown, paste the value, select
the correct environment (Production for live values, Preview for test values),
and click **Save**.

After adding all variables, you must redeploy for them to take effect. Go to
the **Deployments** tab, click the three-dot menu on the most recent deployment,
and choose **Redeploy**.

---

### Variable 1: NEXT_PUBLIC_SITE_URL

**What it does:** Tells the site its own public URL. Used for generating the
sitemap, OG image URLs, and the Stripe success/cancel redirect URLs after donation.

**Value:**

```
https://beaconofblessings.org
```

**Environment:** Production only. For Preview deployments, leave this unset or
set it to your preview URL if you want canonical tags to work during testing.

**Where it comes from:** You already know this value — it is your domain name.

---

### Variable 2: STRIPE_SECRET_KEY

**What it does:** Allows the server to create Stripe Checkout sessions when a
visitor clicks "Donate". This is a private key — never share it publicly.

**Value format:** Starts with `sk_test_` (test mode) or `sk_live_` (live mode).

**Where to find it:** After completing Part 3 of this guide, come back here.
The value comes from https://dashboard.stripe.com/apikeys

**Environment:** Production and Preview.

---

### Variable 3: STRIPE_WEBHOOK_SECRET

**What it does:** Used to verify that incoming webhook requests actually came
from Stripe and were not forged. The webhook receives notifications when a
donation completes, and uses this secret to validate the signature.

**Value format:** Starts with `whsec_`.

**Where to find it:** After completing Part 3 (step 3.5) of this guide.

**Environment:** Production only. (Webhooks from Stripe only fire against your
registered endpoint, which points to your production URL.)

---

### Variable 4: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

**What it does:** The public-facing Stripe key loaded in the browser. It is safe
to expose. Used to initialize Stripe's JS library on the donation page.

**Value format:** Starts with `pk_test_` (test mode) or `pk_live_` (live mode).

**Where to find it:** Same page as STRIPE_SECRET_KEY — https://dashboard.stripe.com/apikeys

**Environment:** Production and Preview.

---

### Variable 5: NEXT_PUBLIC_GA_ID

**What it does:** Activates Google Analytics 4 tracking. Without this, no
analytics data is collected. The site uses `@vercel/analytics` in addition, so
you will have Vercel's built-in analytics regardless.

**Value format:** `G-XXXXXXXXXX` (10 characters after the G-)

**Where to find it:** After completing Part 6 of this guide.

**Environment:** Production only. You do not want test traffic polluting your
analytics data.

---

### Variable 6: RESEND_API_KEY

**What it does:** Allows the server to send emails — donation receipts to donors,
donation notifications to you, and contact form submissions.

**Value format:** Starts with `re_`.

**Where to find it:** After completing Part 4 of this guide.

**Environment:** Production and Preview.

---

### Variable 7: EMAIL_FROM

**What it does:** The "From" name and address that appears on all outgoing emails
(donation receipts and contact form notifications).

**Value for testing (before domain verification):**

```
Beacon of Blessings <onboarding@resend.dev>
```

**Value for production (after domain verification in Part 4):**

```
Beacon of Blessings <noreply@beaconofblessings.org>
```

**Important:** Before you verify your domain with Resend, you must use
`onboarding@resend.dev` as the sending address, or Resend will reject the
request. Switch to your own domain address after completing Part 4, Step 4.5.

**Environment:** Production and Preview.

---

### Variable 8: ORG_EMAIL

**What it does:** The internal email address where the site sends notifications
when someone submits the contact form or completes a donation. This is your
organization's inbox — the address only the team sees.

**Value:**

```
info@beaconofblessings.org
```

Replace this with whatever email address you actively monitor. This is where
every contact form message and every donation notification will land.

**Environment:** Production and Preview.

---

### Variable 9: SANITY_PROJECT_ID

**What it does:** Activates the Sanity CMS connection. Without this variable,
the site serves static data from the `src/data/` files in the codebase. With it,
the site fetches live content from your Sanity dataset instead.

**Important:** This variable does NOT start with `NEXT_PUBLIC_`. It is server-side
only by design. Do not add the `NEXT_PUBLIC_` prefix.

**Value format:** An 8-character alphanumeric string, e.g., `abc12xyz`

**Where to find it:** After completing Part 5 of this guide.

**Environment:** Production and Preview.

---

### Variable 10: SANITY_DATASET

**What it does:** Tells the site which Sanity dataset to query. Sanity projects
can have multiple datasets (e.g., production, staging). For this site, use
`production`.

**Value:**

```
production
```

**Environment:** Production and Preview.

---

### Variable 11: SANITY_API_VERSION

**What it does:** Pins the Sanity API to a specific date-versioned behavior.
Keeping this value fixed prevents unexpected changes if Sanity updates its API.

**Value:**

```
2024-01-01
```

**Environment:** Production and Preview.

---

### After adding all variables

1. Go to the **Deployments** tab.
2. Click the three-dot menu (···) next to the most recent deployment.
3. Click **Redeploy**.
4. Wait for the deployment to complete (usually 1–2 minutes).
5. The new deployment should show **Ready** in green.

---

## Part 3: Stripe Setup (Donations)

Stripe processes all donations on the site — both one-time and monthly. The site
uses Stripe Checkout, which handles the payment form, card validation, and
receipts. Your code only creates a session and redirects the donor to Stripe.

### 3.1 — Create a Stripe account

Go to https://stripe.com and click **Start now** or **Create account**.

Fill in your email, full name, country (Nigeria), and a password. Verify your
email address when Stripe sends the confirmation link.

After email verification, Stripe walks you through activating your account.
For now, stay in test mode — you do not need to complete the full activation
to test payments.

### 3.2 — Get your API keys

Go to https://dashboard.stripe.com/test/apikeys

(Make sure the toggle in the top-left says **Test mode**. It should show an
orange "TEST" badge.)

You will see two keys:

- **Publishable key** — starts with `pk_test_`. This is safe to put in the
  browser. Copy this value.
- **Secret key** — starts with `sk_test_`. Click **Reveal test key** to see it.
  Copy this value. Treat it like a password.

Go to Vercel → Settings → Environment Variables and set:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_test_...`
- `STRIPE_SECRET_KEY` = `sk_test_...`

### 3.3 — Create the webhook endpoint

The webhook is how Stripe tells your site "a payment just completed." Without it,
donors will not receive email receipts and you will not receive donation
notifications.

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click **Add endpoint**.
3. In the **Endpoint URL** field, enter exactly:
   ```
   https://beaconofblessings.org/api/webhooks/stripe
   ```
4. Under **Listen to**, select **Events on your account**.
5. Click **Select events** to open the event picker.
6. Search for and select these three events:
   - `checkout.session.completed`
   - `invoice.paid`
   - `customer.subscription.deleted`
7. Click **Add events**.
8. Click **Add endpoint**.

You are now on the webhook endpoint detail page. Look for the section titled
**Signing secret**. Click **Reveal**. Copy the value — it starts with `whsec_`.

Go to Vercel → Settings → Environment Variables and set:

- `STRIPE_WEBHOOK_SECRET` = `whsec_...`

**Important:** The webhook URL above uses your production domain. During testing,
Stripe cannot reach your local computer through the internet. For local testing
only, you can use the Stripe CLI (`stripe listen --forward-to localhost:3000/api/webhooks/stripe`),
but this is optional — you can verify the webhook works by deploying to Vercel
and running a test transaction there.

### 3.4 — Run a test donation

1. Redeploy on Vercel after adding the Stripe environment variables.
2. Go to your Vercel preview URL and navigate to the `/donate` page.
3. Enter a donation amount (e.g., 10), your name, and an email address.
4. Click **Donate**.
5. You will be redirected to a Stripe Checkout page with a test mode banner.
6. Use Stripe's test card: `4242 4242 4242 4242`, any future expiry date
   (e.g., `12/30`), any 3-digit CVC (e.g., `123`), any ZIP code (e.g., `10001`).
7. Click **Pay**.
8. You should be redirected to `/donate/success`.
9. Check the email address you used — a receipt email should arrive within a
   few minutes. Also check the email set as `ORG_EMAIL` — a notification should
   arrive there too.
10. Go to https://dashboard.stripe.com/test/payments and confirm the payment
    appears with status **Succeeded**.

If receipt emails do not arrive, check Part 4 (Resend) first — the issue is
almost always an email configuration problem, not a Stripe problem. Check the
Vercel function logs: go to Vercel → your project → Functions tab, and look for
errors from `/api/webhooks/stripe`.

### 3.5 — Apply for the Stripe non-profit rate

Stripe offers a discounted rate of 2.2% + $0.30 per transaction (versus the
standard 2.9% + $0.30) for registered non-profit organizations.

To apply:

1. First, activate your Stripe account fully by completing the identity
   verification at https://dashboard.stripe.com/account
2. Go to https://support.stripe.com/contact and submit a support request.
3. Select **Account** as the topic, then look for the non-profit discount request
   option. If you cannot find it, email support@stripe.com with the subject line
   "Non-profit rate request" and explain that your organization is a registered
   charity in Nigeria.
4. You will need to provide your charity registration documents.
5. Approval typically takes 5–10 business days.

This step is optional for launch — you can process donations at the standard
rate while waiting for approval.

### 3.6 — Switch to live keys for production

When you are ready to accept real money:

1. Turn off **Test mode** by clicking the toggle in the top-left of the Stripe
   dashboard. It will switch from an orange TEST badge to showing your live
   account.
2. Complete the full account activation if you have not done so (Stripe will
   prompt you).
3. Go to https://dashboard.stripe.com/apikeys (live mode).
4. Copy the live publishable key (`pk_live_...`) and live secret key (`sk_live_...`).
5. Go to https://dashboard.stripe.com/webhooks and re-create the webhook endpoint
   pointing to `https://beaconofblessings.org/api/webhooks/stripe` (same as
   before, but now in live mode).
6. Copy the new webhook signing secret (`whsec_...`).
7. In Vercel → Settings → Environment Variables, update these three values with
   the live versions:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
8. Redeploy on Vercel.

**You cannot mix test keys and live keys.** All three must match — either all
test or all live.

---

## Part 4: Resend Email Setup

Resend sends all outgoing emails from the site: donation receipts to donors,
donation notifications to your inbox, and contact form submissions.

### 4.1 — Create a Resend account

Go to https://resend.com and click **Get Started**.

Sign up with your email address. Verify your email when the confirmation link
arrives.

### 4.2 — Get your API key

1. After logging in, go to https://resend.com/api-keys
2. Click **Create API Key**.
3. Give it a name, e.g., `Beacon of Blessings Production`.
4. Under **Permission**, select **Sending access** (not Full access — this is
   more secure).
5. Under **Domain**, select **All domains** for now (you can restrict it later).
6. Click **Add**.
7. Copy the key shown — it starts with `re_`. This is the only time it will be
   shown. If you lose it, you will need to create a new one.

Go to Vercel → Settings → Environment Variables and set:

- `RESEND_API_KEY` = `re_...`

### 4.3 — Test emails before domain verification

Before you verify your domain, emails must be sent from `onboarding@resend.dev`.
The site is already coded to fall back to this address if `EMAIL_FROM` is not set.

Set this in Vercel for now:

- `EMAIL_FROM` = `Beacon of Blessings <onboarding@resend.dev>`

During this phase, emails will arrive in inboxes with "via onboarding@resend.dev"
in the sender field. This is normal for testing. Recipients can still receive
and reply to these emails. Switch to your own domain address in step 4.5.

### 4.4 — Verify your sending domain

Domain verification proves to email providers (Gmail, Outlook, etc.) that you own
the domain you are sending from. Without it, your emails will land in spam.

1. Go to https://resend.com/domains
2. Click **Add Domain**.
3. Type `beaconofblessings.org` and click **Add**.
4. Resend shows you a list of DNS records to add. You will need to add these to
   your domain's DNS settings (at your domain registrar — wherever you bought
   beaconofblessings.org).

The records typically look like:

| Type | Name                         | Value                                 |
| ---- | ---------------------------- | ------------------------------------- |
| TXT  | resend.\_domainkey           | v=DKIM1; p=...                        |
| TXT  | @ (or beaconofblessings.org) | v=spf1 include:amazonses.com ~all     |
| MX   | bounce.beaconofblessings.org | feedback-smtp.us-east-1.amazonses.com |

The exact values will be shown in your Resend dashboard. Do not type them
manually — copy and paste them.

How to add DNS records depends on your registrar:

- **Namecheap:** Log in → Domain List → Manage → Advanced DNS → Add New Record
- **GoDaddy:** Log in → My Products → DNS → Add
- **Google Domains / Squarespace:** Log in → DNS → Custom records → Add record
- **Cloudflare:** Log in → Select domain → DNS → Add record

After adding the records, click **Verify** in Resend. DNS changes can take
anywhere from a few minutes to 48 hours to propagate. Resend will send you an
email when verification is complete.

### 4.5 — Switch to your own domain after verification

Once Resend confirms your domain is verified:

1. Go to Vercel → Settings → Environment Variables.
2. Update `EMAIL_FROM` to:
   ```
   Beacon of Blessings <noreply@beaconofblessings.org>
   ```
3. Redeploy on Vercel.

From this point on, donation receipts and contact form notifications will arrive
from `noreply@beaconofblessings.org`.

### 4.6 — Test contact form

1. Go to your live site's `/contact` page.
2. Fill in the form with real information.
3. Submit it.
4. Check the email address set as `ORG_EMAIL` — the message should arrive within
   a minute.
5. If it does not arrive, check the spam folder. If it is in spam, your domain
   DNS records are not fully verified yet — wait a bit longer.

---

## Part 5: Sanity CMS Setup

Sanity is the content management system. It is entirely optional at launch —
the site ships with static content already embedded in the code. You can go live
with the static content and set up Sanity later, or set it up now.

The full setup guide is at `/Users/lionel/builders/beaconofblessings/SANITY_SETUP.md`.
The summary below covers the essential steps.

### 5.1 — Understanding the two modes

- **Without Sanity:** The site uses static data from `src/data/` — hardcoded
  projects, blog posts, founder bios, etc. This is the current state. It works
  and looks real.
- **With Sanity:** Once you set `SANITY_PROJECT_ID` in Vercel, the site switches
  to fetching live content from your Sanity dataset. The static files in
  `src/data/` become unused backups.

You can launch in static mode and add Sanity with zero code changes at any point.

### 5.2 — Create a Sanity account and project

1. Go to https://sanity.io and click **Get started free**.
2. Sign up with your email or GitHub.
3. Go to https://sanity.io/manage and click **Create new project**.
4. Name it `Beacon of Blessings`.
5. Select or create a dataset named `production`.
6. Choose the **Free** plan.
7. After creation, find your **Project ID** — the 8-character string shown below
   the project name on the dashboard (e.g., `abc12xyz`).

### 5.3 — Set the Sanity environment variables in Vercel

In Vercel → Settings → Environment Variables, add:

- `SANITY_PROJECT_ID` = your 8-character project ID
- `SANITY_DATASET` = `production`
- `SANITY_API_VERSION` = `2024-01-01`

Redeploy after adding these.

### 5.4 — Set up CORS origins

The Sanity API needs to know which domains are allowed to make requests.

1. Go to https://sanity.io/manage → click your project → **API** → **CORS Origins**.
2. Add:
   - `http://localhost:3000`
   - `https://beaconofblessings.org`
   - `https://www.beaconofblessings.org`
   - Your Vercel preview URL (e.g., `https://beacon-of-blessings.vercel.app`)

### 5.5 — Set up Sanity Studio (the editing interface)

Sanity Studio is a separate web app where you create and edit content. Set it up
in a folder outside this project:

```bash
# Open Terminal and run:
npx sanity@latest init --project <your-project-id> --dataset production --output-path ~/beaconofblessings-studio
```

When prompted, select "Clean project with no predefined schemas".

Then copy the schema files from the website project into the Studio:

```bash
cp /Users/lionel/builders/beaconofblessings/sanity/schemas/*.ts ~/beaconofblessings-studio/schemaTypes/
```

Update `~/beaconofblessings-studio/sanity.config.ts` to register all seven
schema types as shown in the full SANITY_SETUP.md guide (Part 5, Step 5c).

Start the Studio:

```bash
cd ~/beaconofblessings-studio
npm run dev
```

Open http://localhost:3333 in your browser. This is your content editing interface.

### 5.6 — Content types available

Once the Studio is running, you can create and edit:

| What you create in Studio | Where it appears on the site    |
| ------------------------- | ------------------------------- |
| `project` documents       | /projects page                  |
| `blogPost` documents      | /blog page and individual posts |
| `founder` documents       | /about page                     |
| `galleryItem` documents   | /gallery page                   |
| `siteConfig` document     | Contact info across the site    |
| `coreValue` documents     | /about page                     |
| `impactStat` documents    | Homepage stats section          |

See SANITY_SETUP.md for the complete field reference for each content type.

### 5.7 — Content update latency

After saving changes in the Studio, they appear on the live site within 60 seconds
for most content (projects, posts, gallery) and within 5 minutes for less-frequently
changing content (founders, core values, site config). This is controlled by
Next.js ISR and cannot be shortened without a code change.

---

## Part 6: Google Analytics Setup

Google Analytics 4 (GA4) tracks who visits your site, which pages they read,
how they found you, and how long they stay. This is valuable for understanding
donor behavior and grant reporting.

### 6.1 — Create a Google Analytics account

Go to https://analytics.google.com

Sign in with your Google account. If this is your first time, click **Start
measuring**.

### 6.2 — Create an account and property

1. Under **Account name**, enter `Beacon of Blessings`.
2. Under **Property name**, enter `beaconofblessings.org`.
3. Set your **Reporting time zone** to your local timezone.
4. Set **Currency** to USD (or NGN if you prefer).
5. Click **Next**.
6. Fill in your business category (Non-profit) and size.
7. Click **Create**.
8. Accept the Google Analytics Terms of Service.

### 6.3 — Get the Measurement ID

After creating the property:

1. Click **Web** as your platform.
2. Enter your website URL: `https://beaconofblessings.org`
3. Enter a stream name: `Beacon of Blessings Website`
4. Click **Create stream**.
5. On the next screen, you will see a **Measurement ID** that looks like:
   `G-XXXXXXXXXX` (the X's are letters and numbers specific to your property).
6. Copy this ID.

Go to Vercel → Settings → Environment Variables and set:

- `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX`

Redeploy on Vercel. After the redeploy, visit your live site and then check the
**Realtime** report in Google Analytics (https://analytics.google.com → your
property → Reports → Realtime). Your visit should appear within a minute.

### 6.4 — Note on analytics

The site also includes Vercel Analytics (`@vercel/analytics`) and Vercel Speed
Insights (`@vercel/speed-insights`). These work automatically with no setup
required — they are activated by your Vercel account. You can view them at
https://vercel.com/dashboard → your project → **Analytics** tab.

---

## Part 7: Domain and DNS

This part connects `beaconofblessings.org` to your Vercel deployment so that
visitors who type your domain in their browser reach your site.

### 7.1 — Add the domain to Vercel

1. Go to https://vercel.com/dashboard → click your project.
2. Click **Settings** → **Domains** in the left sidebar.
3. In the field that says **Add Domain**, type `beaconofblessings.org` and press
   **Add**.
4. Also add `www.beaconofblessings.org` and press **Add** for that too.

Vercel will show you the DNS records you need to create. Keep this page open —
you will need these values in the next step.

### 7.2 — Add the DNS records at your registrar

Log in to wherever you purchased the domain (Namecheap, GoDaddy, Google Domains,
Cloudflare, etc.) and navigate to the DNS management section.

Vercel will show you one of two configurations depending on your setup:

**Option A — Use Vercel's nameservers (recommended, simplest):**

Vercel may offer to manage your DNS entirely. If it shows you nameserver records
(starting with `ns1.vercel-dns.com`), update your domain's nameservers at your
registrar to point to Vercel's. Look for "Nameservers" or "Custom DNS" in your
registrar's domain settings.

**Option B — Add individual DNS records (if you manage DNS at your registrar):**

| Record type | Name            | Value                |
| ----------- | --------------- | -------------------- |
| A           | @ (root domain) | 76.76.21.21          |
| CNAME       | www             | cname.vercel-dns.com |

The exact values are shown in the Vercel Domains settings page — use what Vercel
shows you, not this table, in case the values have changed.

### 7.3 — Wait for propagation

DNS changes take anywhere from a few minutes to 48 hours to propagate worldwide.
You can monitor propagation at https://dnschecker.org — type `beaconofblessings.org`
and click **Search**. When most locations show green checkmarks with Vercel's IP,
your domain is live.

### 7.4 — SSL certificate (automatic)

Vercel automatically provisions an SSL certificate (HTTPS) for your domain using
Let's Encrypt. You do not need to do anything. Once the domain is connected and
DNS has propagated, Vercel will issue the certificate. You can confirm it is active
by visiting https://beaconofblessings.org in your browser — the padlock icon in
the address bar confirms SSL is working.

### 7.5 — Verify the domain in Vercel

Back on the Vercel Domains page, once DNS has propagated, the status next to
`beaconofblessings.org` will change from **Invalid Configuration** to **Valid
Configuration** with a green checkmark.

---

## Part 8: Google Search Console

Google Search Console tells Google your site exists, helps it understand your
content, and lets you see which search terms people use to find you.

### 8.1 — Add your site to Search Console

Go to https://search.google.com/search-console

Click **Add property**. Choose **URL prefix** and enter:

```
https://beaconofblessings.org
```

### 8.2 — Verify ownership

Google needs to confirm you own the domain. The easiest method with Vercel:

1. Select **HTML tag** as the verification method.
2. Google gives you a meta tag like:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXX" />
   ```
3. Copy the content value (just the string after `content=`).
4. In Vercel → Settings → Environment Variables, add a new variable:
   - Key: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   - Value: the verification string

   Then open the file `src/app/layout.tsx` in the codebase and add the
   verification tag in the metadata. This requires a small code change — ask
   your developer to add it, or use Vercel's alternative HTML file upload method.

   **Alternative (no code change required):** Google also offers a **DNS TXT**
   verification method. In the Search Console verification screen, choose
   **Domain** instead of URL prefix, and follow the instructions to add a TXT
   record to your DNS. This does not require any code changes.

5. Click **Verify** in Search Console.

### 8.3 — Submit your sitemap

The sitemap is already built into the site. It lives at:

```
https://beaconofblessings.org/sitemap.xml
```

It includes all static pages (Home, About, Projects, Blog, Gallery, Contact,
Donate, Privacy, Terms) plus all blog post URLs.

To submit it:

1. In Search Console, click your property.
2. In the left sidebar, click **Sitemaps** (under Indexing).
3. In the **Add a new sitemap** field, type:
   ```
   sitemap.xml
   ```
4. Click **Submit**.

Google will crawl the sitemap within a few days and begin indexing your pages.

### 8.4 — Request indexing for the homepage

1. In Search Console, click the search bar at the top (the URL inspection tool).
2. Type `https://beaconofblessings.org` and press Enter.
3. Click **Request Indexing**.
4. Google will crawl the page, usually within a day or two.

Repeat this for your most important pages: `/about`, `/donate`, `/projects`.

---

## Part 9: Google Ad Grants — Free $10,000/month in Ads

Google Ad Grants gives eligible non-profit organizations $10,000 USD per month
in free Google Search advertising. For a charity focused on education in Nigeria,
this can significantly increase your reach for donor acquisition.

### 9.1 — Eligibility requirements

To qualify, your organization must:

- Hold valid charity status in your country (registered NGO or charity in Nigeria)
- Agree to Google's non-profit program policies
- Have a live website with substantial content (the site must not be primarily
  for fundraising — it must also show your mission and impact)
- Not be a government entity, hospital, or school

### 9.2 — Step 1: Apply to Google for Non-profits

Before applying for Ad Grants, you must be enrolled in Google for Non-profits.

1. Go to https://www.google.com/nonprofits/account/
2. Click **Get started**.
3. Google uses TechSoup to verify non-profit status. You may need to create a
   TechSoup account at https://www.techsoup.org and submit your charity
   registration documents for verification. TechSoup verification typically
   takes 1–2 weeks.
4. Once TechSoup approves your organization, return to
   https://www.google.com/nonprofits/ and complete the Google for Non-profits
   enrollment.

### 9.3 — Step 2: Apply for Google Ad Grants

After being accepted into Google for Non-profits:

1. Log in to your Google for Non-profits account at
   https://www.google.com/nonprofits/
2. Find **Google Ad Grants** in the available products.
3. Click **Activate**.
4. Google reviews your site to confirm it meets their requirements. This review
   takes up to 5 business days.

### 9.4 — Step 3: Set up your Google Ads account

After approval, you receive access to a Google Ads account pre-loaded with the
$10,000/month grant. Create campaigns targeting people who might search for:

- "charity for children in Nigeria"
- "education non-profit Nigeria"
- "donate to education"
- "support vulnerable children"

**Grant restrictions to be aware of:**

- Ads can only appear on Google Search (not YouTube, Gmail, or Display).
- Maximum bid is $2.00 per click (unless you use Smart Bidding, which lifts
  this limit).
- Ads must link to your website (not external sites).
- You must maintain a 5% click-through rate — poorly performing campaigns are
  paused.
- You must log in at least once every 90 days.

### 9.5 — Where to learn more

Google's Ad Grants help center: https://support.google.com/grants

---

## Part 10: Social Media Profiles

Social links are already in the codebase pointing to:

- Facebook: https://facebook.com/beaconofblessings
- Instagram: https://instagram.com/beaconofblessings
- X (Twitter): https://x.com/beaconofblessings

You need to create accounts with those handles, or update the links in the code
to match the handles you actually claim.

### 10.1 — Facebook

1. Go to https://facebook.com and log in with a personal account.
2. Click the **+** (Create) button in the top navigation → **Page**.
3. Enter the page name: `Beacon of Blessings`.
4. Select a category: `Non-Governmental Organization (NGO)` or `Charity Organization`.
5. Complete the page setup: add your logo as the profile photo, a cover image,
   the website URL (https://beaconofblessings.org), contact info, and a description.
6. Claim the username `beaconofblessings` by going to Page Settings → Page Info →
   Username. If it is taken, choose a close variant and update the link in the code.

### 10.2 — Instagram

1. Go to https://instagram.com on your phone or at https://www.instagram.com/accounts/signup/
2. Create a new account. Use an email address the whole team can access.
3. Choose the username `beaconofblessings`.
4. After creating the account, go to your profile → **Edit profile** → switch to
   a **Professional account** → select **Non-profit organization**.
5. Add your website, bio, and contact info.

### 10.3 — X (Twitter)

1. Go to https://x.com/i/flow/signup
2. Sign up with a team email address.
3. Choose the username `beaconofblessings`.
4. After account creation, go to your profile → **Edit profile** → add website,
   location (Lagos, Nigeria), and bio.

### 10.4 — Update the social links in the code

If any of your actual social handles differ from the default URLs in the code,
update them in this file:

```
/Users/lionel/builders/beaconofblessings/src/data/site.ts
```

The `socialLinks` array near the top of the file contains the three URLs. Change
the `href` values to match your actual profile URLs. Then commit and push the
change to GitHub — Vercel will redeploy automatically.

---

## Part 11: Content Population

The site ships with placeholder content. Before going live, replace it with real
information. Below is a priority-ordered list.

### Priority 1 — Critical before launch

**Real phone number**

The current phone number in `src/data/site.ts` is:

```
+234 (0) 812 345 6789
```

This is a placeholder. Replace it with your real phone number. Either:

- Edit it directly in `src/data/site.ts` and push to GitHub, or
- Once Sanity is set up, create a `siteConfig` document with your real phone number.

**ORG_EMAIL in Vercel**

Confirm `ORG_EMAIL` in Vercel environment variables points to an inbox you
actively monitor. Every contact form submission and donation notification goes
to this address.

### Priority 2 — Important for credibility

**Photos of real people and events**

The site has placeholder content for founders, gallery items, and projects. Real
photos dramatically increase donor trust. If you have Sanity set up:

1. Open the Studio at `http://localhost:3333`.
2. Go to **Founder** documents and add real photos and bios.
3. Go to **Gallery Item** documents and upload real photos from your events.

If you do not have Sanity yet, you can update the static data directly:

- Founders: `src/data/founders.ts`
- Gallery: `src/data/gallery.ts`

**Real project records**

Update the projects in `src/data/projects.ts` (or in Sanity) to reflect your
actual completed and upcoming projects with real dates, budgets, and impact
statements.

**Real blog posts**

Add at least 2–3 real blog posts before launch to show the site is active.
Use the `blogPost` schema in Sanity, or edit `src/data/blog-posts.ts`.

### Priority 3 — Post-launch additions

- More gallery photos as events happen.
- Monthly blog posts — aim for at least one per month for SEO and donor engagement.
- Updated impact statistics as your numbers grow.
- Annual report documents (you can add a PDF link in a blog post).

### Content via Sanity Studio (when set up)

Once the Sanity environment variables are in Vercel and the Studio is running:

1. Open `http://localhost:3333` in your browser.
2. The left sidebar shows all content types (Projects, Blog Posts, Founders, etc.).
3. Click any type, then click **Create new**.
4. Fill in the fields. All required fields are marked with a red asterisk.
5. For images: click the image field → **Upload** → select a file from your computer.
6. Click **Publish** (top right) when ready.

Changes appear on the live site within 60 seconds for most content types.

---

## Part 12: Pre-Launch Checklist

Work through every item below before announcing the site. Check each one off as
you complete it.

### Deployment

- [ ] Vercel shows the most recent deployment as **Ready** (green)
- [ ] The site loads at your `.vercel.app` preview URL without errors
- [ ] All pages load without a 404 or error screen:
  - [ ] / (homepage)
  - [ ] /about
  - [ ] /projects
  - [ ] /gallery
  - [ ] /blog
  - [ ] /contact
  - [ ] /donate
  - [ ] /privacy
  - [ ] /terms
- [ ] No browser console errors on any page (open Developer Tools → Console tab)

### Environment Variables

- [ ] `NEXT_PUBLIC_SITE_URL` is set to `https://beaconofblessings.org`
- [ ] `STRIPE_SECRET_KEY` is set (test or live)
- [ ] `STRIPE_WEBHOOK_SECRET` is set
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- [ ] `RESEND_API_KEY` is set
- [ ] `EMAIL_FROM` is set
- [ ] `ORG_EMAIL` is set to your real inbox

### Stripe

- [ ] Test donation completed successfully using card `4242 4242 4242 4242`
- [ ] Donor received a receipt email at the address entered during checkout
- [ ] ORG_EMAIL received a donation notification email
- [ ] Test payment appears in Stripe dashboard at https://dashboard.stripe.com/test/payments
- [ ] Webhook endpoint shows **Enabled** at https://dashboard.stripe.com/test/webhooks
- [ ] Decision made: stay in test mode longer, or switch to live keys before launch

### Email

- [ ] Contact form on /contact page sends a message successfully
- [ ] Message arrives at ORG_EMAIL within 2 minutes
- [ ] If using your own domain for EMAIL_FROM: domain verified in Resend dashboard
- [ ] Test email does not land in spam (if it does, domain verification is incomplete)

### Domain and SSL

- [ ] `beaconofblessings.org` is added to Vercel Domains with green checkmark
- [ ] `www.beaconofblessings.org` is added to Vercel Domains with green checkmark
- [ ] DNS has propagated: visiting `https://beaconofblessings.org` loads your site
- [ ] `https://www.beaconofblessings.org` redirects to the non-www version
- [ ] SSL padlock is visible in the browser address bar
- [ ] No "insecure" warnings in browser

### Content

- [ ] Real phone number is in place (not the `+234 (0) 812 345 6789` placeholder)
- [ ] ORG_EMAIL points to a real inbox you monitor
- [ ] At least one real project is present
- [ ] At least one real blog post is published
- [ ] Founder names and bios are accurate
- [ ] Impact statistics reflect real numbers (or are labeled as estimates)
- [ ] Social media links go to real, active accounts (not dead placeholder URLs)

### SEO and Meta

- [ ] Sitemap is accessible at `https://beaconofblessings.org/sitemap.xml`
      (visit the URL in your browser — it should show an XML file listing all pages)
- [ ] robots.txt is accessible at `https://beaconofblessings.org/robots.txt`
      (should show "Allow: /" and the sitemap URL)
- [ ] Page titles and descriptions look correct when shared on social media.
      Test with:
  - Facebook: https://developers.facebook.com/tools/debug/ (enter your URL)
  - Twitter/X: https://cards-dev.twitter.com/validator (enter your URL)
  - LinkedIn: https://www.linkedin.com/post-inspector/ (enter your URL)
- [ ] Google Analytics is receiving data: visit the site, then check the
      **Realtime** report at https://analytics.google.com

### Mobile and Accessibility

- [ ] Site looks correct on a phone (use Chrome DevTools → Toggle device toolbar,
      or visit on a real phone)
- [ ] All text is readable without zooming
- [ ] Donation form works on mobile
- [ ] Contact form works on mobile
- [ ] Navigation menu opens and closes correctly on mobile
- [ ] No horizontal scrolling on any page

### Performance

- [ ] Run a Google Lighthouse test: in Chrome, open DevTools → Lighthouse tab →
      Analyze page load. Aim for Performance score above 80, Accessibility above 90.
- [ ] Images load quickly (if any are slow, consider compressing them before upload)

---

## Part 13: Post-Launch Monitoring

### Weekly checks

**Vercel**

Go to https://vercel.com/dashboard → your project → **Analytics**. Check:

- Number of visitors
- Which pages are most visited
- Any function errors (Functions tab — look for error counts)

**Stripe**

Go to https://dashboard.stripe.com → **Payments**. Check:

- New donations received
- Any failed payments (failed payments may indicate an issue with the checkout flow)
- Subscription status for monthly donors

**Resend**

Go to https://resend.com/emails. Check:

- Delivery rate (should be close to 100%)
- Any bounced or failed emails
- If bounce rate is high, your domain reputation may need attention

**ORG_EMAIL inbox**

Check your inbox for:

- Contact form submissions (respond within 48 hours)
- Donation notifications (consider sending a personal thank-you to donors)

### Monthly checks

- Review Google Analytics for traffic trends: https://analytics.google.com
- Review Google Search Console for search performance and any crawl errors:
  https://search.google.com/search-console
- Update content: at minimum, one new blog post per month
- Check that the donation flow still works end-to-end

### Updating content

**Via Sanity (if configured):**
Open the Studio at your Sanity Studio URL and create or edit documents.
Changes appear on the live site within 60 seconds.

**Via code (if Sanity is not yet set up):**
Edit the files in `src/data/`, commit the change, and push to GitHub.
Vercel automatically deploys the update.

### When something breaks

1. Check the Vercel Functions log first:
   Vercel dashboard → your project → Functions tab → select the failing function
2. Check the Stripe webhook delivery log:
   https://dashboard.stripe.com/webhooks → click your endpoint → Recent deliveries
3. Check the Resend delivery log:
   https://resend.com/emails
4. If the whole site is down, check Vercel's status page: https://www.vercel-status.com

---

## Appendix: Quick Reference — All Dashboard URLs

| Service                        | Dashboard URL                                                             |
| ------------------------------ | ------------------------------------------------------------------------- |
| Vercel (deployments)           | https://vercel.com/dashboard                                              |
| Vercel (environment variables) | https://vercel.com/dashboard → project → Settings → Environment Variables |
| Stripe (API keys, test)        | https://dashboard.stripe.com/test/apikeys                                 |
| Stripe (API keys, live)        | https://dashboard.stripe.com/apikeys                                      |
| Stripe (webhooks, test)        | https://dashboard.stripe.com/test/webhooks                                |
| Stripe (webhooks, live)        | https://dashboard.stripe.com/webhooks                                     |
| Stripe (payments)              | https://dashboard.stripe.com/payments                                     |
| Resend (API keys)              | https://resend.com/api-keys                                               |
| Resend (domains)               | https://resend.com/domains                                                |
| Resend (email log)             | https://resend.com/emails                                                 |
| Sanity (project dashboard)     | https://sanity.io/manage                                                  |
| Sanity (CORS settings)         | https://sanity.io/manage → your project → API → CORS Origins              |
| Google Analytics               | https://analytics.google.com                                              |
| Google Search Console          | https://search.google.com/search-console                                  |
| Google for Non-profits         | https://www.google.com/nonprofits/                                        |
| Facebook OG debugger           | https://developers.facebook.com/tools/debug/                              |
| Twitter card validator         | https://cards-dev.twitter.com/validator                                   |
| DNS propagation checker        | https://dnschecker.org                                                    |
| Vercel status                  | https://www.vercel-status.com                                             |

## Appendix: Environment Variables Summary

| Variable                             | Required | Environment          | Notes                                             |
| ------------------------------------ | -------- | -------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`               | Yes      | Production           | Set to `https://beaconofblessings.org`            |
| `STRIPE_SECRET_KEY`                  | Yes      | Production + Preview | `sk_test_...` or `sk_live_...`                    |
| `STRIPE_WEBHOOK_SECRET`              | Yes      | Production           | `whsec_...` from Stripe webhook settings          |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes      | Production + Preview | `pk_test_...` or `pk_live_...`                    |
| `RESEND_API_KEY`                     | Yes      | Production + Preview | `re_...` from Resend                              |
| `EMAIL_FROM`                         | Yes      | Production + Preview | Use `onboarding@resend.dev` until domain verified |
| `ORG_EMAIL`                          | Yes      | Production + Preview | Your internal notification inbox                  |
| `NEXT_PUBLIC_GA_ID`                  | No       | Production           | `G-XXXXXXXXXX` from Google Analytics              |
| `SANITY_PROJECT_ID`                  | No       | Production + Preview | Activates Sanity CMS; omit to use static data     |
| `SANITY_DATASET`                     | No       | Production + Preview | `production`                                      |
| `SANITY_API_VERSION`                 | No       | Production + Preview | `2024-01-01`                                      |
