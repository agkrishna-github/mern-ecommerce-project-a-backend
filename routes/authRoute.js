const express = require("express");
const router = express();
const verifyjwt = require("../middlewares/jwtverify");

const {
  createUser,
  loginUser,
  getwishlist,
  getUserCart,
  deleteUsercartnew,
  userCart,
  loginadmin,
  cartUpdateQty,
  createOrder,
  getAllOrders,
} = require("../controllers/userController");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/wishlist", verifyjwt, getwishlist);
router.get("/getuserCart", verifyjwt, getUserCart);
router.post("/createUserCart", verifyjwt, userCart);
router.post("/admin-login", loginadmin);
router.delete("/deleteUsercart/:cartItemId", verifyjwt, deleteUsercartnew);
router.put("/cartQtyUpdate/:cartItemId", verifyjwt, cartUpdateQty);
router.post("/cart/create-order", verifyjwt, createOrder);
router.get("/cart/getallorders", verifyjwt, getAllOrders);

/* 
const {

  getAllUsers,
  
  
  cartUpdateQty,
  
  
  ,
} = require("../controllers/userController");
const {
  paymentVerification,
  checkout,
} = require("../controllers/paymentController");

router.post("/register", createUser);
router.post("/login", loginUser);

router.get("/all-users", getAllUsers);





// router.post("/order/checkout", checkout);
// router.post("/order/paymentVerification", paymentVerification);

*/
module.exports = router;
