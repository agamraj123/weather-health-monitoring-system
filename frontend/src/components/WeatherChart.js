import React from "react";

const HealthAlerts = ({ weather, user }) => {
  if (!weather || !user) return null;

  const { temp, humidity } = weather.main;
  const alerts = [];

  // Temperature alerts
  if (temp > 35)
    alerts.push("⚠️ Heatwave risk — stay hydrated and avoid going out at noon!");

  if (temp < 10)
    alerts.push("❄️ Cold weather — wear warm clothes and stay inside if possible.");

  // Humidity alerts
  if (humidity > 80)
    alerts.push("🌫️ Humidity high — may cause discomfort or fatigue!");

  if (humidity < 30)
    alerts.push("💧 Air is dry — drink more water and use moisturizer.");

  // Personalized alerts based on user health condition
  if (user.condition === "asthma" && humidity > 70)
    alerts.push("🤧 High humidity may trigger asthma — keep inhaler nearby!");

  if (user.condition === "heart" && temp > 32)
    alerts.push("❤️ Heat stress can affect heart — avoid outdoor exertion!");

  if (user.condition === "diabetes" && temp < 15)
    alerts.push("🍭 Cold weather can affect sugar levels — monitor closely!");

  if (user.condition === "none")
    alerts.push("✅ You’re healthy! Just follow general precautions.");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 text-gray-700 dark:text-gray-200">
      <h2 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">
        ⚠️ Health Alerts for {user.name}
      </h2>
      {alerts.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {alerts.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      ) : (
        <p className="text-green-600 dark:text-green-400 font-medium">
          ✅ No major health risks today!
        </p>
      )}
    </div>
  );
};

export default HealthAlerts;