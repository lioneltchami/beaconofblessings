export interface ImpactMetric {
	value: string;
	label: string;
	detail: string;
}

export interface BoardMember {
	name: string;
	role: string;
	focus: string;
}

export interface DocumentStatus {
	title: string;
	status: "available" | "pending" | "planned";
	description: string;
	href?: string;
}

export const impactReport = {
	period: "2024 Launch Year",
	headline: "First outreach fully funded and reported at N1,372,200",
	summary:
		"Our first field project focused on practical school-readiness supplies and a community celebration event for children in underserved communities. The published financial report documents N1,372,200 received and N1,372,200 spent.",
	evidence: [
		"Partner-school beneficiary lists and teacher confirmations",
		"Published income and expenditure report prepared by Grace Kure",
		"Procurement records for 96 pairs of sandals, 92 school bags, books, stockings, pencils, and pens",
		"Field photos and leadership review notes retained for reporting",
		"Program learning notes used to shape the next funding cycle",
	],
};

export const impactMetrics: ImpactMetric[] = [
	{
		value: "92+",
		label: "Children Equipped",
		detail: "School bags and related school-readiness supplies were purchased during the 2024 first project.",
	},
	{
		value: "96",
		label: "Sandals Purchased",
		detail: "The financial report records 96 pairs of sandals purchased for the outreach.",
	},
	{
		value: "92",
		label: "School Bags Purchased",
		detail: "The financial report records 92 school bags purchased for children.",
	},
	{
		value: "N1,372,200",
		label: "Launch Investment",
		detail: "Published total funds received and total project expenditure for the first outreach project.",
	},
];

export const outcomePathway = [
	{
		step: "Identify need",
		description:
			"Teachers, local leaders, and families help surface students most affected by education costs.",
	},
	{
		step: "Fund practical support",
		description:
			"Donations are converted into supplies, fee relief, mentoring, or classroom tools tied to a named program.",
	},
	{
		step: "Document delivery",
		description:
			"Beacon retains receipts, sign-off records, field photos, and beneficiary counts for review.",
	},
	{
		step: "Learn and report",
		description:
			"Results are summarized into public updates, annual reporting, and next-cycle program decisions.",
	},
];

export const transparencyFacts = [
	{
		label: "Registration",
		value: "Registered with the Corporate Affairs Commission (CAC), registration number 8271788",
	},
	{
		label: "Service Area",
		value: "Lagos communities, Nigeria",
	},
	{
		label: "Financial Controls",
		value: "Program spend, receipts, and distribution totals are reviewed before public reporting",
	},
	{
		label: "Child Safeguarding",
		value: "Children are not identified publicly without appropriate consent",
	},
];

export const boardMembers: BoardMember[] = [
	{
		name: "Beacon of Blessings Trustees",
		role: "Governance and stewardship",
		focus:
			"Responsible for program priorities, donor stewardship, and mission alignment.",
	},
	{
		name: "Program Accountability Lead",
		role: "Field delivery oversight",
		focus:
			"Responsible for partner-school records, beneficiary counts, and post-distribution learning notes.",
	},
	{
		name: "Finance and Compliance Lead",
		role: "Donation use and records",
		focus:
			"Responsible for restricted gifts, payment records, receipts, and annual financial documentation.",
	},
];

export const donationUse = [
	{ label: "Direct Program Delivery", value: "Supplies, school-cost relief, mentoring, and learning tools" },
	{ label: "Field Operations", value: "Local transport, packing, verification, and school coordination" },
	{ label: "Reporting and Compliance", value: "Receipts, documentation, payment processing, and records" },
];

export const stewardshipStandards = [
	{
		label: "Restricted gift tracking",
		value:
			"Program-designated donations are recorded with the selected pathway and reviewed before public reporting.",
	},
	{
		label: "Evidence retention",
		value:
			"Receipts, school sign-off records, beneficiary counts, and child-safe field photos are retained for review.",
	},
	{
		label: "Donor privacy",
		value:
			"Donor data is used for receipts, updates, and support only; public recognition requires appropriate permission.",
	},
	{
		label: "Safeguarding",
		value:
			"Children are not named publicly, and identifiable photos are handled with consent and care.",
	},
] as const;

export const documentStatuses: DocumentStatus[] = [
	{
		title: "Registration details",
		status: "available",
		description:
			"CAC certificate of incorporation is available for public review.",
		href: "/resources",
	},
	{
		title: "Annual report archive",
		status: "planned",
		description:
			"Launch-year and annual reports will be linked as formal public reports are prepared.",
		href: "/resources",
	},
	{
		title: "Donor privacy policy",
		status: "available",
		description:
			"Current privacy commitments are published for donors, volunteers, partners, and site visitors.",
		href: "/privacy#donor-data",
	},
	{
		title: "Terms and use policy",
		status: "available",
		description:
			"Website terms explain acceptable use, donation disclaimers, and general public-site boundaries.",
		href: "/terms",
	},
];

export const reportingCadence = [
	"Project updates after major distributions or program milestones",
	"Annual impact summary after year-end reconciliation",
	"Public document updates when reports, policies, or registration files are added",
	"Direct donor support through the contact page for receipt or restricted-gift questions",
] as const;

export const policyLinks = [
	{ label: "Annual report archive", href: "/resources" },
	{ label: "Donor privacy", href: "/privacy#donor-data" },
	{ label: "Terms of use", href: "/terms" },
	{ label: "Contact leadership", href: "/contact" },
];
