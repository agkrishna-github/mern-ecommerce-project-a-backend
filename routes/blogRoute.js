const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogCtrl");

router.post("/", createBlog);
router.get("/", getAllBlogs);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);

module.exports = router;
