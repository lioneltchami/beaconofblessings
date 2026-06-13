import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/contact-form";

// Helper to fill all required fields using fireEvent (synchronous, no timer dependencies)
function fillFormSync() {
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "Test User" },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/subject/i), {
    target: { value: "Hello" },
  });
  fireEvent.change(screen.getByLabelText(/message/i), {
    target: { value: "Test message" },
  });
}

function submitForm() {
  const form = screen
    .getByRole("button", { name: /send message/i })
    .closest("form")!;
  fireEvent.submit(form);
}

describe("ContactForm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the Name input field", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it("renders the Email input field", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("renders the Subject input field", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
  });

  it("renders the Message textarea", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("renders the Send Message submit button", () => {
    render(<ContactForm />);
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });

  it("shows 'Sending...' immediately after form is submitted", async () => {
    render(<ContactForm />);
    fillFormSync();
    submitForm();

    // Timer frozen at 0ms — component should be in "submitting" state
    expect(screen.getByText(/sending\.\.\./i)).toBeInTheDocument();
  });

  it("shows success state after the simulated network delay resolves", async () => {
    render(<ContactForm />);
    fillFormSync();

    await act(async () => {
      submitForm();
      await vi.advanceTimersByTimeAsync(1500);
    });

    expect(screen.getByText(/message sent!/i)).toBeInTheDocument();
    expect(screen.getByText(/thank you for reaching out/i)).toBeInTheDocument();
  }, 10_000);

  it("shows 'Send Another Message' button in the success state", async () => {
    render(<ContactForm />);
    fillFormSync();

    await act(async () => {
      submitForm();
      await vi.advanceTimersByTimeAsync(1500);
    });

    expect(
      screen.getByRole("button", { name: /send another message/i }),
    ).toBeInTheDocument();
  }, 10_000);

  it("returns to the idle form after clicking 'Send Another Message'", async () => {
    render(<ContactForm />);
    fillFormSync();

    await act(async () => {
      submitForm();
      await vi.advanceTimersByTimeAsync(1500);
    });

    fireEvent.click(
      screen.getByRole("button", { name: /send another message/i }),
    );

    // The form should be back in idle state
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  }, 10_000);

  it("allows filling form fields with userEvent", async () => {
    // Switch to real timers for userEvent compatibility
    vi.useRealTimers();
    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/name/i), "Jane");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/subject/i), "Inquiry");
    await user.type(screen.getByLabelText(/message/i), "Hello there");

    expect(screen.getByLabelText(/name/i)).toHaveValue("Jane");
    expect(screen.getByLabelText(/email/i)).toHaveValue("jane@example.com");
    expect(screen.getByLabelText(/subject/i)).toHaveValue("Inquiry");
    expect(screen.getByLabelText(/message/i)).toHaveValue("Hello there");
  }, 10_000);
});
