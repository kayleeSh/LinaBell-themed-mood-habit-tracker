import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import Dashboard from "./pages/Dashboard";
import MoodDiary from "./pages/MoodDiary";
import Habits from "./pages/Habits";

const App = () => {
  return (
    <Router>
      <TopNav />
      <div style={{ paddingTop: "60px", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mood" element={<MoodDiary />} />
          <Route path="/habits" element={<Habits />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
