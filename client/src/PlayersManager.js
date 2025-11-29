// src/PlayersManager.jsx
import React, { useEffect, useState } from "react";
import { fetchPlayers, updatePlayers } from "./api/players";

export default function PlayersManager() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch on first render
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPlayers();
        console.log("data",data);
        setPlayers(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load players");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Example: simple change handler for name (you can extend this)
  const handleFieldChange = (index, field, value) => {
    setPlayers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleUpdateClick = async () => {
    try {
      setSaving(true);
      setError("");
      const updated = await updatePlayers(players);
      setPlayers(updated); // refresh from backend (optional)
      alert("Players updated in MongoDB ✅");
    } catch (err) {
      console.error(err);
      setError("Failed to update players");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ color: "white" }}>Loading players…</div>;

  return (
    <div style={{ color: "white", padding: "16px" }}>
      <h2>Players Manager</h2>

      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

      <div style={{ maxHeight: 400, overflow: "auto", marginBottom: 16 }}>
        {players.map((p, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 8,
              alignItems: "center",
            }}
          >
            <input
              style={{ flex: 1 }}
              value={p.name || ""}
              onChange={(e) => handleFieldChange(i, "name", e.target.value)}
              placeholder="Name"
            />
            <input
              style={{ flex: 1 }}
              value={p.team || ""}
              onChange={(e) => handleFieldChange(i, "team", e.target.value)}
              placeholder="Team"
            />
          </div>
        ))}
      </div>

      <button onClick={handleUpdateClick} disabled={saving}>
        {saving ? "Updating…" : "Update All Players in DB"}
      </button>
    </div>
  );
}
