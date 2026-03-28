import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-sans",
});

const dmSerif = DM_Serif_Display({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
	variable: "--font-heading",
});

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL || "https://beaconofblessings.org",
	),
	title: {
		default: "Beacon of Blessings — Illuminating Futures Through Education",
		template: "%s | Beacon of Blessings",
	},
	description:
		"Beacon of Blessings Charity Initiative transforms lives through educational support for vulnerable communities in Nigeria. Join us in making a difference.",
	keywords: [
		"charity",
		"non-profit",
		"education",
		"Nigeria",
		"Beacon of Blessings",
		"school supplies",
		"donate",
	],
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName: "Beacon of Blessings",
	},
	twitter: {
		card: "summary_large_image",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta name="theme-color" content="#C05A3C" />
			</head>
			<body
				className={`${inter.variable} ${dmSerif.variable} min-h-screen bg-background font-sans antialiased`}
			>
				<Header />
				<main className="pt-16">{children}</main>
				<Footer />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
