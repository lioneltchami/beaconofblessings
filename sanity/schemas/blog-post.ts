export const blogPost = {
  name: "blogPost",
  title: "Blog Post",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    },
    {
      name: "content",
      title: "Content",
      type: "text",
      rows: 20,
    },
    {
      name: "author",
      title: "Author",
      type: "string",
    },
    {
      name: "date",
      title: "Date",
      type: "date",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Impact Stories", value: "Impact Stories" },
          { title: "Ministry Updates", value: "Ministry Updates" },
          { title: "Annual Reports", value: "Annual Reports" },
          { title: "Community News", value: "Community News" },
        ],
      },
    },
    {
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: "e.g., '5 min read'",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "image",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
    },
  ],
};
