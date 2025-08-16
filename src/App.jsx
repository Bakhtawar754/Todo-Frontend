import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home.jsx";
import AuthForm from "./pages/authForm.jsx";
import Portfolio from "./pages/portfolio.jsx";
import Portfoliolayout from "./pages/portfolioLayout.jsx";

export default function App() {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [showAuth, setShowAuth] = useState(false);

  const openAuthForm = () => setShowAuth(true);
  const closeAuthForm = () => setShowAuth(false);

  return (
    <BrowserRouter>
      {showAuth && (
        <AuthForm
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          closeForm={closeAuthForm}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              username={username}
              openAuthForm={openAuthForm}
            />
          }
        />

        {/* Protected Portfolio Page */}
        <Route
          path="/portfolio"
          element={isLoggedIn ? <Portfolio /> : <Navigate to="/" />}
        />

        {/* Protected Portfolio Layout Page */}
        <Route
          path="/portfoliolayout"
          element={isLoggedIn ? <Portfoliolayout /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
