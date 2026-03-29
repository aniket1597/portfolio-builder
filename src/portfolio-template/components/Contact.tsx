import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { usePortfolioData } from "../context/PortfolioDataContext";

const Contact = () => {
  const data = usePortfolioData();
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${data.email}`} data-cursor="disable">
                {data.email}
              </a>
            </p>
            {data.education && (
              <>
                <h4>Education</h4>
                <p>{data.education}</p>
              </>
            )}
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            {data.contactLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                {link.label} <MdArrowOutward />
              </a>
            ))}
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>{data.fullName}</span>
            </h2>
            <h5>
              <MdCopyright /> {data.copyright}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
