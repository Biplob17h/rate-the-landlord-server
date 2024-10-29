import express from "express";
import { createAReport, deleteAReport, getAllReports, getAReport } from "../controllers/reportController.js";

const reportRoute = express.Router();

reportRoute.post('/create', createAReport)

reportRoute.get('/single/:id', getAReport)
reportRoute.get('/all', getAllReports)

reportRoute.delete('/delete/:id', deleteAReport)

export default reportRoute;
