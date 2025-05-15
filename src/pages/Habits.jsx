import React, { useState, useEffect } from "react";

const habitTypes = [
  { label: "Reading", value: "Reading", icon: "/images/reading.jpeg" },
  { label: "Sleep", value: "Sleep", icon: "/images/sleep.jpeg" },
  { label: "Exercise", value: "Exercise", icon: "/images/exercise.jpeg" },
  { label: "Coding", value: "Coding", icon: "/images/coding.jpeg" },
];

const Habits = () => {
  const [habit, setHabit] = useState("");
  const [notes, setNotes] = useState("");
  const [records, setRecords] = useState([]);
  const [activeTab, setActiveTab] = useState("tracker");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("habitRecords")) || [];
    setRecords(stored);
  }, []);

  const handleSave = () => {
    if (!habit) return alert("Please select a habit!");
    const newRecord = {
      id: Date.now(),
      habit,
      notes,
      date: new Date().toLocaleString(),
    };
    const updated = [newRecord, ...records];
    setRecords(updated);
    localStorage.setItem("habitRecords", JSON.stringify(updated));
    setHabit("");
    setNotes("");
  };

  const getHabitIcon = (habitValue) => {
    const habitObj = habitTypes.find((h) => h.value === habitValue);
    return habitObj?.icon || "";
  };

  return (
    <div style={{ padding: "5rem 1rem 2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>🧩 Habits</h2>

      {/* 顶部 Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1.5rem",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setActiveTab("tracker")}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "1px solid #F7A8B8",
            backgroundColor: activeTab === "tracker" ? "#F7A8B8" : "white",
            color: activeTab === "tracker" ? "#fff" : "#F7A8B8",
            cursor: "pointer",
            minWidth: "100px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          Habit Tracker
        </button>
        <button
          onClick={() => setActiveTab("history")}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "1px solid #F7A8B8",
            backgroundColor: activeTab === "history" ? "#F7A8B8" : "white",
            color: activeTab === "history" ? "#fff" : "#F7A8B8",
            cursor: "pointer",
            minWidth: "100px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          History
        </button>
      </div>

      {/* Tab 内容 */}
      {activeTab === "tracker" && (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "1rem",
            }}
          >
            {habitTypes.map((h) => (
              <div
                key={h.value}
                onClick={() => setHabit(h.value)}
                style={{
                  width: "100px",
                  cursor: "pointer",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "12px",
                  border:
                    habit === h.value
                      ? "2px solid #F7A8B8"
                      : "2px solid transparent",
                  boxShadow:
                    habit === h.value
                      ? "0 0 10px rgba(247, 168, 184, 0.6)"
                      : "0 2px 6px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  background: "#fff",
                }}
              >
                <img
                  src={h.icon}
                  alt={h.label}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    marginBottom: "8px",

                  }}
                />
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {h.label}
                </div>
              </div>
            ))}
          </div>

          <textarea
            rows={4}
            placeholder="Write some notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "10px",
              resize: "vertical",
            }}
          />

          <button
            onClick={handleSave}
            style={{
              backgroundColor: "#F7A8B8",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1rem",
              display: "block",
              margin: "0 auto",
            }}
          >
            Save Habit
          </button>
        </>
      )}

      {activeTab === "history" && (
        <div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {records.length === 0 && (
              <p style={{ textAlign: "center", color: "#888" }}>
                No records yet.
              </p>
            )}
            {records.map((r) => (
              <li
                key={r.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "12px",
                  background: "#fff0f4",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src={getHabitIcon(r.habit)}
                  alt={r.habit}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    background: "#FFF0F4",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                    {r.habit} •{" "}
                    <span style={{ fontSize: "0.85rem", color: "#666" }}>
                      {r.date}
                    </span>
                  </div>
                  {r.notes && <div style={{ color: "#333" }}>{r.notes}</div>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Habits;
