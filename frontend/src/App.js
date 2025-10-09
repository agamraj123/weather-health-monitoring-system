// src/App.js
import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";

function App() {
  const [user, setUser] = useState(null);

  // Load saved user from localStorage (if exists)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Handle login (from LoginPage)
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div>
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

