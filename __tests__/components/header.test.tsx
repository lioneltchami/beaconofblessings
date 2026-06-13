import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Header } from "@/components/layout/header";
import { navLinks, siteConfig } from "@/data/site";

vi.mock("@/lib/sanity/queries", () => ({
  getSiteSettings: vi.fn(() =>
    Promise.resolve({
      _id: "static-site-config",
      _type: "siteConfig",
      ...siteConfig,
      logoInitials: "BB",
      navLinks,
      footerTrustLinks: [],
      socialLinks: [],
    }),
  ),
}));

describe("Header", () => {
  it("renders the logo text with the organization name", async () => {
    render(await Header());
    // The logo link contains the site name
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument();
  });

  it("renders the logo as a link pointing to /", async () => {
    render(await Header());
    const logoLink = screen.getByRole("link", {
      name: new RegExp(siteConfig.name, "i"),
    });
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders main navigation with all nav links", async () => {
    render(await Header());
    const nav = screen.getByRole("navigation", { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
    for (const link of navLinks) {
      expect(
        screen.getAllByRole("link", { name: link.label }).length,
      ).toBeGreaterThan(0);
    }
  });

  it("includes the partner page in top-level navigation", async () => {
    render(await Header());
    expect(screen.getByRole("link", { name: /partners/i })).toHaveAttribute(
      "href",
      "/partner-with-us",
    );
  });

  it("includes projects in top-level navigation", async () => {
    render(await Header());
    expect(screen.getByRole("link", { name: /projects/i })).toHaveAttribute(
      "href",
      "/projects",
    );
  });

  it("renders the desktop Give Today link pointing to /donate", async () => {
    render(await Header());
    const donateLinks = screen.getAllByRole("link", { name: /give today/i });
    expect(donateLinks.length).toBeGreaterThan(0);
    // At least one donate link should point to /donate
    const hasCorrectHref = donateLinks.some(
      (l) => l.getAttribute("href") === "/donate",
    );
    expect(hasCorrectHref).toBe(true);
  });

  it("renders the mobile navigation trigger button", async () => {
    render(await Header());
    const menuButton = screen.getByRole("button", {
      name: /open navigation menu/i,
    });
    expect(menuButton).toBeInTheDocument();
  });
});
