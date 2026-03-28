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
import { siteConfig } from "@/data/site";
import {
  getCompletedProjects,
  getUpcomingProjects,
} from "@/lib/sanity/queries";

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

export default async function ProjectsPage() {
  const completedProjects = await getCompletedProjects();
  const upcomingProjects = await getUpcomingProjects();

  return (
    <main className="flex flex-col">
      {/* Hero -- gradient with stats overlay feel */}
      <section className="relative bg-gradient-to-br from-[#8B3A24] via-[#C05A3C] to-[#D4795F] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our Projects
          </h1>
          <div className="mx-auto mt-6 max-w-lg border-l-4 border-[#E8A825] pl-4 text-left">
            <p className="text-lg italic leading-relaxed text-[#F5D060]">
              &ldquo;Faith by itself, if it is not accompanied by action, is
              dead.&rdquo;
            </p>
            <p className="mt-2 text-sm font-medium text-[#E8A825]">
              &mdash; James 2:17
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-[#FDF2EE] py-12 sm:py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {impactStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-[#8B3A24] sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Completed Projects */}
      <section className="bg-[#FAF6F1] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#8B3A24]">
            Completed Projects
          </h2>
          <p className="mt-2 text-muted-foreground">
            Projects we have successfully delivered to our communities.
          </p>
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
                  <h4 className="mb-3 text-sm font-semibold text-[#8B3A24]">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Projects */}
      <section className="bg-[#F5EFE6] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#8B3A24]">
            Upcoming Projects
          </h2>
          <p className="mt-2 text-muted-foreground">
            What we are working on next to expand our impact.
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
                    <Badge className="shrink-0 border-[#E8A825]/30 bg-[#E8A825]/10 text-[#B8861E]">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#8B3A24] via-[#C05A3C] to-[#D4795F] py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
            Support Our Next Project
          </h2>
          <p className="mt-4 text-lg text-[#FDF2EE]/80">
            Your contribution helps us bring education to more communities.
            Every gift, no matter the size, makes a difference.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-[#E8A825] text-[#2C1810] hover:bg-[#B8861E] hover:text-white"
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
