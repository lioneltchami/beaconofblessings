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
				"Public registration and legal documents for Beacon of Blessings",
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
			title: "CAC Certificate of Incorporation",
			description:
				"Corporate Affairs Commission certificate confirming Beacon of Blessings Charity Initiative as a registered corporate body.",
		category: "registration",
		fileType: "pdf",
		fileSize: "900 KB",
		date: "2025-02-15",
		fileUrl: "/documents/beacon-of-blessings-certificate-of-incorporation.pdf",
	},
	{
			id: "reg-2",
			title: "Tax Identification Details",
			description:
				"Beacon of Blessings' tax identification number is included on the public incorporation certificate.",
		category: "registration",
		fileType: "pdf",
		fileSize: "900 KB",
		date: "2025-02-15",
		fileUrl: "/documents/beacon-of-blessings-certificate-of-incorporation.pdf",
	},
	{
			id: "reg-3",
			title: "Tax Status Guidance",
			description:
				"Pending public guidance on donation acknowledgement and jurisdiction-specific deductibility.",
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
				"Planned broader annual report covering launch-year activities, governance, and next-cycle priorities.",
		category: "annual-reports",
		fileType: "pdf",
		fileSize: "4.5 MB",
		date: "2025-01-30",
	},

	// Project Reports
	{
		id: "pr-1",
			title: "First Project Financial Report 2024",
			description:
				"Income and expenditure summary for Beacon of Blessings' first outreach project, documenting N1,372,200 received and N1,372,200 spent on school supplies, outreach logistics, and community celebration costs.",
		category: "project-reports",
		fileType: "pdf",
		fileSize: "285 KB",
		date: "2026-05-27",
		fileUrl: "/documents/beacon-of-blessings-first-project-financial-report-2024.pdf",
	},
	{
		id: "pr-2",
			title: "First Project 2024 — Impact Presentation",
			description:
				"Planned public presentation summarizing approved photos, outcomes, and field learning.",
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
