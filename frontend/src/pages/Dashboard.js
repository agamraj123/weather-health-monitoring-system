import React, { useState } from "react";
import WeatherChart from "../components/WeatherChart";
import WeatherSearch from "../components/WeatherSearch";
import HealthTips from "../components/HealthTips";
import HealthAlerts from "../components/HealthAlerts";
// import HealthPrediction from "../components/HealthPrediction"; // Optional AI part

const Dashboard = ({ user, onLogout }) => {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 p-6 flex flex-col items-center relative">
      {/* 🔹 Logout Button */}
      <button
        onClick={onLogout}
        className="absolute top-4 right-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
      >
        Logout
      </button>

      {/* 🔹 Header */}
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-4">
        🌤 Weather Health Dashboard
      </h1>

      {/* 🔹 User Profile Card */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 mb-6 w-full max-w-md text-center text-gray-700 dark:text-gray-200">
        <h2 className="text-xl font-semibold mb-2">👤 Welcome, {user.name}!</h2>
        <p>Age: <span className="font-medium">{user.age}</span></p>
        <p>
          Health Condition:{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400 capitalize">
            {user.condition === "none" ? "Healthy" : user.condition}
          </span>
        </p>
      </div>

      {/* 🔹 Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* LEFT SIDE: Weather + Alerts + Prediction */}
        <div className="flex flex-col space-y-4">
          <WeatherSearch onWeatherFetched={setWeatherData} />
          {weatherData && (
            <>
              <HealthAlerts weather={weatherData} user={user} />
              {/* <HealthPrediction weather={weatherData} user={user} /> */}
            </>
          )}
        </div>

        {/* RIGHT SIDE: Personalized Tips */}
        <div className="flex flex-col space-y-4">
          {weatherData ? (
            <HealthTips weather={weatherData} />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 text-center text-gray-500 dark:text-gray-300">
              ⛅ Enter a city to get personalized health tips
            </div>
          )}
          {/* Weather Trend Chart - New Addition */}
<WeatherChart weatherData={weatherData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


