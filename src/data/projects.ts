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
}

export interface ProjectArchiveRecord {
	title: string;
	summary: string;
	outcomes: string[];
	reportUrl?: string;
	galleryHref?: string;
	publishedDate?: string;
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
