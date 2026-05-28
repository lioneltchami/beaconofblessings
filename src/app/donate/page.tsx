import {
  BookOpen,
  GraduationCap,
  HandHeart,
  Heart,
  Package,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { DonateForm } from "@/components/donate-form";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/site";
import { getDonatePage, getPrograms } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Donate",
  description: `Support ${siteConfig.name} Charity Initiative. Your donation provides school supplies, textbooks, and educational resources to vulnerable children in Nigeria.`,
};

const iconByKey = {
  book: BookOpen,
  graduation: GraduationCap,
  "hand-heart": HandHeart,
  heart: Heart,
  package: Package,
  shield: ShieldCheck,
  users: Users,
} as const;

export default async function DonatePage() {
  const [content, programs] = await Promise.all([getDonatePage(), getPrograms()]);

  return (
    <>
      {/* Hero -- donation gold with growth green support */}
      <section className="relative bg-gradient-to-br from-[#256B4B] via-[#2F7D5A] to-[#E8A825] py-20 sm:py-28">
        {/* decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, #F5D060, transparent)",
          }}
        />

        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8A825]">
            <HandHeart className="h-7 w-7 text-[#21352B]" />
          </div>

          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {content.hero.title}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[#F5D060]">
            {content.hero.body}
          </p>

          <div className="mx-auto mt-6 max-w-md border-l-4 border-[#E8A825] pl-4 text-left">
            <blockquote className="text-sm italic text-white/70">
              &ldquo;{content.hero.verse?.text}&rdquo;
              <cite className="mt-1 block text-xs font-medium not-italic text-[#E8A825]">
                &mdash; {content.hero.verse?.reference}
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="border-b bg-[#EAF6EF] px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading mb-8 text-center text-2xl font-bold tracking-tight text-[#256B4B] sm:text-3xl">
            {content.impactSection.title}
          </h2>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {content.impactSection.cards.map((item) => {
              const Icon =
                iconByKey[item.iconKey as keyof typeof iconByKey] ?? BookOpen;
              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#256B4B]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Donate Form */}
      <section className="bg-[#FAF6F1] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-heading mb-2 text-center text-2xl font-bold tracking-tight text-[#9A6A12] sm:text-3xl">
            {content.formSection.title}
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            {content.formSection.body}
          </p>
          <Suspense fallback={null}>
            <DonateForm programs={programs} />
          </Suspense>
        </div>
      </section>

      {/* Why Give? */}
      <section className="border-t bg-[#F5EFE6] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading mb-3 text-center text-2xl font-bold tracking-tight text-[#2D3A6E] sm:text-3xl">
            {content.whyGive.title}
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-muted-foreground">
            {content.whyGive.body}
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {content.whyGive.cards.map((item) => {
              const Icon =
                iconByKey[item.iconKey as keyof typeof iconByKey] ?? ShieldCheck;
              return (
                <Card
                  key={item.title}
                  className="card-interactive border-t-4 border-[#E8A825]"
                >
                  <CardContent className="pt-2 text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#E8A825]/10">
                      <Icon className="h-5 w-5 text-[#9A6A12]" />
                    </div>
                    <h3 className="font-heading text-sm font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
