import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="position-relative vh-100 overflow-hidden">
   
      <video
        autoPlay
        loop
        muted
        playsInline
        className="position-absolute w-100 h-100"
        style={{ objectFit: "cover", zIndex: "-1" }}
      >
        <source src="/bgvideo.mp4" type="video/mp4" />
      </video>

    
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 0 }}
      ></div>

   
  <nav
  className="d-flex align-items-center p-3 position-relative"
  style={{ zIndex: 1 }}
>
  <img
    src="/nasa-1.svg"
    alt="NASA Logo"
    style={{
      height: "50px",
      width: "50px",
      borderRadius: "50%",
      objectFit: "cover",
      marginRight: "10px",
    
      padding: "4px"
    }}
  />
  <h4 className="m-0 text-white fw-bold">ClimaX App</h4>
</nav>


  
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center h-100 text-white position-relative"
        style={{ zIndex: 1 }}
      >
        <h1 className="display-4 fw-bold">
          Discover the probability of extreme weather
        </h1>
        <p className="lead mt-3">Powered by NASA Data</p>
       <Link
  to="/dashboard"
  className="btn btn-lg mt-4 text-white"
  style={{ backgroundColor: "#092c6c" }}
>
  Go to Dashboard
</Link>

      </div>
    </div>
  );
}


