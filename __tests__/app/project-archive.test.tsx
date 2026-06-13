import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectArchivePage from "@/app/projects/archive/page";
import { getCompletedProjects as staticGetCompleted } from "@/data/projects";

vi.mock("@/lib/sanity/queries", () => ({
	getCompletedProjects: vi.fn(() => Promise.resolve(staticGetCompleted())),
}));

describe("ProjectArchivePage", () => {
	it("renders the project archive heading", async () => {
		const result = await ProjectArchivePage();
		render(result);

		expect(
			screen.getByRole("heading", { level: 1, name: /project archive/i }),
		).toBeInTheDocument();
	});

	it("renders completed projects from lifecycle data", async () => {
		const result = await ProjectArchivePage();
		render(result);

		expect(
			screen.getByText(/first project - educational supplies outreach 2024/i),
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /view archive record/i }),
		).toHaveAttribute("href", "/projects/school-supplies-drive-2024");
	});
});
