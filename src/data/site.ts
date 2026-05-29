export const siteConfig = {
  name: "Beacon of Blessings",
  tagline: "Illuminating Futures Through Education",
  description:
    "Beacon of Blessings Charity Initiative helps children in vulnerable Nigerian communities stay in school through supplies, scholarships, digital learning, and local partnerships.",
  url: "https://www.blessedbeaconcharity.org",
  email: "info@blessedbeaconcharity.org",
  phone: "+234 (0) 812 345 6789",
  address: "Lagos, Nigeria",
  officeHours: "Monday - Friday, 9:00 AM - 5:00 PM WAT",
  founded: 2024,
  legalName: "Beacon of Blessings Charity Initiative",
  registrationStatus:
    "Registered with the Corporate Affairs Commission (CAC), registration number 8271788",
  serviceArea: "Lagos communities, Nigeria",
} as const;

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "Partners", href: "/partner-with-us" },
  { label: "Transparency", href: "/transparency" },
  { label: "Stories", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerTrustLinks = [
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "Annual Reports", href: "/resources" },
  { label: "Financials", href: "/transparency#financials" },
  { label: "Donor Data", href: "/privacy#donor-data" },
  { label: "Registration Status", href: "/transparency#registration" },
] as const;

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/beaconofblessings" },
  { label: "Instagram", href: "https://instagram.com/beaconofblessings" },
  { label: "X (Twitter)", href: "https://x.com/beaconofblessings" },
] as const;

export const impactStats = [
  { value: "92+", label: "Children Equipped" },
  { value: "96", label: "Sandals Purchased" },
  { value: "N1.37M", label: "First Project Spend" },
  { value: "2024", label: "First Field Project" },
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
