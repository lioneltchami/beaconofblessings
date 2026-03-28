import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GalleryGrid } from "@/components/gallery-grid";
import { albumCategories, albums } from "@/data/albums";

describe("GalleryGrid", () => {
  it("renders all category filter buttons", () => {
    render(<GalleryGrid albums={albums} />);
    for (const cat of albumCategories) {
      expect(
        screen.getByRole("button", { name: cat.label }),
      ).toBeInTheDocument();
    }
  });

  it("renders all album titles on initial load", () => {
    render(<GalleryGrid albums={albums} />);
    for (const album of albums) {
      expect(screen.getByText(album.title)).toBeInTheDocument();
    }
  });

  it("renders album photo counts", () => {
    render(<GalleryGrid albums={albums} />);
    // Some albums may share the same photo count, so use getAllByText
    const uniqueCounts = [...new Set(albums.map((a) => a.photoCount))];
    for (const count of uniqueCounts) {
      expect(screen.getAllByText(`${count} photos`).length).toBeGreaterThan(0);
    }
  });

  it("filters albums when a category button is clicked", () => {
    render(<GalleryGrid albums={albums} />);
    const educationAlbums = albums.filter((a) => a.category === "Education");
    const nonEducationAlbums = albums.filter((a) => a.category !== "Education");

    fireEvent.click(screen.getByRole("button", { name: "Education" }));

    for (const album of educationAlbums) {
      expect(screen.getByText(album.title)).toBeInTheDocument();
    }
    for (const album of nonEducationAlbums) {
      expect(screen.queryByText(album.title)).not.toBeInTheDocument();
    }
  });

  it("clicking All shows all albums again after filtering", () => {
    render(<GalleryGrid albums={albums} />);
    fireEvent.click(screen.getByRole("button", { name: "Education" }));
    fireEvent.click(screen.getByRole("button", { name: "All" }));

    for (const album of albums) {
      expect(screen.getByText(album.title)).toBeInTheDocument();
    }
  });

  it("marks the active filter button with aria-pressed=true", () => {
    render(<GalleryGrid albums={albums} />);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: "Community" }));
    expect(screen.getByRole("button", { name: "Community" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});
