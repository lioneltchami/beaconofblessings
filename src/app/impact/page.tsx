import { Camera, CheckCircle2, FileText, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	impactMetrics,
	impactReport,
	outcomePathway,
} from "@/data/impact";
import { siteConfig } from "@/data/site";
import { fieldMomentImages, stockImages } from "@/data/stock-images";

export const metadata: Metadata = {
	title: `Impact | ${siteConfig.name}`,
	description:
		"See Beacon of Blessings annual results, impact metrics, evidence practices, and education outcomes for vulnerable Nigerian communities.",
};

export default function ImpactPage() {
	return (
		<main className="flex flex-col bg-[#FAF6F1]">
			<section className="bg-[#FDF2EE] px-4 py-16 sm:py-24">
				<div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
							Impact reporting
						</p>
						<h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold tracking-tight text-[#8B3A24] sm:text-5xl">
							Measurable impact, documented with care
						</h1>
						<p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#2C1810]/75">
							{impactReport.summary}
						</p>
						<div className="mt-8 inline-flex items-center gap-2 bg-white px-4 py-2 text-sm font-semibold text-[#8B3A24] shadow-sm">
							<TrendingUp className="h-4 w-4 text-primary" />
							{impactReport.period}
						</div>
					</div>
					<div className="relative min-h-[410px] overflow-hidden rounded-lg bg-[#2C1810] shadow-sm">
						<Image
							src={stockImages.schoolyard}
							alt="Schoolchildren gathered outside on school grounds"
							fill
							priority
							sizes="(min-width: 1024px) 44vw, 100vw"
							className="object-cover"
						/>
					</div>
				</div>
			</section>

			<section className="px-4 py-14">
				<div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{impactMetrics.map((metric) => (
						<Card key={metric.label} className="rounded-lg bg-white shadow-sm">
							<CardHeader>
								<p className="text-3xl font-bold text-[#8B3A24]">{metric.value}</p>
								<CardTitle className="text-lg">{metric.label}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm leading-6 text-muted-foreground">
									{metric.detail}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<section className="bg-[#F5EFE6] px-4 py-16">
				<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
							Annual results
						</p>
						<h2 className="mt-3 font-heading text-3xl font-bold text-[#8B3A24]">
							{impactReport.headline}
						</h2>
						<p className="mt-4 leading-7 text-muted-foreground">
							The launch year established a practical baseline: identify
							students with school partners, fund the materials they need, and
							keep enough evidence for donors to see what happened.
						</p>
						<Link
							href="/transparency"
							className="mt-6 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-[#8B3A24]"
						>
							View accountability
						</Link>
					</div>
					<div className="grid gap-4 sm:grid-cols-2">
						{outcomePathway.map((item, index) => (
							<div key={item.step} className="bg-white p-5 shadow-sm">
								<p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B8861E]">
									Step {index + 1}
								</p>
								<h3 className="mt-2 font-heading text-xl font-semibold text-[#8B3A24]">
									{item.step}
								</h3>
								<p className="mt-2 text-sm leading-6 text-muted-foreground">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="px-4 py-16">
				<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.8fr]">
					<Card className="rounded-lg bg-white shadow-sm">
						<CardHeader>
							<div className="flex items-center gap-2 text-[#8B3A24]">
								<FileText className="h-5 w-5 text-primary" />
								<CardTitle className="text-2xl">Evidence we keep</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<ul className="grid gap-3 sm:grid-cols-2">
								{impactReport.evidence.map((item) => (
									<li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
										<CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
										{item}
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					<div className="bg-[#8B3A24] p-6 text-white shadow-sm">
						<div className="flex items-center gap-2 text-[#F5D060]">
							<Camera className="h-5 w-5" />
							<p className="text-sm font-semibold uppercase tracking-[0.16em]">
								Photo and report framing
							</p>
						</div>
						<p className="mt-4 leading-7 text-[#FDF2EE]/85">
							Beacon publishes child-safe photos, delivery summaries, and
							annual report links as documentation is approved. Public updates
							focus on verified totals and community context rather than
							exposing children&apos;s private stories.
						</p>
					</div>
				</div>
			</section>

			<section className="bg-[#2C1810] px-4 py-16 text-white">
				<div className="mx-auto max-w-6xl">
					<div className="max-w-2xl">
						<p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E8A825]">
							Visual proof
						</p>
						<h2 className="mt-3 font-heading text-3xl font-bold">
							Impact should feel visible before it becomes a report.
						</h2>
						<p className="mt-4 leading-7 text-white/75">
							These representative images hold the space for Beacon&apos;s own
							child-safe media library as school visits and distributions are
							documented.
						</p>
					</div>
					<div className="mt-8 grid gap-4 md:grid-cols-4">
						{fieldMomentImages.map((image) => (
							<figure
								key={image.title}
								className="relative min-h-[240px] overflow-hidden rounded-lg bg-[#8B3A24]"
							>
								<Image
									src={image.src}
									alt={image.alt}
									fill
									sizes="(min-width: 1024px) 22vw, 100vw"
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/75 via-transparent to-transparent" />
								<figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold">
									{image.title}
								</figcaption>
							</figure>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
