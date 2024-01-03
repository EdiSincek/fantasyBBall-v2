import React, { useState, useEffect, useRef } from "react";
import "./TeamRosters.css";

function TeamRosters({ teamId, team }) {
  const [teamStats, setTeamStats] = useState({});

  const isMounted = useRef(false);
  const addCheckboxClass = "addCheckbox" + team;
  const removeCheckboxClass = "removeCheckbox" + team;

  useEffect(() => {
    if (isMounted.current) {
      const sessionStorageLabel = "tradeTeam" + team + "Stats";
      setTeamStats(JSON.parse(sessionStorage.getItem(sessionStorageLabel)));
    } else {
      isMounted.current = true;
    }
  }, [teamId]);

  function btnClick() {
    const addCheckboxes = document.getElementsByClassName(addCheckboxClass);
    const selectedAddCboxes = Array.prototype.slice
      .call(addCheckboxes)
      .filter((ch) => ch.checked == true);

    const removeCheckboxs =
      document.getElementsByClassName(removeCheckboxClass);
    const selectedRemoveCboxes = Array.prototype.slice
      .call(removeCheckboxs)
      .filter((ch) => ch.checked == true);
    var i = 0;
    const addedPlayers = [];
    const removedPlayers = [];
    for (const added of selectedAddCboxes) {
      addedPlayers[i] = added.value;
      i++;
    }
    i = 0;
    for (const removed of selectedRemoveCboxes) {
      removedPlayers[i] = removed.value;
      i++;
    }
    sessionStorage.setItem("addedPlayers" + team, addedPlayers);
    sessionStorage.setItem("removedPlayers" + team, removedPlayers);
  }

  return (
    <div className="TeamRosters">
      <table className="tradeAnalyzerTeamTable">
        <thead>
          <tr>
            <th>PLAYER</th>
            <th>POS</th>
            <th>INC</th>
            <th>EXC.</th>
            <th>FG</th>
            <th>FT</th>
            <th>3m</th>
            <th>PTS</th>
            <th>REB</th>
            <th>AST</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TO</th>
            <th>GP</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(teamStats).map((player) => (
            <tr key={player.name}>
              <td>{player.name.split(" ")[1]}</td>
              <td>{player.positions}</td>
              <td>
                <input
                  className={addCheckboxClass}
                  type="checkbox"
                  value={player.id}
                  name="addCheckbox[]"
                />
              </td>
              <td>
                <input
                  className={removeCheckboxClass}
                  type="checkbox"
                  value={player.id}
                  name="removeCheckbox[]"
                />
              </td>
              <td>{(player.stats.fg_percentage * 100).toFixed(1)}</td>
              <td>{(player.stats.ft_percentage * 100).toFixed(1)}</td>
              <td>
                {(player.stats.three_made / player.stats.games_played).toFixed(
                  1
                )}{" "}
              </td>
              <td>
                {(player.stats.pts_total / player.stats.games_played).toFixed(
                  1
                )}
              </td>
              <td>
                {(
                  player.stats.rebounds_total / player.stats.games_played
                ).toFixed(1)}{" "}
              </td>
              <td>
                {(
                  player.stats.assists_total / player.stats.games_played
                ).toFixed(1)}
              </td>
              <td>
                {(
                  player.stats.steals_total / player.stats.games_played
                ).toFixed(1)}
              </td>
              <td>
                {(
                  player.stats.blocks_total / player.stats.games_played
                ).toFixed(1)}{" "}
              </td>
              <td>
                {(
                  player.stats.turnovers_total / player.stats.games_played
                ).toFixed(1)}
              </td>
              <td>{player.stats.games_played}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="submitPlayersButton" onClick={btnClick}>
        SUBMIT PLAYERS
      </button>
    </div>
  );
}

export default TeamRosters;
