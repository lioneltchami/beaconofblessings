# Contentful Migration Guide for Beacon of Blessings Charity Initiative

This guide will help you migrate your static content to Contentful for easier management and updates.

## Prerequisites

1. Create a Contentful account at [contentful.com](https://www.contentful.com)
2. Create a new space for your organization
3. Get your Space ID and Content Delivery API access token
4. Get your Content Preview API access token (for draft content)

## Environment Setup

1. Create a `.env.local` file in your project root:

```env
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token_here
CONTENTFUL_PREVIEW_TOKEN=your_preview_api_token_here
CONTENTFUL_ENVIRONMENT=master
```

2. Add these variables to your production environment (Vercel, Netlify, etc.)

## Content Models to Create in Contentful

### 1. Hero Section (heroSection)
- **title** (Short text)
- **subtitle** (Short text)  
- **description** (Long text)
- **primaryButtonText** (Short text)
- **primaryButtonLink** (Short text)
- **secondaryButtonText** (Short text)
- **secondaryButtonLink** (Short text)
- **backgroundImage** (Media - optional)
- **bibleVerse** (Long text)
- **bibleVerseReference** (Short text)

### 2. Organization Info (organizationInfo)
- **organizationName** (Short text)
- **tagline** (Short text)
- **mission** (Long text)
- **vision** (Long text)
- **foundedDate** (Date)
- **location** (Short text)
- **registrationNumber** (Short text - optional)
- **email** (Short text)
- **phone** (Short text)
- **address** (Long text)
- **socialMediaLinks** (JSON object)
- **logo** (Media - optional)

### 3. Founder Profile (founderProfile)
- **name** (Short text)
- **role** (Short text)
- **title** (Short text)
- **bio** (Long text)
- **background** (Long text)
- **personalVision** (Long text)
- **photo** (Media - optional)
- **achievements** (Short text, list)
- **email** (Short text - optional)
- **linkedIn** (Short text - optional)
- **order** (Integer)

### 4. Project (project)
- **title** (Short text)
- **slug** (Short text, unique)
- **shortDescription** (Long text)
- **fullDescription** (Long text)
- **status** (Short text, list: completed, in-progress, planned, concept)
- **startDate** (Date - optional)
- **endDate** (Date - optional)
- **expectedLaunchDate** (Date - optional)
- **location** (Short text)
- **budget** (Short text)
- **estimatedBudget** (Short text - optional)
- **targetBeneficiaries** (Integer)
- **actualBeneficiaries** (Integer - optional)
- **featuredImage** (Media - optional)
- **galleryImages** (Media, list - optional)
- **objectives** (Short text, list)
- **outcomes** (Short text, list - optional)
- **partners** (Short text, list)
- **impactMetrics** (JSON object)
- **category** (Short text, list)
- **featured** (Boolean)
- **order** (Integer)

### 5. Testimonial (testimonial)
- **name** (Short text)
- **role** (Short text)
- **organization** (Short text - optional)
- **quote** (Long text)
- **photo** (Media - optional)
- **projectRelated** (Short text - optional)
- **featured** (Boolean)
- **order** (Integer)

### 6. Gallery Item (galleryItem)
- **title** (Short text)
- **description** (Long text)
- **image** (Media)
- **category** (Short text, list: projects, community, beneficiaries, team, ceremonies, other)
- **date** (Date)
- **location** (Short text)
- **photographer** (Short text - optional)
- **participants** (Integer - optional)
- **projectRelated** (Short text - optional)
- **featured** (Boolean)
- **order** (Integer)

### 7. Impact Statistic (impactStatistic)
- **title** (Short text)
- **value** (Short text)
- **description** (Long text)
- **icon** (Short text)
- **category** (Short text, list: students, projects, communities, financial, other)
- **featured** (Boolean)
- **order** (Integer)

### 8. Core Value (coreValue)
- **title** (Short text)
- **description** (Long text)
- **bibleVerse** (Long text)
- **bibleVerseReference** (Short text)
- **icon** (Short text)
- **order** (Integer)

### 9. Bible Verse (bibleVerse)
- **verse** (Long text)
- **reference** (Short text)
- **context** (Long text)
- **category** (Short text, list: mission, service, love, hope, justice, other)
- **featured** (Boolean)
- **order** (Integer)

### 10. Contact Info (contactInfo)
- **type** (Short text, list: email, phone, address, office-hours, social)
- **title** (Short text)
- **details** (Short text)
- **description** (Long text)
- **icon** (Short text)
- **action** (Short text - optional)
- **order** (Integer)

## Migration Steps

### Phase 1: Setup Content Models
1. Create all the content models listed above in your Contentful space
2. Configure field validations and help text as needed
3. Test creating sample entries

### Phase 2: Migrate Existing Content

#### Current Static Content to Migrate:

**Organization Info:**
- Name: Beacon of Blessings Charity Initiative
- Mission: Share the love of Jesus Christ through practical, compassionate service...
- Vision: To be a transformative beacon of hope across Nigeria...
- Location: Lagos, Nigeria
- Email: info@beaconofblessings.org
- Phone: +234 (0) 123 456 7890

**Founders:**
1. **Lionel Tchami**
   - Role: Co-Founder & Director
   - Description: Passionate about education and community development...

2. **Grace Kure**
   - Role: Co-Founder & Nigeria Operations Lead
   - Description: Based in Nigeria, Grace leads our on-ground operations...

**Projects:**
1. **School Supplies Drive 2024**
   - Status: completed
   - Description: Our inaugural project provided school bags, books, and supplies...
   - Impact: 500 students helped, 2000+ items donated
   - Budget: ₦2,500,000

**Impact Statistics:**
- 500+ Students Helped
- 2,000+ School Items Donated
- 1 Project Completed
- 100% Community Focused

**Core Values:**
1. Love in Action (1 John 3:18)
2. Integrity & Transparency (Proverbs 11:3)
3. Compassionate Service (Ephesians 4:32)
4. Community Focus (Galatians 6:10)

**Bible Verses for different sections:**
- Homepage: Matthew 25:35, Luke 6:38
- Footer: Isaiah 1:17
- About: Luke 4:18, 1 John 3:18, Proverbs 29:18
- Projects: James 2:17, Proverbs 16:3
- Contact: Ecclesiastes 4:9, 1 Thessalonians 5:11

### Phase 3: Update Components
After migrating content to Contentful, update your React components to fetch data from Contentful instead of using static data.

Example component update:

```typescript
// Before (static data)
const founders = [
  { name: 'Lionel Tchami', role: 'Co-Founder & Director', ... },
  { name: 'Grace Kure', role: 'Co-Founder & Nigeria Operations Lead', ... }
]

// After (Contentful data)
import { getFounders } from '@/lib/contentful'

export default async function AboutPage() {
  const founders = await getFounders()
  
  return (
    // Component JSX using founders data
  )
}
```

### Phase 4: Enable Preview Mode
Set up preview mode for draft content:

1. Create a preview API route: `/pages/api/preview.ts`
2. Add preview functionality to your components
3. Test content preview before publishing

### Phase 5: Content Management Workflow
1. Train team members on Contentful interface
2. Set up content review workflow
3. Configure webhooks for automatic deployments (optional)

## Benefits After Migration

1. **Easy Content Updates**: Non-technical team members can update content
2. **Content Versioning**: Track changes and roll back if needed
3. **Multi-environment Support**: Separate staging and production content
4. **Rich Text Editing**: Better formatting options for long-form content
5. **Asset Management**: Organized media library with automatic optimization
6. **API-driven**: Content can be used across multiple platforms
7. **Collaboration**: Multiple team members can work on content simultaneously

## Next Steps

1. Set up your Contentful space and content models
2. Migrate the most critical content first (hero section, organization info)
3. Update components one page at a time
4. Test thoroughly before going live
5. Train your team on content management

## Support

For help with this migration:
- Contentful Documentation: https://www.contentful.com/developers/docs/
- Contact: The development team for technical assistance

Remember: You can migrate content gradually. Start with one page or section and expand from there.