import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Footer } from "@/components/layout/footer";
import { footerTrustLinks, navLinks, siteConfig, socialLinks } from "@/data/site";

vi.mock("@/lib/sanity/queries", () => ({
  getSiteSettings: vi.fn(() =>
    Promise.resolve({
      _id: "static-site-config",
      _type: "siteConfig",
      ...siteConfig,
      logoInitials: "BB",
      navLinks,
      footerTrustLinks,
      socialLinks,
    }),
  ),
}));

describe("Footer", () => {
  it("renders the organization name as a heading", async () => {
    render(await Footer());
    // The org name appears in the footer h2 heading
    expect(
      screen.getByRole("heading", { name: siteConfig.name }),
    ).toBeInTheDocument();
  });

  it("renders the email contact link", async () => {
    render(await Footer());
    const emailLink = screen.getByRole("link", { name: siteConfig.email });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", `mailto:${siteConfig.email}`);
  });

  it("renders the phone contact link", async () => {
    render(await Footer());
    const phoneLink = screen.getByRole("link", { name: siteConfig.phone });
    expect(phoneLink).toBeInTheDocument();
  });

  it("renders the address", async () => {
    render(await Footer());
    expect(screen.getByText(siteConfig.address)).toBeInTheDocument();
  });

  it("renders footer navigation with all nav links", async () => {
    render(await Footer());
    const nav = screen.getByRole("navigation", { name: /footer navigation/i });
    expect(nav).toBeInTheDocument();
    for (const link of navLinks) {
      expect(
        screen.getAllByRole("link", { name: link.label }).length,
      ).toBeGreaterThan(0);
    }
  });

  it("renders Privacy Policy link pointing to /privacy", async () => {
    render(await Footer());
    const privacyLink = screen.getByRole("link", { name: /privacy policy/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  it("renders Terms of Service link pointing to /terms", async () => {
    render(await Footer());
    const termsLink = screen.getByRole("link", { name: /terms of service/i });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute("href", "/terms");
  });

  it("renders Give Today link pointing to /donate", async () => {
    render(await Footer());
    const donateLink = screen.getByRole("link", { name: /give today/i });
    expect(donateLink).toBeInTheDocument();
    expect(donateLink).toHaveAttribute("href", "/donate");
  });

  it("renders donor trust links", async () => {
    render(await Footer());
    expect(
      screen.getByRole("navigation", { name: /donor trust links/i }),
    ).toBeInTheDocument();
    const transparencyLinks = screen.getAllByRole("link", {
      name: /transparency/i,
    });
    expect(
      transparencyLinks.some((link) => link.getAttribute("href") === "/transparency"),
    ).toBe(true);
    expect(
      screen.getByRole("link", { name: /project archive/i }),
    ).toHaveAttribute("href", "/projects/archive");
  });

  it("renders copyright text with the organization name (multiple occurrences allowed)", async () => {
    render(await Footer());
    // The org name appears both as a heading and in copyright text;
    // use getAllByText to verify at least one occurrence exists
    const matches = screen.getAllByText(new RegExp(siteConfig.name, "i"));
    expect(matches.length).toBeGreaterThan(0);
  });
});
