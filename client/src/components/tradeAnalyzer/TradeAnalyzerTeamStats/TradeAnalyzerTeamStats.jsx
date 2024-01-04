import { useState } from "react";
import "./TradeAnalyzerTeamStats.css";

function TradeAnalyzerTeamStats() {
  const initalState = {
    fg_percentage: 0,
    ft_percentage: 0,
    three_avg: 0,
    ft_made: 0,
    pts_avg: 0,
    rebounds_avg: 0,
    assists_avg: 0,
    steals_avg: 0,
    blocks_avg: 0,
    turnovers_avg: 0,
  };
  const [statsBefore1, setStatsBefore1] = useState(initalState);
  const [statsAfter1, setStatsAfter1] = useState(initalState);
  const [statsBefore2, setStatsBefore2] = useState(initalState);
  const [statsAfter2, setStatsAfter2] = useState(initalState);
  const [tradedAverageStats1, setTradedAverageStats1] = useState(initalState);
  const [tradedAverageStats2, setTradedAverageStats2] = useState(initalState);

  const trade = () => {
    const team1Stats = JSON.parse(sessionStorage.getItem("tradeTeam1Stats"));
    const team2Stats = JSON.parse(sessionStorage.getItem("tradeTeam2Stats"));
    const team1Trade = sessionStorage.getItem("addedPlayers1").split(",");
    const team2Trade = sessionStorage.getItem("addedPlayers2").split(",");
    const team1Skip = sessionStorage.getItem("removedPlayers1").split(",");
    const team2Skip = sessionStorage.getItem("removedPlayers2").split(",");

    const team1AvgBefore = calculateStatsBefore(team1Stats, team1Skip);
    setStatsBefore1(team1AvgBefore);
    const team2AvgBefore = calculateStatsBefore(team2Stats, team2Skip);
    setStatsBefore2(team2AvgBefore);
    const team1AvgAfter = calculateStatsAfter(
      team1Stats,
      team2Stats,
      team1Skip,
      team1Trade,
      team2Trade
    );
    setStatsAfter1(team1AvgAfter);

    const team2AvgAfter = calculateStatsAfter(
      team2Stats,
      team1Stats,
      team2Skip,
      team2Trade,
      team1Trade
    );
    setStatsAfter2(team2AvgAfter);

    const tradedAverageTeam1 = calculateAverageStatsTraded(
      1,
      team1Stats,
      team1Trade
    );
    setTradedAverageStats1(tradedAverageTeam1);

    const tradedAverageTeam2 = calculateAverageStatsTraded(
      2,
      team2Stats,
      team2Trade
    );
    setTradedAverageStats2(tradedAverageTeam2);
  };

  return (
    <div className="TradeAnalyzerTeamStats">
      <div className="teamTradeStatsTables">
        <div className="tradeBtn">
          <button className="calculateStatsBtn" onClick={trade}>
            TRADE
          </button>
        </div>
        <h1 className="tableExplanationLabel">
          TEAM AVERAGE STATS BEFORE AND AFTER THE TRADE
        </h1>
        <h1 className="tableLabel">TEAM 1: BEFORE</h1>
        <table className="statsBeforeTrade">
          <thead>
            <tr>
              <th>FG</th>
              <th>FT</th>
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
            <tr>
              <td>{statsBefore1.fg_percentage.toFixed(2)}</td>
              <td>{statsBefore1.ft_percentage.toFixed(2)}</td>
              <td>{statsBefore1.three_avg.toFixed(2)}</td>
              <td>{statsBefore1.pts_avg.toFixed(2)}</td>
              <td>{statsBefore1.rebounds_avg.toFixed(2)}</td>
              <td>{statsBefore1.assists_avg.toFixed(2)}</td>
              <td>{statsBefore1.steals_avg.toFixed(2)}</td>
              <td>{statsBefore1.blocks_avg.toFixed(2)}</td>
              <td>{statsBefore1.turnovers_avg.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <h1 className="tableLabel">TEAM 1: AFTER</h1>
        <table className="statsBeforeTrade">
          <thead>
            <tr>
              <th>FG</th>
              <th>FT</th>
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
            <tr>
              <td>
                {statsAfter1.fg_percentage.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter1.fg_percentage - statsBefore1.fg_percentage < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(
                    statsAfter1.fg_percentage - statsBefore1.fg_percentage
                  ).toFixed(2)}{" "}
                </p>
              </td>
              <td>
                {statsAfter1.ft_percentage.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter1.ft_percentage - statsBefore1.ft_percentage < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(
                    statsAfter1.ft_percentage - statsBefore1.ft_percentage
                  ).toFixed(2)}
                </p>
              </td>
              <td>
                {statsAfter1.three_avg.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter1.three_avg - statsBefore1.three_avg < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(statsAfter1.three_avg - statsBefore1.three_avg).toFixed(2)}
                </p>
              </td>
              <td>
                {statsAfter1.pts_avg.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter1.pts_avg - statsBefore1.pts_avg < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(statsAfter1.pts_avg - statsBefore1.pts_avg).toFixed(2)}
                </p>
              </td>
              <td>
                {statsAfter1.rebounds_avg.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter1.rebounds_avg - statsBefore1.rebounds_avg < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(
                    statsAfter1.rebounds_avg - statsBefore1.rebounds_avg
                  ).toFixed(2)}
                </p>
              </td>
              <td>
                {statsAfter1.assists_avg.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter1.assists_avg - statsBefore1.assists_avg < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(statsAfter1.assists_avg - statsBefore1.assists_avg).toFixed(
                    2
                  )}
                </p>
              </td>
              <td>
                {statsAfter1.steals_avg.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter1.steals_avg - statsBefore1.steals_avg < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(statsAfter1.steals_avg - statsBefore1.steals_avg).toFixed(
                    2
                  )}
                </p>
              </td>
              <td>
                {statsAfter1.blocks_avg.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter1.blocks_avg - statsBefore1.blocks_avg < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(statsAfter1.blocks_avg - statsBefore1.blocks_avg).toFixed(
                    2
                  )}
                </p>
              </td>
              <td>
                {statsAfter1.turnovers_avg.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter1.turnovers_avg - statsBefore1.turnovers_avg > 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(
                    statsAfter1.turnovers_avg - statsBefore1.turnovers_avg
                  ).toFixed(2)}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <br />

        <h1 className="tableLabel">TEAM 2: BEFORE</h1>
        <table className="statsBeforeTrade">
          <thead>
            <tr>
              <th>FG</th>
              <th>FT</th>
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
            <tr>
              <td>{statsBefore2.fg_percentage.toFixed(2)}</td>
              <td>{statsBefore2.ft_percentage.toFixed(2)}</td>
              <td>{statsBefore2.three_avg.toFixed(2)}</td>
              <td>{statsBefore2.pts_avg.toFixed(2)}</td>
              <td>{statsBefore2.rebounds_avg.toFixed(2)}</td>
              <td>{statsBefore2.assists_avg.toFixed(2)}</td>
              <td>{statsBefore2.steals_avg.toFixed(2)}</td>
              <td>{statsBefore2.blocks_avg.toFixed(2)}</td>
              <td>{statsBefore2.turnovers_avg.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <h1 className="tableLabel">TEAM 2: AFTER</h1>
        <table className="statsBeforeTrade">
          <thead>
            <tr>
              <th>FG</th>
              <th>FT</th>
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
            <tr>
              <td>
                {statsAfter2.fg_percentage.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter2.fg_percentage - statsBefore2.fg_percentage < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(
                    statsAfter2.fg_percentage - statsBefore2.fg_percentage
                  ).toFixed(2)}
                </p>
              </td>
              <td>
                {statsAfter2.ft_percentage.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter2.ft_percentage - statsBefore2.ft_percentage < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(
                    statsAfter2.ft_percentage - statsBefore2.ft_percentage
                  ).toFixed(2)}
                </p>
              </td>
              <td>
                {statsAfter2.three_avg.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter2.three_avg - statsBefore2.three_avg < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(statsAfter2.three_avg - statsBefore2.three_avg).toFixed(2)}
                </p>
              </td>
              <td>
                {statsAfter2.pts_avg.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter2.pts_avg - statsBefore2.pts_avg < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(statsAfter2.pts_avg - statsBefore2.pts_avg).toFixed(2)}
                </p>
              </td>
              <td>
                {statsAfter2.rebounds_avg.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter2.rebounds_avg - statsBefore2.rebounds_avg < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(
                    statsAfter2.rebounds_avg - statsBefore2.rebounds_avg
                  ).toFixed(2)}
                </p>
              </td>
              <td>
                {statsAfter2.assists_avg.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter2.assists_avg - statsBefore2.assists_avg < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(statsAfter2.assists_avg - statsBefore2.assists_avg).toFixed(
                    2
                  )}
                </p>
              </td>
              <td>
                {statsAfter2.steals_avg.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter2.steals_avg - statsBefore2.steals_avg < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(statsAfter2.steals_avg - statsBefore2.steals_avg).toFixed(
                    2
                  )}
                </p>
              </td>
              <td>
                {statsAfter2.blocks_avg.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter2.blocks_avg - statsBefore2.blocks_avg < 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(statsAfter2.blocks_avg - statsBefore2.blocks_avg).toFixed(
                    2
                  )}
                </p>
              </td>
              <td>
                {statsAfter2.turnovers_avg.toFixed(2)}
                <br />
                <p
                  className={
                    statsAfter2.turnovers_avg - statsBefore2.turnovers_avg > 0
                      ? "differenceNegative"
                      : "differencePositive"
                  }
                >
                  {(
                    statsAfter2.turnovers_avg - statsBefore2.turnovers_avg
                  ).toFixed(2)}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="averageStatsGivenRecieved">
        <h1 className="tableExplanationLabel">
          AVERAGE STATS OF PLAYERS INCLUDED IN THE TRADE
        </h1>
        <h1 className="tableLabel">TEAM 1: AVG TRADED</h1>
        <table className="statsBeforeTrade">
          <thead>
            <tr>
              <th>FG</th>
              <th>FT</th>
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
            <tr>
              <td
                className={
                  tradedAverageStats1.fg_percentage <
                  tradedAverageStats2.fg_percentage
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats1.fg_percentage.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats1.ft_percentage <
                  tradedAverageStats2.ft_percentage
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats1.ft_percentage.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats1.three_avg < tradedAverageStats2.three_avg
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats1.three_avg.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats1.pts_avg < tradedAverageStats2.pts_avg
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats1.pts_avg.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats1.rebounds_avg <
                  tradedAverageStats2.rebounds_avg
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats1.rebounds_avg.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats1.assists_avg <
                  tradedAverageStats2.assists_avg
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats1.assists_avg.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats1.steals_avg <
                  tradedAverageStats2.steals_avg
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats1.steals_avg.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats1.blocks_avg <
                  tradedAverageStats2.blocks_avg
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats1.blocks_avg.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats1.turnovers_avg >
                  tradedAverageStats2.turnovers_avg
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats1.turnovers_avg.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <br />

        <h1 className="tableLabel">TEAM 2: AVG TRADED</h1>
        <table className="statsBeforeTrade">
          <thead>
            <tr>
              <th>FG</th>
              <th>FT</th>
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
            <tr>
              <td
                className={
                  tradedAverageStats2.fg_percentage <
                  tradedAverageStats1.fg_percentage
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats2.fg_percentage.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats2.ft_percentage <
                  tradedAverageStats1.ft_percentage
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats2.ft_percentage.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats2.three_avg < tradedAverageStats1.three_avg
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats2.three_avg.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats2.pts_avg < tradedAverageStats1.pts_avg
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats2.pts_avg.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats2.rebounds_avg <
                  tradedAverageStats1.rebounds_avg
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats2.rebounds_avg.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats2.assists_avg <
                  tradedAverageStats1.assists_avg
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats2.assists_avg.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats2.steals_avg <
                  tradedAverageStats1.steals_avg
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats2.steals_avg.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats2.blocks_avg <
                  tradedAverageStats1.blocks_avg
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats2.blocks_avg.toFixed(2)}
              </td>
              <td
                className={
                  tradedAverageStats2.turnovers_avg >
                  tradedAverageStats1.turnovers_avg
                    ? "averageTradedLower"
                    : "averageTradedHigher"
                }
              >
                {tradedAverageStats2.turnovers_avg.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function calculateStatsBefore(statsByPlayer, removedPlayers) {
  var statsBeforeTrade = {};

  var games_played = 0,
    fg_attempted = 0,
    fg_made = 0,
    ft_attempted = 0,
    ft_made = 0,
    three_made = 0,
    pts_total = 0,
    rebounds_total = 0,
    assists_total = 0,
    steals_total = 0,
    blocks_total = 0,
    turnovers_total = 0;

  for (var i = 0; i < statsByPlayer.length; i++) {
    const player = statsByPlayer[i];
    if (
      player.stats.games_played != "-" &&
      !removedPlayers.includes(player.id)
    ) {
      games_played = games_played + parseInt(player.stats.games_played);
      fg_attempted = fg_attempted + parseInt(player.stats.fg_attempted);
      fg_made = fg_made + parseInt(player.stats.fg_made);
      ft_attempted = ft_attempted + parseInt(player.stats.ft_attempted);
      ft_made = ft_made + parseInt(player.stats.ft_made);
      three_made = three_made + parseInt(player.stats.three_made);
      pts_total = pts_total + parseInt(player.stats.pts_total);
      rebounds_total = rebounds_total + parseInt(player.stats.rebounds_total);
      assists_total = assists_total + parseInt(player.stats.assists_total);
      steals_total = steals_total + parseInt(player.stats.steals_total);
      blocks_total = blocks_total + parseInt(player.stats.blocks_total);
      turnovers_total =
        turnovers_total + parseInt(player.stats.turnovers_total);
    }
  }

  statsBeforeTrade = {
    fg_percentage: (fg_made / fg_attempted) * 100,
    ft_percentage: (ft_made / ft_attempted) * 100,
    three_avg: three_made / games_played,
    pts_avg: pts_total / games_played,
    rebounds_avg: rebounds_total / games_played,
    assists_avg: assists_total / games_played,
    steals_avg: steals_total / games_played,
    blocks_avg: blocks_total / games_played,
    turnovers_avg: turnovers_total / games_played,
  };
  return statsBeforeTrade;
}

function calculateStatsAfter(
  statsByPlayer,
  statsOtherTeam,
  removedPlayers,
  tradedPlayers,
  addedPlayers
) {
  var statsAfterTrade = {};

  var games_played = 0,
    fg_attempted = 0,
    fg_made = 0,
    ft_attempted = 0,
    ft_made = 0,
    three_made = 0,
    pts_total = 0,
    rebounds_total = 0,
    assists_total = 0,
    steals_total = 0,
    blocks_total = 0,
    turnovers_total = 0;

  for (var i = 0; i < statsByPlayer.length; i++) {
    const player = statsByPlayer[i];
    if (
      player.stats.games_played != "-" &&
      !removedPlayers.includes(player.id) &&
      !tradedPlayers.includes(player.id)
    ) {
      console.log(player.name);

      games_played = games_played + parseInt(player.stats.games_played);
      fg_attempted = fg_attempted + parseInt(player.stats.fg_attempted);
      fg_made = fg_made + parseInt(player.stats.fg_made);
      ft_attempted = ft_attempted + parseInt(player.stats.ft_attempted);
      ft_made = ft_made + parseInt(player.stats.ft_made);
      three_made = three_made + parseInt(player.stats.three_made);
      pts_total = pts_total + parseInt(player.stats.pts_total);
      rebounds_total = rebounds_total + parseInt(player.stats.rebounds_total);
      assists_total = assists_total + parseInt(player.stats.assists_total);
      steals_total = steals_total + parseInt(player.stats.steals_total);
      blocks_total = blocks_total + parseInt(player.stats.blocks_total);
      turnovers_total =
        turnovers_total + parseInt(player.stats.turnovers_total);
    }
  }

  for (i = 0; i < statsOtherTeam.length; i++) {
    const player = statsOtherTeam[i];
    if (player.stats.games_played != "-" && addedPlayers.includes(player.id)) {
      console.log(player.name);

      games_played = games_played + parseInt(player.stats.games_played);
      fg_attempted = fg_attempted + parseInt(player.stats.fg_attempted);
      fg_made = fg_made + parseInt(player.stats.fg_made);
      ft_attempted = ft_attempted + parseInt(player.stats.ft_attempted);
      ft_made = ft_made + parseInt(player.stats.ft_made);
      three_made = three_made + parseInt(player.stats.three_made);
      pts_total = pts_total + parseInt(player.stats.pts_total);
      rebounds_total = rebounds_total + parseInt(player.stats.rebounds_total);
      assists_total = assists_total + parseInt(player.stats.assists_total);
      steals_total = steals_total + parseInt(player.stats.steals_total);
      blocks_total = blocks_total + parseInt(player.stats.blocks_total);
      turnovers_total =
        turnovers_total + parseInt(player.stats.turnovers_total);
    }
  }

  statsAfterTrade = {
    fg_percentage: (fg_made / fg_attempted) * 100,
    ft_percentage: (ft_made / ft_attempted) * 100,
    three_avg: three_made / games_played,
    pts_avg: pts_total / games_played,
    rebounds_avg: rebounds_total / games_played,
    assists_avg: assists_total / games_played,
    steals_avg: steals_total / games_played,
    blocks_avg: blocks_total / games_played,
    turnovers_avg: turnovers_total / games_played,
  };
  return statsAfterTrade;
}

function calculateAverageStatsTraded(team, teamStats, tradedPlayers) {
  var tradedStats = {};

  var games_played = 0,
    fg_attempted = 0,
    fg_made = 0,
    ft_attempted = 0,
    ft_made = 0,
    three_made = 0,
    pts_total = 0,
    rebounds_total = 0,
    assists_total = 0,
    steals_total = 0,
    blocks_total = 0,
    turnovers_total = 0;

  for (var i = 0; i < teamStats.length; i++) {
    const player = teamStats[i];
    if (player.stats.games_played != "-" && tradedPlayers.includes(player.id)) {
      games_played = games_played + parseInt(player.stats.games_played);
      fg_attempted = fg_attempted + parseInt(player.stats.fg_attempted);
      fg_made = fg_made + parseInt(player.stats.fg_made);
      ft_attempted = ft_attempted + parseInt(player.stats.ft_attempted);
      ft_made = ft_made + parseInt(player.stats.ft_made);
      three_made = three_made + parseInt(player.stats.three_made);
      pts_total = pts_total + parseInt(player.stats.pts_total);
      rebounds_total = rebounds_total + parseInt(player.stats.rebounds_total);
      assists_total = assists_total + parseInt(player.stats.assists_total);
      steals_total = steals_total + parseInt(player.stats.steals_total);
      blocks_total = blocks_total + parseInt(player.stats.blocks_total);
      turnovers_total =
        turnovers_total + parseInt(player.stats.turnovers_total);
    }
  }

  tradedStats = {
    fg_percentage: (fg_made / fg_attempted) * 100,
    ft_percentage: (ft_made / ft_attempted) * 100,
    three_avg: three_made / games_played,
    pts_avg: pts_total / games_played,
    rebounds_avg: rebounds_total / games_played,
    assists_avg: assists_total / games_played,
    steals_avg: steals_total / games_played,
    blocks_avg: blocks_total / games_played,
    turnovers_avg: turnovers_total / games_played,
  };
  return tradedStats;
}

export default TradeAnalyzerTeamStats;
