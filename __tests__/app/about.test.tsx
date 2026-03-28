import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";
import { founders } from "@/data/founders";
import { coreValues } from "@/data/site";

describe("AboutPage", () => {
  it("renders the page h1 heading", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /about beacon of blessings/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders each founder by name", () => {
    render(<AboutPage />);
    for (const founder of founders) {
      expect(screen.getByText(founder.name)).toBeInTheDocument();
    }
  });

  it("renders each founder's role", () => {
    render(<AboutPage />);
    for (const founder of founders) {
      expect(screen.getByText(founder.role)).toBeInTheDocument();
    }
  });

  it("renders all core values by title", () => {
    render(<AboutPage />);
    for (const value of coreValues) {
      expect(screen.getByText(value.title)).toBeInTheDocument();
    }
  });

  it("renders Our Vision card title text", () => {
    render(<AboutPage />);
    // CardTitle renders as a div (not a heading), so use getByText
    expect(screen.getByText("Our Vision")).toBeInTheDocument();
  });

  it("renders Our Mission card title text", () => {
    render(<AboutPage />);
    // CardTitle renders as a div (not a heading), so use getByText
    expect(screen.getByText("Our Mission")).toBeInTheDocument();
  });

  it("renders Our Story section heading", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", { name: /our story/i }),
    ).toBeInTheDocument();
  });

  it("renders Meet Our Founders section heading", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", { name: /meet our founders/i }),
    ).toBeInTheDocument();
  });

  it("renders Core Values section heading", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", { name: /core values/i }),
    ).toBeInTheDocument();
  });

  it("renders Get In Touch CTA link pointing to /contact", () => {
    render(<AboutPage />);
    const link = screen.getByRole("link", { name: /get in touch/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/contact");
  });
});
