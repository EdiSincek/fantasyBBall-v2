import React, { useState, useEffect } from "react";
import "./StandingsPage.css";
import Standings from "../../components/league/standings/Standings";

function StandingsPage() {
  return (
    <div className="StandingsPage">
      <Standings></Standings>
    </div>
  );
}

export default StandingsPage;
