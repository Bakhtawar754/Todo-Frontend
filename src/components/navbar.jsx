import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn, username, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <i className="fas fa-tasks" style={{ marginRight: "8px", fontSize: "40px"}}></i>
        <span className="logo">Portfolio_</span>
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <span className="nav-username"> {username}</span> {/* 👈 Show username */}
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
}
