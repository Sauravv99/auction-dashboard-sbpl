import React from "react";
import bannerSrc from "../../assests/images/sbpl-logo-1.jpg";
import sauravAvatar from "../../assests/images/image-saurav.jpg";
import "./landingPage.css";

const LandingPage = ({ showApp, setshowApp }) => {
  return (
    <div className="landing-page-root">
      {/* Hero / Banner Section */}
      <section className="landing-hero">
        <div className="landing-hero-banner">
          <img
            src={bannerSrc}
            alt="SBPL Auction Banner"
            className="landing-banner-img"
          />

          {/* Overlay content (desktop / tablet) */}
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

            <button
              className="hero-cta-btn"
              onClick={() => setshowApp(!showApp)}
            >
              Enter Live Auction
            </button>
          </div>
        </div>

        {/* Mobile-friendly hero content (for very small screens) */}
        <div className="landing-hero-mobile">
          <div className="hero-live-pill">
            <span className="hero-live-dot" />
            SBPL 2026 • PLAYER AUCTION
          </div>

          <h1 className="hero-title">
            Welcome to the <span>SBPL 2026</span> Live Auction
          </h1>

          <p className="hero-subtitle">
            Track every bid, every steal, and every superstar pick in real time.
            Step into the war room of the teams and experience the auction like
            an insider.
          </p>

          <button className="hero-cta-btn" onClick={() => setshowApp(!showApp)}>
            Enter Live Auction
          </button>
        </div>
      </section>

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
    </div>
  );
};

export default LandingPage;
