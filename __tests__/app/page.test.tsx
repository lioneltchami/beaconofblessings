import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "@/app/page";
// Static data imports for mock return values
import {
	getFeaturedProjects,
	getFeaturedProjects as staticGetFeatured,
} from "@/data/projects";
import { impactStats, impactStats as staticImpactStats } from "@/data/site";

vi.mock("@/lib/sanity/queries", () => ({
	getFeaturedProjects: vi.fn(() => Promise.resolve(staticGetFeatured())),
	getImpactStats: vi.fn(() => Promise.resolve([...staticImpactStats])),
}));

describe("HomePage", () => {
	it("renders the organization name as h1 heading", async () => {
		const result = await HomePage();
		render(result);
		expect(
			screen.getByRole("heading", { level: 1, name: /beacon of blessings/i }),
		).toBeInTheDocument();
	});

	it("renders the tagline", async () => {
		const result = await HomePage();
		render(result);
		expect(
			screen.getByText(/illuminating futures through education/i),
		).toBeInTheDocument();
	});

	it("renders all four impact stats", async () => {
		const result = await HomePage();
		render(result);
		for (const stat of impactStats) {
			expect(screen.getByText(stat.value)).toBeInTheDocument();
			expect(screen.getByText(stat.label)).toBeInTheDocument();
		}
	});

	it("renders the mission section heading", async () => {
		const result = await HomePage();
		render(result);
		expect(
			screen.getByText(
				/sharing the love of christ through compassionate service/i,
			),
		).toBeInTheDocument();
	});

	it("renders featured project titles", async () => {
		const result = await HomePage();
		render(result);
		const featured = getFeaturedProjects();
		for (const project of featured) {
			expect(screen.getByText(project.title)).toBeInTheDocument();
		}
	});

	it("renders Donate Now CTA link pointing to /donate", async () => {
		const result = await HomePage();
		render(result);
		// Multiple "Donate Now" links may exist; at least one must point to /donate
		const donateLinks = screen.getAllByRole("link", { name: /donate now/i });
		expect(donateLinks.length).toBeGreaterThan(0);
		expect(donateLinks[0]).toHaveAttribute("href", "/donate");
	});

	it("renders Learn More link pointing to /about", async () => {
		const result = await HomePage();
		render(result);
		const learnMore = screen.getByRole("link", { name: /learn more/i });
		expect(learnMore).toBeInTheDocument();
		expect(learnMore).toHaveAttribute("href", "/about");
	});

	it("renders Give Now link pointing to /donate", async () => {
		const result = await HomePage();
		render(result);
		const giveNow = screen.getByRole("link", { name: /give now/i });
		expect(giveNow).toBeInTheDocument();
		expect(giveNow).toHaveAttribute("href", "/donate");
	});

	it("renders Volunteer With Us link pointing to /contact", async () => {
		const result = await HomePage();
		render(result);
		const volunteer = screen.getByRole("link", { name: /volunteer with us/i });
		expect(volunteer).toBeInTheDocument();
		expect(volunteer).toHaveAttribute("href", "/contact");
	});

	it("renders View All Projects link", async () => {
		const result = await HomePage();
		render(result);
		const viewAll = screen.getByRole("link", { name: /view all projects/i });
		expect(viewAll).toBeInTheDocument();
		expect(viewAll).toHaveAttribute("href", "/projects");
	});
});
