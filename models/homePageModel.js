const mongoose = require("mongoose");

const homePageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Homepagedetail", homePageSchema);
