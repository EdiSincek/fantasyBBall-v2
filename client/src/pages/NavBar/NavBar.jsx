import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="NavBar">
      <div className="page">
        <nav className="page__menu menu">
          <ul className="menu__list r-list">
            <li className="menu__group">
              <a href="/" className="menu__link r-link text-underlined">
                HOME
              </a>
            </li>
            <li className="menu__group">
              <a href="/stats" className="menu__link r-link text-underlined">
                TOTAL MATCHUP STATS
              </a>
            </li>
            <div className="dropdown">
              <button className="dropbtn">
                <a href="/stats" className="menu__link r-link text-underlined">
                  STATS
                </a>
              </button>
              <div className="dropdown-content">{getWeeklyStats()}</div>
            </div>

            <li className="menu__group">
              <a
                href="/tradeAnalyzer"
                className="menu__link r-link text-underlined"
              >
                TRADE ANALYZER
              </a>
            </li>
            <li className="menu__group">
              <a
                href="/league/standings"
                className="menu__link r-link text-underlined"
              >
                STANDINGS
              </a>
            </li>
            <li className="menu__group">
              <a
                href="/bestPlayerPage"
                className="menu__link r-link text-underlined"
              >
                BEST PLAYER FINDER
              </a>
            </li>
          </ul>
        </nav>
        <nav className="page__menu page__custom-settings menu">
          <ul className="menu__list r-list"></ul>
        </nav>
      </div>
    </div>
  );
}

function getWeeklyStats() {
  const weeks = [];
  const currentWeek = 11;
  for (var i = 1; i < currentWeek + 1; i++) {
    const weeklyHref = "/stats/week/" + i;
    const weeklyLable = "Week " + i;
    weeks.push(
      <a href={weeklyHref} className="menu__link r-link text-underlined">
        {weeklyLable}
      </a>
    );
  }
  return weeks;
}

export default NavBar;
