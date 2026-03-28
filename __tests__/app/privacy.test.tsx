import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacyPolicyPage from "@/app/privacy/page";

describe("PrivacyPolicyPage", () => {
	it("renders the page h1 heading 'Privacy Policy'", () => {
		render(<PrivacyPolicyPage />);
		expect(
			screen.getByRole("heading", { level: 1, name: /privacy policy/i }),
		).toBeInTheDocument();
	});

	it("renders the last updated notice", () => {
		render(<PrivacyPolicyPage />);
		expect(screen.getByText(/last updated/i)).toBeInTheDocument();
	});

	it("renders 'Information We Collect' section heading", () => {
		render(<PrivacyPolicyPage />);
		expect(
			screen.getByRole("heading", { name: /information we collect/i }),
		).toBeInTheDocument();
	});

	it("renders 'How We Use Your Information' section heading", () => {
		render(<PrivacyPolicyPage />);
		expect(
			screen.getByRole("heading", { name: /how we use your information/i }),
		).toBeInTheDocument();
	});

	it("renders 'Cookies' section heading", () => {
		render(<PrivacyPolicyPage />);
		expect(
			screen.getByRole("heading", { name: /^cookies$/i }),
		).toBeInTheDocument();
	});

	it("renders 'Data Security' section heading", () => {
		render(<PrivacyPolicyPage />);
		expect(
			screen.getByRole("heading", { name: /data security/i }),
		).toBeInTheDocument();
	});

	it("renders 'Your Rights' section heading", () => {
		render(<PrivacyPolicyPage />);
		expect(
			screen.getByRole("heading", { name: /your rights/i }),
		).toBeInTheDocument();
	});

	it("renders 'Third-Party Services' section heading", () => {
		render(<PrivacyPolicyPage />);
		expect(
			screen.getByRole("heading", { name: /third-party services/i }),
		).toBeInTheDocument();
	});

	it("renders contact email link in the Contact Us section", () => {
		render(<PrivacyPolicyPage />);
		// There may be multiple email links; at least one should exist
		const emailLinks = screen.getAllByRole("link", {
			name: /info@beaconofblessings\.org/i,
		});
		expect(emailLinks.length).toBeGreaterThan(0);
	});
});
