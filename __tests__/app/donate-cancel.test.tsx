import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DonateCancelPage from "@/app/donate/cancel/page";

describe("DonateCancelPage", () => {
  it("renders the cancellation heading", () => {
    render(<DonateCancelPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /donation cancelled/i }),
    ).toBeInTheDocument();
  });

  it("renders the reassuring message about no charges", () => {
    render(<DonateCancelPage />);
    expect(
      screen.getByText(/no charges were made to your account/i),
    ).toBeInTheDocument();
  });

  it("renders a 'Try Again' link back to the donate page", () => {
    render(<DonateCancelPage />);
    const tryAgain = screen.getByRole("link", { name: /try again/i });
    expect(tryAgain).toBeInTheDocument();
    expect(tryAgain).toHaveAttribute("href", "/donate");
  });

  it("renders a 'Contact Us' link pointing to the contact page", () => {
    render(<DonateCancelPage />);
    const contactLink = screen.getByRole("link", { name: /contact us/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  it("renders the organisation email as a mailto link", () => {
    render(<DonateCancelPage />);
    const emailLink = screen.getByRole("link", {
      name: /info@beaconofblessings\.org/i,
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:info@beaconofblessings.org",
    );
  });

  it("shows the 'you can try again anytime' message", () => {
    render(<DonateCancelPage />);
    expect(screen.getByText(/you can try again anytime/i)).toBeInTheDocument();
  });
});
