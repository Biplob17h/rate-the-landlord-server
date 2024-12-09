import express from "express";
import { createAReview, getAllLandlordByName, getAllReviewByLocation, getAllReviewsByLocation, getAllReviewsBySort, getAllReviewsOfALandlordById, getAReview, updateAReview, deleteAReview } from "../controllers/reviewController.js";

const reviewRoute = express.Router();

// all post
reviewRoute.post("/create", createAReview);

// all gets
reviewRoute.get("/single/:id", getAReview);
reviewRoute.get("/single/location/:id", getAllReviewByLocation);
reviewRoute.get("/all", getAllReviewsBySort);
reviewRoute.get("/all/location", getAllReviewsByLocation);
reviewRoute.get("/all/landlordName", getAllLandlordByName);
reviewRoute.get("/all/landlord/:id", getAllReviewsOfALandlordById);


reviewRoute.put("/update", updateAReview);

reviewRoute.delete("/delete/:id", deleteAReview);


export default reviewRoute;



