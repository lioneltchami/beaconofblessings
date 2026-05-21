export interface ProgramGiftUse {
	amount: string;
	description: string;
}

export interface Program {
	slug: string;
	title: string;
	kicker: string;
	summary: string;
	location: string;
	status: "active" | "planned";
	whoBenefits: string;
	whatHappens: string[];
	giftUses: ProgramGiftUse[];
	outcomes: string[];
	proofPoints: string[];
	ctaLabel: string;
	donationCta: string;
}

export const programs: Program[] = [
	{
		slug: "school-readiness-kits",
		title: "School Readiness Kits",
		kicker: "Supplies that remove the first barrier to attendance",
		summary:
			"We provide school bags, notebooks, writing materials, textbooks, and basic learning supplies so children can return to class prepared and dignified.",
		location: "Partner schools and community clusters in Lagos, Nigeria",
		status: "active",
		whoBenefits:
			"Primary and junior secondary students whose families cannot consistently afford required school materials.",
		whatHappens: [
			"Teachers and community leaders help identify students with the clearest need.",
			"Supplies are purchased in bulk, packed into age-appropriate kits, and distributed through school partners.",
			"Attendance and teacher feedback are reviewed after distribution to understand what changed.",
		],
		giftUses: [
			{ amount: "N10,000", description: "Funds notebooks and writing materials for one student." },
			{ amount: "N25,000", description: "Provides a complete school readiness kit." },
			{ amount: "N250,000", description: "Equips a classroom group with core supplies." },
		],
		outcomes: [
			"Fewer children arrive without basic materials.",
			"Families can redirect limited income toward food, transport, and school levies.",
			"Teachers have a clearer view of which students need longer-term support.",
		],
		proofPoints: [
			"Distribution lists are reconciled against partner-school sign-off sheets.",
			"Photos, receipts, and beneficiary counts are retained for annual reporting.",
			"Program totals are reviewed by Beacon of Blessings leadership before publication.",
		],
		ctaLabel: "Explore readiness kits",
		donationCta: "Fund school kits",
	},
	{
		slug: "girls-education-support",
		title: "Girls' Education Support",
		kicker: "Keeping girls in school through fees, mentoring, and care",
		summary:
			"We support girls at risk of interrupted education with school-cost relief, mentorship, and practical encouragement from trusted local partners.",
		location: "Underserved Lagos communities with school-partner referrals",
		status: "planned",
		whoBenefits:
			"Girls whose education is threatened by household financial pressure, caregiving demands, or lack of consistent support.",
		whatHappens: [
			"School partners nominate students with documented need and guardian consent.",
			"Support may cover fees, uniforms, supplies, exam costs, and mentoring sessions.",
			"Progress check-ins focus on attendance, retention, confidence, and family engagement.",
		],
		giftUses: [
			{ amount: "N15,000", description: "Offsets uniform or exam-material costs." },
			{ amount: "N60,000", description: "Supports a term of targeted school-cost relief." },
			{ amount: "N300,000", description: "Sponsors a small cohort with supplies and mentoring." },
		],
		outcomes: [
			"Girls remain enrolled through high-pressure school terms.",
			"Families receive practical relief before costs become a dropout trigger.",
			"Students build relationships with mentors who reinforce completion.",
		],
		proofPoints: [
			"Each scholarship file keeps referral notes, support provided, and follow-up status.",
			"Guardian and school acknowledgement are documented before funds are applied.",
			"Aggregated outcomes are shared publicly without exposing child identities.",
		],
		ctaLabel: "Explore girls' support",
		donationCta: "Support girls' education",
	},
	{
		slug: "digital-learning-access",
		title: "Digital Learning Access",
		kicker: "Shared tools for a more modern classroom",
		summary:
			"We help schools pilot shared digital-learning tools, teacher orientation, and solar charging support where power and device access are limited.",
		location: "Selected school partners in Lagos, Nigeria",
		status: "planned",
		whoBenefits:
			"Students and teachers in classrooms with limited access to digital materials, devices, and reliable charging.",
		whatHappens: [
			"Beacon assesses school readiness, storage, charging, and teacher support needs.",
			"Shared devices and content are deployed in controlled pilots before wider expansion.",
			"Teacher feedback shapes how devices are scheduled, protected, and used for lessons.",
		],
		giftUses: [
			{ amount: "N20,000", description: "Funds protective cases, cables, and accessories." },
			{ amount: "N150,000", description: "Contributes toward a shared classroom tablet set." },
			{ amount: "N500,000", description: "Helps fund devices, charging, and teacher orientation." },
		],
		outcomes: [
			"Students gain access to digital practice materials and guided learning content.",
			"Teachers can supplement lessons with reusable digital resources.",
			"Schools test a practical model before committing to larger infrastructure.",
		],
		proofPoints: [
			"Asset registers track devices, accessories, location, and responsible school contacts.",
			"Usage check-ins document teacher feedback and device condition.",
			"Pilot results guide any expansion request before new donor funds are committed.",
		],
		ctaLabel: "Explore digital access",
		donationCta: "Fund digital access",
	},
];

export function getProgramBySlug(slug: string) {
	return programs.find((program) => program.slug === slug);
}

export function getProgramSlugs() {
	return programs.map((program) => program.slug);
}
