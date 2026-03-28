import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GalleryPage from "@/app/gallery/page";
import { albums } from "@/data/albums";

describe("GalleryPage", () => {
	it("renders Gallery heading", () => {
		render(<GalleryPage />);
		expect(
			screen.getByRole("heading", { level: 1, name: /gallery/i }),
		).toBeInTheDocument();
	});

	it("renders the album filter buttons", () => {
		render(<GalleryPage />);
		expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
	});

	it("renders all album titles", () => {
		render(<GalleryPage />);
		for (const album of albums) {
			expect(screen.getByText(album.title)).toBeInTheDocument();
		}
	});
});
