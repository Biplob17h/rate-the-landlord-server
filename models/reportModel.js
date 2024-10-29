import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  review: {
    type: mongoose.Types.ObjectId,
    ref: "reviews",
  },
  report: {
    type: String,
  },
  markAsRead: {
    type: Boolean,
    default: false,
  },
});

const Report = mongoose.model("reports", reportSchema);

export default Report;
