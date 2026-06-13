import { describe, expect, it } from "vitest";
import {
  ALBUM_PROJECTION,
  BLOG_POST_PROJECTION,
  PROJECT_PROJECTION,
  RESOURCE_PROJECTION,
} from "@/lib/sanity/queries";

describe("Sanity query projections", () => {
  it("projects blog and project slugs as plain strings", () => {
    expect(BLOG_POST_PROJECTION).toContain('"slug": slug.current');
    expect(PROJECT_PROJECTION).toContain('"slug": slug.current');
    expect(PROJECT_PROJECTION).toContain("archiveAfterDate");
    expect(PROJECT_PROJECTION).toContain("archiveRecord->");
  });

  it("projects album photos and cover images with usable asset URLs", () => {
    expect(ALBUM_PROJECTION).toContain("photos[]");
    expect(ALBUM_PROJECTION).toContain("coverImage");
    expect(ALBUM_PROJECTION).toContain("asset->{ _id, url }");
  });

  it("projects resource downloads from uploaded Sanity files or external URLs", () => {
    expect(RESOURCE_PROJECTION).toContain(
      '"fileUrl": coalesce(fileUrl, file.asset->url)',
    );
    expect(RESOURCE_PROJECTION).toContain("file{ asset->{ url } }");
  });
});
