const express = require("express");
const cors = require("cors");
const YahooFantasy = require("yahoo-fantasy");
const yahoo = require("./yahoo");
const auth_constants = require("./authorization.json");
const auth = require("./authorization");
const constants = require("./constants");
const app = express();
const port = 3000;
const fs = require("fs");

const whitelist = ["http://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const yf = new YahooFantasy(
  auth_constants.CUSTOMER_ID,
  auth_constants.CUSTOMER_SECRET
);
yf.setUserToken(auth_constants.ACCESS_TOKEN);

app.get("/", (req, res) => {
  res.send("Hello World!");
  homePage();
});

app.get("/standings", async (req, res) => {
  const standings = await yahoo.yahoo.getStandings(yf);
  res.send(standings);
});

app.get("/player", async (req, res) => {
  const player = await yahoo.yahoo.getPlayer(yf, req.query.playerId);
  res.send(player);
});

app.get("/statsByPlayer", async (req, res) => {
  const stats = await yahoo.yahoo.getStatsByPlayer(
    yf,
    req.query.playerId,
    req.query.year
  );
  res.send(stats);
});

app.get("/roster", async (req, res) => {
  const roster = await yahoo.yahoo.getRoster(yf, req.query.teamId);
  res.send(roster);
});

app.get("/teamAverageStats", async (req, res) => {
  const teamStats = await yahoo.yahoo.getTeamAverageStats(
    yf,
    req.query.teamId,
    constants.NBA_2022
  );
  res.send(teamStats);
});

app.get("/matchups", async (req, res) => {
  const matchups = await yahoo.yahoo.getMatchups(yf);
  res.send(matchups);
});

app.get("/weeklyLeagueStats", (req, res) => {
  var filePath;
  if (req.query.week == "season") {
    filePath = "stats-season.json";
  } else {
    filePath = "stats-week-" + req.query.week + ".json";
  }
  weeklyStats = readJsonFile(filePath);
  res.send(weeklyStats);
});

async function homePage() {
  try {
  } catch (e) {
    console.log(e.description);
  }
}

function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath));
}
