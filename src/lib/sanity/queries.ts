/**
 * GROQ queries for fetching content from Sanity CMS.
 * Each function tries Sanity first and falls back to static data
 * when Sanity is not configured (no SANITY_PROJECT_ID).
 */

// Static data fallbacks
import { blogPosts, getBlogPost as staticGetBlogPost } from "@/data/blog-posts";
import { founders as staticFounders } from "@/data/founders";
import { galleryItems as staticGalleryItems } from "@/data/gallery";
import {
  getCompletedProjects as staticGetCompleted,
  getFeaturedProjects as staticGetFeatured,
  getUpcomingProjects as staticGetUpcoming,
  projects as staticProjects,
} from "@/data/projects";
import {
  coreValues as staticCoreValues,
  impactStats as staticImpactStats,
} from "@/data/site";
import { getSanityClient, isSanityConfigured } from "./client";
import type {
  SanityBlogPost,
  SanityCoreValue,
  SanityFounder,
  SanityGalleryItem,
  SanityImpactStat,
  SanityProject,
} from "./types";

// ── Projects ──────────────────────────────────────

export async function getProjects(): Promise<SanityProject[]> {
  if (!isSanityConfigured) {
    return staticProjects as unknown as SanityProject[];
  }
  const client = getSanityClient();
  return client.fetch(
    `*[_type == "project"] | order(date desc)`,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getCompletedProjects(): Promise<SanityProject[]> {
  if (!isSanityConfigured) {
    return staticGetCompleted() as unknown as SanityProject[];
  }
  const client = getSanityClient();
  return client.fetch(
    `*[_type == "project" && status == "completed"] | order(date desc)`,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getUpcomingProjects(): Promise<SanityProject[]> {
  if (!isSanityConfigured) {
    return staticGetUpcoming() as unknown as SanityProject[];
  }
  const client = getSanityClient();
  return client.fetch(
    `*[_type == "project" && status == "upcoming"] | order(date asc)`,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getFeaturedProjects(): Promise<SanityProject[]> {
  if (!isSanityConfigured) {
    return staticGetFeatured() as unknown as SanityProject[];
  }
  const client = getSanityClient();
  return client.fetch(
    `*[_type == "project" && featured == true] | order(date desc)`,
    {},
    { next: { revalidate: 60 } },
  );
}

// ── Blog Posts ────────────────────────────────────

export async function getBlogPosts(): Promise<SanityBlogPost[]> {
  if (!isSanityConfigured) {
    return blogPosts as unknown as SanityBlogPost[];
  }
  const client = getSanityClient();
  return client.fetch(
    `*[_type == "blogPost"] | order(date desc)`,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getBlogPost(
  slug: string,
): Promise<SanityBlogPost | null> {
  if (!isSanityConfigured) {
    const post = staticGetBlogPost(slug);
    return (post as unknown as SanityBlogPost) ?? null;
  }
  const client = getSanityClient();
  return client.fetch(
    `*[_type == "blogPost" && slug == $slug][0]`,
    { slug },
    { next: { revalidate: 60 } },
  );
}

export async function getBlogSlugs(): Promise<string[]> {
  if (!isSanityConfigured) {
    return blogPosts.map((p) => p.slug);
  }
  const client = getSanityClient();
  const results = await client.fetch<Array<{ slug: string }>>(
    `*[_type == "blogPost"]{ slug }`,
    {},
    { next: { revalidate: 60 } },
  );
  return results.map((r) => r.slug);
}

// ── Founders ──────────────────────────────────────

export async function getFounders(): Promise<SanityFounder[]> {
  if (!isSanityConfigured) {
    return staticFounders as unknown as SanityFounder[];
  }
  const client = getSanityClient();
  return client.fetch(
    `*[_type == "founder"] | order(order asc)`,
    {},
    { next: { revalidate: 300 } },
  );
}

// ── Gallery ───────────────────────────────────────

export async function getGalleryItems(): Promise<SanityGalleryItem[]> {
  if (!isSanityConfigured) {
    return staticGalleryItems as unknown as SanityGalleryItem[];
  }
  const client = getSanityClient();
  return client.fetch(
    `*[_type == "galleryItem"] | order(date desc)`,
    {},
    { next: { revalidate: 60 } },
  );
}

// ── Site Config ───────────────────────────────────

export async function getCoreValues(): Promise<SanityCoreValue[]> {
  if (!isSanityConfigured) {
    return staticCoreValues as unknown as SanityCoreValue[];
  }
  const client = getSanityClient();
  return client.fetch(
    `*[_type == "coreValue"] | order(order asc)`,
    {},
    { next: { revalidate: 300 } },
  );
}

export async function getImpactStats(): Promise<SanityImpactStat[]> {
  if (!isSanityConfigured) {
    return staticImpactStats as unknown as SanityImpactStat[];
  }
  const client = getSanityClient();
  return client.fetch(
    `*[_type == "impactStat"] | order(order asc)`,
    {},
    { next: { revalidate: 300 } },
  );
}
