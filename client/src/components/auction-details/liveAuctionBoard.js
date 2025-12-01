import React, { useMemo, useEffect, useRef, useState } from "react";
// import hammerSoundFile from "../../assests/sounds/auction-hammer.mp3";

import kkrLogo from "../../assests/images/KKR-logo.jpg";
import cskLogo from "../../assests/images/CSK-logo.jpg";
import bwLogo from "../../assests/images/Bombaywala 11-logo.jpg";
import sssLogo from "../../assests/images/SSS-logo.jpg";
import swLogo from "../../assests/images/Director King - Srimali Warriors-logo.jpg";
import ntLogo from "../../assests/images/Nagpur Titans-logo.jpg";

import "./liveAuctionBoard.css";

const TEAM_LOGOS = {
  KKR: kkrLogo,
  CSK: cskLogo,
  SSS: sssLogo,
  "Bombaywala 11": bwLogo,
  "Director King - Srimali Warriors": swLogo,
  "Nagpur Titans": ntLogo,
};

// const TEAM_NAMES= {
//   "KKR": "KKR",
//   "CSK": "CSK",
//   "SSS": "SSS",
//   "Bombaywala 11": "B11",
//   "Director King - Srimali Warriors": "DKSW",
//   "Nagpur Titans": "NT",
// };

const TEAM_NAMES = {
  KKR: "Kalash Knight Riders",
  CSK: "Central Super Kings",
  SSS: "Shrimali Super Strikers",
  "Bombaywala 11": "Bombaywala 11",
  "Director King - Srimali Warriors": "Director King - Srimali Warriors",
  "Nagpur Titans": "Nagpur Titans",
};

const isSold = (p) => (p?.Sold || "").toLowerCase() === "yes";

const isReservedFalse = (p) =>
  p?.Reserved === false ||
  p?.Reserved === "No" ||
  p?.Reserved === "false" ||
  !p?.Reserved;

const LiveAuctionBoard = ({ players = [], formatINR }) => {
  const [lastSold, setLastSold] = useState(null);
  const prevSoldSet = useRef(new Set());

  //   const hammerSound = useRef(new Audio(hammerSoundFile));

  const auctionList = useMemo(() => {
    return players
      .filter(isReservedFalse)
      .sort((a, b) => (isSold(b) ? 1 : 0) - (isSold(a) ? 1 : 0));
  }, [players]);

  // 🔔 Detect newly SOLD player
  useEffect(() => {
    auctionList.forEach((p) => {
      const id = p["Sr No"] ?? p.PlayerName;
      const soldNow = isSold(p);

      if (soldNow && !prevSoldSet.current.has(id)) {
        prevSoldSet.current.add(id);
        setLastSold(p);

        // hammerSound.current.currentTime = 0;
        // hammerSound.current.play().catch(() => {});
      }
    });
  }, [auctionList]);


  useEffect(() => {
  const messages = [
    "Loading data in 60 seconds",
    "Fetching latest bids…",
    "Syncing auction data…",
    "Updating player status…",
    "Refreshing team spend…",
    "Finalizing live updates…"
  ];

  let index = 0;
  const el = document.getElementById("auctionStatusText");

  const interval = setInterval(() => {
    if (el) {
      el.textContent = messages[index % messages.length];
      index++;
    }
  }, 10000);

  return () => clearInterval(interval);
}, []);


  return (
    <div className="live-feed-wrapper">
      {/* LAST SOLD PINNED CARD */}
      {lastSold && (
        <div className="last-sold-card glow-animate">
          <div className="last-sold-label">JUST SOLD</div>
          <div className="last-sold-main">
            <span className="last-player">{lastSold.PlayerName}</span>
            <span className="last-arrow">→</span>
            <span className="last-team">
              <img src={TEAM_LOGOS[lastSold.Team]} alt={lastSold.Team} />
              {lastSold.Team}
            </span>
            <span className="last-price">
              {formatINR(lastSold.Price?.toLocaleString("en-IN"))}
            </span>
          </div>
        </div>
      )}

      {/* LIVE HEADER */}
      <div className="live-feed-header">
        <div className="live-pulse">
          <span className="pulse-dot" />
          LIVE AUCTION
        </div>
        <div className="live-count">
          Sold <b>{auctionList.filter(isSold).length}</b> / {auctionList.length}
        </div>
      </div>

      {/* FEED */}
      {false > 0 ? (
        <div className="live-feed-list">
          {auctionList.map((p, i) => {
            const sold = isSold(p);

            return (
              <div
                key={p["Sr No"] ?? p.PlayerName ?? i}
                className={`auction-card ${sold ? "sold pop-in" : "unsold"}`}
              >
                {/* Player */}
                <div className="auction-player">
                  <div className="player-avatar">
                    {p.PlayerName?.split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="player-name">{p.PlayerName}</div>
                    {!sold && <div className="player-status">In auction</div>}
                  </div>
                </div>

                {/* Result */}
                {sold ? (
                  <div className="auction-result">
                    <div className="team-info">
                      <img
                        className="team-logo"
                        src={TEAM_LOGOS[p.Team]}
                        alt={p.Team}
                      />
                      <span className="team-name">{TEAM_NAMES[p.Team]}</span>
                    </div>

                    <span className="sold-price">
                      {formatINR(p.Price?.toLocaleString("en-IN"))}
                    </span>
                  </div>
                ) : (
                  <div className="awaiting-hammer">Awaiting hammer 🔔</div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="auction-status-text">
          <span className="status-dot" />
          <span id="auctionStatusText">Fetching latest bids…</span>
        </p>
      )}
    </div>
  );
};

export default LiveAuctionBoard;
