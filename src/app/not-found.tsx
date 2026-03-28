import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FFFDF7] px-6 py-24 text-center">
      {/* Fun branded 404 with teal and marigold */}
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#0F766E] to-[#14B8A6]">
        <span className="font-heading text-4xl font-bold text-[#FDE047]">
          404
        </span>
      </div>

      <h1 className="font-heading text-3xl font-bold tracking-tight text-[#134E4A] sm:text-4xl">
        Page Not Found
      </h1>

      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        But there is still plenty of good to discover.
      </p>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "gap-2 bg-primary font-semibold text-white hover:bg-[#134E4A]",
          )}
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "gap-2 text-primary",
          )}
        >
          Contact Us
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
