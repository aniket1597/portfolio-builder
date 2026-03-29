export interface Project {
  title: string;
  url: string;
  description: string;
}

export interface PortfolioData {
  // Basic Info
  fullName: string;
  tagline: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;

  // About
  about: string;

  // Skills
  technicalSkills: string[];
  softSkills: string[];

  // Projects
  projects: Project[];

  // Certifications & Awards
  certifications: string[];
  awards: string[];

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
  email: "",
  phone: "",
  github: "",
  linkedin: "",
  about: "",
  technicalSkills: [],
  softSkills: [],
  projects: [],
  certifications: [],
  awards: [],
  address: "",
  dob: "",
  nationality: "",
  hobbies: "",
  languages: "",
  accentColor: "#007bff",
  username: "",
};
