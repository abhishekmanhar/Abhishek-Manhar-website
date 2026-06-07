export interface Project {
  id: string;
  number: string;
  year: string;
  title: string;
  tags: string[];
  shortDescription: string;
  discipline: string;
  role: string;
  timeline: string;
  fullDescription: string;
  slug: string;
  thumbnail: string;
  challenges?: string[];
  solutions?: string[];
  techStack?: string[];
  githubLink?: string;
  websiteLink?: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  skillsBuilt?: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "graphic" | "painting";
  image: string;
  description: string;
  aspect?: string;
}
