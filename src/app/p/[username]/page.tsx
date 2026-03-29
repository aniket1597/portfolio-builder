"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PortfolioData } from "@/lib/types";
import { getPortfolio } from "@/lib/storage";
import PortfolioPreview from "@/components/PortfolioPreview";
import Link from "next/link";

const demoData: PortfolioData = {
  fullName: "Alex Johnson",
  tagline: "Full Stack Developer | CS Graduate",
  roleTitle: "Senior Software Engineer",
  email: "alex@example.com",
  phone: "+1 555 123 4567",
  github: "https://github.com/alexjohnson",
  linkedin: "https://linkedin.com/in/alexjohnson",
  about:
    "Passionate developer with 5+ years of experience building web applications from concept to deployment. I focus on clean architecture, performance, and user experience. Currently exploring AI/ML integrations and distributed systems.",
  whatIDo: [
    {
      title: "FRONTEND",
      subtitle: "UI/UX Development",
      description: "Building responsive, accessible web applications with modern frameworks and design systems.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      title: "BACKEND",
      subtitle: "API & Infrastructure",
      description: "Designing scalable APIs and cloud infrastructure for production workloads.",
      skills: ["Node.js", "Python", "PostgreSQL", "AWS", "Docker", "Kubernetes"],
    },
  ],
  career: [
    {
      role: "Senior Software Engineer",
      company: "TechCorp",
      year: "2022",
      description: "Leading frontend architecture for a SaaS platform serving 50k+ users. Reduced load times by 40% through code splitting and caching strategies.",
    },
    {
      role: "Software Engineer",
      company: "StartupXYZ",
      year: "2020",
      description: "Built and shipped 3 major product features. Introduced CI/CD pipelines and automated testing, improving deployment frequency by 5x.",
    },
    {
      role: "Junior Developer",
      company: "WebAgency",
      year: "2018",
      description: "Developed client websites and e-commerce platforms. Worked directly with clients to translate requirements into technical solutions.",
    },
  ],
  education: [
    {
      degree: "MSc Computer Science",
      institution: "Stanford University",
      year: "2020",
    },
    {
      degree: "BSc Computer Science",
      institution: "UC Berkeley",
      year: "2018",
    },
  ],
  technicalSkills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "SQL", "Git", "AWS", "Docker"],
  softSkills: ["Problem-solving", "Communication", "Teamwork", "Leadership"],
  projects: [
    {
      title: "TaskFlow - Project Management App",
      url: "https://taskflow.example.com",
      description: "A full-stack project management tool with real-time collaboration, Kanban boards, and team analytics.",
      tools: "React, Node.js, Socket.io, PostgreSQL",
    },
    {
      title: "WeatherWise",
      url: "https://weatherwise.example.com",
      description: "Weather dashboard with 5-day forecasts, location search, and data visualizations.",
      tools: "Next.js, D3.js, OpenWeather API",
    },
    {
      title: "CodeSnippets",
      url: "",
      description: "A code snippet sharing platform with syntax highlighting, collections, and social features.",
      tools: "Next.js, PostgreSQL, Prisma, Tailwind",
    },
  ],
  certifications: [
    "AWS Certified Solutions Architect",
    "Google UX Design Certificate",
  ],
  awards: [
    "1st Place - University Hackathon 2024",
    "Dean's List - 4 semesters",
  ],
  socialLinks: [],
  address: "San Francisco, CA",
  dob: "",
  nationality: "American",
  hobbies: "",
  languages: "English, Spanish",
  accentColor: "#007bff",
  username: "demo",
};

export default function PortfolioPage() {
  const params = useParams();
  const username = params.username as string;
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username === "demo") {
      setData(demoData);
      setLoading(false);
      return;
    }
    const portfolio = getPortfolio(username);
    setData(portfolio);
    setLoading(false);
  }, [username]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="text-xl font-semibold text-blue-400">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">
          Portfolio Not Found
        </h1>
        <p className="mb-8 text-lg text-gray-400">
          No portfolio exists for <strong className="text-white">/{username}</strong>
        </p>
        <Link
          href="/builder"
          className="rounded-xl bg-blue-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition hover:bg-blue-500"
        >
          Create Yours →
        </Link>
      </div>
    );
  }

  return <PortfolioPreview data={data} isPreview={false} />;
}
