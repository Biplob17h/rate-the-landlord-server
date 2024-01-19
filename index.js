import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";

// APP
const app = express();

// CONFIG
dotenv.config();

//MIDDLEWIRES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ROUTES
app.use('/api/v1/user', userRouter)

// HOMEPAGE
app.get("/", (req, res) => {
  res.send(`<h1>Wellcome to blog page server</h1>`);
});

// LISTEN
const port = process.env.PORT || 8080;
connectDB()
app.listen(port, () => {
  console.log(`server is running on port ${port}`.green.bgWhite.bold);
});
