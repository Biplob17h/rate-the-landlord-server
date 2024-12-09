import Review from "../models/reviewSchema.js";

const createAReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    const result = await review.save();
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

const getAReview = async (req, res) => {
  try {
    const id = req.params.id;

    const review = await Review.findOne({ _id: id });
    if (!review) {
      return res.status(404).json({
        status: "fail",
        message: "Review not found",
      });
    }
    res.json({
      status: "success",
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllReviewByLocation = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findOne({ _id: id });
    const location = review.location;

    const allReviews = await Review.find({ location });

    res.status(200).json({
      status: "success",
      data: allReviews,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllReviewsBySort = async (req, res) => {
  try {
    const { landlord, sort, location, city, state } = req.query;
    let query = {};

    // Apply filters to the query
    if (landlord) {
      query.landlordName = { $regex: new RegExp(landlord, "i") }; // Case-insensitive search
    }
    if (location) {
      query.location = { $regex: new RegExp(location, "i") }; // Case-insensitive search
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

const getAllReviewsOfALandlordById = async (req, res) => {
  try {
    const { id } = req.params;

    // get the landlord
    const review = await Review.findById({ _id: id });
    const landlord = review.landlordName;

    // get all reviews by the landlord
    const allReviews = await Review.find({ landlordName: landlord });

    res.json({
      status: "success",
      results: allReviews?.length,
      data: allReviews,
      review,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllReviewsByLocation = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        status: "fail",
        message: "Location query parameter is required.",
      });
    }

    // Case-insensitive search for matching location
    const query = { location: { $regex: new RegExp(location, "i") } };
    const reviews = await Review.find(query);

    // Filter out duplicate locations
    const uniqueReviews = [];
    const locationMap = new Map();

    for (const review of reviews) {
      if (!locationMap.has(review.location)) {
        locationMap.set(review.location, true); // Track location
        uniqueReviews.push(review); // Add unique location review
      }
    }

    res.json({
      status: "success",
      results: uniqueReviews.length,
      data: uniqueReviews,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
const getAllLandlordByName = async (req, res) => {
  try {
    const { landlordName } = req.query;

    if (!landlordName) {
      return res.status(400).json({
        status: "fail",
        message: "Location query parameter is required.",
      });
    }

    // Case-insensitive search for matching location
    const query = { landlordName: { $regex: new RegExp(landlordName, "i") } };
    const reviews = await Review.find(query);

    // Filter out duplicate Names
    const uniqueReviews = [];
    const locationMap = new Map();

    for (const review of reviews) {
      if (!locationMap.has(review.landlordName)) {
        locationMap.set(review.landlordName, true); // Track location
        uniqueReviews.push(review); // Add unique location review
      }
    }

    res.json({
      status: "success",
      results: uniqueReviews.length,
      data: uniqueReviews,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateAReview = async (req, res) => {
  try {
    const { id } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({
        status: "fail",
        message: "Review not found",
      });
    }
    res.json({
      status: "success",
      data: updatedReview,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteAReview = async (req, res) => {
  const id = req.params.id;
  const review = await Review.findByIdAndDelete({ _id: id });
  res.json({
    status: "success",
    message: "Review deleted successfully",
  });
};

export {
  createAReview,
  getAReview,
  getAllReviewsBySort,
  getAllReviewsByLocation,
  getAllReviewByLocation,
  getAllLandlordByName,
  getAllReviewsOfALandlordById,
  updateAReview,
  deleteAReview,
};
