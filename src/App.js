import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import PredictionsPage from "./PredictionsPage";

function HomePage() {
  const [message, setMessage] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [homeMarketValue, setHomeMarketValue] = useState("");
  const [awayMarketValue, setAwayMarketValue] = useState("");
  const [accuracy, setAccuracy] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const leagues = [
    "La Liga",
    "Saudi Pro League",
    "Russian Premier League",
    "Czech First League",
    "EFL League One",
    "Liga 1 Peru",
    "Liga Portugal",
    "Uruguayan Primera División",
    "Argentine Primera División",
    "Serie A (Italy)",
    "BeNe League",
    "LigaPro Ecuador",
    "Swiss Super League",
    "USL League One",
    "Liga 1 Romania",
    "Scottish Premiership",
    "Paraguayan Primera División",
    "Chinese Super League",
    "Chilean Primera División",
    "Danish Superliga",
    "Liga FUTVE (Venezuela)",
    "Scottish Championship",
    "Nemzeti Bajnokság I (Hungary)",
    "Eerste Divisie (Netherlands)",
    "Ligue 2 (France)",
    "A-League Men (Australia)",
    "Swiss Promotion League",
    "Serbian SuperLiga",
    "National League (England)",
    "I-League 2 (India)",
    "Indian Super League",
    "J1 League (Japan)",
    "J2 League (Japan)",
    "EFL Championship",
    "Süper Lig (Turkey)",
    "USL Championship",
    "Bolivian Primera División",
    "Ligue 1 (France)",
    "Ukrainian Premier League",
    "Liga MX (Mexico)",
    "Serie B (Italy)",
    "Bundesliga (Germany)",
    "3. Liga (Germany)",
    "K League 1 (South Korea)",
    "Ekstraklasa (Poland)",
    "MLS (USA)",
    "WE League (Japan, Women)",
    "Liga F (Spain, Women)",
    "South African Premiership",
    "Super League Greece",
    "Frauen-Bundesliga (Germany)",
    "Categoría Primera A (Colombia)",
    "Premier League (England)",
    "Serie A Women (Italy)",
    "Iran Pro League",
    "EFL League Two",
    "Eredivisie Women",
    "League of Ireland Premier Division",
    "2. Bundesliga (Germany)",
    "Primera Federación Femenina (Spain)",
    "Eredivisie (Netherlands)",
    "Croatian Football League",
    "Austrian Bundesliga",
    "Damallsvenskan (Sweden)",
    "Swiss Women's Super League",
    "Brazil Serie A",
    "Segunda División (Spain)",
    "Bulgarian First League",
    "NWSL (USA, Women)",
    "Challenger Pro League (Belgium)",
    "Belgian Pro League",
    "Cypriot First Division",
    "SAFA Second Division (South Africa)",
    "Elitettan (Sweden)",
    "Bulgarian Second League",
    "Azadegan League (Iran)",
    "Slovak Super Liga",
    "Austrian 2. Liga",
    "Swiss Challenge League",
    "Hungarian Nemzeti Bajnokság II",
    "Romanian Liga II",
    "Slovak 2. Liga",
    "Greek Super League 2",
    "Turkish TFF First League",
    "Russian First League",
    "Ukrainian First League",
    "South African National First Division",
    "Mexican Liga de Expansión MX",
    "Brazilian Série B",
    "Chilean Primera B",
    "Colombian Categoría Primera B",
    "Venezuelan Segunda División",
    "Uruguayan Segunda División",
    "Paraguayan División Intermedia",
    "Bolivian Copa Simón Bolívar",
    "Peruvian Liga 2",
    "Ecuadorian Serie B",
    "Argentine Primera Nacional",
    "Spanish Primera Federación",
    "German Regionalliga",
    "French Championnat National",
    "Italian Serie C",
    "Dutch Tweede Divisie",
    "Belgian National Division 1",
    "Austrian Regionalliga",
    "Polish II liga",
    "Czech Moravian-Silesian Football League",
    "Slovak 3. Liga",
    "Greek Gamma Ethniki",
    "Turkish TFF Second League",
    "Russian Second League",
    "Ukrainian Second League",
    "Japanese J3 League",
    "Iranian League 2",
    "Mexican Liga Premier ",
    "Brazilian Série C",
    "Chilean Segunda División",
    "Colombian Categoría Primera C",
    "Venezuelan Tercera División",
    "Uruguayan Tercera División",
    "Paraguayan Primera División B",
    "Bolivian Tercera División",
    "Peruvian Copa Perú",
    "Ecuadorian Segunda Categoría",
    "Argentine Torneo Federal A",
    "Spanish Segunda Federación",
    "English National League North/South",
    "German Oberliga",
    "French National 2",
    "Italian Serie D",
    "Dutch Derde Divisie",
    "Belgian Division 2",
    "Swiss 1. Liga",
    "Austrian Landesliga",
    "Polish III liga"

  ];
  const filteredLeagues = leagues.filter((league) =>
    league.toLowerCase().includes(searchQuery.toLowerCase())
  );


  useEffect(() => {
    axios.get("https://fp-backend-um6v.onrender.com/api/accuracy")
      .then(res => setAccuracy(res.data.accuracy))
      .catch(err => console.error("Failed to fetch accuracy", err));
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    setResult("");
    axios
      .post("https://fp-backend-um6v.onrender.com/api/teams", {
        homeTeam,
        awayTeam,
        homeMarketValue,
        awayMarketValue,
      })
      .then((response) => {
        setResult(response.data.result);
      })
      .catch((error) => {
        console.error("Error sending teams", error);
      })
      .finally(() => {
        setLoading(false); // בסיום הבקשה
      });
  };

  return (
    <div className="main-layout">
      <div className="container">
        {accuracy !== null && (
          <p style={{ fontWeight: "bold", color: "green" }}>
            Predicition Accuracy: {accuracy}%
          </p>
        )}
        <Link
          to="/predictions"
          style={{
            display: "block",
            marginTop: "15px",
            color: "#007bff",
            textDecoration: "underline",
            fontSize: "14px",
          }}
        >
          View Prediction History
      </Link>
        <h1 className="title">Football Match Prediction</h1>
        <p className="subtitle">Enter the names of the home and away teams and their values to predict match outcomes.</p>

        <input
          type="text"
          placeholder="Home Team"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Away Team"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Home Team Market Value"
          value={homeMarketValue}
          onChange={(e) => setHomeMarketValue(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Away Team Market Value"
          value={awayMarketValue}
          onChange={(e) => setAwayMarketValue(e.target.value)}
          className="input"
        />
        <a
          href="https://www.transfermarkt.com/schnellsuche/keinergebnis/schnellsuche?query="
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            marginTop: "10px",
            color: "#007bff",
            textDecoration: "underline",
            fontSize: "14px",
          }}
        >
          Need help? Find team values on Transfermarkt
      </a>
        <button onClick={handleSubmit} className="button">Send</button>
        {loading ? (
          <p style={{ fontWeight: "bold", color: "#007bff" }}>Predicting result...</p>
        ) : (
            result && <p className="result">🔮{result}</p>
          )}

      </div>
      <div className="league-table-section">
        <h3>Relevant Leagues</h3>
        <input
          type="text"
          placeholder="Search leagues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input"
        />
        <div className="table-wrapper">
          <table className="league-table">
            <thead>
              <tr>
                <th>League Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeagues.map((league, index) => (
                <tr key={index}>
                  <td>{league}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/predictions" element={<PredictionsPage />} />
    </Routes>
  );
}

