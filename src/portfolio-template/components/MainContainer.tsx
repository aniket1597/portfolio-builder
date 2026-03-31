import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import Cursor from "./Cursor";
import setSplitText from "./utils/splitText";
import { usePortfolioData } from "../context/PortfolioDataContext";

const About = lazy(() => import("./About"));
const WhatIDo = lazy(() => import("./WhatIDo"));
const Career = lazy(() => import("./Career"));
const Work = lazy(() => import("./Work"));
const Contact = lazy(() => import("./Contact"));
const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const data = usePortfolioData();
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    // Set CSS variables from user data
    document.documentElement.style.setProperty('--accentColor', data.accentColor);
    document.documentElement.style.setProperty('--backgroundColor', data.backgroundColor);
    
    let resizeTimer: number;
    const resizeHandler = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setSplitText();
        setIsDesktopView(window.innerWidth > 1024);
      }, 250); // Debounce resize for 250ms
    };
    
    // Initial call
    setSplitText();
    
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      clearTimeout(resizeTimer);
    };
  }, [data.accentColor, data.backgroundColor]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <Suspense fallback={null}>
              <About />
              <WhatIDo />
              <Career />
              <Work />
              {isDesktopView && <TechStack />}
              <Contact />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

