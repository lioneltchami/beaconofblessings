import { Archive, ArrowRight, Calendar, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/data/site";
import { getCompletedProjects } from "@/lib/sanity/queries";
import { formatProjectCompletedAgo } from "@/lib/project-lifecycle";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: `Project Archive | ${siteConfig.name}`,
	description:
		"Review completed Beacon of Blessings projects, final outcomes, reports, and public proof of delivered work.",
};

export default async function ProjectArchivePage() {
	const completedProjects = await getCompletedProjects();

	return (
		<main className="flex flex-col">
			<section className="bg-[#21352B] px-6 py-20 text-white md:py-24">
				<div className="mx-auto max-w-4xl">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8A825]/15 text-[#F5D060]">
						<Archive className="h-6 w-6" />
					</div>
					<p className="mt-6 text-sm font-semibold uppercase tracking-widest text-[#F5D060]">
						Completed work
					</p>
					<h1 className="mt-3 font-heading text-4xl tracking-tight sm:text-5xl">
						Project Archive
					</h1>
					<p className="mt-5 max-w-2xl text-lg leading-8 text-[#EAF6EF]/80">
						Past projects are listed here automatically after their archive date
						passes. Each record connects outcomes, dates, and public reports so
						donors can review what was delivered.
					</p>
				</div>
			</section>

			<section className="bg-[#FAF6F1] px-6 py-16 md:py-20">
				<div className="mx-auto max-w-5xl">
					<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<h2 className="font-heading text-3xl text-[#256B4B]">
								Archived Projects
							</h2>
							<p className="mt-2 max-w-2xl text-muted-foreground">
								This archive is derived from the same live project records that
								power the current and upcoming project sections.
							</p>
						</div>
						<Link
							href="/projects"
							className={cn(
								buttonVariants({ variant: "outline" }),
								"border-[#2F7D5A] text-[#256B4B]",
							)}
						>
							View All Projects
						</Link>
					</div>
					<Separator className="my-8" />

					{completedProjects.length > 0 ? (
						<div className="grid gap-6">
							{completedProjects.map((project) => (
								<Card
									key={project.slug}
									className="border-l-4 border-[#2F7D5A] bg-white"
								>
									<CardHeader>
										<div className="flex flex-wrap items-start justify-between gap-3">
											<div>
												<CardTitle className="text-2xl">
													{project.archiveRecord?.title ?? project.title}
												</CardTitle>
												{project.archiveRecord?.title ? (
													<p className="mt-1 text-sm text-muted-foreground">
														{project.title}
													</p>
												) : null}
												<div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
													<span className="inline-flex items-center gap-1">
														<Calendar className="h-4 w-4" />
														{project.date}
													</span>
													<span>{formatProjectCompletedAgo(project)}</span>
												</div>
											</div>
											<Badge className="bg-[#2F7D5A]/10 text-[#256B4B]">
												Archived
											</Badge>
										</div>
									</CardHeader>
									<CardContent>
										<p className="leading-7 text-muted-foreground">
											{project.archiveRecord?.summary ?? project.description}
										</p>
										<div className="mt-6 flex flex-wrap gap-3">
											<Link
												href={`/projects/${project.slug}`}
												className="inline-flex items-center gap-2 text-sm font-semibold text-[#256B4B] hover:text-[#1F5E43]"
											>
												View archive record
												<ArrowRight className="h-4 w-4" />
											</Link>
											{project.archiveRecord?.reportUrl ? (
												<Link
													href={project.archiveRecord.reportUrl}
													className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D3A6E] hover:text-[#1F2C58]"
												>
													<FileText className="h-4 w-4" />
													Final report
												</Link>
											) : null}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					) : (
						<Card className="bg-white">
							<CardContent className="p-8">
								<p className="text-muted-foreground">
									No archived projects are available yet. Projects will appear
									here automatically after their archive date passes.
								</p>
							</CardContent>
						</Card>
					)}
				</div>
			</section>
		</main>
	);
}
