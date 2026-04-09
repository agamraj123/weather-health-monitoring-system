import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const WeatherChart = ({ weatherData }) => {
  // Mock data for last 7 days (baad mein real data se replace kar sakte hain)
  const chartData = [
    { day: "Mon", temp: 28, humidity: 65 },
    { day: "Tue", temp: 31, humidity: 70 },
    { day: "Wed", temp: 29, humidity: 55 },
    { day: "Thu", temp: 34, humidity: 80 },
    { day: "Fri", temp: 32, humidity: 60 },
    { day: "Sat", temp: 27, humidity: 45 },
    { day: "Sun", temp: 30, humidity: 68 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 w-full">
      <h2 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">
        📈 My 7 Days Weather Trend
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={3} name="Temperature (°C)" />
          <Line type="monotone" dataKey="humidity" stroke="#10b981" strokeWidth={3} name="Humidity (%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;