import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Portfolio() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    projects: "",
    github: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  // Updated API base to point to /api/portfolio
  const API_BASE = "https://todo-app-01.up.railway.app/api/portfolio";

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API_BASE}`, {
        headers: { Authorization: token }
      })
      .then((res) => {
        setProfile(res.data);
        setFormData(res.data);
      })
      .catch((err) => console.error("Error loading profile:", err));
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    setLoading(true);
    const headers = { Authorization: token };

    const request = profile
      ? axios.put(`${API_BASE}/${profile._id}`, formData, { headers })
      : axios.post(`${API_BASE}`, formData, { headers });

    request
      .then((res) => {
        setProfile(res.data);
        setIsEditing(false);
        navigate("/portfoliolayout", { state: { profile: res.data } });
      })
      .catch((err) => console.error("Error saving profile:", err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="portfolio-container">
      <div className="top-bar">
        <h2>Welcome, {username || "Guest"}</h2>
      </div>

      <h3>My Portfolio</h3>

      {isEditing || !profile ? (
        <div className="profile-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma-separated)"
            value={formData.skills}
            onChange={handleChange}
          />
          <textarea
            name="projects"
            placeholder="Projects description"
            value={formData.projects}
            onChange={handleChange}
          />
          <input
            type="text"
            name="github"
            placeholder="GitHub Link"
            value={formData.github}
            onChange={handleChange}
          />
          <button onClick={saveProfile} disabled={loading}>
            {loading
              ? "Saving..."
              : profile
              ? "Update & View Portfolio"
              : "Create & View Portfolio"}
          </button>
        </div>
      ) : (
        <div className="profile-preview">
          <h3>{profile.name}</h3>
          <p><strong>Skills:</strong> {profile.skills}</p>
          <p><strong>Projects:</strong></p>
          <pre>{profile.projects}</pre>
          <p>
            <strong>GitHub:</strong>{" "}
            <a href={profile.github} target="_blank" rel="noreferrer">
              {profile.github}
            </a>
          </p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
