import React from "react";
import bannerSrc from "../../assests/images/sbpl-logo-1.jpg"
import "./landingPage.css";
import FooterComponent from "../footers/footer";

const LandingPage = ({ showApp, setshowApp }) => {
//   const handleEnter = () => {
//     if (typeof onEnterAuction === "function") {
//       onEnterAuction();
//     }
//   };

  return (
    <div className="landing-page-root">
      {/* Hero / Banner Section */}
      <section className="landing-hero">
        <div className="landing-hero-banner">
          <img
            src={
              bannerSrc 
            }
            alt="SBPL Auction Banner"
            className="landing-banner-img"
          />

          <div className="landing-hero-overlay">
            <div className="hero-live-pill">
              <span className="hero-live-dot" />
              SBPL 2026 • PLAYER AUCTION
            </div>

            <h1 className="hero-title">
              Welcome to the <span>SBPL 2026</span> Live Auction
            </h1>

            <p className="hero-subtitle">
              Track every bid, every steal, and every superstar pick in real
              time. Step into the war room of the teams and experience the
              auction like an insider.
            </p>

            <button className="hero-cta-btn" onClick={()=>setshowApp(!showApp)}>
              Enter Live Auction
            </button>
          </div>
        </div>
      </section>

      {/* Info / Highlights Section */}
      <section className="landing-info">
        <div className="landing-info-card">
          <h3>Live Bidding Dashboard</h3>
          <p>
            Watch players getting sold, squads getting built, and budgets being
            used — updated instantly as the auction progresses.
          </p>
        </div>
        <div className="landing-info-card">
          <h3>Team War Rooms</h3>
          <p>
            Follow how each franchise spends its purse, balances the squad, and
            locks in game-changing talents.
          </p>
        </div>
        <div className="landing-info-card">
          <h3>Player Spotlight</h3>
          <p>
            Keep an eye on rising stars, key all-rounders, and specialist
            finishers as they go under the hammer.
          </p>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="landing-footer">
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
      </footer> */}

      {/* <FooterComponent/> */}
    </div>
  );
};

export default LandingPage;
