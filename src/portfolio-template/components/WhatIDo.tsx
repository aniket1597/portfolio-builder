import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioData } from "../context/PortfolioDataContext";

const WhatIDo = () => {
  const data = usePortfolioData();
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    const containers = containerRef.current;
    const handlers = containers.map((container) => {
      if (!container) return null;
      return () => handleClick(container);
    });

    if (ScrollTrigger.isTouch) {
      containers.forEach((container, index) => {
        if (container) {
          const handler = handlers[index];
          if (handler) {
            container.classList.remove("what-noTouch");
            container.addEventListener("click", handler);
          }
        }
      });
    }
    return () => {
      containers.forEach((container, index) => {
        if (container) {
          const handler = handlers[index];
          if (handler) {
            container.removeEventListener("click", handler);
          }
        }
      });
    };
  }, []);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>
          {data.whatIDo.map((item, index) => (
            <div
              key={index}
              className="what-content what-noTouch"
              ref={(el) => setRef(el, index)}
            >
              <div className="what-border1">
                <svg height="100%">
                  <line x1="0" y1={index === 0 ? "0" : "100%"} x2="100%" y2={index === 0 ? "0" : "100%"} stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                  {index === 0 && (
                    <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                  )}
                </svg>
              </div>
              <div className="what-corner"></div>
              <div className="what-content-in">
                <h3>{item.title}</h3>
                <h4>{item.subtitle}</h4>
                <p>{item.description}</p>
                <h5>Skillset &amp; tools</h5>
                <div className="what-content-flex">
                  {item.skills.map((skill, i) => (
                    <div key={i} className="what-tags">{skill}</div>
                  ))}
                </div>
                <div className="what-arrow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
