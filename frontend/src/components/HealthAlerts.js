import React from "react";

const HealthAlerts = ({ weather, user }) => {
  if (!weather || !weather.alerts) return null;

  const alerts = weather.alerts;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 text-gray-700 dark:text-gray-200">
      <h2 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">
        ⚠️ Health Alerts for {user.name}
      </h2>
      {alerts.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {alerts.map((alert, i) => (
            <li key={i}>{alert}</li>
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

