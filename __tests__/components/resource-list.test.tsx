import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResourceList } from "@/components/resource-list";

describe("ResourceList", () => {
  it("uses an approved static site fileUrl when present", () => {
    render(
      <ResourceList
        resources={[
          {
            id: "report-1",
            title: "2024 Annual Report",
            description: "Annual report download.",
            category: "annual-reports",
            fileType: "pdf",
            fileSize: "1 MB",
            date: "2025-01-30",
            fileUrl: "/documents/report.pdf",
          },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: /download/i })).toHaveAttribute(
      "href",
      "https://www.blessedbeaconcharity.org/documents/report.pdf",
    );
  });

  it("does not render arbitrary external fileUrl downloads", () => {
    render(
      <ResourceList
        resources={[
          {
            id: "report-1",
            title: "2024 Annual Report",
            description: "Annual report download.",
            category: "annual-reports",
            fileType: "pdf",
            fileSize: "1 MB",
            date: "2025-01-30",
            fileUrl: "https://example.com/report.pdf",
          },
        ]}
      />,
    );

    expect(
      screen.queryByRole("link", { name: /download/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /coming soon/i })).toBeDisabled();
  });

  it("uses the Sanity uploaded file asset URL when fileUrl is absent", () => {
    render(
      <ResourceList
        resources={[
          {
            _id: "policy-1",
            _type: "resource",
            id: "policy-1",
            title: "Safeguarding Policy",
            description: "Policy download.",
            category: "policies",
            fileType: "pdf",
            fileSize: "400 KB",
            date: "2024-05-10",
            file: {
              asset: {
                url: "https://cdn.sanity.io/files/project/production/policy.pdf",
              },
            },
          },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: /download/i })).toHaveAttribute(
      "href",
      "https://cdn.sanity.io/files/project/production/policy.pdf",
    );
  });
});
