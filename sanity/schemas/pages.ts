const linkFields = [
  { name: "label", title: "Label", type: "string" },
  { name: "href", title: "URL or Path", type: "string" },
  { name: "variant", title: "Style", type: "string", options: { list: ["primary", "secondary", "outline"] } },
];

const contentImage = {
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "caption", title: "Caption", type: "string" },
    { name: "alt", title: "Alt Text", type: "string" },
    { name: "src", title: "Fallback or External Image URL", type: "url" },
    {
      name: "image",
      title: "Sanity Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
    },
  ],
};

const cardItem = {
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "iconKey", title: "Icon Key", type: "string" },
    { name: "href", title: "URL or Path", type: "string" },
    { name: "ctaLabel", title: "CTA Label", type: "string" },
    { name: "order", title: "Display Order", type: "number" },
  ],
};

const giftUse = {
  type: "object",
  fields: [
    { name: "amount", title: "Amount", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
  ],
};

const heroFields = [
  { name: "eyebrow", title: "Eyebrow", type: "string" },
  { name: "title", title: "Title", type: "string" },
  { name: "body", title: "Body", type: "text" },
  { name: "ctas", title: "CTA Links", type: "array", of: [{ type: "object", fields: linkFields }] },
  { name: "images", title: "Images", type: "array", of: [contentImage] },
  { name: "verse", title: "Verse", type: "object", fields: [
    { name: "text", title: "Text", type: "text" },
    { name: "reference", title: "Reference", type: "string" },
  ] },
];

const hero = { name: "hero", title: "Hero", type: "object", fields: heroFields };

export const homePage = {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    hero,
    { name: "donorConfidence", title: "Donor Confidence", type: "object", fields: [
      { name: "eyebrow", title: "Eyebrow", type: "string" },
      { name: "title", title: "Title", type: "string" },
      { name: "cards", title: "Cards", type: "array", of: [cardItem] },
    ] },
    { name: "fieldMoments", title: "Field Moments", type: "object", fields: [
      { name: "eyebrow", title: "Eyebrow", type: "string" },
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
      { name: "images", title: "Images", type: "array", of: [contentImage] },
    ] },
    { name: "programsIntro", title: "Programs Intro", type: "object", fields: [
      { name: "eyebrow", title: "Eyebrow", type: "string" },
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
    ] },
    { name: "giftSection", title: "Gift Section", type: "object", fields: [
      { name: "eyebrow", title: "Eyebrow", type: "string" },
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
      { name: "cta", title: "CTA", type: "object", fields: linkFields },
      { name: "image", title: "Image", ...contentImage },
      { name: "gifts", title: "Gift Examples", type: "array", of: [giftUse] },
    ] },
    { name: "finalCta", title: "Final CTA", type: "object", fields: [
      { name: "eyebrow", title: "Eyebrow", type: "string" },
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
      { name: "image", title: "Image", ...contentImage },
      { name: "ctas", title: "CTA Links", type: "array", of: [{ type: "object", fields: linkFields }] },
    ] },
    { name: "representativeImageNote", title: "Representative Image Note", type: "string" },
  ],
};

export const programsPage = {
  name: "programsPage",
  title: "Programs Page",
  type: "document",
  fields: [
    hero,
    { name: "proofCards", title: "Proof Cards", type: "array", of: [cardItem] },
    { name: "pillars", title: "Program Pillars", type: "array", of: [cardItem] },
    { name: "goals", title: "Goals", type: "array", of: [{ type: "string" }] },
    { name: "actionPaths", title: "Action Paths", type: "array", of: [cardItem] },
  ],
};

export const aboutPage = {
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    hero,
    { name: "story", title: "Story", type: "object", fields: [
      { name: "eyebrow", title: "Eyebrow", type: "string" },
      { name: "title", title: "Title", type: "string" },
      { name: "subtitle", title: "Subtitle", type: "string" },
      { name: "body", title: "Body", type: "text" },
      { name: "cards", title: "Cards", type: "array", of: [cardItem] },
    ] },
    { name: "milestones", title: "Milestones", type: "array", of: [{ type: "object", fields: [
      { name: "year", title: "Year", type: "string" },
      { name: "title", title: "Title", type: "string" },
      { name: "description", title: "Description", type: "text" },
    ] }] },
    { name: "goals2026", title: "2026 Goals", type: "array", of: [{ type: "string" }] },
    { name: "operatingPrinciples", title: "Operating Principles", type: "array", of: [cardItem] },
  ],
};

export const impactPage = {
  name: "impactPage",
  title: "Impact Page",
  type: "document",
  fields: [
    hero,
    { name: "report", title: "Report", type: "object", fields: [
      { name: "period", title: "Period", type: "string" },
      { name: "headline", title: "Headline", type: "string" },
      { name: "summary", title: "Summary", type: "text" },
      { name: "evidence", title: "Evidence", type: "array", of: [{ type: "string" }] },
    ] },
    { name: "metrics", title: "Metrics", type: "array", of: [{ type: "object", fields: [
      { name: "value", title: "Value", type: "string" },
      { name: "label", title: "Label", type: "string" },
      { name: "detail", title: "Detail", type: "text" },
    ] }] },
    { name: "outcomePathway", title: "Outcome Pathway", type: "array", of: [{ type: "object", fields: [
      { name: "step", title: "Step", type: "string" },
      { name: "description", title: "Description", type: "text" },
    ] }] },
    { name: "visualProof", title: "Visual Proof", type: "object", fields: [
      { name: "eyebrow", title: "Eyebrow", type: "string" },
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
      { name: "images", title: "Images", type: "array", of: [contentImage] },
    ] },
  ],
};

export const transparencyPage = {
  name: "transparencyPage",
  title: "Transparency Page",
  type: "document",
  fields: [
    hero,
    { name: "summaryCards", title: "Summary Cards", type: "array", of: [cardItem] },
    { name: "facts", title: "Facts", type: "array", of: [{ type: "object", fields: [
      { name: "label", title: "Label", type: "string" },
      { name: "value", title: "Value", type: "string" },
    ] }] },
    { name: "boardMembers", title: "Board Members", type: "array", of: [{ type: "object", fields: [
      { name: "name", title: "Name", type: "string" },
      { name: "role", title: "Role", type: "string" },
      { name: "focus", title: "Focus", type: "text" },
    ] }] },
    { name: "donationUse", title: "Donation Use", type: "array", of: [{ type: "object", fields: [
      { name: "label", title: "Label", type: "string" },
      { name: "value", title: "Value", type: "string" },
    ] }] },
    { name: "stewardshipStandards", title: "Stewardship Standards", type: "array", of: [{ type: "object", fields: [
      { name: "label", title: "Label", type: "string" },
      { name: "value", title: "Value", type: "text" },
    ] }] },
    { name: "reportingCadence", title: "Reporting Cadence", type: "array", of: [{ type: "string" }] },
    { name: "documentStatuses", title: "Document Statuses", type: "array", of: [{ type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "status", title: "Status", type: "string", options: { list: ["available", "pending", "planned"] } },
      { name: "description", title: "Description", type: "text" },
      { name: "href", title: "URL or Path", type: "string" },
    ] }] },
    { name: "policyLinks", title: "Policy Links", type: "array", of: [{ type: "object", fields: linkFields }] },
  ],
};

export const contactPage = {
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    hero,
    { name: "responseWindow", title: "Response Window", type: "object", fields: [
      { name: "label", title: "Label", type: "string" },
      { name: "value", title: "Value", type: "string" },
      { name: "description", title: "Description", type: "text" },
      { name: "image", title: "Image", ...contentImage },
    ] },
    { name: "getInvolved", title: "Get Involved", type: "array", of: [cardItem] },
    { name: "trustNotes", title: "Trust Notes", type: "array", of: [{ type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "description", title: "Description", type: "text" },
    ] }] },
  ],
};

export const donatePage = {
  name: "donatePage",
  title: "Donate Page",
  type: "document",
  fields: [
    hero,
    { name: "impactSection", title: "Impact Section", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "cards", title: "Cards", type: "array", of: [cardItem] },
    ] },
    { name: "formSection", title: "Form Section", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
    ] },
    { name: "whyGive", title: "Why Give Section", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
      { name: "cards", title: "Cards", type: "array", of: [cardItem] },
    ] },
  ],
};

export const partnerPage = {
  name: "partnerPage",
  title: "Partner With Us Page",
  type: "document",
  fields: [
    hero,
    { name: "trustBar", title: "Trust Bar", type: "array", of: [{ type: "object", fields: [
      { name: "value", title: "Value", type: "string" },
      { name: "label", title: "Label", type: "string" },
      { name: "detail", title: "Detail", type: "text" },
      { name: "iconKey", title: "Icon Key", type: "string" },
    ] }] },
    { name: "whyPartner", title: "Why Partner", type: "object", fields: [
      { name: "eyebrow", title: "Eyebrow", type: "string" },
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
    ] },
    { name: "dueDiligence", title: "Due Diligence Cards", type: "array", of: [cardItem] },
    { name: "tiersIntro", title: "Tiers Intro", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
    ] },
    { name: "tiers", title: "Sponsor Tiers", type: "array", of: [{ type: "object", fields: [
      { name: "name", title: "Name", type: "string" },
      { name: "amount", title: "Amount", type: "string" },
      { name: "bestFor", title: "Best For", type: "text" },
      { name: "funds", title: "What It Funds", type: "text" },
      { name: "recognition", title: "Recognition", type: "array", of: [{ type: "string" }] },
    ] }] },
    { name: "needsIntro", title: "Needs Intro", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
    ] },
    { name: "currentNeeds", title: "Current Needs", type: "array", of: [{ type: "object", fields: [
      { name: "item", title: "Item", type: "string" },
      { name: "amount", title: "Amount", type: "string" },
      { name: "detail", title: "Detail", type: "text" },
    ] }] },
    { name: "processIntro", title: "Process Intro", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
    ] },
    { name: "process", title: "Process", type: "array", of: [{ type: "object", fields: [
      { name: "step", title: "Step", type: "string" },
      { name: "title", title: "Title", type: "string" },
      { name: "description", title: "Description", type: "text" },
    ] }] },
    { name: "recognitionPolicy", title: "Recognition Policy", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
      { name: "points", title: "Points", type: "array", of: [{ type: "string" }] },
    ] },
    { name: "reportingPromise", title: "Reporting Promise", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
      { name: "points", title: "Points", type: "array", of: [{ type: "string" }] },
    ] },
    { name: "finalCta", title: "Final CTA", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
      { name: "ctas", title: "CTA Links", type: "array", of: [{ type: "object", fields: linkFields }] },
    ] },
  ],
};

export const projectsPage = {
  name: "projectsPage",
  title: "Projects Page",
  type: "document",
  fields: [
    hero,
    { name: "metrics", title: "Metrics", type: "array", of: [{ type: "object", fields: [
      { name: "value", title: "Value", type: "string" },
      { name: "label", title: "Label", type: "string" },
      { name: "detail", title: "Detail", type: "text" },
      { name: "iconKey", title: "Icon Key", type: "string" },
    ] }] },
    { name: "completedIntro", title: "Completed Projects Intro", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
    ] },
    { name: "currentIntro", title: "Current Projects Intro", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
    ] },
    { name: "upcomingIntro", title: "Upcoming Projects Intro", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
    ] },
    { name: "cta", title: "CTA", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
      { name: "ctas", title: "CTA Links", type: "array", of: [{ type: "object", fields: linkFields }] },
    ] },
  ],
};

export const galleryPage = {
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  fields: [
    hero,
    { name: "note", title: "Photo Note", ...cardItem },
    { name: "cta", title: "CTA", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
      { name: "ctas", title: "CTA Links", type: "array", of: [{ type: "object", fields: linkFields }] },
    ] },
  ],
};

export const resourcesPage = {
  name: "resourcesPage",
  title: "Resources Page",
  type: "document",
  fields: [
    hero,
    { name: "registrationBanner", title: "Registration Banner", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
    ] },
    { name: "documentsIntro", title: "Documents Intro", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
    ] },
    { name: "cta", title: "CTA", type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "body", title: "Body", type: "text" },
      { name: "ctas", title: "CTA Links", type: "array", of: [{ type: "object", fields: linkFields }] },
    ] },
  ],
};
