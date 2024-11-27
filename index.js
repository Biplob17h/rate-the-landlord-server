import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./db/db.js";
import reviewRoute from "./routes/reviewRoutes.js";
import reportRoute from "./routes/reportRoutes.js";
import adminRoute from "./routes/adminRoutes.js";
import fetch from "node-fetch"; // Required to call external APIs

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/report", reportRoute);
app.use("/api/v1/admin", adminRoute);

// Verify Turnstile token route
app.post("/api/v1/verify-turnstile", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required." });
  }

  try {
    const secretKey = process.env.TURNSTILE_SECRET_KEY; // Add your Turnstile secret key to .env
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ message: "Token is valid." });
    } else {
      return res.status(400).json({ message: "Token is invalid.", errors: data["error-codes"] });
    }
  } catch (error) {
    console.error("Error verifying Turnstile token:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Home route
app.get("/", (req, res) => {
  res.send("Rate The Landlord server is running !!!!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`.cyan.bold);
});
