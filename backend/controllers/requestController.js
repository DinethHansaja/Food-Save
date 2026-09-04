const FoodRequest = require("../models/FoodRequest");
const FoodListing = require("../models/FoodListing");

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Create a food request
const createFoodRequest = async (req, res) => {
  try {
    const {
      foodName,
      businessName,
      recipientName,
      quantityRequested,
      foodListingId,
    } = req.body;

    if (
      !foodName ||
      !businessName ||
      !recipientName ||
      !quantityRequested
    ) {
      return res.status(400).json({
        message:
          "Please provide food name, business name, recipient name, and quantity",
      });
    }

    const food = foodListingId
      ? await FoodListing.findById(foodListingId)
      : await FoodListing.findOne({
          foodName: {
            $regex: `^${escapeRegExp(foodName)}$`,
            $options: "i",
          },
          businessName: {
            $regex: `^${escapeRegExp(businessName)}$`,
            $options: "i",
          },
        });

    if (!food) {
      return res.status(404).json({
        message: "Food listing not found",
      });
    }

    if (food.status !== "available") {
      return res.status(400).json({
        message: "This food is no longer available",
      });
    }

    if (quantityRequested > food.quantity) {
      return res.status(400).json({
        message:
          "Requested quantity exceeds available quantity",
      });
    }

    const request = await FoodRequest.create({
      businessId: food.businessId,
      foodListingId: food._id.toString(),
      foodName: food.foodName,
      businessName: food.businessName,
      recipientName: recipientName.trim(),
      quantityRequested,
    });

    res.status(201).json({
      message: "Food request created successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create food request",
      error: error.message,
    });
  }
};


// Get all requests
const getFoodRequests = async (req, res) => {
  try {
    const requests = await FoodRequest.find()
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get food requests",
      error: error.message,
    });
  }
};


// Update request status
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "accepted",
      "rejected",
      "collected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid request status",
      });
    }

    const request = await FoodRequest.findById(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        message: "Food request not found",
      });
    }

    // Prevent changing a completed request
    if (request.status === "collected") {
      return res.status(400).json({
        message:
          "A collected request cannot be changed",
      });
    }

    // Prefer the exact listing stored on the request. Fall back to the
    // display names for requests created before listing IDs were stored.
    const food = request.foodListingId
      ? await FoodListing.findById(request.foodListingId)
      : await FoodListing.findOne({
          foodName: {
            $regex: `^${escapeRegExp(request.foodName)}$`,
            $options: "i",
          },
          businessName: {
            $regex: `^${escapeRegExp(request.businessName)}$`,
            $options: "i",
          },
        });

    if (!food) {
      return res.status(404).json({
        message: "Food listing not found",
      });
    }

    // Accept request
    if (status === "accepted") {
      if (food.status !== "available") {
        return res.status(400).json({
          message: "This food is no longer available",
        });
      }

      if (
        request.quantityRequested >
        food.quantity
      ) {
        return res.status(400).json({
          message:
            "Not enough food available for this request",
        });
      }

      // Reduce available quantity
      food.quantity -= request.quantityRequested;

      // If no food remains
      if (food.quantity === 0) {
        food.status = "reserved";
      }

      await food.save();
    }

    // Update request status
    request.status = status;

    await request.save();

    res.status(200).json({
      message: `Request ${status} successfully`,
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update request status",
      error: error.message,
    });
  }
};


// Get requests for a business
const getRequestsByBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { businessName } = req.query;

    if (!businessId) {
      return res.status(400).json({
        message: "Business ID is required",
      });
    }

    const filters = [{ businessId }];

    // Include pre-existing requests that only have a business name.
    if (businessName) {
      filters.push({
        businessName: {
          $regex: `^${escapeRegExp(businessName)}$`,
          $options: "i",
        },
      });
    }

    const requests = await FoodRequest.find({ $or: filters }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get business requests",
      error: error.message,
    });
  }
};


// Get requests for a recipient
const getRequestsByRecipient = async (req, res) => {
  try {
    const { recipientName } = req.params;

    if (!recipientName) {
      return res.status(400).json({
        message: "Recipient name is required",
      });
    }

    const requests = await FoodRequest.find({
      recipientName: {
        $regex: `^${escapeRegExp(recipientName)}$`,
        $options: "i",
      },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get recipient requests",
      error: error.message,
    });
  }
};


module.exports = {
  createFoodRequest,
  getFoodRequests,
  updateRequestStatus,
  getRequestsByBusiness,
  getRequestsByRecipient,
};
