const express = require("express");
const router = express.Router();
const {
  createColor,
  getColors,
  deleteColor,
} = require("../controllers/colorCtrl");

router.post("/", createColor);
router.get("/", getColors);
router.delete("/:id", deleteColor);

module.exports = router;
