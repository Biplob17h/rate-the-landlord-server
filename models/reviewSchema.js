import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  landlordName: {
    type: String,
    required: true,
    default: "",
    upperCase: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    default: "",
  },
  city: {
    type: String,
    required: true,
    default: "",
  },
  state: {
    type: String,
    required: true,
    default: "",
  },
  zipCode: {
    type: String,
    required: true,
    default: "",
  },
  street: {
    type: String,
    required: true,
    default: "",
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  review: {
    type: String,
    required: true,
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
  date: {
    type: String,
    default: "",
  },
});

const Review = mongoose.model("reviews", reviewSchema);

export default Review;
