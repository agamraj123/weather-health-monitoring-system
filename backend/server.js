const User = require("./models/User");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Weather Route
const weatherRoute = require("./routes/weatherRoute");
app.use("/api/weather", weatherRoute);

// Default Route
app.get("/", (req, res) => {
  res.send("Weather Health Backend is Running ✅");
});

// ✅ REGISTER ROUTE (MOVE THIS ABOVE app.listen)
app.post("/api/register", async (req, res) => {
  try {
    const { name, age, disease, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      age,
      disease,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ START SERVER LAST
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
