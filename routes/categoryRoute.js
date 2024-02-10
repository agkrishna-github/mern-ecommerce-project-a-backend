const express = require("express");
const router = express.Router();
const {
  createPcategory,
  getAllPcategories,
  updatePcategories,
  deletePcategories,
} = require("../controllers/categoryCtrl");

router.post("/", createPcategory);
router.get("/", getAllPcategories);
router.put("/:id", updatePcategories);
router.delete("/:id", deletePcategories);

module.exports = router;
