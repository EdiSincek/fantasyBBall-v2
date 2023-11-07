import React, { useState, useEffect } from "react";
import "./Standings.css";

function Standings() {
  const [standings, setStandings] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/standings")
      .then((res) => res.json())
      .then((data) => setStandings(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="Standings">
      <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-800 text-gray-100">
        <thead>
          <tr className="text-left border-b border-gray-300">
            <th className="px-4 py-3">Position</th>
            <th className="px-4 py-3">Team</th>
            <th className="px-4 py-3">Manager</th>
            <th className="px-2 py-3">Wins</th>
            <th className="px-2 py-3">Losses</th>
            <th className="px-2 py-3">Ties</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(standings).map((team) => (
            <tr
              key={team.team_position}
              className={
                team.team_position < 9
                  ? "bg-green-700 border-b border-gray-600"
                  : "bg-red-500 border-b border-gray-600"
              }
            >
              <td className="px-8 py-3">{team.team_position}</td>
              <td className="px-4 py-3">{team.team_name}</td>
              <td className="px-4 py-3">{team.team_manager}</td>
              <td className="px-2 py-3">{team.wins}</td>
              <td className="px-2 py-3">{team.losses}</td>
              <td className="px-2 py-3">{team.ties}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Standings;
