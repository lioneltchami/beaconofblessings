"use client";

import { Camera } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "@/components/lightbox";
import type { AlbumPhoto } from "@/data/albums";
import { cn } from "@/lib/utils";

const categoryGradients: Record<string, string> = {
  Education: "linear-gradient(135deg, #C05A3C 0%, #8B3A24 100%)",
  Community: "linear-gradient(135deg, #C05A3C 0%, #E8A825 100%)",
  Team: "linear-gradient(135deg, #D4795F 0%, #C05A3C 100%)",
  Impact: "linear-gradient(135deg, #2D3A6E 0%, #E8A825 100%)",
};

interface AlbumPhotoGridProps {
  photos: AlbumPhoto[];
  albumTitle: string;
  albumCategory: string;
}

export function AlbumPhotoGrid({
  photos,
  albumTitle,
  albumCategory,
}: AlbumPhotoGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const gradient =
    categoryGradients[albumCategory] || categoryGradients.Education;

  return (
    <>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "group overflow-hidden rounded-xl text-left ring-1 ring-foreground/10 transition-all duration-300",
              "hover:scale-[1.02] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#C05A3C]",
            )}
            aria-label={`View photo: ${photo.title}`}
          >
            <div
              className="flex aspect-[4/3] items-center justify-center"
              style={{ background: gradient }}
              aria-hidden="true"
            >
              <Camera className="h-8 w-8 text-white/30 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="bg-card px-3 py-2.5">
              <p className="text-sm font-medium text-card-foreground line-clamp-2">
                {photo.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          photos={photos}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          albumTitle={albumTitle}
          albumCategory={albumCategory}
        />
      )}
    </>
  );
}
