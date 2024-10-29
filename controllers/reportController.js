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
    const { markAsRead } = req.query;
    let query = {};
    if (markAsRead === "true") {
      query = { markAsRead: true };
    }
    if (markAsRead === "false") {
      query = { markAsRead: false };
    }
    const reports = await Report.find(query);

    res.status(200).json({
      status: "success",
      results: reports.length,
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
    res.status(204).json({
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

export { createAReport, getAReport, getAllReports, deleteAReport };
