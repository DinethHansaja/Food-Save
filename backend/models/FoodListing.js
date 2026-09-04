const mongoose = require("mongoose");

const foodListingSchema = new mongoose.Schema(
  {
    // The account that owns this listing.  Keeping this alongside the display
    // name means a renamed business cannot lose access to its requests.
    businessId: {
      type: String,
      trim: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    foodName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Prepared Meals",
        "Bakery",
        "Fruits",
        "Vegetables",
        "Dairy",
        "Packaged Food",
        "Other",
      ],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unit: {
      type: String,
      required: true,
      enum: ["portions", "kg", "items", "packs"],
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "reserved", "collected", "expired"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FoodListing", foodListingSchema);
