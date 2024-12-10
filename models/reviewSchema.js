import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  landlordName: {
    type: String,
    required: true,
    default: "",
    upperCase: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  review: {
    type: String,
    default: "",
  },
  markAsRead: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: "",
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model("reviews", reviewSchema);

export default Review;
