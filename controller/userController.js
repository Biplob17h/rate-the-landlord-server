import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../model/userModel.js";
import nodemailer from "nodemailer";
import generateToken from "../utils/token.js";

const createAUser = async (req, res) => {
  try {
    // GET USER DATA
    const { email, password } = req.body;

    // ENCRYPT PASSWORD
    const hashPassword = (password) => {
      const solt = 10;
      const hashPassword = bcrypt.hash(password, solt);
      return hashPassword;
    };

    const newPassword = await hashPassword(password);

    // GENARTE TOKEN
    const token = crypto.randomBytes(32).toString("hex");

    // user data for database
    const userData = {
      email: email,
      password: newPassword,
      confirmToken: token,
    };

    // save user to database
    const user = new User(userData);
    const result = await user.save();

    // send email
    const transprot = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });
    if (result._id) {
      transprot.sendMail({
        from: "biplob17h@gmail.com",
        to: email,
        subject: "confirm email",
        html: `
          <html>
          <body>
          <h1>Wellcome to grand blog</h1>
          <a href='http://localhost:5000/api/v1/user/confirm/${token}'>Confirm your email</a>
          </body>
          </html>
          `,
      });
    }

    // send response to client
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const confirmUserEmail = async (req, res) => {
  try {
    // GET TOKEN
    const confirmToken = req.params?.token;

    // QUERY
    const query = { confirmToken: confirmToken };

    // FIND USER
    const user = await User.findOne(query);
    if (!user) {
      return res.status(400).json({
        status: "Failed",
        message: "Your confirm token is not valid",
      });
    }

    user.status = "active";
    user.confirmToken = "active";

    const result = await User.updateOne(query, { $set: user });

    res.send(`
    <h1>Your Account Actived SuccessFully</h1>
    `);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    // GET USER DATA
    const user = req.user;

    // CHECK STATUS
    if (user.status === "blocked") {
      return res.status(400).json({
        status: "fail",
        message: "User is blocked by admin",
      });
    }
    if (user.status === "not-active") {
      return res.status(400).json({
        status: "fail",
        message: "Active your account first",
      });
    }

    // USER DATA
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    res.status(200).json({
      status: "success",
      userData,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const userLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // GET  CREDENTIALS
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide your credentials",
      });
    }

    // FIND USER
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "No user found",
      });
    }

    // STAUTS
    if (user.status === "not-active") {
      return res.status(400).json({
        status: "fail",
        message: "Please active your account first",
      });
    }

    if (user.status === "blocked") {
      return res.status(400).json({
        status: "fail",
        message: "You are blocked by admin",
      });
    }

    // CHECK PASSWORD
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        status: "fail",
        messsage: "password don't match",
      });
    }

    // GENERATE TOKEN
    const token = generateToken(user);

    // CLIENT DATA
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    res.status(200).json({
      status: "success",
      message: "User sign in successfully",
      data: {
        userData,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

export { createAUser, confirmUserEmail, getUser, userLogIn };
