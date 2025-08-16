import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar.jsx";

export default function Portfolio() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", summary: "", skills: "", github: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const API_BASE = "https://todo-backend-production-81ea.up.railway.app/api/portfolio";

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(API_BASE, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [token]);

  const saveProfile = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      let res;
      if (profile) {
        res = await axios.put(`${API_BASE}/${profile._id}`, form, { headers });
      } else {
        res = await axios.post(API_BASE, form, { headers });
      }

      setProfile(res.data);
      localStorage.setItem("profile", JSON.stringify(res.data));
      navigate("/portfoliolayout", { state: { profile: res.data } });
    } catch (err) {
      console.error("Error saving profile:", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <>
      {/* Navbar outside container */}
      <Navbar />

      <div className="portfolio-container">
        <div className="top-bar">
          <h2>Welcome, {username || "Guest"}</h2>
        </div>

        {profile ? (
          <div className="profile-preview">
            <h2>{profile.name}</h2>
            <p className="summary">{profile.summary}</p>
            <h4>Skills</h4>
            <p>{profile.skills}</p>
            <h4>GitHub</h4>
            <a href={profile.github} target="_blank" rel="noreferrer">
              {profile.github}
            </a>
            <button onClick={() => setForm(profile)}>Edit</button>
          </div>
        ) : (
          <div className="profile-form">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <textarea
              placeholder="Summary / About Me"
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
            />
            <input
              type="text"
              placeholder="Skills (comma separated)"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />
            <input
              type="text"
              placeholder="GitHub Profile URL"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
            />
            <button onClick={saveProfile} disabled={loading}>
              {loading ? "Saving..." : "Create / Update Portfolio"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
