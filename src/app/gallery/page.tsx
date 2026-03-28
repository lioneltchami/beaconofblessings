import { ArrowRight, Camera } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { GalleryGrid } from "@/components/gallery-grid";
import { buttonVariants } from "@/components/ui/button-variants";
import { albums } from "@/data/albums";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Gallery | ${siteConfig.name}`,
  description: `See the visual journey of ${siteConfig.name} Charity Initiative -- moments of impact, community engagement, and educational transformation across Nigeria.`,
};

export default function GalleryPage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#8B3A24] via-[#C05A3C] to-[#D4795F] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Camera className="h-7 w-7 text-white" />
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Gallery
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#F5D060]">
            Our visual journey of making a difference
          </p>
          <p className="mt-3 text-sm text-[#FDF2EE]/70">
            Browse our photo albums documenting community impact across Nigeria
          </p>
        </div>
      </section>

      {/* Album Grid */}
      <section className="bg-[#FAF6F1] px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <GalleryGrid albums={albums} />
        </div>
      </section>

      {/* Note about photos */}
      <section className="bg-[#FAF6F1] px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl border border-[#E8A825]/20 bg-[#E8A825]/5 px-6 py-4">
            <div className="flex items-start gap-3">
              <Camera className="mt-0.5 h-5 w-5 shrink-0 text-[#E8A825]" />
              <p className="text-sm text-[#2C1810]/70">
                Real photos are being documented and will replace these
                placeholders soon. Thank you for your patience as we capture our
                ongoing work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#8B3A24] py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
            See Our Work Firsthand
          </h2>
          <p className="mt-4 text-lg text-[#FDF2EE]/80">
            Want to witness the impact in person? Join our team of volunteers
            and help us illuminate more futures.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 border-white/30 px-6 font-semibold text-white hover:bg-white/10",
              )}
            >
              Volunteer With Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
