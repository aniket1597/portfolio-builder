"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PortfolioData } from "@/lib/types";
import { getPortfolio } from "@/lib/storage";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PortfolioUserData } from "@/portfolio-template/context/PortfolioDataContext";

// Dynamic import to avoid SSR issues with Three.js/GSAP
const PortfolioTemplate = dynamic(
  () => import("@/portfolio-template/PortfolioTemplate"),
  { ssr: false }
);

// Map builder form data → portfolio template data
function mapToTemplateData(d: PortfolioData): PortfolioUserData {
  const nameParts = d.fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";
  const initials = (firstName[0] || "") + (lastName[0] || "");

  return {
    fullName: d.fullName,
    firstName,
    lastName,
    initials: initials.toUpperCase(),
    roleTitle: d.roleTitle || d.tagline || "",
    roleLabels: [
      d.whatIDo?.[0]?.title || "Developer",
      d.whatIDo?.[1]?.title || "Engineer",
    ],
    email: d.email,
    about: d.about,
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
        ? {
            intro: p.description,
            bullets: [],
            outro: "",
          }
        : undefined,
    })),
    techStackLabels: (d.technicalSkills || []).slice(0, 5).map((skill) => ({
      text: skill.substring(0, 5).toUpperCase(),
      bg: d.accentColor || "#8FAADC",
      fg: "#FFFFFF",
    })),
    socialLinks: [
      ...(d.linkedin
        ? [{ platform: "LinkedIn", url: d.linkedin, icon: "linkedin" }]
        : []),
      ...(d.github
        ? [{ platform: "GitHub", url: d.github, icon: "github" }]
        : []),
    ],
    resumeUrl: undefined,
    contactLinks: [
      ...(d.linkedin
        ? [{ label: "LinkedIn", url: d.linkedin }]
        : []),
      ...(d.github
        ? [{ label: "GitHub", url: d.github }]
        : []),
    ],
    education: d.education?.[0]
      ? `${d.education[0].degree}`
      : d.dob || undefined,
    copyright: new Date().getFullYear().toString(),
    accentColor: d.accentColor || "#5eead4",
    backgroundColor: "#0a0e17",
  };
}

// Demo data
const demoTemplateData: PortfolioUserData = {
  fullName: "Alex Johnson",
  firstName: "Alex",
  lastName: "Johnson",
  initials: "AJ",
  roleTitle: "A Full Stack",
  roleLabels: ["Developer", "Engineer"],
  email: "alex@example.com",
  about:
    "Passionate developer with 5+ years of experience building web applications from concept to deployment. I focus on clean architecture, performance, and user experience. Currently exploring AI/ML integrations and distributed systems.",
  whatIDo: [
    {
      title: "FRONTEND",
      subtitle: "UI/UX Development",
      description:
        "Building responsive, accessible web applications with modern frameworks and design systems.",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Three.js",
        "GSAP",
      ],
    },
    {
      title: "BACKEND",
      subtitle: "API & Infrastructure",
      description:
        "Designing scalable APIs and cloud infrastructure for production workloads.",
      skills: [
        "Node.js",
        "Python",
        "PostgreSQL",
        "AWS",
        "Docker",
        "Kubernetes",
      ],
    },
  ],
  career: [
    {
      role: "Senior Software Engineer",
      company: "TechCorp",
      year: "2022",
      description:
        "Leading frontend architecture for a SaaS platform serving 50k+ users. Reduced load times by 40%.",
    },
    {
      role: "Software Engineer",
      company: "StartupXYZ",
      year: "2020",
      description:
        "Built and shipped 3 major product features. Introduced CI/CD pipelines improving deployment frequency by 5x.",
    },
    {
      role: "Junior Developer",
      company: "WebAgency",
      year: "2018",
      description:
        "Developed client websites and e-commerce platforms. Worked directly with clients on technical solutions.",
    },
  ],
  projects: [
    {
      title: "TaskFlow - Project Management",
      category: "Full Stack Application",
      tools: "React, Node.js, Socket.io, PostgreSQL",
      image: "/images/bdc.png",
      description: {
        intro:
          "A full-stack project management tool with real-time collaboration and Kanban boards.",
        bullets: [
          "Real-time collaboration via WebSocket",
          "Drag-and-drop Kanban interface",
          "Team analytics dashboard",
        ],
        outro: "Serving 5,000+ active users.",
      },
    },
    {
      title: "Technical Skills",
      category: "Core Competencies",
      tools: "",
      image: "/images/tech_skills.png",
      skills: [
        { label: "Frontend", value: "React, Next.js, TypeScript, Three.js" },
        { label: "Backend", value: "Node.js, Python, Go" },
        { label: "Cloud", value: "AWS, GCP, Docker, Kubernetes" },
        { label: "Database", value: "PostgreSQL, MongoDB, Redis" },
      ],
    },
  ],
  techStackLabels: [
    { text: "REACT", bg: "#61DAFB", fg: "#000000" },
    { text: "NODE", bg: "#339933", fg: "#FFFFFF" },
    { text: "AWS", bg: "#FF9900", fg: "#000000" },
    { text: "TS", bg: "#3178C6", fg: "#FFFFFF" },
    { text: "NEXT", bg: "#000000", fg: "#FFFFFF" },
  ],
  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/alexjohnson",
      icon: "linkedin",
    },
    {
      platform: "GitHub",
      url: "https://github.com/alexjohnson",
      icon: "github",
    },
  ],
  contactLinks: [
    { label: "LinkedIn", url: "https://linkedin.com/in/alexjohnson" },
    { label: "GitHub", url: "https://github.com/alexjohnson" },
  ],
  education: "MSc Computer Science",
  copyright: "2026",
  accentColor: "#5eead4",
  backgroundColor: "#0a0e17",
};

export default function PortfolioPage() {
  const params = useParams();
  const username = params.username as string;
  const [templateData, setTemplateData] = useState<PortfolioUserData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (username === "demo") {
      setTemplateData(demoTemplateData);
      setLoading(false);
      return;
    }
    const portfolio = getPortfolio(username);
    if (portfolio) {
      setTemplateData(mapToTemplateData(portfolio));
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }, [username]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0e17]">
        <div className="text-xl font-semibold text-[#5eead4]">Loading...</div>
      </div>
    );
  }

  if (notFound || !templateData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0e17] px-6 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">
          Portfolio Not Found
        </h1>
        <p className="mb-8 text-lg text-gray-400">
          No portfolio exists for{" "}
          <strong className="text-white">/{username}</strong>
        </p>
        <Link
          href="/builder"
          className="rounded-xl bg-[#5eead4] px-8 py-3 text-lg font-bold text-[#0a0e17] shadow-lg transition hover:opacity-90"
        >
          Create Yours →
        </Link>
      </div>
    );
  }

  return <PortfolioTemplate data={templateData} />;
}
