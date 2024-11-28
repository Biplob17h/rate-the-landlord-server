import Resource from "../models/resourceModel.js";

const createAResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    const result = await resource.save();
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

const getAResource = async (req, res) => {
  try {
    const id = req.params.id;

    const resource = await Resource.findOne({ _id: id });
    if (!resource) {
      return res.status(404).json({
        status: "fail",
        message: "Resource not found",
      });
    }
    res.json({
      status: "success",
      data: resource,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllResourceBySort = async (req, res) => {
  try {
    const { resource, sort, city, state } = req.query;
    let query = {};

    // Apply filters to the query
    if (resource) {
      query.resource = { $regex: new RegExp(resource, "i") }; // Case-insensitive search
    }
    if (city) {
      query.city = { $regex: new RegExp(city, "i") }; // Case-insensitive search
    }
    if (state) {
      query.state = { $regex: new RegExp(state, "i") }; // Case-insensitive search
    }

    // Apply sorting logic
    let sortQuery = {};
    if (!sort || sort === "newest") {
      // Default sort by date (newest first)
      sortQuery = { date: -1 };
    } else if (sort === "oldest") {
      sortQuery = { date: 1 };
    } else if (sort === "a to z") {
      sortQuery = { landlordName: 1 }; // Ascending order by landlordName
    } else if (sort === "z to a") {
      sortQuery = { landlordName: -1 }; // Descending order by landlordName
    } else if (sort === "highest") {
      sortQuery = { totalRating: -1 }; // Descending order by rating
    } else if (sort === "lowest") {
      sortQuery = { totalRating: 1 }; // Ascending order by rating
    }

    // Fetch reviews with applied query and sort conditions
    const reviews = await Review.find(query).sort(sortQuery);
    res.json({
      status: "success",
      results: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateAResource = async (req, res) => {
  try {
    const { id } = req.query;

    const updatedResource = await Resource.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({
        status: "fail",
        message: "Resource not found",
      });
    }

    res.json({
      status: "success",
      data: updatedResource,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteAResource = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedResource = await Resource.findByIdAndDelete({ _id: id });
    if (!deletedResource) {
      return res.status(404).json({
        status: "fail",
        message: "Resource not found",
      });
    }

    res.json({
      status: "success",
      message: "Resource deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export {
  createAResource,
  getAResource,
  getAllResourceBySort,
  updateAResource,
  deleteAResource,
};
