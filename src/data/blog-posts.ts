export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	author: string;
	date: string;
	category: string;
	readTime: string;
	tags: string[];
}

export const blogPosts: BlogPost[] = [
	{
		slug: "transforming-lives-through-education",
		title: "Transforming Lives Through Education",
		excerpt:
			"See how our first educational supplies outreach helped children with school-readiness materials and community care.",
		content: `Our first educational supplies outreach in 2024 was a transformative experience for both the communities we serve and our organization. We had a simple goal: help children in underserved communities receive practical school-readiness support and experience care from the wider community.

The published financial report records N1,372,200 in funds received and N1,372,200 in project expenditure. Those funds covered CAC registration costs, roll-up banner printing, 96 pairs of sandals, 92 school bags, books, stockings, pencils, pens, transportation, and outreach event costs.

The outreach also included a community celebration with T-shirts, face caps, bottled water, Maltina, meat pies, canopy, chairs, tables, car rental, DJ support, fuel, and volunteer stipends. The report notes that a N196,564 donation from ADA (Apoti Development Association, Cameroon) helped fully cover project expenditures.

As we look ahead, we are planning our Digital Learning Initiative to bring technology into these same communities, building on the foundation of trust, reporting, and partnership established through this first project.`,
		author: "Beacon of Blessings Team",
		date: "2024-10-15",
		category: "Impact Stories",
		readTime: "5 min read",
		tags: ["education", "impact", "Lagos", "school supplies"],
	},
	{
		slug: "together-we-build-hope",
		title: "Together We Build Hope",
		excerpt:
			"A reflection on the power of community partnership in creating sustainable change for Nigeria's children.",
		content: `At Beacon of Blessings, we believe that sustainable change happens when communities work together. Our approach has always been to partner with — not simply give to — the communities we serve.

This philosophy was put into practice during our first educational supplies outreach, where support was converted into practical school-readiness materials and a community celebration event for children.

Chief Emeka, a community leader in one of our partner neighborhoods, told us: "What makes Beacon of Blessings different is that they came to us first. They asked what we needed, they listened, and they delivered exactly what our children required."

This community-first approach is at the heart of everything we do. As we plan our upcoming projects — the Digital Learning Initiative and the Girls' Education Scholarship Program — we are once again starting with conversations, not assumptions.

We invite you to join us in this journey. Whether through a donation, volunteering your time, or simply spreading the word, every act of support strengthens the foundation we are building together.`,
		author: "Lionel Tchami",
		date: "2024-11-20",
		category: "Ministry Updates",
		readTime: "4 min read",
		tags: ["community", "partnership", "volunteer"],
	},
	{
		slug: "2024-year-end-report",
		title: "2024 Year-End Report: A Year of Beginnings",
		excerpt:
			"Reflecting on our first year of operations and the impact we have made together.",
		content: `As we close out 2024, we want to share a transparent look at what Beacon of Blessings accomplished in our founding year.

In our first year, we successfully launched and completed one major project: our first educational supplies outreach. Here is a summary of the published financial report:

Funds Received: N1,372,200
Total Expenditure: N1,372,200
School-Readiness Materials: 96 pairs of sandals, 92 school bags, books, stockings, pencils, and pens
Outreach Support: T-shirts, face caps, bottled water, Maltina, meat pies, canopy, chairs, tables, car rental, DJ and fuel, and volunteer stipends
Partner Support: ADA (Apoti Development Association, Cameroon) contributed N196,564

The project report shows that all recorded funds received were matched by documented project expenditure.

Looking ahead to 2025 and beyond, we have three major initiatives planned: the Digital Learning Initiative, the Girls' Education Scholarship Program, and the Community Library Project. Together, these programs represent an investment of over N28M in Nigeria's educational future.

We are grateful for every donor, volunteer, and partner who made our first year possible. Your generosity is the beacon that lights the way for these children.`,
		author: "Beacon of Blessings Team",
		date: "2024-12-30",
		category: "Annual Reports",
		readTime: "3 min read",
		tags: ["annual report", "transparency", "impact", "2024"],
	},
];

export function getBlogPosts() {
	return blogPosts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);
}

export function getBlogPost(slug: string) {
	return blogPosts.find((post) => post.slug === slug);
}

export function getRecentPosts(limit = 3) {
	return getBlogPosts().slice(0, limit);
}
