"use server";

import { getResend } from "@/lib/resend";
import {
	escapeHtml,
	formatCurrency,
	formatDonationFrequency,
} from "@/lib/email-format";

const FROM =
	process.env.EMAIL_FROM ?? "Beacon of Blessings <onboarding@resend.dev>";
const ORG_EMAIL = process.env.ORG_EMAIL ?? "info@beaconofblessings.org";

type EmailResult = {
	success: boolean;
	id?: string;
	error?: string;
};

export async function sendDonationReceipt({
	donorEmail,
	donorName,
	amount,
	currency,
	donationId,
	date,
	frequency = "one-time",
	programName,
}: {
	donorEmail: string;
	donorName: string;
	amount: number;
	currency: string;
	donationId: string;
	date: string;
	frequency?: "one-time" | "monthly";
	programName?: string;
}): Promise<EmailResult> {
	try {
		const resend = getResend();
		const safeDonorName = escapeHtml(donorName);
		const safeDonationId = escapeHtml(donationId);
		const safeDate = escapeHtml(date);
		const safeFrequency = escapeHtml(formatDonationFrequency(frequency));
		const safeAmount = formatCurrency(currency, amount);
		const safeProgramName = programName ? escapeHtml(programName) : "";
		const safeSubjectDonationId = donationId.replace(/[\r\n]/g, " ");
		const { data, error } = await resend.emails.send({
			from: FROM,
			to: [donorEmail],
			subject: `Thank you for your donation - Receipt #${safeSubjectDonationId}`,
			html: `
        <h2>Thank you, ${safeDonorName}!</h2>
        <p>We have received your generous ${safeFrequency.toLowerCase()} of <strong>${safeAmount}</strong>.</p>
        ${safeProgramName ? `<p><strong>Program designation:</strong> ${safeProgramName}</p>` : ""}
        <p><strong>Donation ID:</strong> ${safeDonationId}<br/>
        <strong>Date:</strong> ${safeDate}</p>
        <p>Beacon of Blessings Charity Initiative is registered in Nigeria. Please consult your local tax adviser about whether this gift is deductible in your jurisdiction.</p>
        <p>Your contribution is making a real difference in the lives of children in Nigeria. God bless you.</p>
        <p>With gratitude,<br/>Beacon of Blessings Charity Initiative</p>
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
	frequency = "one-time",
	programName,
}: {
	donorName: string;
	donorEmail: string;
	amount: number;
	currency: string;
	donationId: string;
	date: string;
	frequency?: "one-time" | "monthly";
	programName?: string;
}): Promise<EmailResult> {
	try {
		const resend = getResend();
		const safeDonorName = escapeHtml(donorName);
		const safeDonorEmail = escapeHtml(donorEmail);
		const safeDonationId = escapeHtml(donationId);
		const safeDate = escapeHtml(date);
		const safeFrequency = escapeHtml(formatDonationFrequency(frequency));
		const safeAmount = formatCurrency(currency, amount);
		const safeProgramName = programName ? escapeHtml(programName) : "";
		const safeSubjectCurrency = currency.toUpperCase().replace(/[\r\n]/g, " ");
		const safeSubjectDonorName = donorName.replace(/[\r\n]/g, " ");
		const { data, error } = await resend.emails.send({
			from: FROM,
			to: [ORG_EMAIL],
			subject: `New Donation: ${safeSubjectCurrency} ${amount.toFixed(2)} from ${safeSubjectDonorName}`,
			html: `
        <h2>New Donation Received</h2>
        <p><strong>Donor:</strong> ${safeDonorName} (${safeDonorEmail})</p>
        <p><strong>Type:</strong> ${safeFrequency}</p>
        ${safeProgramName ? `<p><strong>Program:</strong> ${safeProgramName}</p>` : ""}
        <p><strong>Amount:</strong> ${safeAmount}</p>
        <p><strong>Donation ID:</strong> ${safeDonationId}</p>
        <p><strong>Date:</strong> ${safeDate}</p>
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
}): Promise<EmailResult> {
	try {
		const resend = getResend();
		const safeSenderName = escapeHtml(senderName);
		const safeSenderEmail = escapeHtml(senderEmail);
		const safeSubject = escapeHtml(subject);
		const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
		const safeEmailSubject = subject.replace(/[\r\n]/g, " ");
		const { data, error } = await resend.emails.send({
			from: FROM,
			to: [ORG_EMAIL],
			subject: `Contact Form: ${safeEmailSubject}`,
			html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${safeSenderName} (${safeSenderEmail})</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr/>
        <p>${safeMessage}</p>
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
