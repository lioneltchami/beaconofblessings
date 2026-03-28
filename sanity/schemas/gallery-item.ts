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
      type: "date",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
  ],
};
