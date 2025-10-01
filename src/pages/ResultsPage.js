import { useLocation } from "react-router-dom";
import { useState } from "react";
import ActivitySuggester from "../compontents/ActivitySuggester";

function Navbar() {
  return (
    <nav
      className="d-flex align-items-center px-3"
      style={{ backgroundColor: "#f5f5dc", height: "70px" }}
    >
      <img
        src="/nasa-1.svg"
        alt="NASA Logo"
        style={{
          width: "50px",
          height: "50px",
          marginRight: "10px",
          borderRadius: "50%",
        }}
      />
      <h3 className="fw-bold m-0" style={{ color: "#000080" }}>
        Detailed Results
      </h3>
    </nav>
  );
}

export default function ResultsPage() {
  const location = useLocation();
  const { results, topResult, location: userLocation, date } =
    location.state || {};

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);

  if (!results) return null;


  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };


  const generateSchedule = () => {
    let sorted = [...tasks];

    if (topResult[0] === "Very Hot") {
      sorted.sort((a, b) =>
        a.toLowerCase().includes("indoor") ? -1 : 1
      );
    } else if (topResult[0] === "Very Wet" || topResult[0] === "Very Windy") {
      sorted.sort((a, b) =>
        a.toLowerCase().includes("home") ? -1 : 1
      );
    }
    setSortedTasks(sorted);
  };

  return (
    <div>
      <Navbar />

      <div className="container py-4">
        {/* 🔹 Show Location + Date */}
        <div className="mb-4">
          <h5 style={{ color: "#000080" }}>
            📍 Location: <b>{userLocation}</b>
          </h5>
          <h6 style={{ color: "#333" }}>
            📅 Date: <b>{date}</b>
          </h6>
        </div>

    
        <div
          className="card p-3 mb-4"
          style={{ backgroundColor: "#f5f5dc", border: "none" }}
        >
          <h5 className="fw-bold" style={{ color: "#000080" }}>
            Your Daily To-Do List
          </h5>
          <div className="d-flex mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Add activity e.g. study, gym, indoor reading"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              onClick={addTask}
              className="btn btn-success ms-2"
            >
              Add
            </button>
          </div>

       
          {tasks.length > 0 && (
            <ul className="mt-3 list-group">
              {tasks.map((t, i) => (
                <li key={i} className="list-group-item">
                  {t}
                </li>
              ))}
            </ul>
          )}

     
          {tasks.length > 0 && (
            <button
              onClick={generateSchedule}
              className="btn btn-primary mt-3"
            >
              Generate Schedule
            </button>
          )}
        </div>

     
        {sortedTasks.length > 0 && (
          <div className="card p-3 shadow-sm">
            <h6 className="fw-bold">Recommended Order for The Day:</h6>
            <ol className="mt-2">
              {sortedTasks.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ol>
          </div>
        )}

      
      </div>
    </div>
  );
}






