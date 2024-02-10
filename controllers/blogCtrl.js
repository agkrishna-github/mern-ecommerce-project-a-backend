const expressAsyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");

const createBlog = expressAsyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogs = expressAsyncHandler(async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    res.json(allBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete({ _id: id });
    res.json(deletedBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log(req.body);
  console.log(req.params);
  try {
    const updateddBlog = await Blog.findByIdAndUpdate(
      { _id: id },
      {
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
      },
      { new: true }
    );
    console.log(updateddBlog);
    res.json(updateddBlog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createBlog, getAllBlogs, deleteBlog, updateBlog };
