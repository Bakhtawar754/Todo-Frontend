import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import AuthForm from "./pages/authForm";
import Portfolio from "./pages/portfolio";
import Portfoliolayout from "./pages/portfolioLayout";

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
        <Route path="/portfolio" element={isLoggedIn ? (<Portfolio />) : ( <AuthForm setIsLoggedIn={setIsLoggedIn}
         setUsername={setUsername}/> ) } />
            <Route path="/portfoliolayout" element={<Portfoliolayout />} />
    </Routes>
    </Router>
  );
}
