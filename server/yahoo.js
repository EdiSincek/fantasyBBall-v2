const constants = require("./constants");
const stats_constants = require("./stats_constants");
const helpers = require("./helperfunctions");

const fs = require("fs");

exports.yahoo = {
  // Returns object with league standings
  // IS IT SORTED?
  async getStandings(yf) {
    const result = [];
    try {
      const data = await yf.league.standings(constants.LEAGUE_KEY);
      const standings = data.standings;
      var position = 1;
      for (var i = 0; i < constants.NUM_TEAMS; i++) {
        const team = {
          team_position: position,
          team_name: standings[i].name,
          team_manager: standings[i].managers[0].nickname,
          wins: standings[i].standings.outcome_totals.wins,
          losses: standings[i].standings.outcome_totals.losses,
          ties: standings[i].standings.outcome_totals.ties,
          win_percentage: standings[i].standings.outcome_totals.percentage,
          games_back: standings[i].standings.games_back,
        };
        team.points = team.wins + 0.5 * team.ties;
        position = position + 1;
        result[i] = team;
      }
    } catch (e) {
      if (e.description == "You must be logged in to view this league.") {
        console.log(
          "Authorization error in yahoo.js: getStandings - REQUESTING NEW ACCESS TOKEN"
        );
      } else {
        console.log("Error in yahoo.js: getStandings: " + e.description);
      }
    } finally {
      return result;
    }
  },

  // Returns league settings, nothing useful
  async getSettings(yf) {
    try {
      const settings = await yf.league.settings(constants.LEAGUE_KEY);
      console.log(settings);
    } catch (e) {
      console.log("Error in yahoo.js: getSettings: " + e.description);
    }
  },

  // Returns league matchups
  async getMatchups(yf, week) {
    var matchups;
    try {
      if (week != null) {
        matchups = await yf.league.scoreboard(constants.LEAGUE_KEY, week);
      } else {
        matchups = await yf.league.scoreboard(constants.LEAGUE_KEY);
      }
      const result = [];
      for (var i = 0; i < constants.NUM_TEAMS / 2; i++) {
        const matchup = {
          matchup: i + 1,
          team_1: matchups.scoreboard.matchups[i].teams[0].name,
          team_1_manager:
            matchups.scoreboard.matchups[i].teams[0].managers[0].nickname,
          team_2: matchups.scoreboard.matchups[i].teams[1].name,
          team_2_manager:
            matchups.scoreboard.matchups[i].teams[1].managers[0].nickname,
          team_1_fg: parseFloat(
            matchups.scoreboard.matchups[i].teams[0].stats[1].value
          ),
          team_1_ft: parseFloat(
            matchups.scoreboard.matchups[i].teams[0].stats[3].value
          ),
          team_1_three: parseFloat(
            matchups.scoreboard.matchups[i].teams[0].stats[4].value
          ),
          team_1_points: parseFloat(
            matchups.scoreboard.matchups[i].teams[0].stats[5].value
          ),
          team_1_rebounds: parseFloat(
            matchups.scoreboard.matchups[i].teams[0].stats[6].value
          ),
          team_1_assists: parseFloat(
            matchups.scoreboard.matchups[i].teams[0].stats[7].value
          ),
          team_1_steals: parseFloat(
            matchups.scoreboard.matchups[i].teams[0].stats[8].value
          ),
          team_1_blocks: parseFloat(
            matchups.scoreboard.matchups[i].teams[0].stats[9].value
          ),
          team_1_turnovers: parseFloat(
            matchups.scoreboard.matchups[i].teams[0].stats[10].value
          ),
          team_2_fg: parseFloat(
            matchups.scoreboard.matchups[i].teams[1].stats[1].value
          ),
          team_2_ft: parseFloat(
            matchups.scoreboard.matchups[i].teams[1].stats[3].value
          ),
          team_2_three: parseFloat(
            matchups.scoreboard.matchups[i].teams[1].stats[4].value
          ),
          team_2_points: parseFloat(
            matchups.scoreboard.matchups[i].teams[1].stats[5].value
          ),
          team_2_rebounds: parseFloat(
            matchups.scoreboard.matchups[i].teams[1].stats[6].value
          ),
          team_2_assists: parseFloat(
            matchups.scoreboard.matchups[i].teams[1].stats[7].value
          ),
          team_2_steals: parseFloat(
            matchups.scoreboard.matchups[i].teams[1].stats[8].value
          ),
          team_2_blocks: parseFloat(
            matchups.scoreboard.matchups[i].teams[1].stats[9].value
          ),
          team_2_turnovers: parseFloat(
            matchups.scoreboard.matchups[i].teams[1].stats[10].value
          ),
        };
        result[i] = matchup;
      }
      return result;
    } catch (e) {
      console.log("Error in yahoo.js: getMatchups: " + e.description);
    }
  },

  //Get basic player data - id,name,team,img,positions
  async getPlayer(yf, playerId) {
    try {
      const player = await yf.player.meta(
        constants.NBA_2023 + ".p." + playerId
      );
      const name = {
        id: player.player_id,
        name: player.name.full,
        real_team: player.editorial_team_full_name,
        image: player.image_url,
        undroppable: player.is_undroppable == "0" ? false : true,
        positions: player.eligible_positions,
        stats_url: player.url,
      };
      return name;
    } catch (e) {
      console.log("Error in yahoo.js: getPlayer: " + e.description);
    }
  },

  //Get stats by player and by season; playerId and year key required
  async getStatsByPlayer(yf, playerId, year = constants.NBA_2023) {
    const stats_list = [
      "games_played",
      "fg_percentage",
      "ft_percentage",
      "three_made",
      "three_percentage",
      "pts_total",
      "rebounds_total",
      "assists_total",
      "steals_total",
      "blocks_total",
      "turnovers_total",
      "fg_attempted",
      "fg_made",
      "ft_attempted",
      "ft_made",
    ];
    var result = {};
    try {
      const stats = await yf.player.stats(year + ".p." + playerId);
      if (stats != undefined) {
        result = {
          name: stats.name.full,
          id: playerId,
          image: stats.image_url,
          real_team: stats.editorial_team_full_name,
          positions: stats.eligible_positions,
        };
        const stats_object = {};
        if (stats.stats != null && stats.stats.stats != null) {
          for (var i = 0; i < Object.keys(stats.stats.stats).length; i++) {
            if (stats.stats != null && stats.stats.stats != null) {
              if (
                stats_constants.hasOwnProperty(stats.stats.stats[i].stat_id)
              ) {
                if (
                  stats_list.includes(
                    stats_constants[stats.stats.stats[i].stat_id]
                  )
                ) {
                  const stat_key =
                    stats_constants[stats.stats.stats[i].stat_id];
                  const stat_value = stats.stats.stats[i].value;
                  stats_object[stat_key] = stat_value;
                }
              }
            }
          }
          result.stats = stats_object;
        }
      }
    } catch (e) {
      console.log("Error in yahoo.js: getStatsByPlayer: " + e.description);
    } finally {
      return result;
    }
  },

  //Get roster by teamId
  async getRoster(yf, teamId) {
    const result = [];
    try {
      const roster = await yf.team.roster(
        constants.NBA_2023 + ".l." + constants.LEAGUE_ID + ".t." + teamId
      );
      var i = 0;
      roster.roster.forEach((element) => {
        const player = {
          player_key: element.player_key,
          player_id: element.player_id,
          player_name: element.name.full,
        };
        result[i] = player;
        i++;
      });
      return result;
    } catch (e) {
      console.log("Error in yahoo.js: getRoster: " + e);
    }
  },

  async getRosterWithStats(yf, teamId) {
    try {
      const statsByPlayer = [];
      const roster = await this.getRoster(yf, teamId);
      var i = 0;
      for (const player of roster) {
        const playerStats = await this.getStatsByPlayer(yf, player.player_id);
        if (Object.keys(playerStats).length != 0) {
          statsByPlayer[i] = playerStats;
        }
        i++;
      }
      return statsByPlayer;
    } catch (e) {
      console.log("Error in yahoo.js: getRosterWithStats: " + e);
    }
  },

  async getTeamAverageStats(yf, teamId, year = constants.NBA_2023) {
    try {
      const statsByPlayer = [];
      const roster = await this.getRoster(yf, teamId);
      var i = 0;
      for (const player of roster) {
        const playerStats = await this.getStatsByPlayer(
          yf,
          player.player_id,
          year
        );
        if (Object.keys(playerStats).length != 0) {
          statsByPlayer[i] = playerStats;
        }
        i++;
      }
      const averageStats = calculateTeamAverageStats(statsByPlayer, teamId);
      return averageStats;
    } catch (e) {
      console.log("Error in yahoo.js: getTeamAverageStats: " + e);
    }
  },

  //Get weekly total stats from matchups and sort them by matchups won
  async getLeagueWeeklyTotalStats(yf, week = constants.CURRENT_WEEK) {
    const result = [];
    var i = 0;
    const matchups = await this.getMatchups(yf, week);
    matchups.forEach((matchup) => {
      const team1 = {
        team_name: matchup.team_1,
        team_manager: matchup.team_1_manager,
        fg_percentage: matchup.team_1_fg,
        ft_percentage: matchup.team_1_ft,
        three_made: matchup.team_1_three,
        pts_total: matchup.team_1_points,
        rebounds_total: matchup.team_1_rebounds,
        assists_total: matchup.team_1_assists,
        steals_total: matchup.team_1_steals,
        blocks_total: matchup.team_1_blocks,
        turnovers_total: matchup.team_1_turnovers,
      };
      const team2 = {
        team_name: matchup.team_2,
        team_manager: matchup.team_2_manager,
        fg_percentage: matchup.team_2_fg,
        ft_percentage: matchup.team_2_ft,
        three_made: matchup.team_2_three,
        pts_total: matchup.team_2_points,
        rebounds_total: matchup.team_2_rebounds,
        assists_total: matchup.team_2_assists,
        steals_total: matchup.team_2_steals,
        blocks_total: matchup.team_2_blocks,
        turnovers_total: matchup.team_2_turnovers,
      };
      result[i] = team1;
      result[i + 1] = team2;
      i = i + 2;
    });

    resultSorted = helpers.helpers.sortLeagueStats(result);
    const fileName = "stats-week-" + week + ".json";
    const json = JSON.stringify(resultSorted);
    writeToFile(json, fileName, "w");
    console.log("Weekly data for week " + week + " added.");
  },

  //Get season average stats - total / weeks, sorted by matchups won
  getSeasonTotalStats() {
    var result = [];
    var teamNum;
    for (var i = 1; i < constants.CURRENT_WEEK + 1; i++) {
      const filePath = "stats-week-" + i + ".json";

      weeklyData = fs.readFileSync(filePath);
      weeklyData = JSON.parse(weeklyData);
      if (i == 1) {
        teamNum = 0;
        weeklyData.forEach((team) => {
          result[teamNum] = {
            team_name: team.team_name,
            team_manager: team.team_manager,
            fg_percentage: 0,
            ft_percentage: 0,
            three_made: 0,
            pts_total: 0,
            rebounds_total: 0,
            assists_total: 0,
            steals_total: 0,
            blocks_total: 0,
            turnovers_total: 0,
          };
          teamNum += 1;
        });
      }
      teamNum = 0;
      weeklyData.forEach((team) => {
        result.forEach((entry) => {
          if (team.team_name == entry.team_name) {
            entry.fg_percentage = entry.fg_percentage + team.fg_percentage;
            entry.ft_percentage = entry.ft_percentage + team.ft_percentage;
            entry.three_made = entry.three_made + team.three_made;
            entry.pts_total = entry.pts_total + team.pts_total;
            entry.rebounds_total = entry.rebounds_total + team.rebounds_total;
            entry.assists_total = entry.assists_total + team.assists_total;
            entry.steals_total = entry.steals_total + team.steals_total;
            entry.blocks_total = entry.blocks_total + team.blocks_total;
            entry.turnovers_total =
              entry.turnovers_total + team.turnovers_total;

            if (i == constants.CURRENT_WEEK) {
              entry.fg_percentage = (entry.fg_percentage / i).toFixed(3);
              entry.ft_percentage = (entry.ft_percentage / i).toFixed(3);
              entry.three_made = entry.three_made;
              entry.pts_total = entry.pts_total;
              entry.rebounds_total = entry.rebounds_total;
              entry.assists_total = entry.assists_total;
              entry.steals_total = entry.steals_total;
              entry.blocks_total = entry.blocks_total;
              entry.turnovers_total = entry.turnovers_total;
            }
          }
        });
      });
    }
    const fileName = "stats-season.json";
    resultSorted = helpers.helpers.sortLeagueStats(result);
    const json = JSON.stringify(resultSorted);
    writeToFile(json, fileName, "w");
    console.log("Season stats added.");
  },
};

function calculateTeamAverageStats(playerStats, teamId) {
  var result = {};
  var gp = 0,
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
    turnovers_total = 0,
    fg_percentage = 0,
    ft_percentage = 0;

  if (Object.keys(playerStats).length != 0) {
    for (const player of playerStats) {
      if (player != undefined && Object.keys(player).length != 0) {
        if (player.stats.games_played != "-") {
          gp = gp + parseFloat(player.stats.games_played);
          fg_attempted = fg_attempted + parseFloat(player.stats.fg_attempted);
          fg_made = fg_made + parseFloat(player.stats.fg_made);
          ft_attempted = ft_attempted + parseFloat(player.stats.ft_attempted);
          ft_made = ft_made + parseFloat(player.stats.ft_made);
          three_made = three_made + parseFloat(player.stats.three_made);
          pts_total = pts_total + parseFloat(player.stats.pts_total);
          rebounds_total =
            rebounds_total + parseFloat(player.stats.rebounds_total);
          assists_total =
            assists_total + parseFloat(player.stats.assists_total);
          steals_total = steals_total + parseFloat(player.stats.steals_total);
          blocks_total = blocks_total + parseFloat(player.stats.blocks_total);
          turnovers_total =
            turnovers_total + parseFloat(player.stats.turnovers_total);
        }
      }
    }
    fg_percentage = (fg_made / fg_attempted).toFixed(3);
    ft_percentage = (ft_made / ft_attempted).toFixed(3);
    result = {
      teamId: teamId,
      games_played: gp,
      fg_percentage: fg_percentage,
      ft_percentage: ft_percentage,
      three_made: three_made,
      three_avg: parseFloat((three_made / gp).toFixed(2)),
      pts_total: pts_total,
      pts_avg: parseFloat((pts_total / gp).toFixed(2)),
      rebounds_total: rebounds_total,
      rebounds_avg: parseFloat((rebounds_total / gp).toFixed(2)),
      assists_total: assists_total,
      assists_avg: parseFloat((assists_total / gp).toFixed(2)),
      steals_total: steals_total,
      steals_avg: parseFloat((steals_total / gp).toFixed(2)),
      blocks_total: blocks_total,
      blocks_avg: parseFloat((blocks_total / gp).toFixed(2)),
      turnovers_total: turnovers_total,
      turnovers_avg: parseFloat((turnovers_total / gp).toFixed(2)),
    };
  }
  return result;
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
