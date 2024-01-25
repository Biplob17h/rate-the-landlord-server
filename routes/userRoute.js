import express from "express";
import {
  confirmUserEmail,
  createAUser,
  getAllUser,
  getProfilePhoto,
  getUser,
  updateUserProfile,
  updateUserProfilePhoto,
  userLogIn,
} from "../controller/userController.js";
import verifyUser from "../utils/verifyUser.js";
import formidable from "express-formidable";

const userRouter = express.Router();

userRouter.post("/signup", createAUser);
userRouter.post("/signin", userLogIn);
userRouter.get("/allUser", getAllUser);
userRouter.get("/getUser", verifyUser, getUser);
userRouter.get("/confirm/:token", confirmUserEmail);
userRouter.get("/photo/profile", getProfilePhoto);
userRouter.put("/updateUser/photo", formidable(), updateUserProfilePhoto);
userRouter.patch("/updateUser", updateUserProfile);

export default userRouter;
