export const siteConfig = {
  name: "Beacon of Blessings",
  tagline: "Illuminating Futures Through Education",
  description:
    "Beacon of Blessings Charity Initiative transforms lives through educational support for vulnerable communities in Nigeria.",
  url: "https://beaconofblessings.org",
  email: "info@beaconofblessings.org",
  phone: "+234 (0) 812 345 6789",
  address: "Lagos, Nigeria",
  officeHours: "Monday - Friday, 9:00 AM - 5:00 PM WAT",
  founded: 2024,
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/beaconofblessings" },
  { label: "Instagram", href: "https://instagram.com/beaconofblessings" },
  { label: "X (Twitter)", href: "https://x.com/beaconofblessings" },
] as const;

export const impactStats = [
  { value: "500+", label: "Students Supported" },
  { value: "5", label: "Communities Reached" },
  { value: "2,000+", label: "Items Distributed" },
  { value: "100%", label: "Community Focused" },
] as const;

export const coreValues = [
  {
    title: "Faith in Action",
    description:
      "We believe faith should be demonstrated through tangible acts of service and compassion.",
    verse: "James 2:17",
  },
  {
    title: "Education First",
    description:
      "We invest in education as the most powerful tool to break cycles of poverty.",
    verse: "Proverbs 22:6",
  },
  {
    title: "Community Partnership",
    description:
      "We work alongside local leaders and families, building lasting relationships.",
    verse: "Ecclesiastes 4:9",
  },
  {
    title: "Transparent Stewardship",
    description:
      "We honor every gift by ensuring resources reach those who need them most.",
    verse: "Luke 16:10",
  },
] as const;
