import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  GraduationCap,
  Handshake,
  Heart,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { aboutPageContent as staticAboutPageContent } from "@/data/pages";
import { siteConfig } from "@/data/site";
import { stockImages } from "@/data/stock-images";
import { getAboutPage, getCoreValues, getFounders } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: `Learn about ${siteConfig.name} Charity Initiative -- our mission, story, founders, and commitment to transforming lives through educational support for vulnerable communities in Nigeria.`,
};

const valueIcons = [Heart, BookOpen, Handshake, ShieldCheck];

export default async function AboutPage() {
  const [content, founders, coreValues] = await Promise.all([
    getAboutPage(),
    getFounders(),
    getCoreValues(),
  ]);
  const heroImage =
    content.hero.images?.[0] ??
    staticAboutPageContent.hero.images?.[0] ?? {
      src: stockImages.outdoorLearning,
      alt: "Students gathered outdoors for a school learning session",
    };

  return (
    <main className="flex flex-col bg-[#FAF6F1]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#EAF6EF] py-20 sm:py-28">
        <div
          className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-[#2F7D5A] via-[#E8A825] to-[#2D3A6E]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_70%_35%,rgba(232,168,37,0.18),transparent_34%),linear-gradient(135deg,transparent_0%,rgba(45,58,110,0.08)_100%)] lg:block"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2F7D5A]">
              {content.hero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold tracking-tight text-[#21352B] sm:text-5xl lg:text-6xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#21352B]/75">
              {content.hero.body}
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-[#2F7D5A]/10 bg-white/85 shadow-[0_24px_80px_-56px_rgba(33,53,43,0.45)]">
            <div className="relative h-72">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <p className="text-lg italic leading-relaxed text-[#256B4B]">
                &ldquo;{content.hero.verse?.text}&rdquo;
              </p>
              <p className="mt-3 text-sm font-medium text-[#9A6A12]">
                {content.hero.verse?.reference}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 text-[#21352B]">
                <div className="border-t border-[#2F7D5A]/15 pt-3">
                  <p className="text-2xl font-bold">{siteConfig.founded}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Founded
                  </p>
                </div>
                <div className="border-t border-[#2F7D5A]/15 pt-3">
                  <p className="text-2xl font-bold">Nigeria</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Focus
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder credibility and movement framing */}
      <section className="bg-[#FAF6F1] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9A6A12]">
              {content.story.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-[#256B4B] sm:text-4xl">
              {content.story.title}
            </h2>
            <p className="mt-3 font-heading text-xl font-semibold text-[#256B4B]">
              {content.story.subtitle}
            </p>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              {content.story.body}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {content.story.cards.map((card) => (
                <div
                  key={card.title}
                  className="border-l-2 border-[#E8A825] bg-white/60 px-4 py-3"
                >
                  <p className="font-heading text-lg font-semibold text-[#256B4B]">
                    {card.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#256B4B]">
              Meet Our Founders
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {founders.map((founder) => (
                <Card
                  key={founder.name}
                  className="card-interactive border-[#E8A825]/30 bg-white/85 shadow-sm"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#256B4B] text-lg font-bold text-white"
                        aria-hidden="true"
                      >
                        {founder.initials}
                      </div>
                      <div>
                        <CardTitle className="text-lg text-[#256B4B]">
                          {founder.name}
                        </CardTitle>
                        <p className="mt-1 text-sm font-medium text-[#9A6A12]">
                          {founder.role}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-7 text-muted-foreground">
                      {founder.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission movement */}
      <section className="bg-[#EAF6EF] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="border-y border-[#2F7D5A]/20 py-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2F7D5A]">
              Mission movement
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-[#256B4B]">
              Not just supplies. A pathway back to possibility.
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              The mission is to transform educational access for vulnerable
              children by starting where the need is concrete: materials,
              encouragement, school readiness, and support that helps families
              keep learning within reach.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Our Vision",
                icon: GraduationCap,
                copy: "A Nigeria where a child's background does not decide whether they can learn, grow, and build a brighter future.",
              },
              {
                title: "Our Mission",
                icon: Rocket,
                copy: "Provide educational resources, support, and opportunity to vulnerable communities through faith-guided service.",
              },
              {
                title: "Starting point",
                icon: MapPin,
                copy: "Begin with reachable community needs, then expand only as support, trust, and accountability mature.",
              },
              {
                title: "Measure of progress",
                icon: Target,
                copy: "More children equipped, encouraged, and able to keep showing up for school.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="border border-[#2F7D5A]/15 bg-white/70 p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8A825]/15">
                    <Icon className="h-5 w-5 text-[#2F7D5A]" />
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-semibold text-[#256B4B]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {item.copy}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="bg-[#FAF6F1] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9A6A12]">
              Timeline
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-[#2D3A6E]">
              The journey is being built in public, one faithful step at a time.
            </h2>
          </div>
          <Separator className="my-8" />
          <div className="grid gap-5 md:grid-cols-4">
            {content.milestones.map((milestone, index) => (
              <div
                key={milestone.title}
                className="relative border-t-2 border-[#E8A825] pt-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <p className="font-heading text-3xl font-bold text-[#2D3A6E]">
                    {milestone.year}
                  </p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2D3A6E] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-[#2D3A6E]">
                  {milestone.title}
                </h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2026 goals */}
      <section className="bg-[#2D3A6E] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8A825]/20">
              <CalendarCheck className="h-6 w-6 text-[#F5D060]" />
            </div>
            <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              2026 goals
            </h2>
            <p className="mt-5 leading-8 text-white/80">
              The next phase is intentionally practical: serve better, report
              more clearly, and expand only where the organization can support
              the promise it makes.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.goals2026.map((goal, index) => (
              <div
                key={goal}
                className="border border-white/15 bg-white/[0.06] p-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F5D060]">
                  Goal {index + 1}
                </p>
                <p className="mt-3 leading-7 text-white/90">{goal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#EAF6EF] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9A6A12]">
                Values and principles
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-[#256B4B]">
                Core Values
              </h2>
              <p className="mt-3 font-heading text-xl font-semibold text-[#256B4B]">
                A premium mission still needs plain standards.
              </p>
              <p className="mt-5 leading-8 text-muted-foreground">
                These values shape what Beacon of Blessings says yes to, what it
                declines, and how it treats every gift entrusted to the work.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {coreValues.map((value, index) => {
                const Icon = valueIcons[index] ?? Sparkles;
                return (
                  <Card
                    key={value.title}
                    className="card-interactive border-[#E8A825]/30 bg-white/80"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8A825]/15">
                          <Icon className="h-5 w-5 text-[#2F7D5A]" />
                        </div>
                        <CardTitle className="text-[#256B4B]">
                          {value.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="leading-7 text-muted-foreground">
                        {value.description}
                      </p>
                      <p className="mt-4 border-l-2 border-[#E8A825] pl-3 text-sm font-medium italic text-primary">
                        {value.verse}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {content.operatingPrinciples.map((principle) => (
              <div
                key={principle.title}
                className="border-t border-[#2D3A6E]/20 pt-4"
              >
                <h3 className="font-heading text-lg font-semibold text-[#2D3A6E]">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invitation */}
      <section className="bg-[#FAF6F1] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 border-y border-[#2F7D5A]/20 py-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9A6A12]">
                Join the movement
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-[#256B4B]">
                Help turn school access from a fragile hope into a durable
                pattern.
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">
                Whether you give, volunteer, introduce a partner, or help share
                the work, your support helps Beacon of Blessings serve children
                with more consistency and care.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#E8A825] px-5 text-base font-medium text-[#21352B] transition-all hover:bg-[#F5D060] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:w-auto"
            >
              Get In Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
