const expressAsyncHandler = require("express-async-handler");
const PCategory = require("../models/productCategoryModel");

const createPcategory = expressAsyncHandler(async (req, res) => {
  try {
    const newCategory = await PCategory.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllPcategories = expressAsyncHandler(async (req, res) => {
  try {
    const allPcategories = await PCategory.find();
    res.json(allPcategories);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePcategories = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  try {
    const updatedPcategory = await PCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPcategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deletePcategories = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPcategory = await PCategory.findByIdAndDelete(id);
    res.json(deletedPcategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createPcategory,
  getAllPcategories,
  updatePcategories,
  deletePcategories,
};
