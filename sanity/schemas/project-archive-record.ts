export const projectArchiveRecord = {
  name: "projectArchiveRecord",
  title: "Project Archive Record",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "summary",
      title: "Summary",
      type: "text",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "outcomes",
      title: "Final Outcomes",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "reportUrl",
      title: "Final Report URL",
      type: "string",
      description:
        "Use a /documents/... path or a Sanity file URL for the final report.",
    },
    {
      name: "galleryHref",
      title: "Gallery Link",
      type: "string",
      description: "Optional link to a related gallery album or media page.",
    },
    {
      name: "publishedDate",
      title: "Published Date",
      type: "date",
    },
  ],
};
