import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TermsOfServicePage from "@/app/terms/page";

describe("TermsOfServicePage", () => {
  it("renders the page h1 heading 'Terms of Service'", () => {
    render(<TermsOfServicePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /terms of service/i }),
    ).toBeInTheDocument();
  });

  it("renders the last updated notice", () => {
    render(<TermsOfServicePage />);
    expect(screen.getByText(/last updated/i)).toBeInTheDocument();
  });

  it("renders 'Acceptance of Terms' section heading", () => {
    render(<TermsOfServicePage />);
    expect(
      screen.getByRole("heading", { name: /acceptance of terms/i }),
    ).toBeInTheDocument();
  });

  it("renders 'Use of Website' section heading", () => {
    render(<TermsOfServicePage />);
    expect(
      screen.getByRole("heading", { name: /use of website/i }),
    ).toBeInTheDocument();
  });

  it("renders 'Donations' section heading", () => {
    render(<TermsOfServicePage />);
    expect(
      screen.getByRole("heading", { name: /^donations$/i }),
    ).toBeInTheDocument();
  });

  it("renders 'Intellectual Property' section heading", () => {
    render(<TermsOfServicePage />);
    expect(
      screen.getByRole("heading", { name: /intellectual property/i }),
    ).toBeInTheDocument();
  });

  it("renders 'Limitation of Liability' section heading", () => {
    render(<TermsOfServicePage />);
    expect(
      screen.getByRole("heading", { name: /limitation of liability/i }),
    ).toBeInTheDocument();
  });

  it("renders 'Governing Law' section heading", () => {
    render(<TermsOfServicePage />);
    expect(
      screen.getByRole("heading", { name: /governing law/i }),
    ).toBeInTheDocument();
  });

  it("renders 'Disclaimer' section heading", () => {
    render(<TermsOfServicePage />);
    expect(
      screen.getByRole("heading", { name: /^disclaimer$/i }),
    ).toBeInTheDocument();
  });

  it("renders contact email link in the Contact Us section", () => {
    render(<TermsOfServicePage />);
    const emailLinks = screen.getAllByRole("link", {
      name: /info@beaconofblessings\.org/i,
    });
    expect(emailLinks.length).toBeGreaterThan(0);
  });

  it("renders a link to the Privacy Policy within the terms", () => {
    render(<TermsOfServicePage />);
    const privacyLink = screen.getByRole("link", { name: /privacy policy/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });
});
