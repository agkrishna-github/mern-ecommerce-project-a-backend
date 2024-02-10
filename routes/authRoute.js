const express = require("express");
const router = express();
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  createUser,
  loginUser,
  loginadmin,
  getAllUsers,
  getwishlist,
  // getallorders,
} = require("../controllers/userController");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/admin-login", loginadmin);
router.get("/all-users", getAllUsers);
router.get("/wishlist", authMiddleware, getwishlist);
// router.get("/getallorders", getallorders);

module.exports = router;
