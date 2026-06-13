export const impactStat = {
  name: "impactStat",
  title: "Impact Statistic",
  type: "document",
  fields: [
    {
      name: "value",
      title: "Value",
      type: "string",
      description: "e.g., '500+' or '100%'",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "label",
      title: "Label",
      type: "string",
      description: "e.g., 'Students Supported'",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
    },
  ],
};
