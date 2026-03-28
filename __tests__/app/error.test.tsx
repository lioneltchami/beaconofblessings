import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GlobalError from "@/app/error";

describe("GlobalError", () => {
  it("renders the error message from the error prop", () => {
    const error = new Error("Something exploded");
    render(<GlobalError error={error} reset={() => {}} />);
    expect(screen.getByText("Something exploded")).toBeInTheDocument();
  });

  it("renders fallback message when error has no message", () => {
    const error = Object.assign(new Error(""), { message: "" });
    render(<GlobalError error={error} reset={() => {}} />);
    expect(
      screen.getByText(/an unexpected error occurred/i),
    ).toBeInTheDocument();
  });

  it("renders Try Again button", () => {
    const error = new Error("Oops");
    render(<GlobalError error={error} reset={() => {}} />);
    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();
  });

  it("calls reset when Try Again is clicked", () => {
    const error = new Error("Oops");
    const reset = vi.fn();
    render(<GlobalError error={error} reset={reset} />);
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
