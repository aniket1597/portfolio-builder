"use client";

import { createContext, useContext, PropsWithChildren } from "react";

// The shape of user-provided portfolio data
export interface PortfolioUserData {
  fullName: string;
  firstName: string;
  lastName: string;
  initials: string;
  roleTitle: string; // e.g. "A Cloud Integration"
  roleLabels: [string, string]; // rotating labels e.g. ["Architect", "SAP Consultant"]
  email: string;
  about: string;
  whatIDo: {
    title: string;
    subtitle: string;
    description: string;
    skills: string[];
  }[];
  career: {
    role: string;
    company: string;
    year: string;
    description: string;
  }[];
  projects: {
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
  }[];
  techStackLabels: { text: string; bg: string; fg: string }[];
  socialLinks: { platform: string; url: string; icon: string }[];
  resumeUrl?: string;
  contactLinks: { label: string; url: string }[];
  education?: string;
  copyright: string;
  accentColor: string;
  backgroundColor: string;
}

const PortfolioDataContext = createContext<PortfolioUserData | null>(null);

export const PortfolioDataProvider = ({
  data,
  children,
}: PropsWithChildren<{ data: PortfolioUserData }>) => {
  return (
    <PortfolioDataContext.Provider value={data}>
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const ctx = useContext(PortfolioDataContext);
  if (!ctx) throw new Error("usePortfolioData must be used within PortfolioDataProvider");
  return ctx;
};
