import { ArrowRight, BadgeCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ResourceList } from "@/components/resource-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/data/site";
import { getResources } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: `Resources & Documents | ${siteConfig.name}`,
  description: `Access official registration documents, annual reports, project reports, and organizational policies from ${siteConfig.name}. We believe in full transparency.`,
};

export default async function ResourcesPage() {
  const resources = await getResources();
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-[#8B3A24] py-20 sm:py-28">
        <div
          className="absolute left-0 top-0 h-1.5 w-full bg-[#E8A825]"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Resources &amp; Documents
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#FDF2EE]/80">
            We believe in full transparency. Below you&apos;ll find our official
            registration documents, annual reports, project reports, and
            organizational policies.
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
                  Officially Registered in Nigeria
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {siteConfig.name} Charity Initiative is registered with the
                  Corporate Affairs Commission (CAC) of Nigeria as a non-profit
                  organization.
                </p>
                <p className="mt-2 text-sm font-semibold text-[#2D3A6E]">
                  RC: XXXXXXX
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-[#F5EFE6] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-heading text-center text-3xl font-bold tracking-tight text-[#8B3A24]">
            Our Documents
          </h2>
          <Separator className="mx-auto my-8 max-w-xs" />
          <ResourceList resources={resources} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF6F1] py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[#8B3A24]">
            Have questions about our governance?
          </h2>
          <p className="mt-3 text-muted-foreground">
            We are happy to provide additional information about our
            registration, finances, or operations.
          </p>
          <div className="mt-6">
            <Button size="lg" render={<Link href="/contact" />}>
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
