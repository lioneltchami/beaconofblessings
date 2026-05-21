import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarCheck,
  CheckCircle,
  ClipboardCheck,
  CircleDollarSign,
  FileText,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Landmark,
  Lightbulb,
  MapPin,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { impactReport } from "@/data/impact";
import { programs } from "@/data/programs";
import { siteConfig } from "@/data/site";
import { getFeaturedProjects, getImpactStats } from "@/lib/sanity/queries";
import { cn } from "@/lib/utils";

const statIcons = [GraduationCap, MapPin, BookOpen, BadgeCheck];

const storyArc = [
  {
    eyebrow: "The need",
    title: "Education costs are still a daily barrier.",
    description:
      "For vulnerable families, a school bag, notebooks, exam materials, transport, or a uniform can decide whether a child participates with dignity or falls behind quietly.",
    icon: Users,
  },
  {
    eyebrow: "Beacon's intervention",
    title: "Practical support reaches children through local relationships.",
    description:
      "Beacon works with school and community partners to identify need, fund specific education support, document delivery, and learn before scaling the next cycle.",
    icon: Lightbulb,
  },
  {
    eyebrow: "Donor proof",
    title: "Every public claim should be backed by records.",
    description:
      "Receipts, beneficiary counts, school confirmations, child-safe photos, and leadership review notes connect donor funds to visible outcomes.",
    icon: ClipboardCheck,
  },
  {
    eyebrow: "Next action",
    title: "Give, partner, or review the evidence.",
    description:
      "Supporters can move quickly toward giving, program detail, impact reporting, transparency commitments, or leadership contact.",
    icon: ArrowRight,
  },
];

const givingProof = [
  "Partner-school beneficiary lists and teacher confirmations",
  "Procurement receipts, packing records, and distribution counts",
  "Child-safe field photos and leadership review notes",
  "Secure Stripe checkout with donor privacy commitments",
];

const giftUses = [
  {
    amount: "$25",
    title: "School supplies",
    description: "Notebooks, pens, and classroom basics for one student.",
  },
  {
    amount: "$75",
    title: "Learning kit",
    description: "A school bag, writing materials, and core study resources.",
  },
  {
    amount: "$250",
    title: "Classroom support",
    description: "Shared books and supplies for a small learning group.",
  },
];

const trustSignals = [
  {
    icon: ShieldCheck,
    title: "Transparent stewardship",
    body: "Donation usage, program budgets, registration status, and reporting commitments are visible before a donor gives.",
  },
  {
    icon: HeartHandshake,
    title: "Local delivery",
    body: "Programs are grounded in Lagos school and community relationships, so support responds to verified needs rather than assumptions.",
  },
  {
    icon: Landmark,
    title: "Governance preview",
    body: "Leadership review, financial controls, and safeguarding expectations are presented as part of the donor journey.",
  },
];

const donorStandards = [
  "Program totals reviewed before publication",
  "Restricted gifts tracked to the intended program",
  "Child identities protected in public reporting",
  "Receipts, field records, and public impact updates retained for review",
];

const programHrefByProjectSlug: Record<string, string> = {
  "school-supplies-drive-2024": "/programs/school-readiness-kits",
  "digital-learning-initiative": "/programs/digital-learning-access",
  "girls-education-scholarship": "/programs/girls-education-support",
};

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  const impactStats = await getImpactStats();

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[#F7EFE6] px-6 py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#8B3A24] via-[#E8A825] to-[#2D3A6E]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-1/3 border-l border-[#C05A3C]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.4),rgba(232,168,37,0.12))] lg:block"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#C05A3C]/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C05A3C]">
              <MapPin className="h-3.5 w-3.5" />
              Movement to keep Nigerian children learning
            </p>
            <h1 className="mt-6 max-w-4xl font-heading text-5xl leading-[1.02] tracking-tight text-[#2C1810] sm:text-6xl lg:text-7xl">
              Help children stay in school and prove every gift mattered.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5B3A2C]">
              {siteConfig.name} turns faith into practical education support:
              school supplies, scholarships, digital learning, and community
              resources for vulnerable Nigerian children, backed by transparent
              reporting donors can inspect.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/donate"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 rounded-full bg-[#E8A825] px-8 text-base font-semibold text-[#2C1810] hover:bg-[#F5D060]",
                )}
              >
                <HandHeart className="h-5 w-5" />
                Give Today
              </Link>
              <Link
                href="/impact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "gap-2 rounded-full border-[#C05A3C] px-8 text-base font-semibold text-[#8B3A24] hover:bg-[#C05A3C]/5",
                )}
              >
                See the Impact
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {impactStats.map((stat, index) => {
                const Icon = statIcons[index] ?? Sparkles;
                return (
                  <div
                    key={stat.label}
                    className="border-l-2 border-[#E8A825] pl-3"
                  >
                    <Icon className="mb-2 h-4 w-4 text-[#C05A3C]" />
                    <dt className="font-heading text-3xl text-[#8B3A24]">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 text-xs leading-5 text-[#6B2A18]/70">
                      {stat.label}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[1.5rem] bg-[#2C1810] shadow-2xl">
              <div className="grid min-h-[560px] grid-rows-[1fr_auto]">
                <div className="relative isolate flex items-end overflow-hidden bg-[#C05A3C] p-7 sm:p-8">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(44,24,16,0.08), rgba(44,24,16,0.52)), repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 72px), repeating-linear-gradient(0deg, rgba(245,208,96,0.16) 0 1px, transparent 1px 64px), linear-gradient(135deg, #C05A3C 0%, #8B3A24 100%)",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute left-8 top-8 h-28 w-28 rounded-full border border-[#F5D060]/60"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute right-8 top-24 h-40 w-40 rounded-full border-8 border-white/10"
                  />
                  <div className="max-w-sm text-white">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#F5D060]">
                      Public mission identity
                    </p>
                    <p className="mt-3 font-heading text-3xl leading-tight">
                      A public mission for children, schools, donors, and
                      community partners.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
                      <div className="border-l-2 border-[#F5D060] bg-[#2C1810]/35 p-3">
                        <span className="block font-heading text-2xl">
                          {impactReport.period}
                        </span>
                        <span className="text-white/75">evidence base</span>
                      </div>
                      <div className="border-l-2 border-white/60 bg-[#2C1810]/35 p-3">
                        <span className="block font-heading text-2xl">
                          Lagos
                        </span>
                        <span className="text-white/75">service focus</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#2C1810] p-6">
                  <ul className="space-y-3">
                    {givingProof.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-white/80"
                      >
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#E8A825]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/transparency"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F5D060] hover:text-white"
                  >
                    Inspect donor safeguards
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#C05A3C]">
                Story arc
              </p>
              <h2 className="mt-2 font-heading text-4xl tracking-tight text-[#2C1810]">
                The need, the intervention, the proof, then the next action.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground lg:ml-auto">
              Serious nonprofit homepages do more than inspire. They explain
              the problem, make the intervention concrete, show why donors can
              trust the organization, and move supporters toward the right next
              page.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {storyArc.map(({ eyebrow, title, description, icon: Icon }, index) => (
              <article
                key={title}
                className="relative rounded-lg border border-[#C05A3C]/10 bg-[#FAF6F1] p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon className="h-7 w-7 text-[#C05A3C]" />
                  <span className="font-heading text-4xl text-[#E8A825]/70">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-[#8B3A24]">
                  {eyebrow}
                </p>
                <h3 className="mt-2 font-heading text-xl leading-tight text-[#2C1810]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF6F1] px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C05A3C]">
              Donor confidence
            </p>
            <h2 className="mt-2 font-heading text-3xl text-[#2C1810]">
              Trust is designed into the journey.
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Evidence-based donor trust is treated as product behavior, not a
              footer afterthought.
            </p>
          </div>
          {trustSignals.map(({ icon: Icon, title, body }) => (
            <div key={title} className="border-t-4 border-[#E8A825] pt-5">
              <Icon className="h-7 w-7 text-[#C05A3C]" />
              <h3 className="mt-4 font-heading text-xl text-[#2C1810]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#C05A3C]">
                Program pillars
              </p>
              <h2 className="mt-2 font-heading text-4xl tracking-tight text-[#2C1810]">
                Three ways Beacon keeps students learning.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground lg:ml-auto">
              The movement identity is anchored in program pillars donors can
              understand quickly: readiness supplies, girls&apos; education
              support, and practical digital learning access.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {programs.map((program, index) => {
              const icons = [BookOpen, GraduationCap, Network];
              const Icon = icons[index] ?? Sparkles;
              return (
                <article
                  key={program.slug}
                  className="flex min-h-full flex-col rounded-lg border border-[#C05A3C]/10 bg-[#FAF6F1] p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C05A3C]/10">
                      <Icon className="h-5 w-5 text-[#C05A3C]" />
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#8B3A24]">
                      {program.status}
                    </span>
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[#C05A3C]">
                    {program.kicker}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl text-[#2C1810]">
                    {program.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                    {program.summary}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {program.outcomes.slice(0, 2).map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-start gap-2 text-sm text-[#5B3A2C]"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#C05A3C]" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C05A3C] hover:text-[#8B3A24]"
                  >
                    {program.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF6F1] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C05A3C]">
              Field proof
            </p>
            <h2 className="mt-2 font-heading text-4xl tracking-tight text-[#2C1810]">
              Completed work should lead donors into the next program cycle.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Beacon focuses on concrete, reportable interventions. The current
              project archive shows what has been delivered, what was learned,
              and where a donor can fund the next measurable step.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <article
                key={project.slug}
                className="flex flex-col rounded-lg border border-[#C05A3C]/10 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#C05A3C]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#C05A3C]">
                    {project.status === "completed" ? "Completed" : "Upcoming"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {project.date}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-2xl text-[#2C1810]">
                  {project.title}
                </h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {project.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {project.impact.slice(0, 3).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-[#5B3A2C]"
                    >
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#C05A3C]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={programHrefByProjectSlug[project.slug] ?? `/projects#${project.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C05A3C] hover:text-[#8B3A24]"
                >
                  View program details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/programs"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 rounded-full border-[#C05A3C] px-8 text-[#8B3A24] hover:bg-[#C05A3C]/5",
              )}
            >
              Explore All Programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F5EFE6] px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C05A3C]">
              Where your gift goes
            </p>
            <h2 className="mt-2 font-heading text-4xl tracking-tight text-[#2C1810]">
              Specific gifts. Specific outcomes. Clear follow-up.
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Donors should not have to guess. Beacon shows what each gift can
              fund, then routes supporters toward program pages, reports,
              photos, and field updates.
            </p>
            <Link
              href="/transparency"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C05A3C] hover:text-[#8B3A24]"
            >
              Review transparency commitments
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {giftUses.map((gift) => (
              <div
                key={gift.amount}
                className="rounded-lg border border-[#C05A3C]/10 bg-white p-5 shadow-sm"
              >
                <p className="font-heading text-4xl text-[#8B3A24]">
                  {gift.amount}
                </p>
                <h3 className="mt-4 font-heading text-lg text-[#2C1810]">
                  {gift.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {gift.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C05A3C]">
              Evidence-based donor trust
            </p>
            <h2 className="mt-2 font-heading text-4xl tracking-tight text-[#2C1810]">
              Accountability is part of the mission infrastructure.
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Beacon&apos;s trust story is built around records, safeguarding,
              financial clarity, and reporting. This makes the donor experience
              feel serious before the checkout page ever appears.
            </p>
          </div>
          <div className="rounded-lg border border-[#C05A3C]/10 bg-[#2C1810] p-6 text-white">
            <div className="flex items-center gap-3">
              <CircleDollarSign className="h-8 w-8 text-[#E8A825]" />
              <h3 className="font-heading text-2xl">
                Donor proof standards
              </h3>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {donorStandards.map((standard) => (
                <li
                  key={standard}
                  className="flex items-start gap-3 text-sm leading-6 text-white/80"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#E8A825]" />
                  {standard}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/transparency"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "gap-2 rounded-full border-[#E8A825] text-[#F5D060] hover:bg-white/10",
                )}
              >
                Open transparency center
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#F5D060] hover:text-white"
              >
                See public resources
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#2C1810] px-6 py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#E8A825]">
              <CalendarCheck className="h-4 w-4" />
              Next action
            </p>
            <h2 className="mt-3 font-heading text-4xl tracking-tight sm:text-5xl">
              Compassion becomes credible when it is accountable and repeated.
            </h2>
            <blockquote className="mt-6 max-w-2xl border-l-4 border-[#E8A825] pl-5 text-lg italic leading-8 text-white/80">
              &ldquo;Whoever is kind to the poor lends to the LORD, and he will
              reward them for what they have done.&rdquo;
              <cite className="mt-3 block text-sm not-italic text-[#F5D060]">
                Proverbs 19:17
              </cite>
            </blockquote>
          </div>
          <div className="rounded-lg bg-white p-6 text-[#2C1810]">
            <FileText className="h-8 w-8 text-[#C05A3C]" />
            <h3 className="mt-4 font-heading text-2xl">
              Ready to support a student?
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Give once, give monthly, partner with the field team, or start by
              reviewing the impact and transparency pages. The path is clear
              either way.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/donate"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 rounded-full bg-[#E8A825] text-[#2C1810] hover:bg-[#F5D060]",
                )}
              >
                Give Today
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "gap-2 rounded-full border-[#C05A3C] text-[#8B3A24] hover:bg-[#C05A3C]/5",
                )}
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
