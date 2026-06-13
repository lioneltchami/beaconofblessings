/**
 * The blog [slug] page (`src/app/blog/[slug]/page.tsx`) is an async Server
 * Component that receives `params` as a Promise. Rendering async Server
 * Components in jsdom is not supported by React Testing Library in this
 * testing setup — awaiting the component at top level would require a full
 * async render pipeline that jsdom does not provide.
 *
 * Instead, this test suite covers the data layer that the page depends on,
 * which provides meaningful regression protection for the core behaviour:
 * post lookup, slug routing, and 404 handling.
 */
import { describe, expect, it } from "vitest";
import {
	blogPosts,
	getBlogPost,
	getBlogPosts,
	getRecentPosts,
} from "@/data/blog-posts";

describe("blog data layer (used by /blog/[slug] page)", () => {
	it("contains exactly 3 blog posts", () => {
		expect(blogPosts).toHaveLength(3);
	});

	it("getBlogPost returns the correct post by slug", () => {
		const post = getBlogPost("transforming-lives-through-education");
		expect(post).toBeDefined();
		expect(post?.title).toBe("Transforming Lives Through Education");
		expect(post?.author).toBe("Beacon of Blessings Team");
		expect(post?.category).toBe("Impact Stories");
	});

	it("getBlogPost returns the 'Together We Build Hope' post", () => {
		const post = getBlogPost("together-we-build-hope");
		expect(post).toBeDefined();
		expect(post?.title).toBe("Together We Build Hope");
		expect(post?.author).toBe("Lionel Tchami");
	});

	it("getBlogPost returns the year-end report post", () => {
		const post = getBlogPost("2024-year-end-report");
		expect(post).toBeDefined();
		expect(post?.title).toBe("2024 Year-End Report: A Year of Beginnings");
	});

	it("getBlogPost returns undefined for an unknown slug", () => {
		const post = getBlogPost("non-existent-slug");
		expect(post).toBeUndefined();
	});

	it("getBlogPosts returns posts sorted newest first", () => {
		const posts = getBlogPosts();
		for (let i = 0; i < posts.length - 1; i++) {
			expect(new Date(posts[i].date).getTime()).toBeGreaterThanOrEqual(
				new Date(posts[i + 1].date).getTime(),
			);
		}
	});

	it("each post has the required fields: slug, title, excerpt, content, author, date, category, readTime, tags", () => {
		for (const post of blogPosts) {
			expect(post.slug).toBeTruthy();
			expect(post.title).toBeTruthy();
			expect(post.excerpt).toBeTruthy();
			expect(post.content).toBeTruthy();
			expect(post.author).toBeTruthy();
			expect(post.date).toBeTruthy();
			expect(post.category).toBeTruthy();
			expect(post.readTime).toBeTruthy();
			expect(Array.isArray(post.tags)).toBe(true);
		}
	});

	it("getRecentPosts returns at most the requested number of posts", () => {
		expect(getRecentPosts(2)).toHaveLength(2);
		expect(getRecentPosts(3)).toHaveLength(3);
	});

	it("post content for 'transforming-lives-through-education' contains multiple paragraphs", () => {
		const post = getBlogPost("transforming-lives-through-education");
		const paragraphs = post!.content.split("\n\n");
		expect(paragraphs.length).toBeGreaterThan(1);
	});

	it("all post slugs are unique", () => {
		const slugs = blogPosts.map((p) => p.slug);
		const uniqueSlugs = new Set(slugs);
		expect(uniqueSlugs.size).toBe(slugs.length);
	});
});
