import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DonateForm } from "@/components/donate-form";

// Prevent the form action from triggering a real Stripe redirect.
vi.mock("@/app/actions/checkout", () => ({
  createCheckoutSession: vi.fn(),
}));

// useFormStatus is not supported in jsdom; stub it to always report idle.
vi.mock("react-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-dom")>();
  return {
    ...actual,
    useFormStatus: vi.fn(() => ({ pending: false })),
  };
});

// Helper: find a preset button by its exact dollar amount displayed as text.
// Each preset button renders the amount on its own (e.g. "$25") and an impact
// description. We use getAllByRole and filter on text content to avoid partial
// regex collisions ($25 vs $250, $50 vs $500).
function getPresetButton(amount: number) {
  const buttons = screen.getAllByRole("button");
  return buttons.find((btn) => {
    const spans = btn.querySelectorAll("span");
    // The first span holds "$<amount>" — match the concatenated "$" + number text
    if (spans.length === 0) return false;
    const amountSpan = spans[0];
    const text = amountSpan.textContent?.replace(/\s/g, "") ?? "";
    return text === `$${amount}`;
  });
}

describe("DonateForm", () => {
  it("renders all five preset amount buttons ($25, $50, $100, $250, $500)", () => {
    render(<DonateForm />);
    for (const amount of [25, 50, 100, 250, 500]) {
      expect(getPresetButton(amount)).toBeDefined();
    }
  });

  it("renders the Custom amount button", () => {
    render(<DonateForm />);
    expect(screen.getByRole("button", { name: /custom/i })).toBeInTheDocument();
  });

  it("renders the frequency toggle with One-time and Monthly options", () => {
    render(<DonateForm />);
    expect(
      screen.getByRole("button", { name: /one-time/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /monthly/i }),
    ).toBeInTheDocument();
  });

  it("renders the submit / proceed to payment button", () => {
    render(<DonateForm />);
    expect(
      screen.getByRole("button", { name: /proceed to secure payment/i }),
    ).toBeInTheDocument();
  });

  it("renders the secure payment trust badge", () => {
    render(<DonateForm />);
    expect(screen.getByText(/secure payment via stripe/i)).toBeInTheDocument();
  });

  it("renders the tax-deductibility notice", () => {
    render(<DonateForm />);
    expect(
      screen.getByText(/donations may not be tax-deductible/i),
    ).toBeInTheDocument();
  });

  it("shows the custom amount input only after clicking the Custom button", () => {
    render(<DonateForm />);

    // Custom input should not be visible initially
    expect(screen.queryByLabelText(/amount \(usd\)/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /custom/i }));

    expect(screen.getByLabelText(/amount \(usd\)/i)).toBeInTheDocument();
  });

  it("selecting a preset amount hides the custom input again", () => {
    render(<DonateForm />);

    // Open custom input
    fireEvent.click(screen.getByRole("button", { name: /custom/i }));
    expect(screen.getByLabelText(/amount \(usd\)/i)).toBeInTheDocument();

    // Click the $50 preset to close it
    const btn50 = getPresetButton(50);
    expect(btn50).toBeDefined();
    fireEvent.click(btn50!);

    expect(screen.queryByLabelText(/amount \(usd\)/i)).not.toBeInTheDocument();
  });

  it("renders the impact description for each preset", () => {
    render(<DonateForm />);
    expect(screen.getByText(/supplies for 1 student/i)).toBeInTheDocument();
    expect(screen.getByText(/textbooks for 5 students/i)).toBeInTheDocument();
    expect(
      screen.getByText(/full school kit for 10 students/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/sponsor a classroom for a term/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/fund a community learning centre/i),
    ).toBeInTheDocument();
  });

  it("renders the donation frequency label", () => {
    render(<DonateForm />);
    expect(screen.getByText(/donation frequency/i)).toBeInTheDocument();
  });

  it("renders donor information fields (name and email)", () => {
    render(<DonateForm />);
    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
  });
});
