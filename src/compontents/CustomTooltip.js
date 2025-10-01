export default function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const value = payload[0].value;

    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{
          backgroundColor: "#f5f5dc",
          color: "darkred",
          width: "90px",
          height: "90px",
          borderRadius: "50%",        
          fontSize: "11px",
          padding: "5px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ lineHeight: "1.2" }}>
          <strong>{label}</strong>
          <div>{value}%</div>
        </div>
      </div>
    );
  }

  return null;
}
