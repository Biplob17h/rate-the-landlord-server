import Admin from "../models/adminModel.js";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(404).json({
        status: "fail",
        message: "Admin not found",
      });
    }
    const adminPassword = admin.password;
    if (adminPassword !== password) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid password",
      });
    }
    res.json({
      status: "success",
      message: "Admin logged in successfully",
      data: admin,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export { adminLogin };
