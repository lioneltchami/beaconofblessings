/**
 * Sanity Schema Definitions
 *
 * These schemas define the content model in Sanity Studio.
 * To use them:
 * 1. Create a Sanity project at sanity.io
 * 2. Initialize Sanity Studio (npx sanity@latest init)
 * 3. Copy these schema files into your Studio project
 * 4. Set SANITY_PROJECT_ID and SANITY_DATASET in .env.local
 */

export { album } from "./album";
export { blogPost } from "./blog-post";
export { coreValue } from "./core-value";
export { founder } from "./founder";
export { galleryItem } from "./gallery-item";
export { impactStat } from "./impact-stat";
export {
  aboutPage,
  contactPage,
  donatePage,
  galleryPage,
  homePage,
  impactPage,
  projectsPage,
  programsPage,
  resourcesPage,
  transparencyPage,
} from "./pages";
export { program } from "./program";
export { project } from "./project";
export { resource } from "./resource";
export { siteConfig } from "./site-config";
