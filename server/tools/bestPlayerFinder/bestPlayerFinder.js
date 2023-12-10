const yahoo = require("../../yahoo");
const constants = require("../../constants");
const playerAnalytics = require("../../playerAnalytics");
const fs = require("fs");

exports.bestPlayerFinder = {
  async getBestPlayersForTeam(secondTeamId, stats, puntCategories, minusOne) {
    const result = [];
    const avgAndZ =
      playerAnalytics.playerAnalytics.getTeamAvgAndDeviationByCategory(stats);
    const allPlayers = readJsonFile("allRosteredPlayersWithStats.json");
    for (var i = 0; i < allPlayers[secondTeamId - 1].length; i++) {
      const zScore =
        allPlayers[secondTeamId - 1][i].stats.games_played != "-"
          ? playerAnalytics.playerAnalytics.getPlayerZScoreFromAvgStats(
              avgAndZ,
              allPlayers[secondTeamId - 1][i].stats,
              puntCategories,
              minusOne
            )
          : {};
      const player = {
        name: allPlayers[secondTeamId - 1][i].name,
        stats: allPlayers[secondTeamId - 1][i].stats,
        zScore: zScore,
      };
      result[i] = player;
    }
    result
      .sort((a, b) => a.zScore.totalZScore - b.zScore.totalZScore)
      .reverse();
    return result;
  },

  async getAllRosteredPlayersWithStats(yf) {
    var result = [];
    const fileName = "allRosteredPlayersWithStats.json";
    for (var i = 1; i < constants.NUM_TEAMS + 1; i++) {
      console.log("Getting players for team: " + i);
      const players = await yahoo.yahoo.getRosterWithStats(yf, i);
      result[i - 1] = players;
    }
    for (i = 0; i < result.length; i++) {
      for (var j = 0; j < result[i].length; j++) {
        console.log("Calculating stats for player: " + result[i][j].name);
        result[i][j].stats = calculateAverages(result[i][j].stats);
      }
    }

    var json = JSON.stringify(result);
    writeToFile(json, fileName, "w");
    console.log("All rostered players with stats added");
  },
};

function calculateAverages(stats) {
  return {
    games_played: stats.games_played,
    fg_attempted: stats.fg_attempted,
    ft_attempted: stats.ft_attempted,
    fg_avg: (stats.fg_made / stats.fg_attempted).toFixed(5),
    ft_avg: (stats.ft_made / stats.ft_attempted).toFixed(5),
    three_avg: (stats.three_made / stats.games_played).toFixed(5),
    pts_avg: (stats.pts_total / stats.games_played).toFixed(5),
    rebounds_avg: (stats.rebounds_total / stats.games_played).toFixed(5),
    assists_avg: (stats.assists_total / stats.games_played).toFixed(5),
    steals_avg: (stats.steals_total / stats.games_played).toFixed(5),
    blocks_avg: (stats.blocks_total / stats.games_played).toFixed(5),
    turnovers_avg: (stats.turnovers_total / stats.games_played).toFixed(5),
  };
}

function writeToFile(data, file, flag) {
  if (flag === null) {
    flag = `a`;
  }
  fs.writeFileSync(file, data, { flag }, (err) => {
    if (err) {
      console.error(`Error in writing to ${file}: ${err}`);
    }
  });
  return 1;
}

function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath));
}
