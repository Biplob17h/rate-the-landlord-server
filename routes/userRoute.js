import express from "express";
import {
  createAUser,
  getAllUser,
  getUser,
  updateUserProfile,
  userLogIn,
} from "../controller/userController.js";
import verifyUser from "../utils/verifyUser.js";

const userRouter = express.Router();

userRouter.post("/signup", createAUser);
userRouter.post("/signin", userLogIn);

userRouter.get("/allUser", getAllUser);
userRouter.get("/getUser", verifyUser, getUser);

userRouter.patch("/updateUser", updateUserProfile);

export default userRouter;
