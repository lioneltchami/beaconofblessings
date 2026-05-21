import {
  ArrowRight,
  Clock,
  Handshake,
  Heart,
  Mail,
  MapPin,
  Phone,
  Share2,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name}. We would love to hear from you about donations, volunteering, partnerships, or general inquiries.`,
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: siteConfig.address,
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: siteConfig.officeHours,
  },
];

const getInvolved = [
  {
    icon: Heart,
    title: "Donate",
    description:
      "Fund school supplies, uniforms, tuition support, and reportable education programs.",
    href: "/donate",
    cta: "Give today",
  },
  {
    icon: Users,
    title: "Volunteer",
    description:
      "Offer time, skills, mentorship, workshop support, or community outreach help.",
    href: "/contact?subject=Volunteer",
    cta: "Start a conversation",
  },
  {
    icon: Handshake,
    title: "Partner",
    description:
      "Collaborate as a company, school, church, or community group to expand reach.",
    href: "/contact?subject=Partnership",
    cta: "Discuss partnership",
  },
  {
    icon: Share2,
    title: "Spread the Word",
    description:
      "Share verified impact, program pages, and donation links with your network.",
    href: "/impact",
    cta: "Share our impact",
  },
];

const trustNotes = [
  [
    "Donor clarity",
    "Ask before giving, verify program use, or request receipt support.",
  ],
  [
    "Partnership fit",
    "Schools, companies, churches, and community groups can start here.",
  ],
  [
    "Safeguarding first",
    "Public stories and photos are handled with consent and care.",
  ],
] as const;

export default function ContactPage() {
  return (
    <div className="flex flex-col bg-[#FAF6F1]">
      <section className="relative isolate overflow-hidden bg-[#2C1810] py-20 text-white md:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-95"
          style={{
            background:
              "linear-gradient(120deg, rgba(139,58,36,0.96), rgba(44,24,16,0.94) 52%, rgba(45,58,110,0.82))",
          }}
        />
        <div
          className="absolute bottom-0 left-0 h-1 w-full bg-[#E8A825]"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#F5D060]">
              <Mail className="h-3.5 w-3.5" />
              Donor, volunteer, and partner support
            </p>
            <h1 className="mt-6 max-w-3xl font-heading text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Let&apos;s make the next step clear.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#FDF2EE]/82">
              Whether you want to give, volunteer, partner, or verify details
              before supporting Beacon, this is the fastest path to the right
              conversation.
            </p>
          </div>

          <div className="border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#F5D060]">
              Response window
            </p>
            <p className="mt-3 font-heading text-3xl text-white">24-48 hours</p>
            <p className="mt-2 text-sm leading-6 text-[#FDF2EE]/75">
              Include your preferred contact method and topic so the right
              person can follow up cleanly.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Direct contact
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#8B3A24]">
                Reach the team without friction.
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Use the form for program questions, donor verification,
                volunteering, and partnership inquiries.
              </p>
            </div>

            <div className="grid gap-3">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 border border-[#C05A3C]/10 bg-white/80 p-4 shadow-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FDF2EE] text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block break-words font-semibold text-[#8B3A24] hover:text-primary"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-semibold text-[#8B3A24]">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="border-l-2 border-[#E8A825] pl-4 text-sm leading-6 text-muted-foreground">
              For urgent donation or receipt questions, include the Stripe
              checkout email and approximate donation date.
            </p>
          </aside>

          <div>
            <Card className="border border-[#C05A3C]/10 bg-white/90 p-0 shadow-[0_24px_80px_-56px_rgba(44,24,16,0.75)]">
              <CardContent className="p-6 md:p-9">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  Message
                </p>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-[#8B3A24]">
                  Send Us a Message
                </h2>
                <p className="mb-7 mt-2 leading-7 text-muted-foreground">
                  A concise message helps us answer faster. Tell us the topic,
                  the outcome you need, and the best way to reach you.
                </p>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      <section className="bg-[#F5EFE6] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Choose your lane
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#8B3A24]">
              Four useful ways to move the mission forward.
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Each path leads to a clear next action, from giving today to
              starting a partnership conversation.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {getInvolved.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group border border-[#C05A3C]/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#C05A3C]/25 hover:shadow-[0_22px_60px_-44px_rgba(44,24,16,0.65)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#E8A825]/12 text-[#B8861E]">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-[#8B3A24]">
                  {item.title}
                </h3>
                <p className="mt-3 min-h-24 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 grid gap-6 border-t border-[#C05A3C]/10 pt-8 md:grid-cols-3">
            {trustNotes.map(([title, body]) => (
              <div key={title}>
                <p className="font-heading text-lg font-semibold text-[#8B3A24]">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#2C1810] px-4 py-14 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#F5D060]">
              Prefer to review first?
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold">
              See impact and transparency before you reach out.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/impact"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-white/20 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Impact
            </Link>
            <Link
              href="/transparency"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#E8A825] px-5 text-sm font-semibold text-[#2C1810] transition-colors hover:bg-[#F5D060]"
            >
              Donor Trust
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
