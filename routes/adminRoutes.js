import express from "express";
import { adminLogin } from "../controllers/AdminController.js";

const adminRoute = express.Router();

// Admin login
adminRoute.post('/login', adminLogin)

export default adminRoute;
