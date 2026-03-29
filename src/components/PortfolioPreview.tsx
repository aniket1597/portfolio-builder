"use client";

import { PortfolioData } from "@/lib/types";

interface Props {
  data: PortfolioData;
  isPreview?: boolean;
}

export default function PortfolioPreview({ data, isPreview = false }: Props) {
  const accent = data.accentColor || "#007bff";
  const name = data.fullName || "Your Name";
  const tagline = data.tagline || "Your Tagline";

  return (
    <div
      className={`bg-[#e6f0ff] text-[#111] font-sans ${isPreview ? "text-[10px] sm:text-xs" : "text-base"}`}
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: accent }}
      >
        <span className="font-bold text-white">
          {data.fullName?.split(" ")[0] || "Portfolio"}
        </span>
        {!isPreview && (
          <nav className="hidden gap-3 md:flex">
            {["About", "Skills", "Projects", "Certifications", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-white/90 hover:text-white"
                >
                  {item}
                </a>
              )
            )}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section
        className={`relative flex flex-col items-center justify-center text-center text-white overflow-hidden ${isPreview ? "py-8" : "min-h-screen py-20"}`}
        style={{
          background: `linear-gradient(to bottom right, ${accent}, ${accent}99)`,
        }}
      >
        <div className="relative z-10">
          <h1
            className={`font-bold ${isPreview ? "text-lg" : "text-4xl md:text-6xl"}`}
          >
            {name}
          </h1>
          <p
            className={`mt-2 text-white/80 ${isPreview ? "text-xs" : "text-lg md:text-xl"}`}
          >
            {tagline}
          </p>

          {/* Social Icons */}
          <div className={`mt-4 flex items-center justify-center gap-3 ${isPreview ? "text-sm" : "text-xl"}`}>
            {data.email && (
              <a href={`mailto:${data.email}`} className="text-white hover:scale-110 transition">
                ✉️
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" className="text-white hover:scale-110 transition">
                🐙
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" className="text-white hover:scale-110 transition">
                💼
              </a>
            )}
          </div>

          {!isPreview && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                onClick={() => document.body.classList.toggle("dark")}
                className="rounded px-3 py-1.5 text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition"
              >
                Toggle Dark Mode
              </button>
            </div>
          )}
        </div>

        {/* Pulse circle */}
        <div
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-10 animate-pulse"
          style={{ backgroundColor: "white" }}
        />
      </section>

      {/* About */}
      {data.about && (
        <section
          id="about"
          className={`mx-auto max-w-3xl ${isPreview ? "p-3" : "px-6 py-16"}`}
        >
          <h2
            className={`font-bold ${isPreview ? "text-sm mb-1" : "text-2xl md:text-3xl mb-4"}`}
            style={{ color: accent }}
          >
            Career Objective
          </h2>
          <p className={`leading-relaxed text-[#333] ${isPreview ? "" : "text-lg"}`}>
            {data.about}
          </p>
        </section>
      )}

      {/* Skills */}
      {(data.technicalSkills.length > 0 || data.softSkills.length > 0) && (
        <section
          id="skills"
          className={`mx-auto max-w-3xl ${isPreview ? "p-3" : "px-6 py-16"}`}
        >
          {data.technicalSkills.length > 0 && (
            <>
              <h2
                className={`font-bold ${isPreview ? "text-sm mb-1" : "text-2xl md:text-3xl mb-4"}`}
                style={{ color: accent }}
              >
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {data.technicalSkills.map((skill, i) => (
                  <span
                    key={i}
                    className={`rounded-full text-white font-medium ${isPreview ? "px-2 py-0.5 text-[8px]" : "px-3 py-1 text-sm"}`}
                    style={{ backgroundColor: accent }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}
          {data.softSkills.length > 0 && (
            <>
              <h2
                className={`font-bold ${isPreview ? "text-sm mb-1 mt-2" : "text-2xl md:text-3xl mb-4 mt-8"}`}
                style={{ color: accent }}
              >
                Soft Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.softSkills.map((skill, i) => (
                  <span
                    key={i}
                    className={`rounded-full border font-medium ${isPreview ? "px-2 py-0.5 text-[8px]" : "px-3 py-1 text-sm"}`}
                    style={{ borderColor: accent, color: accent }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section
          id="projects"
          className={`mx-auto max-w-3xl ${isPreview ? "p-3" : "px-6 py-16"}`}
        >
          <h2
            className={`font-bold ${isPreview ? "text-sm mb-1" : "text-2xl md:text-3xl mb-6"}`}
            style={{ color: accent }}
          >
            Projects
          </h2>
          <div className={`grid gap-4 ${isPreview ? "" : "md:grid-cols-2"}`}>
            {data.projects.map((project, i) => (
              <div
                key={i}
                className={`rounded-xl border bg-white shadow-sm ${isPreview ? "p-2" : "p-5"}`}
              >
                <h3 className={`font-bold ${isPreview ? "text-xs" : "text-lg"}`}>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      style={{ color: accent }}
                      className="hover:underline"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className={`mt-1 text-gray-600 ${isPreview ? "text-[8px]" : "text-sm"}`}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {(data.certifications.length > 0 || data.awards.length > 0) && (
        <section
          id="certifications"
          className={`mx-auto max-w-3xl ${isPreview ? "p-3" : "px-6 py-16"}`}
        >
          {data.certifications.length > 0 && (
            <>
              <h2
                className={`font-bold ${isPreview ? "text-sm mb-1" : "text-2xl md:text-3xl mb-4"}`}
                style={{ color: accent }}
              >
                Certifications & Workshops
              </h2>
              <ul className={`list-disc pl-5 space-y-1 ${isPreview ? "" : "text-lg"}`}>
                {data.certifications.map((cert, i) => (
                  <li key={i}>{cert}</li>
                ))}
              </ul>
            </>
          )}
          {data.awards.length > 0 && (
            <>
              <h2
                className={`font-bold ${isPreview ? "text-sm mb-1 mt-2" : "text-2xl md:text-3xl mb-4 mt-8"}`}
                style={{ color: accent }}
              >
                Awards & Achievements
              </h2>
              <ul className={`list-disc pl-5 space-y-1 ${isPreview ? "" : "text-lg"}`}>
                {data.awards.map((award, i) => (
                  <li key={i}>{award}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      {/* Contact */}
      {(data.email || data.phone || data.address) && (
        <section
          id="contact"
          className={`mx-auto max-w-3xl ${isPreview ? "p-3" : "px-6 py-16"}`}
        >
          <h2
            className={`font-bold ${isPreview ? "text-sm mb-1" : "text-2xl md:text-3xl mb-4"}`}
            style={{ color: accent }}
          >
            Contact
          </h2>
          <ul className={`space-y-1 ${isPreview ? "" : "text-lg"}`}>
            {data.email && <li>📧 {data.email}</li>}
            {data.phone && <li>📱 {data.phone}</li>}
            {data.address && <li>📍 {data.address}</li>}
            {data.dob && <li>🎂 {data.dob}</li>}
            {data.nationality && <li>🌍 {data.nationality}</li>}
            {data.hobbies && <li>🎯 {data.hobbies}</li>}
            {data.languages && <li>🗣️ {data.languages}</li>}
          </ul>
        </section>
      )}

      {/* Footer */}
      <footer
        className={`text-center text-white/70 ${isPreview ? "py-2 text-[8px]" : "py-8 text-sm"}`}
        style={{ backgroundColor: accent }}
      >
        Built with PortfolioForge ⚡
      </footer>
    </div>
  );
}
