import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AboutPage from "@/app/about/page";
// Static data imports for mock return values
import { founders, founders as staticFounders } from "@/data/founders";
import { coreValues, coreValues as staticCoreValues } from "@/data/site";

vi.mock("@/lib/sanity/queries", () => ({
	getFounders: vi.fn(() => Promise.resolve([...staticFounders])),
	getCoreValues: vi.fn(() => Promise.resolve([...staticCoreValues])),
}));

describe("AboutPage", () => {
	it("renders the page h1 heading", async () => {
		const result = await AboutPage();
		render(result);
		expect(
			screen.getByRole("heading", {
				level: 1,
				name: /about beacon of blessings/i,
			}),
		).toBeInTheDocument();
	});

	it("renders each founder by name", async () => {
		const result = await AboutPage();
		render(result);
		for (const founder of founders) {
			expect(screen.getByText(founder.name)).toBeInTheDocument();
		}
	});

	it("renders each founder's role", async () => {
		const result = await AboutPage();
		render(result);
		for (const founder of founders) {
			expect(screen.getByText(founder.role)).toBeInTheDocument();
		}
	});

	it("renders all core values by title", async () => {
		const result = await AboutPage();
		render(result);
		for (const value of coreValues) {
			expect(screen.getByText(value.title)).toBeInTheDocument();
		}
	});

	it("renders Our Vision card title text", async () => {
		const result = await AboutPage();
		render(result);
		// CardTitle renders as a div (not a heading), so use getByText
		expect(screen.getByText("Our Vision")).toBeInTheDocument();
	});

	it("renders Our Mission card title text", async () => {
		const result = await AboutPage();
		render(result);
		// CardTitle renders as a div (not a heading), so use getByText
		expect(screen.getByText("Our Mission")).toBeInTheDocument();
	});

	it("renders Our Story section heading", async () => {
		const result = await AboutPage();
		render(result);
		expect(
			screen.getByRole("heading", { name: /our story/i }),
		).toBeInTheDocument();
	});

	it("renders Meet Our Founders section heading", async () => {
		const result = await AboutPage();
		render(result);
		expect(
			screen.getByRole("heading", { name: /meet our founders/i }),
		).toBeInTheDocument();
	});

	it("renders Core Values section heading", async () => {
		const result = await AboutPage();
		render(result);
		expect(
			screen.getByRole("heading", { name: /core values/i }),
		).toBeInTheDocument();
	});

	it("renders Get In Touch CTA link pointing to /contact", async () => {
		const result = await AboutPage();
		render(result);
		const link = screen.getByRole("link", { name: /get in touch/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/contact");
	});
});
