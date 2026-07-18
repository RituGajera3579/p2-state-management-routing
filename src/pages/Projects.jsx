import { useState } from "react";

function Projects() {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
      }}
    >
      <h2>My Projects</h2>

      <button
        onClick={() => setShowProjects(!showProjects)}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        {showProjects ? "Hide Projects" : "Show Projects"}
      </button>

      {showProjects && (
        <div style={{ marginTop: "20px" }}>
          <p>Student Portfolio Website</p>
          <p>Context-Aware Recommendation System</p>
        </div>
      )}
    </div>
  );
}

export default Projects;