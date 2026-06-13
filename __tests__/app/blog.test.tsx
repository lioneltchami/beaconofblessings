import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BlogPage from "@/app/blog/page";
// Static data import for mock return value
import {
	getBlogPosts,
	getBlogPosts as staticGetBlogPosts,
} from "@/data/blog-posts";

vi.mock("@/lib/sanity/queries", () => ({
	getBlogPosts: vi.fn(() => Promise.resolve(staticGetBlogPosts())),
}));

describe("BlogPage", () => {
	it("renders the page h1 heading", async () => {
		const result = await BlogPage();
		render(result);
		expect(
			screen.getByRole("heading", { level: 1, name: /our blog/i }),
		).toBeInTheDocument();
	});

	it("renders all 3 blog post titles", async () => {
		const result = await BlogPage();
		render(result);
		const posts = getBlogPosts();
		expect(posts).toHaveLength(3);
		for (const post of posts) {
			expect(screen.getByText(post.title)).toBeInTheDocument();
		}
	});

	it("renders links to individual blog posts", async () => {
		const result = await BlogPage();
		render(result);
		const posts = getBlogPosts();
		for (const post of posts) {
			const link = screen.getByRole("link", {
				name: new RegExp(post.title, "i"),
			});
			expect(link).toHaveAttribute("href", `/blog/${post.slug}`);
		}
	});

	it("renders blog post excerpts", async () => {
		const result = await BlogPage();
		render(result);
		const posts = getBlogPosts();
		for (const post of posts) {
			// excerpts are rendered in CardDescription; check at least part of each
			expect(screen.getByText(post.excerpt)).toBeInTheDocument();
		}
	});

	it("renders blog post categories", async () => {
		const result = await BlogPage();
		render(result);
		// Each post's category should appear at least once
		expect(screen.getByText("Impact Stories")).toBeInTheDocument();
		expect(screen.getByText("Ministry Updates")).toBeInTheDocument();
		expect(screen.getByText("Annual Reports")).toBeInTheDocument();
	});

	it("renders Read More text for each post", async () => {
		const result = await BlogPage();
		render(result);
		const readMoreLinks = screen.getAllByText(/read more/i);
		expect(readMoreLinks.length).toBeGreaterThanOrEqual(3);
	});
});
