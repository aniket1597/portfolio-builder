export type Project = {
  title: string;
  category: string;
  tools: string;
  image: string;
  description?: {
    intro: string;
    bullets: string[];
    outro: string;
  };
  skills?: { label: string; value: string }[];
};

// This is now just the type export — actual data comes from PortfolioDataContext
// Kept for backward compatibility with Work.tsx imports
export const projects: Project[] = [];
