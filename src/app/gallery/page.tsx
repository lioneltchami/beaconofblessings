import { ArrowRight, Camera } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { GalleryGrid } from "@/components/gallery-grid";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/data/site";
import { getAlbums, getGalleryPage } from "@/lib/sanity/queries";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Gallery | ${siteConfig.name}`,
  description: `See the visual journey of ${siteConfig.name} Charity Initiative -- moments of impact, community engagement, and educational transformation across Nigeria.`,
};

export default async function GalleryPage() {
  const [content, albums] = await Promise.all([getGalleryPage(), getAlbums()]);
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#256B4B] via-[#2F7D5A] to-[#4FA778] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Camera className="h-7 w-7 text-white" />
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {content.hero.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#F5D060]">
            {content.hero.body}
          </p>
          <p className="mt-3 text-sm text-[#EAF6EF]/70">
            {content.hero.eyebrow}
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
              <p className="text-sm text-[#21352B]/70">
                {content.note.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#256B4B] py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
            {content.cta.title}
          </h2>
          <p className="mt-4 text-lg text-[#EAF6EF]/80">
            {content.cta.body}
          </p>
          <div className="mt-8">
            <Link
              href={content.cta.ctas?.[0]?.href ?? "/contact"}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 border-white/30 px-6 font-semibold text-white hover:bg-white/10",
              )}
            >
              {content.cta.ctas?.[0]?.label ?? "Volunteer With Us"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
