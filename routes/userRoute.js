import express from "express";
import {
  confirmUserEmail,
  createAUser,
  getUser,
  userLogIn,
} from "../controller/userController.js";
import verifyUser from "../utils/verifyUser.js";

const userRouter = express.Router();

userRouter.post("/signup", createAUser);
userRouter.get("/signin", userLogIn);
userRouter.get('/getUser',verifyUser, getUser)
userRouter.get("/confirm/:token", confirmUserEmail);

export default userRouter;
