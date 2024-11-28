import Report from "../models/reportModel.js";

const createAReport = async (req, res) => {
  try {
    const { review, report } = req.body;
    const reportData = await Report({ review, report });
    const result = await reportData.save();
    res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById({ _id: id });

    res.status(200).json({
      status: "success",
      data: report,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllReports = async (req, res) => {
  try {
    // Fetch reports and resolve to plain JavaScript objects
    const reports = await Report.find({}).populate("review").lean();

    // Update reports that are unread
    await Report.updateMany({ markAsRead: false }, { markAsRead: true });

    res.status(200).json({
      status: "success",
      data: reports, // Plain objects now
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getUnreadReports = async (req, res) => {
  try {
    const reports = await Report.find({ markAsRead: false });
    res.status(200).json({
      status: "success",
      data: reports,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteAReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findByIdAndDelete({ _id: id });

    if (!report) {
      return res.status(404).json({
        status: "fail",
        message: "Report not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Report deleted successfully",
      data: report,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export {
  createAReport,
  getAReport,
  getAllReports,
  deleteAReport,
  getUnreadReports,
};
