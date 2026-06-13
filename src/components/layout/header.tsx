import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { getSiteSettings } from "@/lib/sanity/queries";

export async function Header() {
	const siteSettings = await getSiteSettings();
	const navLinks = siteSettings.navLinks ?? [];

	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-[#2F7D5A]/10 bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/80">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link href="/" className="flex min-w-0 items-center gap-3">
					<span
						aria-hidden="true"
						className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2F7D5A] font-heading text-base text-white shadow-sm"
					>
						{siteSettings.logoInitials ?? "BB"}
					</span>
					<span className="min-w-0">
						<span className="block truncate font-heading text-lg font-bold leading-5 text-[#256B4B] sm:text-xl">
							{siteSettings.name}
						</span>
						<span className="hidden text-[11px] font-semibold uppercase tracking-wider text-[#C05A3C] sm:block">
							Education charity in Nigeria
						</span>
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
							className="rounded-lg px-3 py-2 text-sm font-medium text-[#1F352A]/75 transition-colors hover:bg-[#2F7D5A]/5 hover:text-[#256B4B]"
						>
							{link.label}
						</Link>
					))}
				</nav>

				{/* Actions */}
				<div className="flex items-center gap-3">
					<Link
						href="/donate"
						className="hidden h-9 items-center justify-center rounded-full bg-[#E8A825] px-5 text-sm font-semibold text-[#1F352A] shadow-sm transition-all hover:bg-[#F5D060] hover:shadow-[0_0_12px_rgba(232,168,37,0.4)] md:inline-flex"
					>
						Give Today
					</Link>

					{/* Mobile menu trigger */}
					<MobileNav navLinks={navLinks} siteName={siteSettings.name} />
				</div>
			</div>
		</header>
	);
}
