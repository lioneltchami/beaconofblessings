import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/ui/Chatbot";
import SkipToContent from "@/components/ui/SkipToContent";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { OrganizationStructuredData, DonationStructuredData } from "@/components/seo/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Beacon of Blessings Charity Initiative - Sharing God's Love Through Service",
  description: "A Christian nonprofit organization based in Nigeria, sharing the love of Jesus Christ through educational support, school supplies, and compassionate care for vulnerable communities. Founded by Lionel Tchami and Grace Kure.",
  keywords: ["charity", "nonprofit", "Nigeria", "education", "Christian", "school supplies", "donation", "Jesus", "blessing", "vulnerable communities"],
  authors: [{ name: "Beacon of Blessings Charity Initiative" }],
  creator: "Beacon of Blessings Charity Initiative",
  metadataBase: new URL("https://beaconofblessings.org"),
  openGraph: {
    title: "Beacon of Blessings Charity Initiative",
    description: "Sharing the love of Jesus Christ through educational support and compassionate care for vulnerable communities in Nigeria.",
    url: "https://beaconofblessings.org",
    siteName: "Beacon of Blessings Charity Initiative",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beacon of Blessings Charity Initiative",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beacon of Blessings Charity Initiative",
    description: "Sharing the love of Jesus Christ through educational support for vulnerable communities in Nigeria.",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#22c55e" />
        <OrganizationStructuredData />
        <DonationStructuredData />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col"
      >
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <Analytics />
        <SpeedInsights />
        <SkipToContent />
        <Header />
        <main id="main-content" className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
