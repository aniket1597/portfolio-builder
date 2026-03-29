import "./styles/About.css";
import { usePortfolioData } from "../context/PortfolioDataContext";

const About = () => {
  const data = usePortfolioData();
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          {data.about}
        </p>
      </div>
    </div>
  );
};

export default About;
