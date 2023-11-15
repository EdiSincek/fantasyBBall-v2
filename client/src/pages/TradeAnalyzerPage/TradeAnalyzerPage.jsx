import React, { useState, useEffect } from "react";
import "./TradeAnalyzerPage.css";
import TeamSelections from "../../components/tradeAnalyzer/teamSelections/TeamSelections";

function TradeAnalyzerPage() {
  const [team1, setTeam1] = useState({});

  useEffect(() => {}, []);

  return (
    <div className="TradeAnalyzerPage">
      <TeamSelections />
    </div>
  );
}

export default TradeAnalyzerPage;
