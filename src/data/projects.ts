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
	date: string;
	budget: string;
	description: string;
	impact: string[];
	featured: boolean;
}

export const projects: Project[] = [
	{
		slug: "school-supplies-drive-2024",
		title: "School Supplies Drive 2024",
		status: "completed",
		lifecycleMode: "auto",
		startDate: "2024-06-01",
		endDate: "2024-09-30",
		date: "June - September 2024",
		budget: "N2.5M",
		description:
			"Our inaugural project distributed essential school supplies to 500+ students across 5 communities in Lagos. Items included school bags, notebooks, textbooks, and writing materials.",
		impact: [
			"500+ students received school supplies",
			"5 Lagos communities served",
			"2,000+ notebooks distributed",
			"1,000+ textbooks provided",
			"Zero dropouts among beneficiary students",
		],
		featured: true,
	},
	{
		slug: "digital-learning-initiative",
		title: "Digital Learning Initiative",
		status: "current",
		lifecycleMode: "auto",
		startDate: "2026-01-01",
		endDate: "2026-12-31",
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
