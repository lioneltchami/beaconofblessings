export function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

export function formatCurrency(currency: string, amount: number) {
	const safeCurrency = escapeHtml(currency.toUpperCase());
	return `${safeCurrency} ${amount.toFixed(2)}`;
}

export function formatDonationFrequency(frequency?: string) {
	return frequency === "monthly" ? "Monthly donation" : "One-time donation";
}
