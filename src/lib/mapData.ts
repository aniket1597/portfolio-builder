import { PortfolioData } from "./types";
import { PortfolioUserData } from "@/portfolio-template/context/PortfolioDataContext";

export function mapToTemplateData(d: PortfolioData): PortfolioUserData {
  const nameParts = d.fullName.trim().split(" ");
  const firstName = nameParts[0] || "Your";
  const lastName = nameParts.slice(1).join(" ") || "Name";
  const initials = (firstName[0] || "") + (lastName[0] || "");

  return {
    fullName: d.fullName || "Your Name",
    firstName,
    lastName,
    initials: initials.toUpperCase() || "YN",
    roleTitle: d.roleTitle || d.tagline || "Your Role",
    roleLabels: [
      d.whatIDo?.[0]?.title || "Developer",
      d.whatIDo?.[1]?.title || "Engineer",
    ],
    email: d.email || "you@example.com",
    about: d.about || "",
    whatIDo: (d.whatIDo || []).map((w) => ({
      title: w.title,
      subtitle: w.subtitle,
      description: w.description,
      skills: w.skills,
    })),
    career: (d.career || []).map((c) => ({
      role: c.role,
      company: c.company,
      year: c.year,
      description: c.description,
    })),
    projects: (d.projects || []).map((p, i) => ({
      title: p.title,
      category: p.tools || "",
      tools: p.tools || "",
      image: `/images/placeholder-${(i % 3) + 1}.png`,
      description: p.description
        ? { intro: p.description, bullets: [], outro: "" }
        : undefined,
    })),
    techStackLabels: (d.technicalSkills || []).slice(0, 5).map((skill) => ({
      text: skill.substring(0, 5).toUpperCase(),
      bg: d.accentColor || "#8FAADC",
      fg: "#FFFFFF",
    })),
    socialLinks: [
      ...(d.linkedin ? [{ platform: "LinkedIn", url: d.linkedin, icon: "linkedin" }] : []),
      ...(d.github ? [{ platform: "GitHub", url: d.github, icon: "github" }] : []),
    ],
    resumeUrl: undefined,
    contactLinks: [
      ...(d.linkedin ? [{ label: "LinkedIn", url: d.linkedin }] : []),
      ...(d.github ? [{ label: "GitHub", url: d.github }] : []),
    ],
    education: d.education?.[0] ? d.education[0].degree : d.dob || undefined,
    copyright: new Date().getFullYear().toString(),
    accentColor: d.accentColor || "#5eead4",
    backgroundColor: "#0a0e17",
  };
}
