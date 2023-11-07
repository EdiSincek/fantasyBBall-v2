import React, { useState, useEffect } from "react";
import "./NavBar.css";

function NavBar() {
  useEffect(() => {}, []);

  return (
    <div className="NavBar">
      <nav className="vertical-menu">
        <a href="/">HOME</a>
        <a href="/league/standings">STANDINGS</a>
        <a href="/player">TEST PLAYER PAGE</a>
        <div class="dropdown">
          <button class="dropbtn">
            {" "}
            <a href="/stats">WEEKLY STATS</a>
          </button>
          <div class="dropdown-content">
            <a href="/stats/week/1">Week 1</a>
            <a href="/stats/week/2">Week 2</a>
            <a href="#">Week 3</a>
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
