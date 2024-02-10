const express = require("express");
const router = express.Router();
const {
  createBlogCategory,
  getAllBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
} = require("../controllers/blogCategoryCtrl");

router.post("/", createBlogCategory);
router.get("/", getAllBlogCategory);
router.delete("/:id", deleteBlogCategory);
router.put("/:id", updateBlogCategory);

module.exports = router;
