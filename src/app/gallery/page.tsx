import { ArrowRight, Camera } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { GalleryGrid } from "@/components/gallery-grid";
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
      <section
        className="relative py-20 sm:py-28"
        style={{
          background: `linear-gradient(135deg, var(--bob-purple-900) 0%, var(--bob-purple-700) 50%, var(--bob-purple-800) 100%)`,
        }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--bob-purple-500)" }}
          >
            <Camera className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Gallery
          </h1>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "var(--bob-gold-300)" }}
          >
            Our visual journey of making a difference
          </p>
          <p
            className="mt-3 text-sm"
            style={{ color: "var(--bob-purple-200)" }}
          >
            Photos coming soon — we are documenting our ongoing work
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <GalleryGrid />
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
            See Our Work Firsthand
          </h2>
          <p
            className="mt-4 text-lg"
            style={{ color: "var(--bob-purple-200)" }}
          >
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
