import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://beaconofblessings.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User"],
        disallow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
