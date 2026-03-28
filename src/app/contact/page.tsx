import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Heart,
  Users,
  Handshake,
  Share2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ContactForm } from "@/components/contact-form";
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
      "Your generous contributions fund school supplies, uniforms, and tuition for students in need.",
  },
  {
    icon: Users,
    title: "Volunteer",
    description:
      "Share your time and skills to mentor students, teach workshops, or help with community outreach.",
  },
  {
    icon: Handshake,
    title: "Partner",
    description:
      "Collaborate with us as a corporate partner, school, or community organization to expand our reach.",
  },
  {
    icon: Share2,
    title: "Spread the Word",
    description:
      "Follow us on social media and share our mission with your network to raise awareness.",
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="relative py-20 md:py-28"
        style={{
          background:
            "linear-gradient(135deg, var(--bob-purple-950) 0%, var(--bob-purple-800) 50%, var(--bob-purple-700) 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-purple-200">
            We would love to hear from you. Whether you have a question about
            our programs, want to volunteer, or are interested in partnering
            with us, we are here to help.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-5">
          {/* Left column -- contact info */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight">Get in Touch</h2>
            <p className="text-muted-foreground">
              Reach out to us through any of the channels below and we will
              respond within 24-48 hours.
            </p>

            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => (
                <Card key={item.label}>
                  <CardContent className="flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: "var(--bob-purple-100)",
                      }}
                    >
                      <item.icon
                        className="h-5 w-5"
                        style={{ color: "var(--bob-purple-600)" }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium hover:underline"
                          style={{ color: "var(--bob-purple-700)" }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium">{item.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right column -- form */}
          <div className="lg:col-span-3">
            <Card className="p-0">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-1 text-2xl font-bold tracking-tight">
                  Send Us a Message
                </h2>
                <p className="mb-6 text-muted-foreground">
                  Fill out the form below and we will get back to you promptly.
                </p>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* Get Involved */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Get Involved</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              There are many ways to support our mission of illuminating futures
              through education.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {getInvolved.map((item) => (
              <Card key={item.title} className="text-center">
                <CardContent className="flex flex-col items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "var(--bob-gold-100)",
                    }}
                  >
                    <item.icon
                      className="h-6 w-6"
                      style={{ color: "var(--bob-gold-600)" }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
