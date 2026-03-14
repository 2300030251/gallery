import { useNavigate } from "react-router-dom";

function Welcome() {

  const navigate = useNavigate();

  return (
    <div className="welcome">

      <h1>Welcome To My World</h1>

      <p>Crazy memories, fun moments, and legendary adventures.</p>

      <button onClick={() => navigate("/gallery")}>
        Enter Lucky's Gallery
      </button>

    </div>
  );
}

export default Welcome;