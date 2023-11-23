import React, { useState, useEffect } from "react";
import "./NavBar.css";

function NavBar() {
  useEffect(() => {}, []);

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
              <div className="dropdown-content">
                <a
                  href="/stats/week/1"
                  className="menu__link r-link text-underlined"
                >
                  Week 1
                </a>
                <a
                  href="/stats/week/2"
                  className="menu__link r-link text-underlined"
                >
                  Week 2
                </a>
                <a
                  href="/stats/week/3"
                  className="menu__link r-link text-underlined"
                >
                  Week 3
                </a>
                <a
                  href="/stats/week/4"
                  className="menu__link r-link text-underlined"
                >
                  Week 4
                </a>
                <a
                  href="/stats/week/5"
                  className="menu__link r-link text-underlined"
                >
                  Week 5
                </a>
              </div>
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
              <a href="/player" className="menu__link r-link text-underlined">
                TEST PLAYER PAGE
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

export default NavBar;
