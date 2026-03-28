import { createClient, type SanityClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";
const apiVersion = process.env.SANITY_API_VERSION ?? "2024-01-01";

/**
 * Whether Sanity is configured. When false, the app falls back to static data.
 */
export const isSanityConfigured = Boolean(projectId);

let _client: SanityClient | null = null;

export function getSanityClient(): SanityClient {
  if (!projectId) {
    throw new Error(
      "SANITY_PROJECT_ID is not set. Sanity CMS is not configured.",
    );
  }

  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
    });
  }

  return _client;
}
