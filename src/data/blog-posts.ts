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
			"See how our School Supplies Drive 2024 is making a lasting impact on students across Lagos communities.",
		content: `Our School Supplies Drive 2024 has been a transformative experience for both the communities we serve and our organization. When we set out in June 2024, we had a simple goal: ensure that no child in our target communities would start the school year without the basic supplies they need to learn.

Over the course of three months, our team worked closely with local schools, community leaders, and parent associations across five Lagos communities. The response was overwhelming — both from donors who made this possible and from the families who received support.

Each student received a school bag filled with notebooks, textbooks, and writing materials. But the impact goes far beyond the physical supplies. Teachers reported increased attendance, improved engagement in class, and a renewed sense of hope among students who previously struggled to participate fully in their education.

Mrs. Adebayo, a teacher at one of our partner schools, shared: "The children's faces lit up when they received their supplies. For many of them, it was the first time they had their own school bag. The change in their confidence was immediate."

As we look ahead, we are planning our Digital Learning Initiative to bring technology into these same communities, building on the foundation of trust and partnership we have established.`,
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

This philosophy was put into practice during our School Supplies Drive, where local leaders helped us identify the families most in need, schools opened their doors for distribution events, and parent associations organized follow-up support groups.

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

In our first year, we successfully launched and completed one major project: the School Supplies Drive 2024. Here is a summary of our impact:

Students Supported: 500+
Communities Reached: 5
Items Distributed: 2,000+ notebooks, 1,000+ textbooks, 1,500+ writing materials, 500+ school bags
Total Investment: N2.5M
Partner Organizations: Local schools, community leaders, parent associations

Every naira donated went directly to supporting students. Our operational costs were covered separately by our founding team, ensuring that 100% of donations reached beneficiaries.

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
