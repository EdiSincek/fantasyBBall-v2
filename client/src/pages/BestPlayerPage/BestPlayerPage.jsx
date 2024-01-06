import { useState } from "react";
import "./BestPlayerPage.css";
import ZScoresTable from "../../components/tables/ZScoresTable/ZScoresTable";

function BestPlayerPage() {
  const [teamStats, setTeamStats] = useState({});
  const [playerZScores, setPlayerZScores] = useState({});
  const [excludedCategories, setExcludedCategories] = useState([]);

  async function selectTeam(event) {
    event.preventDefault();
    setPlayerZScores({});
    setTeamStats({ loading: "Fetching stats, please wait." });
    const url =
      "http://localhost:3000/rosterWithStats?teamId=" + event.target[0].value;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setTeamStats(data))
      .catch((error) => console.error(error));
  }

  function setPunts() {
    const checkboxes = document.getElementsByClassName("puntCheckbox");
    const checkedCheckboxes = Array.prototype.slice
      .call(checkboxes)
      .filter((ch) => ch.checked == true);
    const puntCategories = [];
    for (const n of checkedCheckboxes) {
      if (n.value != "minusOne") {
        puntCategories.push(n.value);
      }
    }
    setExcludedCategories(puntCategories);
    return puntCategories;
  }

  async function selectSecondTeam(event) {
    var secondTeamId;
    if (event.type === "submit") {
      event.preventDefault();
      secondTeamId = event.target[0].value;
      localStorage.setItem("secondTeamBPF", secondTeamId);
    } else {
      secondTeamId = localStorage.getItem("secondTeamBPF");
    }

    const url = "http://localhost:3000/getBestPlayer";
    const puntCategories = setPunts();
    const minusOne =
      document.getElementById("minusOne") != null
        ? document.getElementById("minusOne").checked
        : false;

    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secondTeamId: secondTeamId,
        teamStats: teamStats,
        puntCategories: puntCategories,
        minusOne: minusOne,
      }),
    })
      .then((res) => res.json())
      .then((data) => setPlayerZScores(data));
  }

  return (
    <div className="BestPlayerPage">
      <div className="TeamSelectionsBPF">
        <form onSubmit={selectTeam}>
          <label htmlFor="team">SELECT TEAM 1:</label>
          <select id="team">
            <option value={1}>Healthy Guys</option>
            <option value={2}>Cedevita</option>
            <option value={3}>KBCSestreMilosrdnice</option>
            <option value={4}>Kimpembe Mutombo</option>
            <option value={5}>Mamojebači </option>
            <option value={6}>Prednji Križni Derricka Rose-a</option>
            <option value={7}>Rings Erneh</option>
            <option value={8}>Thomas&apos; Tank Engine</option>
            <option value={9}>Triple Single</option>
            <option value={10}>VŽ Balkanersi</option>
            <option value={11}>KK Romska Vatra</option>
            <option value={12}>KK Vindija</option>
          </select>
          <input className="inputBtnSubmit" type="submit" value="SELECT" />
        </form>
      </div>
      {Object.keys(teamStats).length == 0 ? null : Object.keys(teamStats)
          .length == 1 ? (
        <p className="infoMsg">{teamStats.loading}</p>
      ) : (
        <div>
          <div className="TeamSelectionsBPF">
            <form onSubmit={selectSecondTeam}>
              <label htmlFor="team">SELECT TEAM 2:</label>
              <select id="team">
                <option value={1}>Healthy Guys</option>
                <option value={2}>Cedevita</option>
                <option value={3}>KBCSestreMilosrdnice</option>
                <option value={4}>Kimpembe Mutombo</option>
                <option value={5}>Mamojebači </option>
                <option value={6}>Prednji Križni Derricka Rose-a</option>
                <option value={7}>Rings Erneh</option>
                <option value={8}>Thomas&apos; Tank Engine</option>
                <option value={9}>Triple Single</option>
                <option value={10}>VŽ Balkanersi</option>
                <option value={11}>KK Romska Vatra</option>
                <option value={12}>KK Vindija</option>
                <option value={"FA"}>Free Agents</option>
              </select>
              <input className="inputBtnSubmit2" type="submit" value="SELECT" />
            </form>
          </div>
          <div className="puntCategories">
            <div className="singleCategory">
              <p>FG</p>
              <input
                className="puntCheckbox"
                type="checkbox"
                value="fg"
                name="puntCheckbox"
                onChange={selectSecondTeam}
              />
              <label className="puntLabel" htmlFor="switch">
                Toggle
              </label>
            </div>
            <div className="singleCategory">
              <p>FT</p>
              <input
                className="puntCheckbox"
                type="checkbox"
                value="ft"
                name="puntCheckbox"
                onChange={selectSecondTeam}
              />
              <label className="puntLabel" htmlFor="switch">
                Toggle
              </label>
            </div>
            <div className="singleCategory">
              <p>3</p>
              <input
                className="puntCheckbox"
                type="checkbox"
                value="three"
                name="puntCheckbox"
                onChange={selectSecondTeam}
              />
              <label className="puntLabel" htmlFor="switch">
                Toggle
              </label>
            </div>
            <div className="singleCategory">
              <p>PTS</p>
              <input
                className="puntCheckbox"
                type="checkbox"
                value="pts"
                name="puntCheckbox"
                onChange={selectSecondTeam}
              />
              <label className="puntLabel" htmlFor="switch">
                Toggle
              </label>
            </div>
            <div className="singleCategory">
              <p>REB</p>
              <input
                className="puntCheckbox"
                type="checkbox"
                value="rebounds"
                name="puntCheckbox"
                onChange={selectSecondTeam}
              />
              <label className="puntLabel" htmlFor="switch">
                Toggle
              </label>
            </div>
            <div className="singleCategory">
              <p>AST</p>
              <input
                className="puntCheckbox"
                type="checkbox"
                value="assists"
                name="puntCheckbox"
                onChange={selectSecondTeam}
              />
              <label className="puntLabel" htmlFor="switch">
                Toggle
              </label>
            </div>
            <div className="singleCategory">
              <p>STL</p>
              <input
                className="puntCheckbox"
                type="checkbox"
                value="steals"
                name="puntCheckbox"
                onChange={selectSecondTeam}
              />
              <label className="puntLabel" htmlFor="switch">
                Toggle
              </label>
            </div>
            <div className="singleCategory">
              <p>BLK</p>
              <input
                className="puntCheckbox"
                type="checkbox"
                value="blocks"
                name="puntCheckbox"
                onChange={selectSecondTeam}
              />
              <label className="puntLabel" htmlFor="switch">
                Toggle
              </label>
            </div>
            <div className="singleCategory">
              <p>TRN</p>
              <input
                className="puntCheckbox"
                type="checkbox"
                value="turnovers"
                name="puntCheckbox"
                onChange={selectSecondTeam}
              />
              <label className="puntLabel" htmlFor="switch">
                Toggle
              </label>
            </div>
            <div className="singleCategory">
              <p>-1</p>
              <input
                className="puntCheckbox"
                id="minusOne"
                type="checkbox"
                value="minusOne"
                name="puntCheckbox"
                onChange={selectSecondTeam}
              />
              <label className="puntLabel" htmlFor="switch">
                Toggle
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="zScoresTableDiv">
        {Object.keys(playerZScores).length == 0 ? null : (
          <ZScoresTable players={playerZScores} excluded={excludedCategories} />
        )}
      </div>
    </div>
  );
}

export default BestPlayerPage;
