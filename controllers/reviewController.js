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
    const { landlord, sort, country, state, city, zip, location } = req.query;
    let query = {};

    // Apply filters to the query
    if (landlord) {
      query.landlordName = { $regex: new RegExp(landlord, "i") }; // Case-insensitive search
    }

    if (country) {
      query.country = country;
    }
    if (state) {
      query.state = state;
    }
    if (city) {
      query.city = city;
    }
    if (zip) {
      query.zipCode = zip;
    }

    // Apply sorting logic
    let sortQuery = {};
    switch (sort) {
      case "":
        sortQuery.date = -1;
        break;
      case "newest":
        sortQuery.date = -1;
        break;
      case "oldest":
        sortQuery.date = 1;
        break;
      case "a to z":
        sortQuery.landlordName = 1;
        break;
      case "z to a":
        sortQuery.landlordName = -1;
        break;
      case "highest":
        sortQuery.totalRating = -1;
        break;
      case "lowest":
        sortQuery.totalRating = 1;
        break;
      default:
        break;
    }

    // Fetch reviews with applied query and sort conditions
    const reviews = await Review.find(query).sort(sortQuery);
    res.json({
      status: "success",
      results: reviews?.length,
      data: reviews,
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


export {
  createAReview,
  getAReview,
  getAllReviewsBySort,
  getAllReviewsByLocation,
  getAllReviewByLocation,
  getAllLandlordByName
};
