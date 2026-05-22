import type { NextConfig } from "next";
import path from "node:path";

const securityHeaders = [
	{ key: "X-Frame-Options", value: "DENY" },
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=()",
	},
	{
		key: "Strict-Transport-Security",
		value: "max-age=31536000; includeSubDomains",
	},
];

const nextConfig: NextConfig = {
	outputFileTracingRoot: path.join(process.cwd()),
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
			{
				protocol: "https",
				hostname: "images.pexels.com",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
		];
	},
};

export default nextConfig;
