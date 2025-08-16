import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ setIsLoggedIn, setUsername, closeForm }) {
  const [isLogin, setIsLogin] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !usernameInput)) return alert("Please fill all fields");

    setLoading(true);
    try {
      if (isLogin) {
        const res = await axios.post("https://todo-backend-production-81ea.up.railway.app/api/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        setIsLoggedIn(true);
        setUsername(res.data.username);
        closeForm();
        navigate("/portfolio");
      } else {
        await axios.post("https://todo-backend-production-81ea.up.railway.app/api/auth/signup", { username: usernameInput, email, password });
        alert("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="auth-modal">
      <div className="auth-overlay" onClick={closeForm}></div>
      <div className="auth-container">
        <button className="close-btn" onClick={closeForm}>&times;</button>
        <h2>{isLogin ? "Login" : "Create Account"}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <input type="text" placeholder="Username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} required />
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" disabled={loading}>{loading ? (isLogin ? "Logging in..." : "Signing up...") : isLogin ? "Login" : "Signup"}</button>
        </form>
        <p className="toggle-text">
          {isLogin ? (
            <>Don’t have an account? <span onClick={() => setIsLogin(false)}>Signup</span></>
          ) : (
            <>Already have an account? <span onClick={() => setIsLogin(true)}>Login</span></>
          )}
        </p>
      </div>
    </div>
  );
}
