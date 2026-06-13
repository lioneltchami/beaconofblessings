import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AlbumPhotoGrid } from "@/components/album-photo-grid";

describe("AlbumPhotoGrid", () => {
  it("renders real photo images when Sanity media is present", () => {
    render(
      <AlbumPhotoGrid
        albumTitle="School Supplies Drive"
        albumCategory="Education"
        photos={[
          {
            id: "photo-1",
            title: "Students receiving school bags",
            image: {
              _type: "image",
              alt: "Students receiving school bags outside a classroom",
              asset: {
                url: "https://cdn.sanity.io/images/project/production/photo.jpg",
              },
            },
          },
        ]}
      />,
    );

    const image = screen.getByRole("img", {
      name: "Students receiving school bags outside a classroom",
    });
    expect(image.getAttribute("src")).toContain(
      encodeURIComponent(
        "https://cdn.sanity.io/images/project/production/photo.jpg",
      ),
    );
  });

  it("falls back to the branded placeholder when no image is present", () => {
    render(
      <AlbumPhotoGrid
        albumTitle="School Supplies Drive"
        albumCategory="Education"
        photos={[{ id: "photo-1", title: "Notebook distribution" }]}
      />,
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "View photo: Notebook distribution" }),
    ).toBeInTheDocument();
  });
});
