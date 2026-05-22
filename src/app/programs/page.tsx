import {
	ArrowRight,
	BookOpenCheck,
	CheckCircle2,
	ClipboardCheck,
	FileText,
	Goal,
	HeartHandshake,
	MapPin,
	ShieldCheck,
	Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { programs } from "@/data/programs";
import { siteConfig } from "@/data/site";
import { programStockImages, stockImages } from "@/data/stock-images";

export const metadata: Metadata = {
	title: `Programs | ${siteConfig.name}`,
	description:
		"Explore Beacon of Blessings programs that keep children in school through supplies, scholarships, digital access, and accountable donor stewardship.",
};

const programPillars = [
	{
		title: "School materials first",
		description:
			"Basic supplies, books, and bags are prioritized because missing materials can keep children from participating fully in class.",
		icon: BookOpenCheck,
	},
	{
		title: "Targeted school-cost relief",
		description:
			"Support is routed through defined programs so families receive practical help before costs become a reason to withdraw a child.",
		icon: HeartHandshake,
	},
	{
		title: "Evidence-led follow-up",
		description:
			"Partner sign-off, receipts, counts, and field notes help the team understand what was delivered and what needs review.",
		icon: ClipboardCheck,
	},
];

const goals2026 = [
	"Students equipped: expand school-readiness kit distributions through verified school and community referrals.",
	"Girls supported: pilot girls' education support with documented guardian consent and school follow-up.",
	"Learning access: assess one digital-learning pilot before committing donor funds to wider device procurement.",
	"Publish program updates that separate delivered work, active commitments, and planned goals.",
];

const actionPaths = [
	{
		title: "Fund a specific program",
		description:
			"Choose the pathway that matches your giving intent and Beacon will track that restricted gift against the selected program.",
		href: "/donate",
		label: "Donate now",
		icon: HeartHandshake,
	},
	{
		title: "Refer a school or student need",
		description:
			"Share context with the team so potential support can be reviewed through local partners before any commitment is made.",
		href: "/contact",
		label: "Contact us",
		icon: Users,
	},
	{
		title: "Review public updates",
		description:
			"Follow program outcomes, delivery records, and lessons learned as Beacon reports work that has been completed or planned.",
		href: "/impact",
		label: "See impact",
		icon: FileText,
	},
];

export default function ProgramsPage() {
	return (
		<main className="flex flex-col bg-[#FAF6F1]">
			<section className="bg-[#FDF2EE] px-4 py-16 sm:py-24">
				<div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
							Donor-funded education programs
						</p>
						<h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[#8B3A24] sm:text-5xl">
							Programs that keep children learning
						</h1>
						<p className="mt-5 text-lg leading-relaxed text-[#2C1810]/75">
							Beacon of Blessings turns gifts into practical school support:
							supplies, targeted cost relief, mentoring, and shared learning
							tools for children in vulnerable Nigerian communities.
						</p>
					</div>
					<div className="grid gap-4 sm:grid-cols-[1fr_0.82fr]">
						<div className="relative min-h-[360px] overflow-hidden rounded-lg bg-[#2C1810]">
							<Image
								src={stockImages.classroomWriting}
								alt="Students writing in notebooks in a classroom"
								fill
								priority
								sizes="(min-width: 1024px) 32vw, 100vw"
								className="object-cover"
							/>
						</div>
						<div className="grid gap-4">
							<div className="relative min-h-[170px] overflow-hidden rounded-lg bg-[#2C1810]">
								<Image
									src={stockImages.schoolyard}
									alt="Schoolchildren gathered outside on school grounds"
									fill
									sizes="(min-width: 1024px) 22vw, 100vw"
									className="object-cover"
								/>
							</div>
							<div className="relative min-h-[170px] overflow-hidden rounded-lg bg-[#2C1810]">
								<Image
									src={stockImages.smilingStudent}
									alt="A smiling student in a classroom"
									fill
									sizes="(min-width: 1024px) 22vw, 100vw"
									className="object-cover"
								/>
							</div>
						</div>
					</div>

					<div className="lg:col-span-2 mt-10 grid gap-4 md:grid-cols-3">
						<div className="border-l-4 border-primary bg-white px-5 py-4 shadow-sm">
							<p className="font-semibold text-[#8B3A24]">What your gift funds</p>
							<p className="mt-2 text-sm leading-6 text-muted-foreground">
								Named programs with clear use cases, beneficiary groups, and
								delivery records that can be summarized for donors.
							</p>
						</div>
						<div className="border-l-4 border-[#E8A825] bg-white px-5 py-4 shadow-sm">
							<p className="font-semibold text-[#8B3A24]">Where the work happens</p>
							<p className="mt-2 text-sm leading-6 text-muted-foreground">
								School and community partnerships across Lagos, Nigeria, with
								local referral and follow-up.
							</p>
						</div>
						<div className="border-l-4 border-[#C05A3C] bg-white px-5 py-4 shadow-sm">
							<p className="font-semibold text-[#8B3A24]">How we prove it</p>
							<p className="mt-2 text-sm leading-6 text-muted-foreground">
								Receipts, sign-off records, distribution counts, field notes,
								and public impact updates when delivery records are complete.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="px-4 py-14 sm:py-16">
				<div className="mx-auto max-w-6xl">
					<div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
								Program pillars
							</p>
							<h2 className="mt-3 font-heading text-3xl font-bold text-[#8B3A24]">
								A practical education model, not a one-time handout.
							</h2>
							<p className="mt-4 leading-7 text-[#2C1810]/70">
								Each pathway starts with a concrete barrier to learning, then
								uses partner referrals and documented follow-up to keep support
								accountable without overstating results.
							</p>
						</div>
						<div className="grid gap-4 sm:grid-cols-3">
							{programPillars.map((pillar) => {
								const Icon = pillar.icon;

								return (
									<div
										key={pillar.title}
										className="border border-[#E8A825]/30 bg-white p-5 shadow-sm"
									>
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDF2EE] text-primary">
											<Icon className="h-5 w-5" />
										</div>
										<h3 className="mt-4 font-semibold text-[#8B3A24]">
											{pillar.title}
										</h3>
										<p className="mt-2 text-sm leading-6 text-muted-foreground">
											{pillar.description}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			<section className="px-4 py-16 sm:py-20">
				<div className="mx-auto max-w-6xl">
					<div className="max-w-3xl">
						<p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
							Current pathways
						</p>
						<h2 className="mt-3 font-heading text-3xl font-bold text-[#8B3A24]">
							Three focused ways to remove school barriers.
						</h2>
					</div>

					<div className="mt-8 grid gap-6 lg:grid-cols-3">
						{programs.map((program, index) => {
							const image = programStockImages[index] ?? programStockImages[0];

							return (
							<Card
								key={program.slug}
								className="overflow-hidden rounded-lg border-t-4 border-t-primary bg-white shadow-sm"
							>
								<div className="relative h-52 bg-[#2C1810]">
									<Image
										src={image.src}
										alt={image.alt}
										fill
										sizes="(min-width: 1024px) 28vw, 100vw"
										className="object-cover"
									/>
								</div>
								<CardHeader>
									<div className="flex items-start justify-between gap-3">
										<CardTitle className="text-xl text-[#8B3A24]">
											{program.title}
										</CardTitle>
										<Badge className="shrink-0 capitalize">{program.status}</Badge>
									</div>
									<p className="text-sm font-medium text-primary">
										{program.kicker}
									</p>
								</CardHeader>
								<CardContent className="flex flex-1 flex-col">
									<p className="leading-6 text-muted-foreground">
										{program.summary}
									</p>
									<div className="mt-5 flex items-start gap-2 text-sm text-[#2C1810]/70">
										<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
										<span>{program.location}</span>
									</div>
									<div className="mt-5 border border-[#E8A825]/30 bg-[#FFF9EF] p-4">
										<p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B3A24]">
											How gifts are used
										</p>
										<p className="mt-2 text-sm leading-6 text-[#2C1810]/70">
											{program.giftUses[0].amount} {program.giftUses[0].description}
										</p>
									</div>
									<ul className="mt-5 space-y-2">
										{program.outcomes.slice(0, 2).map((outcome) => (
											<li
												key={outcome}
												className="flex items-start gap-2 text-sm text-muted-foreground"
											>
												<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#B8861E]" />
												{outcome}
											</li>
										))}
									</ul>
									<div className="mt-5 border-t border-[#E8A825]/30 pt-4">
										<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8B3A24]">
											<ShieldCheck className="h-4 w-4 text-primary" />
											Donor proof
										</div>
										<p className="mt-2 text-sm leading-6 text-muted-foreground">
											{program.proofPoints[0]}
										</p>
									</div>
									<Link
										href={`/programs/${program.slug}`}
										className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-[#8B3A24]"
									>
										{program.ctaLabel}
										<ArrowRight className="h-4 w-4" />
									</Link>
								</CardContent>
							</Card>
							);
						})}
					</div>
				</div>
			</section>

			<section className="bg-white px-4 py-14 sm:py-16">
				<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
					<div>
						<div className="flex items-center gap-2 text-primary">
							<Goal className="h-5 w-5" />
							<span className="text-sm font-semibold uppercase tracking-[0.16em]">
								2026 impact goals
							</span>
						</div>
						<h2 className="mt-3 font-heading text-3xl font-bold text-[#8B3A24]">
							Growth targets tied to accountable delivery.
						</h2>
						<p className="mt-4 leading-7 text-[#2C1810]/70">
							These goals describe the direction for 2026. Final scale depends
							on partner readiness, verified need, available funding, and
							completed delivery records.
						</p>
					</div>
					<ul className="grid gap-3">
						{goals2026.map((goal) => (
							<li
								key={goal}
								className="flex items-start gap-3 border-l-4 border-[#E8A825] bg-[#FAF6F1] px-5 py-4 text-sm leading-6 text-[#2C1810]/75"
							>
								<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
								<span>{goal}</span>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className="bg-[#8B3A24] px-4 py-14 text-white">
				<div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
					<div className="max-w-2xl">
						<div className="flex items-center gap-2 text-[#F5D060]">
							<HeartHandshake className="h-5 w-5" />
							<span className="text-sm font-semibold uppercase tracking-[0.16em]">
								Restricted giving welcome
							</span>
						</div>
						<h2 className="mt-3 font-heading text-3xl font-bold">
							Give to the program that matches your conviction.
						</h2>
						<p className="mt-3 text-[#FDF2EE]/80">
							Restricted gifts are assigned to the selected program whenever
							possible. If a program is fully funded, delayed, or unable to use
							the gift responsibly, Beacon may contact donors or apply funds to
							the closest education need in line with its charitable purpose.
						</p>
					</div>
					<Link
						href="/donate"
						className="inline-flex h-11 items-center justify-center rounded-lg bg-[#E8A825] px-5 text-sm font-semibold text-[#2C1810] transition-colors hover:bg-[#F5D060]"
					>
						Donate now
					</Link>
				</div>
			</section>

			<section className="px-4 py-16 sm:py-20">
				<div className="mx-auto max-w-6xl">
					<div className="max-w-3xl">
						<p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
							Action paths
						</p>
						<h2 className="mt-3 font-heading text-3xl font-bold text-[#8B3A24]">
							Choose the next step that fits your role.
						</h2>
					</div>
					<div className="mt-8 grid gap-5 md:grid-cols-3">
						{actionPaths.map((path) => {
							const Icon = path.icon;

							return (
								<div key={path.title} className="bg-white p-6 shadow-sm">
									<div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FDF2EE] text-primary">
										<Icon className="h-5 w-5" />
									</div>
									<h3 className="mt-5 font-semibold text-[#8B3A24]">
										{path.title}
									</h3>
									<p className="mt-2 text-sm leading-6 text-muted-foreground">
										{path.description}
									</p>
									<Link
										href={path.href}
										className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-[#8B3A24]"
									>
										{path.label}
										<ArrowRight className="h-4 w-4" />
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</main>
	);
}
