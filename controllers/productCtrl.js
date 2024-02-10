const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    console.log(newProduct);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishList = expressAsyncHandler(async (req, res) => {
  const { prodId } = req.body;
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);
    console.log(user);
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
      console.log(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createProduct, getAllProducts, addToWishList };
