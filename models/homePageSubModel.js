const mongoose = require("mongoose");

const homePageSubSchema = new mongoose.Schema(
  {
    subtitle: {
      type: String,
      required: true,
    },
    subdescription: {
      type: String,
      required: true,
    },
    subprice: {
      type: Number,
      required: true,
    },
    images: String,
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Homepagesubdetail", homePageSubSchema);
