/**
 * GROQ queries for fetching content from Sanity CMS.
 * Each function tries Sanity first and falls back to static data
 * when Sanity is not configured (no SANITY_PROJECT_ID).
 */

// Static data fallbacks
import {
	albums as staticAlbums,
	getAlbum as staticGetAlbum,
} from "@/data/albums";
import { blogPosts, getBlogPost as staticGetBlogPost } from "@/data/blog-posts";
import { founders as staticFounders } from "@/data/founders";
import { galleryItems as staticGalleryItems } from "@/data/gallery";
import {
	getCompletedProjects as staticGetCompleted,
	getFeaturedProjects as staticGetFeatured,
	getUpcomingProjects as staticGetUpcoming,
	projects as staticProjects,
} from "@/data/projects";
import { resources as staticResources } from "@/data/resources";
import {
	coreValues as staticCoreValues,
	impactStats as staticImpactStats,
} from "@/data/site";
import { getSanityClient, isSanityConfigured } from "./client";
import type {
	SanityAlbum,
	SanityBlogPost,
	SanityCoreValue,
	SanityFounder,
	SanityGalleryItem,
	SanityImpactStat,
	SanityProject,
	SanityResource,
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

// ── Albums ────────────────────────────────────────

export async function getAlbums(): Promise<SanityAlbum[]> {
	if (!isSanityConfigured) {
		return staticAlbums as unknown as SanityAlbum[];
	}
	const client = getSanityClient();
	return client.fetch(
		`*[_type == "album"] | order(date desc){ _id, _type, "slug": slug.current, title, description, category, date, photoCount, photos, coverImage }`,
		{},
		{ next: { revalidate: 60 } },
	);
}

export async function getAlbum(slug: string): Promise<SanityAlbum | null> {
	if (!isSanityConfigured) {
		const album = staticGetAlbum(slug);
		return (album as unknown as SanityAlbum) ?? null;
	}
	const client = getSanityClient();
	return client.fetch(
		`*[_type == "album" && slug.current == $slug][0]{ _id, _type, "slug": slug.current, title, description, category, date, photoCount, photos, coverImage }`,
		{ slug },
		{ next: { revalidate: 60 } },
	);
}

export async function getAlbumSlugs(): Promise<string[]> {
	if (!isSanityConfigured) {
		return staticAlbums.map((a) => a.slug);
	}
	const client = getSanityClient();
	const results = await client.fetch<Array<{ slug: string }>>(
		`*[_type == "album"]{ "slug": slug.current }`,
		{},
		{ next: { revalidate: 60 } },
	);
	return results.map((r) => r.slug);
}

// ── Resources ─────────────────────────────────────

export async function getResources(): Promise<SanityResource[]> {
	if (!isSanityConfigured) {
		return staticResources as unknown as SanityResource[];
	}
	const client = getSanityClient();
	return client.fetch(
		`*[_type == "resource"] | order(date desc){ _id, _type, "id": _id, title, description, category, fileType, fileSize, date, fileUrl }`,
		{},
		{ next: { revalidate: 60 } },
	);
}
