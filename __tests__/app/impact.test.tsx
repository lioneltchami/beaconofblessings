import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ImpactPage from "@/app/impact/page";
import { impactMetrics, impactReport } from "@/data/impact";

describe("ImpactPage", () => {
	it("renders annual results and donor evidence", async () => {
		render(await ImpactPage());

		expect(
			screen.getByRole("heading", {
				level: 1,
				name: /measurable impact, documented with care/i,
			}),
		).toBeInTheDocument();
		expect(screen.getByText(impactReport.period)).toBeInTheDocument();
		expect(screen.getByText(/evidence we keep/i)).toBeInTheDocument();
	});

	it("renders each impact metric", async () => {
		render(await ImpactPage());

		for (const metric of impactMetrics) {
			expect(screen.getByText(metric.value)).toBeInTheDocument();
			expect(screen.getByText(metric.label)).toBeInTheDocument();
		}
	});
});
