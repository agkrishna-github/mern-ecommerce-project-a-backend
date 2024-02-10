const express = require("express");
const { uploadImages, deleteImages } = require("../controllers/uploadCtrl");
const { uploadPhoto } = require("../middlewares/uploadImgMiddleware");
const router = express.Router();

router.post("/", uploadPhoto.array("images", 10), uploadImages);

router.delete("/delete-img/:id", deleteImages);

module.exports = router;
