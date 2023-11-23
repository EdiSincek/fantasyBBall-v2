const auth_constants = require("./authorization.json");
const axios = require("axios");
const constants = require("./constants");
const { XMLParser } = require("fast-xml-parser");

exports.directToYahoo = {
  async getFreeAgents() {
    const parser = new XMLParser();
    const url =
      "https://fantasysports.yahooapis.com/fantasy/v2/league/" +
      constants.LEAGUE_KEY +
      "/players;status=FA;count=10;sort=OR";
    try {
      response = await axios({
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
      console.log(jsonData.fantasy_content.league.players.player);
      return jsonData;
    } catch (err) {
      console.error(`Error in getInitialAuthorization(): ${err}`);
    }
  },
};
