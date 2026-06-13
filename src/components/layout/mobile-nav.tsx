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
import type { LinkItem } from "@/lib/sanity/types";

export function MobileNav({
  navLinks,
  siteName,
}: {
  navLinks: LinkItem[];
  siteName: string;
}) {
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

      <SheetContent side="right" className="w-72 bg-background">
        <SheetHeader>
          <SheetTitle className="text-left">
            <span className="font-heading text-lg font-bold text-[#256B4B]">
              {siteName}
            </span>
            <span className="mt-1 block text-xs font-medium text-[#C05A3C]">
              Education charity in Nigeria
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
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#256B4B] transition-colors hover:bg-[#2F7D5A]/10"
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
                  className="inline-flex h-9 w-full items-center justify-center rounded-full bg-[#E8A825] px-4 text-sm font-semibold text-[#1F352A] transition-all hover:bg-[#F5D060] hover:shadow-[0_0_12px_rgba(232,168,37,0.4)]"
                />
              }
            >
              Give Today
            </SheetClose>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
