const expressAsyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");

const createBrand = expressAsyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getallBrands = expressAsyncHandler(async (req, res) => {
  try {
    const allBrand = await Brand.find();
    res.json(allBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedBrand = await Brand.findByIdAndDelete({ _id: id });
  res.json(deletedBrand);
  try {
  } catch (error) {
    throw new Error(error);
  }
});

const getABrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const getAbrand = await Brand.findById({ _id: id });
  // console.log(getAbrand);
  res.json(getAbrand);
  try {
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log(id);
  console.log(req.body);
  const updatedBrand = await Brand.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.json(updatedBrand);
  try {
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrand,
  getallBrands,
  deleteBrand,
  getABrand,
  updateBrand,
};
