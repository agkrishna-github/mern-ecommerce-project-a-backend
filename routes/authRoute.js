const express = require("express");
const router = express();
const verifyjwt = require("../middlewares/jwtverify");

const {
  createUser,
  loginUser,
  getwishlist,
  getUserCart,
  userCart,
  loginadmin,
} = require("../controllers/userController");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/wishlist", verifyjwt, getwishlist);
router.get("/getuserCart", verifyjwt, getUserCart);
router.post("/createUserCart", verifyjwt, userCart);
router.post("/admin-login", loginadmin);
/* 
const {
  createUser,
  loginUser,
  
  getAllUsers,
  getwishlist,
  
  
  cartUpdateQty,
  deleteUsercartnew,
  createOrder,
  getallorders,
} = require("../controllers/userController");
const {
  paymentVerification,
  checkout,
} = require("../controllers/paymentController");

router.post("/register", createUser);
router.post("/login", loginUser);

router.get("/all-users", getAllUsers);


router.put("/cartQtyUpdate/:cartItemId", cartUpdateQty);
router.delete("/deleteUsercart/:cartItemId", deleteUsercartnew);
router.post("/cart/create-order", createOrder);
router.get("/cart/getallorders", getallorders);
// router.post("/order/checkout", checkout);
// router.post("/order/paymentVerification", paymentVerification);

*/
module.exports = router;
