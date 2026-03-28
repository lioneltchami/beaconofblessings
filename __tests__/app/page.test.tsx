import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the organization name", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /beacon of blessings/i }),
    ).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<HomePage />);
    expect(
      screen.getByText(/illuminating futures through education/i),
    ).toBeInTheDocument();
  });

  it("renders donate and learn more buttons", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("button", { name: /donate now/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /learn more/i }),
    ).toBeInTheDocument();
  });
});
