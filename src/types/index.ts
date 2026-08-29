export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  published: boolean;
  coverImage?: string;
  createdAt?: unknown; // Firestore Timestamp
  updatedAt?: unknown;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  experience?: string;
  projects?: string;
  status?: string;
  professionalBiography?: string;
  coreExpertise?: string[];
  linkedinUrl?: string;
  imageUrl?: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  keyChallenges?: string[];
  sustainableFeatures?: string[];
  images: string[];
  featuredImage?: string;
  featured: boolean;
  completionDate?: string;
  client?: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  projectType: string;
  budget: string;
  messageDetails: string;
  read: boolean;
  createdAt: unknown;
}

export interface SiteStats {
  projectsCompleted: string;
  happyFamilies: string;
  awardsWon: string;
  yearFounded: string;
}
