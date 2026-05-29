import {
	ArrowRight,
	BadgeCheck,
	BriefcaseBusiness,
	CheckCircle2,
	Download,
	FileCheck2,
	HeartHandshake,
	ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/data/site";
import { getPartnerPage } from "@/lib/sanity/queries";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: `Partner With Us | ${siteConfig.name}`,
	description:
		"Corporate sponsorship and partnership options for Beacon of Blessings, including due-diligence proof, funding needs, sponsor tiers, and reporting commitments.",
};

const iconByKey = {
	badge: BadgeCheck,
	file: FileCheck2,
	shield: ShieldCheck,
} as const;

export default async function PartnerWithUsPage() {
	const content = await getPartnerPage();

	return (
		<main className="flex flex-col bg-[#FAF6F1]">
			<section className="relative overflow-hidden bg-[#EAF6EF] px-4 py-16 sm:py-24">
				<div className="absolute left-0 top-0 h-1.5 w-full bg-[#E8A825]" aria-hidden="true" />
				<div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
							{content.hero.eyebrow}
						</p>
						<h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold tracking-tight text-[#256B4B] sm:text-5xl">
							{content.hero.title}
						</h1>
						<p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#21352B]/75">
							{content.hero.body}
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Link
								href={content.hero.ctas?.[0]?.href ?? "/contact"}
								className={cn(
									buttonVariants({ size: "lg" }),
									"gap-2 rounded-full bg-[#E8A825] px-7 text-[#21352B] hover:bg-[#F5D060]",
								)}
							>
								<HeartHandshake className="h-4 w-4" />
								{content.hero.ctas?.[0]?.label ?? "Request Sponsor Conversation"}
							</Link>
							<Link
								href={content.hero.ctas?.[1]?.href ?? "/resources"}
								className={cn(
									buttonVariants({ variant: "outline", size: "lg" }),
									"gap-2 rounded-full border-[#256B4B] px-7 text-[#256B4B] hover:bg-[#256B4B]/5",
								)}
							>
								<Download className="h-4 w-4" />
								{content.hero.ctas?.[1]?.label ?? "Download Sponsor Brief"}
							</Link>
						</div>
					</div>
					<div className="grid gap-3 rounded-lg border border-[#2F7D5A]/15 bg-white p-4 shadow-sm sm:grid-cols-2">
						{content.trustBar.map((item) => (
							<div key={item.label} className="border-l-4 border-[#E8A825] px-4 py-3">
								<p className="font-heading text-2xl text-[#256B4B]">{item.value}</p>
								<p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#1F352A]/60">
									{item.label}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-white px-4 py-14 sm:py-16">
				<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9A6A12]">
							{content.whyPartner.eyebrow}
						</p>
						<h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-[#256B4B]">
							{content.whyPartner.title}
						</h2>
						<p className="mt-4 leading-7 text-muted-foreground">
							{content.whyPartner.body}
						</p>
					</div>
					<div className="grid gap-4 md:grid-cols-3">
						<h2 className="sr-only">Sponsor due diligence</h2>
						{content.dueDiligence.map((item) => {
							const Icon = iconByKey[item.iconKey as keyof typeof iconByKey] ?? BadgeCheck;
							return (
								<Card key={item.title} className="rounded-lg border-t-4 border-[#E8A825] bg-[#FAF6F1] shadow-sm">
									<CardHeader>
										<Icon className="h-6 w-6 text-[#256B4B]" />
										<CardTitle className="text-lg text-[#256B4B]">{item.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
										{item.href ? (
											<Link
												href={item.href}
												className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#256B4B] hover:text-[#1F5E43]"
											>
												{item.ctaLabel ?? "Review"}
												<ArrowRight className="h-3.5 w-3.5" />
											</Link>
										) : null}
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			<section className="bg-[#F5EFE6] px-4 py-14 sm:py-16">
				<div className="mx-auto max-w-6xl">
					<div className="max-w-3xl">
						<h2 className="font-heading text-3xl font-bold tracking-tight text-[#256B4B]">
							{content.tiersIntro.title}
						</h2>
						<p className="mt-3 leading-7 text-muted-foreground">{content.tiersIntro.body}</p>
					</div>
					<div className="mt-8 grid gap-5 lg:grid-cols-3">
						{content.tiers.map((tier) => (
							<Card key={tier.name} className="rounded-lg bg-white shadow-sm">
								<CardHeader>
									<p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9A6A12]">
										{tier.amount}
									</p>
									<CardTitle className="text-2xl text-[#256B4B]">{tier.name}</CardTitle>
									<p className="text-sm leading-6 text-muted-foreground">{tier.bestFor}</p>
								</CardHeader>
								<CardContent>
									<p className="rounded-lg bg-[#EAF6EF] px-4 py-3 text-sm leading-6 text-[#1F352A]">
										{tier.funds}
									</p>
									<ul className="mt-5 space-y-2">
										{tier.recognition.map((item) => (
											<li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
												<CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#2F7D5A]" />
												{item}
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="bg-white px-4 py-14 sm:py-16">
				<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
					<div>
						<h2 className="font-heading text-3xl font-bold tracking-tight text-[#256B4B]">
							{content.needsIntro.title}
						</h2>
						<p className="mt-3 leading-7 text-muted-foreground">{content.needsIntro.body}</p>
					</div>
					<div className="grid gap-3 sm:grid-cols-2">
						{content.currentNeeds.map((need) => (
							<div key={need.item} className="rounded-lg border border-[#2F7D5A]/15 bg-[#FAF6F1] p-5">
								<p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#9A6A12]">
									{need.amount}
								</p>
								<h3 className="mt-2 font-heading text-xl text-[#256B4B]">{need.item}</h3>
								<p className="mt-2 text-sm leading-6 text-muted-foreground">{need.detail}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#EAF6EF] px-4 py-14 sm:py-16">
				<div className="mx-auto max-w-6xl">
					<div className="max-w-3xl">
						<h2 className="font-heading text-3xl font-bold tracking-tight text-[#256B4B]">
							{content.processIntro.title}
						</h2>
						<p className="mt-3 leading-7 text-muted-foreground">{content.processIntro.body}</p>
					</div>
					<ol className="mt-8 grid gap-4 md:grid-cols-4">
						{content.process.map((step) => (
							<li key={step.step} className="rounded-lg bg-white p-5 shadow-sm">
								<span className="font-heading text-3xl text-[#E8A825]">{step.step}</span>
								<h3 className="mt-3 font-heading text-lg text-[#256B4B]">{step.title}</h3>
								<p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
							</li>
						))}
					</ol>
				</div>
			</section>

			<section className="bg-[#21352B] px-4 py-14 text-white sm:py-16">
				<div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
					{[content.recognitionPolicy, content.reportingPromise].map((section) => (
						<div key={section.title} className="rounded-lg border border-white/10 bg-white/5 p-6">
							<BriefcaseBusiness className="h-7 w-7 text-[#E8A825]" />
							<h2 className="mt-4 font-heading text-2xl font-bold">{section.title}</h2>
							<p className="mt-3 text-sm leading-6 text-white/75">{section.body}</p>
							<ul className="mt-5 space-y-2">
								{section.points.map((point) => (
									<li key={point} className="flex gap-2 text-sm leading-6 text-white/75">
										<CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#E8A825]" />
										{point}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>

			<section className="bg-[#256B4B] px-4 py-14 text-white sm:py-16">
				<div className="mx-auto flex max-w-4xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h2 className="font-heading text-3xl font-bold">{content.finalCta.title}</h2>
						<p className="mt-3 max-w-2xl text-sm leading-6 text-[#EAF6EF]/80">
							{content.finalCta.body}
						</p>
					</div>
					<div className="flex shrink-0 flex-col gap-3 sm:flex-row">
						<Link
							href={content.finalCta.ctas[0]?.href ?? "/contact"}
							className={cn(
								buttonVariants({ size: "lg" }),
								"rounded-full bg-[#E8A825] text-[#21352B] hover:bg-[#F5D060]",
							)}
						>
							{content.finalCta.ctas[0]?.label ?? "Request Sponsor Conversation"}
						</Link>
						<Link
							href={content.finalCta.ctas[1]?.href ?? "/transparency"}
							className={cn(
								buttonVariants({ variant: "outline", size: "lg" }),
								"rounded-full border-white/60 text-white hover:bg-white/10",
							)}
						>
							{content.finalCta.ctas[1]?.label ?? "Review Transparency"}
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
