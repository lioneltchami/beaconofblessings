import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
	title: "Terms of Service",
	description: `Terms of Service for ${siteConfig.name}. Please read these terms carefully before using our website.`,
};

const lastUpdated = "March 2026";

export default function TermsOfServicePage() {
	return (
		<div className="flex flex-col">
			{/* Hero */}
			<section className="relative bg-[#8B3A24] py-20 md:py-28">
				<div className="mx-auto max-w-4xl px-4 text-center">
					<h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
						Terms of Service
					</h1>
					<p className="mt-4 text-[#FDF2EE]/70">Last updated: {lastUpdated}</p>
				</div>
			</section>

			{/* Content */}
			<section className="bg-[#FAF6F1] py-16 md:py-24">
				<div className="mx-auto max-w-3xl px-4">
					<div className="prose prose-neutral max-w-none space-y-8 text-foreground">
						<p className="text-lg text-muted-foreground">
							Welcome to {siteConfig.name}. By accessing or using our website at{" "}
							<a
								href={siteConfig.url}
								className="font-medium text-primary hover:underline"
							>
								{siteConfig.url}
							</a>
							, you agree to be bound by these Terms of Service. If you do not
							agree to these terms, please do not use our website.
						</p>

						<Separator />

						<section>
							<h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
								Acceptance of Terms
							</h2>
							<p className="text-muted-foreground">
								By accessing, browsing, or using this website, you acknowledge
								that you have read, understood, and agree to be bound by these
								Terms of Service and our{" "}
								<a
									href="/privacy"
									className="font-medium text-primary hover:underline"
								>
									Privacy Policy
								</a>
								. These terms apply to all visitors, users, donors, and
								volunteers who access or use the website.
							</p>
						</section>

						<Separator />

						<section>
							<h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
								Use of Website
							</h2>
							<p className="mb-3 text-muted-foreground">
								You agree to use this website only for lawful purposes and in a
								manner that does not infringe the rights of, restrict, or
								inhibit anyone else&apos;s use and enjoyment of the website.
								Prohibited conduct includes but is not limited to:
							</p>
							<ul className="list-inside list-disc space-y-2 text-muted-foreground">
								<li>
									Using the website in any way that violates applicable local,
									national, or international law.
								</li>
								<li>
									Attempting to gain unauthorized access to any part of the
									website or its related systems.
								</li>
								<li>
									Transmitting any harmful, threatening, abusive, or otherwise
									objectionable material.
								</li>
								<li>
									Using automated tools to scrape, crawl, or extract data from
									the website without written permission.
								</li>
							</ul>
						</section>

						<Separator />

						<section>
							<h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
								Donations
							</h2>
							<p className="mb-3 text-muted-foreground">
								All donations made through our website are voluntary and
								processed by secure third-party payment providers. By making a
								donation, you agree to the following:
							</p>
							<ul className="list-inside list-disc space-y-2 text-muted-foreground">
								<li>
									Donations are generally non-refundable. If you believe a
									donation was made in error, please contact us within 7 days at{" "}
									<a
										href={`mailto:${siteConfig.email}`}
										className="font-medium text-primary hover:underline"
									>
										{siteConfig.email}
									</a>{" "}
									and we will review your request on a case-by-case basis.
								</li>
								<li>
									We reserve the right to allocate donations to the programs and
									initiatives where they are most needed, unless a specific
									designation is agreed upon in writing.
								</li>
								<li>
									Donation receipts will be provided for tax purposes where
									applicable.
								</li>
							</ul>
						</section>

						<Separator />

						<section>
							<h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
								Intellectual Property
							</h2>
							<p className="text-muted-foreground">
								All content on this website, including but not limited to text,
								images, logos, graphics, videos, and design elements, is the
								property of {siteConfig.name} or its licensors and is protected
								by applicable copyright and intellectual property laws. You may
								not reproduce, distribute, modify, or create derivative works
								from any content without our prior written consent.
							</p>
						</section>

						<Separator />

						<section>
							<h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
								Limitation of Liability
							</h2>
							<p className="text-muted-foreground">
								To the fullest extent permitted by applicable law,{" "}
								{siteConfig.name}, its directors, officers, volunteers, and
								partners shall not be liable for any indirect, incidental,
								special, consequential, or punitive damages arising out of your
								access to or use of (or inability to access or use) the website.
								This includes, without limitation, any errors or omissions in
								content, loss of data, or any other loss or damage of any kind.
							</p>
						</section>

						<Separator />

						<section>
							<h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
								Disclaimer
							</h2>
							<p className="text-muted-foreground">
								The information on this website is provided on an &quot;as
								is&quot; and &quot;as available&quot; basis without any
								warranties, express or implied. We do not warrant that the
								website will be uninterrupted, error-free, or free of viruses or
								other harmful components. We make no representations about the
								accuracy or completeness of the content on the website.
							</p>
						</section>

						<Separator />

						<section>
							<h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
								Governing Law
							</h2>
							<p className="text-muted-foreground">
								These Terms of Service shall be governed by and construed in
								accordance with the laws of the Federal Republic of Nigeria. Any
								disputes arising from or related to the use of this website
								shall be subject to the exclusive jurisdiction of the courts of
								Nigeria.
							</p>
						</section>

						<Separator />

						<section>
							<h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
								Changes to These Terms
							</h2>
							<p className="text-muted-foreground">
								We reserve the right to modify or replace these Terms of Service
								at any time. Changes will be effective immediately upon posting
								to this page. Your continued use of the website after any
								changes constitutes acceptance of the new terms. We encourage
								you to review these terms periodically.
							</p>
						</section>

						<Separator />

						<section>
							<h2 className="font-heading mb-3 text-2xl font-bold tracking-tight text-[#8B3A24]">
								Contact Us
							</h2>
							<p className="text-muted-foreground">
								If you have any questions about these Terms of Service, please
								contact us at:
							</p>
							<div className="mt-3 rounded-lg border bg-[#FDF2EE] p-4 text-sm">
								<p className="font-semibold">{siteConfig.name}</p>
								<p className="text-muted-foreground">
									Email:{" "}
									<a
										href={`mailto:${siteConfig.email}`}
										className="font-medium text-primary hover:underline"
									>
										{siteConfig.email}
									</a>
								</p>
								<p className="text-muted-foreground">
									Address: {siteConfig.address}
								</p>
							</div>
						</section>
					</div>
				</div>
			</section>
		</div>
	);
}
