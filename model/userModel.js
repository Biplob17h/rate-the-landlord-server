import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
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
  role: {
    type: String,
    enum: ["user", "coach", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
  photo: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
  },
  gender: {
    type: String,
  },
  hight: {
    type: String,
  },
  age: {
    type: String,
  },
  workTime: {
    type: Array,
  },
  alert: {
    type: Object,
    default: {
      status: false,
    },
  },
});

const User = mongoose.model("users", userSchema);

export default User;
