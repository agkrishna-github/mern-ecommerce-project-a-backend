const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const createUser = asyncHandler(async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    throw new Error(error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser || !(await foundUser.isPasswordMatched(password)))
      throw new Error("Enter details are not found");

    const refreshToken = jwt.sign(
      { id: foundUser._id },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "3d",
      }
    );
    const updatedUser = await User.findByIdAndUpdate(
      foundUser._id,
      { refreshToken: refreshToken },
      { new: true }
    );

    const accessToken = jwt.sign(
      { id: updatedUser._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: updatedUser?._id,
      firstname: updatedUser?.firstname,
      lastname: updatedUser?.lastname,
      email: updatedUser?.email,
      mobile: updatedUser?.mobile,
      token: accessToken,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getwishlist = asyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const userwishlist = await User.findById({ _id: id }).populate("wishlist");

    res.json(userwishlist);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { id } = req.user;

  try {
    const cart = await Cart.find({ userId: id })
      .populate("productId")
      .populate("color");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const { productId, quantity, color, price } = req.body;
  try {
    let newCart = await new Cart({
      userId: id,
      productId,
      quantity,
      price,
      color,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const loginadmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const foundadmin = await User.findOne({ email });
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

const deleteUsercartnew = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { cartItemId } = req.params;
  try {
    const deletedCartItem = await Cart.deleteOne({
      userId: id,
      _id: cartItemId,
    });
    res.json(deletedCartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const cartUpdateQty = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { cartItemId } = req.params;
  const { quantity } = req.body;
  try {
    const cartItem = await Cart.findOne({ userId: id, _id: cartItemId });
    cartItem.quantity = quantity;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    shippingInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
    paymentInfo,
  } = req.body;

  const { id } = req.user;
  try {
    const order = await Order.create({
      user: id,
      shippingInfo,
      paymentInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
    });
    console.log(order);

    order?.orderItems?.map(async (item) => {
      const updatedCart = await Cart.findByIdAndDelete(item?.product);
    });
    res.json({
      order,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  const { id } = req.user;
  console.log(req.user);
  try {
    const userorders = await Order.find({ user: id }).populate(
      "orderItems.color"
    );
    /* .populate("orderItems.color")
      .exec(); */
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  getwishlist,
  getUserCart,
  userCart,
  loginadmin,
  deleteUsercartnew,
  cartUpdateQty,
  createOrder,
  getAllOrders,
};
