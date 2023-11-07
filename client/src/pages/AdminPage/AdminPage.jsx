import React, { useState, useEffect } from "react";
import "./AdminPage.css";

function AdminPage() {
  useEffect(() => {}, []);

  return (
    <div className="AdminPage">
      <div className="weeklyStats">
        <p className="weeklyStatsLabel">Get weekly stats</p>
        <button className="weeklyStatsBtn">Get weekly stats</button>
      </div>
    </div>
  );
}

export default AdminPage;
