import React, { useMemo } from "react";
import "./playerDetailsModal.css";

// If you're using CRA/Webpack, this will work.
// If using Vite, you'll need import.meta.glob instead.
const playerImagesContext = require.context(
  "../../assests/playerImages",
  false,
  /\.(png|jpe?g|webp)$/i
);

const getPlayerImageSrc = (playerName) => {
  if (!playerName) return null;

  const base = playerName.toLowerCase().replace(/\s+/g, "");

  const candidates = [
    `./image-${base}.jpg`,
    `./image-${base}.jpeg`,
    `./image-${base}.png`,
    `./image-${base}.webp`,
  ];

  for (const path of candidates) {
    if (playerImagesContext.keys().includes(path)) {
      return playerImagesContext(path);
    }
  }

  return null;
};

const calculateAge = (dobStr) => {
  if (!dobStr) return null;

  const [dd, mm, yyyy] = dobStr.split("-").map(Number);
  if (!dd || !mm || !yyyy) return null;

  const dob = new Date(yyyy, mm - 1, dd);
  if (Number.isNaN(dob.getTime())) return null;

  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const PlayerDetailsModal = ({ player, teamDisplayName, isOpen, onClose }) => {
  const imgSrc = useMemo(
    () => (player ? getPlayerImageSrc(player.PlayerName) : null),
    [player]
  );

  const age = useMemo(
    () => (player ? calculateAge(player.DOB) : null),
    [player]
  );

  if (!isOpen || !player) return null;

  return (
    <div className="player-modal-backdrop text-white" onClick={onClose}>
      <div
        className="player-modal-sheet player-modal-sheet-open"
        onClick={(e) => e.stopPropagation()}
      >
        {/* drag handle + close */}
        <div className="player-modal-topbar">
          <div className="player-modal-handle" />
          <button
            type="button"
            className="player-modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Avatar + name */}
        <div className="player-modal-header">
          <div className="player-modal-avatar-wrapper">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={player.PlayerName}
                className="player-modal-avatar"
              />
            ) : (
              <div className="player-modal-avatar-fallback">
                {player.PlayerName?.split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
          </div>

          <div className="player-modal-title-block">
            <h3 className="player-modal-name d-flex align-items-start">{player.PlayerName}</h3>
            <div className="player-modal-chips">
              <span className="chip chip-team">
                {teamDisplayName || player.Team || "Team TBD"}
              </span>
              {player.Speciality && (
                <span className="chip chip-role">{player.Speciality}</span>
              )}
            </div>
          </div>
        </div>

        {/* Details section */}
        <div className="player-modal-details">
          <div className="detail-card">
            <div className="detail-label">Age</div>
            <div className="detail-value">
              {age !== null ? `${age} yrs` : "—"}
            </div>
          </div>

          {/* <div className="detail-card">
            <div className="detail-label">Date of Birth</div>
            <div className="detail-value">{player.DOB || "—"}</div>
          </div> */}

          <div className="detail-card">
            <div className="detail-label">Contact</div>
            <div className="detail-value">
              {player.Contact || "Not available"}
            </div>
          </div>

          {/* <div className="detail-card">
            <div className="detail-label">Address</div>
            <div className="detail-value detail-value-multiline">
              {player.Address || "Not available"}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailsModal;
