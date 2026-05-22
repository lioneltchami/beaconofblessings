import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "@/app/page";
import { programs } from "@/data/programs";
import { impactStats, impactStats as staticImpactStats } from "@/data/site";

vi.mock("@/lib/sanity/queries", () => ({
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
      screen.getByText(/simple mission\. visible follow-up/i),
    ).toBeInTheDocument();
  });

  it("keeps the homepage lightweight instead of duplicating deeper pages", async () => {
    const result = await HomePage();
    render(result);
    expect(document.body).toHaveTextContent(/specific gifts\. specific help/i);
    expect(document.body).not.toHaveTextContent(/founder and leadership preview/i);
    expect(document.body).not.toHaveTextContent(/2026 impact goals/i);
    expect(document.body).not.toHaveTextContent(/story arc/i);
    expect(document.body).not.toHaveTextContent(/donor proof standards/i);
    expect(document.body).not.toHaveTextContent(/evidence-based donor trust/i);
    expect(document.body).not.toHaveTextContent(/completed work should lead/i);
  });

  it("renders program titles without the old project archive", async () => {
    const result = await HomePage();
    render(result);
    for (const program of programs) {
      expect(screen.getByText(program.title)).toBeInTheDocument();
    }
  });

  it("links each program card to its detail page", async () => {
    const result = await HomePage();
    render(result);
    for (const program of programs) {
      const link = screen.getByRole("link", { name: program.ctaLabel });
      expect(link).toHaveAttribute("href", `/programs/${program.slug}`);
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

  it("renders View Programs link", async () => {
    const result = await HomePage();
    render(result);
    const viewAll = screen.getByRole("link", { name: /view programs/i });
    expect(viewAll).toBeInTheDocument();
    expect(viewAll).toHaveAttribute("href", "/programs");
  });
});
