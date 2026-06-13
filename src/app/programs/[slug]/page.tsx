import { ArrowLeft, CheckCircle2, FileCheck2, Gift, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/data/site";
import { getProgram, getProgramSlugs, getPrograms } from "@/lib/sanity/queries";

interface ProgramPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const slugs = await getProgramSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: ProgramPageProps): Promise<Metadata> {
	const { slug } = await params;
	const program = await getProgram(slug);

	if (!program) {
		return { title: "Program Not Found" };
	}

	return {
		title: `${program.title} | Programs | ${siteConfig.name}`,
		description: program.summary,
	};
}

export default async function ProgramPage({ params }: ProgramPageProps) {
	const { slug } = await params;
	const program = await getProgram(slug);

	if (!program) {
		notFound();
	}

	const relatedPrograms = (await getPrograms()).filter(
		(item) => item.slug !== program.slug,
	);

	return (
		<main className="flex flex-col bg-[#FAF6F1]">
			<section className="bg-[#EAF6EF] px-4 py-12 sm:py-20">
				<div className="mx-auto max-w-5xl">
					<Link
						href="/programs"
						className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-[#256B4B]"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to Programs
					</Link>
					<p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
						{program.kicker}
					</p>
					<h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[#256B4B] sm:text-5xl">
						{program.title}
					</h1>
					<p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#21352B]/75">
						{program.summary}
					</p>
					<div className="mt-6 flex items-start gap-2 text-sm font-medium text-[#21352B]/70">
						<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
						<span>{program.location}</span>
					</div>
					<Link
						href={`/donate?program=${program.slug}`}
						className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-[#E8A825] px-5 text-sm font-semibold text-[#21352B] transition-colors hover:bg-[#F5D060]"
					>
						{program.donationCta}
					</Link>
				</div>
			</section>

			<section className="px-4 py-16">
				<div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.9fr]">
					<div className="space-y-6">
						<Card className="rounded-lg bg-white shadow-sm">
							<CardHeader>
								<CardTitle className="text-2xl text-[#256B4B]">
									Who benefits
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-base leading-7 text-muted-foreground">
									{program.whoBenefits}
								</p>
							</CardContent>
						</Card>

						<Card className="rounded-lg bg-white shadow-sm">
							<CardHeader>
								<CardTitle className="text-2xl text-[#256B4B]">
									What happens
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-3">
									{program.whatHappens.map((item) => (
										<li key={item} className="flex items-start gap-3 text-muted-foreground">
											<CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card className="rounded-lg border-t-4 border-t-[#E8A825] bg-white shadow-sm">
							<CardHeader>
								<div className="flex items-center gap-2 text-[#9A6A12]">
									<Gift className="h-5 w-5 text-[#9A6A12]" />
									<CardTitle className="text-2xl">What donations fund</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{program.giftUses.map((gift) => (
										<div key={gift.amount} className="border-l-2 border-[#E8A825] pl-4">
											<p className="font-semibold text-[#9A6A12]">{gift.amount}</p>
											<p className="mt-1 text-sm leading-6 text-muted-foreground">
												{gift.description}
											</p>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						<Card className="rounded-lg bg-white shadow-sm">
							<CardHeader>
								<div className="flex items-center gap-2 text-[#2D3A6E]">
									<FileCheck2 className="h-5 w-5 text-primary" />
									<CardTitle className="text-2xl">Proof we keep</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<ul className="space-y-3">
									{program.proofPoints.map((item) => (
										<li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
											<CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
											{item}
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<section className="bg-[#EAF6EF] px-4 py-14">
				<div className="mx-auto max-w-6xl">
					<h2 className="font-heading text-3xl font-bold text-[#256B4B]">
						Expected outcomes
					</h2>
					<div className="mt-6 grid gap-4 md:grid-cols-3">
						{program.outcomes.map((outcome) => (
							<div key={outcome} className="bg-white p-5 text-sm leading-6 text-muted-foreground shadow-sm">
								{outcome}
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="px-4 py-14">
				<div className="mx-auto max-w-6xl">
					<h2 className="font-heading text-2xl font-bold text-[#256B4B]">
						Other programs
					</h2>
					<div className="mt-5 flex flex-wrap gap-3">
						{relatedPrograms.map((item) => (
							<Link
								key={item.slug}
								href={`/programs/${item.slug}`}
								className="inline-flex h-10 items-center rounded-lg border border-primary/20 bg-white px-4 text-sm font-semibold text-primary hover:bg-primary/5"
							>
								{item.title}
							</Link>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
