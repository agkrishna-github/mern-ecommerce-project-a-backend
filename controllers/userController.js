const User = require("../models/userModel");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const createUser = asyncHandler(async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser && (await foundUser.isPasswordMatched(password))) {
    console.log("password matched");
    const refreshToken = jwt.sign(
      { id: foundUser._id },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "3d",
      }
    );
    console.log(refreshToken);
    const updatedUser = await User.findByIdAndUpdate(
      foundUser._id,
      { refreshToken: refreshToken },
      { new: true }
    );
    console.log(updatedUser);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    const accessToken = jwt.sign(
      { id: foundUser._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1d" }
    );

    res.json({
      _id: foundUser?._id,
      firstname: foundUser?.firstname,
      lastname: foundUser?.lastname,
      email: foundUser?.email,
      mobile: foundUser?.mobile,
      token: accessToken,
    });
  } else {
    console.log("password not matched");
  }
});

const loginadmin = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const foundadmin = await User.findOne({ email });
  console.log(foundadmin);
  if (foundadmin.role !== "admin") throw new Error("Not Authorised");
  if (foundadmin && (await foundadmin.isPasswordMatched(password))) {
    const refreshToken = jwt.sign(
      { id: foundadmin._id },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "3d",
      }
    );
    await User.findByIdAndUpdate(
      foundadmin._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    const accessToken = jwt.sign(
      { id: foundadmin._id },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "3d",
      }
    );
    res.json({
      _id: foundadmin?._id,
      firstname: foundadmin?.firstname,
      lastname: foundadmin?.lastname,
      email: foundadmin?.email,
      mobile: foundadmin?.mobile,
      token: accessToken,
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const allusers = await User.find();
    console.log(allusers);
    res.json(allusers);
  } catch (error) {
    throw new Error("Userns not found");
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getwishlist = asyncHandler(async (req, res) => {
  console.log(req.user);
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  loginadmin,
  getAllUsers,
  getAllOrders,
  getwishlist,
};
