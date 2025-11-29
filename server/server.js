const express = require('express');
const connectDB = require('./config/db');

const cors = require('cors');
require('dotenv').config();

const mongoose = require("mongoose");

const app = express();

const whitelist = [
  'http://localhost:3000',
  'https://analyticsdashboard-rho.vercel.app/'
];

function isAllowedOrigin(origin) {
  if (!origin) return true; // allow curl/Postman/health
  if (whitelist.includes(origin)) return true;
  try {
    const url = new URL(origin);
    return url.hostname.endsWith('.vercel.app'); // optional: allow all vercel.app previews
  } catch {
    return false;
  }
}

const corsOptions = {
  origin: (origin, cb) => (isAllowedOrigin(origin) ? cb(null, true) : cb(new Error('Not allowed by CORS'))),
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: false // keep false since you’re not using cookies
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

connectDB();


// 2) MODEL FOR THE SINGLE DOCUMENT THAT HOLDS players ARRAY
const playersDocSchema = new mongoose.Schema(
  {
    players: [mongoose.Schema.Types.Mixed], // array of any shaped objects
  },
  { collection: "players" } // use existing collection
);

const PlayersDoc = mongoose.model("PlayersDoc", playersDocSchema);

// 3) ROUTE: GET players array
app.get("/api/players", async (req, res) => {
  try {
    // since there is only ONE document
    const doc = await PlayersDoc.findOne();
    if (!doc) return res.json([]);

    res.json(doc.players); // send only the array to frontend
  } catch (err) {
    console.error("Error fetching players:", err);
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

// 4) ROUTE: UPDATE whole players array
app.put("/api/players", async (req, res) => {
  try {
    const newPlayersArray = req.body; // expecting an array from frontend

    if (!Array.isArray(newPlayersArray)) {
      return res.status(400).json({ error: "Body must be an array" });
    }

    // find the single document and replace its players field
    const doc = await PlayersDoc.findOne();
    if (!doc) {
      // if doc doesn't exist, create it
      const created = await PlayersDoc.create({ players: newPlayersArray });
      return res.json(created.players);
    }

    doc.players = newPlayersArray;
    await doc.save();

    res.json(doc.players);
  } catch (err) {
    console.error("Error updating players:", err);
    res.status(500).json({ error: "Failed to update players" });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 API running at http://localhost:${PORT}`)
);




