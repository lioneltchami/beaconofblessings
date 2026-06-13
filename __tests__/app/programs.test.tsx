import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProgramsPage from "@/app/programs/page";
import { programsPageContent } from "@/data/pages";
import { programs } from "@/data/programs";

vi.mock("@/lib/sanity/queries", () => ({
	getProgramsPage: vi.fn(() => Promise.resolve(programsPageContent)),
	getPrograms: vi.fn(() => Promise.resolve([...programs])),
}));

describe("ProgramsPage", () => {
	it("presents the donor-trust programs architecture", async () => {
		render(await ProgramsPage());

		expect(
			screen.getByRole("heading", {
				level: 1,
				name: /programs that keep children learning/i,
			}),
		).toBeInTheDocument();
		expect(screen.getByText(/what your gift funds/i)).toBeInTheDocument();
		expect(screen.getByText(/where the work happens/i)).toBeInTheDocument();
	});

	it("presents the program pillars expected in the upgraded content model", async () => {
		render(await ProgramsPage());

		expect(document.body).toHaveTextContent(/program pillars/i);
		expect(document.body).toHaveTextContent(/school readiness/i);
		expect(document.body).toHaveTextContent(/girls' education/i);
		expect(document.body).toHaveTextContent(/digital learning/i);
	});

	it("connects programs to 2026 impact goals and measurable outcomes", async () => {
		render(await ProgramsPage());

		expect(document.body).toHaveTextContent(/2026 .*goals/i);
		expect(document.body).toHaveTextContent(/school-readiness kit/i);
		expect(document.body).toHaveTextContent(/girls' education support/i);
		expect(document.body).toHaveTextContent(/digital-learning pilot/i);
		expect(document.body).toHaveTextContent(/public updates/i);
	});

	it("shows donor proof for program-level giving", async () => {
		render(await ProgramsPage());

		expect(document.body).toHaveTextContent(/how we prove it/i);
		expect(document.body).toHaveTextContent(/receipts/i);
		expect(document.body).toHaveTextContent(/sign-off records/i);
		expect(document.body).toHaveTextContent(/public updates/i);
	});

	it("renders every program with a detail link", async () => {
		render(await ProgramsPage());

		for (const program of programs) {
			expect(screen.getByText(program.title)).toBeInTheDocument();
			expect(
				screen.getByRole("link", { name: new RegExp(program.ctaLabel, "i") }),
			).toHaveAttribute("href", `/programs/${program.slug}`);
		}
	});
});
