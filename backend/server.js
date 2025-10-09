const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log("🔍 API key loaded:", process.env.OPENWEATHER_API_KEY ? "YES" : "NO");


const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect Weather Route
const weatherRoute = require("./routes/weatherRoute");
app.use("/api/weather", weatherRoute);

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Weather Health Backend is Running ✅");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("✅ Your API Key (first 6 chars):", process.env.OPENWEATHER_API_KEY?.slice(0, 6));

