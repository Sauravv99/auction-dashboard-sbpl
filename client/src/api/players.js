// src/api/players.js
const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000"; // render URL in prod

export async function fetchPlayers() {
  const res = await fetch(`${API_BASE}/api/players`);
  if (!res.ok) throw new Error("Failed to fetch players");
  return res.json(); // this is the array from backend
  
}

export async function updatePlayers(playersArray) {
  const res = await fetch(`${API_BASE}/api/players`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playersArray), // send whole array
  });

  if (!res.ok) throw new Error("Failed to update players");
  return res.json(); // updated array from backend
}
