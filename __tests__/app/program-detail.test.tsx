import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProgramPage, {
	generateStaticParams,
} from "@/app/programs/[slug]/page";
import { programs } from "@/data/programs";

vi.mock("@/lib/sanity/queries", () => ({
	getProgram: vi.fn((slug: string) =>
		Promise.resolve(programs.find((program) => program.slug === slug) ?? null),
	),
	getProgramSlugs: vi.fn(() => Promise.resolve(programs.map((program) => program.slug))),
	getPrograms: vi.fn(() => Promise.resolve([...programs])),
}));

describe("ProgramPage", () => {
	it("generates static params for every program", async () => {
		await expect(generateStaticParams()).resolves.toEqual(
			programs.map((program) => ({ slug: program.slug })),
		);
	});

	it("renders program-specific trust details and donation CTA", async () => {
		const program = programs[0];
		const result = await ProgramPage({
			params: Promise.resolve({ slug: program.slug }),
		});

		render(result);

		expect(
			screen.getByRole("heading", { level: 1, name: program.title }),
		).toBeInTheDocument();
		expect(screen.getByText(program.whoBenefits)).toBeInTheDocument();
		expect(screen.getByText(program.proofPoints[0])).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: new RegExp(program.donationCta, "i") }),
		).toHaveAttribute("href", `/donate?program=${program.slug}`);
	});
});
