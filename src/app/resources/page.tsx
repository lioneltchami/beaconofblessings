import { ArrowRight, BadgeCheck, CalendarClock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ResourceList } from "@/components/resource-list";
import { buttonVariants } from "@/components/ui/button-variants";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { getResources, getResourcesPage } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: `Resources & Documents | ${siteConfig.name}`,
  description: `Review public resources, document placeholders, reports, and organizational policies from ${siteConfig.name}. We believe in clear transparency.`,
};

export default async function ResourcesPage() {
  const [content, resources] = await Promise.all([
    getResourcesPage(),
    getResources(),
  ]);
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-[#256B4B] py-20 sm:py-28">
        <div
          className="absolute left-0 top-0 h-1.5 w-full bg-[#E8A825]"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-3xl px-4 text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {content.hero.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#EAF6EF]/80">
            {content.hero.body}
              </p>
        </div>
      </section>

      {/* Registration Banner */}
      <section className="bg-[#FAF6F1] py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-xl border-2 border-[#2D3A6E]/20 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#2D3A6E]/10">
                <BadgeCheck className="h-7 w-7 text-[#2D3A6E]" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-[#2D3A6E]">
                  {content.registrationBanner.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {content.registrationBanner.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-[#F5EFE6] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-heading text-center text-3xl font-bold tracking-tight text-[#256B4B]">
            {content.documentsIntro.title}
          </h2>
          <Separator className="mx-auto my-8 max-w-xs" />
          <ResourceList resources={resources} />
        </div>
      </section>

      {/* Project Timeline Link */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex flex-col items-start justify-between gap-5 border-l-4 border-[#2F7D5A] bg-[#EAF6EF]/60 p-6 sm:flex-row sm:items-center">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-[#2F7D5A] shadow-sm">
                <CalendarClock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-[#256B4B]">
                  Project Timeline
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  See active, upcoming, and completed projects in one place. Past
                  projects update automatically from the project calendar.
                </p>
              </div>
            </div>
            <Link
              href="/projects"
              className={cn(buttonVariants(), "shrink-0")}
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF6F1] py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[#256B4B]">
            {content.cta.title}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {content.cta.body}
          </p>
          <div className="mt-6">
            <Link
              href={content.cta.ctas?.[0]?.href ?? "/contact"}
              className={buttonVariants({ size: "lg" })}
            >
              {content.cta.ctas?.[0]?.label ?? "Contact Us"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
