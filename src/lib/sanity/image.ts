import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { getSanityClient, isSanityConfigured } from "./client";

function getBuilder() {
	if (!isSanityConfigured) return null;
	return imageUrlBuilder(getSanityClient());
}

export function urlFor(source: SanityImageSource) {
	const builder = getBuilder();
	if (!builder) return null;
	return builder.image(source);
}
