const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    console.log("🔑 Using API key (first 5 chars):", apiKey ? apiKey.slice(0, 5) : "Not loaded");

    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: city,
        appid: apiKey,
        units: "metric",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.log("❌ Full error object:", JSON.stringify(error.response?.data || error.message));
    res.status(500).json({ error: "Cannot fetch weather data" });
  }
});

module.exports = router;

