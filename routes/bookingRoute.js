import express from "express";
import { createABooking } from "../controller/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/create', createABooking)

export default bookingRouter;
