import { useState, useEffect } from "react";
import InputsPanel from "../compontents/InputsPanel";
import { useNavigate } from "react-router-dom";
import InteractiveWeatherMap from "../compontents/InteractiveWeatherMap";
import ResultChart from "../compontents/ResultChart"; 

export default function Dashboard() {
  const [results, setResults] = useState(null);
  const [coords, setCoords] = useState([30.0444, 31.2357]); 
  const [topResult, setTopResult] = useState(null);
  const [location, setLocation] = useState("Cairo"); 
  const [date, setDate] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCityName() {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}`
        );
        const data = await res.json();
        if (data && data.display_name) {
          setLocation(data.display_name.split(",")[0]); 
        }
      } catch (err) {
        console.error("Reverse Geocoding Error:", err);
      }
    }
    fetchCityName();
  }, [coords]);

  async function handleInputs({ location, date }) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
      );
      const data = await res.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setCoords([lat, lon]);
      }
    } catch (err) {
      console.error("Geocoding Error:", err);
    }

    setDate(date);

    // Mock data
    const mockData = {
      "Very Hot": 72,
      "Very Cold": 10,
      "Very Wet": 20,
      "Very Windy": 15,
      "Very Uncomfortable": 30,
    };
    setResults(mockData);

    let highest = Object.entries(mockData).sort((a, b) => b[1] - a[1])[0];
    setTopResult(highest);
  }

  const forecastPoints = [
    {
      lat: coords[0],
      lng: coords[1],
      tempC: results ? (results["Very Hot"] > 50 ? 35 : 22) : 25,
      humidity: results ? results["Very Wet"] || 40 : 50,
      windKph: results ? results["Very Windy"] || 10 : 5,
      condition: topResult ? topResult[0] : "Normal",
    },
  ];

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <nav
        className="d-flex align-items-center"
        style={{
          backgroundColor: "#f5f5dc",
          padding: "10px 20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src="/nasa-1.svg"
          alt="NASA Logo"
          style={{
            height: "45px",
            width: "45px",
            borderRadius: "50%",
            marginRight: "15px",
          }}
        />
        <h4 className="fw-bold m-0" style={{ color: "#000080" }}>
          Dashboard
        </h4>
      </nav>

      <div className="container-fluid py-4">
        <div className="row align-items-start">
          {/* العمود الشمال */}
          <div className="col-md-6" style={{ marginTop: "20px" }}>
            <div
              className="card mb-4 border-0 shadow-lg"
              style={{
                marginTop: "40px",
                backgroundColor: "#f5f5dc",
              }}
            >
              <div className="card-body p-4">
                <h5 className="card-title fw-bold" style={{ color: "#000080" }}>
                  Inputs
                </h5>
                <InputsPanel
                  onSubmit={handleInputs}
                  location={location}
                  setLocation={setLocation}
                />
              </div>
            </div>

            {topResult && (
              <div className="card mt-4 p-3 shadow-sm">
                <ResultChart data={results} />
              </div>
            )}
          </div>

          {/* العمود اليمين */}
          <div className="col-md-6" style={{ marginTop: "10px" }}>
            <div style={{ height: "600px", width: "100%" }}>
              <InteractiveWeatherMap
                points={forecastPoints}
                center={coords}
                zoom={6}
                height={600}
                showAnimations={true}
                weather={
                  topResult?.[0] === "Very Wet"
                    ? "rain"
                    : topResult?.[0] === "Very Hot"
                    ? "sunny"
                    : "none"
                }
                onMarkerDragEnd={(newCoords) => setCoords(newCoords)} 
              />
            </div>

            {topResult && (
              <div className="text-center mt-4">
                <button
                  onClick={() =>
                    navigate("/results", {
                      state: { results, topResult, location, date },
                    })
                  }
                  className="btn btn-lg px-5"
                  style={{
                    backgroundColor: "#28a745",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                    borderRadius: "8px",
                  }}
                >
                  🚀 Enter Your To-Do List
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
















