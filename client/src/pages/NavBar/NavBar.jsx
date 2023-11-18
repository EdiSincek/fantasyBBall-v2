import React, { useState, useEffect } from "react";
import "./NavBar.css";

function NavBar() {
  useEffect(() => {}, []);

  return (
    <div className="NavBar">
      <div class="page">
        <nav class="page__menu menu">
          <ul class="menu__list r-list">
            <li class="menu__group">
              <a href="/" class="menu__link r-link text-underlined">
                HOME
              </a>
            </li>
            <li class="menu__group">
              <a href="/stats" class="menu__link r-link text-underlined">
                TOTAL MATCHUP STATS
              </a>
            </li>
            <div class="dropdown">
              <button class="dropbtn">
                <a href="/stats" class="menu__link r-link text-underlined">
                  STATS
                </a>
              </button>
              <div class="dropdown-content">
                <a
                  href="/stats/week/1"
                  class="menu__link r-link text-underlined"
                >
                  Week 1
                </a>
                <a
                  href="/stats/week/2"
                  class="menu__link r-link text-underlined"
                >
                  Week 2
                </a>
                <a
                  href="/stats/week/3"
                  class="menu__link r-link text-underlined"
                >
                  Week 3
                </a>
                <a
                  href="/stats/week/4"
                  class="menu__link r-link text-underlined"
                >
                  Week 4
                </a>
              </div>
            </div>

            <li class="menu__group">
              <a
                href="/tradeAnalyzer"
                class="menu__link r-link text-underlined"
              >
                TRADE ANALYZER
              </a>
            </li>
            <li class="menu__group">
              <a
                href="/league/standings"
                class="menu__link r-link text-underlined"
              >
                STANDINGS
              </a>
            </li>
            <li class="menu__group">
              <a href="/player" class="menu__link r-link text-underlined">
                TEST PLAYER PAGE
              </a>
            </li>
          </ul>
        </nav>
        <nav class="page__menu page__custom-settings menu">
          <ul class="menu__list r-list"></ul>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
