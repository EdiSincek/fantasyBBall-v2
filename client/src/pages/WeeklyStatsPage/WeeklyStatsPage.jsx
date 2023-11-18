import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./WeeklyStatsPage.css";
import GoldenMedal from "../../assets/goldCoin.png";
import SilverMedal from "../../assets/silverCoin.png";
import BronzeMedal from "../../assets/bronzeCoin.png";
import LoserMedal from "../../assets/loser.png";

function WeeklyStatsPage() {
  const [standings, setStandings] = useState({});
  const { week } = useParams();

  useEffect(() => {
    fetch("http://localhost:3000/weeklyLeagueStats?week=" + week)
      .then((res) => res.json())
      .then((data) => setStandings(data))
      .catch((error) => console.error(error));
  }, [week]);
  return (
    <div className="WeeklyStatsPage">
      <h1 className="weeklyTableLabel">Week {week} - weekly matchup stats</h1>
      <table className="drTableWeekly">
        <thead>
          <tr>
            <th>Position</th>
            <th>League record</th>
            <th>Manager</th>
            <th>Team</th>
            <th>FG%</th>
            <th>FT%</th>
            <th>3p</th>
            <th>PTS</th>
            <th>REB</th>
            <th>AST</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TO</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(standings).map((team) => (
            <tr key={team.team_name}>
              <td className="weeklyPosition">
                <div className="weeklyPositionContent">
                  <p className="weeklyPositionValue">
                    {team.medalsWon == 0 && standings.indexOf(team) + 1}
                  </p>
                  {team.medalsWon == 1 && (
                    <img className="weeklyMedalImage" src={GoldenMedal} />
                  )}
                  {team.medalsWon == 2 && (
                    <img className="weeklyMedalImage" src={SilverMedal} />
                  )}
                  {team.medalsWon == 3 && (
                    <img className="weeklyMedalImage" src={BronzeMedal} />
                  )}
                  {team.medalsWon == 12 && (
                    <img className="weeklyMedalLoserImage" src={LoserMedal} />
                  )}
                </div>
              </td>
              <td>
                <b className="weeklyMatchupsWon">{team.matchupsWon}</b> -{" "}
                <b className="weeklyMatchupsTied">{team.matchupsTied}</b> -{" "}
                <b className="weeklyMatchupsLost">{team.matchupsLost}</b>
              </td>
              <td>{team.team_manager}</td>
              <td>
                <b>{team.team_name}</b>
              </td>
              <td>
                <b className="weeklyValue">{team.fg_percentage}</b>
                <br />{" "}
                <div
                  className={
                    team.fg_percentage_position < 5
                      ? "positionCircle-good"
                      : team.fg_percentage_position < 9
                      ? "positionCircle-mid"
                      : "positionCircle-bad"
                  }
                >
                  {team.fg_percentage_position}.
                </div>
              </td>
              <td>
                <b className="weeklyValue">{team.ft_percentage}</b>
                <br />{" "}
                <div
                  className={
                    team.ft_percentage_position < 5
                      ? "positionCircle-good"
                      : team.ft_percentage_position < 9
                      ? "positionCircle-mid"
                      : "positionCircle-bad"
                  }
                >
                  {team.ft_percentage_position}.
                </div>
              </td>
              <td>
                <b className="weeklyValue">{team.three_made}</b>
                <br />{" "}
                <div
                  className={
                    team.three_made_position < 5
                      ? "positionCircle-good"
                      : team.three_made_position < 9
                      ? "positionCircle-mid"
                      : "positionCircle-bad"
                  }
                >
                  {team.three_made_position}.
                </div>
              </td>
              <td>
                <b className="weeklyValue">{team.pts_total}</b>
                <br />{" "}
                <div
                  className={
                    team.pts_total_position < 5
                      ? "positionCircle-good"
                      : team.pts_total_position < 9
                      ? "positionCircle-mid"
                      : "positionCircle-bad"
                  }
                >
                  {team.pts_total_position}.
                </div>
              </td>
              <td>
                <b className="weeklyValue">{team.rebounds_total}</b>
                <br />
                <div
                  className={
                    team.rebounds_total_position < 5
                      ? "positionCircle-good"
                      : team.rebounds_total_position < 9
                      ? "positionCircle-mid"
                      : "positionCircle-bad"
                  }
                >
                  {" "}
                  {team.rebounds_total_position}.
                </div>
              </td>
              <td>
                <b className="weeklyValue">{team.assists_total}</b>
                <br />{" "}
                <div
                  className={
                    team.assists_total_position < 5
                      ? "positionCircle-good"
                      : team.assists_total_position < 9
                      ? "positionCircle-mid"
                      : "positionCircle-bad"
                  }
                >
                  {team.assists_total_position}.
                </div>
              </td>
              <td>
                <b className="weeklyValue">{team.steals_total}</b>
                <br />{" "}
                <div
                  className={
                    team.steals_total_position < 5
                      ? "positionCircle-good"
                      : team.steals_total_position < 9
                      ? "positionCircle-mid"
                      : "positionCircle-bad"
                  }
                >
                  {team.steals_total_position}.
                </div>
              </td>
              <td>
                <b className="weeklyValue">{team.blocks_total}</b>
                <br />{" "}
                <div
                  className={
                    team.blocks_total_position < 5
                      ? "positionCircle-good"
                      : team.blocks_total_position < 9
                      ? "positionCircle-mid"
                      : "positionCircle-bad"
                  }
                >
                  {team.blocks_total_position}.
                </div>
              </td>
              <td>
                <b className="weeklyValue">{team.turnovers_total}</b>
                <br />{" "}
                <div
                  className={
                    team.turnovers_total_position < 5
                      ? "positionCircle-good"
                      : team.turnovers_total_position < 9
                      ? "positionCircle-mid"
                      : "positionCircle-bad"
                  }
                >
                  {team.turnovers_total_position}.
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeeklyStatsPage;
