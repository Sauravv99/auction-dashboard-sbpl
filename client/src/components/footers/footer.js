import React from "react";
import bannerSrc from "../../assests/images/sbpl-logo-1.jpg";
import "./footer.css";

const FooterComponent = ({ showApp, setshowApp }) => {
  return (
    <div className="">
      <footer className="landing-footer">
        <div className="footer-organizers">
          <div className="footer-heading">Organized by</div>
          <ul className="organizer-list">
            <li>1. Organizer Name One</li>
            <li>2. Organizer Name Two</li>
            <li>3. Organizer Name Three</li>
            <li>4. Organizer Name Four</li>
            <li>5. Organizer Name Five</li>
          </ul>
        </div>

        <div className="footer-divider" />

        <div className="footer-credits">
          <span className="credits-label">Designed &amp; Developed by</span>
          <span className="credits-name">Saurav Nitin Trivedi</span>
        </div>
      </footer>
    </div>
  );
};

export default FooterComponent;
