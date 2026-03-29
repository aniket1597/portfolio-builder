"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PortfolioData } from "@/lib/types";
import { getPortfolio } from "@/lib/storage";
import PortfolioPreview from "@/components/PortfolioPreview";
import Link from "next/link";

// Demo data for /p/demo
const demoData: PortfolioData = {
  fullName: "Alex Johnson",
  tagline: "Full Stack Developer | CS Graduate",
  email: "alex@example.com",
  phone: "+1 555 123 4567",
  github: "https://github.com/alexjohnson",
  linkedin: "https://linkedin.com/in/alexjohnson",
  about:
    "Passionate developer with a love for clean code and innovative solutions. Experienced in building web applications from concept to deployment, with a focus on user experience and performance.",
  technicalSkills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "SQL",
    "Git",
    "AWS",
    "Docker",
  ],
  softSkills: [
    "Problem-solving",
    "Communication",
    "Teamwork",
    "Leadership",
    "Adaptability",
  ],
  projects: [
    {
      title: "TaskFlow - Project Management App",
      url: "https://taskflow.example.com",
      description:
        "A full-stack project management tool built with React and Node.js, featuring real-time collaboration and Kanban boards.",
    },
    {
      title: "WeatherWise",
      url: "https://weatherwise.example.com",
      description:
        "A weather dashboard with 5-day forecasts, location search, and beautiful data visualizations using D3.js.",
    },
    {
      title: "CodeSnippets",
      url: "https://codesnippets.example.com",
      description:
        "A code snippet sharing platform with syntax highlighting, collections, and social features. Built with Next.js and PostgreSQL.",
    },
  ],
  certifications: [
    "AWS Certified Cloud Practitioner",
    "Google UX Design Certificate",
    "freeCodeCamp Full Stack Development",
  ],
  awards: [
    "1st Place - University Hackathon 2024",
    "Dean's List - 4 semesters",
  ],
  address: "San Francisco, CA",
  dob: "15-March-2000",
  nationality: "American",
  hobbies: "Open source contributing, hiking, photography",
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
      <div className="flex min-h-screen items-center justify-center bg-[#e6f0ff]">
        <div className="text-xl font-semibold text-[#007bff]">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#e6f0ff] px-6 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          Portfolio Not Found
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          No portfolio exists for <strong>/{username}</strong>
        </p>
        <Link
          href="/builder"
          className="rounded-xl bg-[#007bff] px-8 py-3 text-lg font-bold text-white shadow-lg transition hover:shadow-xl"
        >
          Create Yours →
        </Link>
      </div>
    );
  }

  return <PortfolioPreview data={data} isPreview={false} />;
}
