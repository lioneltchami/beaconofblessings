import { describe, expect, it, vi } from "vitest";

// Mock the emails module so no real Resend calls are made.
vi.mock("@/app/actions/emails", () => ({
	sendContactNotification: vi.fn().mockResolvedValue({ success: true }),
}));

// Dynamic import after mock registration so the mocked module is used.
async function getAction() {
	const mod = await import("@/app/actions/contact");
	return mod.submitContactForm;
}

function makeFormData(fields: Record<string, string>): FormData {
	const fd = new FormData();
	for (const [key, value] of Object.entries(fields)) {
		fd.append(key, value);
	}
	return fd;
}

const validFields = {
	name: "Jane Doe",
	email: "jane@example.com",
	subject: "Hello",
	message: "This is a test message.",
};

describe("submitContactForm()", () => {
	it("returns error when name field is missing", async () => {
		const submitContactForm = await getAction();
		const fd = makeFormData({ ...validFields, name: "" });
		const result = await submitContactForm(fd);

		expect(result.success).toBe(false);
		expect(result.error).toBe("All fields are required.");
	});

	it("returns error when email field is missing", async () => {
		const submitContactForm = await getAction();
		const fd = makeFormData({ ...validFields, email: "" });
		const result = await submitContactForm(fd);

		expect(result.success).toBe(false);
		expect(result.error).toBe("All fields are required.");
	});

	it("returns error when subject field is missing", async () => {
		const submitContactForm = await getAction();
		const fd = makeFormData({ ...validFields, subject: "" });
		const result = await submitContactForm(fd);

		expect(result.success).toBe(false);
		expect(result.error).toBe("All fields are required.");
	});

	it("returns error when message field is missing", async () => {
		const submitContactForm = await getAction();
		const fd = makeFormData({ ...validFields, message: "" });
		const result = await submitContactForm(fd);

		expect(result.success).toBe(false);
		expect(result.error).toBe("All fields are required.");
	});

	it("returns error for an invalid email address", async () => {
		const submitContactForm = await getAction();
		const fd = makeFormData({ ...validFields, email: "not-an-email" });
		const result = await submitContactForm(fd);

		expect(result.success).toBe(false);
		expect(result.error).toBe("Invalid email address.");
	});

	it("returns error for email missing domain extension", async () => {
		const submitContactForm = await getAction();
		const fd = makeFormData({ ...validFields, email: "user@nodomain" });
		const result = await submitContactForm(fd);

		expect(result.success).toBe(false);
		expect(result.error).toBe("Invalid email address.");
	});

	it("returns success when all fields are valid and sendContactNotification succeeds", async () => {
		const { sendContactNotification } = await import("@/app/actions/emails");
		vi.mocked(sendContactNotification).mockResolvedValueOnce({ success: true });

		const submitContactForm = await getAction();
		const fd = makeFormData(validFields);
		const result = await submitContactForm(fd);

		expect(result.success).toBe(true);
		expect(result.error).toBeUndefined();
	});

	it("still returns success even when sendContactNotification fails (graceful degradation)", async () => {
		const { sendContactNotification } = await import("@/app/actions/emails");
		vi.mocked(sendContactNotification).mockResolvedValueOnce({
			success: false,
			error: "Resend API down",
		});

		const submitContactForm = await getAction();
		const fd = makeFormData(validFields);
		const result = await submitContactForm(fd);

		// The action intentionally hides email failures from the user.
		expect(result.success).toBe(true);
	});

	it("calls sendContactNotification with the correct payload", async () => {
		const { sendContactNotification } = await import("@/app/actions/emails");
		vi.mocked(sendContactNotification).mockResolvedValueOnce({ success: true });

		const submitContactForm = await getAction();
		const fd = makeFormData(validFields);
		await submitContactForm(fd);

		expect(sendContactNotification).toHaveBeenCalledWith({
			senderName: validFields.name,
			senderEmail: validFields.email,
			subject: validFields.subject,
			message: validFields.message,
		});
	});
});
