import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "@/app/page";
// Static data imports for mock return values
import {
  getFeaturedProjects,
  getFeaturedProjects as staticGetFeatured,
} from "@/data/projects";
import { impactStats, impactStats as staticImpactStats } from "@/data/site";

vi.mock("@/lib/sanity/queries", () => ({
  getFeaturedProjects: vi.fn(() => Promise.resolve(staticGetFeatured())),
  getImpactStats: vi.fn(() => Promise.resolve([...staticImpactStats])),
}));

describe("HomePage", () => {
  it("renders the hero h1 heading", async () => {
    const result = await HomePage();
    render(result);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /illuminating futures through education/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the site description text", async () => {
    const result = await HomePage();
    render(result);
    // siteConfig.description is rendered in a <p> below the hero tagline
    expect(
      screen.getByText(
        /beacon of blessings charity initiative transforms lives/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders all four impact stats", async () => {
    const result = await HomePage();
    render(result);
    for (const stat of impactStats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });

  it("renders the mission section heading", async () => {
    const result = await HomePage();
    render(result);
    expect(
      screen.getByText(
        /sharing the love of christ through compassionate service/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders featured project titles", async () => {
    const result = await HomePage();
    render(result);
    const featured = getFeaturedProjects();
    for (const project of featured) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    }
  });

  it("renders Give Now CTA links pointing to /donate", async () => {
    const result = await HomePage();
    render(result);
    // Two "Give Now" links exist (hero + CTA section); all must point to /donate
    const giveNowLinks = screen.getAllByRole("link", { name: /give now/i });
    expect(giveNowLinks.length).toBeGreaterThan(0);
    for (const link of giveNowLinks) {
      expect(link).toHaveAttribute("href", "/donate");
    }
  });

  it("renders Our Story link pointing to /about", async () => {
    const result = await HomePage();
    render(result);
    const ourStory = screen.getByRole("link", { name: /our story/i });
    expect(ourStory).toBeInTheDocument();
    expect(ourStory).toHaveAttribute("href", "/about");
  });

  it("renders Learn More link in mission section pointing to /about", async () => {
    const result = await HomePage();
    render(result);
    // Multiple "Learn More" links exist (mission + project cards); at least one points to /about
    const learnMoreLinks = screen.getAllByRole("link", { name: /learn more/i });
    expect(learnMoreLinks.length).toBeGreaterThan(0);
    const hasAboutLink = learnMoreLinks.some(
      (l) => l.getAttribute("href") === "/about",
    );
    expect(hasAboutLink).toBe(true);
  });

  it("renders Volunteer link pointing to /contact", async () => {
    const result = await HomePage();
    render(result);
    const volunteer = screen.getByRole("link", { name: /^volunteer$/i });
    expect(volunteer).toBeInTheDocument();
    expect(volunteer).toHaveAttribute("href", "/contact");
  });

  it("renders View All Projects link", async () => {
    const result = await HomePage();
    render(result);
    const viewAll = screen.getByRole("link", { name: /view all projects/i });
    expect(viewAll).toBeInTheDocument();
    expect(viewAll).toHaveAttribute("href", "/projects");
  });
});
