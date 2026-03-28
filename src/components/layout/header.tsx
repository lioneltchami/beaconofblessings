import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { navLinks, siteConfig } from "@/data/site";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="font-heading text-lg font-bold sm:text-xl"
            style={{ color: "var(--bob-purple-700)" }}
          >
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/donate"
            className="hidden h-9 items-center justify-center rounded-lg px-5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 md:inline-flex"
            style={{
              background:
                "linear-gradient(135deg, var(--bob-purple-600), var(--bob-purple-800))",
            }}
          >
            Donate Now
          </Link>

          {/* Mobile menu trigger */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
