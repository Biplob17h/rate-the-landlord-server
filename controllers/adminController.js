import Admin from "../models/adminModel.js";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        status: "fail",
        message: "Admin not found",
      });
    }

    if (admin.password !== password) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect password",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      data: admin,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!admin) {
      return res.status(404).json({
        status: "fail",
        message: "Admin not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Admin updated successfully",
      data: admin,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export { adminLogin, updateAdmin };
