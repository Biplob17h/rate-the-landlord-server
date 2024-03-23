import User from "../model/userModel.js";

const getAllCoach = async (req, res) => {
  try {
    const query = {
      role: "coach",
    };
    const coachs = await User.find(query);

    res.status(200).json({
      status: "success",
      coachs,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

export { getAllCoach };
