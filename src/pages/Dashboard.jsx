import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [moodData, setMoodData] = useState([]);
  const [habitData, setHabitData] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const mood = JSON.parse(localStorage.getItem("moodRecords")) || [];
    const habit = JSON.parse(localStorage.getItem("habitRecords")) || [];
    setMoodData(mood);
    setHabitData(habit);
  }, []);

  const getMoodDistribution = (data) => {
    const map = {};
    data.forEach((m) => {
      map[m.mood] = (map[m.mood] || 0) + 1;
    });
    return Object.entries(map).map(([mood, count]) => ({ mood, count }));
  };

  const getHabitSummary = (data) => {
    const map = {};
    data.forEach((h) => {
      map[h.habit] = (map[h.habit] || 0) + 1;
    });
    return Object.entries(map).map(([habit, count]) => ({ habit, count }));
  };

  const moodChartData = getMoodDistribution(moodData);
  const habitChartData = getHabitSummary(habitData);

  const primaryPink = "#F49CA9";
  const pastelPinks = ["#F49CA9", "#fbc4cd", "#f7a8b8", "#ffccdd", "#ffe5e9"];

  return (
    <>
      <style>
        {`
          .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            max-width: 1000px;
            margin: 0 auto;
          }

          @media (max-width: 900px) {
            .dashboard-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 600px) {
            .dashboard-grid {
              grid-template-columns: 1fr;
            }
          }

          .tab-buttons {
            display: flex;
            justify-content: center;
            margin-bottom: 1.5rem;
          }

          .tab-button {
            background: white;
            border: 2px solid ${primaryPink};
            padding: 0.5rem 1rem;
            margin: 0 0.5rem;
            border-radius: 20px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
            color: ${primaryPink};
          }

          .tab-button:hover {
            background: ${primaryPink}10;
          }

          .tab-button.active {
            background: ${primaryPink};
            color: white;
            font-weight: bold;
          }

          .tab-content {
            border-radius: 16px;
            padding: 2rem;
            width: 100%;
          }
          .glass-box {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            }

        `}
      </style>

      <div
        style={{
            background: "linear-gradient(135deg, #F8BBD0 0%, #FDE5EC 50%, #FFF5F9 100%)",
            backgroundAttachment: "fixed",
            minHeight: "100dvh",  
            width: "100%",
            position: "absolute", 
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        }}
        >

        <div style={pageContainer} className="glass-box">
          <h2 style={{ marginBottom: "1rem", textAlign: "center", color: primaryPink }}>
            📋 Mood Tracker
          </h2>

          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              📊 Dashboard
            </button>
            <button
              className={`tab-button ${activeTab === "recent" ? "active" : ""}`}
              onClick={() => setActiveTab("recent")}
            >
              📝 Recent Moods
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "dashboard" && (
              <div className="dashboard-grid">
                <div style={glassCard}>
                  <h3 style={cardTitle}>Mood Entries</h3>
                  <p style={cardNumber}>{moodData.length}</p>
                </div>

                <div style={glassCard}>
                  <h3 style={cardTitle}>Habit Records</h3>
                  <p style={cardNumber}>{habitData.length}</p>
                </div>

                {moodChartData.length > 0 && (
                  <div style={glassCard}>
                    <h3 style={chartTitle}>😊 Mood Distribution</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={moodChartData}
                          dataKey="count"
                          nameKey="mood"
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          label
                        >
                          {moodChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={pastelPinks[index % pastelPinks.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {habitChartData.length > 0 && (
                  <div style={glassCard}>
                    <h3 style={chartTitle}>💪 Habit Summary</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={habitChartData}>
                        <XAxis dataKey="habit" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill={primaryPink} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}

            {activeTab === "recent" && (
              <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                <h3 style={{ marginBottom: "1rem", color: primaryPink }}>📝 Recent Moods</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {moodData.slice(0, 5).map((m) => (
                    <li key={m.id} style={entryItem}>
                      <span style={{ fontSize: "1.5rem", marginRight: "8px" }}>{m.mood}</span>
                      <span>{m.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const pageContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "5rem 1rem 2rem",
  minHeight: "100vh",
};

const glassCard = {
  background: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: "12px",
  padding: "1rem",
  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  textAlign: "center",
  minWidth: "150px",
};

const cardTitle = {
  fontSize: "1rem",
  color: "#444",
  marginBottom: "0.5rem",
};

const cardNumber = {
  fontSize: "2rem",
  color: "#F49CA9",
  fontWeight: "bold",
};

const chartTitle = {
  marginBottom: "1rem",
  fontSize: "1rem",
  color: "#333",
};

const entryItem = {
  background: "#fff0f4",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "8px",
  border: "1px solid #fdd5dc",
};

export default Dashboard;
