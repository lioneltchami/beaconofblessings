"use server";

import { sendContactNotification } from "./emails";

interface ContactResult {
  success: boolean;
  error?: string;
}

export async function submitContactForm(
  formData: FormData,
): Promise<ContactResult> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email address." };
  }

  try {
    const result = await sendContactNotification({
      senderName: name,
      senderEmail: email,
      subject,
      message,
    });

    if (!result.success) {
      console.error("[submitContactForm] email failed:", result.error);
      // Still return success to the user — we don't want to expose email errors
      // In production, we'd queue the message for retry
    }

    return { success: true };
  } catch (err) {
    console.error("[submitContactForm] unexpected error:", err);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
