import React, { useState, useEffect } from "react";

const MoodDiary = () => {
  const [activeTab, setActiveTab] = useState("diary");
  const [mood, setMood] = useState("😊");
  const [note, setNote] = useState("");
  const [records, setRecords] = useState([]);

  const moods = ["😊", "😢", "😡", "🥰", "😴", "🤯"];
  const primaryPink = "#F49CA9";

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("moodRecords")) || [];
    setRecords(saved);
  }, []);

  const handleSave = () => {
    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      mood,
      note,
    };
    const updated = [newRecord, ...records];
    setRecords(updated);
    localStorage.setItem("moodRecords", JSON.stringify(updated));
    setMood("😊");
    setNote("");
  };

  return (
    <>
      <style>
        {`
          .tab-buttons {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
            gap: 1rem;
          }

          .tab-button {
            background: white;
            border: 2px solid ${primaryPink};
            padding: 0.5rem 1rem;
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
            background: white;
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            max-width: 600px;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
          }

          .mood-button {
            font-size: 1.5rem;
            padding: 0.5rem;
            border: 2px solid transparent;
            border-radius: 12px;
            margin-right: 0.5rem;
            cursor: pointer;
            background: #f7f7f7;
            transition: all 0.2s;
          }

          .mood-button.selected {
            border-color: ${primaryPink};
            background: ${primaryPink}22;
          }

          @media (max-width: 480px) {
            .mood-button {
              margin-bottom: 0.5rem;
            }
          }
        `}
      </style>
      

      <div style={{ padding: "5rem 1rem 2rem", minHeight: "100vh", textAlign: "center" }}>
        <h2 style={{ color: primaryPink, marginBottom: "1.5rem" }}>
          🧸 Mood Diary
        </h2>

        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "diary" ? "active" : ""}`}
            onClick={() => setActiveTab("diary")}
          >
            📝 Mood Diary
          </button>
          <button
            className={`tab-button ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            📜 History
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "diary" && (
            <div>
              {/* Mood Selection */}
              <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.5rem" }}>
                  Choose Your Mood:
                </label>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {moods.map((m) => (
                    <button
                      key={m}
                      className={`mood-button ${mood === m ? "selected" : ""}`}
                      onClick={() => setMood(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Note Section */}
              <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.5rem" }}>
                  Diary Note:
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    fontSize: "1rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                  placeholder="Write something about your mood..."
                />
              </div>

              <button
                onClick={handleSave}
                style={{
                  backgroundColor: primaryPink,
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                💾 Save Mood
              </button>
            </div>
          )}

          {activeTab === "history" && (
            <div style={{ textAlign: "left" }}>
              <h3 style={{ color: primaryPink, marginBottom: "1rem", textAlign: "center" }}>
                Your Mood History
              </h3>
              {records.length === 0 ? (
                <p style={{ textAlign: "center" }}>No records found.</p>
              ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {records.map((r) => (
                    <li
                      key={r.id}
                      style={{
                        background: "#fff0f4",
                        padding: "10px",
                        borderRadius: "6px",
                        marginBottom: "10px",
                        border: "1px solid #fdd5dc",
                      }}
                    >
                      <div style={{ fontSize: "1.5rem" }}>{r.mood}</div>
                      <div style={{ color: "#555", fontSize: "0.9rem" }}>{r.date}</div>
                      <div style={{ marginTop: "0.5rem" }}>{r.note}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MoodDiary;
