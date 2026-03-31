"use client";

import { lazy, Suspense } from "react";
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
