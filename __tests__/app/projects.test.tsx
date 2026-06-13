import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectsPage from "@/app/projects/page";
import { projectsPageContent } from "@/data/pages";
// Static data imports for mock return values
import {
	getCompletedProjects,
	getCurrentProjects,
	getUpcomingProjects,
	getCompletedProjects as staticGetCompleted,
	getCurrentProjects as staticGetCurrent,
	getUpcomingProjects as staticGetUpcoming,
} from "@/data/projects";

vi.mock("@/lib/sanity/queries", () => ({
	getCompletedProjects: vi.fn(() => Promise.resolve(staticGetCompleted())),
	getCurrentProjects: vi.fn(() => Promise.resolve(staticGetCurrent())),
	getProjectsPage: vi.fn(() => Promise.resolve(projectsPageContent)),
	getUpcomingProjects: vi.fn(() => Promise.resolve(staticGetUpcoming())),
}));

describe("ProjectsPage", () => {
	it("renders the page h1 heading", async () => {
		const result = await ProjectsPage();
		render(result);
		expect(
			screen.getByRole("heading", { level: 1, name: /our projects/i }),
		).toBeInTheDocument();
	});

	it("renders the completed project title", async () => {
		const result = await ProjectsPage();
		render(result);
		const completed = getCompletedProjects();
		for (const project of completed) {
			expect(screen.getByText(project.title)).toBeInTheDocument();
		}
	});

	it("renders the upcoming project titles", async () => {
		const result = await ProjectsPage();
		render(result);
		const upcoming = getUpcomingProjects();
		for (const project of upcoming) {
			expect(screen.getByText(project.title)).toBeInTheDocument();
		}
	});

	it("renders the current project titles", async () => {
		const result = await ProjectsPage();
		render(result);
		const current = getCurrentProjects();
		for (const project of current) {
			expect(screen.getByText(project.title)).toBeInTheDocument();
		}
	});

	it("renders Project Archive section heading", async () => {
		const result = await ProjectsPage();
		render(result);
		expect(
			screen.getByRole("heading", { name: /project archive/i }),
		).toBeInTheDocument();
	});

	it("links to the full project archive", async () => {
		const result = await ProjectsPage();
		render(result);
		expect(
			screen.getByRole("link", { name: /open full project archive/i }),
		).toHaveAttribute("href", "/projects/archive");
	});

	it("renders completed projects with a relative completion age", async () => {
		const result = await ProjectsPage();
		render(result);
		expect(document.body.textContent).toMatch(
			/last year|year ago|years ago|month ago|months ago/i,
		);
	});

	it("renders Upcoming Projects section heading", async () => {
		const result = await ProjectsPage();
		render(result);
		expect(
			screen.getByRole("heading", { name: /upcoming projects/i }),
		).toBeInTheDocument();
	});

	it("renders Current Projects section heading", async () => {
		const result = await ProjectsPage();
		render(result);
		expect(
			screen.getByRole("heading", { name: /current projects/i }),
		).toBeInTheDocument();
	});

	it("renders impact stat: 92+ children equipped", async () => {
		const result = await ProjectsPage();
		render(result);
		expect(screen.getByText("92+")).toBeInTheDocument();
		expect(screen.getByText("Children Equipped")).toBeInTheDocument();
	});

	it("renders impact stat from the first project financial report", async () => {
		const result = await ProjectsPage();
		render(result);
		expect(screen.getAllByText("N1,372,200").length).toBeGreaterThan(0);
		expect(screen.getByText("Invested")).toBeInTheDocument();
	});

	it("renders first project details from the financial report", async () => {
		const result = await ProjectsPage();
		render(result);
		expect(screen.getByText(/96 pairs of sandals/i)).toBeInTheDocument();
		expect(screen.getByText(/92 school bags/i)).toBeInTheDocument();
		expect(screen.getByText(/fully covered all project expenditures/i)).toBeInTheDocument();
	});

	it("renders impact stat: 2024 first outreach", async () => {
		const result = await ProjectsPage();
		render(result);
		expect(screen.getByText("First Outreach")).toBeInTheDocument();
	});

	it("renders Donate Now CTA link pointing to /donate", async () => {
		const result = await ProjectsPage();
		render(result);
		const link = screen.getByRole("link", { name: /donate now/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/donate");
	});
});
