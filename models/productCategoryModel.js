const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pcategory", ProductCategorySchema);
