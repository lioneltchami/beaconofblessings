import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();

vi.mock("@/lib/resend", () => ({
  getResend: () => ({
    emails: {
      send,
    },
  }),
}));

describe("email actions", () => {
  beforeEach(() => {
    vi.resetModules();
    send.mockReset();
    send.mockResolvedValue({ data: { id: "email_123" }, error: null });
  });

  it("escapes HTML in donation receipt emails", async () => {
    const { sendDonationReceipt } = await import("@/app/actions/emails");

    await sendDonationReceipt({
      donorEmail: "donor@example.com",
      donorName: "<Ada & Co>",
      amount: 25,
      currency: "usd",
      donationId: "cs_<script>",
      date: "2026-05-20",
      frequency: "monthly",
      programName: "Girls <Education>",
    });

    const html = send.mock.calls[0][0].html;
    expect(html).toContain("&lt;Ada &amp; Co&gt;");
    expect(html).toContain("cs_&lt;script&gt;");
    expect(html).not.toContain("<Ada & Co>");
    expect(html).toContain("Girls &lt;Education&gt;");
    expect(html).toContain("registered in Nigeria");
  });

  it("escapes HTML in donation notification emails", async () => {
    const { sendDonationNotification } = await import("@/app/actions/emails");

    await sendDonationNotification({
      donorName: "Bad <b>Name</b>",
      donorEmail: "bad@example.com<script>",
      amount: 100,
      currency: "usd",
      donationId: "in_1",
      date: "2026-05-20",
      frequency: "one-time",
      programName: "School <Kits>",
    });

    const html = send.mock.calls[0][0].html;
    expect(html).toContain("Bad &lt;b&gt;Name&lt;/b&gt;");
    expect(html).toContain("bad@example.com&lt;script&gt;");
    expect(html).toContain("School &lt;Kits&gt;");
    expect(html).not.toContain("<b>Name</b>");
  });

  it("removes line breaks from generated email subject fields", async () => {
    const { sendDonationReceipt, sendDonationNotification } = await import(
      "@/app/actions/emails"
    );

    await sendDonationReceipt({
      donorEmail: "donor@example.com",
      donorName: "Donor",
      amount: 25,
      currency: "usd",
      donationId: "cs_123\r\nBCC: bad@example.com",
      date: "2026-05-20",
    });
    await sendDonationNotification({
      donorName: "Name\r\nBCC: bad@example.com",
      donorEmail: "donor@example.com",
      amount: 25,
      currency: "usd\r\nBCC: bad@example.com",
      donationId: "cs_123",
      date: "2026-05-20",
    });

    expect(send.mock.calls[0][0].subject).not.toMatch(/[\r\n]/);
    expect(send.mock.calls[1][0].subject).not.toMatch(/[\r\n]/);
  });

  it("escapes HTML and preserves line breaks in contact notification emails", async () => {
    const { sendContactNotification } = await import("@/app/actions/emails");

    await sendContactNotification({
      senderName: "<Sender>",
      senderEmail: "sender@example.com",
      subject: "Hi <there>",
      message: "Line <one>\nLine & two",
    });

    const html = send.mock.calls[0][0].html;
    expect(html).toContain("&lt;Sender&gt;");
    expect(html).toContain("Hi &lt;there&gt;");
    expect(html).toContain("Line &lt;one&gt;<br/>Line &amp; two");
  });
});
