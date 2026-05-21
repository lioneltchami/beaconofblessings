import {
	CheckCircle2,
	Clock,
	ExternalLink,
	FileCheck2,
	Scale,
	ShieldCheck,
	Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	boardMembers,
	documentStatuses,
	donationUse,
	policyLinks,
	reportingCadence,
	stewardshipStandards,
	transparencyFacts,
} from "@/data/impact";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
	title: `Transparency | ${siteConfig.name}`,
	description:
		"Review Beacon of Blessings governance, registration placeholders, donation use, policies, and financial document links.",
};

export default function TransparencyPage() {
	return (
		<main className="flex flex-col bg-[#FAF6F1]">
			<section className="bg-[#FDF2EE] px-4 py-16 sm:py-24">
				<div className="mx-auto max-w-6xl">
					<p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
						Donor accountability
					</p>
					<h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold tracking-tight text-[#8B3A24] sm:text-5xl">
						Transparent stewardship
					</h1>
						<p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#2C1810]/75">
							Trust is part of the mission. This page gathers the governance,
							donation-use, and policy information donors need before giving to
							Beacon of Blessings, with formal public documents linked as they
							are verified and approved.
					</p>
					<div className="mt-8 grid gap-3 sm:grid-cols-3">
						{[
							["Current status", "Honest about what is verified and what is pending"],
							["Donation controls", "Program intent, receipts, and records are tracked"],
							["Public updates", "Reports and documents are linked as they are approved"],
						].map(([label, value]) => (
							<div key={label} className="border-l-4 border-[#E8A825] bg-white px-4 py-3 shadow-sm">
								<p className="text-sm font-semibold text-[#8B3A24]">{label}</p>
								<p className="mt-1 text-sm leading-6 text-muted-foreground">{value}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="registration" className="px-4 py-16">
				<div className="mx-auto max-w-6xl">
					<div className="flex items-center gap-2 text-primary">
						<Scale className="h-5 w-5" />
						<h2 className="font-heading text-3xl font-bold text-[#8B3A24]">
							Registration and governance
						</h2>
					</div>
					<div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						{transparencyFacts.map((fact) => (
							<Card key={fact.label} className="rounded-lg bg-white shadow-sm">
								<CardHeader>
									<CardTitle className="text-lg text-[#8B3A24]">
										{fact.label}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm leading-6 text-muted-foreground">
										{fact.value}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#F5EFE6] px-4 py-16">
				<div className="mx-auto max-w-6xl">
					<div className="flex items-center gap-2 text-primary">
						<Users className="h-5 w-5" />
						<h2 className="font-heading text-3xl font-bold text-[#8B3A24]">
							Board and trustees
						</h2>
					</div>
					<div className="mt-6 grid gap-5 md:grid-cols-3">
						{boardMembers.map((member) => (
							<Card key={member.name} className="rounded-lg bg-white shadow-sm">
								<CardHeader>
									<CardTitle className="text-xl text-[#8B3A24]">
										{member.name}
									</CardTitle>
									<p className="text-sm font-semibold text-primary">{member.role}</p>
								</CardHeader>
								<CardContent>
									<p className="text-sm leading-6 text-muted-foreground">
										{member.focus}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section id="financials" className="px-4 py-16">
				<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1fr]">
					<div>
						<div className="flex items-center gap-2 text-primary">
							<ShieldCheck className="h-5 w-5" />
							<h2 className="font-heading text-3xl font-bold text-[#8B3A24]">
								How donations are used
							</h2>
						</div>
						<p className="mt-4 leading-7 text-muted-foreground">
							Beacon tracks giving by program whenever a donor designates a
							purpose. Undesignated gifts support the highest-priority education
							needs approved by leadership.
						</p>
					</div>
					<div className="grid gap-4">
						{donationUse.map((item) => (
							<div key={item.label} className="border-l-4 border-primary bg-white p-5 shadow-sm">
								<p className="font-semibold text-[#8B3A24]">{item.label}</p>
								<p className="mt-2 text-sm leading-6 text-muted-foreground">
									{item.value}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-white px-4 py-16">
				<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
					<div>
						<div className="flex items-center gap-2 text-primary">
							<CheckCircle2 className="h-5 w-5" />
							<h2 className="font-heading text-3xl font-bold text-[#8B3A24]">
								Stewardship standards
							</h2>
						</div>
						<p className="mt-4 leading-7 text-muted-foreground">
							Top nonprofit transparency pages make donor trust concrete. These
							are the operating standards Beacon is publishing now while formal
							reports and registration files are finalized.
						</p>
					</div>
					<div className="grid gap-4 sm:grid-cols-2">
						{stewardshipStandards.map((standard) => (
							<div key={standard.label} className="border border-[#C05A3C]/10 bg-[#FAF6F1] p-5">
								<p className="font-semibold text-[#8B3A24]">{standard.label}</p>
								<p className="mt-2 text-sm leading-6 text-muted-foreground">
									{standard.value}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#F5EFE6] px-4 py-16">
				<div className="mx-auto max-w-6xl">
					<div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
						<div>
							<div className="flex items-center gap-2 text-primary">
								<Clock className="h-5 w-5" />
								<h2 className="font-heading text-3xl font-bold text-[#8B3A24]">
									Reporting cadence
								</h2>
							</div>
							<p className="mt-4 leading-7 text-muted-foreground">
								Beacon is still young, so the strongest trust signal is clarity:
								what will be reported, when public updates are expected, and
								where donors can ask questions.
							</p>
						</div>
						<ol className="grid gap-3">
							{reportingCadence.map((item, index) => (
								<li key={item} className="flex gap-4 bg-white p-4 shadow-sm">
									<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8B3A24] text-sm font-bold text-white">
										{index + 1}
									</span>
									<span className="text-sm leading-6 text-muted-foreground">{item}</span>
								</li>
							))}
						</ol>
					</div>
				</div>
			</section>

			<section className="bg-[#8B3A24] px-4 py-16 text-white">
				<div className="mx-auto max-w-6xl">
					<div className="flex items-center gap-2 text-[#F5D060]">
						<FileCheck2 className="h-5 w-5" />
						<h2 className="font-heading text-3xl font-bold text-white">
							Policies and documents
						</h2>
					</div>
						<p className="mt-4 max-w-3xl text-[#FDF2EE]/80">
							Financial documents, annual reports, and formal registration files
							will be linked here as they are verified and approved for public
							posting.
						</p>
					<div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
						{documentStatuses.map((document) => (
							document.href ? (
								<Link
									key={document.title}
									href={document.href}
									className="rounded-lg bg-white/10 px-4 py-4 text-sm text-white ring-1 ring-white/15 transition-colors hover:bg-white/20"
								>
									<span className="flex items-center justify-between gap-3 font-semibold">
										{document.title}
										<ExternalLink className="h-4 w-4 shrink-0" />
									</span>
									<span className="mt-2 inline-flex rounded-full bg-[#E8A825]/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F5D060]">
										{document.status}
									</span>
									<span className="mt-3 block leading-6 text-white/75">{document.description}</span>
								</Link>
							) : (
								<div
									key={document.title}
									className="rounded-lg bg-white/10 px-4 py-4 text-sm text-white ring-1 ring-white/15"
								>
									<span className="font-semibold">{document.title}</span>
									<span className="mt-2 inline-flex rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
										{document.status}
									</span>
									<span className="mt-3 block leading-6 text-white/75">{document.description}</span>
								</div>
							)
						))}
					</div>
					<div className="mt-8 flex flex-wrap gap-3">
						{policyLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5D060] hover:text-white"
							>
								{link.label}
								<ExternalLink className="h-4 w-4 shrink-0" />
							</Link>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
