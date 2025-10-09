import React from "react";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav
      className={`w-full px-6 py-4 shadow-md flex justify-between items-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-blue-600 text-white"
      }`}
    >
      <h1 className="text-xl font-bold">
        🌤 Weather Health Monitoring System
      </h1>

      <button
        onClick={toggleDarkMode}
        className={`px-4 py-2 rounded-lg transition ${
          darkMode
            ? "bg-blue-500 hover:bg-blue-400 text-white"
            : "bg-white hover:bg-blue-100 text-blue-700"
        }`}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
