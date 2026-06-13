import { ArrowRight, Mail, RotateCcw } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Donation Cancelled",
  description:
    "Your donation was cancelled. You can try again anytime or contact us for help.",
};

export default function DonateCancelPage() {
  return (
    <section className="bg-[#FAF6F1] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-lg text-center">
        {/* Icon -- terracotta accent for cancelled state */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#2D3A6E]/10">
          <RotateCcw className="h-10 w-10 text-[#2D3A6E]" />
        </div>

        <h1 className="font-heading text-3xl font-bold tracking-tight text-[#256B4B] sm:text-4xl">
          Donation Cancelled
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          No worries — you can try again anytime. Your generosity is appreciated
          whenever you are ready.
        </p>

        <Card className="mt-8 border-t-4 border-[#2D3A6E]">
          <CardContent className="space-y-3 pt-2">
            <div className="rounded-lg bg-[#2D3A6E]/5 p-4">
              <p className="text-sm font-medium text-[#2D3A6E]">
                No charges were made to your account. If you experienced any
                issues, please do not hesitate to reach out.
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Contact us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-primary underline underline-offset-2"
              >
                {siteConfig.email}
              </a>{" "}
              for any questions.
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/donate"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 bg-[#E8A825] px-6 font-semibold text-[#21352B] hover:bg-[#9A6A12] hover:text-white",
            )}
          >
            <ArrowRight className="h-4 w-4" />
            Try Again
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 px-6",
            )}
          >
            <Mail className="h-4 w-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
