import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GalleryPage from "@/app/gallery/page";
import { albums } from "@/data/albums";
import { galleryPageContent } from "@/data/pages";

vi.mock("@/lib/sanity/queries", () => ({
	getAlbums: vi.fn(() => Promise.resolve([...albums])),
	getGalleryPage: vi.fn(() => Promise.resolve(galleryPageContent)),
}));

describe("GalleryPage", () => {
	it("renders Gallery heading", async () => {
		const result = await GalleryPage();
		render(result);
		expect(
			screen.getByRole("heading", { level: 1, name: /gallery/i }),
		).toBeInTheDocument();
	});

	it("renders the album filter buttons", async () => {
		const result = await GalleryPage();
		render(result);
		expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
	});

	it("renders all album titles", async () => {
		const result = await GalleryPage();
		render(result);
		for (const album of albums) {
			expect(screen.getByText(album.title)).toBeInTheDocument();
		}
	});
});
