import {
	Archive,
	ArrowLeft,
	Calendar,
	CheckCircle2,
	Clock3,
	DollarSign,
	FileText,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/data/site";
import { getProject, getProjectSlugs } from "@/lib/sanity/queries";
import {
	formatProjectCompletedAgo,
	getProjectLifecycle,
} from "@/lib/project-lifecycle";
import { cn } from "@/lib/utils";

interface ProjectDetailPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const slugs = await getProjectSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: ProjectDetailPageProps): Promise<Metadata> {
	const { slug } = await params;
	const project = await getProject(slug);

	if (!project) {
		return {
			title: `Project Not Found | ${siteConfig.name}`,
		};
	}

	return {
		title: `${project.title} | ${siteConfig.name}`,
		description: project.archiveRecord?.summary ?? project.description,
	};
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
	const { slug } = await params;
	const project = await getProject(slug);
	if (!project) notFound();

	const lifecycle = getProjectLifecycle(project);
	const isArchived = lifecycle === "completed";
	const archiveRecord = project.archiveRecord;

	return (
		<main className="flex flex-col">
			<section className="bg-[#EAF6EF] px-6 py-16 md:py-20">
				<div className="mx-auto max-w-5xl">
					<Link
						href={isArchived ? "/projects/archive" : "/projects"}
						className="inline-flex items-center gap-2 text-sm font-semibold text-[#256B4B] hover:text-[#1F5E43]"
					>
						<ArrowLeft className="h-4 w-4" />
						{isArchived ? "Back to archive" : "Back to projects"}
					</Link>
					<div className="mt-8 max-w-3xl">
						<Badge className="bg-[#2F7D5A]/10 text-[#256B4B]">
							{isArchived ? "Archived Project" : `${lifecycle} Project`}
						</Badge>
						<h1 className="mt-4 font-heading text-4xl tracking-tight text-[#21352B] sm:text-5xl">
							{project.title}
						</h1>
						<p className="mt-5 text-lg leading-8 text-muted-foreground">
							{project.description}
						</p>
					</div>
				</div>
			</section>

			<section className="bg-white px-6 py-16 md:py-20">
				<div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.72fr_0.28fr]">
					<div>
						<Card>
							<CardHeader>
								<CardTitle>
									{isArchived ? "Final Outcomes" : "Project Goals"}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-3">
									{(archiveRecord?.outcomes?.length
										? archiveRecord.outcomes
										: project.impact
									).map((item) => (
										<li
											key={item}
											className="flex gap-3 text-sm leading-6 text-muted-foreground"
										>
											<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2F7D5A]" />
											{item}
										</li>
									))}
								</ul>
							</CardContent>
						</Card>

						{archiveRecord ? (
							<Card className="mt-8 border-l-4 border-[#2F7D5A]">
								<CardHeader>
									<div className="flex items-center gap-2 text-[#256B4B]">
										<Archive className="h-5 w-5" />
										<CardTitle>Archive Record</CardTitle>
									</div>
								</CardHeader>
								<CardContent>
									<p className="leading-7 text-muted-foreground">
										{archiveRecord.summary}
									</p>
									<div className="mt-6 flex flex-wrap gap-3">
										{archiveRecord.reportUrl ? (
											<Link
												href={archiveRecord.reportUrl}
												className={cn(
													buttonVariants(),
													"bg-[#2F7D5A] text-white hover:bg-[#256B4B]",
												)}
											>
												<FileText className="h-4 w-4" />
												View Final Report
											</Link>
										) : null}
										{archiveRecord.galleryHref ? (
											<Link
												href={archiveRecord.galleryHref}
												className={buttonVariants({ variant: "outline" })}
											>
												View Photos
											</Link>
										) : null}
									</div>
								</CardContent>
							</Card>
						) : null}
					</div>

					<aside>
						<Card className="sticky top-24">
							<CardHeader>
								<CardTitle className="text-lg">Project Details</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 text-sm">
								<div className="flex items-start gap-3">
									<Calendar className="mt-0.5 h-4 w-4 text-[#2F7D5A]" />
									<div>
										<p className="font-semibold">Timeline</p>
										<p className="text-muted-foreground">{project.date}</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<DollarSign className="mt-0.5 h-4 w-4 text-[#2F7D5A]" />
									<div>
										<p className="font-semibold">Budget</p>
										<p className="text-muted-foreground">{project.budget}</p>
									</div>
								</div>
								{isArchived ? (
									<div className="flex items-start gap-3">
										<Clock3 className="mt-0.5 h-4 w-4 text-[#2F7D5A]" />
										<div>
											<p className="font-semibold">Archived</p>
											<p className="text-muted-foreground">
												{formatProjectCompletedAgo(project)}
											</p>
										</div>
									</div>
								) : null}
								<Separator />
								<p className="text-xs leading-5 text-muted-foreground">
									Projects move automatically between current and archive views
									based on their CMS lifecycle dates.
								</p>
							</CardContent>
						</Card>
					</aside>
				</div>
			</section>
		</main>
	);
}
