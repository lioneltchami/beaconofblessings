import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { programs } from "@/data/programs";
import { siteConfig } from "@/data/site";
import {
  fieldMomentImages,
  programStockImages,
  stockImages,
} from "@/data/stock-images";
import { getImpactStats } from "@/lib/sanity/queries";
import { cn } from "@/lib/utils";

const statIcons = [GraduationCap, MapPin, BookOpen, BadgeCheck];

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
    title: "Program gifts are tracked",
    body: "Gifts are connected to the program they support so updates can stay practical and traceable.",
  },
  {
    title: "Child-safe reporting",
    body: "Public updates protect children while still showing donors what was delivered and learned.",
  },
  {
    title: "Receipts and records retained",
    body: "Receipts, field notes, and delivery records are kept for review before updates are shared.",
  },
];

export default async function HomePage() {
  const impactStats = await getImpactStats();

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[#F7EFE6] px-6 py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#8B3A24] via-[#E8A825] to-[#2D3A6E]"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#C05A3C]/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#8B3A24]">
              <MapPin className="h-3.5 w-3.5" />
              Lagos, Nigeria
            </p>
            <h1 className="mt-6 max-w-4xl font-heading text-5xl leading-[1.02] tracking-tight text-[#2C1810] sm:text-6xl lg:text-7xl">
              Help children stay in school with dignity and hope.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5B3A2C]">
              {siteConfig.name} turns faith into practical education support:
              school supplies, learning access, and local school partnerships
              for vulnerable Nigerian children.
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
          </div>

          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[430px] overflow-hidden rounded-lg bg-[#2C1810] shadow-[0_24px_80px_-56px_rgba(44,24,16,0.75)]">
                <Image
                  src={stockImages.classroomFocus}
                  alt="Children seated in a classroom during a lesson"
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 via-[#2C1810]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#F5D060]">
                    What your gift makes possible
                  </p>
                  <p className="mt-3 font-heading text-3xl leading-tight">
                    A school bag, notebooks, mentoring, fee relief, or shared
                    learning tools can keep a child participating in class.
                  </p>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="relative min-h-[205px] overflow-hidden rounded-lg bg-[#2C1810]">
                    <Image
                    src={stockImages.schoolyard}
                    alt="Schoolchildren gathered on school grounds"
                    fill
                    sizes="(min-width: 1024px) 24vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative min-h-[205px] overflow-hidden rounded-lg bg-[#2C1810]">
                  <Image
                    src={stockImages.smilingStudent}
                    alt="A smiling student looking through a classroom window"
                    fill
                    sizes="(min-width: 1024px) 24vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <dl className="mt-4 grid rounded-lg border border-[#C05A3C]/10 bg-white p-5 shadow-sm sm:grid-cols-4">
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
            <p className="mt-3 text-xs leading-5 text-[#6B2A18]/70">
              Representative school imagery from Pexels while Beacon field
              photos are added.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8B3A24]">
              Donor confidence
            </p>
            <h2 className="mt-2 font-heading text-3xl text-[#2C1810]">
              Simple mission. Visible follow-up.
            </h2>
          </div>
          {trustSignals.map((signal) => (
            <div key={signal.title} className="border-t-4 border-[#E8A825] pt-5">
              <ShieldCheck className="h-7 w-7 text-[#C05A3C]" />
              <h3 className="mt-4 font-heading text-xl text-[#2C1810]">
                {signal.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {signal.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#2C1810] px-6 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#E8A825]">
              Field moments
            </p>
            <h2 className="mt-2 font-heading text-4xl tracking-tight">
              Let people see the kind of classrooms, students, and school days
              their gifts support.
            </h2>
            <p className="mt-5 leading-7 text-white/75">
              These are temporary representative photos. As Beacon collects its
              own child-safe field media, this section can become the living
              proof wall for distributions, visits, and partner schools.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {fieldMomentImages.map((moment, index) => (
              <figure
                key={moment.title}
                className={cn(
                  "relative min-h-[230px] overflow-hidden rounded-lg bg-[#8B3A24]",
                  index === 1 ? "sm:translate-y-8" : "",
                )}
              >
                <Image
                  src={moment.src}
                  alt={moment.alt}
                  fill
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold">
                  {moment.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF6F1] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8B3A24]">
              Programs
            </p>
            <h2 className="mt-2 font-heading text-4xl tracking-tight text-[#2C1810]">
              Three focused ways to keep students learning.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Each program starts with a concrete barrier and a clear path for
              donor support.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {programs.map((program, index) => {
              const image = programStockImages[index] ?? programStockImages[0];
              return (
                <article
                  key={program.slug}
                  className="flex min-h-full flex-col overflow-hidden rounded-lg border border-[#C05A3C]/10 bg-white shadow-sm"
                >
                  <div className="relative h-56 bg-[#2C1810]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 28vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="w-fit rounded-full bg-[#C05A3C]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#8B3A24]">
                      {program.status}
                    </span>
                    <h3 className="mt-5 font-heading text-2xl text-[#2C1810]">
                      {program.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                      {program.summary}
                    </p>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#8B3A24] hover:text-[#6B2A18]"
                    >
                      {program.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10">
            <Link
              href="/programs"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 rounded-full border-[#C05A3C] px-8 text-[#8B3A24] hover:bg-[#C05A3C]/5",
              )}
            >
              View Programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F5EFE6] px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8B3A24]">
              Where your gift goes
            </p>
            <h2 className="mt-2 font-heading text-4xl tracking-tight text-[#2C1810]">
              Specific gifts. Specific help.
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Each gift is tied to practical education support, with deeper
              program and transparency details available when donors want to
              review the work.
            </p>
            <Link
              href="/transparency"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#8B3A24] hover:text-[#6B2A18]"
            >
              Review transparency commitments
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4">
            <div className="relative min-h-[300px] overflow-hidden rounded-lg bg-[#2C1810]">
              <Image
                src={stockImages.classroomGroup}
                alt="Students seated together at classroom desks"
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
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
        </div>
      </section>

      <section className="bg-[#2C1810] px-6 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#E8A825]">
              Ready to help?
            </p>
            <h2 className="mt-3 font-heading text-4xl tracking-tight sm:text-5xl">
              Give once, give monthly, or partner with us.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-[280px] overflow-hidden rounded-lg bg-[#8B3A24]">
              <Image
                src={stockImages.smilingStudent}
                alt="A smiling student in a classroom"
                fill
                sizes="(min-width: 1024px) 24vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-lg bg-white p-6 text-[#2C1810]">
              <HeartHandshake className="h-8 w-8 text-[#C05A3C]" />
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                The fastest way to help is a secure gift. If you represent a
                school, church, company, or community group, we would also love
                to hear from you.
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
        </div>
      </section>
    </main>
  );
}
