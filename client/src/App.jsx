import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import NavBar from "./pages/NavBar/NavBar";
import StandingsPage from "./pages/StandingsPage/StandingsPage";
import PlayerPage from "./pages/PlayerPage/PlayerPage";
import HomePage from "./pages/HomePage/HomePage";
import WeeklyStatsPage from "./pages/WeeklyStatsPage/WeeklyStatsPage";
import LeagueStatsPage from "./pages/LeagueStatsPage/LeagueStatsPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import TradeAnalyzerPage from "./pages/TradeAnalyzerPage/TradeAnalyzerPage";
import BestPlayerPage from "./pages/BestPlayerPage/BestPlayerPage";

function App() {
  return (
    <>
      <div className="App">
        <div className="SideBar">
          <NavBar />
        </div>
        <div className="MainContent">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/league/standings" element={<StandingsPage />} />
            <Route path="/player" element={<PlayerPage />} />
            <Route path="/stats" element={<LeagueStatsPage />} />
            <Route path="/stats/week/:week" element={<WeeklyStatsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/tradeAnalyzer" element={<TradeAnalyzerPage />} />
            <Route path="/bestPlayerPage" element={<BestPlayerPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
