import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { navLinks, siteConfig } from "@/data/site";

export function Header() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-[#0F766E]/10 bg-[#FFFDF7]/95 backdrop-blur-sm supports-backdrop-filter:bg-[#FFFDF7]/80">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2">
					<span className="font-heading text-lg font-bold text-[#0F766E] sm:text-xl">
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
							className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-[#0F766E] active:underline active:decoration-[#EAB308] active:decoration-2 active:underline-offset-4"
						>
							{link.label}
						</Link>
					))}
				</nav>

				{/* Actions */}
				<div className="flex items-center gap-3">
					<Link
						href="/donate"
						className="hidden h-9 items-center justify-center rounded-full bg-[#EAB308] px-5 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-[#FDE047] hover:shadow-[0_0_12px_rgba(234,179,8,0.4)] md:inline-flex"
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
