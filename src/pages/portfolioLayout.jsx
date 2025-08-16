import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Portfoliolayout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const profile = state?.profile;

  if (!profile) {
    return (
      <div className="portfolio-container">
        <h3>No profile data found</h3>
        <button onClick={() => navigate("/portfolio")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      <h2>{profile.name}'s Portfolio</h2>
      <p><strong>Skills:</strong> {profile.skills}</p>
      <p><strong>Projects:</strong></p>
      <pre>{profile.projects}</pre>
      <p>
        <strong>GitHub:</strong>{" "}
        <a href={profile.github} target="_blank" rel="noreferrer">
          {profile.github}
        </a>
      </p>
    </div>
  );
}
