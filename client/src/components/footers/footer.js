import React from "react";
import bannerSrc from "../../assests/images/sbpl-logo-1.jpg";
import sauravAvatar from "../../assests/images/saurav.jpg";
import "./footer.css";

const FooterComponent = ({ showApp, setshowApp }) => {
  return (
    <div className="">
      <footer className="landing-footer">
      
        {/* NEW: Your credit + Organizers strip (just below banner) */}
        <section className="landing-meta">
          {/* Your credit block */}
          <div className="meta-designer-card">
            <div className="meta-designer-left">
              <div className="meta-avatar">
                <img src={sauravAvatar} alt="Saurav Nitin Trivedi" />
              </div>
              <div className="meta-text">
                <span className="meta-label">Designed &amp; Developed by</span>
                <span className="meta-name">Saurav Nitin Trivedi</span>
              </div>
            </div>
          </div>

          <div className="meta-divider" />

          {/* Organizers */}
          <div className="meta-organizers">
            <div className="meta-title">Organizing Committee</div>
            <ul className="meta-list">
              <li className="organizer-pill">Umendra Trivedi</li>
              <li className="organizer-pill">Uday Vyas</li>
              <li className="organizer-pill">Nitin Trivedi</li>
              <li className="organizer-pill">Satish Dave</li>
              <li className="organizer-pill">Kishan Dave</li>
              <li className="organizer-pill">Dilip Trivedi</li>
              <li className="organizer-pill">Pankaj Trivedi</li>
              <li className="organizer-pill">Rahul Joshi</li>
            </ul>
          </div>
        </section>
      </footer>
    </div>
  );
};

export default FooterComponent;
