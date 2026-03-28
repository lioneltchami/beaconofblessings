import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HandHeart,
  Heart,
  Package,
  Sparkles,
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
      {/* ── Hero Section ──────────────────────────────── */}
      <section
        className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:py-40"
        style={{
          background:
            "linear-gradient(135deg, var(--bob-purple-900) 0%, var(--bob-purple-700) 40%, var(--bob-purple-600) 100%)",
        }}
      >
        {/* decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, var(--bob-gold-400), transparent)",
          }}
        />

        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--bob-purple-500)" }}
          >
            <Heart className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h1>

          <p
            className="mx-auto mt-4 max-w-xl text-lg font-medium sm:text-xl"
            style={{ color: "var(--bob-gold-300)" }}
          >
            {siteConfig.tagline}
          </p>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/80">
            {siteConfig.description}
          </p>

          <blockquote className="mt-8 text-sm italic text-white/70">
            &ldquo;For I was hungry and you gave me something to eat, I was
            thirsty and you gave me something to drink, I was a stranger and you
            invited me in.&rdquo;
            <cite className="mt-1 block text-xs font-medium not-italic text-white/50">
              &mdash; Matthew 25:35
            </cite>
          </blockquote>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/donate"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 px-6 font-semibold text-white",
              )}
              style={{ backgroundColor: "var(--bob-gold-500)" }}
            >
              <HandHeart className="h-4 w-4" />
              Donate Now
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 border-white/30 px-6 font-semibold text-white hover:bg-white/10",
              )}
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Impact Stats ──────────────────────────────── */}
      <section
        className="border-b px-6 py-16 sm:py-20"
        style={{ backgroundColor: "var(--bob-purple-50)" }}
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="sr-only">Our Impact</h2>
          <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
            {impactStats.map((stat, i) => {
              const Icon = statIcons[i] ?? Target;
              return (
                <div key={stat.label} className="text-center">
                  <div
                    className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--bob-purple-100)" }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: "var(--bob-purple-600)" }}
                    />
                  </div>
                  <p
                    className="text-3xl font-bold tracking-tight sm:text-4xl"
                    style={{ color: "var(--bob-purple-800)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mission Preview ───────────────────────────── */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p
              className="mb-2 text-sm font-semibold uppercase tracking-wide"
              style={{ color: "var(--bob-gold-600)" }}
            >
              Our Mission
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Sharing the love of Christ through compassionate service
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
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
                "mt-6 gap-2",
              )}
            >
              About Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* visual element instead of a photo */}
          <div
            className="relative flex aspect-square items-center justify-center rounded-2xl p-8"
            style={{
              background:
                "linear-gradient(145deg, var(--bob-purple-100), var(--bob-purple-50))",
            }}
          >
            <div className="space-y-4 text-center">
              <Sparkles
                className="mx-auto h-12 w-12"
                style={{ color: "var(--bob-gold-500)" }}
              />
              <p
                className="text-lg font-semibold"
                style={{ color: "var(--bob-purple-800)" }}
              >
                Faith in Action
              </p>
              <p className="text-sm text-muted-foreground">
                &ldquo;Train up a child in the way he should go; even when he is
                old he will not depart from it.&rdquo;
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: "var(--bob-purple-500)" }}
              >
                Proverbs 22:6
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────── */}
      <section
        className="border-t px-6 py-16 sm:py-20"
        style={{ backgroundColor: "var(--bob-purple-50)" }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p
              className="mb-2 text-sm font-semibold uppercase tracking-wide"
              style={{ color: "var(--bob-gold-600)" }}
            >
              What We Do
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Projects
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              From school supply drives to digital learning, every project is
              designed to create lasting change in the lives of Nigerian
              students.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Card key={project.slug} className="flex flex-col">
                <CardHeader>
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        project.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "text-white",
                      )}
                      style={
                        project.status === "upcoming"
                          ? {
                              backgroundColor: "var(--bob-purple-100)",
                              color: "var(--bob-purple-700)",
                            }
                          : undefined
                      }
                    >
                      {project.status === "completed"
                        ? "Completed"
                        : "Upcoming"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {project.date}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-1.5">
                    {project.impact.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: "var(--bob-purple-500)" }}
                        />
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
                      "gap-1",
                    )}
                    style={{ color: "var(--bob-purple-600)" }}
                  >
                    Read more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2",
              )}
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────── */}
      <section
        className="relative isolate overflow-hidden px-6 py-16 sm:py-24"
        style={{
          background:
            "linear-gradient(135deg, var(--bob-purple-800) 0%, var(--bob-purple-950) 100%)",
        }}
      >
        {/* gold accent strip */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, var(--bob-gold-400), var(--bob-gold-500), var(--bob-gold-400))",
          }}
        />

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Make a Difference Today
          </h2>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-white/80">
            Your generosity provides school supplies, scholarships, and hope to
            children who need it most. Every contribution, no matter the size,
            changes a life.
          </p>

          <blockquote className="mt-6 text-sm italic text-white/60">
            &ldquo;Whoever is kind to the poor lends to the LORD, and he will
            reward them for what they have done.&rdquo;
            <cite className="mt-1 block text-xs font-medium not-italic text-white/40">
              &mdash; Proverbs 19:17
            </cite>
          </blockquote>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/donate"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 px-8 font-semibold text-white",
              )}
              style={{ backgroundColor: "var(--bob-gold-500)" }}
            >
              <Heart className="h-4 w-4" />
              Give Now
            </Link>
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
