"use client";

import { lazy, Suspense, useEffect } from "react";
import "./index.css";
import "./App.css";
import { LoadingProvider } from "./context/LoadingProvider";
import { PortfolioDataProvider, PortfolioUserData } from "./context/PortfolioDataContext";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));

interface Props {
  data: PortfolioUserData;
}

const PortfolioTemplate = ({ data }: Props) => {
  useEffect(() => {
    // Apply template-specific styles to body when portfolio is mounted
    const body = document.body;
    const html = document.documentElement;
    
    // Store original styles
    const origBodyClass = body.className;
    const origBodyStyle = body.getAttribute("style") || "";
    
    // Set template styles
    body.style.overflow = "hidden";
    body.style.margin = "0";
    body.style.height = "auto";
    body.style.backgroundColor = "#050810";
    body.style.maxWidth = "100vw";
    body.style.overflowX = "hidden";
    body.style.setProperty("--cWidth", "calc(100% - 30px)");
    body.style.setProperty("--cMaxWidth", "1920px");
    
    html.style.setProperty("--accentColor", data.accentColor || "#5eead4");
    html.style.setProperty("--backgroundColor", data.backgroundColor || "#0a0e17");
    html.style.setProperty("--vh", "100svh");
    html.style.fontFamily = '"Geist", sans-serif';
    html.style.color = "#eae5ec";
    html.style.backgroundColor = data.backgroundColor || "#0a0e17";
    html.style.setProperty("user-select", "none");

    // Override Tailwind resets for template
    if (window.innerWidth >= 768) {
      body.style.setProperty("--cWidth", "94%");
    }
    
    return () => {
      // Restore original styles on unmount
      body.className = origBodyClass;
      body.setAttribute("style", origBodyStyle);
    };
  }, [data.accentColor, data.backgroundColor]);

  return (
    <PortfolioDataProvider data={data}>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </PortfolioDataProvider>
  );
};

export default PortfolioTemplate;
