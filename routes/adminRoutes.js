import express from "express";
import { adminLogin } from "../controllers/adminController.js";

const adminRoute = express.Router();

adminRoute.post('/login', adminLogin)

export default adminRoute;
