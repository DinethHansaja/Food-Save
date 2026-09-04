const FoodListing = require("../models/FoodListing");

// Create food listing
const createFoodListing = async (req, res) => {
  try {
    const {
      businessName,
      businessId,
      foodName,
      category,
      description,
      quantity,
      unit,
      location,
      expiryDate,
    } = req.body;

    if (
      !businessName ||
      !foodName ||
      !category ||
      !description ||
      !quantity ||
      !unit ||
      !location ||
      !expiryDate
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const food = await FoodListing.create({
      businessId,
      businessName,
      foodName,
      category,
      description,
      quantity,
      unit,
      location,
      expiryDate,
    });

    res.status(201).json({
      message: "Food listing created successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create food listing",
      error: error.message,
    });
  }
};

// Get all available food listings
const getFoodListings = async (req, res) => {
  try {
    const { search, category, location } = req.query;

    const currentDate = new Date();

    // Mark expired listings
    await FoodListing.updateMany(
      {
        expiryDate: { $lt: currentDate },
        status: "available",
      },
      {
        $set: { status: "expired" },
      }
    );

    // Build search filter
    const filter = {
      status: "available",
      expiryDate: { $gt: currentDate },
    };

    // Search by food name
    if (search) {
      filter.foodName = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by location
    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    const foods = await FoodListing.find(filter).sort({
      expiryDate: 1,
    });

    res.status(200).json({
      count: foods.length,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get food listings",
      error: error.message,
    });
  }
};

// Get single food listing
const getFoodListingById = async (req, res) => {
  try {
    const food = await FoodListing.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food listing not found",
      });
    }

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get food listing",
      error: error.message,
    });
  }
};

// Update food listing
const updateFoodListing = async (req, res) => {
  try {
    const food = await FoodListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!food) {
      return res.status(404).json({
        message: "Food listing not found",
      });
    }

    res.status(200).json({
      message: "Food listing updated successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update food listing",
      error: error.message,
    });
  }
};

// Delete food listing
const deleteFoodListing = async (req, res) => {
  try {
    const food = await FoodListing.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food listing not found",
      });
    }

    res.status(200).json({
      message: "Food listing deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete food listing",
      error: error.message,
    });
  }
};

// Get food listings by business name
const getFoodListingsByBusiness = async (req, res) => {
  try {
    const { businessName } = req.params;

    const foods = await FoodListing.find({
      businessName: {
        $regex: `^${businessName}$`,
        $options: "i",
      },
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: foods.length,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get business food listings",
      error: error.message,
    });
  }
};

module.exports = {
  createFoodListing,
  getFoodListings,
  getFoodListingById,
  updateFoodListing,
  deleteFoodListing,
  getFoodListingsByBusiness,
};
