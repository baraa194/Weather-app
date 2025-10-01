import React, { useState } from "react";

export default function InputsPanel({ onSubmit, location, setLocation }) {
  const [date, setDate] = useState(""); 

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ location, date });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label" style={{ color: "#000080" }}>
          Location
        </label>
        <input
          type="text"
          className="form-control"
          style={{ backgroundColor: "#f5f5dc", color: "#000080" }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a city or address"
        />
      </div>

      <div className="mb-3">
        <label className="form-label" style={{ color: "#000080" }}>
          Date
        </label>
        <input
          type="date"
          className="form-control"
          style={{ backgroundColor: "#f5f5dc", color: "#000080" }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn"
        style={{
          backgroundColor: "#DC143C",
          border: "1px solid #f5f5dc",
          color: "#f5f5dc",
          fontWeight: "bold",
        }}
      >
        Show Results
      </button>
    </form>
  );
}



