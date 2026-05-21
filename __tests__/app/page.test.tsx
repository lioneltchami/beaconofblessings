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
        name: /help children stay in school/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the site description text", async () => {
    const result = await HomePage();
    render(result);
    // siteConfig.description is rendered in a <p> below the hero tagline
    expect(
      screen.getByText(
        /turns faith into practical education support/i,
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
      screen.getByText(/trust is designed into the journey/i),
    ).toBeInTheDocument();
  });

  it("frames the homepage mission as a movement, not a one-time campaign", async () => {
    const result = await HomePage();
    render(result);
    expect(document.body).toHaveTextContent(
      /movement to keep nigerian children learning/i,
    );
  });

  it("shows donor proof points before asking for a gift", async () => {
    const result = await HomePage();
    render(result);
    expect(document.body).toHaveTextContent(/donor proof/i);
    expect(document.body).toHaveTextContent(/receipts/i);
    expect(document.body).toHaveTextContent(/field photos/i);
    expect(document.body).toHaveTextContent(/public impact updates/i);
  });

  it("keeps the homepage as a gateway rather than duplicating about-page depth", async () => {
    const result = await HomePage();
    render(result);
    expect(document.body).not.toHaveTextContent(/founder and leadership preview/i);
    expect(document.body).not.toHaveTextContent(/2026 impact goals/i);
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
    const giveLinks = screen.getAllByRole("link", { name: /give today/i });
    expect(giveLinks.length).toBeGreaterThan(0);
    for (const link of giveLinks) {
      expect(link).toHaveAttribute("href", "/donate");
    }
  });

  it("renders See the Impact link pointing to /impact", async () => {
    const result = await HomePage();
    render(result);
    const impact = screen.getByRole("link", { name: /see the impact/i });
    expect(impact).toBeInTheDocument();
    expect(impact).toHaveAttribute("href", "/impact");
  });

  it("renders transparency link", async () => {
    const result = await HomePage();
    render(result);
    const transparency = screen.getByRole("link", {
      name: /review transparency commitments/i,
    });
    expect(transparency).toHaveAttribute("href", "/transparency");
  });

  it("renders Partner With Us link pointing to /contact", async () => {
    const result = await HomePage();
    render(result);
    const partner = screen.getByRole("link", { name: /partner with us/i });
    expect(partner).toBeInTheDocument();
    expect(partner).toHaveAttribute("href", "/contact");
  });

  it("renders Explore All Programs link", async () => {
    const result = await HomePage();
    render(result);
    const viewAll = screen.getByRole("link", { name: /explore all programs/i });
    expect(viewAll).toBeInTheDocument();
    expect(viewAll).toHaveAttribute("href", "/programs");
  });
});
