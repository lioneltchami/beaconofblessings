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
import { programsPageContent as staticProgramsPageContent } from "@/data/pages";
import { siteConfig } from "@/data/site";
import { programStockImages } from "@/data/stock-images";
import { getPrograms, getProgramsPage } from "@/lib/sanity/queries";

export const metadata: Metadata = {
	title: `Programs | ${siteConfig.name}`,
	description:
		"Explore Beacon of Blessings programs that keep children in school through supplies, scholarships, digital access, and accountable donor stewardship.",
};

const iconByKey = {
	book: BookOpenCheck,
	clipboard: ClipboardCheck,
	file: FileText,
	heart: HeartHandshake,
	users: Users,
} as const;

export default async function ProgramsPage() {
	const [content, programs] = await Promise.all([
		getProgramsPage(),
		getPrograms(),
	]);
	const staticHeroImages = staticProgramsPageContent.hero.images ?? programStockImages;
	const heroImages = [
		content.hero.images?.[0] ?? staticHeroImages[0]!,
		content.hero.images?.[1] ?? staticHeroImages[1]!,
		content.hero.images?.[2] ?? staticHeroImages[2]!,
	];

	return (
		<main className="flex flex-col bg-[#FAF6F1]">
			<section className="bg-[#EAF6EF] px-4 py-16 sm:py-24">
				<div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
							{content.hero.eyebrow}
						</p>
						<h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[#256B4B] sm:text-5xl">
							{content.hero.title}
						</h1>
						<p className="mt-5 text-lg leading-relaxed text-[#21352B]/75">
							{content.hero.body}
						</p>
					</div>
					<div className="grid gap-4 sm:grid-cols-[1fr_0.82fr]">
						<div className="relative min-h-[360px] overflow-hidden rounded-lg bg-[#21352B]">
							<Image
								src={heroImages[0]!.src}
								alt={heroImages[0]!.alt}
								fill
								priority
								sizes="(min-width: 1024px) 32vw, 100vw"
								className="object-cover"
							/>
						</div>
						<div className="grid gap-4">
							<div className="relative min-h-[170px] overflow-hidden rounded-lg bg-[#21352B]">
								<Image
									src={heroImages[1]!.src}
									alt={heroImages[1]!.alt}
									fill
									sizes="(min-width: 1024px) 22vw, 100vw"
									className="object-cover"
								/>
							</div>
							<div className="relative min-h-[170px] overflow-hidden rounded-lg bg-[#21352B]">
								<Image
									src={heroImages[2]!.src}
									alt={heroImages[2]!.alt}
									fill
									sizes="(min-width: 1024px) 22vw, 100vw"
									className="object-cover"
								/>
							</div>
						</div>
					</div>

					<div className="lg:col-span-2 mt-10 grid gap-4 md:grid-cols-3">
						{content.proofCards.map((card, index) => (
							<div
								key={card.title}
								className={[
									"border-l-4 bg-white px-5 py-4 shadow-sm",
									index === 1
										? "border-[#E8A825]"
										: index === 2
											? "border-[#2D3A6E]"
											: "border-primary",
								].join(" ")}
							>
								<p className="font-semibold text-[#256B4B]">{card.title}</p>
								<p className="mt-2 text-sm leading-6 text-muted-foreground">
									{card.description}
								</p>
							</div>
						))}
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
							<h2 className="mt-3 font-heading text-3xl font-bold text-[#256B4B]">
								A practical education model, not a one-time handout.
							</h2>
							<p className="mt-4 leading-7 text-[#21352B]/70">
								Each pathway starts with a concrete barrier to learning, then
								uses partner referrals and documented follow-up to keep support
								accountable without overstating results.
							</p>
						</div>
						<div className="grid gap-4 sm:grid-cols-3">
							{content.pillars.map((pillar) => {
								const Icon =
									iconByKey[pillar.iconKey as keyof typeof iconByKey] ??
									BookOpenCheck;

								return (
									<div
										key={pillar.title}
										className="border border-[#E8A825]/30 bg-white p-5 shadow-sm"
									>
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF6EF] text-primary">
											<Icon className="h-5 w-5" />
										</div>
										<h3 className="mt-4 font-semibold text-[#256B4B]">
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
						<h2 className="mt-3 font-heading text-3xl font-bold text-[#256B4B]">
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
									<div className="relative h-52 bg-[#21352B]">
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
											<CardTitle className="text-xl text-[#256B4B]">
												{program.title}
											</CardTitle>
											<Badge className="shrink-0 capitalize">
												{program.status}
											</Badge>
										</div>
										<p className="text-sm font-medium text-primary">
											{program.kicker}
										</p>
									</CardHeader>
									<CardContent className="flex flex-1 flex-col">
										<p className="leading-6 text-muted-foreground">
											{program.summary}
										</p>
										<div className="mt-5 flex items-start gap-2 text-sm text-[#21352B]/70">
											<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
											<span>{program.location}</span>
										</div>
										<div className="mt-5 border border-[#E8A825]/30 bg-[#FFF9EF] p-4">
											<p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9A6A12]">
												How gifts are used
											</p>
											<p className="mt-2 text-sm leading-6 text-[#21352B]/70">
												{program.giftUses[0]?.amount}{" "}
												{program.giftUses[0]?.description}
											</p>
										</div>
										<ul className="mt-5 space-y-2">
											{program.outcomes.slice(0, 2).map((outcome) => (
												<li
													key={outcome}
													className="flex items-start gap-2 text-sm text-muted-foreground"
												>
													<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2F7D5A]" />
													{outcome}
												</li>
											))}
										</ul>
										<div className="mt-5 border-t border-[#E8A825]/30 pt-4">
											<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#2D3A6E]">
												<ShieldCheck className="h-4 w-4 text-primary" />
												Donor proof
											</div>
											<p className="mt-2 text-sm leading-6 text-muted-foreground">
												{program.proofPoints[0]}
											</p>
										</div>
										<Link
											href={`/programs/${program.slug}`}
											className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-[#256B4B]"
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
						<h2 className="mt-3 font-heading text-3xl font-bold text-[#2D3A6E]">
							Growth targets tied to accountable delivery.
						</h2>
						<p className="mt-4 leading-7 text-[#21352B]/70">
							These goals describe the direction for 2026. Final scale depends
							on partner readiness, verified need, available funding, and
							completed delivery records.
						</p>
					</div>
					<ul className="grid gap-3">
						{content.goals.map((goal) => (
							<li
								key={goal}
								className="flex items-start gap-3 border-l-4 border-[#E8A825] bg-[#FAF6F1] px-5 py-4 text-sm leading-6 text-[#21352B]/75"
							>
								<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
								<span>{goal}</span>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className="bg-[#256B4B] px-4 py-14 text-white">
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
						<p className="mt-3 text-white/80">
							Restricted gifts are assigned to the selected program whenever
							possible. If a program is fully funded, delayed, or unable to use
							the gift responsibly, Beacon may contact donors or apply funds to
							the closest education need in line with its charitable purpose.
						</p>
					</div>
					<Link
						href="/donate"
						className="inline-flex h-11 items-center justify-center rounded-lg bg-[#E8A825] px-5 text-sm font-semibold text-[#21352B] transition-colors hover:bg-[#F5D060]"
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
						<h2 className="mt-3 font-heading text-3xl font-bold text-[#256B4B]">
							Choose the next step that fits your role.
						</h2>
					</div>
					<div className="mt-8 grid gap-5 md:grid-cols-3">
						{content.actionPaths.map((path) => {
							const Icon =
								iconByKey[path.iconKey as keyof typeof iconByKey] ??
								HeartHandshake;

							return (
								<div key={path.title} className="bg-white p-6 shadow-sm">
									<div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF6EF] text-primary">
										<Icon className="h-5 w-5" />
									</div>
									<h3 className="mt-5 font-semibold text-[#256B4B]">
										{path.title}
									</h3>
									<p className="mt-2 text-sm leading-6 text-muted-foreground">
										{path.description}
									</p>
									<Link
										href={path.href ?? "/contact"}
										className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-[#256B4B]"
									>
										{path.ctaLabel ?? "Learn more"}
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
