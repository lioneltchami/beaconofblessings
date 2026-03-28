export interface Resource {
	id: string;
	title: string;
	description: string;
	category: ResourceCategory;
	fileType: "pdf" | "pptx" | "docx" | "xlsx";
	fileSize: string;
	date: string;
	/** URL to the file — will come from Sanity when CMS is connected */
	fileUrl?: string;
}

export type ResourceCategory =
	| "registration"
	| "annual-reports"
	| "project-reports"
	| "policies";

export const resourceCategories: {
	value: ResourceCategory | "all";
	label: string;
	description: string;
}[] = [
	{
		value: "all",
		label: "All Documents",
		description: "Browse all available documents",
	},
	{
		value: "registration",
		label: "Registration & Legal",
		description:
			"Official registration documents proving our legal status in Nigeria",
	},
	{
		value: "annual-reports",
		label: "Annual Reports",
		description: "Yearly reports on our activities, finances, and impact",
	},
	{
		value: "project-reports",
		label: "Project Reports",
		description: "Detailed reports on individual projects and their outcomes",
	},
	{
		value: "policies",
		label: "Policies & Governance",
		description:
			"Our organizational policies, terms of reference, and governance documents",
	},
];

export const resources: Resource[] = [
	// Registration & Legal
	{
		id: "reg-1",
		title: "Certificate of Incorporation",
		description:
			"Official certificate of incorporation as a non-profit organization registered under Nigerian law.",
		category: "registration",
		fileType: "pdf",
		fileSize: "1.2 MB",
		date: "2024-03-15",
	},
	{
		id: "reg-2",
		title: "CAC Registration Document",
		description:
			"Corporate Affairs Commission (CAC) registration document confirming our legal status in Nigeria.",
		category: "registration",
		fileType: "pdf",
		fileSize: "850 KB",
		date: "2024-03-15",
	},
	{
		id: "reg-3",
		title: "Tax Exemption Certificate",
		description:
			"Tax exemption status documentation from the Federal Inland Revenue Service (FIRS).",
		category: "registration",
		fileType: "pdf",
		fileSize: "620 KB",
		date: "2024-04-20",
	},

	// Annual Reports
	{
		id: "ar-1",
		title: "2024 Annual Report",
		description:
			"Comprehensive report covering our first year of operations, financial summary, and impact metrics.",
		category: "annual-reports",
		fileType: "pdf",
		fileSize: "4.5 MB",
		date: "2025-01-30",
	},

	// Project Reports
	{
		id: "pr-1",
		title: "School Supplies Drive 2024 — Final Report",
		description:
			"Detailed report on our inaugural project: beneficiary data, budget allocation, outcomes, and lessons learned.",
		category: "project-reports",
		fileType: "pdf",
		fileSize: "3.2 MB",
		date: "2024-10-15",
	},
	{
		id: "pr-2",
		title: "School Supplies Drive 2024 — Impact Presentation",
		description:
			"Presentation summarizing the impact of the School Supplies Drive with photos and testimonials.",
		category: "project-reports",
		fileType: "pptx",
		fileSize: "8.1 MB",
		date: "2024-11-01",
	},

	// Policies & Governance
	{
		id: "pol-1",
		title: "Terms of Reference",
		description:
			"Our organizational terms of reference outlining our mandate, scope, and operational guidelines.",
		category: "policies",
		fileType: "pdf",
		fileSize: "420 KB",
		date: "2024-03-01",
	},
	{
		id: "pol-2",
		title: "Safeguarding Policy",
		description:
			"Our commitment to safeguarding children and vulnerable adults in all our programs.",
		category: "policies",
		fileType: "pdf",
		fileSize: "380 KB",
		date: "2024-05-10",
	},
	{
		id: "pol-3",
		title: "Financial Policy & Procedures",
		description:
			"Guidelines governing how we manage, allocate, and report on donated funds.",
		category: "policies",
		fileType: "pdf",
		fileSize: "510 KB",
		date: "2024-04-01",
	},
];

export function getResourcesByCategory(category: ResourceCategory | "all") {
	if (category === "all") return resources;
	return resources.filter((r) => r.category === category);
}
