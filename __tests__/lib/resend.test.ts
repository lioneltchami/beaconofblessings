import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Resend is used with `new Resend(key)`, so the mock must be a proper constructor.
vi.mock("resend", () => {
  const MockResend = vi.fn(function MockResend(this: unknown) {
    Object.assign(this as object, {
      emails: { send: vi.fn() },
    });
  });
  return { Resend: MockResend };
});

describe("getResend()", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("throws when RESEND_API_KEY is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    const { getResend } = await import("@/lib/resend");
    expect(() => getResend()).toThrowError(
      "RESEND_API_KEY is not set. Add it to your .env.local file.",
    );
  });

  it("returns a Resend instance when RESEND_API_KEY is set", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_fake_key");

    const { getResend } = await import("@/lib/resend");
    const instance = getResend();
    expect(instance).toBeDefined();
    expect(instance).toHaveProperty("emails");
  });

  it("returns the same cached instance on subsequent calls", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_fake_key");

    const { getResend } = await import("@/lib/resend");
    const first = getResend();
    const second = getResend();
    expect(first).toBe(second);
  });
});
