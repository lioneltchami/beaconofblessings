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
import { DonateForm } from "@/components/donate-form";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Donate",
  description: `Support ${siteConfig.name} Charity Initiative. Your donation provides school supplies, textbooks, and educational resources to vulnerable children in Nigeria.`,
};

const impactItems = [
  {
    icon: BookOpen,
    title: "School Supplies",
    description: "Notebooks, pens, and bags for students who have none",
  },
  {
    icon: GraduationCap,
    title: "Scholarships",
    description: "Helping bright students stay in school",
  },
  {
    icon: Package,
    title: "Learning Materials",
    description: "Textbooks and educational resources for classrooms",
  },
  {
    icon: Users,
    title: "Community Impact",
    description: "Supporting entire communities through education",
  },
];

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Transparent Stewardship",
    description:
      "Every donation is tracked and directed to the communities that need it most.",
  },
  {
    icon: Heart,
    title: "Faith-Driven Mission",
    description:
      "We are guided by our commitment to sharing the love of Christ through action.",
  },
  {
    icon: HandHeart,
    title: "Direct Impact",
    description:
      "Your generosity goes directly to providing educational resources for children.",
  },
];

export default function DonatePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative py-20 sm:py-28"
        style={{
          background:
            "linear-gradient(135deg, var(--bob-purple-900) 0%, var(--bob-purple-700) 50%, var(--bob-purple-800) 100%)",
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

        <div className="mx-auto max-w-3xl px-4 text-center">
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--bob-purple-500)" }}
          >
            <HandHeart className="h-7 w-7 text-white" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Make a Difference
          </h1>

          <p
            className="mx-auto mt-4 max-w-xl text-lg leading-relaxed"
            style={{ color: "var(--bob-gold-300)" }}
          >
            Your generosity provides school supplies, scholarships, and hope to
            children who need it most.
          </p>

          <blockquote className="mt-6 text-sm italic text-white/70">
            &ldquo;Whoever is kind to the poor lends to the LORD, and he will
            reward them for what they have done.&rdquo;
            <cite className="mt-1 block text-xs font-medium not-italic text-white/50">
              &mdash; Proverbs 19:17
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Impact Stats */}
      <section
        className="border-b px-6 py-14 sm:py-16"
        style={{ backgroundColor: "var(--bob-purple-50)" }}
      >
        <div className="mx-auto max-w-5xl">
          <h2
            className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: "var(--bob-purple-900)" }}
          >
            Your Donation Makes an Impact
          </h2>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {impactItems.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div
                  className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: "var(--bob-purple-100)" }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: "var(--bob-purple-600)" }}
                  />
                </div>
                <h3
                  className="text-sm font-semibold"
                  style={{ color: "var(--bob-purple-800)" }}
                >
                  {title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate Form */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <h2
            className="mb-2 text-center text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: "var(--bob-purple-900)" }}
          >
            Choose Your Gift
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            Every contribution, no matter the size, changes a life.
          </p>
          <DonateForm />
        </div>
      </section>

      {/* Why Give? */}
      <section
        className="border-t px-6 py-16 sm:py-20"
        style={{ backgroundColor: "var(--bob-purple-50)" }}
      >
        <div className="mx-auto max-w-5xl">
          <h2
            className="mb-3 text-center text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: "var(--bob-purple-900)" }}
          >
            Why Give?
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-muted-foreground">
            When you give to {siteConfig.name}, you partner with a team
            committed to integrity, transparency, and lasting impact.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {trustPoints.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardContent className="pt-2 text-center">
                  <div
                    className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--bob-gold-100)" }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: "var(--bob-gold-600)" }}
                    />
                  </div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
