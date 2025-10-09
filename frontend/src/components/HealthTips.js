import React, { useState, useEffect } from "react";

const HealthTips = ({ weather }) => {
  const [tipGroup, setTipGroup] = useState("morning");
  const [tips, setTips] = useState([]);
  const [showBanner, setShowBanner] = useState(false);

  // 1️⃣ Time-based tip update (morning / afternoon / evening)
  useEffect(() => {
    const updateTimeGroup = () => {
      const hour = new Date().getHours();
      if (hour < 12) setTipGroup("morning");
      else if (hour < 18) setTipGroup("afternoon");
      else setTipGroup("evening");
    };

    updateTimeGroup();
    const interval = setInterval(updateTimeGroup, 60 * 60 * 1000); // update every hour
    return () => clearInterval(interval);
  }, []);

  // 2️⃣ Build detailed tips based on weather + time
  useEffect(() => {
    const main = weather?.main || {};
    const w = weather?.weather || [];
    const temp = main.temp ?? null;
    const humidity = main.humidity ?? null;
    const condition = (w[0]?.main || "").toLowerCase();

    const newTips = [];

    // Time-of-day base tip
    if (tipGroup === "morning") {
      newTips.push("🌅 Morning: Start with warm water and 5–10 mins of stretching.");
    } else if (tipGroup === "afternoon") {
      newTips.push("☀️ Afternoon: Stay hydrated, avoid heavy oily meals, take screen breaks.");
    } else {
      newTips.push("🌙 Evening: Avoid caffeine after 6 PM, walk lightly, and sleep early.");
    }

    // Weather-based detailed tips
    if (temp !== null) {
      if (temp > 35) {
        newTips.push("⚠️ Extreme Heat: Use rehydration salts, stay indoors during peak hours, wear cotton.");
      } else if (temp > 30) {
        newTips.push("🔥 Hot: Drink 3L water today and avoid outdoor workouts between 12–4 PM.");
      } else if (temp < 10) {
        newTips.push("❄️ Cold: Dress in layers, keep extremities warm, and avoid chilled drinks.");
      }
    }

    if (humidity !== null) {
      if (humidity > 80) {
        newTips.push("💦 High Humidity: Stay in ventilated rooms, use talcum powder, keep skin dry.");
      } else if (humidity < 35) {
        newTips.push("💧 Dry Air: Use moisturizer and drink more water to avoid dehydration.");
      }
    }

    if (condition.includes("rain")) {
      newTips.push("🌧 Rain: Carry an umbrella and keep feet dry to avoid infections.");
    }
    if (condition.includes("clear")) {
      newTips.push("🌞 Clear Sky: Apply sunscreen (SPF 30+) and wear sunglasses outdoors.");
    }
    if (condition.includes("dust") || condition.includes("smoke")) {
      newTips.push("😷 Dusty Air: Wear an N95 mask and keep windows closed.");
    }

    setTips(newTips);
  }, [weather, tipGroup]);

  // 3️⃣ Show banner + trigger notifications/voice when tips update
  useEffect(() => {
    if (!tips || tips.length === 0) return;

    setShowBanner(true);

    // Desktop Notification
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("🩺 New Health Tip", { body: tips[0] || "Check your new health tip" });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("🩺 New Health Tip", { body: tips[0] || "Check your new health tip" });
          }
        });
      }
    }

    // Voice Alert (Speech Synthesis)
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(tips[0] || "New health tip available");
      utter.lang = "en-US";
      utter.rate = 1.0;
      window.speechSynthesis.speak(utter);
    }

    const timeout = setTimeout(() => setShowBanner(false), 4000);
    return () => clearTimeout(timeout);
  }, [tipGroup, weather, tips]);

  // 4️⃣ UI
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 text-gray-700 dark:text-gray-200 relative w-full">
      {showBanner && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm py-1 px-4 rounded-full shadow animate-pulse z-10">
          🔔 New health tips available
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
        🩺 Health Tips — {tipGroup.charAt(0).toUpperCase() + tipGroup.slice(1)}
      </h2>

      <ul className="list-disc ml-5 space-y-3">
        {tips.length === 0 ? (
          <li className="text-sm text-gray-500 dark:text-gray-400">No tips available yet.</li>
        ) : (
          tips.map((t, i) => (
            <li key={i} className="text-sm leading-relaxed">{t}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default HealthTips;
