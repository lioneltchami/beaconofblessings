import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogPage from "@/app/blog/page";
import { getBlogPosts } from "@/data/blog-posts";

describe("BlogPage", () => {
  it("renders the page h1 heading", () => {
    render(<BlogPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /our blog/i }),
    ).toBeInTheDocument();
  });

  it("renders all 3 blog post titles", () => {
    render(<BlogPage />);
    const posts = getBlogPosts();
    expect(posts).toHaveLength(3);
    for (const post of posts) {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    }
  });

  it("renders links to individual blog posts", () => {
    render(<BlogPage />);
    const posts = getBlogPosts();
    for (const post of posts) {
      const link = screen.getByRole("link", {
        name: new RegExp(post.title, "i"),
      });
      expect(link).toHaveAttribute("href", `/blog/${post.slug}`);
    }
  });

  it("renders blog post excerpts", () => {
    render(<BlogPage />);
    const posts = getBlogPosts();
    for (const post of posts) {
      // excerpts are rendered in CardDescription; check at least part of each
      expect(screen.getByText(post.excerpt)).toBeInTheDocument();
    }
  });

  it("renders blog post categories", () => {
    render(<BlogPage />);
    // Each post's category should appear at least once
    expect(screen.getByText("Impact Stories")).toBeInTheDocument();
    expect(screen.getByText("Ministry Updates")).toBeInTheDocument();
    expect(screen.getByText("Annual Reports")).toBeInTheDocument();
  });

  it("renders Read More text for each post", () => {
    render(<BlogPage />);
    const readMoreLinks = screen.getAllByText(/read more/i);
    expect(readMoreLinks.length).toBeGreaterThanOrEqual(3);
  });
});
