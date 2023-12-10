import React, { useState, useEffect } from "react";
import "./ZScoresTable.css";

function ZScoresTable({ players, excluded }) {
  const [playerList, setplayerList] = useState({});
  const [excludedCategories, setExcludedCategories] = useState([]);
  useEffect(() => {
    setplayerList(players);
    setExcludedCategories(excluded);
    console.log(excluded);
  }, [players, excluded]);

  return (
    <div className="ZScoresTable">
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Player</th>
            <th>Z-Score</th>
            <th
              className={
                !excludedCategories.includes("fg") ? null : "excludedCategory"
              }
            >
              FG%
            </th>
            <th
              className={
                !excludedCategories.includes("ft") ? null : "excludedCategory"
              }
            >
              FT%
            </th>
            <th
              className={
                !excludedCategories.includes("three")
                  ? null
                  : "excludedCategory"
              }
            >
              3
            </th>
            <th
              className={
                !excludedCategories.includes("pts") ? null : "excludedCategory"
              }
            >
              PTS
            </th>
            <th
              className={
                !excludedCategories.includes("rebounds")
                  ? null
                  : "excludedCategory"
              }
            >
              REB
            </th>
            <th
              className={
                !excludedCategories.includes("assists")
                  ? null
                  : "excludedCategory"
              }
            >
              AST
            </th>
            <th
              className={
                !excludedCategories.includes("steals")
                  ? null
                  : "excludedCategory"
              }
            >
              STL
            </th>
            <th
              className={
                !excludedCategories.includes("blocks")
                  ? null
                  : "excludedCategory"
              }
            >
              BLK
            </th>
            <th
              className={
                !excludedCategories.includes("turnovers")
                  ? null
                  : "excludedCategory"
              }
            >
              TO
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.values(playerList).map((player) => (
            <tr key={player.name}>
              <td>{playerList.indexOf(player) + 1}.</td>
              <td>{player.name}</td>
              <td
                className={
                  player.zScore.totalZScore > 0
                    ? "positiveZScore"
                    : "negativeZScore"
                }
              >
                {player.zScore.totalZScore.toFixed(3)}
              </td>
              <td
                className={
                  excludedCategories.includes("fg")
                    ? "excludedCategory"
                    : player.zScore.fgZScore > 0
                    ? "positiveZScore"
                    : "negativeZScore"
                }
              >
                {player.zScore.fgZScore.toFixed(2)}
              </td>
              <td
                className={
                  excludedCategories.includes("ft")
                    ? "excludedCategory"
                    : player.zScore.ftZScore > 0
                    ? "positiveZScore"
                    : "negativeZScore"
                }
              >
                {player.zScore.ftZScore.toFixed(2)}
              </td>
              <td
                className={
                  excludedCategories.includes("three")
                    ? "excludedCategory"
                    : player.zScore.threeZScore > 0
                    ? "positiveZScore"
                    : "negativeZScore"
                }
              >
                {player.zScore.threeZScore.toFixed(2)}
              </td>
              <td
                className={
                  excludedCategories.includes("pts")
                    ? "excludedCategory"
                    : player.zScore.pointsZScore > 0
                    ? "positiveZScore"
                    : "negativeZScore"
                }
              >
                {player.zScore.pointsZScore.toFixed(2)}
              </td>
              <td
                className={
                  excludedCategories.includes("rebounds")
                    ? "excludedCategory"
                    : player.zScore.reboundsZScore > 0
                    ? "positiveZScore"
                    : "negativeZScore"
                }
              >
                {player.zScore.reboundsZScore.toFixed(2)}
              </td>
              <td
                className={
                  excludedCategories.includes("assists")
                    ? "excludedCategory"
                    : player.zScore.assistsZScore > 0
                    ? "positiveZScore"
                    : "negativeZScore"
                }
              >
                {player.zScore.assistsZScore.toFixed(2)}
              </td>
              <td
                className={
                  excludedCategories.includes("steals")
                    ? "excludedCategory"
                    : player.zScore.stealsZScore > 0
                    ? "positiveZScore"
                    : "negativeZScore"
                }
              >
                {player.zScore.stealsZScore.toFixed(2)}
              </td>
              <td
                className={
                  excludedCategories.includes("blocks")
                    ? "excludedCategory"
                    : player.zScore.blocksZScore > 0
                    ? "positiveZScore"
                    : "negativeZScore"
                }
              >
                {player.zScore.blocksZScore.toFixed(2)}
              </td>
              <td
                className={
                  excludedCategories.includes("turnovers")
                    ? "excludedCategory"
                    : player.zScore.turnoversZScore > 0
                    ? "positiveZScore"
                    : "negativeZScore"
                }
              >
                {player.zScore.turnoversZScore.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ZScoresTable;
