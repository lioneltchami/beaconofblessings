import {
	getProjectLifecycle,
	sortProjectsByLifecycleDate,
} from "@/lib/project-lifecycle";

export interface Project {
	slug: string;
	title: string;
	status: "completed" | "current" | "upcoming";
	lifecycleMode?: "auto" | "manual";
	startDate?: string;
	endDate?: string;
	archiveAfterDate?: string;
	autoArchiveAfterEndDate?: boolean;
	date: string;
	budget: string;
	description: string;
	impact: string[];
	featured: boolean;
	archiveRecord?: ProjectArchiveRecord;
	termsOfReference?: ProjectTermsOfReference;
}

export interface ProjectArchiveRecord {
	title: string;
	summary: string;
	outcomes: string[];
	reportUrl?: string;
	galleryHref?: string;
	publishedDate?: string;
}

export interface ProjectTermsOfReference {
	title: string;
	projectLead: string;
	purpose: string;
	scope: string[];
	budget: {
		amount: string;
		notes: string;
	};
	timeline: string[];
	responsibilities: string[];
	deliverables: string[];
	successMeasures: string[];
	reporting: string[];
}

export const projects: Project[] = [
	{
		slug: "school-supplies-drive-2024",
		title: "First Project - Educational Supplies Outreach 2024",
		status: "completed",
		lifecycleMode: "auto",
		startDate: "2024-01-01",
		endDate: "2024-12-31",
		archiveAfterDate: "2024-12-31",
		autoArchiveAfterEndDate: true,
		date: "2024",
		budget: "N1,372,200",
		description:
			"Our first outreach project equipped children in underserved communities with school supplies and hosted a community celebration event. The published financial report records N1,372,200 in funds received and N1,372,200 in total expenditure.",
		impact: [
			"96 pairs of sandals purchased for children",
			"92 school bags purchased for children",
			"Books, pencils, pens, and stockings purchased for school readiness",
			"Community celebration supported with water, Maltina, meat pies, canopy, chairs, tables, DJ, fuel, and volunteer stipends",
			"ADA (Apoti Development Association, Cameroon) contributed N196,564, helping ensure funds received fully covered all project expenditures",
		],
		featured: true,
		archiveRecord: {
			title: "2024 Educational Supplies Outreach Archive",
			summary:
				"Final archive record for Beacon of Blessings' first outreach, tying the published financial report to the delivered school-readiness support.",
			outcomes: [
				"92 children equipped with school bags and learning support",
				"96 pairs of sandals purchased for children",
				"N1,372,200 received and N1,372,200 spent according to the published financial report",
			],
			reportUrl:
				"/documents/beacon-of-blessings-first-project-financial-report-2024.pdf",
			galleryHref: "/gallery/classroom-learning-2024",
			publishedDate: "2024-12-31",
		},
	},
	{
		slug: "youth-bible-distribution-june-2026",
		title: "Youth Bible Distribution Outreach",
		status: "upcoming",
		lifecycleMode: "auto",
		startDate: "2026-06-15",
		endDate: "2026-06-15",
		archiveAfterDate: "2026-06-15",
		autoArchiveAfterEndDate: true,
		date: "15 June 2026",
		budget: "N150,000 - N200,000",
		description:
			"A one-day faith and youth-support outreach where Beacon of Blessings will purchase and distribute Bibles to young people in the community.",
		impact: [
			"Bibles purchased for youth in the community",
			"Faith encouragement shared through a simple, community-led outreach",
			"Femi will coordinate purchase, delivery, and distribution on behalf of the team",
			"Post-project notes and receipts will be collected for the archive record",
		],
		featured: true,
		termsOfReference: {
			title: "Term of Reference - Youth Bible Distribution Outreach",
			projectLead: "Femi",
			purpose:
				"To provide Bibles to youth in the community as a faith-based encouragement project connected to Beacon of Blessings' mission of practical care, formation, and community support.",
			scope: [
				"Purchase youth-appropriate Bibles within the approved budget range.",
				"Coordinate delivery and distribution to the identified youth group/community.",
				"Keep the activity simple, respectful, child-safe, and community-led.",
				"Collect basic proof of purchase, distribution notes, and approved photos where appropriate.",
			],
			budget: {
				amount: "N150,000 - N200,000",
				notes:
					"Budget is allocated primarily for Bible purchase. Final report should record actual amount spent, number of Bibles purchased, unit cost where available, and any transport/logistics cost.",
			},
			timeline: [
				"Before 15 June 2026: confirm Bible quantity, vendor, and distribution location.",
				"15 June 2026: purchase/prepare Bibles and distribute them to youth in the community.",
				"After 15 June 2026: submit receipts, short activity summary, number of Bibles distributed, and approved documentation for the archive record.",
			],
			responsibilities: [
				"Femi leads purchasing, coordination, and distribution.",
				"Beacon of Blessings team confirms budget approval and receives post-project documentation.",
				"Volunteers/community contacts support safe distribution and basic attendance/count records where possible.",
			],
			deliverables: [
				"Bibles purchased and distributed to youth.",
				"Receipt or purchase record for the Bible purchase.",
				"Short project completion note with date, location, lead, quantity distributed, final spend, and observations.",
				"Approved child-safe photos or media only where consent and dignity are protected.",
			],
			successMeasures: [
				"Bibles are purchased within the N150,000 - N200,000 budget range.",
				"Distribution is completed on 15 June 2026.",
				"Final count of Bibles distributed is recorded.",
				"Receipts and a short report are ready for the archive after the project.",
			],
			reporting: [
				"Femi submits purchase receipts and final distribution count.",
				"Beacon of Blessings prepares a short archive record after completion.",
				"If actual spend differs from the approved range, the final report should explain why.",
			],
		},
	},
	{
		slug: "digital-learning-initiative",
		title: "Digital Learning Initiative",
		status: "current",
		lifecycleMode: "auto",
		startDate: "2026-01-01",
		endDate: "2026-12-31",
		archiveAfterDate: "2026-12-31",
		autoArchiveAfterEndDate: true,
		date: "2026",
		budget: "N5M",
		description:
			"Equipping students with tablets and establishing solar-powered charging stations to bring digital education to underserved communities.",
		impact: [
			"300 tablets for students",
			"Solar charging stations",
			"Teacher digital literacy training",
		],
		featured: true,
	},
	{
		slug: "girls-education-scholarship",
		title: "Girls' Education Scholarship Program",
		status: "upcoming",
		lifecycleMode: "auto",
		startDate: "2026-09-01",
		endDate: "2027-07-31",
		archiveAfterDate: "2027-07-31",
		autoArchiveAfterEndDate: true,
		date: "2026",
		budget: "N8M",
		description:
			"Full academic scholarships for 100 girls, coupled with mentorship programs to support their educational journey through completion.",
		impact: [
			"100 full scholarships",
			"Mentorship program",
			"Career guidance workshops",
		],
		featured: false,
	},
	{
		slug: "community-library-project",
		title: "Community Library Project",
		status: "upcoming",
		lifecycleMode: "auto",
		startDate: "2027-01-01",
		endDate: "2027-12-31",
		archiveAfterDate: "2027-12-31",
		autoArchiveAfterEndDate: true,
		date: "2027",
		budget: "N15M",
		description:
			"Establishing 5 community libraries across Lagos to provide free access to books, study spaces, and reading programs for children and families.",
		impact: [
			"5 community libraries",
			"10,000+ books",
			"Reading programs for children",
		],
		featured: false,
	},
];

export function getCompletedProjects() {
	return sortProjectsByLifecycleDate(
		projects.filter((p) => getProjectLifecycle(p) === "completed"),
		"completed",
	);
}

export function getCurrentProjects() {
	return sortProjectsByLifecycleDate(
		projects.filter((p) => getProjectLifecycle(p) === "current"),
		"current",
	);
}

export function getUpcomingProjects() {
	return sortProjectsByLifecycleDate(
		projects.filter((p) => getProjectLifecycle(p) === "upcoming"),
		"upcoming",
	);
}

export function getFeaturedProjects() {
	return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string) {
	return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
	return projects.map((project) => project.slug);
}
