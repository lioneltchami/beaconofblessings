import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GalleryPage from "@/app/gallery/page";

// Static data import for mock return value
import { galleryItems as staticGalleryItems } from "@/data/gallery";

vi.mock("@/lib/sanity/queries", () => ({
  getGalleryItems: vi.fn(() => Promise.resolve([...staticGalleryItems])),
}));

describe("GalleryPage", () => {
  it("renders Gallery heading", async () => {
    const result = await GalleryPage();
    render(result);
    expect(
      screen.getByRole("heading", { level: 1, name: /gallery/i }),
    ).toBeInTheDocument();
  });

  it("renders the gallery grid filter buttons", async () => {
    const result = await GalleryPage();
    render(result);
    // The GalleryGrid renders category filter buttons; "All" is always present
    expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
  });
});
