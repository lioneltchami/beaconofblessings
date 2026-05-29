import type {
	CardItem,
	CTA,
	GiftUse,
	MetricItem,
	PageHeroContent,
	SectionContent,
} from "@/lib/sanity/types";

export interface SponsorTier {
	name: string;
	amount: string;
	bestFor: string;
	funds: string;
	recognition: string[];
}

export interface SponsorNeed {
	item: string;
	amount: string;
	detail: string;
}

export interface SponsorProcessStep {
	step: string;
	title: string;
	description: string;
}

export interface PartnerPageContent {
	hero: PageHeroContent;
	trustBar: MetricItem[];
	whyPartner: SectionContent;
	dueDiligence: CardItem[];
	tiersIntro: SectionContent;
	tiers: SponsorTier[];
	needsIntro: SectionContent;
	currentNeeds: SponsorNeed[];
	processIntro: SectionContent;
	process: SponsorProcessStep[];
	recognitionPolicy: SectionContent & { points: string[] };
	reportingPromise: SectionContent & { points: string[] };
	finalCta: SectionContent & { ctas: CTA[] };
}

export const sponsorTrustBar: MetricItem[] = [
	{ value: "CAC 8271788", label: "Registered Charity Initiative" },
	{ value: "N1,372,200", label: "First Project Fully Reported" },
	{ value: "92+", label: "Children Equipped" },
	{ value: "2024", label: "First Field Project" },
];

export const sponsorDueDiligence: CardItem[] = [
	{
		title: "Legal status",
		description:
			"Beacon of Blessings Charity Initiative is registered with Nigeria's Corporate Affairs Commission. CAC registration 8271788 is published with the certificate on the Resources page.",
		iconKey: "badge",
		href: "/resources",
		ctaLabel: "View documents",
	},
	{
		title: "Financial proof",
		description:
			"The first project financial report records N1,372,200 received and N1,372,200 spent, with school-supply and outreach costs itemized.",
		iconKey: "file",
		href: "/resources",
		ctaLabel: "Open report",
	},
	{
		title: "Child-safe evidence",
		description:
			"Project proof uses receipts, field notes, child-safe photos, and beneficiary counts without publicly naming children.",
		iconKey: "shield",
		href: "/transparency",
		ctaLabel: "Review standards",
	},
];

export const sponsorTiers: SponsorTier[] = [
	{
		name: "Field Supporter",
		amount: "N250,000+",
		bestFor: "Small businesses, churches, alumni groups, and family foundations",
		funds:
			"A focused bundle of school-readiness supplies or logistics for one outreach activity.",
		recognition: [
			"Listed on the sponsor acknowledgement section",
			"Thank-you note and receipt",
			"Short post-project impact summary",
		],
	},
	{
		name: "Project Partner",
		amount: "N750,000+",
		bestFor: "Companies and CSR teams funding a named project component",
		funds:
			"Supplies, transport, volunteer support, and reporting for a project workstream.",
		recognition: [
			"Logo acknowledgement with permission",
			"Project recap with approved photos",
			"Annual report acknowledgement",
		],
	},
	{
		name: "Impact Sponsor",
		amount: "N1,500,000+",
		bestFor: "Corporate sponsors and foundations funding a full outreach cycle",
		funds:
			"End-to-end outreach support from procurement through distribution and public reporting.",
		recognition: [
			"Named project sponsor acknowledgement",
			"Quarterly snapshot while active",
			"Post-project story package for internal CSR reporting",
		],
	},
];

export const sponsorCurrentNeeds: SponsorNeed[] = [
	{
		item: "School-readiness kits",
		amount: "N25,000 per child estimate",
		detail:
			"Helps fund bags, writing materials, and basic classroom participation support.",
	},
	{
		item: "Outreach logistics",
		amount: "N150,000+",
		detail:
			"Supports transport, packing, volunteer movement, and safe delivery coordination.",
	},
	{
		item: "Project reporting",
		amount: "N100,000+",
		detail:
			"Funds documentation, child-safe media handling, receipts, and public reporting materials.",
	},
	{
		item: "Full project pool",
		amount: "Custom",
		detail:
			"Combines supply procurement, delivery, field operations, and post-project reporting.",
	},
];

export const sponsorProcess: SponsorProcessStep[] = [
	{
		step: "01",
		title: "Fit conversation",
		description:
			"We confirm your CSR goals, preferred giving type, recognition comfort, and reporting needs.",
	},
	{
		step: "02",
		title: "Written scope",
		description:
			"Beacon shares a simple project scope with budget, timeline, permitted recognition, and proof expectations.",
	},
	{
		step: "03",
		title: "Delivery and records",
		description:
			"Funds or in-kind support are tracked against the approved purpose with receipts and field notes retained.",
	},
	{
		step: "04",
		title: "Impact recap",
		description:
			"Sponsors receive a concise recap with outcomes, approved photos where available, and next-step opportunities.",
	},
];

export const sponsorGiftUses: GiftUse[] = [
	{
		amount: "N25k",
		title: "One child equipped",
		description: "Estimated school-readiness support tied to a named project pool.",
	},
	{
		amount: "N250k",
		title: "Field support bundle",
		description: "A practical contribution toward supplies, logistics, or reporting.",
	},
	{
		amount: "N1.5m+",
		title: "Full outreach sponsorship",
		description: "Custom project sponsorship with a defined reporting package.",
	},
];

export const partnerPageContent: PartnerPageContent = {
	hero: {
		eyebrow: "Corporate giving and project sponsorship",
		title: "Partner with Beacon of Blessings",
		body:
			"Help children in underserved Nigerian communities stay ready for school through a sponsorship path that is clear, documented, and respectful of children and donors.",
		ctas: [
			{
				label: "Request Sponsor Conversation",
				href: "/contact?subject=Corporate%20Sponsorship",
			},
			{
				label: "Download Sponsor Brief",
				href: "/documents/beacon-of-blessings-sponsor-brief-2026.pdf",
				variant: "outline",
			},
		],
	},
	trustBar: sponsorTrustBar,
	whyPartner: {
		eyebrow: "Why sponsors choose this work",
		title: "Education support is tangible, local, and reportable.",
		body:
			"Beacon is young, so we keep sponsorship simple: practical school support, documented spending, child-safe storytelling, and a direct line to the team responsible for follow-up.",
	},
	dueDiligence: sponsorDueDiligence,
	tiersIntro: {
		title: "Three clear ways to sponsor",
		body:
			"These tiers are starting points. We can shape a custom partnership when a sponsor needs a defined project, employee-volunteer moment, or specific internal reporting format.",
	},
	tiers: sponsorTiers,
	needsIntro: {
		title: "Current sponsor-ready needs",
		body:
			"These are practical funding lanes a sponsor can understand quickly. Final budgets are confirmed before funds are restricted to a project.",
	},
	currentNeeds: sponsorCurrentNeeds,
	processIntro: {
		title: "What happens after you reach out",
		body:
			"Sponsors should not have to guess how support will be handled. This is the light process we use before any public recognition or restricted funding promise.",
	},
	process: sponsorProcess,
	recognitionPolicy: {
		title: "Recognition with clear boundaries",
		body:
			"Recognition is acknowledgement, not advertising. Beacon can thank sponsors publicly when appropriate, but recognition does not imply product endorsement or guarantee commercial exposure.",
		points: [
			"Logo use requires written permission from the sponsor.",
			"Cause-marketing campaigns must state the exact amount or percentage supporting Beacon.",
			"Children are not named publicly, and identifiable photos require appropriate consent.",
		],
	},
	reportingPromise: {
		title: "Reporting sponsors can use internally",
		body:
			"Each sponsor relationship should leave a useful record: what was funded, what happened, and what proof is available for internal CSR or board reporting.",
		points: [
			"Receipt or acknowledgement after funds are received.",
			"Project snapshot during active sponsorship when timing allows.",
			"Post-project recap with outcomes and approved child-safe media.",
			"Annual report acknowledgement when applicable.",
		],
	},
	finalCta: {
		title: "Start with one clear conversation.",
		body:
			"Tell us your budget range, preferred timeline, and whether you need a CSR, church, school, or foundation-ready sponsorship format.",
		ctas: [
			{
				label: "Request Sponsor Conversation",
				href: "/contact?subject=Corporate%20Sponsorship",
			},
			{ label: "Review Transparency", href: "/transparency", variant: "outline" },
		],
	},
};
