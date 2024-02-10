const express = require("express");
const {
  createBrand,
  getallBrands,
  deleteBrand,
  getABrand,
  updateBrand,
} = require("../controllers/brandCtrl");
const router = express.Router();

router.post("/", createBrand);
router.get("/", getallBrands);
router.get("/:id", getABrand);
router.delete("/:id", deleteBrand);
router.put("/:id", updateBrand);

module.exports = router;
