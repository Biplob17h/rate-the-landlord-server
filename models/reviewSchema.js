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
  zipCode: {
    type: String,
    default: "",
  },
  street: {
    type: String,
    default: "",
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
  date: {
    type: String,
    default: "",
  },
});

const Review = mongoose.model("reviews", reviewSchema);

export default Review;
