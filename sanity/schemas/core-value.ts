export const coreValue = {
  name: "coreValue",
  title: "Core Value",
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
      name: "verse",
      title: "Bible Verse Reference",
      type: "string",
      description: "e.g., 'James 2:17'",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
    },
  ],
};
