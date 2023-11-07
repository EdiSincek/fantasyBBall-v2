import React, { useState, useEffect } from "react";
import "./PlayerPage.css";
import StatsTable from "../../components/player/StatsTable/StatsTable";

function PlayerPage() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    async function getData() {
      let data = await fetch(
        "http://localhost:3000/statsByPlayer?playerId=6014&year=418"
      );
      data = await data.json();
      setPlayer(data);
    }
    getData();
  }, []);

  if (player == null) return <div>Loading...</div>;

  return (
    <div className="PlayerPage">
      <div className="bio">
        <img className="image" src={player.image} alt="Player image" />
        <p className="name">{player.name}</p>
        <p className="realTeam">{player.real_team}</p>
      </div>
      <div className="stats">
        <StatsTable stats={player.stats} />
      </div>
    </div>
  );
}

export default PlayerPage;
