import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ setIsLoggedIn, setUsername }) {
  const [isLogin, setIsLogin] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !usernameInput)) {
      return alert("Please fill all fields");
    }

    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post("https://todo-app-01.up.railway.app/api/auth/login", {
          email,
          password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        setIsLoggedIn(true);
        setUsername(res.data.username);
        navigate("/portfolio");
      } else {
        // SIGNUP
        await axios.post("https://todo-app-01.up.railway.app/api/auth/signup", {
          username: usernameInput,
          email,
          password,
          role,
        });
        alert("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Create Account"}</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="input"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <input
              type="text"
              placeholder="Username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              required
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>

      <p className="toggle-text">
        {isLogin ? (
          <>
            Don’t have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => setIsLogin(true)}
            >
              Login
            </span>
          </>
        )}
      </p>
      

    </div>
  );
}