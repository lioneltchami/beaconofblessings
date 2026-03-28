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
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Completed", value: "completed" },
          { title: "Upcoming", value: "upcoming" },
        ],
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
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
    },
  ],
};
