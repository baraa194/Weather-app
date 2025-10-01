import { useState } from "react";

export default function ActivitySuggester() {
  const [activity, setActivity] = useState("");
  const [message, setMessage] = useState("");

  const suggestions = ["Read a book 📚", "Do yoga 🧘", "Watch a movie 🎬", "Indoor workout 💪"];

  const handleCheck = () => {
    if (activity.toLowerCase().includes("football")) {
      setMessage("❌ Too hot for football today! Try instead: " + suggestions.join(", "));
    } else if (activity.trim() !== "") {
     
      setMessage(
        `✅ Great choice! You can enjoy ${activity} today.\n💡 You may also try: ${suggestions.join(
          ", "
        )}`
      );
    } else {
      setMessage("⚠️ Please enter an activity first.");
    }
  };

  return (
    <div
      className="card mt-4 p-3"
      style={{ backgroundColor: "#f5f5dc", borderRadius: "12px" }}
    >
      <h6 className="fw-bold mb-2" style={{ color: "#008006ff" }}>
        What activity would you like to do?
      </h6>

      <div className="d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Play football"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <button className="btn btn-danger fw-bold" onClick={handleCheck}>
          Check
        </button>
      </div>

      {message && (
        <div
          className="alert mt-3"
          style={{
            backgroundColor: "#fff3cd",
            borderRadius: "8px",
            color: "darkred",
            whiteSpace: "pre-line", 
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

