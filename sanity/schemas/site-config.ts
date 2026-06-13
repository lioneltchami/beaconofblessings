export const siteConfig = {
  name: "siteConfig",
  title: "Site Configuration",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Organization Name",
      type: "string",
    },
    {
      name: "legalName",
      title: "Legal Name",
      type: "string",
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "url",
      title: "Website URL",
      type: "url",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "officeHours",
      title: "Office Hours",
      type: "string",
    },
    {
      name: "founded",
      title: "Founded Year",
      type: "number",
    },
    {
      name: "registrationStatus",
      title: "Registration Status",
      type: "string",
    },
    {
      name: "serviceArea",
      title: "Service Area",
      type: "string",
    },
    {
      name: "logoInitials",
      title: "Logo Initials",
      type: "string",
      description: "Short initials shown in the header logo badge.",
    },
    {
      name: "navLinks",
      title: "Main Navigation Links",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "href", title: "URL or Path", type: "string" },
        { name: "external", title: "External Link", type: "boolean" },
      ] }],
    },
    {
      name: "footerTrustLinks",
      title: "Footer Donor Trust Links",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "href", title: "URL or Path", type: "string" },
        { name: "external", title: "External Link", type: "boolean" },
      ] }],
    },
    {
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "href", title: "URL", type: "url" },
        { name: "external", title: "External Link", type: "boolean", initialValue: true },
      ] }],
    },
  ],
};
