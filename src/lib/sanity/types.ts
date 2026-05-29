/**
 * Sanity document types — these mirror the schema definitions
 * in sanity/schemas/ and are used for type-safe GROQ query results.
 */

export interface SanityImage {
	_type: "image";
	asset: {
		_ref?: string;
		_id?: string;
		_type?: "reference" | "sanity.imageAsset";
		url?: string;
	};
	alt?: string;
}

export interface LinkItem {
	label: string;
	href: string;
	external?: boolean;
}

export interface ContentImage {
	src: string;
	alt: string;
	caption?: string;
	sanityImage?: SanityImage;
}

export interface CTA {
	label: string;
	href: string;
	variant?: "primary" | "secondary" | "outline";
}

export interface CardItem {
	title: string;
	description: string;
	iconKey?: string;
	href?: string;
	ctaLabel?: string;
	order?: number;
}

export interface GiftUse {
	amount: string;
	title?: string;
	description: string;
}

export interface MetricItem {
	value: string;
	label: string;
	detail?: string;
	iconKey?: string;
}

export interface SectionContent {
	eyebrow?: string;
	title: string;
	body?: string;
}

export interface CtaSectionContent extends SectionContent {
	ctas?: CTA[];
}

export interface SanityProgram {
	_id?: string;
	_type?: "program";
	slug: string;
	title: string;
	kicker: string;
	summary: string;
	location: string;
	status: "active" | "planned";
	whoBenefits: string;
	whatHappens: string[];
	giftUses: GiftUse[];
	outcomes: string[];
	proofPoints: string[];
	ctaLabel: string;
	donationCta: string;
	featured?: boolean;
	visible?: boolean;
	order?: number;
	image?: SanityImage;
}

export interface PageHeroContent {
	eyebrow?: string;
	title: string;
	body?: string;
	ctas?: CTA[];
	images?: ContentImage[];
	verse?: {
		text: string;
		reference: string;
	};
}

export interface HomePageContent {
	hero: PageHeroContent;
	donorConfidence: {
		eyebrow: string;
		title: string;
		cards: CardItem[];
	};
	fieldMoments: {
		eyebrow: string;
		title: string;
		body: string;
		images: Array<ContentImage & { title: string }>;
	};
	programsIntro: {
		eyebrow: string;
		title: string;
		body: string;
	};
	giftSection: {
		eyebrow: string;
		title: string;
		body: string;
		cta: CTA;
		image: ContentImage;
		gifts: GiftUse[];
	};
	finalCta: {
		eyebrow: string;
		title: string;
		body: string;
		image: ContentImage;
		ctas: CTA[];
	};
	representativeImageNote: string;
}

export interface ProgramsPageContent {
	hero: PageHeroContent;
	proofCards: CardItem[];
	pillars: CardItem[];
	goals: string[];
	actionPaths: CardItem[];
}

export interface AboutPageContent {
	hero: PageHeroContent;
	story: {
		eyebrow: string;
		title: string;
		subtitle: string;
		body: string;
		cards: CardItem[];
	};
	milestones: Array<{ year: string; title: string; description: string }>;
	goals2026: string[];
	operatingPrinciples: CardItem[];
}

export interface ImpactPageContent {
	hero: PageHeroContent;
	report: {
		period: string;
		headline: string;
		summary: string;
		evidence: string[];
	};
	metrics: Array<{ value: string; label: string; detail: string }>;
	outcomePathway: Array<{ step: string; description: string }>;
	visualProof: {
		eyebrow: string;
		title: string;
		body: string;
		images: Array<ContentImage & { title: string }>;
	};
}

export interface TransparencyPageContent {
	hero: PageHeroContent;
	summaryCards: CardItem[];
	facts: Array<{ label: string; value: string }>;
	boardMembers: Array<{ name: string; role: string; focus: string }>;
	donationUse: Array<{ label: string; value: string }>;
	stewardshipStandards: Array<{ label: string; value: string }>;
	reportingCadence: string[];
	documentStatuses: Array<{
		title: string;
		status: "available" | "pending" | "planned";
		description: string;
		href?: string;
	}>;
	policyLinks: LinkItem[];
}

export interface ContactPageContent {
	hero: PageHeroContent;
	responseWindow: {
		label: string;
		value: string;
		description: string;
		image: ContentImage;
	};
	getInvolved: CardItem[];
	trustNotes: Array<{ title: string; description: string }>;
}

export interface DonatePageContent {
	hero: PageHeroContent;
	impactSection: {
		title: string;
		cards: CardItem[];
	};
	formSection: SectionContent;
	whyGive: {
		title: string;
		body: string;
		cards: CardItem[];
	};
}

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

export interface ProjectsPageContent {
	hero: PageHeroContent;
	metrics: MetricItem[];
	completedIntro: SectionContent;
	currentIntro: SectionContent;
	upcomingIntro: SectionContent;
	cta: CtaSectionContent;
}

export interface GalleryPageContent {
	hero: PageHeroContent;
	note: CardItem;
	cta: CtaSectionContent;
}

export interface ResourcesPageContent {
	hero: PageHeroContent;
	registrationBanner: SectionContent;
	documentsIntro: SectionContent;
	cta: CtaSectionContent;
}

export interface SanityProject {
	_id: string;
	_type: "project";
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
	image?: SanityImage;
}

export interface SanityBlogPost {
	_id: string;
	_type: "blogPost";
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	author: string;
	date: string;
	category: string;
	readTime: string;
	tags: string[];
	image?: SanityImage;
}

export interface SanityFounder {
	_id: string;
	_type: "founder";
	name: string;
	role: string;
	bio: string;
	initials: string;
	image?: SanityImage;
	order: number;
}

export interface SanityGalleryItem {
	_id: string;
	_type: "galleryItem";
	title: string;
	description: string;
	category: string;
	date: string;
	image?: SanityImage;
}

export interface SanitySiteConfig {
	_id: string;
	_type: "siteConfig";
	name: string;
	legalName?: string;
	tagline: string;
	description: string;
	url?: string;
	email: string;
	phone: string;
	address: string;
	officeHours: string;
	founded?: number;
	registrationStatus?: string;
	serviceArea?: string;
	logoInitials?: string;
	navLinks?: LinkItem[];
	footerTrustLinks?: LinkItem[];
	socialLinks?: LinkItem[];
}

export interface SanityCoreValue {
	_id: string;
	_type: "coreValue";
	title: string;
	description: string;
	verse: string;
	order: number;
}

export interface SanityImpactStat {
	_id: string;
	_type: "impactStat";
	value: string;
	label: string;
	order: number;
}

export interface SanityAlbumPhoto {
	id: string;
	title: string;
	description?: string;
	image?: SanityImage;
}

export interface SanityAlbum {
	_id: string;
	_type: "album";
	slug: string;
	title: string;
	description: string;
	category: string;
	date: string;
	photoCount: number;
	photos: SanityAlbumPhoto[];
	coverImage?: SanityImage;
}

export interface SanityResource {
	_id: string;
	_type: "resource";
	/** Alias kept for component compatibility with static Resource type */
	id: string;
	title: string;
	description: string;
	category: "registration" | "annual-reports" | "project-reports" | "policies";
	fileType: "pdf" | "pptx" | "docx" | "xlsx";
	fileSize: string;
	date: string;
	fileUrl?: string;
	file?: {
		asset?: {
			url?: string;
		};
	};
}
