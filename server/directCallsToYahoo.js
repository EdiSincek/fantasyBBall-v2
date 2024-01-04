const auth_constants = require("./authorization.json");
const axios = require("axios");
const constants = require("./constants");
const yahoo = require("./yahoo");
const fs = require("fs");
const { XMLParser } = require("fast-xml-parser");

exports.directToYahoo = {
  async storeFreeAgents(yf, pages) {
    const filePath = "./data/freeAgents.json";
    const freeAgents = await this.getFreeAgents(yf);
    const json = JSON.stringify(freeAgents, pages);
    writeToFile(json, filePath, "w");
    console.log("Free agents stored.");
  },

  //Pass number of free agents wanted, will return player names, keys and ids
  async getFreeAgents(yf, pages) {
    const parser = new XMLParser();
    try {
      const freeAgents = [];
      for (var j = 0; j < pages; j++) {
        const start = j * 25;
        const url =
          "https://fantasysports.yahooapis.com/fantasy/v2/league/" +
          constants.LEAGUE_KEY +
          "/players;status=FA;count=" +
          25 +
          ";start=" +
          start +
          ";sort=OR";
        const response = await axios({
          url,
          method: "get",
          headers: {
            Authorization: `Bearer ${auth_constants.ACCESS_TOKEN}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36",
          },
        });
        const jsonData = parser.parse(response.data);
        for (
          var i = 0;
          i < jsonData.fantasy_content.league.players.player.length;
          i++
        ) {
          const player = {
            name: jsonData.fantasy_content.league.players.player[i].name.full,
            key: jsonData.fantasy_content.league.players.player[i].player_key,
            id: jsonData.fantasy_content.league.players.player[i].player_id,
          };
          freeAgents[i + j * 25] = player;
        }
      }
      for (const freeAgent of freeAgents) {
        console.log("Fetching stats for player: " + freeAgent.name);
        const player = await yahoo.yahoo.getStatsByPlayer(
          yf,
          freeAgent.id,
          constants.NBA_2023,
          "lastmonth"
        );
        const stats = {
          games_played: player.stats.games_played,
          fg_attempted: player.stats.fg_attempted,
          ft_attempted: player.stats.ft_attempted,
          fg_avg: (player.stats.fg_made / player.stats.fg_attempted).toFixed(5),
          ft_avg: (player.stats.ft_made / player.stats.ft_attempted).toFixed(5),
          three_avg: (
            player.stats.three_made / player.stats.games_played
          ).toFixed(5),
          pts_avg: (player.stats.pts_total / player.stats.games_played).toFixed(
            5
          ),
          rebounds_avg: (
            player.stats.rebounds_total / player.stats.games_played
          ).toFixed(5),
          assists_avg: (
            player.stats.assists_total / player.stats.games_played
          ).toFixed(5),
          steals_avg: (
            player.stats.steals_total / player.stats.games_played
          ).toFixed(5),
          blocks_avg: (
            player.stats.blocks_total / player.stats.games_played
          ).toFixed(5),
          turnovers_avg: (
            player.stats.turnovers_total / player.stats.games_played
          ).toFixed(5),
        };
        freeAgent.stats = stats;
      }

      return freeAgents;
    } catch (err) {
      console.error(`Error in getFreeAgents(): ${err}`);
    }
  },
};

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
