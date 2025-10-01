
import { MapContainer, TileLayer, Marker, Pane, Popup } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";



export default function InteractiveWeatherMap({
  center = [30.0444, 31.2357],
  zoom = 6,
  height = 600,
  points = [],
  showAnimations = true,          
  weather = "sunny",             
  onMarkerDragEnd,                
}) {
 
  const sunIcon = useMemo(
    () =>
      L.divIcon({
        className: "sun-div-icon", 
        html: `<div class="sun-core"></div>`,
        iconSize: [64, 64],
        iconAnchor: [32, 32],
      }),
    []
  );


  const pinIcon = useMemo(
    () =>
      L.icon({
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        shadowSize: [41, 41],
      }),
    []
  );

  return (
    <div style={{ position: "relative", height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
      >
      
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='&copy; OSM, SRTM | <a href="https://opentopomap.org">OpenTopoMap</a>'
        />

       
        {points.map((p, i) => (
          <Marker
            key={i}
            position={[p.lat, p.lng]}
            icon={pinIcon}
            draggable={!!onMarkerDragEnd} 
            eventHandlers={
              onMarkerDragEnd
                ? {
                    dragend: (e) => {
                      const { lat, lng } = e.target.getLatLng();
                      onMarkerDragEnd([lat, lng]); 
                    },
                  }
                : undefined
            }
          >
            <Popup>
              <div style={{ minWidth: 150 }}>
                <b>{p.condition || "Conditions"}</b>
                <br />
                Temp: {p.tempC ?? "--"}°C
                <br />
                Humidity: {p.humidity ?? "--"}%
                <br />
                Wind: {p.windKph ?? "--"} km/h
              </div>
            </Popup>
          </Marker>
        ))}

    
        {showAnimations && weather === "sunny" && (
          <Marker position={center} icon={sunIcon} interactive={false} />
        )}

      
        {showAnimations && weather === "rain" && (
          <Pane name="rain-overlay" style={{ pointerEvents: "none" }}>
            <div className="rain-overlay" />
          </Pane>
        )}
      </MapContainer>
    </div>
  );
}





