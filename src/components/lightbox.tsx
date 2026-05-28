"use client";

import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { AlbumPhoto } from "@/data/albums";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  Education: "from-[#2F7D5A] to-[#256B4B]",
  Community: "from-[#2F7D5A] to-[#E8A825]",
  Team: "from-[#4FA778] to-[#2F7D5A]",
  Impact: "from-[#2D3A6E] to-[#E8A825]",
};

interface LightboxProps {
  photos: AlbumPhoto[];
  initialIndex: number;
  onClose: () => void;
  albumTitle: string;
  albumCategory?: string;
}

export function Lightbox({
  photos,
  initialIndex,
  onClose,
  albumTitle,
  albumCategory = "Education",
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const photo = photos[currentIndex];
  const gradient = categoryColors[albumCategory] || categoryColors.Education;

  const goNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      setDirection("right");
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, photos.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection("left");
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goNext, goPrev]);

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Reset direction after transition
  useEffect(() => {
    if (direction) {
      const t = setTimeout(() => setDirection(null), 300);
      return () => clearTimeout(t);
    }
  }, [direction, currentIndex]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer: ${albumTitle}`}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Photo counter */}
      <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Previous button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        disabled={currentIndex === 0}
        className={cn(
          "absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20",
          currentIndex === 0 && "cursor-not-allowed opacity-30",
        )}
        aria-label="Previous photo"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        disabled={currentIndex === photos.length - 1}
        className={cn(
          "absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20",
          currentIndex === photos.length - 1 && "cursor-not-allowed opacity-30",
        )}
        aria-label="Next photo"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Photo placeholder card */}
      <div
        className="mx-auto w-full max-w-2xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            "overflow-hidden rounded-2xl transition-all duration-300",
            direction === "right" && "animate-slide-left",
            direction === "left" && "animate-slide-right",
          )}
        >
          <div
            className={cn(
              "flex aspect-[4/3] flex-col items-center justify-center bg-gradient-to-br",
              gradient,
            )}
          >
            <Camera className="mb-4 h-16 w-16 text-white/30" />
            <p className="px-8 text-center text-lg font-medium text-white">
              {photo.title}
            </p>
            {photo.description && (
              <p className="mt-2 px-8 text-center text-sm text-white/70">
                {photo.description}
              </p>
            )}
          </div>
          <div className="bg-[#21352B] px-6 py-4">
            <p className="text-sm text-[#FAF6F1]/60">{albumTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
