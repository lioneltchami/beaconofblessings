import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GalleryGrid } from "@/components/gallery-grid";
import { galleryCategories, galleryItems } from "@/data/gallery";

describe("GalleryGrid", () => {
  it("renders all category filter buttons", () => {
    render(<GalleryGrid items={galleryItems} />);
    for (const cat of galleryCategories) {
      expect(
        screen.getByRole("button", { name: cat.label }),
      ).toBeInTheDocument();
    }
  });

  it("renders all gallery items by title on initial load", () => {
    render(<GalleryGrid items={galleryItems} />);
    for (const item of galleryItems) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
  });

  it("filters items when a category button is clicked", () => {
    render(<GalleryGrid items={galleryItems} />);

    // Click "Education" filter
    fireEvent.click(screen.getByRole("button", { name: "Education" }));

    const educationItems = galleryItems.filter(
      (item) => item.category === "education",
    );
    const nonEducationItems = galleryItems.filter(
      (item) => item.category !== "education",
    );

    for (const item of educationItems) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
    for (const item of nonEducationItems) {
      expect(screen.queryByText(item.title)).not.toBeInTheDocument();
    }
  });

  it("clicking All shows all items again after filtering", () => {
    render(<GalleryGrid items={galleryItems} />);

    // First narrow down to a single category
    fireEvent.click(screen.getByRole("button", { name: "Our Team" }));

    // Then reset to All
    fireEvent.click(screen.getByRole("button", { name: "All" }));

    for (const item of galleryItems) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
  });

  it("marks the active filter button with aria-pressed=true", () => {
    render(<GalleryGrid items={galleryItems} />);

    // Initially "All" is active
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: "Events" }));

    expect(screen.getByRole("button", { name: "Events" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});
