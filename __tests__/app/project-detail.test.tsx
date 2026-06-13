import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectDetailPage, {
	generateMetadata,
	generateStaticParams,
} from "@/app/projects/[slug]/page";
import {
	getProjectBySlug as staticGetProjectBySlug,
	getProjectSlugs as staticGetProjectSlugs,
} from "@/data/projects";

vi.mock("@/lib/sanity/queries", () => ({
	getProject: vi.fn((slug: string) => Promise.resolve(staticGetProjectBySlug(slug))),
	getProjectSlugs: vi.fn(() => Promise.resolve(staticGetProjectSlugs())),
}));

describe("ProjectDetailPage", () => {
	it("generates static params for project detail pages", async () => {
		await expect(generateStaticParams()).resolves.toContainEqual({
			slug: "school-supplies-drive-2024",
		});
	});

	it("renders an archived project record with report link", async () => {
		const result = await ProjectDetailPage({
			params: Promise.resolve({ slug: "school-supplies-drive-2024" }),
		});
		render(result);

		expect(
			screen.getByRole("heading", {
				level: 1,
				name: /first project - educational supplies outreach 2024/i,
			}),
		).toBeInTheDocument();
		expect(screen.getByText(/archived project/i)).toBeInTheDocument();
		expect(screen.getByRole("link", { name: /view final report/i })).toHaveAttribute(
			"href",
			"/documents/beacon-of-blessings-first-project-financial-report-2024.pdf",
		);
	});

	it("renders the youth Bible project term of reference", async () => {
		const result = await ProjectDetailPage({
			params: Promise.resolve({ slug: "youth-bible-distribution-june-2026" }),
		});
		render(result);

		expect(
			screen.getByRole("heading", {
				level: 1,
				name: /youth bible distribution outreach/i,
			}),
		).toBeInTheDocument();
		expect(screen.getByText(/project lead/i)).toBeInTheDocument();
		expect(screen.getByText("Femi")).toBeInTheDocument();
		expect(screen.getAllByText(/N150,000 - N200,000/i).length).toBeGreaterThan(0);
		expect(screen.getByText(/term of reference/i)).toBeInTheDocument();
		expect(screen.getByText(/receipts and a short report/i)).toBeInTheDocument();
	});

	it("uses project content in metadata", async () => {
		const metadata = await generateMetadata({
			params: Promise.resolve({ slug: "school-supplies-drive-2024" }),
		});

		expect(metadata.title).toContain("First Project");
		expect(metadata.description).toContain("Final archive record");
	});
});
