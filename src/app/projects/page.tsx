import {
  Calendar,
  CheckCircle2,
  Clock3,
  DollarSign,
  Heart,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/data/site";
import {
  getCompletedProjects,
  getCurrentProjects,
  getProjectsPage,
  getUpcomingProjects,
} from "@/lib/sanity/queries";
import { formatProjectCompletedAgo } from "@/lib/project-lifecycle";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Our Projects | ${siteConfig.name}`,
  description: `Explore the educational projects of ${siteConfig.name} -- from school supplies drives to digital learning initiatives, see how we are transforming communities in Nigeria.`,
};

const iconByKey = {
  map: MapPin,
  money: DollarSign,
  trend: TrendingUp,
  users: Users,
} as const;

export default async function ProjectsPage() {
  const [content, completedProjects, currentProjects, upcomingProjects] = await Promise.all([
    getProjectsPage(),
    getCompletedProjects(),
    getCurrentProjects(),
    getUpcomingProjects(),
  ]);

  return (
    <main className="flex flex-col">
      {/* Hero -- gradient with stats overlay feel */}
      <section className="relative bg-gradient-to-br from-[#256B4B] via-[#2F7D5A] to-[#4FA778] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {content.hero.title}
          </h1>
          <div className="mx-auto mt-6 max-w-lg border-l-4 border-[#E8A825] pl-4 text-left">
            <p className="text-lg italic leading-relaxed text-[#F5D060]">
              &ldquo;{content.hero.verse?.text}&rdquo;
            </p>
            <p className="mt-2 text-sm font-medium text-[#E8A825]">
              &mdash; {content.hero.verse?.reference}
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-[#EAF6EF] py-12 sm:py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {content.metrics.map((stat) => {
            const Icon =
              iconByKey[stat.iconKey as keyof typeof iconByKey] ?? Users;
            return (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-[#256B4B] sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Current Projects */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#256B4B]">
            {content.currentIntro?.title ?? "Current Projects"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {content.currentIntro?.body ??
              "Active work now moving through planning, funding, delivery, or reporting."}
          </p>
          <Separator className="my-8" />
          <div className="grid gap-6 lg:grid-cols-2">
            {currentProjects.map((project) => (
              <Card
                key={project.slug}
                className="card-interactive border-t-4 border-primary bg-[#EAF6EF]/45"
              >
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {project.date}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5" />
                          {project.budget}
                        </span>
                      </div>
                    </div>
                    <Badge className="shrink-0 border-primary/20 bg-primary text-white">
                      Current
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                  <Separator className="my-5" />
                  <h4 className="mb-3 text-sm font-semibold text-[#256B4B]">
                    What this project is working toward
                  </h4>
                  <ul className="space-y-2">
                    {project.impact.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#256B4B] hover:text-[#1F5E43]"
                  >
                    View project details
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Completed Projects */}
      <section className="bg-[#FAF6F1] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#256B4B]">
            {content.completedIntro.title}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {content.completedIntro.body}
          </p>
          <Link
            href="/projects/archive"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#256B4B] hover:text-[#1F5E43]"
          >
            Open full project archive
          </Link>
          <Separator className="my-8" />
          <div className="space-y-8">
            {completedProjects.map((project) => (
              <Card
                key={project.slug}
                className="card-interactive border-l-4 border-primary"
              >
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {project.date}
                        </span>
                        <span className="inline-flex items-center gap-1 text-primary">
                          <Clock3 className="h-3.5 w-3.5" />
                          {formatProjectCompletedAgo(project)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5" />
                          {project.budget}
                        </span>
                      </div>
                    </div>
                    <Badge className="shrink-0 border-primary/20 bg-primary/10 text-primary">
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                  <Separator className="my-5" />
                  <h4 className="mb-3 text-sm font-semibold text-[#256B4B]">
                    Impact
                  </h4>
                  <ul className="space-y-2">
                    {project.impact.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#256B4B] hover:text-[#1F5E43]"
                  >
                    View archive record
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Projects */}
      <section className="bg-[#F5EFE6] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#256B4B]">
            {content.upcomingIntro.title}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {content.upcomingIntro.body}
          </p>
          <Separator className="my-8" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingProjects.map((project) => (
              <Card
                key={project.slug}
                className="card-interactive border-t-4 border-[#E8A825]"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge className="shrink-0 border-[#E8A825]/30 bg-[#E8A825]/10 text-[#9A6A12]">
                      Upcoming
                    </Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {project.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5" />
                      {project.budget}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {project.impact.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Heart className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E8A825]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#9A6A12] hover:text-[#74500F]"
                  >
                    View project details
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#256B4B] via-[#2F7D5A] to-[#4FA778] py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
            {content.cta.title}
          </h2>
          <p className="mt-4 text-lg text-[#EAF6EF]/80">
            {content.cta.body}
          </p>
          <div className="mt-8">
            <Link
              href={content.cta.ctas?.[0]?.href ?? "/donate"}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[#E8A825] text-[#21352B] hover:bg-[#9A6A12] hover:text-white",
              )}
            >
              {content.cta.ctas?.[0]?.label ?? "Donate Now"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
