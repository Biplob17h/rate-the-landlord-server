import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../model/userModel.js";
import nodemailer from "nodemailer";
import generateToken from "../utils/token.js";
import getUserByEmail from "../utils/getUserByEmail.js";
import fs from "fs";

// SIGN UP USER
const createAUser = async (req, res) => {
  try {
    // GET USER DATA
    const { email, password, firstName, lastName } = req.body;

    // confirm credentials
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    const isEmail = await getUserByEmail(email);

    if (isEmail) {
      return res.status(400).json({
        status: "fail",
        error: "email alredy in use",
      });
    }

    // check password length
    if (password.length < 5) {
      return res.status(400).json({
        status: "fail",
        error: "password should be five character or more",
      });
    }

    // ENCRYPT PASSWORD
    const hashPassword = (password) => {
      const solt = 10;
      const hashPassword = bcrypt.hash(password, solt);
      return hashPassword;
    };

    const newPassword = await hashPassword(password);

    // USER DATA FOR DATABASE
    const userData = {
      firstName,
      lastName,
      email,
      password: newPassword,
    };

    // save user to database
    const user = new User(userData);

    const result = await user.save();

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

// USER LOGIN
const userLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // GET  CREDENTIALS
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    // FIND USER
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        error: "No user found",
      });
    }

    // CHECK PASSWORD
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        status: "fail",
        error: "wrong password",
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

// SEND USER DATA TO CLIENT SIDE
const getUser = async (req, res) => {
  try {
    // GET USER DATA
    const user = req.user;
    const alert = user?.alert;

    // USER DATA
    let userData = {};
    if (alert.status) {
      console.log('hited')
      // data
      userData = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        photo: user.photo,
        role: user.role,
        alert: {
          status: true,
          res: alert.res,
          message: alert.message,
        },
      };

      // function
      user.alert = {
        status: false,
      };

      const query = {
        email: user.email,
      };

      const update = await User.updateOne(query, { $set: user });
    } else {
      userData = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        photo: user.photo,
        role: user.role,
        alert: {
          status: false,
        },
      };
    }

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

const updateUserProfile = async (req, res) => {
  try {
    // GET USER DATA
    const userData = req.body;

    // QUERY
    const query = {
      email: userData.email,
    };

    // FIND USER
    const user = await User.findOne(query);
    if (!user) {
      res.status(400).json({
        status: "fail",
        error: "No user found",
      });
    }

    // UPDATE USER DATA
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.photo = userData.photo;
    user.higth = userData.higth;
    user.age = userData.age;
    user.workTime = userData.workTime;

    // UPDATE USER
    const result = await User.updateOne(query, { $set: user });

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

const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find({});

    res.json({
      allUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

export { createAUser, getUser, userLogIn, updateUserProfile, getAllUser };
