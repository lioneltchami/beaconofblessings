import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ResourcesPage from "@/app/resources/page";
import { resourcesPageContent } from "@/data/pages";
import { resources } from "@/data/resources";

vi.mock("@/lib/sanity/queries", () => ({
	getResources: vi.fn(() => Promise.resolve(resources)),
	getResourcesPage: vi.fn(() => Promise.resolve(resourcesPageContent)),
}));

describe("ResourcesPage", () => {
	it("links document visitors to the project timeline", async () => {
		const result = await ResourcesPage();
		render(result);

		const link = screen.getByRole("link", { name: /view projects/i });
		expect(link).toHaveAttribute("href", "/projects");
		expect(screen.getByText(/project timeline/i)).toBeInTheDocument();
	});

	it("publishes the first project financial report as a downloadable resource", async () => {
		const result = await ResourcesPage();
		render(result);

		expect(
			screen.getByText(/first project financial report/i),
		).toBeInTheDocument();
		expect(screen.getByText(/N1,372,200/i)).toBeInTheDocument();
		const downloadLinks = screen.getAllByRole("link", { name: /download/i });
		expect(
			downloadLinks.some(
				(link) =>
					link.getAttribute("href") ===
					"https://beaconofblessings.org/documents/beacon-of-blessings-first-project-financial-report-2024.pdf",
			),
		).toBe(true);
	});
});
