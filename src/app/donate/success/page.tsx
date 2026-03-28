import { ArrowRight, Heart, Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Thank You",
  description: `Thank you for your generous donation to ${siteConfig.name}.`,
};

export default async function DonateSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  return (
    <section className="bg-[#FAF6F1] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-lg text-center">
        {/* Success icon -- teal gradient */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#C05A3C] to-[#D4795F]">
          <Heart className="h-10 w-10 text-white" fill="white" />
        </div>

        <h1 className="font-heading text-3xl font-bold tracking-tight text-[#8B3A24] sm:text-4xl">
          Thank You for Your Generosity!
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Your donation is being processed and will make a real difference in
          the lives of students in Nigeria.
        </p>

        <Card className="mt-8 border-t-4 border-primary">
          <CardContent className="space-y-3 pt-2">
            <div className="rounded-lg bg-[#FDF2EE] p-4">
              <p className="text-sm font-medium text-primary">
                A confirmation email will be sent to you shortly with the
                details of your donation.
              </p>
            </div>

            {session_id && (
              <p className="text-xs text-muted-foreground">
                Reference: {session_id.slice(0, 20)}...
              </p>
            )}

            <div className="border-l-4 border-[#E8A825] pl-4 text-left">
              <blockquote className="text-sm italic text-muted-foreground">
                &ldquo;Each of you should give what you have decided in your
                heart to give, not reluctantly or under compulsion, for God
                loves a cheerful giver.&rdquo;
                <cite className="mt-1 block text-xs font-medium not-italic text-[#B8861E]">
                  &mdash; 2 Corinthians 9:7
                </cite>
              </blockquote>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 bg-primary px-6 font-semibold text-white hover:bg-[#8B3A24]",
            )}
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 px-6",
            )}
          >
            See Our Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
