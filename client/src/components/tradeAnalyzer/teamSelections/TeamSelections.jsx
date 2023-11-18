import React, { useState, useEffect } from "react";
import "./TeamSelections.css";
import TeamRosters from "../teamRosters/TeamRosters";
import TradeAnalyzerTeamStats from "../TradeAnalyzerTeamStats/TradeAnalyzerTeamStats";

class TeamSelections extends React.Component {
  constructor(props) {
    super(props);
    this.state = { team1: "empty", team2: "empty" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const url1 =
      "http://localhost:3000/rosterWithStats?teamId=" + event.target[0].value;
    const url2 =
      "http://localhost:3000/rosterWithStats?teamId=" + event.target[1].value;

    const fetchData = async () => {
      await fetch(url1)
        .then((res) => res.json())
        .then((data) =>
          sessionStorage.setItem("tradeTeam1Stats", JSON.stringify(data))
        )
        .catch((error) => console.error(error));
      await fetch(url2)
        .then((res) => res.json())
        .then((data) =>
          sessionStorage.setItem("tradeTeam2Stats", JSON.stringify(data))
        )
        .catch((error) => console.error(error));
      this.setState({
        team1: event.target[0].value,
        team2: event.target[1].value,
      });
    };
    fetchData();

    event.preventDefault();
  }

  render() {
    return (
      <div className="TeamSelections">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="team1">TEAM 1:</label>
          <select id="team1" name="team2">
            <option value={1}>Healthy Guys</option>
            <option value={2}>Cedevita</option>
            <option value={3}>KBCSestreMilosrdnice</option>
            <option value={4}>Kimpembe Mutombo</option>
            <option value={5}>Mamojebači </option>
            <option value={6}>Prednji Križni Derricka Rose-a</option>
            <option value={7}>Rings Erneh</option>
            <option value={8}>Thomas' Tank Engine</option>
            <option value={9}>Triple Single</option>
            <option value={10}>VŽ Balkanersi</option>
            <option value={11}>KK Romska Vatra</option>
            <option value={12}>KK Vindija</option>
          </select>
          <label htmlFor="team1">TEAM 2:</label>
          <select id="team2" name="team2">
            <option value={1}>Healthy Guys</option>
            <option value={2}>Cedevita</option>
            <option value={3}>KBCSestreMilosrdnice</option>
            <option value={4}>Kimpembe Mutombo</option>
            <option value={5}>Mamojebači </option>
            <option value={6}>Prednji Križni Derricka Rose-a</option>
            <option value={7}>Rings Erneh</option>
            <option value={8}>Thomas' Tank Engine</option>
            <option value={9}>Triple Single</option>
            <option value={10}>VŽ Balkanersi</option>
            <option value={11}>KK Romska Vatra</option>
            <option value={12}>KK Vindija</option>
          </select>
          <input className="inputBtnSubmit" type="submit" value="TRADE" />
        </form>
        <div className="teamRosters">
          <div className="team1">
            <TeamRosters key="team1" teamId={this.state.team1} team={1} />
          </div>
          <div className="team2">
            <TeamRosters key="team2" teamId={this.state.team2} team={2} />
          </div>
        </div>
        <div className="statsTable">
          <TradeAnalyzerTeamStats />
        </div>
      </div>
    );
  }
}

export default TeamSelections;
