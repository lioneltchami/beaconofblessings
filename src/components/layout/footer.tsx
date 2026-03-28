import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { navLinks, siteConfig, socialLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="text-white">
      {/* Marigold accent stripe */}
      <div className="h-1 bg-[#EAB308]" />

      <div className="bg-[#134E4A]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* Main grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {/* Column 1: Organization info */}
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-white">
                {siteConfig.name}
              </h2>
              <p className="text-sm leading-relaxed text-teal-200/70">
                {siteConfig.description}
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F766E]/40 px-3 py-2 text-xs font-medium text-teal-200/60 transition-colors hover:text-[#EAB308]"
                  >
                    <ExternalLink className="size-3" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick links */}
            <div className="space-y-4">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                Quick Links
              </h3>
              <nav aria-label="Footer navigation">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-teal-200 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/donate"
                      className="text-sm font-medium text-[#EAB308] transition-colors hover:text-[#FDE047]"
                    >
                      Donate Now
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Column 3: Contact info */}
            <div className="space-y-4">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-teal-200/40" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-teal-200 transition-colors hover:text-white"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-teal-200/40" />
                  <a
                    href={`tel:${siteConfig.phone.replace(/[\s()]/g, "")}`}
                    className="text-sm text-teal-200 transition-colors hover:text-white"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-teal-200/40" />
                  <span className="text-sm text-teal-200">
                    {siteConfig.address}
                  </span>
                </li>
              </ul>
              <p className="text-xs text-teal-200/40">
                {siteConfig.officeHours}
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <Separator className="my-8 bg-white/10" />
        </div>
      </div>

      {/* Copyright area with darker teal */}
      <div className="bg-[#0F4845]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-white/50 transition-colors hover:text-white/80"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/50 transition-colors hover:text-white/80"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
