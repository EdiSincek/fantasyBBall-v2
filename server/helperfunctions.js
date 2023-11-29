const fs = require("fs");
const constants = require("./constants");

exports.helpers = {
  sortLeagueStats(data) {
    var fg_percentage = [],
      ft_percentage = [],
      three_made = [],
      pts_total = [],
      rebounds_total = [],
      assists_total = [],
      steals_total = [],
      blocks_total = [],
      turnovers_total = [];
    var i = 0;
    for (const team of data) {
      fg_percentage[i] = team.fg_percentage;
      ft_percentage[i] = team.ft_percentage;
      three_made[i] = team.three_made;
      pts_total[i] = team.pts_total;
      rebounds_total[i] = team.rebounds_total;
      assists_total[i] = team.assists_total;
      steals_total[i] = team.steals_total;
      blocks_total[i] = team.blocks_total;
      turnovers_total[i] = team.turnovers_total;
      i++;
    }
    fg_percentage = fg_percentage.sort((a, b) => a - b).reverse();
    ft_percentage = ft_percentage.sort((a, b) => a - b).reverse();
    three_made = three_made.sort((a, b) => a - b).reverse();
    pts_total = pts_total.sort((a, b) => a - b).reverse();
    rebounds_total = rebounds_total.sort((a, b) => a - b).reverse();
    assists_total = assists_total.sort((a, b) => a - b).reverse();
    steals_total = steals_total.sort((a, b) => a - b).reverse();
    blocks_total = blocks_total.sort((a, b) => a - b).reverse();
    turnovers_total = turnovers_total.sort((a, b) => a - b);
    const result = [];
    i = 0;
    for (const team of data) {
      const teamPointsTotals =
        12 -
        fg_percentage.indexOf(team.fg_percentage) +
        12 -
        ft_percentage.indexOf(team.ft_percentage) +
        12 -
        three_made.indexOf(team.three_made) +
        12 -
        pts_total.indexOf(team.pts_total) +
        12 -
        rebounds_total.indexOf(team.rebounds_total) +
        12 -
        assists_total.indexOf(team.assists_total) +
        12 -
        steals_total.indexOf(team.steals_total) +
        12 -
        blocks_total.indexOf(team.blocks_total) +
        12 -
        turnovers_total.indexOf(team.turnovers_total);

      team.fg_percentage_position =
        fg_percentage.indexOf(team.fg_percentage) + 1;
      team.ft_percentage_position =
        ft_percentage.indexOf(team.ft_percentage) + 1;
      team.three_made_position = three_made.indexOf(team.three_made) + 1;
      team.pts_total_position = pts_total.indexOf(team.pts_total) + 1;
      team.rebounds_total_position =
        rebounds_total.indexOf(team.rebounds_total) + 1;
      team.assists_total_position =
        assists_total.indexOf(team.assists_total) + 1;
      team.steals_total_position = steals_total.indexOf(team.steals_total) + 1;
      team.blocks_total_position = blocks_total.indexOf(team.blocks_total) + 1;
      team.turnovers_total_position =
        turnovers_total.indexOf(team.turnovers_total) + 1;
      team.teamPointsTotals = teamPointsTotals;
      result[i] = team;
      i++;
    }
    var medalCalc = [];
    for (var y = 0; y < constants.NUM_TEAMS; y++) {
      const currentTeam = result[y];
      console.log("Sorting weekly stats for team: " + currentTeam.team_name);
      var matchupsWon = 0;
      var matchupsTied = 0;
      var matchupsLost = 0;
      for (var j = 0; j < constants.NUM_TEAMS; j++) {
        //For each matchup
        if (j != y) {
          var categoriesWon =
            (currentTeam.fg_percentage > result[j].fg_percentage ? 1 : 0) +
            (currentTeam.ft_percentage > result[j].ft_percentage ? 1 : 0) +
            (currentTeam.three_made > result[j].three_made ? 1 : 0) +
            (currentTeam.pts_total > result[j].pts_total ? 1 : 0) +
            (currentTeam.rebounds_total > result[j].rebounds_total ? 1 : 0) +
            (currentTeam.assists_total > result[j].assists_total ? 1 : 0) +
            (currentTeam.steals_total > result[j].steals_total ? 1 : 0) +
            (currentTeam.blocks_total > result[j].blocks_total ? 1 : 0) +
            (currentTeam.turnovers_total < result[j].turnovers_total ? 1 : 0);

          const categoriesTied =
            (currentTeam.fg_percentage == result[j].fg_percentage ? 1 : 0) +
            (currentTeam.ft_percentage == result[j].ft_percentage ? 1 : 0) +
            (currentTeam.three_made == result[j].three_made ? 1 : 0) +
            (currentTeam.pts_total == result[j].pts_total ? 1 : 0) +
            (currentTeam.rebounds_total == result[j].rebounds_total ? 1 : 0) +
            (currentTeam.assists_total == result[j].assists_total ? 1 : 0) +
            (currentTeam.steals_total == result[j].steals_total ? 1 : 0) +
            (currentTeam.blocks_total == result[j].blocks_total ? 1 : 0) +
            (currentTeam.turnovers_total == result[j].turnovers_total ? 1 : 0);

          const categoriesLost =
            (currentTeam.fg_percentage < result[j].fg_percentage ? 1 : 0) +
            (currentTeam.ft_percentage < result[j].ft_percentage ? 1 : 0) +
            (currentTeam.three_made < result[j].three_made ? 1 : 0) +
            (currentTeam.pts_total < result[j].pts_total ? 1 : 0) +
            (currentTeam.rebounds_total < result[j].rebounds_total ? 1 : 0) +
            (currentTeam.assists_total < result[j].assists_total ? 1 : 0) +
            (currentTeam.steals_total < result[j].steals_total ? 1 : 0) +
            (currentTeam.blocks_total < result[j].blocks_total ? 1 : 0) +
            (currentTeam.turnovers_total > result[j].turnovers_total ? 1 : 0);

          if (categoriesWon > categoriesLost) matchupsWon++;
          if (categoriesWon < categoriesLost) matchupsLost++;
          if (categoriesWon == categoriesLost) matchupsTied++;
        }
      }
      const matchupPoints = matchupsWon + 0.5 * matchupsTied;
      medalCalc[y] = matchupPoints;
      currentTeam.matchupsWon = matchupsWon;
      currentTeam.matchupsTied = matchupsTied;
      currentTeam.matchupsLost = matchupsLost;
      currentTeam.matchupPoints = matchupPoints;
      result[y] = currentTeam;
    }
    medalCalc.sort((a, b) => a - b).reverse();
    uniqueArray = medalCalc.filter(function (item, pos) {
      return medalCalc.indexOf(item) == pos;
    });
    for (var x = 0; x < constants.NUM_TEAMS; x++) {
      if (uniqueArray.indexOf(result[x].matchupPoints) < 3) {
        result[x].medalsWon = uniqueArray.indexOf(result[x].matchupPoints) + 1;
      } else if (
        uniqueArray.indexOf(result[x].matchupPoints) ==
        uniqueArray.length - 1
      ) {
        result[x].medalsWon = 12;
      } else {
        result[x].medalsWon = 0;
      }
    }

    result.sort((a, b) => a.matchupPoints - b.matchupPoints);
    result.reverse();
    return result;
  },

  calculateMean(array) {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
      total += array[i];
    }
    return total / array.length;
  },

  calculateStandardDeviation(array) {
    const mean = this.calculateMean(array);
    return Math.sqrt(
      array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) /
        (array.length - 1)
    );
  },
};
