export const album = {
	name: "album",
	title: "Album",
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
			options: { source: "title", maxLength: 96 },
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
					{ title: "Education", value: "Education" },
					{ title: "Community", value: "Community" },
					{ title: "Our Team", value: "Team" },
					{ title: "Impact", value: "Impact" },
				],
			},
			validation: (Rule: { required: () => unknown }) => Rule.required(),
		},
		{
			name: "date",
			title: "Date",
			type: "string",
			description: "Display date, e.g. 'September 2024'",
			validation: (Rule: { required: () => unknown }) => Rule.required(),
		},
		{
			name: "photoCount",
			title: "Photo Count",
			type: "number",
			validation: (Rule: { required: () => { min: (n: number) => unknown } }) =>
				Rule.required().min(0),
		},
		{
			name: "photos",
			title: "Photos",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "id",
							title: "ID",
							type: "string",
							validation: (Rule: { required: () => unknown }) =>
								Rule.required(),
						},
						{
							name: "title",
							title: "Title",
							type: "string",
							validation: (Rule: { required: () => unknown }) =>
								Rule.required(),
						},
						{
							name: "description",
							title: "Description",
							type: "text",
						},
						{
							name: "image",
							title: "Image",
							type: "image",
							options: { hotspot: true },
						},
					],
				},
			],
		},
		{
			name: "coverImage",
			title: "Cover Image",
			type: "image",
			options: { hotspot: true },
		},
	],
	preview: {
		select: {
			title: "title",
			subtitle: "category",
			media: "coverImage",
		},
	},
};
