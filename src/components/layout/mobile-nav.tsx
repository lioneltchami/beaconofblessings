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

      <SheetContent side="right" className="w-72 bg-[#FFFDF7]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <span className="font-heading text-lg font-bold text-[#0F766E]">
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
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#0F766E] transition-colors hover:bg-[#0F766E]/10"
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
                  className="inline-flex h-9 w-full items-center justify-center rounded-full bg-[#EAB308] px-4 text-sm font-semibold text-gray-900 transition-all hover:bg-[#FDE047] hover:shadow-[0_0_12px_rgba(234,179,8,0.4)]"
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
