/**
 * Sanity document types — these mirror the schema definitions
 * in sanity/schemas/ and are used for type-safe GROQ query results.
 */

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface SanityProject {
  _id: string;
  _type: "project";
  slug: string;
  title: string;
  status: "completed" | "upcoming";
  date: string;
  budget: string;
  description: string;
  impact: string[];
  featured: boolean;
  image?: SanityImage;
}

export interface SanityBlogPost {
  _id: string;
  _type: "blogPost";
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  tags: string[];
  image?: SanityImage;
}

export interface SanityFounder {
  _id: string;
  _type: "founder";
  name: string;
  role: string;
  bio: string;
  initials: string;
  image?: SanityImage;
  order: number;
}

export interface SanityGalleryItem {
  _id: string;
  _type: "galleryItem";
  title: string;
  description: string;
  category: string;
  date: string;
  image?: SanityImage;
}

export interface SanitySiteConfig {
  _id: string;
  _type: "siteConfig";
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  officeHours: string;
}

export interface SanityCoreValue {
  _id: string;
  _type: "coreValue";
  title: string;
  description: string;
  verse: string;
  order: number;
}

export interface SanityImpactStat {
  _id: string;
  _type: "impactStat";
  value: string;
  label: string;
  order: number;
}
