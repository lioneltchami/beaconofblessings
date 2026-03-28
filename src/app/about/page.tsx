import {
  BookOpen,
  GraduationCap,
  Handshake,
  Heart,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/data/site";
import { getCoreValues, getFounders } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: `Learn about ${siteConfig.name} Charity Initiative -- our mission, story, founders, and commitment to transforming lives through educational support for vulnerable communities in Nigeria.`,
};

const valueIcons = [Heart, BookOpen, Handshake, ShieldCheck];

const milestones = [
  {
    year: "2024",
    title: "Founded",
    description:
      "Beacon of Blessings Charity Initiative was born from witnessing children in Lagos communities unable to attend school because they lacked basic supplies.",
  },
  {
    year: "2024",
    title: "School Supplies Drive",
    description:
      "Our inaugural project distributed essential school supplies to over 500 students across 5 communities in Lagos.",
  },
  {
    year: "2026+",
    title: "Future Projects",
    description:
      "Expanding into digital learning, girls' education scholarships, and community libraries to reach thousands more students.",
  },
];

export default async function AboutPage() {
  const founders = await getFounders();
  const coreValues = await getCoreValues();

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
            About {siteConfig.name}
          </h1>
          <p
            className="mt-6 text-lg italic leading-relaxed"
            style={{ color: "var(--bob-gold-300)" }}
          >
            &ldquo;The Spirit of the Lord is on me, because he has anointed me
            to proclaim good news to the poor.&rdquo;
          </p>
          <p
            className="mt-2 text-sm font-medium"
            style={{ color: "var(--bob-gold-400)" }}
          >
            &mdash; Luke 4:18
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--bob-purple-900)" }}
          >
            Our Story
          </h2>
          <Separator className="my-6" />
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              In {siteConfig.founded}, {siteConfig.name} Charity Initiative was
              born from a simple but urgent observation: too many children in
              Lagos communities were unable to attend school because they lacked
              the most basic supplies -- a notebook, a pen, a school bag.
            </p>
            <p>
              What started as a conviction shared between two friends quickly
              grew into an organized effort to bridge the gap between
              underprivileged communities and the educational resources they
              desperately needed. We believe that every child deserves a chance
              to learn, grow, and reach their full potential.
            </p>
            <p>
              Today, {siteConfig.name} continues to expand its reach, driven by
              faith, community partnership, and a relentless commitment to
              illuminating futures through education.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section
        className="py-16 sm:py-20"
        style={{ backgroundColor: "var(--bob-purple-50)" }}
      >
        <div className="mx-auto grid max-w-5xl gap-8 px-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div
                className="mb-2 flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--bob-purple-100)" }}
              >
                <GraduationCap
                  className="h-5 w-5"
                  style={{ color: "var(--bob-purple-600)" }}
                />
              </div>
              <CardTitle className="text-xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A Nigeria where every child, regardless of their background, has
                access to quality education and the opportunity to build a
                brighter future.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div
                className="mb-2 flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--bob-gold-100)" }}
              >
                <Rocket
                  className="h-5 w-5"
                  style={{ color: "var(--bob-gold-600)" }}
                />
              </div>
              <CardTitle className="text-xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To transform lives by providing educational resources, support,
                and opportunities to vulnerable communities across Nigeria,
                guided by faith and driven by compassion.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Meet Our Founders */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2
            className="text-center text-3xl font-bold tracking-tight"
            style={{ color: "var(--bob-purple-900)" }}
          >
            Meet Our Founders
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            The people behind the mission.
          </p>
          <Separator className="mx-auto my-8 max-w-xs" />
          <div className="grid gap-8 sm:grid-cols-2">
            {founders.map((founder) => (
              <Card key={founder.name}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, var(--bob-purple-600), var(--bob-purple-800))`,
                      }}
                      aria-hidden="true"
                    >
                      {founder.initials}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{founder.name}</CardTitle>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--bob-gold-600)" }}
                      >
                        {founder.role}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{founder.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section
        className="py-16 sm:py-20"
        style={{ backgroundColor: "var(--bob-purple-50)" }}
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2
            className="text-center text-3xl font-bold tracking-tight"
            style={{ color: "var(--bob-purple-900)" }}
          >
            Core Values
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            The principles that guide everything we do.
          </p>
          <Separator className="mx-auto my-8 max-w-xs" />
          <div className="grid gap-6 sm:grid-cols-2">
            {coreValues.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <Card key={value.title}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: "var(--bob-gold-100)" }}
                      >
                        <Icon
                          className="h-4 w-4"
                          style={{ color: "var(--bob-gold-600)" }}
                        />
                      </div>
                      <CardTitle>{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                    <p
                      className="mt-3 text-sm font-medium italic"
                      style={{ color: "var(--bob-purple-600)" }}
                    >
                      {value.verse}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2
            className="text-center text-3xl font-bold tracking-tight"
            style={{ color: "var(--bob-purple-900)" }}
          >
            Our Journey
          </h2>
          <Separator className="mx-auto my-8 max-w-xs" />
          <div className="relative space-y-8 pl-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border">
            {milestones.map((milestone) => (
              <div key={milestone.title} className="relative">
                <div
                  className="absolute -left-8 top-1 h-6 w-6 rounded-full border-2 border-white"
                  style={{
                    background: `linear-gradient(135deg, var(--bob-purple-500), var(--bob-gold-500))`,
                  }}
                  aria-hidden="true"
                />
                <p
                  className="text-sm font-bold"
                  style={{ color: "var(--bob-gold-600)" }}
                >
                  {milestone.year}
                </p>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--bob-purple-800)" }}
                >
                  {milestone.title}
                </h3>
                <p className="mt-1 text-muted-foreground">
                  {milestone.description}
                </p>
              </div>
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
            Join Our Mission
          </h2>
          <p
            className="mt-4 text-lg"
            style={{ color: "var(--bob-purple-200)" }}
          >
            Together, we can illuminate more futures. Whether you volunteer,
            donate, or spread the word, every contribution matters.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/contact" />}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
