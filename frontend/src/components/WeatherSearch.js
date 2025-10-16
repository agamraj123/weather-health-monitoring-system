import { useState } from "react";
import axios from "axios";

function WeatherSearch({ onWeatherFetched }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [healthAlert, setHealthAlert] = useState("");

  const fetchWeather = async () => {
    if (!city) return window.alert("Please enter a city!");

    try {
      // ✅ API call to backend
      const response = await axios.get(
      `https://weather-health-monitoring-system.onrender.com/api/weather?city=${city}`
     );
      console.log("Backend response:", response.data);
      const data = response.data;

      // ✅ Update local state
      setWeather(data);

      // ✅ Send data to parent (App.js)
      if (onWeatherFetched) onWeatherFetched(data);

      // ✅ Health Alert Logic
      let message = "";
      if (data.main.temp > 35) {
        message = "☀️ High temperature! Stay hydrated and avoid direct sunlight.";
      } else if (data.main.humidity > 70) {
        message = "🤧 High humidity! You may feel discomfort or risk of cold.";
      } else if (data.main.temp < 10) {
        message = "🥶 Very low temperature! Dress warmly and avoid cold drinks.";
      } else {
        message = "✅ Weather looks comfortable. Enjoy your day!";
      }

      setHealthAlert(message);
    } catch (error) {
      console.error("❌ Error fetching weather:", error);
      window.alert("City not found or server error");
    }
  };

  return (
    <div className="p-4 flex flex-col items-center bg-white rounded-2xl shadow-md w-full max-w-md">
      <input
        className="border px-4 py-2 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-3 rounded-md transition-all duration-200"
        onClick={fetchWeather}
      >
        Get Weather
      </button>

      {weather && (
        <div className="mt-4 bg-blue-50 shadow-sm rounded-lg p-4 w-full text-center">
          <h2 className="text-xl font-bold text-blue-700">{weather.name}</h2>
          <p>🌡 Temperature: {weather.main.temp}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>☁️ Condition: {weather.weather[0].description}</p>
          <hr className="my-2" />
          <p className="text-sm font-semibold text-red-600">{healthAlert}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherSearch;
