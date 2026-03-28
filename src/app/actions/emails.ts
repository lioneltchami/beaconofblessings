"use server";

import { getResend } from "@/lib/resend";

const FROM =
	process.env.EMAIL_FROM ?? "Beacon of Blessings <onboarding@resend.dev>";
const ORG_EMAIL = process.env.ORG_EMAIL ?? "info@beaconofblessings.org";

export async function sendDonationReceipt({
	donorEmail,
	donorName,
	amount,
	currency,
	donationId,
	date,
}: {
	donorEmail: string;
	donorName: string;
	amount: number;
	currency: string;
	donationId: string;
	date: string;
}) {
	try {
		const resend = getResend();
		const { data, error } = await resend.emails.send({
			from: FROM,
			to: [donorEmail],
			subject: `Thank you for your donation — Receipt #${donationId}`,
			html: `
        <h2>Thank you, ${donorName}!</h2>
        <p>We have received your generous donation of <strong>${currency} ${amount.toFixed(2)}</strong>.</p>
        <p><strong>Donation ID:</strong> ${donationId}<br/>
        <strong>Date:</strong> ${date}</p>
        <p>Your contribution is making a real difference in the lives of children in Nigeria. God bless you.</p>
        <p>With gratitude,<br/>— Beacon of Blessings Charity Initiative</p>
      `,
		});

		if (error) {
			console.error("[sendDonationReceipt]", error);
			return { success: false, error: error.message };
		}

		return { success: true, id: data?.id };
	} catch (err) {
		console.error("[sendDonationReceipt] unexpected error:", err);
		return {
			success: false,
			error: err instanceof Error ? err.message : "Failed to send receipt",
		};
	}
}

export async function sendDonationNotification({
	donorName,
	donorEmail,
	amount,
	currency,
	donationId,
	date,
}: {
	donorName: string;
	donorEmail: string;
	amount: number;
	currency: string;
	donationId: string;
	date: string;
}) {
	try {
		const resend = getResend();
		const { data, error } = await resend.emails.send({
			from: FROM,
			to: [ORG_EMAIL],
			subject: `New Donation: ${currency} ${amount.toFixed(2)} from ${donorName}`,
			html: `
        <h2>New Donation Received</h2>
        <p><strong>Donor:</strong> ${donorName} (${donorEmail})</p>
        <p><strong>Amount:</strong> ${currency} ${amount.toFixed(2)}</p>
        <p><strong>Donation ID:</strong> ${donationId}</p>
        <p><strong>Date:</strong> ${date}</p>
      `,
		});

		if (error) {
			console.error("[sendDonationNotification]", error);
			return { success: false, error: error.message };
		}

		return { success: true, id: data?.id };
	} catch (err) {
		console.error("[sendDonationNotification] unexpected error:", err);
		return {
			success: false,
			error: err instanceof Error ? err.message : "Failed to send notification",
		};
	}
}

export async function sendContactNotification({
	senderName,
	senderEmail,
	subject,
	message,
}: {
	senderName: string;
	senderEmail: string;
	subject: string;
	message: string;
}) {
	try {
		const resend = getResend();
		const { data, error } = await resend.emails.send({
			from: FROM,
			to: [ORG_EMAIL],
			subject: `Contact Form: ${subject}`,
			html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${senderName} (${senderEmail})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr/>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
			headers: {
				"X-Entity-Ref-ID": crypto.randomUUID(),
			},
		});

		if (error) {
			console.error("[sendContactNotification]", error);
			return { success: false, error: error.message };
		}

		return { success: true, id: data?.id };
	} catch (err) {
		console.error("[sendContactNotification] unexpected error:", err);
		return {
			success: false,
			error: err instanceof Error ? err.message : "Failed to send notification",
		};
	}
}
