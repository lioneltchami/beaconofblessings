import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
        style={{ backgroundColor: "var(--bob-purple-100)" }}
      >
        <span
          className="text-4xl font-bold"
          style={{ color: "var(--bob-purple-600)" }}
        >
          404
        </span>
      </div>

      <h1
        className="text-3xl font-bold tracking-tight sm:text-4xl"
        style={{ color: "var(--bob-purple-900)" }}
      >
        Page Not Found
      </h1>

      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "gap-2 font-semibold text-white",
          )}
          style={{ backgroundColor: "var(--bob-purple-600)" }}
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "gap-2",
          )}
          style={{ color: "var(--bob-purple-600)" }}
        >
          Contact Us
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
