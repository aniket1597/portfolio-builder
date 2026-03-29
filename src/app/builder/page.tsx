"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PortfolioData, defaultPortfolio, Project } from "@/lib/types";
import { savePortfolio, usernameExists } from "@/lib/storage";
import PortfolioPreview from "@/components/PortfolioPreview";

const STEPS = [
  "Basic Info",
  "About",
  "Skills",
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

  // Helpers
  const update = (field: keyof PortfolioData, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  // Chip input handler
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
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          {label}
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
            >
              {item}
              <button
                type="button"
                onClick={() =>
                  update(
                    field,
                    items.filter((_, idx) => idx !== i)
                  )
                }
                className="text-blue-500 hover:text-red-500 font-bold"
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
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              if (input.trim()) {
                update(field, [...items, input.trim()]);
                setInput("");
              }
            }}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    );
  };

  // Project input handler
  const ProjectInput = () => {
    const [proj, setProj] = useState<Project>({
      title: "",
      url: "",
      description: "",
    });
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Projects
        </label>
        {data.projects.map((p, i) => (
          <div
            key={i}
            className="mb-2 flex items-start gap-2 rounded-lg border bg-gray-50 p-3"
          >
            <div className="flex-1">
              <div className="font-semibold text-sm">{p.title}</div>
              <div className="text-xs text-gray-500">{p.url}</div>
              <div className="text-xs text-gray-600 mt-1">{p.description}</div>
            </div>
            <button
              type="button"
              onClick={() =>
                update(
                  "projects",
                  data.projects.filter((_, idx) => idx !== i)
                )
              }
              className="text-red-400 hover:text-red-600 font-bold"
            >
              ×
            </button>
          </div>
        ))}
        <div className="space-y-2 rounded-lg border border-dashed border-gray-300 p-3">
          <input
            type="text"
            placeholder="Project title"
            value={proj.title}
            onChange={(e) => setProj({ ...proj, title: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Project URL (optional)"
            value={proj.url}
            onChange={(e) => setProj({ ...proj, url: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <textarea
            placeholder="Short description"
            value={proj.description}
            onChange={(e) => setProj({ ...proj, description: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            rows={2}
          />
          <button
            type="button"
            onClick={() => {
              if (proj.title.trim()) {
                update("projects", [...data.projects, { ...proj }]);
                setProj({ title: "", url: "", description: "" });
              }
            }}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
          >
            + Add Project
          </button>
        </div>
      </div>
    );
  };

  // List input (for certs/awards)
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
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          {label}
        </label>
        {items.map((item, i) => (
          <div
            key={i}
            className="mb-1 flex items-center gap-2 rounded bg-gray-50 px-3 py-1.5 text-sm"
          >
            <span className="flex-1">{item}</span>
            <button
              type="button"
              onClick={() =>
                update(
                  field,
                  items.filter((_, idx) => idx !== i)
                )
              }
              className="text-red-400 hover:text-red-600 font-bold"
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
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              if (input.trim()) {
                update(field, [...items, input.trim()]);
                setInput("");
              }
            }}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
          >
            Add
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
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={data[field] as string}
        onChange={(e) => update(field, e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
  );

  // Step content
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <InputField
              label="Full Name *"
              field="fullName"
              placeholder="John Doe"
            />
            <InputField
              label="Title / Tagline"
              field="tagline"
              placeholder="Full Stack Developer | B.Tech (CS)"
            />
            <InputField
              label="Email"
              field="email"
              placeholder="john@example.com"
              type="email"
            />
            <InputField
              label="Phone"
              field="phone"
              placeholder="+1 234 567 8900"
            />
            <InputField
              label="GitHub URL"
              field="github"
              placeholder="https://github.com/johndoe"
            />
            <InputField
              label="LinkedIn URL"
              field="linkedin"
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
        );
      case 1:
        return (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Career Objective / About You
            </label>
            <textarea
              value={data.about}
              onChange={(e) => update("about", e.target.value)}
              placeholder="Write a brief summary about yourself, your goals, and what you're looking for..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              rows={6}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <ChipInput
              label="Technical Skills"
              items={data.technicalSkills}
              field="technicalSkills"
            />
            <ChipInput
              label="Soft Skills"
              items={data.softSkills}
              field="softSkills"
            />
          </div>
        );
      case 3:
        return <ProjectInput />;
      case 4:
        return (
          <div className="space-y-6">
            <ListInput
              label="Certifications & Workshops"
              items={data.certifications}
              field="certifications"
            />
            <ListInput
              label="Awards & Achievements"
              items={data.awards}
              field="awards"
            />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <InputField
              label="Address"
              field="address"
              placeholder="City, Country"
            />
            <InputField
              label="Date of Birth"
              field="dob"
              placeholder="10-June-2000"
            />
            <InputField
              label="Nationality"
              field="nationality"
              placeholder="Indian"
            />
            <InputField
              label="Hobbies"
              field="hobbies"
              placeholder="Playing chess, reading"
            />
            <InputField
              label="Languages"
              field="languages"
              placeholder="English, Hindi"
            />
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Accent Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.accentColor}
                  onChange={(e) => update("accentColor", e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border"
                />
                <span className="text-sm text-gray-500">
                  {data.accentColor}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Username *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  portfolioforge.com/p/
                </span>
                <input
                  type="text"
                  value={data.username}
                  onChange={(e) =>
                    update("username", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                  }
                  placeholder="johndoe"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b bg-white px-4 py-3 shadow-sm">
        <a href="/" className="text-lg font-bold text-[#007bff]">
          ⚡ PortfolioForge
        </a>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white md:hidden"
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
          <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition ${
                  i === step
                    ? "bg-blue-500 text-white"
                    : i < step
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {i + 1}. {s}
              </button>
            ))}
          </div>

          <h2 className="mb-4 text-xl font-bold text-gray-800">
            {STEPS[step]}
          </h2>

          {renderStep()}

          {error && (
            <p className="mt-3 text-sm font-medium text-red-500">{error}</p>
          )}

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={step === 0}
              className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-30"
            >
              ← Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="rounded-lg bg-green-500 px-6 py-2 text-sm font-bold text-white hover:bg-green-600 shadow-lg"
              >
                🚀 Publish Portfolio
              </button>
            )}
          </div>
        </div>

        {/* Preview panel */}
        <div
          className={`w-full border-l bg-white md:block md:w-1/2 ${showPreview ? "" : "hidden"}`}
        >
          <div className="sticky top-0 border-b bg-gray-100 px-4 py-2 text-center text-xs font-semibold text-gray-500">
            LIVE PREVIEW
          </div>
          <div className="h-[calc(100vh-110px)] overflow-y-auto">
            <PortfolioPreview data={data} isPreview={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
