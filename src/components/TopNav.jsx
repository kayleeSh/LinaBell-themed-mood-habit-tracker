import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./TopNav.css";

const TopNav = () => {
  const location = useLocation();

  return (
    <nav className="top-nav">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        📊 Dashboard
      </Link>
      <Link to="/mood" className={location.pathname === "/mood" ? "active" : ""}>
        😊 Mood
      </Link>
      <Link to="/habits" className={location.pathname === "/habits" ? "active" : ""}>
        📘 Habits
      </Link>
    </nav>
  );
};

export default TopNav;
