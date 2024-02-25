const express = require("express");
const router = express.Router();
const {
  createHomedetails,
  getHomedetails,
  createHomeSubdetails,
  getHomepageSubDetails,
} = require("../controllers/homepagectrl");

router.post("/upload-details", createHomedetails);
router.post("/upload-sub-details", createHomeSubdetails);
router.get("/getHomePagedetails", getHomedetails);
router.get("/get-Home-page-SubDetails", getHomepageSubDetails);

module.exports = router;
