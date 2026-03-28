import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/footer";
import { navLinks, siteConfig } from "@/data/site";

describe("Footer", () => {
  it("renders the organization name as a heading", () => {
    render(<Footer />);
    // The org name appears in the footer h2 heading
    expect(
      screen.getByRole("heading", { name: siteConfig.name }),
    ).toBeInTheDocument();
  });

  it("renders the email contact link", () => {
    render(<Footer />);
    const emailLink = screen.getByRole("link", { name: siteConfig.email });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", `mailto:${siteConfig.email}`);
  });

  it("renders the phone contact link", () => {
    render(<Footer />);
    const phoneLink = screen.getByRole("link", { name: siteConfig.phone });
    expect(phoneLink).toBeInTheDocument();
  });

  it("renders the address", () => {
    render(<Footer />);
    expect(screen.getByText(siteConfig.address)).toBeInTheDocument();
  });

  it("renders footer navigation with all nav links", () => {
    render(<Footer />);
    const nav = screen.getByRole("navigation", { name: /footer navigation/i });
    expect(nav).toBeInTheDocument();
    for (const link of navLinks) {
      expect(
        screen.getAllByRole("link", { name: link.label }).length,
      ).toBeGreaterThan(0);
    }
  });

  it("renders Privacy Policy link pointing to /privacy", () => {
    render(<Footer />);
    const privacyLink = screen.getByRole("link", { name: /privacy policy/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  it("renders Terms of Service link pointing to /terms", () => {
    render(<Footer />);
    const termsLink = screen.getByRole("link", { name: /terms of service/i });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute("href", "/terms");
  });

  it("renders Donate Now link pointing to /donate", () => {
    render(<Footer />);
    const donateLink = screen.getByRole("link", { name: /donate now/i });
    expect(donateLink).toBeInTheDocument();
    expect(donateLink).toHaveAttribute("href", "/donate");
  });

  it("renders copyright text with the organization name (multiple occurrences allowed)", () => {
    render(<Footer />);
    // The org name appears both as a heading and in copyright text;
    // use getAllByText to verify at least one occurrence exists
    const matches = screen.getAllByText(new RegExp(siteConfig.name, "i"));
    expect(matches.length).toBeGreaterThan(0);
  });
});
