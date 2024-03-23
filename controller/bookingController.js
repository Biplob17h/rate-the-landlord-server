import Booking from "../model/bookingModel.js";
import User from "../model/userModel.js";

const createABooking = async (req, res) => {
  try {
    const { date, coachEmail, time } = req.body;

    // coach
    const coach = await User.findOne({ email: coachEmail }).select([
      "-password",
      "-role",
      "-workTime",
      "-alert",
    ]);

    const bookingData = {
      date,
      coachEmail,
      time,
      coach,
    };

    // booking
    const booking = new Booking(bookingData);
    const result = await booking.save();

    res.status(200).json({
      status: "success",
      message: "booking created successfully",
      coach,
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

export { createABooking };
