export interface Project {
  title: string;
  url: string;
  description: string;
  tools: string;
}

export interface CareerEntry {
  role: string;
  company: string;
  year: string;
  description: string;
}

export interface WhatIDoEntry {
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface PortfolioData {
  // Basic Info
  fullName: string;
  tagline: string;
  roleTitle: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;

  // About
  about: string;

  // What I Do
  whatIDo: WhatIDoEntry[];

  // Career
  career: CareerEntry[];

  // Education
  education: Education[];

  // Skills
  technicalSkills: string[];
  softSkills: string[];

  // Projects
  projects: Project[];

  // Certifications & Awards
  certifications: string[];
  awards: string[];

  // Social
  socialLinks: SocialLink[];

  // Contact
  address: string;
  dob: string;
  nationality: string;
  hobbies: string;
  languages: string;

  // Customization
  accentColor: string;
  username: string;
}

export const defaultPortfolio: PortfolioData = {
  fullName: "",
  tagline: "",
  roleTitle: "",
  email: "",
  phone: "",
  github: "",
  linkedin: "",
  about: "",
  whatIDo: [],
  career: [],
  education: [],
  technicalSkills: [],
  softSkills: [],
  projects: [],
  certifications: [],
  awards: [],
  socialLinks: [],
  address: "",
  dob: "",
  nationality: "",
  hobbies: "",
  languages: "",
  accentColor: "#007bff",
  username: "",
};
