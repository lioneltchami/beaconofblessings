"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, siteConfig } from "@/data/site";

export function MobileNav() {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger
				render={
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden"
						aria-label="Open navigation menu"
					/>
				}
			>
				<Menu className="size-5" />
			</SheetTrigger>

			<SheetContent side="right" className="w-72">
				<SheetHeader>
					<SheetTitle className="text-left">
						<span
							className="font-heading text-lg font-bold"
							style={{ color: "var(--bob-purple-700)" }}
						>
							{siteConfig.name}
						</span>
					</SheetTitle>
				</SheetHeader>

				<nav
					aria-label="Mobile navigation"
					className="flex flex-col gap-1 px-4"
				>
					{navLinks.map((link) => (
						<SheetClose
							key={link.href}
							render={
								<Link
									href={link.href}
									className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
								/>
							}
						>
							{link.label}
						</SheetClose>
					))}

					<div className="mt-4">
						<SheetClose
							render={
								<Link
									href="/donate"
									className="inline-flex h-9 w-full items-center justify-center rounded-lg px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
									style={{
										background:
											"linear-gradient(135deg, var(--bob-purple-600), var(--bob-purple-800))",
									}}
								/>
							}
						>
							Donate Now
						</SheetClose>
					</div>
				</nav>
			</SheetContent>
		</Sheet>
	);
}
