import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GalleryPage from "@/app/gallery/page";

describe("GalleryPage", () => {
  it("renders Gallery heading", () => {
    render(<GalleryPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /gallery/i }),
    ).toBeInTheDocument();
  });

  it("renders the gallery grid filter buttons", () => {
    render(<GalleryPage />);
    // The GalleryGrid renders category filter buttons; "All" is always present
    expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
  });
});
