import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
} from "react-icons/fa6";
import { SiSap } from "react-icons/si";
import { MdLanguage } from "react-icons/md";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { usePortfolioData } from "../context/PortfolioDataContext";

const iconMap: Record<string, React.ReactNode> = {
  linkedin: <FaLinkedinIn />,
  github: <FaGithub />,
  twitter: <FaTwitter />,
  sap: <SiSap />,
  default: <MdLanguage />,
};

const SocialIcons = () => {
  const data = usePortfolioData();

  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        {data.socialLinks.map((link, i) => (
          <span key={i}>
            <a href={link.url} target="_blank">
              {iconMap[link.icon] || iconMap.default}
            </a>
          </span>
        ))}
      </div>
      {data.resumeUrl && (
        <a className="resume-button" href={data.resumeUrl} download target="_blank">
          <HoverLinks text="RESUME" />
          <span>
            <TbNotes />
          </span>
        </a>
      )}
    </div>
  );
};

export default SocialIcons;
