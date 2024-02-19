const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete({ _id: id });
    res.json(deletedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  console.log(req.body);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const allProducts = await Product.find();

    /*  const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const allproducts = await query; */

    res.json(allProducts);
  } catch (error) {
    throw new Error(error);
  }
});

const getAProducts = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const singleProduct = await Product.findById({ _id: id }).populate("color");
    res.json(singleProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishList = expressAsyncHandler(async (req, res) => {
  const { prodId } = req.body;
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);
    const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        { new: true }
      );
      console.log(user);
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const searchProducts = expressAsyncHandler(async (req, res) => {
  try {
    console.log(req.params);
    const { keyword } = req.params;
    const result = await Product.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-images");

    res.json(result);
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error in search Products API",
      error,
    });
  }
});

const filteredProducts = expressAsyncHandler(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const product = await query;
    res.json(product);
  } catch (error) {
    res.send({
      success: false,
      message: "Error in search Products API",
      error,
    });
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  addToWishList,
  deleteProduct,
  updateProduct,
  getAProducts,
  searchProducts,
  filteredProducts,
};
