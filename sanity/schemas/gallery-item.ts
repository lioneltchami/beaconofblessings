export const galleryItem = {
  name: "galleryItem",
  title: "Gallery Item",
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
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Education", value: "education" },
          { title: "Community", value: "community" },
          { title: "Events", value: "events" },
          { title: "Our Team", value: "team" },
          { title: "Impact", value: "impact" },
        ],
      },
    },
    {
      name: "date",
      title: "Date",
      type: "string",
      description: "Human-readable date, e.g. 'November 2024'",
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
