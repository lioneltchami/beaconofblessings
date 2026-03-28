import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Loader2
        className="h-8 w-8 animate-spin"
        style={{ color: "var(--bob-purple-600)" }}
      />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  );
}
