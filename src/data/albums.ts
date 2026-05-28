export interface AlbumPhoto {
  id: string;
  title: string;
  description?: string;
}

export interface Album {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  photoCount: number;
  photos: AlbumPhoto[];
}

export const albums: Album[] = [
  {
    slug: "school-supplies-drive-2024",
    title: "School Supplies Drive 2024",
    description:
      "Our inaugural education outreach documented in the 2024 first project financial report.",
    category: "Education",
    date: "September 2024",
    photoCount: 8,
    photos: [
      { id: "ssd-1", title: "Students receiving school bags" },
      { id: "ssd-2", title: "Notebook distribution at Lagos Community School" },
      { id: "ssd-3", title: "Team organizing supplies for distribution" },
      { id: "ssd-4", title: "Children with new textbooks" },
      { id: "ssd-5", title: "Community leaders at the distribution event" },
      { id: "ssd-6", title: "Writing materials being packaged" },
      { id: "ssd-7", title: "Group photo with beneficiary students" },
      { id: "ssd-8", title: "Parents and teachers at the ceremony" },
    ],
  },
  {
    slug: "classroom-learning-2024",
    title: "Classroom Learning in Action",
    description:
      "Documenting the impact of our supplies in classrooms across Lagos — students engaged and learning.",
    category: "Education",
    date: "November 2024",
    photoCount: 6,
    photos: [
      { id: "cla-1", title: "Students using donated notebooks in class" },
      { id: "cla-2", title: "Teacher leading a lesson with new materials" },
      { id: "cla-3", title: "Reading session with donated textbooks" },
      { id: "cla-4", title: "Students collaborating on a group project" },
      { id: "cla-5", title: "Library corner set up with donated books" },
      { id: "cla-6", title: "Smiling students with their new school bags" },
    ],
  },
  {
    slug: "community-engagement-2024",
    title: "Community Engagement",
    description:
      "Building relationships with local leaders, schools, and parent associations in our partner communities.",
    category: "Community",
    date: "August 2024",
    photoCount: 5,
    photos: [
      { id: "ce-1", title: "Meeting with community elders" },
      { id: "ce-2", title: "Parent association planning session" },
      { id: "ce-3", title: "School principal discussing needs assessment" },
      { id: "ce-4", title: "Community hall partnership signing" },
      { id: "ce-5", title: "Local leaders welcoming the team" },
    ],
  },
  {
    slug: "founding-team-2024",
    title: "Our Founding Team",
    description:
      "The people behind Beacon of Blessings — our founders, volunteers, and early supporters.",
    category: "Team",
    date: "June 2024",
    photoCount: 4,
    photos: [
      { id: "ft-1", title: "Co-founders Lionel and Grace" },
      { id: "ft-2", title: "First volunteer team meeting" },
      { id: "ft-3", title: "Team planning the supplies drive" },
      { id: "ft-4", title: "Volunteer appreciation gathering" },
    ],
  },
  {
    slug: "impact-stories-2024",
    title: "Impact Stories",
    description:
      "Faces and stories of the children and families whose lives have been touched by your generosity.",
    category: "Impact",
    date: "December 2024",
    photoCount: 6,
    photos: [
      { id: "is-1", title: "Student with her first school bag" },
      { id: "is-2", title: "Family receiving educational support" },
      { id: "is-3", title: "Teacher sharing improvement in attendance" },
      { id: "is-4", title: "Before and after: classroom transformation" },
      { id: "is-5", title: "Student reading from donated textbook" },
      { id: "is-6", title: "Community celebrating the program launch" },
    ],
  },
];

export function getAlbum(slug: string): Album | undefined {
  return albums.find((a) => a.slug === slug);
}

export function getAlbumsByCategory(category: string): Album[] {
  if (category === "all") return albums;
  return albums.filter((a) => a.category === category);
}

export const albumCategories = [
  { value: "all", label: "All" },
  { value: "Education", label: "Education" },
  { value: "Community", label: "Community" },
  { value: "Team", label: "Our Team" },
  { value: "Impact", label: "Impact" },
] as const;
