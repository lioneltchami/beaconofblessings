import { describe, expect, it } from "vitest";
import {
	formatProjectCompletedAgo,
	getProjectLifecycle,
	sortProjectsByLifecycleDate,
} from "@/lib/project-lifecycle";

describe("project lifecycle", () => {
	const today = new Date("2026-05-27T12:00:00.000Z");

	it("marks automatic projects as upcoming before their start date", () => {
		expect(
			getProjectLifecycle(
				{
					status: "completed",
					lifecycleMode: "auto",
					startDate: "2026-09-01",
					endDate: "2027-07-31",
				},
				today,
			),
		).toBe("upcoming");
	});

	it("marks automatic projects as current between start and end dates", () => {
		expect(
			getProjectLifecycle(
				{
					status: "upcoming",
					lifecycleMode: "auto",
					startDate: "2026-01-01",
					endDate: "2026-12-31",
				},
				today,
			),
		).toBe("current");
	});

	it("keeps one-day projects current through the archive date", () => {
		const project = {
			status: "upcoming" as const,
			lifecycleMode: "auto" as const,
			startDate: "2026-06-15",
			endDate: "2026-06-15",
			archiveAfterDate: "2026-06-15",
			autoArchiveAfterEndDate: true,
		};

		expect(
			getProjectLifecycle(project, new Date("2026-06-15T12:00:00.000Z")),
		).toBe("current");
		expect(
			getProjectLifecycle(project, new Date("2026-06-16T00:00:00.000Z")),
		).toBe("completed");
	});

	it("marks automatic projects as completed after their end date", () => {
		expect(
			getProjectLifecycle(
				{
					status: "current",
					lifecycleMode: "auto",
					startDate: "2024-06-01",
					endDate: "2024-09-30",
				},
				today,
			),
		).toBe("completed");
	});

	it("uses archiveAfterDate as the automatic archive boundary", () => {
		expect(
			getProjectLifecycle(
				{
					status: "current",
					lifecycleMode: "auto",
					startDate: "2026-01-01",
					endDate: "2026-05-01",
					archiveAfterDate: "2026-12-31",
					autoArchiveAfterEndDate: true,
				},
				today,
			),
		).toBe("current");
	});

	it("can keep an ended project current when auto archive is disabled", () => {
		expect(
			getProjectLifecycle(
				{
					status: "current",
					lifecycleMode: "auto",
					startDate: "2026-01-01",
					endDate: "2026-05-01",
					autoArchiveAfterEndDate: false,
				},
				today,
			),
		).toBe("current");
	});

	it("uses manual status when lifecycle mode is manual", () => {
		expect(
			getProjectLifecycle(
				{
					status: "upcoming",
					lifecycleMode: "manual",
					startDate: "2024-01-01",
					endDate: "2024-12-31",
				},
				today,
			),
		).toBe("upcoming");
	});

	it("formats completed projects with relative age over time", () => {
		expect(
			formatProjectCompletedAgo(
				{
					status: "completed",
					lifecycleMode: "auto",
					endDate: "2016-05-27",
				},
				today,
			),
		).toBe("10 years ago");
	});

	it("sorts projects by lifecycle dates in the order visitors expect", () => {
		const sorted = sortProjectsByLifecycleDate(
			[
				{ slug: "later", startDate: "2027-01-01", endDate: "2027-12-31" },
				{ slug: "sooner", startDate: "2026-09-01", endDate: "2027-07-31" },
			],
			"upcoming",
		);

		expect(sorted.map((project) => project.slug)).toEqual(["sooner", "later"]);
	});
});
