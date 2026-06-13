export const project = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "status",
      title: "Manual status / fallback",
      type: "string",
      description:
        "Used when lifecycle mode is Manual, or when dates are missing.",
      options: {
        list: [
          { title: "Completed", value: "completed" },
          { title: "Current", value: "current" },
          { title: "Upcoming", value: "upcoming" },
        ],
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "lifecycleMode",
      title: "Lifecycle mode",
      type: "string",
      description:
        "Auto moves the project between Upcoming, Current, and Completed using the dates below.",
      initialValue: "auto",
      options: {
        list: [
          { title: "Auto by start/end dates", value: "auto" },
          { title: "Manual status", value: "manual" },
        ],
        layout: "radio",
      },
    },
    {
      name: "startDate",
      title: "Start date",
      type: "date",
      description:
        "When this date arrives, an automatic project appears under Current Projects.",
    },
    {
      name: "endDate",
      title: "End date",
      type: "date",
      description:
        "After this date passes, an automatic project appears under Completed Projects.",
    },
    {
      name: "archiveAfterDate",
      title: "Archive after date",
      type: "date",
      description:
        "Date the project should move into the archive. If empty, automatic projects use the end date.",
    },
    {
      name: "autoArchiveAfterEndDate",
      title: "Auto-archive after end date",
      type: "boolean",
      initialValue: true,
      description:
        "When enabled, automatic projects move to the archive after the end date if no archive-after date is set.",
    },
    {
      name: "archiveRecord",
      title: "Archive record",
      type: "reference",
      to: [{ type: "projectArchiveRecord" }],
      description:
        "Optional richer record with final outcomes, report links, and proof for completed projects.",
    },
    {
      name: "date",
      title: "Date",
      type: "string",
      description: "e.g., 'June - September 2024' or '2026'",
    },
    {
      name: "budget",
      title: "Budget",
      type: "string",
      description: "e.g., 'N2.5M'",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "impact",
      title: "Impact Points",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
    },
  ],
};
