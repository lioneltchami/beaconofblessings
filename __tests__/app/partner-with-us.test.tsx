import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PartnerWithUsPage from "@/app/partner-with-us/page";
import {
	sponsorCurrentNeeds,
	sponsorDueDiligence,
	sponsorTiers,
} from "@/data/sponsors";

describe("PartnerWithUsPage", () => {
	it("renders a sponsor-focused hero and primary actions", async () => {
		render(await PartnerWithUsPage());

		expect(
			screen.getByRole("heading", {
				level: 1,
				name: /partner with beacon of blessings/i,
			}),
		).toBeInTheDocument();
		expect(
			screen.getAllByRole("link", { name: /request sponsor conversation/i })[0],
		).toHaveAttribute("href", "/contact?subject=Corporate%20Sponsorship");
		expect(
			screen.getByRole("link", { name: /download sponsor brief/i }),
		).toHaveAttribute(
			"href",
			"/documents/beacon-of-blessings-sponsor-brief-2026.pdf",
		);
	});

	it("summarizes due diligence facts sponsors expect", async () => {
		render(await PartnerWithUsPage());

		for (const item of sponsorDueDiligence) {
			expect(screen.getByText(item.title)).toBeInTheDocument();
		}
		expect(screen.getByText(/CAC registration 8271788/i)).toBeInTheDocument();
		expect(screen.getAllByText(/N1,372,200/i).length).toBeGreaterThan(0);
	});

	it("renders sponsor tiers and current funding needs", async () => {
		render(await PartnerWithUsPage());

		for (const tier of sponsorTiers) {
			expect(screen.getByText(tier.name)).toBeInTheDocument();
			expect(screen.getByText(tier.amount)).toBeInTheDocument();
		}
		for (const need of sponsorCurrentNeeds) {
			expect(screen.getByText(need.item)).toBeInTheDocument();
			expect(screen.getByText(need.amount)).toBeInTheDocument();
		}
	});

	it("sets sponsor recognition boundaries clearly", async () => {
		render(await PartnerWithUsPage());

		expect(screen.getByText(/recognition is acknowledgement/i)).toBeInTheDocument();
		expect(screen.getByText(/does not imply product endorsement/i)).toBeInTheDocument();
	});
});
