export type GalleryCategory =
  | "all"
  | "education"
  | "community"
  | "events"
  | "team"
  | "impact";

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: Exclude<GalleryCategory, "all">;
  date: string;
}

export const galleryCategories: { value: GalleryCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "education", label: "Education" },
  { value: "community", label: "Community" },
  { value: "events", label: "Events" },
  { value: "team", label: "Our Team" },
  { value: "impact", label: "Impact" },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "classroom-learning",
    title: "Classroom Learning in Action",
    description:
      "Students engaging with new learning materials during a morning session at a Lagos community school.",
    category: "education",
    date: "November 2024",
  },
  {
    id: "supply-distribution",
    title: "School Supply Distribution Day",
    description:
      "Volunteers handing out notebooks, pens, and school bags to over 100 students in the Ajegunle community.",
    category: "events",
    date: "October 2024",
  },
  {
    id: "community-meeting",
    title: "Community Leaders Meeting",
    description:
      "Planning session with local leaders to identify the most urgent educational needs in their neighborhoods.",
    category: "community",
    date: "September 2024",
  },
  {
    id: "founding-team",
    title: "Our Founding Team",
    description:
      "The dedicated group of volunteers who came together to launch Beacon of Blessings in 2024.",
    category: "team",
    date: "August 2024",
  },
  {
    id: "children-reading",
    title: "Children Discovering Books",
    description:
      "Young readers exploring donated books at a pop-up reading corner in a community center.",
    category: "education",
    date: "November 2024",
  },
  {
    id: "first-drive-results",
    title: "First Supply Drive Results",
    description:
      "Over 2,000 items collected and sorted, ready for distribution to five Lagos communities.",
    category: "impact",
    date: "October 2024",
  },
  {
    id: "volunteer-training",
    title: "Volunteer Training Session",
    description:
      "New volunteers learning about our mission, values, and community engagement approach.",
    category: "team",
    date: "September 2024",
  },
  {
    id: "parent-workshop",
    title: "Parent Education Workshop",
    description:
      "A workshop helping parents understand how to support their children's learning at home.",
    category: "community",
    date: "November 2024",
  },
  {
    id: "student-smiles",
    title: "Smiles That Tell the Story",
    description:
      "Students proudly showing off their new school supplies on the first day of the term.",
    category: "impact",
    date: "October 2024",
  },
  {
    id: "inauguration-event",
    title: "Official Inauguration Ceremony",
    description:
      "The launch event where Beacon of Blessings was formally introduced to community partners and supporters.",
    category: "events",
    date: "August 2024",
  },
  {
    id: "digital-learning-prep",
    title: "Preparing for Digital Learning",
    description:
      "Setting up tablets and educational software for our upcoming digital literacy program.",
    category: "education",
    date: "December 2024",
  },
  {
    id: "gratitude-wall",
    title: "Thank You Letters from Students",
    description:
      "A collection of heartfelt letters written by students to their sponsors and supporters.",
    category: "impact",
    date: "December 2024",
  },
];
