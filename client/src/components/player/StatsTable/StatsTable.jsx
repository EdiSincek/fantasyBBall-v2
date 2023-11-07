import React, { useState, useEffect } from "react";
import "./StatsTable.css";

function StatsTable({ stats }) {
  const [playerStats, setPlayerStats] = useState({});

  useEffect(() => {
    setPlayerStats(stats);
  }, []);
  return (
    <div className="StatsTable">
      <h1 className="h1">LAST SEASON</h1>
      <table className="stsTable">
        <thead>
          <tr>
            <th>GP</th>
            <th>FG %</th>
            <th>FT %</th>
            <th>3 %</th>
            <th>3PM</th>
            <th>PTS</th>
            <th>AST</th>
            <th>REB</th>
            <th>ST</th>
            <th>BLK</th>
            <th>TO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{playerStats.games_played}</td>
            <td>{(playerStats.fg_percentage * 100).toFixed(1)}</td>
            <td>{(playerStats.ft_percentage * 100).toFixed(1)}</td>
            <td>{(playerStats.three_percentage * 100).toFixed(1)}</td>
            <td>
              {(playerStats.three_made / playerStats.games_played).toFixed(1)}
            </td>
            <td>
              {(playerStats.pts_total / playerStats.games_played).toFixed(1)}
            </td>
            <td>
              {(playerStats.assists_total / playerStats.games_played).toFixed(
                1
              )}
            </td>
            <td>
              {(playerStats.rebounds_total / playerStats.games_played).toFixed(
                1
              )}
            </td>
            <td>
              {(playerStats.steals_total / playerStats.games_played).toFixed(1)}
            </td>
            <td>
              {(playerStats.blocks_total / playerStats.games_played).toFixed(1)}
            </td>
            <td>
              {(playerStats.turnovers_total / playerStats.games_played).toFixed(
                1
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StatsTable;
