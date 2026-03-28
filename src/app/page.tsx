import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--bob-purple-100)" }}
        >
          <Heart
            className="h-8 w-8"
            style={{ color: "var(--bob-purple-600)" }}
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Beacon of Blessings
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Illuminating futures through education in Nigeria.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg">Donate Now</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          Site rebuild in progress. Phase 1: Foundation complete.
        </p>
      </div>
    </main>
  );
}
