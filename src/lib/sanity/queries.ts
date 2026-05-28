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
	aboutPageContent as staticAboutPageContent,
	contactPageContent as staticContactPageContent,
	donatePageContent as staticDonatePageContent,
	galleryPageContent as staticGalleryPageContent,
	homePageContent as staticHomePageContent,
	impactPageContent as staticImpactPageContent,
	projectsPageContent as staticProjectsPageContent,
	programsPageContent as staticProgramsPageContent,
	resourcesPageContent as staticResourcesPageContent,
	transparencyPageContent as staticTransparencyPageContent,
} from "@/data/pages";
import {
	getProgramBySlug as staticGetProgramBySlug,
	getProgramSlugs as staticGetProgramSlugs,
	programs as staticPrograms,
} from "@/data/programs";
import {
	getCompletedProjects as staticGetCompleted,
	getCurrentProjects as staticGetCurrent,
	getFeaturedProjects as staticGetFeatured,
	getUpcomingProjects as staticGetUpcoming,
	projects as staticProjects,
} from "@/data/projects";
import { resources as staticResources } from "@/data/resources";
import {
	coreValues as staticCoreValues,
	footerTrustLinks as staticFooterTrustLinks,
	impactStats as staticImpactStats,
	navLinks as staticNavLinks,
	siteConfig as staticSiteConfig,
	socialLinks as staticSocialLinks,
} from "@/data/site";
import {
	getProjectLifecycle,
	sortProjectsByLifecycleDate,
	type ProjectLifecycleStatus,
} from "@/lib/project-lifecycle";
import { getSanityClient, isSanityConfigured } from "./client";
import type {
	AboutPageContent,
	ContactPageContent,
	DonatePageContent,
	GalleryPageContent,
	HomePageContent,
	ImpactPageContent,
	ProgramsPageContent,
	ProjectsPageContent,
	ResourcesPageContent,
	SanityAlbum,
	SanityBlogPost,
	SanityCoreValue,
	SanityFounder,
	SanityGalleryItem,
	SanityImpactStat,
	SanityProgram,
	SanityProject,
	SanityResource,
	SanitySiteConfig,
	TransparencyPageContent,
} from "./types";

export const SANITY_IMAGE_PROJECTION = `_type, alt, asset->{ _id, url }`;

export const PROJECT_PROJECTION = `{ _id, _type, "slug": slug.current, title, status, lifecycleMode, startDate, endDate, date, budget, description, impact, featured, image{ ${SANITY_IMAGE_PROJECTION} } }`;

export const BLOG_POST_PROJECTION = `{ _id, _type, "slug": slug.current, title, excerpt, content, author, date, category, readTime, tags, image{ ${SANITY_IMAGE_PROJECTION} } }`;

export const GALLERY_ITEM_PROJECTION = `{ _id, _type, title, description, category, date, image{ ${SANITY_IMAGE_PROJECTION} } }`;

export const ALBUM_PROJECTION = `{ _id, _type, "slug": slug.current, title, description, category, date, photoCount, photos[]{ id, title, description, image{ ${SANITY_IMAGE_PROJECTION} } }, coverImage{ ${SANITY_IMAGE_PROJECTION} } }`;

export const RESOURCE_PROJECTION = `{ _id, _type, "id": _id, title, description, category, fileType, fileSize, date, "fileUrl": coalesce(fileUrl, file.asset->url), file{ asset->{ url } } }`;

export const PROGRAM_PROJECTION = `{ _id, _type, "slug": slug.current, title, kicker, summary, location, status, whoBenefits, whatHappens, giftUses[]{ amount, title, description }, outcomes, proofPoints, ctaLabel, donationCta, featured, visible, order, image{ ${SANITY_IMAGE_PROJECTION} } }`;

export const SITE_CONFIG_PROJECTION = `{ _id, _type, name, legalName, tagline, description, url, email, phone, address, officeHours, founded, registrationStatus, serviceArea, logoInitials, navLinks[]{ label, href, external }, footerTrustLinks[]{ label, href, external }, socialLinks[]{ label, href, external } }`;

export const PAGE_CONTENT_PROJECTION = `{ ..., hero{ ..., images[]{ ..., image{ ${SANITY_IMAGE_PROJECTION} } } }, donorConfidence{ ..., cards[] }, fieldMoments{ ..., images[]{ ..., image{ ${SANITY_IMAGE_PROJECTION} } } }, programsIntro, giftSection{ ..., image{ ..., image{ ${SANITY_IMAGE_PROJECTION} } }, gifts[], cta }, finalCta{ ..., image{ ..., image{ ${SANITY_IMAGE_PROJECTION} } }, ctas[] }, proofCards[], pillars[], actionPaths[], story{ ..., cards[] }, milestones[], operatingPrinciples[], report, metrics[], outcomePathway[], visualProof{ ..., images[]{ ..., image{ ${SANITY_IMAGE_PROJECTION} } } }, summaryCards[], facts[], boardMembers[], donationUse[], stewardshipStandards[], reportingCadence, documentStatuses[], policyLinks[], responseWindow{ ..., image{ ..., image{ ${SANITY_IMAGE_PROJECTION} } }, getInvolved[], trustNotes[] }`;

function hasItems<T>(items: T[] | null | undefined): items is T[] {
	return Array.isArray(items) && items.length > 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeFallback<T>(fallback: T, override: Partial<T> | null | undefined): T {
	if (!isRecord(fallback) || !isRecord(override)) {
		return (override ?? fallback) as T;
	}

	const merged: Record<string, unknown> = { ...fallback };
	for (const [key, value] of Object.entries(override)) {
		if (value === undefined || value === null) continue;
		if (value === "" && typeof merged[key] === "string") continue;
		if (Array.isArray(value)) {
			if (value.length === 0) continue;
			const fallbackArray = Array.isArray(merged[key]) ? merged[key] : [];
			merged[key] = value.map((item, index) => {
				const fallbackItem = fallbackArray[index];
				return isRecord(fallbackItem) && isRecord(item)
					? mergeFallback(fallbackItem, item)
					: item;
			});
			continue;
		}
		const fallbackValue = merged[key];
		merged[key] = isRecord(fallbackValue) && isRecord(value)
			? mergeFallback(fallbackValue, value)
			: value;
	}
	return merged as T;
}

function withImageSrc<T extends { image?: { asset?: { url?: string }; alt?: string }; src?: string; alt?: string }>(
	image: T,
): Omit<T, "image"> & { src: string; alt: string } {
	const { image: sanityImage, ...rest } = image;
	return {
		...rest,
		src: image.src ?? sanityImage?.asset?.url ?? "",
		alt: image.alt ?? sanityImage?.alt ?? "",
	};
}

function normalizePageImages<T>(content: T): T {
	const copy = structuredClone(content) as Record<string, unknown>;

	function normalize(value: unknown): unknown {
		if (Array.isArray(value)) return value.map(normalize);
		if (!isRecord(value)) return value;
		if ("image" in value && isRecord(value.image)) {
			const normalized = withImageSrc(value as { image?: { asset?: { url?: string }; alt?: string }; src?: string; alt?: string });
			return Object.fromEntries(
				Object.entries(normalized).map(([key, child]) => [key, normalize(child)]),
			);
		}
		return Object.fromEntries(
			Object.entries(value).map(([key, child]) => [key, normalize(child)]),
		);
	}

	return normalize(copy) as T;
}

async function fetchWithFallback<T>(
	fallback: T,
	query: string,
	params: Record<string, unknown> = {},
	options: { merge?: boolean } = {},
): Promise<T> {
	if (!isSanityConfigured) return fallback;
	try {
		const client = getSanityClient();
		const result = await client.fetch<Partial<T> | null>(
			query,
			params,
			{ next: { revalidate: 60 } },
		);
		if (!result) return fallback;
		const normalized = normalizePageImages(result);
		return options.merge ? mergeFallback(fallback, normalized) : (normalized as T);
	} catch {
		return fallback;
	}
}

async function fetchListWithFallback<T>(
	fallback: T[],
	query: string,
	params: Record<string, unknown> = {},
): Promise<T[]> {
	if (!isSanityConfigured) return fallback;
	try {
		const client = getSanityClient();
		const result = await client.fetch<T[]>(
			query,
			params,
			{ next: { revalidate: 60 } },
		);
		return hasItems(result) ? result : fallback;
	} catch {
		return fallback;
	}
}

// ── Site Settings and Page Content ───────────────

export async function getSiteSettings(): Promise<SanitySiteConfig> {
	const fallback = {
		_id: "static-site-config",
		_type: "siteConfig",
		...staticSiteConfig,
		logoInitials: "BB",
		navLinks: [...staticNavLinks],
		footerTrustLinks: [...staticFooterTrustLinks],
		socialLinks: [...staticSocialLinks],
	} as SanitySiteConfig;

	return fetchWithFallback(
		fallback,
		`*[_id == "siteConfig"][0]${SITE_CONFIG_PROJECTION}`,
		{},
		{ merge: true },
	);
}

export async function getHomePage(): Promise<HomePageContent> {
	return fetchWithFallback(
		staticHomePageContent,
		`*[_id == "homePage"][0]${PAGE_CONTENT_PROJECTION}`,
		{},
		{ merge: true },
	);
}

export async function getProgramsPage(): Promise<ProgramsPageContent> {
	return fetchWithFallback(
		staticProgramsPageContent,
		`*[_id == "programsPage"][0]${PAGE_CONTENT_PROJECTION}`,
		{},
		{ merge: true },
	);
}

export async function getAboutPage(): Promise<AboutPageContent> {
	return fetchWithFallback(
		staticAboutPageContent,
		`*[_id == "aboutPage"][0]${PAGE_CONTENT_PROJECTION}`,
		{},
		{ merge: true },
	);
}

export async function getImpactPage(): Promise<ImpactPageContent> {
	return fetchWithFallback(
		staticImpactPageContent,
		`*[_id == "impactPage"][0]${PAGE_CONTENT_PROJECTION}`,
		{},
		{ merge: true },
	);
}

export async function getTransparencyPage(): Promise<TransparencyPageContent> {
	return fetchWithFallback(
		staticTransparencyPageContent,
		`*[_id == "transparencyPage"][0]${PAGE_CONTENT_PROJECTION}`,
		{},
		{ merge: true },
	);
}

export async function getContactPage(): Promise<ContactPageContent> {
	return fetchWithFallback(
		staticContactPageContent,
		`*[_id == "contactPage"][0]${PAGE_CONTENT_PROJECTION}`,
		{},
		{ merge: true },
	);
}

export async function getDonatePage(): Promise<DonatePageContent> {
	return fetchWithFallback(
		staticDonatePageContent,
		`*[_id == "donatePage"][0]${PAGE_CONTENT_PROJECTION}`,
		{},
		{ merge: true },
	);
}

export async function getProjectsPage(): Promise<ProjectsPageContent> {
	return fetchWithFallback(
		staticProjectsPageContent,
		`*[_id == "projectsPage"][0]${PAGE_CONTENT_PROJECTION}`,
		{},
		{ merge: true },
	);
}

export async function getGalleryPage(): Promise<GalleryPageContent> {
	return fetchWithFallback(
		staticGalleryPageContent,
		`*[_id == "galleryPage"][0]${PAGE_CONTENT_PROJECTION}`,
		{},
		{ merge: true },
	);
}

export async function getResourcesPage(): Promise<ResourcesPageContent> {
	return fetchWithFallback(
		staticResourcesPageContent,
		`*[_id == "resourcesPage"][0]${PAGE_CONTENT_PROJECTION}`,
		{},
		{ merge: true },
	);
}

// ── Programs ─────────────────────────────────────

export async function getPrograms(): Promise<SanityProgram[]> {
	return fetchListWithFallback(
		staticPrograms as SanityProgram[],
		`*[_type == "program" && visible != false] | order(order asc, title asc)${PROGRAM_PROJECTION}`,
	);
}

export async function getProgram(slug: string): Promise<SanityProgram | null> {
	if (!isSanityConfigured) {
		return (staticGetProgramBySlug(slug) as SanityProgram | undefined) ?? null;
	}
	try {
		const client = getSanityClient();
		const result = await client.fetch<SanityProgram | null>(
			`*[_type == "program" && visible != false && slug.current == $slug][0]${PROGRAM_PROJECTION}`,
			{ slug },
			{ next: { revalidate: 60 } },
		);
		return result ?? ((staticGetProgramBySlug(slug) as SanityProgram | undefined) ?? null);
	} catch {
		return (staticGetProgramBySlug(slug) as SanityProgram | undefined) ?? null;
	}
}

export async function getProgramSlugs(): Promise<string[]> {
	if (!isSanityConfigured) return staticGetProgramSlugs();
	try {
		const client = getSanityClient();
		const results = await client.fetch<Array<{ slug: string }>>(
			`*[_type == "program" && visible != false]{ "slug": slug.current }`,
			{},
			{ next: { revalidate: 60 } },
		);
		const slugs = results.map((r) => r.slug).filter(Boolean);
		return hasItems(slugs) ? slugs : staticGetProgramSlugs();
	} catch {
		return staticGetProgramSlugs();
	}
}

// ── Projects ──────────────────────────────────────

export async function getProjects(): Promise<SanityProject[]> {
	return fetchListWithFallback(
		staticProjects as unknown as SanityProject[],
		`*[_type == "project"] | order(coalesce(startDate, date) asc)${PROJECT_PROJECTION}`,
	);
}

async function getProjectsByLifecycleStatus(
	status: ProjectLifecycleStatus,
	fallback: SanityProject[],
): Promise<SanityProject[]> {
	const projects = isSanityConfigured ? await getProjects() : fallback;
	return sortProjectsByLifecycleDate(
		projects.filter((project) => getProjectLifecycle(project) === status),
		status,
	);
}

export async function getCompletedProjects(): Promise<SanityProject[]> {
	return getProjectsByLifecycleStatus(
		"completed",
		staticGetCompleted() as unknown as SanityProject[],
	);
}

export async function getCurrentProjects(): Promise<SanityProject[]> {
	return getProjectsByLifecycleStatus(
		"current",
		staticGetCurrent() as unknown as SanityProject[],
	);
}

export async function getUpcomingProjects(): Promise<SanityProject[]> {
	return getProjectsByLifecycleStatus(
		"upcoming",
		staticGetUpcoming() as unknown as SanityProject[],
	);
}

export async function getFeaturedProjects(): Promise<SanityProject[]> {
	return fetchListWithFallback(
		staticGetFeatured() as unknown as SanityProject[],
		`*[_type == "project" && featured == true] | order(date desc)${PROJECT_PROJECTION}`,
	);
}

// ── Blog Posts ────────────────────────────────────

export async function getBlogPosts(): Promise<SanityBlogPost[]> {
	return fetchListWithFallback(
		blogPosts as unknown as SanityBlogPost[],
		`*[_type == "blogPost"] | order(date desc)${BLOG_POST_PROJECTION}`,
	);
}

export async function getBlogPost(
	slug: string,
): Promise<SanityBlogPost | null> {
	if (!isSanityConfigured) {
		const post = staticGetBlogPost(slug);
		return (post as unknown as SanityBlogPost) ?? null;
	}
	try {
		const client = getSanityClient();
		const result = await client.fetch<SanityBlogPost | null>(
			`*[_type == "blogPost" && slug.current == $slug][0]${BLOG_POST_PROJECTION}`,
			{ slug },
			{ next: { revalidate: 60 } },
		);
		return result ?? ((staticGetBlogPost(slug) as unknown as SanityBlogPost) ?? null);
	} catch {
		return (staticGetBlogPost(slug) as unknown as SanityBlogPost) ?? null;
	}
}

export async function getBlogSlugs(): Promise<string[]> {
	if (!isSanityConfigured) {
		return blogPosts.map((p) => p.slug);
	}
	try {
		const client = getSanityClient();
		const results = await client.fetch<Array<{ slug: string }>>(
			`*[_type == "blogPost"]{ "slug": slug.current }`,
			{},
			{ next: { revalidate: 60 } },
		);
		const slugs = results.map((r) => r.slug).filter(Boolean);
		return hasItems(slugs) ? slugs : blogPosts.map((p) => p.slug);
	} catch {
		return blogPosts.map((p) => p.slug);
	}
}

// ── Founders ──────────────────────────────────────

export async function getFounders(): Promise<SanityFounder[]> {
	return fetchListWithFallback(
		staticFounders as unknown as SanityFounder[],
		`*[_type == "founder"] | order(order asc)`,
	);
}

// ── Gallery ───────────────────────────────────────

export async function getGalleryItems(): Promise<SanityGalleryItem[]> {
	return fetchListWithFallback(
		staticGalleryItems as unknown as SanityGalleryItem[],
		`*[_type == "galleryItem"] | order(date desc)${GALLERY_ITEM_PROJECTION}`,
	);
}

// ── Site Config ───────────────────────────────────

export async function getCoreValues(): Promise<SanityCoreValue[]> {
	return fetchListWithFallback(
		staticCoreValues as unknown as SanityCoreValue[],
		`*[_type == "coreValue"] | order(order asc)`,
	);
}

export async function getImpactStats(): Promise<SanityImpactStat[]> {
	return fetchListWithFallback(
		staticImpactStats as unknown as SanityImpactStat[],
		`*[_type == "impactStat"] | order(order asc)`,
	);
}

// ── Albums ────────────────────────────────────────

export async function getAlbums(): Promise<SanityAlbum[]> {
	return fetchListWithFallback(
		staticAlbums as unknown as SanityAlbum[],
		`*[_type == "album"] | order(date desc)${ALBUM_PROJECTION}`,
	);
}

export async function getAlbum(slug: string): Promise<SanityAlbum | null> {
	if (!isSanityConfigured) {
		const album = staticGetAlbum(slug);
		return (album as unknown as SanityAlbum) ?? null;
	}
	try {
		const client = getSanityClient();
		const result = await client.fetch<SanityAlbum | null>(
			`*[_type == "album" && slug.current == $slug][0]${ALBUM_PROJECTION}`,
			{ slug },
			{ next: { revalidate: 60 } },
		);
		return result ?? ((staticGetAlbum(slug) as unknown as SanityAlbum) ?? null);
	} catch {
		return (staticGetAlbum(slug) as unknown as SanityAlbum) ?? null;
	}
}

export async function getAlbumSlugs(): Promise<string[]> {
	if (!isSanityConfigured) {
		return staticAlbums.map((a) => a.slug);
	}
	try {
		const client = getSanityClient();
		const results = await client.fetch<Array<{ slug: string }>>(
			`*[_type == "album"]{ "slug": slug.current }`,
			{},
			{ next: { revalidate: 60 } },
		);
		const slugs = results.map((r) => r.slug).filter(Boolean);
		return hasItems(slugs) ? slugs : staticAlbums.map((a) => a.slug);
	} catch {
		return staticAlbums.map((a) => a.slug);
	}
}

// ── Resources ─────────────────────────────────────

export async function getResources(): Promise<SanityResource[]> {
	return fetchListWithFallback(
		staticResources as unknown as SanityResource[],
		`*[_type == "resource"] | order(date desc)${RESOURCE_PROJECTION}`,
	);
}
