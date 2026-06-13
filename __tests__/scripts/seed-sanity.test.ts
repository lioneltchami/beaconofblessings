import { describe, expect, it } from "vitest";
import { buildDocs } from "@/../scripts/seed-sanity";

function findDoc(type: string, id: string) {
	return buildDocs().find((doc) => doc._type === type && doc._id === id);
}

describe("Sanity seed documents", () => {
	it("builds the expected editable website document set", () => {
		const docs = buildDocs();
		const counts = docs.reduce<Record<string, number>>((result, doc) => {
			result[doc._type] = (result[doc._type] ?? 0) + 1;
			return result;
		}, {});

		expect(docs).toHaveLength(47);
		expect(counts).toEqual({
			aboutPage: 1,
			album: 5,
			blogPost: 3,
			contactPage: 1,
			coreValue: 4,
			donatePage: 1,
			founder: 2,
			galleryPage: 1,
			homePage: 1,
			impactPage: 1,
			impactStat: 4,
			partnerPage: 1,
			program: 3,
			programsPage: 1,
			project: 4,
			projectArchiveRecord: 1,
			projectsPage: 1,
			resource: 9,
			resourcesPage: 1,
			siteConfig: 1,
			transparencyPage: 1,
		});
	});

	it("uses deterministic singleton and collection ids", () => {
		expect(findDoc("siteConfig", "siteConfig")).toBeDefined();
		expect(findDoc("homePage", "homePage")).toBeDefined();
		expect(findDoc("partnerPage", "partnerPage")).toMatchObject({
			hero: expect.objectContaining({
				title: "Partner with Beacon of Blessings",
			}),
		});
		expect(findDoc("program", "program.school-readiness-kits")).toMatchObject({
			title: "School Readiness Kits",
			visible: true,
		});
		expect(findDoc("resource", "reg-1")).toMatchObject({
			title: "CAC Certificate of Incorporation",
		});
		expect(
			findDoc("projectArchiveRecord", "projectArchiveRecord.school-supplies-drive-2024"),
		).toMatchObject({
			title: "2024 Educational Supplies Outreach Archive",
		});
		expect(findDoc("project", "project.school-supplies-drive-2024")).toMatchObject({
			archiveRecord: {
				_type: "reference",
				_ref: "projectArchiveRecord.school-supplies-drive-2024",
			},
		});
	});

	it("serializes slugs in the shape Sanity GROQ queries expect", () => {
		const program = findDoc("program", "program.school-readiness-kits");
		const blogPost = findDoc(
			"blogPost",
			"blogPost.transforming-lives-through-education",
		);

		expect(program?.slug).toEqual({
			_type: "slug",
			current: "school-readiness-kits",
		});
		expect(blogPost?.slug).toEqual({
			_type: "slug",
			current: "transforming-lives-through-education",
		});
	});

	it("adds stable keys to editable arrays of objects", () => {
		const homePage = findDoc("homePage", "homePage") as {
			donorConfidence?: { cards?: Array<{ _key?: string }> };
			hero?: { ctas?: Array<{ _key?: string }> };
		};

		expect(homePage.hero?.ctas?.every((item) => item._key)).toBe(true);
		expect(homePage.donorConfidence?.cards?.every((item) => item._key)).toBe(
			true,
		);
	});

	it("does not leave undefined values in seeded documents", () => {
		expect(JSON.stringify(buildDocs())).not.toContain(":undefined");
	});
});
