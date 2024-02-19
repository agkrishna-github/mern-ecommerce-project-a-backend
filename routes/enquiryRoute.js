const express = require("express");
const router = express.Router();
const { createEnquiry } = require("../controllers/enquiryCtrl");

router.post("/", createEnquiry);

module.exports = router;
