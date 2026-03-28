import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HandHeart,
  Heart,
  Package,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/data/site";
import { getFeaturedProjects, getImpactStats } from "@/lib/sanity/queries";
import { cn } from "@/lib/utils";

const statIcons = [BookOpen, Users, Package, Target];

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  const impactStats = await getImpactStats();

  return (
    <main>
      {/* ── Section 1: Hero ──────────────────────────────── */}
      <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden bg-gradient-to-br from-[#134E4A] via-[#0F766E] to-[#0D9488] px-6 py-24 sm:py-32 lg:py-40">
        {/* Teal glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, #14B8A6, transparent)",
          }}
        />

        {/* Marigold accent line at top */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#EAB308] to-transparent"
        />

        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-5xl leading-tight tracking-tight text-white md:text-7xl">
            Illuminating Futures Through Education
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-[#FDE047] sm:text-xl">
            {siteConfig.tagline}
          </p>

          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/80">
            {siteConfig.description}
          </p>

          {/* Scripture card */}
          <div className="mx-auto mt-10 max-w-md rounded-xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-sm">
            <blockquote className="text-sm italic leading-relaxed text-white/90">
              &ldquo;For I was hungry and you gave me something to eat, I was
              thirsty and you gave me something to drink, I was a stranger and
              you invited me in.&rdquo;
            </blockquote>
            <cite className="mt-2 block text-xs font-medium not-italic text-[#FDE047]/80">
              &mdash; Matthew 25:35
            </cite>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/donate"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 bg-[#EAB308] px-8 text-base font-semibold text-[#1a1a1a] hover:bg-[#FDE047]",
              )}
            >
              <HandHeart className="h-5 w-5" />
              Give Now
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 border-white/30 px-8 text-base font-semibold text-white hover:bg-white/10",
              )}
            >
              Our Story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 2: Impact Stats ──────────────────────── */}
      <section className="bg-[#FFFDF7] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-center text-3xl tracking-tight text-foreground sm:text-4xl">
            Our Impact So Far
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#EAB308]" />

          <div className="mt-14 grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
            {impactStats.map((stat, i) => {
              const Icon = statIcons[i] ?? Target;
              return (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F0FDFA]">
                    <Icon className="h-6 w-6 text-[#0F766E]" />
                  </div>
                  <p className="font-heading text-5xl tracking-tight text-[#134E4A]">
                    {stat.value}
                  </p>
                  <div className="mx-auto mt-2 h-0.5 w-10 rounded-full bg-[#EAB308]" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 3: Mission ───────────────────────────── */}
      <section className="bg-[#F5F0EB] px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          {/* Left: Text content */}
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#0F766E]">
              Our Mission
            </p>
            <h2 className="font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
              Sharing the love of Christ through compassionate service
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Our mission is to share the love of Jesus Christ through
              practical, compassionate service to vulnerable communities in
              Nigeria. We believe every child deserves access to quality
              education, and we work alongside local families and leaders to
              make that a reality.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Founded in {siteConfig.founded} and based in {siteConfig.address},
              Beacon of Blessings bridges the gap between generosity and need
              &mdash; ensuring that donated resources reach the students and
              families who need them most.
            </p>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-8 gap-2 border-[#0F766E] text-[#0F766E] hover:bg-[#0F766E]/5",
              )}
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: Styled content card */}
          <div className="relative overflow-hidden rounded-2xl bg-[#0F766E] p-8 text-white shadow-xl">
            {/* Marigold accent stripe */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1.5 bg-[#EAB308]"
            />

            <div className="space-y-6 pl-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Heart className="h-6 w-6 text-[#FDE047]" />
              </div>
              <h3 className="font-heading text-2xl text-white">
                Faith in Action
              </h3>
              <blockquote className="border-l-2 border-[#FDE047]/40 pl-4 text-base italic leading-relaxed text-white/90">
                &ldquo;Train up a child in the way he should go; even when he is
                old he will not depart from it.&rdquo;
              </blockquote>
              <p className="text-sm font-medium text-[#FDE047]">
                Proverbs 22:6
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Featured Projects ─────────────────── */}
      <section className="bg-[#F0FDFA] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#0F766E]">
              What We Do
            </p>
            <h2 className="font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
              Projects That Transform Lives
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              From school supply drives to digital learning, every project is
              designed to create lasting change in the lives of Nigerian
              students.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Card
                key={project.slug}
                className="card-interactive flex flex-col border-t-4 border-t-[#0F766E] shadow-md"
              >
                <CardHeader>
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        project.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-[#F0FDFA] text-[#0F766E]",
                      )}
                    >
                      {project.status === "completed"
                        ? "Completed"
                        : "Upcoming"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {project.date}
                    </span>
                  </div>
                  <CardTitle className="font-heading text-xl">
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {project.impact.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0F766E]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Link
                    href={`/projects#${project.slug}`}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "gap-1 text-[#0F766E] hover:text-[#134E4A]",
                    )}
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 border-[#0F766E] px-8 text-[#0F766E] hover:bg-[#0F766E]/5",
              )}
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 5: Call to Action ────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#134E4A] px-6 py-20 md:py-28">
        {/* Marigold accent strip at top */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#EAB308] to-transparent"
        />

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">
            Join Us in Making a Difference
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-white/80">
            Your generosity provides school supplies, scholarships, and hope to
            children who need it most. Every contribution, no matter the size,
            changes a life.
          </p>

          <blockquote className="mx-auto mt-8 max-w-md rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm italic leading-relaxed text-white/90">
            &ldquo;Whoever is kind to the poor lends to the LORD, and he will
            reward them for what they have done.&rdquo;
            <cite className="mt-2 block text-xs font-medium not-italic text-[#FDE047]/80">
              &mdash; Proverbs 19:17
            </cite>
          </blockquote>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/donate"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 bg-[#EAB308] px-8 text-base font-semibold text-[#1a1a1a] hover:bg-[#FDE047]",
              )}
            >
              <Heart className="h-5 w-5" />
              Give Now
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 border-white/30 px-8 text-base font-semibold text-white hover:bg-white/10",
              )}
            >
              Volunteer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
