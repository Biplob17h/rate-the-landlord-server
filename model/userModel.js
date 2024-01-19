import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [3, "First name is too short"],
      maxLength: [20, "Name too large"],
      trim: true,
      default: "First name",
    },
    lastName: {
      type: String,
      minLength: [3, "Last name is too short"],
      maxLength: [20, "Name too large"],
      trim: true,
      default: "Last name",
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide is valide email"],
      required: [true, "Please provide a email"],
      unique: [true, "Email alredy in use"],
    },
    phone: {
      type: Number,
      // validate: [
      //   validator.isMobilePhone,
      //   "Please provide a valide phone number ",
      // ],
      default: 0,
    },
    role: {
      type: String,
      enum: ["user","writer", "admin",],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "blocked", "not-active"],
      default: "not-active",
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
    },
    photoURL: {
      type: Buffer,
      default: "",
    },
    confirmToken: String,
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("users", userSchema);

export default User;