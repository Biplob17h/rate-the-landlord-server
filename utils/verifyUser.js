import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../model/userModel.js";
const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers?.authorisation.split(" ")[1];

    const decode = await promisify(jwt.verify)(
      token,
      process.env.JWT_TOKEN_SECRET
    );

    const user = await User.findOne({ email: decode.email });

    req.user = user;

    next();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

export default verifyUser;
