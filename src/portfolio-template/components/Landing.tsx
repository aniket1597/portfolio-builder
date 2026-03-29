import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { usePortfolioData } from "../context/PortfolioDataContext";

const Landing = ({ children }: PropsWithChildren) => {
  const data = usePortfolioData();
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I&apos;m</h2>
            <h1>
              {data.firstName.toUpperCase()}
              <br />
              <span>{data.lastName.toUpperCase()}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{data.roleTitle}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{data.roleLabels[0]}</div>
              <div className="landing-h2-2">{data.roleLabels[1]}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{data.roleLabels[1]}</div>
              <div className="landing-h2-info-1">{data.roleLabels[0]}</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
