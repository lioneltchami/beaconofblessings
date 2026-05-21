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

      <SheetContent side="right" className="w-72 bg-[#FAF6F1]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <span className="font-heading text-lg font-bold text-[#8B3A24]">
              {siteConfig.name}
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
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#C05A3C] transition-colors hover:bg-[#C05A3C]/10"
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
                  className="inline-flex h-9 w-full items-center justify-center rounded-full bg-[#E8A825] px-4 text-sm font-semibold text-gray-900 transition-all hover:bg-[#F5D060] hover:shadow-[0_0_12px_rgba(234,179,8,0.4)]"
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
