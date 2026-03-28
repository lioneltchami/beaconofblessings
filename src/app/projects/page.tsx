import {
  Calendar,
  CheckCircle2,
  DollarSign,
  Heart,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCompletedProjects, getUpcomingProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Our Projects | ${siteConfig.name}`,
  description: `Explore the educational projects of ${siteConfig.name} -- from school supplies drives to digital learning initiatives, see how we are transforming communities in Nigeria.`,
};

const impactStats = [
  { value: "500+", label: "Lives Impacted", icon: Users },
  { value: "N2.5M", label: "Invested", icon: DollarSign },
  { value: "5", label: "Communities Served", icon: MapPin },
  { value: "1", label: "Completed Project", icon: TrendingUp },
];

export default function ProjectsPage() {
  const completedProjects = getCompletedProjects();
  const upcomingProjects = getUpcomingProjects();

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section
        className="relative py-20 sm:py-28"
        style={{
          background: `linear-gradient(135deg, var(--bob-purple-900) 0%, var(--bob-purple-700) 50%, var(--bob-purple-800) 100%)`,
        }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our Projects
          </h1>
          <p
            className="mt-6 text-lg italic leading-relaxed"
            style={{ color: "var(--bob-gold-300)" }}
          >
            &ldquo;Faith by itself, if it is not accompanied by action, is
            dead.&rdquo;
          </p>
          <p
            className="mt-2 text-sm font-medium"
            style={{ color: "var(--bob-gold-400)" }}
          >
            &mdash; James 2:17
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section
        className="py-12 sm:py-16"
        style={{ backgroundColor: "var(--bob-purple-50)" }}
      >
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {impactStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--bob-purple-100)" }}
              >
                <stat.icon
                  className="h-6 w-6"
                  style={{ color: "var(--bob-purple-600)" }}
                />
              </div>
              <p
                className="text-2xl font-bold sm:text-3xl"
                style={{ color: "var(--bob-purple-900)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Completed Projects */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--bob-purple-900)" }}
          >
            Completed Projects
          </h2>
          <p className="mt-2 text-muted-foreground">
            Projects we have successfully delivered to our communities.
          </p>
          <Separator className="my-8" />
          <div className="space-y-8">
            {completedProjects.map((project) => (
              <Card key={project.slug}>
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
                    <Badge
                      className="shrink-0"
                      style={{
                        backgroundColor: "var(--bob-purple-100)",
                        color: "var(--bob-purple-800)",
                        borderColor: "var(--bob-purple-200)",
                      }}
                    >
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                  <Separator className="my-5" />
                  <h4
                    className="mb-3 text-sm font-semibold"
                    style={{ color: "var(--bob-purple-800)" }}
                  >
                    Impact
                  </h4>
                  <ul className="space-y-2">
                    {project.impact.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: "var(--bob-purple-500)" }}
                        />
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

      {/* Upcoming Projects */}
      <section
        className="py-16 sm:py-20"
        style={{ backgroundColor: "var(--bob-purple-50)" }}
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--bob-purple-900)" }}
          >
            Upcoming Projects
          </h2>
          <p className="mt-2 text-muted-foreground">
            What we are working on next to expand our impact.
          </p>
          <Separator className="my-8" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingProjects.map((project) => (
              <Card key={project.slug}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge
                      className="shrink-0"
                      style={{
                        backgroundColor: "var(--bob-gold-100)",
                        color: "var(--bob-gold-800)",
                        borderColor: "var(--bob-gold-300)",
                      }}
                    >
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
                        <Heart
                          className="mt-0.5 h-3.5 w-3.5 shrink-0"
                          style={{ color: "var(--bob-gold-500)" }}
                        />
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

      {/* CTA */}
      <section
        className="py-16 sm:py-20"
        style={{
          background: `linear-gradient(135deg, var(--bob-purple-900) 0%, var(--bob-purple-700) 100%)`,
        }}
      >
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Support Our Next Project
          </h2>
          <p
            className="mt-4 text-lg"
            style={{ color: "var(--bob-purple-200)" }}
          >
            Your contribution helps us bring education to more communities.
            Every gift, no matter the size, makes a difference.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/donate" />}
            >
              Donate Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
