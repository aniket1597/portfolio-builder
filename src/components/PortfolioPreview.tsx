"use client";

import { PortfolioData } from "@/lib/types";
import { MdArrowOutward, MdCopyright } from "react-icons/md";

interface Props {
  data: PortfolioData;
  isPreview?: boolean;
}

export default function PortfolioPreview({ data, isPreview = false }: Props) {
  const accent = data.accentColor || "#007bff";
  const name = data.fullName || "Your Name";
  const firstName = name.split(" ")[0] || "Your";
  const lastName = name.split(" ").slice(1).join(" ") || "Name";

  const px = isPreview ? "px-3" : "px-6 md:px-16 lg:px-24";
  const sectionPy = isPreview ? "py-4" : "py-16 md:py-24";

  return (
    <div
      className="min-h-full w-full"
      style={{
        background: "#0a0a0a",
        color: "#e0e0e0",
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontSize: isPreview ? "10px" : undefined,
      }}
    >
      {/* Navbar */}
      {!isPreview && (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-white/5">
          <span className="text-lg font-bold tracking-wider text-white">
            {firstName.toUpperCase()}
          </span>
          <div className="hidden md:flex items-center gap-8">
            {["About", "Skills", "Career", "Work", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Landing Section */}
      <section
        className={`relative flex flex-col justify-center ${isPreview ? "py-8 px-3" : "min-h-screen px-8 md:px-16 lg:px-24 pt-24"}`}
      >
        <div>
          <h2
            className={`font-light tracking-wide ${isPreview ? "text-[10px] mb-1" : "text-lg md:text-xl mb-4"}`}
            style={{ color: accent }}
          >
            Hello! I&apos;m
          </h2>
          <h1
            className={`font-bold leading-[0.9] tracking-tighter text-white ${isPreview ? "text-xl" : "text-5xl md:text-7xl lg:text-8xl"}`}
          >
            {firstName.toUpperCase()}
            <br />
            <span style={{ color: accent }}>{lastName.toUpperCase()}</span>
          </h1>
          {data.roleTitle && (
            <div className={`${isPreview ? "mt-2" : "mt-6 md:mt-10"}`}>
              <h3
                className={`font-light text-gray-400 ${isPreview ? "text-[9px]" : "text-lg md:text-xl"}`}
              >
                {data.roleTitle}
              </h3>
            </div>
          )}
          {data.tagline && (
            <p
              className={`text-gray-500 ${isPreview ? "text-[8px] mt-1" : "text-base md:text-lg mt-2"}`}
            >
              {data.tagline}
            </p>
          )}
        </div>
      </section>

      {/* About Section */}
      {data.about && (
        <section id="about" className={`${px} ${sectionPy}`}>
          <h3
            className={`font-medium uppercase tracking-widest ${isPreview ? "text-[9px] mb-2" : "text-sm mb-6"}`}
            style={{ color: accent }}
          >
            About Me
          </h3>
          <p
            className={`leading-relaxed text-gray-300 max-w-3xl ${isPreview ? "text-[9px]" : "text-base md:text-lg"}`}
          >
            {data.about}
          </p>
        </section>
      )}

      {/* What I Do Section */}
      {data.whatIDo && data.whatIDo.length > 0 && (
        <section id="skills" className={`${px} ${sectionPy}`}>
          <h3
            className={`font-medium uppercase tracking-widest ${isPreview ? "text-[9px] mb-2" : "text-sm mb-8"}`}
            style={{ color: accent }}
          >
            What I Do
          </h3>
          <div className={`grid gap-4 ${isPreview ? "" : "md:grid-cols-2 gap-6"}`}>
            {data.whatIDo.map((item, i) => (
              <div
                key={i}
                className={`border border-white/10 rounded-lg hover:border-white/20 transition-colors ${isPreview ? "p-2" : "p-6 md:p-8"}`}
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <h4
                  className={`font-bold text-white ${isPreview ? "text-[10px]" : "text-lg"}`}
                >
                  {item.title}
                </h4>
                <h5
                  className={`font-light ${isPreview ? "text-[8px] mt-0.5" : "text-sm mt-1"}`}
                  style={{ color: accent }}
                >
                  {item.subtitle}
                </h5>
                {item.description && (
                  <p
                    className={`text-gray-400 ${isPreview ? "text-[8px] mt-1" : "text-sm mt-3"}`}
                  >
                    {item.description}
                  </p>
                )}
                {item.skills.length > 0 && (
                  <div className={`flex flex-wrap gap-1.5 ${isPreview ? "mt-1.5" : "mt-4"}`}>
                    {item.skills.map((skill, j) => (
                      <span
                        key={j}
                        className={`rounded-full border border-white/20 text-gray-300 ${isPreview ? "px-1.5 py-0.5 text-[7px]" : "px-3 py-1 text-xs"}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Career Section */}
      {data.career && data.career.length > 0 && (
        <section id="career" className={`${px} ${sectionPy}`}>
          <h3
            className={`font-medium uppercase tracking-widest ${isPreview ? "text-[9px] mb-2" : "text-sm mb-8"}`}
            style={{ color: accent }}
          >
            Career & Experience
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div
              className={`absolute left-0 top-0 bottom-0 ${isPreview ? "w-[1px]" : "w-[2px]"}`}
              style={{ background: `${accent}33` }}
            />
            <div className={`space-y-${isPreview ? "3" : "8"}`}>
              {data.career.map((entry, i) => (
                <div
                  key={i}
                  className={`relative ${isPreview ? "pl-4" : "pl-8 md:pl-12"}`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute ${isPreview ? "left-[-2px] w-[5px] h-[5px]" : "left-[-5px] w-3 h-3"} rounded-full top-1`}
                    style={{ background: accent }}
                  />
                  <div className={`flex items-start justify-between ${isPreview ? "gap-2" : "gap-4"}`}>
                    <div className="flex-1">
                      <h4
                        className={`font-semibold text-white ${isPreview ? "text-[9px]" : "text-base md:text-lg"}`}
                      >
                        {entry.role}
                      </h4>
                      <h5
                        className={`text-gray-400 ${isPreview ? "text-[8px]" : "text-sm"}`}
                      >
                        {entry.company}
                      </h5>
                      {entry.description && (
                        <p
                          className={`text-gray-500 ${isPreview ? "text-[7px] mt-0.5" : "text-sm mt-2"}`}
                        >
                          {entry.description}
                        </p>
                      )}
                    </div>
                    <span
                      className={`font-bold shrink-0 ${isPreview ? "text-[9px]" : "text-lg"}`}
                      style={{ color: accent }}
                    >
                      {entry.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className={`${px} ${sectionPy}`}>
          <h3
            className={`font-medium uppercase tracking-widest ${isPreview ? "text-[9px] mb-2" : "text-sm mb-8"}`}
            style={{ color: accent }}
          >
            Education
          </h3>
          <div className={`space-y-${isPreview ? "2" : "6"}`}>
            {data.education.map((edu, i) => (
              <div
                key={i}
                className={`flex items-start justify-between border-b border-white/5 ${isPreview ? "pb-2" : "pb-6"}`}
              >
                <div>
                  <h4
                    className={`font-semibold text-white ${isPreview ? "text-[9px]" : "text-base md:text-lg"}`}
                  >
                    {edu.degree}
                  </h4>
                  <h5
                    className={`text-gray-400 ${isPreview ? "text-[8px]" : "text-sm"}`}
                  >
                    {edu.institution}
                  </h5>
                </div>
                <span
                  className={`font-bold shrink-0 ${isPreview ? "text-[9px]" : "text-lg"}`}
                  style={{ color: accent }}
                >
                  {edu.year}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects / Work Section */}
      {data.projects.length > 0 && (
        <section id="work" className={`${px} ${sectionPy}`}>
          <h3
            className={`font-medium uppercase tracking-widest ${isPreview ? "text-[9px] mb-2" : "text-sm mb-8"}`}
            style={{ color: accent }}
          >
            My Work
          </h3>
          <div className={`grid gap-4 ${isPreview ? "" : "md:grid-cols-2 gap-6"}`}>
            {data.projects.map((project, i) => (
              <div
                key={i}
                className={`group border border-white/10 rounded-lg hover:border-white/25 transition-all duration-300 ${isPreview ? "p-2" : "p-6"}`}
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`font-bold ${isPreview ? "text-[8px]" : "text-sm"}`}
                    style={{ color: `${accent}88` }}
                  >
                    0{i + 1}
                  </span>
                  {project.url && !isPreview && (
                    <a
                      href={project.url}
                      target="_blank"
                      className="text-gray-500 hover:text-white transition-colors"
                    >
                      <MdArrowOutward />
                    </a>
                  )}
                </div>
                <h4
                  className={`font-bold text-white ${isPreview ? "text-[9px] mt-1" : "text-lg mt-2"}`}
                >
                  {project.title}
                </h4>
                {project.description && (
                  <p
                    className={`text-gray-400 ${isPreview ? "text-[7px] mt-0.5" : "text-sm mt-2"}`}
                  >
                    {project.description}
                  </p>
                )}
                {project.tools && (
                  <p
                    className={`${isPreview ? "text-[7px] mt-1" : "text-xs mt-3"}`}
                    style={{ color: accent }}
                  >
                    {project.tools}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Awards */}
      {(data.certifications.length > 0 || data.awards.length > 0) && (
        <section className={`${px} ${sectionPy}`}>
          {data.certifications.length > 0 && (
            <>
              <h3
                className={`font-medium uppercase tracking-widest ${isPreview ? "text-[9px] mb-2" : "text-sm mb-6"}`}
                style={{ color: accent }}
              >
                Certifications
              </h3>
              <div className={`space-y-${isPreview ? "1" : "3"} ${isPreview ? "mb-3" : "mb-12"}`}>
                {data.certifications.map((cert, i) => (
                  <div
                    key={i}
                    className={`border-b border-white/5 ${isPreview ? "pb-1 text-[8px]" : "pb-3 text-base"} text-gray-300`}
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </>
          )}
          {data.awards.length > 0 && (
            <>
              <h3
                className={`font-medium uppercase tracking-widest ${isPreview ? "text-[9px] mb-2" : "text-sm mb-6"}`}
                style={{ color: accent }}
              >
                Awards & Achievements
              </h3>
              <div className={`space-y-${isPreview ? "1" : "3"}`}>
                {data.awards.map((award, i) => (
                  <div
                    key={i}
                    className={`border-b border-white/5 ${isPreview ? "pb-1 text-[8px]" : "pb-3 text-base"} text-gray-300`}
                  >
                    {award}
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className={`${px} ${sectionPy}`}>
        <h3
          className={`font-medium uppercase tracking-widest ${isPreview ? "text-[9px] mb-2" : "text-sm mb-8"}`}
          style={{ color: accent }}
        >
          Contact
        </h3>
        <div className={`grid gap-4 ${isPreview ? "" : "md:grid-cols-2 gap-8"}`}>
          <div>
            {data.email && (
              <div className={`${isPreview ? "mb-1.5" : "mb-4"}`}>
                <h4
                  className={`text-gray-500 uppercase tracking-wider ${isPreview ? "text-[7px] mb-0.5" : "text-xs mb-1"}`}
                >
                  Email
                </h4>
                <a
                  href={`mailto:${data.email}`}
                  className={`text-white hover:underline ${isPreview ? "text-[9px]" : "text-base"}`}
                >
                  {data.email}
                </a>
              </div>
            )}
            {data.phone && (
              <div className={`${isPreview ? "mb-1.5" : "mb-4"}`}>
                <h4
                  className={`text-gray-500 uppercase tracking-wider ${isPreview ? "text-[7px] mb-0.5" : "text-xs mb-1"}`}
                >
                  Phone
                </h4>
                <p className={`text-white ${isPreview ? "text-[9px]" : "text-base"}`}>
                  {data.phone}
                </p>
              </div>
            )}
            {data.address && (
              <div className={`${isPreview ? "mb-1.5" : "mb-4"}`}>
                <h4
                  className={`text-gray-500 uppercase tracking-wider ${isPreview ? "text-[7px] mb-0.5" : "text-xs mb-1"}`}
                >
                  Location
                </h4>
                <p className={`text-white ${isPreview ? "text-[9px]" : "text-base"}`}>
                  {data.address}
                </p>
              </div>
            )}
          </div>
          <div>
            <h4
              className={`text-gray-500 uppercase tracking-wider ${isPreview ? "text-[7px] mb-1" : "text-xs mb-3"}`}
            >
              Social
            </h4>
            <div className={`flex flex-col ${isPreview ? "gap-0.5" : "gap-2"}`}>
              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  className={`text-white hover:underline inline-flex items-center gap-1 ${isPreview ? "text-[8px]" : "text-sm"}`}
                >
                  GitHub <MdArrowOutward className={isPreview ? "text-[8px]" : "text-xs"} />
                </a>
              )}
              {data.linkedin && (
                <a
                  href={data.linkedin}
                  target="_blank"
                  className={`text-white hover:underline inline-flex items-center gap-1 ${isPreview ? "text-[8px]" : "text-sm"}`}
                >
                  LinkedIn <MdArrowOutward className={isPreview ? "text-[8px]" : "text-xs"} />
                </a>
              )}
              {data.socialLinks?.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  className={`text-white hover:underline inline-flex items-center gap-1 ${isPreview ? "text-[8px]" : "text-sm"}`}
                >
                  {link.platform} <MdArrowOutward className={isPreview ? "text-[8px]" : "text-xs"} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t border-white/5 text-center ${isPreview ? "py-3 px-3" : "py-8 px-6"}`}
      >
        <p className={`text-gray-600 ${isPreview ? "text-[7px]" : "text-sm"}`}>
          Designed and Developed by <span className="text-white">{name}</span>
        </p>
        <p className={`text-gray-700 inline-flex items-center gap-1 ${isPreview ? "text-[7px] mt-0.5" : "text-xs mt-1"}`}>
          <MdCopyright /> {new Date().getFullYear()} &middot; Built with{" "}
          <a href="/" className="hover:text-white transition-colors" style={{ color: accent }}>
            PortfolioForge
          </a>
        </p>
      </footer>
    </div>
  );
}
