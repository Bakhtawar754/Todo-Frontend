import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import AuthForm from "./pages/authForm";
import Todo from "./pages/todo";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // 👈 Store username

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername(""); // 👈 Clear username
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
      
      <Routes>
        <Route path="/" element={<AuthForm setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername} />} />
        <Route path="/todos" element={isLoggedIn ? (<Todo />) : ( <AuthForm setIsLoggedIn={setIsLoggedIn}
         setUsername={setUsername}/> ) } />
    </Routes>
    </Router>
  );
}
