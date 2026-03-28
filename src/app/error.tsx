"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24">
      <div
        className="w-full max-w-md rounded-lg border p-8 text-center shadow-sm"
        style={{ backgroundColor: "var(--bob-purple-50)" }}
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--bob-purple-100)" }}
        >
          <AlertTriangle
            className="h-6 w-6"
            style={{ color: "var(--bob-purple-600)" }}
          />
        </div>

        <h2
          className="text-xl font-bold"
          style={{ color: "var(--bob-purple-900)" }}
        >
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: "var(--bob-purple-600)" }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
