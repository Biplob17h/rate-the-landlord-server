import express from "express";
import { createAReport, deleteAReport, getAllReports, getAReport, getUnreadReports } from "../controllers/reportController.js";

const reportRoute = express.Router();

reportRoute.post('/create', createAReport)

reportRoute.get('/report/all', getAllReports)
reportRoute.get('/single/:id', getAReport)
reportRoute.get('/unread', getUnreadReports)

reportRoute.delete('/delete/:id', deleteAReport)

export default reportRoute;
