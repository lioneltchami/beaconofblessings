export const founder = {
  name: "founder",
  title: "Founder",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "bio",
      title: "Bio",
      type: "text",
    },
    {
      name: "initials",
      title: "Initials",
      type: "string",
      description: "e.g., 'LT' for Lionel Tchami",
    },
    {
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
    },
  ],
};
