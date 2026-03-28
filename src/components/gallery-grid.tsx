"use client";

import { Camera } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type GalleryCategory,
  type GalleryItem,
  galleryCategories,
} from "@/data/gallery";
import { cn } from "@/lib/utils";

const categoryGradients: Record<Exclude<GalleryCategory, "all">, string> = {
  education: "linear-gradient(135deg, #C05A3C 0%, #8B3A24 100%)",
  community: "linear-gradient(135deg, #C05A3C 0%, #E8A825 100%)",
  events: "linear-gradient(135deg, #E8A825 0%, #B8861E 100%)",
  team: "linear-gradient(135deg, #D4795F 0%, #C05A3C 100%)",
  impact: "linear-gradient(135deg, #2D3A6E 0%, #E8A825 100%)",
};

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [selected, setSelected] = useState<GalleryCategory>("all");

  const filtered =
    selected === "all"
      ? items
      : items.filter((item) => item.category === selected);

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
                  ? "bg-[#C05A3C] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
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
            className="flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
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
                <span className="inline-flex items-center rounded-full bg-[#C05A3C]/10 px-2.5 py-0.5 text-xs font-medium text-[#C05A3C]">
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
