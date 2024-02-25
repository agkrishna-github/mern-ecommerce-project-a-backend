const express = require("express");
const {
  createProduct,
  getAllProducts,
  addToWishList,
  deleteProduct,
  updateProduct,
  getAProducts,
  searchProducts,
  filteredProducts,
  ratingProduct,
} = require("../controllers/productCtrl");
const router = express.Router();
const jwtverify = require("../middlewares/jwtverify");

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/search/:keyword", searchProducts);
router.post("/get-filtered-products", filteredProducts);
router.get("/:id", jwtverify, getAProducts);
router.put("/wishlist", jwtverify, addToWishList);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
router.post("/rating", jwtverify, ratingProduct);

module.exports = router;
