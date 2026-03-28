import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectsPage from "@/app/projects/page";
import { getCompletedProjects, getUpcomingProjects } from "@/data/projects";

describe("ProjectsPage", () => {
  it("renders the page h1 heading", () => {
    render(<ProjectsPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /our projects/i }),
    ).toBeInTheDocument();
  });

  it("renders the completed project title", () => {
    render(<ProjectsPage />);
    const completed = getCompletedProjects();
    for (const project of completed) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    }
  });

  it("renders the upcoming project titles", () => {
    render(<ProjectsPage />);
    const upcoming = getUpcomingProjects();
    for (const project of upcoming) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    }
  });

  it("renders Completed Projects section heading", () => {
    render(<ProjectsPage />);
    expect(
      screen.getByRole("heading", { name: /completed projects/i }),
    ).toBeInTheDocument();
  });

  it("renders Upcoming Projects section heading", () => {
    render(<ProjectsPage />);
    expect(
      screen.getByRole("heading", { name: /upcoming projects/i }),
    ).toBeInTheDocument();
  });

  it("renders impact stat: 500+ lives impacted", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("Lives Impacted")).toBeInTheDocument();
  });

  it("renders impact stat: N2.5M invested label", () => {
    render(<ProjectsPage />);
    // N2.5M appears multiple times (stat + project card budget); use getAllByText
    expect(screen.getAllByText("N2.5M").length).toBeGreaterThan(0);
    expect(screen.getByText("Invested")).toBeInTheDocument();
  });

  it("renders impact stat: 5 communities served", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("Communities Served")).toBeInTheDocument();
  });

  it("renders Donate Now CTA link pointing to /donate", () => {
    render(<ProjectsPage />);
    const link = screen.getByRole("link", { name: /donate now/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/donate");
  });
});
