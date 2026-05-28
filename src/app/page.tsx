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
import { homePageContent as staticHomePageContent } from "@/data/pages";
import { programStockImages } from "@/data/stock-images";
import { getHomePage, getImpactStats, getPrograms } from "@/lib/sanity/queries";
import { cn } from "@/lib/utils";

const statIcons = [GraduationCap, MapPin, BookOpen, BadgeCheck];

export default async function HomePage() {
  const [content, impactStats, programs] = await Promise.all([
    getHomePage(),
    getImpactStats(),
    getPrograms(),
  ]);
  const staticHeroImages = staticHomePageContent.hero.images ?? [];
  const primaryHeroImage = content.hero.images?.[0] ?? staticHeroImages[0]!;
  const secondaryHeroImage = content.hero.images?.[1] ?? staticHeroImages[1]!;
  const tertiaryHeroImage = content.hero.images?.[2] ?? staticHeroImages[2]!;

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[#F7EFE6] px-6 py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2F7D5A] via-[#E8A825] to-[#2D3A6E]"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#2F7D5A]/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#256B4B]">
              <MapPin className="h-3.5 w-3.5" />
              {content.hero.eyebrow}
            </p>
            <h1 className="mt-6 max-w-4xl font-heading text-5xl leading-[1.02] tracking-tight text-[#21352B] sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5B3A2C]">
              {content.hero.body}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={content.hero.ctas?.[0]?.href ?? "/donate"}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 rounded-full bg-[#E8A825] px-8 text-base font-semibold text-[#21352B] hover:bg-[#F5D060]",
                )}
              >
                <HandHeart className="h-5 w-5" />
                {content.hero.ctas?.[0]?.label ?? "Give Today"}
              </Link>
              <Link
                href={content.hero.ctas?.[1]?.href ?? "/impact"}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "gap-2 rounded-full border-[#2D3A6E] px-8 text-base font-semibold text-[#2D3A6E] hover:bg-[#2D3A6E]/5",
                )}
              >
                {content.hero.ctas?.[1]?.label ?? "See the Impact"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[430px] overflow-hidden rounded-lg bg-[#21352B] shadow-[0_24px_80px_-56px_rgba(44,24,16,0.75)]">
                <Image
                  src={primaryHeroImage.src}
                  alt={primaryHeroImage.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21352B]/80 via-[#21352B]/10 to-transparent" />
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
                <div className="relative min-h-[205px] overflow-hidden rounded-lg bg-[#21352B]">
                  <Image
                    src={secondaryHeroImage.src}
                    alt={secondaryHeroImage.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 24vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative min-h-[205px] overflow-hidden rounded-lg bg-[#21352B]">
                  <Image
                    src={tertiaryHeroImage.src}
                    alt={tertiaryHeroImage.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 24vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <dl className="mt-4 grid rounded-lg border border-[#2F7D5A]/15 bg-white p-5 shadow-sm sm:grid-cols-4">
              {impactStats.map((stat, index) => {
                const Icon = statIcons[index] ?? Sparkles;
                return (
                  <div
                    key={stat.label}
                    className="border-l-2 border-[#E8A825] pl-3"
                  >
                    <Icon className="mb-2 h-4 w-4 text-[#2F7D5A]" />
                    <dt className="font-heading text-3xl text-[#256B4B]">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 text-xs leading-5 text-[#1F5E43]/70">
                      {stat.label}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <p className="mt-3 text-xs leading-5 text-[#1F5E43]/70">
              {content.representativeImageNote}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#2D3A6E]">
              {content.donorConfidence.eyebrow}
            </p>
            <h2 className="mt-2 font-heading text-3xl text-[#21352B]">
              {content.donorConfidence.title}
            </h2>
          </div>
          {content.donorConfidence.cards.map((signal) => (
            <div key={signal.title} className="border-t-4 border-[#E8A825] pt-5">
              <ShieldCheck className="h-7 w-7 text-[#2D3A6E]" />
              <h3 className="mt-4 font-heading text-xl text-[#21352B]">
                {signal.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#256B4B] px-6 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#E8A825]">
              {content.fieldMoments.eyebrow}
            </p>
            <h2 className="mt-2 font-heading text-4xl tracking-tight">
              {content.fieldMoments.title}
            </h2>
            <p className="mt-5 leading-7 text-white/75">
              {content.fieldMoments.body}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.fieldMoments.images.map((moment, index) => (
              <figure
                key={moment.title}
                className={cn(
                  "relative min-h-[230px] overflow-hidden rounded-lg bg-[#1F5E43]",
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F5E43]/80 via-transparent to-transparent" />
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
            <p className="text-sm font-semibold uppercase tracking-widest text-[#2F7D5A]">
              {content.programsIntro.eyebrow}
            </p>
            <h2 className="mt-2 font-heading text-4xl tracking-tight text-[#21352B]">
              {content.programsIntro.title}
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              {content.programsIntro.body}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {programs.map((program, index) => {
              const image = programStockImages[index] ?? programStockImages[0];
              return (
                <article
                  key={program.slug}
                  className="flex min-h-full flex-col overflow-hidden rounded-lg border border-[#2F7D5A]/15 bg-white shadow-sm"
                >
                  <div className="relative h-56 bg-[#21352B]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 28vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="w-fit rounded-full bg-[#2F7D5A]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#256B4B]">
                      {program.status}
                    </span>
                    <h3 className="mt-5 font-heading text-2xl text-[#21352B]">
                      {program.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                      {program.summary}
                    </p>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#256B4B] hover:text-[#1F5E43]"
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
                "gap-2 rounded-full border-[#2F7D5A] px-8 text-[#256B4B] hover:bg-[#2F7D5A]/5",
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
            <p className="text-sm font-semibold uppercase tracking-widest text-[#9A6A12]">
              {content.giftSection.eyebrow}
            </p>
            <h2 className="mt-2 font-heading text-4xl tracking-tight text-[#21352B]">
              {content.giftSection.title}
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              {content.giftSection.body}
            </p>
            <Link
              href={content.giftSection.cta.href}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#9A6A12] hover:text-[#8A6517]"
            >
              {content.giftSection.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4">
            <div className="relative min-h-[300px] overflow-hidden rounded-lg bg-[#21352B]">
              <Image
                src={content.giftSection.image.src}
                alt={content.giftSection.image.alt}
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {content.giftSection.gifts.map((gift) => (
                <div
                  key={gift.amount}
                  className="rounded-lg border border-[#E8A825]/25 bg-white p-5 shadow-sm"
                >
                  <p className="font-heading text-4xl text-[#9A6A12]">
                    {gift.amount}
                  </p>
                  <h3 className="mt-4 font-heading text-lg text-[#21352B]">
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

      <section className="bg-[#2D3A6E] px-6 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#E8A825]">
              {content.finalCta.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-4xl tracking-tight sm:text-5xl">
              {content.finalCta.title}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-[280px] overflow-hidden rounded-lg bg-[#256B4B]">
              <Image
                src={content.finalCta.image.src}
                alt={content.finalCta.image.alt}
                fill
                sizes="(min-width: 1024px) 24vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-lg bg-white p-6 text-[#21352B]">
              <HeartHandshake className="h-8 w-8 text-[#9A6A12]" />
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {content.finalCta.body}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={content.finalCta.ctas[0]?.href ?? "/donate"}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "gap-2 rounded-full bg-[#E8A825] text-[#21352B] hover:bg-[#F5D060]",
                  )}
                >
                  {content.finalCta.ctas[0]?.label ?? "Give Today"}
                </Link>
                <Link
                  href={content.finalCta.ctas[1]?.href ?? "/contact"}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "gap-2 rounded-full border-[#2D3A6E] text-[#2D3A6E] hover:bg-[#2D3A6E]/5",
                  )}
                >
                  {content.finalCta.ctas[1]?.label ?? "Partner With Us"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
