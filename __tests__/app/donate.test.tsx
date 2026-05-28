import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { donatePageContent } from "@/data/pages";
import { programs } from "@/data/programs";

// Stub DonateForm so we do not pull in useFormStatus / checkout action in this
// page-level test — that component has its own dedicated test file.
vi.mock("@/components/donate-form", () => ({
	DonateForm: () => <div data-testid="donate-form-stub" />,
}));

vi.mock("@/lib/sanity/queries", () => ({
	getDonatePage: vi.fn(() => Promise.resolve(donatePageContent)),
	getPrograms: vi.fn(() => Promise.resolve([...programs])),
}));

import DonatePage from "@/app/donate/page";

describe("DonatePage", () => {
	it("renders the main heading", async () => {
		render(await DonatePage());
		expect(
			screen.getByRole("heading", { level: 1, name: /make a difference/i }),
		).toBeInTheDocument();
	});

	it("renders the impact section heading", async () => {
		render(await DonatePage());
		expect(
			screen.getByText(/your donation makes an impact/i),
		).toBeInTheDocument();
	});

	it("renders all four impact area titles", async () => {
		render(await DonatePage());
		expect(screen.getByText("School Supplies")).toBeInTheDocument();
		expect(screen.getByText("Scholarships")).toBeInTheDocument();
		expect(screen.getByText("Learning Materials")).toBeInTheDocument();
		expect(screen.getByText("Community Impact")).toBeInTheDocument();
	});

	it("renders the 'Why Give?' section", async () => {
		render(await DonatePage());
		expect(
			screen.getByRole("heading", { name: /why give\?/i }),
		).toBeInTheDocument();
	});

	it("renders the 'Choose Your Gift' section heading", async () => {
		render(await DonatePage());
		expect(
			screen.getByRole("heading", { name: /choose your gift/i }),
		).toBeInTheDocument();
	});

	it("renders trust point titles", async () => {
		render(await DonatePage());
		expect(screen.getByText("Transparent Stewardship")).toBeInTheDocument();
		expect(screen.getByText("Faith-Driven Mission")).toBeInTheDocument();
		expect(screen.getByText("Program-Focused Impact")).toBeInTheDocument();
	});

	it("renders the DonateForm placeholder", async () => {
		render(await DonatePage());
		expect(screen.getByTestId("donate-form-stub")).toBeInTheDocument();
	});
});
