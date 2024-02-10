const express = require("express");
const {
  createProduct,
  getAllProducts,
  addToWishList,
} = require("../controllers/productCtrl");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", createProduct);
router.get("/", getAllProducts);
router.put("/wishlist", authMiddleware, addToWishList);

module.exports = router;
