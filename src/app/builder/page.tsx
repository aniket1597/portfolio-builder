"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PortfolioData,
  defaultPortfolio,
  Project,
  CareerEntry,
  WhatIDoEntry,
  Education,
} from "@/lib/types";
import { savePortfolio } from "@/lib/storage";
import { mapToTemplateData } from "@/lib/mapData";
import dynamic from "next/dynamic";

const PortfolioTemplate = dynamic(
  () => import("@/portfolio-template/PortfolioTemplate"),
  { ssr: false }
);

const STEPS = [
  "Basic Info",
  "About",
  "What I Do",
  "Career",
  "Education",
  "Projects",
  "Certifications",
  "Contact & Publish",
];

export default function BuilderPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<PortfolioData>({ ...defaultPortfolio });
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof PortfolioData, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  // Reusable input field
  const InputField = ({
    label,
    field,
    placeholder,
    type = "text",
  }: {
    label: string;
    field: keyof PortfolioData;
    placeholder: string;
    type?: string;
  }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={data[field] as string}
        onChange={(e) => update(field, e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition"
      />
    </div>
  );

  // Chip input
  const ChipInput = ({
    label,
    items,
    field,
  }: {
    label: string;
    items: string[];
    field: keyof PortfolioData;
  }) => {
    const [input, setInput] = useState("");
    return (
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">
          {label}
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 border border-blue-500/30 px-3 py-1 text-xs text-blue-300"
            >
              {item}
              <button
                type="button"
                onClick={() =>
                  update(field, items.filter((_, idx) => idx !== i))
                }
                className="text-blue-400 hover:text-red-400 font-bold ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                e.preventDefault();
                update(field, [...items, input.trim()]);
                setInput("");
              }
            }}
            placeholder="Type and press Enter"
            className="flex-1 rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
          />
          <button
            type="button"
            onClick={() => {
              if (input.trim()) {
                update(field, [...items, input.trim()]);
                setInput("");
              }
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
          >
            Add
          </button>
        </div>
      </div>
    );
  };

  // List input
  const ListInput = ({
    label,
    items,
    field,
  }: {
    label: string;
    items: string[];
    field: keyof PortfolioData;
  }) => {
    const [input, setInput] = useState("");
    return (
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">
          {label}
        </label>
        {items.map((item, i) => (
          <div
            key={i}
            className="mb-1 flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800/30 px-3 py-2 text-sm text-gray-300"
          >
            <span className="flex-1">{item}</span>
            <button
              type="button"
              onClick={() =>
                update(field, items.filter((_, idx) => idx !== i))
              }
              className="text-red-400 hover:text-red-300 font-bold"
            >
              ×
            </button>
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                e.preventDefault();
                update(field, [...items, input.trim()]);
                setInput("");
              }
            }}
            placeholder="Type and press Enter"
            className="flex-1 rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
          />
          <button
            type="button"
            onClick={() => {
              if (input.trim()) {
                update(field, [...items, input.trim()]);
                setInput("");
              }
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
          >
            Add
          </button>
        </div>
      </div>
    );
  };

  // What I Do input
  const WhatIDoInput = () => {
    const [entry, setEntry] = useState<WhatIDoEntry>({
      title: "",
      subtitle: "",
      description: "",
      skills: [],
    });
    const [skillInput, setSkillInput] = useState("");

    return (
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
          Skill Categories
        </label>
        {data.whatIDo.map((item, i) => (
          <div
            key={i}
            className="mb-2 rounded-lg border border-gray-700 bg-gray-800/30 p-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-sm text-white">{item.title}</div>
                <div className="text-xs text-blue-400">{item.subtitle}</div>
                <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.skills.map((s, j) => (
                    <span key={j} className="rounded-full border border-gray-600 px-2 py-0.5 text-[10px] text-gray-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  update("whatIDo", data.whatIDo.filter((_, idx) => idx !== i))
                }
                className="text-red-400 hover:text-red-300 font-bold ml-2"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <div className="space-y-2 rounded-lg border border-dashed border-gray-600 p-3">
          <input
            type="text"
            placeholder='Category title (e.g. "SAP & DATA")'
            value={entry.title}
            onChange={(e) => setEntry({ ...entry, title: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
          />
          <input
            type="text"
            placeholder='Subtitle (e.g. "Data Architecture & Integration")'
            value={entry.subtitle}
            onChange={(e) => setEntry({ ...entry, subtitle: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
          />
          <textarea
            placeholder="Brief description of what you do in this area..."
            value={entry.description}
            onChange={(e) => setEntry({ ...entry, description: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
            rows={2}
          />
          <div className="flex flex-wrap gap-1.5 mb-1">
            {entry.skills.map((s, j) => (
              <span key={j} className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] text-blue-300">
                {s}
                <button
                  type="button"
                  onClick={() =>
                    setEntry({ ...entry, skills: entry.skills.filter((_, idx) => idx !== j) })
                  }
                  className="text-blue-400 hover:text-red-400 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add skill tag..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && skillInput.trim()) {
                  e.preventDefault();
                  setEntry({ ...entry, skills: [...entry.skills, skillInput.trim()] });
                  setSkillInput("");
                }
              }}
              className="flex-1 rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
            />
            <button
              type="button"
              onClick={() => {
                if (skillInput.trim()) {
                  setEntry({ ...entry, skills: [...entry.skills, skillInput.trim()] });
                  setSkillInput("");
                }
              }}
              className="rounded-lg bg-gray-700 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-600 transition"
            >
              + Tag
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              if (entry.title.trim()) {
                update("whatIDo", [...data.whatIDo, { ...entry }]);
                setEntry({ title: "", subtitle: "", description: "", skills: [] });
              }
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
          >
            + Add Category
          </button>
        </div>
      </div>
    );
  };

  // Career input
  const CareerInput = () => {
    const [entry, setEntry] = useState<CareerEntry>({
      role: "",
      company: "",
      year: "",
      description: "",
    });

    return (
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
          Work Experience
        </label>
        {data.career.map((item, i) => (
          <div
            key={i}
            className="mb-2 rounded-lg border border-gray-700 bg-gray-800/30 p-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-sm text-white">{item.role}</div>
                <div className="text-xs text-gray-400">{item.company} · {item.year}</div>
                <div className="text-xs text-gray-500 mt-1">{item.description}</div>
              </div>
              <button
                type="button"
                onClick={() =>
                  update("career", data.career.filter((_, idx) => idx !== i))
                }
                className="text-red-400 hover:text-red-300 font-bold ml-2"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <div className="space-y-2 rounded-lg border border-dashed border-gray-600 p-3">
          <input
            type="text"
            placeholder="Job title / Role"
            value={entry.role}
            onChange={(e) => setEntry({ ...entry, role: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
          />
          <input
            type="text"
            placeholder="Company name"
            value={entry.company}
            onChange={(e) => setEntry({ ...entry, company: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
          />
          <input
            type="text"
            placeholder="Year (e.g. 2021)"
            value={entry.year}
            onChange={(e) => setEntry({ ...entry, year: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
          />
          <textarea
            placeholder="Brief description of your role..."
            value={entry.description}
            onChange={(e) => setEntry({ ...entry, description: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
            rows={2}
          />
          <button
            type="button"
            onClick={() => {
              if (entry.role.trim()) {
                update("career", [...data.career, { ...entry }]);
                setEntry({ role: "", company: "", year: "", description: "" });
              }
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
          >
            + Add Experience
          </button>
        </div>
      </div>
    );
  };

  // Education input
  const EducationInput = () => {
    const [entry, setEntry] = useState<Education>({
      degree: "",
      institution: "",
      year: "",
    });

    return (
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
          Education
        </label>
        {data.education.map((item, i) => (
          <div
            key={i}
            className="mb-2 rounded-lg border border-gray-700 bg-gray-800/30 p-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-sm text-white">{item.degree}</div>
                <div className="text-xs text-gray-400">{item.institution} · {item.year}</div>
              </div>
              <button
                type="button"
                onClick={() =>
                  update("education", data.education.filter((_, idx) => idx !== i))
                }
                className="text-red-400 hover:text-red-300 font-bold ml-2"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <div className="space-y-2 rounded-lg border border-dashed border-gray-600 p-3">
          <input
            type="text"
            placeholder="Degree / Certificate"
            value={entry.degree}
            onChange={(e) => setEntry({ ...entry, degree: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
          />
          <input
            type="text"
            placeholder="Institution"
            value={entry.institution}
            onChange={(e) => setEntry({ ...entry, institution: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
          />
          <input
            type="text"
            placeholder="Year (e.g. 2020)"
            value={entry.year}
            onChange={(e) => setEntry({ ...entry, year: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
          />
          <button
            type="button"
            onClick={() => {
              if (entry.degree.trim()) {
                update("education", [...data.education, { ...entry }]);
                setEntry({ degree: "", institution: "", year: "" });
              }
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
          >
            + Add Education
          </button>
        </div>
      </div>
    );
  };

  // Project input
  const ProjectInput = () => {
    const [proj, setProj] = useState<Project>({
      title: "",
      url: "",
      description: "",
      tools: "",
    });
    return (
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
          Projects
        </label>
        {data.projects.map((p, i) => (
          <div
            key={i}
            className="mb-2 rounded-lg border border-gray-700 bg-gray-800/30 p-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-sm text-white">{p.title}</div>
                <div className="text-xs text-gray-500">{p.url}</div>
                <div className="text-xs text-gray-400 mt-1">{p.description}</div>
                {p.tools && (
                  <div className="text-xs text-blue-400 mt-1">{p.tools}</div>
                )}
              </div>
              <button
                type="button"
                onClick={() =>
                  update("projects", data.projects.filter((_, idx) => idx !== i))
                }
                className="text-red-400 hover:text-red-300 font-bold ml-2"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <div className="space-y-2 rounded-lg border border-dashed border-gray-600 p-3">
          <input
            type="text"
            placeholder="Project title"
            value={proj.title}
            onChange={(e) => setProj({ ...proj, title: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
          />
          <input
            type="text"
            placeholder="Project URL (optional)"
            value={proj.url}
            onChange={(e) => setProj({ ...proj, url: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
          />
          <textarea
            placeholder="Short description"
            value={proj.description}
            onChange={(e) => setProj({ ...proj, description: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
            rows={2}
          />
          <input
            type="text"
            placeholder="Tools & technologies used"
            value={proj.tools}
            onChange={(e) => setProj({ ...proj, tools: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
          />
          <button
            type="button"
            onClick={() => {
              if (proj.title.trim()) {
                update("projects", [...data.projects, { ...proj }]);
                setProj({ title: "", url: "", description: "", tools: "" });
              }
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
          >
            + Add Project
          </button>
        </div>
      </div>
    );
  };

  const handlePublish = () => {
    setError("");
    if (!data.fullName.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (!data.username.trim()) {
      setError("Please choose a username");
      return;
    }
    if (!/^[a-z0-9-]+$/i.test(data.username)) {
      setError("Username can only contain letters, numbers, and dashes");
      return;
    }
    savePortfolio(data);
    router.push(`/p/${data.username.toLowerCase()}`);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <InputField label="Full Name *" field="fullName" placeholder="Aniket Agrawal" />
            <InputField label="Role / Title" field="roleTitle" placeholder="Cloud Integration Architect" />
            <InputField label="Tagline" field="tagline" placeholder="SAP Consultant | Data Architect" />
            <InputField label="Email" field="email" placeholder="you@example.com" type="email" />
            <InputField label="Phone" field="phone" placeholder="+353 1 234 5678" />
            <InputField label="GitHub URL" field="github" placeholder="https://github.com/username" />
            <InputField label="LinkedIn URL" field="linkedin" placeholder="https://linkedin.com/in/username" />
          </div>
        );
      case 1:
        return (
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">
              About You
            </label>
            <textarea
              value={data.about}
              onChange={(e) => update("about", e.target.value)}
              placeholder="Write a compelling summary about yourself, your expertise, and what drives you..."
              className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
              rows={8}
            />
          </div>
        );
      case 2:
        return <WhatIDoInput />;
      case 3:
        return <CareerInput />;
      case 4:
        return <EducationInput />;
      case 5:
        return <ProjectInput />;
      case 6:
        return (
          <div className="space-y-6">
            <ListInput label="Certifications & Workshops" items={data.certifications} field="certifications" />
            <ListInput label="Awards & Achievements" items={data.awards} field="awards" />
            <ChipInput label="Technical Skills" items={data.technicalSkills} field="technicalSkills" />
            <ChipInput label="Soft Skills" items={data.softSkills} field="softSkills" />
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <InputField label="Location" field="address" placeholder="Dublin, Ireland" />
            <InputField label="Education Highlight" field="dob" placeholder="MSc in Cloud Computing" />
            <InputField label="Nationality" field="nationality" placeholder="Indian" />
            <InputField label="Languages" field="languages" placeholder="English, Hindi" />
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">
                Accent Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.accentColor}
                  onChange={(e) => update("accentColor", e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-gray-700 bg-transparent"
                />
                <span className="text-sm text-gray-400">{data.accentColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">
                Username *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">portfolioforge.com/p/</span>
                <input
                  type="text"
                  value={data.username}
                  onChange={(e) =>
                    update("username", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                  }
                  placeholder="yourname"
                  className="flex-1 rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-white/5 bg-[#0a0a0a] px-4 py-3">
        <a href="/" className="text-lg font-bold text-white">
          ⚡ <span className="text-blue-400">PortfolioForge</span>
        </a>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white md:hidden hover:bg-blue-500 transition"
        >
          {showPreview ? "Edit" : "Preview"}
        </button>
      </header>

      <div className="flex flex-1">
        {/* Form panel */}
        <div
          className={`w-full overflow-y-auto p-6 md:w-1/2 ${showPreview ? "hidden md:block" : ""}`}
        >
          {/* Step indicators */}
          <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition ${
                  i === step
                    ? "bg-blue-600 text-white"
                    : i < step
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-gray-800 text-gray-500 border border-gray-700"
                }`}
              >
                {i + 1}. {s}
              </button>
            ))}
          </div>

          <h2 className="mb-4 text-xl font-bold text-white">{STEPS[step]}</h2>

          {renderStep()}

          {error && (
            <p className="mt-3 text-sm font-medium text-red-400">{error}</p>
          )}

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={step === 0}
              className="rounded-lg border border-gray-700 px-5 py-2 text-sm font-semibold text-gray-400 hover:bg-gray-800 disabled:opacity-30 transition"
            >
              ← Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-green-500 shadow-lg shadow-green-500/20 transition"
              >
                🚀 Publish Portfolio
              </button>
            )}
          </div>
        </div>

        {/* Preview panel - renders the REAL 3D portfolio template */}
        <div
          className={`w-full border-l border-white/5 md:block md:w-1/2 ${showPreview ? "" : "hidden"}`}
        >
          <div className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a] px-4 py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Live Preview — Exactly how your portfolio will look
          </div>
          <div className="h-[calc(100vh-110px)] overflow-y-auto bg-[#0a0e17]">
            <div style={{ transform: "scale(1)", transformOrigin: "top left", width: "100%", minHeight: "100%" }}>
              <PortfolioTemplate data={mapToTemplateData(data)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
