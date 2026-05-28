import {
	boardMembers,
	documentStatuses,
	donationUse,
	impactMetrics,
	impactReport,
	outcomePathway,
	policyLinks,
	reportingCadence,
	stewardshipStandards,
	transparencyFacts,
} from "@/data/impact";
import { siteConfig } from "@/data/site";
import {
	fieldMomentImages,
	programStockImages,
	stockImages,
} from "@/data/stock-images";
import type {
	AboutPageContent,
	ContactPageContent,
	DonatePageContent,
	GalleryPageContent,
	HomePageContent,
	ImpactPageContent,
	ProgramsPageContent,
	ProjectsPageContent,
	ResourcesPageContent,
	TransparencyPageContent,
} from "@/lib/sanity/types";

export const homePageContent: HomePageContent = {
	hero: {
		eyebrow: "Lagos, Nigeria",
		title: "Help children stay in school with dignity and hope.",
		body: `${siteConfig.name} turns faith into practical education support: school supplies, learning access, and local school partnerships for vulnerable Nigerian children.`,
		ctas: [
			{ label: "Give Today", href: "/donate", variant: "primary" },
			{ label: "See the Impact", href: "/impact", variant: "outline" },
		],
		images: [
			{
				src: stockImages.classroomFocus,
				alt: "Children seated in a classroom during a lesson",
			},
			{
				src: stockImages.schoolyard,
				alt: "Schoolchildren gathered on school grounds",
			},
			{
				src: stockImages.smilingStudent,
				alt: "A smiling student looking through a classroom window",
			},
		],
	},
	donorConfidence: {
		eyebrow: "Donor confidence",
		title: "Simple mission. Visible follow-up.",
		cards: [
			{
				title: "Program gifts are tracked",
				description:
					"Gifts are connected to the program they support so updates can stay practical and traceable.",
			},
			{
				title: "Child-safe reporting",
				description:
					"Public updates protect children while still showing donors what was delivered and learned.",
			},
			{
				title: "Receipts and records retained",
				description:
					"Receipts, field notes, and delivery records are kept for review before updates are shared.",
			},
		],
	},
	fieldMoments: {
		eyebrow: "Field moments",
		title:
			"Let people see the kind of classrooms, students, and school days their gifts support.",
		body: "These are temporary representative photos. As Beacon collects its own child-safe field media, this section can become the living proof wall for distributions, visits, and partner schools.",
		images: fieldMomentImages,
	},
	programsIntro: {
		eyebrow: "Programs",
		title: "Three focused ways to keep students learning.",
		body: "Each program starts with a concrete barrier and a clear path for donor support.",
	},
	giftSection: {
		eyebrow: "Where your gift goes",
		title: "Specific gifts. Specific help.",
		body: "Each gift is tied to practical education support, with deeper program and transparency details available when donors want to review the work.",
		cta: { label: "Review transparency commitments", href: "/transparency" },
		image: {
			src: stockImages.classroomGroup,
			alt: "Students seated together at classroom desks",
		},
		gifts: [
			{
				amount: "$25",
				title: "School supplies",
				description: "Notebooks, pens, and classroom basics for one student.",
			},
			{
				amount: "$75",
				title: "Learning kit",
				description:
					"A school bag, writing materials, and core study resources.",
			},
			{
				amount: "$250",
				title: "Classroom support",
				description: "Shared books and supplies for a small learning group.",
			},
		],
	},
	finalCta: {
		eyebrow: "Ready to help?",
		title: "Give once, give monthly, or partner with us.",
		body: "The fastest way to help is a secure gift. If you represent a school, church, company, or community group, we would also love to hear from you.",
		image: {
			src: stockImages.smilingStudent,
			alt: "A smiling student in a classroom",
		},
		ctas: [
			{ label: "Give Today", href: "/donate", variant: "primary" },
			{ label: "Partner With Us", href: "/contact", variant: "outline" },
		],
	},
	representativeImageNote:
		"Representative school imagery from Pexels while Beacon field photos are added.",
};

export const programsPageContent: ProgramsPageContent = {
	hero: {
		eyebrow: "Donor-funded education programs",
		title: "Programs that keep children learning",
		body: "Beacon of Blessings turns gifts into practical school support: supplies, targeted cost relief, mentoring, and shared learning tools for children in vulnerable Nigerian communities.",
		images: programStockImages,
	},
	proofCards: [
		{
			title: "What your gift funds",
			description:
				"Named programs with clear use cases, beneficiary groups, and delivery records that can be summarized for donors.",
		},
		{
			title: "Where the work happens",
			description:
				"School and community partnerships across Lagos, Nigeria, with local referral and follow-up.",
		},
		{
			title: "How we prove it",
			description:
				"Receipts, sign-off records, distribution counts, field notes, and public impact updates when delivery records are complete.",
		},
	],
	pillars: [
		{
			title: "School materials first",
			description:
				"Basic supplies, books, and bags are prioritized because missing materials can keep children from participating fully in class.",
			iconKey: "book",
		},
		{
			title: "Targeted school-cost relief",
			description:
				"Support is routed through defined programs so families receive practical help before costs become a reason to withdraw a child.",
			iconKey: "heart",
		},
		{
			title: "Evidence-led follow-up",
			description:
				"Partner sign-off, receipts, counts, and field notes help the team understand what was delivered and what needs review.",
			iconKey: "clipboard",
		},
	],
	goals: [
		"Students equipped: expand school-readiness kit distributions through verified school and community referrals.",
		"Girls supported: pilot girls' education support with documented guardian consent and school follow-up.",
		"Learning access: assess one digital-learning pilot before committing donor funds to wider device procurement.",
		"Publish program updates that separate delivered work, active commitments, and planned goals.",
	],
	actionPaths: [
		{
			title: "Fund a specific program",
			description:
				"Choose the pathway that matches your giving intent and Beacon will track that restricted gift against the selected program.",
			href: "/donate",
			ctaLabel: "Donate now",
			iconKey: "heart",
		},
		{
			title: "Refer a school or student need",
			description:
				"Share context with the team so potential support can be reviewed through local partners before any commitment is made.",
			href: "/contact",
			ctaLabel: "Contact us",
			iconKey: "users",
		},
		{
			title: "Review public updates",
			description:
				"Follow program outcomes, delivery records, and lessons learned as Beacon reports work that has been completed or planned.",
			href: "/impact",
			ctaLabel: "See impact",
			iconKey: "file",
		},
	],
};

export const aboutPageContent: AboutPageContent = {
	hero: {
		eyebrow: "About the initiative",
		title: `About ${siteConfig.name}: helping more children stay in school.`,
		body: `${siteConfig.name} is a faith-guided education support movement serving vulnerable children and families in Nigeria, beginning with the practical barriers that keep students out of classrooms. It is a movement to keep Nigerian children learning beyond a single distribution.`,
		images: [
			{
				src: stockImages.outdoorLearning,
				alt: "Students gathered outdoors for a school learning session",
			},
		],
		verse: {
			text: "The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor.",
			reference: "Luke 4:18",
		},
	},
	story: {
		eyebrow: "Founder-led, community-minded",
		title: "Our Story",
		subtitle: "Founder credibility starts with proximity to the problem.",
		body: "Beacon of Blessings began with a direct observation: children were missing opportunities to learn because ordinary school essentials were out of reach. The founders are not presenting a distant institution; they are building a practical charity initiative around visible need, leadership responsibility, program priorities, donor stewardship, local relationships, and disciplined follow through.",
		cards: [
			{ title: "Faith", description: "Guided by compassion" },
			{ title: "Education", description: "Focused on school access" },
			{ title: "Stewardship", description: "Built for accountable giving" },
		],
	},
	milestones: [
		{
			year: "2024",
			title: "The conviction became a charity initiative",
			description:
				"Beacon of Blessings Charity Initiative was formed after seeing how often a child can be kept out of school by something as basic as notebooks, pens, or a school bag.",
		},
		{
			year: "2024",
			title: "First school supplies outreach",
			description:
				"The founding team organized its first school supplies drive for students in Lagos communities, turning personal concern into coordinated action.",
		},
		{
			year: "2025",
			title: "Building repeatable community support",
			description:
				"The work shifted from a single outreach moment toward a steadier model: trusted local relationships, clearer program planning, and practical support families can feel.",
		},
		{
			year: "2026",
			title: "Growth with stronger accountability",
			description:
				"The next phase is focused on school readiness, targeted scholarships, transparent reporting, and partnerships that help more children stay in class.",
		},
	],
	goals2026: [
		"Run focused back-to-school support for children who need basic learning materials.",
		"Pilot scholarship support for students whose schooling is at risk because of cost.",
		"Publish clearer impact updates so donors can see where support goes and what changed.",
		"Deepen community partnerships before expanding into new program areas.",
	],
	operatingPrinciples: [
		{
			title: "Child-first decisions",
			description:
				"Programs are judged by whether they remove a real barrier between a child and learning.",
		},
		{
			title: "Local trust before scale",
			description:
				"Growth should follow relationships, listening, and evidence from the communities being served.",
		},
		{
			title: "Faith expressed through service",
			description:
				"Compassion is treated as practical work: showing up, giving responsibly, and keeping promises.",
		},
		{
			title: "Accountability as stewardship",
			description:
				"Donations, time, and attention are handled with care because every resource belongs to the mission.",
		},
	],
};

export const impactPageContent: ImpactPageContent = {
	hero: {
		eyebrow: "Impact reporting",
		title: "Measurable impact, documented with care",
		body: impactReport.summary,
		images: [
			{
				src: stockImages.schoolyard,
				alt: "Schoolchildren gathered outside on school grounds",
			},
		],
	},
	report: impactReport,
	metrics: impactMetrics,
	outcomePathway,
	visualProof: {
		eyebrow: "Visual proof",
		title: "Impact should feel visible before it becomes a report.",
		body: "These representative images hold the space for Beacon's own child-safe media library as school visits and distributions are documented.",
		images: fieldMomentImages,
	},
};

export const transparencyPageContent: TransparencyPageContent = {
	hero: {
		eyebrow: "Donor accountability",
		title: "Transparent stewardship",
		body: "Trust is part of the mission. This page gathers the governance, donation-use, and policy information donors need before giving to Beacon of Blessings, with formal public documents linked as they are verified and approved.",
	},
	summaryCards: [
		{
			title: "Current status",
			description: "Honest about what is verified and what is pending",
		},
		{
			title: "Donation controls",
			description: "Program intent, receipts, and records are tracked",
		},
		{
			title: "Public updates",
			description: "Reports and documents are linked as they are approved",
		},
	],
	facts: [...transparencyFacts],
	boardMembers: [...boardMembers],
	donationUse: [...donationUse],
	stewardshipStandards: [...stewardshipStandards],
	reportingCadence: [...reportingCadence],
	documentStatuses: [...documentStatuses],
	policyLinks: [...policyLinks],
};

export const contactPageContent: ContactPageContent = {
	hero: {
		eyebrow: "Donor, volunteer, and partner support",
		title: "Let's make the next step clear.",
		body: "Whether you want to give, volunteer, partner, or verify details before supporting Beacon, this is the fastest path to the right conversation.",
	},
	responseWindow: {
		label: "Response window",
		value: "24-48 hours",
		description:
			"Include your preferred contact method and topic so the right person can follow up cleanly.",
		image: {
			src: stockImages.classroomGroup,
			alt: "Students seated together at classroom desks",
		},
	},
	getInvolved: [
		{
			iconKey: "heart",
			title: "Donate",
			description:
				"Fund school supplies, uniforms, tuition support, and reportable education programs.",
			href: "/donate",
			ctaLabel: "Give today",
		},
		{
			iconKey: "users",
			title: "Volunteer",
			description:
				"Offer time, skills, mentorship, workshop support, or community outreach help.",
			href: "/contact?subject=Volunteer",
			ctaLabel: "Start a conversation",
		},
		{
			iconKey: "handshake",
			title: "Partner",
			description:
				"Collaborate as a company, school, church, or community group to expand reach.",
			href: "/contact?subject=Partnership",
			ctaLabel: "Discuss partnership",
		},
		{
			iconKey: "share",
			title: "Spread the Word",
			description:
				"Share verified impact, program pages, and donation links with your network.",
			href: "/impact",
			ctaLabel: "Share our impact",
		},
	],
	trustNotes: [
		{
			title: "Donor clarity",
			description: "Ask before giving, verify program use, or request receipt support.",
		},
		{
			title: "Partnership fit",
			description: "Schools, companies, churches, and community groups can start here.",
		},
		{
			title: "Safeguarding first",
			description: "Public stories and photos are handled with consent and care.",
		},
	],
};

export const donatePageContent: DonatePageContent = {
	hero: {
		title: "Make a Difference",
		body: "Your generosity provides school supplies, scholarships, and hope to children who need it most.",
		verse: {
			text: "Whoever is kind to the poor lends to the LORD, and he will reward them for what they have done.",
			reference: "Proverbs 19:17",
		},
	},
	impactSection: {
		title: "Your Donation Makes an Impact",
		cards: [
			{
				iconKey: "book",
				title: "School Supplies",
				description: "Notebooks, pens, and bags for students who have none",
			},
			{
				iconKey: "graduation",
				title: "Scholarships",
				description: "Helping bright students stay in school",
			},
			{
				iconKey: "package",
				title: "Learning Materials",
				description: "Textbooks and educational resources for classrooms",
			},
			{
				iconKey: "users",
				title: "Community Impact",
				description: "Supporting entire communities through education",
			},
		],
	},
	formSection: {
		title: "Choose Your Gift",
		body: "Every contribution, no matter the size, changes a life.",
	},
	whyGive: {
		title: "Why Give?",
		body: `When you give to ${siteConfig.name}, you partner with a team committed to integrity, transparency, and lasting impact.`,
		cards: [
			{
				iconKey: "shield",
				title: "Transparent Stewardship",
				description:
					"Every donation is tracked and directed to the communities that need it most.",
			},
			{
				iconKey: "heart",
				title: "Faith-Driven Mission",
				description:
					"We are guided by our commitment to sharing the love of Christ through action.",
			},
			{
				iconKey: "hand-heart",
				title: "Program-Focused Impact",
				description:
					"Your generosity is tracked with program intent, reporting, and responsible operating controls.",
			},
		],
	},
};

export const projectsPageContent: ProjectsPageContent = {
	hero: {
		title: "Our Projects",
		verse: {
			text: "Faith by itself, if it is not accompanied by action, is dead.",
			reference: "James 2:17",
		},
	},
	metrics: [
		{ value: "92+", label: "Children Equipped", iconKey: "users" },
		{ value: "N1,372,200", label: "Invested", iconKey: "money" },
		{ value: "2024", label: "First Outreach", iconKey: "map" },
		{ value: "1", label: "Completed Project", iconKey: "trend" },
	],
	completedIntro: {
		title: "Completed Projects",
		body: "Projects we have successfully delivered to our communities.",
	},
	currentIntro: {
		title: "Current Projects",
		body: "Active work now moving through planning, funding, delivery, or reporting.",
	},
	upcomingIntro: {
		title: "Upcoming Projects",
		body: "What we are working on next to expand our impact.",
	},
	cta: {
		title: "Support Our Next Project",
		body: "Your contribution helps us bring education to more communities. Every gift, no matter the size, makes a difference.",
		ctas: [{ label: "Donate Now", href: "/donate" }],
	},
};

export const galleryPageContent: GalleryPageContent = {
	hero: {
		title: "Gallery",
		body: "Our visual journey of making a difference",
		eyebrow:
			"Browse our photo albums documenting community impact across Nigeria",
	},
	note: {
		title: "Photo documentation",
		description:
			"Real photos are being documented and will replace these placeholders soon. Thank you for your patience as we capture our ongoing work.",
	},
	cta: {
		title: "See Our Work Firsthand",
		body: "Want to witness the impact in person? Join our team of volunteers and help us illuminate more futures.",
		ctas: [{ label: "Volunteer With Us", href: "/contact" }],
	},
};

export const resourcesPageContent: ResourcesPageContent = {
	hero: {
		title: "Resources & Documents",
		body: "We believe in clear transparency. Public documents are linked here as they are verified and approved for posting; unavailable files are marked as coming soon.",
	},
	registrationBanner: {
		title: "CAC Registration Confirmed",
		body: "Beacon of Blessings Charity Initiative is registered with Nigeria's Corporate Affairs Commission. Registration number: 8271788. Tax Identification Number: 32841511-0001.",
	},
	documentsIntro: {
		title: "Our Documents",
	},
	cta: {
		title: "Have questions about our governance?",
		body: "We are happy to provide additional information about our registration, finances, or operations.",
		ctas: [{ label: "Contact Us", href: "/contact" }],
	},
};
