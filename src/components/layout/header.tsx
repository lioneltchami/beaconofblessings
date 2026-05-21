import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { navLinks, siteConfig } from "@/data/site";

export function Header() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-[#C05A3C]/10 bg-[#FAF6F1]/95 backdrop-blur-sm supports-backdrop-filter:bg-[#FAF6F1]/80">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link href="/" className="flex min-w-0 items-center gap-3">
					<span
						aria-hidden="true"
						className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C05A3C] font-heading text-base text-white shadow-sm"
					>
						BB
					</span>
					<span className="min-w-0">
						<span className="block truncate font-heading text-lg font-bold leading-5 text-[#8B3A24] sm:text-xl">
							{siteConfig.name}
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
							className="rounded-lg px-3 py-2 text-sm font-medium text-[#6B2A18]/75 transition-colors hover:bg-[#C05A3C]/5 hover:text-[#C05A3C]"
						>
							{link.label}
						</Link>
					))}
				</nav>

				{/* Actions */}
				<div className="flex items-center gap-3">
					<Link
						href="/donate"
						className="hidden h-9 items-center justify-center rounded-full bg-[#E8A825] px-5 text-sm font-semibold text-[#2C1810] shadow-sm transition-all hover:bg-[#F5D060] hover:shadow-[0_0_12px_rgba(234,179,8,0.4)] md:inline-flex"
					>
						Give Today
					</Link>

					{/* Mobile menu trigger */}
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
