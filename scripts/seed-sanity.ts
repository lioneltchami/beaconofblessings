import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { albums } from "../src/data/albums";
import { blogPosts } from "../src/data/blog-posts";
import { founders } from "../src/data/founders";
import {
	boardMembers,
	documentStatuses,
	donationUse,
	impactMetrics,
	impactReport,
	outcomePathway,
	policyLinks,
	reportingCadence,
	stewardshipStandards,
	transparencyFacts,
} from "../src/data/impact";
import {
	aboutPageContent,
	contactPageContent,
	donatePageContent,
	galleryPageContent,
	homePageContent,
	impactPageContent,
	projectsPageContent,
	programsPageContent,
	resourcesPageContent,
	transparencyPageContent,
} from "../src/data/pages";
import { programs } from "../src/data/programs";
import { projects } from "../src/data/projects";
import { resources } from "../src/data/resources";
import {
	coreValues,
	footerTrustLinks,
	impactStats,
	navLinks,
	siteConfig,
	socialLinks,
} from "../src/data/site";

export type SeedDoc = Record<string, unknown> & {
	_id: string;
	_type: string;
};

function loadDotEnv() {
	const envPath = resolve(process.cwd(), ".env");
	if (!existsSync(envPath)) return;

	for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) continue;
		const separator = trimmed.indexOf("=");
		if (separator === -1) continue;
		const key = trimmed.slice(0, separator).trim();
		const value = trimmed
			.slice(separator + 1)
			.trim()
			.replace(/^['"]|['"]$/g, "");
		if (!process.env[key]) process.env[key] = value;
	}
}

function slug(value: string) {
	return { _type: "slug", current: value };
}

function slugify(value: string) {
	return value
		.toLowerCase()
		.replace(/['’]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function withStableKeys(value: unknown, path = "item"): unknown {
	if (Array.isArray(value)) {
		return value.map((item, index) => {
			const child = withStableKeys(item, `${path}-${index}`);
			if (child && typeof child === "object" && !Array.isArray(child)) {
				const record = child as Record<string, unknown>;
				return {
					_key:
						typeof record._key === "string"
							? record._key
								: slugify(
										String(
											record.id ??
												record.slug ??
												record.title ??
												record.label ??
												record.name ??
												`${path}-${index}`,
										),
									),
					...record,
				};
			}
			return child;
		});
	}

	if (!value || typeof value !== "object") return value;
	const result: Record<string, unknown> = {};
	for (const [key, child] of Object.entries(value)) {
		if (child !== undefined) result[key] = withStableKeys(child, `${path}-${key}`);
	}
	return result;
}

function clean<T>(value: T): T {
	if (Array.isArray(value)) {
		return value.map((item) => clean(item)).filter((item) => item !== undefined) as T;
	}
	if (!value || typeof value !== "object") return value;

	const result: Record<string, unknown> = {};
	for (const [key, child] of Object.entries(value)) {
		if (child === undefined) continue;
		result[key] = clean(child);
	}
	return result as T;
}

function pageDoc(_id: string, _type: string, content: Record<string, unknown>): SeedDoc {
	return clean(withStableKeys({ _id, _type, ...content }) as SeedDoc);
}

export function buildDocs(): SeedDoc[] {
	return [
		clean(
			withStableKeys({
				_id: "siteConfig",
				_type: "siteConfig",
				...siteConfig,
				logoInitials: "BB",
				navLinks: [...navLinks],
				footerTrustLinks: [...footerTrustLinks],
				socialLinks: [...socialLinks].map((link) => ({ ...link, external: true })),
			}) as SeedDoc,
		),
		pageDoc("homePage", "homePage", homePageContent as unknown as Record<string, unknown>),
		pageDoc("programsPage", "programsPage", programsPageContent as unknown as Record<string, unknown>),
		pageDoc("aboutPage", "aboutPage", aboutPageContent as unknown as Record<string, unknown>),
		pageDoc("impactPage", "impactPage", {
			...impactPageContent,
			report: impactReport,
			metrics: impactMetrics,
			outcomePathway,
		} as Record<string, unknown>),
		pageDoc("transparencyPage", "transparencyPage", {
			...transparencyPageContent,
			facts: transparencyFacts,
			boardMembers,
			donationUse,
			stewardshipStandards,
			reportingCadence,
			documentStatuses,
			policyLinks,
		} as Record<string, unknown>),
		pageDoc("contactPage", "contactPage", contactPageContent as unknown as Record<string, unknown>),
		pageDoc("donatePage", "donatePage", donatePageContent as unknown as Record<string, unknown>),
		pageDoc("projectsPage", "projectsPage", projectsPageContent as unknown as Record<string, unknown>),
		pageDoc("galleryPage", "galleryPage", galleryPageContent as unknown as Record<string, unknown>),
		pageDoc("resourcesPage", "resourcesPage", resourcesPageContent as unknown as Record<string, unknown>),
		...programs.map((program, index) =>
			clean(
				withStableKeys({
					_id: `program.${program.slug}`,
					_type: "program",
					...program,
					slug: slug(program.slug),
					featured: true,
					visible: true,
					order: index + 1,
				}) as SeedDoc,
			),
		),
		...projects.map((project) =>
			clean(
				withStableKeys({
					_id: `project.${project.slug}`,
					_type: "project",
					...project,
					slug: slug(project.slug),
				}) as SeedDoc,
			),
		),
		...blogPosts.map((post) =>
			clean(
				withStableKeys({
					_id: `blogPost.${post.slug}`,
					_type: "blogPost",
					...post,
					slug: slug(post.slug),
				}) as SeedDoc,
			),
		),
		...founders.map((founder, index) =>
			clean(
				withStableKeys({
					_id: `founder.${slugify(founder.name)}`,
					_type: "founder",
					...founder,
					order: index + 1,
				}) as SeedDoc,
			),
		),
		...coreValues.map((value, index) =>
			clean(
				withStableKeys({
					_id: `coreValue.${slugify(value.title)}`,
					_type: "coreValue",
					...value,
					order: index + 1,
				}) as SeedDoc,
			),
		),
		...impactStats.map((stat, index) =>
			clean(
				withStableKeys({
					_id: `impactStat.${slugify(stat.label)}`,
					_type: "impactStat",
					...stat,
					order: index + 1,
				}) as SeedDoc,
			),
		),
		...albums.map((album) =>
			clean(
				withStableKeys({
					_id: `album.${album.slug}`,
					_type: "album",
					...album,
					slug: slug(album.slug),
				}) as SeedDoc,
			),
		),
		...resources.map((resource) =>
			clean(
				withStableKeys({
					_id: resource.id,
					_type: "resource",
					...resource,
				}) as SeedDoc,
			),
		),
	];
}

async function main() {
	loadDotEnv();

	const projectId = process.env.SANITY_PROJECT_ID;
	const dataset = process.env.SANITY_DATASET ?? "production";
	const token = process.env.SANITY_TOKEN;
	const apiVersion = process.env.SANITY_API_VERSION ?? "2024-01-01";
	const dryRun = process.argv.includes("--dry-run");
	const noOverwrite = process.argv.includes("--no-overwrite");

	if (!projectId || !dataset || !token) {
		throw new Error(
			"Missing SANITY_PROJECT_ID, SANITY_DATASET, or SANITY_TOKEN. Refusing to seed.",
		);
	}

	const docs = buildDocs();
	const byType = docs.reduce<Record<string, number>>((counts, doc) => {
		counts[doc._type] = (counts[doc._type] ?? 0) + 1;
		return counts;
	}, {});

	console.log(`Prepared ${docs.length} Sanity documents.`);
	console.log(
		Object.entries(byType)
			.map(([type, count]) => `${type}: ${count}`)
			.join(", "),
	);

	const client = createClient({
		projectId,
		dataset,
		apiVersion,
		token,
		useCdn: false,
	});

	if (dryRun) {
		const existing = await client.fetch<string[]>(
			`*[_id in $ids]._id`,
			{ ids: docs.map((doc) => doc._id) },
		);
		const existingIds = new Set(existing);
		for (const doc of docs) {
			console.log(`${existingIds.has(doc._id) ? "update" : "create"} ${doc._type} ${doc._id}`);
		}
		console.log("Dry run only. No documents were written.");
		return;
	}

	const chunkSize = 25;
	for (let index = 0; index < docs.length; index += chunkSize) {
		const transaction = client.transaction();
		for (const doc of docs.slice(index, index + chunkSize)) {
			if (noOverwrite) {
				transaction.createIfNotExists(doc);
			} else {
				transaction.createOrReplace(doc);
			}
		}
		await transaction.commit();
	}

	console.log(
		`${noOverwrite ? "Created missing" : "Seeded"} ${docs.length} documents into Sanity.`,
	);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	main().catch((error) => {
		console.error(error instanceof Error ? error.message : error);
		process.exit(1);
	});
}
