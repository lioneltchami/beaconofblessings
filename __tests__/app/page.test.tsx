import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { getFeaturedProjects } from "@/data/projects";
import { impactStats } from "@/data/site";

describe("HomePage", () => {
	it("renders the organization name as h1 heading", () => {
		render(<HomePage />);
		expect(
			screen.getByRole("heading", { level: 1, name: /beacon of blessings/i }),
		).toBeInTheDocument();
	});

	it("renders the tagline", () => {
		render(<HomePage />);
		expect(
			screen.getByText(/illuminating futures through education/i),
		).toBeInTheDocument();
	});

	it("renders all four impact stats", () => {
		render(<HomePage />);
		for (const stat of impactStats) {
			expect(screen.getByText(stat.value)).toBeInTheDocument();
			expect(screen.getByText(stat.label)).toBeInTheDocument();
		}
	});

	it("renders the mission section heading", () => {
		render(<HomePage />);
		expect(
			screen.getByText(
				/sharing the love of christ through compassionate service/i,
			),
		).toBeInTheDocument();
	});

	it("renders featured project titles", () => {
		render(<HomePage />);
		const featured = getFeaturedProjects();
		for (const project of featured) {
			expect(screen.getByText(project.title)).toBeInTheDocument();
		}
	});

	it("renders Donate Now CTA link pointing to /donate", () => {
		render(<HomePage />);
		// Multiple "Donate Now" links may exist; at least one must point to /donate
		const donateLinks = screen.getAllByRole("link", { name: /donate now/i });
		expect(donateLinks.length).toBeGreaterThan(0);
		expect(donateLinks[0]).toHaveAttribute("href", "/donate");
	});

	it("renders Learn More link pointing to /about", () => {
		render(<HomePage />);
		const learnMore = screen.getByRole("link", { name: /learn more/i });
		expect(learnMore).toBeInTheDocument();
		expect(learnMore).toHaveAttribute("href", "/about");
	});

	it("renders Give Now link pointing to /donate", () => {
		render(<HomePage />);
		const giveNow = screen.getByRole("link", { name: /give now/i });
		expect(giveNow).toBeInTheDocument();
		expect(giveNow).toHaveAttribute("href", "/donate");
	});

	it("renders Volunteer With Us link pointing to /contact", () => {
		render(<HomePage />);
		const volunteer = screen.getByRole("link", { name: /volunteer with us/i });
		expect(volunteer).toBeInTheDocument();
		expect(volunteer).toHaveAttribute("href", "/contact");
	});

	it("renders View All Projects link", () => {
		render(<HomePage />);
		const viewAll = screen.getByRole("link", { name: /view all projects/i });
		expect(viewAll).toBeInTheDocument();
		expect(viewAll).toHaveAttribute("href", "/projects");
	});
});
