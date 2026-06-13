import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "@/app/not-found";

describe("NotFound", () => {
	it("renders Page Not Found heading", () => {
		render(<NotFound />);
		expect(
			screen.getByRole("heading", { level: 1, name: /page not found/i }),
		).toBeInTheDocument();
	});

	it("renders Go Home link pointing to /", () => {
		render(<NotFound />);
		const link = screen.getByRole("link", { name: /go home/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/");
	});

	it("renders Contact Us link", () => {
		render(<NotFound />);
		const link = screen.getByRole("link", { name: /contact us/i });
		expect(link).toBeInTheDocument();
	});
});
