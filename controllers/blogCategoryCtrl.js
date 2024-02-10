const expressAsyncHandler = require("express-async-handler");
const BlogCategory = require("../models/blogCategoryModel");

const createBlogCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newBlogCategory = await BlogCategory.create(req.body);
    res.json(newBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogCategory = expressAsyncHandler(async (req, res) => {
  try {
    const AllBlogCategory = await BlogCategory.find();
    res.json(AllBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlogCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlogCategory = await BlogCategory.findByIdAndDelete({
      _id: id,
    });
    res.json(deletedBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlogCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBlogCategory = await BlogCategory.findByIdAndUpdate(
      { _id: id },
      { title: req.body.title },
      { new: true }
    );
    res.json(updatedBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlogCategory,
  getAllBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
};
