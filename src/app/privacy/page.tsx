import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
};

const lastUpdated = "March 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-[#8B3A24] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-[#FDF2EE]/70">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#FAF6F1] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <div className="prose prose-neutral max-w-none space-y-8 text-foreground">
            <p className="text-lg text-muted-foreground">
              {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website{" "}
              <a
                href={siteConfig.url}
                className="font-medium text-primary hover:underline"
              >
                {siteConfig.url}
              </a>
              .
            </p>

            <Separator />

            <section>
              <h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
                Information We Collect
              </h2>
              <p className="mb-3 text-muted-foreground">
                We may collect the following types of information:
              </p>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">
                    Personal Information:
                  </strong>{" "}
                  Name, email address, phone number, and mailing address when
                  you contact us, make a donation, or sign up for our
                  newsletter.
                </li>
                <li>
                  <strong className="text-foreground">
                    Payment Information:
                  </strong>{" "}
                  When you make a donation, payment details are processed
                  securely by our third-party payment processor. We do not store
                  your credit card or bank account numbers.
                </li>
                <li>
                  <strong className="text-foreground">
                    Usage Information:
                  </strong>{" "}
                  Browser type, operating system, pages visited, time spent on
                  the site, and referring URLs collected automatically through
                  cookies and analytics tools.
                </li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
                How We Use Your Information
              </h2>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>
                  To process and acknowledge donations and issue tax receipts.
                </li>
                <li>To respond to your inquiries and provide support.</li>
                <li>
                  To send newsletters, updates, and information about our
                  programs (with your consent).
                </li>
                <li>To improve our website, services, and user experience.</li>
                <li>
                  To comply with legal obligations and protect our rights.
                </li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
                Cookies
              </h2>
              <p className="text-muted-foreground">
                Our website may use cookies and similar tracking technologies to
                enhance your browsing experience. Cookies are small data files
                stored on your device. You can control cookie preferences
                through your browser settings. Disabling cookies may affect
                certain features of our website.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
                Third-Party Services
              </h2>
              <p className="text-muted-foreground">
                We may use third-party services for analytics (such as Google
                Analytics), payment processing, and email communications. These
                services have their own privacy policies governing the use of
                your information. We encourage you to review their policies. We
                do not sell, trade, or rent your personal information to third
                parties.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
                Data Security
              </h2>
              <p className="text-muted-foreground">
                We implement reasonable administrative, technical, and physical
                security measures to protect your personal information. However,
                no method of transmission over the Internet or electronic
                storage is 100% secure. While we strive to protect your
                information, we cannot guarantee its absolute security.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
                Your Rights
              </h2>
              <p className="mb-3 text-muted-foreground">
                Depending on your location, you may have the following rights
                regarding your personal information:
              </p>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>
                  The right to access the personal data we hold about you.
                </li>
                <li>The right to request correction of inaccurate data.</li>
                <li>The right to request deletion of your personal data.</li>
                <li>
                  The right to withdraw consent for marketing communications at
                  any time.
                </li>
                <li>
                  The right to lodge a complaint with a data protection
                  authority.
                </li>
              </ul>
              <p className="mt-3 text-muted-foreground">
                To exercise any of these rights, please contact us at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-primary hover:underline"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
                Children&apos;s Privacy
              </h2>
              <p className="text-muted-foreground">
                Our website is not directed at children under the age of 13. We
                do not knowingly collect personal information from children
                under 13. If you believe a child has provided us with personal
                information, please contact us so we can delete it promptly.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
                Changes to This Policy
              </h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated revision date. We
                encourage you to review this policy periodically to stay
                informed about how we are protecting your information.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
                Contact Us
              </h2>
              <p className="text-muted-foreground">
                If you have questions or concerns about this Privacy Policy,
                please contact us at:
              </p>
              <div className="mt-3 rounded-lg border bg-[#FDF2EE] p-4 text-sm">
                <p className="font-semibold">{siteConfig.name}</p>
                <p className="text-muted-foreground">
                  Email:{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </p>
                <p className="text-muted-foreground">
                  Address: {siteConfig.address}
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
