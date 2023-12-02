const helpers = require("./helperfunctions");

exports.playerAnalytics = {
  getPlayerZScoreWithoutStats(teamId, playerId) {},

  getPlayerZScore(teamStats, playerStats) {},

  getPlayerZScoreFromAvgStats(
    teamAvgStats,
    playerStats,
    excludedCategories = []
  ) {
    const zScoreByCategory = [];
    //Calculate weighted z scores of fg and ft
    const fgZScore =
      ((playerStats.fg_avg - teamAvgStats.fg_avg) / teamAvgStats.fg_stdDev) *
      (playerStats.fg_attempted /
        playerStats.games_played /
        teamAvgStats.fg_attempted_avg);
    if (!excludedCategories.includes("fg")) zScoreByCategory.push(fgZScore);

    const ftZScore =
      ((playerStats.ft_avg - teamAvgStats.ft_avg) / teamAvgStats.ft_stdDev) *
      (playerStats.ft_attempted /
        playerStats.games_played /
        teamAvgStats.ft_attempted_avg);
    if (!excludedCategories.includes("ft")) zScoreByCategory.push(ftZScore);

    //Calculate z score of other categories
    const threeZScore =
      (playerStats.three_avg - teamAvgStats.three_avg) /
      teamAvgStats.three_stdDev;
    if (!excludedCategories.includes("three"))
      zScoreByCategory.push(threeZScore);

    const pointsZScore =
      (playerStats.pts_avg - teamAvgStats.pts_avg) / teamAvgStats.pts_stdDev;
    if (!excludedCategories.includes("pts"))
      zScoreByCategory.push(pointsZScore);

    const reboundsZScore =
      (playerStats.rebounds_avg - teamAvgStats.rebounds_avg) /
      teamAvgStats.rebounds_stdDev;
    if (!excludedCategories.includes("rebounds"))
      zScoreByCategory.push(reboundsZScore);

    const assistsZScore =
      (playerStats.assists_avg - teamAvgStats.assists_avg) /
      teamAvgStats.assists_stdDev;
    if (!excludedCategories.includes("assists"))
      zScoreByCategory.push(assistsZScore);

    const stealsZScore =
      (playerStats.steals_avg - teamAvgStats.steals_avg) /
      teamAvgStats.steals_stdDev;
    if (!excludedCategories.includes("steals"))
      zScoreByCategory.push(stealsZScore);

    const blocksZScore =
      (playerStats.blocks_avg - teamAvgStats.blocks_avg) /
      teamAvgStats.blocks_stdDev;
    if (!excludedCategories.includes("blocks"))
      zScoreByCategory.push(blocksZScore);

    const turnoversZScore =
      -1 *
      ((playerStats.turnovers_avg - teamAvgStats.turnovers_avg) /
        teamAvgStats.turnovers_stdDev);
    if (!excludedCategories.includes("turnovers"))
      zScoreByCategory.push(turnoversZScore);

    const playersZScore = helpers.helpers.calculateMean(zScoreByCategory);
    return playersZScore;
  },

  getTeamAvgAndDeviationByCategory(teamRosterWithStats) {
    var gp = 0,
      fg_attempted = 0,
      fg_made = 0,
      ft_attempted = 0,
      ft_made = 0,
      fg = [],
      fg_atmp = [],
      ft = [],
      ft_atmp = [],
      three = [],
      pts = [],
      rebounds = [],
      assists = [],
      steals = [],
      blocks = [],
      turnovers = [];
    for (var i = 0; i < teamRosterWithStats.length; i++) {
      if (teamRosterWithStats[i].stats.games_played != "-") {
        gp += parseInt(teamRosterWithStats[i].stats.games_played);
        fg_attempted += parseInt(teamRosterWithStats[i].stats.fg_attempted);
        fg_made += parseInt(teamRosterWithStats[i].stats.fg_made);
        ft_attempted += parseInt(teamRosterWithStats[i].stats.ft_attempted);
        ft_made += parseInt(teamRosterWithStats[i].stats.ft_made);
        fg.push(
          teamRosterWithStats[i].stats.fg_made /
            teamRosterWithStats[i].stats.fg_attempted
        );
        fg_atmp.push(
          teamRosterWithStats[i].stats.fg_attempted /
            teamRosterWithStats[i].stats.games_played
        );
        ft.push(
          teamRosterWithStats[i].stats.ft_made /
            teamRosterWithStats[i].stats.ft_attempted
        );
        ft_atmp.push(
          teamRosterWithStats[i].stats.ft_attempted /
            teamRosterWithStats[i].stats.games_played
        );
        three.push(
          teamRosterWithStats[i].stats.three_made /
            teamRosterWithStats[i].stats.games_played
        );
        pts.push(
          teamRosterWithStats[i].stats.pts_total /
            teamRosterWithStats[i].stats.games_played
        );
        rebounds.push(
          teamRosterWithStats[i].stats.rebounds_total /
            teamRosterWithStats[i].stats.games_played
        );
        assists.push(
          teamRosterWithStats[i].stats.assists_total /
            teamRosterWithStats[i].stats.games_played
        );
        steals.push(
          teamRosterWithStats[i].stats.steals_total /
            teamRosterWithStats[i].stats.games_played
        );
        blocks.push(
          teamRosterWithStats[i].stats.blocks_total /
            teamRosterWithStats[i].stats.games_played
        );
        turnovers.push(
          teamRosterWithStats[i].stats.turnovers_total /
            teamRosterWithStats[i].stats.games_played
        );
      }
    }

    const result = {
      fg_avg: fg_made / fg_attempted,
      fg_stdDev: helpers.helpers.calculateStandardDeviation(fg),
      fg_attempted_avg: helpers.helpers.calculateMean(fg_atmp),
      ft_avg: ft_made / ft_attempted,
      ft_stdDev: helpers.helpers.calculateStandardDeviation(ft),
      ft_attempted_avg: helpers.helpers.calculateMean(ft_atmp),
      three_avg: helpers.helpers.calculateMean(three),
      three_stdDev: helpers.helpers.calculateStandardDeviation(three),
      pts_avg: helpers.helpers.calculateMean(pts),
      pts_stdDev: helpers.helpers.calculateStandardDeviation(pts),
      rebounds_avg: helpers.helpers.calculateMean(rebounds),
      rebounds_stdDev: helpers.helpers.calculateStandardDeviation(rebounds),
      assists_avg: helpers.helpers.calculateMean(assists),
      assists_stdDev: helpers.helpers.calculateStandardDeviation(assists),
      steals_avg: helpers.helpers.calculateMean(steals),
      steals_stdDev: helpers.helpers.calculateStandardDeviation(steals),
      blocks_avg: helpers.helpers.calculateMean(blocks),
      blocks_stdDev: helpers.helpers.calculateStandardDeviation(blocks),
      turnovers_avg: helpers.helpers.calculateMean(turnovers),
      turnovers_stdDev: helpers.helpers.calculateStandardDeviation(turnovers),
    };
    return result;
  },
};
