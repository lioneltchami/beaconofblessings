import { describe, expect, it } from "vitest";
import {
	type GalleryCategory,
	galleryCategories,
	galleryItems,
} from "@/data/gallery";

describe("gallery data", () => {
	it("galleryItems array has the expected length", () => {
		expect(galleryItems).toHaveLength(12);
	});

	it("each item has required fields: id, title, description, category, date", () => {
		for (const item of galleryItems) {
			expect(item.id).toBeTruthy();
			expect(item.title).toBeTruthy();
			expect(item.description).toBeTruthy();
			expect(item.category).toBeTruthy();
			expect(item.date).toBeTruthy();
		}
	});

	it("each item id is unique", () => {
		const ids = galleryItems.map((item) => item.id);
		const unique = new Set(ids);
		expect(unique.size).toBe(ids.length);
	});

	it("each item category is a valid non-all GalleryCategory", () => {
		const validCategories: Exclude<GalleryCategory, "all">[] = [
			"education",
			"community",
			"events",
			"team",
			"impact",
		];
		for (const item of galleryItems) {
			expect(validCategories).toContain(item.category);
		}
	});

	it("galleryCategories covers all expected category values", () => {
		const expectedValues: GalleryCategory[] = [
			"all",
			"education",
			"community",
			"events",
			"team",
			"impact",
		];
		const actualValues = galleryCategories.map((cat) => cat.value);
		for (const expected of expectedValues) {
			expect(actualValues).toContain(expected);
		}
	});

	it("galleryCategories includes an All entry with correct label", () => {
		const allEntry = galleryCategories.find((cat) => cat.value === "all");
		expect(allEntry).toBeDefined();
		expect(allEntry?.label).toBe("All");
	});

	it("gallery items span all non-all categories", () => {
		const categoriesInItems = new Set(
			galleryItems.map((item) => item.category),
		);
		const expectedCategories: Exclude<GalleryCategory, "all">[] = [
			"education",
			"community",
			"events",
			"team",
			"impact",
		];
		for (const cat of expectedCategories) {
			expect(categoriesInItems).toContain(cat);
		}
	});
});
