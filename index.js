import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./db/db.js";
import reviewRoute from "./routes/reviewRoutes.js";
import reportRoute from "./routes/reportRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/report', reportRoute)

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
