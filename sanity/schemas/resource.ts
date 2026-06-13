export const resource = {
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Registration & Legal", value: "registration" },
          { title: "Annual Reports", value: "annual-reports" },
          { title: "Project Reports", value: "project-reports" },
          { title: "Policies & Governance", value: "policies" },
        ],
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "fileType",
      title: "File Type",
      type: "string",
      options: {
        list: [
          { title: "PDF", value: "pdf" },
          { title: "PowerPoint", value: "pptx" },
          { title: "Word", value: "docx" },
          { title: "Excel", value: "xlsx" },
        ],
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "fileSize",
      title: "File Size",
      type: "string",
      description: "Human-readable file size, e.g. '1.2 MB'",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "file",
      title: "File",
      type: "file",
      description: "Upload the document file",
    },
    {
      name: "fileUrl",
      title: "File URL",
      type: "url",
      description: "External URL to the file (alternative to uploading)",
    },
  ],
  orderings: [
    {
      title: "Date, Newest",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
};
