import express from "express";
import { adminLogin, updateAdmin } from "../controllers/adminController.js";

const adminRoute = express.Router();

adminRoute.post("/login", adminLogin);
adminRoute.put("/updateAuth/:id", updateAdmin);

export default adminRoute;
