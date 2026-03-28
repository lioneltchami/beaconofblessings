import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
        <meta name="theme-color" content="#9333ea" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
