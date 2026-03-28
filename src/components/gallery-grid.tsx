"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  galleryCategories,
  galleryItems,
  type GalleryCategory,
} from "@/data/gallery";
import { cn } from "@/lib/utils";

const categoryGradients: Record<Exclude<GalleryCategory, "all">, string> = {
  education:
    "linear-gradient(135deg, var(--bob-purple-600) 0%, var(--bob-purple-800) 100%)",
  community:
    "linear-gradient(135deg, var(--bob-purple-700) 0%, var(--bob-gold-600) 100%)",
  events:
    "linear-gradient(135deg, var(--bob-gold-500) 0%, var(--bob-gold-700) 100%)",
  team: "linear-gradient(135deg, var(--bob-purple-500) 0%, var(--bob-purple-700) 100%)",
  impact:
    "linear-gradient(135deg, var(--bob-gold-400) 0%, var(--bob-purple-600) 100%)",
};

export function GalleryGrid() {
  const [selected, setSelected] = useState<GalleryCategory>("all");

  const filtered =
    selected === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selected);

  return (
    <div>
      {/* Category filter */}
      <div
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter gallery by category"
      >
        {galleryCategories.map((cat) => {
          const isActive = selected === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelected(cat.value)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                isActive
                  ? "text-white shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              )}
              style={
                isActive
                  ? { backgroundColor: "var(--bob-purple-600)" }
                  : undefined
              }
              aria-pressed={isActive}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Card
            key={item.id}
            className="flex flex-col transition-opacity duration-300"
          >
            {/* Placeholder image area */}
            <div
              className="flex aspect-[4/3] items-center justify-center rounded-t-xl"
              style={{ background: categoryGradients[item.category] }}
              aria-hidden="true"
            >
              <Camera className="h-10 w-10 text-white/40" />
            </div>

            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: "var(--bob-purple-100)",
                    color: "var(--bob-purple-700)",
                  }}
                >
                  {
                    galleryCategories.find((c) => c.value === item.category)
                      ?.label
                  }
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.date}
                </span>
              </div>
              <CardTitle className="text-base">{item.title}</CardTitle>
            </CardHeader>

            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            No gallery items in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
