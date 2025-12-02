import React, { useEffect, useState } from "react";
import AllTeamsComponent from "./components/allTeams/allTeamsComponent";
import { fetchPlayers } from "./api/players";
import { TeamSpendingGrid } from "./components/teamspendingGrid/teamsSpendingGrid";
import HeaderComponent from "./components/headers/header";
import "./App.css";
import LiveAuctionBoard from "./components/auction-details/liveAuctionBoard";
import LandingPage from "./components/landingPage/landingPage";
import FooterComponent from "./components/footers/footer";
// import { Analytics } from "@vercel/analytics/react";

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [teamStats, setTeamStats] = useState([]);
  const [details, setDetails] = useState(true);
  const [showApp, setshowApp] = useState(false);
  const PURSE = 50000000;

  const TEAMS = [
    "KKR",
    "CSK",
    "SSS",
    "Bombaywala 11",
    "Director King - Srimali Warriors",
    "Nagpur Titans",
  ];

  const formatINR = (value) =>
    // new Intl.NumberFormat("en-IN", {
    //   style: "currency",
    //   currency: "INR",
    //   maximumFractionDigits: 0,
     `pts ${new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value)}`;

  //     useEffect(() => {
  //   const interval = setInterval(() => {
  //     loadPlayers();
  //   }, 15000); // 15 seconds

  //   return () => clearInterval(interval);
  // }, []);

  const loadPlayers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchPlayers();
      setPlayers(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load players");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  useEffect(() => {
    if (!players || players.length === 0) {
      const zeroStats = TEAMS.map((team) => ({
        team,
        spent: 0,
        remaining: PURSE,
        playersBought: 0,
      }));
      setTeamStats(zeroStats);
      return;
    }

    const spendMap = {};
    const countMap = {};

    TEAMS.forEach((team) => {
      spendMap[team] = 0;
      countMap[team] = 0;
    });

    players.forEach((player) => {
      if (player.Sold === "Yes" && spendMap.hasOwnProperty(player.Team)) {
        spendMap[player.Team] += Number(player.Price || 0);
        countMap[player.Team] += 1;
      }
    });

    const stats = TEAMS.map((team) => {
      const spent = spendMap[team] || 0;
      const bought = countMap[team] || 0;
      const remaining = PURSE - spent;

      return {
        team,
        spent,
        remaining,
        playersBought: bought,
      };
    });

    setTeamStats(stats);
  }, [players]);

  return (
    <div className="App">
      {showApp ? (
        <>
          <HeaderComponent details={details} setDetails={setDetails} />
          <div className="d-flex justify-content-end px-4 mt-2">
            <span className="live-refresh-text me-2">
              Please refresh for latest auction data
            </span>

            <button
              className="btn btn-outline-light refresh-btn"
              onClick={loadPlayers}
              disabled={loading}
            >
              {loading ? "⟳ Refreshing" : "⟳ Refresh"}
            </button>
          </div>

          {details ? (
            <LiveAuctionBoard players={players}    formatINR={formatINR}/>
          ) : (
            <div className="">
              <AllTeamsComponent players={players} />
            </div>
          )}
          <div className="mt-4">
            <TeamSpendingGrid
              teamStats={teamStats}
              purse={PURSE}
              formatINR={formatINR}
            />
          </div>
        </>
      ) : (
        <>
          <LandingPage showApp={showApp} setshowApp={setshowApp} />
        </>
      )}
      {showApp ? (
            <FooterComponent />
      ):(
      ""
      )}
      {/* <Analytics/> */}
    </div>
  );
}

export default App;
