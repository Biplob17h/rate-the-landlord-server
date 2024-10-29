import express from "express";
import { createAReview, getAllReviewByLocation, getAllReviewsByLocation, getAllReviewsBySort, getAReview } from "../controllers/reviewController.js";

const reviewRoute = express.Router();

// all post
reviewRoute.post("/create", createAReview);

// all gets
reviewRoute.get("/single/:id", getAReview);
reviewRoute.get("/single/location/:id", getAllReviewByLocation);
reviewRoute.get("/all", getAllReviewsBySort);
reviewRoute.get("/all/location", getAllReviewsByLocation);



export default reviewRoute;



