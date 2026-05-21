import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TransparencyPage from "@/app/transparency/page";
import {
	boardMembers,
	documentStatuses,
	stewardshipStandards,
	transparencyFacts,
} from "@/data/impact";

describe("TransparencyPage", () => {
	it("renders accountability sections donors expect", () => {
		render(<TransparencyPage />);

		expect(
			screen.getByRole("heading", {
				level: 1,
				name: /transparent stewardship/i,
			}),
		).toBeInTheDocument();
		expect(screen.getByText(/registration and governance/i)).toBeInTheDocument();
		expect(screen.getByText(/how donations are used/i)).toBeInTheDocument();
		expect(screen.getByText(/stewardship standards/i)).toBeInTheDocument();
		expect(screen.getByText(/reporting cadence/i)).toBeInTheDocument();
		expect(screen.getByText(/policies and documents/i)).toBeInTheDocument();
	});

	it("renders board members and transparency facts", () => {
		render(<TransparencyPage />);

		for (const member of boardMembers) {
			expect(screen.getByText(member.name)).toBeInTheDocument();
		}

		for (const fact of transparencyFacts) {
			expect(screen.getByText(fact.label)).toBeInTheDocument();
		}
	});

	it("renders stewardship standards and document status labels", () => {
		render(<TransparencyPage />);

		for (const standard of stewardshipStandards) {
			expect(screen.getAllByText(standard.label).length).toBeGreaterThan(0);
		}

		for (const document of documentStatuses) {
			expect(screen.getAllByText(document.title).length).toBeGreaterThan(0);
			expect(screen.getAllByText(document.status).length).toBeGreaterThan(0);
		}
	});
});
