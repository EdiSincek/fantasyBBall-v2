import React, { useState, useEffect } from "react";
import "./NavBar.css";

function NavBar() {
  useEffect(() => {}, []);

  return (
    <div className="NavBar">
      <nav className="vertical-menu">
        <a href="/">HOME</a>
        <a href="/tradeAnalyzer">TRADE ANALYZER</a>
        <a href="/league/standings">STANDINGS</a>
        <a href="/player">TEST PLAYER PAGE</a>

        <div className="dropdown">
          <button className="dropbtn">
            {" "}
            <a href="/stats">WEEKLY STATS</a>
          </button>
          <div className="dropdown-content">
            <a href="/stats/week/1">Week 1</a>
            <a href="/stats/week/2">Week 2</a>
            <a href="/stats/week/3">Week 3</a>
          </div>
        </div>

        <a className="admin" href="/admin">
          ADMIN PAGE
        </a>
      </nav>
    </div>
  );
}

export default NavBar;
